<script setup lang="ts">
import {
    ColumnConfig,
    ColumnType,
    extractI18nValue,
    FormConfig,
    LktObject,
    ModificationView,
    TableConfig
} from "lkt-vue-kernel";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {DataState} from "lkt-data-state";

const props = withDefaults(defineProps<{
    modelValue: LktObject
    modifications?: LktObject
    form: FormConfig
    valid?: boolean
    modificationView?: ModificationView
    modificationDataState?: DataState
}>(), {
    valid: false,
    modificationView: ModificationView.Current,
    modificationDataState: () => new DataState({})
});

const emit = defineEmits([
    'update:modelValue',
    'update:modifications',
    'update:form',
    'update:valid'
]);

const value = ref(props.modelValue);
const modificationsValue = ref(props.modifications);

const fieldsRefs = ref(null);
const isValid = ref(props.valid);

watch(() => props.valid, (val) => {isValid.value = val;})
watch(isValid, (val) => {emit('update:valid', val);})

const checkValidForm = () => {
    let chk = true;
    let haystack = [];
    if (!props.form) return;

    haystack = props.form.items.reduce((r, v, i) => r.concat(v.type === 'form' ? i : []), [])
    if (haystack.length > 0) {
        for (let k in haystack) {
            chk = chk && fieldsRefs.value[haystack[k]].isValid();
        }
    }

    if (!chk) {
        isValid.value = chk;
        return;
    }

    haystack = props.form.items.reduce((r, v, i) => r.concat(v.type === 'field' ? i : []), [])
    if (haystack.length > 0) {
        for (let k in haystack) {
            chk = chk && fieldsRefs.value[haystack[k]].isFormValid();
        }
    }

    isValid.value = chk;
    emit('update:valid', chk);
}

watch(() => props.modelValue, (val) => {value.value = val;})
watch(value, (val) => {
    prepareTableData();
    emit('update:modelValue', val);
}, {deep: true})

watch(() => props.modifications, (val) => {modificationsValue.value = val;})
watch(modificationsValue, (val) => {
    prepareTableData();
    emit('update:modifications', val);
}, {deep: true})

const computedDisabledSubmit = computed(() => {
        return !isValid.value;
    }),
    computedSubmitButtonConfig = computed(() => {
        if (!props.form) return {};
        return {
            ...props.form?.submitButton,
            disabled: computedDisabledSubmit.value
        }
    });

const remoteValidating = ref([]);

const computedHasHeader = computed(() => {
    return typeof props.form?.header === 'object' && Object.keys(props.form?.header).length > 0;
})

const differences = ref(<LktObject[]>[]);
const differencesColumns = <ColumnConfig[]>[
    {
        key: 'datum',
        label: 'Datum',
        type: ColumnType.None,
    },
    {
        key: 'current',
        label: 'Current',
        type: ColumnType.Field,
        field: 'prop:field',
    },
    {
        key: 'modification',
        label: 'Modification',
        type: ColumnType.Field,
        field: 'prop:field',
    }
];

const computedInDifferencesView = computed(() => {
    return props.modificationView === ModificationView.Differences;
})

const computedInSplitView = computed(() => {
    return props.modificationView === ModificationView.SplitView;
})

const computedInModificationsView = computed(() => {
    return props.modificationView === ModificationView.Modifications;
})

const computedInCurrentView = computed(() => {
    return props.modificationView === ModificationView.Current;
})

const computedDifferencesItemIndexes = computed(() => {
    // if (!computedInDifferencesView.value && !computedInSplitView.value) return [];

    let r = [];
    let differencesKeys = props.modificationDataState.getChangedProperties();
    if (computedInSplitView.value) {
        r = props.form.items.reduce((r, v, i) => r.concat(v.type === 'field' ? i : []), []);

    } else if (computedInDifferencesView.value) {
        r = props.form.items.reduce((r, v, i) => r.concat(v.type === 'field' && differencesKeys.includes(v.key) ? i : []), []);
    }
    prepareTableData(r);
    return r;
})

const prepareTableData = (haystack?: Array<number>) => {
    differences.value = [];

    let data: Array<LktObject> = [];
    if (!haystack) haystack = computedDifferencesItemIndexes.value;
    if (haystack.length > 0) {
        for (let i in haystack) {
            let index = haystack[i];
            let config = props.form.items[index];

            data.push({
                datum: extractI18nValue(config.field.label),
                current: value.value[config.key],
                modification: modificationsValue.value[config.key],
                field: config.field,
            });
        }
    }
    differences.value = data;
}

defineExpose({
    isValid: () => isValid.value,
})

onMounted(() => {
    nextTick(() => {
        checkValidForm();
    })
    emit('update:valid', isValid.value);
})

</script>

<template>
    <component
        v-if="typeof form === 'object' && Object.keys(form).length > 0"
        :is="form.container?.tag ?? 'section'"
        class="lkt-form-container"
        :class="form.container?.class"
        v-bind="form.container?.props"
    >
        <form class="lkt-grid-1">
            <lkt-header v-if="computedHasHeader" v-bind="form.header"/>

            <template v-for="(item, i) in form.items">
                <template v-if="item.type === 'field'">
                    <lkt-field
                        v-if="computedInCurrentView"
                        v-model="value[item.key]"
                        v-model:options="item.field.options"
                        v-bind="item.field"
                        ref="fieldsRefs"
                        :key="`${i}-current`"
                        @validating="() => {remoteValidating.push(item.key)}"
                        @validation="() => {remoteValidating.splice(remoteValidating.indexOf(item.key), 1)}"
                        @validation-status="checkValidForm"
                    />
                    <lkt-field
                        v-else-if="computedInModificationsView"
                        v-model="modificationsValue[item.key]"
                        v-model:options="item.field.options"
                        v-bind="item.field"
                        ref="fieldsRefs"
                        :key="`${i}-modifications`"
                        @validating="() => {remoteValidating.push(item.key)}"
                        @validation="() => {remoteValidating.splice(remoteValidating.indexOf(item.key), 1)}"
                        @validation-status="checkValidForm"
                    />
                </template>
                <template v-else-if="item.type === 'field'">
                    <lkt-field
                        v-model="value[item.key]"
                        v-bind="item.field"
                        ref="fieldsRefs"
                        :key="i"
                        @validating="() => {remoteValidating.push(item.key)}"
                        @validation="() => {remoteValidating.splice(remoteValidating.indexOf(item.key), 1)}"
                        @validation-status="checkValidForm"
                    />
                </template>
                <template v-else-if="item.type === 'form'">
                    <lkt-form
                        v-model="value"
                        v-model:modifications="modificationsValue"
                        :form="form.items[i].form"
                        :modification-view="modificationView"
                        :modification-data-state="modificationDataState"
                        ref="fieldsRefs"
                        :key="i"
                        @update:valid="checkValidForm"
                    />
                </template>
                <template v-else-if="item.type === 'component'">
                    <component :is="item.component?.tag" v-bind="item.component.props" ref="fieldsRefs"
                               :key="i">
                        <template v-if="Object.keys(item.component?.form).length > 0">
                            <lkt-form v-model="value" v-model:form="item.component.form"/>
                        </template>
                    </component>
                </template>
            </template>

            <template v-if="computedDifferencesItemIndexes.length > 0">
                <lkt-table
                    v-model="differences"
                    v-bind="<TableConfig>{
                        columns: differencesColumns,
                    }"
                >
                </lkt-table>
            </template>

            <slot/>

            <lkt-button
                v-if="typeof form?.submitButton === 'object' && computedSubmitButtonConfig"
                v-bind="computedSubmitButtonConfig"
            />
        </form>
    </component>
</template>
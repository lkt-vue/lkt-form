<script setup lang="ts">
import {FormConfig, LktObject} from "lkt-vue-kernel";
import {computed, nextTick, onMounted, ref, watch} from "vue";

const props = withDefaults(defineProps<{
    modelValue: LktObject
    form: FormConfig
    valid?: boolean
}>(), {
    valid: false
});

const emit = defineEmits(['update:modelValue', 'update:form', 'update:valid']);

const value = ref(props.modelValue);

const fieldsRefs = ref(null);
const isValid = ref(props.valid);

watch(() => props.valid, (val) => {isValid.value = val;})
watch(isValid, (val) => {emit('update:valid', val);})

const checkValidForm = () => {
    let chk = true;
    let haystack = [];

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
    emit('update:modelValue', val);
}, {deep: true})

const computedDisabledSubmit = computed(() => {
        return !isValid.value;
    }),
    computedSubmitButtonConfig = computed(() => {
        return {
            ...props.form.submitButton,
            disabled: computedDisabledSubmit.value
        }
    });

const remoteValidating = ref([]);

const computedHasHeader = computed(() => {
    return typeof props.form.header === 'object' && Object.keys(props.form.header).length > 0;
})

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
        :is="form.container?.tag ?? 'section'"
        class="lkt-form-container"
        :class="form.container?.class"
        v-bind="form.container?.props"
    >
        <form class="lkt-grid-1">
            <lkt-header v-if="computedHasHeader" v-bind="form.header"/>

            <template v-for="(item, i) in form.items">
                <lkt-field
                    v-if="item.type === 'field'"
                    v-model="value[item.key]"
                    v-bind="item.field"
                    ref="fieldsRefs"
                    :key="i"
                    @validating="() => {remoteValidating.push(item.key)}"
                    @validation="() => {remoteValidating.splice(remoteValidating.indexOf(item.key), 1)}"
                    @validation-status="checkValidForm"
                />
                <template v-else-if="item.type === 'form'">
                    <lkt-form
                        v-model="value"
                        :form="form.items[i].form"
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

            <slot/>

            <lkt-button
                v-if="typeof form?.submitButton === 'object' && computedSubmitButtonConfig"
                v-bind="computedSubmitButtonConfig"
            />
        </form>
    </component>
</template>
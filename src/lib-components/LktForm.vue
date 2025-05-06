<script setup lang="ts">
import {FormConfig, FormInstance} from "lkt-vue-kernel";
import {computed, ref, watch} from "vue";

const props = withDefaults(defineProps<{
    modelValue?: FormConfig
}>(), {});

const form = ref(new FormInstance(props.modelValue));

const fieldsRefs = ref(null);
const isValid = ref(false);

const checkValidForm = () => {
    let chk = true;
    for (let k in form.value.fields) {
        chk = chk && fieldsRefs.value[k].isValid();
    }

    isValid.value = chk;
}

watch(fieldsRefs, checkValidForm)
watch(() => form.value.modelValue, checkValidForm, {deep: true})

const computedDisabledSubmit = computed(() => {
        return !isValid.value;
    }),
    computedSubmitButtonConfig = computed(() => {
        return {
            ...form.value.submitButton,
            disabled: computedDisabledSubmit.value
        }
    })

</script>

<template>
    <component
        :is="form.container?.tag ?? 'section'"
        class="lkt-form-container"
        :class="form.container?.class">
        <form class="lkt-grid-1">
            <lkt-header v-if="form.header" v-bind="form.header"/>

            <lkt-field
                v-for="field in form.fields"
                v-model="form.modelValue[field.key]"
                v-bind="field.field"
                ref="fieldsRefs"
            />

            <lkt-button
                v-if="computedSubmitButtonConfig"
                v-bind="computedSubmitButtonConfig"
            />
        </form>
    </component>
</template>
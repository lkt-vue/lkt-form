import { FormConfig, LktObject, ModificationView } from "lkt-vue-kernel";
import { DataState } from "lkt-data-state";
type __VLS_Props = {
    modelValue: LktObject;
    modifications?: LktObject;
    form: FormConfig;
    valid?: boolean;
    disabled?: boolean;
    modificationView?: ModificationView;
    editableViews?: ModificationView[];
    modificationDataState?: DataState;
};
declare var __VLS_70: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_70) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    isValid: () => boolean;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "update:modifications": (...args: any[]) => void;
    "update:form": (...args: any[]) => void;
    "update:valid": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modifications"?: ((...args: any[]) => any) | undefined;
    "onUpdate:form"?: ((...args: any[]) => any) | undefined;
    "onUpdate:valid"?: ((...args: any[]) => any) | undefined;
}>, {
    disabled: boolean;
    valid: boolean;
    modificationView: ModificationView;
    editableViews: ModificationView[];
    modificationDataState: DataState;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

import { defineComponent as w, ref as u, watch as v, computed as _, resolveComponent as s, createBlock as n, openBlock as o, resolveDynamicComponent as x, normalizeClass as L, withCtx as z, createElementVNode as D, createCommentVNode as V, createElementBlock as E, normalizeProps as h, mergeProps as m, Fragment as N, renderList as P } from "vue";
import { FormInstance as R, setModalCanvas as S } from "lkt-vue-kernel";
const U = { class: "lkt-grid-1" }, I = /* @__PURE__ */ w({
  __name: "LktForm",
  props: {
    modelValue: {}
  },
  setup(t) {
    const C = t, e = u(new R(C.modelValue)), a = u(null), c = u(!1), d = () => {
      let l = !0;
      for (let f in e.value.fields)
        l = l && a.value[f].isValid();
      c.value = l;
    };
    v(a, d), v(() => e.value.modelValue, d, { deep: !0 });
    const b = _(() => !c.value), i = _(() => ({
      ...e.value.submitButton,
      disabled: b.value
    }));
    return (l, f) => {
      var k, p;
      const y = s("lkt-header"), g = s("lkt-field"), B = s("lkt-button");
      return o(), n(x(((k = e.value.container) == null ? void 0 : k.tag) ?? "section"), {
        class: L(["lkt-form-container", (p = e.value.container) == null ? void 0 : p.class])
      }, {
        default: z(() => [
          D("form", U, [
            e.value.header ? (o(), n(y, h(m({ key: 0 }, e.value.header)), null, 16)) : V("", !0),
            (o(!0), E(N, null, P(e.value.fields, (r) => (o(), n(g, m({
              modelValue: e.value.modelValue[r.key],
              "onUpdate:modelValue": (F) => e.value.modelValue[r.key] = F,
              ref_for: !0
            }, r.field, {
              ref_for: !0,
              ref_key: "fieldsRefs",
              ref: a
            }), null, 16, ["modelValue", "onUpdate:modelValue"]))), 256)),
            i.value ? (o(), n(B, h(m({ key: 1 }, i.value)), null, 16)) : V("", !0)
          ])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
}), q = {
  install: (t) => {
    t.component("lkt-form") === void 0 && t.component("lkt-form", I);
  }
}, A = (t) => {
  S(t);
};
export {
  q as default,
  A as setCanvas
};

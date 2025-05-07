import { defineComponent as $, ref as V, watch as y, computed as B, onMounted as q, nextTick as A, resolveComponent as _, createBlock as d, openBlock as a, resolveDynamicComponent as O, mergeProps as c, withCtx as w, createElementVNode as G, createCommentVNode as g, createElementBlock as D, renderSlot as I, normalizeProps as E, Fragment as H, renderList as J } from "vue";
import { setModalCanvas as K } from "lkt-vue-kernel";
const Q = { class: "lkt-grid-1" }, W = /* @__PURE__ */ $({
  __name: "LktForm",
  props: {
    modelValue: {},
    form: {},
    valid: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:form", "update:valid"],
  setup(m, { expose: M, emit: N }) {
    const l = m, k = N, r = V(l.modelValue), i = V(null), u = V(l.valid);
    y(() => l.valid, (e) => {
      u.value = e;
    }), y(u, (e) => {
      k("update:valid", e);
    });
    const h = () => {
      let e = !0, o = [];
      if (o = l.form.items.reduce((n, p, f) => n.concat(p.type === "form" ? f : []), []), o.length > 0)
        for (let n in o)
          e = e && i.value[o[n]].isValid();
      if (!e) {
        u.value = e;
        return;
      }
      if (o = l.form.items.reduce((n, p, f) => n.concat(p.type === "field" ? f : []), []), o.length > 0)
        for (let n in o)
          e = e && i.value[o[n]].isFormValid();
      u.value = e, k("update:valid", e);
    };
    y(() => l.modelValue, (e) => {
      r.value = e;
    }), y(r, (e) => {
      k("update:modelValue", e);
    }, { deep: !0 });
    const P = B(() => !u.value), U = B(() => ({
      ...l.form.submitButton,
      disabled: P.value
    })), b = V([]), z = B(() => typeof l.form.header == "object" && Object.keys(l.form.header).length > 0);
    return M({
      isValid: () => u.value
    }), q(() => {
      A(() => {
        h();
      }), k("update:valid", u.value);
    }), (e, o) => {
      var F, j, R;
      const n = _("lkt-header"), p = _("lkt-field"), f = _("lkt-form", !0), T = _("lkt-button");
      return a(), d(O(((F = e.form.container) == null ? void 0 : F.tag) ?? "section"), c({
        class: ["lkt-form-container", (j = e.form.container) == null ? void 0 : j.class]
      }, (R = e.form.container) == null ? void 0 : R.props), {
        default: w(() => {
          var S;
          return [
            G("form", Q, [
              z.value ? (a(), d(n, E(c({ key: 0 }, e.form.header)), null, 16)) : g("", !0),
              (a(!0), D(H, null, J(e.form.items, (t, v) => {
                var L;
                return a(), D(H, null, [
                  t.type === "field" ? (a(), d(p, c({
                    key: 0,
                    modelValue: r.value[t.key],
                    "onUpdate:modelValue": (s) => r.value[t.key] = s,
                    ref_for: !0
                  }, t.field, {
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: i,
                    key: v,
                    onValidating: () => {
                      b.value.push(t.key);
                    },
                    onValidation: () => {
                      b.value.splice(b.value.indexOf(t.key), 1);
                    },
                    onValidationStatus: h
                  }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])) : t.type === "form" ? (a(), d(f, {
                    modelValue: r.value,
                    "onUpdate:modelValue": o[0] || (o[0] = (s) => r.value = s),
                    form: e.form.items[v].form,
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: i,
                    key: v,
                    "onUpdate:valid": h
                  }, null, 8, ["modelValue", "form"])) : t.type === "component" ? (a(), d(O((L = t.component) == null ? void 0 : L.tag), c({
                    key: 2,
                    ref_for: !0
                  }, t.component.props, {
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: i,
                    key: v
                  }), {
                    default: w(() => {
                      var s;
                      return [
                        Object.keys((s = t.component) == null ? void 0 : s.form).length > 0 ? (a(), d(f, {
                          key: 0,
                          modelValue: r.value,
                          "onUpdate:modelValue": o[1] || (o[1] = (C) => r.value = C),
                          form: t.component.form,
                          "onUpdate:form": (C) => t.component.form = C
                        }, null, 8, ["modelValue", "form", "onUpdate:form"])) : g("", !0)
                      ];
                    }),
                    _: 2
                  }, 1040)) : g("", !0)
                ], 64);
              }), 256)),
              I(e.$slots, "default"),
              typeof ((S = e.form) == null ? void 0 : S.submitButton) == "object" && U.value ? (a(), d(T, E(c({ key: 1 }, U.value)), null, 16)) : g("", !0)
            ])
          ];
        }),
        _: 3
      }, 16, ["class"]);
    };
  }
}), Z = {
  install: (m) => {
    m.component("lkt-form") === void 0 && m.component("lkt-form", W);
  }
}, x = (m) => {
  K(m);
};
export {
  Z as default,
  x as setCanvas
};

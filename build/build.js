import { defineComponent as oe, ref as g, watch as C, computed as f, onMounted as te, nextTick as le, resolveComponent as h, createBlock as s, createCommentVNode as k, openBlock as r, resolveDynamicComponent as H, mergeProps as p, withCtx as z, createElementVNode as ae, createElementBlock as B, renderSlot as ne, normalizeProps as K, Fragment as F, renderList as ie } from "vue";
import { ModificationView as y, ColumnType as I, extractI18nValue as de, setModalCanvas as re } from "lkt-vue-kernel";
import { DataState as ue } from "lkt-data-state";
const fe = { class: "lkt-grid-1" }, se = /* @__PURE__ */ oe({
  __name: "LktForm",
  props: {
    modelValue: {},
    modifications: {},
    form: {},
    valid: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    modificationView: { default: y.Current },
    editableViews: { default: () => [] },
    modificationDataState: { default: () => new ue({}) }
  },
  emits: [
    "update:modelValue",
    "update:modifications",
    "update:form",
    "update:valid"
  ],
  setup(b, { expose: q, emit: A }) {
    const t = b, U = A, u = g(t.modelValue), c = g(t.modifications), V = g(null), v = g(t.valid);
    C(() => t.valid, (e) => {
      v.value = e;
    }), C(v, (e) => {
      U("update:valid", e);
    });
    const _ = () => {
      let e = !0, l = [];
      if (t.form) {
        if (l = t.form.items.reduce((n, i, d) => n.concat(i.type === "form" ? d : []), []), l.length > 0)
          for (let n in l)
            e = e && V.value[l[n]].isValid();
        if (!e) {
          v.value = e;
          return;
        }
        if (l = t.form.items.reduce((n, i, d) => n.concat(i.type === "field" ? d : []), []), l.length > 0)
          for (let n in l)
            e = e && V.value[l[n]].isFormValid();
        v.value = e, U("update:valid", e);
      }
    };
    C(() => t.modelValue, (e) => {
      u.value = e;
    }), C(u, (e) => {
      D(), U("update:modelValue", e);
    }, { deep: !0 }), C(() => t.modifications, (e) => {
      c.value = e;
    }, { deep: !0 }), C(c, (e) => {
      D(), U("update:modifications", e);
    }, { deep: !0 });
    const G = f(() => !v.value), j = f(() => {
      var e;
      return t.form ? {
        ...(e = t.form) == null ? void 0 : e.submitButton,
        disabled: G.value
      } : {};
    }), m = g([]), J = f(() => {
      var e, l;
      return typeof ((e = t.form) == null ? void 0 : e.header) == "object" && Object.keys((l = t.form) == null ? void 0 : l.header).length > 0;
    }), M = g([]), Q = [
      {
        key: "datum",
        label: "Datum",
        type: I.None
      },
      {
        key: "current",
        label: "Current",
        type: I.Field,
        field: "prop:field"
      },
      {
        key: "modification",
        label: "Modification",
        type: I.Field,
        field: "prop:field"
      }
    ], W = f(() => t.modificationView === y.Differences), X = f(() => t.modificationView === y.SplitView), Y = f(() => t.modificationView === y.Modifications), Z = f(() => t.modificationView === y.Current), O = f(() => {
      let e = [];
      if (X.value)
        e = t.form.items.reduce((l, n, i) => l.concat(n.type === "field" ? i : []), []);
      else if (W.value) {
        let l = t.modificationDataState.getChangedProperties();
        e = t.form.items.reduce((n, i, d) => n.concat(i.type === "field" && l.includes(i.key) ? d : []), []);
      }
      return D(e), e;
    }), R = f(() => !(t.editableViews.length === 0 || t.editableViews.includes(y.Current))), L = f(() => !(t.editableViews.length === 0 || t.editableViews.includes(y.Modifications))), D = (e) => {
      M.value = [];
      let l = [];
      if (e || (e = O.value), e.length > 0)
        for (let n in e) {
          let i = e[n], d = t.form.items[i];
          l.push({
            datum: de(d.field.label),
            current: u.value[d.key],
            modification: c.value[d.key],
            field: d.field
          });
        }
      M.value = l;
    };
    return q({
      isValid: () => v.value
    }), te(() => {
      le(() => {
        _();
      }), U("update:valid", v.value);
    }), (e, l) => {
      var N, P, T;
      const n = h("lkt-header"), i = h("lkt-field"), d = h("lkt-form", !0), x = h("lkt-table"), ee = h("lkt-button");
      return typeof e.form == "object" && Object.keys(e.form).length > 0 ? (r(), s(H(((N = e.form.container) == null ? void 0 : N.tag) ?? "section"), p({
        key: 0,
        class: ["lkt-form-container", (P = e.form.container) == null ? void 0 : P.class]
      }, (T = e.form.container) == null ? void 0 : T.props), {
        default: z(() => {
          var $;
          return [
            ae("form", fe, [
              J.value ? (r(), s(n, K(p({ key: 0 }, e.form.header)), null, 16)) : k("", !0),
              (r(!0), B(F, null, ie(e.form.items, (o, w) => {
                var E;
                return r(), B(F, null, [
                  o.type === "field" ? (r(), B(F, { key: 0 }, [
                    Z.value ? (r(), s(i, p({
                      key: 0,
                      modelValue: u.value[o.key],
                      "onUpdate:modelValue": (a) => u.value[o.key] = a,
                      options: o.field.options,
                      "onUpdate:options": (a) => o.field.options = a,
                      ref_for: !0
                    }, {
                      ...o.field,
                      readMode: () => {
                        var a;
                        return t.disabled ? t.disabled : R.value ? R.value : (a = o.field) == null ? void 0 : a.readMode;
                      }
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: V,
                      key: `${w}-current`,
                      onValidating: () => {
                        m.value.push(o.key);
                      },
                      onValidation: () => {
                        m.value.splice(m.value.indexOf(o.key), 1);
                      },
                      onValidationStatus: _
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])) : Y.value ? (r(), s(i, p({
                      key: 1,
                      modelValue: c.value[o.key],
                      "onUpdate:modelValue": (a) => c.value[o.key] = a,
                      options: o.field.options,
                      "onUpdate:options": (a) => o.field.options = a,
                      ref_for: !0
                    }, {
                      ...o.field,
                      readMode: () => {
                        var a;
                        return t.disabled ? t.disabled : L.value ? L.value : (a = o.field) == null ? void 0 : a.readMode;
                      }
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: V,
                      key: `${w}-modifications`,
                      onValidating: () => {
                        m.value.push(o.key);
                      },
                      onValidation: () => {
                        m.value.splice(m.value.indexOf(o.key), 1);
                      },
                      onValidationStatus: _
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])) : k("", !0)
                  ], 64)) : o.type === "field" ? (r(), s(i, p({
                    key: 1,
                    modelValue: u.value[o.key],
                    "onUpdate:modelValue": (a) => u.value[o.key] = a,
                    ref_for: !0
                  }, {
                    ...o.field,
                    readMode: () => {
                      var a;
                      return t.disabled ? t.disabled : (a = o.field) == null ? void 0 : a.readMode;
                    }
                  }, {
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: V,
                    key: w,
                    onValidating: () => {
                      m.value.push(o.key);
                    },
                    onValidation: () => {
                      m.value.splice(m.value.indexOf(o.key), 1);
                    },
                    onValidationStatus: _
                  }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])) : o.type === "form" ? (r(), s(d, {
                    modelValue: u.value,
                    "onUpdate:modelValue": l[0] || (l[0] = (a) => u.value = a),
                    modifications: c.value,
                    "onUpdate:modifications": l[1] || (l[1] = (a) => c.value = a),
                    form: e.form.items[w].form,
                    "modification-view": e.modificationView,
                    "modification-data-state": e.modificationDataState,
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: V,
                    key: w,
                    disabled: e.disabled,
                    "editable-views": e.editableViews,
                    "onUpdate:valid": _
                  }, null, 8, ["modelValue", "modifications", "form", "modification-view", "modification-data-state", "disabled", "editable-views"])) : o.type === "component" ? (r(), s(H((E = o.component) == null ? void 0 : E.tag), p({
                    key: 3,
                    ref_for: !0
                  }, o.component.props, {
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: V,
                    key: w
                  }), {
                    default: z(() => {
                      var a;
                      return [
                        Object.keys((a = o.component) == null ? void 0 : a.form).length > 0 ? (r(), s(d, {
                          key: 0,
                          modelValue: u.value,
                          "onUpdate:modelValue": l[2] || (l[2] = (S) => u.value = S),
                          form: o.component.form,
                          "onUpdate:form": (S) => o.component.form = S
                        }, null, 8, ["modelValue", "form", "onUpdate:form"])) : k("", !0)
                      ];
                    }),
                    _: 2
                  }, 1040)) : k("", !0)
                ], 64);
              }), 256)),
              O.value.length > 0 ? (r(), s(x, p({
                key: 1,
                modelValue: M.value,
                "onUpdate:modelValue": l[3] || (l[3] = (o) => M.value = o)
              }, {
                columns: Q
              }), null, 16, ["modelValue"])) : k("", !0),
              ne(e.$slots, "default"),
              typeof (($ = e.form) == null ? void 0 : $.submitButton) == "object" && j.value ? (r(), s(ee, K(p({ key: 2 }, j.value)), null, 16)) : k("", !0)
            ])
          ];
        }),
        _: 3
      }, 16, ["class"])) : k("", !0);
    };
  }
}), Ve = {
  install: (b) => {
    b.component("lkt-form") === void 0 && b.component("lkt-form", se);
  }
}, ve = (b) => {
  re(b);
};
export {
  Ve as default,
  ve as setCanvas
};

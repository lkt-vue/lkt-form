import { defineComponent as x, ref as b, watch as _, computed as m, onMounted as ee, nextTick as oe, resolveComponent as C, createBlock as f, createCommentVNode as v, openBlock as r, resolveDynamicComponent as $, mergeProps as p, withCtx as E, createElementVNode as te, createElementBlock as F, renderSlot as le, normalizeProps as H, Fragment as I, renderList as ne } from "vue";
import { ModificationView as h, ColumnType as j, extractI18nValue as ae, setModalCanvas as ie } from "lkt-vue-kernel";
import { DataState as de } from "lkt-data-state";
const re = { class: "lkt-grid-1" }, ue = /* @__PURE__ */ x({
  __name: "LktForm",
  props: {
    modelValue: {},
    modifications: {},
    form: {},
    valid: { type: Boolean, default: !1 },
    modificationView: { default: h.Current },
    modificationDataState: { default: () => new de({}) }
  },
  emits: [
    "update:modelValue",
    "update:modifications",
    "update:form",
    "update:valid"
  ],
  setup(y, { expose: z, emit: K }) {
    const l = y, w = K, u = b(l.modelValue), c = b(l.modifications), V = b(null), k = b(l.valid);
    _(() => l.valid, (e) => {
      k.value = e;
    }), _(k, (e) => {
      w("update:valid", e);
    });
    const U = () => {
      let e = !0, t = [];
      if (l.form) {
        if (t = l.form.items.reduce((a, d, i) => a.concat(d.type === "form" ? i : []), []), t.length > 0)
          for (let a in t)
            e = e && V.value[t[a]].isValid();
        if (!e) {
          k.value = e;
          return;
        }
        if (t = l.form.items.reduce((a, d, i) => a.concat(d.type === "field" ? i : []), []), t.length > 0)
          for (let a in t)
            e = e && V.value[t[a]].isFormValid();
        k.value = e, w("update:valid", e);
      }
    };
    _(() => l.modelValue, (e) => {
      u.value = e;
    }), _(u, (e) => {
      D(), w("update:modelValue", e);
    }, { deep: !0 }), _(() => l.modifications, (e) => {
      c.value = e;
    }), _(c, (e) => {
      D(), w("update:modifications", e);
    }, { deep: !0 });
    const q = m(() => !k.value), M = m(() => {
      var e;
      return l.form ? {
        ...(e = l.form) == null ? void 0 : e.submitButton,
        disabled: q.value
      } : {};
    }), s = b([]), A = m(() => {
      var e, t;
      return typeof ((e = l.form) == null ? void 0 : e.header) == "object" && Object.keys((t = l.form) == null ? void 0 : t.header).length > 0;
    }), S = b([]), G = [
      {
        key: "datum",
        label: "Datum",
        type: j.None
      },
      {
        key: "current",
        label: "Current",
        type: j.Field,
        field: "prop:field"
      },
      {
        key: "modification",
        label: "Modification",
        type: j.Field,
        field: "prop:field"
      }
    ], J = m(() => l.modificationView === h.Differences), Q = m(() => l.modificationView === h.SplitView), W = m(() => l.modificationView === h.Modifications), X = m(() => l.modificationView === h.Current), O = m(() => {
      let e = [], t = l.modificationDataState.getChangedProperties();
      return Q.value ? e = l.form.items.reduce((a, d, i) => a.concat(d.type === "field" ? i : []), []) : J.value && (e = l.form.items.reduce((a, d, i) => a.concat(d.type === "field" && t.includes(d.key) ? i : []), [])), D(e), e;
    }), D = (e) => {
      S.value = [];
      let t = [];
      if (e || (e = O.value), e.length > 0)
        for (let a in e) {
          let d = e[a], i = l.form.items[d];
          t.push({
            datum: ae(i.field.label),
            current: u.value[i.key],
            modification: c.value[i.key],
            field: i.field
          });
        }
      S.value = t;
    };
    return z({
      isValid: () => k.value
    }), ee(() => {
      oe(() => {
        U();
      }), w("update:valid", k.value);
    }), (e, t) => {
      var R, L, N;
      const a = C("lkt-header"), d = C("lkt-field"), i = C("lkt-form", !0), Y = C("lkt-table"), Z = C("lkt-button");
      return typeof e.form == "object" && Object.keys(e.form).length > 0 ? (r(), f($(((R = e.form.container) == null ? void 0 : R.tag) ?? "section"), p({
        key: 0,
        class: ["lkt-form-container", (L = e.form.container) == null ? void 0 : L.class]
      }, (N = e.form.container) == null ? void 0 : N.props), {
        default: E(() => {
          var P;
          return [
            te("form", re, [
              A.value ? (r(), f(a, H(p({ key: 0 }, e.form.header)), null, 16)) : v("", !0),
              (r(!0), F(I, null, ne(e.form.items, (o, g) => {
                var T;
                return r(), F(I, null, [
                  o.type === "field" ? (r(), F(I, { key: 0 }, [
                    X.value ? (r(), f(d, p({
                      key: 0,
                      modelValue: u.value[o.key],
                      "onUpdate:modelValue": (n) => u.value[o.key] = n,
                      options: o.field.options,
                      "onUpdate:options": (n) => o.field.options = n,
                      ref_for: !0
                    }, o.field, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: V,
                      key: `${g}-current`,
                      onValidating: () => {
                        s.value.push(o.key);
                      },
                      onValidation: () => {
                        s.value.splice(s.value.indexOf(o.key), 1);
                      },
                      onValidationStatus: U
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])) : W.value ? (r(), f(d, p({
                      key: 1,
                      modelValue: c.value[o.key],
                      "onUpdate:modelValue": (n) => c.value[o.key] = n,
                      options: o.field.options,
                      "onUpdate:options": (n) => o.field.options = n,
                      ref_for: !0
                    }, o.field, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: V,
                      key: `${g}-modifications`,
                      onValidating: () => {
                        s.value.push(o.key);
                      },
                      onValidation: () => {
                        s.value.splice(s.value.indexOf(o.key), 1);
                      },
                      onValidationStatus: U
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])) : v("", !0)
                  ], 64)) : o.type === "field" ? (r(), f(d, p({
                    key: 1,
                    modelValue: u.value[o.key],
                    "onUpdate:modelValue": (n) => u.value[o.key] = n,
                    ref_for: !0
                  }, o.field, {
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: V,
                    key: g,
                    onValidating: () => {
                      s.value.push(o.key);
                    },
                    onValidation: () => {
                      s.value.splice(s.value.indexOf(o.key), 1);
                    },
                    onValidationStatus: U
                  }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])) : o.type === "form" ? (r(), f(i, {
                    modelValue: u.value,
                    "onUpdate:modelValue": t[0] || (t[0] = (n) => u.value = n),
                    modifications: c.value,
                    "onUpdate:modifications": t[1] || (t[1] = (n) => c.value = n),
                    form: e.form.items[g].form,
                    "modification-view": e.modificationView,
                    "modification-data-state": e.modificationDataState,
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: V,
                    key: g,
                    "onUpdate:valid": U
                  }, null, 8, ["modelValue", "modifications", "form", "modification-view", "modification-data-state"])) : o.type === "component" ? (r(), f($((T = o.component) == null ? void 0 : T.tag), p({
                    key: 3,
                    ref_for: !0
                  }, o.component.props, {
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: V,
                    key: g
                  }), {
                    default: E(() => {
                      var n;
                      return [
                        Object.keys((n = o.component) == null ? void 0 : n.form).length > 0 ? (r(), f(i, {
                          key: 0,
                          modelValue: u.value,
                          "onUpdate:modelValue": t[2] || (t[2] = (B) => u.value = B),
                          form: o.component.form,
                          "onUpdate:form": (B) => o.component.form = B
                        }, null, 8, ["modelValue", "form", "onUpdate:form"])) : v("", !0)
                      ];
                    }),
                    _: 2
                  }, 1040)) : v("", !0)
                ], 64);
              }), 256)),
              O.value.length > 0 ? (r(), f(Y, p({
                key: 1,
                modelValue: S.value,
                "onUpdate:modelValue": t[3] || (t[3] = (o) => S.value = o)
              }, {
                columns: G
              }), null, 16, ["modelValue"])) : v("", !0),
              le(e.$slots, "default"),
              typeof ((P = e.form) == null ? void 0 : P.submitButton) == "object" && M.value ? (r(), f(Z, H(p({ key: 2 }, M.value)), null, 16)) : v("", !0)
            ])
          ];
        }),
        _: 3
      }, 16, ["class"])) : v("", !0);
    };
  }
}), pe = {
  install: (y) => {
    y.component("lkt-form") === void 0 && y.component("lkt-form", ue);
  }
}, ce = (y) => {
  ie(y);
};
export {
  pe as default,
  ce as setCanvas
};

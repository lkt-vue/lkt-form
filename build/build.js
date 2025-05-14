import { defineComponent as ue, ref as m, watch as D, computed as f, onMounted as fe, nextTick as se, resolveComponent as h, createBlock as c, createCommentVNode as p, openBlock as r, resolveDynamicComponent as G, mergeProps as v, withCtx as J, createElementVNode as ce, createElementBlock as F, renderSlot as pe, normalizeProps as Q, Fragment as S, renderList as me, withDirectives as R, vShow as j } from "vue";
import { ModificationView as k, FormInstance as W, ColumnType as P, extractI18nValue as ve, setModalCanvas as ye } from "lkt-vue-kernel";
import { DataState as Ve } from "lkt-data-state";
const ke = { class: "lkt-grid-1" }, be = /* @__PURE__ */ ue({
  __name: "LktForm",
  props: {
    modelValue: {},
    modifications: {},
    form: {},
    valid: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    visibleView: { default: k.Current },
    editableViews: { default: () => [] },
    modificationDataState: { default: () => new Ve({}) },
    differencesTableConfig: {}
  },
  emits: [
    "update:modelValue",
    "update:modifications",
    "update:form",
    "update:valid"
  ],
  setup(b, { expose: X, emit: Y }) {
    const o = b, _ = Y, i = m(new W(o.form));
    D(() => o.form, (e) => {
      i.value = new W(e);
    }, { deep: !0 });
    const s = m(o.modelValue), y = m(o.modifications), g = m(null), V = m(o.valid);
    D(() => o.valid, (e) => {
      V.value = e;
    }), D(V, (e) => {
      _("update:valid", e);
    });
    const B = m([]);
    D(() => o.modificationDataState, (e) => {
      B.value = o.modificationDataState.getChangedProperties();
    }, { deep: !0 });
    const U = () => {
      let e = !0, n = [];
      if (i.value) {
        if (n = i.value.items.reduce((a, u, d) => a.concat(u.type === "form" ? d : []), []), n.length > 0)
          for (let a in n)
            e = e && g.value[n[a]].isValid();
        if (!e) {
          V.value = e;
          return;
        }
        if (n = i.value.items.reduce((a, u, d) => a.concat(u.type === "field" ? d : []), []), n.length > 0)
          for (let a in n)
            e = e && g.value[n[a]].isFormValid();
        V.value = e, _("update:valid", e);
      }
    };
    D(s, (e) => {
      O(), _("update:modelValue", e);
    }, { deep: !0 }), D(y, (e) => {
      O(), _("update:modifications", e);
    }, { deep: !0 });
    const Z = f(() => !V.value), x = f(() => {
      var e;
      return o.form ? {
        ...(e = o.form) == null ? void 0 : e.submitButton,
        disabled: Z.value
      } : {};
    }), w = m([]), ee = f(() => {
      var e, n;
      return typeof ((e = o.form) == null ? void 0 : e.header) == "object" && Object.keys((n = o.form) == null ? void 0 : n.header).length > 0;
    }), M = m([]), te = [
      {
        key: "datum",
        label: "Datum",
        type: P.None,
        isForAccordionHeader: !0
      },
      {
        key: "current",
        label: "Current",
        type: P.Field,
        field: "prop:field"
      },
      {
        key: "modification",
        label: "Modification",
        type: P.Field,
        field: "prop:modificationsField"
      }
    ], oe = f(() => o.visibleView === k.Differences), ne = f(() => o.visibleView === k.SplitView), le = f(() => o.visibleView === k.Modifications), ae = f(() => o.visibleView === k.Current), H = f(() => {
      let e = [];
      return ne.value ? e = i.value.items.reduce((n, a, u) => n.concat(a.type === "field" ? u : []), []) : oe.value && (e = i.value.items.reduce((n, a, u) => n.concat(a.type === "field" && B.value.includes(a.key) ? u : []), [])), O(e), e;
    }), L = f(() => !(o.editableViews.length === 0 || o.editableViews.includes(k.Current))), N = f(() => !(o.editableViews.length === 0 || o.editableViews.includes(k.Modifications))), ie = f(() => {
      let e = {
        columns: te
      };
      return typeof o.differencesTableConfig == "function" ? o.differencesTableConfig(e) : typeof o.differencesTableConfig == "object" && Object.keys(o.differencesTableConfig).length > 0 ? {
        ...o.differencesTableConfig,
        ...e
      } : e;
    }), O = (e) => {
      M.value = [];
      let n = [];
      if (e || (e = H.value), e.length > 0)
        for (let a in e) {
          let u = e[a], d = i.value.items[u];
          n.push({
            datum: ve(d.field.label),
            current: s.value[d.key],
            modification: y.value[d.key],
            field: d.field,
            modificationsField: {
              ...d.field,
              ...d.modificationsField
            }
          });
        }
      M.value = n;
    };
    X({
      isValid: () => V.value
    }), fe(() => {
      se(() => {
        U(), B.value = o.modificationDataState.getChangedProperties();
      }), _("update:valid", V.value);
    });
    const T = (e) => typeof e.canRender > "u" ? !0 : typeof e.canRender == "function" ? e.canRender() : e.canRender, I = (e) => typeof e.canDisplay > "u" ? !0 : typeof e.canDisplay == "function" ? e.canDisplay() : e.canDisplay;
    return (e, n) => {
      var E, z, A;
      const a = h("lkt-header"), u = h("lkt-field"), d = h("lkt-form", !0), re = h("lkt-table"), de = h("lkt-button");
      return typeof i.value == "object" && Object.keys(i.value).length > 0 ? (r(), c(G(((E = i.value.container) == null ? void 0 : E.tag) ?? "section"), v({
        key: 0,
        class: ["lkt-form-container", (z = i.value.container) == null ? void 0 : z.class]
      }, (A = i.value.container) == null ? void 0 : A.props), {
        default: J(() => {
          var K;
          return [
            ce("form", ke, [
              ee.value ? (r(), c(a, Q(v({ key: 0 }, i.value.header)), null, 16)) : p("", !0),
              (r(!0), F(S, null, me(i.value.items, (t, C) => {
                var q;
                return r(), F(S, {
                  key: `${C}-${t.type}-${t.key}`
                }, [
                  t.type === "field" ? (r(), F(S, { key: 0 }, [
                    ae.value && T(t) ? R((r(), c(u, v({
                      key: 0,
                      modelValue: s.value[t.key],
                      "onUpdate:modelValue": (l) => s.value[t.key] = l,
                      options: t.field.options,
                      "onUpdate:options": (l) => t.field.options = l,
                      ref_for: !0
                    }, {
                      ...t.field,
                      readMode: () => {
                        var l;
                        return o.disabled ? o.disabled : L.value ? L.value : (l = t.field) == null ? void 0 : l.readMode;
                      },
                      prop: s.value
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: `${C}-current`,
                      onValidating: () => {
                        w.value.push(t.key);
                      },
                      onValidation: () => {
                        w.value.splice(w.value.indexOf(t.key), 1);
                      },
                      onValidationStatus: U
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                      [j, I(t)]
                    ]) : le.value && T(t) ? R((r(), c(u, v({
                      key: 1,
                      modelValue: y.value[t.key],
                      "onUpdate:modelValue": (l) => y.value[t.key] = l,
                      options: t.modificationsField.options,
                      "onUpdate:options": (l) => t.modificationsField.options = l,
                      ref_for: !0
                    }, {
                      ...t.field,
                      ...t.modificationsField,
                      readMode: () => {
                        var l;
                        return o.disabled ? o.disabled : N.value ? N.value : (l = t.field) == null ? void 0 : l.readMode;
                      },
                      prop: y.value
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: `${C}-modifications`,
                      onValidating: () => {
                        w.value.push(t.key);
                      },
                      onValidation: () => {
                        w.value.splice(w.value.indexOf(t.key), 1);
                      },
                      onValidationStatus: U
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                      [j, I(t)]
                    ]) : p("", !0)
                  ], 64)) : t.type === "form" ? (r(), F(S, { key: 1 }, [
                    T(t) ? R((r(), c(d, v({
                      key: 0,
                      modelValue: s.value,
                      "onUpdate:modelValue": n[0] || (n[0] = (l) => s.value = l),
                      modifications: y.value,
                      "onUpdate:modifications": n[1] || (n[1] = (l) => y.value = l),
                      ref_for: !0
                    }, {
                      form: i.value.items[C].form,
                      visibleView: e.visibleView,
                      modificationDataState: e.modificationDataState,
                      disabled: e.disabled,
                      editableViews: e.editableViews,
                      differencesTableConfig: e.differencesTableConfig
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: C,
                      "onUpdate:valid": U
                    }), null, 16, ["modelValue", "modifications"])), [
                      [j, I(t)]
                    ]) : p("", !0)
                  ], 64)) : t.type === "component" ? (r(), F(S, { key: 2 }, [
                    T(t) ? R((r(), c(G((q = t.component) == null ? void 0 : q.tag), v({
                      key: 0,
                      ref_for: !0
                    }, t.component.props, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: C
                    }), {
                      default: J(() => {
                        var l;
                        return [
                          Object.keys((l = t.component) == null ? void 0 : l.form).length > 0 ? (r(), c(d, {
                            key: 0,
                            modelValue: s.value,
                            "onUpdate:modelValue": n[2] || (n[2] = ($) => s.value = $),
                            form: t.component.form,
                            "onUpdate:form": ($) => t.component.form = $
                          }, null, 8, ["modelValue", "form", "onUpdate:form"])) : p("", !0)
                        ];
                      }),
                      _: 2
                    }, 1040)), [
                      [j, I(t)]
                    ]) : p("", !0)
                  ], 64)) : p("", !0)
                ], 64);
              }), 128)),
              H.value.length > 0 ? (r(), c(re, v({
                key: 1,
                modelValue: M.value,
                "onUpdate:modelValue": n[3] || (n[3] = (t) => M.value = t)
              }, {
                ...ie.value
              }), null, 16, ["modelValue"])) : p("", !0),
              pe(e.$slots, "default"),
              typeof ((K = e.form) == null ? void 0 : K.submitButton) == "object" && x.value ? (r(), c(de, Q(v({ key: 2 }, x.value)), null, 16)) : p("", !0)
            ])
          ];
        }),
        _: 3
      }, 16, ["class"])) : p("", !0);
    };
  }
}), De = {
  install: (b) => {
    b.component("lkt-form") === void 0 && b.component("lkt-form", be);
  }
}, _e = (b) => {
  ye(b);
};
export {
  De as default,
  _e as setCanvas
};

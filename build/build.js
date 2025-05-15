import { defineComponent as ce, ref as b, watch as S, computed as f, onMounted as pe, nextTick as ve, resolveComponent as R, createBlock as v, createCommentVNode as V, openBlock as i, resolveDynamicComponent as J, mergeProps as m, withCtx as Q, createElementVNode as me, normalizeProps as W, normalizeClass as ye, createElementBlock as w, renderSlot as Ve, Fragment as D, renderList as ke, withDirectives as U, vShow as M } from "vue";
import { ModificationView as h, FormInstance as X, ColumnType as P, extractI18nValue as be, setModalCanvas as ge } from "lkt-vue-kernel";
import { DataState as Ce } from "lkt-data-state";
const we = /* @__PURE__ */ ce({
  __name: "LktForm",
  props: {
    modelValue: {},
    modifications: {},
    form: {},
    valid: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    class: {},
    formClass: {},
    visibleView: { default: h.Current },
    editableViews: { default: () => [] },
    modificationDataState: { default: () => new Ce({}) },
    differencesTableConfig: {}
  },
  emits: [
    "update:modelValue",
    "update:modifications",
    "update:form",
    "update:valid"
  ],
  setup(_, { expose: Y, emit: Z }) {
    const a = _, T = Z, n = b(new X(a.form));
    S(() => a.form, (e) => {
      n.value = new X(e);
    }, { deep: !0 });
    const s = b(a.modelValue), c = b(a.modifications), k = b(null), g = b(a.valid);
    S(() => a.valid, (e) => {
      g.value = e;
    }), S(g, (e) => {
      T("update:valid", e);
    });
    const B = b([]);
    S(() => a.modificationDataState, (e) => {
      B.value = a.modificationDataState.getChangedProperties();
    }, { deep: !0 });
    const C = () => {
      let e = !0, l = [];
      if (n.value) {
        if (l = n.value.items.reduce((r, d, u) => r.concat(d.type === "form" ? u : []), []), l.length > 0)
          for (let r in l)
            e = e && k.value[l[r]].isValid();
        if (!e) {
          g.value = e;
          return;
        }
        if (l = n.value.items.reduce((r, d, u) => r.concat(d.type === "field" ? u : []), []), l.length > 0)
          for (let r in l)
            e = e && k.value[l[r]].isFormValid();
        g.value = e, T("update:valid", e);
      }
    };
    S(s, (e) => {
      O(), T("update:modelValue", e);
    }, { deep: !0 }), S(c, (e) => {
      O(), T("update:modifications", e);
    }, { deep: !0 });
    const ee = f(() => !g.value), H = f(() => {
      var e;
      return a.form ? {
        ...(e = a.form) == null ? void 0 : e.submitButton,
        disabled: ee.value
      } : {};
    }), p = b([]), oe = f(() => {
      var e, l;
      return typeof ((e = a.form) == null ? void 0 : e.header) == "object" && Object.keys((l = a.form) == null ? void 0 : l.header).length > 0;
    }), I = b([]), ae = [
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
    ], le = f(() => a.visibleView === h.Differences), te = f(() => a.visibleView === h.SplitView), ne = f(() => a.visibleView === h.Modifications), ie = f(() => a.visibleView === h.Current), L = f(() => {
      let e = [];
      return te.value ? e = n.value.items.reduce((l, r, d) => l.concat(r.type === "field" ? d : []), []) : le.value && (e = n.value.items.reduce((l, r, d) => l.concat(r.type === "field" && B.value.includes(r.key) ? d : []), [])), O(e), e;
    }), j = f(() => !(a.editableViews.length === 0 || a.editableViews.includes(h.Current))), $ = f(() => !(a.editableViews.length === 0 || a.editableViews.includes(h.Modifications))), re = f(() => {
      let e = {
        columns: ae
      };
      return typeof a.differencesTableConfig == "function" ? a.differencesTableConfig(e) : typeof a.differencesTableConfig == "object" && Object.keys(a.differencesTableConfig).length > 0 ? {
        ...a.differencesTableConfig,
        ...e
      } : e;
    }), O = (e) => {
      I.value = [];
      let l = [];
      if (e || (e = L.value), e.length > 0)
        for (let r in e) {
          let d = e[r], u = n.value.items[d];
          l.push({
            datum: be(u.field.label),
            current: s.value[u.key],
            modification: c.value[u.key],
            field: u.field,
            modificationsField: {
              ...u.field,
              ...u.modificationsField
            }
          });
        }
      I.value = l;
    };
    Y({
      isValid: () => g.value
    }), pe(() => {
      ve(() => {
        C(), B.value = a.modificationDataState.getChangedProperties();
      }), T("update:valid", g.value);
    });
    const A = (e) => typeof e.canRender > "u" ? !0 : typeof e.canRender == "function" ? e.canRender() : e.canRender, F = (e) => typeof e.canDisplay > "u" ? !0 : typeof e.canDisplay == "function" ? e.canDisplay() : e.canDisplay, de = f(() => {
      var l;
      let e = [];
      return (l = n.value) != null && l.container.class && e.push(n.value.container.class), a.class && e.push(a.class), e.push(`view-is-${a.visibleView}`), e.join(" ");
    }), ue = f(() => {
      let e = [];
      return a.formClass ? e.push(a.formClass) : e.push("lkt-grid-1"), e.join(" ");
    });
    return (e, l) => {
      var z, E;
      const r = R("lkt-header"), d = R("lkt-field"), u = R("lkt-form", !0), fe = R("lkt-table"), se = R("lkt-button");
      return typeof n.value == "object" && Object.keys(n.value).length > 0 ? (i(), v(J(((z = n.value.container) == null ? void 0 : z.tag) ?? "section"), m({
        key: 0,
        class: ["lkt-form-container", de.value]
      }, (E = n.value.container) == null ? void 0 : E.props), {
        default: Q(() => {
          var K;
          return [
            oe.value ? (i(), v(r, W(m({ key: 0 }, n.value.header)), null, 16)) : V("", !0),
            me("form", {
              class: ye(ue.value)
            }, [
              (i(!0), w(D, null, ke(n.value.items, (o, y) => {
                var q;
                return i(), w(D, {
                  key: `${y}-${o.type}-${o.key}`
                }, [
                  o.type === "field" && A(o) ? (i(), w(D, { key: 0 }, [
                    ie.value ? (i(), w(D, { key: 0 }, [
                      Array.isArray(o.field.options) ? U((i(), v(d, m({
                        key: 0,
                        modelValue: s.value[o.key],
                        "onUpdate:modelValue": (t) => s.value[o.key] = t,
                        options: o.field.options,
                        "onUpdate:options": (t) => o.field.options = t,
                        ref_for: !0
                      }, {
                        ...o.field,
                        readMode: () => {
                          var t;
                          return a.disabled ? a.disabled : j.value ? j.value : (t = o.field) == null ? void 0 : t.readMode;
                        },
                        prop: s.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: k,
                        key: `${y}-current`,
                        onValidating: () => {
                          p.value.push(o.key);
                        },
                        onValidation: () => {
                          p.value.splice(p.value.indexOf(o.key), 1);
                        },
                        onValidationStatus: C
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                        [M, F(o)]
                      ]) : U((i(), v(d, m({
                        key: 1,
                        modelValue: s.value[o.key],
                        "onUpdate:modelValue": (t) => s.value[o.key] = t,
                        ref_for: !0
                      }, {
                        ...o.field,
                        readMode: () => {
                          var t;
                          return a.disabled ? a.disabled : j.value ? j.value : (t = o.field) == null ? void 0 : t.readMode;
                        },
                        prop: s.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: k,
                        key: `${y}-current-2`,
                        onValidating: () => {
                          p.value.push(o.key);
                        },
                        onValidation: () => {
                          p.value.splice(p.value.indexOf(o.key), 1);
                        },
                        onValidationStatus: C
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])), [
                        [M, F(o)]
                      ])
                    ], 64)) : V("", !0),
                    ne.value ? (i(), w(D, { key: 1 }, [
                      Array.isArray(o.modificationsField.options) ? U((i(), v(d, m({
                        key: 0,
                        modelValue: c.value[o.key],
                        "onUpdate:modelValue": (t) => c.value[o.key] = t,
                        options: o.modificationsField.options,
                        "onUpdate:options": (t) => o.modificationsField.options = t,
                        ref_for: !0
                      }, {
                        ...o.field,
                        ...o.modificationsField,
                        readMode: () => {
                          var t;
                          return a.disabled ? a.disabled : $.value ? $.value : (t = o.field) == null ? void 0 : t.readMode;
                        },
                        prop: c.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: k,
                        key: `${y}-modifications`,
                        onValidating: () => {
                          p.value.push(o.key);
                        },
                        onValidation: () => {
                          p.value.splice(p.value.indexOf(o.key), 1);
                        },
                        onValidationStatus: C
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                        [M, F(o)]
                      ]) : U((i(), v(d, m({
                        key: 1,
                        modelValue: c.value[o.key],
                        "onUpdate:modelValue": (t) => c.value[o.key] = t,
                        ref_for: !0
                      }, {
                        ...o.field,
                        ...o.modificationsField,
                        readMode: () => {
                          var t;
                          return a.disabled ? a.disabled : $.value ? $.value : (t = o.field) == null ? void 0 : t.readMode;
                        },
                        prop: c.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: k,
                        key: `${y}-modifications-2`,
                        onValidating: () => {
                          p.value.push(o.key);
                        },
                        onValidation: () => {
                          p.value.splice(p.value.indexOf(o.key), 1);
                        },
                        onValidationStatus: C
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])), [
                        [M, F(o)]
                      ])
                    ], 64)) : V("", !0)
                  ], 64)) : o.type === "form" ? (i(), w(D, { key: 1 }, [
                    A(o) ? U((i(), v(u, m({
                      key: 0,
                      modelValue: s.value,
                      "onUpdate:modelValue": l[0] || (l[0] = (t) => s.value = t),
                      modifications: c.value,
                      "onUpdate:modifications": l[1] || (l[1] = (t) => c.value = t),
                      ref_for: !0
                    }, {
                      form: n.value.items[y].form,
                      visibleView: e.visibleView,
                      modificationDataState: e.modificationDataState,
                      disabled: e.disabled,
                      editableViews: e.editableViews,
                      differencesTableConfig: e.differencesTableConfig
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: k,
                      key: y,
                      "onUpdate:valid": C
                    }), null, 16, ["modelValue", "modifications"])), [
                      [M, F(o)]
                    ]) : V("", !0)
                  ], 64)) : o.type === "component" ? (i(), w(D, { key: 2 }, [
                    A(o) ? U((i(), v(J(((q = o.component) == null ? void 0 : q.tag) ?? "section"), m({
                      key: 0,
                      ref_for: !0
                    }, o.component.props, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: k,
                      key: y
                    }), {
                      default: Q(() => {
                        var t, x, G;
                        return [
                          (G = (x = (t = n.value) == null ? void 0 : t.items[y]) == null ? void 0 : x.component) != null && G.form ? (i(), v(u, m({
                            key: 0,
                            modelValue: s.value,
                            "onUpdate:modelValue": l[2] || (l[2] = (N) => s.value = N),
                            modifications: c.value,
                            "onUpdate:modifications": l[3] || (l[3] = (N) => c.value = N),
                            ref_for: !0
                          }, {
                            form: n.value.items[y].component.form,
                            visibleView: e.visibleView,
                            modificationDataState: e.modificationDataState,
                            disabled: e.disabled,
                            editableViews: e.editableViews,
                            differencesTableConfig: e.differencesTableConfig
                          }, { "onUpdate:valid": C }), null, 16, ["modelValue", "modifications"])) : V("", !0)
                        ];
                      }),
                      _: 2
                    }, 1040)), [
                      [M, F(o)]
                    ]) : V("", !0)
                  ], 64)) : V("", !0)
                ], 64);
              }), 128)),
              L.value.length > 0 ? (i(), v(fe, m({
                key: 0,
                modelValue: I.value,
                "onUpdate:modelValue": l[4] || (l[4] = (o) => I.value = o)
              }, {
                ...re.value
              }), null, 16, ["modelValue"])) : V("", !0),
              Ve(e.$slots, "default"),
              typeof ((K = e.form) == null ? void 0 : K.submitButton) == "object" && H.value ? (i(), v(se, W(m({ key: 1 }, H.value)), null, 16)) : V("", !0)
            ], 2)
          ];
        }),
        _: 3
      }, 16, ["class"])) : V("", !0);
    };
  }
}), Fe = {
  install: (_) => {
    _.component("lkt-form") === void 0 && _.component("lkt-form", we);
  }
}, Se = (_) => {
  ge(_);
};
export {
  Fe as default,
  Se as setCanvas
};

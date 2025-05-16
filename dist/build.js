import { defineComponent as me, ref as V, watch as h, computed as c, onMounted as ye, nextTick as Ve, resolveComponent as R, createBlock as v, createCommentVNode as k, openBlock as r, resolveDynamicComponent as Z, mergeProps as m, withCtx as x, createElementVNode as ke, normalizeProps as ee, normalizeClass as be, createElementBlock as S, renderSlot as ge, Fragment as D, renderList as Ce, withDirectives as T, vShow as I } from "vue";
import { ModificationView as b, FormInstance as ae, getFormFieldsKeys as we, ColumnType as H, extractI18nValue as he, setModalCanvas as Se } from "lkt-vue-kernel";
import { DataState as oe } from "lkt-data-state";
const De = /* @__PURE__ */ me({
  __name: "LktForm",
  props: {
    modelValue: {},
    modifications: {},
    form: {},
    valid: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    changed: { type: Boolean },
    class: {},
    formClass: {},
    visibleView: { default: b.Current },
    editableViews: { default: () => [] },
    modificationDataState: { default: () => new oe({}) },
    differencesTableConfig: {},
    dataStateConfig: {}
  },
  emits: [
    "update:modelValue",
    "update:modifications",
    "update:form",
    "update:valid",
    "update:changed"
  ],
  setup(F, { expose: le, emit: te }) {
    const o = F, U = te, L = V(!1), n = V(new ae(o.form));
    h(() => o.form, (e) => {
      n.value = new ae(e);
    }, { deep: !0 });
    const d = V(o.modelValue), f = V(o.modifications), _ = V(new oe({}, {
      ...o.dataStateConfig,
      onlyProps: we(n.value)
    }));
    o.visibleView === b.Current ? _.value.increment(d.value).turnStoredIntoOriginal() : _.value.increment(f.value).turnStoredIntoOriginal();
    const g = V(null), C = V(o.valid);
    h(() => o.valid, (e) => {
      C.value = e;
    }), h(C, (e) => {
      U("update:valid", e);
    });
    const $ = V([]);
    h(() => o.modificationDataState, (e) => {
      $.value = o.modificationDataState.getChangedProperties();
    }, { deep: !0 }), h(_, (e) => {
      L.value = _.value.changed(), U("update:changed", L.value);
    }, { deep: !0 });
    const w = () => {
      let e = !0, l = [];
      if (n.value) {
        if (l = n.value.items.reduce((i, u, s) => i.concat(u.type === "form" ? s : []), []), l.length > 0)
          for (let i in l)
            e = e && g.value[l[i]].isValid();
        if (!e) {
          C.value = e;
          return;
        }
        if (l = n.value.items.reduce((i, u, s) => i.concat(u.type === "field" ? s : []), []), l.length > 0)
          for (let i in l)
            e = e && g.value[l[i]].isFormValid();
        C.value = e, U("update:valid", e);
      }
    };
    h(d, (e) => {
      o.editableViews[0] === b.Current && _.value.increment(d.value), A(), U("update:modelValue", e);
    }, { deep: !0 }), h(f, (e) => {
      o.editableViews[0] === b.Current && _.value.increment(d.value), A(), U("update:modifications", e);
    }, { deep: !0 });
    const ne = c(() => !C.value), z = c(() => {
      var e;
      return o.form ? {
        ...(e = o.form) == null ? void 0 : e.submitButton,
        disabled: ne.value
      } : {};
    }), p = V([]), ie = c(() => {
      var e, l;
      return typeof ((e = o.form) == null ? void 0 : e.header) == "object" && Object.keys((l = o.form) == null ? void 0 : l.header).length > 0;
    }), j = V([]), re = [
      {
        key: "datum",
        label: "Datum",
        type: H.None,
        isForAccordionHeader: !0
      },
      {
        key: "current",
        label: "Current",
        type: H.Field,
        field: "prop:field"
      },
      {
        key: "modification",
        label: "Modification",
        type: H.Field,
        field: "prop:modificationsField"
      }
    ], E = c(() => o.visibleView === b.Differences), K = c(() => o.visibleView === b.SplitView), de = c(() => o.visibleView === b.Modifications), ue = c(() => o.visibleView === b.Current), q = c(() => {
      let e = [];
      return K.value ? e = n.value.items.reduce((l, i, u) => l.concat(i.type === "field" ? u : []), []) : E.value && (e = n.value.items.reduce((l, i, u) => l.concat(i.type === "field" && $.value.includes(i.key) ? u : []), [])), A(e), e;
    }), B = c(() => !(o.editableViews.length === 0 || o.editableViews.includes(b.Current))), O = c(() => !(o.editableViews.length === 0 || o.editableViews.includes(b.Modifications))), fe = c(() => {
      let e = {
        columns: re
      };
      return typeof o.differencesTableConfig == "function" ? o.differencesTableConfig(e) : typeof o.differencesTableConfig == "object" && Object.keys(o.differencesTableConfig).length > 0 ? {
        ...o.differencesTableConfig,
        ...e
      } : e;
    }), A = (e) => {
      if (j.value = [], !E.value && !K.value) return;
      let l = [];
      if (e || (e = q.value), e.length > 0)
        for (let i in e) {
          let u = e[i], s = n.value.items[u];
          l.push({
            datum: he(s.field.label),
            current: d.value[s.key],
            modification: f.value[s.key],
            field: s.field,
            modificationsField: {
              ...s.field,
              ...s.modificationsField
            }
          });
        }
      j.value = l;
    };
    le({
      isValid: () => C.value
    }), ye(() => {
      Ve(() => {
        w(), $.value = o.modificationDataState.getChangedProperties();
      }), U("update:valid", C.value);
    });
    const N = (e) => typeof e.canRender > "u" ? !0 : typeof e.canRender == "function" ? e.canRender() : e.canRender, M = (e) => typeof e.canDisplay > "u" ? !0 : typeof e.canDisplay == "function" ? e.canDisplay() : e.canDisplay, se = c(() => {
      var l, i;
      let e = [];
      return (l = n.value.uiConfig) != null && l.class && e.push(n.value.uiConfig.class), (i = n.value) != null && i.container.class && e.push(n.value.container.class), o.class && e.push(o.class), e.push(`view-is-${o.visibleView}`), e.join(" ");
    }), ce = c(() => {
      var l;
      let e = [];
      return (l = n.value.uiConfig) != null && l.formClass && e.push(n.value.uiConfig.formClass), o.formClass ? e.push(o.formClass) : e.push("lkt-grid-1"), e.join(" ");
    });
    return (e, l) => {
      var G, J;
      const i = R("lkt-header"), u = R("lkt-field"), s = R("lkt-form", !0), pe = R("lkt-table"), ve = R("lkt-button");
      return typeof n.value == "object" && Object.keys(n.value).length > 0 ? (r(), v(Z(((G = n.value.container) == null ? void 0 : G.tag) ?? "section"), m({
        key: 0,
        class: ["lkt-form-container", se.value]
      }, (J = n.value.container) == null ? void 0 : J.props), {
        default: x(() => {
          var Q;
          return [
            ie.value ? (r(), v(i, ee(m({ key: 0 }, n.value.header)), null, 16)) : k("", !0),
            ke("form", {
              class: be(ce.value)
            }, [
              (r(!0), S(D, null, Ce(n.value.items, (a, y) => {
                var W;
                return r(), S(D, {
                  key: `${y}-${a.type}-${a.key}`
                }, [
                  a.type === "field" && N(a) ? (r(), S(D, { key: 0 }, [
                    ue.value ? (r(), S(D, { key: 0 }, [
                      Array.isArray(a.field.options) ? T((r(), v(u, m({
                        key: 0,
                        modelValue: d.value[a.key],
                        "onUpdate:modelValue": (t) => d.value[a.key] = t,
                        options: a.field.options,
                        "onUpdate:options": (t) => a.field.options = t,
                        ref_for: !0
                      }, {
                        ...a.field,
                        readMode: () => {
                          var t;
                          return o.disabled ? o.disabled : B.value ? B.value : (t = a.field) == null ? void 0 : t.readMode;
                        },
                        prop: d.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: g,
                        key: `${y}-current`,
                        onValidating: () => {
                          p.value.push(a.key);
                        },
                        onValidation: () => {
                          p.value.splice(p.value.indexOf(a.key), 1);
                        },
                        onValidationStatus: w
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                        [I, M(a)]
                      ]) : T((r(), v(u, m({
                        key: 1,
                        modelValue: d.value[a.key],
                        "onUpdate:modelValue": (t) => d.value[a.key] = t,
                        ref_for: !0
                      }, {
                        ...a.field,
                        readMode: () => {
                          var t;
                          return o.disabled ? o.disabled : B.value ? B.value : (t = a.field) == null ? void 0 : t.readMode;
                        },
                        prop: d.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: g,
                        key: `${y}-current-2`,
                        onValidating: () => {
                          p.value.push(a.key);
                        },
                        onValidation: () => {
                          p.value.splice(p.value.indexOf(a.key), 1);
                        },
                        onValidationStatus: w
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])), [
                        [I, M(a)]
                      ])
                    ], 64)) : k("", !0),
                    de.value ? (r(), S(D, { key: 1 }, [
                      Array.isArray(a.modificationsField.options) ? T((r(), v(u, m({
                        key: 0,
                        modelValue: f.value[a.key],
                        "onUpdate:modelValue": (t) => f.value[a.key] = t,
                        options: a.modificationsField.options,
                        "onUpdate:options": (t) => a.modificationsField.options = t,
                        ref_for: !0
                      }, {
                        ...a.field,
                        ...a.modificationsField,
                        readMode: () => {
                          var t;
                          return o.disabled ? o.disabled : O.value ? O.value : (t = a.field) == null ? void 0 : t.readMode;
                        },
                        prop: f.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: g,
                        key: `${y}-modifications`,
                        onValidating: () => {
                          p.value.push(a.key);
                        },
                        onValidation: () => {
                          p.value.splice(p.value.indexOf(a.key), 1);
                        },
                        onValidationStatus: w
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                        [I, M(a)]
                      ]) : T((r(), v(u, m({
                        key: 1,
                        modelValue: f.value[a.key],
                        "onUpdate:modelValue": (t) => f.value[a.key] = t,
                        ref_for: !0
                      }, {
                        ...a.field,
                        ...a.modificationsField,
                        readMode: () => {
                          var t;
                          return o.disabled ? o.disabled : O.value ? O.value : (t = a.field) == null ? void 0 : t.readMode;
                        },
                        prop: f.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: g,
                        key: `${y}-modifications-2`,
                        onValidating: () => {
                          p.value.push(a.key);
                        },
                        onValidation: () => {
                          p.value.splice(p.value.indexOf(a.key), 1);
                        },
                        onValidationStatus: w
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])), [
                        [I, M(a)]
                      ])
                    ], 64)) : k("", !0)
                  ], 64)) : a.type === "form" ? (r(), S(D, { key: 1 }, [
                    N(a) ? T((r(), v(s, m({
                      key: 0,
                      modelValue: d.value,
                      "onUpdate:modelValue": l[0] || (l[0] = (t) => d.value = t),
                      modifications: f.value,
                      "onUpdate:modifications": l[1] || (l[1] = (t) => f.value = t),
                      ref_for: !0
                    }, {
                      form: n.value.items[y].form,
                      visibleView: e.visibleView,
                      modificationDataState: e.modificationDataState,
                      disabled: e.disabled,
                      editableViews: e.editableViews,
                      differencesTableConfig: e.differencesTableConfig,
                      dataStateConfig: e.dataStateConfig
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: y,
                      "onUpdate:valid": w
                    }), null, 16, ["modelValue", "modifications"])), [
                      [I, M(a)]
                    ]) : k("", !0)
                  ], 64)) : a.type === "component" ? (r(), S(D, { key: 2 }, [
                    N(a) ? T((r(), v(Z(((W = a.component) == null ? void 0 : W.tag) ?? "section"), m({
                      key: 0,
                      ref_for: !0
                    }, a.component.props, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: y
                    }), {
                      default: x(() => {
                        var t, X, Y;
                        return [
                          (Y = (X = (t = n.value) == null ? void 0 : t.items[y]) == null ? void 0 : X.component) != null && Y.form ? (r(), v(s, m({
                            key: 0,
                            modelValue: d.value,
                            "onUpdate:modelValue": l[2] || (l[2] = (P) => d.value = P),
                            modifications: f.value,
                            "onUpdate:modifications": l[3] || (l[3] = (P) => f.value = P),
                            ref_for: !0
                          }, {
                            form: n.value.items[y].component.form,
                            visibleView: e.visibleView,
                            modificationDataState: e.modificationDataState,
                            disabled: e.disabled,
                            editableViews: e.editableViews,
                            differencesTableConfig: e.differencesTableConfig,
                            dataStateConfig: e.dataStateConfig
                          }, { "onUpdate:valid": w }), null, 16, ["modelValue", "modifications"])) : k("", !0)
                        ];
                      }),
                      _: 2
                    }, 1040)), [
                      [I, M(a)]
                    ]) : k("", !0)
                  ], 64)) : k("", !0)
                ], 64);
              }), 128)),
              q.value.length > 0 ? (r(), v(pe, m({
                key: 0,
                modelValue: j.value,
                "onUpdate:modelValue": l[4] || (l[4] = (a) => j.value = a)
              }, {
                ...fe.value
              }), null, 16, ["modelValue"])) : k("", !0),
              ge(e.$slots, "default"),
              typeof ((Q = e.form) == null ? void 0 : Q.submitButton) == "object" && z.value ? (r(), v(ve, ee(m({ key: 1 }, z.value)), null, 16)) : k("", !0)
            ], 2)
          ];
        }),
        _: 3
      }, 16, ["class"])) : k("", !0);
    };
  }
}), Me = {
  install: (F) => {
    F.component("lkt-form") === void 0 && F.component("lkt-form", De);
  }
}, Te = (F) => {
  Se(F);
};
export {
  Me as default,
  Te as setCanvas
};

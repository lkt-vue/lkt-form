import { defineComponent as be, useSlots as ge, ref as V, watch as S, computed as s, onMounted as Ce, nextTick as we, resolveComponent as $, createBlock as m, createCommentVNode as k, openBlock as r, resolveDynamicComponent as oe, mergeProps as v, withCtx as A, createElementVNode as Se, normalizeProps as te, normalizeClass as he, createElementBlock as h, renderSlot as N, Fragment as D, renderList as L, withDirectives as I, vShow as R, createSlots as le } from "vue";
import { ModificationView as b, FormInstance as ne, getFormFieldsKeys as De, ColumnType as z, extractI18nValue as Fe, getFormSlotKeys as Ue, setModalCanvas as _e } from "lkt-vue-kernel";
import { DataState as ie } from "lkt-data-state";
const Me = /* @__PURE__ */ be({
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
    modificationDataState: { default: () => new ie({}) },
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
  setup(F, { expose: re, emit: ue }) {
    ge();
    const o = F, U = ue, E = V(!1), n = V(new ne(o.form));
    S(() => o.form, (e) => {
      n.value = new ne(e);
    }, { deep: !0 });
    const u = V(o.modelValue), f = V(o.modifications), _ = V(new ie({}, {
      ...o.dataStateConfig,
      onlyProps: De(n.value)
    }));
    o.visibleView === b.Current ? _.value.increment(u.value).turnStoredIntoOriginal() : _.value.increment(f.value).turnStoredIntoOriginal();
    const g = V(null), C = V(o.valid);
    S(() => o.valid, (e) => {
      C.value = e;
    }), S(C, (e) => {
      U("update:valid", e);
    });
    const P = V([]);
    S(() => o.modificationDataState, (e) => {
      P.value = o.modificationDataState.getChangedProperties();
    }, { deep: !0 }), S(_, (e) => {
      E.value = _.value.changed(), U("update:changed", E.value);
    }, { deep: !0 });
    const w = () => {
      let e = !0, t = [];
      if (n.value) {
        if (t = n.value.items.reduce((i, d, c) => i.concat(d.type === "form" ? c : []), []), t.length > 0)
          for (let i in t)
            e = e && g.value[t[i]].isValid();
        if (!e) {
          C.value = e;
          return;
        }
        if (t = n.value.items.reduce((i, d, c) => i.concat(d.type === "field" ? c : []), []), t.length > 0)
          for (let i in t)
            e = e && g.value[t[i]].isFormValid();
        C.value = e, U("update:valid", e);
      }
    };
    S(u, (e) => {
      o.editableViews[0] === b.Current && _.value.increment(u.value), H(), U("update:modelValue", e);
    }, { deep: !0 }), S(f, (e) => {
      o.editableViews[0] === b.Current && _.value.increment(u.value), H(), U("update:modifications", e);
    }, { deep: !0 });
    const de = s(() => !C.value), q = s(() => {
      var e;
      return o.form ? {
        ...(e = o.form) == null ? void 0 : e.submitButton,
        disabled: de.value
      } : {};
    }), p = V([]), se = s(() => {
      var e, t;
      return typeof ((e = o.form) == null ? void 0 : e.header) == "object" && Object.keys((t = o.form) == null ? void 0 : t.header).length > 0;
    }), j = V([]), fe = [
      {
        key: "datum",
        label: "Datum",
        type: z.None,
        isForAccordionHeader: !0
      },
      {
        key: "current",
        label: "Current",
        type: z.Field,
        field: "prop:field"
      },
      {
        key: "modification",
        label: "Modification",
        type: z.Field,
        field: "prop:modificationsField"
      }
    ], G = s(() => o.visibleView === b.Differences), J = s(() => o.visibleView === b.SplitView), ce = s(() => o.visibleView === b.Modifications), pe = s(() => o.visibleView === b.Current), Q = s(() => {
      let e = [];
      return J.value ? e = n.value.items.reduce((t, i, d) => t.concat(i.type === "field" ? d : []), []) : G.value && (e = n.value.items.reduce((t, i, d) => t.concat(i.type === "field" && P.value.includes(i.key) ? d : []), [])), H(e), e;
    }), B = s(() => !(o.editableViews.length === 0 || o.editableViews.includes(b.Current))), O = s(() => !(o.editableViews.length === 0 || o.editableViews.includes(b.Modifications))), ve = s(() => {
      let e = {
        columns: fe
      };
      return typeof o.differencesTableConfig == "function" ? o.differencesTableConfig(e) : typeof o.differencesTableConfig == "object" && Object.keys(o.differencesTableConfig).length > 0 ? {
        ...o.differencesTableConfig,
        ...e
      } : e;
    }), H = (e) => {
      if (j.value = [], !G.value && !J.value) return;
      let t = [];
      if (e || (e = Q.value), e.length > 0)
        for (let i in e) {
          let d = e[i], c = n.value.items[d];
          t.push({
            datum: Fe(c.field.label),
            current: u.value[c.key],
            modification: f.value[c.key],
            field: c.field,
            modificationsField: {
              ...c.field,
              ...c.modificationsField
            }
          });
        }
      j.value = t;
    };
    re({
      isValid: () => C.value
    }), Ce(() => {
      we(() => {
        w(), P.value = o.modificationDataState.getChangedProperties();
      }), U("update:valid", C.value);
    });
    const K = (e) => typeof e.canRender > "u" ? !0 : typeof e.canRender == "function" ? e.canRender() : e.canRender, M = (e) => typeof e.canDisplay > "u" ? !0 : typeof e.canDisplay == "function" ? e.canDisplay() : e.canDisplay, me = s(() => {
      var t, i;
      let e = [];
      return (t = n.value.uiConfig) != null && t.class && e.push(n.value.uiConfig.class), (i = n.value) != null && i.container.class && e.push(n.value.container.class), o.class && e.push(o.class), e.push(`view-is-${o.visibleView}`), e.join(" ");
    }), ye = s(() => {
      var t;
      let e = [];
      return (t = n.value.uiConfig) != null && t.formClass && e.push(n.value.uiConfig.formClass), o.formClass ? e.push(o.formClass) : e.push("lkt-grid-1"), e.join(" ");
    }), W = s(() => Ue(n.value));
    return (e, t) => {
      var X, Y;
      const i = $("lkt-header"), d = $("lkt-field"), c = $("lkt-form", !0), Ve = $("lkt-table"), ke = $("lkt-button");
      return typeof n.value == "object" && Object.keys(n.value).length > 0 ? (r(), m(oe(((X = n.value.container) == null ? void 0 : X.tag) ?? "section"), v({
        key: 0,
        class: ["lkt-form-container", me.value]
      }, (Y = n.value.container) == null ? void 0 : Y.props), {
        default: A(() => {
          var Z;
          return [
            se.value ? (r(), m(i, te(v({ key: 0 }, n.value.header)), null, 16)) : k("", !0),
            Se("form", {
              class: he(ye.value)
            }, [
              (r(!0), h(D, null, L(n.value.items, (a, y) => {
                var x;
                return r(), h(D, {
                  key: `${y}-${a.type}-${a.key}`
                }, [
                  a.type === "field" && K(a) ? (r(), h(D, { key: 0 }, [
                    pe.value ? (r(), h(D, { key: 0 }, [
                      Array.isArray(a.field.options) ? I((r(), m(d, v({
                        key: 0,
                        modelValue: u.value[a.key],
                        "onUpdate:modelValue": (l) => u.value[a.key] = l,
                        options: a.field.options,
                        "onUpdate:options": (l) => a.field.options = l,
                        ref_for: !0
                      }, {
                        ...a.field,
                        readMode: () => {
                          var l;
                          return o.disabled ? o.disabled : B.value ? B.value : (l = a.field) == null ? void 0 : l.readMode;
                        },
                        prop: u.value
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
                        [R, M(a)]
                      ]) : I((r(), m(d, v({
                        key: 1,
                        modelValue: u.value[a.key],
                        "onUpdate:modelValue": (l) => u.value[a.key] = l,
                        ref_for: !0
                      }, {
                        ...a.field,
                        readMode: () => {
                          var l;
                          return o.disabled ? o.disabled : B.value ? B.value : (l = a.field) == null ? void 0 : l.readMode;
                        },
                        prop: u.value
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
                        [R, M(a)]
                      ])
                    ], 64)) : k("", !0),
                    ce.value ? (r(), h(D, { key: 1 }, [
                      Array.isArray(a.modificationsField.options) ? I((r(), m(d, v({
                        key: 0,
                        modelValue: f.value[a.key],
                        "onUpdate:modelValue": (l) => f.value[a.key] = l,
                        options: a.modificationsField.options,
                        "onUpdate:options": (l) => a.modificationsField.options = l,
                        ref_for: !0
                      }, {
                        ...a.field,
                        ...a.modificationsField,
                        readMode: () => {
                          var l;
                          return o.disabled ? o.disabled : O.value ? O.value : (l = a.field) == null ? void 0 : l.readMode;
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
                        [R, M(a)]
                      ]) : I((r(), m(d, v({
                        key: 1,
                        modelValue: f.value[a.key],
                        "onUpdate:modelValue": (l) => f.value[a.key] = l,
                        ref_for: !0
                      }, {
                        ...a.field,
                        ...a.modificationsField,
                        readMode: () => {
                          var l;
                          return o.disabled ? o.disabled : O.value ? O.value : (l = a.field) == null ? void 0 : l.readMode;
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
                        [R, M(a)]
                      ])
                    ], 64)) : k("", !0)
                  ], 64)) : a.type === "form" ? (r(), h(D, { key: 1 }, [
                    K(a) ? I((r(), m(c, v({
                      key: 0,
                      modelValue: u.value,
                      "onUpdate:modelValue": t[0] || (t[0] = (l) => u.value = l),
                      modifications: f.value,
                      "onUpdate:modifications": t[1] || (t[1] = (l) => f.value = l),
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
                    }), le({ _: 2 }, [
                      L(W.value, (l) => ({
                        name: l,
                        fn: A(({}) => [
                          N(e.$slots, l)
                        ])
                      }))
                    ]), 1040, ["modelValue", "modifications"])), [
                      [R, M(a)]
                    ]) : k("", !0)
                  ], 64)) : a.type === "component" ? (r(), h(D, { key: 2 }, [
                    K(a) ? I((r(), m(oe(((x = a.component) == null ? void 0 : x.tag) ?? "section"), v({
                      key: 0,
                      ref_for: !0
                    }, a.component.props, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: y
                    }), {
                      default: A(() => {
                        var l, ee, ae;
                        return [
                          (ae = (ee = (l = n.value) == null ? void 0 : l.items[y]) == null ? void 0 : ee.component) != null && ae.form ? (r(), m(c, v({
                            key: 0,
                            modelValue: u.value,
                            "onUpdate:modelValue": t[2] || (t[2] = (T) => u.value = T),
                            modifications: f.value,
                            "onUpdate:modifications": t[3] || (t[3] = (T) => f.value = T),
                            ref_for: !0
                          }, {
                            form: n.value.items[y].component.form,
                            visibleView: e.visibleView,
                            modificationDataState: e.modificationDataState,
                            disabled: e.disabled,
                            editableViews: e.editableViews,
                            differencesTableConfig: e.differencesTableConfig,
                            dataStateConfig: e.dataStateConfig
                          }, { "onUpdate:valid": w }), le({ _: 2 }, [
                            L(W.value, (T) => ({
                              name: T,
                              fn: A(({}) => [
                                N(e.$slots, T)
                              ])
                            }))
                          ]), 1040, ["modelValue", "modifications"])) : k("", !0)
                        ];
                      }),
                      _: 2
                    }, 1040)), [
                      [R, M(a)]
                    ]) : k("", !0)
                  ], 64)) : a.type === "slot" ? N(e.$slots, a.key, v({
                    key: 3,
                    ref_for: !0
                  }, a.slotData ?? {})) : k("", !0)
                ], 64);
              }), 128)),
              Q.value.length > 0 ? (r(), m(Ve, v({
                key: 0,
                modelValue: j.value,
                "onUpdate:modelValue": t[4] || (t[4] = (a) => j.value = a)
              }, {
                ...ve.value
              }), null, 16, ["modelValue"])) : k("", !0),
              N(e.$slots, "default"),
              typeof ((Z = e.form) == null ? void 0 : Z.submitButton) == "object" && q.value ? (r(), m(ke, te(v({ key: 1 }, q.value)), null, 16)) : k("", !0)
            ], 2)
          ];
        }),
        _: 3
      }, 16, ["class"])) : k("", !0);
    };
  }
}), $e = {
  install: (F) => {
    F.component("lkt-form") === void 0 && F.component("lkt-form", Me);
  }
}, je = (F) => {
  _e(F);
};
export {
  $e as default,
  je as setCanvas
};

import { defineComponent as Se, useSlots as he, ref as k, watch as D, computed as s, onMounted as De, nextTick as Fe, resolveComponent as O, createBlock as y, createCommentVNode as b, openBlock as r, resolveDynamicComponent as ne, mergeProps as m, withModifiers as Ue, withCtx as A, createElementVNode as Me, normalizeProps as ie, normalizeClass as _e, createElementBlock as F, renderSlot as N, Fragment as U, renderList as z, withDirectives as T, vShow as R, createSlots as re } from "vue";
import { ModificationView as g, FormInstance as ue, getFormFieldsKeys as de, ColumnType as E, extractI18nValue as Ie, getFormSlotKeys as Te, setModalCanvas as Re } from "lkt-vue-kernel";
import { DataState as q } from "lkt-data-state";
const $e = /* @__PURE__ */ Se({
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
    visibleView: { default: g.Current },
    editableViews: { default: () => [] },
    modificationDataState: { default: () => new q({}) },
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
  setup(M, { expose: fe, emit: se }) {
    var Y, Z;
    he();
    const o = M, C = se, H = k(!1), n = k(new ue(o.form));
    D(() => o.form, (e) => {
      const t = new q(n.value);
      let i = new ue(e);
      t.increment(i), t.changed() && (n.value = i);
    }, { deep: !0 });
    const u = k(o.modelValue), d = k(o.modifications), w = k(new q({}, {
      ...o.dataStateConfig,
      onlyProps: (Y = o.dataStateConfig) != null && Y.onlyProps ? [...(Z = o.dataStateConfig) == null ? void 0 : Z.onlyProps, ...de(n.value)] : de(n.value)
    }));
    o.visibleView === g.Current ? w.value.increment(u.value).turnStoredIntoOriginal() : w.value.increment(d.value).turnStoredIntoOriginal();
    const p = k(null), S = k(o.valid);
    D(() => o.valid, (e) => {
      S.value = e;
    }), D(S, (e) => {
      C("update:valid", e);
    });
    const K = k([]);
    D(() => o.modificationDataState, (e) => {
      K.value = o.modificationDataState.getChangedProperties();
    }, { deep: !0 }), D(w, (e) => {
      H.value = w.value.changed(), C("update:changed", H.value);
    }, { deep: !0 });
    const h = () => {
      let e = !0, t = [];
      if (n.value) {
        if (t = n.value.items.reduce((i, f, c) => i.concat(f.type === "form" ? c : []), []), t.length > 0)
          for (let i in t)
            typeof p.value[t[i]] < "u" && typeof p.value[t[i]].isValid == "function" && (e = e && p.value[t[i]].isValid());
        if (!e) {
          S.value = e;
          return;
        }
        if (t = n.value.items.reduce((i, f, c) => i.concat(f.type === "field" ? c : []), []), t.length > 0)
          for (let i in t)
            typeof p.value[t[i]] < "u" && typeof p.value[t[i]].isFormValid == "function" && (e = e && p.value[t[i]].isFormValid());
        S.value = e, C("update:valid", e);
      }
    };
    D(u, (e) => {
      o.editableViews[0] === g.Current && w.value.increment(u.value), L(), C("update:modelValue", e);
    }, { deep: !0 }), D(d, (e) => {
      o.editableViews[0] === g.Modifications && w.value.increment(d.value), L(), C("update:modifications", e);
    }, { deep: !0 });
    const ce = s(() => !S.value), G = s(() => {
      var e;
      return o.form ? {
        ...(e = o.form) == null ? void 0 : e.submitButton,
        disabled: ce.value
      } : {};
    }), v = k([]), pe = s(() => {
      var e, t;
      return typeof ((e = o.form) == null ? void 0 : e.header) == "object" && Object.keys((t = o.form) == null ? void 0 : t.header).length > 0;
    }), j = k([]), ve = [
      {
        key: "datum",
        label: "Datum",
        type: E.None,
        isForAccordionHeader: !0
      },
      {
        key: "current",
        label: "Current",
        type: E.Field,
        field: "prop:field"
      },
      {
        key: "modification",
        label: "Modification",
        type: E.Field,
        field: "prop:modificationsField"
      }
    ], J = s(() => o.visibleView === g.Differences), Q = s(() => o.visibleView === g.SplitView), me = s(() => o.visibleView === g.Modifications), ye = s(() => o.visibleView === g.Current), W = s(() => {
      let e = [];
      return Q.value ? e = n.value.items.reduce((t, i, f) => t.concat(i.type === "field" ? f : []), []) : J.value && (e = n.value.items.reduce((t, i, f) => t.concat(i.type === "field" && K.value.includes(i.key) ? f : []), [])), L(e), e;
    }), B = s(() => !(o.editableViews.length === 0 || o.editableViews.includes(g.Current))), P = s(() => !(o.editableViews.length === 0 || o.editableViews.includes(g.Modifications))), Ve = s(() => {
      let e = {
        columns: ve
      };
      return typeof o.differencesTableConfig == "function" ? o.differencesTableConfig(e) : typeof o.differencesTableConfig == "object" && Object.keys(o.differencesTableConfig).length > 0 ? {
        ...o.differencesTableConfig,
        ...e
      } : e;
    }), L = (e) => {
      if (j.value = [], !J.value && !Q.value) return;
      let t = [];
      if (e || (e = W.value), e.length > 0)
        for (let i in e) {
          let f = e[i], c = n.value.items[f];
          t.push({
            datum: Ie(c.field.label),
            current: u.value[c.key],
            modification: d.value[c.key],
            field: c.field,
            modificationsField: {
              ...c.field,
              ...c.modificationsField
            }
          });
        }
      j.value = t;
    };
    fe({
      isValid: () => S.value,
      turnStoredIntoOriginal: () => {
        w.value.turnStoredIntoOriginal();
      }
    }), De(() => {
      Fe(() => {
        h(), K.value = o.modificationDataState.getChangedProperties(), C("update:valid", S.value), C("update:changed", H.value);
      });
    });
    const $ = (e) => typeof e.canRender > "u" ? !0 : typeof e.canRender == "function" ? e.canRender() : e.canRender, _ = (e) => typeof e.canDisplay > "u" ? !0 : typeof e.canDisplay == "function" ? e.canDisplay() : e.canDisplay, ke = s(() => {
      var t, i;
      let e = [];
      return (t = n.value.uiConfig) != null && t.class && e.push(n.value.uiConfig.class), (i = n.value) != null && i.container.class && e.push(n.value.container.class), o.class && e.push(o.class), e.push(`view-is-${o.visibleView}`), e.join(" ");
    }), be = s(() => {
      var t;
      let e = [];
      return (t = n.value.uiConfig) != null && t.formClass && e.push(n.value.uiConfig.formClass), o.formClass ? e.push(o.formClass) : e.push("lkt-grid-1"), e.join(" ");
    }), X = s(() => Te(n.value)), ge = () => {
    };
    return (e, t) => {
      var x, ee;
      const i = O("lkt-header"), f = O("lkt-field"), c = O("lkt-form", !0), Ce = O("lkt-table"), we = O("lkt-button");
      return typeof n.value == "object" && Object.keys(n.value).length > 0 ? (r(), y(ne(((x = n.value.container) == null ? void 0 : x.tag) ?? "section"), m({
        key: 0,
        class: ["lkt-form-container", ke.value]
      }, (ee = n.value.container) == null ? void 0 : ee.props, {
        onSubmit: Ue(ge, ["prevent", "stop"])
      }), {
        default: A(() => {
          var ae;
          return [
            pe.value ? (r(), y(i, ie(m({ key: 0 }, n.value.header)), null, 16)) : b("", !0),
            Me("form", {
              class: _e(be.value)
            }, [
              (r(!0), F(U, null, z(n.value.items, (a, V) => {
                var oe;
                return r(), F(U, {
                  key: `${V}-${a.type}-${a.key}`
                }, [
                  a.type === "field" && $(a) ? (r(), F(U, { key: 0 }, [
                    ye.value ? (r(), F(U, { key: 0 }, [
                      Array.isArray(a.field.options) ? T((r(), y(f, m({
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
                        ref: p,
                        key: `${V}-current`,
                        onValidating: () => {
                          v.value.push(a.key);
                        },
                        onValidation: () => {
                          v.value.splice(v.value.indexOf(a.key), 1);
                        },
                        onValidationStatus: h
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                        [R, _(a)]
                      ]) : T((r(), y(f, m({
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
                        ref: p,
                        key: `${V}-current-2`,
                        onValidating: () => {
                          v.value.push(a.key);
                        },
                        onValidation: () => {
                          v.value.splice(v.value.indexOf(a.key), 1);
                        },
                        onValidationStatus: h
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])), [
                        [R, _(a)]
                      ])
                    ], 64)) : b("", !0),
                    me.value ? (r(), F(U, { key: 1 }, [
                      Array.isArray(a.modificationsField.options) ? T((r(), y(f, m({
                        key: 0,
                        modelValue: d.value[a.key],
                        "onUpdate:modelValue": (l) => d.value[a.key] = l,
                        options: a.modificationsField.options,
                        "onUpdate:options": (l) => a.modificationsField.options = l,
                        ref_for: !0
                      }, {
                        ...a.field,
                        ...a.modificationsField,
                        readMode: () => {
                          var l;
                          return o.disabled ? o.disabled : P.value ? P.value : (l = a.field) == null ? void 0 : l.readMode;
                        },
                        prop: d.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: p,
                        key: `${V}-modifications`,
                        onValidating: () => {
                          v.value.push(a.key);
                        },
                        onValidation: () => {
                          v.value.splice(v.value.indexOf(a.key), 1);
                        },
                        onValidationStatus: h
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                        [R, _(a)]
                      ]) : T((r(), y(f, m({
                        key: 1,
                        modelValue: d.value[a.key],
                        "onUpdate:modelValue": (l) => d.value[a.key] = l,
                        ref_for: !0
                      }, {
                        ...a.field,
                        ...a.modificationsField,
                        readMode: () => {
                          var l;
                          return o.disabled ? o.disabled : P.value ? P.value : (l = a.field) == null ? void 0 : l.readMode;
                        },
                        prop: d.value
                      }, {
                        ref_for: !0,
                        ref_key: "fieldsRefs",
                        ref: p,
                        key: `${V}-modifications-2`,
                        onValidating: () => {
                          v.value.push(a.key);
                        },
                        onValidation: () => {
                          v.value.splice(v.value.indexOf(a.key), 1);
                        },
                        onValidationStatus: h
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])), [
                        [R, _(a)]
                      ])
                    ], 64)) : b("", !0)
                  ], 64)) : a.type === "form" ? (r(), F(U, { key: 1 }, [
                    $(a) ? T((r(), y(c, m({
                      key: 0,
                      modelValue: u.value,
                      "onUpdate:modelValue": t[0] || (t[0] = (l) => u.value = l),
                      modifications: d.value,
                      "onUpdate:modifications": t[1] || (t[1] = (l) => d.value = l),
                      ref_for: !0
                    }, {
                      form: n.value.items[V].form,
                      visibleView: e.visibleView,
                      modificationDataState: e.modificationDataState,
                      disabled: e.disabled,
                      editableViews: e.editableViews,
                      differencesTableConfig: e.differencesTableConfig,
                      dataStateConfig: e.dataStateConfig
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: p,
                      key: V,
                      "onUpdate:valid": h
                    }), re({ _: 2 }, [
                      z(X.value, (l) => ({
                        name: l,
                        fn: A(({}) => [
                          N(e.$slots, l)
                        ])
                      }))
                    ]), 1040, ["modelValue", "modifications"])), [
                      [R, _(a)]
                    ]) : b("", !0)
                  ], 64)) : a.type === "component" && $(a) ? (r(), F(U, { key: 2 }, [
                    $(a) ? T((r(), y(ne(((oe = a.component) == null ? void 0 : oe.tag) ?? "section"), m({
                      key: 0,
                      ref_for: !0
                    }, a.component.props, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: p,
                      key: V
                    }), {
                      default: A(() => {
                        var l, te, le;
                        return [
                          (le = (te = (l = n.value) == null ? void 0 : l.items[V]) == null ? void 0 : te.component) != null && le.form ? (r(), y(c, m({
                            key: 0,
                            modelValue: u.value,
                            "onUpdate:modelValue": t[2] || (t[2] = (I) => u.value = I),
                            modifications: d.value,
                            "onUpdate:modifications": t[3] || (t[3] = (I) => d.value = I),
                            ref_for: !0
                          }, {
                            form: n.value.items[V].component.form,
                            visibleView: e.visibleView,
                            modificationDataState: e.modificationDataState,
                            disabled: e.disabled,
                            editableViews: e.editableViews,
                            differencesTableConfig: e.differencesTableConfig,
                            dataStateConfig: e.dataStateConfig
                          }, { "onUpdate:valid": h }), re({ _: 2 }, [
                            z(X.value, (I) => ({
                              name: I,
                              fn: A(({}) => [
                                N(e.$slots, I)
                              ])
                            }))
                          ]), 1040, ["modelValue", "modifications"])) : b("", !0)
                        ];
                      }),
                      _: 2
                    }, 1040)), [
                      [R, _(a)]
                    ]) : b("", !0)
                  ], 64)) : a.type === "slot" && $(a) ? N(e.$slots, a.key, m({
                    key: 3,
                    ref_for: !0
                  }, a.slotData ?? {})) : b("", !0)
                ], 64);
              }), 128)),
              W.value.length > 0 ? (r(), y(Ce, m({
                key: 0,
                modelValue: j.value,
                "onUpdate:modelValue": t[4] || (t[4] = (a) => j.value = a)
              }, {
                ...Ve.value
              }), null, 16, ["modelValue"])) : b("", !0),
              N(e.$slots, "default"),
              typeof ((ae = e.form) == null ? void 0 : ae.submitButton) == "object" && G.value ? (r(), y(we, ie(m({ key: 1 }, G.value)), null, 16)) : b("", !0)
            ], 2)
          ];
        }),
        _: 3
      }, 16, ["class"])) : b("", !0);
    };
  }
}), Pe = {
  install: (M) => {
    M.component("lkt-form") === void 0 && M.component("lkt-form", $e);
  }
}, Ae = (M) => {
  Re(M);
};
export {
  Pe as default,
  Ae as setCanvas
};

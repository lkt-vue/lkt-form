import { defineComponent as ge, useSlots as Ce, ref as k, watch as D, computed as s, onMounted as we, nextTick as Se, resolveComponent as O, createBlock as y, createCommentVNode as b, openBlock as r, resolveDynamicComponent as te, mergeProps as m, withModifiers as he, withCtx as N, createElementVNode as De, normalizeProps as le, normalizeClass as Fe, createElementBlock as F, renderSlot as P, Fragment as U, renderList as z, withDirectives as T, vShow as R, createSlots as ne } from "vue";
import { ModificationView as g, FormInstance as ie, getFormFieldsKeys as Ue, ColumnType as E, extractI18nValue as Me, getFormSlotKeys as _e, setModalCanvas as Ie } from "lkt-vue-kernel";
import { DataState as q } from "lkt-data-state";
const Te = /* @__PURE__ */ ge({
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
  setup(M, { expose: re, emit: ue }) {
    Ce();
    const o = M, C = ue, H = k(!1), i = k(new ie(o.form));
    D(() => o.form, (e) => {
      const t = new q(i.value);
      let n = new ie(e);
      t.increment(n), t.changed() && (i.value = n);
    }, { deep: !0 });
    const u = k(o.modelValue), d = k(o.modifications), w = k(new q({}, {
      ...o.dataStateConfig,
      onlyProps: Ue(i.value)
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
      if (i.value) {
        if (t = i.value.items.reduce((n, f, c) => n.concat(f.type === "form" ? c : []), []), t.length > 0)
          for (let n in t)
            typeof p.value[t[n]] < "u" && typeof p.value[t[n]].isValid == "function" && (e = e && p.value[t[n]].isValid());
        if (!e) {
          S.value = e;
          return;
        }
        if (t = i.value.items.reduce((n, f, c) => n.concat(f.type === "field" ? c : []), []), t.length > 0)
          for (let n in t)
            typeof p.value[t[n]] < "u" && typeof p.value[t[n]].isFormValid == "function" && (e = e && p.value[t[n]].isFormValid());
        S.value = e, C("update:valid", e);
      }
    };
    D(u, (e) => {
      o.editableViews[0] === g.Current && w.value.increment(u.value), L(), C("update:modelValue", e);
    }, { deep: !0 }), D(d, (e) => {
      o.editableViews[0] === g.Modifications && w.value.increment(d.value), L(), C("update:modifications", e);
    }, { deep: !0 });
    const de = s(() => !S.value), G = s(() => {
      var e;
      return o.form ? {
        ...(e = o.form) == null ? void 0 : e.submitButton,
        disabled: de.value
      } : {};
    }), v = k([]), fe = s(() => {
      var e, t;
      return typeof ((e = o.form) == null ? void 0 : e.header) == "object" && Object.keys((t = o.form) == null ? void 0 : t.header).length > 0;
    }), j = k([]), se = [
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
    ], J = s(() => o.visibleView === g.Differences), Q = s(() => o.visibleView === g.SplitView), ce = s(() => o.visibleView === g.Modifications), pe = s(() => o.visibleView === g.Current), W = s(() => {
      let e = [];
      return Q.value ? e = i.value.items.reduce((t, n, f) => t.concat(n.type === "field" ? f : []), []) : J.value && (e = i.value.items.reduce((t, n, f) => t.concat(n.type === "field" && K.value.includes(n.key) ? f : []), [])), L(e), e;
    }), B = s(() => !(o.editableViews.length === 0 || o.editableViews.includes(g.Current))), A = s(() => !(o.editableViews.length === 0 || o.editableViews.includes(g.Modifications))), ve = s(() => {
      let e = {
        columns: se
      };
      return typeof o.differencesTableConfig == "function" ? o.differencesTableConfig(e) : typeof o.differencesTableConfig == "object" && Object.keys(o.differencesTableConfig).length > 0 ? {
        ...o.differencesTableConfig,
        ...e
      } : e;
    }), L = (e) => {
      if (j.value = [], !J.value && !Q.value) return;
      let t = [];
      if (e || (e = W.value), e.length > 0)
        for (let n in e) {
          let f = e[n], c = i.value.items[f];
          t.push({
            datum: Me(c.field.label),
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
    re({
      isValid: () => S.value,
      turnStoredIntoOriginal: () => {
        w.value.turnStoredIntoOriginal();
      }
    }), we(() => {
      Se(() => {
        h(), K.value = o.modificationDataState.getChangedProperties(), C("update:valid", S.value), C("update:changed", H.value);
      });
    });
    const $ = (e) => typeof e.canRender > "u" ? !0 : typeof e.canRender == "function" ? e.canRender() : e.canRender, _ = (e) => typeof e.canDisplay > "u" ? !0 : typeof e.canDisplay == "function" ? e.canDisplay() : e.canDisplay, me = s(() => {
      var t, n;
      let e = [];
      return (t = i.value.uiConfig) != null && t.class && e.push(i.value.uiConfig.class), (n = i.value) != null && n.container.class && e.push(i.value.container.class), o.class && e.push(o.class), e.push(`view-is-${o.visibleView}`), e.join(" ");
    }), ye = s(() => {
      var t;
      let e = [];
      return (t = i.value.uiConfig) != null && t.formClass && e.push(i.value.uiConfig.formClass), o.formClass ? e.push(o.formClass) : e.push("lkt-grid-1"), e.join(" ");
    }), X = s(() => _e(i.value)), Ve = () => {
    };
    return (e, t) => {
      var Y, Z;
      const n = O("lkt-header"), f = O("lkt-field"), c = O("lkt-form", !0), ke = O("lkt-table"), be = O("lkt-button");
      return typeof i.value == "object" && Object.keys(i.value).length > 0 ? (r(), y(te(((Y = i.value.container) == null ? void 0 : Y.tag) ?? "section"), m({
        key: 0,
        class: ["lkt-form-container", me.value]
      }, (Z = i.value.container) == null ? void 0 : Z.props, {
        onSubmit: he(Ve, ["prevent", "stop"])
      }), {
        default: N(() => {
          var x;
          return [
            fe.value ? (r(), y(n, le(m({ key: 0 }, i.value.header)), null, 16)) : b("", !0),
            De("form", {
              class: Fe(ye.value)
            }, [
              (r(!0), F(U, null, z(i.value.items, (a, V) => {
                var ee;
                return r(), F(U, {
                  key: `${V}-${a.type}-${a.key}`
                }, [
                  a.type === "field" && $(a) ? (r(), F(U, { key: 0 }, [
                    pe.value ? (r(), F(U, { key: 0 }, [
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
                    ce.value ? (r(), F(U, { key: 1 }, [
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
                          return o.disabled ? o.disabled : A.value ? A.value : (l = a.field) == null ? void 0 : l.readMode;
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
                          return o.disabled ? o.disabled : A.value ? A.value : (l = a.field) == null ? void 0 : l.readMode;
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
                      form: i.value.items[V].form,
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
                    }), ne({ _: 2 }, [
                      z(X.value, (l) => ({
                        name: l,
                        fn: N(({}) => [
                          P(e.$slots, l)
                        ])
                      }))
                    ]), 1040, ["modelValue", "modifications"])), [
                      [R, _(a)]
                    ]) : b("", !0)
                  ], 64)) : a.type === "component" && $(a) ? (r(), F(U, { key: 2 }, [
                    $(a) ? T((r(), y(te(((ee = a.component) == null ? void 0 : ee.tag) ?? "section"), m({
                      key: 0,
                      ref_for: !0
                    }, a.component.props, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: p,
                      key: V
                    }), {
                      default: N(() => {
                        var l, ae, oe;
                        return [
                          (oe = (ae = (l = i.value) == null ? void 0 : l.items[V]) == null ? void 0 : ae.component) != null && oe.form ? (r(), y(c, m({
                            key: 0,
                            modelValue: u.value,
                            "onUpdate:modelValue": t[2] || (t[2] = (I) => u.value = I),
                            modifications: d.value,
                            "onUpdate:modifications": t[3] || (t[3] = (I) => d.value = I),
                            ref_for: !0
                          }, {
                            form: i.value.items[V].component.form,
                            visibleView: e.visibleView,
                            modificationDataState: e.modificationDataState,
                            disabled: e.disabled,
                            editableViews: e.editableViews,
                            differencesTableConfig: e.differencesTableConfig,
                            dataStateConfig: e.dataStateConfig
                          }, { "onUpdate:valid": h }), ne({ _: 2 }, [
                            z(X.value, (I) => ({
                              name: I,
                              fn: N(({}) => [
                                P(e.$slots, I)
                              ])
                            }))
                          ]), 1040, ["modelValue", "modifications"])) : b("", !0)
                        ];
                      }),
                      _: 2
                    }, 1040)), [
                      [R, _(a)]
                    ]) : b("", !0)
                  ], 64)) : a.type === "slot" && $(a) ? P(e.$slots, a.key, m({
                    key: 3,
                    ref_for: !0
                  }, a.slotData ?? {})) : b("", !0)
                ], 64);
              }), 128)),
              W.value.length > 0 ? (r(), y(ke, m({
                key: 0,
                modelValue: j.value,
                "onUpdate:modelValue": t[4] || (t[4] = (a) => j.value = a)
              }, {
                ...ve.value
              }), null, 16, ["modelValue"])) : b("", !0),
              P(e.$slots, "default"),
              typeof ((x = e.form) == null ? void 0 : x.submitButton) == "object" && G.value ? (r(), y(be, le(m({ key: 1 }, G.value)), null, 16)) : b("", !0)
            ], 2)
          ];
        }),
        _: 3
      }, 16, ["class"])) : b("", !0);
    };
  }
}), je = {
  install: (M) => {
    M.component("lkt-form") === void 0 && M.component("lkt-form", Te);
  }
}, Be = (M) => {
  Ie(M);
};
export {
  je as default,
  Be as setCanvas
};

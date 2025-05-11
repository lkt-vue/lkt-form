import { defineComponent as re, ref as y, watch as V, computed as f, onMounted as de, nextTick as fe, resolveComponent as h, createBlock as s, createCommentVNode as c, openBlock as i, resolveDynamicComponent as G, mergeProps as m, withCtx as J, createElementVNode as ue, createElementBlock as S, renderSlot as se, normalizeProps as Q, Fragment as U, renderList as ce, withDirectives as R, vShow as I } from "vue";
import { ModificationView as k, ColumnType as $, extractI18nValue as pe, setModalCanvas as me } from "lkt-vue-kernel";
import { DataState as ve } from "lkt-data-state";
const ye = { class: "lkt-grid-1" }, Ve = /* @__PURE__ */ re({
  __name: "LktForm",
  props: {
    modelValue: {},
    modifications: {},
    form: {},
    valid: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    visibleView: { default: k.Current },
    editableViews: { default: () => [] },
    modificationDataState: { default: () => new ve({}) },
    differencesTableConfig: {}
  },
  emits: [
    "update:modelValue",
    "update:modifications",
    "update:form",
    "update:valid"
  ],
  setup(b, { expose: W, emit: X }) {
    const t = b, D = X, u = y(t.modelValue), p = y(t.modifications), g = y(null), v = y(t.valid);
    V(() => t.valid, (e) => {
      v.value = e;
    }), V(v, (e) => {
      D("update:valid", e);
    });
    const j = y([]);
    V(() => t.modificationDataState, (e) => {
      j.value = t.modificationDataState.getChangedProperties();
    }, { deep: !0 });
    const _ = () => {
      let e = !0, n = [];
      if (t.form) {
        if (n = t.form.items.reduce((a, d, r) => a.concat(d.type === "form" ? r : []), []), n.length > 0)
          for (let a in n)
            e = e && g.value[n[a]].isValid();
        if (!e) {
          v.value = e;
          return;
        }
        if (n = t.form.items.reduce((a, d, r) => a.concat(d.type === "field" ? r : []), []), n.length > 0)
          for (let a in n)
            e = e && g.value[n[a]].isFormValid();
        v.value = e, D("update:valid", e);
      }
    };
    V(() => t.modelValue, (e) => {
      u.value = e;
    }), V(u, (e) => {
      B(), D("update:modelValue", e);
    }, { deep: !0 }), V(() => t.modifications, (e) => {
      p.value = e;
    }, { deep: !0 }), V(p, (e) => {
      B(), D("update:modifications", e);
    }, { deep: !0 });
    const Y = f(() => !v.value), P = f(() => {
      var e;
      return t.form ? {
        ...(e = t.form) == null ? void 0 : e.submitButton,
        disabled: Y.value
      } : {};
    }), w = y([]), Z = f(() => {
      var e, n;
      return typeof ((e = t.form) == null ? void 0 : e.header) == "object" && Object.keys((n = t.form) == null ? void 0 : n.header).length > 0;
    }), M = y([]), x = [
      {
        key: "datum",
        label: "Datum",
        type: $.None,
        isForAccordionHeader: !0
      },
      {
        key: "current",
        label: "Current",
        type: $.Field,
        field: "prop:field"
      },
      {
        key: "modification",
        label: "Modification",
        type: $.Field,
        field: "prop:field"
      }
    ], ee = f(() => t.visibleView === k.Differences), oe = f(() => t.visibleView === k.SplitView), te = f(() => t.visibleView === k.Modifications), ne = f(() => t.visibleView === k.Current), H = f(() => {
      let e = [];
      return oe.value ? e = t.form.items.reduce((n, a, d) => n.concat(a.type === "field" ? d : []), []) : ee.value && (e = t.form.items.reduce((n, a, d) => n.concat(a.type === "field" && j.value.includes(a.key) ? d : []), [])), B(e), e;
    }), L = f(() => !(t.editableViews.length === 0 || t.editableViews.includes(k.Current))), N = f(() => !(t.editableViews.length === 0 || t.editableViews.includes(k.Modifications))), le = f(() => {
      let e = {
        columns: x
      };
      return typeof t.differencesTableConfig == "function" ? t.differencesTableConfig(e) : typeof t.differencesTableConfig == "object" && Object.keys(t.differencesTableConfig).length > 0 ? {
        ...t.differencesTableConfig,
        ...e
      } : e;
    }), B = (e) => {
      M.value = [];
      let n = [];
      if (e || (e = H.value), e.length > 0)
        for (let a in e) {
          let d = e[a], r = t.form.items[d];
          n.push({
            datum: pe(r.field.label),
            current: u.value[r.key],
            modification: p.value[r.key],
            field: r.field,
            modificationsField: {
              ...r.field,
              ...r.modificationsField
            }
          });
        }
      M.value = n;
    };
    W({
      isValid: () => v.value
    }), de(() => {
      fe(() => {
        _(), j.value = t.modificationDataState.getChangedProperties();
      }), D("update:valid", v.value);
    });
    const T = (e) => typeof e.canRender > "u" ? !0 : typeof e.canRender == "function" ? e.canRender() : e.canRender, F = (e) => typeof e.canDisplay > "u" ? !0 : typeof e.canDisplay == "function" ? e.canDisplay() : e.canDisplay;
    return (e, n) => {
      var E, z, A;
      const a = h("lkt-header"), d = h("lkt-field"), r = h("lkt-form", !0), ae = h("lkt-table"), ie = h("lkt-button");
      return typeof e.form == "object" && Object.keys(e.form).length > 0 ? (i(), s(G(((E = e.form.container) == null ? void 0 : E.tag) ?? "section"), m({
        key: 0,
        class: ["lkt-form-container", (z = e.form.container) == null ? void 0 : z.class]
      }, (A = e.form.container) == null ? void 0 : A.props), {
        default: J(() => {
          var K;
          return [
            ue("form", ye, [
              Z.value ? (i(), s(a, Q(m({ key: 0 }, e.form.header)), null, 16)) : c("", !0),
              (i(!0), S(U, null, ce(e.form.items, (o, C) => {
                var q;
                return i(), S(U, {
                  key: `${C}-${o.type}-${o.key}`
                }, [
                  o.type === "field" ? (i(), S(U, { key: 0 }, [
                    ne.value && T(o) ? R((i(), s(d, m({
                      key: 0,
                      modelValue: u.value[o.key],
                      "onUpdate:modelValue": (l) => u.value[o.key] = l,
                      options: o.field.options,
                      "onUpdate:options": (l) => o.field.options = l,
                      ref_for: !0
                    }, {
                      ...o.field,
                      readMode: () => {
                        var l;
                        return t.disabled ? t.disabled : L.value ? L.value : (l = o.field) == null ? void 0 : l.readMode;
                      },
                      prop: u.value
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: `${C}-current`,
                      onValidating: () => {
                        w.value.push(o.key);
                      },
                      onValidation: () => {
                        w.value.splice(w.value.indexOf(o.key), 1);
                      },
                      onValidationStatus: _
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                      [I, F(o)]
                    ]) : te.value && T(o) ? R((i(), s(d, m({
                      key: 1,
                      modelValue: p.value[o.key],
                      "onUpdate:modelValue": (l) => p.value[o.key] = l,
                      options: o.field.options,
                      "onUpdate:options": (l) => o.field.options = l,
                      ref_for: !0
                    }, {
                      ...o.field,
                      ...o.modificationsField,
                      readMode: () => {
                        var l;
                        return t.disabled ? t.disabled : N.value ? N.value : (l = o.field) == null ? void 0 : l.readMode;
                      },
                      prop: p.value
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: `${C}-modifications`,
                      onValidating: () => {
                        w.value.push(o.key);
                      },
                      onValidation: () => {
                        w.value.splice(w.value.indexOf(o.key), 1);
                      },
                      onValidationStatus: _
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                      [I, F(o)]
                    ]) : c("", !0)
                  ], 64)) : o.type === "form" ? (i(), S(U, { key: 1 }, [
                    T(o) ? R((i(), s(r, m({
                      key: 0,
                      modelValue: u.value,
                      "onUpdate:modelValue": n[0] || (n[0] = (l) => u.value = l),
                      modifications: p.value,
                      "onUpdate:modifications": n[1] || (n[1] = (l) => p.value = l),
                      ref_for: !0
                    }, {
                      form: e.form.items[C].form,
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
                      "onUpdate:valid": _
                    }), null, 16, ["modelValue", "modifications"])), [
                      [I, F(o)]
                    ]) : c("", !0)
                  ], 64)) : o.type === "component" ? (i(), S(U, { key: 2 }, [
                    T(o) ? R((i(), s(G((q = o.component) == null ? void 0 : q.tag), m({
                      key: 0,
                      ref_for: !0
                    }, o.component.props, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: g,
                      key: C
                    }), {
                      default: J(() => {
                        var l;
                        return [
                          Object.keys((l = o.component) == null ? void 0 : l.form).length > 0 ? (i(), s(r, {
                            key: 0,
                            modelValue: u.value,
                            "onUpdate:modelValue": n[2] || (n[2] = (O) => u.value = O),
                            form: o.component.form,
                            "onUpdate:form": (O) => o.component.form = O
                          }, null, 8, ["modelValue", "form", "onUpdate:form"])) : c("", !0)
                        ];
                      }),
                      _: 2
                    }, 1040)), [
                      [I, F(o)]
                    ]) : c("", !0)
                  ], 64)) : c("", !0)
                ], 64);
              }), 128)),
              H.value.length > 0 ? (i(), s(ae, m({
                key: 1,
                modelValue: M.value,
                "onUpdate:modelValue": n[3] || (n[3] = (o) => M.value = o)
              }, {
                ...le.value
              }), null, 16, ["modelValue"])) : c("", !0),
              se(e.$slots, "default"),
              typeof ((K = e.form) == null ? void 0 : K.submitButton) == "object" && P.value ? (i(), s(ie, Q(m({ key: 2 }, P.value)), null, 16)) : c("", !0)
            ])
          ];
        }),
        _: 3
      }, 16, ["class"])) : c("", !0);
    };
  }
}), we = {
  install: (b) => {
    b.component("lkt-form") === void 0 && b.component("lkt-form", Ve);
  }
}, Ce = (b) => {
  me(b);
};
export {
  we as default,
  Ce as setCanvas
};

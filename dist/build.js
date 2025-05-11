import { defineComponent as re, ref as y, watch as V, computed as u, onMounted as de, nextTick as ue, resolveComponent as h, createBlock as s, createCommentVNode as c, openBlock as i, resolveDynamicComponent as G, mergeProps as m, withCtx as J, createElementVNode as fe, createElementBlock as S, renderSlot as se, normalizeProps as Q, Fragment as U, renderList as ce, withDirectives as I, vShow as j } from "vue";
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
    const o = b, D = X, f = y(o.modelValue), p = y(o.modifications), g = y(null), v = y(o.valid);
    V(() => o.valid, (e) => {
      v.value = e;
    }), V(v, (e) => {
      D("update:valid", e);
    });
    const B = y([]);
    V(() => o.modificationDataState, (e) => {
      B.value = o.modificationDataState.getChangedProperties();
    }, { deep: !0 });
    const _ = () => {
      let e = !0, n = [];
      if (o.form) {
        if (n = o.form.items.reduce((a, r, d) => a.concat(r.type === "form" ? d : []), []), n.length > 0)
          for (let a in n)
            e = e && g.value[n[a]].isValid();
        if (!e) {
          v.value = e;
          return;
        }
        if (n = o.form.items.reduce((a, r, d) => a.concat(r.type === "field" ? d : []), []), n.length > 0)
          for (let a in n)
            e = e && g.value[n[a]].isFormValid();
        v.value = e, D("update:valid", e);
      }
    };
    V(() => o.modelValue, (e) => {
      f.value = e;
    }), V(f, (e) => {
      F(), D("update:modelValue", e);
    }, { deep: !0 }), V(() => o.modifications, (e) => {
      p.value = e;
    }, { deep: !0 }), V(p, (e) => {
      F(), D("update:modifications", e);
    }, { deep: !0 });
    const Y = u(() => !v.value), P = u(() => {
      var e;
      return o.form ? {
        ...(e = o.form) == null ? void 0 : e.submitButton,
        disabled: Y.value
      } : {};
    }), w = y([]), Z = u(() => {
      var e, n;
      return typeof ((e = o.form) == null ? void 0 : e.header) == "object" && Object.keys((n = o.form) == null ? void 0 : n.header).length > 0;
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
    ], ee = u(() => o.visibleView === k.Differences), oe = u(() => o.visibleView === k.SplitView), te = u(() => o.visibleView === k.Modifications), ne = u(() => o.visibleView === k.Current), H = u(() => {
      let e = [];
      return oe.value ? e = o.form.items.reduce((n, a, r) => n.concat(a.type === "field" ? r : []), []) : ee.value && (e = o.form.items.reduce((n, a, r) => n.concat(a.type === "field" && B.value.includes(a.key) ? r : []), [])), F(e), e;
    }), L = u(() => !(o.editableViews.length === 0 || o.editableViews.includes(k.Current))), N = u(() => !(o.editableViews.length === 0 || o.editableViews.includes(k.Modifications))), le = u(() => {
      let e = {
        columns: x
      };
      return typeof o.differencesTableConfig == "function" ? o.differencesTableConfig(e) : typeof o.differencesTableConfig == "object" && Object.keys(o.differencesTableConfig).length > 0 ? {
        ...o.differencesTableConfig,
        ...e
      } : e;
    }), F = (e) => {
      M.value = [];
      let n = [];
      if (e || (e = H.value), e.length > 0)
        for (let a in e) {
          let r = e[a], d = o.form.items[r];
          n.push({
            datum: pe(d.field.label),
            current: f.value[d.key],
            modification: p.value[d.key],
            field: d.field
          });
        }
      M.value = n;
    };
    W({
      isValid: () => v.value
    }), de(() => {
      ue(() => {
        _(), B.value = o.modificationDataState.getChangedProperties();
      }), D("update:valid", v.value);
    });
    const T = (e) => typeof e.canRender > "u" ? !0 : typeof e.canRender == "function" ? e.canRender() : e.canRender, R = (e) => typeof e.canDisplay > "u" ? !0 : typeof e.canDisplay == "function" ? e.canDisplay() : e.canDisplay;
    return (e, n) => {
      var E, z, A;
      const a = h("lkt-header"), r = h("lkt-field"), d = h("lkt-form", !0), ae = h("lkt-table"), ie = h("lkt-button");
      return typeof e.form == "object" && Object.keys(e.form).length > 0 ? (i(), s(G(((E = e.form.container) == null ? void 0 : E.tag) ?? "section"), m({
        key: 0,
        class: ["lkt-form-container", (z = e.form.container) == null ? void 0 : z.class]
      }, (A = e.form.container) == null ? void 0 : A.props), {
        default: J(() => {
          var K;
          return [
            fe("form", ye, [
              Z.value ? (i(), s(a, Q(m({ key: 0 }, e.form.header)), null, 16)) : c("", !0),
              (i(!0), S(U, null, ce(e.form.items, (t, C) => {
                var q;
                return i(), S(U, {
                  key: `${C}-${t.type}-${t.key}`
                }, [
                  t.type === "field" ? (i(), S(U, { key: 0 }, [
                    ne.value && T(t) ? I((i(), s(r, m({
                      key: 0,
                      modelValue: f.value[t.key],
                      "onUpdate:modelValue": (l) => f.value[t.key] = l,
                      options: t.field.options,
                      "onUpdate:options": (l) => t.field.options = l,
                      ref_for: !0
                    }, {
                      ...t.field,
                      readMode: () => {
                        var l;
                        return o.disabled ? o.disabled : L.value ? L.value : (l = t.field) == null ? void 0 : l.readMode;
                      },
                      prop: f.value
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
                      onValidationStatus: _
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                      [j, R(t)]
                    ]) : te.value && T(t) ? I((i(), s(r, m({
                      key: 1,
                      modelValue: p.value[t.key],
                      "onUpdate:modelValue": (l) => p.value[t.key] = l,
                      options: t.field.options,
                      "onUpdate:options": (l) => t.field.options = l,
                      ref_for: !0
                    }, {
                      ...t.field,
                      readMode: () => {
                        var l;
                        return o.disabled ? o.disabled : N.value ? N.value : (l = t.field) == null ? void 0 : l.readMode;
                      },
                      prop: p.value
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
                      onValidationStatus: _
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])), [
                      [j, R(t)]
                    ]) : c("", !0)
                  ], 64)) : t.type === "form" ? (i(), S(U, { key: 1 }, [
                    T(t) ? I((i(), s(d, m({
                      key: 0,
                      modelValue: f.value,
                      "onUpdate:modelValue": n[0] || (n[0] = (l) => f.value = l),
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
                      [j, R(t)]
                    ]) : c("", !0)
                  ], 64)) : t.type === "component" ? (i(), S(U, { key: 2 }, [
                    T(t) ? I((i(), s(G((q = t.component) == null ? void 0 : q.tag), m({
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
                          Object.keys((l = t.component) == null ? void 0 : l.form).length > 0 ? (i(), s(d, {
                            key: 0,
                            modelValue: f.value,
                            "onUpdate:modelValue": n[2] || (n[2] = (O) => f.value = O),
                            form: t.component.form,
                            "onUpdate:form": (O) => t.component.form = O
                          }, null, 8, ["modelValue", "form", "onUpdate:form"])) : c("", !0)
                        ];
                      }),
                      _: 2
                    }, 1040)), [
                      [j, R(t)]
                    ]) : c("", !0)
                  ], 64)) : c("", !0)
                ], 64);
              }), 128)),
              H.value.length > 0 ? (i(), s(ae, m({
                key: 1,
                modelValue: M.value,
                "onUpdate:modelValue": n[3] || (n[3] = (t) => M.value = t)
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

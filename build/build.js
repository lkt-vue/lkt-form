import { defineComponent as te, ref as k, watch as y, computed as f, onMounted as le, nextTick as ae, resolveComponent as h, createBlock as s, createCommentVNode as b, openBlock as d, resolveDynamicComponent as z, mergeProps as p, withCtx as K, createElementVNode as ie, createElementBlock as F, renderSlot as ne, normalizeProps as q, Fragment as I, renderList as de } from "vue";
import { ModificationView as g, ColumnType as j, extractI18nValue as re, setModalCanvas as ue } from "lkt-vue-kernel";
import { DataState as fe } from "lkt-data-state";
const se = { class: "lkt-grid-1" }, me = /* @__PURE__ */ te({
  __name: "LktForm",
  props: {
    modelValue: {},
    modifications: {},
    form: {},
    valid: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    visibleView: { default: g.Current },
    editableViews: { default: () => [] },
    modificationDataState: { default: () => new fe({}) }
  },
  emits: [
    "update:modelValue",
    "update:modifications",
    "update:form",
    "update:valid"
  ],
  setup(w, { expose: A, emit: G }) {
    const o = w, U = G, r = k(o.modelValue), c = k(o.modifications), v = k(null), V = k(o.valid);
    y(() => o.valid, (e) => {
      V.value = e;
    }), y(V, (e) => {
      U("update:valid", e);
    });
    const M = k([]);
    y(() => o.modificationDataState, (e) => {
      M.value = o.modificationDataState.getChangedProperties();
    }, { deep: !0 });
    const _ = () => {
      let e = !0, l = [];
      if (o.form) {
        if (l = o.form.items.reduce((i, n, u) => i.concat(n.type === "form" ? u : []), []), l.length > 0)
          for (let i in l)
            e = e && v.value[l[i]].isValid();
        if (!e) {
          V.value = e;
          return;
        }
        if (l = o.form.items.reduce((i, n, u) => i.concat(n.type === "field" ? u : []), []), l.length > 0)
          for (let i in l)
            e = e && v.value[l[i]].isFormValid();
        V.value = e, U("update:valid", e);
      }
    };
    y(() => o.modelValue, (e) => {
      r.value = e;
    }), y(r, (e) => {
      S(), U("update:modelValue", e);
    }, { deep: !0 }), y(() => o.modifications, (e) => {
      c.value = e;
    }, { deep: !0 }), y(c, (e) => {
      S(), U("update:modifications", e);
    }, { deep: !0 });
    const J = f(() => !V.value), O = f(() => {
      var e;
      return o.form ? {
        ...(e = o.form) == null ? void 0 : e.submitButton,
        disabled: J.value
      } : {};
    }), m = k([]), Q = f(() => {
      var e, l;
      return typeof ((e = o.form) == null ? void 0 : e.header) == "object" && Object.keys((l = o.form) == null ? void 0 : l.header).length > 0;
    }), D = k([]), W = [
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
    ], X = f(() => o.visibleView === g.Differences), Y = f(() => o.visibleView === g.SplitView), Z = f(() => o.visibleView === g.Modifications), x = f(() => o.visibleView === g.Current), R = f(() => {
      let e = [];
      return Y.value ? e = o.form.items.reduce((l, i, n) => l.concat(i.type === "field" ? n : []), []) : X.value && (e = o.form.items.reduce((l, i, n) => l.concat(i.type === "field" && M.value.includes(i.key) ? n : []), [])), S(e), e;
    }), P = f(() => !(o.editableViews.length === 0 || o.editableViews.includes(g.Current))), L = f(() => !(o.editableViews.length === 0 || o.editableViews.includes(g.Modifications))), S = (e) => {
      D.value = [];
      let l = [];
      if (e || (e = R.value), e.length > 0)
        for (let i in e) {
          let n = e[i], u = o.form.items[n];
          l.push({
            datum: re(u.field.label),
            current: r.value[u.key],
            modification: c.value[u.key],
            field: u.field
          });
        }
      D.value = l;
    };
    return A({
      isValid: () => V.value
    }), le(() => {
      ae(() => {
        _(), M.value = o.modificationDataState.getChangedProperties();
      }), U("update:valid", V.value);
    }), (e, l) => {
      var N, T, $;
      const i = h("lkt-header"), n = h("lkt-field"), u = h("lkt-form", !0), ee = h("lkt-table"), oe = h("lkt-button");
      return typeof e.form == "object" && Object.keys(e.form).length > 0 ? (d(), s(z(((N = e.form.container) == null ? void 0 : N.tag) ?? "section"), p({
        key: 0,
        class: ["lkt-form-container", (T = e.form.container) == null ? void 0 : T.class]
      }, ($ = e.form.container) == null ? void 0 : $.props), {
        default: K(() => {
          var E;
          return [
            ie("form", se, [
              Q.value ? (d(), s(i, q(p({ key: 0 }, e.form.header)), null, 16)) : b("", !0),
              (d(!0), F(I, null, de(e.form.items, (t, C) => {
                var H;
                return d(), F(I, null, [
                  t.type === "field" ? (d(), F(I, { key: 0 }, [
                    x.value ? (d(), s(n, p({
                      key: 0,
                      modelValue: r.value[t.key],
                      "onUpdate:modelValue": (a) => r.value[t.key] = a,
                      options: t.field.options,
                      "onUpdate:options": (a) => t.field.options = a,
                      ref_for: !0
                    }, {
                      ...t.field,
                      readMode: () => {
                        var a;
                        return o.disabled ? o.disabled : P.value ? P.value : (a = t.field) == null ? void 0 : a.readMode;
                      }
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: v,
                      key: `${C}-current`,
                      onValidating: () => {
                        m.value.push(t.key);
                      },
                      onValidation: () => {
                        m.value.splice(m.value.indexOf(t.key), 1);
                      },
                      onValidationStatus: _
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])) : Z.value ? (d(), s(n, p({
                      key: 1,
                      modelValue: c.value[t.key],
                      "onUpdate:modelValue": (a) => c.value[t.key] = a,
                      options: t.field.options,
                      "onUpdate:options": (a) => t.field.options = a,
                      ref_for: !0
                    }, {
                      ...t.field,
                      readMode: () => {
                        var a;
                        return o.disabled ? o.disabled : L.value ? L.value : (a = t.field) == null ? void 0 : a.readMode;
                      }
                    }, {
                      ref_for: !0,
                      ref_key: "fieldsRefs",
                      ref: v,
                      key: `${C}-modifications`,
                      onValidating: () => {
                        m.value.push(t.key);
                      },
                      onValidation: () => {
                        m.value.splice(m.value.indexOf(t.key), 1);
                      },
                      onValidationStatus: _
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "options", "onUpdate:options", "onValidating", "onValidation"])) : b("", !0)
                  ], 64)) : t.type === "field" ? (d(), s(n, p({
                    key: 1,
                    modelValue: r.value[t.key],
                    "onUpdate:modelValue": (a) => r.value[t.key] = a,
                    ref_for: !0
                  }, {
                    ...t.field,
                    readMode: () => {
                      var a;
                      return o.disabled ? o.disabled : (a = t.field) == null ? void 0 : a.readMode;
                    }
                  }, {
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: v,
                    key: C,
                    onValidating: () => {
                      m.value.push(t.key);
                    },
                    onValidation: () => {
                      m.value.splice(m.value.indexOf(t.key), 1);
                    },
                    onValidationStatus: _
                  }), null, 16, ["modelValue", "onUpdate:modelValue", "onValidating", "onValidation"])) : t.type === "form" ? (d(), s(u, {
                    modelValue: r.value,
                    "onUpdate:modelValue": l[0] || (l[0] = (a) => r.value = a),
                    modifications: c.value,
                    "onUpdate:modifications": l[1] || (l[1] = (a) => c.value = a),
                    form: e.form.items[C].form,
                    "visible-view": e.visibleView,
                    "modification-data-state": e.modificationDataState,
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: v,
                    key: C,
                    disabled: e.disabled,
                    "editable-views": e.editableViews,
                    "onUpdate:valid": _
                  }, null, 8, ["modelValue", "modifications", "form", "visible-view", "modification-data-state", "disabled", "editable-views"])) : t.type === "component" ? (d(), s(z((H = t.component) == null ? void 0 : H.tag), p({
                    key: 3,
                    ref_for: !0
                  }, t.component.props, {
                    ref_for: !0,
                    ref_key: "fieldsRefs",
                    ref: v,
                    key: C
                  }), {
                    default: K(() => {
                      var a;
                      return [
                        Object.keys((a = t.component) == null ? void 0 : a.form).length > 0 ? (d(), s(u, {
                          key: 0,
                          modelValue: r.value,
                          "onUpdate:modelValue": l[2] || (l[2] = (B) => r.value = B),
                          form: t.component.form,
                          "onUpdate:form": (B) => t.component.form = B
                        }, null, 8, ["modelValue", "form", "onUpdate:form"])) : b("", !0)
                      ];
                    }),
                    _: 2
                  }, 1040)) : b("", !0)
                ], 64);
              }), 256)),
              R.value.length > 0 ? (d(), s(ee, p({
                key: 1,
                modelValue: D.value,
                "onUpdate:modelValue": l[3] || (l[3] = (t) => D.value = t)
              }, {
                columns: W
              }), null, 16, ["modelValue"])) : b("", !0),
              ne(e.$slots, "default"),
              typeof ((E = e.form) == null ? void 0 : E.submitButton) == "object" && O.value ? (d(), s(oe, q(p({ key: 2 }, O.value)), null, 16)) : b("", !0)
            ])
          ];
        }),
        _: 3
      }, 16, ["class"])) : b("", !0);
    };
  }
}), Ve = {
  install: (w) => {
    w.component("lkt-form") === void 0 && w.component("lkt-form", me);
  }
}, ke = (w) => {
  ue(w);
};
export {
  Ve as default,
  ke as setCanvas
};

import { jsx as e, jsxs as d, Fragment as _e } from "react/jsx-runtime";
import { useState as j, useMemo as te, useCallback as L, useRef as G, useEffect as ne } from "react";
const It = ({
  variant: t = "primary",
  size: n = "medium",
  children: r,
  className: i = "",
  ...h
}) => {
  const p = "uiforge-button", u = `${p}--${t}`, f = `${p}--${n}`, k = `${p} ${u} ${f} ${i}`.trim();
  return /* @__PURE__ */ e("button", { className: k, ...h, children: r });
}, Bt = ({
  columns: t,
  data: n,
  selectable: r = !1,
  selectedRows: i,
  getRowKey: h = (ie, X) => X,
  onSelectionChange: p,
  onCellEdit: u,
  actionButtons: f = [],
  searchable: k = !1,
  searchPlaceholder: Z = "Search...",
  onSearch: H,
  customFilter: F,
  pagination: s,
  onPageChange: S,
  onPageSizeChange: D,
  pageSizeOptions: q = [10, 25, 50, 100],
  className: A = "",
  loading: C = !1,
  emptyMessage: z = "No data available"
}) => {
  const [ie, X] = j(/* @__PURE__ */ new Set()), [$, J] = j(""), [I, O] = j(null), [P, a] = j(""), v = i ?? ie, g = te(() => !k || !$ ? n : n.filter((l) => F ? F(l, $) : Object.values(l).some((x) => x == null ? !1 : String(x).toLowerCase().includes($.toLowerCase()))), [n, $, k, F]), y = te(() => {
    if (!s || s.serverSide)
      return g;
    const l = s.currentPage * s.pageSize, x = l + s.pageSize;
    return g.slice(l, x);
  }, [g, s]), K = te(() => s ? s.serverSide && s.totalItems !== void 0 ? Math.ceil(s.totalItems / s.pageSize) : Math.ceil(g.length / s.pageSize) : 1, [s, g.length]), T = L(() => n.filter((l, x) => {
    const w = h(l, x);
    return v.has(w);
  }), [n, v, h]), le = L(
    (l) => {
      const x = /* @__PURE__ */ new Set();
      l && y.forEach((w) => {
        const N = n.indexOf(w), ae = h(w, N);
        x.add(ae);
      }), i === void 0 && X(x), p?.(x, l ? y : []);
    },
    [y, n, h, p, i]
  ), re = L(
    (l, x, w) => {
      const N = new Set(v);
      w ? N.add(l) : N.delete(l), i === void 0 && X(N);
      const ae = n.filter((B, he) => {
        const ue = h(B, he);
        return N.has(ue);
      });
      p?.(N, ae);
    },
    [v, n, h, p, i]
  ), Q = L(
    (l) => {
      J(l), H?.(l);
    },
    [H]
  ), oe = L(
    (l, x, w) => {
      O({ rowKey: l, columnKey: x }), a(w);
    },
    []
  ), ce = L(
    (l, x, w) => {
      u?.(l, x, P, w), O(null), a("");
    },
    [P, u]
  ), c = L(() => {
    O(null), a("");
  }, []), E = L(
    (l) => {
      s && S?.(l, s.pageSize);
    },
    [s, S]
  ), _ = L(
    (l) => {
      D?.(l), s && S?.(0, l);
    },
    [D, S, s]
  ), M = te(() => y.length === 0 ? !1 : y.every((l) => {
    const x = n.indexOf(l), w = h(l, x);
    return v.has(w);
  }), [y, v, n, h]), U = te(() => y.length === 0 ? !1 : y.some((x) => {
    const w = n.indexOf(x), N = h(x, w);
    return v.has(N);
  }) && !M, [y, v, M, n, h]), m = "uiforge-grid";
  return /* @__PURE__ */ d("div", { className: `${m} ${A}`.trim(), children: [
    (k || f.length > 0) && /* @__PURE__ */ d("div", { className: `${m}__toolbar`, children: [
      k && /* @__PURE__ */ e("div", { className: `${m}__search`, children: /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          className: `${m}__search-input`,
          placeholder: Z,
          value: $,
          onChange: (l) => Q(l.target.value),
          "aria-label": "Search"
        }
      ) }),
      f.length > 0 && /* @__PURE__ */ e("div", { className: `${m}__actions`, children: f.map((l, x) => {
        const w = l.disabled || l.requiresSelection && v.size === 0;
        return /* @__PURE__ */ e(
          "button",
          {
            className: `${m}__action-button ${m}__action-button--${l.variant || "primary"}`,
            onClick: () => l.onClick(T()),
            disabled: w,
            children: l.label
          },
          x
        );
      }) })
    ] }),
    /* @__PURE__ */ e("div", { className: `${m}__table-container`, children: /* @__PURE__ */ d("table", { className: `${m}__table`, role: "table", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ d("tr", { children: [
        r && /* @__PURE__ */ e("th", { className: `${m}__header-cell ${m}__header-cell--checkbox`, children: /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: M,
            ref: (l) => {
              l && (l.indeterminate = U);
            },
            onChange: (l) => le(l.target.checked),
            "aria-label": "Select all rows"
          }
        ) }),
        t.map((l) => /* @__PURE__ */ e(
          "th",
          {
            className: `${m}__header-cell`,
            style: { width: l.width },
            children: l.header
          },
          l.key
        ))
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: C ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e(
        "td",
        {
          colSpan: t.length + (r ? 1 : 0),
          className: `${m}__loading-cell`,
          children: "Loading..."
        }
      ) }) : y.length === 0 ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e(
        "td",
        {
          colSpan: t.length + (r ? 1 : 0),
          className: `${m}__empty-cell`,
          children: z
        }
      ) }) : y.map((l, x) => {
        const w = n.indexOf(l), N = h(l, w), ae = v.has(N);
        return /* @__PURE__ */ d(
          "tr",
          {
            className: `${m}__row ${ae ? `${m}__row--selected` : ""}`,
            children: [
              r && /* @__PURE__ */ e("td", { className: `${m}__cell ${m}__cell--checkbox`, children: /* @__PURE__ */ e(
                "input",
                {
                  type: "checkbox",
                  checked: ae,
                  onChange: (B) => re(N, l, B.target.checked),
                  "aria-label": `Select row ${x + 1}`
                }
              ) }),
              t.map((B) => {
                const he = B.field ? l[B.field] : void 0, ue = I?.rowKey === N && I?.columnKey === B.key;
                return /* @__PURE__ */ e("td", { className: `${m}__cell`, children: ue ? /* @__PURE__ */ d("div", { className: `${m}__edit-cell`, children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "text",
                      className: `${m}__edit-input`,
                      value: String(P ?? ""),
                      onChange: (se) => a(se.target.value),
                      onKeyDown: (se) => {
                        se.key === "Enter" ? ce(N, B.key, l) : se.key === "Escape" && c();
                      },
                      autoFocus: !0,
                      "aria-label": `Edit ${B.header}`
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: `${m}__edit-button ${m}__edit-button--save`,
                      onClick: () => ce(N, B.key, l),
                      "aria-label": "Save",
                      children: "✓"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: `${m}__edit-button ${m}__edit-button--cancel`,
                      onClick: c,
                      "aria-label": "Cancel",
                      children: "✕"
                    }
                  )
                ] }) : /* @__PURE__ */ e(
                  "div",
                  {
                    className: `${m}__cell-content ${B.editable ? `${m}__cell-content--editable` : ""}`,
                    onClick: () => {
                      B.editable && oe(N, B.key, he);
                    },
                    onKeyDown: (se) => {
                      B.editable && (se.key === "Enter" || se.key === " ") && oe(N, B.key, he);
                    },
                    tabIndex: B.editable ? 0 : void 0,
                    role: B.editable ? "button" : void 0,
                    "aria-label": B.editable ? `Edit ${B.header}` : void 0,
                    children: B.render ? B.render(he, l, w) : String(he ?? "")
                  }
                ) }, B.key);
              })
            ]
          },
          N
        );
      }) })
    ] }) }),
    s && K > 1 && /* @__PURE__ */ d("div", { className: `${m}__pagination`, children: [
      /* @__PURE__ */ e("div", { className: `${m}__pagination-info`, children: s.serverSide && s.totalItems !== void 0 ? /* @__PURE__ */ d(_e, { children: [
        "Showing ",
        s.currentPage * s.pageSize + 1,
        " to",
        " ",
        Math.min(
          (s.currentPage + 1) * s.pageSize,
          s.totalItems
        ),
        " ",
        "of ",
        s.totalItems,
        " items"
      ] }) : /* @__PURE__ */ d(_e, { children: [
        "Showing ",
        s.currentPage * s.pageSize + 1,
        " to",
        " ",
        Math.min((s.currentPage + 1) * s.pageSize, g.length),
        " ",
        "of ",
        g.length,
        " items"
      ] }) }),
      /* @__PURE__ */ d("div", { className: `${m}__pagination-controls`, children: [
        /* @__PURE__ */ e(
          "button",
          {
            className: `${m}__pagination-button`,
            onClick: () => E(s.currentPage - 1),
            disabled: s.currentPage === 0,
            "aria-label": "Previous page",
            children: "‹"
          }
        ),
        Array.from({ length: K }, (l, x) => x).map((l) => l === 0 || l === K - 1 || Math.abs(l - s.currentPage) <= 1 ? /* @__PURE__ */ e(
          "button",
          {
            className: `${m}__pagination-button ${l === s.currentPage ? `${m}__pagination-button--active` : ""}`,
            onClick: () => E(l),
            "aria-label": `Page ${l + 1}`,
            "aria-current": l === s.currentPage ? "page" : void 0,
            children: l + 1
          },
          l
        ) : l === s.currentPage - 2 || l === s.currentPage + 2 ? /* @__PURE__ */ e("span", { className: `${m}__pagination-ellipsis`, children: "..." }, l) : null),
        /* @__PURE__ */ e(
          "button",
          {
            className: `${m}__pagination-button`,
            onClick: () => E(s.currentPage + 1),
            disabled: s.currentPage >= K - 1,
            "aria-label": "Next page",
            children: "›"
          }
        )
      ] }),
      /* @__PURE__ */ d("div", { className: `${m}__page-size`, children: [
        /* @__PURE__ */ e("label", { htmlFor: "page-size-select", children: "Items per page:" }),
        /* @__PURE__ */ e(
          "select",
          {
            id: "page-size-select",
            className: `${m}__page-size-select`,
            value: s.pageSize,
            onChange: (l) => _(Number(l.target.value)),
            children: q.map((l) => /* @__PURE__ */ e("option", { value: l, children: l }, l))
          }
        )
      ] })
    ] })
  ] });
}, Ie = () => `block-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`, me = (t = "paragraph") => ({
  id: Ie(),
  type: t,
  content: "",
  format: {}
}), St = ({
  initialBlocks: t = [],
  onChange: n,
  placeholder: r = "Start typing...",
  readOnly: i = !1,
  className: h = "",
  maxHeight: p
}) => {
  const [u, f] = j(
    t.length > 0 ? t : [me()]
  ), [k, Z] = j(null), [H, F] = j(null), [s, S] = j(!1), D = G(null);
  ne(() => {
    n && n(u);
  }, [u, n]);
  const q = L((a, v) => {
    f((g) => g.map((y) => y.id === a ? { ...y, ...v } : y));
  }, []), A = L((a = "paragraph", v) => {
    const g = me(a);
    f((y) => {
      if (!v)
        return [...y, g];
      const K = y.findIndex((le) => le.id === v), T = [...y];
      return T.splice(K + 1, 0, g), T;
    }), Z(g.id);
  }, []), C = L((a) => {
    f((v) => {
      const g = v.filter((y) => y.id !== a);
      return g.length > 0 ? g : [me()];
    });
  }, []), z = L((a, v) => {
    f((g) => {
      const y = g.findIndex((re) => re.id === a), K = g.findIndex((re) => re.id === v);
      if (y === -1 || K === -1) return g;
      const T = [...g], [le] = T.splice(y, 1);
      return T.splice(K, 0, le), T;
    });
  }, []), ie = L(
    (a, v) => {
      i || (F(v), a.dataTransfer.effectAllowed = "move");
    },
    [i]
  ), X = L((a) => {
    a.preventDefault(), a.dataTransfer.dropEffect = "move";
  }, []), $ = L(
    (a, v) => {
      a.preventDefault(), H && H !== v && z(H, v), F(null);
    },
    [H, z]
  ), J = L(() => {
    F(null);
  }, []), I = L(
    (a) => {
      k && f(
        (v) => v.map((g) => {
          if (g.id === k) {
            const y = g.format || {};
            return {
              ...g,
              format: {
                ...y,
                [a]: !y[a]
              }
            };
          }
          return g;
        })
      );
    },
    [k]
  ), O = L(
    (a, v) => {
      q(a, { type: v });
    },
    [q]
  ), P = L(
    (a, v) => {
      if (!i) {
        if ((a.metaKey || a.ctrlKey) && a.key === "b")
          a.preventDefault(), I("bold");
        else if ((a.metaKey || a.ctrlKey) && a.key === "i")
          a.preventDefault(), I("italic");
        else if ((a.metaKey || a.ctrlKey) && a.key === "u")
          a.preventDefault(), I("underline");
        else if (a.key === "Enter" && !a.shiftKey) {
          const g = u.find((y) => y.id === v);
          g && g.type !== "code" && (a.preventDefault(), A("paragraph", v));
        } else if (a.key === "Backspace") {
          const g = u.find((y) => y.id === v);
          g && !g.content && u.length > 1 && (a.preventDefault(), C(v));
        }
      }
    },
    [i, u, I, A, C]
  );
  return /* @__PURE__ */ d("div", { className: `uiforge-blocks-editor ${h}`, ref: D, style: { maxHeight: p }, children: [
    !i && s && k && /* @__PURE__ */ e(
      Be,
      {
        selectedBlock: u.find((a) => a.id === k),
        onFormatToggle: I,
        onBlockTypeChange: (a) => O(k, a)
      }
    ),
    /* @__PURE__ */ e("div", { className: "uiforge-blocks-editor__content", children: u.map((a, v) => /* @__PURE__ */ e(
      Se,
      {
        block: a,
        isSelected: k === a.id,
        isDragging: H === a.id,
        readOnly: i,
        placeholder: v === 0 && u.length === 1 ? r : void 0,
        onSelect: () => {
          Z(a.id), S(!0);
        },
        onChange: (g) => q(a.id, g),
        onDelete: () => C(a.id),
        onDragStart: (g) => ie(g, a.id),
        onDragOver: X,
        onDrop: (g) => $(g, a.id),
        onDragEnd: J,
        onKeyDown: (g) => P(g, a.id)
      },
      a.id
    )) }),
    !i && /* @__PURE__ */ e(De, { onAddBlock: A })
  ] });
}, Be = ({ selectedBlock: t, onFormatToggle: n, onBlockTypeChange: r }) => {
  if (!t) return null;
  const i = t.format || {};
  return /* @__PURE__ */ d("div", { className: "uiforge-blocks-editor__toolbar", role: "toolbar", "aria-label": "Text formatting", children: [
    /* @__PURE__ */ e("div", { className: "uiforge-blocks-editor__toolbar-group", children: /* @__PURE__ */ d(
      "select",
      {
        value: t.type,
        onChange: (h) => r(h.target.value),
        className: "uiforge-blocks-editor__toolbar-select",
        "aria-label": "Block type",
        children: [
          /* @__PURE__ */ e("option", { value: "paragraph", children: "Paragraph" }),
          /* @__PURE__ */ e("option", { value: "heading1", children: "Heading 1" }),
          /* @__PURE__ */ e("option", { value: "heading2", children: "Heading 2" }),
          /* @__PURE__ */ e("option", { value: "heading3", children: "Heading 3" }),
          /* @__PURE__ */ e("option", { value: "list", children: "List" }),
          /* @__PURE__ */ e("option", { value: "quote", children: "Quote" }),
          /* @__PURE__ */ e("option", { value: "code", children: "Code" }),
          /* @__PURE__ */ e("option", { value: "image", children: "Image" })
        ]
      }
    ) }),
    /* @__PURE__ */ e("div", { className: "uiforge-blocks-editor__toolbar-divider" }),
    /* @__PURE__ */ d("div", { className: "uiforge-blocks-editor__toolbar-group", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `uiforge-blocks-editor__toolbar-button ${i.bold ? "active" : ""}`,
          onClick: () => n("bold"),
          title: "Bold (Ctrl+B)",
          "aria-label": "Bold",
          "aria-pressed": i.bold,
          children: /* @__PURE__ */ e("strong", { children: "B" })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `uiforge-blocks-editor__toolbar-button ${i.italic ? "active" : ""}`,
          onClick: () => n("italic"),
          title: "Italic (Ctrl+I)",
          "aria-label": "Italic",
          "aria-pressed": i.italic,
          children: /* @__PURE__ */ e("em", { children: "I" })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `uiforge-blocks-editor__toolbar-button ${i.underline ? "active" : ""}`,
          onClick: () => n("underline"),
          title: "Underline (Ctrl+U)",
          "aria-label": "Underline",
          "aria-pressed": i.underline,
          children: /* @__PURE__ */ e("u", { children: "U" })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `uiforge-blocks-editor__toolbar-button ${i.code ? "active" : ""}`,
          onClick: () => n("code"),
          title: "Inline Code",
          "aria-label": "Code",
          "aria-pressed": i.code,
          children: "</>"
        }
      )
    ] })
  ] });
}, Se = ({
  block: t,
  isSelected: n,
  isDragging: r,
  readOnly: i,
  placeholder: h,
  onSelect: p,
  onChange: u,
  onDelete: f,
  onDragStart: k,
  onDragOver: Z,
  onDrop: H,
  onDragEnd: F,
  onKeyDown: s
}) => {
  const S = [
    "uiforge-blocks-editor__block",
    `uiforge-blocks-editor__block--${t.type}`,
    n ? "uiforge-blocks-editor__block--selected" : "",
    r ? "uiforge-blocks-editor__block--dragging" : ""
  ].filter(Boolean).join(" "), D = [
    "uiforge-blocks-editor__block-text",
    t.format?.bold ? "uiforge-blocks-editor__block-text--bold" : "",
    t.format?.italic ? "uiforge-blocks-editor__block-text--italic" : "",
    t.format?.underline ? "uiforge-blocks-editor__block-text--underline" : "",
    t.format?.code ? "uiforge-blocks-editor__block-text--code" : ""
  ].filter(Boolean).join(" "), q = (C) => {
    u({ content: C.target.value });
  }, A = () => {
    const C = {
      value: t.content,
      onChange: q,
      onFocus: p,
      onKeyDown: s,
      placeholder: h,
      readOnly: i,
      className: D
    };
    switch (t.type) {
      case "heading1":
        return /* @__PURE__ */ e(
          "input",
          {
            ...C,
            type: "text",
            className: `${D} uiforge-blocks-editor__heading1`,
            placeholder: h || "Heading 1"
          }
        );
      case "heading2":
        return /* @__PURE__ */ e(
          "input",
          {
            ...C,
            type: "text",
            className: `${D} uiforge-blocks-editor__heading2`,
            placeholder: h || "Heading 2"
          }
        );
      case "heading3":
        return /* @__PURE__ */ e(
          "input",
          {
            ...C,
            type: "text",
            className: `${D} uiforge-blocks-editor__heading3`,
            placeholder: h || "Heading 3"
          }
        );
      case "code":
        return /* @__PURE__ */ e(
          "textarea",
          {
            ...C,
            className: `${D} uiforge-blocks-editor__code`,
            placeholder: h || "Code block",
            rows: 4
          }
        );
      case "quote":
        return /* @__PURE__ */ e(
          "textarea",
          {
            ...C,
            className: `${D} uiforge-blocks-editor__quote`,
            placeholder: h || "Quote",
            rows: 2
          }
        );
      case "image":
        return /* @__PURE__ */ d("div", { className: "uiforge-blocks-editor__image-block", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: t.imageUrl || "",
              onChange: (z) => u({ imageUrl: z.target.value }),
              placeholder: "Image URL",
              className: "uiforge-blocks-editor__image-url",
              readOnly: i
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: t.imageAlt || "",
              onChange: (z) => u({ imageAlt: z.target.value }),
              placeholder: "Alt text",
              className: "uiforge-blocks-editor__image-alt",
              readOnly: i
            }
          ),
          t.imageUrl && /* @__PURE__ */ e(
            "img",
            {
              src: t.imageUrl,
              alt: t.imageAlt || "Block image",
              className: "uiforge-blocks-editor__image-preview"
            }
          )
        ] });
      default:
        return /* @__PURE__ */ e(
          "textarea",
          {
            ...C,
            className: `${D} uiforge-blocks-editor__paragraph`,
            placeholder: h || "Start typing...",
            rows: 1,
            style: { minHeight: "1.5em" }
          }
        );
    }
  };
  return /* @__PURE__ */ d(
    "div",
    {
      className: S,
      draggable: !i,
      onDragStart: k,
      onDragOver: Z,
      onDrop: H,
      onDragEnd: F,
      "data-block-id": t.id,
      children: [
        !i && /* @__PURE__ */ d("div", { className: "uiforge-blocks-editor__block-controls", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "uiforge-blocks-editor__drag-handle",
              title: "Drag to reorder",
              "aria-label": "Drag to reorder",
              children: "⋮⋮"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: "uiforge-blocks-editor__delete-button",
              onClick: f,
              title: "Delete block",
              "aria-label": "Delete block",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "uiforge-blocks-editor__block-content", children: A() })
      ]
    }
  );
}, De = ({ onAddBlock: t }) => {
  const [n, r] = j(!1);
  return /* @__PURE__ */ d("div", { className: "uiforge-blocks-editor__block-menu", children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: "uiforge-blocks-editor__add-button",
        onClick: () => r(!n),
        "aria-label": "Add block",
        "aria-expanded": n,
        children: "+ Add Block"
      }
    ),
    n && /* @__PURE__ */ e("div", { className: "uiforge-blocks-editor__block-menu-dropdown", children: [
      { type: "paragraph", label: "Paragraph", icon: "¶" },
      { type: "heading1", label: "Heading 1", icon: "H1" },
      { type: "heading2", label: "Heading 2", icon: "H2" },
      { type: "heading3", label: "Heading 3", icon: "H3" },
      { type: "list", label: "List", icon: "≡" },
      { type: "quote", label: "Quote", icon: '"' },
      { type: "code", label: "Code", icon: "</>" },
      { type: "image", label: "Image", icon: "🖼" }
    ].map(({ type: h, label: p, icon: u }) => /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: "uiforge-blocks-editor__block-menu-item",
        onClick: () => {
          t(h), r(!1);
        },
        children: [
          /* @__PURE__ */ e("span", { className: "uiforge-blocks-editor__block-menu-icon", children: u }),
          /* @__PURE__ */ e("span", { children: p })
        ]
      },
      h
    )) })
  ] });
};
function pe(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function Ve(t) {
  const n = t.trim(), r = ["javascript:", "data:", "vbscript:", "file:"], i = n.toLowerCase();
  for (const h of r)
    if (i.startsWith(h))
      return "";
  return n;
}
function Dt(t) {
  return t.map((n) => {
    let r = pe(n.content);
    switch (n.format?.bold && (r = `<strong>${r}</strong>`), n.format?.italic && (r = `<em>${r}</em>`), n.format?.underline && (r = `<u>${r}</u>`), n.format?.code && (r = `<code>${r}</code>`), n.type) {
      case "heading1":
        return `<h1>${r}</h1>`;
      case "heading2":
        return `<h2>${r}</h2>`;
      case "heading3":
        return `<h3>${r}</h3>`;
      case "quote":
        return `<blockquote>${r}</blockquote>`;
      case "code":
        return `<pre><code>${pe(n.content)}</code></pre>`;
      case "image": {
        const i = Ve(n.imageUrl || ""), h = pe(n.imageAlt || "");
        return i ? `<img src="${i}" alt="${h}" />` : "";
      }
      case "list":
        return `<ul><li>${r}</li></ul>`;
      default:
        return `<p>${r}</p>`;
    }
  }).join(`
`);
}
function Vt(t) {
  return t.map((n) => {
    let r = n.content;
    switch (n.format?.bold && (r = `**${r}**`), n.format?.italic && (r = `*${r}*`), n.format?.code && (r = `\`${r}\``), n.type) {
      case "heading1":
        return `# ${r}`;
      case "heading2":
        return `## ${r}`;
      case "heading3":
        return `### ${r}`;
      case "quote":
        return `> ${r}`;
      case "code":
        return `\`\`\`
${n.content}
\`\`\``;
      case "image":
        return `![${n.imageAlt || ""}](${n.imageUrl || ""})`;
      case "list":
        return `- ${r}`;
      default:
        return r;
    }
  }).join(`

`);
}
function Ht(t) {
  return JSON.stringify(t, null, 2);
}
const At = ({
  options: t = [],
  value: n,
  onChange: r,
  onSearch: i,
  placeholder: h = "Select an option...",
  disabled: p = !1,
  clearable: u = !1,
  className: f = "",
  renderOption: k,
  renderValue: Z,
  loading: H = !1,
  maxHeight: F = "300px",
  debounceMs: s = 300,
  searchable: S = !0,
  noOptionsMessage: D = "No options found",
  ariaLabel: q,
  enableCache: A = !1,
  cacheTTL: C,
  refreshOnOpen: z = !1,
  onClearCache: ie,
  onForceRefresh: X
}) => {
  const [$, J] = j(!1), [I, O] = j(""), [P, a] = j([]), [v, g] = j(0), [y, K] = j(!1), T = G(null), le = G(null), re = G(null), Q = G(null), oe = G(null), ce = G(i), c = G(null), E = G(!1), _ = G(/* @__PURE__ */ new Map()), M = G(A), U = G(C), m = L((o, b = 0) => o.reduce((Y, V) => {
    const R = { ...V, level: b };
    return Y.push(R), V.children && V.children.length > 0 && Y.push(...m(V.children, b + 1)), Y;
  }, []), []), l = (o) => typeof o == "string" && (o.startsWith("http://") || o.startsWith("https://") || o.startsWith("data:") || o.startsWith("/")), x = te(() => m(P.length > 0 ? P : t).find((b) => b.value === n) || null, [n, t, P, m]), w = L((o, b) => {
    if (!b.trim()) return o;
    const Y = b.toLowerCase(), V = (R) => R.reduce((ee, de) => {
      const ge = de.label.toLowerCase().includes(Y), fe = de.children ? V(de.children) : [];
      return (ge || fe.length > 0) && ee.push({
        ...de,
        children: fe.length > 0 ? fe : de.children
      }), ee;
    }, []);
    return V(o);
  }, []);
  ne(() => {
    ce.current = i, oe.current = null;
  }, [i]), ne(() => {
    M.current = A;
  }, [A]), ne(() => {
    U.current = C;
  }, [C]), ne(() => {
    ie && ie(() => {
      _.current.clear();
    }), X && X(() => {
      if (!ce.current) return;
      c.current && c.current.abort(), c.current = new AbortController();
      const o = c.current.signal;
      K(!0), (async () => {
        try {
          const b = Date.now(), Y = I, V = _.current.get(Y), R = V && (!U.current || b - V.timestamp < U.current);
          let ee;
          M.current && R ? ee = V.data : (ee = await (ce.current ? ce.current(I, o) : i?.(I, o) ?? []), !o.aborted && M.current && _.current.set(Y, { data: ee, timestamp: b })), o.aborted || (a(ee), oe.current = I);
        } catch (b) {
          console.error(b), a([]);
        } finally {
          K(!1);
        }
      })();
    });
  }, [ie, X, I]), ne(() => {
    if (i && $) {
      const o = oe.current === I, b = !E.current && $;
      return o && !(z && b) ? void 0 : (Q.current && clearTimeout(Q.current), Q.current = setTimeout(async () => {
        c.current && c.current.abort(), c.current = new AbortController();
        const V = c.current.signal;
        K(!0);
        try {
          let R;
          const ee = I, de = _.current.get(ee), ge = Date.now(), fe = de && (!U.current || ge - de.timestamp < U.current);
          if (M.current && fe ? R = de.data : (R = await (ce.current ? ce.current(I, V) : i(I, V)), !V.aborted && M.current && _.current.set(ee, { data: R, timestamp: ge })), V.aborted) return;
          a(R), oe.current = I;
        } catch (R) {
          console.error("Error fetching options:", R), a([]);
        } finally {
          K(!1);
        }
      }, s), () => {
        Q.current && clearTimeout(Q.current), c.current && (c.current.abort(), c.current = null);
      });
    } else i || a(w(t, I));
    E.current = $;
  }, [I, $, t, s, w, z]), ne(() => {
    i || a(t);
  }, [t, i]), ne(() => {
    const o = (b) => {
      T.current && !T.current.contains(b.target) && (J(!1), O(""));
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, []);
  const N = te(() => m(P.length > 0 ? P : t).filter((b) => !b.disabled), [P, t, m]), ae = te(() => m(P.length > 0 ? P : t), [P, t, m]), B = te(() => {
    const o = /* @__PURE__ */ new Map();
    return ae.forEach((b) => {
      const Y = JSON.stringify({ value: b.value, label: b.label }), V = N.findIndex(
        (R) => R.value === b.value && R.label === b.label
      );
      o.set(Y, V);
    }), o;
  }, [ae, N]), he = (o) => {
    if (!p)
      switch (o.key) {
        case "ArrowDown":
          o.preventDefault(), $ ? g((b) => b < N.length - 1 ? b + 1 : 0) : J(!0);
          break;
        case "ArrowUp":
          o.preventDefault(), $ && g((b) => b > 0 ? b - 1 : N.length - 1);
          break;
        case "Enter":
          o.preventDefault(), $ && N[v] ? ue(N[v]) : J(!$);
          break;
        case "Escape":
          o.preventDefault(), J(!1), O("");
          break;
        case "Tab":
          $ && (J(!1), O(""));
          break;
      }
  };
  ne(() => {
    if ($ && re.current) {
      const o = re.current.querySelector(
        `[data-index="${v}"]`
      );
      o && typeof o.scrollIntoView == "function" && o.scrollIntoView({ block: "nearest" });
    }
  }, [v, $]);
  const ue = (o) => {
    o.disabled || (r?.(o.value, o), J(!1), O(""), g(0));
  }, se = (o) => {
    o.stopPropagation(), r?.(null, null), O("");
  }, Ce = () => {
    p || J((o) => {
      const b = !o;
      return b && setTimeout(() => le.current?.focus(), 0), b;
    });
  };
  ne(() => {
    $ || (oe.current = null);
  }, [$]);
  const $e = (o) => {
    O(o.target.value), $ || J(!0), g(0);
  }, Ne = (o) => {
    const b = (o.level || 0) * 20;
    return /* @__PURE__ */ d("div", { className: "uiforge-combobox-option-content", style: { paddingLeft: `${b}px` }, children: [
      o.icon && /* @__PURE__ */ e("span", { className: "uiforge-combobox-option-icon", children: l(o.icon) ? /* @__PURE__ */ e(
        "img",
        {
          src: o.icon,
          alt: "",
          className: "uiforge-combobox-option-icon-img"
        }
      ) : o.icon }),
      /* @__PURE__ */ e("span", { className: "uiforge-combobox-option-label", children: o.label })
    ] });
  }, Me = (o) => o ? /* @__PURE__ */ d("div", { className: "uiforge-combobox-value-content", children: [
    o.icon && /* @__PURE__ */ e("span", { className: "uiforge-combobox-value-icon", children: l(o.icon) ? /* @__PURE__ */ e("img", { src: o.icon, alt: "", className: "uiforge-combobox-value-icon-img" }) : o.icon }),
    /* @__PURE__ */ e("span", { className: "uiforge-combobox-value-label", children: o.label })
  ] }) : h, W = "uiforge-combobox", Le = [
    W,
    $ && `${W}--open`,
    p && `${W}--disabled`,
    f
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ d(
    "div",
    {
      ref: T,
      className: Le,
      onKeyDown: he,
      role: "combobox",
      "aria-expanded": $,
      "aria-haspopup": "listbox",
      "aria-label": q,
      "aria-disabled": p,
      tabIndex: p ? -1 : 0,
      children: [
        /* @__PURE__ */ d("div", { className: `${W}-control`, onClick: Ce, children: [
          S && $ ? /* @__PURE__ */ e(
            "input",
            {
              ref: le,
              type: "text",
              className: `${W}-input`,
              value: I,
              onChange: $e,
              placeholder: h,
              disabled: p,
              "aria-autocomplete": "list",
              "aria-controls": `${W}-listbox`
            }
          ) : /* @__PURE__ */ e("div", { className: `${W}-value`, children: Z ? Z(x) : Me(x) }),
          /* @__PURE__ */ d("div", { className: `${W}-indicators`, children: [
            u && n !== null && n !== void 0 && !p && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: `${W}-clear`,
                onClick: se,
                "aria-label": "Clear selection",
                tabIndex: -1,
                children: "×"
              }
            ),
            /* @__PURE__ */ e("span", { className: `${W}-arrow`, children: "▼" })
          ] })
        ] }),
        $ && /* @__PURE__ */ e(
          "div",
          {
            ref: re,
            className: `${W}-dropdown`,
            style: { maxHeight: F },
            role: "listbox",
            id: `${W}-listbox`,
            children: H || y ? /* @__PURE__ */ e("div", { className: `${W}-loading`, children: "Loading..." }) : N.length === 0 ? /* @__PURE__ */ e("div", { className: `${W}-no-options`, children: D }) : ae.map((o) => {
              const b = JSON.stringify({ value: o.value, label: o.label }), Y = B.get(b) ?? -1, V = o.value === n, R = Y === v, ee = [
                `${W}-option`,
                V && `${W}-option--selected`,
                R && `${W}-option--highlighted`,
                o.disabled && `${W}-option--disabled`
              ].filter(Boolean).join(" ");
              return /* @__PURE__ */ e(
                "div",
                {
                  className: ee,
                  onClick: () => ue(o),
                  role: "option",
                  "aria-selected": V,
                  "aria-disabled": o.disabled,
                  "data-index": Y,
                  children: k ? k(o) : Ne(o)
                },
                b
              );
            })
          }
        )
      ]
    }
  );
}, He = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 5a3 3 0 100 6 3 3 0 000-6z" }) }), Ae = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" }) }), Ee = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" }),
  /* @__PURE__ */ e("path", { d: "M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" })
] }), ze = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 13H8.06l-2.573 2.573A1.458 1.458 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25v-8.5zM1.75 2.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h6.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H1.75z" }) }), Pe = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" }) }), Te = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" }) }), We = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" }) }), Oe = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" }) }), Ue = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M4.53 4.75A.75.75 0 015 6.25h6a.75.75 0 00.53-1.28l-3-3a.75.75 0 00-1.06 0l-3 3zm.47 6.47a.75.75 0 01.53-.22h6a.75.75 0 01.53 1.28l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 01-.01-1.06h.01z" }) }), Re = ({
  size: t = 20,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 20 20", fill: "none", className: n, children: [
  /* @__PURE__ */ e(
    "path",
    {
      d: "M10 2L6 6M10 2L14 6M10 2V7.5",
      stroke: r,
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ e(
    "path",
    {
      d: "M3 10H17",
      stroke: r,
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeDasharray: "1 2"
    }
  ),
  /* @__PURE__ */ e(
    "path",
    {
      d: "M10 18L6 14M10 18L14 14M10 18V12.5",
      stroke: r,
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  )
] }), je = ({
  size: t = 20,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 20 20", fill: "none", className: n, children: [
  /* @__PURE__ */ e(
    "path",
    {
      d: "M10 7.5L6 4M10 7.5L14 4M10 7.5V2",
      stroke: r,
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ e(
    "path",
    {
      d: "M3 10H17",
      stroke: r,
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeDasharray: "1 2"
    }
  ),
  /* @__PURE__ */ e(
    "path",
    {
      d: "M10 12.5L6 16M10 12.5L14 16M10 12.5V18",
      stroke: r,
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  )
] }), Fe = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" }) }), qe = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" }) }), Ke = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: "none", className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "8", cy: "8", r: "7", stroke: r, strokeWidth: "1.5" }),
  /* @__PURE__ */ e(
    "path",
    {
      d: "M8 1C11.866 1 15 4.134 15 8C15 11.866 11.866 15 8 15",
      fill: r
    }
  ),
  /* @__PURE__ */ e("circle", { cx: "8", cy: "5", r: "2", fill: r === "currentColor" ? "white" : "#fff" }),
  /* @__PURE__ */ e("circle", { cx: "8", cy: "11", r: "2", fill: r }),
  /* @__PURE__ */ e("circle", { cx: "8", cy: "5", r: "0.5", fill: r }),
  /* @__PURE__ */ e("circle", { cx: "8", cy: "11", r: "0.5", fill: r === "currentColor" ? "white" : "#fff" })
] }), Ze = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "8", cy: "3", r: "1.5" }),
  /* @__PURE__ */ e("path", { d: "M8 5C6.5 5 5 6 5 7.5V9C5 9 5.5 10 6 10.5L5 14H7L8 11L9 14H11L10 10.5C10.5 10 11 9 11 9V7.5C11 6 9.5 5 8 5Z" }),
  /* @__PURE__ */ e("path", { d: "M4 9L2 10M12 9L14 10", strokeWidth: "1", stroke: r, fill: "none" })
] }), Ge = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "8", cy: "2.5", r: "1.5" }),
  /* @__PURE__ */ e("path", { d: "M8 4.5L6 8L4 14H6L7 10H9L10 14H12L10 8L8 4.5Z" }),
  /* @__PURE__ */ e("path", { d: "M6 8L3 6M10 8L13 6", strokeWidth: "1.5", stroke: r, fill: "none" })
] }), Je = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("rect", { x: "1", y: "6", width: "2", height: "4", rx: "0.5" }),
  /* @__PURE__ */ e("rect", { x: "13", y: "6", width: "2", height: "4", rx: "0.5" }),
  /* @__PURE__ */ e("rect", { x: "3", y: "5.5", width: "1", height: "5" }),
  /* @__PURE__ */ e("rect", { x: "12", y: "5.5", width: "1", height: "5" }),
  /* @__PURE__ */ e("rect", { x: "4", y: "7", width: "8", height: "2", rx: "0.5" })
] }), Ye = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "10", cy: "2.5", r: "1.5" }),
  /* @__PURE__ */ e("path", { d: "M9 4.5L8 6L6 7L4 8L6 9L8 8L10 7L11 9L10 12L9 14H11L12 11L13 9L12 6L10 4.5H9Z" }),
  /* @__PURE__ */ e("path", { d: "M6 14H4L5 11" })
] }), Qe = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: "none", className: n, children: /* @__PURE__ */ e(
  "path",
  {
    d: "M2 8H5L6.5 5L8 11L9.5 8H14",
    stroke: r,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }
) }), Xe = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M4 8C4 6 5 4 7 4C8 4 8.5 4.5 8.5 5.5C8.5 6 8.8 6.5 9.5 6.5C10.5 6.5 11 7 11 8C11 9.5 10 11 8 12C6 13 4 12 4 10V8Z" }),
  /* @__PURE__ */ e("circle", { cx: "7", cy: "3", r: "1.5" })
] }), et = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("rect", { x: "2", y: "2", width: "12", height: "3", rx: "0.5" }),
  /* @__PURE__ */ e("rect", { x: "2", y: "6.5", width: "12", height: "3", rx: "0.5" }),
  /* @__PURE__ */ e("rect", { x: "2", y: "11", width: "12", height: "3", rx: "0.5" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "3.5", r: "0.5" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "8", r: "0.5" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "12.5", r: "0.5" })
] }), tt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("ellipse", { cx: "8", cy: "3", rx: "5", ry: "2" }),
  /* @__PURE__ */ e("path", { d: "M3 3V13C3 14.1 5.2 15 8 15C10.8 15 13 14.1 13 13V3" }),
  /* @__PURE__ */ e("path", { d: "M3 8C3 9.1 5.2 10 8 10C10.8 10 13 9.1 13 8" })
] }), rt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M4.5 10C2.5 10 1 8.5 1 6.5C1 4.5 2.5 3 4.5 3C4.6 3 4.7 3 4.8 3.05C5.3 1.8 6.5 1 8 1C10 1 11.5 2.5 11.5 4.5C11.5 4.6 11.5 4.7 11.5 4.8C12.9 5.1 14 6.3 14 7.75C14 9.5 12.5 11 10.75 11H4.5Z" }) }), nt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25V2.75z" }),
  /* @__PURE__ */ e(
    "path",
    {
      d: "M3 5.5L6 8L3 10.5",
      stroke: "white",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    }
  ),
  /* @__PURE__ */ e("line", { x1: "8", y1: "10.5", x2: "12", y2: "10.5", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" })
] }), it = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M4.75 7.5a3.25 3.25 0 116.5 0v3.75a3.25 3.25 0 01-6.5 0V7.5z" }),
  /* @__PURE__ */ e("path", { d: "M5.75 7.5c0-.69.56-1.25 1.25-1.25h2c.69 0 1.25.56 1.25 1.25M4 5.5L2 4M12 5.5L14 4M4 9H1M15 9H12M4 12L2 13.5M12 12L14 13.5", stroke: r, strokeWidth: "1.5", fill: "none" }),
  /* @__PURE__ */ e("ellipse", { cx: "8", cy: "4", rx: "2.5", ry: "1.5" })
] }), lt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M5.28 3.72a.75.75 0 00-1.06 1.06L7.44 8l-3.22 3.22a.75.75 0 101.06 1.06l3.75-3.75a.75.75 0 000-1.06L5.28 3.72zM8.5 11.5a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z" }) }), ct = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M8 0C6 0 4.5 2 3.5 5L1 7L4 8L5 11L7 8.5C9 7.5 11 6 13 3C14 2 15 0 16 0C16 0 14 2 13 3C11 5 9.5 6.5 8 7.5M10 4C10.552 4 11 3.552 11 3C11 2.448 10.552 2 10 2C9.448 2 9 2.448 9 3C9 3.552 9.448 4 10 4Z" }),
  /* @__PURE__ */ e("path", { d: "M2 12C2 12 0 14 0 16C2 16 4 14 4 14" })
] }), at = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("rect", { x: "6", y: "6", width: "4", height: "4", rx: "0.5" }),
  /* @__PURE__ */ e("path", { d: "M4 4L2 2M4 12L2 14M12 4L14 2M12 12L14 14", strokeWidth: "1.5", stroke: r, strokeLinecap: "round" }),
  /* @__PURE__ */ e("rect", { x: "1", y: "1", width: "1.5", height: "1.5" }),
  /* @__PURE__ */ e("rect", { x: "13.5", y: "1", width: "1.5", height: "1.5" }),
  /* @__PURE__ */ e("rect", { x: "1", y: "13.5", width: "1.5", height: "1.5" }),
  /* @__PURE__ */ e("rect", { x: "13.5", y: "13.5", width: "1.5", height: "1.5" }),
  /* @__PURE__ */ e("circle", { cx: "8", cy: "8", r: "1" })
] }), ot = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M8 1C4 1 2 3 2 6C2 8 2 10 3 11C3.5 11.5 4 12 5 12C5.5 12 6 11.5 6.5 10.5C7 9.5 7.5 9 8 9C8.5 9 9 9.5 9.5 10.5C10 11.5 10.5 12 11 12C12 12 12.5 11.5 13 11C14 10 14 8 14 6C14 3 12 1 8 1Z" }),
  /* @__PURE__ */ e("ellipse", { cx: "6", cy: "5.5", rx: "1.5", ry: "2", fill: "white" }),
  /* @__PURE__ */ e("ellipse", { cx: "10", cy: "5.5", rx: "1.5", ry: "2", fill: "white" }),
  /* @__PURE__ */ e("circle", { cx: "6", cy: "5.5", r: "0.75", fill: r }),
  /* @__PURE__ */ e("circle", { cx: "10", cy: "5.5", r: "0.75", fill: r })
] }), st = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "8", cy: "8", r: "5" }),
  /* @__PURE__ */ e("ellipse", { cx: "8", cy: "8", rx: "8", ry: "2.5", fill: "none", stroke: r, strokeWidth: "1", opacity: "0.6" }),
  /* @__PURE__ */ e("circle", { cx: "6", cy: "6", r: "1", opacity: "0.4", fill: r === "currentColor" ? "white" : "#fff" })
] }), dt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M1 8L6 6L14 2L12 10L10 8L8 14H6L8 8L1 8Z" }),
  /* @__PURE__ */ e("path", { d: "M10 8L12 10", strokeWidth: "1.5", stroke: r })
] }), ht = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M1.5 13.5V2.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v11a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5zM5 13.5V5.5a.5.5 0 01.5-.5H6a.5.5 0 01.5.5v8a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5zM8.5 13.5V7.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v6a.5.5 0 01-.5.5H9a.5.5 0 01-.5-.5zM12 13.5V3.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5z" }) }), ut = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
  /* @__PURE__ */ e("circle", { cx: "11", cy: "4", r: "2" }),
  /* @__PURE__ */ e("path", { d: "M1 14V12C1 10.5 2.5 9 5 9C7.5 9 9 10.5 9 12V14H1Z" }),
  /* @__PURE__ */ e("path", { d: "M7 14V12C7 10.5 8.5 9 11 9C13.5 9 15 10.5 15 12V14H7Z" })
] }), ft = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M3 1.75C3 .784 3.784 0 4.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-8.5A1.75 1.75 0 013 14.25V1.75z" }),
  /* @__PURE__ */ e("path", { d: "M10 0v3.5c0 .275.225.5.5.5H14", fill: r === "currentColor" ? "white" : "#fff" })
] }), gt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zM2.5 7.5v6.75c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V7.5h-11z" }) }), mt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M6.75 0A1.75 1.75 0 005 1.75V3H1.75C.784 3 0 3.784 0 4.75v8.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H11V1.75A1.75 1.75 0 009.25 0h-2.5zM9.5 3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25V3h3z" }) }), pt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" }) }), vt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M3.25 1A2.25 2.25 0 011 3.25v9.5A2.25 2.25 0 013.25 15h9.5A2.25 2.25 0 0115 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5zM2.5 3.25a.75.75 0 01.75-.75h9.5a.75.75 0 01.75.75v9.5a.75.75 0 01-.75.75h-9.5a.75.75 0 01-.75-.75v-9.5z" }),
  /* @__PURE__ */ e("path", { d: "M8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z" })
] }), bt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M6 1h4v1H6V1zM5.5 3h5L13 13c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2L5.5 3z" }),
  /* @__PURE__ */ e("circle", { cx: "7", cy: "8", r: "1", fill: r === "currentColor" ? "white" : "#fff", opacity: "0.5" }),
  /* @__PURE__ */ e("circle", { cx: "9", cy: "10", r: "0.75", fill: r === "currentColor" ? "white" : "#fff", opacity: "0.5" })
] }), yt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M8 0L0 3v5c0 5 3 7.5 8 8 5-.5 8-3 8-8V3L8 0z" }),
  /* @__PURE__ */ e("path", { d: "M7 10L4.5 7.5l1-1L7 8l3.5-3.5 1 1L7 10z", fill: r === "currentColor" ? "white" : "#fff" })
] }), _t = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ d("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("rect", { x: "1", y: "1", width: "9", height: "11", rx: "1" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "4", x2: "7", y2: "4", stroke: r === "currentColor" ? "white" : "#fff", strokeWidth: "1" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "6.5", x2: "7", y2: "6.5", stroke: r === "currentColor" ? "white" : "#fff", strokeWidth: "1" }),
  /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "3", fill: "none", stroke: r, strokeWidth: "1.5" }),
  /* @__PURE__ */ e("line", { x1: "13", y1: "13", x2: "15.5", y2: "15.5", stroke: r, strokeWidth: "1.5", strokeLinecap: "round" })
] }), wt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M4.48 7.27c.26.26 1.28 1.33 1.28 1.33l.56-.58-.88-.91 1.69-1.8s-.76-.74-.43-.45c.32-1.19.03-2.51-.87-3.44C4.93.5 3.66.2 2.52.51l1.93 2-.51 1.96-1.89.52-1.93-2C-.19 4.17.1 5.48 1 6.4c.94.98 2.29 1.26 3.48.87zm6.44 1.94l-2.33 2.3 3.84 3.98c.31.33.73.49 1.14.49.41 0 .82-.16 1.14-.49.63-.65.63-1.7 0-2.35l-3.79-3.93zM16 2.53L13.55 0 6.33 7.46l.88.91-4.31 4.46-.99.53-1.39 2.27.35.37 2.2-1.44.51-1.02L7.9 9.08l.88.91L16 2.53z" }) }), we = {
  commit: He,
  pr: Ae,
  issue: Ee,
  comment: ze,
  star: Pe,
  fork: Te,
  merge: We,
  release: Oe,
  deploy: Ue
}, xe = {
  unfold: Re,
  fold: je,
  close: Fe,
  check: qe
}, Et = {
  taichi: Ke,
  meditation: Ze,
  yoga: Ge
}, zt = {
  dumbbell: Je,
  running: Ye,
  heartrate: Qe,
  strength: Xe
}, Pt = {
  server: et,
  database: tt,
  cloud: rt,
  terminal: nt,
  bug: it,
  code: lt
}, Tt = {
  rocket: ct,
  satellite: at,
  alien: ot,
  planet: st,
  telescope: dt
}, Wt = {
  chart: ht,
  meeting: ut,
  document: ft,
  calendar: gt,
  briefcase: mt
}, Ot = {
  gitbranch: pt,
  prdraft: vt,
  testing: bt,
  deployment: yt,
  review: _t,
  build: wt
}, xt = (t) => {
  const n = we[t] || we.commit;
  return /* @__PURE__ */ e(n, { size: 16 });
}, ve = (t, n = 2) => {
  if (t.length === 0) return [];
  const r = [];
  let i = [], h = null;
  return t.forEach((p, u) => {
    h === p.type ? i.push(p) : (i.length >= n && h ? r.push(ke(i, h)) : i.forEach((f) => {
      r.push({
        id: f.id.toString(),
        type: f.type,
        count: 1,
        title: f.title,
        timestamp: new Date(f.timestamp),
        icon: f.icon,
        events: [f]
      });
    }), i = [p], h = p.type), u === t.length - 1 && (i.length >= n && h ? r.push(ke(i, h)) : i.forEach((f) => {
      r.push({
        id: f.id.toString(),
        type: f.type,
        count: 1,
        title: f.title,
        timestamp: new Date(f.timestamp),
        icon: f.icon,
        events: [f]
      });
    }));
  }), r;
}, ke = (t, n) => {
  const r = t.reduce(
    (u, f) => {
      const k = f.metadata?.repository || "unknown";
      return u[k] || (u[k] = []), u[k].push(f), u;
    },
    {}
  ), i = Object.entries(r), h = i.length > 1;
  let p = "";
  if (h)
    p = `Created ${t.length} ${be(n)} in ${i.length} repositories`;
  else {
    const u = i[0][0];
    p = `Created ${t.length} ${be(n)}${u !== "unknown" ? ` in ${u}` : ""}`;
  }
  return {
    id: `group-${n}-${t[0].id}`,
    type: n,
    count: t.length,
    title: p,
    timestamp: new Date(t[0].timestamp),
    icon: t[0].icon,
    events: t,
    children: h ? i.map(([u, f]) => ({
      id: `group-${n}-${u}`,
      type: n,
      count: f.length,
      title: `Created ${f.length} ${be(n)} in ${u}`,
      timestamp: new Date(f[0].timestamp),
      icon: f[0].icon,
      events: f
    })) : void 0
  };
}, be = (t) => ({
  pr: "pull requests",
  issue: "issues",
  commit: "commits",
  comment: "comments",
  star: "stars",
  fork: "forks",
  merge: "merges",
  release: "releases",
  deploy: "deployments"
})[t] || `${t}s`, ye = (t) => {
  if (t.length === 0) return [];
  const n = [];
  let r = null;
  return t.forEach((i, h) => {
    if ("type" in i && i.type === "date-separator") {
      n.push(i);
      return;
    }
    const u = i.timestamp, f = `${u.getFullYear()}-${u.getMonth()}`;
    if (f !== r) {
      const k = {
        id: `sep-${h}`,
        type: "date-separator",
        date: u,
        label: kt(u)
      };
      n.push(k), r = f;
    }
    n.push(i);
  }), n;
}, kt = (t) => t.toLocaleDateString("en-US", { month: "long", year: "numeric" }), Ct = (t) => {
  const n = typeof t == "string" ? new Date(t) : t, i = (/* @__PURE__ */ new Date()).getTime() - n.getTime(), h = Math.floor(i / 1e3), p = Math.floor(h / 60), u = Math.floor(p / 60), f = Math.floor(u / 24);
  return h < 60 ? "just now" : p < 60 ? `${p}m ago` : u < 24 ? `${u}h ago` : f < 30 ? `${f}d ago` : n.toLocaleDateString();
}, Ut = ({
  events: t,
  theme: n = "light",
  className: r = "",
  showLoadMore: i = !0,
  loading: h = !1,
  onLoadMore: p,
  pagination: u,
  maxHeight: f,
  showMoreThreshold: k = 100,
  initiallyExpandedAll: Z = !1,
  emptyMessage: H = "No activity to display",
  onToggleExpand: F,
  enableGrouping: s = !0,
  groupingThreshold: S = 2,
  showDateSeparators: D = !0,
  showTimeline: q = !0,
  scale: A = 1,
  renderIcon: C,
  renderEvent: z
}) => {
  const [ie, X] = j(() => {
    const c = /* @__PURE__ */ new Set();
    return (s ? D ? ye(ve(t, S)) : ve(t, S) : t.map((_) => ({
      id: _.id.toString(),
      type: _.type,
      count: 1,
      title: _.title,
      timestamp: new Date(_.timestamp),
      icon: _.icon,
      events: [_]
    }))).forEach((_) => {
      if ("events" in _ && _.type !== "date-separator") {
        const M = _;
        (Z || M.events.some((U) => U.initiallyExpanded)) && c.add(M.id), M.children && M.children.forEach((U) => {
          (Z || U.events.some((m) => m.initiallyExpanded)) && c.add(U.id);
        });
      }
    }), c;
  }), [$, J] = j(!1), I = G(null), O = G(null), P = te(() => {
    if (!s) {
      const E = t.map((_) => ({
        id: _.id.toString(),
        type: _.type,
        count: 1,
        title: _.title,
        timestamp: new Date(_.timestamp),
        icon: _.icon,
        events: [_]
      }));
      return D ? ye(E) : E;
    }
    const c = ve(t, S);
    return D ? ye(c) : c;
  }, [t, s, S, D]), a = L(() => {
    if (!O.current || !i || !p) return;
    const { scrollTop: c, scrollHeight: E, clientHeight: _ } = O.current, M = E - c - _;
    J(M <= k);
  }, [i, p, k]);
  ne(() => {
    const c = O.current;
    if (c)
      return c.addEventListener("scroll", a), a(), () => {
        c.removeEventListener("scroll", a);
      };
  }, [a]);
  const v = L(
    (c, E) => {
      X((_) => {
        const M = new Set(_), U = M.has(c);
        return U ? M.delete(c) : M.add(c), F?.(E, !U), M;
      });
    },
    [F]
  ), g = (c, E = !1) => {
    const _ = ie.has(c.id), M = c.children && c.children.length > 0, U = c.count > 1, m = c.count === 1 && c.events[0]?.description, l = U || M || m, x = c.count === 1 && c.events.length === 1 ? c.events[0].id : c.id;
    return z && c.count === 1 && c.events.length === 1 ? /* @__PURE__ */ d(
      "div",
      {
        className: `activity-stream__item ${E ? "activity-stream__item--child" : ""}`,
        "data-event-id": c.id,
        children: [
          q && !E && /* @__PURE__ */ e("div", { className: "activity-stream__timeline-marker" }),
          z(c.events[0])
        ]
      },
      c.id
    ) : /* @__PURE__ */ d(
      "div",
      {
        className: `activity-stream__item ${E ? "activity-stream__item--child" : ""}`,
        "data-event-id": c.id,
        children: [
          q && !E && /* @__PURE__ */ e("div", { className: "activity-stream__timeline-marker" }),
          /* @__PURE__ */ e("div", { className: "activity-stream__icon", children: C && c.events.length === 1 ? C(c.events[0]) : c.icon || xt(c.type) }),
          /* @__PURE__ */ d("div", { className: "activity-stream__content", children: [
            /* @__PURE__ */ d(
              "div",
              {
                className: `activity-stream__header ${l ? "activity-stream__header--clickable" : ""}`,
                onClick: () => l && v(c.id, x),
                onKeyDown: (w) => {
                  l && (w.key === "Enter" || w.key === " ") && (w.preventDefault(), v(c.id, x));
                },
                role: l ? "button" : void 0,
                tabIndex: l ? 0 : void 0,
                "aria-expanded": l ? _ : void 0,
                children: [
                  /* @__PURE__ */ e("div", { className: "activity-stream__title", children: c.title }),
                  /* @__PURE__ */ e("div", { className: "activity-stream__timestamp", children: Ct(c.timestamp) }),
                  l && /* @__PURE__ */ e("div", { className: "activity-stream__toggle", children: _ ? /* @__PURE__ */ e(xe.fold, { size: 16 }) : /* @__PURE__ */ e(xe.unfold, { size: 16 }) })
                ]
              }
            ),
            _ && M && c.children && /* @__PURE__ */ e("div", { className: "activity-stream__children", children: c.children.map((w) => g(w, !0)) }),
            _ && !M && c.events.length > 1 && /* @__PURE__ */ e("div", { className: "activity-stream__events-list", children: c.events.map(
              (w) => z ? /* @__PURE__ */ e("div", { className: "activity-stream__event-item", children: z(w) }, w.id) : /* @__PURE__ */ d("div", { className: "activity-stream__event-item", children: [
                /* @__PURE__ */ e("div", { className: "activity-stream__event-title", children: w.title }),
                w.description && /* @__PURE__ */ e("div", { className: "activity-stream__event-description", children: w.description })
              ] }, w.id)
            ) }),
            _ && c.count === 1 && c.events[0].description && /* @__PURE__ */ e("div", { className: "activity-stream__description", children: c.events[0].description })
          ] })
        ]
      },
      c.id
    );
  }, y = (c) => /* @__PURE__ */ d("div", { className: "activity-stream__date-separator", children: [
    /* @__PURE__ */ e("div", { className: "activity-stream__date-label", children: c.label }),
    /* @__PURE__ */ e("div", { className: "activity-stream__date-line" })
  ] }, c.id), K = u?.hasMore !== void 0 ? u.hasMore : u?.totalItems !== void 0 ? t.length < u.totalItems : !0, T = "activity-stream", le = `${T}--${n}`, re = q ? `${T}--with-timeline` : "";
  let Q = `${T} ${le} ${re} ${r}`.trim();
  return A && A < 1 && (Q = `${Q} ${T}--compact`), A && A > 1 && (Q = `${Q} ${T}--spacious`), /* @__PURE__ */ e("div", { ref: I, className: Q, "data-theme": n, children: /* @__PURE__ */ d(
    "div",
    {
      ref: O,
      className: "activity-stream__container",
      style: {
        ...f ? { maxHeight: f } : void 0,
        ...{ "--activity-stream-scale": A }
      },
      children: [
        P.length === 0 ? /* @__PURE__ */ e("div", { className: "activity-stream__empty", children: H }) : /* @__PURE__ */ e("div", { className: "activity-stream__items", children: P.map(
          (c) => "type" in c && c.type === "date-separator" ? y(c) : g(c)
        ) }),
        h && /* @__PURE__ */ d("div", { className: "activity-stream__loading", children: [
          /* @__PURE__ */ e("div", { className: "activity-stream__spinner" }),
          /* @__PURE__ */ e("span", { children: "Loading..." })
        ] }),
        i && !h && K && p && /* @__PURE__ */ e(
          "div",
          {
            className: `activity-stream__load-more ${$ ? "activity-stream__load-more--visible" : ""}`,
            onClick: p,
            onKeyDown: (c) => {
              (c.key === "Enter" || c.key === " ") && (c.preventDefault(), p());
            },
            role: "button",
            tabIndex: 0,
            "aria-label": "Load more activities",
            children: "Show more"
          }
        )
      ]
    }
  ) });
}, $t = () => /* @__PURE__ */ d(
  "svg",
  {
    width: "64",
    height: "64",
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "uiforge-video__play-icon",
    children: [
      /* @__PURE__ */ e("circle", { cx: "32", cy: "32", r: "32", fill: "white", fillOpacity: "0.9" }),
      /* @__PURE__ */ e(
        "path",
        {
          d: "M26 20L46 32L26 44V20Z",
          fill: "currentColor",
          style: { color: "#3b82f6" }
        }
      )
    ]
  }
), Nt = () => /* @__PURE__ */ d(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    className: "uiforge-video-preview__icon",
    children: [
      /* @__PURE__ */ e("path", { d: "M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4z" }),
      /* @__PURE__ */ e("path", { d: "M8 7l5 3-5 3V7z" })
    ]
  }
), Rt = ({
  title: t,
  description: n,
  youtubeId: r,
  vimeoId: i,
  thumbnailUrl: h,
  onPlay: p,
  className: u = "",
  overlayIcon: f,
  aspectRatio: k = "16/9"
}) => {
  const [Z, H] = j(!1), F = G(null), s = r ? "youtube" : i ? "vimeo" : null, S = r || i || "", D = te(() => !s || !S ? "" : s === "youtube" ? `https://www.youtube.com/embed/${S}?autoplay=1&rel=0` : s === "vimeo" ? `https://player.vimeo.com/video/${S}?autoplay=1` : "", [s, S]), q = te(() => {
    if (h) return h;
    if (s === "youtube" && r)
      return `https://img.youtube.com/vi/${r}/maxresdefault.jpg`;
    if (s === "vimeo" && i)
      return;
  }, [h, s, r, i]), A = L(() => {
    !s || !S || (H(!0), p && p(S, s));
  }, [s, S, p]);
  if (!r && !i)
    return console.warn("UIForgeVideo: Either youtubeId or vimeoId must be provided"), null;
  const C = "uiforge-video", z = `${C} ${u}`.trim();
  return /* @__PURE__ */ d("div", { className: z, children: [
    /* @__PURE__ */ d("div", { className: `${C}__header`, children: [
      /* @__PURE__ */ e("h3", { className: `${C}__title`, children: t }),
      n && /* @__PURE__ */ e("p", { className: `${C}__description`, children: n })
    ] }),
    /* @__PURE__ */ e(
      "div",
      {
        className: `${C}__player-container`,
        style: { aspectRatio: k },
        children: Z ? /* @__PURE__ */ e(
          "iframe",
          {
            ref: F,
            src: D,
            title: t,
            className: `${C}__iframe`,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: !0
          }
        ) : /* @__PURE__ */ d(_e, { children: [
          q && /* @__PURE__ */ e(
            "img",
            {
              src: q,
              alt: t,
              className: `${C}__thumbnail`
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              className: `${C}__overlay`,
              onClick: A,
              "aria-label": `Play video: ${t}`,
              type: "button",
              children: f || /* @__PURE__ */ e($t, {})
            }
          )
        ] })
      }
    )
  ] });
}, jt = ({
  title: t,
  icon: n,
  className: r = "",
  onClick: i
}) => {
  const h = "uiforge-video-preview", p = `${h} ${r}`.trim();
  return /* @__PURE__ */ d(i ? "button" : "div", { className: p, ...i ? {
    type: "button",
    onClick: () => {
      i && i();
    },
    onKeyDown: (H) => {
      i && (H.key === "Enter" || H.key === " ") && (H.preventDefault(), i());
    }
  } : {}, children: [
    /* @__PURE__ */ e("div", { className: `${h}__icon-container`, children: n || /* @__PURE__ */ e(Nt, {}) }),
    /* @__PURE__ */ e("span", { className: `${h}__title`, children: t })
  ] });
};
export {
  we as ActivityIcons,
  ot as AlienIcon,
  mt as BriefcaseIcon,
  it as BugIcon,
  wt as BuildIcon,
  Wt as BusinessIcons,
  It as Button,
  gt as CalendarIcon,
  ht as ChartIcon,
  qe as CheckIcon,
  Fe as CloseIcon,
  rt as CloudIcon,
  lt as CodeIcon,
  ze as CommentIcon,
  He as CommitIcon,
  tt as DatabaseIcon,
  Ue as DeployIcon,
  yt as DeploymentIcon,
  Ot as DevProcessIcons,
  ft as DocumentIcon,
  Je as DumbbellIcon,
  zt as FitnessIcons,
  je as FoldIcon,
  Te as ForkIcon,
  pt as GitBranchIcon,
  Qe as HeartRateIcon,
  Ee as IssueIcon,
  Ze as MeditationIcon,
  ut as MeetingIcon,
  We as MergeIcon,
  st as PlanetIcon,
  vt as PullRequestDraftIcon,
  Ae as PullRequestIcon,
  Oe as ReleaseIcon,
  _t as ReviewIcon,
  ct as RocketIcon,
  Ye as RunningIcon,
  at as SatelliteIcon,
  et as ServerIcon,
  Tt as SpaceIcons,
  Pe as StarIcon,
  Xe as StrengthIcon,
  Ke as TaiChiIcon,
  Pt as TechIcons,
  dt as TelescopeIcon,
  nt as TerminalIcon,
  bt as TestingIcon,
  Ut as UIForgeActivityStream,
  St as UIForgeBlocksEditor,
  At as UIForgeComboBox,
  Bt as UIForgeGrid,
  Rt as UIForgeVideo,
  jt as UIForgeVideoPreview,
  xe as UIIcons,
  Re as UnfoldIcon,
  Et as WellnessIcons,
  Ge as YogaIcon,
  Dt as blocksToHTML,
  Ht as blocksToJSON,
  Vt as blocksToMarkdown
};

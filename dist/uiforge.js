import { jsx as e, jsxs as s, Fragment as _e } from "react/jsx-runtime";
import { useState as R, useMemo as ce, useCallback as N, useRef as J, useEffect as re } from "react";
const Mt = ({
  variant: t = "primary",
  size: n = "medium",
  children: r,
  className: l = "",
  ...d
}) => {
  const b = "uiforge-button", u = `${b}--${t}`, g = `${b}--${n}`, k = `${b} ${u} ${g} ${l}`.trim();
  return /* @__PURE__ */ e("button", { className: k, ...d, children: r });
}, Nt = ({
  columns: t,
  data: n,
  selectable: r = !1,
  selectedRows: l,
  getRowKey: d = (ne, X) => X,
  onSelectionChange: b,
  onCellEdit: u,
  actionButtons: g = [],
  searchable: k = !1,
  searchPlaceholder: te = "Search...",
  onSearch: q,
  customFilter: F,
  pagination: h,
  onPageChange: j,
  onPageSizeChange: A,
  pageSizeOptions: Q = [10, 25, 50, 100],
  className: z = "",
  loading: S = !1,
  emptyMessage: Y = "No data available"
}) => {
  const [ne, X] = R(/* @__PURE__ */ new Set()), [C, T] = R(""), [$, W] = R(null), [V, a] = R(""), v = l ?? ne, f = ce(() => !k || !C ? n : n.filter((i) => F ? F(i, C) : Object.values(i).some((x) => x == null ? !1 : String(x).toLowerCase().includes(C.toLowerCase()))), [n, C, k, F]), y = ce(() => {
    if (!h || h.serverSide)
      return f;
    const i = h.currentPage * h.pageSize, x = i + h.pageSize;
    return f.slice(i, x);
  }, [f, h]), U = ce(() => h ? h.serverSide && h.totalItems !== void 0 ? Math.ceil(h.totalItems / h.pageSize) : Math.ceil(f.length / h.pageSize) : 1, [h, f.length]), K = N(() => n.filter((i, x) => {
    const I = d(i, x);
    return v.has(I);
  }), [n, v, d]), Z = N(
    (i) => {
      const x = /* @__PURE__ */ new Set();
      i && y.forEach((I) => {
        const w = n.indexOf(I), le = d(I, w);
        x.add(le);
      }), l === void 0 && X(x), b?.(x, i ? y : []);
    },
    [y, n, d, b, l]
  ), ie = N(
    (i, x, I) => {
      const w = new Set(v);
      I ? w.add(i) : w.delete(i), l === void 0 && X(w);
      const le = n.filter((M, de) => {
        const ue = d(M, de);
        return w.has(ue);
      });
      b?.(w, le);
    },
    [v, n, d, b, l]
  ), se = N(
    (i) => {
      T(i), q?.(i);
    },
    [q]
  ), o = N(
    (i, x, I) => {
      W({ rowKey: i, columnKey: x }), a(I);
    },
    []
  ), D = N(
    (i, x, I) => {
      u?.(i, x, V, I), W(null), a("");
    },
    [V, u]
  ), m = N(() => {
    W(null), a("");
  }, []), L = N(
    (i) => {
      h && j?.(i, h.pageSize);
    },
    [h, j]
  ), P = N(
    (i) => {
      A?.(i), h && j?.(0, i);
    },
    [A, j, h]
  ), H = ce(() => y.length === 0 ? !1 : y.every((i) => {
    const x = n.indexOf(i), I = d(i, x);
    return v.has(I);
  }), [y, v, n, d]), he = ce(() => y.length === 0 ? !1 : y.some((x) => {
    const I = n.indexOf(x), w = d(x, I);
    return v.has(w);
  }) && !H, [y, v, H, n, d]), p = "uiforge-grid";
  return /* @__PURE__ */ s("div", { className: `${p} ${z}`.trim(), children: [
    (k || g.length > 0) && /* @__PURE__ */ s("div", { className: `${p}__toolbar`, children: [
      k && /* @__PURE__ */ e("div", { className: `${p}__search`, children: /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          className: `${p}__search-input`,
          placeholder: te,
          value: C,
          onChange: (i) => se(i.target.value),
          "aria-label": "Search"
        }
      ) }),
      g.length > 0 && /* @__PURE__ */ e("div", { className: `${p}__actions`, children: g.map((i, x) => {
        const I = i.disabled || i.requiresSelection && v.size === 0;
        return /* @__PURE__ */ e(
          "button",
          {
            className: `${p}__action-button ${p}__action-button--${i.variant || "primary"}`,
            onClick: () => i.onClick(K()),
            disabled: I,
            children: i.label
          },
          x
        );
      }) })
    ] }),
    /* @__PURE__ */ e("div", { className: `${p}__table-container`, children: /* @__PURE__ */ s("table", { className: `${p}__table`, role: "table", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ s("tr", { children: [
        r && /* @__PURE__ */ e("th", { className: `${p}__header-cell ${p}__header-cell--checkbox`, children: /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: H,
            ref: (i) => {
              i && (i.indeterminate = he);
            },
            onChange: (i) => Z(i.target.checked),
            "aria-label": "Select all rows"
          }
        ) }),
        t.map((i) => /* @__PURE__ */ e(
          "th",
          {
            className: `${p}__header-cell`,
            style: { width: i.width },
            children: i.header
          },
          i.key
        ))
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: S ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e(
        "td",
        {
          colSpan: t.length + (r ? 1 : 0),
          className: `${p}__loading-cell`,
          children: "Loading..."
        }
      ) }) : y.length === 0 ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e(
        "td",
        {
          colSpan: t.length + (r ? 1 : 0),
          className: `${p}__empty-cell`,
          children: Y
        }
      ) }) : y.map((i, x) => {
        const I = n.indexOf(i), w = d(i, I), le = v.has(w);
        return /* @__PURE__ */ s(
          "tr",
          {
            className: `${p}__row ${le ? `${p}__row--selected` : ""}`,
            children: [
              r && /* @__PURE__ */ e("td", { className: `${p}__cell ${p}__cell--checkbox`, children: /* @__PURE__ */ e(
                "input",
                {
                  type: "checkbox",
                  checked: le,
                  onChange: (M) => ie(w, i, M.target.checked),
                  "aria-label": `Select row ${x + 1}`
                }
              ) }),
              t.map((M) => {
                const de = M.field ? i[M.field] : void 0, ue = $?.rowKey === w && $?.columnKey === M.key;
                return /* @__PURE__ */ e("td", { className: `${p}__cell`, children: ue ? /* @__PURE__ */ s("div", { className: `${p}__edit-cell`, children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "text",
                      className: `${p}__edit-input`,
                      value: String(V ?? ""),
                      onChange: (ae) => a(ae.target.value),
                      onKeyDown: (ae) => {
                        ae.key === "Enter" ? D(w, M.key, i) : ae.key === "Escape" && m();
                      },
                      autoFocus: !0,
                      "aria-label": `Edit ${M.header}`
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: `${p}__edit-button ${p}__edit-button--save`,
                      onClick: () => D(w, M.key, i),
                      "aria-label": "Save",
                      children: "✓"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: `${p}__edit-button ${p}__edit-button--cancel`,
                      onClick: m,
                      "aria-label": "Cancel",
                      children: "✕"
                    }
                  )
                ] }) : /* @__PURE__ */ e(
                  "div",
                  {
                    className: `${p}__cell-content ${M.editable ? `${p}__cell-content--editable` : ""}`,
                    onClick: () => {
                      M.editable && o(w, M.key, de);
                    },
                    onKeyDown: (ae) => {
                      M.editable && (ae.key === "Enter" || ae.key === " ") && o(w, M.key, de);
                    },
                    tabIndex: M.editable ? 0 : void 0,
                    role: M.editable ? "button" : void 0,
                    "aria-label": M.editable ? `Edit ${M.header}` : void 0,
                    children: M.render ? M.render(de, i, I) : String(de ?? "")
                  }
                ) }, M.key);
              })
            ]
          },
          w
        );
      }) })
    ] }) }),
    h && U > 1 && /* @__PURE__ */ s("div", { className: `${p}__pagination`, children: [
      /* @__PURE__ */ e("div", { className: `${p}__pagination-info`, children: h.serverSide && h.totalItems !== void 0 ? /* @__PURE__ */ s(_e, { children: [
        "Showing ",
        h.currentPage * h.pageSize + 1,
        " to",
        " ",
        Math.min(
          (h.currentPage + 1) * h.pageSize,
          h.totalItems
        ),
        " ",
        "of ",
        h.totalItems,
        " items"
      ] }) : /* @__PURE__ */ s(_e, { children: [
        "Showing ",
        h.currentPage * h.pageSize + 1,
        " to",
        " ",
        Math.min((h.currentPage + 1) * h.pageSize, f.length),
        " ",
        "of ",
        f.length,
        " items"
      ] }) }),
      /* @__PURE__ */ s("div", { className: `${p}__pagination-controls`, children: [
        /* @__PURE__ */ e(
          "button",
          {
            className: `${p}__pagination-button`,
            onClick: () => L(h.currentPage - 1),
            disabled: h.currentPage === 0,
            "aria-label": "Previous page",
            children: "‹"
          }
        ),
        Array.from({ length: U }, (i, x) => x).map((i) => i === 0 || i === U - 1 || Math.abs(i - h.currentPage) <= 1 ? /* @__PURE__ */ e(
          "button",
          {
            className: `${p}__pagination-button ${i === h.currentPage ? `${p}__pagination-button--active` : ""}`,
            onClick: () => L(i),
            "aria-label": `Page ${i + 1}`,
            "aria-current": i === h.currentPage ? "page" : void 0,
            children: i + 1
          },
          i
        ) : i === h.currentPage - 2 || i === h.currentPage + 2 ? /* @__PURE__ */ e("span", { className: `${p}__pagination-ellipsis`, children: "..." }, i) : null),
        /* @__PURE__ */ e(
          "button",
          {
            className: `${p}__pagination-button`,
            onClick: () => L(h.currentPage + 1),
            disabled: h.currentPage >= U - 1,
            "aria-label": "Next page",
            children: "›"
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: `${p}__page-size`, children: [
        /* @__PURE__ */ e("label", { htmlFor: "page-size-select", children: "Items per page:" }),
        /* @__PURE__ */ e(
          "select",
          {
            id: "page-size-select",
            className: `${p}__page-size-select`,
            value: h.pageSize,
            onChange: (i) => P(Number(i.target.value)),
            children: Q.map((i) => /* @__PURE__ */ e("option", { value: i, children: i }, i))
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
}), It = ({
  initialBlocks: t = [],
  onChange: n,
  placeholder: r = "Start typing...",
  readOnly: l = !1,
  className: d = "",
  maxHeight: b
}) => {
  const [u, g] = R(
    t.length > 0 ? t : [me()]
  ), [k, te] = R(null), [q, F] = R(null), [h, j] = R(!1), A = J(null);
  re(() => {
    n && n(u);
  }, [u, n]);
  const Q = N((a, v) => {
    g((f) => f.map((y) => y.id === a ? { ...y, ...v } : y));
  }, []), z = N((a = "paragraph", v) => {
    const f = me(a);
    g((y) => {
      if (!v)
        return [...y, f];
      const U = y.findIndex((Z) => Z.id === v), K = [...y];
      return K.splice(U + 1, 0, f), K;
    }), te(f.id);
  }, []), S = N((a) => {
    g((v) => {
      const f = v.filter((y) => y.id !== a);
      return f.length > 0 ? f : [me()];
    });
  }, []), Y = N((a, v) => {
    g((f) => {
      const y = f.findIndex((ie) => ie.id === a), U = f.findIndex((ie) => ie.id === v);
      if (y === -1 || U === -1) return f;
      const K = [...f], [Z] = K.splice(y, 1);
      return K.splice(U, 0, Z), K;
    });
  }, []), ne = N(
    (a, v) => {
      l || (F(v), a.dataTransfer.effectAllowed = "move");
    },
    [l]
  ), X = N((a) => {
    a.preventDefault(), a.dataTransfer.dropEffect = "move";
  }, []), C = N(
    (a, v) => {
      a.preventDefault(), q && q !== v && Y(q, v), F(null);
    },
    [q, Y]
  ), T = N(() => {
    F(null);
  }, []), $ = N(
    (a) => {
      k && g(
        (v) => v.map((f) => {
          if (f.id === k) {
            const y = f.format || {};
            return {
              ...f,
              format: {
                ...y,
                [a]: !y[a]
              }
            };
          }
          return f;
        })
      );
    },
    [k]
  ), W = N(
    (a, v) => {
      Q(a, { type: v });
    },
    [Q]
  ), V = N(
    (a, v) => {
      if (!l) {
        if ((a.metaKey || a.ctrlKey) && a.key === "b")
          a.preventDefault(), $("bold");
        else if ((a.metaKey || a.ctrlKey) && a.key === "i")
          a.preventDefault(), $("italic");
        else if ((a.metaKey || a.ctrlKey) && a.key === "u")
          a.preventDefault(), $("underline");
        else if (a.key === "Enter" && !a.shiftKey) {
          const f = u.find((y) => y.id === v);
          f && f.type !== "code" && (a.preventDefault(), z("paragraph", v));
        } else if (a.key === "Backspace") {
          const f = u.find((y) => y.id === v);
          f && !f.content && u.length > 1 && (a.preventDefault(), S(v));
        }
      }
    },
    [l, u, $, z, S]
  );
  return /* @__PURE__ */ s("div", { className: `uiforge-blocks-editor ${d}`, ref: A, style: { maxHeight: b }, children: [
    !l && h && k && /* @__PURE__ */ e(
      Be,
      {
        selectedBlock: u.find((a) => a.id === k),
        onFormatToggle: $,
        onBlockTypeChange: (a) => W(k, a)
      }
    ),
    /* @__PURE__ */ e("div", { className: "uiforge-blocks-editor__content", children: u.map((a, v) => /* @__PURE__ */ e(
      Se,
      {
        block: a,
        isSelected: k === a.id,
        isDragging: q === a.id,
        readOnly: l,
        placeholder: v === 0 && u.length === 1 ? r : void 0,
        onSelect: () => {
          te(a.id), j(!0);
        },
        onChange: (f) => Q(a.id, f),
        onDelete: () => S(a.id),
        onDragStart: (f) => ne(f, a.id),
        onDragOver: X,
        onDrop: (f) => C(f, a.id),
        onDragEnd: T,
        onKeyDown: (f) => V(f, a.id)
      },
      a.id
    )) }),
    !l && /* @__PURE__ */ e(De, { onAddBlock: z })
  ] });
}, Be = ({ selectedBlock: t, onFormatToggle: n, onBlockTypeChange: r }) => {
  if (!t) return null;
  const l = t.format || {};
  return /* @__PURE__ */ s("div", { className: "uiforge-blocks-editor__toolbar", role: "toolbar", "aria-label": "Text formatting", children: [
    /* @__PURE__ */ e("div", { className: "uiforge-blocks-editor__toolbar-group", children: /* @__PURE__ */ s(
      "select",
      {
        value: t.type,
        onChange: (d) => r(d.target.value),
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
    /* @__PURE__ */ s("div", { className: "uiforge-blocks-editor__toolbar-group", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `uiforge-blocks-editor__toolbar-button ${l.bold ? "active" : ""}`,
          onClick: () => n("bold"),
          title: "Bold (Ctrl+B)",
          "aria-label": "Bold",
          "aria-pressed": l.bold,
          children: /* @__PURE__ */ e("strong", { children: "B" })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `uiforge-blocks-editor__toolbar-button ${l.italic ? "active" : ""}`,
          onClick: () => n("italic"),
          title: "Italic (Ctrl+I)",
          "aria-label": "Italic",
          "aria-pressed": l.italic,
          children: /* @__PURE__ */ e("em", { children: "I" })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `uiforge-blocks-editor__toolbar-button ${l.underline ? "active" : ""}`,
          onClick: () => n("underline"),
          title: "Underline (Ctrl+U)",
          "aria-label": "Underline",
          "aria-pressed": l.underline,
          children: /* @__PURE__ */ e("u", { children: "U" })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          className: `uiforge-blocks-editor__toolbar-button ${l.code ? "active" : ""}`,
          onClick: () => n("code"),
          title: "Inline Code",
          "aria-label": "Code",
          "aria-pressed": l.code,
          children: "</>"
        }
      )
    ] })
  ] });
}, Se = ({
  block: t,
  isSelected: n,
  isDragging: r,
  readOnly: l,
  placeholder: d,
  onSelect: b,
  onChange: u,
  onDelete: g,
  onDragStart: k,
  onDragOver: te,
  onDrop: q,
  onDragEnd: F,
  onKeyDown: h
}) => {
  const j = [
    "uiforge-blocks-editor__block",
    `uiforge-blocks-editor__block--${t.type}`,
    n ? "uiforge-blocks-editor__block--selected" : "",
    r ? "uiforge-blocks-editor__block--dragging" : ""
  ].filter(Boolean).join(" "), A = [
    "uiforge-blocks-editor__block-text",
    t.format?.bold ? "uiforge-blocks-editor__block-text--bold" : "",
    t.format?.italic ? "uiforge-blocks-editor__block-text--italic" : "",
    t.format?.underline ? "uiforge-blocks-editor__block-text--underline" : "",
    t.format?.code ? "uiforge-blocks-editor__block-text--code" : ""
  ].filter(Boolean).join(" "), Q = (S) => {
    u({ content: S.target.value });
  }, z = () => {
    const S = {
      value: t.content,
      onChange: Q,
      onFocus: b,
      onKeyDown: h,
      placeholder: d,
      readOnly: l,
      className: A
    };
    switch (t.type) {
      case "heading1":
        return /* @__PURE__ */ e(
          "input",
          {
            ...S,
            type: "text",
            className: `${A} uiforge-blocks-editor__heading1`,
            placeholder: d || "Heading 1"
          }
        );
      case "heading2":
        return /* @__PURE__ */ e(
          "input",
          {
            ...S,
            type: "text",
            className: `${A} uiforge-blocks-editor__heading2`,
            placeholder: d || "Heading 2"
          }
        );
      case "heading3":
        return /* @__PURE__ */ e(
          "input",
          {
            ...S,
            type: "text",
            className: `${A} uiforge-blocks-editor__heading3`,
            placeholder: d || "Heading 3"
          }
        );
      case "code":
        return /* @__PURE__ */ e(
          "textarea",
          {
            ...S,
            className: `${A} uiforge-blocks-editor__code`,
            placeholder: d || "Code block",
            rows: 4
          }
        );
      case "quote":
        return /* @__PURE__ */ e(
          "textarea",
          {
            ...S,
            className: `${A} uiforge-blocks-editor__quote`,
            placeholder: d || "Quote",
            rows: 2
          }
        );
      case "image":
        return /* @__PURE__ */ s("div", { className: "uiforge-blocks-editor__image-block", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: t.imageUrl || "",
              onChange: (Y) => u({ imageUrl: Y.target.value }),
              placeholder: "Image URL",
              className: "uiforge-blocks-editor__image-url",
              readOnly: l
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: t.imageAlt || "",
              onChange: (Y) => u({ imageAlt: Y.target.value }),
              placeholder: "Alt text",
              className: "uiforge-blocks-editor__image-alt",
              readOnly: l
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
            ...S,
            className: `${A} uiforge-blocks-editor__paragraph`,
            placeholder: d || "Start typing...",
            rows: 1,
            style: { minHeight: "1.5em" }
          }
        );
    }
  };
  return /* @__PURE__ */ s(
    "div",
    {
      className: j,
      draggable: !l,
      onDragStart: k,
      onDragOver: te,
      onDrop: q,
      onDragEnd: F,
      "data-block-id": t.id,
      children: [
        !l && /* @__PURE__ */ s("div", { className: "uiforge-blocks-editor__block-controls", children: [
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
              onClick: g,
              title: "Delete block",
              "aria-label": "Delete block",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "uiforge-blocks-editor__block-content", children: z() })
      ]
    }
  );
}, De = ({ onAddBlock: t }) => {
  const [n, r] = R(!1);
  return /* @__PURE__ */ s("div", { className: "uiforge-blocks-editor__block-menu", children: [
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
    ].map(({ type: d, label: b, icon: u }) => /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        className: "uiforge-blocks-editor__block-menu-item",
        onClick: () => {
          t(d), r(!1);
        },
        children: [
          /* @__PURE__ */ e("span", { className: "uiforge-blocks-editor__block-menu-icon", children: u }),
          /* @__PURE__ */ e("span", { children: b })
        ]
      },
      d
    )) })
  ] });
};
function pe(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function He(t) {
  const n = t.trim(), r = ["javascript:", "data:", "vbscript:", "file:"], l = n.toLowerCase();
  for (const d of r)
    if (l.startsWith(d))
      return "";
  return n;
}
function Bt(t) {
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
        const l = He(n.imageUrl || ""), d = pe(n.imageAlt || "");
        return l ? `<img src="${l}" alt="${d}" />` : "";
      }
      case "list":
        return `<ul><li>${r}</li></ul>`;
      default:
        return `<p>${r}</p>`;
    }
  }).join(`
`);
}
function St(t) {
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
function Dt(t) {
  return JSON.stringify(t, null, 2);
}
const Ht = ({
  options: t = [],
  value: n,
  onChange: r,
  onSearch: l,
  placeholder: d = "Select an option...",
  disabled: b = !1,
  clearable: u = !1,
  className: g = "",
  renderOption: k,
  renderValue: te,
  loading: q = !1,
  maxHeight: F = "300px",
  debounceMs: h = 300,
  searchable: j = !0,
  noOptionsMessage: A = "No options found",
  ariaLabel: Q,
  enableCache: z = !1,
  cacheTTL: S,
  refreshOnOpen: Y = !1,
  onClearCache: ne,
  onForceRefresh: X
}) => {
  const [C, T] = R(!1), [$, W] = R(""), [V, a] = R([]), [v, f] = R(0), [y, U] = R(!1), K = J(null), Z = J(null), ie = J(null), se = J(null), o = J(null), D = J(l), m = J(null), L = J(!1), P = J(/* @__PURE__ */ new Map()), H = J(z), he = J(S), p = N((c, _ = 0) => c.reduce((G, B) => {
    const O = { ...B, level: _ };
    return G.push(O), B.children && B.children.length > 0 && G.push(...p(B.children, _ + 1)), G;
  }, []), []), i = (c) => typeof c == "string" && (c.startsWith("http://") || c.startsWith("https://") || c.startsWith("data:") || c.startsWith("/")), x = ce(() => p(V.length > 0 ? V : t).find((_) => _.value === n) || null, [n, t, V, p]), I = N((c, _) => {
    if (!_.trim()) return c;
    const G = _.toLowerCase(), B = (O) => O.reduce((ee, oe) => {
      const ge = oe.label.toLowerCase().includes(G), fe = oe.children ? B(oe.children) : [];
      return (ge || fe.length > 0) && ee.push({
        ...oe,
        children: fe.length > 0 ? fe : oe.children
      }), ee;
    }, []);
    return B(c);
  }, []);
  re(() => {
    D.current = l, o.current = null;
  }, [l]), re(() => {
    H.current = z;
  }, [z]), re(() => {
    he.current = S;
  }, [S]), re(() => {
    ne && ne(() => {
      P.current.clear();
    }), X && X(() => {
      if (!D.current) return;
      m.current && m.current.abort(), m.current = new AbortController();
      const c = m.current.signal;
      U(!0), (async () => {
        try {
          const _ = Date.now(), G = $, B = P.current.get(G), O = B && (!he.current || _ - B.timestamp < he.current);
          let ee;
          H.current && O ? ee = B.data : (ee = await (D.current ? D.current($, c) : l?.($, c) ?? []), !c.aborted && H.current && P.current.set(G, { data: ee, timestamp: _ })), c.aborted || (a(ee), o.current = $);
        } catch (_) {
          console.error(_), a([]);
        } finally {
          U(!1);
        }
      })();
    });
  }, [ne, X, $]), re(() => {
    if (l && C) {
      const c = o.current === $, _ = !L.current && C;
      return c && !(Y && _) ? void 0 : (se.current && clearTimeout(se.current), se.current = setTimeout(async () => {
        m.current && m.current.abort(), m.current = new AbortController();
        const B = m.current.signal;
        U(!0);
        try {
          let O;
          const ee = $, oe = P.current.get(ee), ge = Date.now(), fe = oe && (!he.current || ge - oe.timestamp < he.current);
          if (H.current && fe ? O = oe.data : (O = await (D.current ? D.current($, B) : l($, B)), !B.aborted && H.current && P.current.set(ee, { data: O, timestamp: ge })), B.aborted) return;
          a(O), o.current = $;
        } catch (O) {
          console.error("Error fetching options:", O), a([]);
        } finally {
          U(!1);
        }
      }, h), () => {
        se.current && clearTimeout(se.current), m.current && (m.current.abort(), m.current = null);
      });
    } else l || a(I(t, $));
    L.current = C;
  }, [$, C, t, h, I, Y]), re(() => {
    l || a(t);
  }, [t, l]), re(() => {
    const c = (_) => {
      K.current && !K.current.contains(_.target) && (T(!1), W(""));
    };
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, []);
  const w = ce(() => p(V.length > 0 ? V : t).filter((_) => !_.disabled), [V, t, p]), le = ce(() => p(V.length > 0 ? V : t), [V, t, p]), M = ce(() => {
    const c = /* @__PURE__ */ new Map();
    return le.forEach((_) => {
      const G = JSON.stringify({ value: _.value, label: _.label }), B = w.findIndex(
        (O) => O.value === _.value && O.label === _.label
      );
      c.set(G, B);
    }), c;
  }, [le, w]), de = (c) => {
    if (!b)
      switch (c.key) {
        case "ArrowDown":
          c.preventDefault(), C ? f((_) => _ < w.length - 1 ? _ + 1 : 0) : T(!0);
          break;
        case "ArrowUp":
          c.preventDefault(), C && f((_) => _ > 0 ? _ - 1 : w.length - 1);
          break;
        case "Enter":
          c.preventDefault(), C && w[v] ? ue(w[v]) : T(!C);
          break;
        case "Escape":
          c.preventDefault(), T(!1), W("");
          break;
        case "Tab":
          C && (T(!1), W(""));
          break;
      }
  };
  re(() => {
    if (C && ie.current) {
      const c = ie.current.querySelector(
        `[data-index="${v}"]`
      );
      c && typeof c.scrollIntoView == "function" && c.scrollIntoView({ block: "nearest" });
    }
  }, [v, C]);
  const ue = (c) => {
    c.disabled || (r?.(c.value, c), T(!1), W(""), f(0));
  }, ae = (c) => {
    c.stopPropagation(), r?.(null, null), W("");
  }, we = () => {
    b || T((c) => {
      const _ = !c;
      return _ && setTimeout(() => Z.current?.focus(), 0), _;
    });
  };
  re(() => {
    C || (o.current = null);
  }, [C]);
  const $e = (c) => {
    W(c.target.value), C || T(!0), f(0);
  }, Le = (c) => {
    const _ = (c.level || 0) * 20;
    return /* @__PURE__ */ s("div", { className: "uiforge-combobox-option-content", style: { paddingLeft: `${_}px` }, children: [
      c.icon && /* @__PURE__ */ e("span", { className: "uiforge-combobox-option-icon", children: i(c.icon) ? /* @__PURE__ */ e(
        "img",
        {
          src: c.icon,
          alt: "",
          className: "uiforge-combobox-option-icon-img"
        }
      ) : c.icon }),
      /* @__PURE__ */ e("span", { className: "uiforge-combobox-option-label", children: c.label })
    ] });
  }, Me = (c) => c ? /* @__PURE__ */ s("div", { className: "uiforge-combobox-value-content", children: [
    c.icon && /* @__PURE__ */ e("span", { className: "uiforge-combobox-value-icon", children: i(c.icon) ? /* @__PURE__ */ e("img", { src: c.icon, alt: "", className: "uiforge-combobox-value-icon-img" }) : c.icon }),
    /* @__PURE__ */ e("span", { className: "uiforge-combobox-value-label", children: c.label })
  ] }) : d, E = "uiforge-combobox", Ne = [
    E,
    C && `${E}--open`,
    b && `${E}--disabled`,
    g
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ s(
    "div",
    {
      ref: K,
      className: Ne,
      onKeyDown: de,
      role: "combobox",
      "aria-expanded": C,
      "aria-haspopup": "listbox",
      "aria-label": Q,
      "aria-disabled": b,
      tabIndex: b ? -1 : 0,
      children: [
        /* @__PURE__ */ s("div", { className: `${E}-control`, onClick: we, children: [
          j && C ? /* @__PURE__ */ e(
            "input",
            {
              ref: Z,
              type: "text",
              className: `${E}-input`,
              value: $,
              onChange: $e,
              placeholder: d,
              disabled: b,
              "aria-autocomplete": "list",
              "aria-controls": `${E}-listbox`
            }
          ) : /* @__PURE__ */ e("div", { className: `${E}-value`, children: te ? te(x) : Me(x) }),
          /* @__PURE__ */ s("div", { className: `${E}-indicators`, children: [
            u && n !== null && n !== void 0 && !b && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: `${E}-clear`,
                onClick: ae,
                "aria-label": "Clear selection",
                tabIndex: -1,
                children: "×"
              }
            ),
            /* @__PURE__ */ e("span", { className: `${E}-arrow`, children: "▼" })
          ] })
        ] }),
        C && /* @__PURE__ */ e(
          "div",
          {
            ref: ie,
            className: `${E}-dropdown`,
            style: { maxHeight: F },
            role: "listbox",
            id: `${E}-listbox`,
            children: q || y ? /* @__PURE__ */ e("div", { className: `${E}-loading`, children: "Loading..." }) : w.length === 0 ? /* @__PURE__ */ e("div", { className: `${E}-no-options`, children: A }) : le.map((c) => {
              const _ = JSON.stringify({ value: c.value, label: c.label }), G = M.get(_) ?? -1, B = c.value === n, O = G === v, ee = [
                `${E}-option`,
                B && `${E}-option--selected`,
                O && `${E}-option--highlighted`,
                c.disabled && `${E}-option--disabled`
              ].filter(Boolean).join(" ");
              return /* @__PURE__ */ e(
                "div",
                {
                  className: ee,
                  onClick: () => ue(c),
                  role: "option",
                  "aria-selected": B,
                  "aria-disabled": c.disabled,
                  "data-index": G,
                  children: k ? k(c) : Le(c)
                },
                _
              );
            })
          }
        )
      ]
    }
  );
}, Ae = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 5a3 3 0 100 6 3 3 0 000-6z" }) }), Ve = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" }) }), Ee = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" }),
  /* @__PURE__ */ e("path", { d: "M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" })
] }), ze = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 13H8.06l-2.573 2.573A1.458 1.458 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25v-8.5zM1.75 2.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h6.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H1.75z" }) }), Te = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" }) }), We = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" }) }), Pe = ({
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 20 20", fill: "none", className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 20 20", fill: "none", className: n, children: [
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
] }), qe = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" }) }), Fe = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" }) }), Ke = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: "none", className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "8", cy: "3", r: "1.5" }),
  /* @__PURE__ */ e("path", { d: "M8 5C6.5 5 5 6 5 7.5V9C5 9 5.5 10 6 10.5L5 14H7L8 11L9 14H11L10 10.5C10.5 10 11 9 11 9V7.5C11 6 9.5 5 8 5Z" }),
  /* @__PURE__ */ e("path", { d: "M4 9L2 10M12 9L14 10", strokeWidth: "1", stroke: r, fill: "none" })
] }), Ge = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "8", cy: "2.5", r: "1.5" }),
  /* @__PURE__ */ e("path", { d: "M8 4.5L6 8L4 14H6L7 10H9L10 14H12L10 8L8 4.5Z" }),
  /* @__PURE__ */ e("path", { d: "M6 8L3 6M10 8L13 6", strokeWidth: "1.5", stroke: r, fill: "none" })
] }), Je = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("rect", { x: "1", y: "6", width: "2", height: "4", rx: "0.5" }),
  /* @__PURE__ */ e("rect", { x: "13", y: "6", width: "2", height: "4", rx: "0.5" }),
  /* @__PURE__ */ e("rect", { x: "3", y: "5.5", width: "1", height: "5" }),
  /* @__PURE__ */ e("rect", { x: "12", y: "5.5", width: "1", height: "5" }),
  /* @__PURE__ */ e("rect", { x: "4", y: "7", width: "8", height: "2", rx: "0.5" })
] }), Ye = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M4 8C4 6 5 4 7 4C8 4 8.5 4.5 8.5 5.5C8.5 6 8.8 6.5 9.5 6.5C10.5 6.5 11 7 11 8C11 9.5 10 11 8 12C6 13 4 12 4 10V8Z" }),
  /* @__PURE__ */ e("circle", { cx: "7", cy: "3", r: "1.5" })
] }), et = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M8 0C6 0 4.5 2 3.5 5L1 7L4 8L5 11L7 8.5C9 7.5 11 6 13 3C14 2 15 0 16 0C16 0 14 2 13 3C11 5 9.5 6.5 8 7.5M10 4C10.552 4 11 3.552 11 3C11 2.448 10.552 2 10 2C9.448 2 9 2.448 9 3C9 3.552 9.448 4 10 4Z" }),
  /* @__PURE__ */ e("path", { d: "M2 12C2 12 0 14 0 16C2 16 4 14 4 14" })
] }), at = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M8 1C4 1 2 3 2 6C2 8 2 10 3 11C3.5 11.5 4 12 5 12C5.5 12 6 11.5 6.5 10.5C7 9.5 7.5 9 8 9C8.5 9 9 9.5 9.5 10.5C10 11.5 10.5 12 11 12C12 12 12.5 11.5 13 11C14 10 14 8 14 6C14 3 12 1 8 1Z" }),
  /* @__PURE__ */ e("ellipse", { cx: "6", cy: "5.5", rx: "1.5", ry: "2", fill: "white" }),
  /* @__PURE__ */ e("ellipse", { cx: "10", cy: "5.5", rx: "1.5", ry: "2", fill: "white" }),
  /* @__PURE__ */ e("circle", { cx: "6", cy: "5.5", r: "0.75", fill: r }),
  /* @__PURE__ */ e("circle", { cx: "10", cy: "5.5", r: "0.75", fill: r })
] }), st = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "8", cy: "8", r: "5" }),
  /* @__PURE__ */ e("ellipse", { cx: "8", cy: "8", rx: "8", ry: "2.5", fill: "none", stroke: r, strokeWidth: "1", opacity: "0.6" }),
  /* @__PURE__ */ e("circle", { cx: "6", cy: "6", r: "1", opacity: "0.4", fill: r === "currentColor" ? "white" : "#fff" })
] }), dt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("circle", { cx: "5", cy: "4", r: "2" }),
  /* @__PURE__ */ e("circle", { cx: "11", cy: "4", r: "2" }),
  /* @__PURE__ */ e("path", { d: "M1 14V12C1 10.5 2.5 9 5 9C7.5 9 9 10.5 9 12V14H1Z" }),
  /* @__PURE__ */ e("path", { d: "M7 14V12C7 10.5 8.5 9 11 9C13.5 9 15 10.5 15 12V14H7Z" })
] }), ft = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
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
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M3.25 1A2.25 2.25 0 011 3.25v9.5A2.25 2.25 0 013.25 15h9.5A2.25 2.25 0 0115 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5zM2.5 3.25a.75.75 0 01.75-.75h9.5a.75.75 0 01.75.75v9.5a.75.75 0 01-.75.75h-9.5a.75.75 0 01-.75-.75v-9.5z" }),
  /* @__PURE__ */ e("path", { d: "M8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z" })
] }), bt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M6 1h4v1H6V1zM5.5 3h5L13 13c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2L5.5 3z" }),
  /* @__PURE__ */ e("circle", { cx: "7", cy: "8", r: "1", fill: r === "currentColor" ? "white" : "#fff", opacity: "0.5" }),
  /* @__PURE__ */ e("circle", { cx: "9", cy: "10", r: "0.75", fill: r === "currentColor" ? "white" : "#fff", opacity: "0.5" })
] }), yt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("path", { d: "M8 0L0 3v5c0 5 3 7.5 8 8 5-.5 8-3 8-8V3L8 0z" }),
  /* @__PURE__ */ e("path", { d: "M7 10L4.5 7.5l1-1L7 8l3.5-3.5 1 1L7 10z", fill: r === "currentColor" ? "white" : "#fff" })
] }), _t = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ s("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: [
  /* @__PURE__ */ e("rect", { x: "1", y: "1", width: "9", height: "11", rx: "1" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "4", x2: "7", y2: "4", stroke: r === "currentColor" ? "white" : "#fff", strokeWidth: "1" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "6.5", x2: "7", y2: "6.5", stroke: r === "currentColor" ? "white" : "#fff", strokeWidth: "1" }),
  /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "3", fill: "none", stroke: r, strokeWidth: "1.5" }),
  /* @__PURE__ */ e("line", { x1: "13", y1: "13", x2: "15.5", y2: "15.5", stroke: r, strokeWidth: "1.5", strokeLinecap: "round" })
] }), xt = ({
  size: t = 16,
  className: n = "",
  color: r = "currentColor"
}) => /* @__PURE__ */ e("svg", { width: t, height: t, viewBox: "0 0 16 16", fill: r, className: n, children: /* @__PURE__ */ e("path", { d: "M4.48 7.27c.26.26 1.28 1.33 1.28 1.33l.56-.58-.88-.91 1.69-1.8s-.76-.74-.43-.45c.32-1.19.03-2.51-.87-3.44C4.93.5 3.66.2 2.52.51l1.93 2-.51 1.96-1.89.52-1.93-2C-.19 4.17.1 5.48 1 6.4c.94.98 2.29 1.26 3.48.87zm6.44 1.94l-2.33 2.3 3.84 3.98c.31.33.73.49 1.14.49.41 0 .82-.16 1.14-.49.63-.65.63-1.7 0-2.35l-3.79-3.93zM16 2.53L13.55 0 6.33 7.46l.88.91-4.31 4.46-.99.53-1.39 2.27.35.37 2.2-1.44.51-1.02L7.9 9.08l.88.91L16 2.53z" }) }), xe = {
  commit: Ae,
  pr: Ve,
  issue: Ee,
  comment: ze,
  star: Te,
  fork: We,
  merge: Pe,
  release: Oe,
  deploy: Ue
}, ke = {
  unfold: Re,
  fold: je,
  close: qe,
  check: Fe
}, At = {
  taichi: Ke,
  meditation: Ze,
  yoga: Ge
}, Vt = {
  dumbbell: Je,
  running: Ye,
  heartrate: Qe,
  strength: Xe
}, Et = {
  server: et,
  database: tt,
  cloud: rt,
  terminal: nt,
  bug: it,
  code: lt
}, zt = {
  rocket: ct,
  satellite: at,
  alien: ot,
  planet: st,
  telescope: dt
}, Tt = {
  chart: ht,
  meeting: ut,
  document: ft,
  calendar: gt,
  briefcase: mt
}, Wt = {
  gitbranch: pt,
  prdraft: vt,
  testing: bt,
  deployment: yt,
  review: _t,
  build: xt
}, kt = (t) => {
  const n = xe[t] || xe.commit;
  return /* @__PURE__ */ e(n, { size: 16 });
}, ve = (t, n = 2) => {
  if (t.length === 0) return [];
  const r = [];
  let l = [], d = null;
  return t.forEach((b, u) => {
    d === b.type ? l.push(b) : (l.length >= n && d ? r.push(Ce(l, d)) : l.forEach((g) => {
      r.push({
        id: g.id.toString(),
        type: g.type,
        count: 1,
        title: g.title,
        timestamp: new Date(g.timestamp),
        icon: g.icon,
        events: [g]
      });
    }), l = [b], d = b.type), u === t.length - 1 && (l.length >= n && d ? r.push(Ce(l, d)) : l.forEach((g) => {
      r.push({
        id: g.id.toString(),
        type: g.type,
        count: 1,
        title: g.title,
        timestamp: new Date(g.timestamp),
        icon: g.icon,
        events: [g]
      });
    }));
  }), r;
}, Ce = (t, n) => {
  const r = t.reduce(
    (u, g) => {
      const k = g.metadata?.repository || "unknown";
      return u[k] || (u[k] = []), u[k].push(g), u;
    },
    {}
  ), l = Object.entries(r), d = l.length > 1;
  let b = "";
  if (d)
    b = `Created ${t.length} ${be(n)} in ${l.length} repositories`;
  else {
    const u = l[0][0];
    b = `Created ${t.length} ${be(n)}${u !== "unknown" ? ` in ${u}` : ""}`;
  }
  return {
    id: `group-${n}-${t[0].id}`,
    type: n,
    count: t.length,
    title: b,
    timestamp: new Date(t[0].timestamp),
    icon: t[0].icon,
    events: t,
    children: d ? l.map(([u, g]) => ({
      id: `group-${n}-${u}`,
      type: n,
      count: g.length,
      title: `Created ${g.length} ${be(n)} in ${u}`,
      timestamp: new Date(g[0].timestamp),
      icon: g[0].icon,
      events: g
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
  return t.forEach((l, d) => {
    if ("type" in l && l.type === "date-separator") {
      n.push(l);
      return;
    }
    const u = l.timestamp, g = `${u.getFullYear()}-${u.getMonth()}`;
    if (g !== r) {
      const k = {
        id: `sep-${d}`,
        type: "date-separator",
        date: u,
        label: Ct(u)
      };
      n.push(k), r = g;
    }
    n.push(l);
  }), n;
}, Ct = (t) => t.toLocaleDateString("en-US", { month: "long", year: "numeric" }), wt = (t) => {
  const n = typeof t == "string" ? new Date(t) : t, l = (/* @__PURE__ */ new Date()).getTime() - n.getTime(), d = Math.floor(l / 1e3), b = Math.floor(d / 60), u = Math.floor(b / 60), g = Math.floor(u / 24);
  return d < 60 ? "just now" : b < 60 ? `${b}m ago` : u < 24 ? `${u}h ago` : g < 30 ? `${g}d ago` : n.toLocaleDateString();
}, Pt = ({
  events: t,
  theme: n = "light",
  className: r = "",
  showLoadMore: l = !0,
  loading: d = !1,
  onLoadMore: b,
  pagination: u,
  maxHeight: g,
  showMoreThreshold: k = 100,
  initiallyExpandedAll: te = !1,
  emptyMessage: q = "No activity to display",
  onToggleExpand: F,
  enableGrouping: h = !0,
  groupingThreshold: j = 2,
  showDateSeparators: A = !0,
  showTimeline: Q = !0,
  scale: z = 1
}) => {
  const [S, Y] = R(() => {
    if (!te) return /* @__PURE__ */ new Set();
    const o = /* @__PURE__ */ new Set();
    return (h ? A ? ye(ve(t, j)) : ve(t, j) : t.map((m) => ({
      id: m.id.toString(),
      type: m.type,
      count: 1,
      title: m.title,
      timestamp: new Date(m.timestamp),
      icon: m.icon,
      events: [m]
    }))).forEach((m) => {
      if ("events" in m && m.type !== "date-separator") {
        const L = m;
        o.add(L.id), L.children && L.children.forEach((P) => o.add(P.id));
      }
    }), o;
  }), [ne, X] = R(!1), C = J(null), T = J(null), $ = ce(() => {
    if (!h) {
      const D = t.map((m) => ({
        id: m.id.toString(),
        type: m.type,
        count: 1,
        title: m.title,
        timestamp: new Date(m.timestamp),
        icon: m.icon,
        events: [m]
      }));
      return A ? ye(D) : D;
    }
    const o = ve(t, j);
    return A ? ye(o) : o;
  }, [t, h, j, A]), W = N(() => {
    if (!T.current || !l || !b) return;
    const { scrollTop: o, scrollHeight: D, clientHeight: m } = T.current, L = D - o - m;
    X(L <= k);
  }, [l, b, k]);
  re(() => {
    const o = T.current;
    if (o)
      return o.addEventListener("scroll", W), W(), () => {
        o.removeEventListener("scroll", W);
      };
  }, [W]);
  const V = N(
    (o) => {
      Y((D) => {
        const m = new Set(D), L = m.has(o);
        return L ? m.delete(o) : m.add(o), F?.(o, !L), m;
      });
    },
    [F]
  ), a = (o, D = !1) => {
    const m = S.has(o.id), L = o.children && o.children.length > 0, P = o.count > 1;
    return /* @__PURE__ */ s(
      "div",
      {
        className: `activity-stream__item ${D ? "activity-stream__item--child" : ""}`,
        children: [
          Q && !D && /* @__PURE__ */ e("div", { className: "activity-stream__timeline-marker" }),
          /* @__PURE__ */ e("div", { className: "activity-stream__icon", children: o.icon || kt(o.type) }),
          /* @__PURE__ */ s("div", { className: "activity-stream__content", children: [
            /* @__PURE__ */ s(
              "div",
              {
                className: `activity-stream__header ${P || L ? "activity-stream__header--clickable" : ""}`,
                onClick: () => (P || L) && V(o.id),
                onKeyDown: (H) => {
                  (P || L) && (H.key === "Enter" || H.key === " ") && (H.preventDefault(), V(o.id));
                },
                role: P || L ? "button" : void 0,
                tabIndex: P || L ? 0 : void 0,
                "aria-expanded": P || L ? m : void 0,
                children: [
                  /* @__PURE__ */ e("div", { className: "activity-stream__title", children: o.title }),
                  /* @__PURE__ */ e("div", { className: "activity-stream__timestamp", children: wt(o.timestamp) }),
                  (P || L) && /* @__PURE__ */ e("div", { className: "activity-stream__toggle", children: m ? /* @__PURE__ */ e(ke.fold, { size: 16 }) : /* @__PURE__ */ e(ke.unfold, { size: 16 }) })
                ]
              }
            ),
            m && L && o.children && /* @__PURE__ */ e("div", { className: "activity-stream__children", children: o.children.map((H) => a(H, !0)) }),
            m && !L && o.events.length > 1 && /* @__PURE__ */ e("div", { className: "activity-stream__events-list", children: o.events.map((H) => /* @__PURE__ */ s("div", { className: "activity-stream__event-item", children: [
              /* @__PURE__ */ e("div", { className: "activity-stream__event-title", children: H.title }),
              H.description && /* @__PURE__ */ e("div", { className: "activity-stream__event-description", children: H.description })
            ] }, H.id)) }),
            m && o.count === 1 && o.events[0].description && /* @__PURE__ */ e("div", { className: "activity-stream__description", children: o.events[0].description })
          ] })
        ]
      },
      o.id
    );
  }, v = (o) => /* @__PURE__ */ s("div", { className: "activity-stream__date-separator", children: [
    /* @__PURE__ */ e("div", { className: "activity-stream__date-label", children: o.label }),
    /* @__PURE__ */ e("div", { className: "activity-stream__date-line" })
  ] }, o.id), f = u?.hasMore !== void 0 ? u.hasMore : u?.totalItems !== void 0 ? t.length < u.totalItems : !0, y = "activity-stream", U = `${y}--${n}`, K = Q ? `${y}--with-timeline` : "";
  let Z = `${y} ${U} ${K} ${r}`.trim();
  return z && z < 1 && (Z = `${Z} ${y}--compact`), z && z > 1 && (Z = `${Z} ${y}--spacious`), /* @__PURE__ */ e("div", { ref: C, className: Z, "data-theme": n, children: /* @__PURE__ */ s(
    "div",
    {
      ref: T,
      className: "activity-stream__container",
      style: {
        ...g ? { maxHeight: g } : void 0,
        ...{ "--activity-stream-scale": z }
      },
      children: [
        $.length === 0 ? /* @__PURE__ */ e("div", { className: "activity-stream__empty", children: q }) : /* @__PURE__ */ e("div", { className: "activity-stream__items", children: $.map(
          (o) => "type" in o && o.type === "date-separator" ? v(o) : a(o)
        ) }),
        d && /* @__PURE__ */ s("div", { className: "activity-stream__loading", children: [
          /* @__PURE__ */ e("div", { className: "activity-stream__spinner" }),
          /* @__PURE__ */ e("span", { children: "Loading..." })
        ] }),
        l && !d && f && b && /* @__PURE__ */ e(
          "div",
          {
            className: `activity-stream__load-more ${ne ? "activity-stream__load-more--visible" : ""}`,
            onClick: b,
            onKeyDown: (o) => {
              (o.key === "Enter" || o.key === " ") && (o.preventDefault(), b());
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
};
export {
  xe as ActivityIcons,
  ot as AlienIcon,
  mt as BriefcaseIcon,
  it as BugIcon,
  xt as BuildIcon,
  Tt as BusinessIcons,
  Mt as Button,
  gt as CalendarIcon,
  ht as ChartIcon,
  Fe as CheckIcon,
  qe as CloseIcon,
  rt as CloudIcon,
  lt as CodeIcon,
  ze as CommentIcon,
  Ae as CommitIcon,
  tt as DatabaseIcon,
  Ue as DeployIcon,
  yt as DeploymentIcon,
  Wt as DevProcessIcons,
  ft as DocumentIcon,
  Je as DumbbellIcon,
  Vt as FitnessIcons,
  je as FoldIcon,
  We as ForkIcon,
  pt as GitBranchIcon,
  Qe as HeartRateIcon,
  Ee as IssueIcon,
  Ze as MeditationIcon,
  ut as MeetingIcon,
  Pe as MergeIcon,
  st as PlanetIcon,
  vt as PullRequestDraftIcon,
  Ve as PullRequestIcon,
  Oe as ReleaseIcon,
  _t as ReviewIcon,
  ct as RocketIcon,
  Ye as RunningIcon,
  at as SatelliteIcon,
  et as ServerIcon,
  zt as SpaceIcons,
  Te as StarIcon,
  Xe as StrengthIcon,
  Ke as TaiChiIcon,
  Et as TechIcons,
  dt as TelescopeIcon,
  nt as TerminalIcon,
  bt as TestingIcon,
  Pt as UIForgeActivityStream,
  It as UIForgeBlocksEditor,
  Ht as UIForgeComboBox,
  Nt as UIForgeGrid,
  ke as UIIcons,
  Re as UnfoldIcon,
  At as WellnessIcons,
  Ge as YogaIcon,
  Bt as blocksToHTML,
  Dt as blocksToJSON,
  St as blocksToMarkdown
};

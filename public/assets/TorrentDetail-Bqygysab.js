const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./MoveTorrentFileDialog-CJpp6E2S.js","./ColoredChip.vue_vue_type_script_setup_true_lang-C01Mz7Ad.js","./index-C_Cl-ewj.js","./vue-D4Df4Kb1.js","./vuetify-BGOl-5v9.js","./index-ChUF2c3p.css","./BulkRenameFilesDialog-Cz-KBC8T.js","./BulkRenameFilesDialog-CKEu44go.css","./browserAll-CM7GLF9O.js","./webworkerAll-Djjc1v22.js","./colorToUniform-C2GHuDhf.js","./CanvasPool-W6CwvsYO.js","./WebGPURenderer-_4Fe-DO4.js","./SharedSystems-CuAhXIky.js","./WebGLRenderer-Cdx9vxUX.js"])))=>i.map(i=>d[i]);
import { b as Ce, a as Io, _ as Ro } from "./ColoredChip.vue_vue_type_script_setup_true_lang-C01Mz7Ad.js";
import { s as Yt, a as Q, a7 as Or, w as Eo, a1 as tn, b as mt, W as Do, R as xt, r as ws, l as Bo, B as We, a8 as nr, e as wt, I as Fo, D as j, E as O, H as w, m as y, J as X, K as G, u as P, M as Ye, N as Et, L as en, P as Xe, a9 as Go, n as pe, T as Y, O as K, V as sn, Y as _s, j as ke, A as ts, q as Cs, a0 as zr, F as kt, U as Gt, G as rn, a2 as Tr, S as Vo, X as Lr, v as No, aa as nn, ab as on, Q as $o } from "./vue-D4Df4Kb1.js";
import { br as nt, bs as Oo, a2 as an, a0 as Se, u as ee, F as es, o as jt, a3 as zo, af as ln, p as Ss, bt as Pe, c as hn, d as Xt, e as As, f as me, g as un, V as Qt, i as je, j as Me, k as ot, l as qe, bu as Ur, bv as Lo, bw as Hr, bx as Uo, J as Ho, K as Wo, r as pt, q as it, t as Wr, ax as or, a as St, w as Yo, s as Ie, by as Xo, a7 as Ot, S as jo, ai as cn, bq as qo, a9 as Ts, R as ys, W as Ko, ay as Zo, X as ks, z as ge, B as _e, ad as be, a6 as Qo, bg as Jo, C as xs, ao as Yr, bm as fe, bz as ta, y as ea, bA as Es, bj as sa, bf as ra, be as ia, bn as Xr, bB as na, bC as oa, bD as aa, H as la, aq as ha, aj as ar, ba as ua, aQ as ca, av as da, ah as lr, a1 as dn, bE as fa, bF as Ds, ae as fn, b as pa, m as ma, b4 as ga, bG as _a, a4 as ya, a5 as xa, b2 as ve, b3 as ba, __tla as __tla_0 } from "./index-C_Cl-ewj.js";
import { a as pn, u as va } from "./vuetify-BGOl-5v9.js";
let Ft, no, Pt, xe, ne, ht, Tn, Ms, zt, Ol, ui, Ke, dh, et, vh, _t, At, vt, yr, Yh, os, mr, Ah, di, Hs, pi, Ul, Sa, re, Mn, oo, ct, yt, Ih, Qh, _u, xu, Su, Tu, ku, Ve, ze, Qi, Is, Eh, bs, Te, vo, Ii, Pi, ll, vs, ul, So, yd, Qe, ms, Rr, Vt, Mi, Uh, so, On, qt, eo, gu, yu, Qr, wu, Au, uo, Cl, Er, ut, ye, Zn, Dt, hl, Mu, Jt;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    var le = ((r)=>(r[r.DISABLED = 0] = "DISABLED", r[r.NOT_YET_CONTACTED = 1] = "NOT_YET_CONTACTED", r[r.WORKING = 2] = "WORKING", r[r.UPDATING = 3] = "UPDATING", r[r.NOT_WORKING = 4] = "NOT_WORKING", r))(le || {});
    class wa {
        type;
        id;
        fullName;
        name;
        availability;
        priority;
        progress;
        size;
        get selectedSize() {
            return this.wanted ? this.size : 0;
        }
        get childrenIds() {
            return [
                this.id
            ];
        }
        get wanted() {
            return this.priority !== nt.DO_NOT_DOWNLOAD;
        }
        deepCount = [
            0,
            1
        ];
        constructor(t, e){
            this.type = "file", this.name = e, this.id = t.index, this.fullName = t.name, this.availability = t.availability, this.priority = t.priority, this.progress = t.progress, this.size = t.size;
        }
        buildCache() {}
        isSelected(t) {
            return t.has(this.fullName);
        }
    }
    class mn {
        type;
        id;
        fullName;
        name;
        children;
        priority = nt.DO_NOT_DOWNLOAD;
        childrenIds = [];
        wanted = null;
        progress = 0;
        deepCount = [
            1,
            0
        ];
        size = 0;
        selectedSize = 0;
        constructor(t, e){
            this.type = "folder", this.id = e, this.fullName = e, this.name = t, this.children = [];
        }
        buildCache() {
            if (this.children.length === 0) {
                this.priority = nt.DO_NOT_DOWNLOAD, this.childrenIds = [], this.wanted = null, this.progress = 0, this.deepCount = [
                    1,
                    0
                ], this.size = 0, this.selectedSize = 0;
                return;
            }
            this.children.forEach((e)=>{
                e.buildCache();
            }), this.priority = this.children.map((e)=>e.priority).reduce((e, s)=>e === nt.MIXED || e === s ? e : nt.MIXED), this.childrenIds = this.children.map((e)=>e.childrenIds ?? []).flat(), this.wanted = this.children.map((e)=>e.wanted).some(Boolean);
            const t = this.children.filter((e)=>e.wanted);
            if (t.length === 0) this.progress = 0;
            else {
                const e = t.reduce((s, i)=>[
                        s[0] + i.selectedSize * i.progress,
                        s[1] + i.selectedSize
                    ], [
                    0,
                    0
                ]);
                this.progress = e[0] / e[1];
            }
            this.deepCount = this.children.map((e)=>e.deepCount).reduce((e, s)=>[
                    e[0] + s[0],
                    e[1] + s[1]
                ], [
                1,
                0
            ]), this.size = this.children.map((e)=>e.size).reduce((e, s)=>e + s, 0), this.selectedSize = this.children.filter((e)=>e.wanted).map((e)=>e.selectedSize).reduce((e, s)=>e + s, 0);
        }
        isSelected(t) {
            return t.has(this.fullName);
        }
    }
    function jr() {
        return new mn("(root)", "");
    }
    function Ca(r, t) {
        const e = Yt(jr()), s = Q(()=>{
            const n = (o, a)=>{
                const l = a === "" ? o.name : a + "/" + o.name;
                if (o.type === "folder" && Or(t).has(o.fullName)) {
                    const u = Oo(o.children, (h, c)=>h.type === "folder" && c.type === "file" ? -1 : h.type === "file" && c.type === "folder" ? 1 : an.textWithNumbers.asc(h.name, c.name)).flatMap((h)=>n(h, l));
                    return [
                        o,
                        ...u
                    ];
                } else return [
                    o
                ];
            };
            return n(e.value, "");
        });
        function i() {
            const n = jr(), o = Or(r) ?? [];
            for (const a of o){
                let l = n;
                a.name.replace(/\\/g, "/").split("/").reduce((u, h)=>{
                    const c = u === "" ? h : u + "/" + h;
                    if (u === a.name.substring(0, a.name.lastIndexOf("/"))) l.children.push(new wa(a, h));
                    else {
                        const p = l.children.find((d)=>d.name === h);
                        if (p) l = p;
                        else {
                            const d = new mn(h, c);
                            l.children.push(d), l = d;
                        }
                    }
                    return c;
                }, "");
            }
            e.value = n, n.buildCache();
        }
        return Eo(()=>{
            i();
        }), {
            tree: e,
            flatTree: s
        };
    }
    let se, Aa, Ta, ka, Pa, Ma, Ia, Ra, qr, Ea, Da, Ba, Fa, Ga, Va, Na;
    se = tn("torrentDetail", ()=>{
        const r = mt("overview"), t = mt();
        async function e(s) {
            t.value = await Se.getTorrentProperties(s);
        }
        return {
            tab: r,
            properties: t,
            fetchProperties: e,
            $reset: ()=>{
                t.value = void 0;
            }
        };
    }, {
        persistence: {
            enabled: !0,
            storageItems: [
                {
                    storage: localStorage,
                    includePaths: [
                        "tab"
                    ]
                }
            ]
        }
    });
    ye = tn("content", ()=>{
        const { t: r } = ee(), t = Do(), e = es(), { fileContentInterval: s, expandContent: i } = xt(jt()), n = Q(()=>t.params.hash), o = ws({
            isVisible: !1,
            offset: [
                0,
                0
            ]
        }), a = Yt(!0), l = Yt([]), u = Yt(""), { results: h } = zo(l, u, (T)=>T.name), c = Yt(new Set([
            ""
        ])), { flatTree: p } = Ca(h, c), d = Yt(new Set), g = Yt(""), _ = Q(()=>d.value.size === 0 ? [] : p.value.filter((T)=>d.value.has(T.fullName))), m = Q(()=>_.value.length > 0 ? _.value[0] : null), b = Q(()=>_.value.map((T)=>T.childrenIds).flat().filter((T, R, U)=>U.indexOf(T) === R)), v = Q(()=>[
                {
                    text: r(`torrentDetail.content.rename.${m.value?.type || "file"}`),
                    icon: "mdi-rename",
                    hidden: d.value.size > 1 || m.value?.fullName === "",
                    action: ()=>L(m.value)
                },
                {
                    text: r("torrentDetail.content.rename.bulk"),
                    icon: "mdi-rename",
                    hidden: d.value.size !== 1 || (m.value?.type || "file") === "file",
                    action: ()=>$(Bo(m.value))
                },
                {
                    text: r("torrentDetail.content.invert_priority"),
                    icon: "mdi-checkbox-intermediate-variant",
                    action: D
                },
                {
                    text: r("torrentDetail.content.priority"),
                    icon: "mdi-trending-up",
                    children: [
                        {
                            text: r("constants.file_priority.max"),
                            icon: "mdi-arrow-up",
                            action: ()=>H(b.value, nt.MAXIMAL)
                        },
                        {
                            text: r("constants.file_priority.high"),
                            icon: "mdi-arrow-top-right",
                            action: ()=>H(b.value, nt.HIGH)
                        },
                        {
                            text: r("constants.file_priority.normal"),
                            icon: "mdi-minus",
                            action: ()=>H(b.value, nt.NORMAL)
                        },
                        {
                            text: r("constants.file_priority.unwanted"),
                            icon: "mdi-cancel",
                            action: ()=>H(b.value, nt.DO_NOT_DOWNLOAD)
                        }
                    ]
                },
                {
                    text: "Collapse All",
                    icon: "mdi-unfold-less-horizontal",
                    action: A
                },
                {
                    text: "Expand All",
                    icon: "mdi-unfold-more-horizontal",
                    action: I
                }
            ]), S = ln(function*() {
            a.value ? (yield z().then(()=>i.value && I()), a.value = !1) : yield z();
        }).drop(), B = Yt(!1), { isActive: N, pause: E, resume: M } = Ss(S.perform, s, {
            immediate: !1,
            immediateCallback: !0
        });
        async function z() {
            l.value = await Z(n.value), await We();
        }
        async function L(T) {
            const { default: R } = await Pe(async ()=>{
                const { default: W } = await import("./MoveTorrentFileDialog-CJpp6E2S.js");
                return {
                    default: W
                };
            }, __vite__mapDeps([0,1,2,3,4,5]), import.meta.url), U = {
                hash: n.value,
                isFolder: T.type === "folder",
                oldName: T.fullName
            };
            e.createDialog(R, U, S.perform);
        }
        async function $(T) {
            const { default: R } = await Pe(async ()=>{
                const { default: W } = await import("./BulkRenameFilesDialog-Cz-KBC8T.js");
                return {
                    default: W
                };
            }, __vite__mapDeps([6,2,3,4,5,1,7]), import.meta.url), U = {
                hash: n.value,
                node: T
            };
            e.createDialog(R, U, S.perform);
        }
        async function D() {
            const T = _.value.flatMap((q)=>q.childrenIds), R = l.value.filter((q)=>T.includes(q.index)), U = R.filter((q)=>q.priority !== nt.DO_NOT_DOWNLOAD).map((q)=>q.index), W = R.filter((q)=>q.priority === nt.DO_NOT_DOWNLOAD).map((q)=>q.index);
            await Promise.all([
                H(W, nt.NORMAL),
                H(U, nt.DO_NOT_DOWNLOAD)
            ]);
        }
        async function k(T, R, U) {
            await Se.renameFile(T, R, U);
        }
        async function V(T, R, U) {
            await Se.renameFolder(T, R, U);
        }
        async function H(T, R) {
            await Se.setTorrentFilePriority(n.value, T, R), S.perform();
        }
        async function Z(T, R) {
            return await Se.getTorrentFiles(T, R);
        }
        async function f(T) {
            return await Se.getTorrentPieceStates(T);
        }
        function x(T, R) {
            T.stopPropagation();
            const U = R.type === "file" ? R.fullName.slice(0, R.fullName.lastIndexOf("/")) : R.fullName;
            c.value.has(U) || (c.value.add(U), nr(c));
        }
        function C(T, R) {
            T.stopPropagation();
            const U = R.type === "file" || !c.value.has(R.fullName) ? R.fullName.slice(0, R.fullName.lastIndexOf("/")) : R.fullName;
            c.value.has(U) && (c.value.delete(U), d.value.has(R.fullName) && (d.value.delete(R.fullName), d.value.add(U), g.value = U), nr(c));
        }
        function A() {
            c.value = new Set([
                ""
            ]);
        }
        function I() {
            c.value = l.value.flatMap((T)=>T.name.replaceAll("\\", "/").split("/").reduce((R, U, W, q)=>[
                        ...R,
                        ...W < q.length - 1 ? [
                            [
                                ...R,
                                U
                            ].join("/")
                        ] : []
                    ], [])).reduce((T, R)=>T.add(R), new Set([
                ""
            ]));
        }
        async function F(...T) {
            const R = T.some((W)=>W.wanted), U = T.flatMap((W)=>W.childrenIds);
            R ? await H(U, nt.DO_NOT_DOWNLOAD) : await H(U, nt.NORMAL);
        }
        return {
            rightClickProperties: o,
            isFirstRun: a,
            internalSelection: d,
            lastSelected: g,
            selectedNodes: _,
            menuData: v,
            filenameFilter: u,
            cachedFiles: l,
            openedItems: c,
            filteredFiles: h,
            flatTree: p,
            updateFileTreeTask: S,
            timerForcedPause: B,
            isTimerActive: N,
            pauseTimer: E,
            resumeTimer: M,
            renameTorrentFile: k,
            renameTorrentFolder: V,
            setFilePriority: H,
            fetchFiles: Z,
            fetchPieceState: f,
            openNode: x,
            closeNode: C,
            collapseAll: A,
            expandAll: I,
            toggleFileSelection: F,
            $reset: ()=>{
                E(), S.clear(), d.value.clear(), g.value = "", u.value = "", l.value = [], c.value = new Set([
                    ""
                ]), a.value = !0;
            }
        };
    });
    Sa = wt({
        __name: "MoveTorrentFileDialog",
        props: {
            guid: {},
            hash: {},
            isFolder: {
                type: Boolean
            },
            oldName: {}
        },
        setup (r) {
            const t = r, { isOpened: e } = hn(t.guid), { t: s } = ee(), i = ye(), n = mt(), o = mt(), a = mt(!1), l = ws({
                newName: ""
            }), u = [
                (p)=>!!p || s("dialogs.moveTorrent.required")
            ];
            async function h() {
                await n.value?.validate(), a.value && (t.isFolder ? await i.renameTorrentFolder(t.hash, t.oldName, l.newName) : await i.renameTorrentFile(t.hash, t.oldName, l.newName), c());
            }
            const c = ()=>{
                e.value = !1;
            };
            return Fo(()=>{
                if (l.newName = t.oldName, t.isFolder) We(()=>o.value?.select());
                else {
                    const p = l.newName.lastIndexOf("/"), d = l.newName.lastIndexOf(".");
                    We(()=>{
                        o.value?.setSelectionRange(p + 1, d == -1 ? l.newName.length : d);
                    });
                }
            }), (p, d)=>(O(), j(qe, {
                    modelValue: P(e),
                    "onUpdate:modelValue": d[3] || (d[3] = (g)=>Xe(e) ? e.value = g : null)
                }, {
                    default: w(()=>[
                            y(Xt, null, {
                                default: w(()=>[
                                        y(As, null, {
                                            default: w(()=>[
                                                    X(G(P(s)("dialogs.moveTorrentFile.title", 1 + Number(p.isFolder))), 1)
                                                ]),
                                            _: 1
                                        }),
                                        y(me, null, {
                                            default: w(()=>[
                                                    y(P(un), {
                                                        modelValue: a.value,
                                                        "onUpdate:modelValue": d[1] || (d[1] = (g)=>a.value = g),
                                                        ref_key: "form",
                                                        ref: n,
                                                        onSubmit: d[2] || (d[2] = Ye(()=>{}, [
                                                            "prevent"
                                                        ]))
                                                    }, {
                                                        default: w(()=>[
                                                                p.oldName ? (O(), j(Qt, {
                                                                    key: 0,
                                                                    "model-value": p.oldName,
                                                                    disabled: "",
                                                                    label: p.$t("dialogs.moveTorrentFile.oldName")
                                                                }, null, 8, [
                                                                    "model-value",
                                                                    "label"
                                                                ])) : Et("", !0),
                                                                y(Qt, {
                                                                    modelValue: l.newName,
                                                                    "onUpdate:modelValue": d[0] || (d[0] = (g)=>l.newName = g),
                                                                    ref_key: "input",
                                                                    ref: o,
                                                                    rules: u,
                                                                    autofocus: "",
                                                                    label: p.$t("dialogs.moveTorrent.newPath"),
                                                                    onKeydown: en(h, [
                                                                        "enter"
                                                                    ])
                                                                }, null, 8, [
                                                                    "modelValue",
                                                                    "label"
                                                                ])
                                                            ]),
                                                        _: 1
                                                    }, 8, [
                                                        "modelValue"
                                                    ])
                                                ]),
                                            _: 1
                                        }),
                                        y(je, null, {
                                            default: w(()=>[
                                                    y(Me),
                                                    y(ot, {
                                                        color: "error",
                                                        onClick: c
                                                    }, {
                                                        default: w(()=>[
                                                                X(G(p.$t("common.cancel")), 1)
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y(ot, {
                                                        color: "accent",
                                                        disabled: !a.value,
                                                        onClick: h
                                                    }, {
                                                        default: w(()=>[
                                                                X(G(p.$t("common.save")), 1)
                                                            ]),
                                                        _: 1
                                                    }, 8, [
                                                        "disabled"
                                                    ])
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }, 8, [
                    "modelValue"
                ]));
        }
    });
    Aa = {
        style: {
            "white-space": "nowrap"
        }
    };
    Ta = wt({
        __name: "ContentFilterDialog",
        props: {
            guid: {}
        },
        setup (r) {
            const t = r, { t: e } = ee(), { isOpened: s } = hn(t.guid), i = ye(), n = jt(), o = Q(()=>i.cachedFiles.map((m)=>m.size).reduce((m, b)=>[
                        m[0] === -1 || b < m[0] ? b : m[0],
                        m[1] === -1 || b > m[1] ? b : m[1]
                    ], [
                    -1,
                    -1
                ])), a = Q(()=>new Set(i.cachedFiles.map((m)=>Ur(m.name)[1])).values().reduce((m, b)=>{
                    const v = Lo(b);
                    return Object.keys(m).includes(v) ? m[v].push(b) : m[v] = [
                        b
                    ], m;
                }, {})), l = Q(()=>Object.entries(a.value).sort(([m, b], [v, S])=>m === Hr.UNKNOWN ? 1 : v === Hr.UNKNOWN ? -1 : an.text.asc(m, v)).flatMap(([m, b])=>[
                        {
                            props: {
                                header: e(`constants.file_type.${m}`),
                                icon: Uo(m)
                            }
                        },
                        ...b.map((v)=>({
                                title: v ? `.${v}` : e("constants.file_type.no_ext"),
                                value: v
                            })),
                        {
                            props: {
                                divider: !0
                            }
                        }
                    ])), u = [
                {
                    title: e("constants.file_priority.unwanted"),
                    value: nt.DO_NOT_DOWNLOAD
                },
                {
                    title: e("constants.file_priority.normal"),
                    value: nt.NORMAL
                },
                {
                    title: e("constants.file_priority.high"),
                    value: nt.HIGH
                },
                {
                    title: e("constants.file_priority.max"),
                    value: nt.MAXIMAL
                }
            ], h = ws({
                extensions: [],
                priority: [],
                size: o.value
            }), c = Q(()=>i.cachedFiles.filter((m)=>(!h.extensions.length || h.extensions.includes(Ur(m.name)[1])) && (!h.priority.length || h.priority.includes(m.priority)) && m.size >= h.size[0] && m.size <= h.size[1])), p = Q(()=>c.value.reduce((m, b)=>m + b.size, 0));
            function d() {
                i.setFilePriority(c.value.map((m)=>m.index), nt.DO_NOT_DOWNLOAD), _();
            }
            function g() {
                const m = c.value.filter((b)=>b.priority === nt.DO_NOT_DOWNLOAD).map((b)=>b.index);
                i.setFilePriority(m, nt.NORMAL), _();
            }
            function _() {
                s.value = !1;
            }
            return (m, b)=>(O(), j(qe, {
                    modelValue: P(s),
                    "onUpdate:modelValue": b[5] || (b[5] = (v)=>Xe(s) ? s.value = v : null),
                    fullscreen: m.$vuetify.display.mobile
                }, {
                    default: w(()=>[
                            y(Xt, null, {
                                default: w(()=>[
                                        y(As, {
                                            class: "ios-margin"
                                        }, {
                                            default: w(()=>[
                                                    y(Ho, {
                                                        color: "transparent"
                                                    }, {
                                                        default: w(()=>[
                                                                y(Wo, null, {
                                                                    default: w(()=>[
                                                                            X(G(P(e)("torrentDetail.content.filter.title")), 1)
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(ot, {
                                                                    icon: "mdi-close",
                                                                    onClick: _
                                                                })
                                                            ]),
                                                        _: 1
                                                    })
                                                ]),
                                            _: 1
                                        }),
                                        y(me, null, {
                                            default: w(()=>[
                                                    y(pt, null, {
                                                        default: w(()=>[
                                                                y(it, {
                                                                    cols: "4",
                                                                    class: "d-flex align-center"
                                                                }, {
                                                                    default: w(()=>[
                                                                            X(G(P(e)("torrentDetail.content.filter.extensions")), 1)
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(it, {
                                                                    cols: "8"
                                                                }, {
                                                                    default: w(()=>[
                                                                            y(Wr, {
                                                                                modelValue: h.extensions,
                                                                                "onUpdate:modelValue": b[0] || (b[0] = (v)=>h.extensions = v),
                                                                                items: l.value,
                                                                                placeholder: P(e)("common.disabled"),
                                                                                "persistent-placeholder": "",
                                                                                multiple: "",
                                                                                "hide-details": ""
                                                                            }, {
                                                                                item: w(({ props: v })=>[
                                                                                        v.header ? (O(), j(or, {
                                                                                            key: 0
                                                                                        }, {
                                                                                            default: w(()=>[
                                                                                                    y(St, null, {
                                                                                                        default: w(()=>[
                                                                                                                X(G(v.icon), 1)
                                                                                                            ]),
                                                                                                        _: 2
                                                                                                    }, 1024),
                                                                                                    X(" " + G(v.header), 1)
                                                                                                ]),
                                                                                            _: 2
                                                                                        }, 1024)) : v.divider ? (O(), j(Yo, {
                                                                                            key: 1
                                                                                        })) : (O(), j(Ie, Go(pe({
                                                                                            key: 2
                                                                                        }, v)), null, 16))
                                                                                    ]),
                                                                                _: 1
                                                                            }, 8, [
                                                                                "modelValue",
                                                                                "items",
                                                                                "placeholder"
                                                                            ])
                                                                        ]),
                                                                    _: 1
                                                                })
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y(pt, null, {
                                                        default: w(()=>[
                                                                y(it, {
                                                                    cols: "4",
                                                                    class: "d-flex align-center"
                                                                }, {
                                                                    default: w(()=>[
                                                                            X(G(P(e)("torrentDetail.content.filter.priority")), 1)
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(it, {
                                                                    cols: "8"
                                                                }, {
                                                                    default: w(()=>[
                                                                            y(Wr, {
                                                                                modelValue: h.priority,
                                                                                "onUpdate:modelValue": b[1] || (b[1] = (v)=>h.priority = v),
                                                                                items: u,
                                                                                placeholder: P(e)("common.disabled"),
                                                                                "persistent-placeholder": "",
                                                                                multiple: "",
                                                                                "hide-details": ""
                                                                            }, null, 8, [
                                                                                "modelValue",
                                                                                "placeholder"
                                                                            ])
                                                                        ]),
                                                                    _: 1
                                                                })
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y(pt, null, {
                                                        default: w(()=>[
                                                                y(it, {
                                                                    cols: "4",
                                                                    class: "d-flex align-center"
                                                                }, {
                                                                    default: w(()=>[
                                                                            X(G(P(e)("torrentDetail.content.filter.size")), 1)
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(it, {
                                                                    cols: "8"
                                                                }, {
                                                                    default: w(()=>[
                                                                            y(Xo, {
                                                                                modelValue: h.size,
                                                                                "onUpdate:modelValue": b[4] || (b[4] = (v)=>h.size = v),
                                                                                direction: m.$vuetify.display.mobile ? "vertical" : "horizontal",
                                                                                color: "primary",
                                                                                disabled: o.value[0] === o.value[1],
                                                                                min: o.value[0],
                                                                                max: o.value[1],
                                                                                step: 1,
                                                                                density: "compact",
                                                                                "thumb-label": "always",
                                                                                "hide-details": ""
                                                                            }, {
                                                                                "thumb-label": w(({ modelValue: v })=>[
                                                                                        Y("div", Aa, G(P(Ot)(v, P(n).useBinarySize)), 1)
                                                                                    ]),
                                                                                prepend: w(()=>[
                                                                                        y(Qt, {
                                                                                            modelValue: h.size[0],
                                                                                            "onUpdate:modelValue": b[2] || (b[2] = (v)=>h.size[0] = v),
                                                                                            "hide-spin-buttons": "",
                                                                                            density: "compact",
                                                                                            style: {
                                                                                                width: "130px"
                                                                                            },
                                                                                            type: "number",
                                                                                            variant: "outlined",
                                                                                            "hide-details": "",
                                                                                            "single-line": ""
                                                                                        }, null, 8, [
                                                                                            "modelValue"
                                                                                        ])
                                                                                    ]),
                                                                                append: w(()=>[
                                                                                        y(Qt, {
                                                                                            modelValue: h.size[1],
                                                                                            "onUpdate:modelValue": b[3] || (b[3] = (v)=>h.size[1] = v),
                                                                                            "hide-spin-buttons": "",
                                                                                            density: "compact",
                                                                                            style: {
                                                                                                width: "130px"
                                                                                            },
                                                                                            type: "number",
                                                                                            variant: "outlined",
                                                                                            "hide-details": "",
                                                                                            "single-line": ""
                                                                                        }, null, 8, [
                                                                                            "modelValue"
                                                                                        ])
                                                                                    ]),
                                                                                _: 1
                                                                            }, 8, [
                                                                                "modelValue",
                                                                                "direction",
                                                                                "disabled",
                                                                                "min",
                                                                                "max"
                                                                            ])
                                                                        ]),
                                                                    _: 1
                                                                })
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y(pt, null, {
                                                        default: w(()=>[
                                                                y(it, {
                                                                    cols: "12"
                                                                }, {
                                                                    default: w(()=>[
                                                                            X(G(P(e)("torrentDetail.content.filter.preview", {
                                                                                count: c.value.length,
                                                                                total: P(i).cachedFiles.length,
                                                                                size: P(Ot)(p.value, P(n).useBinarySize)
                                                                            })), 1)
                                                                        ]),
                                                                    _: 1
                                                                })
                                                            ]),
                                                        _: 1
                                                    })
                                                ]),
                                            _: 1
                                        }),
                                        y(je, null, {
                                            default: w(()=>[
                                                    y(ot, {
                                                        color: "error",
                                                        onClick: d
                                                    }, {
                                                        default: w(()=>[
                                                                X(G(P(e)("torrentDetail.content.filter.exclude")), 1)
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y(ot, {
                                                        color: "success",
                                                        onClick: g
                                                    }, {
                                                        default: w(()=>[
                                                                X(G(P(e)("torrentDetail.content.filter.include")), 1)
                                                            ]),
                                                        _: 1
                                                    })
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }, 8, [
                    "modelValue",
                    "fullscreen"
                ]));
        }
    });
    ka = {
        class: "d-flex"
    };
    Pa = {
        key: 1,
        class: "d-flex align-center spacer"
    };
    Ma = {
        class: "d-flex flex-column overflow-hidden text-no-wrap mr-3"
    };
    Ia = {
        class: "text-grey"
    };
    Ra = {
        class: "d-flex align-center"
    };
    qr = "#ffe476";
    Ea = wt({
        __name: "ContentNode",
        props: {
            node: {}
        },
        emits: [
            "onRightClick"
        ],
        setup (r) {
            const t = r, { t: e } = ee(), { mobile: s } = pn(), i = ye(), { internalSelection: n, lastSelected: o, openedItems: a } = xt(i), l = jt(), u = Q(()=>{
                if (t.node.fullName === "") return 0;
                const g = t.node.fullName.split("/").length, _ = s.value ? 12 : 24;
                return g * _;
            });
            function h(g, _) {
                qo(g) ? (n.value.has(_.fullName) ? n.value.delete(_.fullName) : n.value.add(_.fullName), nr(n)) : n.value = new Set([
                    _.fullName
                ]), o.value = _.fullName;
            }
            function c(g) {
                return g.wanted ? g.progress === 1 ? "green" : "" : "grey";
            }
            function p(g) {
                const [_, m] = g.deepCount, b = [];
                return _ > 1 && b.push(e("torrentDetail.content.folderInfo", _ - 1)), m > 0 && b.push(e("torrentDetail.content.fileInfo", m)), b.join(", ");
            }
            function d(g) {
                const _ = Ot(g.size, l.useBinarySize), m = Ot(g.selectedSize, l.useBinarySize);
                let b;
                if (g.type === "folder") {
                    let v = _;
                    g.selectedSize > 0 && (v += ` (${m})`), b = [
                        v,
                        p(g)
                    ];
                } else b = [
                    _
                ];
                return b.join(" | ");
            }
            return (g, _)=>(O(), K("div", {
                    class: _s([
                        "d-flex flex-column py-2 pr-3",
                        g.node.isSelected(P(n)) ? "selected" : ""
                    ]),
                    style: sn(`padding-left: ${u.value}px`),
                    onClick: _[2] || (_[2] = Ye((m)=>h(m, g.node), [
                        "stop"
                    ])),
                    onContextmenu: _[3] || (_[3] = (m)=>g.$emit("onRightClick", m, g.node))
                }, [
                    Y("div", ka, [
                        Y("div", {
                            class: "d-flex align-center",
                            onClick: _[0] || (_[0] = Ye((m)=>P(i).toggleFileSelection(g.node), [
                                "stop"
                            ]))
                        }, [
                            g.node.priority === P(nt).MIXED ? (O(), j(St, {
                                key: 0,
                                color: c(g.node),
                                icon: "mdi-checkbox-intermediate-variant"
                            }, null, 8, [
                                "color"
                            ])) : g.node.wanted ? (O(), j(St, {
                                key: 1,
                                color: c(g.node),
                                icon: "mdi-checkbox-marked"
                            }, null, 8, [
                                "color"
                            ])) : (O(), j(St, {
                                key: 2,
                                color: c(g.node),
                                icon: "mdi-checkbox-blank-outline"
                            }, null, 8, [
                                "color"
                            ]))
                        ]),
                        g.node.type === "folder" ? (O(), K("div", {
                            key: 0,
                            class: "d-flex align-center spacer cursor-pointer",
                            onClick: _[1] || (_[1] = (m)=>P(a).has(g.node.fullName) ? P(i).closeNode(m, g.node) : P(i).openNode(m, g.node))
                        }, [
                            y(St, null, {
                                default: w(()=>[
                                        X(G(P(a).has(g.node.fullName) ? "mdi-chevron-up" : "mdi-chevron-down"), 1)
                                    ]),
                                _: 1
                            }),
                            g.node.fullName === "" ? (O(), j(St, {
                                key: 0,
                                icon: "mdi-file-tree"
                            })) : P(a).has(g.node.fullName) ? (O(), j(St, {
                                key: 1,
                                icon: "mdi-folder-open",
                                color: qr
                            })) : (O(), j(St, {
                                key: 2,
                                icon: "mdi-folder",
                                color: qr
                            }))
                        ])) : (O(), K("div", Pa, [
                            y(St, {
                                icon: P(jo)(g.node.name)
                            }, null, 8, [
                                "icon"
                            ])
                        ])),
                        Y("div", Ma, [
                            Y("div", {
                                class: _s(`text-${c(g.node)}`)
                            }, G(g.node.name), 3),
                            Y("div", Ia, G(d(g.node)), 1)
                        ]),
                        y(Me),
                        Y("div", Ra, [
                            g.node.priority === P(nt).MAXIMAL ? (O(), j(St, {
                                key: 0,
                                color: "error"
                            }, {
                                default: w(()=>_[4] || (_[4] = [
                                        X("mdi-arrow-up")
                                    ])),
                                _: 1
                            })) : g.node.priority === P(nt).HIGH ? (O(), j(St, {
                                key: 1,
                                color: "warning"
                            }, {
                                default: w(()=>_[5] || (_[5] = [
                                        X("mdi-arrow-top-right")
                                    ])),
                                _: 1
                            })) : g.node.priority === P(nt).NORMAL ? (O(), j(St, {
                                key: 2
                            }, {
                                default: w(()=>_[6] || (_[6] = [
                                        X("mdi-minus")
                                    ])),
                                _: 1
                            })) : g.node.priority === P(nt).MIXED ? (O(), j(St, {
                                key: 3
                            }, {
                                default: w(()=>_[7] || (_[7] = [
                                        X("mdi-tilde")
                                    ])),
                                _: 1
                            })) : g.node.priority === P(nt).DO_NOT_DOWNLOAD ? (O(), j(St, {
                                key: 4,
                                color: "grey"
                            }, {
                                default: w(()=>_[8] || (_[8] = [
                                        X("mdi-cancel")
                                    ])),
                                _: 1
                            })) : Et("", !0)
                        ])
                    ]),
                    y(cn, {
                        "model-value": g.node.progress,
                        max: 1,
                        color: c(g.node),
                        rounded: "sm"
                    }, null, 8, [
                        "model-value",
                        "color"
                    ])
                ], 38));
        }
    });
    Da = Ts(Ea, [
        [
            "__scopeId",
            "data-v-fe8319fc"
        ]
    ]);
    Ba = {
        class: "mt-2 mx-3 d-flex flex-gap align-center"
    };
    Fa = wt({
        __name: "Content",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, { height: e } = pn(), s = ye(), { rightClickProperties: i, filenameFilter: n, flatTree: o, internalSelection: a, selectedNodes: l, lastSelected: u, timerForcedPause: h, isTimerActive: c } = xt(s), p = es(), d = mt(), g = Q(()=>e.value - 48 * 2 - 64 - 12 * 2 - 56 - 8);
            async function _(M, z) {
                i.value.isVisible && (i.value.isVisible = !1, await We()), Object.assign(i.value, {
                    isVisible: !0,
                    offset: [
                        M.pageX,
                        M.pageY
                    ],
                    hash: t.torrent.hash
                }), a.value.size <= 1 && (a.value = new Set([
                    z.fullName
                ]), u.value = z.fullName);
            }
            const m = mt();
            function b(M, z) {
                m.value = setTimeout(()=>{
                    _(M, z);
                }, 500);
            }
            function v() {
                clearTimeout(m.value);
            }
            ke(()=>t.isActive, (M)=>{
                M && !h.value ? s.resumeTimer() : s.pauseTimer();
            }, {
                immediate: !0
            }), ts(()=>{
                document.addEventListener("keydown", E);
            }), Cs(()=>{
                s.$reset(), document.removeEventListener("keydown", E);
            });
            function S() {
                h.value = !0, s.pauseTimer();
            }
            function B() {
                h.value = !1, s.resumeTimer();
            }
            function N() {
                p.createDialog(Ta);
            }
            function E(M) {
                let z;
                ((k)=>{
                    k.ArrowUp = "ArrowUp", k.ArrowDown = "ArrowDown", k.ArrowLeft = "ArrowLeft", k.ArrowRight = "ArrowRight", k.Spacebar = " ";
                })(z || (z = {}));
                const L = M.key;
                if (p.hasActiveDialog || !Object.values(z).includes(L)) return !1;
                M.preventDefault();
                const $ = o.value.findIndex((k)=>k.fullName === u.value);
                let D = $;
                switch(L){
                    case "ArrowUp":
                        $ > 0 && D--;
                        break;
                    case "ArrowDown":
                        $ < o.value.length - 1 && D++;
                        break;
                    case "ArrowLeft":
                        s.closeNode(M, o.value[$]), D = o.value.findIndex((k)=>k.fullName === u.value);
                        break;
                    case "ArrowRight":
                        s.openNode(M, o.value[$]);
                        break;
                    case " ":
                        s.toggleFileSelection(...l.value).then();
                        break;
                }
                return $ !== D && (u.value = o.value[D].fullName, a.value = new Set([
                    u.value
                ]), d.value?.scrollToIndex(Math.max(0, D - Math.floor(g.value / 68 / 2)))), !0;
            }
            return (M, z)=>(O(), j(Xt, null, {
                    default: w(()=>[
                            Y("div", Ba, [
                                y(Qt, {
                                    modelValue: P(n),
                                    "onUpdate:modelValue": z[0] || (z[0] = (L)=>Xe(n) ? n.value = L : null),
                                    "hide-details": "",
                                    clearable: "",
                                    placeholder: M.$t("torrentDetail.content.filter_placeholder"),
                                    onKeydown: z[1] || (z[1] = Ye(()=>{}, [
                                        "stop"
                                    ]))
                                }, null, 8, [
                                    "modelValue",
                                    "placeholder"
                                ]),
                                y(ys, {
                                    text: M.$t("torrentDetail.content.filter.activator"),
                                    location: "bottom"
                                }, {
                                    activator: w(({ props: L })=>[
                                            y(ot, pe(L, {
                                                icon: "mdi-select-multiple",
                                                color: "primary",
                                                onClick: N
                                            }), null, 16)
                                        ]),
                                    _: 1
                                }, 8, [
                                    "text"
                                ]),
                                y(ys, {
                                    text: P(c) ? M.$t("common.pause") : M.$t("common.resume"),
                                    location: "bottom"
                                }, {
                                    activator: w(({ props: L })=>[
                                            y(ot, pe(L, {
                                                icon: P(c) ? "mdi-timer-pause" : "mdi-timer-play",
                                                color: "primary",
                                                onClick: z[2] || (z[2] = ($)=>P(c) ? S() : B())
                                            }), null, 16, [
                                                "icon"
                                            ])
                                        ]),
                                    _: 1
                                }, 8, [
                                    "text"
                                ])
                            ]),
                            y(P(Ko), {
                                ref_key: "scrollView",
                                ref: d,
                                items: P(o),
                                height: g.value,
                                "item-height": "68",
                                class: "pa-2"
                            }, {
                                default: w(({ item: L })=>[
                                        y(Da, {
                                            node: L,
                                            onTouchcancel: v,
                                            onTouchend: v,
                                            onTouchmove: v,
                                            onTouchstart: ($)=>b($.touches.item(0), L),
                                            onOnRightClick: z[3] || (z[3] = ($, D)=>_($, D))
                                        }, null, 8, [
                                            "node",
                                            "onTouchstart"
                                        ])
                                    ]),
                                _: 1
                            }, 8, [
                                "items",
                                "height"
                            ])
                        ]),
                    _: 1
                }));
        }
    });
    Ga = {};
    Va = {
        class: "pl-4"
    };
    Na = {
        class: "pr-4"
    };
    function $a(r, t) {
        return O(), j(it, {
            cols: "12",
            sm: "6",
            lg: "3"
        }, {
            default: w(()=>[
                    y(Zo, {
                        rounded: "xl",
                        class: "d-flex align-center py-2 border"
                    }, {
                        default: w(()=>[
                                Y("div", Va, [
                                    zr(r.$slots, "title")
                                ]),
                                y(Me),
                                Y("div", Na, [
                                    zr(r.$slots, "text")
                                ])
                            ]),
                        _: 3
                    })
                ]),
            _: 3
        });
    }
    const $t = Ts(Ga, [
        [
            "render",
            $a
        ]
    ]), Oa = wt({
        __name: "PanelBoolean",
        props: {
            torrent: {}
        },
        setup (r) {
            const t = r, e = ks(), { properties: s } = xt(se()), i = Q({
                get: ()=>t.torrent.auto_tmm,
                set: (u)=>e.toggleAutoTmm([
                        t.torrent.hash
                    ], u)
            }), n = Q({
                get: ()=>t.torrent.f_l_piece_prio,
                set: ()=>e.toggleFLPiecePrio([
                        t.torrent.hash
                    ])
            }), o = Q({
                get: ()=>t.torrent.forced,
                set: (u)=>{
                    u ? e.forceStartTorrents([
                        t.torrent.hash
                    ]) : e.resumeTorrents([
                        t.torrent.hash
                    ]);
                }
            }), a = Q({
                get: ()=>t.torrent.seq_dl,
                set: ()=>e.toggleSeqDl([
                        t.torrent.hash
                    ])
            }), l = Q({
                get: ()=>t.torrent.super_seeding,
                set: (u)=>e.setSuperSeeding([
                        t.torrent.hash
                    ], u)
            });
            return (u, h)=>(O(), j(ge, {
                    title: u.$t("torrentDetail.info.boolean_values")
                }, {
                    default: w(()=>[
                            y(_e, null, {
                                default: w(()=>[
                                        y(pt, null, {
                                            default: w(()=>[
                                                    y($t, null, {
                                                        title: w(()=>[
                                                                y(be, {
                                                                    modelValue: i.value,
                                                                    "onUpdate:modelValue": h[0] || (h[0] = (c)=>i.value = c),
                                                                    "hide-details": "",
                                                                    density: "compact",
                                                                    label: u.$t("torrent.properties.auto_tmm")
                                                                }, null, 8, [
                                                                    "modelValue",
                                                                    "label"
                                                                ])
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y($t, null, {
                                                        title: w(()=>[
                                                                y(be, {
                                                                    modelValue: n.value,
                                                                    "onUpdate:modelValue": h[1] || (h[1] = (c)=>n.value = c),
                                                                    "hide-details": "",
                                                                    density: "compact",
                                                                    label: u.$t("torrent.properties.f_l_piece_prio")
                                                                }, null, 8, [
                                                                    "modelValue",
                                                                    "label"
                                                                ])
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y($t, null, {
                                                        title: w(()=>[
                                                                y(be, {
                                                                    modelValue: o.value,
                                                                    "onUpdate:modelValue": h[2] || (h[2] = (c)=>o.value = c),
                                                                    "hide-details": "",
                                                                    density: "compact",
                                                                    label: u.$t("torrent.properties.forced")
                                                                }, null, 8, [
                                                                    "modelValue",
                                                                    "label"
                                                                ])
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y($t, null, {
                                                        title: w(()=>[
                                                                y(be, {
                                                                    modelValue: a.value,
                                                                    "onUpdate:modelValue": h[3] || (h[3] = (c)=>a.value = c),
                                                                    "hide-details": "",
                                                                    density: "compact",
                                                                    label: u.$t("torrent.properties.seq_dl")
                                                                }, null, 8, [
                                                                    "modelValue",
                                                                    "label"
                                                                ])
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y($t, null, {
                                                        title: w(()=>[
                                                                y(be, {
                                                                    modelValue: l.value,
                                                                    "onUpdate:modelValue": h[4] || (h[4] = (c)=>l.value = c),
                                                                    "hide-details": "",
                                                                    density: "compact",
                                                                    label: u.$t("torrent.properties.super_seeding")
                                                                }, null, 8, [
                                                                    "modelValue",
                                                                    "label"
                                                                ])
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y($t, null, {
                                                        title: w(()=>[
                                                                y(be, {
                                                                    disabled: "",
                                                                    "model-value": P(s)?.is_private,
                                                                    "hide-details": "",
                                                                    density: "compact",
                                                                    label: u.$t("torrent.properties.is_private")
                                                                }, null, 8, [
                                                                    "model-value",
                                                                    "label"
                                                                ])
                                                            ]),
                                                        _: 1
                                                    })
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }, 8, [
                    "title"
                ]));
        }
    }), za = wt({
        __name: "PanelData",
        props: {
            torrent: {}
        },
        setup (r) {
            const t = r, { properties: e } = xt(se()), { useBinarySize: s } = xt(jt()), i = [
                {
                    title: "downloaded",
                    getter: ()=>t.torrent.downloaded
                },
                {
                    title: "downloaded_session",
                    getter: ()=>t.torrent.downloaded_session
                },
                {
                    title: "uploaded",
                    getter: ()=>t.torrent.uploaded
                },
                {
                    title: "uploaded_session",
                    getter: ()=>t.torrent.uploaded_session
                },
                {
                    title: "size",
                    getter: ()=>t.torrent.size
                },
                {
                    title: "total_size",
                    getter: ()=>t.torrent.total_size
                },
                {
                    title: "total_wasted",
                    getter: ()=>e.value?.total_wasted ?? 0
                },
                {
                    title: "amount_left",
                    getter: ()=>t.torrent.amount_left
                },
                {
                    title: "global_volume",
                    getter: ()=>t.torrent.globalVolume
                }
            ];
            return (n, o)=>(O(), j(ge, {
                    title: n.$t("torrentDetail.info.data_values")
                }, {
                    default: w(()=>[
                            y(_e, null, {
                                default: w(()=>[
                                        y(pt, null, {
                                            default: w(()=>[
                                                    (O(), K(kt, null, Gt(i, (a)=>y($t, null, {
                                                            title: w(()=>[
                                                                    X(G(n.$t(`torrent.properties.${a.title}`)), 1)
                                                                ]),
                                                            text: w(()=>[
                                                                    X(G(P(Ot)(a.getter(), P(s))), 1)
                                                                ]),
                                                            _: 2
                                                        }, 1024)), 64))
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }, 8, [
                    "title"
                ]));
        }
    }), La = wt({
        __name: "PanelDatetime",
        props: {
            torrent: {}
        },
        setup (r) {
            const t = r, { properties: e } = xt(se()), { dateFormat: s } = xt(jt()), i = [
                {
                    title: "added_on",
                    getter: ()=>t.torrent.added_on
                },
                {
                    title: "completed_on",
                    getter: ()=>t.torrent.completed_on
                },
                {
                    title: "creation_date",
                    getter: ()=>e.value?.creation_date ?? 0
                },
                {
                    title: "last_activity",
                    getter: ()=>t.torrent.last_activity
                },
                {
                    title: "seen_complete",
                    getter: ()=>t.torrent.seen_complete
                }
            ];
            return (n, o)=>(O(), j(ge, {
                    title: n.$t("torrentDetail.info.datetime_values")
                }, {
                    default: w(()=>[
                            y(_e, null, {
                                default: w(()=>[
                                        y(pt, null, {
                                            default: w(()=>[
                                                    (O(), K(kt, null, Gt(i, (a)=>y($t, null, rn({
                                                            title: w(()=>[
                                                                    X(G(n.$t(`torrent.properties.${a.title}`)), 1)
                                                                ]),
                                                            _: 2
                                                        }, [
                                                            a.getter() > 0 ? {
                                                                name: "text",
                                                                fn: w(()=>[
                                                                        X(G(P(Qo)(a.getter(), P(s))), 1)
                                                                    ]),
                                                                key: "0"
                                                            } : {
                                                                name: "text",
                                                                fn: w(()=>[
                                                                        X(G(n.$t("dashboard.not_complete")), 1)
                                                                    ]),
                                                                key: "1"
                                                            }
                                                        ]), 1024)), 64))
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }, 8, [
                    "title"
                ]));
        }
    }), Ua = wt({
        __name: "PanelDuration",
        props: {
            torrent: {}
        },
        setup (r) {
            const t = r, { properties: e } = xt(se()), { durationFormat: s } = xt(jt()), i = [
                {
                    title: "seeding_time",
                    unit: "s",
                    getter: ()=>t.torrent.seeding_time
                },
                {
                    title: "seeding_time_limit",
                    unit: "m",
                    getter: ()=>t.torrent.seeding_time_limit
                },
                {
                    title: "inactive_seeding_time_limit",
                    unit: "m",
                    getter: ()=>t.torrent.inactive_seeding_time_limit
                },
                {
                    title: "time_active",
                    unit: "s",
                    getter: ()=>t.torrent.time_active
                },
                {
                    title: "reannounce",
                    unit: "s",
                    getter: ()=>e.value?.reannounce ?? 0
                }
            ];
            return (n, o)=>(O(), j(ge, {
                    title: n.$t("torrentDetail.info.duration_values")
                }, {
                    default: w(()=>[
                            y(_e, null, {
                                default: w(()=>[
                                        y(pt, null, {
                                            default: w(()=>[
                                                    (O(), K(kt, null, Gt(i, (a)=>y($t, null, rn({
                                                            title: w(()=>[
                                                                    X(G(n.$t(`torrent.properties.${a.title}`)), 1)
                                                                ]),
                                                            _: 2
                                                        }, [
                                                            a.getter() > 0 ? {
                                                                name: "text",
                                                                fn: w(()=>[
                                                                        X(G(P(Jo)(a.getter(), a.unit, P(s))), 1)
                                                                    ]),
                                                                key: "0"
                                                            } : {
                                                                name: "text",
                                                                fn: w(()=>[
                                                                        X(G(n.$t("common.NA")), 1)
                                                                    ]),
                                                                key: "1"
                                                            }
                                                        ]), 1024)), 64))
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }, 8, [
                    "title"
                ]));
        }
    }), Ha = {
        key: 0,
        class: "d-flex flex-gap-row-small flex-gap-column"
    }, Wa = wt({
        __name: "PanelLongText",
        props: {
            torrent: {}
        },
        setup (r) {
            const t = r, { properties: e } = xt(se()), s = [
                {
                    title: "content_path",
                    getter: ()=>t.torrent.content_path
                },
                {
                    title: "download_path",
                    getter: ()=>t.torrent.download_path
                },
                {
                    title: "hash",
                    getter: ()=>t.torrent.hash
                },
                {
                    title: "infohash_v1",
                    getter: ()=>t.torrent.infohash_v1
                },
                {
                    title: "infohash_v2",
                    getter: ()=>t.torrent.infohash_v2
                },
                {
                    title: "magnet",
                    getter: ()=>t.torrent.magnet
                },
                {
                    title: "name",
                    getter: ()=>t.torrent.name
                },
                {
                    title: "save_path",
                    getter: ()=>t.torrent.savePath
                },
                {
                    title: "tracker",
                    getter: ()=>t.torrent.tracker
                },
                {
                    title: "comment",
                    getter: ()=>e.value?.comment
                },
                {
                    title: "created_by",
                    getter: ()=>e.value?.created_by
                }
            ];
            return (i, n)=>(O(), j(ge, {
                    title: i.$t("torrentDetail.info.long_text_values")
                }, {
                    default: w(()=>[
                            y(_e, null, {
                                default: w(()=>[
                                        y(xs, null, {
                                            default: w(()=>[
                                                    (O(), K(kt, null, Gt(s, (o)=>y(Ie, {
                                                            title: i.$t(`torrent.properties.${o.title}`)
                                                        }, {
                                                            default: w(()=>[
                                                                    y(Yr, null, {
                                                                        default: w(()=>[
                                                                                X(G(o.getter() || i.$t("common.none")), 1)
                                                                            ]),
                                                                        _: 2
                                                                    }, 1024)
                                                                ]),
                                                            _: 2
                                                        }, 1032, [
                                                            "title"
                                                        ])), 64)),
                                                    y(Ie, {
                                                        title: i.$t("torrent.properties.tags")
                                                    }, {
                                                        default: w(()=>[
                                                                i.torrent.tags?.length ? (O(), K("div", Ha, [
                                                                    (O(!0), K(kt, null, Gt(i.torrent.tags, (o)=>(O(), j(Ce, {
                                                                            defaultColor: "tag",
                                                                            value: o
                                                                        }, null, 8, [
                                                                            "value"
                                                                        ]))), 256))
                                                                ])) : (O(), j(Yr, {
                                                                    key: 1
                                                                }, {
                                                                    default: w(()=>[
                                                                            X(G(i.$t("torrent.properties.empty_tags")), 1)
                                                                        ]),
                                                                    _: 1
                                                                }))
                                                            ]),
                                                        _: 1
                                                    }, 8, [
                                                        "title"
                                                    ])
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }, 8, [
                    "title"
                ]));
        }
    }), Ya = wt({
        __name: "PanelSpeed",
        props: {
            torrent: {}
        },
        setup (r) {
            const t = r, { properties: e } = xt(se()), { useBitSpeed: s } = xt(jt()), i = [
                {
                    title: "download_limit",
                    getter: ()=>t.torrent.dl_limit
                },
                {
                    title: "download_speed",
                    getter: ()=>t.torrent.dlspeed
                },
                {
                    title: "avg_download_speed",
                    getter: ()=>e.value?.dl_speed_avg ?? 0
                },
                {
                    title: "upload_limit",
                    getter: ()=>t.torrent.up_limit
                },
                {
                    title: "upload_speed",
                    getter: ()=>t.torrent.upspeed
                },
                {
                    title: "avg_upload_speed",
                    getter: ()=>e.value?.up_speed_avg ?? 0
                },
                {
                    title: "global_speed",
                    getter: ()=>t.torrent.globalSpeed
                }
            ];
            return (n, o)=>(O(), j(ge, {
                    title: n.$t("torrentDetail.info.speed_values")
                }, {
                    default: w(()=>[
                            y(_e, null, {
                                default: w(()=>[
                                        y(pt, null, {
                                            default: w(()=>[
                                                    (O(), K(kt, null, Gt(i, (a)=>y($t, null, {
                                                            title: w(()=>[
                                                                    X(G(n.$t(`torrent.properties.${a.title}`)), 1)
                                                                ]),
                                                            text: w(()=>[
                                                                    X(G(P(fe)(a.getter(), P(s))), 1)
                                                                ]),
                                                            _: 2
                                                        }, 1024)), 64))
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }, 8, [
                    "title"
                ]));
        }
    }), Xa = wt({
        __name: "PanelText",
        props: {
            torrent: {}
        },
        setup (r) {
            const t = r, { t: e, getTorrentStateString: s } = ee(), { properties: i } = xt(se()), n = [
                {
                    title: "available_peers",
                    getter: ()=>t.torrent.available_peers
                },
                {
                    title: "available_seeds",
                    getter: ()=>t.torrent.available_seeds
                },
                {
                    title: "ratio",
                    getter: ()=>t.torrent.ratio.toFixed(2)
                },
                {
                    title: "ratio_limit",
                    getter: ()=>t.torrent.ratio_limit
                },
                {
                    title: "num_leechs",
                    getter: ()=>t.torrent.num_leechs
                },
                {
                    title: "num_seeds",
                    getter: ()=>t.torrent.num_seeds
                },
                {
                    title: "availability",
                    getter: ()=>t.torrent.availability
                },
                {
                    title: "eta",
                    getter: ()=>ta(t.torrent.eta, t.torrent.forced)
                },
                {
                    title: "category",
                    getter: ()=>t.torrent.category || e("common.NA")
                },
                {
                    title: "state",
                    getter: ()=>s(t.torrent.state)
                },
                {
                    title: "trackers_count",
                    getter: ()=>t.torrent.trackers_count
                },
                {
                    title: "priority",
                    getter: ()=>t.torrent.priority
                },
                {
                    title: "nb_connections",
                    getter: ()=>i.value?.nb_connections ?? 0
                },
                {
                    title: "nb_connections_limit",
                    getter: ()=>i.value?.nb_connections_limit ?? 0
                }
            ];
            return (o, a)=>(O(), j(ge, {
                    title: o.$t("torrentDetail.info.text_values")
                }, {
                    default: w(()=>[
                            y(_e, null, {
                                default: w(()=>[
                                        y(pt, null, {
                                            default: w(()=>[
                                                    (O(), K(kt, null, Gt(n, (l)=>y($t, null, {
                                                            title: w(()=>[
                                                                    X(G(o.$t(`torrent.properties.${l.title}`)), 1)
                                                                ]),
                                                            text: w(()=>[
                                                                    X(G(l.getter()), 1)
                                                                ]),
                                                            _: 2
                                                        }, 1024)), 64))
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }, 8, [
                    "title"
                ]));
        }
    }), ja = wt({
        __name: "Info",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            return (t, e)=>(O(), j(xs, null, {
                    default: w(()=>[
                            y(Ie, null, {
                                default: w(()=>[
                                        y(ea, null, {
                                            default: w(()=>[
                                                    y(La, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(Ua, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(Oa, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(za, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(Ya, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(Xa, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(Wa, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ])
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }));
        }
    }), qa = class hr {
        constructor(t, e){
            this.low = t, this.high = e;
        }
        clone() {
            return new hr(this.low, this.high);
        }
        get max() {
            return this.clone();
        }
        less_than(t) {
            return this.low < t.low || this.low === t.low && this.high < t.high;
        }
        equal_to(t) {
            return this.low === t.low && this.high === t.high;
        }
        intersect(t) {
            return !this.not_intersect(t);
        }
        not_intersect(t) {
            return this.high < t.low || t.high < this.low;
        }
        merge(t) {
            return new hr(this.low === void 0 ? t.low : this.low < t.low ? this.low : t.low, this.high === void 0 ? t.high : this.high > t.high ? this.high : t.high);
        }
        output() {
            return [
                this.low,
                this.high
            ];
        }
        static comparable_max(t, e) {
            return t.merge(e);
        }
        static comparable_less_than(t, e) {
            return t < e;
        }
    }, Ct = 0, lt = 1;
    class oe {
        constructor(t = void 0, e = void 0, s = null, i = null, n = null, o = lt){
            if (this.left = s, this.right = i, this.parent = n, this.color = o, this.item = {
                key: t,
                value: e
            }, t && t instanceof Array && t.length === 2 && !Number.isNaN(t[0]) && !Number.isNaN(t[1])) {
                let [a, l] = t;
                a > l && ([a, l] = [
                    l,
                    a
                ]), this.item.key = new qa(a, l);
            }
            this.max = this.item.key ? this.item.key.max : void 0;
        }
        isNil() {
            return this.item.key === void 0 && this.item.value === void 0 && this.left === null && this.right === null && this.color === lt;
        }
        _value_less_than(t) {
            return this.item.value && t.item.value && this.item.value.less_than ? this.item.value.less_than(t.item.value) : this.item.value < t.item.value;
        }
        less_than(t) {
            return this.item.value === this.item.key && t.item.value === t.item.key ? this.item.key.less_than(t.item.key) : this.item.key.less_than(t.item.key) || this.item.key.equal_to(t.item.key) && this._value_less_than(t);
        }
        _value_equal(t) {
            return this.item.value && t.item.value && this.item.value.equal_to ? this.item.value.equal_to(t.item.value) : this.item.value === t.item.value;
        }
        equal_to(t) {
            return this.item.value === this.item.key && t.item.value === t.item.key ? this.item.key.equal_to(t.item.key) : this.item.key.equal_to(t.item.key) && this._value_equal(t);
        }
        intersect(t) {
            return this.item.key.intersect(t.item.key);
        }
        copy_data(t) {
            this.item.key = t.item.key, this.item.value = t.item.value;
        }
        update_max() {
            if (this.max = this.item.key ? this.item.key.max : void 0, this.right && this.right.max) {
                const t = this.item.key.constructor.comparable_max;
                this.max = t(this.max, this.right.max);
            }
            if (this.left && this.left.max) {
                const t = this.item.key.constructor.comparable_max;
                this.max = t(this.max, this.left.max);
            }
        }
        not_intersect_left_subtree(t) {
            const e = this.item.key.constructor.comparable_less_than;
            let s = this.left.max.high !== void 0 ? this.left.max.high : this.left.max;
            return e(s, t.item.key.low);
        }
        not_intersect_right_subtree(t) {
            const e = this.item.key.constructor.comparable_less_than;
            let s = this.right.max.low !== void 0 ? this.right.max.low : this.right.item.key.low;
            return e(t.item.key.high, s);
        }
    }
    class kr {
        constructor(){
            this.root = null, this.nil_node = new oe;
        }
        get size() {
            let t = 0;
            return this.tree_walk(this.root, ()=>t++), t;
        }
        get keys() {
            let t = [];
            return this.tree_walk(this.root, (e)=>t.push(e.item.key.output ? e.item.key.output() : e.item.key)), t;
        }
        get values() {
            let t = [];
            return this.tree_walk(this.root, (e)=>t.push(e.item.value)), t;
        }
        get items() {
            let t = [];
            return this.tree_walk(this.root, (e)=>t.push({
                    key: e.item.key.output ? e.item.key.output() : e.item.key,
                    value: e.item.value
                })), t;
        }
        isEmpty() {
            return this.root == null || this.root === this.nil_node;
        }
        clear() {
            this.root = null;
        }
        insert(t, e = t) {
            if (t === void 0) return;
            let s = new oe(t, e, this.nil_node, this.nil_node, null, Ct);
            return this.tree_insert(s), this.recalc_max(s), s;
        }
        exist(t, e = t) {
            let s = new oe(t, e);
            return !!this.tree_search(this.root, s);
        }
        remove(t, e = t) {
            let s = new oe(t, e), i = this.tree_search(this.root, s);
            return i && this.tree_delete(i), i;
        }
        search(t, e = (s, i)=>s === i ? i.output() : s) {
            let s = new oe(t), i = [];
            return this.tree_search_interval(this.root, s, i), i.map((n)=>e(n.item.value, n.item.key));
        }
        intersect_any(t) {
            let e = new oe(t);
            return this.tree_find_any_interval(this.root, e);
        }
        forEach(t) {
            this.tree_walk(this.root, (e)=>t(e.item.key, e.item.value));
        }
        map(t) {
            const e = new kr;
            return this.tree_walk(this.root, (s)=>e.insert(s.item.key, t(s.item.value, s.item.key))), e;
        }
        *iterate(t, e = (s, i)=>s === i ? i.output() : s) {
            let s;
            for(t ? s = this.tree_search_nearest_forward(this.root, new oe(t)) : this.root && (s = this.local_minimum(this.root)); s;)yield e(s.item.value, s.item.key), s = this.tree_successor(s);
        }
        recalc_max(t) {
            let e = t;
            for(; e.parent != null;)e.parent.update_max(), e = e.parent;
        }
        tree_insert(t) {
            let e = this.root, s = null;
            if (this.root == null || this.root === this.nil_node) this.root = t;
            else {
                for(; e !== this.nil_node;)s = e, t.less_than(e) ? e = e.left : e = e.right;
                t.parent = s, t.less_than(s) ? s.left = t : s.right = t;
            }
            this.insert_fixup(t);
        }
        insert_fixup(t) {
            let e, s;
            for(e = t; e !== this.root && e.parent.color === Ct;)e.parent === e.parent.parent.left ? (s = e.parent.parent.right, s.color === Ct ? (e.parent.color = lt, s.color = lt, e.parent.parent.color = Ct, e = e.parent.parent) : (e === e.parent.right && (e = e.parent, this.rotate_left(e)), e.parent.color = lt, e.parent.parent.color = Ct, this.rotate_right(e.parent.parent))) : (s = e.parent.parent.left, s.color === Ct ? (e.parent.color = lt, s.color = lt, e.parent.parent.color = Ct, e = e.parent.parent) : (e === e.parent.left && (e = e.parent, this.rotate_right(e)), e.parent.color = lt, e.parent.parent.color = Ct, this.rotate_left(e.parent.parent)));
            this.root.color = lt;
        }
        tree_delete(t) {
            let e, s;
            t.left === this.nil_node || t.right === this.nil_node ? e = t : e = this.tree_successor(t), e.left !== this.nil_node ? s = e.left : s = e.right, s.parent = e.parent, e === this.root ? this.root = s : (e === e.parent.left ? e.parent.left = s : e.parent.right = s, e.parent.update_max()), this.recalc_max(s), e !== t && (t.copy_data(e), t.update_max(), this.recalc_max(t)), e.color === lt && this.delete_fixup(s);
        }
        delete_fixup(t) {
            let e = t, s;
            for(; e !== this.root && e.parent != null && e.color === lt;)e === e.parent.left ? (s = e.parent.right, s.color === Ct && (s.color = lt, e.parent.color = Ct, this.rotate_left(e.parent), s = e.parent.right), s.left.color === lt && s.right.color === lt ? (s.color = Ct, e = e.parent) : (s.right.color === lt && (s.color = Ct, s.left.color = lt, this.rotate_right(s), s = e.parent.right), s.color = e.parent.color, e.parent.color = lt, s.right.color = lt, this.rotate_left(e.parent), e = this.root)) : (s = e.parent.left, s.color === Ct && (s.color = lt, e.parent.color = Ct, this.rotate_right(e.parent), s = e.parent.left), s.left.color === lt && s.right.color === lt ? (s.color = Ct, e = e.parent) : (s.left.color === lt && (s.color = Ct, s.right.color = lt, this.rotate_left(s), s = e.parent.left), s.color = e.parent.color, e.parent.color = lt, s.left.color = lt, this.rotate_right(e.parent), e = this.root));
            e.color = lt;
        }
        tree_search(t, e) {
            if (!(t == null || t === this.nil_node)) return e.equal_to(t) ? t : e.less_than(t) ? this.tree_search(t.left, e) : this.tree_search(t.right, e);
        }
        tree_search_nearest_forward(t, e) {
            let s, i = t;
            for(; i && i !== this.nil_node;)i.less_than(e) ? i.intersect(e) ? (s = i, i = i.left) : i = i.right : ((!s || i.less_than(s)) && (s = i), i = i.left);
            return s || null;
        }
        tree_search_interval(t, e, s) {
            t != null && t !== this.nil_node && (t.left !== this.nil_node && !t.not_intersect_left_subtree(e) && this.tree_search_interval(t.left, e, s), t.intersect(e) && s.push(t), t.right !== this.nil_node && !t.not_intersect_right_subtree(e) && this.tree_search_interval(t.right, e, s));
        }
        tree_find_any_interval(t, e) {
            let s = !1;
            return t != null && t !== this.nil_node && (t.left !== this.nil_node && !t.not_intersect_left_subtree(e) && (s = this.tree_find_any_interval(t.left, e)), s || (s = t.intersect(e)), !s && t.right !== this.nil_node && !t.not_intersect_right_subtree(e) && (s = this.tree_find_any_interval(t.right, e))), s;
        }
        local_minimum(t) {
            let e = t;
            for(; e.left != null && e.left !== this.nil_node;)e = e.left;
            return e;
        }
        local_maximum(t) {
            let e = t;
            for(; e.right != null && e.right !== this.nil_node;)e = e.right;
            return e;
        }
        tree_successor(t) {
            let e, s, i;
            if (t.right !== this.nil_node) e = this.local_minimum(t.right);
            else {
                for(s = t, i = t.parent; i != null && i.right === s;)s = i, i = i.parent;
                e = i;
            }
            return e;
        }
        rotate_left(t) {
            let e = t.right;
            t.right = e.left, e.left !== this.nil_node && (e.left.parent = t), e.parent = t.parent, t === this.root ? this.root = e : t === t.parent.left ? t.parent.left = e : t.parent.right = e, e.left = t, t.parent = e, t != null && t !== this.nil_node && t.update_max(), e = t.parent, e != null && e !== this.nil_node && e.update_max();
        }
        rotate_right(t) {
            let e = t.left;
            t.left = e.right, e.right !== this.nil_node && (e.right.parent = t), e.parent = t.parent, t === this.root ? this.root = e : t === t.parent.left ? t.parent.left = e : t.parent.right = e, e.right = t, t.parent = e, t !== null && t !== this.nil_node && t.update_max(), e = t.parent, e != null && e !== this.nil_node && e.update_max();
        }
        tree_walk(t, e) {
            t != null && t !== this.nil_node && (this.tree_walk(t.left, e), e(t), this.tree_walk(t.right, e));
        }
        testRedBlackProperty() {
            let t = !0;
            return this.tree_walk(this.root, function(e) {
                e.color === Ct && (e.left.color === lt && e.right.color === lt || (t = !1));
            }), t;
        }
        testBlackHeightProperty(t) {
            let e = 0, s = 0, i = 0;
            if (t.color === lt && e++, t.left !== this.nil_node ? s = this.testBlackHeightProperty(t.left) : s = 1, t.right !== this.nil_node ? i = this.testBlackHeightProperty(t.right) : i = 1, s !== i) throw new Error("Red-black height property violated");
            return e += s, e;
        }
    }
    ht = ((r)=>(r.Application = "application", r.WebGLPipes = "webgl-pipes", r.WebGLPipesAdaptor = "webgl-pipes-adaptor", r.WebGLSystem = "webgl-system", r.WebGPUPipes = "webgpu-pipes", r.WebGPUPipesAdaptor = "webgpu-pipes-adaptor", r.WebGPUSystem = "webgpu-system", r.CanvasSystem = "canvas-system", r.CanvasPipesAdaptor = "canvas-pipes-adaptor", r.CanvasPipes = "canvas-pipes", r.Asset = "asset", r.LoadParser = "load-parser", r.ResolveParser = "resolve-parser", r.CacheParser = "cache-parser", r.DetectionParser = "detection-parser", r.MaskEffect = "mask-effect", r.BlendMode = "blend-mode", r.TextureSource = "texture-source", r.Environment = "environment", r.ShapeBuilder = "shape-builder", r.Batcher = "batcher", r))(ht || {});
    let ur, ss, Ka, Za;
    ur = (r)=>{
        if (typeof r == "function" || typeof r == "object" && r.extension) {
            if (!r.extension) throw new Error("Extension class must have an extension object");
            r = {
                ...typeof r.extension != "object" ? {
                    type: r.extension
                } : r.extension,
                ref: r
            };
        }
        if (typeof r == "object") r = {
            ...r
        };
        else throw new Error("Invalid extension type");
        return typeof r.type == "string" && (r.type = [
            r.type
        ]), r;
    };
    ss = (r, t)=>ur(r).priority ?? t;
    Vt = {
        _addHandlers: {},
        _removeHandlers: {},
        _queue: {},
        remove (...r) {
            return r.map(ur).forEach((t)=>{
                t.type.forEach((e)=>this._removeHandlers[e]?.(t));
            }), this;
        },
        add (...r) {
            return r.map(ur).forEach((t)=>{
                t.type.forEach((e)=>{
                    const s = this._addHandlers, i = this._queue;
                    s[e] ? s[e]?.(t) : (i[e] = i[e] || [], i[e]?.push(t));
                });
            }), this;
        },
        handle (r, t, e) {
            const s = this._addHandlers, i = this._removeHandlers;
            if (s[r] || i[r]) throw new Error(`Extension type ${r} already has a handler`);
            s[r] = t, i[r] = e;
            const n = this._queue;
            return n[r] && (n[r]?.forEach((o)=>t(o)), delete n[r]), this;
        },
        handleByMap (r, t) {
            return this.handle(r, (e)=>{
                e.name && (t[e.name] = e.ref);
            }, (e)=>{
                e.name && delete t[e.name];
            });
        },
        handleByNamedList (r, t, e = -1) {
            return this.handle(r, (s)=>{
                t.findIndex((n)=>n.name === s.name) >= 0 || (t.push({
                    name: s.name,
                    value: s.ref
                }), t.sort((n, o)=>ss(o.value, e) - ss(n.value, e)));
            }, (s)=>{
                const i = t.findIndex((n)=>n.name === s.name);
                i !== -1 && t.splice(i, 1);
            });
        },
        handleByList (r, t, e = -1) {
            return this.handle(r, (s)=>{
                t.includes(s.ref) || (t.push(s.ref), t.sort((i, n)=>ss(n, e) - ss(i, e)));
            }, (s)=>{
                const i = t.indexOf(s.ref);
                i !== -1 && t.splice(i, 1);
            });
        },
        mixin (r, ...t) {
            for (const e of t)Object.defineProperties(r.prototype, Object.getOwnPropertyDescriptors(e));
        }
    };
    Ka = {
        extension: {
            type: ht.Environment,
            name: "browser",
            priority: -1
        },
        test: ()=>!0,
        load: async ()=>{
            await Pe(()=>import("./browserAll-CM7GLF9O.js"), __vite__mapDeps([8,9,10,11,1,2,3,4,5]), import.meta.url);
        }
    };
    Za = {
        extension: {
            type: ht.Environment,
            name: "webworker",
            priority: 0
        },
        test: ()=>typeof self < "u" && self.WorkerGlobalScope !== void 0,
        load: async ()=>{
            await Pe(()=>import("./webworkerAll-Djjc1v22.js"), __vite__mapDeps([9,10,11,1,2,3,4,5]), import.meta.url);
        }
    };
    class Rt {
        constructor(t, e, s){
            this._x = e || 0, this._y = s || 0, this._observer = t;
        }
        clone(t) {
            return new Rt(t ?? this._observer, this._x, this._y);
        }
        set(t = 0, e = t) {
            return (this._x !== t || this._y !== e) && (this._x = t, this._y = e, this._observer._onUpdate(this)), this;
        }
        copyFrom(t) {
            return (this._x !== t.x || this._y !== t.y) && (this._x = t.x, this._y = t.y, this._observer._onUpdate(this)), this;
        }
        copyTo(t) {
            return t.set(this._x, this._y), t;
        }
        equals(t) {
            return t.x === this._x && t.y === this._y;
        }
        toString() {
            return `[pixi.js/math:ObservablePoint x=0 y=0 scope=${this._observer}]`;
        }
        get x() {
            return this._x;
        }
        set x(t) {
            this._x !== t && (this._x = t, this._observer._onUpdate(this));
        }
        get y() {
            return this._y;
        }
        set y(t) {
            this._y !== t && (this._y = t, this._observer._onUpdate(this));
        }
    }
    var Bs = {
        exports: {}
    }, Kr;
    function Qa() {
        return Kr || (Kr = 1, function(r) {
            var t = Object.prototype.hasOwnProperty, e = "~";
            function s() {}
            Object.create && (s.prototype = Object.create(null), new s().__proto__ || (e = !1));
            function i(l, u, h) {
                this.fn = l, this.context = u, this.once = h || !1;
            }
            function n(l, u, h, c, p) {
                if (typeof h != "function") throw new TypeError("The listener must be a function");
                var d = new i(h, c || l, p), g = e ? e + u : u;
                return l._events[g] ? l._events[g].fn ? l._events[g] = [
                    l._events[g],
                    d
                ] : l._events[g].push(d) : (l._events[g] = d, l._eventsCount++), l;
            }
            function o(l, u) {
                --l._eventsCount === 0 ? l._events = new s : delete l._events[u];
            }
            function a() {
                this._events = new s, this._eventsCount = 0;
            }
            a.prototype.eventNames = function() {
                var u = [], h, c;
                if (this._eventsCount === 0) return u;
                for(c in h = this._events)t.call(h, c) && u.push(e ? c.slice(1) : c);
                return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(h)) : u;
            }, a.prototype.listeners = function(u) {
                var h = e ? e + u : u, c = this._events[h];
                if (!c) return [];
                if (c.fn) return [
                    c.fn
                ];
                for(var p = 0, d = c.length, g = new Array(d); p < d; p++)g[p] = c[p].fn;
                return g;
            }, a.prototype.listenerCount = function(u) {
                var h = e ? e + u : u, c = this._events[h];
                return c ? c.fn ? 1 : c.length : 0;
            }, a.prototype.emit = function(u, h, c, p, d, g) {
                var _ = e ? e + u : u;
                if (!this._events[_]) return !1;
                var m = this._events[_], b = arguments.length, v, S;
                if (m.fn) {
                    switch(m.once && this.removeListener(u, m.fn, void 0, !0), b){
                        case 1:
                            return m.fn.call(m.context), !0;
                        case 2:
                            return m.fn.call(m.context, h), !0;
                        case 3:
                            return m.fn.call(m.context, h, c), !0;
                        case 4:
                            return m.fn.call(m.context, h, c, p), !0;
                        case 5:
                            return m.fn.call(m.context, h, c, p, d), !0;
                        case 6:
                            return m.fn.call(m.context, h, c, p, d, g), !0;
                    }
                    for(S = 1, v = new Array(b - 1); S < b; S++)v[S - 1] = arguments[S];
                    m.fn.apply(m.context, v);
                } else {
                    var B = m.length, N;
                    for(S = 0; S < B; S++)switch(m[S].once && this.removeListener(u, m[S].fn, void 0, !0), b){
                        case 1:
                            m[S].fn.call(m[S].context);
                            break;
                        case 2:
                            m[S].fn.call(m[S].context, h);
                            break;
                        case 3:
                            m[S].fn.call(m[S].context, h, c);
                            break;
                        case 4:
                            m[S].fn.call(m[S].context, h, c, p);
                            break;
                        default:
                            if (!v) for(N = 1, v = new Array(b - 1); N < b; N++)v[N - 1] = arguments[N];
                            m[S].fn.apply(m[S].context, v);
                    }
                }
                return !0;
            }, a.prototype.on = function(u, h, c) {
                return n(this, u, h, c, !1);
            }, a.prototype.once = function(u, h, c) {
                return n(this, u, h, c, !0);
            }, a.prototype.removeListener = function(u, h, c, p) {
                var d = e ? e + u : u;
                if (!this._events[d]) return this;
                if (!h) return o(this, d), this;
                var g = this._events[d];
                if (g.fn) g.fn === h && (!p || g.once) && (!c || g.context === c) && o(this, d);
                else {
                    for(var _ = 0, m = [], b = g.length; _ < b; _++)(g[_].fn !== h || p && !g[_].once || c && g[_].context !== c) && m.push(g[_]);
                    m.length ? this._events[d] = m.length === 1 ? m[0] : m : o(this, d);
                }
                return this;
            }, a.prototype.removeAllListeners = function(u) {
                var h;
                return u ? (h = e ? e + u : u, this._events[h] && o(this, h)) : (this._events = new s, this._eventsCount = 0), this;
            }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = e, a.EventEmitter = a, r.exports = a;
        }(Bs)), Bs.exports;
    }
    var Ja = Qa();
    let tl, el, sl;
    re = Tr(Ja);
    tl = Math.PI * 2;
    el = 180 / Math.PI;
    sl = Math.PI / 180;
    At = class {
        constructor(t = 0, e = 0){
            this.x = 0, this.y = 0, this.x = t, this.y = e;
        }
        clone() {
            return new At(this.x, this.y);
        }
        copyFrom(t) {
            return this.set(t.x, t.y), this;
        }
        copyTo(t) {
            return t.set(this.x, this.y), t;
        }
        equals(t) {
            return t.x === this.x && t.y === this.y;
        }
        set(t = 0, e = t) {
            return this.x = t, this.y = e, this;
        }
        toString() {
            return `[pixi.js/math:Point x=${this.x} y=${this.y}]`;
        }
        static get shared() {
            return Fs.x = 0, Fs.y = 0, Fs;
        }
    };
    const Fs = new At;
    et = class {
        constructor(t = 1, e = 0, s = 0, i = 1, n = 0, o = 0){
            this.array = null, this.a = t, this.b = e, this.c = s, this.d = i, this.tx = n, this.ty = o;
        }
        fromArray(t) {
            this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5];
        }
        set(t, e, s, i, n, o) {
            return this.a = t, this.b = e, this.c = s, this.d = i, this.tx = n, this.ty = o, this;
        }
        toArray(t, e) {
            this.array || (this.array = new Float32Array(9));
            const s = e || this.array;
            return t ? (s[0] = this.a, s[1] = this.b, s[2] = 0, s[3] = this.c, s[4] = this.d, s[5] = 0, s[6] = this.tx, s[7] = this.ty, s[8] = 1) : (s[0] = this.a, s[1] = this.c, s[2] = this.tx, s[3] = this.b, s[4] = this.d, s[5] = this.ty, s[6] = 0, s[7] = 0, s[8] = 1), s;
        }
        apply(t, e) {
            e = e || new At;
            const s = t.x, i = t.y;
            return e.x = this.a * s + this.c * i + this.tx, e.y = this.b * s + this.d * i + this.ty, e;
        }
        applyInverse(t, e) {
            e = e || new At;
            const s = this.a, i = this.b, n = this.c, o = this.d, a = this.tx, l = this.ty, u = 1 / (s * o + n * -i), h = t.x, c = t.y;
            return e.x = o * u * h + -n * u * c + (l * n - a * o) * u, e.y = s * u * c + -i * u * h + (-l * s + a * i) * u, e;
        }
        translate(t, e) {
            return this.tx += t, this.ty += e, this;
        }
        scale(t, e) {
            return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this;
        }
        rotate(t) {
            const e = Math.cos(t), s = Math.sin(t), i = this.a, n = this.c, o = this.tx;
            return this.a = i * e - this.b * s, this.b = i * s + this.b * e, this.c = n * e - this.d * s, this.d = n * s + this.d * e, this.tx = o * e - this.ty * s, this.ty = o * s + this.ty * e, this;
        }
        append(t) {
            const e = this.a, s = this.b, i = this.c, n = this.d;
            return this.a = t.a * e + t.b * i, this.b = t.a * s + t.b * n, this.c = t.c * e + t.d * i, this.d = t.c * s + t.d * n, this.tx = t.tx * e + t.ty * i + this.tx, this.ty = t.tx * s + t.ty * n + this.ty, this;
        }
        appendFrom(t, e) {
            const s = t.a, i = t.b, n = t.c, o = t.d, a = t.tx, l = t.ty, u = e.a, h = e.b, c = e.c, p = e.d;
            return this.a = s * u + i * c, this.b = s * h + i * p, this.c = n * u + o * c, this.d = n * h + o * p, this.tx = a * u + l * c + e.tx, this.ty = a * h + l * p + e.ty, this;
        }
        setTransform(t, e, s, i, n, o, a, l, u) {
            return this.a = Math.cos(a + u) * n, this.b = Math.sin(a + u) * n, this.c = -Math.sin(a - l) * o, this.d = Math.cos(a - l) * o, this.tx = t - (s * this.a + i * this.c), this.ty = e - (s * this.b + i * this.d), this;
        }
        prepend(t) {
            const e = this.tx;
            if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
                const s = this.a, i = this.c;
                this.a = s * t.a + this.b * t.c, this.b = s * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c, this.d = i * t.b + this.d * t.d;
            }
            return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this;
        }
        decompose(t) {
            const e = this.a, s = this.b, i = this.c, n = this.d, o = t.pivot, a = -Math.atan2(-i, n), l = Math.atan2(s, e), u = Math.abs(a + l);
            return u < 1e-5 || Math.abs(tl - u) < 1e-5 ? (t.rotation = l, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = a, t.skew.y = l), t.scale.x = Math.sqrt(e * e + s * s), t.scale.y = Math.sqrt(i * i + n * n), t.position.x = this.tx + (o.x * e + o.y * i), t.position.y = this.ty + (o.x * s + o.y * n), t;
        }
        invert() {
            const t = this.a, e = this.b, s = this.c, i = this.d, n = this.tx, o = t * i - e * s;
            return this.a = i / o, this.b = -e / o, this.c = -s / o, this.d = t / o, this.tx = (s * this.ty - i * n) / o, this.ty = -(t * this.ty - e * n) / o, this;
        }
        isIdentity() {
            return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.tx === 0 && this.ty === 0;
        }
        identity() {
            return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
        }
        clone() {
            const t = new et;
            return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
        }
        copyTo(t) {
            return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
        }
        copyFrom(t) {
            return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this;
        }
        equals(t) {
            return t.a === this.a && t.b === this.b && t.c === this.c && t.d === this.d && t.tx === this.tx && t.ty === this.ty;
        }
        toString() {
            return `[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
        }
        static get IDENTITY() {
            return il.identity();
        }
        static get shared() {
            return rl.identity();
        }
    };
    const rl = new et, il = new et, he = [
        1,
        1,
        0,
        -1,
        -1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        -1,
        -1,
        0,
        1
    ], ue = [
        0,
        1,
        1,
        1,
        0,
        -1,
        -1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1,
        -1,
        -1
    ], ce = [
        0,
        -1,
        -1,
        -1,
        0,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        -1,
        -1,
        -1
    ], de = [
        1,
        1,
        0,
        -1,
        -1,
        -1,
        0,
        1,
        -1,
        -1,
        0,
        1,
        1,
        1,
        0,
        -1
    ], cr = [], gn = [], rs = Math.sign;
    function nl() {
        for(let r = 0; r < 16; r++){
            const t = [];
            cr.push(t);
            for(let e = 0; e < 16; e++){
                const s = rs(he[r] * he[e] + ce[r] * ue[e]), i = rs(ue[r] * he[e] + de[r] * ue[e]), n = rs(he[r] * ce[e] + ce[r] * de[e]), o = rs(ue[r] * ce[e] + de[r] * de[e]);
                for(let a = 0; a < 16; a++)if (he[a] === s && ue[a] === i && ce[a] === n && de[a] === o) {
                    t.push(a);
                    break;
                }
            }
        }
        for(let r = 0; r < 16; r++){
            const t = new et;
            t.set(he[r], ue[r], ce[r], de[r], 0, 0), gn.push(t);
        }
    }
    nl();
    const dt = {
        E: 0,
        SE: 1,
        S: 2,
        SW: 3,
        W: 4,
        NW: 5,
        N: 6,
        NE: 7,
        MIRROR_VERTICAL: 8,
        MAIN_DIAGONAL: 10,
        MIRROR_HORIZONTAL: 12,
        REVERSE_DIAGONAL: 14,
        uX: (r)=>he[r],
        uY: (r)=>ue[r],
        vX: (r)=>ce[r],
        vY: (r)=>de[r],
        inv: (r)=>r & 8 ? r & 15 : -r & 7,
        add: (r, t)=>cr[r][t],
        sub: (r, t)=>cr[r][dt.inv(t)],
        rotate180: (r)=>r ^ 4,
        isVertical: (r)=>(r & 3) === 2,
        byDirection: (r, t)=>Math.abs(r) * 2 <= Math.abs(t) ? t >= 0 ? dt.S : dt.N : Math.abs(t) * 2 <= Math.abs(r) ? r > 0 ? dt.E : dt.W : t > 0 ? r > 0 ? dt.SE : dt.SW : r > 0 ? dt.NE : dt.NW,
        matrixAppendRotationInv: (r, t, e = 0, s = 0)=>{
            const i = gn[dt.inv(t)];
            i.tx = e, i.ty = s, r.append(i);
        }
    }, is = [
        new At,
        new At,
        new At,
        new At
    ];
    vt = class {
        constructor(t = 0, e = 0, s = 0, i = 0){
            this.type = "rectangle", this.x = Number(t), this.y = Number(e), this.width = Number(s), this.height = Number(i);
        }
        get left() {
            return this.x;
        }
        get right() {
            return this.x + this.width;
        }
        get top() {
            return this.y;
        }
        get bottom() {
            return this.y + this.height;
        }
        isEmpty() {
            return this.left === this.right || this.top === this.bottom;
        }
        static get EMPTY() {
            return new vt(0, 0, 0, 0);
        }
        clone() {
            return new vt(this.x, this.y, this.width, this.height);
        }
        copyFromBounds(t) {
            return this.x = t.minX, this.y = t.minY, this.width = t.maxX - t.minX, this.height = t.maxY - t.minY, this;
        }
        copyFrom(t) {
            return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
        }
        copyTo(t) {
            return t.copyFrom(this), t;
        }
        contains(t, e) {
            return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height;
        }
        strokeContains(t, e, s, i = .5) {
            const { width: n, height: o } = this;
            if (n <= 0 || o <= 0) return !1;
            const a = this.x, l = this.y, u = s * (1 - i), h = s - u, c = a - u, p = a + n + u, d = l - u, g = l + o + u, _ = a + h, m = a + n - h, b = l + h, v = l + o - h;
            return t >= c && t <= p && e >= d && e <= g && !(t > _ && t < m && e > b && e < v);
        }
        intersects(t, e) {
            if (!e) {
                const z = this.x < t.x ? t.x : this.x;
                if ((this.right > t.right ? t.right : this.right) <= z) return !1;
                const $ = this.y < t.y ? t.y : this.y;
                return (this.bottom > t.bottom ? t.bottom : this.bottom) > $;
            }
            const s = this.left, i = this.right, n = this.top, o = this.bottom;
            if (i <= s || o <= n) return !1;
            const a = is[0].set(t.left, t.top), l = is[1].set(t.left, t.bottom), u = is[2].set(t.right, t.top), h = is[3].set(t.right, t.bottom);
            if (u.x <= a.x || l.y <= a.y) return !1;
            const c = Math.sign(e.a * e.d - e.b * e.c);
            if (c === 0 || (e.apply(a, a), e.apply(l, l), e.apply(u, u), e.apply(h, h), Math.max(a.x, l.x, u.x, h.x) <= s || Math.min(a.x, l.x, u.x, h.x) >= i || Math.max(a.y, l.y, u.y, h.y) <= n || Math.min(a.y, l.y, u.y, h.y) >= o)) return !1;
            const p = c * (l.y - a.y), d = c * (a.x - l.x), g = p * s + d * n, _ = p * i + d * n, m = p * s + d * o, b = p * i + d * o;
            if (Math.max(g, _, m, b) <= p * a.x + d * a.y || Math.min(g, _, m, b) >= p * h.x + d * h.y) return !1;
            const v = c * (a.y - u.y), S = c * (u.x - a.x), B = v * s + S * n, N = v * i + S * n, E = v * s + S * o, M = v * i + S * o;
            return !(Math.max(B, N, E, M) <= v * a.x + S * a.y || Math.min(B, N, E, M) >= v * h.x + S * h.y);
        }
        pad(t = 0, e = t) {
            return this.x -= t, this.y -= e, this.width += t * 2, this.height += e * 2, this;
        }
        fit(t) {
            const e = Math.max(this.x, t.x), s = Math.min(this.x + this.width, t.x + t.width), i = Math.max(this.y, t.y), n = Math.min(this.y + this.height, t.y + t.height);
            return this.x = e, this.width = Math.max(s - e, 0), this.y = i, this.height = Math.max(n - i, 0), this;
        }
        ceil(t = 1, e = .001) {
            const s = Math.ceil((this.x + this.width - e) * t) / t, i = Math.ceil((this.y + this.height - e) * t) / t;
            return this.x = Math.floor((this.x + e) * t) / t, this.y = Math.floor((this.y + e) * t) / t, this.width = s - this.x, this.height = i - this.y, this;
        }
        enlarge(t) {
            const e = Math.min(this.x, t.x), s = Math.max(this.x + this.width, t.x + t.width), i = Math.min(this.y, t.y), n = Math.max(this.y + this.height, t.y + t.height);
            return this.x = e, this.width = s - e, this.y = i, this.height = n - i, this;
        }
        getBounds(t) {
            return t || (t = new vt), t.copyFrom(this), t;
        }
        containsRect(t) {
            if (this.width <= 0 || this.height <= 0) return !1;
            const e = t.x, s = t.y, i = t.x + t.width, n = t.y + t.height;
            return e >= this.x && e < this.x + this.width && s >= this.y && s < this.y + this.height && i >= this.x && i < this.x + this.width && n >= this.y && n < this.y + this.height;
        }
        toString() {
            return `[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
        }
    };
    const Gs = {
        default: -1
    };
    _t = function(r = "default") {
        return Gs[r] === void 0 && (Gs[r] = -1), ++Gs[r];
    };
    let Zr, ol;
    Zr = {};
    yt = "8.0.0";
    ol = "8.3.4";
    ct = function(r, t, e = 3) {
        if (Zr[t]) return;
        let s = new Error().stack;
        typeof s > "u" ? console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${r}`) : (s = s.split(`
`).splice(e).join(`
`), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", `${t}
Deprecated since v${r}`), console.warn(s), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${r}`), console.warn(s))), Zr[t] = !0;
    };
    const _n = ()=>{};
    Qr = function(r) {
        return r += r === 0 ? 1 : 0, --r, r |= r >>> 1, r |= r >>> 2, r |= r >>> 4, r |= r >>> 8, r |= r >>> 16, r + 1;
    };
    function Jr(r) {
        return !(r & r - 1) && !!r;
    }
    function yn(r) {
        const t = {};
        for(const e in r)r[e] !== void 0 && (t[e] = r[e]);
        return t;
    }
    const ti = Object.create(null);
    function al(r) {
        const t = ti[r];
        return t === void 0 && (ti[r] = _t("resource")), t;
    }
    const xn = class bn extends re {
        constructor(t = {}){
            super(), this._resourceType = "textureSampler", this._touched = 0, this._maxAnisotropy = 1, this.destroyed = !1, t = {
                ...bn.defaultOptions,
                ...t
            }, this.addressMode = t.addressMode, this.addressModeU = t.addressModeU ?? this.addressModeU, this.addressModeV = t.addressModeV ?? this.addressModeV, this.addressModeW = t.addressModeW ?? this.addressModeW, this.scaleMode = t.scaleMode, this.magFilter = t.magFilter ?? this.magFilter, this.minFilter = t.minFilter ?? this.minFilter, this.mipmapFilter = t.mipmapFilter ?? this.mipmapFilter, this.lodMinClamp = t.lodMinClamp, this.lodMaxClamp = t.lodMaxClamp, this.compare = t.compare, this.maxAnisotropy = t.maxAnisotropy ?? 1;
        }
        set addressMode(t) {
            this.addressModeU = t, this.addressModeV = t, this.addressModeW = t;
        }
        get addressMode() {
            return this.addressModeU;
        }
        set wrapMode(t) {
            ct(yt, "TextureStyle.wrapMode is now TextureStyle.addressMode"), this.addressMode = t;
        }
        get wrapMode() {
            return this.addressMode;
        }
        set scaleMode(t) {
            this.magFilter = t, this.minFilter = t, this.mipmapFilter = t;
        }
        get scaleMode() {
            return this.magFilter;
        }
        set maxAnisotropy(t) {
            this._maxAnisotropy = Math.min(t, 16), this._maxAnisotropy > 1 && (this.scaleMode = "linear");
        }
        get maxAnisotropy() {
            return this._maxAnisotropy;
        }
        get _resourceId() {
            return this._sharedResourceId || this._generateResourceId();
        }
        update() {
            this.emit("change", this), this._sharedResourceId = null;
        }
        _generateResourceId() {
            const t = `${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;
            return this._sharedResourceId = al(t), this._resourceId;
        }
        destroy() {
            this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this.removeAllListeners();
        }
    };
    xn.defaultOptions = {
        addressMode: "clamp-to-edge",
        scaleMode: "linear"
    };
    ll = xn;
    const vn = class wn extends re {
        constructor(t = {}){
            super(), this.options = t, this.uid = _t("textureSource"), this._resourceType = "textureSource", this._resourceId = _t("resource"), this.uploadMethodId = "unknown", this._resolution = 1, this.pixelWidth = 1, this.pixelHeight = 1, this.width = 1, this.height = 1, this.sampleCount = 1, this.mipLevelCount = 1, this.autoGenerateMipmaps = !1, this.format = "rgba8unorm", this.dimension = "2d", this.antialias = !1, this._touched = 0, this._batchTick = -1, this._textureBindLocation = -1, t = {
                ...wn.defaultOptions,
                ...t
            }, this.label = t.label ?? "", this.resource = t.resource, this.autoGarbageCollect = t.autoGarbageCollect, this._resolution = t.resolution, t.width ? this.pixelWidth = t.width * this._resolution : this.pixelWidth = this.resource ? this.resourceWidth ?? 1 : 1, t.height ? this.pixelHeight = t.height * this._resolution : this.pixelHeight = this.resource ? this.resourceHeight ?? 1 : 1, this.width = this.pixelWidth / this._resolution, this.height = this.pixelHeight / this._resolution, this.format = t.format, this.dimension = t.dimensions, this.mipLevelCount = t.mipLevelCount, this.autoGenerateMipmaps = t.autoGenerateMipmaps, this.sampleCount = t.sampleCount, this.antialias = t.antialias, this.alphaMode = t.alphaMode, this.style = new ll(yn(t)), this.destroyed = !1, this._refreshPOT();
        }
        get source() {
            return this;
        }
        get style() {
            return this._style;
        }
        set style(t) {
            this.style !== t && (this._style?.off("change", this._onStyleChange, this), this._style = t, this._style?.on("change", this._onStyleChange, this), this._onStyleChange());
        }
        get addressMode() {
            return this._style.addressMode;
        }
        set addressMode(t) {
            this._style.addressMode = t;
        }
        get repeatMode() {
            return this._style.addressMode;
        }
        set repeatMode(t) {
            this._style.addressMode = t;
        }
        get magFilter() {
            return this._style.magFilter;
        }
        set magFilter(t) {
            this._style.magFilter = t;
        }
        get minFilter() {
            return this._style.minFilter;
        }
        set minFilter(t) {
            this._style.minFilter = t;
        }
        get mipmapFilter() {
            return this._style.mipmapFilter;
        }
        set mipmapFilter(t) {
            this._style.mipmapFilter = t;
        }
        get lodMinClamp() {
            return this._style.lodMinClamp;
        }
        set lodMinClamp(t) {
            this._style.lodMinClamp = t;
        }
        get lodMaxClamp() {
            return this._style.lodMaxClamp;
        }
        set lodMaxClamp(t) {
            this._style.lodMaxClamp = t;
        }
        _onStyleChange() {
            this.emit("styleChange", this);
        }
        update() {
            if (this.resource) {
                const t = this._resolution;
                if (this.resize(this.resourceWidth / t, this.resourceHeight / t)) return;
            }
            this.emit("update", this);
        }
        destroy() {
            this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this._style && (this._style.destroy(), this._style = null), this.uploadMethodId = null, this.resource = null, this.removeAllListeners();
        }
        unload() {
            this._resourceId = _t("resource"), this.emit("change", this), this.emit("unload", this);
        }
        get resourceWidth() {
            const { resource: t } = this;
            return t.naturalWidth || t.videoWidth || t.displayWidth || t.width;
        }
        get resourceHeight() {
            const { resource: t } = this;
            return t.naturalHeight || t.videoHeight || t.displayHeight || t.height;
        }
        get resolution() {
            return this._resolution;
        }
        set resolution(t) {
            this._resolution !== t && (this._resolution = t, this.width = this.pixelWidth / t, this.height = this.pixelHeight / t);
        }
        resize(t, e, s) {
            s || (s = this._resolution), t || (t = this.width), e || (e = this.height);
            const i = Math.round(t * s), n = Math.round(e * s);
            return this.width = i / s, this.height = n / s, this._resolution = s, this.pixelWidth === i && this.pixelHeight === n ? !1 : (this._refreshPOT(), this.pixelWidth = i, this.pixelHeight = n, this.emit("resize", this), this._resourceId = _t("resource"), this.emit("change", this), !0);
        }
        updateMipmaps() {
            this.autoGenerateMipmaps && this.mipLevelCount > 1 && this.emit("updateMipmaps", this);
        }
        set wrapMode(t) {
            this._style.wrapMode = t;
        }
        get wrapMode() {
            return this._style.wrapMode;
        }
        set scaleMode(t) {
            this._style.scaleMode = t;
        }
        get scaleMode() {
            return this._style.scaleMode;
        }
        _refreshPOT() {
            this.isPowerOfTwo = Jr(this.pixelWidth) && Jr(this.pixelHeight);
        }
        static test(t) {
            throw new Error("Unimplemented");
        }
    };
    vn.defaultOptions = {
        resolution: 1,
        format: "bgra8unorm",
        alphaMode: "premultiply-alpha-on-upload",
        dimensions: "2d",
        mipLevelCount: 1,
        autoGenerateMipmaps: !1,
        sampleCount: 1,
        antialias: !1,
        autoGarbageCollect: !1
    };
    qt = vn;
    class Pr extends qt {
        constructor(t){
            const e = t.resource || new Float32Array(t.width * t.height * 4);
            let s = t.format;
            s || (e instanceof Float32Array ? s = "rgba32float" : e instanceof Int32Array || e instanceof Uint32Array ? s = "rgba32uint" : e instanceof Int16Array || e instanceof Uint16Array ? s = "rgba16uint" : (e instanceof Int8Array, s = "bgra8unorm")), super({
                ...t,
                resource: e,
                format: s
            }), this.uploadMethodId = "buffer";
        }
        static test(t) {
            return t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array;
        }
    }
    Pr.extension = ht.TextureSource;
    const ei = new et;
    hl = class {
        constructor(t, e){
            this.mapCoord = new et, this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, typeof e > "u" ? this.clampMargin = t.width < 10 ? 0 : .5 : this.clampMargin = e, this.isSimple = !1, this.texture = t;
        }
        get texture() {
            return this._texture;
        }
        set texture(t) {
            this.texture !== t && (this._texture?.removeListener("update", this.update, this), this._texture = t, this._texture.addListener("update", this.update, this), this.update());
        }
        multiplyUvs(t, e) {
            e === void 0 && (e = t);
            const s = this.mapCoord;
            for(let i = 0; i < t.length; i += 2){
                const n = t[i], o = t[i + 1];
                e[i] = n * s.a + o * s.c + s.tx, e[i + 1] = n * s.b + o * s.d + s.ty;
            }
            return e;
        }
        update() {
            const t = this._texture;
            this._updateID++;
            const e = t.uvs;
            this.mapCoord.set(e.x1 - e.x0, e.y1 - e.y0, e.x3 - e.x0, e.y3 - e.y0, e.x0, e.y0);
            const s = t.orig, i = t.trim;
            i && (ei.set(s.width / i.width, 0, 0, s.height / i.height, -i.x / i.width, -i.y / i.height), this.mapCoord.append(ei));
            const n = t.source, o = this.uClampFrame, a = this.clampMargin / n._resolution, l = this.clampOffset / n._resolution;
            return o[0] = (t.frame.x + a + l) / n.width, o[1] = (t.frame.y + a + l) / n.height, o[2] = (t.frame.x + t.frame.width - a + l) / n.width, o[3] = (t.frame.y + t.frame.height - a + l) / n.height, this.uClampOffset[0] = this.clampOffset / n.pixelWidth, this.uClampOffset[1] = this.clampOffset / n.pixelHeight, this.isSimple = t.frame.width === n.width && t.frame.height === n.height && t.rotate === 0, !0;
        }
    };
    ut = class extends re {
        constructor({ source: t, label: e, frame: s, orig: i, trim: n, defaultAnchor: o, defaultBorders: a, rotate: l, dynamic: u } = {}){
            if (super(), this.uid = _t("texture"), this.uvs = {
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                x3: 0,
                y3: 0
            }, this.frame = new vt, this.noFrame = !1, this.dynamic = !1, this.isTexture = !0, this.label = e, this.source = t?.source ?? new qt, this.noFrame = !s, s) this.frame.copyFrom(s);
            else {
                const { width: h, height: c } = this._source;
                this.frame.width = h, this.frame.height = c;
            }
            this.orig = i || this.frame, this.trim = n, this.rotate = l ?? 0, this.defaultAnchor = o, this.defaultBorders = a, this.destroyed = !1, this.dynamic = u || !1, this.updateUvs();
        }
        set source(t) {
            this._source && this._source.off("resize", this.update, this), this._source = t, t.on("resize", this.update, this), this.emit("update", this);
        }
        get source() {
            return this._source;
        }
        get textureMatrix() {
            return this._textureMatrix || (this._textureMatrix = new hl(this)), this._textureMatrix;
        }
        get width() {
            return this.orig.width;
        }
        get height() {
            return this.orig.height;
        }
        updateUvs() {
            const { uvs: t, frame: e } = this, { width: s, height: i } = this._source, n = e.x / s, o = e.y / i, a = e.width / s, l = e.height / i;
            let u = this.rotate;
            if (u) {
                const h = a / 2, c = l / 2, p = n + h, d = o + c;
                u = dt.add(u, dt.NW), t.x0 = p + h * dt.uX(u), t.y0 = d + c * dt.uY(u), u = dt.add(u, 2), t.x1 = p + h * dt.uX(u), t.y1 = d + c * dt.uY(u), u = dt.add(u, 2), t.x2 = p + h * dt.uX(u), t.y2 = d + c * dt.uY(u), u = dt.add(u, 2), t.x3 = p + h * dt.uX(u), t.y3 = d + c * dt.uY(u);
            } else t.x0 = n, t.y0 = o, t.x1 = n + a, t.y1 = o, t.x2 = n + a, t.y2 = o + l, t.x3 = n, t.y3 = o + l;
        }
        destroy(t = !1) {
            this._source && t && (this._source.destroy(), this._source = null), this._textureMatrix = null, this.destroyed = !0, this.emit("destroy", this), this.removeAllListeners();
        }
        update() {
            this.noFrame && (this.frame.width = this._source.width, this.frame.height = this._source.height), this.updateUvs(), this.emit("update", this);
        }
        get baseTexture() {
            return ct(yt, "Texture.baseTexture is now Texture.source"), this._source;
        }
    };
    ut.EMPTY = new ut({
        label: "EMPTY",
        source: new qt({
            label: "EMPTY"
        })
    });
    ut.EMPTY.destroy = _n;
    ut.WHITE = new ut({
        source: new Pr({
            resource: new Uint8Array([
                255,
                255,
                255,
                255
            ]),
            width: 1,
            height: 1,
            alphaMode: "premultiply-alpha-on-upload",
            label: "WHITE"
        }),
        label: "WHITE"
    });
    ut.WHITE.destroy = _n;
    ul = function(r, t, e) {
        const { width: s, height: i } = e.orig, n = e.trim;
        if (n) {
            const o = n.width, a = n.height;
            r.minX = n.x - t._x * s, r.maxX = r.minX + o, r.minY = n.y - t._y * i, r.maxY = r.minY + a;
        } else r.minX = -t._x * s, r.maxX = r.minX + s, r.minY = -t._y * i, r.maxY = r.minY + i;
    };
    const si = new et;
    zt = class {
        constructor(t = 1 / 0, e = 1 / 0, s = -1 / 0, i = -1 / 0){
            this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = si, this.minX = t, this.minY = e, this.maxX = s, this.maxY = i;
        }
        isEmpty() {
            return this.minX > this.maxX || this.minY > this.maxY;
        }
        get rectangle() {
            this._rectangle || (this._rectangle = new vt);
            const t = this._rectangle;
            return this.minX > this.maxX || this.minY > this.maxY ? (t.x = 0, t.y = 0, t.width = 0, t.height = 0) : t.copyFromBounds(this), t;
        }
        clear() {
            return this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = si, this;
        }
        set(t, e, s, i) {
            this.minX = t, this.minY = e, this.maxX = s, this.maxY = i;
        }
        addFrame(t, e, s, i, n) {
            n || (n = this.matrix);
            const o = n.a, a = n.b, l = n.c, u = n.d, h = n.tx, c = n.ty;
            let p = this.minX, d = this.minY, g = this.maxX, _ = this.maxY, m = o * t + l * e + h, b = a * t + u * e + c;
            m < p && (p = m), b < d && (d = b), m > g && (g = m), b > _ && (_ = b), m = o * s + l * e + h, b = a * s + u * e + c, m < p && (p = m), b < d && (d = b), m > g && (g = m), b > _ && (_ = b), m = o * t + l * i + h, b = a * t + u * i + c, m < p && (p = m), b < d && (d = b), m > g && (g = m), b > _ && (_ = b), m = o * s + l * i + h, b = a * s + u * i + c, m < p && (p = m), b < d && (d = b), m > g && (g = m), b > _ && (_ = b), this.minX = p, this.minY = d, this.maxX = g, this.maxY = _;
        }
        addRect(t, e) {
            this.addFrame(t.x, t.y, t.x + t.width, t.y + t.height, e);
        }
        addBounds(t, e) {
            this.addFrame(t.minX, t.minY, t.maxX, t.maxY, e);
        }
        addBoundsMask(t) {
            this.minX = this.minX > t.minX ? this.minX : t.minX, this.minY = this.minY > t.minY ? this.minY : t.minY, this.maxX = this.maxX < t.maxX ? this.maxX : t.maxX, this.maxY = this.maxY < t.maxY ? this.maxY : t.maxY;
        }
        applyMatrix(t) {
            const e = this.minX, s = this.minY, i = this.maxX, n = this.maxY, { a: o, b: a, c: l, d: u, tx: h, ty: c } = t;
            let p = o * e + l * s + h, d = a * e + u * s + c;
            this.minX = p, this.minY = d, this.maxX = p, this.maxY = d, p = o * i + l * s + h, d = a * i + u * s + c, this.minX = p < this.minX ? p : this.minX, this.minY = d < this.minY ? d : this.minY, this.maxX = p > this.maxX ? p : this.maxX, this.maxY = d > this.maxY ? d : this.maxY, p = o * e + l * n + h, d = a * e + u * n + c, this.minX = p < this.minX ? p : this.minX, this.minY = d < this.minY ? d : this.minY, this.maxX = p > this.maxX ? p : this.maxX, this.maxY = d > this.maxY ? d : this.maxY, p = o * i + l * n + h, d = a * i + u * n + c, this.minX = p < this.minX ? p : this.minX, this.minY = d < this.minY ? d : this.minY, this.maxX = p > this.maxX ? p : this.maxX, this.maxY = d > this.maxY ? d : this.maxY;
        }
        fit(t) {
            return this.minX < t.left && (this.minX = t.left), this.maxX > t.right && (this.maxX = t.right), this.minY < t.top && (this.minY = t.top), this.maxY > t.bottom && (this.maxY = t.bottom), this;
        }
        fitBounds(t, e, s, i) {
            return this.minX < t && (this.minX = t), this.maxX > e && (this.maxX = e), this.minY < s && (this.minY = s), this.maxY > i && (this.maxY = i), this;
        }
        pad(t, e = t) {
            return this.minX -= t, this.maxX += t, this.minY -= e, this.maxY += e, this;
        }
        ceil() {
            return this.minX = Math.floor(this.minX), this.minY = Math.floor(this.minY), this.maxX = Math.ceil(this.maxX), this.maxY = Math.ceil(this.maxY), this;
        }
        clone() {
            return new zt(this.minX, this.minY, this.maxX, this.maxY);
        }
        scale(t, e = t) {
            return this.minX *= t, this.minY *= e, this.maxX *= t, this.maxY *= e, this;
        }
        get x() {
            return this.minX;
        }
        set x(t) {
            const e = this.maxX - this.minX;
            this.minX = t, this.maxX = t + e;
        }
        get y() {
            return this.minY;
        }
        set y(t) {
            const e = this.maxY - this.minY;
            this.minY = t, this.maxY = t + e;
        }
        get width() {
            return this.maxX - this.minX;
        }
        set width(t) {
            this.maxX = this.minX + t;
        }
        get height() {
            return this.maxY - this.minY;
        }
        set height(t) {
            this.maxY = this.minY + t;
        }
        get left() {
            return this.minX;
        }
        get right() {
            return this.maxX;
        }
        get top() {
            return this.minY;
        }
        get bottom() {
            return this.maxY;
        }
        get isPositive() {
            return this.maxX - this.minX > 0 && this.maxY - this.minY > 0;
        }
        get isValid() {
            return this.minX + this.minY !== 1 / 0;
        }
        addVertexData(t, e, s, i) {
            let n = this.minX, o = this.minY, a = this.maxX, l = this.maxY;
            i || (i = this.matrix);
            const u = i.a, h = i.b, c = i.c, p = i.d, d = i.tx, g = i.ty;
            for(let _ = e; _ < s; _ += 2){
                const m = t[_], b = t[_ + 1], v = u * m + c * b + d, S = h * m + p * b + g;
                n = v < n ? v : n, o = S < o ? S : o, a = v > a ? v : a, l = S > l ? S : l;
            }
            this.minX = n, this.minY = o, this.maxX = a, this.maxY = l;
        }
        containsPoint(t, e) {
            return this.minX <= t && this.minY <= e && this.maxX >= t && this.maxY >= e;
        }
        toString() {
            return `[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`;
        }
        copyFrom(t) {
            return this.minX = t.minX, this.minY = t.minY, this.maxX = t.maxX, this.maxY = t.maxY, this;
        }
    };
    var cl = {
        grad: .9,
        turn: 360,
        rad: 360 / (2 * Math.PI)
    }, Zt = function(r) {
        return typeof r == "string" ? r.length > 0 : typeof r == "number";
    }, bt = function(r, t, e) {
        return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * r) / e + 0;
    }, Bt = function(r, t, e) {
        return t === void 0 && (t = 0), e === void 0 && (e = 1), r > e ? e : r > t ? r : t;
    }, Cn = function(r) {
        return (r = isFinite(r) ? r % 360 : 0) > 0 ? r : r + 360;
    }, ri = function(r) {
        return {
            r: Bt(r.r, 0, 255),
            g: Bt(r.g, 0, 255),
            b: Bt(r.b, 0, 255),
            a: Bt(r.a)
        };
    }, Vs = function(r) {
        return {
            r: bt(r.r),
            g: bt(r.g),
            b: bt(r.b),
            a: bt(r.a, 3)
        };
    }, dl = /^#([0-9a-f]{3,8})$/i, ns = function(r) {
        var t = r.toString(16);
        return t.length < 2 ? "0" + t : t;
    }, Sn = function(r) {
        var t = r.r, e = r.g, s = r.b, i = r.a, n = Math.max(t, e, s), o = n - Math.min(t, e, s), a = o ? n === t ? (e - s) / o : n === e ? 2 + (s - t) / o : 4 + (t - e) / o : 0;
        return {
            h: 60 * (a < 0 ? a + 6 : a),
            s: n ? o / n * 100 : 0,
            v: n / 255 * 100,
            a: i
        };
    }, An = function(r) {
        var t = r.h, e = r.s, s = r.v, i = r.a;
        t = t / 360 * 6, e /= 100, s /= 100;
        var n = Math.floor(t), o = s * (1 - e), a = s * (1 - (t - n) * e), l = s * (1 - (1 - t + n) * e), u = n % 6;
        return {
            r: 255 * [
                s,
                a,
                o,
                o,
                l,
                s
            ][u],
            g: 255 * [
                l,
                s,
                s,
                a,
                o,
                o
            ][u],
            b: 255 * [
                o,
                o,
                l,
                s,
                s,
                a
            ][u],
            a: i
        };
    }, ii = function(r) {
        return {
            h: Cn(r.h),
            s: Bt(r.s, 0, 100),
            l: Bt(r.l, 0, 100),
            a: Bt(r.a)
        };
    }, ni = function(r) {
        return {
            h: bt(r.h),
            s: bt(r.s),
            l: bt(r.l),
            a: bt(r.a, 3)
        };
    }, oi = function(r) {
        return An((e = (t = r).s, {
            h: t.h,
            s: (e *= ((s = t.l) < 50 ? s : 100 - s) / 100) > 0 ? 2 * e / (s + e) * 100 : 0,
            v: s + e,
            a: t.a
        }));
        var t, e, s;
    }, Le = function(r) {
        return {
            h: (t = Sn(r)).h,
            s: (i = (200 - (e = t.s)) * (s = t.v) / 100) > 0 && i < 200 ? e * s / 100 / (i <= 100 ? i : 200 - i) * 100 : 0,
            l: i / 2,
            a: t.a
        };
        var t, e, s, i;
    }, fl = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, pl = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ml = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, gl = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, dr = {
        string: [
            [
                function(r) {
                    var t = dl.exec(r);
                    return t ? (r = t[1]).length <= 4 ? {
                        r: parseInt(r[0] + r[0], 16),
                        g: parseInt(r[1] + r[1], 16),
                        b: parseInt(r[2] + r[2], 16),
                        a: r.length === 4 ? bt(parseInt(r[3] + r[3], 16) / 255, 2) : 1
                    } : r.length === 6 || r.length === 8 ? {
                        r: parseInt(r.substr(0, 2), 16),
                        g: parseInt(r.substr(2, 2), 16),
                        b: parseInt(r.substr(4, 2), 16),
                        a: r.length === 8 ? bt(parseInt(r.substr(6, 2), 16) / 255, 2) : 1
                    } : null : null;
                },
                "hex"
            ],
            [
                function(r) {
                    var t = ml.exec(r) || gl.exec(r);
                    return t ? t[2] !== t[4] || t[4] !== t[6] ? null : ri({
                        r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
                        g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
                        b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
                        a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1)
                    }) : null;
                },
                "rgb"
            ],
            [
                function(r) {
                    var t = fl.exec(r) || pl.exec(r);
                    if (!t) return null;
                    var e, s, i = ii({
                        h: (e = t[1], s = t[2], s === void 0 && (s = "deg"), Number(e) * (cl[s] || 1)),
                        s: Number(t[3]),
                        l: Number(t[4]),
                        a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1)
                    });
                    return oi(i);
                },
                "hsl"
            ]
        ],
        object: [
            [
                function(r) {
                    var t = r.r, e = r.g, s = r.b, i = r.a, n = i === void 0 ? 1 : i;
                    return Zt(t) && Zt(e) && Zt(s) ? ri({
                        r: Number(t),
                        g: Number(e),
                        b: Number(s),
                        a: Number(n)
                    }) : null;
                },
                "rgb"
            ],
            [
                function(r) {
                    var t = r.h, e = r.s, s = r.l, i = r.a, n = i === void 0 ? 1 : i;
                    if (!Zt(t) || !Zt(e) || !Zt(s)) return null;
                    var o = ii({
                        h: Number(t),
                        s: Number(e),
                        l: Number(s),
                        a: Number(n)
                    });
                    return oi(o);
                },
                "hsl"
            ],
            [
                function(r) {
                    var t = r.h, e = r.s, s = r.v, i = r.a, n = i === void 0 ? 1 : i;
                    if (!Zt(t) || !Zt(e) || !Zt(s)) return null;
                    var o = function(a) {
                        return {
                            h: Cn(a.h),
                            s: Bt(a.s, 0, 100),
                            v: Bt(a.v, 0, 100),
                            a: Bt(a.a)
                        };
                    }({
                        h: Number(t),
                        s: Number(e),
                        v: Number(s),
                        a: Number(n)
                    });
                    return An(o);
                },
                "hsv"
            ]
        ]
    }, ai = function(r, t) {
        for(var e = 0; e < t.length; e++){
            var s = t[e][0](r);
            if (s) return [
                s,
                t[e][1]
            ];
        }
        return [
            null,
            void 0
        ];
    }, _l = function(r) {
        return typeof r == "string" ? ai(r.trim(), dr.string) : typeof r == "object" && r !== null ? ai(r, dr.object) : [
            null,
            void 0
        ];
    }, Ns = function(r, t) {
        var e = Le(r);
        return {
            h: e.h,
            s: Bt(e.s + 100 * t, 0, 100),
            l: e.l,
            a: e.a
        };
    }, $s = function(r) {
        return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255;
    }, li = function(r, t) {
        var e = Le(r);
        return {
            h: e.h,
            s: e.s,
            l: Bt(e.l + 100 * t, 0, 100),
            a: e.a
        };
    }, fr = function() {
        function r(t) {
            this.parsed = _l(t)[0], this.rgba = this.parsed || {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            };
        }
        return r.prototype.isValid = function() {
            return this.parsed !== null;
        }, r.prototype.brightness = function() {
            return bt($s(this.rgba), 2);
        }, r.prototype.isDark = function() {
            return $s(this.rgba) < .5;
        }, r.prototype.isLight = function() {
            return $s(this.rgba) >= .5;
        }, r.prototype.toHex = function() {
            return t = Vs(this.rgba), e = t.r, s = t.g, i = t.b, o = (n = t.a) < 1 ? ns(bt(255 * n)) : "", "#" + ns(e) + ns(s) + ns(i) + o;
            var t, e, s, i, n, o;
        }, r.prototype.toRgb = function() {
            return Vs(this.rgba);
        }, r.prototype.toRgbString = function() {
            return t = Vs(this.rgba), e = t.r, s = t.g, i = t.b, (n = t.a) < 1 ? "rgba(" + e + ", " + s + ", " + i + ", " + n + ")" : "rgb(" + e + ", " + s + ", " + i + ")";
            var t, e, s, i, n;
        }, r.prototype.toHsl = function() {
            return ni(Le(this.rgba));
        }, r.prototype.toHslString = function() {
            return t = ni(Le(this.rgba)), e = t.h, s = t.s, i = t.l, (n = t.a) < 1 ? "hsla(" + e + ", " + s + "%, " + i + "%, " + n + ")" : "hsl(" + e + ", " + s + "%, " + i + "%)";
            var t, e, s, i, n;
        }, r.prototype.toHsv = function() {
            return t = Sn(this.rgba), {
                h: bt(t.h),
                s: bt(t.s),
                v: bt(t.v),
                a: bt(t.a, 3)
            };
            var t;
        }, r.prototype.invert = function() {
            return Ht({
                r: 255 - (t = this.rgba).r,
                g: 255 - t.g,
                b: 255 - t.b,
                a: t.a
            });
            var t;
        }, r.prototype.saturate = function(t) {
            return t === void 0 && (t = .1), Ht(Ns(this.rgba, t));
        }, r.prototype.desaturate = function(t) {
            return t === void 0 && (t = .1), Ht(Ns(this.rgba, -t));
        }, r.prototype.grayscale = function() {
            return Ht(Ns(this.rgba, -1));
        }, r.prototype.lighten = function(t) {
            return t === void 0 && (t = .1), Ht(li(this.rgba, t));
        }, r.prototype.darken = function(t) {
            return t === void 0 && (t = .1), Ht(li(this.rgba, -t));
        }, r.prototype.rotate = function(t) {
            return t === void 0 && (t = 15), this.hue(this.hue() + t);
        }, r.prototype.alpha = function(t) {
            return typeof t == "number" ? Ht({
                r: (e = this.rgba).r,
                g: e.g,
                b: e.b,
                a: t
            }) : bt(this.rgba.a, 3);
            var e;
        }, r.prototype.hue = function(t) {
            var e = Le(this.rgba);
            return typeof t == "number" ? Ht({
                h: t,
                s: e.s,
                l: e.l,
                a: e.a
            }) : bt(e.h);
        }, r.prototype.isEqual = function(t) {
            return this.toHex() === Ht(t).toHex();
        }, r;
    }(), Ht = function(r) {
        return r instanceof fr ? r : new fr(r);
    }, hi = [], yl = function(r) {
        r.forEach(function(t) {
            hi.indexOf(t) < 0 && (t(fr, dr), hi.push(t));
        });
    };
    function xl(r, t) {
        var e = {
            white: "#ffffff",
            bisque: "#ffe4c4",
            blue: "#0000ff",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            azure: "#f0ffff",
            whitesmoke: "#f5f5f5",
            papayawhip: "#ffefd5",
            plum: "#dda0dd",
            blanchedalmond: "#ffebcd",
            black: "#000000",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gainsboro: "#dcdcdc",
            cornsilk: "#fff8dc",
            cornflowerblue: "#6495ed",
            burlywood: "#deb887",
            aquamarine: "#7fffd4",
            beige: "#f5f5dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkkhaki: "#bdb76b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkgrey: "#a9a9a9",
            peachpuff: "#ffdab9",
            darkmagenta: "#8b008b",
            darkred: "#8b0000",
            darkorchid: "#9932cc",
            darkorange: "#ff8c00",
            darkslateblue: "#483d8b",
            gray: "#808080",
            darkslategray: "#2f4f4f",
            darkslategrey: "#2f4f4f",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            wheat: "#f5deb3",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            ghostwhite: "#f8f8ff",
            darkviolet: "#9400d3",
            magenta: "#ff00ff",
            green: "#008000",
            dodgerblue: "#1e90ff",
            grey: "#808080",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            blueviolet: "#8a2be2",
            forestgreen: "#228b22",
            lawngreen: "#7cfc00",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            fuchsia: "#ff00ff",
            brown: "#a52a2a",
            maroon: "#800000",
            mediumblue: "#0000cd",
            lightcoral: "#f08080",
            darkturquoise: "#00ced1",
            lightcyan: "#e0ffff",
            ivory: "#fffff0",
            lightyellow: "#ffffe0",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            linen: "#faf0e6",
            mediumaquamarine: "#66cdaa",
            lemonchiffon: "#fffacd",
            lime: "#00ff00",
            khaki: "#f0e68c",
            mediumseagreen: "#3cb371",
            limegreen: "#32cd32",
            mediumspringgreen: "#00fa9a",
            lightskyblue: "#87cefa",
            lightblue: "#add8e6",
            midnightblue: "#191970",
            lightpink: "#ffb6c1",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            mintcream: "#f5fffa",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            navajowhite: "#ffdead",
            navy: "#000080",
            mediumvioletred: "#c71585",
            powderblue: "#b0e0e6",
            palegoldenrod: "#eee8aa",
            oldlace: "#fdf5e6",
            paleturquoise: "#afeeee",
            mediumturquoise: "#48d1cc",
            mediumorchid: "#ba55d3",
            rebeccapurple: "#663399",
            lightsteelblue: "#b0c4de",
            mediumslateblue: "#7b68ee",
            thistle: "#d8bfd8",
            tan: "#d2b48c",
            orchid: "#da70d6",
            mediumpurple: "#9370db",
            purple: "#800080",
            pink: "#ffc0cb",
            skyblue: "#87ceeb",
            springgreen: "#00ff7f",
            palegreen: "#98fb98",
            red: "#ff0000",
            yellow: "#ffff00",
            slateblue: "#6a5acd",
            lavenderblush: "#fff0f5",
            peru: "#cd853f",
            palevioletred: "#db7093",
            violet: "#ee82ee",
            teal: "#008080",
            slategray: "#708090",
            slategrey: "#708090",
            aliceblue: "#f0f8ff",
            darkseagreen: "#8fbc8f",
            darkolivegreen: "#556b2f",
            greenyellow: "#adff2f",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            tomato: "#ff6347",
            silver: "#c0c0c0",
            sienna: "#a0522d",
            lavender: "#e6e6fa",
            lightgreen: "#90ee90",
            orange: "#ffa500",
            orangered: "#ff4500",
            steelblue: "#4682b4",
            royalblue: "#4169e1",
            turquoise: "#40e0d0",
            yellowgreen: "#9acd32",
            salmon: "#fa8072",
            saddlebrown: "#8b4513",
            sandybrown: "#f4a460",
            rosybrown: "#bc8f8f",
            darksalmon: "#e9967a",
            lightgoldenrodyellow: "#fafad2",
            snow: "#fffafa",
            lightgrey: "#d3d3d3",
            lightgray: "#d3d3d3",
            dimgray: "#696969",
            dimgrey: "#696969",
            olivedrab: "#6b8e23",
            olive: "#808000"
        }, s = {};
        for(var i in e)s[e[i]] = i;
        var n = {};
        r.prototype.toName = function(o) {
            if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
            var a, l, u = s[this.toHex()];
            if (u) return u;
            if (o?.closest) {
                var h = this.toRgb(), c = 1 / 0, p = "black";
                if (!n.length) for(var d in e)n[d] = new r(e[d]).toRgb();
                for(var g in e){
                    var _ = (a = h, l = n[g], Math.pow(a.r - l.r, 2) + Math.pow(a.g - l.g, 2) + Math.pow(a.b - l.b, 2));
                    _ < c && (c = _, p = g);
                }
                return p;
            }
        }, t.string.push([
            function(o) {
                var a = o.toLowerCase(), l = a === "transparent" ? "#0000" : e[a];
                return l ? new r(l).toRgb() : null;
            },
            "name"
        ]);
    }
    yl([
        xl
    ]);
    const Re = class Ne {
        constructor(t = 16777215){
            this._value = null, this._components = new Float32Array(4), this._components.fill(1), this._int = 16777215, this.value = t;
        }
        get red() {
            return this._components[0];
        }
        get green() {
            return this._components[1];
        }
        get blue() {
            return this._components[2];
        }
        get alpha() {
            return this._components[3];
        }
        setValue(t) {
            return this.value = t, this;
        }
        set value(t) {
            if (t instanceof Ne) this._value = this._cloneSource(t._value), this._int = t._int, this._components.set(t._components);
            else {
                if (t === null) throw new Error("Cannot set Color#value to null");
                (this._value === null || !this._isSourceEqual(this._value, t)) && (this._value = this._cloneSource(t), this._normalize(this._value));
            }
        }
        get value() {
            return this._value;
        }
        _cloneSource(t) {
            return typeof t == "string" || typeof t == "number" || t instanceof Number || t === null ? t : Array.isArray(t) || ArrayBuffer.isView(t) ? t.slice(0) : typeof t == "object" && t !== null ? {
                ...t
            } : t;
        }
        _isSourceEqual(t, e) {
            const s = typeof t;
            if (s !== typeof e) return !1;
            if (s === "number" || s === "string" || t instanceof Number) return t === e;
            if (Array.isArray(t) && Array.isArray(e) || ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) return t.length !== e.length ? !1 : t.every((n, o)=>n === e[o]);
            if (t !== null && e !== null) {
                const n = Object.keys(t), o = Object.keys(e);
                return n.length !== o.length ? !1 : n.every((a)=>t[a] === e[a]);
            }
            return t === e;
        }
        toRgba() {
            const [t, e, s, i] = this._components;
            return {
                r: t,
                g: e,
                b: s,
                a: i
            };
        }
        toRgb() {
            const [t, e, s] = this._components;
            return {
                r: t,
                g: e,
                b: s
            };
        }
        toRgbaString() {
            const [t, e, s] = this.toUint8RgbArray();
            return `rgba(${t},${e},${s},${this.alpha})`;
        }
        toUint8RgbArray(t) {
            const [e, s, i] = this._components;
            return this._arrayRgb || (this._arrayRgb = []), t || (t = this._arrayRgb), t[0] = Math.round(e * 255), t[1] = Math.round(s * 255), t[2] = Math.round(i * 255), t;
        }
        toArray(t) {
            this._arrayRgba || (this._arrayRgba = []), t || (t = this._arrayRgba);
            const [e, s, i, n] = this._components;
            return t[0] = e, t[1] = s, t[2] = i, t[3] = n, t;
        }
        toRgbArray(t) {
            this._arrayRgb || (this._arrayRgb = []), t || (t = this._arrayRgb);
            const [e, s, i] = this._components;
            return t[0] = e, t[1] = s, t[2] = i, t;
        }
        toNumber() {
            return this._int;
        }
        toBgrNumber() {
            const [t, e, s] = this.toUint8RgbArray();
            return (s << 16) + (e << 8) + t;
        }
        toLittleEndianNumber() {
            const t = this._int;
            return (t >> 16) + (t & 65280) + ((t & 255) << 16);
        }
        multiply(t) {
            const [e, s, i, n] = Ne._temp.setValue(t)._components;
            return this._components[0] *= e, this._components[1] *= s, this._components[2] *= i, this._components[3] *= n, this._refreshInt(), this._value = null, this;
        }
        premultiply(t, e = !0) {
            return e && (this._components[0] *= t, this._components[1] *= t, this._components[2] *= t), this._components[3] = t, this._refreshInt(), this._value = null, this;
        }
        toPremultiplied(t, e = !0) {
            if (t === 1) return (255 << 24) + this._int;
            if (t === 0) return e ? 0 : this._int;
            let s = this._int >> 16 & 255, i = this._int >> 8 & 255, n = this._int & 255;
            return e && (s = s * t + .5 | 0, i = i * t + .5 | 0, n = n * t + .5 | 0), (t * 255 << 24) + (s << 16) + (i << 8) + n;
        }
        toHex() {
            const t = this._int.toString(16);
            return `#${"000000".substring(0, 6 - t.length) + t}`;
        }
        toHexa() {
            const e = Math.round(this._components[3] * 255).toString(16);
            return this.toHex() + "00".substring(0, 2 - e.length) + e;
        }
        setAlpha(t) {
            return this._components[3] = this._clamp(t), this;
        }
        _normalize(t) {
            let e, s, i, n;
            if ((typeof t == "number" || t instanceof Number) && t >= 0 && t <= 16777215) {
                const o = t;
                e = (o >> 16 & 255) / 255, s = (o >> 8 & 255) / 255, i = (o & 255) / 255, n = 1;
            } else if ((Array.isArray(t) || t instanceof Float32Array) && t.length >= 3 && t.length <= 4) t = this._clamp(t), [e, s, i, n = 1] = t;
            else if ((t instanceof Uint8Array || t instanceof Uint8ClampedArray) && t.length >= 3 && t.length <= 4) t = this._clamp(t, 0, 255), [e, s, i, n = 255] = t, e /= 255, s /= 255, i /= 255, n /= 255;
            else if (typeof t == "string" || typeof t == "object") {
                if (typeof t == "string") {
                    const a = Ne.HEX_PATTERN.exec(t);
                    a && (t = `#${a[2]}`);
                }
                const o = Ht(t);
                o.isValid() && ({ r: e, g: s, b: i, a: n } = o.rgba, e /= 255, s /= 255, i /= 255);
            }
            if (e !== void 0) this._components[0] = e, this._components[1] = s, this._components[2] = i, this._components[3] = n, this._refreshInt();
            else throw new Error(`Unable to convert color ${t}`);
        }
        _refreshInt() {
            this._clamp(this._components);
            const [t, e, s] = this._components;
            this._int = (t * 255 << 16) + (e * 255 << 8) + (s * 255 | 0);
        }
        _clamp(t, e = 0, s = 1) {
            return typeof t == "number" ? Math.min(Math.max(t, e), s) : (t.forEach((i, n)=>{
                t[n] = Math.min(Math.max(i, e), s);
            }), t);
        }
        static isColorLike(t) {
            return typeof t == "number" || typeof t == "string" || t instanceof Number || t instanceof Ne || Array.isArray(t) || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Float32Array || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 && t.a !== void 0;
        }
    };
    Re.shared = new Re;
    Re._temp = new Re;
    Re.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
    Ft = Re;
    const bl = {
        cullArea: null,
        cullable: !1,
        cullableChildren: !0
    };
    class Mr {
        constructor(t, e){
            this._pool = [], this._count = 0, this._index = 0, this._classType = t, e && this.prepopulate(e);
        }
        prepopulate(t) {
            for(let e = 0; e < t; e++)this._pool[this._index++] = new this._classType;
            this._count += t;
        }
        get(t) {
            let e;
            return this._index > 0 ? e = this._pool[--this._index] : e = new this._classType, e.init?.(t), e;
        }
        return(t) {
            t.reset?.(), this._pool[this._index++] = t;
        }
        get totalSize() {
            return this._count;
        }
        get totalFree() {
            return this._index;
        }
        get totalUsed() {
            return this._count - this._index;
        }
        clear() {
            this._pool.length = 0, this._index = 0;
        }
    }
    class vl {
        constructor(){
            this._poolsByClass = new Map;
        }
        prepopulate(t, e) {
            this.getPool(t).prepopulate(e);
        }
        get(t, e) {
            return this.getPool(t).get(e);
        }
        return(t) {
            this.getPool(t.constructor).return(t);
        }
        getPool(t) {
            return this._poolsByClass.has(t) || this._poolsByClass.set(t, new Mr(t)), this._poolsByClass.get(t);
        }
        stats() {
            const t = {};
            return this._poolsByClass.forEach((e)=>{
                const s = t[e._classType.name] ? e._classType.name + e._classType.ID : e._classType.name;
                t[s] = {
                    free: e.totalFree,
                    used: e.totalUsed,
                    size: e.totalSize
                };
            }), t;
        }
    }
    let wl;
    Jt = new vl;
    wl = {
        get isCachedAsTexture () {
            return !!this.renderGroup?.isCachedAsTexture;
        },
        cacheAsTexture (r) {
            typeof r == "boolean" && r === !1 ? this.disableRenderGroup() : (this.enableRenderGroup(), this.renderGroup.enableCacheAsTexture(r === !0 ? {} : r));
        },
        updateCacheTexture () {
            this.renderGroup?.updateCacheTexture();
        },
        get cacheAsBitmap () {
            return this.isCachedAsTexture;
        },
        set cacheAsBitmap (r){
            ct("v8.6.0", "cacheAsBitmap is deprecated, use cacheAsTexture instead."), this.cacheAsTexture(r);
        }
    };
    Cl = function(r, t, e) {
        const s = r.length;
        let i;
        if (t >= s || e === 0) return;
        e = t + e > s ? s - t : e;
        const n = s - e;
        for(i = t; i < n; ++i)r[i] = r[i + e];
        r.length = n;
    };
    const Sl = {
        allowChildren: !0,
        removeChildren (r = 0, t) {
            const e = t ?? this.children.length, s = e - r, i = [];
            if (s > 0 && s <= e) {
                for(let o = e - 1; o >= r; o--){
                    const a = this.children[o];
                    a && (i.push(a), a.parent = null);
                }
                Cl(this.children, r, e);
                const n = this.renderGroup || this.parentRenderGroup;
                n && n.removeChildren(i);
                for(let o = 0; o < i.length; ++o)this.emit("childRemoved", i[o], this, o), i[o].emit("removed", this);
                return i.length > 0 && this._didViewChangeTick++, i;
            } else if (s === 0 && this.children.length === 0) return i;
            throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
        },
        removeChildAt (r) {
            const t = this.getChildAt(r);
            return this.removeChild(t);
        },
        getChildAt (r) {
            if (r < 0 || r >= this.children.length) throw new Error(`getChildAt: Index (${r}) does not exist.`);
            return this.children[r];
        },
        setChildIndex (r, t) {
            if (t < 0 || t >= this.children.length) throw new Error(`The index ${t} supplied is out of bounds ${this.children.length}`);
            this.getChildIndex(r), this.addChildAt(r, t);
        },
        getChildIndex (r) {
            const t = this.children.indexOf(r);
            if (t === -1) throw new Error("The supplied Container must be a child of the caller");
            return t;
        },
        addChildAt (r, t) {
            this.allowChildren || ct(yt, "addChildAt: Only Containers will be allowed to add children in v8.0.0");
            const { children: e } = this;
            if (t < 0 || t > e.length) throw new Error(`${r}addChildAt: The index ${t} supplied is out of bounds ${e.length}`);
            if (r.parent) {
                const i = r.parent.children.indexOf(r);
                if (r.parent === this && i === t) return r;
                i !== -1 && r.parent.children.splice(i, 1);
            }
            t === e.length ? e.push(r) : e.splice(t, 0, r), r.parent = this, r.didChange = !0, r._updateFlags = 15;
            const s = this.renderGroup || this.parentRenderGroup;
            return s && s.addChild(r), this.sortableChildren && (this.sortDirty = !0), this.emit("childAdded", r, this, t), r.emit("added", this), r;
        },
        swapChildren (r, t) {
            if (r === t) return;
            const e = this.getChildIndex(r), s = this.getChildIndex(t);
            this.children[e] = t, this.children[s] = r;
            const i = this.renderGroup || this.parentRenderGroup;
            i && (i.structureDidChange = !0), this._didContainerChangeTick++;
        },
        removeFromParent () {
            this.parent?.removeChild(this);
        },
        reparentChild (...r) {
            return r.length === 1 ? this.reparentChildAt(r[0], this.children.length) : (r.forEach((t)=>this.reparentChildAt(t, this.children.length)), r[0]);
        },
        reparentChildAt (r, t) {
            if (r.parent === this) return this.setChildIndex(r, t), r;
            const e = r.worldTransform.clone();
            r.removeFromParent(), this.addChildAt(r, t);
            const s = this.worldTransform.clone();
            return s.invert(), e.prepend(s), r.setFromMatrix(e), r;
        }
    }, Al = {
        collectRenderables (r, t, e) {
            this.parentRenderLayer && this.parentRenderLayer !== e || this.globalDisplayStatus < 7 || !this.includeInBuild || (this.sortableChildren && this.sortChildren(), this.isSimple ? this.collectRenderablesSimple(r, t, e) : this.renderGroup ? t.renderPipes.renderGroup.addRenderGroup(this.renderGroup, r) : this.collectRenderablesWithEffects(r, t, e));
        },
        collectRenderablesSimple (r, t, e) {
            const s = this.children, i = s.length;
            for(let n = 0; n < i; n++)s[n].collectRenderables(r, t, e);
        },
        collectRenderablesWithEffects (r, t, e) {
            const { renderPipes: s } = t;
            for(let i = 0; i < this.effects.length; i++){
                const n = this.effects[i];
                s[n.pipe].push(n, this, r);
            }
            this.collectRenderablesSimple(r, t, e);
            for(let i = this.effects.length - 1; i >= 0; i--){
                const n = this.effects[i];
                s[n.pipe].pop(n, this, r);
            }
        }
    };
    ui = class {
        constructor(){
            this.pipe = "filter", this.priority = 1;
        }
        destroy() {
            for(let t = 0; t < this.filters.length; t++)this.filters[t].destroy();
            this.filters = null, this.filterArea = null;
        }
    };
    class Tl {
        constructor(){
            this._effectClasses = [], this._tests = [], this._initialized = !1;
        }
        init() {
            this._initialized || (this._initialized = !0, this._effectClasses.forEach((t)=>{
                this.add({
                    test: t.test,
                    maskClass: t
                });
            }));
        }
        add(t) {
            this._tests.push(t);
        }
        getMaskEffect(t) {
            this._initialized || this.init();
            for(let e = 0; e < this._tests.length; e++){
                const s = this._tests[e];
                if (s.test(t)) return Jt.get(s.maskClass, t);
            }
            return t;
        }
        returnMaskEffect(t) {
            Jt.return(t);
        }
    }
    const pr = new Tl;
    Vt.handleByList(ht.MaskEffect, pr._effectClasses);
    const kl = {
        _maskEffect: null,
        _maskOptions: {
            inverse: !1
        },
        _filterEffect: null,
        effects: [],
        _markStructureAsChanged () {
            const r = this.renderGroup || this.parentRenderGroup;
            r && (r.structureDidChange = !0);
        },
        addEffect (r) {
            this.effects.indexOf(r) === -1 && (this.effects.push(r), this.effects.sort((e, s)=>e.priority - s.priority), this._markStructureAsChanged(), this._updateIsSimple());
        },
        removeEffect (r) {
            const t = this.effects.indexOf(r);
            t !== -1 && (this.effects.splice(t, 1), this._markStructureAsChanged(), this._updateIsSimple());
        },
        set mask (r){
            const t = this._maskEffect;
            t?.mask !== r && (t && (this.removeEffect(t), pr.returnMaskEffect(t), this._maskEffect = null), r != null && (this._maskEffect = pr.getMaskEffect(r), this.addEffect(this._maskEffect)));
        },
        setMask (r) {
            this._maskOptions = {
                ...this._maskOptions,
                ...r
            }, r.mask && (this.mask = r.mask), this._markStructureAsChanged();
        },
        get mask () {
            return this._maskEffect?.mask;
        },
        set filters (r){
            !Array.isArray(r) && r && (r = [
                r
            ]);
            const t = this._filterEffect || (this._filterEffect = new ui);
            r = r;
            const e = r?.length > 0, s = t.filters?.length > 0, i = e !== s;
            r = Array.isArray(r) ? r.slice(0) : r, t.filters = Object.freeze(r), i && (e ? this.addEffect(t) : (this.removeEffect(t), t.filters = r ?? null));
        },
        get filters () {
            return this._filterEffect?.filters;
        },
        set filterArea (r){
            this._filterEffect || (this._filterEffect = new ui), this._filterEffect.filterArea = r;
        },
        get filterArea () {
            return this._filterEffect?.filterArea;
        }
    }, Pl = {
        label: null,
        get name () {
            return ct(yt, "Container.name property has been removed, use Container.label instead"), this.label;
        },
        set name (r){
            ct(yt, "Container.name property has been removed, use Container.label instead"), this.label = r;
        },
        getChildByName (r, t = !1) {
            return this.getChildByLabel(r, t);
        },
        getChildByLabel (r, t = !1) {
            const e = this.children;
            for(let s = 0; s < e.length; s++){
                const i = e[s];
                if (i.label === r || r instanceof RegExp && r.test(i.label)) return i;
            }
            if (t) for(let s = 0; s < e.length; s++){
                const n = e[s].getChildByLabel(r, !0);
                if (n) return n;
            }
            return null;
        },
        getChildrenByLabel (r, t = !1, e = []) {
            const s = this.children;
            for(let i = 0; i < s.length; i++){
                const n = s[i];
                (n.label === r || r instanceof RegExp && r.test(n.label)) && e.push(n);
            }
            if (t) for(let i = 0; i < s.length; i++)s[i].getChildrenByLabel(r, !0, e);
            return e;
        }
    }, Tt = new Mr(et), te = new Mr(zt), Ml = new et, Il = {
        getFastGlobalBounds (r, t) {
            t || (t = new zt), t.clear(), this._getGlobalBoundsRecursive(!!r, t, this.parentRenderLayer), t.isValid || t.set(0, 0, 0, 0);
            const e = this.renderGroup || this.parentRenderGroup;
            return t.applyMatrix(e.worldTransform), t;
        },
        _getGlobalBoundsRecursive (r, t, e) {
            let s = t;
            if (r && this.parentRenderLayer && this.parentRenderLayer !== e || this.localDisplayStatus !== 7 || !this.measurable) return;
            const i = !!this.effects.length;
            if ((this.renderGroup || i) && (s = te.get().clear()), this.boundsArea) t.addRect(this.boundsArea, this.worldTransform);
            else {
                if (this.renderPipeId) {
                    const o = this.bounds;
                    s.addFrame(o.minX, o.minY, o.maxX, o.maxY, this.groupTransform);
                }
                const n = this.children;
                for(let o = 0; o < n.length; o++)n[o]._getGlobalBoundsRecursive(r, s, e);
            }
            if (i) {
                let n = !1;
                const o = this.renderGroup || this.parentRenderGroup;
                for(let a = 0; a < this.effects.length; a++)this.effects[a].addBounds && (n || (n = !0, s.applyMatrix(o.worldTransform)), this.effects[a].addBounds(s, !0));
                n && (s.applyMatrix(o.worldTransform.copyTo(Ml).invert()), t.addBounds(s, this.relativeGroupTransform)), t.addBounds(s), te.return(s);
            } else this.renderGroup && (t.addBounds(s, this.relativeGroupTransform), te.return(s));
        }
    };
    Tn = function(r, t, e) {
        e.clear();
        let s, i;
        return r.parent ? t ? s = r.parent.worldTransform : (i = Tt.get().identity(), s = Ir(r, i)) : s = et.IDENTITY, kn(r, e, s, t), i && Tt.return(i), e.isValid || e.set(0, 0, 0, 0), e;
    };
    function kn(r, t, e, s) {
        if (!r.visible || !r.measurable) return;
        let i;
        s ? i = r.worldTransform : (r.updateLocalTransform(), i = Tt.get(), i.appendFrom(r.localTransform, e));
        const n = t, o = !!r.effects.length;
        if (o && (t = te.get().clear()), r.boundsArea) t.addRect(r.boundsArea, i);
        else {
            r.bounds && (t.matrix = i, t.addBounds(r.bounds));
            for(let a = 0; a < r.children.length; a++)kn(r.children[a], t, i, s);
        }
        if (o) {
            for(let a = 0; a < r.effects.length; a++)r.effects[a].addBounds?.(t);
            n.addBounds(t, et.IDENTITY), te.return(t);
        }
        s || Tt.return(i);
    }
    function Ir(r, t) {
        const e = r.parent;
        return e && (Ir(e, t), e.updateLocalTransform(), t.append(e.localTransform)), t;
    }
    function Pn(r, t) {
        if (r === 16777215 || !t) return t;
        if (t === 16777215 || !r) return r;
        const e = r >> 16 & 255, s = r >> 8 & 255, i = r & 255, n = t >> 16 & 255, o = t >> 8 & 255, a = t & 255, l = e * n / 255 | 0, u = s * o / 255 | 0, h = i * a / 255 | 0;
        return (l << 16) + (u << 8) + h;
    }
    const ci = 16777215;
    di = function(r, t) {
        return r === ci ? t : t === ci ? r : Pn(r, t);
    };
    function ps(r) {
        return ((r & 255) << 16) + (r & 65280) + (r >> 16 & 255);
    }
    const Rl = {
        getGlobalAlpha (r) {
            if (r) return this.renderGroup ? this.renderGroup.worldAlpha : this.parentRenderGroup ? this.parentRenderGroup.worldAlpha * this.alpha : this.alpha;
            let t = this.alpha, e = this.parent;
            for(; e;)t *= e.alpha, e = e.parent;
            return t;
        },
        getGlobalTransform (r, t) {
            if (t) return r.copyFrom(this.worldTransform);
            this.updateLocalTransform();
            const e = Ir(this, Tt.get().identity());
            return r.appendFrom(this.localTransform, e), Tt.return(e), r;
        },
        getGlobalTint (r) {
            if (r) return this.renderGroup ? ps(this.renderGroup.worldColor) : this.parentRenderGroup ? ps(di(this.localColor, this.parentRenderGroup.worldColor)) : this.tint;
            let t = this.localColor, e = this.parent;
            for(; e;)t = di(t, e.localColor), e = e.parent;
            return ps(t);
        }
    };
    let Os = 0;
    const fi = 500;
    Dt = function(...r) {
        Os !== fi && (Os++, Os === fi ? console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS.") : console.warn("PixiJS Warning: ", ...r));
    };
    Mn = function(r, t, e) {
        return t.clear(), e || (e = et.IDENTITY), In(r, t, e, r, !0), t.isValid || t.set(0, 0, 0, 0), t;
    };
    function In(r, t, e, s, i) {
        let n;
        if (i) n = Tt.get(), n = e.copyTo(n);
        else {
            if (!r.visible || !r.measurable) return;
            r.updateLocalTransform();
            const l = r.localTransform;
            n = Tt.get(), n.appendFrom(l, e);
        }
        const o = t, a = !!r.effects.length;
        if (a && (t = te.get().clear()), r.boundsArea) t.addRect(r.boundsArea, n);
        else {
            r.renderPipeId && (t.matrix = n, t.addBounds(r.bounds));
            const l = r.children;
            for(let u = 0; u < l.length; u++)In(l[u], t, n, s, !1);
        }
        if (a) {
            for(let l = 0; l < r.effects.length; l++)r.effects[l].addLocalBounds?.(t, s);
            o.addBounds(t, et.IDENTITY), te.return(t);
        }
        Tt.return(n);
    }
    function Rn(r, t) {
        const e = r.children;
        for(let s = 0; s < e.length; s++){
            const i = e[s], n = i.uid, o = (i._didViewChangeTick & 65535) << 16 | i._didContainerChangeTick & 65535, a = t.index;
            (t.data[a] !== n || t.data[a + 1] !== o) && (t.data[t.index] = n, t.data[t.index + 1] = o, t.didChange = !0), t.index = a + 2, i.children.length && Rn(i, t);
        }
        return t.didChange;
    }
    const El = new et, Dl = {
        _localBoundsCacheId: -1,
        _localBoundsCacheData: null,
        _setWidth (r, t) {
            const e = Math.sign(this.scale.x) || 1;
            t !== 0 ? this.scale.x = r / t * e : this.scale.x = e;
        },
        _setHeight (r, t) {
            const e = Math.sign(this.scale.y) || 1;
            t !== 0 ? this.scale.y = r / t * e : this.scale.y = e;
        },
        getLocalBounds () {
            this._localBoundsCacheData || (this._localBoundsCacheData = {
                data: [],
                index: 1,
                didChange: !1,
                localBounds: new zt
            });
            const r = this._localBoundsCacheData;
            return r.index = 1, r.didChange = !1, r.data[0] !== this._didViewChangeTick && (r.didChange = !0, r.data[0] = this._didViewChangeTick), Rn(this, r), r.didChange && Mn(this, r.localBounds, El), r.localBounds;
        },
        getBounds (r, t) {
            return Tn(this, r, t || new zt);
        }
    }, Bl = {
        _onRender: null,
        set onRender (r){
            const t = this.renderGroup || this.parentRenderGroup;
            if (!r) {
                this._onRender && t?.removeOnRender(this), this._onRender = null;
                return;
            }
            this._onRender || t?.addOnRender(this), this._onRender = r;
        },
        get onRender () {
            return this._onRender;
        }
    }, Fl = {
        _zIndex: 0,
        sortDirty: !1,
        sortableChildren: !1,
        get zIndex () {
            return this._zIndex;
        },
        set zIndex (r){
            this._zIndex !== r && (this._zIndex = r, this.depthOfChildModified());
        },
        depthOfChildModified () {
            this.parent && (this.parent.sortableChildren = !0, this.parent.sortDirty = !0), this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0);
        },
        sortChildren () {
            this.sortDirty && (this.sortDirty = !1, this.children.sort(Gl));
        }
    };
    function Gl(r, t) {
        return r._zIndex - t._zIndex;
    }
    const Vl = {
        getGlobalPosition (r = new At, t = !1) {
            return this.parent ? this.parent.toGlobal(this._position, r, t) : (r.x = this._position.x, r.y = this._position.y), r;
        },
        toGlobal (r, t, e = !1) {
            const s = this.getGlobalTransform(Tt.get(), e);
            return t = s.apply(r, t), Tt.return(s), t;
        },
        toLocal (r, t, e, s) {
            t && (r = t.toGlobal(r, e, s));
            const i = this.getGlobalTransform(Tt.get(), s);
            return e = i.applyInverse(r, e), Tt.return(i), e;
        }
    };
    class En {
        constructor(){
            this.uid = _t("instructionSet"), this.instructions = [], this.instructionSize = 0, this.renderables = [], this.gcTick = 0;
        }
        reset() {
            this.instructionSize = 0;
        }
        add(t) {
            this.instructions[this.instructionSize++] = t;
        }
        log() {
            this.instructions.length = this.instructionSize, console.table(this.instructions, [
                "type",
                "action"
            ]);
        }
    }
    let Nl = 0;
    class $l {
        constructor(t){
            this._poolKeyHash = Object.create(null), this._texturePool = {}, this.textureOptions = t || {}, this.enableFullScreen = !1;
        }
        createTexture(t, e, s) {
            const i = new qt({
                ...this.textureOptions,
                width: t,
                height: e,
                resolution: 1,
                antialias: s,
                autoGarbageCollect: !1
            });
            return new ut({
                source: i,
                label: `texturePool_${Nl++}`
            });
        }
        getOptimalTexture(t, e, s = 1, i) {
            let n = Math.ceil(t * s - 1e-6), o = Math.ceil(e * s - 1e-6);
            n = Qr(n), o = Qr(o);
            const a = (n << 17) + (o << 1) + (i ? 1 : 0);
            this._texturePool[a] || (this._texturePool[a] = []);
            let l = this._texturePool[a].pop();
            return l || (l = this.createTexture(n, o, i)), l.source._resolution = s, l.source.width = n / s, l.source.height = o / s, l.source.pixelWidth = n, l.source.pixelHeight = o, l.frame.x = 0, l.frame.y = 0, l.frame.width = t, l.frame.height = e, l.updateUvs(), this._poolKeyHash[l.uid] = a, l;
        }
        getSameSizeTexture(t, e = !1) {
            const s = t.source;
            return this.getOptimalTexture(t.width, t.height, s._resolution, e);
        }
        returnTexture(t) {
            const e = this._poolKeyHash[t.uid];
            this._texturePool[e].push(t);
        }
        clear(t) {
            if (t = t !== !1, t) for(const e in this._texturePool){
                const s = this._texturePool[e];
                if (s) for(let i = 0; i < s.length; i++)s[i].destroy(!0);
            }
            this._texturePool = {};
        }
    }
    Ol = new $l;
    class zl {
        constructor(){
            this.renderPipeId = "renderGroup", this.root = null, this.canBundle = !1, this.renderGroupParent = null, this.renderGroupChildren = [], this.worldTransform = new et, this.worldColorAlpha = 4294967295, this.worldColor = 16777215, this.worldAlpha = 1, this.childrenToUpdate = Object.create(null), this.updateTick = 0, this.gcTick = 0, this.childrenRenderablesToUpdate = {
                list: [],
                index: 0
            }, this.structureDidChange = !0, this.instructionSet = new En, this._onRenderContainers = [], this.textureNeedsUpdate = !0, this.isCachedAsTexture = !1, this._matrixDirty = 7;
        }
        init(t) {
            this.root = t, t._onRender && this.addOnRender(t), t.didChange = !0;
            const e = t.children;
            for(let s = 0; s < e.length; s++){
                const i = e[s];
                i._updateFlags = 15, this.addChild(i);
            }
        }
        enableCacheAsTexture(t = {}) {
            this.textureOptions = t, this.isCachedAsTexture = !0, this.textureNeedsUpdate = !0;
        }
        disableCacheAsTexture() {
            this.isCachedAsTexture = !1, this.texture && (Ol.returnTexture(this.texture), this.texture = null);
        }
        updateCacheTexture() {
            this.textureNeedsUpdate = !0;
        }
        reset() {
            this.renderGroupChildren.length = 0;
            for(const t in this.childrenToUpdate){
                const e = this.childrenToUpdate[t];
                e.list.fill(null), e.index = 0;
            }
            this.childrenRenderablesToUpdate.index = 0, this.childrenRenderablesToUpdate.list.fill(null), this.root = null, this.updateTick = 0, this.structureDidChange = !0, this._onRenderContainers.length = 0, this.renderGroupParent = null, this.disableCacheAsTexture();
        }
        get localTransform() {
            return this.root.localTransform;
        }
        addRenderGroupChild(t) {
            t.renderGroupParent && t.renderGroupParent._removeRenderGroupChild(t), t.renderGroupParent = this, this.renderGroupChildren.push(t);
        }
        _removeRenderGroupChild(t) {
            const e = this.renderGroupChildren.indexOf(t);
            e > -1 && this.renderGroupChildren.splice(e, 1), t.renderGroupParent = null;
        }
        addChild(t) {
            if (this.structureDidChange = !0, t.parentRenderGroup = this, t.updateTick = -1, t.parent === this.root ? t.relativeRenderGroupDepth = 1 : t.relativeRenderGroupDepth = t.parent.relativeRenderGroupDepth + 1, t.didChange = !0, this.onChildUpdate(t), t.renderGroup) {
                this.addRenderGroupChild(t.renderGroup);
                return;
            }
            t._onRender && this.addOnRender(t);
            const e = t.children;
            for(let s = 0; s < e.length; s++)this.addChild(e[s]);
        }
        removeChild(t) {
            if (this.structureDidChange = !0, t._onRender && (t.renderGroup || this.removeOnRender(t)), t.parentRenderGroup = null, t.renderGroup) {
                this._removeRenderGroupChild(t.renderGroup);
                return;
            }
            const e = t.children;
            for(let s = 0; s < e.length; s++)this.removeChild(e[s]);
        }
        removeChildren(t) {
            for(let e = 0; e < t.length; e++)this.removeChild(t[e]);
        }
        onChildUpdate(t) {
            let e = this.childrenToUpdate[t.relativeRenderGroupDepth];
            e || (e = this.childrenToUpdate[t.relativeRenderGroupDepth] = {
                index: 0,
                list: []
            }), e.list[e.index++] = t;
        }
        updateRenderable(t) {
            t.globalDisplayStatus < 7 || (this.instructionSet.renderPipes[t.renderPipeId].updateRenderable(t), t.didViewUpdate = !1);
        }
        onChildViewUpdate(t) {
            this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++] = t;
        }
        get isRenderable() {
            return this.root.localDisplayStatus === 7 && this.worldAlpha > 0;
        }
        addOnRender(t) {
            this._onRenderContainers.push(t);
        }
        removeOnRender(t) {
            this._onRenderContainers.splice(this._onRenderContainers.indexOf(t), 1);
        }
        runOnRender(t) {
            for(let e = 0; e < this._onRenderContainers.length; e++)this._onRenderContainers[e]._onRender(t);
        }
        destroy() {
            this.disableCacheAsTexture(), this.renderGroupParent = null, this.root = null, this.childrenRenderablesToUpdate = null, this.childrenToUpdate = null, this.renderGroupChildren = null, this._onRenderContainers = null, this.instructionSet = null;
        }
        getChildren(t = []) {
            const e = this.root.children;
            for(let s = 0; s < e.length; s++)this._getChildren(e[s], t);
            return t;
        }
        _getChildren(t, e = []) {
            if (e.push(t), t.renderGroup) return e;
            const s = t.children;
            for(let i = 0; i < s.length; i++)this._getChildren(s[i], e);
            return e;
        }
        invalidateMatrices() {
            this._matrixDirty = 7;
        }
        get inverseWorldTransform() {
            return (this._matrixDirty & 1) === 0 ? this._inverseWorldTransform : (this._matrixDirty &= -2, this._inverseWorldTransform || (this._inverseWorldTransform = new et), this._inverseWorldTransform.copyFrom(this.worldTransform).invert());
        }
        get textureOffsetInverseTransform() {
            return (this._matrixDirty & 2) === 0 ? this._textureOffsetInverseTransform : (this._matrixDirty &= -3, this._textureOffsetInverseTransform || (this._textureOffsetInverseTransform = new et), this._textureOffsetInverseTransform.copyFrom(this.inverseWorldTransform).translate(-this._textureBounds.x, -this._textureBounds.y));
        }
        get inverseParentTextureTransform() {
            if ((this._matrixDirty & 4) === 0) return this._inverseParentTextureTransform;
            this._matrixDirty &= -5;
            const t = this._parentCacheAsTextureRenderGroup;
            return t ? (this._inverseParentTextureTransform || (this._inverseParentTextureTransform = new et), this._inverseParentTextureTransform.copyFrom(this.worldTransform).prepend(t.inverseWorldTransform).translate(-t._textureBounds.x, -t._textureBounds.y)) : this.worldTransform;
        }
        get cacheToLocalTransform() {
            return this._parentCacheAsTextureRenderGroup ? this._parentCacheAsTextureRenderGroup.textureOffsetInverseTransform : null;
        }
    }
    function Ll(r, t, e = {}) {
        for(const s in t)!e[s] && t[s] !== void 0 && (r[s] = t[s]);
    }
    let zs, Ls, Us;
    zs = new Rt(null);
    Ls = new Rt(null);
    Us = new Rt(null, 1, 1);
    pi = 1;
    Ul = 2;
    Hs = 4;
    xe = class extends re {
        constructor(t = {}){
            super(), this.uid = _t("renderable"), this._updateFlags = 15, this.renderGroup = null, this.parentRenderGroup = null, this.parentRenderGroupIndex = 0, this.didChange = !1, this.didViewUpdate = !1, this.relativeRenderGroupDepth = 0, this.children = [], this.parent = null, this.includeInBuild = !0, this.measurable = !0, this.isSimple = !0, this.updateTick = -1, this.localTransform = new et, this.relativeGroupTransform = new et, this.groupTransform = this.relativeGroupTransform, this.destroyed = !1, this._position = new Rt(this, 0, 0), this._scale = Us, this._pivot = Ls, this._skew = zs, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._rotation = 0, this.localColor = 16777215, this.localAlpha = 1, this.groupAlpha = 1, this.groupColor = 16777215, this.groupColorAlpha = 4294967295, this.localBlendMode = "inherit", this.groupBlendMode = "normal", this.localDisplayStatus = 7, this.globalDisplayStatus = 7, this._didContainerChangeTick = 0, this._didViewChangeTick = 0, this._didLocalTransformChangeId = -1, this.effects = [], Ll(this, t, {
                children: !0,
                parent: !0,
                effects: !0
            }), t.children?.forEach((e)=>this.addChild(e)), t.parent?.addChild(this);
        }
        static mixin(t) {
            ct("8.8.0", "Container.mixin is deprecated, please use extensions.mixin instead."), Vt.mixin(xe, t);
        }
        set _didChangeId(t) {
            this._didViewChangeTick = t >> 12 & 4095, this._didContainerChangeTick = t & 4095;
        }
        get _didChangeId() {
            return this._didContainerChangeTick & 4095 | (this._didViewChangeTick & 4095) << 12;
        }
        addChild(...t) {
            if (this.allowChildren || ct(yt, "addChild: Only Containers will be allowed to add children in v8.0.0"), t.length > 1) {
                for(let i = 0; i < t.length; i++)this.addChild(t[i]);
                return t[0];
            }
            const e = t[0], s = this.renderGroup || this.parentRenderGroup;
            return e.parent === this ? (this.children.splice(this.children.indexOf(e), 1), this.children.push(e), s && (s.structureDidChange = !0), e) : (e.parent && e.parent.removeChild(e), this.children.push(e), this.sortableChildren && (this.sortDirty = !0), e.parent = this, e.didChange = !0, e._updateFlags = 15, s && s.addChild(e), this.emit("childAdded", e, this, this.children.length - 1), e.emit("added", this), this._didViewChangeTick++, e._zIndex !== 0 && e.depthOfChildModified(), e);
        }
        removeChild(...t) {
            if (t.length > 1) {
                for(let i = 0; i < t.length; i++)this.removeChild(t[i]);
                return t[0];
            }
            const e = t[0], s = this.children.indexOf(e);
            return s > -1 && (this._didViewChangeTick++, this.children.splice(s, 1), this.renderGroup ? this.renderGroup.removeChild(e) : this.parentRenderGroup && this.parentRenderGroup.removeChild(e), e.parentRenderLayer && e.parentRenderLayer.detach(e), e.parent = null, this.emit("childRemoved", e, this, s), e.emit("removed", this)), e;
        }
        _onUpdate(t) {
            t && t === this._skew && this._updateSkew(), this._didContainerChangeTick++, !this.didChange && (this.didChange = !0, this.parentRenderGroup && this.parentRenderGroup.onChildUpdate(this));
        }
        set isRenderGroup(t) {
            !!this.renderGroup !== t && (t ? this.enableRenderGroup() : this.disableRenderGroup());
        }
        get isRenderGroup() {
            return !!this.renderGroup;
        }
        enableRenderGroup() {
            if (this.renderGroup) return;
            const t = this.parentRenderGroup;
            t?.removeChild(this), this.renderGroup = Jt.get(zl, this), this.groupTransform = et.IDENTITY, t?.addChild(this), this._updateIsSimple();
        }
        disableRenderGroup() {
            if (!this.renderGroup) return;
            const t = this.parentRenderGroup;
            t?.removeChild(this), Jt.return(this.renderGroup), this.renderGroup = null, this.groupTransform = this.relativeGroupTransform, t?.addChild(this), this._updateIsSimple();
        }
        _updateIsSimple() {
            this.isSimple = !this.renderGroup && this.effects.length === 0;
        }
        get worldTransform() {
            return this._worldTransform || (this._worldTransform = new et), this.renderGroup ? this._worldTransform.copyFrom(this.renderGroup.worldTransform) : this.parentRenderGroup && this._worldTransform.appendFrom(this.relativeGroupTransform, this.parentRenderGroup.worldTransform), this._worldTransform;
        }
        get x() {
            return this._position.x;
        }
        set x(t) {
            this._position.x = t;
        }
        get y() {
            return this._position.y;
        }
        set y(t) {
            this._position.y = t;
        }
        get position() {
            return this._position;
        }
        set position(t) {
            this._position.copyFrom(t);
        }
        get rotation() {
            return this._rotation;
        }
        set rotation(t) {
            this._rotation !== t && (this._rotation = t, this._onUpdate(this._skew));
        }
        get angle() {
            return this.rotation * el;
        }
        set angle(t) {
            this.rotation = t * sl;
        }
        get pivot() {
            return this._pivot === Ls && (this._pivot = new Rt(this, 0, 0)), this._pivot;
        }
        set pivot(t) {
            this._pivot === Ls && (this._pivot = new Rt(this, 0, 0)), typeof t == "number" ? this._pivot.set(t) : this._pivot.copyFrom(t);
        }
        get skew() {
            return this._skew === zs && (this._skew = new Rt(this, 0, 0)), this._skew;
        }
        set skew(t) {
            this._skew === zs && (this._skew = new Rt(this, 0, 0)), this._skew.copyFrom(t);
        }
        get scale() {
            return this._scale === Us && (this._scale = new Rt(this, 1, 1)), this._scale;
        }
        set scale(t) {
            this._scale === Us && (this._scale = new Rt(this, 0, 0)), typeof t == "number" ? this._scale.set(t) : this._scale.copyFrom(t);
        }
        get width() {
            return Math.abs(this.scale.x * this.getLocalBounds().width);
        }
        set width(t) {
            const e = this.getLocalBounds().width;
            this._setWidth(t, e);
        }
        get height() {
            return Math.abs(this.scale.y * this.getLocalBounds().height);
        }
        set height(t) {
            const e = this.getLocalBounds().height;
            this._setHeight(t, e);
        }
        getSize(t) {
            t || (t = {});
            const e = this.getLocalBounds();
            return t.width = Math.abs(this.scale.x * e.width), t.height = Math.abs(this.scale.y * e.height), t;
        }
        setSize(t, e) {
            const s = this.getLocalBounds();
            typeof t == "object" ? (e = t.height ?? t.width, t = t.width) : e ?? (e = t), t !== void 0 && this._setWidth(t, s.width), e !== void 0 && this._setHeight(e, s.height);
        }
        _updateSkew() {
            const t = this._rotation, e = this._skew;
            this._cx = Math.cos(t + e._y), this._sx = Math.sin(t + e._y), this._cy = -Math.sin(t - e._x), this._sy = Math.cos(t - e._x);
        }
        updateTransform(t) {
            return this.position.set(typeof t.x == "number" ? t.x : this.position.x, typeof t.y == "number" ? t.y : this.position.y), this.scale.set(typeof t.scaleX == "number" ? t.scaleX || 1 : this.scale.x, typeof t.scaleY == "number" ? t.scaleY || 1 : this.scale.y), this.rotation = typeof t.rotation == "number" ? t.rotation : this.rotation, this.skew.set(typeof t.skewX == "number" ? t.skewX : this.skew.x, typeof t.skewY == "number" ? t.skewY : this.skew.y), this.pivot.set(typeof t.pivotX == "number" ? t.pivotX : this.pivot.x, typeof t.pivotY == "number" ? t.pivotY : this.pivot.y), this;
        }
        setFromMatrix(t) {
            t.decompose(this);
        }
        updateLocalTransform() {
            const t = this._didContainerChangeTick;
            if (this._didLocalTransformChangeId === t) return;
            this._didLocalTransformChangeId = t;
            const e = this.localTransform, s = this._scale, i = this._pivot, n = this._position, o = s._x, a = s._y, l = i._x, u = i._y;
            e.a = this._cx * o, e.b = this._sx * o, e.c = this._cy * a, e.d = this._sy * a, e.tx = n._x - (l * e.a + u * e.c), e.ty = n._y - (l * e.b + u * e.d);
        }
        set alpha(t) {
            t !== this.localAlpha && (this.localAlpha = t, this._updateFlags |= pi, this._onUpdate());
        }
        get alpha() {
            return this.localAlpha;
        }
        set tint(t) {
            const s = Ft.shared.setValue(t ?? 16777215).toBgrNumber();
            s !== this.localColor && (this.localColor = s, this._updateFlags |= pi, this._onUpdate());
        }
        get tint() {
            return ps(this.localColor);
        }
        set blendMode(t) {
            this.localBlendMode !== t && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0), this._updateFlags |= Ul, this.localBlendMode = t, this._onUpdate());
        }
        get blendMode() {
            return this.localBlendMode;
        }
        get visible() {
            return !!(this.localDisplayStatus & 2);
        }
        set visible(t) {
            const e = t ? 2 : 0;
            (this.localDisplayStatus & 2) !== e && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0), this._updateFlags |= Hs, this.localDisplayStatus ^= 2, this._onUpdate());
        }
        get culled() {
            return !(this.localDisplayStatus & 4);
        }
        set culled(t) {
            const e = t ? 0 : 4;
            (this.localDisplayStatus & 4) !== e && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0), this._updateFlags |= Hs, this.localDisplayStatus ^= 4, this._onUpdate());
        }
        get renderable() {
            return !!(this.localDisplayStatus & 1);
        }
        set renderable(t) {
            const e = t ? 1 : 0;
            (this.localDisplayStatus & 1) !== e && (this._updateFlags |= Hs, this.localDisplayStatus ^= 1, this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0), this._onUpdate());
        }
        get isRenderable() {
            return this.localDisplayStatus === 7 && this.groupAlpha > 0;
        }
        destroy(t = !1) {
            if (this.destroyed) return;
            this.destroyed = !0;
            let e;
            if (this.children.length && (e = this.removeChildren(0, this.children.length)), this.removeFromParent(), this.parent = null, this._maskEffect = null, this._filterEffect = null, this.effects = null, this._position = null, this._scale = null, this._pivot = null, this._skew = null, this.emit("destroyed", this), this.removeAllListeners(), (typeof t == "boolean" ? t : t?.children) && e) for(let i = 0; i < e.length; ++i)e[i].destroy(t);
            this.renderGroup?.destroy(), this.renderGroup = null;
        }
    };
    Vt.mixin(xe, Sl, Il, Vl, Bl, Dl, kl, Pl, Fl, bl, wl, Rl, Al);
    class Dn extends xe {
        constructor(t){
            super(t), this.canBundle = !0, this.allowChildren = !1, this._roundPixels = 0, this._lastUsed = -1, this._bounds = new zt(0, 1, 0, 0), this._boundsDirty = !0;
        }
        get bounds() {
            return this._boundsDirty ? (this.updateBounds(), this._boundsDirty = !1, this._bounds) : this._bounds;
        }
        get roundPixels() {
            return !!this._roundPixels;
        }
        set roundPixels(t) {
            this._roundPixels = t ? 1 : 0;
        }
        containsPoint(t) {
            const e = this.bounds, { x: s, y: i } = t;
            return s >= e.minX && s <= e.maxX && i >= e.minY && i <= e.maxY;
        }
        onViewUpdate() {
            if (this._didViewChangeTick++, this._boundsDirty = !0, this.didViewUpdate) return;
            this.didViewUpdate = !0;
            const t = this.renderGroup || this.parentRenderGroup;
            t && t.onChildViewUpdate(this);
        }
        destroy(t) {
            super.destroy(t), this._bounds = null;
        }
        collectRenderablesSimple(t, e, s) {
            const { renderPipes: i, renderableGC: n } = e;
            i.blendMode.setBlendMode(this, this.groupBlendMode, t), i[this.renderPipeId].addRenderable(this, t), n.addRenderable(this), this.didViewUpdate = !1;
            const a = this.children, l = a.length;
            for(let u = 0; u < l; u++)a[u].collectRenderables(t, e, s);
        }
    }
    Ke = class extends Dn {
        constructor(t = ut.EMPTY){
            t instanceof ut && (t = {
                texture: t
            });
            const { texture: e = ut.EMPTY, anchor: s, roundPixels: i, width: n, height: o, ...a } = t;
            super({
                label: "Sprite",
                ...a
            }), this.renderPipeId = "sprite", this.batched = !0, this._visualBounds = {
                minX: 0,
                maxX: 1,
                minY: 0,
                maxY: 0
            }, this._anchor = new Rt({
                _onUpdate: ()=>{
                    this.onViewUpdate();
                }
            }), s ? this.anchor = s : e.defaultAnchor && (this.anchor = e.defaultAnchor), this.texture = e, this.allowChildren = !1, this.roundPixels = i ?? !1, n !== void 0 && (this.width = n), o !== void 0 && (this.height = o);
        }
        static from(t, e = !1) {
            return t instanceof ut ? new Ke(t) : new Ke(ut.from(t, e));
        }
        set texture(t) {
            t || (t = ut.EMPTY);
            const e = this._texture;
            e !== t && (e && e.dynamic && e.off("update", this.onViewUpdate, this), t.dynamic && t.on("update", this.onViewUpdate, this), this._texture = t, this._width && this._setWidth(this._width, this._texture.orig.width), this._height && this._setHeight(this._height, this._texture.orig.height), this.onViewUpdate());
        }
        get texture() {
            return this._texture;
        }
        get visualBounds() {
            return ul(this._visualBounds, this._anchor, this._texture), this._visualBounds;
        }
        get sourceBounds() {
            return ct("8.6.1", "Sprite.sourceBounds is deprecated, use visualBounds instead."), this.visualBounds;
        }
        updateBounds() {
            const t = this._anchor, e = this._texture, s = this._bounds, { width: i, height: n } = e.orig;
            s.minX = -t._x * i, s.maxX = s.minX + i, s.minY = -t._y * n, s.maxY = s.minY + n;
        }
        destroy(t = !1) {
            if (super.destroy(t), typeof t == "boolean" ? t : t?.texture) {
                const s = typeof t == "boolean" ? t : t?.textureSource;
                this._texture.destroy(s);
            }
            this._texture = null, this._visualBounds = null, this._bounds = null, this._anchor = null;
        }
        get anchor() {
            return this._anchor;
        }
        set anchor(t) {
            typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t);
        }
        get width() {
            return Math.abs(this.scale.x) * this._texture.orig.width;
        }
        set width(t) {
            this._setWidth(t, this._texture.orig.width), this._width = t;
        }
        get height() {
            return Math.abs(this.scale.y) * this._texture.orig.height;
        }
        set height(t) {
            this._setHeight(t, this._texture.orig.height), this._height = t;
        }
        getSize(t) {
            return t || (t = {}), t.width = Math.abs(this.scale.x) * this._texture.orig.width, t.height = Math.abs(this.scale.y) * this._texture.orig.height, t;
        }
        setSize(t, e) {
            typeof t == "object" ? (e = t.height ?? t.width, t = t.width) : e ?? (e = t), t !== void 0 && this._setWidth(t, this._texture.orig.width), e !== void 0 && this._setHeight(e, this._texture.orig.height);
        }
    };
    const Hl = new zt;
    function Bn(r, t, e) {
        const s = Hl;
        r.measurable = !0, Tn(r, e, s), t.addBoundsMask(s), r.measurable = !1;
    }
    function Fn(r, t, e) {
        const s = te.get();
        r.measurable = !0;
        const i = Tt.get().identity(), n = Gn(r, e, i);
        Mn(r, s, n), r.measurable = !1, t.addBoundsMask(s), Tt.return(i), te.return(s);
    }
    function Gn(r, t, e) {
        return r ? (r !== t && (Gn(r.parent, t, e), r.updateLocalTransform(), e.append(r.localTransform)), e) : (Dt("Mask bounds, renderable is not inside the root container"), e);
    }
    class Vn {
        constructor(t){
            this.priority = 0, this.inverse = !1, this.pipe = "alphaMask", t?.mask && this.init(t.mask);
        }
        init(t) {
            this.mask = t, this.renderMaskToTexture = !(t instanceof Ke), this.mask.renderable = this.renderMaskToTexture, this.mask.includeInBuild = !this.renderMaskToTexture, this.mask.measurable = !1;
        }
        reset() {
            this.mask.measurable = !0, this.mask = null;
        }
        addBounds(t, e) {
            this.inverse || Bn(this.mask, t, e);
        }
        addLocalBounds(t, e) {
            Fn(this.mask, t, e);
        }
        containsPoint(t, e) {
            const s = this.mask;
            return e(s, t);
        }
        destroy() {
            this.reset();
        }
        static test(t) {
            return t instanceof Ke;
        }
    }
    Vn.extension = ht.MaskEffect;
    class Nn {
        constructor(t){
            this.priority = 0, this.pipe = "colorMask", t?.mask && this.init(t.mask);
        }
        init(t) {
            this.mask = t;
        }
        destroy() {}
        static test(t) {
            return typeof t == "number";
        }
    }
    Nn.extension = ht.MaskEffect;
    class $n {
        constructor(t){
            this.priority = 0, this.pipe = "stencilMask", t?.mask && this.init(t.mask);
        }
        init(t) {
            this.mask = t, this.mask.includeInBuild = !1, this.mask.measurable = !1;
        }
        reset() {
            this.mask.measurable = !0, this.mask.includeInBuild = !0, this.mask = null;
        }
        addBounds(t, e) {
            Bn(this.mask, t, e);
        }
        addLocalBounds(t, e) {
            Fn(this.mask, t, e);
        }
        containsPoint(t, e) {
            const s = this.mask;
            return e(s, t);
        }
        destroy() {
            this.reset();
        }
        static test(t) {
            return t instanceof xe;
        }
    }
    $n.extension = ht.MaskEffect;
    const Wl = {
        createCanvas: (r, t)=>{
            const e = document.createElement("canvas");
            return e.width = r, e.height = t, e;
        },
        getCanvasRenderingContext2D: ()=>CanvasRenderingContext2D,
        getWebGLRenderingContext: ()=>WebGLRenderingContext,
        getNavigator: ()=>navigator,
        getBaseUrl: ()=>document.baseURI ?? window.location.href,
        getFontFaceSet: ()=>document.fonts,
        fetch: (r, t)=>fetch(r, t),
        parseXML: (r)=>new DOMParser().parseFromString(r, "text/xml")
    };
    let mi = Wl;
    ne = {
        get () {
            return mi;
        },
        set (r) {
            mi = r;
        }
    };
    On = class extends qt {
        constructor(t){
            t.resource || (t.resource = ne.get().createCanvas()), t.width || (t.width = t.resource.width, t.autoDensity || (t.width /= t.resolution)), t.height || (t.height = t.resource.height, t.autoDensity || (t.height /= t.resolution)), super(t), this.uploadMethodId = "image", this.autoDensity = t.autoDensity, this.resizeCanvas(), this.transparent = !!t.transparent;
        }
        resizeCanvas() {
            this.autoDensity && "style" in this.resource && (this.resource.style.width = `${this.width}px`, this.resource.style.height = `${this.height}px`), (this.resource.width !== this.pixelWidth || this.resource.height !== this.pixelHeight) && (this.resource.width = this.pixelWidth, this.resource.height = this.pixelHeight);
        }
        resize(t = this.width, e = this.height, s = this._resolution) {
            const i = super.resize(t, e, s);
            return i && this.resizeCanvas(), i;
        }
        static test(t) {
            return globalThis.HTMLCanvasElement && t instanceof HTMLCanvasElement || globalThis.OffscreenCanvas && t instanceof OffscreenCanvas;
        }
        get context2D() {
            return this._context2D || (this._context2D = this.resource.getContext("2d"));
        }
    };
    On.extension = ht.TextureSource;
    bs = class extends qt {
        constructor(t){
            if (t.resource && globalThis.HTMLImageElement && t.resource instanceof HTMLImageElement) {
                const e = ne.get().createCanvas(t.resource.width, t.resource.height);
                e.getContext("2d").drawImage(t.resource, 0, 0, t.resource.width, t.resource.height), t.resource = e, Dt("ImageSource: Image element passed, converting to canvas. Use CanvasSource instead.");
            }
            super(t), this.uploadMethodId = "image", this.autoGarbageCollect = !0;
        }
        static test(t) {
            return globalThis.HTMLImageElement && t instanceof HTMLImageElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap || globalThis.VideoFrame && t instanceof VideoFrame;
        }
    };
    bs.extension = ht.TextureSource;
    mr = ((r)=>(r[r.INTERACTION = 50] = "INTERACTION", r[r.HIGH = 25] = "HIGH", r[r.NORMAL = 0] = "NORMAL", r[r.LOW = -25] = "LOW", r[r.UTILITY = -50] = "UTILITY", r))(mr || {});
    class Ws {
        constructor(t, e = null, s = 0, i = !1){
            this.next = null, this.previous = null, this._destroyed = !1, this._fn = t, this._context = e, this.priority = s, this._once = i;
        }
        match(t, e = null) {
            return this._fn === t && this._context === e;
        }
        emit(t) {
            this._fn && (this._context ? this._fn.call(this._context, t) : this._fn(t));
            const e = this.next;
            return this._once && this.destroy(!0), this._destroyed && (this.next = null), e;
        }
        connect(t) {
            this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this;
        }
        destroy(t = !1) {
            this._destroyed = !0, this._fn = null, this._context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
            const e = this.next;
            return this.next = t ? null : e, this.previous = null, e;
        }
    }
    const zn = class It {
        constructor(){
            this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new Ws(null, null, 1 / 0), this.deltaMS = 1 / It.targetFPMS, this.elapsedMS = 1 / It.targetFPMS, this._tick = (t)=>{
                this._requestId = null, this.started && (this.update(t), this.started && this._requestId === null && this._head.next && (this._requestId = requestAnimationFrame(this._tick)));
            };
        }
        _requestIfNeeded() {
            this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
        }
        _cancelIfNeeded() {
            this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
        }
        _startIfPossible() {
            this.started ? this._requestIfNeeded() : this.autoStart && this.start();
        }
        add(t, e, s = mr.NORMAL) {
            return this._addListener(new Ws(t, e, s));
        }
        addOnce(t, e, s = mr.NORMAL) {
            return this._addListener(new Ws(t, e, s, !0));
        }
        _addListener(t) {
            let e = this._head.next, s = this._head;
            if (!e) t.connect(s);
            else {
                for(; e;){
                    if (t.priority > e.priority) {
                        t.connect(s);
                        break;
                    }
                    s = e, e = e.next;
                }
                t.previous || t.connect(s);
            }
            return this._startIfPossible(), this;
        }
        remove(t, e) {
            let s = this._head.next;
            for(; s;)s.match(t, e) ? s = s.destroy() : s = s.next;
            return this._head.next || this._cancelIfNeeded(), this;
        }
        get count() {
            if (!this._head) return 0;
            let t = 0, e = this._head;
            for(; e = e.next;)t++;
            return t;
        }
        start() {
            this.started || (this.started = !0, this._requestIfNeeded());
        }
        stop() {
            this.started && (this.started = !1, this._cancelIfNeeded());
        }
        destroy() {
            if (!this._protected) {
                this.stop();
                let t = this._head.next;
                for(; t;)t = t.destroy(!0);
                this._head.destroy(), this._head = null;
            }
        }
        update(t = performance.now()) {
            let e;
            if (t > this.lastTime) {
                if (e = this.elapsedMS = t - this.lastTime, e > this._maxElapsedMS && (e = this._maxElapsedMS), e *= this.speed, this._minElapsedMS) {
                    const n = t - this._lastFrame | 0;
                    if (n < this._minElapsedMS) return;
                    this._lastFrame = t - n % this._minElapsedMS;
                }
                this.deltaMS = e, this.deltaTime = this.deltaMS * It.targetFPMS;
                const s = this._head;
                let i = s.next;
                for(; i;)i = i.emit(this);
                s.next || this._cancelIfNeeded();
            } else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
            this.lastTime = t;
        }
        get FPS() {
            return 1e3 / this.elapsedMS;
        }
        get minFPS() {
            return 1e3 / this._maxElapsedMS;
        }
        set minFPS(t) {
            const e = Math.min(this.maxFPS, t), s = Math.min(Math.max(0, e) / 1e3, It.targetFPMS);
            this._maxElapsedMS = 1 / s;
        }
        get maxFPS() {
            return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
        }
        set maxFPS(t) {
            if (t === 0) this._minElapsedMS = 0;
            else {
                const e = Math.max(this.minFPS, t);
                this._minElapsedMS = 1 / (e / 1e3);
            }
        }
        static get shared() {
            if (!It._shared) {
                const t = It._shared = new It;
                t.autoStart = !0, t._protected = !0;
            }
            return It._shared;
        }
        static get system() {
            if (!It._system) {
                const t = It._system = new It;
                t.autoStart = !0, t._protected = !0;
            }
            return It._system;
        }
    };
    zn.targetFPMS = .06;
    let Ys;
    os = zn;
    async function Yl() {
        return Ys ?? (Ys = (async ()=>{
            const t = document.createElement("canvas").getContext("webgl");
            if (!t) return "premultiply-alpha-on-upload";
            const e = await new Promise((o)=>{
                const a = document.createElement("video");
                a.onloadeddata = ()=>o(a), a.onerror = ()=>o(null), a.autoplay = !1, a.crossOrigin = "anonymous", a.preload = "auto", a.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=", a.load();
            });
            if (!e) return "premultiply-alpha-on-upload";
            const s = t.createTexture();
            t.bindTexture(t.TEXTURE_2D, s);
            const i = t.createFramebuffer();
            t.bindFramebuffer(t.FRAMEBUFFER, i), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, s, 0), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
            const n = new Uint8Array(4);
            return t.readPixels(0, 0, 1, 1, t.RGBA, t.UNSIGNED_BYTE, n), t.deleteFramebuffer(i), t.deleteTexture(s), t.getExtension("WEBGL_lose_context")?.loseContext(), n[0] <= n[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload";
        })()), Ys;
    }
    const Ps = class Ln extends qt {
        constructor(t){
            super(t), this.isReady = !1, this.uploadMethodId = "video", t = {
                ...Ln.defaultOptions,
                ...t
            }, this._autoUpdate = !0, this._isConnectedToTicker = !1, this._updateFPS = t.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = t.autoPlay !== !1, this.alphaMode = t.alphaMode ?? "premultiply-alpha-on-upload", this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onCanPlayThrough = this._onCanPlayThrough.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), t.autoLoad !== !1 && this.load();
        }
        updateFrame() {
            if (!this.destroyed) {
                if (this._updateFPS) {
                    const t = os.shared.elapsedMS * this.resource.playbackRate;
                    this._msToNextUpdate = Math.floor(this._msToNextUpdate - t);
                }
                (!this._updateFPS || this._msToNextUpdate <= 0) && (this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0), this.isValid && this.update();
            }
        }
        _videoFrameRequestCallback() {
            this.updateFrame(), this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback);
        }
        get isValid() {
            return !!this.resource.videoWidth && !!this.resource.videoHeight;
        }
        async load() {
            if (this._load) return this._load;
            const t = this.resource, e = this.options;
            return (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0), t.addEventListener("play", this._onPlayStart), t.addEventListener("pause", this._onPlayStop), t.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._mediaReady() : (e.preload || t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlayThrough), t.addEventListener("error", this._onError, !0)), this.alphaMode = await Yl(), this._load = new Promise((s, i)=>{
                this.isValid ? s(this) : (this._resolve = s, this._reject = i, e.preloadTimeoutMs !== void 0 && (this._preloadTimeout = setTimeout(()=>{
                    this._onError(new ErrorEvent(`Preload exceeded timeout of ${e.preloadTimeoutMs}ms`));
                })), t.load());
            }), this._load;
        }
        _onError(t) {
            this.resource.removeEventListener("error", this._onError, !0), this.emit("error", t), this._reject && (this._reject(t), this._reject = null, this._resolve = null);
        }
        _isSourcePlaying() {
            const t = this.resource;
            return !t.paused && !t.ended;
        }
        _isSourceReady() {
            return this.resource.readyState > 2;
        }
        _onPlayStart() {
            this.isValid || this._mediaReady(), this._configureAutoUpdate();
        }
        _onPlayStop() {
            this._configureAutoUpdate();
        }
        _onSeeked() {
            this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0, this.updateFrame(), this._msToNextUpdate = 0);
        }
        _onCanPlay() {
            this.resource.removeEventListener("canplay", this._onCanPlay), this._mediaReady();
        }
        _onCanPlayThrough() {
            this.resource.removeEventListener("canplaythrough", this._onCanPlay), this._preloadTimeout && (clearTimeout(this._preloadTimeout), this._preloadTimeout = void 0), this._mediaReady();
        }
        _mediaReady() {
            const t = this.resource;
            this.isValid && (this.isReady = !0, this.resize(t.videoWidth, t.videoHeight)), this._msToNextUpdate = 0, this.updateFrame(), this._msToNextUpdate = 0, this._resolve && (this._resolve(this), this._resolve = null, this._reject = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.resource.play();
        }
        destroy() {
            this._configureAutoUpdate();
            const t = this.resource;
            t && (t.removeEventListener("play", this._onPlayStart), t.removeEventListener("pause", this._onPlayStop), t.removeEventListener("seeked", this._onSeeked), t.removeEventListener("canplay", this._onCanPlay), t.removeEventListener("canplaythrough", this._onCanPlayThrough), t.removeEventListener("error", this._onError, !0), t.pause(), t.src = "", t.load()), super.destroy();
        }
        get autoUpdate() {
            return this._autoUpdate;
        }
        set autoUpdate(t) {
            t !== this._autoUpdate && (this._autoUpdate = t, this._configureAutoUpdate());
        }
        get updateFPS() {
            return this._updateFPS;
        }
        set updateFPS(t) {
            t !== this._updateFPS && (this._updateFPS = t, this._configureAutoUpdate());
        }
        _configureAutoUpdate() {
            this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.resource.requestVideoFrameCallback ? (this._isConnectedToTicker && (os.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback))) : (this._videoFrameRequestCallbackHandle !== null && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (os.shared.add(this.updateFrame, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (os.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0));
        }
        static test(t) {
            return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement;
        }
    };
    Ps.extension = ht.TextureSource;
    Ps.defaultOptions = {
        ...qt.defaultOptions,
        autoLoad: !0,
        autoPlay: !0,
        updateFPS: 0,
        crossorigin: !0,
        loop: !1,
        muted: !0,
        playsinline: !0,
        preload: !1
    };
    Ps.MIME_TYPES = {
        ogv: "video/ogg",
        mov: "video/quicktime",
        m4v: "video/mp4"
    };
    let Xl = Ps;
    const Ae = (r, t, e = !1)=>(Array.isArray(r) || (r = [
            r
        ]), t ? r.map((s)=>typeof s == "string" || e ? t(s) : s) : r);
    class jl {
        constructor(){
            this._parsers = [], this._cache = new Map, this._cacheMap = new Map;
        }
        reset() {
            this._cacheMap.clear(), this._cache.clear();
        }
        has(t) {
            return this._cache.has(t);
        }
        get(t) {
            const e = this._cache.get(t);
            return e || Dt(`[Assets] Asset id ${t} was not found in the Cache`), e;
        }
        set(t, e) {
            const s = Ae(t);
            let i;
            for(let l = 0; l < this.parsers.length; l++){
                const u = this.parsers[l];
                if (u.test(e)) {
                    i = u.getCacheableAssets(s, e);
                    break;
                }
            }
            const n = new Map(Object.entries(i || {}));
            i || s.forEach((l)=>{
                n.set(l, e);
            });
            const o = [
                ...n.keys()
            ], a = {
                cacheKeys: o,
                keys: s
            };
            s.forEach((l)=>{
                this._cacheMap.set(l, a);
            }), o.forEach((l)=>{
                const u = i ? i[l] : e;
                this._cache.has(l) && this._cache.get(l) !== u && Dt("[Cache] already has key:", l), this._cache.set(l, n.get(l));
            });
        }
        remove(t) {
            if (!this._cacheMap.has(t)) {
                Dt(`[Assets] Asset id ${t} was not found in the Cache`);
                return;
            }
            const e = this._cacheMap.get(t);
            e.cacheKeys.forEach((i)=>{
                this._cache.delete(i);
            }), e.keys.forEach((i)=>{
                this._cacheMap.delete(i);
            });
        }
        get parsers() {
            return this._parsers;
        }
    }
    let gr;
    Te = new jl;
    gr = [];
    Vt.handleByList(ht.TextureSource, gr);
    function Un(r = {}) {
        const t = r && r.resource, e = t ? r.resource : r, s = t ? r : {
            resource: r
        };
        for(let i = 0; i < gr.length; i++){
            const n = gr[i];
            if (n.test(e)) return new n(s);
        }
        throw new Error(`Could not find a source type for resource: ${s.resource}`);
    }
    function ql(r = {}, t = !1) {
        const e = r && r.resource, s = e ? r.resource : r, i = e ? r : {
            resource: r
        };
        if (!t && Te.has(s)) return Te.get(s);
        const n = new ut({
            source: Un(i)
        });
        return n.on("destroy", ()=>{
            Te.has(s) && Te.remove(s);
        }), t || Te.set(s, n), n;
    }
    function Kl(r, t = !1) {
        return typeof r == "string" ? Te.get(r) : r instanceof qt ? new ut({
            source: r
        }) : ql(r, t);
    }
    ut.from = Kl;
    qt.from = Un;
    Vt.add(Vn, Nn, $n, Xl, bs, On, Pr);
    var Hn = ((r)=>(r[r.Low = 0] = "Low", r[r.Normal = 1] = "Normal", r[r.High = 2] = "High", r))(Hn || {});
    function Nt(r) {
        if (typeof r != "string") throw new TypeError(`Path must be a string. Received ${JSON.stringify(r)}`);
    }
    function De(r) {
        return r.split("?")[0].split("#")[0];
    }
    function Zl(r) {
        return r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function Ql(r, t, e) {
        return r.replace(new RegExp(Zl(t), "g"), e);
    }
    function Jl(r, t) {
        let e = "", s = 0, i = -1, n = 0, o = -1;
        for(let a = 0; a <= r.length; ++a){
            if (a < r.length) o = r.charCodeAt(a);
            else {
                if (o === 47) break;
                o = 47;
            }
            if (o === 47) {
                if (!(i === a - 1 || n === 1)) if (i !== a - 1 && n === 2) {
                    if (e.length < 2 || s !== 2 || e.charCodeAt(e.length - 1) !== 46 || e.charCodeAt(e.length - 2) !== 46) {
                        if (e.length > 2) {
                            const l = e.lastIndexOf("/");
                            if (l !== e.length - 1) {
                                l === -1 ? (e = "", s = 0) : (e = e.slice(0, l), s = e.length - 1 - e.lastIndexOf("/")), i = a, n = 0;
                                continue;
                            }
                        } else if (e.length === 2 || e.length === 1) {
                            e = "", s = 0, i = a, n = 0;
                            continue;
                        }
                    }
                } else e.length > 0 ? e += `/${r.slice(i + 1, a)}` : e = r.slice(i + 1, a), s = a - i - 1;
                i = a, n = 0;
            } else o === 46 && n !== -1 ? ++n : n = -1;
        }
        return e;
    }
    const Ze = {
        toPosix (r) {
            return Ql(r, "\\", "/");
        },
        isUrl (r) {
            return /^https?:/.test(this.toPosix(r));
        },
        isDataUrl (r) {
            return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(r);
        },
        isBlobUrl (r) {
            return r.startsWith("blob:");
        },
        hasProtocol (r) {
            return /^[^/:]+:/.test(this.toPosix(r));
        },
        getProtocol (r) {
            Nt(r), r = this.toPosix(r);
            const t = /^file:\/\/\//.exec(r);
            if (t) return t[0];
            const e = /^[^/:]+:\/{0,2}/.exec(r);
            return e ? e[0] : "";
        },
        toAbsolute (r, t, e) {
            if (Nt(r), this.isDataUrl(r) || this.isBlobUrl(r)) return r;
            const s = De(this.toPosix(t ?? ne.get().getBaseUrl())), i = De(this.toPosix(e ?? this.rootname(s)));
            return r = this.toPosix(r), r.startsWith("/") ? Ze.join(i, r.slice(1)) : this.isAbsolute(r) ? r : this.join(s, r);
        },
        normalize (r) {
            if (Nt(r), r.length === 0) return ".";
            if (this.isDataUrl(r) || this.isBlobUrl(r)) return r;
            r = this.toPosix(r);
            let t = "";
            const e = r.startsWith("/");
            this.hasProtocol(r) && (t = this.rootname(r), r = r.slice(t.length));
            const s = r.endsWith("/");
            return r = Jl(r), r.length > 0 && s && (r += "/"), e ? `/${r}` : t + r;
        },
        isAbsolute (r) {
            return Nt(r), r = this.toPosix(r), this.hasProtocol(r) ? !0 : r.startsWith("/");
        },
        join (...r) {
            if (r.length === 0) return ".";
            let t;
            for(let e = 0; e < r.length; ++e){
                const s = r[e];
                if (Nt(s), s.length > 0) if (t === void 0) t = s;
                else {
                    const i = r[e - 1] ?? "";
                    this.joinExtensions.includes(this.extname(i).toLowerCase()) ? t += `/../${s}` : t += `/${s}`;
                }
            }
            return t === void 0 ? "." : this.normalize(t);
        },
        dirname (r) {
            if (Nt(r), r.length === 0) return ".";
            r = this.toPosix(r);
            let t = r.charCodeAt(0);
            const e = t === 47;
            let s = -1, i = !0;
            const n = this.getProtocol(r), o = r;
            r = r.slice(n.length);
            for(let a = r.length - 1; a >= 1; --a)if (t = r.charCodeAt(a), t === 47) {
                if (!i) {
                    s = a;
                    break;
                }
            } else i = !1;
            return s === -1 ? e ? "/" : this.isUrl(o) ? n + r : n : e && s === 1 ? "//" : n + r.slice(0, s);
        },
        rootname (r) {
            Nt(r), r = this.toPosix(r);
            let t = "";
            if (r.startsWith("/") ? t = "/" : t = this.getProtocol(r), this.isUrl(r)) {
                const e = r.indexOf("/", t.length);
                e !== -1 ? t = r.slice(0, e) : t = r, t.endsWith("/") || (t += "/");
            }
            return t;
        },
        basename (r, t) {
            Nt(r), t && Nt(t), r = De(this.toPosix(r));
            let e = 0, s = -1, i = !0, n;
            if (t !== void 0 && t.length > 0 && t.length <= r.length) {
                if (t.length === r.length && t === r) return "";
                let o = t.length - 1, a = -1;
                for(n = r.length - 1; n >= 0; --n){
                    const l = r.charCodeAt(n);
                    if (l === 47) {
                        if (!i) {
                            e = n + 1;
                            break;
                        }
                    } else a === -1 && (i = !1, a = n + 1), o >= 0 && (l === t.charCodeAt(o) ? --o === -1 && (s = n) : (o = -1, s = a));
                }
                return e === s ? s = a : s === -1 && (s = r.length), r.slice(e, s);
            }
            for(n = r.length - 1; n >= 0; --n)if (r.charCodeAt(n) === 47) {
                if (!i) {
                    e = n + 1;
                    break;
                }
            } else s === -1 && (i = !1, s = n + 1);
            return s === -1 ? "" : r.slice(e, s);
        },
        extname (r) {
            Nt(r), r = De(this.toPosix(r));
            let t = -1, e = 0, s = -1, i = !0, n = 0;
            for(let o = r.length - 1; o >= 0; --o){
                const a = r.charCodeAt(o);
                if (a === 47) {
                    if (!i) {
                        e = o + 1;
                        break;
                    }
                    continue;
                }
                s === -1 && (i = !1, s = o + 1), a === 46 ? t === -1 ? t = o : n !== 1 && (n = 1) : t !== -1 && (n = -1);
            }
            return t === -1 || s === -1 || n === 0 || n === 1 && t === s - 1 && t === e + 1 ? "" : r.slice(t, s);
        },
        parse (r) {
            Nt(r);
            const t = {
                root: "",
                dir: "",
                base: "",
                ext: "",
                name: ""
            };
            if (r.length === 0) return t;
            r = De(this.toPosix(r));
            let e = r.charCodeAt(0);
            const s = this.isAbsolute(r);
            let i;
            t.root = this.rootname(r), s || this.hasProtocol(r) ? i = 1 : i = 0;
            let n = -1, o = 0, a = -1, l = !0, u = r.length - 1, h = 0;
            for(; u >= i; --u){
                if (e = r.charCodeAt(u), e === 47) {
                    if (!l) {
                        o = u + 1;
                        break;
                    }
                    continue;
                }
                a === -1 && (l = !1, a = u + 1), e === 46 ? n === -1 ? n = u : h !== 1 && (h = 1) : n !== -1 && (h = -1);
            }
            return n === -1 || a === -1 || h === 0 || h === 1 && n === a - 1 && n === o + 1 ? a !== -1 && (o === 0 && s ? t.base = t.name = r.slice(1, a) : t.base = t.name = r.slice(o, a)) : (o === 0 && s ? (t.name = r.slice(1, n), t.base = r.slice(1, a)) : (t.name = r.slice(o, n), t.base = r.slice(o, a)), t.ext = r.slice(n, a)), t.dir = this.dirname(r), t;
        },
        sep: "/",
        delimiter: ":",
        joinExtensions: [
            ".html"
        ]
    };
    function Wn(r, t, e, s, i) {
        const n = t[e];
        for(let o = 0; o < n.length; o++){
            const a = n[o];
            e < t.length - 1 ? Wn(r.replace(s[e], a), t, e + 1, s, i) : i.push(r.replace(s[e], a));
        }
    }
    function th(r) {
        const t = /\{(.*?)\}/g, e = r.match(t), s = [];
        if (e) {
            const i = [];
            e.forEach((n)=>{
                const o = n.substring(1, n.length - 1).split(",");
                i.push(o);
            }), Wn(r, i, 0, e, s);
        } else s.push(r);
        return s;
    }
    const gi = (r)=>!Array.isArray(r);
    class Yn {
        constructor(){
            this._defaultBundleIdentifierOptions = {
                connector: "-",
                createBundleAssetId: (t, e)=>`${t}${this._bundleIdConnector}${e}`,
                extractAssetIdFromBundle: (t, e)=>e.replace(`${t}${this._bundleIdConnector}`, "")
            }, this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector, this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId, this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle, this._assetMap = {}, this._preferredOrder = [], this._parsers = [], this._resolverHash = {}, this._bundles = {};
        }
        setBundleIdentifier(t) {
            if (this._bundleIdConnector = t.connector ?? this._bundleIdConnector, this._createBundleAssetId = t.createBundleAssetId ?? this._createBundleAssetId, this._extractAssetIdFromBundle = t.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle, this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar") throw new Error("[Resolver] GenerateBundleAssetId are not working correctly");
        }
        prefer(...t) {
            t.forEach((e)=>{
                this._preferredOrder.push(e), e.priority || (e.priority = Object.keys(e.params));
            }), this._resolverHash = {};
        }
        set basePath(t) {
            this._basePath = t;
        }
        get basePath() {
            return this._basePath;
        }
        set rootPath(t) {
            this._rootPath = t;
        }
        get rootPath() {
            return this._rootPath;
        }
        get parsers() {
            return this._parsers;
        }
        reset() {
            this.setBundleIdentifier(this._defaultBundleIdentifierOptions), this._assetMap = {}, this._preferredOrder = [], this._resolverHash = {}, this._rootPath = null, this._basePath = null, this._manifest = null, this._bundles = {}, this._defaultSearchParams = null;
        }
        setDefaultSearchParams(t) {
            if (typeof t == "string") this._defaultSearchParams = t;
            else {
                const e = t;
                this._defaultSearchParams = Object.keys(e).map((s)=>`${encodeURIComponent(s)}=${encodeURIComponent(e[s])}`).join("&");
            }
        }
        getAlias(t) {
            const { alias: e, src: s } = t;
            return Ae(e || s, (n)=>typeof n == "string" ? n : Array.isArray(n) ? n.map((o)=>o?.src ?? o) : n?.src ? n.src : n, !0);
        }
        addManifest(t) {
            this._manifest && Dt("[Resolver] Manifest already exists, this will be overwritten"), this._manifest = t, t.bundles.forEach((e)=>{
                this.addBundle(e.name, e.assets);
            });
        }
        addBundle(t, e) {
            const s = [];
            let i = e;
            Array.isArray(e) || (i = Object.entries(e).map(([n, o])=>typeof o == "string" || Array.isArray(o) ? {
                    alias: n,
                    src: o
                } : {
                    alias: n,
                    ...o
                })), i.forEach((n)=>{
                const o = n.src, a = n.alias;
                let l;
                if (typeof a == "string") {
                    const u = this._createBundleAssetId(t, a);
                    s.push(u), l = [
                        a,
                        u
                    ];
                } else {
                    const u = a.map((h)=>this._createBundleAssetId(t, h));
                    s.push(...u), l = [
                        ...a,
                        ...u
                    ];
                }
                this.add({
                    ...n,
                    alias: l,
                    src: o
                });
            }), this._bundles[t] = s;
        }
        add(t) {
            const e = [];
            Array.isArray(t) ? e.push(...t) : e.push(t);
            let s;
            s = (n)=>{
                this.hasKey(n) && Dt(`[Resolver] already has key: ${n} overwriting`);
            }, Ae(e).forEach((n)=>{
                const { src: o } = n;
                let { data: a, format: l, loadParser: u } = n;
                const h = Ae(o).map((d)=>typeof d == "string" ? th(d) : Array.isArray(d) ? d : [
                        d
                    ]), c = this.getAlias(n);
                Array.isArray(c) ? c.forEach(s) : s(c);
                const p = [];
                h.forEach((d)=>{
                    d.forEach((g)=>{
                        let _ = {};
                        if (typeof g != "object") {
                            _.src = g;
                            for(let m = 0; m < this._parsers.length; m++){
                                const b = this._parsers[m];
                                if (b.test(g)) {
                                    _ = b.parse(g);
                                    break;
                                }
                            }
                        } else a = g.data ?? a, l = g.format ?? l, u = g.loadParser ?? u, _ = {
                            ..._,
                            ...g
                        };
                        if (!c) throw new Error(`[Resolver] alias is undefined for this asset: ${_.src}`);
                        _ = this._buildResolvedAsset(_, {
                            aliases: c,
                            data: a,
                            format: l,
                            loadParser: u
                        }), p.push(_);
                    });
                }), c.forEach((d)=>{
                    this._assetMap[d] = p;
                });
            });
        }
        resolveBundle(t) {
            const e = gi(t);
            t = Ae(t);
            const s = {};
            return t.forEach((i)=>{
                const n = this._bundles[i];
                if (n) {
                    const o = this.resolve(n), a = {};
                    for(const l in o){
                        const u = o[l];
                        a[this._extractAssetIdFromBundle(i, l)] = u;
                    }
                    s[i] = a;
                }
            }), e ? s[t[0]] : s;
        }
        resolveUrl(t) {
            const e = this.resolve(t);
            if (typeof t != "string") {
                const s = {};
                for(const i in e)s[i] = e[i].src;
                return s;
            }
            return e.src;
        }
        resolve(t) {
            const e = gi(t);
            t = Ae(t);
            const s = {};
            return t.forEach((i)=>{
                if (!this._resolverHash[i]) if (this._assetMap[i]) {
                    let n = this._assetMap[i];
                    const o = this._getPreferredOrder(n);
                    o?.priority.forEach((a)=>{
                        o.params[a].forEach((l)=>{
                            const u = n.filter((h)=>h[a] ? h[a] === l : !1);
                            u.length && (n = u);
                        });
                    }), this._resolverHash[i] = n[0];
                } else this._resolverHash[i] = this._buildResolvedAsset({
                    alias: [
                        i
                    ],
                    src: i
                }, {});
                s[i] = this._resolverHash[i];
            }), e ? s[t[0]] : s;
        }
        hasKey(t) {
            return !!this._assetMap[t];
        }
        hasBundle(t) {
            return !!this._bundles[t];
        }
        _getPreferredOrder(t) {
            for(let e = 0; e < t.length; e++){
                const s = t[e], i = this._preferredOrder.find((n)=>n.params.format.includes(s.format));
                if (i) return i;
            }
            return this._preferredOrder[0];
        }
        _appendDefaultSearchParams(t) {
            if (!this._defaultSearchParams) return t;
            const e = /\?/.test(t) ? "&" : "?";
            return `${t}${e}${this._defaultSearchParams}`;
        }
        _buildResolvedAsset(t, e) {
            const { aliases: s, data: i, loadParser: n, format: o } = e;
            return (this._basePath || this._rootPath) && (t.src = Ze.toAbsolute(t.src, this._basePath, this._rootPath)), t.alias = s ?? t.alias ?? [
                t.src
            ], t.src = this._appendDefaultSearchParams(t.src), t.data = {
                ...i || {},
                ...t.data
            }, t.loadParser = n ?? t.loadParser, t.format = o ?? t.format ?? eh(t.src), t;
        }
    }
    Yn.RETINA_PREFIX = /@([0-9\.]+)x/;
    function eh(r) {
        return r.split(".").pop().split("?").shift().split("#").shift();
    }
    const _i = (r, t)=>{
        const e = t.split("?")[1];
        return e && (r += `?${e}`), r;
    }, Xn = class $e {
        constructor(t, e){
            this.linkedSheets = [], this._texture = t instanceof ut ? t : null, this.textureSource = t.source, this.textures = {}, this.animations = {}, this.data = e;
            const s = parseFloat(e.meta.scale);
            s ? (this.resolution = s, t.source.resolution = this.resolution) : this.resolution = t.source._resolution, this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
        }
        parse() {
            return new Promise((t)=>{
                this._callback = t, this._batchIndex = 0, this._frameKeys.length <= $e.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch();
            });
        }
        _processFrames(t) {
            let e = t;
            const s = $e.BATCH_SIZE;
            for(; e - t < s && e < this._frameKeys.length;){
                const i = this._frameKeys[e], n = this._frames[i], o = n.frame;
                if (o) {
                    let a = null, l = null;
                    const u = n.trimmed !== !1 && n.sourceSize ? n.sourceSize : n.frame, h = new vt(0, 0, Math.floor(u.w) / this.resolution, Math.floor(u.h) / this.resolution);
                    n.rotated ? a = new vt(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.h) / this.resolution, Math.floor(o.w) / this.resolution) : a = new vt(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution), n.trimmed !== !1 && n.spriteSourceSize && (l = new vt(Math.floor(n.spriteSourceSize.x) / this.resolution, Math.floor(n.spriteSourceSize.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution)), this.textures[i] = new ut({
                        source: this.textureSource,
                        frame: a,
                        orig: h,
                        trim: l,
                        rotate: n.rotated ? 2 : 0,
                        defaultAnchor: n.anchor,
                        defaultBorders: n.borders,
                        label: i.toString()
                    });
                }
                e++;
            }
        }
        _processAnimations() {
            const t = this.data.animations || {};
            for(const e in t){
                this.animations[e] = [];
                for(let s = 0; s < t[e].length; s++){
                    const i = t[e][s];
                    this.animations[e].push(this.textures[i]);
                }
            }
        }
        _parseComplete() {
            const t = this._callback;
            this._callback = null, this._batchIndex = 0, t.call(this, this.textures);
        }
        _nextBatch() {
            this._processFrames(this._batchIndex * $e.BATCH_SIZE), this._batchIndex++, setTimeout(()=>{
                this._batchIndex * $e.BATCH_SIZE < this._frameKeys.length ? this._nextBatch() : (this._processAnimations(), this._parseComplete());
            }, 0);
        }
        destroy(t = !1) {
            for(const e in this.textures)this.textures[e].destroy();
            this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && (this._texture?.destroy(), this.textureSource.destroy()), this._texture = null, this.textureSource = null, this.linkedSheets = [];
        }
    };
    Xn.BATCH_SIZE = 1e3;
    let yi = Xn;
    const sh = [
        "jpg",
        "png",
        "jpeg",
        "avif",
        "webp",
        "basis",
        "etc2",
        "bc7",
        "bc6h",
        "bc5",
        "bc4",
        "bc3",
        "bc2",
        "bc1",
        "eac",
        "astc"
    ];
    function jn(r, t, e) {
        const s = {};
        if (r.forEach((i)=>{
            s[i] = t;
        }), Object.keys(t.textures).forEach((i)=>{
            s[i] = t.textures[i];
        }), !e) {
            const i = Ze.dirname(r[0]);
            t.linkedSheets.forEach((n, o)=>{
                const a = jn([
                    `${i}/${t.data.meta.related_multi_packs[o]}`
                ], n, !0);
                Object.assign(s, a);
            });
        }
        return s;
    }
    const rh = {
        extension: ht.Asset,
        cache: {
            test: (r)=>r instanceof yi,
            getCacheableAssets: (r, t)=>jn(r, t, !1)
        },
        resolver: {
            extension: {
                type: ht.ResolveParser,
                name: "resolveSpritesheet"
            },
            test: (r)=>{
                const e = r.split("?")[0].split("."), s = e.pop(), i = e.pop();
                return s === "json" && sh.includes(i);
            },
            parse: (r)=>{
                const t = r.split(".");
                return {
                    resolution: parseFloat(Yn.RETINA_PREFIX.exec(r)?.[1] ?? "1"),
                    format: t[t.length - 2],
                    src: r
                };
            }
        },
        loader: {
            name: "spritesheetLoader",
            extension: {
                type: ht.LoadParser,
                priority: Hn.Normal,
                name: "spritesheetLoader"
            },
            async testParse (r, t) {
                return Ze.extname(t.src).toLowerCase() === ".json" && !!r.frames;
            },
            async parse (r, t, e) {
                const { texture: s, imageFilename: i, textureOptions: n } = t?.data ?? {};
                let o = Ze.dirname(t.src);
                o && o.lastIndexOf("/") !== o.length - 1 && (o += "/");
                let a;
                if (s instanceof ut) a = s;
                else {
                    const h = _i(o + (i ?? r.meta.image), t.src);
                    a = (await e.load([
                        {
                            src: h,
                            data: n
                        }
                    ]))[h];
                }
                const l = new yi(a.source, r);
                await l.parse();
                const u = r?.meta?.related_multi_packs;
                if (Array.isArray(u)) {
                    const h = [];
                    for (const p of u){
                        if (typeof p != "string") continue;
                        let d = o + p;
                        t.data?.ignoreMultiPack || (d = _i(d, t.src), h.push(e.load({
                            src: d,
                            data: {
                                textureOptions: n,
                                ignoreMultiPack: !0
                            }
                        })));
                    }
                    const c = await Promise.all(h);
                    l.linkedSheets = c, c.forEach((p)=>{
                        p.linkedSheets = [
                            l
                        ].concat(l.linkedSheets.filter((d)=>d !== p));
                    });
                }
                return l;
            },
            async unload (r, t, e) {
                await e.unload(r.textureSource._sourceOrigin), r.destroy(!1);
            }
        }
    };
    Vt.add(rh);
    const Xs = Object.create(null), xi = Object.create(null);
    Rr = function(r, t) {
        let e = xi[r];
        return e === void 0 && (Xs[t] === void 0 && (Xs[t] = 1), xi[r] = e = Xs[t]++), e;
    };
    let as;
    function qn() {
        return (!as || as?.isContextLost()) && (as = ne.get().createCanvas().getContext("webgl", {})), as;
    }
    let ls;
    function ih() {
        if (!ls) {
            ls = "mediump";
            const r = qn();
            r && r.getShaderPrecisionFormat && (ls = r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.HIGH_FLOAT).precision ? "highp" : "mediump");
        }
        return ls;
    }
    function nh(r, t, e) {
        return t ? r : e ? (r = r.replace("out vec4 finalColor;", ""), `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${r}
        `) : `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${r}
        `;
    }
    function oh(r, t, e) {
        const s = e ? t.maxSupportedFragmentPrecision : t.maxSupportedVertexPrecision;
        if (r.substring(0, 9) !== "precision") {
            let i = e ? t.requestedFragmentPrecision : t.requestedVertexPrecision;
            return i === "highp" && s !== "highp" && (i = "mediump"), `precision ${i} float;
${r}`;
        } else if (s !== "highp" && r.substring(0, 15) === "precision highp") return r.replace("precision highp", "precision mediump");
        return r;
    }
    function ah(r, t) {
        return t ? `#version 300 es
${r}` : r;
    }
    const lh = {}, hh = {};
    function uh(r, { name: t = "pixi-program" }, e = !0) {
        t = t.replace(/\s+/g, "-"), t += e ? "-fragment" : "-vertex";
        const s = e ? lh : hh;
        return s[t] ? (s[t]++, t += `-${s[t]}`) : s[t] = 1, r.indexOf("#define SHADER_NAME") !== -1 ? r : `${`#define SHADER_NAME ${t}`}
${r}`;
    }
    function ch(r, t) {
        return t ? r.replace("#version 300 es", "") : r;
    }
    const js = {
        stripVersion: ch,
        ensurePrecision: oh,
        addProgramDefines: nh,
        setProgramName: uh,
        insertVersion: ah
    }, qs = Object.create(null), Kn = class _r {
        constructor(t){
            t = {
                ..._r.defaultOptions,
                ...t
            };
            const e = t.fragment.indexOf("#version 300 es") !== -1, s = {
                stripVersion: e,
                ensurePrecision: {
                    requestedFragmentPrecision: t.preferredFragmentPrecision,
                    requestedVertexPrecision: t.preferredVertexPrecision,
                    maxSupportedVertexPrecision: "highp",
                    maxSupportedFragmentPrecision: ih()
                },
                setProgramName: {
                    name: t.name
                },
                addProgramDefines: e,
                insertVersion: e
            };
            let i = t.fragment, n = t.vertex;
            Object.keys(js).forEach((o)=>{
                const a = s[o];
                i = js[o](i, a, !0), n = js[o](n, a, !1);
            }), this.fragment = i, this.vertex = n, this.transformFeedbackVaryings = t.transformFeedbackVaryings, this._key = Rr(`${this.vertex}:${this.fragment}`, "gl-program");
        }
        destroy() {
            this.fragment = null, this.vertex = null, this._attributeData = null, this._uniformData = null, this._uniformBlockData = null, this.transformFeedbackVaryings = null;
        }
        static from(t) {
            const e = `${t.vertex}:${t.fragment}`;
            return qs[e] || (qs[e] = new _r(t)), qs[e];
        }
    };
    Kn.defaultOptions = {
        preferredVertexPrecision: "highp",
        preferredFragmentPrecision: "mediump"
    };
    Zn = Kn;
    const bi = {
        uint8x2: {
            size: 2,
            stride: 2,
            normalised: !1
        },
        uint8x4: {
            size: 4,
            stride: 4,
            normalised: !1
        },
        sint8x2: {
            size: 2,
            stride: 2,
            normalised: !1
        },
        sint8x4: {
            size: 4,
            stride: 4,
            normalised: !1
        },
        unorm8x2: {
            size: 2,
            stride: 2,
            normalised: !0
        },
        unorm8x4: {
            size: 4,
            stride: 4,
            normalised: !0
        },
        snorm8x2: {
            size: 2,
            stride: 2,
            normalised: !0
        },
        snorm8x4: {
            size: 4,
            stride: 4,
            normalised: !0
        },
        uint16x2: {
            size: 2,
            stride: 4,
            normalised: !1
        },
        uint16x4: {
            size: 4,
            stride: 8,
            normalised: !1
        },
        sint16x2: {
            size: 2,
            stride: 4,
            normalised: !1
        },
        sint16x4: {
            size: 4,
            stride: 8,
            normalised: !1
        },
        unorm16x2: {
            size: 2,
            stride: 4,
            normalised: !0
        },
        unorm16x4: {
            size: 4,
            stride: 8,
            normalised: !0
        },
        snorm16x2: {
            size: 2,
            stride: 4,
            normalised: !0
        },
        snorm16x4: {
            size: 4,
            stride: 8,
            normalised: !0
        },
        float16x2: {
            size: 2,
            stride: 4,
            normalised: !1
        },
        float16x4: {
            size: 4,
            stride: 8,
            normalised: !1
        },
        float32: {
            size: 1,
            stride: 4,
            normalised: !1
        },
        float32x2: {
            size: 2,
            stride: 8,
            normalised: !1
        },
        float32x3: {
            size: 3,
            stride: 12,
            normalised: !1
        },
        float32x4: {
            size: 4,
            stride: 16,
            normalised: !1
        },
        uint32: {
            size: 1,
            stride: 4,
            normalised: !1
        },
        uint32x2: {
            size: 2,
            stride: 8,
            normalised: !1
        },
        uint32x3: {
            size: 3,
            stride: 12,
            normalised: !1
        },
        uint32x4: {
            size: 4,
            stride: 16,
            normalised: !1
        },
        sint32: {
            size: 1,
            stride: 4,
            normalised: !1
        },
        sint32x2: {
            size: 2,
            stride: 8,
            normalised: !1
        },
        sint32x3: {
            size: 3,
            stride: 12,
            normalised: !1
        },
        sint32x4: {
            size: 4,
            stride: 16,
            normalised: !1
        }
    };
    dh = function(r) {
        return bi[r] ?? bi.float32;
    };
    const fh = {
        f32: "float32",
        "vec2<f32>": "float32x2",
        "vec3<f32>": "float32x3",
        "vec4<f32>": "float32x4",
        vec2f: "float32x2",
        vec3f: "float32x3",
        vec4f: "float32x4",
        i32: "sint32",
        "vec2<i32>": "sint32x2",
        "vec3<i32>": "sint32x3",
        "vec4<i32>": "sint32x4",
        u32: "uint32",
        "vec2<u32>": "uint32x2",
        "vec3<u32>": "uint32x3",
        "vec4<u32>": "uint32x4",
        bool: "uint32",
        "vec2<bool>": "uint32x2",
        "vec3<bool>": "uint32x3",
        "vec4<bool>": "uint32x4"
    };
    function ph({ source: r, entryPoint: t }) {
        const e = {}, s = r.indexOf(`fn ${t}`);
        if (s !== -1) {
            const i = r.indexOf("->", s);
            if (i !== -1) {
                const n = r.substring(s, i), o = /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;
                let a;
                for(; (a = o.exec(n)) !== null;){
                    const l = fh[a[3]] ?? "float32";
                    e[a[2]] = {
                        location: parseInt(a[1], 10),
                        format: l,
                        stride: dh(l).stride,
                        offset: 0,
                        instance: !1,
                        start: 0
                    };
                }
            }
        }
        return e;
    }
    function Ks(r) {
        const t = /(^|[^/])@(group|binding)\(\d+\)[^;]+;/g, e = /@group\((\d+)\)/, s = /@binding\((\d+)\)/, i = /var(<[^>]+>)? (\w+)/, n = /:\s*(\w+)/, o = /struct\s+(\w+)\s*{([^}]+)}/g, a = /(\w+)\s*:\s*([\w\<\>]+)/g, l = /struct\s+(\w+)/, u = r.match(t)?.map((c)=>({
                group: parseInt(c.match(e)[1], 10),
                binding: parseInt(c.match(s)[1], 10),
                name: c.match(i)[2],
                isUniform: c.match(i)[1] === "<uniform>",
                type: c.match(n)[1]
            }));
        if (!u) return {
            groups: [],
            structs: []
        };
        const h = r.match(o)?.map((c)=>{
            const p = c.match(l)[1], d = c.match(a).reduce((g, _)=>{
                const [m, b] = _.split(":");
                return g[m.trim()] = b.trim(), g;
            }, {});
            return d ? {
                name: p,
                members: d
            } : null;
        }).filter(({ name: c })=>u.some((p)=>p.type === c)) ?? [];
        return {
            groups: u,
            structs: h
        };
    }
    var Oe = ((r)=>(r[r.VERTEX = 1] = "VERTEX", r[r.FRAGMENT = 2] = "FRAGMENT", r[r.COMPUTE = 4] = "COMPUTE", r))(Oe || {});
    function mh({ groups: r }) {
        const t = [];
        for(let e = 0; e < r.length; e++){
            const s = r[e];
            t[s.group] || (t[s.group] = []), s.isUniform ? t[s.group].push({
                binding: s.binding,
                visibility: Oe.VERTEX | Oe.FRAGMENT,
                buffer: {
                    type: "uniform"
                }
            }) : s.type === "sampler" ? t[s.group].push({
                binding: s.binding,
                visibility: Oe.FRAGMENT,
                sampler: {
                    type: "filtering"
                }
            }) : s.type === "texture_2d" && t[s.group].push({
                binding: s.binding,
                visibility: Oe.FRAGMENT,
                texture: {
                    sampleType: "float",
                    viewDimension: "2d",
                    multisampled: !1
                }
            });
        }
        return t;
    }
    function gh({ groups: r }) {
        const t = [];
        for(let e = 0; e < r.length; e++){
            const s = r[e];
            t[s.group] || (t[s.group] = {}), t[s.group][s.name] = s.binding;
        }
        return t;
    }
    function _h(r, t) {
        const e = new Set, s = new Set, i = [
            ...r.structs,
            ...t.structs
        ].filter((o)=>e.has(o.name) ? !1 : (e.add(o.name), !0)), n = [
            ...r.groups,
            ...t.groups
        ].filter((o)=>{
            const a = `${o.name}-${o.binding}`;
            return s.has(a) ? !1 : (s.add(a), !0);
        });
        return {
            structs: i,
            groups: n
        };
    }
    const Zs = Object.create(null);
    Ms = class {
        constructor(t){
            this._layoutKey = 0, this._attributeLocationsKey = 0;
            const { fragment: e, vertex: s, layout: i, gpuLayout: n, name: o } = t;
            if (this.name = o, this.fragment = e, this.vertex = s, e.source === s.source) {
                const a = Ks(e.source);
                this.structsAndGroups = a;
            } else {
                const a = Ks(s.source), l = Ks(e.source);
                this.structsAndGroups = _h(a, l);
            }
            this.layout = i ?? gh(this.structsAndGroups), this.gpuLayout = n ?? mh(this.structsAndGroups), this.autoAssignGlobalUniforms = this.layout[0]?.globalUniforms !== void 0, this.autoAssignLocalUniforms = this.layout[1]?.localUniforms !== void 0, this._generateProgramKey();
        }
        _generateProgramKey() {
            const { vertex: t, fragment: e } = this, s = t.source + e.source + t.entryPoint + e.entryPoint;
            this._layoutKey = Rr(s, "program");
        }
        get attributeData() {
            return this._attributeData ?? (this._attributeData = ph(this.vertex)), this._attributeData;
        }
        destroy() {
            this.gpuLayout = null, this.layout = null, this.structsAndGroups = null, this.fragment = null, this.vertex = null;
        }
        static from(t) {
            const e = `${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;
            return Zs[e] || (Zs[e] = new Ms(t)), Zs[e];
        }
    };
    const Qn = [
        "f32",
        "i32",
        "vec2<f32>",
        "vec3<f32>",
        "vec4<f32>",
        "mat2x2<f32>",
        "mat3x3<f32>",
        "mat4x4<f32>",
        "mat3x2<f32>",
        "mat4x2<f32>",
        "mat2x3<f32>",
        "mat4x3<f32>",
        "mat2x4<f32>",
        "mat3x4<f32>",
        "vec2<i32>",
        "vec3<i32>",
        "vec4<i32>"
    ], yh = Qn.reduce((r, t)=>(r[t] = !0, r), {});
    function xh(r, t) {
        switch(r){
            case "f32":
                return 0;
            case "vec2<f32>":
                return new Float32Array(2 * t);
            case "vec3<f32>":
                return new Float32Array(3 * t);
            case "vec4<f32>":
                return new Float32Array(4 * t);
            case "mat2x2<f32>":
                return new Float32Array([
                    1,
                    0,
                    0,
                    1
                ]);
            case "mat3x3<f32>":
                return new Float32Array([
                    1,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    1
                ]);
            case "mat4x4<f32>":
                return new Float32Array([
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1
                ]);
        }
        return null;
    }
    const Jn = class to {
        constructor(t, e){
            this._touched = 0, this.uid = _t("uniform"), this._resourceType = "uniformGroup", this._resourceId = _t("resource"), this.isUniformGroup = !0, this._dirtyId = 0, this.destroyed = !1, e = {
                ...to.defaultOptions,
                ...e
            }, this.uniformStructures = t;
            const s = {};
            for(const i in t){
                const n = t[i];
                if (n.name = i, n.size = n.size ?? 1, !yh[n.type]) throw new Error(`Uniform type ${n.type} is not supported. Supported uniform types are: ${Qn.join(", ")}`);
                n.value ?? (n.value = xh(n.type, n.size)), s[i] = n.value;
            }
            this.uniforms = s, this._dirtyId = 1, this.ubo = e.ubo, this.isStatic = e.isStatic, this._signature = Rr(Object.keys(s).map((i)=>`${i}-${t[i].type}`).join("-"), "uniform-group");
        }
        update() {
            this._dirtyId++;
        }
    };
    Jn.defaultOptions = {
        ubo: !1,
        isStatic: !1
    };
    eo = Jn;
    ms = class {
        constructor(t){
            this.resources = Object.create(null), this._dirty = !0;
            let e = 0;
            for(const s in t){
                const i = t[s];
                this.setResource(i, e++);
            }
            this._updateKey();
        }
        _updateKey() {
            if (!this._dirty) return;
            this._dirty = !1;
            const t = [];
            let e = 0;
            for(const s in this.resources)t[e++] = this.resources[s]._resourceId;
            this._key = t.join("|");
        }
        setResource(t, e) {
            const s = this.resources[e];
            t !== s && (s && t.off?.("change", this.onResourceChange, this), t.on?.("change", this.onResourceChange, this), this.resources[e] = t, this._dirty = !0);
        }
        getResource(t) {
            return this.resources[t];
        }
        _touch(t) {
            const e = this.resources;
            for(const s in e)e[s]._touched = t;
        }
        destroy() {
            const t = this.resources;
            for(const e in t)t[e].off?.("change", this.onResourceChange, this);
            this.resources = null;
        }
        onResourceChange(t) {
            if (this._dirty = !0, t.destroyed) {
                const e = this.resources;
                for(const s in e)e[s] === t && (e[s] = null);
            } else this._updateKey();
        }
    };
    yr = ((r)=>(r[r.WEBGL = 1] = "WEBGL", r[r.WEBGPU = 2] = "WEBGPU", r[r.BOTH = 3] = "BOTH", r))(yr || {});
    Er = class extends re {
        constructor(t){
            super(), this.uid = _t("shader"), this._uniformBindMap = Object.create(null), this._ownedBindGroups = [];
            let { gpuProgram: e, glProgram: s, groups: i, resources: n, compatibleRenderers: o, groupMap: a } = t;
            this.gpuProgram = e, this.glProgram = s, o === void 0 && (o = 0, e && (o |= yr.WEBGPU), s && (o |= yr.WEBGL)), this.compatibleRenderers = o;
            const l = {};
            if (!n && !i && (n = {}), n && i) throw new Error("[Shader] Cannot have both resources and groups");
            if (!e && i && !a) throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");
            if (!e && i && a) for(const u in a)for(const h in a[u]){
                const c = a[u][h];
                l[c] = {
                    group: u,
                    binding: h,
                    name: c
                };
            }
            else if (e && i && !a) {
                const u = e.structsAndGroups.groups;
                a = {}, u.forEach((h)=>{
                    a[h.group] = a[h.group] || {}, a[h.group][h.binding] = h.name, l[h.name] = h;
                });
            } else if (n) {
                i = {}, a = {}, e && e.structsAndGroups.groups.forEach((c)=>{
                    a[c.group] = a[c.group] || {}, a[c.group][c.binding] = c.name, l[c.name] = c;
                });
                let u = 0;
                for(const h in n)l[h] || (i[99] || (i[99] = new ms, this._ownedBindGroups.push(i[99])), l[h] = {
                    group: 99,
                    binding: u,
                    name: h
                }, a[99] = a[99] || {}, a[99][u] = h, u++);
                for(const h in n){
                    const c = h;
                    let p = n[h];
                    !p.source && !p._resourceType && (p = new eo(p));
                    const d = l[c];
                    d && (i[d.group] || (i[d.group] = new ms, this._ownedBindGroups.push(i[d.group])), i[d.group].setResource(p, d.binding));
                }
            }
            this.groups = i, this._uniformBindMap = a, this.resources = this._buildResourceAccessor(i, l);
        }
        addResource(t, e, s) {
            var i, n;
            (i = this._uniformBindMap)[e] || (i[e] = {}), (n = this._uniformBindMap[e])[s] || (n[s] = t), this.groups[e] || (this.groups[e] = new ms, this._ownedBindGroups.push(this.groups[e]));
        }
        _buildResourceAccessor(t, e) {
            const s = {};
            for(const i in e){
                const n = e[i];
                Object.defineProperty(s, n.name, {
                    get () {
                        return t[n.group].getResource(n.binding);
                    },
                    set (o) {
                        t[n.group].setResource(o, n.binding);
                    }
                });
            }
            return s;
        }
        destroy(t = !1) {
            this.emit("destroy", this), t && (this.gpuProgram?.destroy(), this.glProgram?.destroy()), this.gpuProgram = null, this.glProgram = null, this.removeAllListeners(), this._uniformBindMap = null, this._ownedBindGroups.forEach((e)=>{
                e.destroy();
            }), this._ownedBindGroups = null, this.resources = null, this.groups = null;
        }
        static from(t) {
            const { gpu: e, gl: s, ...i } = t;
            let n, o;
            return e && (n = Ms.from(e)), s && (o = Zn.from(s)), new Er({
                gpuProgram: n,
                glProgram: o,
                ...i
            });
        }
    };
    const xr = [];
    Vt.handleByNamedList(ht.Environment, xr);
    async function bh(r) {
        if (!r) for(let t = 0; t < xr.length; t++){
            const e = xr[t];
            if (e.value.test()) {
                await e.value.load();
                return;
            }
        }
    }
    let Be;
    vh = function() {
        if (typeof Be == "boolean") return Be;
        try {
            Be = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({
                a: "b"
            }, "a", "b") === !0;
        } catch  {
            Be = !1;
        }
        return Be;
    };
    var hs = {
        exports: {}
    }, vi;
    function wh() {
        if (vi) return hs.exports;
        vi = 1, hs.exports = r, hs.exports.default = r;
        function r(f, x, C) {
            C = C || 2;
            var A = x && x.length, I = A ? x[0] * C : f.length, F = t(f, 0, I, C, !0), T = [];
            if (!F || F.next === F.prev) return T;
            var R, U, W, q, at, tt, gt;
            if (A && (F = l(f, x, F, C)), f.length > 80 * C) {
                R = W = f[0], U = q = f[1];
                for(var rt = C; rt < I; rt += C)at = f[rt], tt = f[rt + 1], at < R && (R = at), tt < U && (U = tt), at > W && (W = at), tt > q && (q = tt);
                gt = Math.max(W - R, q - U), gt = gt !== 0 ? 32767 / gt : 0;
            }
            return s(F, T, C, R, U, gt, 0), T;
        }
        function t(f, x, C, A, I) {
            var F, T;
            if (I === Z(f, x, C, A) > 0) for(F = x; F < C; F += A)T = k(F, f[F], f[F + 1], T);
            else for(F = C - A; F >= x; F -= A)T = k(F, f[F], f[F + 1], T);
            return T && B(T, T.next) && (V(T), T = T.next), T;
        }
        function e(f, x) {
            if (!f) return f;
            x || (x = f);
            var C = f, A;
            do if (A = !1, !C.steiner && (B(C, C.next) || S(C.prev, C, C.next) === 0)) {
                if (V(C), C = x = C.prev, C === C.next) break;
                A = !0;
            } else C = C.next;
            while (A || C !== x);
            return x;
        }
        function s(f, x, C, A, I, F, T) {
            if (f) {
                !T && F && d(f, A, I, F);
                for(var R = f, U, W; f.prev !== f.next;){
                    if (U = f.prev, W = f.next, F ? n(f, A, I, F) : i(f)) {
                        x.push(U.i / C | 0), x.push(f.i / C | 0), x.push(W.i / C | 0), V(f), f = W.next, R = W.next;
                        continue;
                    }
                    if (f = W, f === R) {
                        T ? T === 1 ? (f = o(e(f), x, C), s(f, x, C, A, I, F, 2)) : T === 2 && a(f, x, C, A, I, F) : s(e(f), x, C, A, I, F, 1);
                        break;
                    }
                }
            }
        }
        function i(f) {
            var x = f.prev, C = f, A = f.next;
            if (S(x, C, A) >= 0) return !1;
            for(var I = x.x, F = C.x, T = A.x, R = x.y, U = C.y, W = A.y, q = I < F ? I < T ? I : T : F < T ? F : T, at = R < U ? R < W ? R : W : U < W ? U : W, tt = I > F ? I > T ? I : T : F > T ? F : T, gt = R > U ? R > W ? R : W : U > W ? U : W, rt = A.next; rt !== x;){
                if (rt.x >= q && rt.x <= tt && rt.y >= at && rt.y <= gt && b(I, R, F, U, T, W, rt.x, rt.y) && S(rt.prev, rt, rt.next) >= 0) return !1;
                rt = rt.next;
            }
            return !0;
        }
        function n(f, x, C, A) {
            var I = f.prev, F = f, T = f.next;
            if (S(I, F, T) >= 0) return !1;
            for(var R = I.x, U = F.x, W = T.x, q = I.y, at = F.y, tt = T.y, gt = R < U ? R < W ? R : W : U < W ? U : W, rt = q < at ? q < tt ? q : tt : at < tt ? at : tt, Kt = R > U ? R > W ? R : W : U > W ? U : W, Mt = q > at ? q > tt ? q : tt : at > tt ? at : tt, Lt = _(gt, rt, x, C, A), Ut = _(Kt, Mt, x, C, A), J = f.prevZ, st = f.nextZ; J && J.z >= Lt && st && st.z <= Ut;){
                if (J.x >= gt && J.x <= Kt && J.y >= rt && J.y <= Mt && J !== I && J !== T && b(R, q, U, at, W, tt, J.x, J.y) && S(J.prev, J, J.next) >= 0 || (J = J.prevZ, st.x >= gt && st.x <= Kt && st.y >= rt && st.y <= Mt && st !== I && st !== T && b(R, q, U, at, W, tt, st.x, st.y) && S(st.prev, st, st.next) >= 0)) return !1;
                st = st.nextZ;
            }
            for(; J && J.z >= Lt;){
                if (J.x >= gt && J.x <= Kt && J.y >= rt && J.y <= Mt && J !== I && J !== T && b(R, q, U, at, W, tt, J.x, J.y) && S(J.prev, J, J.next) >= 0) return !1;
                J = J.prevZ;
            }
            for(; st && st.z <= Ut;){
                if (st.x >= gt && st.x <= Kt && st.y >= rt && st.y <= Mt && st !== I && st !== T && b(R, q, U, at, W, tt, st.x, st.y) && S(st.prev, st, st.next) >= 0) return !1;
                st = st.nextZ;
            }
            return !0;
        }
        function o(f, x, C) {
            var A = f;
            do {
                var I = A.prev, F = A.next.next;
                !B(I, F) && N(I, A, A.next, F) && L(I, F) && L(F, I) && (x.push(I.i / C | 0), x.push(A.i / C | 0), x.push(F.i / C | 0), V(A), V(A.next), A = f = F), A = A.next;
            }while (A !== f);
            return e(A);
        }
        function a(f, x, C, A, I, F) {
            var T = f;
            do {
                for(var R = T.next.next; R !== T.prev;){
                    if (T.i !== R.i && v(T, R)) {
                        var U = D(T, R);
                        T = e(T, T.next), U = e(U, U.next), s(T, x, C, A, I, F, 0), s(U, x, C, A, I, F, 0);
                        return;
                    }
                    R = R.next;
                }
                T = T.next;
            }while (T !== f);
        }
        function l(f, x, C, A) {
            var I = [], F, T, R, U, W;
            for(F = 0, T = x.length; F < T; F++)R = x[F] * A, U = F < T - 1 ? x[F + 1] * A : f.length, W = t(f, R, U, A, !1), W === W.next && (W.steiner = !0), I.push(m(W));
            for(I.sort(u), F = 0; F < I.length; F++)C = h(I[F], C);
            return C;
        }
        function u(f, x) {
            return f.x - x.x;
        }
        function h(f, x) {
            var C = c(f, x);
            if (!C) return x;
            var A = D(C, f);
            return e(A, A.next), e(C, C.next);
        }
        function c(f, x) {
            var C = x, A = f.x, I = f.y, F = -1 / 0, T;
            do {
                if (I <= C.y && I >= C.next.y && C.next.y !== C.y) {
                    var R = C.x + (I - C.y) * (C.next.x - C.x) / (C.next.y - C.y);
                    if (R <= A && R > F && (F = R, T = C.x < C.next.x ? C : C.next, R === A)) return T;
                }
                C = C.next;
            }while (C !== x);
            if (!T) return null;
            var U = T, W = T.x, q = T.y, at = 1 / 0, tt;
            C = T;
            do A >= C.x && C.x >= W && A !== C.x && b(I < q ? A : F, I, W, q, I < q ? F : A, I, C.x, C.y) && (tt = Math.abs(I - C.y) / (A - C.x), L(C, f) && (tt < at || tt === at && (C.x > T.x || C.x === T.x && p(T, C))) && (T = C, at = tt)), C = C.next;
            while (C !== U);
            return T;
        }
        function p(f, x) {
            return S(f.prev, f, x.prev) < 0 && S(x.next, f, f.next) < 0;
        }
        function d(f, x, C, A) {
            var I = f;
            do I.z === 0 && (I.z = _(I.x, I.y, x, C, A)), I.prevZ = I.prev, I.nextZ = I.next, I = I.next;
            while (I !== f);
            I.prevZ.nextZ = null, I.prevZ = null, g(I);
        }
        function g(f) {
            var x, C, A, I, F, T, R, U, W = 1;
            do {
                for(C = f, f = null, F = null, T = 0; C;){
                    for(T++, A = C, R = 0, x = 0; x < W && (R++, A = A.nextZ, !!A); x++);
                    for(U = W; R > 0 || U > 0 && A;)R !== 0 && (U === 0 || !A || C.z <= A.z) ? (I = C, C = C.nextZ, R--) : (I = A, A = A.nextZ, U--), F ? F.nextZ = I : f = I, I.prevZ = F, F = I;
                    C = A;
                }
                F.nextZ = null, W *= 2;
            }while (T > 1);
            return f;
        }
        function _(f, x, C, A, I) {
            return f = (f - C) * I | 0, x = (x - A) * I | 0, f = (f | f << 8) & 16711935, f = (f | f << 4) & 252645135, f = (f | f << 2) & 858993459, f = (f | f << 1) & 1431655765, x = (x | x << 8) & 16711935, x = (x | x << 4) & 252645135, x = (x | x << 2) & 858993459, x = (x | x << 1) & 1431655765, f | x << 1;
        }
        function m(f) {
            var x = f, C = f;
            do (x.x < C.x || x.x === C.x && x.y < C.y) && (C = x), x = x.next;
            while (x !== f);
            return C;
        }
        function b(f, x, C, A, I, F, T, R) {
            return (I - T) * (x - R) >= (f - T) * (F - R) && (f - T) * (A - R) >= (C - T) * (x - R) && (C - T) * (F - R) >= (I - T) * (A - R);
        }
        function v(f, x) {
            return f.next.i !== x.i && f.prev.i !== x.i && !z(f, x) && (L(f, x) && L(x, f) && $(f, x) && (S(f.prev, f, x.prev) || S(f, x.prev, x)) || B(f, x) && S(f.prev, f, f.next) > 0 && S(x.prev, x, x.next) > 0);
        }
        function S(f, x, C) {
            return (x.y - f.y) * (C.x - x.x) - (x.x - f.x) * (C.y - x.y);
        }
        function B(f, x) {
            return f.x === x.x && f.y === x.y;
        }
        function N(f, x, C, A) {
            var I = M(S(f, x, C)), F = M(S(f, x, A)), T = M(S(C, A, f)), R = M(S(C, A, x));
            return !!(I !== F && T !== R || I === 0 && E(f, C, x) || F === 0 && E(f, A, x) || T === 0 && E(C, f, A) || R === 0 && E(C, x, A));
        }
        function E(f, x, C) {
            return x.x <= Math.max(f.x, C.x) && x.x >= Math.min(f.x, C.x) && x.y <= Math.max(f.y, C.y) && x.y >= Math.min(f.y, C.y);
        }
        function M(f) {
            return f > 0 ? 1 : f < 0 ? -1 : 0;
        }
        function z(f, x) {
            var C = f;
            do {
                if (C.i !== f.i && C.next.i !== f.i && C.i !== x.i && C.next.i !== x.i && N(C, C.next, f, x)) return !0;
                C = C.next;
            }while (C !== f);
            return !1;
        }
        function L(f, x) {
            return S(f.prev, f, f.next) < 0 ? S(f, x, f.next) >= 0 && S(f, f.prev, x) >= 0 : S(f, x, f.prev) < 0 || S(f, f.next, x) < 0;
        }
        function $(f, x) {
            var C = f, A = !1, I = (f.x + x.x) / 2, F = (f.y + x.y) / 2;
            do C.y > F != C.next.y > F && C.next.y !== C.y && I < (C.next.x - C.x) * (F - C.y) / (C.next.y - C.y) + C.x && (A = !A), C = C.next;
            while (C !== f);
            return A;
        }
        function D(f, x) {
            var C = new H(f.i, f.x, f.y), A = new H(x.i, x.x, x.y), I = f.next, F = x.prev;
            return f.next = x, x.prev = f, C.next = I, I.prev = C, A.next = C, C.prev = A, F.next = A, A.prev = F, A;
        }
        function k(f, x, C, A) {
            var I = new H(f, x, C);
            return A ? (I.next = A.next, I.prev = A, A.next.prev = I, A.next = I) : (I.prev = I, I.next = I), I;
        }
        function V(f) {
            f.next.prev = f.prev, f.prev.next = f.next, f.prevZ && (f.prevZ.nextZ = f.nextZ), f.nextZ && (f.nextZ.prevZ = f.prevZ);
        }
        function H(f, x, C) {
            this.i = f, this.x = x, this.y = C, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
        }
        r.deviation = function(f, x, C, A) {
            var I = x && x.length, F = I ? x[0] * C : f.length, T = Math.abs(Z(f, 0, F, C));
            if (I) for(var R = 0, U = x.length; R < U; R++){
                var W = x[R] * C, q = R < U - 1 ? x[R + 1] * C : f.length;
                T -= Math.abs(Z(f, W, q, C));
            }
            var at = 0;
            for(R = 0; R < A.length; R += 3){
                var tt = A[R] * C, gt = A[R + 1] * C, rt = A[R + 2] * C;
                at += Math.abs((f[tt] - f[rt]) * (f[gt + 1] - f[tt + 1]) - (f[tt] - f[gt]) * (f[rt + 1] - f[tt + 1]));
            }
            return T === 0 && at === 0 ? 0 : Math.abs((at - T) / T);
        };
        function Z(f, x, C, A) {
            for(var I = 0, F = x, T = C - A; F < C; F += A)I += (f[T] - f[F]) * (f[F + 1] + f[T + 1]), T = F;
            return I;
        }
        return r.flatten = function(f) {
            for(var x = f[0][0].length, C = {
                vertices: [],
                holes: [],
                dimensions: x
            }, A = 0, I = 0; I < f.length; I++){
                for(var F = 0; F < f[I].length; F++)for(var T = 0; T < x; T++)C.vertices.push(f[I][F][T]);
                I > 0 && (A += f[I - 1].length, C.holes.push(A));
            }
            return C;
        }, hs.exports;
    }
    var Ch = wh();
    const Sh = Tr(Ch);
    so = ((r)=>(r[r.NONE = 0] = "NONE", r[r.COLOR = 16384] = "COLOR", r[r.STENCIL = 1024] = "STENCIL", r[r.DEPTH = 256] = "DEPTH", r[r.COLOR_DEPTH = 16640] = "COLOR_DEPTH", r[r.COLOR_STENCIL = 17408] = "COLOR_STENCIL", r[r.DEPTH_STENCIL = 1280] = "DEPTH_STENCIL", r[r.ALL = 17664] = "ALL", r))(so || {});
    Ah = class {
        constructor(t){
            this.items = [], this._name = t;
        }
        emit(t, e, s, i, n, o, a, l) {
            const { name: u, items: h } = this;
            for(let c = 0, p = h.length; c < p; c++)h[c][u](t, e, s, i, n, o, a, l);
            return this;
        }
        add(t) {
            return t[this._name] && (this.remove(t), this.items.push(t)), this;
        }
        remove(t) {
            const e = this.items.indexOf(t);
            return e !== -1 && this.items.splice(e, 1), this;
        }
        contains(t) {
            return this.items.indexOf(t) !== -1;
        }
        removeAll() {
            return this.items.length = 0, this;
        }
        destroy() {
            this.removeAll(), this.items = null, this._name = null;
        }
        get empty() {
            return this.items.length === 0;
        }
        get name() {
            return this._name;
        }
    };
    const Th = [
        "init",
        "destroy",
        "contextChange",
        "resolutionChange",
        "resetState",
        "renderEnd",
        "renderStart",
        "render",
        "update",
        "postrender",
        "prerender"
    ], ro = class io extends re {
        constructor(t){
            super(), this.runners = Object.create(null), this.renderPipes = Object.create(null), this._initOptions = {}, this._systemsHash = Object.create(null), this.type = t.type, this.name = t.name, this.config = t;
            const e = [
                ...Th,
                ...this.config.runners ?? []
            ];
            this._addRunners(...e), this._unsafeEvalCheck();
        }
        async init(t = {}) {
            const e = t.skipExtensionImports === !0 ? !0 : t.manageImports === !1;
            await bh(e), this._addSystems(this.config.systems), this._addPipes(this.config.renderPipes, this.config.renderPipeAdaptors);
            for(const s in this._systemsHash)t = {
                ...this._systemsHash[s].constructor.defaultOptions,
                ...t
            };
            t = {
                ...io.defaultOptions,
                ...t
            }, this._roundPixels = t.roundPixels ? 1 : 0;
            for(let s = 0; s < this.runners.init.items.length; s++)await this.runners.init.items[s].init(t);
            this._initOptions = t;
        }
        render(t, e) {
            let s = t;
            if (s instanceof xe && (s = {
                container: s
            }, e && (ct(yt, "passing a second argument is deprecated, please use render options instead"), s.target = e.renderTexture)), s.target || (s.target = this.view.renderTarget), s.target === this.view.renderTarget && (this._lastObjectRendered = s.container, s.clearColor ?? (s.clearColor = this.background.colorRgba), s.clear ?? (s.clear = this.background.clearBeforeRender)), s.clearColor) {
                const i = Array.isArray(s.clearColor) && s.clearColor.length === 4;
                s.clearColor = i ? s.clearColor : Ft.shared.setValue(s.clearColor).toArray();
            }
            s.transform || (s.container.updateLocalTransform(), s.transform = s.container.localTransform), s.container.enableRenderGroup(), this.runners.prerender.emit(s), this.runners.renderStart.emit(s), this.runners.render.emit(s), this.runners.renderEnd.emit(s), this.runners.postrender.emit(s);
        }
        resize(t, e, s) {
            const i = this.view.resolution;
            this.view.resize(t, e, s), this.emit("resize", this.view.screen.width, this.view.screen.height, this.view.resolution), s !== void 0 && s !== i && this.runners.resolutionChange.emit(s);
        }
        clear(t = {}) {
            const e = this;
            t.target || (t.target = e.renderTarget.renderTarget), t.clearColor || (t.clearColor = this.background.colorRgba), t.clear ?? (t.clear = so.ALL);
            const { clear: s, clearColor: i, target: n } = t;
            Ft.shared.setValue(i ?? this.background.colorRgba), e.renderTarget.clear(n, s, Ft.shared.toArray());
        }
        get resolution() {
            return this.view.resolution;
        }
        set resolution(t) {
            this.view.resolution = t, this.runners.resolutionChange.emit(t);
        }
        get width() {
            return this.view.texture.frame.width;
        }
        get height() {
            return this.view.texture.frame.height;
        }
        get canvas() {
            return this.view.canvas;
        }
        get lastObjectRendered() {
            return this._lastObjectRendered;
        }
        get renderingToScreen() {
            return this.renderTarget.renderingToScreen;
        }
        get screen() {
            return this.view.screen;
        }
        _addRunners(...t) {
            t.forEach((e)=>{
                this.runners[e] = new Ah(e);
            });
        }
        _addSystems(t) {
            let e;
            for(e in t){
                const s = t[e];
                this._addSystem(s.value, s.name);
            }
        }
        _addSystem(t, e) {
            const s = new t(this);
            if (this[e]) throw new Error(`Whoops! The name "${e}" is already in use`);
            this[e] = s, this._systemsHash[e] = s;
            for(const i in this.runners)this.runners[i].add(s);
            return this;
        }
        _addPipes(t, e) {
            const s = e.reduce((i, n)=>(i[n.name] = n.value, i), {});
            t.forEach((i)=>{
                const n = i.value, o = i.name, a = s[o];
                this.renderPipes[o] = new n(this, a ? new a : null);
            });
        }
        destroy(t = !1) {
            this.runners.destroy.items.reverse(), this.runners.destroy.emit(t), Object.values(this.runners).forEach((e)=>{
                e.destroy();
            }), this._systemsHash = null, this.renderPipes = null;
        }
        generateTexture(t) {
            return this.textureGenerator.generateTexture(t);
        }
        get roundPixels() {
            return !!this._roundPixels;
        }
        _unsafeEvalCheck() {
            if (!vh()) throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.");
        }
        resetState() {
            this.runners.resetState.emit();
        }
    };
    ro.defaultOptions = {
        resolution: 1,
        failIfMajorPerformanceCaveat: !1,
        roundPixels: !1
    };
    let us;
    no = ro;
    function kh(r) {
        return us !== void 0 || (us = (()=>{
            const t = {
                stencil: !0,
                failIfMajorPerformanceCaveat: r ?? no.defaultOptions.failIfMajorPerformanceCaveat
            };
            try {
                if (!ne.get().getWebGLRenderingContext()) return !1;
                let s = ne.get().createCanvas().getContext("webgl", t);
                const i = !!s?.getContextAttributes()?.stencil;
                if (s) {
                    const n = s.getExtension("WEBGL_lose_context");
                    n && n.loseContext();
                }
                return s = null, i;
            } catch  {
                return !1;
            }
        })()), us;
    }
    let cs;
    async function Ph(r = {}) {
        return cs !== void 0 || (cs = await (async ()=>{
            const t = ne.get().getNavigator().gpu;
            if (!t) return !1;
            try {
                return await (await t.requestAdapter(r)).requestDevice(), !0;
            } catch  {
                return !1;
            }
        })()), cs;
    }
    const wi = [
        "webgl",
        "webgpu",
        "canvas"
    ];
    async function Mh(r) {
        let t = [];
        r.preference ? (t.push(r.preference), wi.forEach((n)=>{
            n !== r.preference && t.push(n);
        })) : t = wi.slice();
        let e, s = {};
        for(let n = 0; n < t.length; n++){
            const o = t[n];
            if (o === "webgpu" && await Ph()) {
                const { WebGPURenderer: a } = await Pe(async ()=>{
                    const { WebGPURenderer: l } = await import("./WebGPURenderer-_4Fe-DO4.js");
                    return {
                        WebGPURenderer: l
                    };
                }, __vite__mapDeps([12,10,13,11,1,2,3,4,5]), import.meta.url);
                e = a, s = {
                    ...r,
                    ...r.webgpu
                };
                break;
            } else if (o === "webgl" && kh(r.failIfMajorPerformanceCaveat ?? no.defaultOptions.failIfMajorPerformanceCaveat)) {
                const { WebGLRenderer: a } = await Pe(async ()=>{
                    const { WebGLRenderer: l } = await import("./WebGLRenderer-Cdx9vxUX.js");
                    return {
                        WebGLRenderer: l
                    };
                }, __vite__mapDeps([14,10,13,1,2,3,4,5]), import.meta.url);
                e = a, s = {
                    ...r,
                    ...r.webgl
                };
                break;
            } else if (o === "canvas") throw s = {
                ...r
            }, new Error("CanvasRenderer is not yet implemented");
        }
        if (delete s.webgpu, delete s.webgl, !e) throw new Error("No available renderer for the current environment");
        const i = new e;
        return await i.init(s), i;
    }
    oo = "8.9.1";
    class ao {
        static init() {
            globalThis.__PIXI_APP_INIT__?.(this, oo);
        }
        static destroy() {}
    }
    ao.extension = ht.Application;
    Ih = class {
        constructor(t){
            this._renderer = t;
        }
        init() {
            globalThis.__PIXI_RENDERER_INIT__?.(this._renderer, oo);
        }
        destroy() {
            this._renderer = null;
        }
    };
    Ih.extension = {
        type: [
            ht.WebGLSystem,
            ht.WebGPUSystem
        ],
        name: "initHook",
        priority: -10
    };
    const lo = class br {
        constructor(...t){
            this.stage = new xe, t[0] !== void 0 && ct(yt, "Application constructor options are deprecated, please use Application.init() instead.");
        }
        async init(t) {
            t = {
                ...t
            }, this.renderer = await Mh(t), br._plugins.forEach((e)=>{
                e.init.call(this, t);
            });
        }
        render() {
            this.renderer.render({
                container: this.stage
            });
        }
        get canvas() {
            return this.renderer.canvas;
        }
        get view() {
            return ct(yt, "Application.view is deprecated, please use Application.canvas instead."), this.renderer.canvas;
        }
        get screen() {
            return this.renderer.screen;
        }
        destroy(t = !1, e = !1) {
            const s = br._plugins.slice(0);
            s.reverse(), s.forEach((i)=>{
                i.destroy.call(this);
            }), this.stage.destroy(e), this.stage = null, this.renderer.destroy(t), this.renderer = null;
        }
    };
    lo._plugins = [];
    let ho = lo;
    Vt.handleByList(ht.Application, ho._plugins);
    Vt.add(ao);
    const Ci = [
        {
            offset: 0,
            color: "white"
        },
        {
            offset: 1,
            color: "black"
        }
    ], Dr = class vr {
        constructor(...t){
            this.uid = _t("fillGradient"), this.type = "linear", this.colorStops = [];
            let e = Rh(t);
            e = {
                ...e.type === "radial" ? vr.defaultRadialOptions : vr.defaultLinearOptions,
                ...yn(e)
            }, this._textureSize = e.textureSize, e.type === "radial" ? (this.center = e.center, this.outerCenter = e.outerCenter ?? this.center, this.innerRadius = e.innerRadius, this.outerRadius = e.outerRadius, this.scale = e.scale, this.rotation = e.rotation) : (this.start = e.start, this.end = e.end), this.textureSpace = e.textureSpace, this.type = e.type, e.colorStops.forEach((i)=>{
                this.addColorStop(i.offset, i.color);
            });
        }
        addColorStop(t, e) {
            return this.colorStops.push({
                offset: t,
                color: Ft.shared.setValue(e).toHexa()
            }), this;
        }
        buildLinearGradient() {
            if (this.texture) return;
            const t = this.colorStops.length ? this.colorStops : Ci, e = this._textureSize, { canvas: s, context: i } = Ai(e, 1), n = i.createLinearGradient(0, 0, this._textureSize, 0);
            Si(n, t), i.fillStyle = n, i.fillRect(0, 0, e, 1), this.texture = new ut({
                source: new bs({
                    resource: s
                })
            });
            const { x: o, y: a } = this.start, { x: l, y: u } = this.end, h = new et, c = l - o, p = u - a, d = Math.sqrt(c * c + p * p), g = Math.atan2(p, c);
            h.scale(d / e, 1), h.rotate(g), h.translate(o, a), this.textureSpace === "local" && h.scale(e, e), this.transform = h;
        }
        buildGradient() {
            this.type === "linear" ? this.buildLinearGradient() : this.buildRadialGradient();
        }
        buildRadialGradient() {
            if (this.texture) return;
            const t = this.colorStops.length ? this.colorStops : Ci, e = this._textureSize, { canvas: s, context: i } = Ai(e, e), { x: n, y: o } = this.center, { x: a, y: l } = this.outerCenter, u = this.innerRadius, h = this.outerRadius, c = a - h, p = l - h, d = e / (h * 2), g = (n - c) * d, _ = (o - p) * d, m = i.createRadialGradient(g, _, u * d, (a - c) * d, (l - p) * d, h * d);
            Si(m, t), i.fillStyle = t[t.length - 1].color, i.fillRect(0, 0, e, e), i.fillStyle = m, i.translate(g, _), i.rotate(this.rotation), i.scale(1, this.scale), i.translate(-g, -_), i.fillRect(0, 0, e, e), this.texture = new ut({
                source: new bs({
                    resource: s,
                    addressModeU: "clamp-to-edge",
                    addressModeV: "clamp-to-edge"
                })
            });
            const b = new et;
            b.scale(1 / d, 1 / d), b.translate(c, p), this.textureSpace === "local" && b.scale(e, e), this.transform = b;
        }
        get styleKey() {
            return this.uid;
        }
        destroy() {
            this.texture?.destroy(!0), this.texture = null;
        }
    };
    Dr.defaultLinearOptions = {
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 0,
            y: 1
        },
        colorStops: [],
        textureSpace: "local",
        type: "linear",
        textureSize: 256
    };
    Dr.defaultRadialOptions = {
        center: {
            x: .5,
            y: .5
        },
        innerRadius: 0,
        outerRadius: .5,
        colorStops: [],
        scale: 1,
        textureSpace: "local",
        type: "radial",
        textureSize: 256
    };
    Is = Dr;
    function Si(r, t) {
        for(let e = 0; e < t.length; e++){
            const s = t[e];
            r.addColorStop(s.offset, s.color);
        }
    }
    function Ai(r, t) {
        const e = ne.get().createCanvas(r, t), s = e.getContext("2d");
        return {
            canvas: e,
            context: s
        };
    }
    function Rh(r) {
        let t = r[0] ?? {};
        return (typeof t == "number" || r[1]) && (ct("8.5.2", "use options object instead"), t = {
            type: "linear",
            start: {
                x: r[0],
                y: r[1]
            },
            end: {
                x: r[2],
                y: r[3]
            },
            textureSpace: r[4],
            textureSize: r[5] ?? Is.defaultLinearOptions.textureSize
        }), t;
    }
    const Ti = {
        repeat: {
            addressModeU: "repeat",
            addressModeV: "repeat"
        },
        "repeat-x": {
            addressModeU: "repeat",
            addressModeV: "clamp-to-edge"
        },
        "repeat-y": {
            addressModeU: "clamp-to-edge",
            addressModeV: "repeat"
        },
        "no-repeat": {
            addressModeU: "clamp-to-edge",
            addressModeV: "clamp-to-edge"
        }
    };
    Eh = class {
        constructor(t, e){
            this.uid = _t("fillPattern"), this.transform = new et, this._styleKey = null, this.texture = t, this.transform.scale(1 / t.frame.width, 1 / t.frame.height), e && (t.source.style.addressModeU = Ti[e].addressModeU, t.source.style.addressModeV = Ti[e].addressModeV);
        }
        setTransform(t) {
            const e = this.texture;
            this.transform.copyFrom(t), this.transform.invert(), this.transform.scale(1 / e.frame.width, 1 / e.frame.height), this._styleKey = null;
        }
        get styleKey() {
            return this._styleKey ? this._styleKey : (this._styleKey = `fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`, this._styleKey);
        }
    };
    var Qs, ki;
    function Dh() {
        if (ki) return Qs;
        ki = 1, Qs = e;
        var r = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
        }, t = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
        function e(n) {
            var o = [];
            return n.replace(t, function(a, l, u) {
                var h = l.toLowerCase();
                for(u = i(u), h == "m" && u.length > 2 && (o.push([
                    l
                ].concat(u.splice(0, 2))), h = "l", l = l == "m" ? "l" : "L");;){
                    if (u.length == r[h]) return u.unshift(l), o.push(u);
                    if (u.length < r[h]) throw new Error("malformed path data");
                    o.push([
                        l
                    ].concat(u.splice(0, r[h])));
                }
            }), o;
        }
        var s = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;
        function i(n) {
            var o = n.match(s);
            return o ? o.map(Number) : [];
        }
        return Qs;
    }
    var Bh = Dh();
    const Fh = Tr(Bh);
    function Gh(r, t) {
        const e = Fh(r), s = [];
        let i = null, n = 0, o = 0;
        for(let a = 0; a < e.length; a++){
            const l = e[a], u = l[0], h = l;
            switch(u){
                case "M":
                    n = h[1], o = h[2], t.moveTo(n, o);
                    break;
                case "m":
                    n += h[1], o += h[2], t.moveTo(n, o);
                    break;
                case "H":
                    n = h[1], t.lineTo(n, o);
                    break;
                case "h":
                    n += h[1], t.lineTo(n, o);
                    break;
                case "V":
                    o = h[1], t.lineTo(n, o);
                    break;
                case "v":
                    o += h[1], t.lineTo(n, o);
                    break;
                case "L":
                    n = h[1], o = h[2], t.lineTo(n, o);
                    break;
                case "l":
                    n += h[1], o += h[2], t.lineTo(n, o);
                    break;
                case "C":
                    n = h[5], o = h[6], t.bezierCurveTo(h[1], h[2], h[3], h[4], n, o);
                    break;
                case "c":
                    t.bezierCurveTo(n + h[1], o + h[2], n + h[3], o + h[4], n + h[5], o + h[6]), n += h[5], o += h[6];
                    break;
                case "S":
                    n = h[3], o = h[4], t.bezierCurveToShort(h[1], h[2], n, o);
                    break;
                case "s":
                    t.bezierCurveToShort(n + h[1], o + h[2], n + h[3], o + h[4]), n += h[3], o += h[4];
                    break;
                case "Q":
                    n = h[3], o = h[4], t.quadraticCurveTo(h[1], h[2], n, o);
                    break;
                case "q":
                    t.quadraticCurveTo(n + h[1], o + h[2], n + h[3], o + h[4]), n += h[3], o += h[4];
                    break;
                case "T":
                    n = h[1], o = h[2], t.quadraticCurveToShort(n, o);
                    break;
                case "t":
                    n += h[1], o += h[2], t.quadraticCurveToShort(n, o);
                    break;
                case "A":
                    n = h[6], o = h[7], t.arcToSvg(h[1], h[2], h[3], h[4], h[5], n, o);
                    break;
                case "a":
                    n += h[6], o += h[7], t.arcToSvg(h[1], h[2], h[3], h[4], h[5], n, o);
                    break;
                case "Z":
                case "z":
                    t.closePath(), s.length > 0 && (i = s.pop(), i ? (n = i.startX, o = i.startY) : (n = 0, o = 0)), i = null;
                    break;
                default:
                    Dt(`Unknown SVG path command: ${u}`);
            }
            u !== "Z" && u !== "z" && i === null && (i = {
                startX: n,
                startY: o
            }, s.push(i));
        }
        return t;
    }
    class Br {
        constructor(t = 0, e = 0, s = 0){
            this.type = "circle", this.x = t, this.y = e, this.radius = s;
        }
        clone() {
            return new Br(this.x, this.y, this.radius);
        }
        contains(t, e) {
            if (this.radius <= 0) return !1;
            const s = this.radius * this.radius;
            let i = this.x - t, n = this.y - e;
            return i *= i, n *= n, i + n <= s;
        }
        strokeContains(t, e, s, i = .5) {
            if (this.radius === 0) return !1;
            const n = this.x - t, o = this.y - e, a = this.radius, l = (1 - i) * s, u = Math.sqrt(n * n + o * o);
            return u <= a + l && u > a - (s - l);
        }
        getBounds(t) {
            return t || (t = new vt), t.x = this.x - this.radius, t.y = this.y - this.radius, t.width = this.radius * 2, t.height = this.radius * 2, t;
        }
        copyFrom(t) {
            return this.x = t.x, this.y = t.y, this.radius = t.radius, this;
        }
        copyTo(t) {
            return t.copyFrom(this), t;
        }
        toString() {
            return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
        }
    }
    class Fr {
        constructor(t = 0, e = 0, s = 0, i = 0){
            this.type = "ellipse", this.x = t, this.y = e, this.halfWidth = s, this.halfHeight = i;
        }
        clone() {
            return new Fr(this.x, this.y, this.halfWidth, this.halfHeight);
        }
        contains(t, e) {
            if (this.halfWidth <= 0 || this.halfHeight <= 0) return !1;
            let s = (t - this.x) / this.halfWidth, i = (e - this.y) / this.halfHeight;
            return s *= s, i *= i, s + i <= 1;
        }
        strokeContains(t, e, s, i = .5) {
            const { halfWidth: n, halfHeight: o } = this;
            if (n <= 0 || o <= 0) return !1;
            const a = s * (1 - i), l = s - a, u = n - l, h = o - l, c = n + a, p = o + a, d = t - this.x, g = e - this.y, _ = d * d / (u * u) + g * g / (h * h), m = d * d / (c * c) + g * g / (p * p);
            return _ > 1 && m <= 1;
        }
        getBounds(t) {
            return t || (t = new vt), t.x = this.x - this.halfWidth, t.y = this.y - this.halfHeight, t.width = this.halfWidth * 2, t.height = this.halfHeight * 2, t;
        }
        copyFrom(t) {
            return this.x = t.x, this.y = t.y, this.halfWidth = t.halfWidth, this.halfHeight = t.halfHeight, this;
        }
        copyTo(t) {
            return t.copyFrom(this), t;
        }
        toString() {
            return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`;
        }
    }
    function Vh(r, t, e, s, i, n) {
        const o = r - e, a = t - s, l = i - e, u = n - s, h = o * l + a * u, c = l * l + u * u;
        let p = -1;
        c !== 0 && (p = h / c);
        let d, g;
        p < 0 ? (d = e, g = s) : p > 1 ? (d = i, g = n) : (d = e + p * l, g = s + p * u);
        const _ = r - d, m = t - g;
        return _ * _ + m * m;
    }
    let Nh, $h;
    class Ue {
        constructor(...t){
            this.type = "polygon";
            let e = Array.isArray(t[0]) ? t[0] : t;
            if (typeof e[0] != "number") {
                const s = [];
                for(let i = 0, n = e.length; i < n; i++)s.push(e[i].x, e[i].y);
                e = s;
            }
            this.points = e, this.closePath = !0;
        }
        isClockwise() {
            let t = 0;
            const e = this.points, s = e.length;
            for(let i = 0; i < s; i += 2){
                const n = e[i], o = e[i + 1], a = e[(i + 2) % s], l = e[(i + 3) % s];
                t += (a - n) * (l + o);
            }
            return t < 0;
        }
        containsPolygon(t) {
            const e = this.getBounds(Nh), s = t.getBounds($h);
            if (!e.containsRect(s)) return !1;
            const i = t.points;
            for(let n = 0; n < i.length; n += 2){
                const o = i[n], a = i[n + 1];
                if (!this.contains(o, a)) return !1;
            }
            return !0;
        }
        clone() {
            const t = this.points.slice(), e = new Ue(t);
            return e.closePath = this.closePath, e;
        }
        contains(t, e) {
            let s = !1;
            const i = this.points.length / 2;
            for(let n = 0, o = i - 1; n < i; o = n++){
                const a = this.points[n * 2], l = this.points[n * 2 + 1], u = this.points[o * 2], h = this.points[o * 2 + 1];
                l > e != h > e && t < (u - a) * ((e - l) / (h - l)) + a && (s = !s);
            }
            return s;
        }
        strokeContains(t, e, s, i = .5) {
            const n = s * s, o = n * (1 - i), a = n - o, { points: l } = this, u = l.length - (this.closePath ? 0 : 2);
            for(let h = 0; h < u; h += 2){
                const c = l[h], p = l[h + 1], d = l[(h + 2) % l.length], g = l[(h + 3) % l.length], _ = Vh(t, e, c, p, d, g), m = Math.sign((d - c) * (e - p) - (g - p) * (t - c));
                if (_ <= (m < 0 ? a : o)) return !0;
            }
            return !1;
        }
        getBounds(t) {
            t || (t = new vt);
            const e = this.points;
            let s = 1 / 0, i = -1 / 0, n = 1 / 0, o = -1 / 0;
            for(let a = 0, l = e.length; a < l; a += 2){
                const u = e[a], h = e[a + 1];
                s = u < s ? u : s, i = u > i ? u : i, n = h < n ? h : n, o = h > o ? h : o;
            }
            return t.x = s, t.width = i - s, t.y = n, t.height = o - n, t;
        }
        copyFrom(t) {
            return this.points = t.points.slice(), this.closePath = t.closePath, this;
        }
        copyTo(t) {
            return t.copyFrom(this), t;
        }
        toString() {
            return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((t, e)=>`${t}, ${e}`, "")}]`;
        }
        get lastX() {
            return this.points[this.points.length - 2];
        }
        get lastY() {
            return this.points[this.points.length - 1];
        }
        get x() {
            return this.points[this.points.length - 2];
        }
        get y() {
            return this.points[this.points.length - 1];
        }
    }
    const ds = (r, t, e, s, i, n, o)=>{
        const a = r - e, l = t - s, u = Math.sqrt(a * a + l * l);
        return u >= i - n && u <= i + o;
    };
    class Gr {
        constructor(t = 0, e = 0, s = 0, i = 0, n = 20){
            this.type = "roundedRectangle", this.x = t, this.y = e, this.width = s, this.height = i, this.radius = n;
        }
        getBounds(t) {
            return t || (t = new vt), t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
        }
        clone() {
            return new Gr(this.x, this.y, this.width, this.height, this.radius);
        }
        copyFrom(t) {
            return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
        }
        copyTo(t) {
            return t.copyFrom(this), t;
        }
        contains(t, e) {
            if (this.width <= 0 || this.height <= 0) return !1;
            if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
                const s = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
                if (e >= this.y + s && e <= this.y + this.height - s || t >= this.x + s && t <= this.x + this.width - s) return !0;
                let i = t - (this.x + s), n = e - (this.y + s);
                const o = s * s;
                if (i * i + n * n <= o || (i = t - (this.x + this.width - s), i * i + n * n <= o) || (n = e - (this.y + this.height - s), i * i + n * n <= o) || (i = t - (this.x + s), i * i + n * n <= o)) return !0;
            }
            return !1;
        }
        strokeContains(t, e, s, i = .5) {
            const { x: n, y: o, width: a, height: l, radius: u } = this, h = s * (1 - i), c = s - h, p = n + u, d = o + u, g = a - u * 2, _ = l - u * 2, m = n + a, b = o + l;
            return (t >= n - h && t <= n + c || t >= m - c && t <= m + h) && e >= d && e <= d + _ || (e >= o - h && e <= o + c || e >= b - c && e <= b + h) && t >= p && t <= p + g ? !0 : t < p && e < d && ds(t, e, p, d, u, c, h) || t > m - u && e < d && ds(t, e, m - u, d, u, c, h) || t > m - u && e > b - u && ds(t, e, m - u, b - u, u, c, h) || t < p && e > b - u && ds(t, e, p, b - u, u, c, h);
        }
        toString() {
            return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
        }
    }
    const Oh = [
        "precision mediump float;",
        "void main(void){",
        "float test = 0.1;",
        "%forloop%",
        "gl_FragColor = vec4(0.0);",
        "}"
    ].join(`
`);
    function zh(r) {
        let t = "";
        for(let e = 0; e < r; ++e)e > 0 && (t += `
else `), e < r - 1 && (t += `if(test == ${e}.0){}`);
        return t;
    }
    function Lh(r, t) {
        if (r === 0) throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
        const e = t.createShader(t.FRAGMENT_SHADER);
        try {
            for(;;){
                const s = Oh.replace(/%forloop%/gi, zh(r));
                if (t.shaderSource(e, s), t.compileShader(e), !t.getShaderParameter(e, t.COMPILE_STATUS)) r = r / 2 | 0;
                else break;
            }
        } finally{
            t.deleteShader(e);
        }
        return r;
    }
    let we = null;
    uo = function() {
        if (we) return we;
        const r = qn();
        return we = r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS), we = Lh(we, r), r.getExtension("WEBGL_lose_context")?.loseContext(), we;
    };
    const co = {};
    Uh = function(r, t) {
        let e = 2166136261;
        for(let s = 0; s < t; s++)e ^= r[s].uid, e = Math.imul(e, 16777619), e >>>= 0;
        return co[e] || Hh(r, t, e);
    };
    let Js = 0;
    function Hh(r, t, e) {
        const s = {};
        let i = 0;
        Js || (Js = uo());
        for(let o = 0; o < Js; o++){
            const a = o < t ? r[o] : ut.EMPTY.source;
            s[i++] = a.source, s[i++] = a.style;
        }
        const n = new ms(s);
        return co[e] = n, n;
    }
    Pi = class {
        constructor(t){
            typeof t == "number" ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData), this.size = this.rawBinaryData.byteLength;
        }
        get int8View() {
            return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
        }
        get uint8View() {
            return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
        }
        get int16View() {
            return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
        }
        get int32View() {
            return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
        }
        get float64View() {
            return this._float64Array || (this._float64Array = new Float64Array(this.rawBinaryData)), this._float64Array;
        }
        get bigUint64View() {
            return this._bigUint64Array || (this._bigUint64Array = new BigUint64Array(this.rawBinaryData)), this._bigUint64Array;
        }
        view(t) {
            return this[`${t}View`];
        }
        destroy() {
            this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this.uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
        }
        static sizeOf(t) {
            switch(t){
                case "int8":
                case "uint8":
                    return 1;
                case "int16":
                case "uint16":
                    return 2;
                case "int32":
                case "uint32":
                case "float32":
                    return 4;
                default:
                    throw new Error(`${t} isn't a valid view type`);
            }
        }
    };
    Mi = function(r, t) {
        const e = r.byteLength / 8 | 0, s = new Float64Array(r, 0, e);
        new Float64Array(t, 0, e).set(s);
        const n = r.byteLength - e * 8;
        if (n > 0) {
            const o = new Uint8Array(r, e * 8, n);
            new Uint8Array(t, e * 8, n).set(o);
        }
    };
    const Wh = {
        normal: "normal-npm",
        add: "add-npm",
        screen: "screen-npm"
    };
    Yh = ((r)=>(r[r.DISABLED = 0] = "DISABLED", r[r.RENDERING_MASK_ADD = 1] = "RENDERING_MASK_ADD", r[r.MASK_ACTIVE = 2] = "MASK_ACTIVE", r[r.INVERSE_MASK_ACTIVE = 3] = "INVERSE_MASK_ACTIVE", r[r.RENDERING_MASK_REMOVE = 4] = "RENDERING_MASK_REMOVE", r[r.NONE = 5] = "NONE", r))(Yh || {});
    Ii = function(r, t) {
        return t.alphaMode === "no-premultiply-alpha" && Wh[r] || r;
    };
    class Xh {
        constructor(){
            this.ids = Object.create(null), this.textures = [], this.count = 0;
        }
        clear() {
            for(let t = 0; t < this.count; t++){
                const e = this.textures[t];
                this.textures[t] = null, this.ids[e.uid] = null;
            }
            this.count = 0;
        }
    }
    class jh {
        constructor(){
            this.renderPipeId = "batch", this.action = "startBatch", this.start = 0, this.size = 0, this.textures = new Xh, this.blendMode = "normal", this.topology = "triangle-strip", this.canBundle = !0;
        }
        destroy() {
            this.textures = null, this.gpuBindGroup = null, this.bindGroup = null, this.batcher = null;
        }
    }
    const fo = [];
    let wr = 0;
    function Ri() {
        return wr > 0 ? fo[--wr] : new jh;
    }
    function Ei(r) {
        fo[wr++] = r;
    }
    let Fe = 0;
    const po = class gs {
        constructor(t = {}){
            this.uid = _t("batcher"), this.dirty = !0, this.batchIndex = 0, this.batches = [], this._elements = [], gs.defaultOptions.maxTextures = gs.defaultOptions.maxTextures ?? uo(), t = {
                ...gs.defaultOptions,
                ...t
            };
            const { maxTextures: e, attributesInitialSize: s, indicesInitialSize: i } = t;
            this.attributeBuffer = new Pi(s * 4), this.indexBuffer = new Uint16Array(i), this.maxTextures = e;
        }
        begin() {
            this.elementSize = 0, this.elementStart = 0, this.indexSize = 0, this.attributeSize = 0;
            for(let t = 0; t < this.batchIndex; t++)Ei(this.batches[t]);
            this.batchIndex = 0, this._batchIndexStart = 0, this._batchIndexSize = 0, this.dirty = !0;
        }
        add(t) {
            this._elements[this.elementSize++] = t, t._indexStart = this.indexSize, t._attributeStart = this.attributeSize, t._batcher = this, this.indexSize += t.indexSize, this.attributeSize += t.attributeSize * this.vertexSize;
        }
        checkAndUpdateTexture(t, e) {
            const s = t._batch.textures.ids[e._source.uid];
            return !s && s !== 0 ? !1 : (t._textureId = s, t.texture = e, !0);
        }
        updateElement(t) {
            this.dirty = !0;
            const e = this.attributeBuffer;
            t.packAsQuad ? this.packQuadAttributes(t, e.float32View, e.uint32View, t._attributeStart, t._textureId) : this.packAttributes(t, e.float32View, e.uint32View, t._attributeStart, t._textureId);
        }
        break(t) {
            const e = this._elements;
            if (!e[this.elementStart]) return;
            let s = Ri(), i = s.textures;
            i.clear();
            const n = e[this.elementStart];
            let o = Ii(n.blendMode, n.texture._source), a = n.topology;
            this.attributeSize * 4 > this.attributeBuffer.size && this._resizeAttributeBuffer(this.attributeSize * 4), this.indexSize > this.indexBuffer.length && this._resizeIndexBuffer(this.indexSize);
            const l = this.attributeBuffer.float32View, u = this.attributeBuffer.uint32View, h = this.indexBuffer;
            let c = this._batchIndexSize, p = this._batchIndexStart, d = "startBatch";
            const g = this.maxTextures;
            for(let _ = this.elementStart; _ < this.elementSize; ++_){
                const m = e[_];
                e[_] = null;
                const v = m.texture._source, S = Ii(m.blendMode, v), B = o !== S || a !== m.topology;
                if (v._batchTick === Fe && !B) {
                    m._textureId = v._textureBindLocation, c += m.indexSize, m.packAsQuad ? (this.packQuadAttributes(m, l, u, m._attributeStart, m._textureId), this.packQuadIndex(h, m._indexStart, m._attributeStart / this.vertexSize)) : (this.packAttributes(m, l, u, m._attributeStart, m._textureId), this.packIndex(m, h, m._indexStart, m._attributeStart / this.vertexSize)), m._batch = s;
                    continue;
                }
                v._batchTick = Fe, (i.count >= g || B) && (this._finishBatch(s, p, c - p, i, o, a, t, d), d = "renderBatch", p = c, o = S, a = m.topology, s = Ri(), i = s.textures, i.clear(), ++Fe), m._textureId = v._textureBindLocation = i.count, i.ids[v.uid] = i.count, i.textures[i.count++] = v, m._batch = s, c += m.indexSize, m.packAsQuad ? (this.packQuadAttributes(m, l, u, m._attributeStart, m._textureId), this.packQuadIndex(h, m._indexStart, m._attributeStart / this.vertexSize)) : (this.packAttributes(m, l, u, m._attributeStart, m._textureId), this.packIndex(m, h, m._indexStart, m._attributeStart / this.vertexSize));
            }
            i.count > 0 && (this._finishBatch(s, p, c - p, i, o, a, t, d), p = c, ++Fe), this.elementStart = this.elementSize, this._batchIndexStart = p, this._batchIndexSize = c;
        }
        _finishBatch(t, e, s, i, n, o, a, l) {
            t.gpuBindGroup = null, t.bindGroup = null, t.action = l, t.batcher = this, t.textures = i, t.blendMode = n, t.topology = o, t.start = e, t.size = s, ++Fe, this.batches[this.batchIndex++] = t, a.add(t);
        }
        finish(t) {
            this.break(t);
        }
        ensureAttributeBuffer(t) {
            t * 4 <= this.attributeBuffer.size || this._resizeAttributeBuffer(t * 4);
        }
        ensureIndexBuffer(t) {
            t <= this.indexBuffer.length || this._resizeIndexBuffer(t);
        }
        _resizeAttributeBuffer(t) {
            const e = Math.max(t, this.attributeBuffer.size * 2), s = new Pi(e);
            Mi(this.attributeBuffer.rawBinaryData, s.rawBinaryData), this.attributeBuffer = s;
        }
        _resizeIndexBuffer(t) {
            const e = this.indexBuffer;
            let s = Math.max(t, e.length * 1.5);
            s += s % 2;
            const i = s > 65535 ? new Uint32Array(s) : new Uint16Array(s);
            if (i.BYTES_PER_ELEMENT !== e.BYTES_PER_ELEMENT) for(let n = 0; n < e.length; n++)i[n] = e[n];
            else Mi(e.buffer, i.buffer);
            this.indexBuffer = i;
        }
        packQuadIndex(t, e, s) {
            t[e] = s + 0, t[e + 1] = s + 1, t[e + 2] = s + 2, t[e + 3] = s + 0, t[e + 4] = s + 2, t[e + 5] = s + 3;
        }
        packIndex(t, e, s, i) {
            const n = t.indices, o = t.indexSize, a = t.indexOffset, l = t.attributeOffset;
            for(let u = 0; u < o; u++)e[s++] = i + n[u + a] - l;
        }
        destroy() {
            for(let t = 0; t < this.batches.length; t++)Ei(this.batches[t]);
            this.batches = null;
            for(let t = 0; t < this._elements.length; t++)this._elements[t]._batch = null;
            this._elements = null, this.indexBuffer = null, this.attributeBuffer.destroy(), this.attributeBuffer = null;
        }
    };
    po.defaultOptions = {
        maxTextures: null,
        attributesInitialSize: 4,
        indicesInitialSize: 6
    };
    let qh = po;
    Pt = ((r)=>(r[r.MAP_READ = 1] = "MAP_READ", r[r.MAP_WRITE = 2] = "MAP_WRITE", r[r.COPY_SRC = 4] = "COPY_SRC", r[r.COPY_DST = 8] = "COPY_DST", r[r.INDEX = 16] = "INDEX", r[r.VERTEX = 32] = "VERTEX", r[r.UNIFORM = 64] = "UNIFORM", r[r.STORAGE = 128] = "STORAGE", r[r.INDIRECT = 256] = "INDIRECT", r[r.QUERY_RESOLVE = 512] = "QUERY_RESOLVE", r[r.STATIC = 1024] = "STATIC", r))(Pt || {});
    Qe = class extends re {
        constructor(t){
            let { data: e, size: s } = t;
            const { usage: i, label: n, shrinkToFit: o } = t;
            super(), this.uid = _t("buffer"), this._resourceType = "buffer", this._resourceId = _t("resource"), this._touched = 0, this._updateID = 1, this._dataInt32 = null, this.shrinkToFit = !0, this.destroyed = !1, e instanceof Array && (e = new Float32Array(e)), this._data = e, s ?? (s = e?.byteLength);
            const a = !!e;
            this.descriptor = {
                size: s,
                usage: i,
                mappedAtCreation: a,
                label: n
            }, this.shrinkToFit = o ?? !0;
        }
        get data() {
            return this._data;
        }
        set data(t) {
            this.setDataWithSize(t, t.length, !0);
        }
        get dataInt32() {
            return this._dataInt32 || (this._dataInt32 = new Int32Array(this.data.buffer)), this._dataInt32;
        }
        get static() {
            return !!(this.descriptor.usage & Pt.STATIC);
        }
        set static(t) {
            t ? this.descriptor.usage |= Pt.STATIC : this.descriptor.usage &= ~Pt.STATIC;
        }
        setDataWithSize(t, e, s) {
            if (this._updateID++, this._updateSize = e * t.BYTES_PER_ELEMENT, this._data === t) {
                s && this.emit("update", this);
                return;
            }
            const i = this._data;
            if (this._data = t, this._dataInt32 = null, !i || i.length !== t.length) {
                !this.shrinkToFit && i && t.byteLength < i.byteLength ? s && this.emit("update", this) : (this.descriptor.size = t.byteLength, this._resourceId = _t("resource"), this.emit("change", this));
                return;
            }
            s && this.emit("update", this);
        }
        update(t) {
            this._updateSize = t ?? this._updateSize, this._updateID++, this.emit("update", this);
        }
        destroy() {
            this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this._data = null, this.descriptor = null, this.removeAllListeners();
        }
    };
    function mo(r, t) {
        if (!(r instanceof Qe)) {
            let e = t ? Pt.INDEX : Pt.VERTEX;
            r instanceof Array && (t ? (r = new Uint32Array(r), e = Pt.INDEX | Pt.COPY_DST) : (r = new Float32Array(r), e = Pt.VERTEX | Pt.COPY_DST)), r = new Qe({
                data: r,
                label: t ? "index-mesh-buffer" : "vertex-mesh-buffer",
                usage: e
            });
        }
        return r;
    }
    function Kh(r, t, e) {
        const s = r.getAttribute(t);
        if (!s) return e.minX = 0, e.minY = 0, e.maxX = 0, e.maxY = 0, e;
        const i = s.buffer.data;
        let n = 1 / 0, o = 1 / 0, a = -1 / 0, l = -1 / 0;
        const u = i.BYTES_PER_ELEMENT, h = (s.offset || 0) / u, c = (s.stride || 2 * 4) / u;
        for(let p = h; p < i.length; p += c){
            const d = i[p], g = i[p + 1];
            d > a && (a = d), g > l && (l = g), d < n && (n = d), g < o && (o = g);
        }
        return e.minX = n, e.minY = o, e.maxX = a, e.maxY = l, e;
    }
    function Zh(r) {
        return (r instanceof Qe || Array.isArray(r) || r.BYTES_PER_ELEMENT) && (r = {
            buffer: r
        }), r.buffer = mo(r.buffer, !1), r;
    }
    Qh = class extends re {
        constructor(t = {}){
            super(), this.uid = _t("geometry"), this._layoutKey = 0, this.instanceCount = 1, this._bounds = new zt, this._boundsDirty = !0;
            const { attributes: e, indexBuffer: s, topology: i } = t;
            if (this.buffers = [], this.attributes = {}, e) for(const n in e)this.addAttribute(n, e[n]);
            this.instanceCount = t.instanceCount ?? 1, s && this.addIndex(s), this.topology = i || "triangle-list";
        }
        onBufferUpdate() {
            this._boundsDirty = !0, this.emit("update", this);
        }
        getAttribute(t) {
            return this.attributes[t];
        }
        getIndex() {
            return this.indexBuffer;
        }
        getBuffer(t) {
            return this.getAttribute(t).buffer;
        }
        getSize() {
            for(const t in this.attributes){
                const e = this.attributes[t];
                return e.buffer.data.length / (e.stride / 4 || e.size);
            }
            return 0;
        }
        addAttribute(t, e) {
            const s = Zh(e);
            this.buffers.indexOf(s.buffer) === -1 && (this.buffers.push(s.buffer), s.buffer.on("update", this.onBufferUpdate, this), s.buffer.on("change", this.onBufferUpdate, this)), this.attributes[t] = s;
        }
        addIndex(t) {
            this.indexBuffer = mo(t, !0), this.buffers.push(this.indexBuffer);
        }
        get bounds() {
            return this._boundsDirty ? (this._boundsDirty = !1, Kh(this, "aPosition", this._bounds)) : this._bounds;
        }
        destroy(t = !1) {
            this.emit("destroy", this), this.removeAllListeners(), t && this.buffers.forEach((e)=>e.destroy()), this.attributes = null, this.buffers = null, this.indexBuffer = null, this._bounds = null;
        }
    };
    const Jh = new Float32Array(1), tu = new Uint32Array(1);
    class eu extends Qh {
        constructor(){
            const e = new Qe({
                data: Jh,
                label: "attribute-batch-buffer",
                usage: Pt.VERTEX | Pt.COPY_DST,
                shrinkToFit: !1
            }), s = new Qe({
                data: tu,
                label: "index-batch-buffer",
                usage: Pt.INDEX | Pt.COPY_DST,
                shrinkToFit: !1
            }), i = 6 * 4;
            super({
                attributes: {
                    aPosition: {
                        buffer: e,
                        format: "float32x2",
                        stride: i,
                        offset: 0
                    },
                    aUV: {
                        buffer: e,
                        format: "float32x2",
                        stride: i,
                        offset: 2 * 4
                    },
                    aColor: {
                        buffer: e,
                        format: "unorm8x4",
                        stride: i,
                        offset: 4 * 4
                    },
                    aTextureIdAndRound: {
                        buffer: e,
                        format: "uint16x2",
                        stride: i,
                        offset: 5 * 4
                    }
                },
                indexBuffer: s
            });
        }
    }
    function Di(r, t, e) {
        if (r) for(const s in r){
            const i = s.toLocaleLowerCase(), n = t[i];
            if (n) {
                let o = r[s];
                s === "header" && (o = o.replace(/@in\s+[^;]+;\s*/g, "").replace(/@out\s+[^;]+;\s*/g, "")), e && n.push(`//----${e}----//`), n.push(o);
            } else Dt(`${s} placement hook does not exist in shader`);
        }
    }
    const su = /\{\{(.*?)\}\}/g;
    function Bi(r) {
        const t = {};
        return (r.match(su)?.map((s)=>s.replace(/[{()}]/g, "")) ?? []).forEach((s)=>{
            t[s] = [];
        }), t;
    }
    function Fi(r, t) {
        let e;
        const s = /@in\s+([^;]+);/g;
        for(; (e = s.exec(r)) !== null;)t.push(e[1]);
    }
    function Gi(r, t, e = !1) {
        const s = [];
        Fi(t, s), r.forEach((a)=>{
            a.header && Fi(a.header, s);
        });
        const i = s;
        e && i.sort();
        const n = i.map((a, l)=>`       @location(${l}) ${a},`).join(`
`);
        let o = t.replace(/@in\s+[^;]+;\s*/g, "");
        return o = o.replace("{{in}}", `
${n}
`), o;
    }
    function Vi(r, t) {
        let e;
        const s = /@out\s+([^;]+);/g;
        for(; (e = s.exec(r)) !== null;)t.push(e[1]);
    }
    function ru(r) {
        const e = /\b(\w+)\s*:/g.exec(r);
        return e ? e[1] : "";
    }
    function iu(r) {
        const t = /@.*?\s+/g;
        return r.replace(t, "");
    }
    function nu(r, t) {
        const e = [];
        Vi(t, e), r.forEach((l)=>{
            l.header && Vi(l.header, e);
        });
        let s = 0;
        const i = e.sort().map((l)=>l.indexOf("builtin") > -1 ? l : `@location(${s++}) ${l}`).join(`,
`), n = e.sort().map((l)=>`       var ${iu(l)};`).join(`
`), o = `return VSOutput(
            ${e.sort().map((l)=>` ${ru(l)}`).join(`,
`)});`;
        let a = t.replace(/@out\s+[^;]+;\s*/g, "");
        return a = a.replace("{{struct}}", `
${i}
`), a = a.replace("{{start}}", `
${n}
`), a = a.replace("{{return}}", `
${o}
`), a;
    }
    function Ni(r, t) {
        let e = r;
        for(const s in t){
            const i = t[s];
            i.join(`
`).length ? e = e.replace(`{{${s}}}`, `//-----${s} START-----//
${i.join(`
`)}
//----${s} FINISH----//`) : e = e.replace(`{{${s}}}`, "");
        }
        return e;
    }
    const ie = Object.create(null), tr = new Map;
    let ou = 0;
    function au({ template: r, bits: t }) {
        const e = go(r, t);
        if (ie[e]) return ie[e];
        const { vertex: s, fragment: i } = hu(r, t);
        return ie[e] = _o(s, i, t), ie[e];
    }
    function lu({ template: r, bits: t }) {
        const e = go(r, t);
        return ie[e] || (ie[e] = _o(r.vertex, r.fragment, t)), ie[e];
    }
    function hu(r, t) {
        const e = t.map((o)=>o.vertex).filter((o)=>!!o), s = t.map((o)=>o.fragment).filter((o)=>!!o);
        let i = Gi(e, r.vertex, !0);
        i = nu(e, i);
        const n = Gi(s, r.fragment, !0);
        return {
            vertex: i,
            fragment: n
        };
    }
    function go(r, t) {
        return t.map((e)=>(tr.has(e) || tr.set(e, ou++), tr.get(e))).sort((e, s)=>e - s).join("-") + r.vertex + r.fragment;
    }
    function _o(r, t, e) {
        const s = Bi(r), i = Bi(t);
        return e.forEach((n)=>{
            Di(n.vertex, s, n.name), Di(n.fragment, i, n.name);
        }), {
            vertex: Ni(r, s),
            fragment: Ni(t, i)
        };
    }
    const uu = `
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`, cu = `
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`, du = `
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`, fu = `
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
        
        {{end}}
    }
`, pu = {
        name: "global-uniforms-bit",
        vertex: {
            header: `
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `
        }
    }, mu = {
        name: "global-uniforms-bit",
        vertex: {
            header: `
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `
        }
    };
    gu = function({ bits: r, name: t }) {
        const e = au({
            template: {
                fragment: cu,
                vertex: uu
            },
            bits: [
                pu,
                ...r
            ]
        });
        return Ms.from({
            name: t,
            vertex: {
                source: e.vertex,
                entryPoint: "main"
            },
            fragment: {
                source: e.fragment,
                entryPoint: "main"
            }
        });
    };
    _u = function({ bits: r, name: t }) {
        return new Zn({
            name: t,
            ...lu({
                template: {
                    vertex: du,
                    fragment: fu
                },
                bits: [
                    mu,
                    ...r
                ]
            })
        });
    };
    let er;
    yu = {
        name: "color-bit",
        vertex: {
            header: `
            @in aColor: vec4<f32>;
        `,
            main: `
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `
        }
    };
    xu = {
        name: "color-bit",
        vertex: {
            header: `
            in vec4 aColor;
        `,
            main: `
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `
        }
    };
    er = {};
    function bu(r) {
        const t = [];
        if (r === 1) t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"), t.push("@group(1) @binding(1) var textureSampler1: sampler;");
        else {
            let e = 0;
            for(let s = 0; s < r; s++)t.push(`@group(1) @binding(${e++}) var textureSource${s + 1}: texture_2d<f32>;`), t.push(`@group(1) @binding(${e++}) var textureSampler${s + 1}: sampler;`);
        }
        return t.join(`
`);
    }
    function vu(r) {
        const t = [];
        if (r === 1) t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");
        else {
            t.push("switch vTextureId {");
            for(let e = 0; e < r; e++)e === r - 1 ? t.push("  default:{") : t.push(`  case ${e}:{`), t.push(`      outColor = textureSampleGrad(textureSource${e + 1}, textureSampler${e + 1}, vUV, uvDx, uvDy);`), t.push("      break;}");
            t.push("}");
        }
        return t.join(`
`);
    }
    wu = function(r) {
        return er[r] || (er[r] = {
            name: "texture-batch-bit",
            vertex: {
                header: `
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,
                main: `
                vTextureId = aTextureIdAndRound.y;
            `,
                end: `
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `
            },
            fragment: {
                header: `
                @in @interpolate(flat) vTextureId: u32;

                ${bu(r)}
            `,
                main: `
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${vu(r)}
            `
            }
        }), er[r];
    };
    const sr = {};
    function Cu(r) {
        const t = [];
        for(let e = 0; e < r; e++)e > 0 && t.push("else"), e < r - 1 && t.push(`if(vTextureId < ${e}.5)`), t.push("{"), t.push(`	outColor = texture(uTextures[${e}], vUV);`), t.push("}");
        return t.join(`
`);
    }
    Su = function(r) {
        return sr[r] || (sr[r] = {
            name: "texture-batch-bit",
            vertex: {
                header: `
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,
                main: `
                vTextureId = aTextureIdAndRound.y;
            `,
                end: `
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `
            },
            fragment: {
                header: `
                in float vTextureId;

                uniform sampler2D uTextures[${r}];

            `,
                main: `

                ${Cu(r)}
            `
            }
        }), sr[r];
    };
    let $i;
    Au = {
        name: "round-pixels-bit",
        vertex: {
            header: `
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `
        }
    };
    Tu = {
        name: "round-pixels-bit",
        vertex: {
            header: `   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `
        }
    };
    $i = {};
    ku = function(r) {
        let t = $i[r];
        if (t) return t;
        const e = new Int32Array(r);
        for(let s = 0; s < r; s++)e[s] = s;
        return t = $i[r] = new eo({
            uTextures: {
                value: e,
                type: "i32",
                size: r
            }
        }, {
            isStatic: !0
        }), t;
    };
    class Pu extends Er {
        constructor(t){
            const e = _u({
                name: "batch",
                bits: [
                    xu,
                    Su(t),
                    Tu
                ]
            }), s = gu({
                name: "batch",
                bits: [
                    yu,
                    wu(t),
                    Au
                ]
            });
            super({
                glProgram: e,
                gpuProgram: s,
                resources: {
                    batchSamplers: ku(t)
                }
            });
        }
    }
    let Oi = null;
    const yo = class xo extends qh {
        constructor(){
            super(...arguments), this.geometry = new eu, this.shader = Oi || (Oi = new Pu(this.maxTextures)), this.name = xo.extension.name, this.vertexSize = 6;
        }
        packAttributes(t, e, s, i, n) {
            const o = n << 16 | t.roundPixels & 65535, a = t.transform, l = a.a, u = a.b, h = a.c, c = a.d, p = a.tx, d = a.ty, { positions: g, uvs: _ } = t, m = t.color, b = t.attributeOffset, v = b + t.attributeSize;
            for(let S = b; S < v; S++){
                const B = S * 2, N = g[B], E = g[B + 1];
                e[i++] = l * N + h * E + p, e[i++] = c * E + u * N + d, e[i++] = _[B], e[i++] = _[B + 1], s[i++] = m, s[i++] = o;
            }
        }
        packQuadAttributes(t, e, s, i, n) {
            const o = t.texture, a = t.transform, l = a.a, u = a.b, h = a.c, c = a.d, p = a.tx, d = a.ty, g = t.bounds, _ = g.maxX, m = g.minX, b = g.maxY, v = g.minY, S = o.uvs, B = t.color, N = n << 16 | t.roundPixels & 65535;
            e[i + 0] = l * m + h * v + p, e[i + 1] = c * v + u * m + d, e[i + 2] = S.x0, e[i + 3] = S.y0, s[i + 4] = B, s[i + 5] = N, e[i + 6] = l * _ + h * v + p, e[i + 7] = c * v + u * _ + d, e[i + 8] = S.x1, e[i + 9] = S.y1, s[i + 10] = B, s[i + 11] = N, e[i + 12] = l * _ + h * b + p, e[i + 13] = c * b + u * _ + d, e[i + 14] = S.x2, e[i + 15] = S.y2, s[i + 16] = B, s[i + 17] = N, e[i + 18] = l * m + h * b + p, e[i + 19] = c * b + u * m + d, e[i + 20] = S.x3, e[i + 21] = S.y3, s[i + 22] = B, s[i + 23] = N;
        }
    };
    yo.extension = {
        type: [
            ht.Batcher
        ],
        name: "default"
    };
    Mu = yo;
    function Iu(r, t, e, s, i, n, o, a = null) {
        let l = 0;
        e *= t, i *= n;
        const u = a.a, h = a.b, c = a.c, p = a.d, d = a.tx, g = a.ty;
        for(; l < o;){
            const _ = r[e], m = r[e + 1];
            s[i] = u * _ + c * m + d, s[i + 1] = h * _ + p * m + g, i += n, e += t, l++;
        }
    }
    function Ru(r, t, e, s) {
        let i = 0;
        for(t *= e; i < s;)r[t] = 0, r[t + 1] = 0, t += e, i++;
    }
    function bo(r, t, e, s, i) {
        const n = t.a, o = t.b, a = t.c, l = t.d, u = t.tx, h = t.ty;
        e || (e = 0), s || (s = 2), i || (i = r.length / s - e);
        let c = e * s;
        for(let p = 0; p < i; p++){
            const d = r[c], g = r[c + 1];
            r[c] = n * d + a * g + u, r[c + 1] = o * d + l * g + h, c += s;
        }
    }
    const Eu = new et;
    vo = class {
        constructor(){
            this.packAsQuad = !1, this.batcherName = "default", this.topology = "triangle-list", this.applyTransform = !0, this.roundPixels = 0, this._batcher = null, this._batch = null;
        }
        get uvs() {
            return this.geometryData.uvs;
        }
        get positions() {
            return this.geometryData.vertices;
        }
        get indices() {
            return this.geometryData.indices;
        }
        get blendMode() {
            return this.applyTransform ? this.renderable.groupBlendMode : "normal";
        }
        get color() {
            const t = this.baseColor, e = t >> 16 | t & 65280 | (t & 255) << 16, s = this.renderable;
            return s ? Pn(e, s.groupColor) + (this.alpha * s.groupAlpha * 255 << 24) : e + (this.alpha * 255 << 24);
        }
        get transform() {
            return this.renderable?.groupTransform || Eu;
        }
        copyTo(t) {
            t.indexOffset = this.indexOffset, t.indexSize = this.indexSize, t.attributeOffset = this.attributeOffset, t.attributeSize = this.attributeSize, t.baseColor = this.baseColor, t.alpha = this.alpha, t.texture = this.texture, t.geometryData = this.geometryData, t.topology = this.topology;
        }
        reset() {
            this.applyTransform = !0, this.renderable = null, this.topology = "triangle-list";
        }
    };
    const Je = {
        extension: {
            type: ht.ShapeBuilder,
            name: "circle"
        },
        build (r, t) {
            let e, s, i, n, o, a;
            if (r.type === "circle") {
                const B = r;
                e = B.x, s = B.y, o = a = B.radius, i = n = 0;
            } else if (r.type === "ellipse") {
                const B = r;
                e = B.x, s = B.y, o = B.halfWidth, a = B.halfHeight, i = n = 0;
            } else {
                const B = r, N = B.width / 2, E = B.height / 2;
                e = B.x + N, s = B.y + E, o = a = Math.max(0, Math.min(B.radius, Math.min(N, E))), i = N - o, n = E - a;
            }
            if (!(o >= 0 && a >= 0 && i >= 0 && n >= 0)) return t;
            const l = Math.ceil(2.3 * Math.sqrt(o + a)), u = l * 8 + (i ? 4 : 0) + (n ? 4 : 0);
            if (u === 0) return t;
            if (l === 0) return t[0] = t[6] = e + i, t[1] = t[3] = s + n, t[2] = t[4] = e - i, t[5] = t[7] = s - n, t;
            let h = 0, c = l * 4 + (i ? 2 : 0) + 2, p = c, d = u, g = i + o, _ = n, m = e + g, b = e - g, v = s + _;
            if (t[h++] = m, t[h++] = v, t[--c] = v, t[--c] = b, n) {
                const B = s - _;
                t[p++] = b, t[p++] = B, t[--d] = B, t[--d] = m;
            }
            for(let B = 1; B < l; B++){
                const N = Math.PI / 2 * (B / l), E = i + Math.cos(N) * o, M = n + Math.sin(N) * a, z = e + E, L = e - E, $ = s + M, D = s - M;
                t[h++] = z, t[h++] = $, t[--c] = $, t[--c] = L, t[p++] = L, t[p++] = D, t[--d] = D, t[--d] = z;
            }
            g = i, _ = n + a, m = e + g, b = e - g, v = s + _;
            const S = s - _;
            return t[h++] = m, t[h++] = v, t[--d] = S, t[--d] = m, i && (t[h++] = b, t[h++] = v, t[--d] = S, t[--d] = b), t;
        },
        triangulate (r, t, e, s, i, n) {
            if (r.length === 0) return;
            let o = 0, a = 0;
            for(let h = 0; h < r.length; h += 2)o += r[h], a += r[h + 1];
            o /= r.length / 2, a /= r.length / 2;
            let l = s;
            t[l * e] = o, t[l * e + 1] = a;
            const u = l++;
            for(let h = 0; h < r.length; h += 2)t[l * e] = r[h], t[l * e + 1] = r[h + 1], h > 0 && (i[n++] = l, i[n++] = u, i[n++] = l - 1), l++;
            i[n++] = u + 1, i[n++] = u, i[n++] = l - 1;
        }
    }, Du = {
        ...Je,
        extension: {
            ...Je.extension,
            name: "ellipse"
        }
    }, Bu = {
        ...Je,
        extension: {
            ...Je.extension,
            name: "roundedRectangle"
        }
    }, wo = 1e-4, zi = 1e-4;
    function Fu(r) {
        const t = r.length;
        if (t < 6) return 1;
        let e = 0;
        for(let s = 0, i = r[t - 2], n = r[t - 1]; s < t; s += 2){
            const o = r[s], a = r[s + 1];
            e += (o - i) * (a + n), i = o, n = a;
        }
        return e < 0 ? -1 : 1;
    }
    function Li(r, t, e, s, i, n, o, a) {
        const l = r - e * i, u = t - s * i, h = r + e * n, c = t + s * n;
        let p, d;
        o ? (p = s, d = -e) : (p = -s, d = e);
        const g = l + p, _ = u + d, m = h + p, b = c + d;
        return a.push(g, _), a.push(m, b), 2;
    }
    function ae(r, t, e, s, i, n, o, a) {
        const l = e - r, u = s - t;
        let h = Math.atan2(l, u), c = Math.atan2(i - r, n - t);
        a && h < c ? h += Math.PI * 2 : !a && h > c && (c += Math.PI * 2);
        let p = h;
        const d = c - h, g = Math.abs(d), _ = Math.sqrt(l * l + u * u), m = (15 * g * Math.sqrt(_) / Math.PI >> 0) + 1, b = d / m;
        if (p += b, a) {
            o.push(r, t), o.push(e, s);
            for(let v = 1, S = p; v < m; v++, S += b)o.push(r, t), o.push(r + Math.sin(S) * _, t + Math.cos(S) * _);
            o.push(r, t), o.push(i, n);
        } else {
            o.push(e, s), o.push(r, t);
            for(let v = 1, S = p; v < m; v++, S += b)o.push(r + Math.sin(S) * _, t + Math.cos(S) * _), o.push(r, t);
            o.push(i, n), o.push(r, t);
        }
        return m * 2;
    }
    function Gu(r, t, e, s, i, n) {
        const o = wo;
        if (r.length === 0) return;
        const a = t;
        let l = a.alignment;
        if (t.alignment !== .5) {
            let A = Fu(r);
            l = (l - .5) * A + .5;
        }
        const u = new At(r[0], r[1]), h = new At(r[r.length - 2], r[r.length - 1]), c = s, p = Math.abs(u.x - h.x) < o && Math.abs(u.y - h.y) < o;
        if (c) {
            r = r.slice(), p && (r.pop(), r.pop(), h.set(r[r.length - 2], r[r.length - 1]));
            const A = (u.x + h.x) * .5, I = (h.y + u.y) * .5;
            r.unshift(A, I), r.push(A, I);
        }
        const d = i, g = r.length / 2;
        let _ = r.length;
        const m = d.length / 2, b = a.width / 2, v = b * b, S = a.miterLimit * a.miterLimit;
        let B = r[0], N = r[1], E = r[2], M = r[3], z = 0, L = 0, $ = -(N - M), D = B - E, k = 0, V = 0, H = Math.sqrt($ * $ + D * D);
        $ /= H, D /= H, $ *= b, D *= b;
        const Z = l, f = (1 - Z) * 2, x = Z * 2;
        c || (a.cap === "round" ? _ += ae(B - $ * (f - x) * .5, N - D * (f - x) * .5, B - $ * f, N - D * f, B + $ * x, N + D * x, d, !0) + 2 : a.cap === "square" && (_ += Li(B, N, $, D, f, x, !0, d))), d.push(B - $ * f, N - D * f), d.push(B + $ * x, N + D * x);
        for(let A = 1; A < g - 1; ++A){
            B = r[(A - 1) * 2], N = r[(A - 1) * 2 + 1], E = r[A * 2], M = r[A * 2 + 1], z = r[(A + 1) * 2], L = r[(A + 1) * 2 + 1], $ = -(N - M), D = B - E, H = Math.sqrt($ * $ + D * D), $ /= H, D /= H, $ *= b, D *= b, k = -(M - L), V = E - z, H = Math.sqrt(k * k + V * V), k /= H, V /= H, k *= b, V *= b;
            const I = E - B, F = N - M, T = E - z, R = L - M, U = I * T + F * R, W = F * T - R * I, q = W < 0;
            if (Math.abs(W) < .001 * Math.abs(U)) {
                d.push(E - $ * f, M - D * f), d.push(E + $ * x, M + D * x), U >= 0 && (a.join === "round" ? _ += ae(E, M, E - $ * f, M - D * f, E - k * f, M - V * f, d, !1) + 4 : _ += 2, d.push(E - k * x, M - V * x), d.push(E + k * f, M + V * f));
                continue;
            }
            const at = (-$ + B) * (-D + M) - (-$ + E) * (-D + N), tt = (-k + z) * (-V + M) - (-k + E) * (-V + L), gt = (I * tt - T * at) / W, rt = (R * at - F * tt) / W, Kt = (gt - E) * (gt - E) + (rt - M) * (rt - M), Mt = E + (gt - E) * f, Lt = M + (rt - M) * f, Ut = E - (gt - E) * x, J = M - (rt - M) * x, st = Math.min(I * I + F * F, T * T + R * R), $r = q ? f : x, Mo = st + $r * $r * v;
            Kt <= Mo ? a.join === "bevel" || Kt / v > S ? (q ? (d.push(Mt, Lt), d.push(E + $ * x, M + D * x), d.push(Mt, Lt), d.push(E + k * x, M + V * x)) : (d.push(E - $ * f, M - D * f), d.push(Ut, J), d.push(E - k * f, M - V * f), d.push(Ut, J)), _ += 2) : a.join === "round" ? q ? (d.push(Mt, Lt), d.push(E + $ * x, M + D * x), _ += ae(E, M, E + $ * x, M + D * x, E + k * x, M + V * x, d, !0) + 4, d.push(Mt, Lt), d.push(E + k * x, M + V * x)) : (d.push(E - $ * f, M - D * f), d.push(Ut, J), _ += ae(E, M, E - $ * f, M - D * f, E - k * f, M - V * f, d, !1) + 4, d.push(E - k * f, M - V * f), d.push(Ut, J)) : (d.push(Mt, Lt), d.push(Ut, J)) : (d.push(E - $ * f, M - D * f), d.push(E + $ * x, M + D * x), a.join === "round" ? q ? _ += ae(E, M, E + $ * x, M + D * x, E + k * x, M + V * x, d, !0) + 2 : _ += ae(E, M, E - $ * f, M - D * f, E - k * f, M - V * f, d, !1) + 2 : a.join === "miter" && Kt / v <= S && (q ? (d.push(Ut, J), d.push(Ut, J)) : (d.push(Mt, Lt), d.push(Mt, Lt)), _ += 2), d.push(E - k * f, M - V * f), d.push(E + k * x, M + V * x), _ += 2);
        }
        B = r[(g - 2) * 2], N = r[(g - 2) * 2 + 1], E = r[(g - 1) * 2], M = r[(g - 1) * 2 + 1], $ = -(N - M), D = B - E, H = Math.sqrt($ * $ + D * D), $ /= H, D /= H, $ *= b, D *= b, d.push(E - $ * f, M - D * f), d.push(E + $ * x, M + D * x), c || (a.cap === "round" ? _ += ae(E - $ * (f - x) * .5, M - D * (f - x) * .5, E - $ * f, M - D * f, E + $ * x, M + D * x, d, !1) + 2 : a.cap === "square" && (_ += Li(E, M, $, D, f, x, !1, d)));
        const C = zi * zi;
        for(let A = m; A < _ + m - 2; ++A)B = d[A * 2], N = d[A * 2 + 1], E = d[(A + 1) * 2], M = d[(A + 1) * 2 + 1], z = d[(A + 2) * 2], L = d[(A + 2) * 2 + 1], !(Math.abs(B * (M - L) + E * (L - N) + z * (N - M)) < C) && n.push(A, A + 1, A + 2);
    }
    function Vu(r, t, e, s) {
        const i = wo;
        if (r.length === 0) return;
        const n = r[0], o = r[1], a = r[r.length - 2], l = r[r.length - 1], u = t || Math.abs(n - a) < i && Math.abs(o - l) < i, h = e, c = r.length / 2, p = h.length / 2;
        for(let d = 0; d < c; d++)h.push(r[d * 2]), h.push(r[d * 2 + 1]);
        for(let d = 0; d < c - 1; d++)s.push(p + d, p + d + 1);
        u && s.push(p + c - 1, p);
    }
    function Co(r, t, e, s, i, n, o) {
        const a = Sh(r, t, 2);
        if (!a) return;
        for(let u = 0; u < a.length; u += 3)n[o++] = a[u] + i, n[o++] = a[u + 1] + i, n[o++] = a[u + 2] + i;
        let l = i * s;
        for(let u = 0; u < r.length; u += 2)e[l] = r[u], e[l + 1] = r[u + 1], l += s;
    }
    const Nu = [], $u = {
        extension: {
            type: ht.ShapeBuilder,
            name: "polygon"
        },
        build (r, t) {
            for(let e = 0; e < r.points.length; e++)t[e] = r.points[e];
            return t;
        },
        triangulate (r, t, e, s, i, n) {
            Co(r, Nu, t, e, s, i, n);
        }
    }, Ou = {
        extension: {
            type: ht.ShapeBuilder,
            name: "rectangle"
        },
        build (r, t) {
            const e = r, s = e.x, i = e.y, n = e.width, o = e.height;
            return n >= 0 && o >= 0 && (t[0] = s, t[1] = i, t[2] = s + n, t[3] = i, t[4] = s + n, t[5] = i + o, t[6] = s, t[7] = i + o), t;
        },
        triangulate (r, t, e, s, i, n) {
            let o = 0;
            s *= e, t[s + o] = r[0], t[s + o + 1] = r[1], o += e, t[s + o] = r[2], t[s + o + 1] = r[3], o += e, t[s + o] = r[6], t[s + o + 1] = r[7], o += e, t[s + o] = r[4], t[s + o + 1] = r[5], o += e;
            const a = s / e;
            i[n++] = a, i[n++] = a + 1, i[n++] = a + 2, i[n++] = a + 1, i[n++] = a + 3, i[n++] = a + 2;
        }
    }, zu = {
        extension: {
            type: ht.ShapeBuilder,
            name: "triangle"
        },
        build (r, t) {
            return t[0] = r.x, t[1] = r.y, t[2] = r.x2, t[3] = r.y2, t[4] = r.x3, t[5] = r.y3, t;
        },
        triangulate (r, t, e, s, i, n) {
            let o = 0;
            s *= e, t[s + o] = r[0], t[s + o + 1] = r[1], o += e, t[s + o] = r[2], t[s + o + 1] = r[3], o += e, t[s + o] = r[4], t[s + o + 1] = r[5];
            const a = s / e;
            i[n++] = a, i[n++] = a + 1, i[n++] = a + 2;
        }
    }, Lu = new et, Uu = new vt;
    function Hu(r, t, e, s) {
        const i = t.matrix ? r.copyFrom(t.matrix).invert() : r.identity();
        if (t.textureSpace === "local") {
            const n = e.getBounds(Uu);
            i.translate(-n.x, -n.y), i.scale(1 / n.width, 1 / n.height);
        } else {
            i.translate(t.texture.frame.x, t.texture.frame.y), i.scale(1 / t.texture.source.width, 1 / t.texture.source.height);
            const n = t.texture.source.style;
            n.addressMode === "clamp-to-edge" && (n.addressMode = "repeat", n.update());
        }
        return s && i.append(Lu.copyFrom(s).invert()), i;
    }
    const Rs = {};
    Vt.handleByMap(ht.ShapeBuilder, Rs);
    Vt.add(Ou, $u, zu, Je, Du, Bu);
    const Wu = new vt, Yu = new et;
    function Xu(r, t) {
        const { geometryData: e, batches: s } = t;
        s.length = 0, e.indices.length = 0, e.vertices.length = 0, e.uvs.length = 0;
        for(let i = 0; i < r.instructions.length; i++){
            const n = r.instructions[i];
            if (n.action === "texture") ju(n.data, s, e);
            else if (n.action === "fill" || n.action === "stroke") {
                const o = n.action === "stroke", a = n.data.path.shapePath, l = n.data.style, u = n.data.hole;
                o && u && Ui(u.shapePath, l, !0, s, e), u && (a.shapePrimitives[a.shapePrimitives.length - 1].holes = u.shapePath.shapePrimitives), Ui(a, l, o, s, e);
            }
        }
    }
    function ju(r, t, e) {
        const { vertices: s, uvs: i, indices: n } = e, o = n.length, a = s.length / 2, l = [], u = Rs.rectangle, h = Wu, c = r.image;
        h.x = r.dx, h.y = r.dy, h.width = r.dw, h.height = r.dh;
        const p = r.transform;
        u.build(h, l), p && bo(l, p), u.triangulate(l, s, 2, a, n, o);
        const d = c.uvs;
        i.push(d.x0, d.y0, d.x1, d.y1, d.x3, d.y3, d.x2, d.y2);
        const g = Jt.get(vo);
        g.indexOffset = o, g.indexSize = n.length - o, g.attributeOffset = a, g.attributeSize = s.length / 2 - a, g.baseColor = r.style, g.alpha = r.alpha, g.texture = c, g.geometryData = e, t.push(g);
    }
    function Ui(r, t, e, s, i) {
        const { vertices: n, uvs: o, indices: a } = i;
        r.shapePrimitives.forEach(({ shape: l, transform: u, holes: h })=>{
            const c = a.length, p = n.length / 2, d = [], g = Rs[l.type];
            let _ = "triangle-list";
            if (g.build(l, d), u && bo(d, u), e) {
                const S = l.closePath ?? !0, B = t;
                B.pixelLine ? (Vu(d, S, n, a), _ = "line-list") : Gu(d, B, !1, S, n, a);
            } else if (h) {
                const S = [], B = d.slice();
                qu(h).forEach((E)=>{
                    S.push(B.length / 2), B.push(...E);
                }), Co(B, S, n, 2, p, a, c);
            } else g.triangulate(d, n, 2, p, a, c);
            const m = o.length / 2, b = t.texture;
            if (b !== ut.WHITE) {
                const S = Hu(Yu, t, l, u);
                Iu(n, 2, p, o, m, 2, n.length / 2 - p, S);
            } else Ru(o, m, 2, n.length / 2 - p);
            const v = Jt.get(vo);
            v.indexOffset = c, v.indexSize = a.length - c, v.attributeOffset = p, v.attributeSize = n.length / 2 - p, v.baseColor = t.color, v.alpha = t.alpha, v.texture = b, v.geometryData = i, v.topology = _, s.push(v);
        });
    }
    function qu(r) {
        const t = [];
        for(let e = 0; e < r.length; e++){
            const s = r[e].shape, i = [];
            Rs[s.type].build(s, i), t.push(i);
        }
        return t;
    }
    class Ku {
        constructor(){
            this.batches = [], this.geometryData = {
                vertices: [],
                uvs: [],
                indices: []
            };
        }
    }
    class Zu {
        constructor(){
            this.batcher = new Mu, this.instructions = new En;
        }
        init() {
            this.instructions.reset();
        }
        get geometry() {
            return ct(ol, "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead."), this.batcher.geometry;
        }
    }
    const Vr = class Cr {
        constructor(t){
            this._gpuContextHash = {}, this._graphicsDataContextHash = Object.create(null), t.renderableGC.addManagedHash(this, "_gpuContextHash"), t.renderableGC.addManagedHash(this, "_graphicsDataContextHash");
        }
        init(t) {
            Cr.defaultOptions.bezierSmoothness = t?.bezierSmoothness ?? Cr.defaultOptions.bezierSmoothness;
        }
        getContextRenderData(t) {
            return this._graphicsDataContextHash[t.uid] || this._initContextRenderData(t);
        }
        updateGpuContext(t) {
            let e = this._gpuContextHash[t.uid] || this._initContext(t);
            if (t.dirty) {
                e ? this._cleanGraphicsContextData(t) : e = this._initContext(t), Xu(t, e);
                const s = t.batchMode;
                t.customShader || s === "no-batch" ? e.isBatchable = !1 : s === "auto" && (e.isBatchable = e.geometryData.vertices.length < 400), t.dirty = !1;
            }
            return e;
        }
        getGpuContext(t) {
            return this._gpuContextHash[t.uid] || this._initContext(t);
        }
        _initContextRenderData(t) {
            const e = Jt.get(Zu), { batches: s, geometryData: i } = this._gpuContextHash[t.uid], n = i.vertices.length, o = i.indices.length;
            for(let h = 0; h < s.length; h++)s[h].applyTransform = !1;
            const a = e.batcher;
            a.ensureAttributeBuffer(n), a.ensureIndexBuffer(o), a.begin();
            for(let h = 0; h < s.length; h++){
                const c = s[h];
                a.add(c);
            }
            a.finish(e.instructions);
            const l = a.geometry;
            l.indexBuffer.setDataWithSize(a.indexBuffer, a.indexSize, !0), l.buffers[0].setDataWithSize(a.attributeBuffer.float32View, a.attributeSize, !0);
            const u = a.batches;
            for(let h = 0; h < u.length; h++){
                const c = u[h];
                c.bindGroup = Uh(c.textures.textures, c.textures.count);
            }
            return this._graphicsDataContextHash[t.uid] = e, e;
        }
        _initContext(t) {
            const e = new Ku;
            return e.context = t, this._gpuContextHash[t.uid] = e, t.on("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid];
        }
        onGraphicsContextDestroy(t) {
            this._cleanGraphicsContextData(t), t.off("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid] = null;
        }
        _cleanGraphicsContextData(t) {
            const e = this._gpuContextHash[t.uid];
            e.isBatchable || this._graphicsDataContextHash[t.uid] && (Jt.return(this.getContextRenderData(t)), this._graphicsDataContextHash[t.uid] = null), e.batches && e.batches.forEach((s)=>{
                Jt.return(s);
            });
        }
        destroy() {
            for(const t in this._gpuContextHash)this._gpuContextHash[t] && this.onGraphicsContextDestroy(this._gpuContextHash[t].context);
        }
    };
    Vr.extension = {
        type: [
            ht.WebGLSystem,
            ht.WebGPUSystem,
            ht.CanvasSystem
        ],
        name: "graphicsContext"
    };
    Vr.defaultOptions = {
        bezierSmoothness: .5
    };
    So = Vr;
    const Qu = 8, fs = 11920929e-14, Ju = 1;
    function Ao(r, t, e, s, i, n, o, a, l, u) {
        const c = Math.min(.99, Math.max(0, u ?? So.defaultOptions.bezierSmoothness));
        let p = (Ju - c) / 1;
        return p *= p, tc(t, e, s, i, n, o, a, l, r, p), r;
    }
    function tc(r, t, e, s, i, n, o, a, l, u) {
        Sr(r, t, e, s, i, n, o, a, l, u, 0), l.push(o, a);
    }
    function Sr(r, t, e, s, i, n, o, a, l, u, h) {
        if (h > Qu) return;
        const c = (r + e) / 2, p = (t + s) / 2, d = (e + i) / 2, g = (s + n) / 2, _ = (i + o) / 2, m = (n + a) / 2, b = (c + d) / 2, v = (p + g) / 2, S = (d + _) / 2, B = (g + m) / 2, N = (b + S) / 2, E = (v + B) / 2;
        if (h > 0) {
            let M = o - r, z = a - t;
            const L = Math.abs((e - o) * z - (s - a) * M), $ = Math.abs((i - o) * z - (n - a) * M);
            if (L > fs && $ > fs) {
                if ((L + $) * (L + $) <= u * (M * M + z * z)) {
                    l.push(N, E);
                    return;
                }
            } else if (L > fs) {
                if (L * L <= u * (M * M + z * z)) {
                    l.push(N, E);
                    return;
                }
            } else if ($ > fs) {
                if ($ * $ <= u * (M * M + z * z)) {
                    l.push(N, E);
                    return;
                }
            } else if (M = N - (r + o) / 2, z = E - (t + a) / 2, M * M + z * z <= u) {
                l.push(N, E);
                return;
            }
        }
        Sr(r, t, c, p, b, v, N, E, l, u, h + 1), Sr(N, E, S, B, _, m, o, a, l, u, h + 1);
    }
    const ec = 8, sc = 11920929e-14, rc = 1;
    function ic(r, t, e, s, i, n, o, a) {
        const u = Math.min(.99, Math.max(0, a ?? So.defaultOptions.bezierSmoothness));
        let h = (rc - u) / 1;
        return h *= h, nc(t, e, s, i, n, o, r, h), r;
    }
    function nc(r, t, e, s, i, n, o, a) {
        Ar(o, r, t, e, s, i, n, a, 0), o.push(i, n);
    }
    function Ar(r, t, e, s, i, n, o, a, l) {
        if (l > ec) return;
        const u = (t + s) / 2, h = (e + i) / 2, c = (s + n) / 2, p = (i + o) / 2, d = (u + c) / 2, g = (h + p) / 2;
        let _ = n - t, m = o - e;
        const b = Math.abs((s - n) * m - (i - o) * _);
        if (b > sc) {
            if (b * b <= a * (_ * _ + m * m)) {
                r.push(d, g);
                return;
            }
        } else if (_ = d - (t + n) / 2, m = g - (e + o) / 2, _ * _ + m * m <= a) {
            r.push(d, g);
            return;
        }
        Ar(r, t, e, u, h, d, g, a, l + 1), Ar(r, d, g, c, p, n, o, a, l + 1);
    }
    function To(r, t, e, s, i, n, o, a) {
        let l = Math.abs(i - n);
        (!o && i > n || o && n > i) && (l = 2 * Math.PI - l), a || (a = Math.max(6, Math.floor(6 * Math.pow(s, 1 / 3) * (l / Math.PI)))), a = Math.max(a, 3);
        let u = l / a, h = i;
        u *= o ? -1 : 1;
        for(let c = 0; c < a + 1; c++){
            const p = Math.cos(h), d = Math.sin(h), g = t + p * s, _ = e + d * s;
            r.push(g, _), h += u;
        }
    }
    function oc(r, t, e, s, i, n) {
        const o = r[r.length - 2], l = r[r.length - 1] - e, u = o - t, h = i - e, c = s - t, p = Math.abs(l * c - u * h);
        if (p < 1e-8 || n === 0) {
            (r[r.length - 2] !== t || r[r.length - 1] !== e) && r.push(t, e);
            return;
        }
        const d = l * l + u * u, g = h * h + c * c, _ = l * h + u * c, m = n * Math.sqrt(d) / p, b = n * Math.sqrt(g) / p, v = m * _ / d, S = b * _ / g, B = m * c + b * u, N = m * h + b * l, E = u * (b + v), M = l * (b + v), z = c * (m + S), L = h * (m + S), $ = Math.atan2(M - N, E - B), D = Math.atan2(L - N, z - B);
        To(r, B + t, N + e, n, $, D, u * h > c * l);
    }
    const He = Math.PI * 2, rr = {
        centerX: 0,
        centerY: 0,
        ang1: 0,
        ang2: 0
    }, ir = ({ x: r, y: t }, e, s, i, n, o, a, l)=>{
        r *= e, t *= s;
        const u = i * r - n * t, h = n * r + i * t;
        return l.x = u + o, l.y = h + a, l;
    };
    function ac(r, t) {
        const e = t === -1.5707963267948966 ? -.551915024494 : 1.3333333333333333 * Math.tan(t / 4), s = t === 1.5707963267948966 ? .551915024494 : e, i = Math.cos(r), n = Math.sin(r), o = Math.cos(r + t), a = Math.sin(r + t);
        return [
            {
                x: i - n * s,
                y: n + i * s
            },
            {
                x: o + a * s,
                y: a - o * s
            },
            {
                x: o,
                y: a
            }
        ];
    }
    const Hi = (r, t, e, s)=>{
        const i = r * s - t * e < 0 ? -1 : 1;
        let n = r * e + t * s;
        return n > 1 && (n = 1), n < -1 && (n = -1), i * Math.acos(n);
    }, lc = (r, t, e, s, i, n, o, a, l, u, h, c, p)=>{
        const d = Math.pow(i, 2), g = Math.pow(n, 2), _ = Math.pow(h, 2), m = Math.pow(c, 2);
        let b = d * g - d * m - g * _;
        b < 0 && (b = 0), b /= d * m + g * _, b = Math.sqrt(b) * (o === a ? -1 : 1);
        const v = b * i / n * c, S = b * -n / i * h, B = u * v - l * S + (r + e) / 2, N = l * v + u * S + (t + s) / 2, E = (h - v) / i, M = (c - S) / n, z = (-h - v) / i, L = (-c - S) / n, $ = Hi(1, 0, E, M);
        let D = Hi(E, M, z, L);
        a === 0 && D > 0 && (D -= He), a === 1 && D < 0 && (D += He), p.centerX = B, p.centerY = N, p.ang1 = $, p.ang2 = D;
    };
    function hc(r, t, e, s, i, n, o, a = 0, l = 0, u = 0) {
        if (n === 0 || o === 0) return;
        const h = Math.sin(a * He / 360), c = Math.cos(a * He / 360), p = c * (t - s) / 2 + h * (e - i) / 2, d = -h * (t - s) / 2 + c * (e - i) / 2;
        if (p === 0 && d === 0) return;
        n = Math.abs(n), o = Math.abs(o);
        const g = Math.pow(p, 2) / Math.pow(n, 2) + Math.pow(d, 2) / Math.pow(o, 2);
        g > 1 && (n *= Math.sqrt(g), o *= Math.sqrt(g)), lc(t, e, s, i, n, o, l, u, h, c, p, d, rr);
        let { ang1: _, ang2: m } = rr;
        const { centerX: b, centerY: v } = rr;
        let S = Math.abs(m) / (He / 4);
        Math.abs(1 - S) < 1e-7 && (S = 1);
        const B = Math.max(Math.ceil(S), 1);
        m /= B;
        let N = r[r.length - 2], E = r[r.length - 1];
        const M = {
            x: 0,
            y: 0
        };
        for(let z = 0; z < B; z++){
            const L = ac(_, m), { x: $, y: D } = ir(L[0], n, o, c, h, b, v, M), { x: k, y: V } = ir(L[1], n, o, c, h, b, v, M), { x: H, y: Z } = ir(L[2], n, o, c, h, b, v, M);
            Ao(r, N, E, $, D, k, V, H, Z), N = H, E = Z, _ += m;
        }
    }
    function uc(r, t, e) {
        const s = (o, a)=>{
            const l = a.x - o.x, u = a.y - o.y, h = Math.sqrt(l * l + u * u), c = l / h, p = u / h;
            return {
                len: h,
                nx: c,
                ny: p
            };
        }, i = (o, a)=>{
            o === 0 ? r.moveTo(a.x, a.y) : r.lineTo(a.x, a.y);
        };
        let n = t[t.length - 1];
        for(let o = 0; o < t.length; o++){
            const a = t[o % t.length], l = a.radius ?? e;
            if (l <= 0) {
                i(o, a), n = a;
                continue;
            }
            const u = t[(o + 1) % t.length], h = s(a, n), c = s(a, u);
            if (h.len < 1e-4 || c.len < 1e-4) {
                i(o, a), n = a;
                continue;
            }
            let p = Math.asin(h.nx * c.ny - h.ny * c.nx), d = 1, g = !1;
            h.nx * c.nx - h.ny * -c.ny < 0 ? p < 0 ? p = Math.PI + p : (p = Math.PI - p, d = -1, g = !0) : p > 0 && (d = -1, g = !0);
            const _ = p / 2;
            let m, b = Math.abs(Math.cos(_) * l / Math.sin(_));
            b > Math.min(h.len / 2, c.len / 2) ? (b = Math.min(h.len / 2, c.len / 2), m = Math.abs(b * Math.sin(_) / Math.cos(_))) : m = l;
            const v = a.x + c.nx * b + -c.ny * m * d, S = a.y + c.ny * b + c.nx * m * d, B = Math.atan2(h.ny, h.nx) + Math.PI / 2 * d, N = Math.atan2(c.ny, c.nx) - Math.PI / 2 * d;
            o === 0 && r.moveTo(v + Math.cos(B) * m, S + Math.sin(B) * m), r.arc(v, S, m, B, N, g), n = a;
        }
    }
    function cc(r, t, e, s) {
        const i = (a, l)=>Math.sqrt((a.x - l.x) ** 2 + (a.y - l.y) ** 2), n = (a, l, u)=>({
                x: a.x + (l.x - a.x) * u,
                y: a.y + (l.y - a.y) * u
            }), o = t.length;
        for(let a = 0; a < o; a++){
            const l = t[(a + 1) % o], u = l.radius ?? e;
            if (u <= 0) {
                a === 0 ? r.moveTo(l.x, l.y) : r.lineTo(l.x, l.y);
                continue;
            }
            const h = t[a], c = t[(a + 2) % o], p = i(h, l);
            let d;
            if (p < 1e-4) d = l;
            else {
                const m = Math.min(p / 2, u);
                d = n(l, h, m / p);
            }
            const g = i(c, l);
            let _;
            if (g < 1e-4) _ = l;
            else {
                const m = Math.min(g / 2, u);
                _ = n(l, c, m / g);
            }
            a === 0 ? r.moveTo(d.x, d.y) : r.lineTo(d.x, d.y), r.quadraticCurveTo(l.x, l.y, _.x, _.y, s);
        }
    }
    const dc = new vt;
    class fc {
        constructor(t){
            this.shapePrimitives = [], this._currentPoly = null, this._bounds = new zt, this._graphicsPath2D = t, this.signed = t.checkForHoles;
        }
        moveTo(t, e) {
            return this.startPoly(t, e), this;
        }
        lineTo(t, e) {
            this._ensurePoly();
            const s = this._currentPoly.points, i = s[s.length - 2], n = s[s.length - 1];
            return (i !== t || n !== e) && s.push(t, e), this;
        }
        arc(t, e, s, i, n, o) {
            this._ensurePoly(!1);
            const a = this._currentPoly.points;
            return To(a, t, e, s, i, n, o), this;
        }
        arcTo(t, e, s, i, n) {
            this._ensurePoly();
            const o = this._currentPoly.points;
            return oc(o, t, e, s, i, n), this;
        }
        arcToSvg(t, e, s, i, n, o, a) {
            const l = this._currentPoly.points;
            return hc(l, this._currentPoly.lastX, this._currentPoly.lastY, o, a, t, e, s, i, n), this;
        }
        bezierCurveTo(t, e, s, i, n, o, a) {
            this._ensurePoly();
            const l = this._currentPoly;
            return Ao(this._currentPoly.points, l.lastX, l.lastY, t, e, s, i, n, o, a), this;
        }
        quadraticCurveTo(t, e, s, i, n) {
            this._ensurePoly();
            const o = this._currentPoly;
            return ic(this._currentPoly.points, o.lastX, o.lastY, t, e, s, i, n), this;
        }
        closePath() {
            return this.endPoly(!0), this;
        }
        addPath(t, e) {
            this.endPoly(), e && !e.isIdentity() && (t = t.clone(!0), t.transform(e));
            const s = this.shapePrimitives, i = s.length;
            for(let n = 0; n < t.instructions.length; n++){
                const o = t.instructions[n];
                this[o.action](...o.data);
            }
            if (t.checkForHoles && s.length - i > 1) {
                let n = null;
                for(let o = i; o < s.length; o++){
                    const a = s[o];
                    if (a.shape.type === "polygon") {
                        const l = a.shape, u = n?.shape;
                        u && u.containsPolygon(l) ? (n.holes || (n.holes = []), n.holes.push(a), s.copyWithin(o, o + 1), s.length--, o--) : n = a;
                    }
                }
            }
            return this;
        }
        finish(t = !1) {
            this.endPoly(t);
        }
        rect(t, e, s, i, n) {
            return this.drawShape(new vt(t, e, s, i), n), this;
        }
        circle(t, e, s, i) {
            return this.drawShape(new Br(t, e, s), i), this;
        }
        poly(t, e, s) {
            const i = new Ue(t);
            return i.closePath = e, this.drawShape(i, s), this;
        }
        regularPoly(t, e, s, i, n = 0, o) {
            i = Math.max(i | 0, 3);
            const a = -1 * Math.PI / 2 + n, l = Math.PI * 2 / i, u = [];
            for(let h = 0; h < i; h++){
                const c = a - h * l;
                u.push(t + s * Math.cos(c), e + s * Math.sin(c));
            }
            return this.poly(u, !0, o), this;
        }
        roundPoly(t, e, s, i, n, o = 0, a) {
            if (i = Math.max(i | 0, 3), n <= 0) return this.regularPoly(t, e, s, i, o);
            const l = s * Math.sin(Math.PI / i) - .001;
            n = Math.min(n, l);
            const u = -1 * Math.PI / 2 + o, h = Math.PI * 2 / i, c = (i - 2) * Math.PI / i / 2;
            for(let p = 0; p < i; p++){
                const d = p * h + u, g = t + s * Math.cos(d), _ = e + s * Math.sin(d), m = d + Math.PI + c, b = d - Math.PI - c, v = g + n * Math.cos(m), S = _ + n * Math.sin(m), B = g + n * Math.cos(b), N = _ + n * Math.sin(b);
                p === 0 ? this.moveTo(v, S) : this.lineTo(v, S), this.quadraticCurveTo(g, _, B, N, a);
            }
            return this.closePath();
        }
        roundShape(t, e, s = !1, i) {
            return t.length < 3 ? this : (s ? cc(this, t, e, i) : uc(this, t, e), this.closePath());
        }
        filletRect(t, e, s, i, n) {
            if (n === 0) return this.rect(t, e, s, i);
            const o = Math.min(s, i) / 2, a = Math.min(o, Math.max(-o, n)), l = t + s, u = e + i, h = a < 0 ? -a : 0, c = Math.abs(a);
            return this.moveTo(t, e + c).arcTo(t + h, e + h, t + c, e, c).lineTo(l - c, e).arcTo(l - h, e + h, l, e + c, c).lineTo(l, u - c).arcTo(l - h, u - h, t + s - c, u, c).lineTo(t + c, u).arcTo(t + h, u - h, t, u - c, c).closePath();
        }
        chamferRect(t, e, s, i, n, o) {
            if (n <= 0) return this.rect(t, e, s, i);
            const a = Math.min(n, Math.min(s, i) / 2), l = t + s, u = e + i, h = [
                t + a,
                e,
                l - a,
                e,
                l,
                e + a,
                l,
                u - a,
                l - a,
                u,
                t + a,
                u,
                t,
                u - a,
                t,
                e + a
            ];
            for(let c = h.length - 1; c >= 2; c -= 2)h[c] === h[c - 2] && h[c - 1] === h[c - 3] && h.splice(c - 1, 2);
            return this.poly(h, !0, o);
        }
        ellipse(t, e, s, i, n) {
            return this.drawShape(new Fr(t, e, s, i), n), this;
        }
        roundRect(t, e, s, i, n, o) {
            return this.drawShape(new Gr(t, e, s, i, n), o), this;
        }
        drawShape(t, e) {
            return this.endPoly(), this.shapePrimitives.push({
                shape: t,
                transform: e
            }), this;
        }
        startPoly(t, e) {
            let s = this._currentPoly;
            return s && this.endPoly(), s = new Ue, s.points.push(t, e), this._currentPoly = s, this;
        }
        endPoly(t = !1) {
            const e = this._currentPoly;
            return e && e.points.length > 2 && (e.closePath = t, this.shapePrimitives.push({
                shape: e
            })), this._currentPoly = null, this;
        }
        _ensurePoly(t = !0) {
            if (!this._currentPoly && (this._currentPoly = new Ue, t)) {
                const e = this.shapePrimitives[this.shapePrimitives.length - 1];
                if (e) {
                    let s = e.shape.x, i = e.shape.y;
                    if (e.transform && !e.transform.isIdentity()) {
                        const n = e.transform, o = s;
                        s = n.a * s + n.c * i + n.tx, i = n.b * o + n.d * i + n.ty;
                    }
                    this._currentPoly.points.push(s, i);
                } else this._currentPoly.points.push(0, 0);
            }
        }
        buildPath() {
            const t = this._graphicsPath2D;
            this.shapePrimitives.length = 0, this._currentPoly = null;
            for(let e = 0; e < t.instructions.length; e++){
                const s = t.instructions[e];
                this[s.action](...s.data);
            }
            this.finish();
        }
        get bounds() {
            const t = this._bounds;
            t.clear();
            const e = this.shapePrimitives;
            for(let s = 0; s < e.length; s++){
                const i = e[s], n = i.shape.getBounds(dc);
                i.transform ? t.addRect(n, i.transform) : t.addRect(n);
            }
            return t;
        }
    }
    class Ee {
        constructor(t, e = !1){
            this.instructions = [], this.uid = _t("graphicsPath"), this._dirty = !0, this.checkForHoles = e, typeof t == "string" ? Gh(t, this) : this.instructions = t?.slice() ?? [];
        }
        get shapePath() {
            return this._shapePath || (this._shapePath = new fc(this)), this._dirty && (this._dirty = !1, this._shapePath.buildPath()), this._shapePath;
        }
        addPath(t, e) {
            return t = t.clone(), this.instructions.push({
                action: "addPath",
                data: [
                    t,
                    e
                ]
            }), this._dirty = !0, this;
        }
        arc(...t) {
            return this.instructions.push({
                action: "arc",
                data: t
            }), this._dirty = !0, this;
        }
        arcTo(...t) {
            return this.instructions.push({
                action: "arcTo",
                data: t
            }), this._dirty = !0, this;
        }
        arcToSvg(...t) {
            return this.instructions.push({
                action: "arcToSvg",
                data: t
            }), this._dirty = !0, this;
        }
        bezierCurveTo(...t) {
            return this.instructions.push({
                action: "bezierCurveTo",
                data: t
            }), this._dirty = !0, this;
        }
        bezierCurveToShort(t, e, s, i, n) {
            const o = this.instructions[this.instructions.length - 1], a = this.getLastPoint(At.shared);
            let l = 0, u = 0;
            if (!o || o.action !== "bezierCurveTo") l = a.x, u = a.y;
            else {
                l = o.data[2], u = o.data[3];
                const h = a.x, c = a.y;
                l = h + (h - l), u = c + (c - u);
            }
            return this.instructions.push({
                action: "bezierCurveTo",
                data: [
                    l,
                    u,
                    t,
                    e,
                    s,
                    i,
                    n
                ]
            }), this._dirty = !0, this;
        }
        closePath() {
            return this.instructions.push({
                action: "closePath",
                data: []
            }), this._dirty = !0, this;
        }
        ellipse(...t) {
            return this.instructions.push({
                action: "ellipse",
                data: t
            }), this._dirty = !0, this;
        }
        lineTo(...t) {
            return this.instructions.push({
                action: "lineTo",
                data: t
            }), this._dirty = !0, this;
        }
        moveTo(...t) {
            return this.instructions.push({
                action: "moveTo",
                data: t
            }), this;
        }
        quadraticCurveTo(...t) {
            return this.instructions.push({
                action: "quadraticCurveTo",
                data: t
            }), this._dirty = !0, this;
        }
        quadraticCurveToShort(t, e, s) {
            const i = this.instructions[this.instructions.length - 1], n = this.getLastPoint(At.shared);
            let o = 0, a = 0;
            if (!i || i.action !== "quadraticCurveTo") o = n.x, a = n.y;
            else {
                o = i.data[0], a = i.data[1];
                const l = n.x, u = n.y;
                o = l + (l - o), a = u + (u - a);
            }
            return this.instructions.push({
                action: "quadraticCurveTo",
                data: [
                    o,
                    a,
                    t,
                    e,
                    s
                ]
            }), this._dirty = !0, this;
        }
        rect(t, e, s, i, n) {
            return this.instructions.push({
                action: "rect",
                data: [
                    t,
                    e,
                    s,
                    i,
                    n
                ]
            }), this._dirty = !0, this;
        }
        circle(t, e, s, i) {
            return this.instructions.push({
                action: "circle",
                data: [
                    t,
                    e,
                    s,
                    i
                ]
            }), this._dirty = !0, this;
        }
        roundRect(...t) {
            return this.instructions.push({
                action: "roundRect",
                data: t
            }), this._dirty = !0, this;
        }
        poly(...t) {
            return this.instructions.push({
                action: "poly",
                data: t
            }), this._dirty = !0, this;
        }
        regularPoly(...t) {
            return this.instructions.push({
                action: "regularPoly",
                data: t
            }), this._dirty = !0, this;
        }
        roundPoly(...t) {
            return this.instructions.push({
                action: "roundPoly",
                data: t
            }), this._dirty = !0, this;
        }
        roundShape(...t) {
            return this.instructions.push({
                action: "roundShape",
                data: t
            }), this._dirty = !0, this;
        }
        filletRect(...t) {
            return this.instructions.push({
                action: "filletRect",
                data: t
            }), this._dirty = !0, this;
        }
        chamferRect(...t) {
            return this.instructions.push({
                action: "chamferRect",
                data: t
            }), this._dirty = !0, this;
        }
        star(t, e, s, i, n, o, a) {
            n || (n = i / 2);
            const l = -1 * Math.PI / 2 + o, u = s * 2, h = Math.PI * 2 / u, c = [];
            for(let p = 0; p < u; p++){
                const d = p % 2 ? n : i, g = p * h + l;
                c.push(t + d * Math.cos(g), e + d * Math.sin(g));
            }
            return this.poly(c, !0, a), this;
        }
        clone(t = !1) {
            const e = new Ee;
            if (e.checkForHoles = this.checkForHoles, !t) e.instructions = this.instructions.slice();
            else for(let s = 0; s < this.instructions.length; s++){
                const i = this.instructions[s];
                e.instructions.push({
                    action: i.action,
                    data: i.data.slice()
                });
            }
            return e;
        }
        clear() {
            return this.instructions.length = 0, this._dirty = !0, this;
        }
        transform(t) {
            if (t.isIdentity()) return this;
            const e = t.a, s = t.b, i = t.c, n = t.d, o = t.tx, a = t.ty;
            let l = 0, u = 0, h = 0, c = 0, p = 0, d = 0, g = 0, _ = 0;
            for(let m = 0; m < this.instructions.length; m++){
                const b = this.instructions[m], v = b.data;
                switch(b.action){
                    case "moveTo":
                    case "lineTo":
                        l = v[0], u = v[1], v[0] = e * l + i * u + o, v[1] = s * l + n * u + a;
                        break;
                    case "bezierCurveTo":
                        h = v[0], c = v[1], p = v[2], d = v[3], l = v[4], u = v[5], v[0] = e * h + i * c + o, v[1] = s * h + n * c + a, v[2] = e * p + i * d + o, v[3] = s * p + n * d + a, v[4] = e * l + i * u + o, v[5] = s * l + n * u + a;
                        break;
                    case "quadraticCurveTo":
                        h = v[0], c = v[1], l = v[2], u = v[3], v[0] = e * h + i * c + o, v[1] = s * h + n * c + a, v[2] = e * l + i * u + o, v[3] = s * l + n * u + a;
                        break;
                    case "arcToSvg":
                        l = v[5], u = v[6], g = v[0], _ = v[1], v[0] = e * g + i * _, v[1] = s * g + n * _, v[5] = e * l + i * u + o, v[6] = s * l + n * u + a;
                        break;
                    case "circle":
                        v[4] = Ge(v[3], t);
                        break;
                    case "rect":
                        v[4] = Ge(v[4], t);
                        break;
                    case "ellipse":
                        v[8] = Ge(v[8], t);
                        break;
                    case "roundRect":
                        v[5] = Ge(v[5], t);
                        break;
                    case "addPath":
                        v[0].transform(t);
                        break;
                    case "poly":
                        v[2] = Ge(v[2], t);
                        break;
                    default:
                        Dt("unknown transform action", b.action);
                        break;
                }
            }
            return this._dirty = !0, this;
        }
        get bounds() {
            return this.shapePath.bounds;
        }
        getLastPoint(t) {
            let e = this.instructions.length - 1, s = this.instructions[e];
            if (!s) return t.x = 0, t.y = 0, t;
            for(; s.action === "closePath";){
                if (e--, e < 0) return t.x = 0, t.y = 0, t;
                s = this.instructions[e];
            }
            switch(s.action){
                case "moveTo":
                case "lineTo":
                    t.x = s.data[0], t.y = s.data[1];
                    break;
                case "quadraticCurveTo":
                    t.x = s.data[2], t.y = s.data[3];
                    break;
                case "bezierCurveTo":
                    t.x = s.data[4], t.y = s.data[5];
                    break;
                case "arc":
                case "arcToSvg":
                    t.x = s.data[5], t.y = s.data[6];
                    break;
                case "addPath":
                    s.data[0].getLastPoint(t);
                    break;
            }
            return t;
        }
    }
    function Ge(r, t) {
        return r ? r.prepend(t) : t.clone();
    }
    function ft(r, t, e) {
        const s = r.getAttribute(t);
        return s ? Number(s) : e;
    }
    function pc(r, t) {
        const e = r.querySelectorAll("defs");
        for(let s = 0; s < e.length; s++){
            const i = e[s];
            for(let n = 0; n < i.children.length; n++){
                const o = i.children[n];
                switch(o.nodeName.toLowerCase()){
                    case "lineargradient":
                        t.defs[o.id] = mc(o);
                        break;
                    case "radialgradient":
                        t.defs[o.id] = gc();
                        break;
                }
            }
        }
    }
    function mc(r) {
        const t = ft(r, "x1", 0), e = ft(r, "y1", 0), s = ft(r, "x2", 1), i = ft(r, "y2", 0), n = r.getAttribute("gradientUnits") || "objectBoundingBox", o = new Is(t, e, s, i, n === "objectBoundingBox" ? "local" : "global");
        for(let a = 0; a < r.children.length; a++){
            const l = r.children[a], u = ft(l, "offset", 0), h = Ft.shared.setValue(l.getAttribute("stop-color")).toNumber();
            o.addColorStop(u, h);
        }
        return o;
    }
    function gc(r) {
        return Dt("[SVG Parser] Radial gradients are not yet supported"), new Is(0, 0, 1, 0);
    }
    function Wi(r) {
        const t = r.match(/url\s*\(\s*['"]?\s*#([^'"\s)]+)\s*['"]?\s*\)/i);
        return t ? t[1] : "";
    }
    const Yi = {
        fill: {
            type: "paint",
            default: 0
        },
        "fill-opacity": {
            type: "number",
            default: 1
        },
        stroke: {
            type: "paint",
            default: 0
        },
        "stroke-width": {
            type: "number",
            default: 1
        },
        "stroke-opacity": {
            type: "number",
            default: 1
        },
        "stroke-linecap": {
            type: "string",
            default: "butt"
        },
        "stroke-linejoin": {
            type: "string",
            default: "miter"
        },
        "stroke-miterlimit": {
            type: "number",
            default: 10
        },
        "stroke-dasharray": {
            type: "string",
            default: "none"
        },
        "stroke-dashoffset": {
            type: "number",
            default: 0
        },
        opacity: {
            type: "number",
            default: 1
        }
    };
    function ko(r, t) {
        const e = r.getAttribute("style"), s = {}, i = {}, n = {
            strokeStyle: s,
            fillStyle: i,
            useFill: !1,
            useStroke: !1
        };
        for(const o in Yi){
            const a = r.getAttribute(o);
            a && Xi(t, n, o, a.trim());
        }
        if (e) {
            const o = e.split(";");
            for(let a = 0; a < o.length; a++){
                const l = o[a].trim(), [u, h] = l.split(":");
                Yi[u] && Xi(t, n, u, h.trim());
            }
        }
        return {
            strokeStyle: n.useStroke ? s : null,
            fillStyle: n.useFill ? i : null,
            useFill: n.useFill,
            useStroke: n.useStroke
        };
    }
    function Xi(r, t, e, s) {
        switch(e){
            case "stroke":
                if (s !== "none") {
                    if (s.startsWith("url(")) {
                        const i = Wi(s);
                        t.strokeStyle.fill = r.defs[i];
                    } else t.strokeStyle.color = Ft.shared.setValue(s).toNumber();
                    t.useStroke = !0;
                }
                break;
            case "stroke-width":
                t.strokeStyle.width = Number(s);
                break;
            case "fill":
                if (s !== "none") {
                    if (s.startsWith("url(")) {
                        const i = Wi(s);
                        t.fillStyle.fill = r.defs[i];
                    } else t.fillStyle.color = Ft.shared.setValue(s).toNumber();
                    t.useFill = !0;
                }
                break;
            case "fill-opacity":
                t.fillStyle.alpha = Number(s);
                break;
            case "stroke-opacity":
                t.strokeStyle.alpha = Number(s);
                break;
            case "opacity":
                t.fillStyle.alpha = Number(s), t.strokeStyle.alpha = Number(s);
                break;
        }
    }
    function _c(r, t) {
        if (typeof r == "string") {
            const o = document.createElement("div");
            o.innerHTML = r.trim(), r = o.querySelector("svg");
        }
        const e = {
            context: t,
            defs: {},
            path: new Ee
        };
        pc(r, e);
        const s = r.children, { fillStyle: i, strokeStyle: n } = ko(r, e);
        for(let o = 0; o < s.length; o++){
            const a = s[o];
            a.nodeName.toLowerCase() !== "defs" && Po(a, e, i, n);
        }
        return t;
    }
    function Po(r, t, e, s) {
        const i = r.children, { fillStyle: n, strokeStyle: o } = ko(r, t);
        n && e ? e = {
            ...e,
            ...n
        } : n && (e = n), o && s ? s = {
            ...s,
            ...o
        } : o && (s = o);
        const a = !e && !s;
        a && (e = {
            color: 0
        });
        let l, u, h, c, p, d, g, _, m, b, v, S, B, N, E, M, z;
        switch(r.nodeName.toLowerCase()){
            case "path":
                N = r.getAttribute("d"), r.getAttribute("fill-rule") === "evenodd" && Dt("SVG Evenodd fill rule not supported, your svg may render incorrectly"), E = new Ee(N, !0), t.context.path(E), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "circle":
                g = ft(r, "cx", 0), _ = ft(r, "cy", 0), m = ft(r, "r", 0), t.context.ellipse(g, _, m, m), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "rect":
                l = ft(r, "x", 0), u = ft(r, "y", 0), M = ft(r, "width", 0), z = ft(r, "height", 0), b = ft(r, "rx", 0), v = ft(r, "ry", 0), b || v ? t.context.roundRect(l, u, M, z, b || v) : t.context.rect(l, u, M, z), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "ellipse":
                g = ft(r, "cx", 0), _ = ft(r, "cy", 0), b = ft(r, "rx", 0), v = ft(r, "ry", 0), t.context.beginPath(), t.context.ellipse(g, _, b, v), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "line":
                h = ft(r, "x1", 0), c = ft(r, "y1", 0), p = ft(r, "x2", 0), d = ft(r, "y2", 0), t.context.beginPath(), t.context.moveTo(h, c), t.context.lineTo(p, d), s && t.context.stroke(s);
                break;
            case "polygon":
                B = r.getAttribute("points"), S = B.match(/\d+/g).map((L)=>parseInt(L, 10)), t.context.poly(S, !0), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "polyline":
                B = r.getAttribute("points"), S = B.match(/\d+/g).map((L)=>parseInt(L, 10)), t.context.poly(S, !1), s && t.context.stroke(s);
                break;
            case "g":
            case "svg":
                break;
            default:
                {
                    Dt(`[SVG parser] <${r.nodeName}> elements unsupported`);
                    break;
                }
        }
        a && (e = null);
        for(let L = 0; L < i.length; L++)Po(i[L], t, e, s);
    }
    function yc(r) {
        return Ft.isColorLike(r);
    }
    function ji(r) {
        return r instanceof Eh;
    }
    function qi(r) {
        return r instanceof Is;
    }
    function xc(r) {
        return r instanceof ut;
    }
    function bc(r, t, e) {
        const s = Ft.shared.setValue(t ?? 0);
        return r.color = s.toNumber(), r.alpha = s.alpha === 1 ? e.alpha : s.alpha, r.texture = ut.WHITE, {
            ...e,
            ...r
        };
    }
    function vc(r, t, e) {
        return r.texture = t, {
            ...e,
            ...r
        };
    }
    function Ki(r, t, e) {
        return r.fill = t, r.color = 16777215, r.texture = t.texture, r.matrix = t.transform, {
            ...e,
            ...r
        };
    }
    function Zi(r, t, e) {
        return t.buildGradient(), r.fill = t, r.color = 16777215, r.texture = t.texture, r.matrix = t.transform, r.textureSpace = t.textureSpace, {
            ...e,
            ...r
        };
    }
    function wc(r, t) {
        const e = {
            ...t,
            ...r
        }, s = Ft.shared.setValue(e.color);
        return e.alpha *= s.alpha, e.color = s.toNumber(), e;
    }
    ze = function(r, t) {
        if (r == null) return null;
        const e = {}, s = r;
        return yc(r) ? bc(e, r, t) : xc(r) ? vc(e, r, t) : ji(r) ? Ki(e, r, t) : qi(r) ? Zi(e, r, t) : s.fill && ji(s.fill) ? Ki(s, s.fill, t) : s.fill && qi(s.fill) ? Zi(s, s.fill, t) : wc(s, t);
    };
    Qi = function(r, t) {
        const { width: e, alignment: s, miterLimit: i, cap: n, join: o, pixelLine: a, ...l } = t, u = ze(r, l);
        return u ? {
            width: e,
            alignment: s,
            miterLimit: i,
            cap: n,
            join: o,
            pixelLine: a,
            ...u
        } : null;
    };
    const Cc = new At, Ji = new et, Nr = class Wt extends re {
        constructor(){
            super(...arguments), this.uid = _t("graphicsContext"), this.dirty = !0, this.batchMode = "auto", this.instructions = [], this._activePath = new Ee, this._transform = new et, this._fillStyle = {
                ...Wt.defaultFillStyle
            }, this._strokeStyle = {
                ...Wt.defaultStrokeStyle
            }, this._stateStack = [], this._tick = 0, this._bounds = new zt, this._boundsDirty = !0;
        }
        clone() {
            const t = new Wt;
            return t.batchMode = this.batchMode, t.instructions = this.instructions.slice(), t._activePath = this._activePath.clone(), t._transform = this._transform.clone(), t._fillStyle = {
                ...this._fillStyle
            }, t._strokeStyle = {
                ...this._strokeStyle
            }, t._stateStack = this._stateStack.slice(), t._bounds = this._bounds.clone(), t._boundsDirty = !0, t;
        }
        get fillStyle() {
            return this._fillStyle;
        }
        set fillStyle(t) {
            this._fillStyle = ze(t, Wt.defaultFillStyle);
        }
        get strokeStyle() {
            return this._strokeStyle;
        }
        set strokeStyle(t) {
            this._strokeStyle = Qi(t, Wt.defaultStrokeStyle);
        }
        setFillStyle(t) {
            return this._fillStyle = ze(t, Wt.defaultFillStyle), this;
        }
        setStrokeStyle(t) {
            return this._strokeStyle = ze(t, Wt.defaultStrokeStyle), this;
        }
        texture(t, e, s, i, n, o) {
            return this.instructions.push({
                action: "texture",
                data: {
                    image: t,
                    dx: s || 0,
                    dy: i || 0,
                    dw: n || t.frame.width,
                    dh: o || t.frame.height,
                    transform: this._transform.clone(),
                    alpha: this._fillStyle.alpha,
                    style: e ? Ft.shared.setValue(e).toNumber() : 16777215
                }
            }), this.onUpdate(), this;
        }
        beginPath() {
            return this._activePath = new Ee, this;
        }
        fill(t, e) {
            let s;
            const i = this.instructions[this.instructions.length - 1];
            return this._tick === 0 && i && i.action === "stroke" ? s = i.data.path : s = this._activePath.clone(), s ? (t != null && (e !== void 0 && typeof t == "number" && (ct(yt, "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"), t = {
                color: t,
                alpha: e
            }), this._fillStyle = ze(t, Wt.defaultFillStyle)), this.instructions.push({
                action: "fill",
                data: {
                    style: this.fillStyle,
                    path: s
                }
            }), this.onUpdate(), this._initNextPathLocation(), this._tick = 0, this) : this;
        }
        _initNextPathLocation() {
            const { x: t, y: e } = this._activePath.getLastPoint(At.shared);
            this._activePath.clear(), this._activePath.moveTo(t, e);
        }
        stroke(t) {
            let e;
            const s = this.instructions[this.instructions.length - 1];
            return this._tick === 0 && s && s.action === "fill" ? e = s.data.path : e = this._activePath.clone(), e ? (t != null && (this._strokeStyle = Qi(t, Wt.defaultStrokeStyle)), this.instructions.push({
                action: "stroke",
                data: {
                    style: this.strokeStyle,
                    path: e
                }
            }), this.onUpdate(), this._initNextPathLocation(), this._tick = 0, this) : this;
        }
        cut() {
            for(let t = 0; t < 2; t++){
                const e = this.instructions[this.instructions.length - 1 - t], s = this._activePath.clone();
                if (e && (e.action === "stroke" || e.action === "fill")) if (e.data.hole) e.data.hole.addPath(s);
                else {
                    e.data.hole = s;
                    break;
                }
            }
            return this._initNextPathLocation(), this;
        }
        arc(t, e, s, i, n, o) {
            this._tick++;
            const a = this._transform;
            return this._activePath.arc(a.a * t + a.c * e + a.tx, a.b * t + a.d * e + a.ty, s, i, n, o), this;
        }
        arcTo(t, e, s, i, n) {
            this._tick++;
            const o = this._transform;
            return this._activePath.arcTo(o.a * t + o.c * e + o.tx, o.b * t + o.d * e + o.ty, o.a * s + o.c * i + o.tx, o.b * s + o.d * i + o.ty, n), this;
        }
        arcToSvg(t, e, s, i, n, o, a) {
            this._tick++;
            const l = this._transform;
            return this._activePath.arcToSvg(t, e, s, i, n, l.a * o + l.c * a + l.tx, l.b * o + l.d * a + l.ty), this;
        }
        bezierCurveTo(t, e, s, i, n, o, a) {
            this._tick++;
            const l = this._transform;
            return this._activePath.bezierCurveTo(l.a * t + l.c * e + l.tx, l.b * t + l.d * e + l.ty, l.a * s + l.c * i + l.tx, l.b * s + l.d * i + l.ty, l.a * n + l.c * o + l.tx, l.b * n + l.d * o + l.ty, a), this;
        }
        closePath() {
            return this._tick++, this._activePath?.closePath(), this;
        }
        ellipse(t, e, s, i) {
            return this._tick++, this._activePath.ellipse(t, e, s, i, this._transform.clone()), this;
        }
        circle(t, e, s) {
            return this._tick++, this._activePath.circle(t, e, s, this._transform.clone()), this;
        }
        path(t) {
            return this._tick++, this._activePath.addPath(t, this._transform.clone()), this;
        }
        lineTo(t, e) {
            this._tick++;
            const s = this._transform;
            return this._activePath.lineTo(s.a * t + s.c * e + s.tx, s.b * t + s.d * e + s.ty), this;
        }
        moveTo(t, e) {
            this._tick++;
            const s = this._transform, i = this._activePath.instructions, n = s.a * t + s.c * e + s.tx, o = s.b * t + s.d * e + s.ty;
            return i.length === 1 && i[0].action === "moveTo" ? (i[0].data[0] = n, i[0].data[1] = o, this) : (this._activePath.moveTo(n, o), this);
        }
        quadraticCurveTo(t, e, s, i, n) {
            this._tick++;
            const o = this._transform;
            return this._activePath.quadraticCurveTo(o.a * t + o.c * e + o.tx, o.b * t + o.d * e + o.ty, o.a * s + o.c * i + o.tx, o.b * s + o.d * i + o.ty, n), this;
        }
        rect(t, e, s, i) {
            return this._tick++, this._activePath.rect(t, e, s, i, this._transform.clone()), this;
        }
        roundRect(t, e, s, i, n) {
            return this._tick++, this._activePath.roundRect(t, e, s, i, n, this._transform.clone()), this;
        }
        poly(t, e) {
            return this._tick++, this._activePath.poly(t, e, this._transform.clone()), this;
        }
        regularPoly(t, e, s, i, n = 0, o) {
            return this._tick++, this._activePath.regularPoly(t, e, s, i, n, o), this;
        }
        roundPoly(t, e, s, i, n, o) {
            return this._tick++, this._activePath.roundPoly(t, e, s, i, n, o), this;
        }
        roundShape(t, e, s, i) {
            return this._tick++, this._activePath.roundShape(t, e, s, i), this;
        }
        filletRect(t, e, s, i, n) {
            return this._tick++, this._activePath.filletRect(t, e, s, i, n), this;
        }
        chamferRect(t, e, s, i, n, o) {
            return this._tick++, this._activePath.chamferRect(t, e, s, i, n, o), this;
        }
        star(t, e, s, i, n = 0, o = 0) {
            return this._tick++, this._activePath.star(t, e, s, i, n, o, this._transform.clone()), this;
        }
        svg(t) {
            return this._tick++, _c(t, this), this;
        }
        restore() {
            const t = this._stateStack.pop();
            return t && (this._transform = t.transform, this._fillStyle = t.fillStyle, this._strokeStyle = t.strokeStyle), this;
        }
        save() {
            return this._stateStack.push({
                transform: this._transform.clone(),
                fillStyle: {
                    ...this._fillStyle
                },
                strokeStyle: {
                    ...this._strokeStyle
                }
            }), this;
        }
        getTransform() {
            return this._transform;
        }
        resetTransform() {
            return this._transform.identity(), this;
        }
        rotate(t) {
            return this._transform.rotate(t), this;
        }
        scale(t, e = t) {
            return this._transform.scale(t, e), this;
        }
        setTransform(t, e, s, i, n, o) {
            return t instanceof et ? (this._transform.set(t.a, t.b, t.c, t.d, t.tx, t.ty), this) : (this._transform.set(t, e, s, i, n, o), this);
        }
        transform(t, e, s, i, n, o) {
            return t instanceof et ? (this._transform.append(t), this) : (Ji.set(t, e, s, i, n, o), this._transform.append(Ji), this);
        }
        translate(t, e = t) {
            return this._transform.translate(t, e), this;
        }
        clear() {
            return this._activePath.clear(), this.instructions.length = 0, this.resetTransform(), this.onUpdate(), this;
        }
        onUpdate() {
            this.dirty || (this.emit("update", this, 16), this.dirty = !0, this._boundsDirty = !0);
        }
        get bounds() {
            if (!this._boundsDirty) return this._bounds;
            const t = this._bounds;
            t.clear();
            for(let e = 0; e < this.instructions.length; e++){
                const s = this.instructions[e], i = s.action;
                if (i === "fill") {
                    const n = s.data;
                    t.addBounds(n.path.bounds);
                } else if (i === "texture") {
                    const n = s.data;
                    t.addFrame(n.dx, n.dy, n.dx + n.dw, n.dy + n.dh, n.transform);
                }
                if (i === "stroke") {
                    const n = s.data, o = n.style.alignment, a = n.style.width * (1 - o), l = n.path.bounds;
                    t.addFrame(l.minX - a, l.minY - a, l.maxX + a, l.maxY + a);
                }
            }
            return t;
        }
        containsPoint(t) {
            if (!this.bounds.containsPoint(t.x, t.y)) return !1;
            const e = this.instructions;
            let s = !1;
            for(let i = 0; i < e.length; i++){
                const n = e[i], o = n.data, a = o.path;
                if (!n.action || !a) continue;
                const l = o.style, u = a.shapePath.shapePrimitives;
                for(let h = 0; h < u.length; h++){
                    const c = u[h].shape;
                    if (!l || !c) continue;
                    const p = u[h].transform, d = p ? p.applyInverse(t, Cc) : t;
                    if (n.action === "fill") s = c.contains(d.x, d.y);
                    else {
                        const _ = l;
                        s = c.strokeContains(d.x, d.y, _.width, _.alignment);
                    }
                    const g = o.hole;
                    if (g) {
                        const _ = g.shapePath?.shapePrimitives;
                        if (_) for(let m = 0; m < _.length; m++)_[m].shape.contains(d.x, d.y) && (s = !1);
                    }
                    if (s) return !0;
                }
            }
            return s;
        }
        destroy(t = !1) {
            if (this._stateStack.length = 0, this._transform = null, this.emit("destroy", this), this.removeAllListeners(), typeof t == "boolean" ? t : t?.texture) {
                const s = typeof t == "boolean" ? t : t?.textureSource;
                this._fillStyle.texture && this._fillStyle.texture.destroy(s), this._strokeStyle.texture && this._strokeStyle.texture.destroy(s);
            }
            this._fillStyle = null, this._strokeStyle = null, this.instructions = null, this._activePath = null, this._bounds = null, this._stateStack = null, this.customShader = null, this._transform = null;
        }
    };
    Nr.defaultFillStyle = {
        color: 16777215,
        alpha: 1,
        texture: ut.WHITE,
        matrix: null,
        fill: null,
        textureSpace: "local"
    };
    Nr.defaultStrokeStyle = {
        width: 1,
        color: 16777215,
        alpha: 1,
        alignment: .5,
        miterLimit: 10,
        cap: "butt",
        join: "miter",
        texture: ut.WHITE,
        matrix: null,
        fill: null,
        textureSpace: "local",
        pixelLine: !1
    };
    Ve = Nr;
    vs = class extends Dn {
        constructor(t){
            t instanceof Ve && (t = {
                context: t
            });
            const { context: e, roundPixels: s, ...i } = t || {};
            super({
                label: "Graphics",
                ...i
            }), this.renderPipeId = "graphics", e ? this._context = e : this._context = this._ownedContext = new Ve, this._context.on("update", this.onViewUpdate, this), this.allowChildren = !1, this.roundPixels = s ?? !1;
        }
        set context(t) {
            t !== this._context && (this._context.off("update", this.onViewUpdate, this), this._context = t, this._context.on("update", this.onViewUpdate, this), this.onViewUpdate());
        }
        get context() {
            return this._context;
        }
        get bounds() {
            return this._context.bounds;
        }
        updateBounds() {}
        containsPoint(t) {
            return this._context.containsPoint(t);
        }
        destroy(t) {
            this._ownedContext && !t ? this._ownedContext.destroy(t) : (t === !0 || t?.context === !0) && this._context.destroy(t), this._ownedContext = null, this._context = null, super.destroy(t);
        }
        _callContextMethod(t, e) {
            return this.context[t](...e), this;
        }
        setFillStyle(...t) {
            return this._callContextMethod("setFillStyle", t);
        }
        setStrokeStyle(...t) {
            return this._callContextMethod("setStrokeStyle", t);
        }
        fill(...t) {
            return this._callContextMethod("fill", t);
        }
        stroke(...t) {
            return this._callContextMethod("stroke", t);
        }
        texture(...t) {
            return this._callContextMethod("texture", t);
        }
        beginPath() {
            return this._callContextMethod("beginPath", []);
        }
        cut() {
            return this._callContextMethod("cut", []);
        }
        arc(...t) {
            return this._callContextMethod("arc", t);
        }
        arcTo(...t) {
            return this._callContextMethod("arcTo", t);
        }
        arcToSvg(...t) {
            return this._callContextMethod("arcToSvg", t);
        }
        bezierCurveTo(...t) {
            return this._callContextMethod("bezierCurveTo", t);
        }
        closePath() {
            return this._callContextMethod("closePath", []);
        }
        ellipse(...t) {
            return this._callContextMethod("ellipse", t);
        }
        circle(...t) {
            return this._callContextMethod("circle", t);
        }
        path(...t) {
            return this._callContextMethod("path", t);
        }
        lineTo(...t) {
            return this._callContextMethod("lineTo", t);
        }
        moveTo(...t) {
            return this._callContextMethod("moveTo", t);
        }
        quadraticCurveTo(...t) {
            return this._callContextMethod("quadraticCurveTo", t);
        }
        rect(...t) {
            return this._callContextMethod("rect", t);
        }
        roundRect(...t) {
            return this._callContextMethod("roundRect", t);
        }
        poly(...t) {
            return this._callContextMethod("poly", t);
        }
        regularPoly(...t) {
            return this._callContextMethod("regularPoly", t);
        }
        roundPoly(...t) {
            return this._callContextMethod("roundPoly", t);
        }
        roundShape(...t) {
            return this._callContextMethod("roundShape", t);
        }
        filletRect(...t) {
            return this._callContextMethod("filletRect", t);
        }
        chamferRect(...t) {
            return this._callContextMethod("chamferRect", t);
        }
        star(...t) {
            return this._callContextMethod("star", t);
        }
        svg(...t) {
            return this._callContextMethod("svg", t);
        }
        restore(...t) {
            return this._callContextMethod("restore", t);
        }
        save() {
            return this._callContextMethod("save", []);
        }
        getTransform() {
            return this.context.getTransform();
        }
        resetTransform() {
            return this._callContextMethod("resetTransform", []);
        }
        rotateTransform(...t) {
            return this._callContextMethod("rotate", t);
        }
        scaleTransform(...t) {
            return this._callContextMethod("scale", t);
        }
        setTransform(...t) {
            return this._callContextMethod("setTransform", t);
        }
        transform(...t) {
            return this._callContextMethod("transform", t);
        }
        translateTransform(...t) {
            return this._callContextMethod("translate", t);
        }
        clear() {
            return this._callContextMethod("clear", []);
        }
        get fillStyle() {
            return this._context.fillStyle;
        }
        set fillStyle(t) {
            this._context.fillStyle = t;
        }
        get strokeStyle() {
            return this._context.strokeStyle;
        }
        set strokeStyle(t) {
            this._context.strokeStyle = t;
        }
        clone(t = !1) {
            return t ? new vs(this._context.clone()) : (this._ownedContext = null, new vs(this._context));
        }
        lineStyle(t, e, s) {
            ct(yt, "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");
            const i = {};
            return t && (i.width = t), e && (i.color = e), s && (i.alpha = s), this.context.strokeStyle = i, this;
        }
        beginFill(t, e) {
            ct(yt, "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
            const s = {};
            return t !== void 0 && (s.color = t), e !== void 0 && (s.alpha = e), this.context.fillStyle = s, this;
        }
        endFill() {
            ct(yt, "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."), this.context.fill();
            const t = this.context.strokeStyle;
            return (t.width !== Ve.defaultStrokeStyle.width || t.color !== Ve.defaultStrokeStyle.color || t.alpha !== Ve.defaultStrokeStyle.alpha) && this.context.stroke(), this;
        }
        drawCircle(...t) {
            return ct(yt, "Graphics#drawCircle has been renamed to Graphics#circle"), this._callContextMethod("circle", t);
        }
        drawEllipse(...t) {
            return ct(yt, "Graphics#drawEllipse has been renamed to Graphics#ellipse"), this._callContextMethod("ellipse", t);
        }
        drawPolygon(...t) {
            return ct(yt, "Graphics#drawPolygon has been renamed to Graphics#poly"), this._callContextMethod("poly", t);
        }
        drawRect(...t) {
            return ct(yt, "Graphics#drawRect has been renamed to Graphics#rect"), this._callContextMethod("rect", t);
        }
        drawRoundedRect(...t) {
            return ct(yt, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect"), this._callContextMethod("roundRect", t);
        }
        drawStar(...t) {
            return ct(yt, "Graphics#drawStar has been renamed to Graphics#star"), this._callContextMethod("star", t);
        }
    };
    Vt.add(Ka, Za);
    let Sc, Ac, Tc, kc, Pc, Mc, Ic, Rc, Ec, Dc, Bc, Fc, Gc, Vc, Nc, $c, Oc, zc, Lc, Uc, Hc, Wc, Yc, Xc, jc, qc, Kc, Zc, Qc, Jc, td, ed, sd, rd, id, nd, od, ad, ld, hd, ud, cd, dd;
    Sc = wt({
        __name: "PieceCanvas",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, e = va(), s = ye(), { cachedFiles: i } = xt(s), { fileContentInterval: n } = xt(jt()), o = mt(), a = mt(!1), l = Yt(), u = Yt();
            async function h() {
                if (a.value || !o.value || !l.value) return;
                a.value = !0;
                const g = await s.fetchPieceState(t.torrent.hash), _ = new kr;
                i.value.filter((S)=>S.priority !== nt.DO_NOT_DOWNLOAD).forEach((S)=>_.insert(S.piece_range, S.name));
                const m = new vs;
                let b = "", v = 1;
                for(let S = 0; S < g.length; ++S){
                    const B = g[S];
                    let N = "";
                    if (B === Es.DOWNLOADING ? N = e.current.value.colors["torrent-downloading"] : B === Es.DOWNLOADED ? N = e.current.value.colors["torrent-ul_stopped"] : B === Es.MISSING && _.intersect_any([
                        S,
                        S
                    ]) && (N = e.current.value.colors["torrent-dl_stopped"]), N === b) {
                        ++v;
                        continue;
                    }
                    b !== "" && (m.rect((S - v) / g.length * o.value.width, 0, v / g.length * o.value.width, o.value.height), m.fill(b)), v = 1, b = N;
                }
                b !== "" && (m.rect((g.length - v) / g.length * o.value.width, 0, v / g.length * o.value.width, o.value.height), m.fill(b)), l.value.stage.addChild(m), u.value && u.value.destroy(), u.value = m, a.value = !1;
            }
            function c() {
                h().catch(()=>{});
            }
            const { pause: p, resume: d } = Ss(c, n, {
                immediate: !1,
                immediateCallback: !0
            });
            return ke(()=>t.isActive, (g)=>{
                g ? d() : p();
            }), ts(()=>{
                if (!o.value) return;
                const g = new ho;
                g.init({
                    antialias: !0,
                    width: o.value?.width,
                    height: o.value?.height,
                    canvas: o.value
                }).then(()=>l.value = g).then(()=>t.isActive && d());
            }), Cs(()=>{
                l.value?.destroy({
                    removeView: !1
                }, {
                    children: !0
                });
            }), (g, _)=>(O(), K("canvas", {
                    ref_key: "canvas",
                    ref: o,
                    width: "4096",
                    height: "20"
                }, null, 512));
        }
    });
    Ac = Ts(Sc, [
        [
            "__scopeId",
            "data-v-c3384aa7"
        ]
    ]);
    Tc = [
        "href"
    ];
    kc = {
        key: 1
    };
    Pc = {
        class: "my-1"
    };
    Mc = {
        class: "mr-2"
    };
    Ic = {
        key: 0
    };
    Rc = {
        key: 2
    };
    Ec = {
        key: 0
    };
    Dc = {
        key: 1
    };
    Bc = {
        key: 2
    };
    Fc = {
        key: 0
    };
    Gc = {
        key: 0,
        class: "d-flex flex-wrap flex-gap-row-small flex-gap-column"
    };
    Vc = wt({
        __name: "Overview",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, { t: e, getTorrentStateString: s } = ee(), i = ye(), { cachedFiles: n } = xt(i), o = es(), { properties: a } = xt(se()), l = jt(), u = Q(()=>window.isSecureContext), h = Q(()=>n.value.filter((k)=>k.priority !== nt.DO_NOT_DOWNLOAD)), c = Q(()=>h.value.reduce((k, V)=>k + V.size, 0)), p = Q(()=>n.value.length), d = Q(()=>h.value.length === 1 ? h.value[0].name : ""), g = Q(()=>a.value?.comment ?? ""), _ = Q(()=>a.value?.dl_speed_avg ?? 0), m = Q(()=>a.value?.piece_size ?? 0), b = Q(()=>a.value?.pieces_have ?? 0), v = Q(()=>a.value?.pieces_num ?? 0), S = Q(()=>a.value?.up_speed_avg ?? 0), B = Q(()=>sa(t.torrent.state)), N = Q(()=>`${parseInt(ia(m.value, !0))} ${ra(m.value, !0)}`), E = Q(()=>[
                    Xr.META_DOWNLOAD,
                    Xr.FORCED_META_DOWNLOAD
                ].includes(t.torrent.state)), M = Q(()=>l.enableRatioColors ? na(t.torrent.ratio) : "");
            async function z() {
                try {
                    await navigator.clipboard.writeText(t.torrent.hash);
                } catch  {
                    Lr.error(e("toast.copy.error"));
                    return;
                }
                Lr.success(e("toast.copy.success"));
            }
            function L(k) {
                o.createDialog(Io, {
                    hashes: [
                        t.torrent.hash
                    ],
                    mode: k
                });
            }
            function $() {
                o.createDialog(Sa, {
                    hash: t.torrent.hash,
                    isFolder: !1,
                    oldName: d.value
                }, i.updateFileTreeTask.perform);
            }
            function D(k) {
                if (o.hasActiveDialog || !t.isActive) return !1;
                if (k.key === "d") return k.preventDefault(), L("dl"), !0;
                if (k.key === "s") return k.preventDefault(), L("save"), !0;
                if (k.key === "f" && h.value.length === 1) return k.preventDefault(), $(), !0;
                if (k.key === "Delete") return k.preventDefault(), o.createDialog(ua, {
                    hashes: [
                        t.torrent.hash
                    ]
                }), !0;
            }
            return ts(()=>{
                document.addEventListener("keydown", D);
            }), Vo(async ()=>{
                document.removeEventListener("keydown", D);
            }), (k, V)=>k.torrent ? (O(), j(Xt, {
                    key: 0
                }, {
                    default: w(()=>[
                            y(As, {
                                class: "text-wrap"
                            }, {
                                default: w(()=>[
                                        X(G(k.torrent.name), 1)
                                    ]),
                                _: 1
                            }),
                            y(la, null, {
                                default: w(()=>[
                                        Y("div", null, [
                                            (O(!0), K(kt, null, Gt(P(aa)(g.value), (H)=>(O(), K("span", null, [
                                                    P(oa)(H) ? (O(), K("a", {
                                                        key: 0,
                                                        target: "_blank",
                                                        href: H
                                                    }, G(H), 9, Tc)) : (O(), K("span", kc, G(H), 1))
                                                ]))), 256))
                                        ]),
                                        Y("div", Pc, [
                                            Y("span", Mc, G(k.torrent.hash), 1),
                                            u.value ? (O(), j(ot, {
                                                key: 0,
                                                variant: "outlined",
                                                rounded: "",
                                                onClick: z
                                            }, {
                                                default: w(()=>[
                                                        X(G(k.$t("torrentDetail.overview.copy_hash")), 1)
                                                    ]),
                                                _: 1
                                            })) : Et("", !0)
                                        ])
                                    ]),
                                _: 1
                            }),
                            y(me, null, {
                                default: w(()=>[
                                        y(pt, null, {
                                            default: w(()=>[
                                                    y(it, {
                                                        cols: "12",
                                                        md: "6"
                                                    }, {
                                                        default: w(()=>[
                                                                y(pt, null, {
                                                                    default: w(()=>[
                                                                            y(it, {
                                                                                cols: "4"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        y(ha, {
                                                                                            color: B.value,
                                                                                            indeterminate: E.value,
                                                                                            size: 100,
                                                                                            "model-value": k.torrent?.progress * 100 || 0,
                                                                                            width: 15
                                                                                        }, {
                                                                                            default: w(()=>[
                                                                                                    E.value ? (O(), K("span", Ic, G(k.$t("torrentDetail.overview.fetchingMetadata")), 1)) : k.torrent.progress === 1 ? (O(), j(St, {
                                                                                                        key: 1,
                                                                                                        icon: "mdi-check",
                                                                                                        size: "x-large"
                                                                                                    })) : (O(), K("span", Rc, G(P(ar)(k.torrent.progress)), 1))
                                                                                                ]),
                                                                                            _: 1
                                                                                        }, 8, [
                                                                                            "color",
                                                                                            "indeterminate",
                                                                                            "model-value"
                                                                                        ])
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "8",
                                                                                class: "d-flex flex-column align-center justify-center"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        E.value ? (O(), K("div", Ec, [
                                                                                            Y("span", null, G(k.$t("torrentDetail.overview.waitingForMetadata")), 1)
                                                                                        ])) : (O(), K("div", Dc, [
                                                                                            y(Ac, {
                                                                                                torrent: k.torrent,
                                                                                                isActive: k.isActive
                                                                                            }, null, 8, [
                                                                                                "torrent",
                                                                                                "isActive"
                                                                                            ])
                                                                                        ])),
                                                                                        v.value > 0 ? (O(), K("div", Bc, [
                                                                                            Y("span", null, G(P(e)("torrentDetail.overview.pieceCount", {
                                                                                                owned: b.value,
                                                                                                total: v.value,
                                                                                                pieceSize: N.value
                                                                                            })), 1)
                                                                                        ])) : Et("", !0),
                                                                                        Y("div", null, [
                                                                                            y(St, {
                                                                                                icon: "mdi-arrow-down"
                                                                                            }),
                                                                                            X(" " + G(P(fe)(k.torrent.dlspeed, P(l).useBitSpeed)) + " ", 1),
                                                                                            y(St, {
                                                                                                icon: "mdi-arrow-up"
                                                                                            }),
                                                                                            X(" " + G(P(fe)(k.torrent.upspeed, P(l).useBitSpeed)), 1)
                                                                                        ])
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: w(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrent.properties.download_path")) + ":", 1),
                                                                                        Y("div", null, G(k.torrent.download_path), 1),
                                                                                        y(ot, {
                                                                                            icon: "mdi-pencil",
                                                                                            color: "accent",
                                                                                            size: "x-small",
                                                                                            onClick: V[0] || (V[0] = (H)=>L("dl"))
                                                                                        })
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrentDetail.overview.fileCount")) + ":", 1),
                                                                                        Y("div", null, G(h.value.length) + " / " + G(p.value), 1),
                                                                                        h.value.length === 1 ? (O(), K("div", Fc, G(d.value), 1)) : Et("", !0),
                                                                                        h.value.length === 1 ? (O(), j(ot, {
                                                                                            key: 1,
                                                                                            icon: "mdi-pencil",
                                                                                            color: "accent",
                                                                                            size: "x-small",
                                                                                            onClick: $
                                                                                        })) : Et("", !0)
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: w(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrent.properties.save_path")) + ":", 1),
                                                                                        Y("div", null, G(k.torrent.savePath), 1),
                                                                                        y(ot, {
                                                                                            icon: "mdi-pencil",
                                                                                            color: "accent",
                                                                                            size: "x-small",
                                                                                            onClick: V[1] || (V[1] = (H)=>L("save"))
                                                                                        })
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrent.properties.content_path")) + ":", 1),
                                                                                        Y("div", null, G(k.torrent.content_path), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                })
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y(it, {
                                                        cols: "12",
                                                        md: "6"
                                                    }, {
                                                        default: w(()=>[
                                                                y(pt, null, {
                                                                    default: w(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrent.properties.state")) + ":", 1),
                                                                                        y(Ce, {
                                                                                            disabled: !0,
                                                                                            "default-color": B.value,
                                                                                            value: P(s)(k.torrent.state)
                                                                                        }, null, 8, [
                                                                                            "default-color",
                                                                                            "value"
                                                                                        ])
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrent.properties.category")) + ":", 1),
                                                                                        y(Ce, {
                                                                                            "default-color": "category",
                                                                                            disabled: !k.torrent.category.length,
                                                                                            "disabled-value": k.$t("navbar.side.filters.category.empty"),
                                                                                            value: k.torrent.category
                                                                                        }, null, 8, [
                                                                                            "disabled",
                                                                                            "disabled-value",
                                                                                            "value"
                                                                                        ])
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: w(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrent.properties.tracker")) + ":", 1),
                                                                                        y(Ce, {
                                                                                            disabled: !k.torrent.trackerDomain.length,
                                                                                            "default-color": "tracker",
                                                                                            "disabled-value": k.$t("navbar.side.filters.tracker.empty"),
                                                                                            value: k.torrent.trackerDomain
                                                                                        }, null, 8, [
                                                                                            "disabled",
                                                                                            "disabled-value",
                                                                                            "value"
                                                                                        ])
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrent.properties.tags")) + ":", 1),
                                                                                        k.torrent.tags.length ? (O(), K("div", Gc, [
                                                                                            (O(!0), K(kt, null, Gt(k.torrent.tags, (H)=>(O(), j(Ce, {
                                                                                                    "default-color": "tag",
                                                                                                    value: H
                                                                                                }, null, 8, [
                                                                                                    "value"
                                                                                                ]))), 256))
                                                                                        ])) : (O(), j(Ce, {
                                                                                            key: 1,
                                                                                            disabled: !0,
                                                                                            "default-color": "tag",
                                                                                            value: k.$t("navbar.side.filters.tag.empty")
                                                                                        }, null, 8, [
                                                                                            "value"
                                                                                        ]))
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: w(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrentDetail.overview.selectedFileSize")) + ":", 1),
                                                                                        Y("div", null, G(P(Ot)(c.value, P(l).useBinarySize)) + " / " + G(P(Ot)(k.torrent.total_size, P(l).useBinarySize)), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrentDetail.overview.ratio")) + ":", 1),
                                                                                        Y("div", {
                                                                                            class: _s(M.value)
                                                                                        }, G(k.torrent.ratio), 3)
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: w(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrentDetail.overview.downloaded")) + ":", 1),
                                                                                        Y("div", null, G(P(Ot)(k.torrent.downloaded, P(l).useBinarySize)), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrentDetail.overview.uploaded")) + ":", 1),
                                                                                        Y("div", null, G(P(Ot)(k.torrent.uploaded, P(l).useBinarySize)), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: w(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrentDetail.overview.dlSpeedAverage")) + ":", 1),
                                                                                        Y("div", null, G(P(fe)(_.value, P(l).useBitSpeed)), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: w(()=>[
                                                                                        Y("div", null, G(k.$t("torrentDetail.overview.upSpeedAverage")) + ":", 1),
                                                                                        Y("div", null, G(P(fe)(S.value, P(l).useBitSpeed)), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                })
                                                            ]),
                                                        _: 1
                                                    })
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                })) : Et("", !0);
        }
    });
    Nc = {
        class: "mt-2 mx-3 d-flex flex-gap align-center"
    };
    $c = {
        class: "text-grey"
    };
    Oc = {
        key: 0
    };
    zc = {
        key: 1
    };
    Lc = {
        key: 0
    };
    Uc = {
        key: 2,
        class: "text-grey"
    };
    Hc = [
        "title"
    ];
    Wc = {
        key: 0
    };
    Yc = [
        "alt",
        "src",
        "title"
    ];
    Xc = [
        "title"
    ];
    jc = [
        "title"
    ];
    qc = {
        key: 1
    };
    Kc = {
        class: "text-download"
    };
    Zc = {
        class: "text-upload"
    };
    Qc = {
        class: "d-flex my-3 flex-gap align-center justify-center"
    };
    Jc = wt({
        __name: "Peers",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, { t: e } = ee(), s = es(), i = ca(), n = da(), o = jt();
            function a(D, k) {
                const V = D.ip.split(".").map(Number), H = k.ip.split(".").map(Number);
                for(let Z = 0; Z < 4; Z++)if (V[Z] !== H[Z]) return V[Z] - H[Z];
                return D.port - k.port;
            }
            function l(D, k) {
                return D.country && !k.country ? -1 : !D.country && k.country ? 1 : D.country === k.country ? a(D, k) : D.country.localeCompare(k.country);
            }
            const u = No([
                {
                    nowrap: !0,
                    key: "actions",
                    sortable: !1
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.country"),
                    key: "country",
                    sortRaw: l
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.host"),
                    key: "host",
                    sortRaw: a
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.progress"),
                    key: "progress"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.download"),
                    key: "dl_speed"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.upload"),
                    key: "up_speed"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.flags"),
                    key: "flags"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.client"),
                    key: "client"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.relevance"),
                    key: "relevance"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.files"),
                    key: "files"
                }
            ]), h = nn([
                {
                    key: "dl_speed",
                    order: "desc"
                },
                {
                    key: "up_speed",
                    order: "desc"
                }
            ]), c = mt(), p = mt(new Map), d = mt(!1), g = mt(""), _ = mt(!1), m = mt(""), b = Q(()=>Array.from(p.value.entries()).map(([D, k])=>({
                        ...k,
                        host: D
                    })));
            function v(D) {
                Object.entries(D).forEach(([k, V])=>{
                    const H = p.value.get(k);
                    p.value.set(k, {
                        ...H,
                        ...V
                    });
                });
            }
            function S(D) {
                D.forEach((k)=>p.value.delete(k));
            }
            async function B() {
                const D = await i.syncTorrentPeers(t.torrent.hash, c.value);
                c.value = D.rid, d.value = D.show_flags ?? d.value, D.full_update ? p.value = new Map(Object.entries(D.peers)) : (D.peers_removed && S(D.peers_removed), D.peers && v(D.peers));
            }
            async function N() {
                m.value.length && (await i.addTorrentPeers(t.torrent.hash, m.value.split(`
`)), $(), E());
            }
            function E() {
                _.value = !1, m.value = "";
            }
            async function M(D) {
                s.confirmAction({
                    title: e("dialogs.confirm.banPeers"),
                    text: D.host,
                    yesColor: "error",
                    onConfirm: async ()=>{
                        await i.banPeers([
                            D.host
                        ]), await n.fetchPreferences(), $();
                    }
                });
            }
            const { isActive: z, pause: L, resume: $ } = Ss(B, 2e3, {
                immediate: !0,
                immediateCallback: !0
            });
            return ke(()=>t.isActive, (D)=>{
                D ? $() : L();
            }), on(()=>!_.value), (D, k)=>(O(), j(Xt, null, {
                    default: w(()=>[
                            p.value.size ? (O(), j(dn, {
                                key: 1,
                                headers: P(u),
                                items: b.value,
                                "multi-sort": "",
                                "sort-by": P(h),
                                search: g.value,
                                "filter-keys": [
                                    "host",
                                    "client",
                                    "files"
                                ],
                                mobile: null
                            }, {
                                top: w(()=>[
                                        Y("div", Nc, [
                                            y(Qt, {
                                                modelValue: g.value,
                                                "onUpdate:modelValue": k[0] || (k[0] = (V)=>g.value = V),
                                                density: "compact",
                                                label: D.$t("common.search"),
                                                "prepend-inner-icon": "mdi-magnify",
                                                flat: "",
                                                "hide-details": "",
                                                "single-line": "",
                                                clearable: ""
                                            }, null, 8, [
                                                "modelValue",
                                                "label"
                                            ]),
                                            y(ys, {
                                                text: P(z) ? D.$t("common.pause") : D.$t("common.resume"),
                                                location: "bottom"
                                            }, {
                                                activator: w(({ props: V })=>[
                                                        y(ot, pe(V, {
                                                            icon: P(z) ? "mdi-timer-pause" : "mdi-timer-play",
                                                            color: "primary",
                                                            onClick: k[1] || (k[1] = (H)=>P(z) ? P(L)() : P($)())
                                                        }), null, 16, [
                                                            "icon"
                                                        ])
                                                    ]),
                                                _: 1
                                            }, 8, [
                                                "text"
                                            ])
                                        ])
                                    ]),
                                "item.host": w(({ item: V })=>[
                                        X(G(V.ip), 1),
                                        Y("span", $c, ":" + G(V.port), 1)
                                    ]),
                                "item.client": w(({ item: V })=>[
                                        V.connection ? (O(), K("span", Oc, "[" + G(V.connection) + "] ", 1)) : Et("", !0),
                                        V.client ? (O(), K("span", zc, [
                                            X(G(V.client) + " ", 1),
                                            V.peer_id_client ? (O(), K("span", Lc, "(" + G(V.peer_id_client) + ")", 1)) : Et("", !0)
                                        ])) : (O(), K("span", Uc, "?????"))
                                    ]),
                                "item.actions": w(({ item: V })=>[
                                        y(ot, {
                                            color: "red",
                                            icon: "mdi-cancel",
                                            variant: "text",
                                            onClick: (H)=>M(V)
                                        }, null, 8, [
                                            "onClick"
                                        ])
                                    ]),
                                "item.country": w(({ item: V })=>[
                                        d.value ? (O(), K("div", {
                                            key: 0,
                                            class: "cursor-help",
                                            title: V.country
                                        }, [
                                            V.country_code ? P(fa) ? (O(), K("img", {
                                                key: 1,
                                                alt: P(Ds)(V.country_code).char,
                                                src: P(Ds)(V.country_code).url,
                                                title: V.country,
                                                style: {
                                                    "max-width": "32px"
                                                }
                                            }, null, 8, Yc)) : (O(), K("span", {
                                                key: 2,
                                                title: V.country
                                            }, G(P(Ds)(V.country_code).char), 9, Xc)) : (O(), K("span", Wc))
                                        ], 8, Hc)) : Et("", !0)
                                    ]),
                                "item.flags": w(({ item: V })=>[
                                        V.flags ? (O(), K("div", {
                                            key: 0,
                                            class: "cursor-help",
                                            title: V.flags_desc
                                        }, G(V.flags), 9, jc)) : (O(), K("div", qc, G(D.$t("common.none")), 1))
                                    ]),
                                "item.dl_speed": w(({ item: V })=>[
                                        Y("span", Kc, G(P(fe)(V.dl_speed, P(o).useBitSpeed)) + " (" + G(P(Ot)(V.downloaded, P(o).useBinarySize)) + ") ", 1)
                                    ]),
                                "item.up_speed": w(({ item: V })=>[
                                        Y("span", Zc, G(P(fe)(V.up_speed, P(o).useBitSpeed)) + " (" + G(P(Ot)(V.uploaded, P(o).useBinarySize)) + ") ", 1)
                                    ]),
                                "item.progress": w(({ item: V })=>[
                                        y(cn, {
                                            "model-value": V.progress,
                                            max: 1,
                                            height: 20,
                                            rounded: "sm",
                                            style: {
                                                width: "8em"
                                            },
                                            color: V.progress === 1 ? "torrent-ul_stalled" : "torrent-downloading"
                                        }, {
                                            default: w(()=>[
                                                    X(G(P(ar)(V.progress)), 1)
                                                ]),
                                            _: 2
                                        }, 1032, [
                                            "model-value",
                                            "color"
                                        ])
                                    ]),
                                "item.relevance": w(({ item: V })=>[
                                        X(G(P(ar)(V.relevance)), 1)
                                    ]),
                                _: 2
                            }, 1032, [
                                "headers",
                                "items",
                                "sort-by",
                                "search"
                            ])) : (O(), j(lr, {
                                key: 0,
                                title: D.$t("torrentDetail.peers.empty"),
                                icon: "mdi-account-sync",
                                color: "accent"
                            }, null, 8, [
                                "title"
                            ])),
                            Y("div", Qc, [
                                y(qe, {
                                    modelValue: _.value,
                                    "onUpdate:modelValue": k[3] || (k[3] = (V)=>_.value = V),
                                    "max-width": "750px"
                                }, {
                                    activator: w(({ props: V })=>[
                                            y(ot, pe(V, {
                                                variant: "flat",
                                                text: P(e)("torrentDetail.peers.addPeers.title"),
                                                color: "accent"
                                            }), null, 16, [
                                                "text"
                                            ])
                                        ]),
                                    default: w(()=>[
                                            y(Xt, {
                                                title: D.$t("torrentDetail.peers.addPeers.title")
                                            }, {
                                                default: w(()=>[
                                                        y(me, null, {
                                                            default: w(()=>[
                                                                    y(fn, {
                                                                        modelValue: m.value,
                                                                        "onUpdate:modelValue": k[2] || (k[2] = (V)=>m.value = V),
                                                                        label: P(e)("torrentDetail.peers.addPeers.newPeers"),
                                                                        placeholder: P(e)("torrentDetail.peers.addPeers.newPeersPlaceholder"),
                                                                        hint: P(e)("torrentDetail.peers.addPeers.newPeersHint")
                                                                    }, null, 8, [
                                                                        "modelValue",
                                                                        "label",
                                                                        "placeholder",
                                                                        "hint"
                                                                    ])
                                                                ]),
                                                            _: 1
                                                        }),
                                                        y(je, null, {
                                                            default: w(()=>[
                                                                    y(Me),
                                                                    y(ot, {
                                                                        color: "error",
                                                                        onClick: E
                                                                    }, {
                                                                        default: w(()=>[
                                                                                X(G(P(e)("common.cancel")), 1)
                                                                            ]),
                                                                        _: 1
                                                                    }),
                                                                    y(ot, {
                                                                        color: "accent",
                                                                        onClick: N
                                                                    }, {
                                                                        default: w(()=>[
                                                                                X(G(P(e)("common.ok")), 1)
                                                                            ]),
                                                                        _: 1
                                                                    })
                                                                ]),
                                                            _: 1
                                                        })
                                                    ]),
                                                _: 1
                                            }, 8, [
                                                "title"
                                            ])
                                        ]),
                                    _: 1
                                }, 8, [
                                    "modelValue"
                                ])
                            ])
                        ]),
                    _: 1
                }));
        }
    });
    td = wt({
        __name: "TagsAndCategories",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, e = pa(), s = ma(), i = ks();
            async function n(a) {
                t.torrent.category === a ? await i.setTorrentCategory([
                    t.torrent.hash
                ], "") : await i.setTorrentCategory([
                    t.torrent.hash
                ], a);
            }
            async function o(a) {
                t.torrent.tags?.includes(a) ? await i.removeTorrentTags([
                    t.torrent.hash
                ], [
                    a
                ]) : await i.addTorrentTags([
                    t.torrent.hash
                ], [
                    a
                ]);
            }
            return (a, l)=>(O(), j(Xt, null, {
                    default: w(()=>[
                            y(me, null, {
                                default: w(()=>[
                                        y(pt, null, {
                                            default: w(()=>[
                                                    y(it, {
                                                        cols: "12",
                                                        md: "6"
                                                    }, {
                                                        default: w(()=>[
                                                                y(xs, null, {
                                                                    default: w(()=>[
                                                                            y(or, null, {
                                                                                default: w(()=>[
                                                                                        X(G(a.$t("torrentDetail.tagsAndCategories.tags")), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            (O(!0), K(kt, null, Gt(P(s).tags, (u)=>(O(), j(Ie, {
                                                                                    variant: "text",
                                                                                    color: "accent",
                                                                                    title: u,
                                                                                    active: a.torrent.tags?.includes(u),
                                                                                    onClick: (h)=>o(u)
                                                                                }, null, 8, [
                                                                                    "title",
                                                                                    "active",
                                                                                    "onClick"
                                                                                ]))), 256))
                                                                        ]),
                                                                    _: 1
                                                                })
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y(it, {
                                                        cols: "12",
                                                        md: "6"
                                                    }, {
                                                        default: w(()=>[
                                                                y(xs, null, {
                                                                    default: w(()=>[
                                                                            y(or, null, {
                                                                                default: w(()=>[
                                                                                        X(G(a.$t("torrentDetail.tagsAndCategories.categories")), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            (O(!0), K(kt, null, Gt(P(e).categories, (u)=>(O(), j(Ie, {
                                                                                    variant: "text",
                                                                                    color: "accent",
                                                                                    title: u.name,
                                                                                    active: u.name === t.torrent.category,
                                                                                    onClick: (h)=>n(u.name)
                                                                                }, null, 8, [
                                                                                    "title",
                                                                                    "active",
                                                                                    "onClick"
                                                                                ]))), 256))
                                                                        ]),
                                                                    _: 1
                                                                })
                                                            ]),
                                                        _: 1
                                                    })
                                                ]),
                                            _: 1
                                        })
                                    ]),
                                _: 1
                            })
                        ]),
                    _: 1
                }));
        }
    });
    ed = {
        class: "mt-2 mx-3 d-flex flex-gap align-center"
    };
    sd = {
        key: 0
    };
    rd = {
        key: 0
    };
    id = {
        key: 1
    };
    nd = {
        class: "d-flex my-3 flex-gap align-center justify-center"
    };
    od = {
        class: "text-h5"
    };
    ad = wt({
        __name: "Trackers",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, { t: e } = ee(), s = ks(), i = ga(), n = [
                {
                    nowrap: !0,
                    title: e("torrentDetail.trackers.fields.tier"),
                    key: "tier"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.trackers.fields.url"),
                    key: "url"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.trackers.fields.status"),
                    key: "status"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.trackers.fields.num_seeds"),
                    key: "num_seeds"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.trackers.fields.num_peers"),
                    key: "num_peers"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.trackers.fields.num_downloaded"),
                    key: "num_downloaded"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.trackers.fields.num_leeches"),
                    key: "num_leeches"
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.trackers.fields.msg"),
                    key: "msg"
                },
                {
                    nowrap: !0,
                    key: "actions",
                    sortable: !1
                }
            ], o = nn([
                {
                    key: "tier",
                    order: "asc"
                },
                {
                    key: "url",
                    order: "asc"
                }
            ]), a = mt("");
            function l(H) {
                switch(H){
                    case le.DISABLED:
                        return e("constants.trackerStatus.disabled");
                    case le.NOT_YET_CONTACTED:
                        return e("constants.trackerStatus.not_yet_contacted");
                    case le.WORKING:
                        return e("constants.trackerStatus.working");
                    case le.UPDATING:
                        return e("constants.trackerStatus.updating");
                    case le.NOT_WORKING:
                        return e("constants.trackerStatus.not_working");
                    default:
                        return "";
                }
            }
            const u = mt(!1), h = mt(!1), c = mt([]), p = mt(""), d = mt(!1), g = [
                (H)=>!!H || e("torrentDetail.trackers.editTracker.newUrlRequired")
            ], _ = ws({
                isVisible: !1,
                isFormValid: !1,
                oldUrl: "",
                newUrl: ""
            });
            function m(H) {
                _.isVisible = !0, _.oldUrl = H.url, _.newUrl = H.url, We(()=>{
                    document.getElementById("input")?.select();
                });
            }
            async function b() {
                u.value = !0, h.value = !1;
                try {
                    c.value = await i.getTorrentTrackers(t.torrent.hash);
                } catch  {
                    h.value = !0;
                } finally{
                    u.value = !1;
                }
            }
            const v = ln(function*() {
                yield b();
            }).drop();
            async function S() {
                p.value.length && (await i.addTorrentTrackers(t.torrent.hash, p.value), V(), B());
            }
            function B() {
                d.value = !1, p.value = "";
            }
            async function N() {
                _.isFormValid && (await i.editTorrentTracker(t.torrent.hash, _.oldUrl, _.newUrl), _.isVisible = !1, V());
            }
            async function E(H) {
                await i.removeTorrentTrackers(t.torrent.hash, [
                    H.url
                ]), V();
            }
            async function M() {
                await s.reannounceTorrents([
                    t.torrent.hash
                ]);
            }
            const z = mt(!1), { isActive: L, resume: $, pause: D } = Ss(v.perform, 5e3, {
                immediate: !0,
                immediateCallback: !0
            });
            function k() {
                z.value = !0, D();
            }
            function V() {
                z.value = !1, $();
            }
            return ke(()=>t.isActive, (H)=>{
                H && !z.value ? V() : k();
            }), ts(()=>{
                t.isActive && V();
            }), Cs(()=>{
                k();
            }), on(()=>!d.value && !_.isVisible), (H, Z)=>(O(), K(kt, null, [
                    y(Xt, null, {
                        default: w(()=>[
                                !c.value.length && u.value ? (O(), j(lr, {
                                    key: 0,
                                    title: H.$t("torrentDetail.trackers.loading"),
                                    icon: "mdi-web-sync",
                                    color: "accent"
                                }, null, 8, [
                                    "title"
                                ])) : !c.value.length && h.value ? (O(), j(lr, {
                                    key: 1,
                                    title: H.$t("torrentDetail.trackers.error"),
                                    icon: "mdi-web-remove",
                                    color: "error"
                                }, null, 8, [
                                    "title"
                                ])) : (O(), j(dn, {
                                    key: 2,
                                    headers: n,
                                    items: c.value,
                                    "multi-sort": "",
                                    "sort-by": P(o),
                                    search: a.value,
                                    "filter-keys": [
                                        "url",
                                        "msg"
                                    ],
                                    mobile: null
                                }, {
                                    top: w(()=>[
                                            Y("div", ed, [
                                                y(Qt, {
                                                    modelValue: a.value,
                                                    "onUpdate:modelValue": Z[0] || (Z[0] = (f)=>a.value = f),
                                                    density: "compact",
                                                    label: H.$t("common.search"),
                                                    "prepend-inner-icon": "mdi-magnify",
                                                    flat: "",
                                                    "hide-details": "",
                                                    "single-line": "",
                                                    clearable: ""
                                                }, null, 8, [
                                                    "modelValue",
                                                    "label"
                                                ]),
                                                y(ys, {
                                                    text: P(L) ? H.$t("common.pause") : H.$t("common.resume"),
                                                    location: "bottom"
                                                }, {
                                                    activator: w(({ props: f })=>[
                                                            y(ot, pe(f, {
                                                                icon: P(L) ? "mdi-timer-pause" : "mdi-timer-play",
                                                                color: "primary",
                                                                onClick: Z[1] || (Z[1] = (x)=>P(L) ? k() : V())
                                                            }), null, 16, [
                                                                "icon"
                                                            ])
                                                        ]),
                                                    _: 1
                                                }, 8, [
                                                    "text"
                                                ])
                                            ])
                                        ]),
                                    "item.tier": w(({ value: f })=>[
                                            f >= 0 ? (O(), K("span", sd, G(f), 1)) : Et("", !0)
                                        ]),
                                    "item.status": w(({ value: f })=>[
                                            Y("span", {
                                                class: _s(`tracker-${P(le)[f].toLowerCase()}`)
                                            }, G(l(f)), 3)
                                        ]),
                                    "item.msg": w(({ value: f })=>[
                                            f ? (O(), K("span", id, G(f), 1)) : (O(), K("span", rd, G(H.$t("common.NA")), 1))
                                        ]),
                                    "item.actions": w(({ item: f })=>[
                                            f.tier !== -1 ? (O(), K(kt, {
                                                key: 0
                                            }, [
                                                y(ot, {
                                                    icon: "mdi-pencil",
                                                    variant: "text",
                                                    onClick: (x)=>m(f)
                                                }, null, 8, [
                                                    "onClick"
                                                ]),
                                                y(ot, {
                                                    color: "red",
                                                    icon: "mdi-delete",
                                                    variant: "text",
                                                    onClick: (x)=>E(f)
                                                }, null, 8, [
                                                    "onClick"
                                                ])
                                            ], 64)) : Et("", !0)
                                        ]),
                                    _: 2
                                }, 1032, [
                                    "items",
                                    "sort-by",
                                    "search"
                                ])),
                                Y("div", nd, [
                                    y(qe, {
                                        modelValue: d.value,
                                        "onUpdate:modelValue": Z[3] || (Z[3] = (f)=>d.value = f),
                                        "max-width": "750px"
                                    }, {
                                        activator: w(({ props: f })=>[
                                                y(ot, pe(f, {
                                                    variant: "flat",
                                                    text: P(e)("torrentDetail.trackers.addTrackers.title"),
                                                    color: "accent"
                                                }), null, 16, [
                                                    "text"
                                                ])
                                            ]),
                                        default: w(()=>[
                                                y(Xt, {
                                                    title: H.$t("torrentDetail.trackers.addTrackers.title")
                                                }, {
                                                    default: w(()=>[
                                                            y(me, null, {
                                                                default: w(()=>[
                                                                        y(fn, {
                                                                            modelValue: p.value,
                                                                            "onUpdate:modelValue": Z[2] || (Z[2] = (f)=>p.value = f),
                                                                            label: P(e)("torrentDetail.trackers.addTrackers.newTrackers"),
                                                                            hint: P(e)("torrentDetail.trackers.addTrackers.newTrackersHint")
                                                                        }, null, 8, [
                                                                            "modelValue",
                                                                            "label",
                                                                            "hint"
                                                                        ])
                                                                    ]),
                                                                _: 1
                                                            }),
                                                            y(je, null, {
                                                                default: w(()=>[
                                                                        y(Me),
                                                                        y(ot, {
                                                                            color: "error",
                                                                            onClick: B
                                                                        }, {
                                                                            default: w(()=>[
                                                                                    X(G(P(e)("common.cancel")), 1)
                                                                                ]),
                                                                            _: 1
                                                                        }),
                                                                        y(ot, {
                                                                            color: "accent",
                                                                            onClick: S
                                                                        }, {
                                                                            default: w(()=>[
                                                                                    X(G(P(e)("common.ok")), 1)
                                                                                ]),
                                                                            _: 1
                                                                        })
                                                                    ]),
                                                                _: 1
                                                            })
                                                        ]),
                                                    _: 1
                                                }, 8, [
                                                    "title"
                                                ])
                                            ]),
                                        _: 1
                                    }, 8, [
                                        "modelValue"
                                    ]),
                                    y(ot, {
                                        variant: "flat",
                                        disabled: c.value.length === 3,
                                        text: P(e)("torrentDetail.trackers.reannounce"),
                                        color: "primary",
                                        onClick: M
                                    }, null, 8, [
                                        "disabled",
                                        "text"
                                    ])
                                ])
                            ]),
                        _: 1
                    }),
                    y(qe, {
                        modelValue: _.isVisible,
                        "onUpdate:modelValue": Z[8] || (Z[8] = (f)=>_.isVisible = f),
                        "max-width": "750px"
                    }, {
                        default: w(()=>[
                                y(Xt, null, {
                                    default: w(()=>[
                                            y(As, null, {
                                                default: w(()=>[
                                                        Y("span", od, G(P(e)("torrentDetail.trackers.editTracker.title")), 1)
                                                    ]),
                                                _: 1
                                            }),
                                            y(me, null, {
                                                default: w(()=>[
                                                        y(un, {
                                                            modelValue: _.isFormValid,
                                                            "onUpdate:modelValue": Z[5] || (Z[5] = (f)=>_.isFormValid = f),
                                                            onSubmit: Z[6] || (Z[6] = Ye(()=>{}, [
                                                                "prevent"
                                                            ]))
                                                        }, {
                                                            default: w(()=>[
                                                                    y(Qt, {
                                                                        "model-value": _.oldUrl,
                                                                        disabled: "",
                                                                        label: H.$t("torrentDetail.trackers.editTracker.oldUrl")
                                                                    }, null, 8, [
                                                                        "model-value",
                                                                        "label"
                                                                    ]),
                                                                    y(Qt, {
                                                                        modelValue: _.newUrl,
                                                                        "onUpdate:modelValue": Z[4] || (Z[4] = (f)=>_.newUrl = f),
                                                                        id: "input",
                                                                        rules: g,
                                                                        label: H.$t("torrentDetail.trackers.editTracker.newUrl"),
                                                                        autofocus: "",
                                                                        onKeydown: en(N, [
                                                                            "enter"
                                                                        ])
                                                                    }, null, 8, [
                                                                        "modelValue",
                                                                        "label"
                                                                    ])
                                                                ]),
                                                            _: 1
                                                        }, 8, [
                                                            "modelValue"
                                                        ])
                                                    ]),
                                                _: 1
                                            }),
                                            y(je, null, {
                                                default: w(()=>[
                                                        y(Me),
                                                        y(ot, {
                                                            color: "error",
                                                            disabled: !_.isFormValid,
                                                            onClick: Z[7] || (Z[7] = (f)=>_.isVisible = !1)
                                                        }, {
                                                            default: w(()=>[
                                                                    X(G(P(e)("common.cancel")), 1)
                                                                ]),
                                                            _: 1
                                                        }, 8, [
                                                            "disabled"
                                                        ]),
                                                        y(ot, {
                                                            color: "accent",
                                                            onClick: N
                                                        }, {
                                                            default: w(()=>[
                                                                    X(G(P(e)("common.ok")), 1)
                                                                ]),
                                                            _: 1
                                                        })
                                                    ]),
                                                _: 1
                                            })
                                        ]),
                                    _: 1
                                })
                            ]),
                        _: 1
                    }, 8, [
                        "modelValue"
                    ])
                ], 64));
        }
    });
    ld = Ts(ad, [
        [
            "__scopeId",
            "data-v-c5792b64"
        ]
    ]);
    hd = {
        class: "pa-3 text-select"
    };
    ud = {
        style: {
            "font-size": "1.6em !important"
        },
        class: "subtitle-1 ml-2"
    };
    cd = {
        class: "d-flex justify-end"
    };
    dd = wt({
        __name: "TorrentDetail",
        setup (r) {
            const t = $o(), { t: e } = ee(), s = ye(), i = es(), n = _a(), o = ks(), a = se(), { tab: l } = xt(a), u = [
                {
                    text: e("torrentDetail.tabs.overview"),
                    value: "overview"
                },
                {
                    text: e("torrentDetail.tabs.info"),
                    value: "info"
                },
                {
                    text: e("torrentDetail.tabs.trackers"),
                    value: "trackers"
                },
                {
                    text: e("torrentDetail.tabs.peers"),
                    value: "peers"
                },
                {
                    text: e("torrentDetail.tabs.content"),
                    value: "content"
                },
                {
                    text: e("torrentDetail.tabs.tagsAndCategories"),
                    value: "tagsAndCategories"
                }
            ], h = Q(()=>t.currentRoute.value.params.hash), c = Q(()=>o.getTorrentIndexByHash(h.value)), p = Q(()=>o.getTorrentByHash(h.value)), d = Q(()=>c.value === 0), g = Q(()=>c.value === o.processedTorrents.length - 1);
            function _(M) {
                t.push({
                    name: "torrentDetail",
                    params: {
                        hash: o.processedTorrents[M].hash
                    }
                }).then((z)=>!z && n.forceReload());
            }
            function m() {
                _(0);
            }
            function b() {
                _(c.value - 1);
            }
            function v() {
                _(c.value + 1);
            }
            function S() {
                _(o.processedTorrents.length - 1);
            }
            function B() {
                t.push({
                    name: "dashboard"
                });
            }
            function N(M) {
                if (i.hasActiveDialog) return !1;
                M.key === "Escape" && B();
            }
            function E() {
                const M = t.currentRoute.value.params.tab;
                M && (l.value = M);
            }
            return ke(t.currentRoute, E, {
                immediate: !0
            }), ke(p, ()=>{
                a.fetchProperties(h.value);
            }), ts(()=>{
                document.addEventListener("keydown", N), a.fetchProperties(h.value), s.updateFileTreeTask.perform();
            }), Cs(()=>{
                document.removeEventListener("keydown", N), a.$reset();
            }), (M, z)=>(O(), K(kt, null, [
                    Y("div", hd, [
                        y(pt, {
                            "no-gutters": "",
                            align: "center",
                            justify: "center"
                        }, {
                            default: w(()=>[
                                    y(it, null, {
                                        default: w(()=>[
                                                Y("h1", ud, G(P(e)("torrentDetail.title")), 1)
                                            ]),
                                        _: 1
                                    }),
                                    y(it, null, {
                                        default: w(()=>[
                                                Y("div", cd, [
                                                    y(ot, {
                                                        icon: "mdi-skip-previous",
                                                        disabled: d.value,
                                                        variant: "plain",
                                                        onClick: m
                                                    }, null, 8, [
                                                        "disabled"
                                                    ]),
                                                    y(ot, {
                                                        icon: "mdi-arrow-left",
                                                        disabled: d.value,
                                                        variant: "plain",
                                                        onClick: b
                                                    }, null, 8, [
                                                        "disabled"
                                                    ]),
                                                    y(ot, {
                                                        icon: "mdi-arrow-right",
                                                        disabled: g.value,
                                                        variant: "plain",
                                                        onClick: v
                                                    }, null, 8, [
                                                        "disabled"
                                                    ]),
                                                    y(ot, {
                                                        icon: "mdi-skip-next",
                                                        disabled: g.value,
                                                        variant: "plain",
                                                        onClick: S
                                                    }, null, 8, [
                                                        "disabled"
                                                    ]),
                                                    y(ot, {
                                                        icon: "mdi-close",
                                                        variant: "plain",
                                                        onClick: B
                                                    })
                                                ])
                                            ]),
                                        _: 1
                                    })
                                ]),
                            _: 1
                        }),
                        y(pt, {
                            class: "ma-0 pa-0"
                        }, {
                            default: w(()=>[
                                    y(ya, {
                                        modelValue: P(l),
                                        "onUpdate:modelValue": z[0] || (z[0] = (L)=>Xe(l) ? l.value = L : null),
                                        "bg-color": "primary",
                                        grow: "",
                                        "show-arrows": ""
                                    }, {
                                        default: w(()=>[
                                                (O(), K(kt, null, Gt(u, ({ text: L, value: $ })=>y(xa, {
                                                        value: $,
                                                        text: L,
                                                        replace: "",
                                                        to: {
                                                            name: "torrentDetail",
                                                            params: {
                                                                hash: h.value,
                                                                tab: $
                                                            }
                                                        }
                                                    }, null, 8, [
                                                        "value",
                                                        "text",
                                                        "to"
                                                    ])), 64))
                                            ]),
                                        _: 1
                                    }, 8, [
                                        "modelValue"
                                    ])
                                ]),
                            _: 1
                        }),
                        p.value ? (O(), j(ba, {
                            key: 0,
                            modelValue: P(l),
                            "onUpdate:modelValue": z[1] || (z[1] = (L)=>Xe(l) ? l.value = L : null),
                            touch: !1
                        }, {
                            default: w(()=>[
                                    y(ve, {
                                        value: "overview"
                                    }, {
                                        default: w(()=>[
                                                y(Vc, {
                                                    torrent: p.value,
                                                    "is-active": P(l) === "overview"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(ve, {
                                        value: "info"
                                    }, {
                                        default: w(()=>[
                                                y(ja, {
                                                    torrent: p.value,
                                                    "is-active": P(l) === "info"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(ve, {
                                        value: "trackers"
                                    }, {
                                        default: w(()=>[
                                                y(ld, {
                                                    torrent: p.value,
                                                    "is-active": P(l) === "trackers"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(ve, {
                                        value: "peers"
                                    }, {
                                        default: w(()=>[
                                                y(Jc, {
                                                    torrent: p.value,
                                                    "is-active": P(l) === "peers"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(ve, {
                                        value: "content"
                                    }, {
                                        default: w(()=>[
                                                y(P(Fa), {
                                                    torrent: p.value,
                                                    "is-active": P(l) === "content"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(ve, {
                                        value: "tagsAndCategories"
                                    }, {
                                        default: w(()=>[
                                                y(td, {
                                                    torrent: p.value,
                                                    "is-active": P(l) === "tagsAndCategories"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    })
                                ]),
                            _: 1
                        }, 8, [
                            "modelValue"
                        ])) : Et("", !0)
                    ]),
                    Y("div", {
                        style: sn(`position: absolute; left: ${P(s).rightClickProperties.offset[0]}px; top: ${P(s).rightClickProperties.offset[1]}px;`)
                    }, [
                        y(P(Ro), {
                            modelValue: P(s).rightClickProperties.isVisible,
                            "onUpdate:modelValue": z[2] || (z[2] = (L)=>P(s).rightClickProperties.isVisible = L),
                            "menu-data": P(s).menuData
                        }, null, 8, [
                            "modelValue",
                            "menu-data"
                        ])
                    ], 4)
                ], 64));
        }
    });
    yd = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: dd
    }, Symbol.toStringTag, {
        value: "Module"
    }));
});
export { Ft as $, no as A, Pt as B, xe as C, ne as D, ht as E, Tn as F, Ms as G, zt as H, Ol as I, ui as J, Ke as K, dh as L, et as M, vh as N, _t as O, At as P, vt as Q, yr as R, Yh as S, os as T, mr as U, Ah as V, di as W, Hs as X, pi as Y, Ul as Z, Sa as _, re as a, Mn as a0, oo as a1, ct as a2, yt as a3, Ih as a4, Qh as a5, _u as a6, xu as a7, Su as a8, Tu as a9, ku as aa, Ve as ab, ze as ac, Qi as ad, Is as ae, Eh as af, bs as ag, Te as ah, vo as ai, Ii as aj, Pi as ak, ll as al, vs as am, ul as an, So as ao, yd as ap, Qe as b, ms as c, Rr as d, Vt as e, Mi as f, Uh as g, so as h, On as i, qt as j, eo as k, gu as l, yu as m, Qr as n, wu as o, Au as p, uo as q, Cl as r, Er as s, ut as t, ye as u, Zn as v, Dt as w, hl as x, Mu as y, Jt as z, __tla };

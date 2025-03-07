const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./MoveTorrentFileDialog-D_IlX0K_.js","./ColoredChip.vue_vue_type_script_setup_true_lang-CV9h0D52.js","./index-C3mJQla3.js","./vue-MZqnBktf.js","./vuetify-BDjLL5uD.js","./index-4LVWYijk.css","./BulkRenameFilesDialog-bFgA6XMo.js","./BulkRenameFilesDialog-CKEu44go.css","./browserAll-Df76XZ95.js","./webworkerAll-Brhu0MAK.js","./colorToUniform-C2GHuDhf.js","./CanvasPool-ByNHvXaN.js","./WebGPURenderer-DpKTmUag.js","./SharedSystems-Irxmz55K.js","./WebGLRenderer-BSZ1VwE9.js"])))=>i.map(i=>d[i]);
import { b as we, a as Mo, _ as Io } from "./ColoredChip.vue_vue_type_script_setup_true_lang-CV9h0D52.js";
import { s as Wt, a as Z, a6 as Nr, b as Ro, a0 as Ji, d as mt, V as Eo, Q as xt, r as vs, l as Do, A as He, a7 as nr, h as wt, H as Bo, B as K, D as N, G as v, m as y, I as X, J as V, u as R, L as Ye, M as Et, K as tn, O as We, S as Y, N as q, U as en, X as gs, w as Te, z as ts, q as ws, n as ke, $ as Or, F as kt, T as Gt, E as sn, a1 as Ar, R as Fo, W as zr, v as Go, a8 as rn, a9 as nn, P as Vo } from "./vue-MZqnBktf.js";
import { bq as nt, br as $o, a1 as on, $ as Ce, u as ee, F as Cs, o as jt, a2 as No, ae as an, p as Ss, bs as Pe, c as ln, d as Xt, e as As, f as pe, g as hn, V as Qt, i as Xe, j as Me, k as ot, l as je, bt as Lr, J as Oo, K as zo, r as pt, q as it, t as Ur, bu as Lo, a6 as Ot, a as St, ah as un, bp as Uo, a8 as Ts, R as _s, U as Ho, ax as Yo, W as ks, z as me, B as ge, ac as xe, a5 as Wo, bf as Xo, C as ys, s as qe, an as Hr, bl as fe, y as jo, bv as Es, bi as qo, be as Ko, bd as Zo, bm as Yr, bw as Qo, bx as Jo, by as ta, H as ea, ap as sa, ai as or, b9 as ra, aP as ia, au as na, ag as ar, a0 as cn, bz as oa, bA as Ds, ad as dn, b as aa, m as la, aw as Wr, b3 as ha, bB as ua, a3 as ca, a4 as da, b1 as be, b2 as fa, __tla as __tla_0 } from "./index-C3mJQla3.js";
import { a as fn, u as pa } from "./vuetify-BDjLL5uD.js";
let $l, io, Pt, ye, ne, ht, Jt, Ms, An, zt, Fl, hi, Ke, tt, ah, gh, At, _t, _r, zh, ns, pr, vt, bh, ci, Hs, fi, xa, re, Ft, Pn, no, ct, yt, Ah, Xh, du, pu, xu, vu, wu, Ge, Oe, Zi, Is, kh, xs, Ae, bo, Mi, ki, rl, bs, nl, Co, fd, $h, Qe, ps, Vt, Pi, ya, Ir, eo, Nn, qt, to, cu, Zr, fu, _u, bu, yl, ho, Rr, _e, ut, Dt, Kn, il, Su;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    var le = ((r)=>(r[r.DISABLED = 0] = "DISABLED", r[r.NOT_YET_CONTACTED = 1] = "NOT_YET_CONTACTED", r[r.WORKING = 2] = "WORKING", r[r.UPDATING = 3] = "UPDATING", r[r.NOT_WORKING = 4] = "NOT_WORKING", r))(le || {});
    class ma {
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
    class pn {
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
    function Xr() {
        return new pn("(root)", "");
    }
    function ga(r, t) {
        const e = Wt(Xr()), s = Z(()=>{
            const n = (o, a)=>{
                const l = a === "" ? o.name : a + "/" + o.name;
                if (o.type === "folder" && Nr(t).has(o.fullName)) {
                    const u = $o(o.children, (h, c)=>h.type === "folder" && c.type === "file" ? -1 : h.type === "file" && c.type === "folder" ? 1 : on.textWithNumbers.asc(h.name, c.name)).flatMap((h)=>n(h, l));
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
            const n = Xr(), o = Nr(r) ?? [];
            for (const a of o){
                let l = n;
                a.name.replace(/\\/g, "/").split("/").reduce((u, h)=>{
                    const c = u === "" ? h : u + "/" + h;
                    if (u === a.name.substring(0, a.name.lastIndexOf("/"))) l.children.push(new ma(a, h));
                    else {
                        const m = l.children.find((d)=>d.name === h);
                        if (m) l = m;
                        else {
                            const d = new pn(h, c);
                            l.children.push(d), l = d;
                        }
                    }
                    return c;
                }, "");
            }
            e.value = n, n.buildCache();
        }
        return Ro(()=>{
            i();
        }), {
            tree: e,
            flatTree: s
        };
    }
    const _a = {
        pdf: "mdi-file-pdf-box",
        png: "mdi-file-image",
        jpg: "mdi-file-image",
        jpeg: "mdi-file-image",
        tiff: "mdi-file-image",
        doc: "mdi-file-document",
        docx: "mdi-file-document",
        txt: "mdi-file-document",
        nfo: "mdi-information-variant-box",
        mp3: "mdi-music",
        wav: "mdi-music",
        flac: "mdi-music",
        avi: "mdi-movie",
        mp4: "mdi-movie",
        mkv: "mdi-movie",
        mov: "mdi-movie",
        wmv: "mdi-movie",
        srt: "mdi-subtitles",
        idx: "mdi-subtitles",
        sub: "mdi-subtitles",
        rar: "mdi-zip-box-outline",
        zip: "mdi-zip-box-outline",
        gz: "mdi-zip-box-outline",
        "7z": "mdi-zip-box-outline",
        iso: "mdi-zip-box-outline",
        exe: "mdi-application-brackets",
        msi: "mdi-application-brackets",
        dmg: "mdi-application-brackets",
        deb: "mdi-application-brackets",
        jar: "mdi-application-brackets"
    };
    ya = function(r) {
        const t = r.split(".").pop()?.toLowerCase() || "";
        return _a[t] || "mdi-file";
    };
    let se, ba, va, wa, Ca, Sa, Aa, Ta, jr, ka, Pa, Ma, Ia, Ra, Ea, Da;
    se = Ji("torrentDetail", ()=>{
        const r = mt("overview"), t = mt();
        async function e(s) {
            t.value = await Ce.getTorrentProperties(s);
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
    _e = Ji("content", ()=>{
        const { t: r } = ee(), t = Eo(), e = Cs(), { fileContentInterval: s, expandContent: i } = xt(jt()), n = Z(()=>t.params.hash), o = vs({
            isVisible: !1,
            offset: [
                0,
                0
            ]
        }), a = Wt(!0), l = Wt([]), u = Wt(""), { results: h } = No(l, u, (k)=>k.name), c = Wt(new Set([
            ""
        ])), { flatTree: m } = ga(h, c), d = Wt(new Set), g = Wt(""), _ = Z(()=>d.value.size === 0 ? [] : m.value.filter((k)=>d.value.has(k.fullName))), p = Z(()=>_.value.length > 0 ? _.value[0] : null), b = Z(()=>_.value.map((k)=>k.childrenIds).flat().filter((k, E, L)=>L.indexOf(k) === E)), C = Z(()=>[
                {
                    text: r(`torrentDetail.content.rename.${p.value?.type || "file"}`),
                    icon: "mdi-rename",
                    hidden: d.value.size > 1 || p.value?.fullName === "",
                    action: ()=>O(p.value)
                },
                {
                    text: r("torrentDetail.content.rename.bulk"),
                    icon: "mdi-rename",
                    hidden: d.value.size !== 1 || (p.value?.type || "file") === "file",
                    action: ()=>I(Do(p.value))
                },
                {
                    text: r("torrentDetail.content.invert_priority"),
                    icon: "mdi-checkbox-intermediate-variant",
                    action: G
                },
                {
                    text: r("torrentDetail.content.priority"),
                    icon: "mdi-trending-up",
                    children: [
                        {
                            text: r("constants.file_priority.max"),
                            icon: "mdi-arrow-up",
                            action: ()=>U(b.value, nt.MAXIMAL)
                        },
                        {
                            text: r("constants.file_priority.high"),
                            icon: "mdi-arrow-top-right",
                            action: ()=>U(b.value, nt.HIGH)
                        },
                        {
                            text: r("constants.file_priority.normal"),
                            icon: "mdi-minus",
                            action: ()=>U(b.value, nt.NORMAL)
                        },
                        {
                            text: r("constants.file_priority.unwanted"),
                            icon: "mdi-cancel",
                            action: ()=>U(b.value, nt.DO_NOT_DOWNLOAD)
                        }
                    ]
                },
                {
                    text: "Collapse All",
                    icon: "mdi-unfold-less-horizontal",
                    action: T
                },
                {
                    text: "Expand All",
                    icon: "mdi-unfold-more-horizontal",
                    action: M
                }
            ]), A = an(function*() {
            a.value ? (yield z().then(()=>i.value && M()), a.value = !1) : yield z();
        }).drop(), B = Wt(!1), { isActive: $, pause: D, resume: P } = Ss(A.perform, s, {
            immediate: !1,
            immediateCallback: !0
        });
        async function z() {
            l.value = await et(n.value), await He();
        }
        async function O(k) {
            const { default: E } = await Pe(async ()=>{
                const { default: H } = await import("./MoveTorrentFileDialog-D_IlX0K_.js");
                return {
                    default: H
                };
            }, __vite__mapDeps([0,1,2,3,4,5]), import.meta.url), L = {
                hash: n.value,
                isFolder: k.type === "folder",
                oldName: k.fullName
            };
            e.createDialog(E, L, A.perform);
        }
        async function I(k) {
            const { default: E } = await Pe(async ()=>{
                const { default: H } = await import("./BulkRenameFilesDialog-bFgA6XMo.js");
                return {
                    default: H
                };
            }, __vite__mapDeps([6,2,3,4,5,1,7]), import.meta.url), L = {
                hash: n.value,
                node: k
            };
            e.createDialog(E, L, A.perform);
        }
        async function G() {
            const k = _.value.flatMap((j)=>j.childrenIds), E = l.value.filter((j)=>k.includes(j.index)), L = E.filter((j)=>j.priority !== nt.DO_NOT_DOWNLOAD).map((j)=>j.index), H = E.filter((j)=>j.priority === nt.DO_NOT_DOWNLOAD).map((j)=>j.index);
            await Promise.all([
                U(H, nt.NORMAL),
                U(L, nt.DO_NOT_DOWNLOAD)
            ]);
        }
        async function S(k, E, L) {
            await Ce.renameFile(k, E, L);
        }
        async function W(k, E, L) {
            await Ce.renameFolder(k, E, L);
        }
        async function U(k, E) {
            await Ce.setTorrentFilePriority(n.value, k, E), A.perform();
        }
        async function et(k, E) {
            return await Ce.getTorrentFiles(k, E);
        }
        async function f(k) {
            return await Ce.getTorrentPieceStates(k);
        }
        function x(k, E) {
            k.stopPropagation();
            const L = E.type === "file" ? E.fullName.slice(0, E.fullName.lastIndexOf("/")) : E.fullName;
            c.value.has(L) || (c.value.add(L), nr(c));
        }
        function w(k, E) {
            k.stopPropagation();
            const L = E.type === "file" || !c.value.has(E.fullName) ? E.fullName.slice(0, E.fullName.lastIndexOf("/")) : E.fullName;
            c.value.has(L) && (c.value.delete(L), d.value.has(E.fullName) && (d.value.delete(E.fullName), d.value.add(L), g.value = L), nr(c));
        }
        function T() {
            c.value = new Set([
                ""
            ]);
        }
        function M() {
            c.value = l.value.flatMap((k)=>k.name.replaceAll("\\", "/").split("/").reduce((E, L, H, j)=>[
                        ...E,
                        ...H < j.length - 1 ? [
                            [
                                ...E,
                                L
                            ].join("/")
                        ] : []
                    ], [])).reduce((k, E)=>k.add(E), new Set([
                ""
            ]));
        }
        async function F(...k) {
            const E = k.some((H)=>H.wanted), L = k.flatMap((H)=>H.childrenIds);
            E ? await U(L, nt.DO_NOT_DOWNLOAD) : await U(L, nt.NORMAL);
        }
        return {
            rightClickProperties: o,
            isFirstRun: a,
            internalSelection: d,
            lastSelected: g,
            selectedNodes: _,
            menuData: C,
            filenameFilter: u,
            cachedFiles: l,
            openedItems: c,
            filteredFiles: h,
            flatTree: m,
            updateFileTreeTask: A,
            timerForcedPause: B,
            isTimerActive: $,
            pauseTimer: D,
            resumeTimer: P,
            renameTorrentFile: S,
            renameTorrentFolder: W,
            setFilePriority: U,
            fetchFiles: et,
            fetchPieceState: f,
            openNode: x,
            closeNode: w,
            collapseAll: T,
            expandAll: M,
            toggleFileSelection: F,
            $reset: ()=>{
                D(), A.clear(), d.value.clear(), g.value = "", u.value = "", l.value = [], c.value = new Set([
                    ""
                ]), a.value = !0;
            }
        };
    });
    xa = wt({
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
            const t = r, { isOpened: e } = ln(t.guid), { t: s } = ee(), i = _e(), n = mt(), o = mt(), a = mt(!1), l = vs({
                newName: ""
            }), u = [
                (m)=>!!m || s("dialogs.moveTorrent.required")
            ];
            async function h() {
                await n.value?.validate(), a.value && (t.isFolder ? await i.renameTorrentFolder(t.hash, t.oldName, l.newName) : await i.renameTorrentFile(t.hash, t.oldName, l.newName), c());
            }
            const c = ()=>{
                e.value = !1;
            };
            return Bo(()=>{
                if (l.newName = t.oldName, t.isFolder) He(()=>o.value?.select());
                else {
                    const m = l.newName.lastIndexOf("/"), d = l.newName.lastIndexOf(".");
                    He(()=>{
                        o.value?.setSelectionRange(m + 1, d == -1 ? l.newName.length : d);
                    });
                }
            }), (m, d)=>(N(), K(je, {
                    modelValue: R(e),
                    "onUpdate:modelValue": d[3] || (d[3] = (g)=>We(e) ? e.value = g : null)
                }, {
                    default: v(()=>[
                            y(Xt, null, {
                                default: v(()=>[
                                        y(As, null, {
                                            default: v(()=>[
                                                    X(V(R(s)("dialogs.moveTorrentFile.title", 1 + Number(m.isFolder))), 1)
                                                ]),
                                            _: 1
                                        }),
                                        y(pe, null, {
                                            default: v(()=>[
                                                    y(R(hn), {
                                                        modelValue: a.value,
                                                        "onUpdate:modelValue": d[1] || (d[1] = (g)=>a.value = g),
                                                        ref_key: "form",
                                                        ref: n,
                                                        onSubmit: d[2] || (d[2] = Ye(()=>{}, [
                                                            "prevent"
                                                        ]))
                                                    }, {
                                                        default: v(()=>[
                                                                m.oldName ? (N(), K(Qt, {
                                                                    key: 0,
                                                                    "model-value": m.oldName,
                                                                    disabled: "",
                                                                    label: m.$t("dialogs.moveTorrentFile.oldName")
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
                                                                    label: m.$t("dialogs.moveTorrent.newPath"),
                                                                    onKeydown: tn(h, [
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
                                        y(Xe, null, {
                                            default: v(()=>[
                                                    y(Me),
                                                    y(ot, {
                                                        color: "error",
                                                        onClick: c
                                                    }, {
                                                        default: v(()=>[
                                                                X(V(m.$t("common.cancel")), 1)
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y(ot, {
                                                        color: "accent",
                                                        disabled: !a.value,
                                                        onClick: h
                                                    }, {
                                                        default: v(()=>[
                                                                X(V(m.$t("common.save")), 1)
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
    ba = {
        style: {
            "white-space": "nowrap"
        }
    };
    va = wt({
        __name: "ContentFilterDialog",
        props: {
            guid: {}
        },
        setup (r) {
            const t = r, { t: e } = ee(), { isOpened: s } = ln(t.guid), i = _e(), n = jt(), o = Z(()=>i.cachedFiles.map((p)=>p.size).reduce((p, b)=>[
                        p[0] === -1 || b < p[0] ? b : p[0],
                        p[1] === -1 || b > p[1] ? b : p[1]
                    ], [
                    -1,
                    -1
                ])), a = Z(()=>Array.from(new Set(i.cachedFiles.map((p)=>Lr(p.name)[1])).values())), l = Z(()=>a.value.map((p)=>p === "" ? {
                        title: e("common.none"),
                        value: ""
                    } : {
                        title: `.${p}`,
                        value: p
                    }).sort((p, b)=>on.text.asc(p.title, b.title))), u = [
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
            ], h = vs({
                extensions: [],
                priority: [],
                size: o.value
            }), c = Z(()=>i.cachedFiles.filter((p)=>(!h.extensions.length || h.extensions.includes(Lr(p.name)[1])) && (!h.priority.length || h.priority.includes(p.priority)) && p.size >= h.size[0] && p.size <= h.size[1])), m = Z(()=>c.value.reduce((p, b)=>p + b.size, 0));
            function d() {
                i.setFilePriority(c.value.map((p)=>p.index), nt.DO_NOT_DOWNLOAD), _();
            }
            function g() {
                const p = c.value.filter((b)=>b.priority === nt.DO_NOT_DOWNLOAD).map((b)=>b.index);
                i.setFilePriority(p, nt.NORMAL), _();
            }
            function _() {
                s.value = !1;
            }
            return (p, b)=>(N(), K(je, {
                    modelValue: R(s),
                    "onUpdate:modelValue": b[5] || (b[5] = (C)=>We(s) ? s.value = C : null),
                    fullscreen: p.$vuetify.display.mobile
                }, {
                    default: v(()=>[
                            y(Xt, null, {
                                default: v(()=>[
                                        y(As, {
                                            class: "ios-margin"
                                        }, {
                                            default: v(()=>[
                                                    y(Oo, {
                                                        color: "transparent"
                                                    }, {
                                                        default: v(()=>[
                                                                y(zo, null, {
                                                                    default: v(()=>[
                                                                            X(V(p.$t("torrentDetail.content.filter.title")), 1)
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
                                        y(pe, null, {
                                            default: v(()=>[
                                                    y(pt, null, {
                                                        default: v(()=>[
                                                                y(it, {
                                                                    cols: "4",
                                                                    class: "d-flex align-center"
                                                                }, {
                                                                    default: v(()=>[
                                                                            X(V(p.$t("torrentDetail.content.filter.extensions")), 1)
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(it, {
                                                                    cols: "8"
                                                                }, {
                                                                    default: v(()=>[
                                                                            y(Ur, {
                                                                                modelValue: h.extensions,
                                                                                "onUpdate:modelValue": b[0] || (b[0] = (C)=>h.extensions = C),
                                                                                items: l.value,
                                                                                placeholder: p.$t("common.disabled"),
                                                                                "persistent-placeholder": "",
                                                                                multiple: "",
                                                                                "hide-details": ""
                                                                            }, null, 8, [
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
                                                        default: v(()=>[
                                                                y(it, {
                                                                    cols: "4",
                                                                    class: "d-flex align-center"
                                                                }, {
                                                                    default: v(()=>[
                                                                            X(V(p.$t("torrentDetail.content.filter.priority")), 1)
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(it, {
                                                                    cols: "8"
                                                                }, {
                                                                    default: v(()=>[
                                                                            y(Ur, {
                                                                                modelValue: h.priority,
                                                                                "onUpdate:modelValue": b[1] || (b[1] = (C)=>h.priority = C),
                                                                                items: u,
                                                                                placeholder: p.$t("common.disabled"),
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
                                                        default: v(()=>[
                                                                y(it, {
                                                                    cols: "4",
                                                                    class: "d-flex align-center"
                                                                }, {
                                                                    default: v(()=>[
                                                                            X(V(p.$t("torrentDetail.content.filter.size")), 1)
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(it, {
                                                                    cols: "8"
                                                                }, {
                                                                    default: v(()=>[
                                                                            y(Lo, {
                                                                                modelValue: h.size,
                                                                                "onUpdate:modelValue": b[4] || (b[4] = (C)=>h.size = C),
                                                                                direction: p.$vuetify.display.mobile ? "vertical" : "horizontal",
                                                                                color: "primary",
                                                                                disabled: o.value[0] === o.value[1],
                                                                                min: o.value[0],
                                                                                max: o.value[1],
                                                                                step: 1,
                                                                                density: "compact",
                                                                                "thumb-label": "always",
                                                                                "hide-details": ""
                                                                            }, {
                                                                                "thumb-label": v(({ modelValue: C })=>[
                                                                                        Y("div", ba, V(R(Ot)(C, R(n).useBinarySize)), 1)
                                                                                    ]),
                                                                                prepend: v(()=>[
                                                                                        y(Qt, {
                                                                                            modelValue: h.size[0],
                                                                                            "onUpdate:modelValue": b[2] || (b[2] = (C)=>h.size[0] = C),
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
                                                                                append: v(()=>[
                                                                                        y(Qt, {
                                                                                            modelValue: h.size[1],
                                                                                            "onUpdate:modelValue": b[3] || (b[3] = (C)=>h.size[1] = C),
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
                                                        default: v(()=>[
                                                                y(it, {
                                                                    cols: "12"
                                                                }, {
                                                                    default: v(()=>[
                                                                            X(V(p.$t("torrentDetail.content.filter.preview", {
                                                                                count: c.value.length,
                                                                                total: R(i).cachedFiles.length,
                                                                                size: R(Ot)(m.value, R(n).useBinarySize)
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
                                        y(Xe, null, {
                                            default: v(()=>[
                                                    y(ot, {
                                                        color: "error",
                                                        onClick: d
                                                    }, {
                                                        default: v(()=>[
                                                                X(V(p.$t("torrentDetail.content.filter.exclude")), 1)
                                                            ]),
                                                        _: 1
                                                    }),
                                                    y(ot, {
                                                        color: "success",
                                                        onClick: g
                                                    }, {
                                                        default: v(()=>[
                                                                X(V(p.$t("torrentDetail.content.filter.include")), 1)
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
    wa = {
        class: "d-flex"
    };
    Ca = {
        key: 1,
        class: "d-flex align-center spacer"
    };
    Sa = {
        class: "d-flex flex-column overflow-hidden text-no-wrap mr-3"
    };
    Aa = {
        class: "text-grey"
    };
    Ta = {
        class: "d-flex align-center"
    };
    jr = "#ffe476";
    ka = wt({
        __name: "ContentNode",
        props: {
            node: {}
        },
        emits: [
            "onRightClick"
        ],
        setup (r) {
            const t = r, { t: e } = ee(), { mobile: s } = fn(), i = _e(), { internalSelection: n, lastSelected: o, openedItems: a } = xt(i), l = jt(), u = Z(()=>{
                if (t.node.fullName === "") return 0;
                const g = t.node.fullName.split("/").length, _ = s.value ? 12 : 24;
                return g * _;
            });
            function h(g, _) {
                Uo(g) ? (n.value.has(_.fullName) ? n.value.delete(_.fullName) : n.value.add(_.fullName), nr(n)) : n.value = new Set([
                    _.fullName
                ]), o.value = _.fullName;
            }
            function c(g) {
                return g.wanted ? g.progress === 1 ? "green" : "" : "grey";
            }
            function m(g) {
                const [_, p] = g.deepCount, b = [];
                return _ > 1 && b.push(e("torrentDetail.content.folderInfo", _ - 1)), p > 0 && b.push(e("torrentDetail.content.fileInfo", p)), b.join(", ");
            }
            function d(g) {
                const _ = Ot(g.size, l.useBinarySize), p = Ot(g.selectedSize, l.useBinarySize);
                let b;
                if (g.type === "folder") {
                    let C = _;
                    g.selectedSize > 0 && (C += ` (${p})`), b = [
                        C,
                        m(g)
                    ];
                } else b = [
                    _
                ];
                return b.join(" | ");
            }
            return (g, _)=>(N(), q("div", {
                    class: gs([
                        "d-flex flex-column py-2 pr-3",
                        g.node.isSelected(R(n)) ? "selected" : ""
                    ]),
                    style: en(`padding-left: ${u.value}px`),
                    onClick: _[2] || (_[2] = Ye((p)=>h(p, g.node), [
                        "stop"
                    ])),
                    onContextmenu: _[3] || (_[3] = (p)=>g.$emit("onRightClick", p, g.node))
                }, [
                    Y("div", wa, [
                        Y("div", {
                            class: "d-flex align-center",
                            onClick: _[0] || (_[0] = Ye((p)=>R(i).toggleFileSelection(g.node), [
                                "stop"
                            ]))
                        }, [
                            g.node.priority === R(nt).MIXED ? (N(), K(St, {
                                key: 0,
                                color: c(g.node),
                                icon: "mdi-checkbox-intermediate-variant"
                            }, null, 8, [
                                "color"
                            ])) : g.node.wanted ? (N(), K(St, {
                                key: 1,
                                color: c(g.node),
                                icon: "mdi-checkbox-marked"
                            }, null, 8, [
                                "color"
                            ])) : (N(), K(St, {
                                key: 2,
                                color: c(g.node),
                                icon: "mdi-checkbox-blank-outline"
                            }, null, 8, [
                                "color"
                            ]))
                        ]),
                        g.node.type === "folder" ? (N(), q("div", {
                            key: 0,
                            class: "d-flex align-center spacer cursor-pointer",
                            onClick: _[1] || (_[1] = (p)=>R(a).has(g.node.fullName) ? R(i).closeNode(p, g.node) : R(i).openNode(p, g.node))
                        }, [
                            y(St, null, {
                                default: v(()=>[
                                        X(V(R(a).has(g.node.fullName) ? "mdi-chevron-up" : "mdi-chevron-down"), 1)
                                    ]),
                                _: 1
                            }),
                            g.node.fullName === "" ? (N(), K(St, {
                                key: 0,
                                icon: "mdi-file-tree"
                            })) : R(a).has(g.node.fullName) ? (N(), K(St, {
                                key: 1,
                                icon: "mdi-folder-open",
                                color: jr
                            })) : (N(), K(St, {
                                key: 2,
                                icon: "mdi-folder",
                                color: jr
                            }))
                        ])) : (N(), q("div", Ca, [
                            y(St, {
                                icon: R(ya)(g.node.name)
                            }, null, 8, [
                                "icon"
                            ])
                        ])),
                        Y("div", Sa, [
                            Y("div", {
                                class: gs(`text-${c(g.node)}`)
                            }, V(g.node.name), 3),
                            Y("div", Aa, V(d(g.node)), 1)
                        ]),
                        y(Me),
                        Y("div", Ta, [
                            g.node.priority === R(nt).MAXIMAL ? (N(), K(St, {
                                key: 0,
                                color: "error"
                            }, {
                                default: v(()=>_[4] || (_[4] = [
                                        X("mdi-arrow-up")
                                    ])),
                                _: 1
                            })) : g.node.priority === R(nt).HIGH ? (N(), K(St, {
                                key: 1,
                                color: "warning"
                            }, {
                                default: v(()=>_[5] || (_[5] = [
                                        X("mdi-arrow-top-right")
                                    ])),
                                _: 1
                            })) : g.node.priority === R(nt).NORMAL ? (N(), K(St, {
                                key: 2
                            }, {
                                default: v(()=>_[6] || (_[6] = [
                                        X("mdi-minus")
                                    ])),
                                _: 1
                            })) : g.node.priority === R(nt).MIXED ? (N(), K(St, {
                                key: 3
                            }, {
                                default: v(()=>_[7] || (_[7] = [
                                        X("mdi-tilde")
                                    ])),
                                _: 1
                            })) : g.node.priority === R(nt).DO_NOT_DOWNLOAD ? (N(), K(St, {
                                key: 4,
                                color: "grey"
                            }, {
                                default: v(()=>_[8] || (_[8] = [
                                        X("mdi-cancel")
                                    ])),
                                _: 1
                            })) : Et("", !0)
                        ])
                    ]),
                    y(un, {
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
    Pa = Ts(ka, [
        [
            "__scopeId",
            "data-v-0a66b62d"
        ]
    ]);
    Ma = {
        class: "mt-2 mx-3 d-flex flex-gap align-center"
    };
    Ia = wt({
        __name: "Content",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, { height: e } = fn(), s = _e(), { rightClickProperties: i, filenameFilter: n, flatTree: o, internalSelection: a, selectedNodes: l, lastSelected: u, timerForcedPause: h, isTimerActive: c } = xt(s), m = Cs(), d = mt(), g = Z(()=>e.value - 48 * 2 - 64 - 12 * 2 - 56 - 8);
            async function _(P, z) {
                i.value.isVisible && (i.value.isVisible = !1, await He()), Object.assign(i.value, {
                    isVisible: !0,
                    offset: [
                        P.pageX,
                        P.pageY
                    ],
                    hash: t.torrent.hash
                }), a.value.size <= 1 && (a.value = new Set([
                    z.fullName
                ]), u.value = z.fullName);
            }
            const p = mt();
            function b(P, z) {
                p.value = setTimeout(()=>{
                    _(P, z);
                }, 500);
            }
            function C() {
                clearTimeout(p.value);
            }
            Te(()=>t.isActive, (P)=>{
                P && !h.value ? s.resumeTimer() : s.pauseTimer();
            }, {
                immediate: !0
            }), ts(()=>{
                document.addEventListener("keydown", D);
            }), ws(()=>{
                s.$reset(), document.removeEventListener("keydown", D);
            });
            function A() {
                h.value = !0, s.pauseTimer();
            }
            function B() {
                h.value = !1, s.resumeTimer();
            }
            function $() {
                m.createDialog(va);
            }
            function D(P) {
                let z;
                ((S)=>{
                    S.ArrowUp = "ArrowUp", S.ArrowDown = "ArrowDown", S.ArrowLeft = "ArrowLeft", S.ArrowRight = "ArrowRight", S.Spacebar = " ";
                })(z || (z = {}));
                const O = P.key;
                if (m.hasActiveDialog || !Object.values(z).includes(O)) return !1;
                P.preventDefault();
                const I = o.value.findIndex((S)=>S.fullName === u.value);
                let G = I;
                switch(O){
                    case "ArrowUp":
                        I > 0 && G--;
                        break;
                    case "ArrowDown":
                        I < o.value.length - 1 && G++;
                        break;
                    case "ArrowLeft":
                        s.closeNode(P, o.value[I]), G = o.value.findIndex((S)=>S.fullName === u.value);
                        break;
                    case "ArrowRight":
                        s.openNode(P, o.value[I]);
                        break;
                    case " ":
                        s.toggleFileSelection(...l.value).then();
                        break;
                }
                return I !== G && (u.value = o.value[G].fullName, a.value = new Set([
                    u.value
                ]), d.value?.scrollToIndex(Math.max(0, G - Math.floor(g.value / 68 / 2)))), !0;
            }
            return (P, z)=>(N(), K(Xt, null, {
                    default: v(()=>[
                            Y("div", Ma, [
                                y(Qt, {
                                    modelValue: R(n),
                                    "onUpdate:modelValue": z[0] || (z[0] = (O)=>We(n) ? n.value = O : null),
                                    "hide-details": "",
                                    clearable: "",
                                    placeholder: P.$t("torrentDetail.content.filter_placeholder"),
                                    onKeydown: z[1] || (z[1] = Ye(()=>{}, [
                                        "stop"
                                    ]))
                                }, null, 8, [
                                    "modelValue",
                                    "placeholder"
                                ]),
                                y(_s, {
                                    text: P.$t("torrentDetail.content.filter.activator"),
                                    location: "bottom"
                                }, {
                                    activator: v(({ props: O })=>[
                                            y(ot, ke(O, {
                                                icon: "mdi-select-multiple",
                                                color: "primary",
                                                onClick: $
                                            }), null, 16)
                                        ]),
                                    _: 1
                                }, 8, [
                                    "text"
                                ]),
                                y(_s, {
                                    text: R(c) ? P.$t("common.pause") : P.$t("common.resume"),
                                    location: "bottom"
                                }, {
                                    activator: v(({ props: O })=>[
                                            y(ot, ke(O, {
                                                icon: R(c) ? "mdi-timer-pause" : "mdi-timer-play",
                                                color: "primary",
                                                onClick: z[2] || (z[2] = (I)=>R(c) ? A() : B())
                                            }), null, 16, [
                                                "icon"
                                            ])
                                        ]),
                                    _: 1
                                }, 8, [
                                    "text"
                                ])
                            ]),
                            y(R(Ho), {
                                ref_key: "scrollView",
                                ref: d,
                                items: R(o),
                                height: g.value,
                                "item-height": "68",
                                class: "pa-2"
                            }, {
                                default: v(({ item: O })=>[
                                        y(Pa, {
                                            node: O,
                                            onTouchcancel: C,
                                            onTouchend: C,
                                            onTouchmove: C,
                                            onTouchstart: (I)=>b(I.touches.item(0), O),
                                            onOnRightClick: z[3] || (z[3] = (I, G)=>_(I, G))
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
    Ra = {};
    Ea = {
        class: "pl-4"
    };
    Da = {
        class: "pr-4"
    };
    function Ba(r, t) {
        return N(), K(it, {
            cols: "12",
            sm: "6",
            lg: "3"
        }, {
            default: v(()=>[
                    y(Yo, {
                        rounded: "xl",
                        class: "d-flex align-center py-2 border"
                    }, {
                        default: v(()=>[
                                Y("div", Ea, [
                                    Or(r.$slots, "title")
                                ]),
                                y(Me),
                                Y("div", Da, [
                                    Or(r.$slots, "text")
                                ])
                            ]),
                        _: 3
                    })
                ]),
            _: 3
        });
    }
    const Nt = Ts(Ra, [
        [
            "render",
            Ba
        ]
    ]), Fa = wt({
        __name: "PanelBoolean",
        props: {
            torrent: {}
        },
        setup (r) {
            const t = r, e = ks(), { properties: s } = xt(se()), i = Z({
                get: ()=>t.torrent.auto_tmm,
                set: (u)=>e.toggleAutoTmm([
                        t.torrent.hash
                    ], u)
            }), n = Z({
                get: ()=>t.torrent.f_l_piece_prio,
                set: ()=>e.toggleFLPiecePrio([
                        t.torrent.hash
                    ])
            }), o = Z({
                get: ()=>t.torrent.forced,
                set: (u)=>{
                    u ? e.forceStartTorrents([
                        t.torrent.hash
                    ]) : e.resumeTorrents([
                        t.torrent.hash
                    ]);
                }
            }), a = Z({
                get: ()=>t.torrent.seq_dl,
                set: ()=>e.toggleSeqDl([
                        t.torrent.hash
                    ])
            }), l = Z({
                get: ()=>t.torrent.super_seeding,
                set: (u)=>e.setSuperSeeding([
                        t.torrent.hash
                    ], u)
            });
            return (u, h)=>(N(), K(me, {
                    title: u.$t("torrentDetail.info.boolean_values")
                }, {
                    default: v(()=>[
                            y(ge, null, {
                                default: v(()=>[
                                        y(pt, null, {
                                            default: v(()=>[
                                                    y(Nt, null, {
                                                        title: v(()=>[
                                                                y(xe, {
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
                                                    y(Nt, null, {
                                                        title: v(()=>[
                                                                y(xe, {
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
                                                    y(Nt, null, {
                                                        title: v(()=>[
                                                                y(xe, {
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
                                                    y(Nt, null, {
                                                        title: v(()=>[
                                                                y(xe, {
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
                                                    y(Nt, null, {
                                                        title: v(()=>[
                                                                y(xe, {
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
                                                    y(Nt, null, {
                                                        title: v(()=>[
                                                                y(xe, {
                                                                    disabled: "",
                                                                    "model-value": R(s)?.is_private,
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
    }), Ga = wt({
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
            return (n, o)=>(N(), K(me, {
                    title: n.$t("torrentDetail.info.data_values")
                }, {
                    default: v(()=>[
                            y(ge, null, {
                                default: v(()=>[
                                        y(pt, null, {
                                            default: v(()=>[
                                                    (N(), q(kt, null, Gt(i, (a)=>y(Nt, null, {
                                                            title: v(()=>[
                                                                    X(V(n.$t(`torrent.properties.${a.title}`)), 1)
                                                                ]),
                                                            text: v(()=>[
                                                                    X(V(R(Ot)(a.getter(), R(s))), 1)
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
    }), Va = wt({
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
            return (n, o)=>(N(), K(me, {
                    title: n.$t("torrentDetail.info.datetime_values")
                }, {
                    default: v(()=>[
                            y(ge, null, {
                                default: v(()=>[
                                        y(pt, null, {
                                            default: v(()=>[
                                                    (N(), q(kt, null, Gt(i, (a)=>y(Nt, null, sn({
                                                            title: v(()=>[
                                                                    X(V(n.$t(`torrent.properties.${a.title}`)), 1)
                                                                ]),
                                                            _: 2
                                                        }, [
                                                            a.getter() > 0 ? {
                                                                name: "text",
                                                                fn: v(()=>[
                                                                        X(V(R(Wo)(a.getter(), R(s))), 1)
                                                                    ]),
                                                                key: "0"
                                                            } : {
                                                                name: "text",
                                                                fn: v(()=>[
                                                                        X(V(n.$t("common.NA")), 1)
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
    }), $a = wt({
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
            return (n, o)=>(N(), K(me, {
                    title: n.$t("torrentDetail.info.duration_values")
                }, {
                    default: v(()=>[
                            y(ge, null, {
                                default: v(()=>[
                                        y(pt, null, {
                                            default: v(()=>[
                                                    (N(), q(kt, null, Gt(i, (a)=>y(Nt, null, sn({
                                                            title: v(()=>[
                                                                    X(V(n.$t(`torrent.properties.${a.title}`)), 1)
                                                                ]),
                                                            _: 2
                                                        }, [
                                                            a.getter() > 0 ? {
                                                                name: "text",
                                                                fn: v(()=>[
                                                                        X(V(R(Xo)(a.getter(), a.unit, R(s))), 1)
                                                                    ]),
                                                                key: "0"
                                                            } : {
                                                                name: "text",
                                                                fn: v(()=>[
                                                                        X(V(n.$t("common.NA")), 1)
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
    }), Na = {
        key: 0,
        class: "d-flex flex-gap-row-small flex-gap-column"
    }, Oa = wt({
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
            return (i, n)=>(N(), K(me, {
                    title: i.$t("torrentDetail.info.long_text_values")
                }, {
                    default: v(()=>[
                            y(ge, null, {
                                default: v(()=>[
                                        y(ys, null, {
                                            default: v(()=>[
                                                    (N(), q(kt, null, Gt(s, (o)=>y(qe, {
                                                            title: i.$t(`torrent.properties.${o.title}`)
                                                        }, {
                                                            default: v(()=>[
                                                                    y(Hr, null, {
                                                                        default: v(()=>[
                                                                                X(V(o.getter() || i.$t("common.none")), 1)
                                                                            ]),
                                                                        _: 2
                                                                    }, 1024)
                                                                ]),
                                                            _: 2
                                                        }, 1032, [
                                                            "title"
                                                        ])), 64)),
                                                    y(qe, {
                                                        title: i.$t("torrent.properties.tags")
                                                    }, {
                                                        default: v(()=>[
                                                                i.torrent.tags?.length ? (N(), q("div", Na, [
                                                                    (N(!0), q(kt, null, Gt(i.torrent.tags, (o)=>(N(), K(we, {
                                                                            defaultColor: "tag",
                                                                            value: o
                                                                        }, null, 8, [
                                                                            "value"
                                                                        ]))), 256))
                                                                ])) : (N(), K(Hr, {
                                                                    key: 1
                                                                }, {
                                                                    default: v(()=>[
                                                                            X(V(i.$t("torrent.properties.empty_tags")), 1)
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
    }), za = wt({
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
            return (n, o)=>(N(), K(me, {
                    title: n.$t("torrentDetail.info.speed_values")
                }, {
                    default: v(()=>[
                            y(ge, null, {
                                default: v(()=>[
                                        y(pt, null, {
                                            default: v(()=>[
                                                    (N(), q(kt, null, Gt(i, (a)=>y(Nt, null, {
                                                            title: v(()=>[
                                                                    X(V(n.$t(`torrent.properties.${a.title}`)), 1)
                                                                ]),
                                                            text: v(()=>[
                                                                    X(V(R(fe)(a.getter(), R(s))), 1)
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
                    getter: ()=>t.torrent.ratio
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
                    getter: ()=>t.torrent.eta
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
            return (o, a)=>(N(), K(me, {
                    title: o.$t("torrentDetail.info.text_values")
                }, {
                    default: v(()=>[
                            y(ge, null, {
                                default: v(()=>[
                                        y(pt, null, {
                                            default: v(()=>[
                                                    (N(), q(kt, null, Gt(n, (l)=>y(Nt, null, {
                                                            title: v(()=>[
                                                                    X(V(o.$t(`torrent.properties.${l.title}`)), 1)
                                                                ]),
                                                            text: v(()=>[
                                                                    X(V(l.getter()), 1)
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
    }), Ua = wt({
        __name: "Info",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            return (t, e)=>(N(), K(ys, null, {
                    default: v(()=>[
                            y(qe, null, {
                                default: v(()=>[
                                        y(jo, null, {
                                            default: v(()=>[
                                                    y(Va, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y($a, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(Fa, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(Ga, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(za, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(La, {
                                                        torrent: t.torrent
                                                    }, null, 8, [
                                                        "torrent"
                                                    ]),
                                                    y(Oa, {
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
    }), Ha = class lr {
        constructor(t, e){
            this.low = t, this.high = e;
        }
        clone() {
            return new lr(this.low, this.high);
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
            return new lr(this.low === void 0 ? t.low : this.low < t.low ? this.low : t.low, this.high === void 0 ? t.high : this.high > t.high ? this.high : t.high);
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
                ]), this.item.key = new Ha(a, l);
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
    class Tr {
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
            const e = new Tr;
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
    let hr, es, Ya, Wa;
    hr = (r)=>{
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
    es = (r, t)=>hr(r).priority ?? t;
    Vt = {
        _addHandlers: {},
        _removeHandlers: {},
        _queue: {},
        remove (...r) {
            return r.map(hr).forEach((t)=>{
                t.type.forEach((e)=>this._removeHandlers[e]?.(t));
            }), this;
        },
        add (...r) {
            return r.map(hr).forEach((t)=>{
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
                }), t.sort((n, o)=>es(o.value, e) - es(n.value, e)));
            }, (s)=>{
                const i = t.findIndex((n)=>n.name === s.name);
                i !== -1 && t.splice(i, 1);
            });
        },
        handleByList (r, t, e = -1) {
            return this.handle(r, (s)=>{
                t.includes(s.ref) || (t.push(s.ref), t.sort((i, n)=>es(n, e) - es(i, e)));
            }, (s)=>{
                const i = t.indexOf(s.ref);
                i !== -1 && t.splice(i, 1);
            });
        },
        mixin (r, ...t) {
            for (const e of t)Object.defineProperties(r.prototype, Object.getOwnPropertyDescriptors(e));
        }
    };
    Ya = {
        extension: {
            type: ht.Environment,
            name: "browser",
            priority: -1
        },
        test: ()=>!0,
        load: async ()=>{
            await Pe(()=>import("./browserAll-Df76XZ95.js"), __vite__mapDeps([8,9,10,11,1,2,3,4,5]), import.meta.url);
        }
    };
    Wa = {
        extension: {
            type: ht.Environment,
            name: "webworker",
            priority: 0
        },
        test: ()=>typeof self < "u" && self.WorkerGlobalScope !== void 0,
        load: async ()=>{
            await Pe(()=>import("./webworkerAll-Brhu0MAK.js"), __vite__mapDeps([9,10,11,1,2,3,4,5]), import.meta.url);
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
    }, qr;
    function Xa() {
        return qr || (qr = 1, function(r) {
            var t = Object.prototype.hasOwnProperty, e = "~";
            function s() {}
            Object.create && (s.prototype = Object.create(null), new s().__proto__ || (e = !1));
            function i(l, u, h) {
                this.fn = l, this.context = u, this.once = h || !1;
            }
            function n(l, u, h, c, m) {
                if (typeof h != "function") throw new TypeError("The listener must be a function");
                var d = new i(h, c || l, m), g = e ? e + u : u;
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
                for(var m = 0, d = c.length, g = new Array(d); m < d; m++)g[m] = c[m].fn;
                return g;
            }, a.prototype.listenerCount = function(u) {
                var h = e ? e + u : u, c = this._events[h];
                return c ? c.fn ? 1 : c.length : 0;
            }, a.prototype.emit = function(u, h, c, m, d, g) {
                var _ = e ? e + u : u;
                if (!this._events[_]) return !1;
                var p = this._events[_], b = arguments.length, C, A;
                if (p.fn) {
                    switch(p.once && this.removeListener(u, p.fn, void 0, !0), b){
                        case 1:
                            return p.fn.call(p.context), !0;
                        case 2:
                            return p.fn.call(p.context, h), !0;
                        case 3:
                            return p.fn.call(p.context, h, c), !0;
                        case 4:
                            return p.fn.call(p.context, h, c, m), !0;
                        case 5:
                            return p.fn.call(p.context, h, c, m, d), !0;
                        case 6:
                            return p.fn.call(p.context, h, c, m, d, g), !0;
                    }
                    for(A = 1, C = new Array(b - 1); A < b; A++)C[A - 1] = arguments[A];
                    p.fn.apply(p.context, C);
                } else {
                    var B = p.length, $;
                    for(A = 0; A < B; A++)switch(p[A].once && this.removeListener(u, p[A].fn, void 0, !0), b){
                        case 1:
                            p[A].fn.call(p[A].context);
                            break;
                        case 2:
                            p[A].fn.call(p[A].context, h);
                            break;
                        case 3:
                            p[A].fn.call(p[A].context, h, c);
                            break;
                        case 4:
                            p[A].fn.call(p[A].context, h, c, m);
                            break;
                        default:
                            if (!C) for($ = 1, C = new Array(b - 1); $ < b; $++)C[$ - 1] = arguments[$];
                            p[A].fn.apply(p[A].context, C);
                    }
                }
                return !0;
            }, a.prototype.on = function(u, h, c) {
                return n(this, u, h, c, !1);
            }, a.prototype.once = function(u, h, c) {
                return n(this, u, h, c, !0);
            }, a.prototype.removeListener = function(u, h, c, m) {
                var d = e ? e + u : u;
                if (!this._events[d]) return this;
                if (!h) return o(this, d), this;
                var g = this._events[d];
                if (g.fn) g.fn === h && (!m || g.once) && (!c || g.context === c) && o(this, d);
                else {
                    for(var _ = 0, p = [], b = g.length; _ < b; _++)(g[_].fn !== h || m && !g[_].once || c && g[_].context !== c) && p.push(g[_]);
                    p.length ? this._events[d] = p.length === 1 ? p[0] : p : o(this, d);
                }
                return this;
            }, a.prototype.removeAllListeners = function(u) {
                var h;
                return u ? (h = e ? e + u : u, this._events[h] && o(this, h)) : (this._events = new s, this._eventsCount = 0), this;
            }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = e, a.EventEmitter = a, r.exports = a;
        }(Bs)), Bs.exports;
    }
    var ja = Xa();
    let qa, Ka, Za;
    re = Ar(ja);
    qa = Math.PI * 2;
    Ka = 180 / Math.PI;
    Za = Math.PI / 180;
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
    tt = class {
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
            const s = t.a, i = t.b, n = t.c, o = t.d, a = t.tx, l = t.ty, u = e.a, h = e.b, c = e.c, m = e.d;
            return this.a = s * u + i * c, this.b = s * h + i * m, this.c = n * u + o * c, this.d = n * h + o * m, this.tx = a * u + l * c + e.tx, this.ty = a * h + l * m + e.ty, this;
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
            return u < 1e-5 || Math.abs(qa - u) < 1e-5 ? (t.rotation = l, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = a, t.skew.y = l), t.scale.x = Math.sqrt(e * e + s * s), t.scale.y = Math.sqrt(i * i + n * n), t.position.x = this.tx + (o.x * e + o.y * i), t.position.y = this.ty + (o.x * s + o.y * n), t;
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
            const t = new tt;
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
            return Ja.identity();
        }
        static get shared() {
            return Qa.identity();
        }
    };
    const Qa = new tt, Ja = new tt, he = [
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
    ], ur = [], mn = [], ss = Math.sign;
    function tl() {
        for(let r = 0; r < 16; r++){
            const t = [];
            ur.push(t);
            for(let e = 0; e < 16; e++){
                const s = ss(he[r] * he[e] + ce[r] * ue[e]), i = ss(ue[r] * he[e] + de[r] * ue[e]), n = ss(he[r] * ce[e] + ce[r] * de[e]), o = ss(ue[r] * ce[e] + de[r] * de[e]);
                for(let a = 0; a < 16; a++)if (he[a] === s && ue[a] === i && ce[a] === n && de[a] === o) {
                    t.push(a);
                    break;
                }
            }
        }
        for(let r = 0; r < 16; r++){
            const t = new tt;
            t.set(he[r], ue[r], ce[r], de[r], 0, 0), mn.push(t);
        }
    }
    tl();
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
        add: (r, t)=>ur[r][t],
        sub: (r, t)=>ur[r][dt.inv(t)],
        rotate180: (r)=>r ^ 4,
        isVertical: (r)=>(r & 3) === 2,
        byDirection: (r, t)=>Math.abs(r) * 2 <= Math.abs(t) ? t >= 0 ? dt.S : dt.N : Math.abs(t) * 2 <= Math.abs(r) ? r > 0 ? dt.E : dt.W : t > 0 ? r > 0 ? dt.SE : dt.SW : r > 0 ? dt.NE : dt.NW,
        matrixAppendRotationInv: (r, t, e = 0, s = 0)=>{
            const i = mn[dt.inv(t)];
            i.tx = e, i.ty = s, r.append(i);
        }
    }, rs = [
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
            const a = this.x, l = this.y, u = s * (1 - i), h = s - u, c = a - u, m = a + n + u, d = l - u, g = l + o + u, _ = a + h, p = a + n - h, b = l + h, C = l + o - h;
            return t >= c && t <= m && e >= d && e <= g && !(t > _ && t < p && e > b && e < C);
        }
        intersects(t, e) {
            if (!e) {
                const z = this.x < t.x ? t.x : this.x;
                if ((this.right > t.right ? t.right : this.right) <= z) return !1;
                const I = this.y < t.y ? t.y : this.y;
                return (this.bottom > t.bottom ? t.bottom : this.bottom) > I;
            }
            const s = this.left, i = this.right, n = this.top, o = this.bottom;
            if (i <= s || o <= n) return !1;
            const a = rs[0].set(t.left, t.top), l = rs[1].set(t.left, t.bottom), u = rs[2].set(t.right, t.top), h = rs[3].set(t.right, t.bottom);
            if (u.x <= a.x || l.y <= a.y) return !1;
            const c = Math.sign(e.a * e.d - e.b * e.c);
            if (c === 0 || (e.apply(a, a), e.apply(l, l), e.apply(u, u), e.apply(h, h), Math.max(a.x, l.x, u.x, h.x) <= s || Math.min(a.x, l.x, u.x, h.x) >= i || Math.max(a.y, l.y, u.y, h.y) <= n || Math.min(a.y, l.y, u.y, h.y) >= o)) return !1;
            const m = c * (l.y - a.y), d = c * (a.x - l.x), g = m * s + d * n, _ = m * i + d * n, p = m * s + d * o, b = m * i + d * o;
            if (Math.max(g, _, p, b) <= m * a.x + d * a.y || Math.min(g, _, p, b) >= m * h.x + d * h.y) return !1;
            const C = c * (a.y - u.y), A = c * (u.x - a.x), B = C * s + A * n, $ = C * i + A * n, D = C * s + A * o, P = C * i + A * o;
            return !(Math.max(B, $, D, P) <= C * a.x + A * a.y || Math.min(B, $, D, P) >= C * h.x + A * h.y);
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
    let Kr, el;
    Kr = {};
    yt = "8.0.0";
    el = "8.3.4";
    ct = function(r, t, e = 3) {
        if (Kr[t]) return;
        let s = new Error().stack;
        typeof s > "u" ? console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${r}`) : (s = s.split(`
`).splice(e).join(`
`), console.groupCollapsed ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", `${t}
Deprecated since v${r}`), console.warn(s), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${r}`), console.warn(s))), Kr[t] = !0;
    };
    const gn = ()=>{};
    Zr = function(r) {
        return r += r === 0 ? 1 : 0, --r, r |= r >>> 1, r |= r >>> 2, r |= r >>> 4, r |= r >>> 8, r |= r >>> 16, r + 1;
    };
    function Qr(r) {
        return !(r & r - 1) && !!r;
    }
    function _n(r) {
        const t = {};
        for(const e in r)r[e] !== void 0 && (t[e] = r[e]);
        return t;
    }
    const Jr = Object.create(null);
    function sl(r) {
        const t = Jr[r];
        return t === void 0 && (Jr[r] = _t("resource")), t;
    }
    const yn = class xn extends re {
        constructor(t = {}){
            super(), this._resourceType = "textureSampler", this._touched = 0, this._maxAnisotropy = 1, this.destroyed = !1, t = {
                ...xn.defaultOptions,
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
            return this._sharedResourceId = sl(t), this._resourceId;
        }
        destroy() {
            this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this.removeAllListeners();
        }
    };
    yn.defaultOptions = {
        addressMode: "clamp-to-edge",
        scaleMode: "linear"
    };
    rl = yn;
    const bn = class vn extends re {
        constructor(t = {}){
            super(), this.options = t, this.uid = _t("textureSource"), this._resourceType = "textureSource", this._resourceId = _t("resource"), this.uploadMethodId = "unknown", this._resolution = 1, this.pixelWidth = 1, this.pixelHeight = 1, this.width = 1, this.height = 1, this.sampleCount = 1, this.mipLevelCount = 1, this.autoGenerateMipmaps = !1, this.format = "rgba8unorm", this.dimension = "2d", this.antialias = !1, this._touched = 0, this._batchTick = -1, this._textureBindLocation = -1, t = {
                ...vn.defaultOptions,
                ...t
            }, this.label = t.label ?? "", this.resource = t.resource, this.autoGarbageCollect = t.autoGarbageCollect, this._resolution = t.resolution, t.width ? this.pixelWidth = t.width * this._resolution : this.pixelWidth = this.resource ? this.resourceWidth ?? 1 : 1, t.height ? this.pixelHeight = t.height * this._resolution : this.pixelHeight = this.resource ? this.resourceHeight ?? 1 : 1, this.width = this.pixelWidth / this._resolution, this.height = this.pixelHeight / this._resolution, this.format = t.format, this.dimension = t.dimensions, this.mipLevelCount = t.mipLevelCount, this.autoGenerateMipmaps = t.autoGenerateMipmaps, this.sampleCount = t.sampleCount, this.antialias = t.antialias, this.alphaMode = t.alphaMode, this.style = new rl(_n(t)), this.destroyed = !1, this._refreshPOT();
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
            this.isPowerOfTwo = Qr(this.pixelWidth) && Qr(this.pixelHeight);
        }
        static test(t) {
            throw new Error("Unimplemented");
        }
    };
    bn.defaultOptions = {
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
    qt = bn;
    class kr extends qt {
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
    kr.extension = ht.TextureSource;
    const ti = new tt;
    il = class {
        constructor(t, e){
            this.mapCoord = new tt, this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, typeof e > "u" ? this.clampMargin = t.width < 10 ? 0 : .5 : this.clampMargin = e, this.isSimple = !1, this.texture = t;
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
            i && (ti.set(s.width / i.width, 0, 0, s.height / i.height, -i.x / i.width, -i.y / i.height), this.mapCoord.append(ti));
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
            return this._textureMatrix || (this._textureMatrix = new il(this)), this._textureMatrix;
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
                const h = a / 2, c = l / 2, m = n + h, d = o + c;
                u = dt.add(u, dt.NW), t.x0 = m + h * dt.uX(u), t.y0 = d + c * dt.uY(u), u = dt.add(u, 2), t.x1 = m + h * dt.uX(u), t.y1 = d + c * dt.uY(u), u = dt.add(u, 2), t.x2 = m + h * dt.uX(u), t.y2 = d + c * dt.uY(u), u = dt.add(u, 2), t.x3 = m + h * dt.uX(u), t.y3 = d + c * dt.uY(u);
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
    ut.EMPTY.destroy = gn;
    ut.WHITE = new ut({
        source: new kr({
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
    ut.WHITE.destroy = gn;
    nl = function(r, t, e) {
        const { width: s, height: i } = e.orig, n = e.trim;
        if (n) {
            const o = n.width, a = n.height;
            r.minX = n.x - t._x * s, r.maxX = r.minX + o, r.minY = n.y - t._y * i, r.maxY = r.minY + a;
        } else r.minX = -t._x * s, r.maxX = r.minX + s, r.minY = -t._y * i, r.maxY = r.minY + i;
    };
    const ei = new tt;
    zt = class {
        constructor(t = 1 / 0, e = 1 / 0, s = -1 / 0, i = -1 / 0){
            this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = ei, this.minX = t, this.minY = e, this.maxX = s, this.maxY = i;
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
            return this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = ei, this;
        }
        set(t, e, s, i) {
            this.minX = t, this.minY = e, this.maxX = s, this.maxY = i;
        }
        addFrame(t, e, s, i, n) {
            n || (n = this.matrix);
            const o = n.a, a = n.b, l = n.c, u = n.d, h = n.tx, c = n.ty;
            let m = this.minX, d = this.minY, g = this.maxX, _ = this.maxY, p = o * t + l * e + h, b = a * t + u * e + c;
            p < m && (m = p), b < d && (d = b), p > g && (g = p), b > _ && (_ = b), p = o * s + l * e + h, b = a * s + u * e + c, p < m && (m = p), b < d && (d = b), p > g && (g = p), b > _ && (_ = b), p = o * t + l * i + h, b = a * t + u * i + c, p < m && (m = p), b < d && (d = b), p > g && (g = p), b > _ && (_ = b), p = o * s + l * i + h, b = a * s + u * i + c, p < m && (m = p), b < d && (d = b), p > g && (g = p), b > _ && (_ = b), this.minX = m, this.minY = d, this.maxX = g, this.maxY = _;
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
            let m = o * e + l * s + h, d = a * e + u * s + c;
            this.minX = m, this.minY = d, this.maxX = m, this.maxY = d, m = o * i + l * s + h, d = a * i + u * s + c, this.minX = m < this.minX ? m : this.minX, this.minY = d < this.minY ? d : this.minY, this.maxX = m > this.maxX ? m : this.maxX, this.maxY = d > this.maxY ? d : this.maxY, m = o * e + l * n + h, d = a * e + u * n + c, this.minX = m < this.minX ? m : this.minX, this.minY = d < this.minY ? d : this.minY, this.maxX = m > this.maxX ? m : this.maxX, this.maxY = d > this.maxY ? d : this.maxY, m = o * i + l * n + h, d = a * i + u * n + c, this.minX = m < this.minX ? m : this.minX, this.minY = d < this.minY ? d : this.minY, this.maxX = m > this.maxX ? m : this.maxX, this.maxY = d > this.maxY ? d : this.maxY;
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
            const u = i.a, h = i.b, c = i.c, m = i.d, d = i.tx, g = i.ty;
            for(let _ = e; _ < s; _ += 2){
                const p = t[_], b = t[_ + 1], C = u * p + c * b + d, A = h * p + m * b + g;
                n = C < n ? C : n, o = A < o ? A : o, a = C > a ? C : a, l = A > l ? A : l;
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
    var ol = {
        grad: .9,
        turn: 360,
        rad: 360 / (2 * Math.PI)
    }, Zt = function(r) {
        return typeof r == "string" ? r.length > 0 : typeof r == "number";
    }, bt = function(r, t, e) {
        return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * r) / e + 0;
    }, Bt = function(r, t, e) {
        return t === void 0 && (t = 0), e === void 0 && (e = 1), r > e ? e : r > t ? r : t;
    }, wn = function(r) {
        return (r = isFinite(r) ? r % 360 : 0) > 0 ? r : r + 360;
    }, si = function(r) {
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
    }, al = /^#([0-9a-f]{3,8})$/i, is = function(r) {
        var t = r.toString(16);
        return t.length < 2 ? "0" + t : t;
    }, Cn = function(r) {
        var t = r.r, e = r.g, s = r.b, i = r.a, n = Math.max(t, e, s), o = n - Math.min(t, e, s), a = o ? n === t ? (e - s) / o : n === e ? 2 + (s - t) / o : 4 + (t - e) / o : 0;
        return {
            h: 60 * (a < 0 ? a + 6 : a),
            s: n ? o / n * 100 : 0,
            v: n / 255 * 100,
            a: i
        };
    }, Sn = function(r) {
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
    }, ri = function(r) {
        return {
            h: wn(r.h),
            s: Bt(r.s, 0, 100),
            l: Bt(r.l, 0, 100),
            a: Bt(r.a)
        };
    }, ii = function(r) {
        return {
            h: bt(r.h),
            s: bt(r.s),
            l: bt(r.l),
            a: bt(r.a, 3)
        };
    }, ni = function(r) {
        return Sn((e = (t = r).s, {
            h: t.h,
            s: (e *= ((s = t.l) < 50 ? s : 100 - s) / 100) > 0 ? 2 * e / (s + e) * 100 : 0,
            v: s + e,
            a: t.a
        }));
        var t, e, s;
    }, ze = function(r) {
        return {
            h: (t = Cn(r)).h,
            s: (i = (200 - (e = t.s)) * (s = t.v) / 100) > 0 && i < 200 ? e * s / 100 / (i <= 100 ? i : 200 - i) * 100 : 0,
            l: i / 2,
            a: t.a
        };
        var t, e, s, i;
    }, ll = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, hl = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ul = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, cl = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, cr = {
        string: [
            [
                function(r) {
                    var t = al.exec(r);
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
                    var t = ul.exec(r) || cl.exec(r);
                    return t ? t[2] !== t[4] || t[4] !== t[6] ? null : si({
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
                    var t = ll.exec(r) || hl.exec(r);
                    if (!t) return null;
                    var e, s, i = ri({
                        h: (e = t[1], s = t[2], s === void 0 && (s = "deg"), Number(e) * (ol[s] || 1)),
                        s: Number(t[3]),
                        l: Number(t[4]),
                        a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1)
                    });
                    return ni(i);
                },
                "hsl"
            ]
        ],
        object: [
            [
                function(r) {
                    var t = r.r, e = r.g, s = r.b, i = r.a, n = i === void 0 ? 1 : i;
                    return Zt(t) && Zt(e) && Zt(s) ? si({
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
                    var o = ri({
                        h: Number(t),
                        s: Number(e),
                        l: Number(s),
                        a: Number(n)
                    });
                    return ni(o);
                },
                "hsl"
            ],
            [
                function(r) {
                    var t = r.h, e = r.s, s = r.v, i = r.a, n = i === void 0 ? 1 : i;
                    if (!Zt(t) || !Zt(e) || !Zt(s)) return null;
                    var o = function(a) {
                        return {
                            h: wn(a.h),
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
                    return Sn(o);
                },
                "hsv"
            ]
        ]
    }, oi = function(r, t) {
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
    }, dl = function(r) {
        return typeof r == "string" ? oi(r.trim(), cr.string) : typeof r == "object" && r !== null ? oi(r, cr.object) : [
            null,
            void 0
        ];
    }, $s = function(r, t) {
        var e = ze(r);
        return {
            h: e.h,
            s: Bt(e.s + 100 * t, 0, 100),
            l: e.l,
            a: e.a
        };
    }, Ns = function(r) {
        return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255;
    }, ai = function(r, t) {
        var e = ze(r);
        return {
            h: e.h,
            s: e.s,
            l: Bt(e.l + 100 * t, 0, 100),
            a: e.a
        };
    }, dr = function() {
        function r(t) {
            this.parsed = dl(t)[0], this.rgba = this.parsed || {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            };
        }
        return r.prototype.isValid = function() {
            return this.parsed !== null;
        }, r.prototype.brightness = function() {
            return bt(Ns(this.rgba), 2);
        }, r.prototype.isDark = function() {
            return Ns(this.rgba) < .5;
        }, r.prototype.isLight = function() {
            return Ns(this.rgba) >= .5;
        }, r.prototype.toHex = function() {
            return t = Vs(this.rgba), e = t.r, s = t.g, i = t.b, o = (n = t.a) < 1 ? is(bt(255 * n)) : "", "#" + is(e) + is(s) + is(i) + o;
            var t, e, s, i, n, o;
        }, r.prototype.toRgb = function() {
            return Vs(this.rgba);
        }, r.prototype.toRgbString = function() {
            return t = Vs(this.rgba), e = t.r, s = t.g, i = t.b, (n = t.a) < 1 ? "rgba(" + e + ", " + s + ", " + i + ", " + n + ")" : "rgb(" + e + ", " + s + ", " + i + ")";
            var t, e, s, i, n;
        }, r.prototype.toHsl = function() {
            return ii(ze(this.rgba));
        }, r.prototype.toHslString = function() {
            return t = ii(ze(this.rgba)), e = t.h, s = t.s, i = t.l, (n = t.a) < 1 ? "hsla(" + e + ", " + s + "%, " + i + "%, " + n + ")" : "hsl(" + e + ", " + s + "%, " + i + "%)";
            var t, e, s, i, n;
        }, r.prototype.toHsv = function() {
            return t = Cn(this.rgba), {
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
            return t === void 0 && (t = .1), Ht($s(this.rgba, t));
        }, r.prototype.desaturate = function(t) {
            return t === void 0 && (t = .1), Ht($s(this.rgba, -t));
        }, r.prototype.grayscale = function() {
            return Ht($s(this.rgba, -1));
        }, r.prototype.lighten = function(t) {
            return t === void 0 && (t = .1), Ht(ai(this.rgba, t));
        }, r.prototype.darken = function(t) {
            return t === void 0 && (t = .1), Ht(ai(this.rgba, -t));
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
            var e = ze(this.rgba);
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
        return r instanceof dr ? r : new dr(r);
    }, li = [], fl = function(r) {
        r.forEach(function(t) {
            li.indexOf(t) < 0 && (t(dr, cr), li.push(t));
        });
    };
    function pl(r, t) {
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
                var h = this.toRgb(), c = 1 / 0, m = "black";
                if (!n.length) for(var d in e)n[d] = new r(e[d]).toRgb();
                for(var g in e){
                    var _ = (a = h, l = n[g], Math.pow(a.r - l.r, 2) + Math.pow(a.g - l.g, 2) + Math.pow(a.b - l.b, 2));
                    _ < c && (c = _, m = g);
                }
                return m;
            }
        }, t.string.push([
            function(o) {
                var a = o.toLowerCase(), l = a === "transparent" ? "#0000" : e[a];
                return l ? new r(l).toRgb() : null;
            },
            "name"
        ]);
    }
    fl([
        pl
    ]);
    const Ie = class Ve {
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
            if (t instanceof Ve) this._value = this._cloneSource(t._value), this._int = t._int, this._components.set(t._components);
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
            const [e, s, i, n] = Ve._temp.setValue(t)._components;
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
                    const a = Ve.HEX_PATTERN.exec(t);
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
            return typeof t == "number" || typeof t == "string" || t instanceof Number || t instanceof Ve || Array.isArray(t) || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Float32Array || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 && t.a !== void 0;
        }
    };
    Ie.shared = new Ie;
    Ie._temp = new Ie;
    Ie.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
    Ft = Ie;
    const ml = {
        cullArea: null,
        cullable: !1,
        cullableChildren: !0
    };
    class Pr {
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
    class gl {
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
            return this._poolsByClass.has(t) || this._poolsByClass.set(t, new Pr(t)), this._poolsByClass.get(t);
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
    let _l;
    Jt = new gl;
    _l = {
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
    yl = function(r, t, e) {
        const s = r.length;
        let i;
        if (t >= s || e === 0) return;
        e = t + e > s ? s - t : e;
        const n = s - e;
        for(i = t; i < n; ++i)r[i] = r[i + e];
        r.length = n;
    };
    const xl = {
        allowChildren: !0,
        removeChildren (r = 0, t) {
            const e = t ?? this.children.length, s = e - r, i = [];
            if (s > 0 && s <= e) {
                for(let o = e - 1; o >= r; o--){
                    const a = this.children[o];
                    a && (i.push(a), a.parent = null);
                }
                yl(this.children, r, e);
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
    }, bl = {
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
    hi = class {
        constructor(){
            this.pipe = "filter", this.priority = 1;
        }
        destroy() {
            for(let t = 0; t < this.filters.length; t++)this.filters[t].destroy();
            this.filters = null, this.filterArea = null;
        }
    };
    class vl {
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
    const fr = new vl;
    Vt.handleByList(ht.MaskEffect, fr._effectClasses);
    const wl = {
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
            t?.mask !== r && (t && (this.removeEffect(t), fr.returnMaskEffect(t), this._maskEffect = null), r != null && (this._maskEffect = fr.getMaskEffect(r), this.addEffect(this._maskEffect)));
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
            const t = this._filterEffect || (this._filterEffect = new hi);
            r = r;
            const e = r?.length > 0, s = t.filters?.length > 0, i = e !== s;
            r = Array.isArray(r) ? r.slice(0) : r, t.filters = Object.freeze(r), i && (e ? this.addEffect(t) : (this.removeEffect(t), t.filters = r ?? null));
        },
        get filters () {
            return this._filterEffect?.filters;
        },
        set filterArea (r){
            this._filterEffect || (this._filterEffect = new hi), this._filterEffect.filterArea = r;
        },
        get filterArea () {
            return this._filterEffect?.filterArea;
        }
    }, Cl = {
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
    }, Tt = new Pr(tt), te = new Pr(zt), Sl = new tt, Al = {
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
                n && (s.applyMatrix(o.worldTransform.copyTo(Sl).invert()), t.addBounds(s, this.relativeGroupTransform)), t.addBounds(s), te.return(s);
            } else this.renderGroup && (t.addBounds(s, this.relativeGroupTransform), te.return(s));
        }
    };
    An = function(r, t, e) {
        e.clear();
        let s, i;
        return r.parent ? t ? s = r.parent.worldTransform : (i = Tt.get().identity(), s = Mr(r, i)) : s = tt.IDENTITY, Tn(r, e, s, t), i && Tt.return(i), e.isValid || e.set(0, 0, 0, 0), e;
    };
    function Tn(r, t, e, s) {
        if (!r.visible || !r.measurable) return;
        let i;
        s ? i = r.worldTransform : (r.updateLocalTransform(), i = Tt.get(), i.appendFrom(r.localTransform, e));
        const n = t, o = !!r.effects.length;
        if (o && (t = te.get().clear()), r.boundsArea) t.addRect(r.boundsArea, i);
        else {
            r.bounds && (t.matrix = i, t.addBounds(r.bounds));
            for(let a = 0; a < r.children.length; a++)Tn(r.children[a], t, i, s);
        }
        if (o) {
            for(let a = 0; a < r.effects.length; a++)r.effects[a].addBounds?.(t);
            n.addBounds(t, tt.IDENTITY), te.return(t);
        }
        s || Tt.return(i);
    }
    function Mr(r, t) {
        const e = r.parent;
        return e && (Mr(e, t), e.updateLocalTransform(), t.append(e.localTransform)), t;
    }
    function kn(r, t) {
        if (r === 16777215 || !t) return t;
        if (t === 16777215 || !r) return r;
        const e = r >> 16 & 255, s = r >> 8 & 255, i = r & 255, n = t >> 16 & 255, o = t >> 8 & 255, a = t & 255, l = e * n / 255 | 0, u = s * o / 255 | 0, h = i * a / 255 | 0;
        return (l << 16) + (u << 8) + h;
    }
    const ui = 16777215;
    ci = function(r, t) {
        return r === ui ? t : t === ui ? r : kn(r, t);
    };
    function fs(r) {
        return ((r & 255) << 16) + (r & 65280) + (r >> 16 & 255);
    }
    const Tl = {
        getGlobalAlpha (r) {
            if (r) return this.renderGroup ? this.renderGroup.worldAlpha : this.parentRenderGroup ? this.parentRenderGroup.worldAlpha * this.alpha : this.alpha;
            let t = this.alpha, e = this.parent;
            for(; e;)t *= e.alpha, e = e.parent;
            return t;
        },
        getGlobalTransform (r, t) {
            if (t) return r.copyFrom(this.worldTransform);
            this.updateLocalTransform();
            const e = Mr(this, Tt.get().identity());
            return r.appendFrom(this.localTransform, e), Tt.return(e), r;
        },
        getGlobalTint (r) {
            if (r) return this.renderGroup ? fs(this.renderGroup.worldColor) : this.parentRenderGroup ? fs(ci(this.localColor, this.parentRenderGroup.worldColor)) : this.tint;
            let t = this.localColor, e = this.parent;
            for(; e;)t = ci(t, e.localColor), e = e.parent;
            return fs(t);
        }
    };
    let Os = 0;
    const di = 500;
    Dt = function(...r) {
        Os !== di && (Os++, Os === di ? console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS.") : console.warn("PixiJS Warning: ", ...r));
    };
    Pn = function(r, t, e) {
        return t.clear(), e || (e = tt.IDENTITY), Mn(r, t, e, r, !0), t.isValid || t.set(0, 0, 0, 0), t;
    };
    function Mn(r, t, e, s, i) {
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
            for(let u = 0; u < l.length; u++)Mn(l[u], t, n, s, !1);
        }
        if (a) {
            for(let l = 0; l < r.effects.length; l++)r.effects[l].addLocalBounds?.(t, s);
            o.addBounds(t, tt.IDENTITY), te.return(t);
        }
        Tt.return(n);
    }
    function In(r, t) {
        const e = r.children;
        for(let s = 0; s < e.length; s++){
            const i = e[s], n = i.uid, o = (i._didViewChangeTick & 65535) << 16 | i._didContainerChangeTick & 65535, a = t.index;
            (t.data[a] !== n || t.data[a + 1] !== o) && (t.data[t.index] = n, t.data[t.index + 1] = o, t.didChange = !0), t.index = a + 2, i.children.length && In(i, t);
        }
        return t.didChange;
    }
    const kl = new tt, Pl = {
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
            return r.index = 1, r.didChange = !1, r.data[0] !== this._didViewChangeTick && (r.didChange = !0, r.data[0] = this._didViewChangeTick), In(this, r), r.didChange && Pn(this, r.localBounds, kl), r.localBounds;
        },
        getBounds (r, t) {
            return An(this, r, t || new zt);
        }
    }, Ml = {
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
    }, Il = {
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
            this.sortDirty && (this.sortDirty = !1, this.children.sort(Rl));
        }
    };
    function Rl(r, t) {
        return r._zIndex - t._zIndex;
    }
    const El = {
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
    class Rn {
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
    let Dl = 0;
    class Bl {
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
                label: `texturePool_${Dl++}`
            });
        }
        getOptimalTexture(t, e, s = 1, i) {
            let n = Math.ceil(t * s - 1e-6), o = Math.ceil(e * s - 1e-6);
            n = Zr(n), o = Zr(o);
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
    Fl = new Bl;
    class Gl {
        constructor(){
            this.renderPipeId = "renderGroup", this.root = null, this.canBundle = !1, this.renderGroupParent = null, this.renderGroupChildren = [], this.worldTransform = new tt, this.worldColorAlpha = 4294967295, this.worldColor = 16777215, this.worldAlpha = 1, this.childrenToUpdate = Object.create(null), this.updateTick = 0, this.gcTick = 0, this.childrenRenderablesToUpdate = {
                list: [],
                index: 0
            }, this.structureDidChange = !0, this.instructionSet = new Rn, this._onRenderContainers = [], this.textureNeedsUpdate = !0, this.isCachedAsTexture = !1, this._matrixDirty = 7;
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
            this.isCachedAsTexture = !1, this.texture && (Fl.returnTexture(this.texture), this.texture = null);
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
            return (this._matrixDirty & 1) === 0 ? this._inverseWorldTransform : (this._matrixDirty &= -2, this._inverseWorldTransform || (this._inverseWorldTransform = new tt), this._inverseWorldTransform.copyFrom(this.worldTransform).invert());
        }
        get textureOffsetInverseTransform() {
            return (this._matrixDirty & 2) === 0 ? this._textureOffsetInverseTransform : (this._matrixDirty &= -3, this._textureOffsetInverseTransform || (this._textureOffsetInverseTransform = new tt), this._textureOffsetInverseTransform.copyFrom(this.inverseWorldTransform).translate(-this._textureBounds.x, -this._textureBounds.y));
        }
        get inverseParentTextureTransform() {
            if ((this._matrixDirty & 4) === 0) return this._inverseParentTextureTransform;
            this._matrixDirty &= -5;
            const t = this._parentCacheAsTextureRenderGroup;
            return t ? (this._inverseParentTextureTransform || (this._inverseParentTextureTransform = new tt), this._inverseParentTextureTransform.copyFrom(this.worldTransform).prepend(t.inverseWorldTransform).translate(-t._textureBounds.x, -t._textureBounds.y)) : this.worldTransform;
        }
        get cacheToLocalTransform() {
            return this._parentCacheAsTextureRenderGroup ? this._parentCacheAsTextureRenderGroup.textureOffsetInverseTransform : null;
        }
    }
    function Vl(r, t, e = {}) {
        for(const s in t)!e[s] && t[s] !== void 0 && (r[s] = t[s]);
    }
    let zs, Ls, Us;
    zs = new Rt(null);
    Ls = new Rt(null);
    Us = new Rt(null, 1, 1);
    fi = 1;
    $l = 2;
    Hs = 4;
    ye = class extends re {
        constructor(t = {}){
            super(), this.uid = _t("renderable"), this._updateFlags = 15, this.renderGroup = null, this.parentRenderGroup = null, this.parentRenderGroupIndex = 0, this.didChange = !1, this.didViewUpdate = !1, this.relativeRenderGroupDepth = 0, this.children = [], this.parent = null, this.includeInBuild = !0, this.measurable = !0, this.isSimple = !0, this.updateTick = -1, this.localTransform = new tt, this.relativeGroupTransform = new tt, this.groupTransform = this.relativeGroupTransform, this.destroyed = !1, this._position = new Rt(this, 0, 0), this._scale = Us, this._pivot = Ls, this._skew = zs, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._rotation = 0, this.localColor = 16777215, this.localAlpha = 1, this.groupAlpha = 1, this.groupColor = 16777215, this.groupColorAlpha = 4294967295, this.localBlendMode = "inherit", this.groupBlendMode = "normal", this.localDisplayStatus = 7, this.globalDisplayStatus = 7, this._didContainerChangeTick = 0, this._didViewChangeTick = 0, this._didLocalTransformChangeId = -1, this.effects = [], Vl(this, t, {
                children: !0,
                parent: !0,
                effects: !0
            }), t.children?.forEach((e)=>this.addChild(e)), t.parent?.addChild(this);
        }
        static mixin(t) {
            ct("8.8.0", "Container.mixin is deprecated, please use extensions.mixin instead."), Vt.mixin(ye, t);
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
            t?.removeChild(this), this.renderGroup = Jt.get(Gl, this), this.groupTransform = tt.IDENTITY, t?.addChild(this), this._updateIsSimple();
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
            return this._worldTransform || (this._worldTransform = new tt), this.renderGroup ? this._worldTransform.copyFrom(this.renderGroup.worldTransform) : this.parentRenderGroup && this._worldTransform.appendFrom(this.relativeGroupTransform, this.parentRenderGroup.worldTransform), this._worldTransform;
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
            return this.rotation * Ka;
        }
        set angle(t) {
            this.rotation = t * Za;
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
            t !== this.localAlpha && (this.localAlpha = t, this._updateFlags |= fi, this._onUpdate());
        }
        get alpha() {
            return this.localAlpha;
        }
        set tint(t) {
            const s = Ft.shared.setValue(t ?? 16777215).toBgrNumber();
            s !== this.localColor && (this.localColor = s, this._updateFlags |= fi, this._onUpdate());
        }
        get tint() {
            return fs(this.localColor);
        }
        set blendMode(t) {
            this.localBlendMode !== t && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0), this._updateFlags |= $l, this.localBlendMode = t, this._onUpdate());
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
    Vt.mixin(ye, xl, Al, El, Ml, Pl, wl, Cl, Il, ml, _l, Tl, bl);
    class En extends ye {
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
    Ke = class extends En {
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
            return nl(this._visualBounds, this._anchor, this._texture), this._visualBounds;
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
    const Nl = new zt;
    function Dn(r, t, e) {
        const s = Nl;
        r.measurable = !0, An(r, e, s), t.addBoundsMask(s), r.measurable = !1;
    }
    function Bn(r, t, e) {
        const s = te.get();
        r.measurable = !0;
        const i = Tt.get().identity(), n = Fn(r, e, i);
        Pn(r, s, n), r.measurable = !1, t.addBoundsMask(s), Tt.return(i), te.return(s);
    }
    function Fn(r, t, e) {
        return r ? (r !== t && (Fn(r.parent, t, e), r.updateLocalTransform(), e.append(r.localTransform)), e) : (Dt("Mask bounds, renderable is not inside the root container"), e);
    }
    class Gn {
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
            this.inverse || Dn(this.mask, t, e);
        }
        addLocalBounds(t, e) {
            Bn(this.mask, t, e);
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
    Gn.extension = ht.MaskEffect;
    class Vn {
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
    Vn.extension = ht.MaskEffect;
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
            Dn(this.mask, t, e);
        }
        addLocalBounds(t, e) {
            Bn(this.mask, t, e);
        }
        containsPoint(t, e) {
            const s = this.mask;
            return e(s, t);
        }
        destroy() {
            this.reset();
        }
        static test(t) {
            return t instanceof ye;
        }
    }
    $n.extension = ht.MaskEffect;
    const Ol = {
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
    let pi = Ol;
    ne = {
        get () {
            return pi;
        },
        set (r) {
            pi = r;
        }
    };
    Nn = class extends qt {
        constructor(t){
            t.resource || (t.resource = ne.get().createCanvas()), t.width || (t.width = t.resource.width, t.autoDensity || (t.width /= t.resolution)), t.height || (t.height = t.resource.height, t.autoDensity || (t.height /= t.resolution)), super(t), this.uploadMethodId = "image", this.autoDensity = t.autoDensity, this.resizeCanvas(), this.transparent = !!t.transparent;
        }
        resizeCanvas() {
            this.autoDensity && (this.resource.style.width = `${this.width}px`, this.resource.style.height = `${this.height}px`), (this.resource.width !== this.pixelWidth || this.resource.height !== this.pixelHeight) && (this.resource.width = this.pixelWidth, this.resource.height = this.pixelHeight);
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
    Nn.extension = ht.TextureSource;
    xs = class extends qt {
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
    xs.extension = ht.TextureSource;
    pr = ((r)=>(r[r.INTERACTION = 50] = "INTERACTION", r[r.HIGH = 25] = "HIGH", r[r.NORMAL = 0] = "NORMAL", r[r.LOW = -25] = "LOW", r[r.UTILITY = -50] = "UTILITY", r))(pr || {});
    class Ys {
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
    const On = class It {
        constructor(){
            this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new Ys(null, null, 1 / 0), this.deltaMS = 1 / It.targetFPMS, this.elapsedMS = 1 / It.targetFPMS, this._tick = (t)=>{
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
        add(t, e, s = pr.NORMAL) {
            return this._addListener(new Ys(t, e, s));
        }
        addOnce(t, e, s = pr.NORMAL) {
            return this._addListener(new Ys(t, e, s, !0));
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
    On.targetFPMS = .06;
    let Ws;
    ns = On;
    async function zl() {
        return Ws ?? (Ws = (async ()=>{
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
        })()), Ws;
    }
    const Ps = class zn extends qt {
        constructor(t){
            super(t), this.isReady = !1, this.uploadMethodId = "video", t = {
                ...zn.defaultOptions,
                ...t
            }, this._autoUpdate = !0, this._isConnectedToTicker = !1, this._updateFPS = t.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = t.autoPlay !== !1, this.alphaMode = t.alphaMode ?? "premultiply-alpha-on-upload", this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onCanPlayThrough = this._onCanPlayThrough.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), t.autoLoad !== !1 && this.load();
        }
        updateFrame() {
            if (!this.destroyed) {
                if (this._updateFPS) {
                    const t = ns.shared.elapsedMS * this.resource.playbackRate;
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
            return (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0), t.addEventListener("play", this._onPlayStart), t.addEventListener("pause", this._onPlayStop), t.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._mediaReady() : (e.preload || t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlayThrough), t.addEventListener("error", this._onError, !0)), this.alphaMode = await zl(), this._load = new Promise((s, i)=>{
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
            this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.resource.requestVideoFrameCallback ? (this._isConnectedToTicker && (ns.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback))) : (this._videoFrameRequestCallbackHandle !== null && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (ns.shared.add(this.updateFrame, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (ns.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0));
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
    let Ll = Ps;
    const Se = (r, t, e = !1)=>(Array.isArray(r) || (r = [
            r
        ]), t ? r.map((s)=>typeof s == "string" || e ? t(s) : s) : r);
    class Ul {
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
            const s = Se(t);
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
    let mr;
    Ae = new Ul;
    mr = [];
    Vt.handleByList(ht.TextureSource, mr);
    function Ln(r = {}) {
        const t = r && r.resource, e = t ? r.resource : r, s = t ? r : {
            resource: r
        };
        for(let i = 0; i < mr.length; i++){
            const n = mr[i];
            if (n.test(e)) return new n(s);
        }
        throw new Error(`Could not find a source type for resource: ${s.resource}`);
    }
    function Hl(r = {}, t = !1) {
        const e = r && r.resource, s = e ? r.resource : r, i = e ? r : {
            resource: r
        };
        if (!t && Ae.has(s)) return Ae.get(s);
        const n = new ut({
            source: Ln(i)
        });
        return n.on("destroy", ()=>{
            Ae.has(s) && Ae.remove(s);
        }), t || Ae.set(s, n), n;
    }
    function Yl(r, t = !1) {
        return typeof r == "string" ? Ae.get(r) : r instanceof qt ? new ut({
            source: r
        }) : Hl(r, t);
    }
    ut.from = Yl;
    qt.from = Ln;
    Vt.add(Gn, Vn, $n, Ll, xs, Nn, kr);
    var Un = ((r)=>(r[r.Low = 0] = "Low", r[r.Normal = 1] = "Normal", r[r.High = 2] = "High", r))(Un || {});
    function $t(r) {
        if (typeof r != "string") throw new TypeError(`Path must be a string. Received ${JSON.stringify(r)}`);
    }
    function Ee(r) {
        return r.split("?")[0].split("#")[0];
    }
    function Wl(r) {
        return r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function Xl(r, t, e) {
        return r.replace(new RegExp(Wl(t), "g"), e);
    }
    function jl(r, t) {
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
            return Xl(r, "\\", "/");
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
            $t(r), r = this.toPosix(r);
            const t = /^file:\/\/\//.exec(r);
            if (t) return t[0];
            const e = /^[^/:]+:\/{0,2}/.exec(r);
            return e ? e[0] : "";
        },
        toAbsolute (r, t, e) {
            if ($t(r), this.isDataUrl(r) || this.isBlobUrl(r)) return r;
            const s = Ee(this.toPosix(t ?? ne.get().getBaseUrl())), i = Ee(this.toPosix(e ?? this.rootname(s)));
            return r = this.toPosix(r), r.startsWith("/") ? Ze.join(i, r.slice(1)) : this.isAbsolute(r) ? r : this.join(s, r);
        },
        normalize (r) {
            if ($t(r), r.length === 0) return ".";
            if (this.isDataUrl(r) || this.isBlobUrl(r)) return r;
            r = this.toPosix(r);
            let t = "";
            const e = r.startsWith("/");
            this.hasProtocol(r) && (t = this.rootname(r), r = r.slice(t.length));
            const s = r.endsWith("/");
            return r = jl(r), r.length > 0 && s && (r += "/"), e ? `/${r}` : t + r;
        },
        isAbsolute (r) {
            return $t(r), r = this.toPosix(r), this.hasProtocol(r) ? !0 : r.startsWith("/");
        },
        join (...r) {
            if (r.length === 0) return ".";
            let t;
            for(let e = 0; e < r.length; ++e){
                const s = r[e];
                if ($t(s), s.length > 0) if (t === void 0) t = s;
                else {
                    const i = r[e - 1] ?? "";
                    this.joinExtensions.includes(this.extname(i).toLowerCase()) ? t += `/../${s}` : t += `/${s}`;
                }
            }
            return t === void 0 ? "." : this.normalize(t);
        },
        dirname (r) {
            if ($t(r), r.length === 0) return ".";
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
            $t(r), r = this.toPosix(r);
            let t = "";
            if (r.startsWith("/") ? t = "/" : t = this.getProtocol(r), this.isUrl(r)) {
                const e = r.indexOf("/", t.length);
                e !== -1 ? t = r.slice(0, e) : t = r, t.endsWith("/") || (t += "/");
            }
            return t;
        },
        basename (r, t) {
            $t(r), t && $t(t), r = Ee(this.toPosix(r));
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
            $t(r), r = Ee(this.toPosix(r));
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
            $t(r);
            const t = {
                root: "",
                dir: "",
                base: "",
                ext: "",
                name: ""
            };
            if (r.length === 0) return t;
            r = Ee(this.toPosix(r));
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
    function Hn(r, t, e, s, i) {
        const n = t[e];
        for(let o = 0; o < n.length; o++){
            const a = n[o];
            e < t.length - 1 ? Hn(r.replace(s[e], a), t, e + 1, s, i) : i.push(r.replace(s[e], a));
        }
    }
    function ql(r) {
        const t = /\{(.*?)\}/g, e = r.match(t), s = [];
        if (e) {
            const i = [];
            e.forEach((n)=>{
                const o = n.substring(1, n.length - 1).split(",");
                i.push(o);
            }), Hn(r, i, 0, e, s);
        } else s.push(r);
        return s;
    }
    const mi = (r)=>!Array.isArray(r);
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
            return Se(e || s, (n)=>typeof n == "string" ? n : Array.isArray(n) ? n.map((o)=>o?.src ?? o) : n?.src ? n.src : n, !0);
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
            }, Se(e).forEach((n)=>{
                const { src: o } = n;
                let { data: a, format: l, loadParser: u } = n;
                const h = Se(o).map((d)=>typeof d == "string" ? ql(d) : Array.isArray(d) ? d : [
                        d
                    ]), c = this.getAlias(n);
                Array.isArray(c) ? c.forEach(s) : s(c);
                const m = [];
                h.forEach((d)=>{
                    d.forEach((g)=>{
                        let _ = {};
                        if (typeof g != "object") {
                            _.src = g;
                            for(let p = 0; p < this._parsers.length; p++){
                                const b = this._parsers[p];
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
                        }), m.push(_);
                    });
                }), c.forEach((d)=>{
                    this._assetMap[d] = m;
                });
            });
        }
        resolveBundle(t) {
            const e = mi(t);
            t = Se(t);
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
            const e = mi(t);
            t = Se(t);
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
            }, t.loadParser = n ?? t.loadParser, t.format = o ?? t.format ?? Kl(t.src), t;
        }
    }
    Yn.RETINA_PREFIX = /@([0-9\.]+)x/;
    function Kl(r) {
        return r.split(".").pop().split("?").shift().split("#").shift();
    }
    const gi = (r, t)=>{
        const e = t.split("?")[1];
        return e && (r += `?${e}`), r;
    }, Wn = class $e {
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
    Wn.BATCH_SIZE = 1e3;
    let _i = Wn;
    const Zl = [
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
    function Xn(r, t, e) {
        const s = {};
        if (r.forEach((i)=>{
            s[i] = t;
        }), Object.keys(t.textures).forEach((i)=>{
            s[i] = t.textures[i];
        }), !e) {
            const i = Ze.dirname(r[0]);
            t.linkedSheets.forEach((n, o)=>{
                const a = Xn([
                    `${i}/${t.data.meta.related_multi_packs[o]}`
                ], n, !0);
                Object.assign(s, a);
            });
        }
        return s;
    }
    const Ql = {
        extension: ht.Asset,
        cache: {
            test: (r)=>r instanceof _i,
            getCacheableAssets: (r, t)=>Xn(r, t, !1)
        },
        resolver: {
            extension: {
                type: ht.ResolveParser,
                name: "resolveSpritesheet"
            },
            test: (r)=>{
                const e = r.split("?")[0].split("."), s = e.pop(), i = e.pop();
                return s === "json" && Zl.includes(i);
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
                priority: Un.Normal,
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
                    const h = gi(o + (i ?? r.meta.image), t.src);
                    a = (await e.load([
                        {
                            src: h,
                            data: n
                        }
                    ]))[h];
                }
                const l = new _i(a.source, r);
                await l.parse();
                const u = r?.meta?.related_multi_packs;
                if (Array.isArray(u)) {
                    const h = [];
                    for (const m of u){
                        if (typeof m != "string") continue;
                        let d = o + m;
                        t.data?.ignoreMultiPack || (d = gi(d, t.src), h.push(e.load({
                            src: d,
                            data: {
                                textureOptions: n,
                                ignoreMultiPack: !0
                            }
                        })));
                    }
                    const c = await Promise.all(h);
                    l.linkedSheets = c, c.forEach((m)=>{
                        m.linkedSheets = [
                            l
                        ].concat(l.linkedSheets.filter((d)=>d !== m));
                    });
                }
                return l;
            },
            async unload (r, t, e) {
                await e.unload(r.textureSource._sourceOrigin), r.destroy(!1);
            }
        }
    };
    Vt.add(Ql);
    const Xs = Object.create(null), yi = Object.create(null);
    Ir = function(r, t) {
        let e = yi[r];
        return e === void 0 && (Xs[t] === void 0 && (Xs[t] = 1), yi[r] = e = Xs[t]++), e;
    };
    let os;
    function jn() {
        return (!os || os?.isContextLost()) && (os = ne.get().createCanvas().getContext("webgl", {})), os;
    }
    let as;
    function Jl() {
        if (!as) {
            as = "mediump";
            const r = jn();
            r && r.getShaderPrecisionFormat && (as = r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.HIGH_FLOAT).precision ? "highp" : "mediump");
        }
        return as;
    }
    function th(r, t, e) {
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
    function eh(r, t, e) {
        const s = e ? t.maxSupportedFragmentPrecision : t.maxSupportedVertexPrecision;
        if (r.substring(0, 9) !== "precision") {
            let i = e ? t.requestedFragmentPrecision : t.requestedVertexPrecision;
            return i === "highp" && s !== "highp" && (i = "mediump"), `precision ${i} float;
${r}`;
        } else if (s !== "highp" && r.substring(0, 15) === "precision highp") return r.replace("precision highp", "precision mediump");
        return r;
    }
    function sh(r, t) {
        return t ? `#version 300 es
${r}` : r;
    }
    const rh = {}, ih = {};
    function nh(r, { name: t = "pixi-program" }, e = !0) {
        t = t.replace(/\s+/g, "-"), t += e ? "-fragment" : "-vertex";
        const s = e ? rh : ih;
        return s[t] ? (s[t]++, t += `-${s[t]}`) : s[t] = 1, r.indexOf("#define SHADER_NAME") !== -1 ? r : `${`#define SHADER_NAME ${t}`}
${r}`;
    }
    function oh(r, t) {
        return t ? r.replace("#version 300 es", "") : r;
    }
    const js = {
        stripVersion: oh,
        ensurePrecision: eh,
        addProgramDefines: th,
        setProgramName: nh,
        insertVersion: sh
    }, qs = Object.create(null), qn = class gr {
        constructor(t){
            t = {
                ...gr.defaultOptions,
                ...t
            };
            const e = t.fragment.indexOf("#version 300 es") !== -1, s = {
                stripVersion: e,
                ensurePrecision: {
                    requestedFragmentPrecision: t.preferredFragmentPrecision,
                    requestedVertexPrecision: t.preferredVertexPrecision,
                    maxSupportedVertexPrecision: "highp",
                    maxSupportedFragmentPrecision: Jl()
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
            }), this.fragment = i, this.vertex = n, this.transformFeedbackVaryings = t.transformFeedbackVaryings, this._key = Ir(`${this.vertex}:${this.fragment}`, "gl-program");
        }
        destroy() {
            this.fragment = null, this.vertex = null, this._attributeData = null, this._uniformData = null, this._uniformBlockData = null, this.transformFeedbackVaryings = null;
        }
        static from(t) {
            const e = `${t.vertex}:${t.fragment}`;
            return qs[e] || (qs[e] = new gr(t)), qs[e];
        }
    };
    qn.defaultOptions = {
        preferredVertexPrecision: "highp",
        preferredFragmentPrecision: "mediump"
    };
    Kn = qn;
    const xi = {
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
    ah = function(r) {
        return xi[r] ?? xi.float32;
    };
    const lh = {
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
    function hh({ source: r, entryPoint: t }) {
        const e = {}, s = r.indexOf(`fn ${t}`);
        if (s !== -1) {
            const i = r.indexOf("->", s);
            if (i !== -1) {
                const n = r.substring(s, i), o = /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;
                let a;
                for(; (a = o.exec(n)) !== null;){
                    const l = lh[a[3]] ?? "float32";
                    e[a[2]] = {
                        location: parseInt(a[1], 10),
                        format: l,
                        stride: ah(l).stride,
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
            const m = c.match(l)[1], d = c.match(a).reduce((g, _)=>{
                const [p, b] = _.split(":");
                return g[p.trim()] = b.trim(), g;
            }, {});
            return d ? {
                name: m,
                members: d
            } : null;
        }).filter(({ name: c })=>u.some((m)=>m.type === c)) ?? [];
        return {
            groups: u,
            structs: h
        };
    }
    var Ne = ((r)=>(r[r.VERTEX = 1] = "VERTEX", r[r.FRAGMENT = 2] = "FRAGMENT", r[r.COMPUTE = 4] = "COMPUTE", r))(Ne || {});
    function uh({ groups: r }) {
        const t = [];
        for(let e = 0; e < r.length; e++){
            const s = r[e];
            t[s.group] || (t[s.group] = []), s.isUniform ? t[s.group].push({
                binding: s.binding,
                visibility: Ne.VERTEX | Ne.FRAGMENT,
                buffer: {
                    type: "uniform"
                }
            }) : s.type === "sampler" ? t[s.group].push({
                binding: s.binding,
                visibility: Ne.FRAGMENT,
                sampler: {
                    type: "filtering"
                }
            }) : s.type === "texture_2d" && t[s.group].push({
                binding: s.binding,
                visibility: Ne.FRAGMENT,
                texture: {
                    sampleType: "float",
                    viewDimension: "2d",
                    multisampled: !1
                }
            });
        }
        return t;
    }
    function ch({ groups: r }) {
        const t = [];
        for(let e = 0; e < r.length; e++){
            const s = r[e];
            t[s.group] || (t[s.group] = {}), t[s.group][s.name] = s.binding;
        }
        return t;
    }
    function dh(r, t) {
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
                this.structsAndGroups = dh(a, l);
            }
            this.layout = i ?? ch(this.structsAndGroups), this.gpuLayout = n ?? uh(this.structsAndGroups), this.autoAssignGlobalUniforms = this.layout[0]?.globalUniforms !== void 0, this.autoAssignLocalUniforms = this.layout[1]?.localUniforms !== void 0, this._generateProgramKey();
        }
        _generateProgramKey() {
            const { vertex: t, fragment: e } = this, s = t.source + e.source + t.entryPoint + e.entryPoint;
            this._layoutKey = Ir(s, "program");
        }
        get attributeData() {
            return this._attributeData ?? (this._attributeData = hh(this.vertex)), this._attributeData;
        }
        destroy() {
            this.gpuLayout = null, this.layout = null, this.structsAndGroups = null, this.fragment = null, this.vertex = null;
        }
        static from(t) {
            const e = `${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;
            return Zs[e] || (Zs[e] = new Ms(t)), Zs[e];
        }
    };
    const Zn = [
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
    ], fh = Zn.reduce((r, t)=>(r[t] = !0, r), {});
    function ph(r, t) {
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
    const Qn = class Jn {
        constructor(t, e){
            this._touched = 0, this.uid = _t("uniform"), this._resourceType = "uniformGroup", this._resourceId = _t("resource"), this.isUniformGroup = !0, this._dirtyId = 0, this.destroyed = !1, e = {
                ...Jn.defaultOptions,
                ...e
            }, this.uniformStructures = t;
            const s = {};
            for(const i in t){
                const n = t[i];
                if (n.name = i, n.size = n.size ?? 1, !fh[n.type]) throw new Error(`Uniform type ${n.type} is not supported. Supported uniform types are: ${Zn.join(", ")}`);
                n.value ?? (n.value = ph(n.type, n.size)), s[i] = n.value;
            }
            this.uniforms = s, this._dirtyId = 1, this.ubo = e.ubo, this.isStatic = e.isStatic, this._signature = Ir(Object.keys(s).map((i)=>`${i}-${t[i].type}`).join("-"), "uniform-group");
        }
        update() {
            this._dirtyId++;
        }
    };
    Qn.defaultOptions = {
        ubo: !1,
        isStatic: !1
    };
    to = Qn;
    ps = class {
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
    _r = ((r)=>(r[r.WEBGL = 1] = "WEBGL", r[r.WEBGPU = 2] = "WEBGPU", r[r.BOTH = 3] = "BOTH", r))(_r || {});
    Rr = class extends re {
        constructor(t){
            super(), this.uid = _t("shader"), this._uniformBindMap = Object.create(null), this._ownedBindGroups = [];
            let { gpuProgram: e, glProgram: s, groups: i, resources: n, compatibleRenderers: o, groupMap: a } = t;
            this.gpuProgram = e, this.glProgram = s, o === void 0 && (o = 0, e && (o |= _r.WEBGPU), s && (o |= _r.WEBGL)), this.compatibleRenderers = o;
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
                for(const h in n)l[h] || (i[99] || (i[99] = new ps, this._ownedBindGroups.push(i[99])), l[h] = {
                    group: 99,
                    binding: u,
                    name: h
                }, a[99] = a[99] || {}, a[99][u] = h, u++);
                for(const h in n){
                    const c = h;
                    let m = n[h];
                    !m.source && !m._resourceType && (m = new to(m));
                    const d = l[c];
                    d && (i[d.group] || (i[d.group] = new ps, this._ownedBindGroups.push(i[d.group])), i[d.group].setResource(m, d.binding));
                }
            }
            this.groups = i, this._uniformBindMap = a, this.resources = this._buildResourceAccessor(i, l);
        }
        addResource(t, e, s) {
            var i, n;
            (i = this._uniformBindMap)[e] || (i[e] = {}), (n = this._uniformBindMap[e])[s] || (n[s] = t), this.groups[e] || (this.groups[e] = new ps, this._ownedBindGroups.push(this.groups[e]));
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
            return e && (n = Ms.from(e)), s && (o = Kn.from(s)), new Rr({
                gpuProgram: n,
                glProgram: o,
                ...i
            });
        }
    };
    const yr = [];
    Vt.handleByNamedList(ht.Environment, yr);
    async function mh(r) {
        if (!r) for(let t = 0; t < yr.length; t++){
            const e = yr[t];
            if (e.value.test()) {
                await e.value.load();
                return;
            }
        }
    }
    let De;
    gh = function() {
        if (typeof De == "boolean") return De;
        try {
            De = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({
                a: "b"
            }, "a", "b") === !0;
        } catch  {
            De = !1;
        }
        return De;
    };
    var ls = {
        exports: {}
    }, bi;
    function _h() {
        if (bi) return ls.exports;
        bi = 1, ls.exports = r, ls.exports.default = r;
        function r(f, x, w) {
            w = w || 2;
            var T = x && x.length, M = T ? x[0] * w : f.length, F = t(f, 0, M, w, !0), k = [];
            if (!F || F.next === F.prev) return k;
            var E, L, H, j, at, J, gt;
            if (T && (F = l(f, x, F, w)), f.length > 80 * w) {
                E = H = f[0], L = j = f[1];
                for(var rt = w; rt < M; rt += w)at = f[rt], J = f[rt + 1], at < E && (E = at), J < L && (L = J), at > H && (H = at), J > j && (j = J);
                gt = Math.max(H - E, j - L), gt = gt !== 0 ? 32767 / gt : 0;
            }
            return s(F, k, w, E, L, gt, 0), k;
        }
        function t(f, x, w, T, M) {
            var F, k;
            if (M === et(f, x, w, T) > 0) for(F = x; F < w; F += T)k = S(F, f[F], f[F + 1], k);
            else for(F = w - T; F >= x; F -= T)k = S(F, f[F], f[F + 1], k);
            return k && B(k, k.next) && (W(k), k = k.next), k;
        }
        function e(f, x) {
            if (!f) return f;
            x || (x = f);
            var w = f, T;
            do if (T = !1, !w.steiner && (B(w, w.next) || A(w.prev, w, w.next) === 0)) {
                if (W(w), w = x = w.prev, w === w.next) break;
                T = !0;
            } else w = w.next;
            while (T || w !== x);
            return x;
        }
        function s(f, x, w, T, M, F, k) {
            if (f) {
                !k && F && d(f, T, M, F);
                for(var E = f, L, H; f.prev !== f.next;){
                    if (L = f.prev, H = f.next, F ? n(f, T, M, F) : i(f)) {
                        x.push(L.i / w | 0), x.push(f.i / w | 0), x.push(H.i / w | 0), W(f), f = H.next, E = H.next;
                        continue;
                    }
                    if (f = H, f === E) {
                        k ? k === 1 ? (f = o(e(f), x, w), s(f, x, w, T, M, F, 2)) : k === 2 && a(f, x, w, T, M, F) : s(e(f), x, w, T, M, F, 1);
                        break;
                    }
                }
            }
        }
        function i(f) {
            var x = f.prev, w = f, T = f.next;
            if (A(x, w, T) >= 0) return !1;
            for(var M = x.x, F = w.x, k = T.x, E = x.y, L = w.y, H = T.y, j = M < F ? M < k ? M : k : F < k ? F : k, at = E < L ? E < H ? E : H : L < H ? L : H, J = M > F ? M > k ? M : k : F > k ? F : k, gt = E > L ? E > H ? E : H : L > H ? L : H, rt = T.next; rt !== x;){
                if (rt.x >= j && rt.x <= J && rt.y >= at && rt.y <= gt && b(M, E, F, L, k, H, rt.x, rt.y) && A(rt.prev, rt, rt.next) >= 0) return !1;
                rt = rt.next;
            }
            return !0;
        }
        function n(f, x, w, T) {
            var M = f.prev, F = f, k = f.next;
            if (A(M, F, k) >= 0) return !1;
            for(var E = M.x, L = F.x, H = k.x, j = M.y, at = F.y, J = k.y, gt = E < L ? E < H ? E : H : L < H ? L : H, rt = j < at ? j < J ? j : J : at < J ? at : J, Kt = E > L ? E > H ? E : H : L > H ? L : H, Mt = j > at ? j > J ? j : J : at > J ? at : J, Lt = _(gt, rt, x, w, T), Ut = _(Kt, Mt, x, w, T), Q = f.prevZ, st = f.nextZ; Q && Q.z >= Lt && st && st.z <= Ut;){
                if (Q.x >= gt && Q.x <= Kt && Q.y >= rt && Q.y <= Mt && Q !== M && Q !== k && b(E, j, L, at, H, J, Q.x, Q.y) && A(Q.prev, Q, Q.next) >= 0 || (Q = Q.prevZ, st.x >= gt && st.x <= Kt && st.y >= rt && st.y <= Mt && st !== M && st !== k && b(E, j, L, at, H, J, st.x, st.y) && A(st.prev, st, st.next) >= 0)) return !1;
                st = st.nextZ;
            }
            for(; Q && Q.z >= Lt;){
                if (Q.x >= gt && Q.x <= Kt && Q.y >= rt && Q.y <= Mt && Q !== M && Q !== k && b(E, j, L, at, H, J, Q.x, Q.y) && A(Q.prev, Q, Q.next) >= 0) return !1;
                Q = Q.prevZ;
            }
            for(; st && st.z <= Ut;){
                if (st.x >= gt && st.x <= Kt && st.y >= rt && st.y <= Mt && st !== M && st !== k && b(E, j, L, at, H, J, st.x, st.y) && A(st.prev, st, st.next) >= 0) return !1;
                st = st.nextZ;
            }
            return !0;
        }
        function o(f, x, w) {
            var T = f;
            do {
                var M = T.prev, F = T.next.next;
                !B(M, F) && $(M, T, T.next, F) && O(M, F) && O(F, M) && (x.push(M.i / w | 0), x.push(T.i / w | 0), x.push(F.i / w | 0), W(T), W(T.next), T = f = F), T = T.next;
            }while (T !== f);
            return e(T);
        }
        function a(f, x, w, T, M, F) {
            var k = f;
            do {
                for(var E = k.next.next; E !== k.prev;){
                    if (k.i !== E.i && C(k, E)) {
                        var L = G(k, E);
                        k = e(k, k.next), L = e(L, L.next), s(k, x, w, T, M, F, 0), s(L, x, w, T, M, F, 0);
                        return;
                    }
                    E = E.next;
                }
                k = k.next;
            }while (k !== f);
        }
        function l(f, x, w, T) {
            var M = [], F, k, E, L, H;
            for(F = 0, k = x.length; F < k; F++)E = x[F] * T, L = F < k - 1 ? x[F + 1] * T : f.length, H = t(f, E, L, T, !1), H === H.next && (H.steiner = !0), M.push(p(H));
            for(M.sort(u), F = 0; F < M.length; F++)w = h(M[F], w);
            return w;
        }
        function u(f, x) {
            return f.x - x.x;
        }
        function h(f, x) {
            var w = c(f, x);
            if (!w) return x;
            var T = G(w, f);
            return e(T, T.next), e(w, w.next);
        }
        function c(f, x) {
            var w = x, T = f.x, M = f.y, F = -1 / 0, k;
            do {
                if (M <= w.y && M >= w.next.y && w.next.y !== w.y) {
                    var E = w.x + (M - w.y) * (w.next.x - w.x) / (w.next.y - w.y);
                    if (E <= T && E > F && (F = E, k = w.x < w.next.x ? w : w.next, E === T)) return k;
                }
                w = w.next;
            }while (w !== x);
            if (!k) return null;
            var L = k, H = k.x, j = k.y, at = 1 / 0, J;
            w = k;
            do T >= w.x && w.x >= H && T !== w.x && b(M < j ? T : F, M, H, j, M < j ? F : T, M, w.x, w.y) && (J = Math.abs(M - w.y) / (T - w.x), O(w, f) && (J < at || J === at && (w.x > k.x || w.x === k.x && m(k, w))) && (k = w, at = J)), w = w.next;
            while (w !== L);
            return k;
        }
        function m(f, x) {
            return A(f.prev, f, x.prev) < 0 && A(x.next, f, f.next) < 0;
        }
        function d(f, x, w, T) {
            var M = f;
            do M.z === 0 && (M.z = _(M.x, M.y, x, w, T)), M.prevZ = M.prev, M.nextZ = M.next, M = M.next;
            while (M !== f);
            M.prevZ.nextZ = null, M.prevZ = null, g(M);
        }
        function g(f) {
            var x, w, T, M, F, k, E, L, H = 1;
            do {
                for(w = f, f = null, F = null, k = 0; w;){
                    for(k++, T = w, E = 0, x = 0; x < H && (E++, T = T.nextZ, !!T); x++);
                    for(L = H; E > 0 || L > 0 && T;)E !== 0 && (L === 0 || !T || w.z <= T.z) ? (M = w, w = w.nextZ, E--) : (M = T, T = T.nextZ, L--), F ? F.nextZ = M : f = M, M.prevZ = F, F = M;
                    w = T;
                }
                F.nextZ = null, H *= 2;
            }while (k > 1);
            return f;
        }
        function _(f, x, w, T, M) {
            return f = (f - w) * M | 0, x = (x - T) * M | 0, f = (f | f << 8) & 16711935, f = (f | f << 4) & 252645135, f = (f | f << 2) & 858993459, f = (f | f << 1) & 1431655765, x = (x | x << 8) & 16711935, x = (x | x << 4) & 252645135, x = (x | x << 2) & 858993459, x = (x | x << 1) & 1431655765, f | x << 1;
        }
        function p(f) {
            var x = f, w = f;
            do (x.x < w.x || x.x === w.x && x.y < w.y) && (w = x), x = x.next;
            while (x !== f);
            return w;
        }
        function b(f, x, w, T, M, F, k, E) {
            return (M - k) * (x - E) >= (f - k) * (F - E) && (f - k) * (T - E) >= (w - k) * (x - E) && (w - k) * (F - E) >= (M - k) * (T - E);
        }
        function C(f, x) {
            return f.next.i !== x.i && f.prev.i !== x.i && !z(f, x) && (O(f, x) && O(x, f) && I(f, x) && (A(f.prev, f, x.prev) || A(f, x.prev, x)) || B(f, x) && A(f.prev, f, f.next) > 0 && A(x.prev, x, x.next) > 0);
        }
        function A(f, x, w) {
            return (x.y - f.y) * (w.x - x.x) - (x.x - f.x) * (w.y - x.y);
        }
        function B(f, x) {
            return f.x === x.x && f.y === x.y;
        }
        function $(f, x, w, T) {
            var M = P(A(f, x, w)), F = P(A(f, x, T)), k = P(A(w, T, f)), E = P(A(w, T, x));
            return !!(M !== F && k !== E || M === 0 && D(f, w, x) || F === 0 && D(f, T, x) || k === 0 && D(w, f, T) || E === 0 && D(w, x, T));
        }
        function D(f, x, w) {
            return x.x <= Math.max(f.x, w.x) && x.x >= Math.min(f.x, w.x) && x.y <= Math.max(f.y, w.y) && x.y >= Math.min(f.y, w.y);
        }
        function P(f) {
            return f > 0 ? 1 : f < 0 ? -1 : 0;
        }
        function z(f, x) {
            var w = f;
            do {
                if (w.i !== f.i && w.next.i !== f.i && w.i !== x.i && w.next.i !== x.i && $(w, w.next, f, x)) return !0;
                w = w.next;
            }while (w !== f);
            return !1;
        }
        function O(f, x) {
            return A(f.prev, f, f.next) < 0 ? A(f, x, f.next) >= 0 && A(f, f.prev, x) >= 0 : A(f, x, f.prev) < 0 || A(f, f.next, x) < 0;
        }
        function I(f, x) {
            var w = f, T = !1, M = (f.x + x.x) / 2, F = (f.y + x.y) / 2;
            do w.y > F != w.next.y > F && w.next.y !== w.y && M < (w.next.x - w.x) * (F - w.y) / (w.next.y - w.y) + w.x && (T = !T), w = w.next;
            while (w !== f);
            return T;
        }
        function G(f, x) {
            var w = new U(f.i, f.x, f.y), T = new U(x.i, x.x, x.y), M = f.next, F = x.prev;
            return f.next = x, x.prev = f, w.next = M, M.prev = w, T.next = w, w.prev = T, F.next = T, T.prev = F, T;
        }
        function S(f, x, w, T) {
            var M = new U(f, x, w);
            return T ? (M.next = T.next, M.prev = T, T.next.prev = M, T.next = M) : (M.prev = M, M.next = M), M;
        }
        function W(f) {
            f.next.prev = f.prev, f.prev.next = f.next, f.prevZ && (f.prevZ.nextZ = f.nextZ), f.nextZ && (f.nextZ.prevZ = f.prevZ);
        }
        function U(f, x, w) {
            this.i = f, this.x = x, this.y = w, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
        }
        r.deviation = function(f, x, w, T) {
            var M = x && x.length, F = M ? x[0] * w : f.length, k = Math.abs(et(f, 0, F, w));
            if (M) for(var E = 0, L = x.length; E < L; E++){
                var H = x[E] * w, j = E < L - 1 ? x[E + 1] * w : f.length;
                k -= Math.abs(et(f, H, j, w));
            }
            var at = 0;
            for(E = 0; E < T.length; E += 3){
                var J = T[E] * w, gt = T[E + 1] * w, rt = T[E + 2] * w;
                at += Math.abs((f[J] - f[rt]) * (f[gt + 1] - f[J + 1]) - (f[J] - f[gt]) * (f[rt + 1] - f[J + 1]));
            }
            return k === 0 && at === 0 ? 0 : Math.abs((at - k) / k);
        };
        function et(f, x, w, T) {
            for(var M = 0, F = x, k = w - T; F < w; F += T)M += (f[k] - f[F]) * (f[F + 1] + f[k + 1]), k = F;
            return M;
        }
        return r.flatten = function(f) {
            for(var x = f[0][0].length, w = {
                vertices: [],
                holes: [],
                dimensions: x
            }, T = 0, M = 0; M < f.length; M++){
                for(var F = 0; F < f[M].length; F++)for(var k = 0; k < x; k++)w.vertices.push(f[M][F][k]);
                M > 0 && (T += f[M - 1].length, w.holes.push(T));
            }
            return w;
        }, ls.exports;
    }
    var yh = _h();
    const xh = Ar(yh);
    eo = ((r)=>(r[r.NONE = 0] = "NONE", r[r.COLOR = 16384] = "COLOR", r[r.STENCIL = 1024] = "STENCIL", r[r.DEPTH = 256] = "DEPTH", r[r.COLOR_DEPTH = 16640] = "COLOR_DEPTH", r[r.COLOR_STENCIL = 17408] = "COLOR_STENCIL", r[r.DEPTH_STENCIL = 1280] = "DEPTH_STENCIL", r[r.ALL = 17664] = "ALL", r))(eo || {});
    bh = class {
        constructor(t){
            this.items = [], this._name = t;
        }
        emit(t, e, s, i, n, o, a, l) {
            const { name: u, items: h } = this;
            for(let c = 0, m = h.length; c < m; c++)h[c][u](t, e, s, i, n, o, a, l);
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
    const vh = [
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
    ], so = class ro extends re {
        constructor(t){
            super(), this.runners = Object.create(null), this.renderPipes = Object.create(null), this._initOptions = {}, this._systemsHash = Object.create(null), this.type = t.type, this.name = t.name, this.config = t;
            const e = [
                ...vh,
                ...this.config.runners ?? []
            ];
            this._addRunners(...e), this._unsafeEvalCheck();
        }
        async init(t = {}) {
            const e = t.skipExtensionImports === !0 ? !0 : t.manageImports === !1;
            await mh(e), this._addSystems(this.config.systems), this._addPipes(this.config.renderPipes, this.config.renderPipeAdaptors);
            for(const s in this._systemsHash)t = {
                ...this._systemsHash[s].constructor.defaultOptions,
                ...t
            };
            t = {
                ...ro.defaultOptions,
                ...t
            }, this._roundPixels = t.roundPixels ? 1 : 0;
            for(let s = 0; s < this.runners.init.items.length; s++)await this.runners.init.items[s].init(t);
            this._initOptions = t;
        }
        render(t, e) {
            let s = t;
            if (s instanceof ye && (s = {
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
            t.target || (t.target = e.renderTarget.renderTarget), t.clearColor || (t.clearColor = this.background.colorRgba), t.clear ?? (t.clear = eo.ALL);
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
                this.runners[e] = new bh(e);
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
            if (!gh()) throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.");
        }
        resetState() {
            this.runners.resetState.emit();
        }
    };
    so.defaultOptions = {
        resolution: 1,
        failIfMajorPerformanceCaveat: !1,
        roundPixels: !1
    };
    let hs;
    io = so;
    function wh(r) {
        return hs !== void 0 || (hs = (()=>{
            const t = {
                stencil: !0,
                failIfMajorPerformanceCaveat: r ?? io.defaultOptions.failIfMajorPerformanceCaveat
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
        })()), hs;
    }
    let us;
    async function Ch(r = {}) {
        return us !== void 0 || (us = await (async ()=>{
            const t = ne.get().getNavigator().gpu;
            if (!t) return !1;
            try {
                return await (await t.requestAdapter(r)).requestDevice(), !0;
            } catch  {
                return !1;
            }
        })()), us;
    }
    const vi = [
        "webgl",
        "webgpu",
        "canvas"
    ];
    async function Sh(r) {
        let t = [];
        r.preference ? (t.push(r.preference), vi.forEach((n)=>{
            n !== r.preference && t.push(n);
        })) : t = vi.slice();
        let e, s = {};
        for(let n = 0; n < t.length; n++){
            const o = t[n];
            if (o === "webgpu" && await Ch()) {
                const { WebGPURenderer: a } = await Pe(async ()=>{
                    const { WebGPURenderer: l } = await import("./WebGPURenderer-DpKTmUag.js");
                    return {
                        WebGPURenderer: l
                    };
                }, __vite__mapDeps([12,10,13,11,1,2,3,4,5]), import.meta.url);
                e = a, s = {
                    ...r,
                    ...r.webgpu
                };
                break;
            } else if (o === "webgl" && wh(r.failIfMajorPerformanceCaveat ?? io.defaultOptions.failIfMajorPerformanceCaveat)) {
                const { WebGLRenderer: a } = await Pe(async ()=>{
                    const { WebGLRenderer: l } = await import("./WebGLRenderer-BSZ1VwE9.js");
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
    no = "8.8.1";
    class oo {
        static init() {
            globalThis.__PIXI_APP_INIT__?.(this, no);
        }
        static destroy() {}
    }
    oo.extension = ht.Application;
    Ah = class {
        constructor(t){
            this._renderer = t;
        }
        init() {
            globalThis.__PIXI_RENDERER_INIT__?.(this._renderer, no);
        }
        destroy() {
            this._renderer = null;
        }
    };
    Ah.extension = {
        type: [
            ht.WebGLSystem,
            ht.WebGPUSystem
        ],
        name: "initHook",
        priority: -10
    };
    const ao = class xr {
        constructor(...t){
            this.stage = new ye, t[0] !== void 0 && ct(yt, "Application constructor options are deprecated, please use Application.init() instead.");
        }
        async init(t) {
            t = {
                ...t
            }, this.renderer = await Sh(t), xr._plugins.forEach((e)=>{
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
            const s = xr._plugins.slice(0);
            s.reverse(), s.forEach((i)=>{
                i.destroy.call(this);
            }), this.stage.destroy(e), this.stage = null, this.renderer.destroy(t), this.renderer = null;
        }
    };
    ao._plugins = [];
    let lo = ao;
    Vt.handleByList(ht.Application, lo._plugins);
    Vt.add(oo);
    const wi = [
        {
            offset: 0,
            color: "white"
        },
        {
            offset: 1,
            color: "black"
        }
    ], Er = class br {
        constructor(...t){
            this.uid = _t("fillGradient"), this.type = "linear", this.colorStops = [];
            let e = Th(t);
            e = {
                ...e.type === "radial" ? br.defaultRadialOptions : br.defaultLinearOptions,
                ..._n(e)
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
            const t = this.colorStops.length ? this.colorStops : wi, e = this._textureSize, { canvas: s, context: i } = Si(e, 1), n = i.createLinearGradient(0, 0, this._textureSize, 0);
            Ci(n, t), i.fillStyle = n, i.fillRect(0, 0, e, 1), this.texture = new ut({
                source: new xs({
                    resource: s
                })
            });
            const { x: o, y: a } = this.start, { x: l, y: u } = this.end, h = new tt, c = l - o, m = u - a, d = Math.sqrt(c * c + m * m), g = Math.atan2(m, c);
            h.scale(d / e, 1), h.rotate(g), h.translate(o, a), this.textureSpace === "local" && h.scale(e, e), this.transform = h;
        }
        buildGradient() {
            this.type === "linear" ? this.buildLinearGradient() : this.buildRadialGradient();
        }
        buildRadialGradient() {
            if (this.texture) return;
            const t = this.colorStops.length ? this.colorStops : wi, e = this._textureSize, { canvas: s, context: i } = Si(e, e), { x: n, y: o } = this.center, { x: a, y: l } = this.outerCenter, u = this.innerRadius, h = this.outerRadius, c = a - h, m = l - h, d = e / (h * 2), g = (n - c) * d, _ = (o - m) * d, p = i.createRadialGradient(g, _, u * d, (a - c) * d, (l - m) * d, h * d);
            Ci(p, t), i.fillStyle = t[t.length - 1].color, i.fillRect(0, 0, e, e), i.fillStyle = p, i.translate(g, _), i.rotate(this.rotation), i.scale(1, this.scale), i.translate(-g, -_), i.fillRect(0, 0, e, e), this.texture = new ut({
                source: new xs({
                    resource: s,
                    addressModeU: "clamp-to-edge",
                    addressModeV: "clamp-to-edge"
                })
            });
            const b = new tt;
            b.scale(1 / d, 1 / d), b.translate(c, m), this.textureSpace === "local" && b.scale(e, e), this.transform = b;
        }
        get styleKey() {
            return this.uid;
        }
        destroy() {
            this.texture?.destroy(!0), this.texture = null;
        }
    };
    Er.defaultLinearOptions = {
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
    Er.defaultRadialOptions = {
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
    Is = Er;
    function Ci(r, t) {
        for(let e = 0; e < t.length; e++){
            const s = t[e];
            r.addColorStop(s.offset, s.color);
        }
    }
    function Si(r, t) {
        const e = ne.get().createCanvas(r, t), s = e.getContext("2d");
        return {
            canvas: e,
            context: s
        };
    }
    function Th(r) {
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
    const Ai = {
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
    kh = class {
        constructor(t, e){
            this.uid = _t("fillPattern"), this.transform = new tt, this._styleKey = null, this.texture = t, this.transform.scale(1 / t.frame.width, 1 / t.frame.height), e && (t.source.style.addressModeU = Ai[e].addressModeU, t.source.style.addressModeV = Ai[e].addressModeV);
        }
        setTransform(t) {
            const e = this.texture;
            this.transform.copyFrom(t), this.transform.invert(), this.transform.scale(1 / e.frame.width, 1 / e.frame.height), this._styleKey = null;
        }
        get styleKey() {
            return this._styleKey ? this._styleKey : (this._styleKey = `fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`, this._styleKey);
        }
    };
    var Qs, Ti;
    function Ph() {
        if (Ti) return Qs;
        Ti = 1, Qs = e;
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
    var Mh = Ph();
    const Ih = Ar(Mh);
    function Rh(r, t) {
        const e = Ih(r), s = [];
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
    class Dr {
        constructor(t = 0, e = 0, s = 0){
            this.type = "circle", this.x = t, this.y = e, this.radius = s;
        }
        clone() {
            return new Dr(this.x, this.y, this.radius);
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
    class Br {
        constructor(t = 0, e = 0, s = 0, i = 0){
            this.type = "ellipse", this.x = t, this.y = e, this.halfWidth = s, this.halfHeight = i;
        }
        clone() {
            return new Br(this.x, this.y, this.halfWidth, this.halfHeight);
        }
        contains(t, e) {
            if (this.halfWidth <= 0 || this.halfHeight <= 0) return !1;
            let s = (t - this.x) / this.halfWidth, i = (e - this.y) / this.halfHeight;
            return s *= s, i *= i, s + i <= 1;
        }
        strokeContains(t, e, s, i = .5) {
            const { halfWidth: n, halfHeight: o } = this;
            if (n <= 0 || o <= 0) return !1;
            const a = s * (1 - i), l = s - a, u = n - l, h = o - l, c = n + a, m = o + a, d = t - this.x, g = e - this.y, _ = d * d / (u * u) + g * g / (h * h), p = d * d / (c * c) + g * g / (m * m);
            return _ > 1 && p <= 1;
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
    function Eh(r, t, e, s, i, n) {
        const o = r - e, a = t - s, l = i - e, u = n - s, h = o * l + a * u, c = l * l + u * u;
        let m = -1;
        c !== 0 && (m = h / c);
        let d, g;
        m < 0 ? (d = e, g = s) : m > 1 ? (d = i, g = n) : (d = e + m * l, g = s + m * u);
        const _ = r - d, p = t - g;
        return _ * _ + p * p;
    }
    let Dh, Bh;
    class Le {
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
            const e = this.getBounds(Dh), s = t.getBounds(Bh);
            if (!e.containsRect(s)) return !1;
            const i = t.points;
            for(let n = 0; n < i.length; n += 2){
                const o = i[n], a = i[n + 1];
                if (!this.contains(o, a)) return !1;
            }
            return !0;
        }
        clone() {
            const t = this.points.slice(), e = new Le(t);
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
                const c = l[h], m = l[h + 1], d = l[(h + 2) % l.length], g = l[(h + 3) % l.length], _ = Eh(t, e, c, m, d, g), p = Math.sign((d - c) * (e - m) - (g - m) * (t - c));
                if (_ <= (p < 0 ? a : o)) return !0;
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
    const cs = (r, t, e, s, i, n, o)=>{
        const a = r - e, l = t - s, u = Math.sqrt(a * a + l * l);
        return u >= i - n && u <= i + o;
    };
    class Fr {
        constructor(t = 0, e = 0, s = 0, i = 0, n = 20){
            this.type = "roundedRectangle", this.x = t, this.y = e, this.width = s, this.height = i, this.radius = n;
        }
        getBounds(t) {
            return t || (t = new vt), t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
        }
        clone() {
            return new Fr(this.x, this.y, this.width, this.height, this.radius);
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
            const { x: n, y: o, width: a, height: l, radius: u } = this, h = s * (1 - i), c = s - h, m = n + u, d = o + u, g = a - u * 2, _ = l - u * 2, p = n + a, b = o + l;
            return (t >= n - h && t <= n + c || t >= p - c && t <= p + h) && e >= d && e <= d + _ || (e >= o - h && e <= o + c || e >= b - c && e <= b + h) && t >= m && t <= m + g ? !0 : t < m && e < d && cs(t, e, m, d, u, c, h) || t > p - u && e < d && cs(t, e, p - u, d, u, c, h) || t > p - u && e > b - u && cs(t, e, p - u, b - u, u, c, h) || t < m && e > b - u && cs(t, e, m, b - u, u, c, h);
        }
        toString() {
            return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
        }
    }
    const Fh = [
        "precision mediump float;",
        "void main(void){",
        "float test = 0.1;",
        "%forloop%",
        "gl_FragColor = vec4(0.0);",
        "}"
    ].join(`
`);
    function Gh(r) {
        let t = "";
        for(let e = 0; e < r; ++e)e > 0 && (t += `
else `), e < r - 1 && (t += `if(test == ${e}.0){}`);
        return t;
    }
    function Vh(r, t) {
        if (r === 0) throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
        const e = t.createShader(t.FRAGMENT_SHADER);
        try {
            for(;;){
                const s = Fh.replace(/%forloop%/gi, Gh(r));
                if (t.shaderSource(e, s), t.compileShader(e), !t.getShaderParameter(e, t.COMPILE_STATUS)) r = r / 2 | 0;
                else break;
            }
        } finally{
            t.deleteShader(e);
        }
        return r;
    }
    let ve = null;
    ho = function() {
        if (ve) return ve;
        const r = jn();
        return ve = r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS), ve = Vh(ve, r), r.getExtension("WEBGL_lose_context")?.loseContext(), ve;
    };
    const uo = {};
    $h = function(r, t) {
        let e = 2166136261;
        for(let s = 0; s < t; s++)e ^= r[s].uid, e = Math.imul(e, 16777619), e >>>= 0;
        return uo[e] || Nh(r, t, e);
    };
    let Js = 0;
    function Nh(r, t, e) {
        const s = {};
        let i = 0;
        Js || (Js = ho());
        for(let o = 0; o < Js; o++){
            const a = o < t ? r[o] : ut.EMPTY.source;
            s[i++] = a.source, s[i++] = a.style;
        }
        const n = new ps(s);
        return uo[e] = n, n;
    }
    ki = class {
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
    Pi = function(r, t) {
        const e = r.byteLength / 8 | 0, s = new Float64Array(r, 0, e);
        new Float64Array(t, 0, e).set(s);
        const n = r.byteLength - e * 8;
        if (n > 0) {
            const o = new Uint8Array(r, e * 8, n);
            new Uint8Array(t, e * 8, n).set(o);
        }
    };
    const Oh = {
        normal: "normal-npm",
        add: "add-npm",
        screen: "screen-npm"
    };
    zh = ((r)=>(r[r.DISABLED = 0] = "DISABLED", r[r.RENDERING_MASK_ADD = 1] = "RENDERING_MASK_ADD", r[r.MASK_ACTIVE = 2] = "MASK_ACTIVE", r[r.INVERSE_MASK_ACTIVE = 3] = "INVERSE_MASK_ACTIVE", r[r.RENDERING_MASK_REMOVE = 4] = "RENDERING_MASK_REMOVE", r[r.NONE = 5] = "NONE", r))(zh || {});
    Mi = function(r, t) {
        return t.alphaMode === "no-premultiply-alpha" && Oh[r] || r;
    };
    class Lh {
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
    class Uh {
        constructor(){
            this.renderPipeId = "batch", this.action = "startBatch", this.start = 0, this.size = 0, this.textures = new Lh, this.blendMode = "normal", this.topology = "triangle-strip", this.canBundle = !0;
        }
        destroy() {
            this.textures = null, this.gpuBindGroup = null, this.bindGroup = null, this.batcher = null;
        }
    }
    const co = [];
    let vr = 0;
    function Ii() {
        return vr > 0 ? co[--vr] : new Uh;
    }
    function Ri(r) {
        co[vr++] = r;
    }
    let Be = 0;
    const fo = class ms {
        constructor(t = {}){
            this.uid = _t("batcher"), this.dirty = !0, this.batchIndex = 0, this.batches = [], this._elements = [], ms.defaultOptions.maxTextures = ms.defaultOptions.maxTextures ?? ho(), t = {
                ...ms.defaultOptions,
                ...t
            };
            const { maxTextures: e, attributesInitialSize: s, indicesInitialSize: i } = t;
            this.attributeBuffer = new ki(s * 4), this.indexBuffer = new Uint16Array(i), this.maxTextures = e;
        }
        begin() {
            this.elementSize = 0, this.elementStart = 0, this.indexSize = 0, this.attributeSize = 0;
            for(let t = 0; t < this.batchIndex; t++)Ri(this.batches[t]);
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
            let s = Ii(), i = s.textures;
            i.clear();
            const n = e[this.elementStart];
            let o = Mi(n.blendMode, n.texture._source), a = n.topology;
            this.attributeSize * 4 > this.attributeBuffer.size && this._resizeAttributeBuffer(this.attributeSize * 4), this.indexSize > this.indexBuffer.length && this._resizeIndexBuffer(this.indexSize);
            const l = this.attributeBuffer.float32View, u = this.attributeBuffer.uint32View, h = this.indexBuffer;
            let c = this._batchIndexSize, m = this._batchIndexStart, d = "startBatch";
            const g = this.maxTextures;
            for(let _ = this.elementStart; _ < this.elementSize; ++_){
                const p = e[_];
                e[_] = null;
                const C = p.texture._source, A = Mi(p.blendMode, C), B = o !== A || a !== p.topology;
                if (C._batchTick === Be && !B) {
                    p._textureId = C._textureBindLocation, c += p.indexSize, p.packAsQuad ? (this.packQuadAttributes(p, l, u, p._attributeStart, p._textureId), this.packQuadIndex(h, p._indexStart, p._attributeStart / this.vertexSize)) : (this.packAttributes(p, l, u, p._attributeStart, p._textureId), this.packIndex(p, h, p._indexStart, p._attributeStart / this.vertexSize)), p._batch = s;
                    continue;
                }
                C._batchTick = Be, (i.count >= g || B) && (this._finishBatch(s, m, c - m, i, o, a, t, d), d = "renderBatch", m = c, o = A, a = p.topology, s = Ii(), i = s.textures, i.clear(), ++Be), p._textureId = C._textureBindLocation = i.count, i.ids[C.uid] = i.count, i.textures[i.count++] = C, p._batch = s, c += p.indexSize, p.packAsQuad ? (this.packQuadAttributes(p, l, u, p._attributeStart, p._textureId), this.packQuadIndex(h, p._indexStart, p._attributeStart / this.vertexSize)) : (this.packAttributes(p, l, u, p._attributeStart, p._textureId), this.packIndex(p, h, p._indexStart, p._attributeStart / this.vertexSize));
            }
            i.count > 0 && (this._finishBatch(s, m, c - m, i, o, a, t, d), m = c, ++Be), this.elementStart = this.elementSize, this._batchIndexStart = m, this._batchIndexSize = c;
        }
        _finishBatch(t, e, s, i, n, o, a, l) {
            t.gpuBindGroup = null, t.bindGroup = null, t.action = l, t.batcher = this, t.textures = i, t.blendMode = n, t.topology = o, t.start = e, t.size = s, ++Be, this.batches[this.batchIndex++] = t, a.add(t);
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
            const e = Math.max(t, this.attributeBuffer.size * 2), s = new ki(e);
            Pi(this.attributeBuffer.rawBinaryData, s.rawBinaryData), this.attributeBuffer = s;
        }
        _resizeIndexBuffer(t) {
            const e = this.indexBuffer;
            let s = Math.max(t, e.length * 1.5);
            s += s % 2;
            const i = s > 65535 ? new Uint32Array(s) : new Uint16Array(s);
            if (i.BYTES_PER_ELEMENT !== e.BYTES_PER_ELEMENT) for(let n = 0; n < e.length; n++)i[n] = e[n];
            else Pi(e.buffer, i.buffer);
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
            for(let t = 0; t < this.batches.length; t++)Ri(this.batches[t]);
            this.batches = null;
            for(let t = 0; t < this._elements.length; t++)this._elements[t]._batch = null;
            this._elements = null, this.indexBuffer = null, this.attributeBuffer.destroy(), this.attributeBuffer = null;
        }
    };
    fo.defaultOptions = {
        maxTextures: null,
        attributesInitialSize: 4,
        indicesInitialSize: 6
    };
    let Hh = fo;
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
    function po(r, t) {
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
    function Yh(r, t, e) {
        const s = r.getAttribute(t);
        if (!s) return e.minX = 0, e.minY = 0, e.maxX = 0, e.maxY = 0, e;
        const i = s.buffer.data;
        let n = 1 / 0, o = 1 / 0, a = -1 / 0, l = -1 / 0;
        const u = i.BYTES_PER_ELEMENT, h = (s.offset || 0) / u, c = (s.stride || 2 * 4) / u;
        for(let m = h; m < i.length; m += c){
            const d = i[m], g = i[m + 1];
            d > a && (a = d), g > l && (l = g), d < n && (n = d), g < o && (o = g);
        }
        return e.minX = n, e.minY = o, e.maxX = a, e.maxY = l, e;
    }
    function Wh(r) {
        return (r instanceof Qe || Array.isArray(r) || r.BYTES_PER_ELEMENT) && (r = {
            buffer: r
        }), r.buffer = po(r.buffer, !1), r;
    }
    Xh = class extends re {
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
            const s = Wh(e);
            this.buffers.indexOf(s.buffer) === -1 && (this.buffers.push(s.buffer), s.buffer.on("update", this.onBufferUpdate, this), s.buffer.on("change", this.onBufferUpdate, this)), this.attributes[t] = s;
        }
        addIndex(t) {
            this.indexBuffer = po(t, !0), this.buffers.push(this.indexBuffer);
        }
        get bounds() {
            return this._boundsDirty ? (this._boundsDirty = !1, Yh(this, "aPosition", this._bounds)) : this._bounds;
        }
        destroy(t = !1) {
            this.emit("destroy", this), this.removeAllListeners(), t && this.buffers.forEach((e)=>e.destroy()), this.attributes = null, this.buffers = null, this.indexBuffer = null, this._bounds = null;
        }
    };
    const jh = new Float32Array(1), qh = new Uint32Array(1);
    class Kh extends Xh {
        constructor(){
            const e = new Qe({
                data: jh,
                label: "attribute-batch-buffer",
                usage: Pt.VERTEX | Pt.COPY_DST,
                shrinkToFit: !1
            }), s = new Qe({
                data: qh,
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
    function Ei(r, t, e) {
        if (r) for(const s in r){
            const i = s.toLocaleLowerCase(), n = t[i];
            if (n) {
                let o = r[s];
                s === "header" && (o = o.replace(/@in\s+[^;]+;\s*/g, "").replace(/@out\s+[^;]+;\s*/g, "")), e && n.push(`//----${e}----//`), n.push(o);
            } else Dt(`${s} placement hook does not exist in shader`);
        }
    }
    const Zh = /\{\{(.*?)\}\}/g;
    function Di(r) {
        const t = {};
        return (r.match(Zh)?.map((s)=>s.replace(/[{()}]/g, "")) ?? []).forEach((s)=>{
            t[s] = [];
        }), t;
    }
    function Bi(r, t) {
        let e;
        const s = /@in\s+([^;]+);/g;
        for(; (e = s.exec(r)) !== null;)t.push(e[1]);
    }
    function Fi(r, t, e = !1) {
        const s = [];
        Bi(t, s), r.forEach((a)=>{
            a.header && Bi(a.header, s);
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
    function Gi(r, t) {
        let e;
        const s = /@out\s+([^;]+);/g;
        for(; (e = s.exec(r)) !== null;)t.push(e[1]);
    }
    function Qh(r) {
        const e = /\b(\w+)\s*:/g.exec(r);
        return e ? e[1] : "";
    }
    function Jh(r) {
        const t = /@.*?\s+/g;
        return r.replace(t, "");
    }
    function tu(r, t) {
        const e = [];
        Gi(t, e), r.forEach((l)=>{
            l.header && Gi(l.header, e);
        });
        let s = 0;
        const i = e.sort().map((l)=>l.indexOf("builtin") > -1 ? l : `@location(${s++}) ${l}`).join(`,
`), n = e.sort().map((l)=>`       var ${Jh(l)};`).join(`
`), o = `return VSOutput(
            ${e.sort().map((l)=>` ${Qh(l)}`).join(`,
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
    function Vi(r, t) {
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
    let eu = 0;
    function su({ template: r, bits: t }) {
        const e = mo(r, t);
        if (ie[e]) return ie[e];
        const { vertex: s, fragment: i } = iu(r, t);
        return ie[e] = go(s, i, t), ie[e];
    }
    function ru({ template: r, bits: t }) {
        const e = mo(r, t);
        return ie[e] || (ie[e] = go(r.vertex, r.fragment, t)), ie[e];
    }
    function iu(r, t) {
        const e = t.map((o)=>o.vertex).filter((o)=>!!o), s = t.map((o)=>o.fragment).filter((o)=>!!o);
        let i = Fi(e, r.vertex, !0);
        i = tu(e, i);
        const n = Fi(s, r.fragment, !0);
        return {
            vertex: i,
            fragment: n
        };
    }
    function mo(r, t) {
        return t.map((e)=>(tr.has(e) || tr.set(e, eu++), tr.get(e))).sort((e, s)=>e - s).join("-") + r.vertex + r.fragment;
    }
    function go(r, t, e) {
        const s = Di(r), i = Di(t);
        return e.forEach((n)=>{
            Ei(n.vertex, s, n.name), Ei(n.fragment, i, n.name);
        }), {
            vertex: Vi(r, s),
            fragment: Vi(t, i)
        };
    }
    const nu = `
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
`, ou = `
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
`, au = `
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
`, lu = `
   
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
`, hu = {
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
    }, uu = {
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
    cu = function({ bits: r, name: t }) {
        const e = su({
            template: {
                fragment: ou,
                vertex: nu
            },
            bits: [
                hu,
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
    du = function({ bits: r, name: t }) {
        return new Kn({
            name: t,
            ...ru({
                template: {
                    vertex: au,
                    fragment: lu
                },
                bits: [
                    uu,
                    ...r
                ]
            })
        });
    };
    let er;
    fu = {
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
    pu = {
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
    function mu(r) {
        const t = [];
        if (r === 1) t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"), t.push("@group(1) @binding(1) var textureSampler1: sampler;");
        else {
            let e = 0;
            for(let s = 0; s < r; s++)t.push(`@group(1) @binding(${e++}) var textureSource${s + 1}: texture_2d<f32>;`), t.push(`@group(1) @binding(${e++}) var textureSampler${s + 1}: sampler;`);
        }
        return t.join(`
`);
    }
    function gu(r) {
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
    _u = function(r) {
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

                ${mu(r)}
            `,
                main: `
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${gu(r)}
            `
            }
        }), er[r];
    };
    const sr = {};
    function yu(r) {
        const t = [];
        for(let e = 0; e < r; e++)e > 0 && t.push("else"), e < r - 1 && t.push(`if(vTextureId < ${e}.5)`), t.push("{"), t.push(`	outColor = texture(uTextures[${e}], vUV);`), t.push("}");
        return t.join(`
`);
    }
    xu = function(r) {
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

                ${yu(r)}
            `
            }
        }), sr[r];
    };
    let $i;
    bu = {
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
    vu = {
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
    wu = function(r) {
        let t = $i[r];
        if (t) return t;
        const e = new Int32Array(r);
        for(let s = 0; s < r; s++)e[s] = s;
        return t = $i[r] = new to({
            uTextures: {
                value: e,
                type: "i32",
                size: r
            }
        }, {
            isStatic: !0
        }), t;
    };
    class Cu extends Rr {
        constructor(t){
            const e = du({
                name: "batch",
                bits: [
                    pu,
                    xu(t),
                    vu
                ]
            }), s = cu({
                name: "batch",
                bits: [
                    fu,
                    _u(t),
                    bu
                ]
            });
            super({
                glProgram: e,
                gpuProgram: s,
                resources: {
                    batchSamplers: wu(t)
                }
            });
        }
    }
    let Ni = null;
    const _o = class yo extends Hh {
        constructor(){
            super(...arguments), this.geometry = new Kh, this.shader = Ni || (Ni = new Cu(this.maxTextures)), this.name = yo.extension.name, this.vertexSize = 6;
        }
        packAttributes(t, e, s, i, n) {
            const o = n << 16 | t.roundPixels & 65535, a = t.transform, l = a.a, u = a.b, h = a.c, c = a.d, m = a.tx, d = a.ty, { positions: g, uvs: _ } = t, p = t.color, b = t.attributeOffset, C = b + t.attributeSize;
            for(let A = b; A < C; A++){
                const B = A * 2, $ = g[B], D = g[B + 1];
                e[i++] = l * $ + h * D + m, e[i++] = c * D + u * $ + d, e[i++] = _[B], e[i++] = _[B + 1], s[i++] = p, s[i++] = o;
            }
        }
        packQuadAttributes(t, e, s, i, n) {
            const o = t.texture, a = t.transform, l = a.a, u = a.b, h = a.c, c = a.d, m = a.tx, d = a.ty, g = t.bounds, _ = g.maxX, p = g.minX, b = g.maxY, C = g.minY, A = o.uvs, B = t.color, $ = n << 16 | t.roundPixels & 65535;
            e[i + 0] = l * p + h * C + m, e[i + 1] = c * C + u * p + d, e[i + 2] = A.x0, e[i + 3] = A.y0, s[i + 4] = B, s[i + 5] = $, e[i + 6] = l * _ + h * C + m, e[i + 7] = c * C + u * _ + d, e[i + 8] = A.x1, e[i + 9] = A.y1, s[i + 10] = B, s[i + 11] = $, e[i + 12] = l * _ + h * b + m, e[i + 13] = c * b + u * _ + d, e[i + 14] = A.x2, e[i + 15] = A.y2, s[i + 16] = B, s[i + 17] = $, e[i + 18] = l * p + h * b + m, e[i + 19] = c * b + u * p + d, e[i + 20] = A.x3, e[i + 21] = A.y3, s[i + 22] = B, s[i + 23] = $;
        }
    };
    _o.extension = {
        type: [
            ht.Batcher
        ],
        name: "default"
    };
    Su = _o;
    function Au(r, t, e, s, i, n, o, a = null) {
        let l = 0;
        e *= t, i *= n;
        const u = a.a, h = a.b, c = a.c, m = a.d, d = a.tx, g = a.ty;
        for(; l < o;){
            const _ = r[e], p = r[e + 1];
            s[i] = u * _ + c * p + d, s[i + 1] = h * _ + m * p + g, i += n, e += t, l++;
        }
    }
    function Tu(r, t, e, s) {
        let i = 0;
        for(t *= e; i < s;)r[t] = 0, r[t + 1] = 0, t += e, i++;
    }
    function xo(r, t, e, s, i) {
        const n = t.a, o = t.b, a = t.c, l = t.d, u = t.tx, h = t.ty;
        e || (e = 0), s || (s = 2), i || (i = r.length / s - e);
        let c = e * s;
        for(let m = 0; m < i; m++){
            const d = r[c], g = r[c + 1];
            r[c] = n * d + a * g + u, r[c + 1] = o * d + l * g + h, c += s;
        }
    }
    const ku = new tt;
    bo = class {
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
            return s ? kn(e, s.groupColor) + (this.alpha * s.groupAlpha * 255 << 24) : e + (this.alpha * 255 << 24);
        }
        get transform() {
            return this.renderable?.groupTransform || ku;
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
                const B = r, $ = B.width / 2, D = B.height / 2;
                e = B.x + $, s = B.y + D, o = a = Math.max(0, Math.min(B.radius, Math.min($, D))), i = $ - o, n = D - a;
            }
            if (!(o >= 0 && a >= 0 && i >= 0 && n >= 0)) return t;
            const l = Math.ceil(2.3 * Math.sqrt(o + a)), u = l * 8 + (i ? 4 : 0) + (n ? 4 : 0);
            if (u === 0) return t;
            if (l === 0) return t[0] = t[6] = e + i, t[1] = t[3] = s + n, t[2] = t[4] = e - i, t[5] = t[7] = s - n, t;
            let h = 0, c = l * 4 + (i ? 2 : 0) + 2, m = c, d = u, g = i + o, _ = n, p = e + g, b = e - g, C = s + _;
            if (t[h++] = p, t[h++] = C, t[--c] = C, t[--c] = b, n) {
                const B = s - _;
                t[m++] = b, t[m++] = B, t[--d] = B, t[--d] = p;
            }
            for(let B = 1; B < l; B++){
                const $ = Math.PI / 2 * (B / l), D = i + Math.cos($) * o, P = n + Math.sin($) * a, z = e + D, O = e - D, I = s + P, G = s - P;
                t[h++] = z, t[h++] = I, t[--c] = I, t[--c] = O, t[m++] = O, t[m++] = G, t[--d] = G, t[--d] = z;
            }
            g = i, _ = n + a, p = e + g, b = e - g, C = s + _;
            const A = s - _;
            return t[h++] = p, t[h++] = C, t[--d] = A, t[--d] = p, i && (t[h++] = b, t[h++] = C, t[--d] = A, t[--d] = b), t;
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
    }, Pu = {
        ...Je,
        extension: {
            ...Je.extension,
            name: "ellipse"
        }
    }, Mu = {
        ...Je,
        extension: {
            ...Je.extension,
            name: "roundedRectangle"
        }
    }, vo = 1e-4, Oi = 1e-4;
    function Iu(r) {
        const t = r.length;
        if (t < 6) return 1;
        let e = 0;
        for(let s = 0, i = r[t - 2], n = r[t - 1]; s < t; s += 2){
            const o = r[s], a = r[s + 1];
            e += (o - i) * (a + n), i = o, n = a;
        }
        return e < 0 ? -1 : 1;
    }
    function zi(r, t, e, s, i, n, o, a) {
        const l = r - e * i, u = t - s * i, h = r + e * n, c = t + s * n;
        let m, d;
        o ? (m = s, d = -e) : (m = -s, d = e);
        const g = l + m, _ = u + d, p = h + m, b = c + d;
        return a.push(g, _), a.push(p, b), 2;
    }
    function ae(r, t, e, s, i, n, o, a) {
        const l = e - r, u = s - t;
        let h = Math.atan2(l, u), c = Math.atan2(i - r, n - t);
        a && h < c ? h += Math.PI * 2 : !a && h > c && (c += Math.PI * 2);
        let m = h;
        const d = c - h, g = Math.abs(d), _ = Math.sqrt(l * l + u * u), p = (15 * g * Math.sqrt(_) / Math.PI >> 0) + 1, b = d / p;
        if (m += b, a) {
            o.push(r, t), o.push(e, s);
            for(let C = 1, A = m; C < p; C++, A += b)o.push(r, t), o.push(r + Math.sin(A) * _, t + Math.cos(A) * _);
            o.push(r, t), o.push(i, n);
        } else {
            o.push(e, s), o.push(r, t);
            for(let C = 1, A = m; C < p; C++, A += b)o.push(r + Math.sin(A) * _, t + Math.cos(A) * _), o.push(r, t);
            o.push(i, n), o.push(r, t);
        }
        return p * 2;
    }
    function Ru(r, t, e, s, i, n) {
        const o = vo;
        if (r.length === 0) return;
        const a = t;
        let l = a.alignment;
        if (t.alignment !== .5) {
            let T = Iu(r);
            l = (l - .5) * T + .5;
        }
        const u = new At(r[0], r[1]), h = new At(r[r.length - 2], r[r.length - 1]), c = s, m = Math.abs(u.x - h.x) < o && Math.abs(u.y - h.y) < o;
        if (c) {
            r = r.slice(), m && (r.pop(), r.pop(), h.set(r[r.length - 2], r[r.length - 1]));
            const T = (u.x + h.x) * .5, M = (h.y + u.y) * .5;
            r.unshift(T, M), r.push(T, M);
        }
        const d = i, g = r.length / 2;
        let _ = r.length;
        const p = d.length / 2, b = a.width / 2, C = b * b, A = a.miterLimit * a.miterLimit;
        let B = r[0], $ = r[1], D = r[2], P = r[3], z = 0, O = 0, I = -($ - P), G = B - D, S = 0, W = 0, U = Math.sqrt(I * I + G * G);
        I /= U, G /= U, I *= b, G *= b;
        const et = l, f = (1 - et) * 2, x = et * 2;
        c || (a.cap === "round" ? _ += ae(B - I * (f - x) * .5, $ - G * (f - x) * .5, B - I * f, $ - G * f, B + I * x, $ + G * x, d, !0) + 2 : a.cap === "square" && (_ += zi(B, $, I, G, f, x, !0, d))), d.push(B - I * f, $ - G * f), d.push(B + I * x, $ + G * x);
        for(let T = 1; T < g - 1; ++T){
            B = r[(T - 1) * 2], $ = r[(T - 1) * 2 + 1], D = r[T * 2], P = r[T * 2 + 1], z = r[(T + 1) * 2], O = r[(T + 1) * 2 + 1], I = -($ - P), G = B - D, U = Math.sqrt(I * I + G * G), I /= U, G /= U, I *= b, G *= b, S = -(P - O), W = D - z, U = Math.sqrt(S * S + W * W), S /= U, W /= U, S *= b, W *= b;
            const M = D - B, F = $ - P, k = D - z, E = O - P, L = M * k + F * E, H = F * k - E * M, j = H < 0;
            if (Math.abs(H) < .001 * Math.abs(L)) {
                d.push(D - I * f, P - G * f), d.push(D + I * x, P + G * x), L >= 0 && (a.join === "round" ? _ += ae(D, P, D - I * f, P - G * f, D - S * f, P - W * f, d, !1) + 4 : _ += 2, d.push(D - S * x, P - W * x), d.push(D + S * f, P + W * f));
                continue;
            }
            const at = (-I + B) * (-G + P) - (-I + D) * (-G + $), J = (-S + z) * (-W + P) - (-S + D) * (-W + O), gt = (M * J - k * at) / H, rt = (E * at - F * J) / H, Kt = (gt - D) * (gt - D) + (rt - P) * (rt - P), Mt = D + (gt - D) * f, Lt = P + (rt - P) * f, Ut = D - (gt - D) * x, Q = P - (rt - P) * x, st = Math.min(M * M + F * F, k * k + E * E), $r = j ? f : x, Po = st + $r * $r * C;
            Kt <= Po ? a.join === "bevel" || Kt / C > A ? (j ? (d.push(Mt, Lt), d.push(D + I * x, P + G * x), d.push(Mt, Lt), d.push(D + S * x, P + W * x)) : (d.push(D - I * f, P - G * f), d.push(Ut, Q), d.push(D - S * f, P - W * f), d.push(Ut, Q)), _ += 2) : a.join === "round" ? j ? (d.push(Mt, Lt), d.push(D + I * x, P + G * x), _ += ae(D, P, D + I * x, P + G * x, D + S * x, P + W * x, d, !0) + 4, d.push(Mt, Lt), d.push(D + S * x, P + W * x)) : (d.push(D - I * f, P - G * f), d.push(Ut, Q), _ += ae(D, P, D - I * f, P - G * f, D - S * f, P - W * f, d, !1) + 4, d.push(D - S * f, P - W * f), d.push(Ut, Q)) : (d.push(Mt, Lt), d.push(Ut, Q)) : (d.push(D - I * f, P - G * f), d.push(D + I * x, P + G * x), a.join === "round" ? j ? _ += ae(D, P, D + I * x, P + G * x, D + S * x, P + W * x, d, !0) + 2 : _ += ae(D, P, D - I * f, P - G * f, D - S * f, P - W * f, d, !1) + 2 : a.join === "miter" && Kt / C <= A && (j ? (d.push(Ut, Q), d.push(Ut, Q)) : (d.push(Mt, Lt), d.push(Mt, Lt)), _ += 2), d.push(D - S * f, P - W * f), d.push(D + S * x, P + W * x), _ += 2);
        }
        B = r[(g - 2) * 2], $ = r[(g - 2) * 2 + 1], D = r[(g - 1) * 2], P = r[(g - 1) * 2 + 1], I = -($ - P), G = B - D, U = Math.sqrt(I * I + G * G), I /= U, G /= U, I *= b, G *= b, d.push(D - I * f, P - G * f), d.push(D + I * x, P + G * x), c || (a.cap === "round" ? _ += ae(D - I * (f - x) * .5, P - G * (f - x) * .5, D - I * f, P - G * f, D + I * x, P + G * x, d, !1) + 2 : a.cap === "square" && (_ += zi(D, P, I, G, f, x, !1, d)));
        const w = Oi * Oi;
        for(let T = p; T < _ + p - 2; ++T)B = d[T * 2], $ = d[T * 2 + 1], D = d[(T + 1) * 2], P = d[(T + 1) * 2 + 1], z = d[(T + 2) * 2], O = d[(T + 2) * 2 + 1], !(Math.abs(B * (P - O) + D * (O - $) + z * ($ - P)) < w) && n.push(T, T + 1, T + 2);
    }
    function Eu(r, t, e, s) {
        const i = vo;
        if (r.length === 0) return;
        const n = r[0], o = r[1], a = r[r.length - 2], l = r[r.length - 1], u = t || Math.abs(n - a) < i && Math.abs(o - l) < i, h = e, c = r.length / 2, m = h.length / 2;
        for(let d = 0; d < c; d++)h.push(r[d * 2]), h.push(r[d * 2 + 1]);
        for(let d = 0; d < c - 1; d++)s.push(m + d, m + d + 1);
        u && s.push(m + c - 1, m);
    }
    function wo(r, t, e, s, i, n, o) {
        const a = xh(r, t, 2);
        if (!a) return;
        for(let u = 0; u < a.length; u += 3)n[o++] = a[u] + i, n[o++] = a[u + 1] + i, n[o++] = a[u + 2] + i;
        let l = i * s;
        for(let u = 0; u < r.length; u += 2)e[l] = r[u], e[l + 1] = r[u + 1], l += s;
    }
    const Du = [], Bu = {
        extension: {
            type: ht.ShapeBuilder,
            name: "polygon"
        },
        build (r, t) {
            for(let e = 0; e < r.points.length; e++)t[e] = r.points[e];
            return t;
        },
        triangulate (r, t, e, s, i, n) {
            wo(r, Du, t, e, s, i, n);
        }
    }, Fu = {
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
    }, Gu = {
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
    }, Vu = new tt, $u = new vt;
    function Nu(r, t, e, s) {
        const i = t.matrix ? r.copyFrom(t.matrix).invert() : r.identity();
        if (t.textureSpace === "local") {
            const n = e.getBounds($u);
            i.translate(-n.x, -n.y), i.scale(1 / n.width, 1 / n.height);
        } else {
            i.translate(t.texture.frame.x, t.texture.frame.y), i.scale(1 / t.texture.source.width, 1 / t.texture.source.height);
            const n = t.texture.source.style;
            n.addressMode === "clamp-to-edge" && (n.addressMode = "repeat", n.update());
        }
        return s && i.append(Vu.copyFrom(s).invert()), i;
    }
    const Rs = {};
    Vt.handleByMap(ht.ShapeBuilder, Rs);
    Vt.add(Fu, Bu, Gu, Je, Pu, Mu);
    const Ou = new vt, zu = new tt;
    function Lu(r, t) {
        const { geometryData: e, batches: s } = t;
        s.length = 0, e.indices.length = 0, e.vertices.length = 0, e.uvs.length = 0;
        for(let i = 0; i < r.instructions.length; i++){
            const n = r.instructions[i];
            if (n.action === "texture") Uu(n.data, s, e);
            else if (n.action === "fill" || n.action === "stroke") {
                const o = n.action === "stroke", a = n.data.path.shapePath, l = n.data.style, u = n.data.hole;
                o && u && Li(u.shapePath, l, !0, s, e), u && (a.shapePrimitives[a.shapePrimitives.length - 1].holes = u.shapePath.shapePrimitives), Li(a, l, o, s, e);
            }
        }
    }
    function Uu(r, t, e) {
        const { vertices: s, uvs: i, indices: n } = e, o = n.length, a = s.length / 2, l = [], u = Rs.rectangle, h = Ou, c = r.image;
        h.x = r.dx, h.y = r.dy, h.width = r.dw, h.height = r.dh;
        const m = r.transform;
        u.build(h, l), m && xo(l, m), u.triangulate(l, s, 2, a, n, o);
        const d = c.uvs;
        i.push(d.x0, d.y0, d.x1, d.y1, d.x3, d.y3, d.x2, d.y2);
        const g = Jt.get(bo);
        g.indexOffset = o, g.indexSize = n.length - o, g.attributeOffset = a, g.attributeSize = s.length / 2 - a, g.baseColor = r.style, g.alpha = r.alpha, g.texture = c, g.geometryData = e, t.push(g);
    }
    function Li(r, t, e, s, i) {
        const { vertices: n, uvs: o, indices: a } = i;
        r.shapePrimitives.forEach(({ shape: l, transform: u, holes: h })=>{
            const c = a.length, m = n.length / 2, d = [], g = Rs[l.type];
            let _ = "triangle-list";
            if (g.build(l, d), u && xo(d, u), e) {
                const A = l.closePath ?? !0, B = t;
                B.pixelLine ? (Eu(d, A, n, a), _ = "line-list") : Ru(d, B, !1, A, n, a);
            } else if (h) {
                const A = [], B = d.slice();
                Hu(h).forEach((D)=>{
                    A.push(B.length / 2), B.push(...D);
                }), wo(B, A, n, 2, m, a, c);
            } else g.triangulate(d, n, 2, m, a, c);
            const p = o.length / 2, b = t.texture;
            if (b !== ut.WHITE) {
                const A = Nu(zu, t, l, u);
                Au(n, 2, m, o, p, 2, n.length / 2 - m, A);
            } else Tu(o, p, 2, n.length / 2 - m);
            const C = Jt.get(bo);
            C.indexOffset = c, C.indexSize = a.length - c, C.attributeOffset = m, C.attributeSize = n.length / 2 - m, C.baseColor = t.color, C.alpha = t.alpha, C.texture = b, C.geometryData = i, C.topology = _, s.push(C);
        });
    }
    function Hu(r) {
        const t = [];
        for(let e = 0; e < r.length; e++){
            const s = r[e].shape, i = [];
            Rs[s.type].build(s, i), t.push(i);
        }
        return t;
    }
    class Yu {
        constructor(){
            this.batches = [], this.geometryData = {
                vertices: [],
                uvs: [],
                indices: []
            };
        }
    }
    class Wu {
        constructor(){
            this.batcher = new Su, this.instructions = new Rn;
        }
        init() {
            this.instructions.reset();
        }
        get geometry() {
            return ct(el, "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead."), this.batcher.geometry;
        }
    }
    const Gr = class wr {
        constructor(t){
            this._gpuContextHash = {}, this._graphicsDataContextHash = Object.create(null), t.renderableGC.addManagedHash(this, "_gpuContextHash"), t.renderableGC.addManagedHash(this, "_graphicsDataContextHash");
        }
        init(t) {
            wr.defaultOptions.bezierSmoothness = t?.bezierSmoothness ?? wr.defaultOptions.bezierSmoothness;
        }
        getContextRenderData(t) {
            return this._graphicsDataContextHash[t.uid] || this._initContextRenderData(t);
        }
        updateGpuContext(t) {
            let e = this._gpuContextHash[t.uid] || this._initContext(t);
            if (t.dirty) {
                e ? this._cleanGraphicsContextData(t) : e = this._initContext(t), Lu(t, e);
                const s = t.batchMode;
                t.customShader || s === "no-batch" ? e.isBatchable = !1 : s === "auto" && (e.isBatchable = e.geometryData.vertices.length < 400), t.dirty = !1;
            }
            return e;
        }
        getGpuContext(t) {
            return this._gpuContextHash[t.uid] || this._initContext(t);
        }
        _initContextRenderData(t) {
            const e = Jt.get(Wu), { batches: s, geometryData: i } = this._gpuContextHash[t.uid], n = i.vertices.length, o = i.indices.length;
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
                c.bindGroup = $h(c.textures.textures, c.textures.count);
            }
            return this._graphicsDataContextHash[t.uid] = e, e;
        }
        _initContext(t) {
            const e = new Yu;
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
    Gr.extension = {
        type: [
            ht.WebGLSystem,
            ht.WebGPUSystem,
            ht.CanvasSystem
        ],
        name: "graphicsContext"
    };
    Gr.defaultOptions = {
        bezierSmoothness: .5
    };
    Co = Gr;
    const Xu = 8, ds = 11920929e-14, ju = 1;
    function So(r, t, e, s, i, n, o, a, l, u) {
        const c = Math.min(.99, Math.max(0, u ?? Co.defaultOptions.bezierSmoothness));
        let m = (ju - c) / 1;
        return m *= m, qu(t, e, s, i, n, o, a, l, r, m), r;
    }
    function qu(r, t, e, s, i, n, o, a, l, u) {
        Cr(r, t, e, s, i, n, o, a, l, u, 0), l.push(o, a);
    }
    function Cr(r, t, e, s, i, n, o, a, l, u, h) {
        if (h > Xu) return;
        const c = (r + e) / 2, m = (t + s) / 2, d = (e + i) / 2, g = (s + n) / 2, _ = (i + o) / 2, p = (n + a) / 2, b = (c + d) / 2, C = (m + g) / 2, A = (d + _) / 2, B = (g + p) / 2, $ = (b + A) / 2, D = (C + B) / 2;
        if (h > 0) {
            let P = o - r, z = a - t;
            const O = Math.abs((e - o) * z - (s - a) * P), I = Math.abs((i - o) * z - (n - a) * P);
            if (O > ds && I > ds) {
                if ((O + I) * (O + I) <= u * (P * P + z * z)) {
                    l.push($, D);
                    return;
                }
            } else if (O > ds) {
                if (O * O <= u * (P * P + z * z)) {
                    l.push($, D);
                    return;
                }
            } else if (I > ds) {
                if (I * I <= u * (P * P + z * z)) {
                    l.push($, D);
                    return;
                }
            } else if (P = $ - (r + o) / 2, z = D - (t + a) / 2, P * P + z * z <= u) {
                l.push($, D);
                return;
            }
        }
        Cr(r, t, c, m, b, C, $, D, l, u, h + 1), Cr($, D, A, B, _, p, o, a, l, u, h + 1);
    }
    const Ku = 8, Zu = 11920929e-14, Qu = 1;
    function Ju(r, t, e, s, i, n, o, a) {
        const u = Math.min(.99, Math.max(0, a ?? Co.defaultOptions.bezierSmoothness));
        let h = (Qu - u) / 1;
        return h *= h, tc(t, e, s, i, n, o, r, h), r;
    }
    function tc(r, t, e, s, i, n, o, a) {
        Sr(o, r, t, e, s, i, n, a, 0), o.push(i, n);
    }
    function Sr(r, t, e, s, i, n, o, a, l) {
        if (l > Ku) return;
        const u = (t + s) / 2, h = (e + i) / 2, c = (s + n) / 2, m = (i + o) / 2, d = (u + c) / 2, g = (h + m) / 2;
        let _ = n - t, p = o - e;
        const b = Math.abs((s - n) * p - (i - o) * _);
        if (b > Zu) {
            if (b * b <= a * (_ * _ + p * p)) {
                r.push(d, g);
                return;
            }
        } else if (_ = d - (t + n) / 2, p = g - (e + o) / 2, _ * _ + p * p <= a) {
            r.push(d, g);
            return;
        }
        Sr(r, t, e, u, h, d, g, a, l + 1), Sr(r, d, g, c, m, n, o, a, l + 1);
    }
    function Ao(r, t, e, s, i, n, o, a) {
        let l = Math.abs(i - n);
        (!o && i > n || o && n > i) && (l = 2 * Math.PI - l), a || (a = Math.max(6, Math.floor(6 * Math.pow(s, 1 / 3) * (l / Math.PI)))), a = Math.max(a, 3);
        let u = l / a, h = i;
        u *= o ? -1 : 1;
        for(let c = 0; c < a + 1; c++){
            const m = Math.cos(h), d = Math.sin(h), g = t + m * s, _ = e + d * s;
            r.push(g, _), h += u;
        }
    }
    function ec(r, t, e, s, i, n) {
        const o = r[r.length - 2], l = r[r.length - 1] - e, u = o - t, h = i - e, c = s - t, m = Math.abs(l * c - u * h);
        if (m < 1e-8 || n === 0) {
            (r[r.length - 2] !== t || r[r.length - 1] !== e) && r.push(t, e);
            return;
        }
        const d = l * l + u * u, g = h * h + c * c, _ = l * h + u * c, p = n * Math.sqrt(d) / m, b = n * Math.sqrt(g) / m, C = p * _ / d, A = b * _ / g, B = p * c + b * u, $ = p * h + b * l, D = u * (b + C), P = l * (b + C), z = c * (p + A), O = h * (p + A), I = Math.atan2(P - $, D - B), G = Math.atan2(O - $, z - B);
        Ao(r, B + t, $ + e, n, I, G, u * h > c * l);
    }
    const Ue = Math.PI * 2, rr = {
        centerX: 0,
        centerY: 0,
        ang1: 0,
        ang2: 0
    }, ir = ({ x: r, y: t }, e, s, i, n, o, a, l)=>{
        r *= e, t *= s;
        const u = i * r - n * t, h = n * r + i * t;
        return l.x = u + o, l.y = h + a, l;
    };
    function sc(r, t) {
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
    const Ui = (r, t, e, s)=>{
        const i = r * s - t * e < 0 ? -1 : 1;
        let n = r * e + t * s;
        return n > 1 && (n = 1), n < -1 && (n = -1), i * Math.acos(n);
    }, rc = (r, t, e, s, i, n, o, a, l, u, h, c, m)=>{
        const d = Math.pow(i, 2), g = Math.pow(n, 2), _ = Math.pow(h, 2), p = Math.pow(c, 2);
        let b = d * g - d * p - g * _;
        b < 0 && (b = 0), b /= d * p + g * _, b = Math.sqrt(b) * (o === a ? -1 : 1);
        const C = b * i / n * c, A = b * -n / i * h, B = u * C - l * A + (r + e) / 2, $ = l * C + u * A + (t + s) / 2, D = (h - C) / i, P = (c - A) / n, z = (-h - C) / i, O = (-c - A) / n, I = Ui(1, 0, D, P);
        let G = Ui(D, P, z, O);
        a === 0 && G > 0 && (G -= Ue), a === 1 && G < 0 && (G += Ue), m.centerX = B, m.centerY = $, m.ang1 = I, m.ang2 = G;
    };
    function ic(r, t, e, s, i, n, o, a = 0, l = 0, u = 0) {
        if (n === 0 || o === 0) return;
        const h = Math.sin(a * Ue / 360), c = Math.cos(a * Ue / 360), m = c * (t - s) / 2 + h * (e - i) / 2, d = -h * (t - s) / 2 + c * (e - i) / 2;
        if (m === 0 && d === 0) return;
        n = Math.abs(n), o = Math.abs(o);
        const g = Math.pow(m, 2) / Math.pow(n, 2) + Math.pow(d, 2) / Math.pow(o, 2);
        g > 1 && (n *= Math.sqrt(g), o *= Math.sqrt(g)), rc(t, e, s, i, n, o, l, u, h, c, m, d, rr);
        let { ang1: _, ang2: p } = rr;
        const { centerX: b, centerY: C } = rr;
        let A = Math.abs(p) / (Ue / 4);
        Math.abs(1 - A) < 1e-7 && (A = 1);
        const B = Math.max(Math.ceil(A), 1);
        p /= B;
        let $ = r[r.length - 2], D = r[r.length - 1];
        const P = {
            x: 0,
            y: 0
        };
        for(let z = 0; z < B; z++){
            const O = sc(_, p), { x: I, y: G } = ir(O[0], n, o, c, h, b, C, P), { x: S, y: W } = ir(O[1], n, o, c, h, b, C, P), { x: U, y: et } = ir(O[2], n, o, c, h, b, C, P);
            So(r, $, D, I, G, S, W, U, et), $ = U, D = et, _ += p;
        }
    }
    function nc(r, t, e) {
        const s = (o, a)=>{
            const l = a.x - o.x, u = a.y - o.y, h = Math.sqrt(l * l + u * u), c = l / h, m = u / h;
            return {
                len: h,
                nx: c,
                ny: m
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
            let m = Math.asin(h.nx * c.ny - h.ny * c.nx), d = 1, g = !1;
            h.nx * c.nx - h.ny * -c.ny < 0 ? m < 0 ? m = Math.PI + m : (m = Math.PI - m, d = -1, g = !0) : m > 0 && (d = -1, g = !0);
            const _ = m / 2;
            let p, b = Math.abs(Math.cos(_) * l / Math.sin(_));
            b > Math.min(h.len / 2, c.len / 2) ? (b = Math.min(h.len / 2, c.len / 2), p = Math.abs(b * Math.sin(_) / Math.cos(_))) : p = l;
            const C = a.x + c.nx * b + -c.ny * p * d, A = a.y + c.ny * b + c.nx * p * d, B = Math.atan2(h.ny, h.nx) + Math.PI / 2 * d, $ = Math.atan2(c.ny, c.nx) - Math.PI / 2 * d;
            o === 0 && r.moveTo(C + Math.cos(B) * p, A + Math.sin(B) * p), r.arc(C, A, p, B, $, g), n = a;
        }
    }
    function oc(r, t, e, s) {
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
            const h = t[a], c = t[(a + 2) % o], m = i(h, l);
            let d;
            if (m < 1e-4) d = l;
            else {
                const p = Math.min(m / 2, u);
                d = n(l, h, p / m);
            }
            const g = i(c, l);
            let _;
            if (g < 1e-4) _ = l;
            else {
                const p = Math.min(g / 2, u);
                _ = n(l, c, p / g);
            }
            a === 0 ? r.moveTo(d.x, d.y) : r.lineTo(d.x, d.y), r.quadraticCurveTo(l.x, l.y, _.x, _.y, s);
        }
    }
    const ac = new vt;
    class lc {
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
            return Ao(a, t, e, s, i, n, o), this;
        }
        arcTo(t, e, s, i, n) {
            this._ensurePoly();
            const o = this._currentPoly.points;
            return ec(o, t, e, s, i, n), this;
        }
        arcToSvg(t, e, s, i, n, o, a) {
            const l = this._currentPoly.points;
            return ic(l, this._currentPoly.lastX, this._currentPoly.lastY, o, a, t, e, s, i, n), this;
        }
        bezierCurveTo(t, e, s, i, n, o, a) {
            this._ensurePoly();
            const l = this._currentPoly;
            return So(this._currentPoly.points, l.lastX, l.lastY, t, e, s, i, n, o, a), this;
        }
        quadraticCurveTo(t, e, s, i, n) {
            this._ensurePoly();
            const o = this._currentPoly;
            return Ju(this._currentPoly.points, o.lastX, o.lastY, t, e, s, i, n), this;
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
            return this.drawShape(new Dr(t, e, s), i), this;
        }
        poly(t, e, s) {
            const i = new Le(t);
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
            for(let m = 0; m < i; m++){
                const d = m * h + u, g = t + s * Math.cos(d), _ = e + s * Math.sin(d), p = d + Math.PI + c, b = d - Math.PI - c, C = g + n * Math.cos(p), A = _ + n * Math.sin(p), B = g + n * Math.cos(b), $ = _ + n * Math.sin(b);
                m === 0 ? this.moveTo(C, A) : this.lineTo(C, A), this.quadraticCurveTo(g, _, B, $, a);
            }
            return this.closePath();
        }
        roundShape(t, e, s = !1, i) {
            return t.length < 3 ? this : (s ? oc(this, t, e, i) : nc(this, t, e), this.closePath());
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
            return this.drawShape(new Br(t, e, s, i), n), this;
        }
        roundRect(t, e, s, i, n, o) {
            return this.drawShape(new Fr(t, e, s, i, n), o), this;
        }
        drawShape(t, e) {
            return this.endPoly(), this.shapePrimitives.push({
                shape: t,
                transform: e
            }), this;
        }
        startPoly(t, e) {
            let s = this._currentPoly;
            return s && this.endPoly(), s = new Le, s.points.push(t, e), this._currentPoly = s, this;
        }
        endPoly(t = !1) {
            const e = this._currentPoly;
            return e && e.points.length > 2 && (e.closePath = t, this.shapePrimitives.push({
                shape: e
            })), this._currentPoly = null, this;
        }
        _ensurePoly(t = !0) {
            if (!this._currentPoly && (this._currentPoly = new Le, t)) {
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
                const i = e[s], n = i.shape.getBounds(ac);
                i.transform ? t.addRect(n, i.transform) : t.addRect(n);
            }
            return t;
        }
    }
    class Re {
        constructor(t, e = !1){
            this.instructions = [], this.uid = _t("graphicsPath"), this._dirty = !0, this.checkForHoles = e, typeof t == "string" ? Rh(t, this) : this.instructions = t?.slice() ?? [];
        }
        get shapePath() {
            return this._shapePath || (this._shapePath = new lc(this)), this._dirty && (this._dirty = !1, this._shapePath.buildPath()), this._shapePath;
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
            for(let m = 0; m < u; m++){
                const d = m % 2 ? n : i, g = m * h + l;
                c.push(t + d * Math.cos(g), e + d * Math.sin(g));
            }
            return this.poly(c, !0, a), this;
        }
        clone(t = !1) {
            const e = new Re;
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
            let l = 0, u = 0, h = 0, c = 0, m = 0, d = 0, g = 0, _ = 0;
            for(let p = 0; p < this.instructions.length; p++){
                const b = this.instructions[p], C = b.data;
                switch(b.action){
                    case "moveTo":
                    case "lineTo":
                        l = C[0], u = C[1], C[0] = e * l + i * u + o, C[1] = s * l + n * u + a;
                        break;
                    case "bezierCurveTo":
                        h = C[0], c = C[1], m = C[2], d = C[3], l = C[4], u = C[5], C[0] = e * h + i * c + o, C[1] = s * h + n * c + a, C[2] = e * m + i * d + o, C[3] = s * m + n * d + a, C[4] = e * l + i * u + o, C[5] = s * l + n * u + a;
                        break;
                    case "quadraticCurveTo":
                        h = C[0], c = C[1], l = C[2], u = C[3], C[0] = e * h + i * c + o, C[1] = s * h + n * c + a, C[2] = e * l + i * u + o, C[3] = s * l + n * u + a;
                        break;
                    case "arcToSvg":
                        l = C[5], u = C[6], g = C[0], _ = C[1], C[0] = e * g + i * _, C[1] = s * g + n * _, C[5] = e * l + i * u + o, C[6] = s * l + n * u + a;
                        break;
                    case "circle":
                        C[4] = Fe(C[3], t);
                        break;
                    case "rect":
                        C[4] = Fe(C[4], t);
                        break;
                    case "ellipse":
                        C[8] = Fe(C[8], t);
                        break;
                    case "roundRect":
                        C[5] = Fe(C[5], t);
                        break;
                    case "addPath":
                        C[0].transform(t);
                        break;
                    case "poly":
                        C[2] = Fe(C[2], t);
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
    function Fe(r, t) {
        return r ? r.prepend(t) : t.clone();
    }
    function ft(r, t, e) {
        const s = r.getAttribute(t);
        return s ? Number(s) : e;
    }
    function hc(r, t) {
        const e = r.querySelectorAll("defs");
        for(let s = 0; s < e.length; s++){
            const i = e[s];
            for(let n = 0; n < i.children.length; n++){
                const o = i.children[n];
                switch(o.nodeName.toLowerCase()){
                    case "lineargradient":
                        t.defs[o.id] = uc(o);
                        break;
                    case "radialgradient":
                        t.defs[o.id] = cc();
                        break;
                }
            }
        }
    }
    function uc(r) {
        const t = ft(r, "x1", 0), e = ft(r, "y1", 0), s = ft(r, "x2", 1), i = ft(r, "y2", 0), n = r.getAttribute("gradientUnits") || "objectBoundingBox", o = new Is(t, e, s, i, n === "objectBoundingBox" ? "local" : "global");
        for(let a = 0; a < r.children.length; a++){
            const l = r.children[a], u = ft(l, "offset", 0), h = Ft.shared.setValue(l.getAttribute("stop-color")).toNumber();
            o.addColorStop(u, h);
        }
        return o;
    }
    function cc(r) {
        return Dt("[SVG Parser] Radial gradients are not yet supported"), new Is(0, 0, 1, 0);
    }
    function Hi(r) {
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
    function To(r, t) {
        const e = r.getAttribute("style"), s = {}, i = {}, n = {
            strokeStyle: s,
            fillStyle: i,
            useFill: !1,
            useStroke: !1
        };
        for(const o in Yi){
            const a = r.getAttribute(o);
            a && Wi(t, n, o, a.trim());
        }
        if (e) {
            const o = e.split(";");
            for(let a = 0; a < o.length; a++){
                const l = o[a].trim(), [u, h] = l.split(":");
                Yi[u] && Wi(t, n, u, h.trim());
            }
        }
        return {
            strokeStyle: n.useStroke ? s : null,
            fillStyle: n.useFill ? i : null,
            useFill: n.useFill,
            useStroke: n.useStroke
        };
    }
    function Wi(r, t, e, s) {
        switch(e){
            case "stroke":
                if (s !== "none") {
                    if (s.startsWith("url(")) {
                        const i = Hi(s);
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
                        const i = Hi(s);
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
    function dc(r, t) {
        if (typeof r == "string") {
            const o = document.createElement("div");
            o.innerHTML = r.trim(), r = o.querySelector("svg");
        }
        const e = {
            context: t,
            defs: {},
            path: new Re
        };
        hc(r, e);
        const s = r.children, { fillStyle: i, strokeStyle: n } = To(r, e);
        for(let o = 0; o < s.length; o++){
            const a = s[o];
            a.nodeName.toLowerCase() !== "defs" && ko(a, e, i, n);
        }
        return t;
    }
    function ko(r, t, e, s) {
        const i = r.children, { fillStyle: n, strokeStyle: o } = To(r, t);
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
        let l, u, h, c, m, d, g, _, p, b, C, A, B, $, D, P, z;
        switch(r.nodeName.toLowerCase()){
            case "path":
                $ = r.getAttribute("d"), r.getAttribute("fill-rule") === "evenodd" && Dt("SVG Evenodd fill rule not supported, your svg may render incorrectly"), D = new Re($, !0), t.context.path(D), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "circle":
                g = ft(r, "cx", 0), _ = ft(r, "cy", 0), p = ft(r, "r", 0), t.context.ellipse(g, _, p, p), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "rect":
                l = ft(r, "x", 0), u = ft(r, "y", 0), P = ft(r, "width", 0), z = ft(r, "height", 0), b = ft(r, "rx", 0), C = ft(r, "ry", 0), b || C ? t.context.roundRect(l, u, P, z, b || C) : t.context.rect(l, u, P, z), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "ellipse":
                g = ft(r, "cx", 0), _ = ft(r, "cy", 0), b = ft(r, "rx", 0), C = ft(r, "ry", 0), t.context.beginPath(), t.context.ellipse(g, _, b, C), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "line":
                h = ft(r, "x1", 0), c = ft(r, "y1", 0), m = ft(r, "x2", 0), d = ft(r, "y2", 0), t.context.beginPath(), t.context.moveTo(h, c), t.context.lineTo(m, d), s && t.context.stroke(s);
                break;
            case "polygon":
                B = r.getAttribute("points"), A = B.match(/\d+/g).map((O)=>parseInt(O, 10)), t.context.poly(A, !0), e && t.context.fill(e), s && t.context.stroke(s);
                break;
            case "polyline":
                B = r.getAttribute("points"), A = B.match(/\d+/g).map((O)=>parseInt(O, 10)), t.context.poly(A, !1), s && t.context.stroke(s);
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
        for(let O = 0; O < i.length; O++)ko(i[O], t, e, s);
    }
    function fc(r) {
        return Ft.isColorLike(r);
    }
    function Xi(r) {
        return r instanceof kh;
    }
    function ji(r) {
        return r instanceof Is;
    }
    function pc(r) {
        return r instanceof ut;
    }
    function mc(r, t, e) {
        const s = Ft.shared.setValue(t ?? 0);
        return r.color = s.toNumber(), r.alpha = s.alpha === 1 ? e.alpha : s.alpha, r.texture = ut.WHITE, {
            ...e,
            ...r
        };
    }
    function gc(r, t, e) {
        return r.texture = t, {
            ...e,
            ...r
        };
    }
    function qi(r, t, e) {
        return r.fill = t, r.color = 16777215, r.texture = t.texture, r.matrix = t.transform, {
            ...e,
            ...r
        };
    }
    function Ki(r, t, e) {
        return t.buildGradient(), r.fill = t, r.color = 16777215, r.texture = t.texture, r.matrix = t.transform, r.textureSpace = t.textureSpace, {
            ...e,
            ...r
        };
    }
    function _c(r, t) {
        const e = {
            ...t,
            ...r
        }, s = Ft.shared.setValue(e.color);
        return e.alpha *= s.alpha, e.color = s.toNumber(), e;
    }
    Oe = function(r, t) {
        if (r == null) return null;
        const e = {}, s = r;
        return fc(r) ? mc(e, r, t) : pc(r) ? gc(e, r, t) : Xi(r) ? qi(e, r, t) : ji(r) ? Ki(e, r, t) : s.fill && Xi(s.fill) ? qi(s, s.fill, t) : s.fill && ji(s.fill) ? Ki(s, s.fill, t) : _c(s, t);
    };
    Zi = function(r, t) {
        const { width: e, alignment: s, miterLimit: i, cap: n, join: o, pixelLine: a, ...l } = t, u = Oe(r, l);
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
    const yc = new At, Qi = new tt, Vr = class Yt extends re {
        constructor(){
            super(...arguments), this.uid = _t("graphicsContext"), this.dirty = !0, this.batchMode = "auto", this.instructions = [], this._activePath = new Re, this._transform = new tt, this._fillStyle = {
                ...Yt.defaultFillStyle
            }, this._strokeStyle = {
                ...Yt.defaultStrokeStyle
            }, this._stateStack = [], this._tick = 0, this._bounds = new zt, this._boundsDirty = !0;
        }
        clone() {
            const t = new Yt;
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
            this._fillStyle = Oe(t, Yt.defaultFillStyle);
        }
        get strokeStyle() {
            return this._strokeStyle;
        }
        set strokeStyle(t) {
            this._strokeStyle = Zi(t, Yt.defaultStrokeStyle);
        }
        setFillStyle(t) {
            return this._fillStyle = Oe(t, Yt.defaultFillStyle), this;
        }
        setStrokeStyle(t) {
            return this._strokeStyle = Oe(t, Yt.defaultStrokeStyle), this;
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
            return this._activePath = new Re, this;
        }
        fill(t, e) {
            let s;
            const i = this.instructions[this.instructions.length - 1];
            return this._tick === 0 && i && i.action === "stroke" ? s = i.data.path : s = this._activePath.clone(), s ? (t != null && (e !== void 0 && typeof t == "number" && (ct(yt, "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"), t = {
                color: t,
                alpha: e
            }), this._fillStyle = Oe(t, Yt.defaultFillStyle)), this.instructions.push({
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
            return this._tick === 0 && s && s.action === "fill" ? e = s.data.path : e = this._activePath.clone(), e ? (t != null && (this._strokeStyle = Zi(t, Yt.defaultStrokeStyle)), this.instructions.push({
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
            return this._tick++, dc(t, this), this;
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
            return t instanceof tt ? (this._transform.set(t.a, t.b, t.c, t.d, t.tx, t.ty), this) : (this._transform.set(t, e, s, i, n, o), this);
        }
        transform(t, e, s, i, n, o) {
            return t instanceof tt ? (this._transform.append(t), this) : (Qi.set(t, e, s, i, n, o), this._transform.append(Qi), this);
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
                    const m = u[h].transform, d = m ? m.applyInverse(t, yc) : t;
                    if (n.action === "fill") s = c.contains(d.x, d.y);
                    else {
                        const _ = l;
                        s = c.strokeContains(d.x, d.y, _.width, _.alignment);
                    }
                    const g = o.hole;
                    if (g) {
                        const _ = g.shapePath?.shapePrimitives;
                        if (_) for(let p = 0; p < _.length; p++)_[p].shape.contains(d.x, d.y) && (s = !1);
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
    Vr.defaultFillStyle = {
        color: 16777215,
        alpha: 1,
        texture: ut.WHITE,
        matrix: null,
        fill: null,
        textureSpace: "local"
    };
    Vr.defaultStrokeStyle = {
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
    Ge = Vr;
    bs = class extends En {
        constructor(t){
            t instanceof Ge && (t = {
                context: t
            });
            const { context: e, roundPixels: s, ...i } = t || {};
            super({
                label: "Graphics",
                ...i
            }), this.renderPipeId = "graphics", e ? this._context = e : this._context = this._ownedContext = new Ge, this._context.on("update", this.onViewUpdate, this), this.allowChildren = !1, this.roundPixels = s ?? !1;
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
            return t ? new bs(this._context.clone()) : (this._ownedContext = null, new bs(this._context));
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
            return (t.width !== Ge.defaultStrokeStyle.width || t.color !== Ge.defaultStrokeStyle.color || t.alpha !== Ge.defaultStrokeStyle.alpha) && this.context.stroke(), this;
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
    Vt.add(Ya, Wa);
    let xc, bc, vc, wc, Cc, Sc, Ac, Tc, kc, Pc, Mc, Ic, Rc, Ec, Dc, Bc, Fc, Gc, Vc, $c, Nc, Oc, zc, Lc, Uc, Hc, Yc, Wc, Xc, jc, qc, Kc, Zc, Qc, Jc, td, ed, sd, rd, id, nd, od, ad;
    xc = wt({
        __name: "PieceCanvas",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, e = pa(), s = _e(), { cachedFiles: i } = xt(s), { fileContentInterval: n } = xt(jt()), o = mt(), a = mt(!1), l = Wt(), u = Wt();
            async function h() {
                if (a.value || !o.value || !l.value) return;
                a.value = !0;
                const g = await s.fetchPieceState(t.torrent.hash), _ = new Tr;
                i.value.filter((A)=>A.priority !== nt.DO_NOT_DOWNLOAD).forEach((A)=>_.insert(A.piece_range, A.name));
                const p = new bs;
                let b = "", C = 1;
                for(let A = 0; A < g.length; ++A){
                    const B = g[A];
                    let $ = "";
                    if (B === Es.DOWNLOADING ? $ = e.current.value.colors["torrent-downloading"] : B === Es.DOWNLOADED ? $ = e.current.value.colors["torrent-ul_stopped"] : B === Es.MISSING && _.intersect_any([
                        A,
                        A
                    ]) && ($ = e.current.value.colors["torrent-dl_stopped"]), $ === b) {
                        ++C;
                        continue;
                    }
                    b !== "" && (p.rect((A - C) / g.length * o.value.width, 0, C / g.length * o.value.width, o.value.height), p.fill(b)), C = 1, b = $;
                }
                b !== "" && (p.rect((g.length - C) / g.length * o.value.width, 0, C / g.length * o.value.width, o.value.height), p.fill(b)), l.value.stage.addChild(p), u.value && u.value.destroy(), u.value = p, a.value = !1;
            }
            function c() {
                h().catch(()=>{});
            }
            const { pause: m, resume: d } = Ss(c, n, {
                immediate: !1,
                immediateCallback: !0
            });
            return Te(()=>t.isActive, (g)=>{
                g ? d() : m();
            }), ts(()=>{
                if (!o.value) return;
                const g = new lo;
                g.init({
                    antialias: !0,
                    width: o.value?.width,
                    height: o.value?.height,
                    canvas: o.value
                }).then(()=>l.value = g).then(()=>t.isActive && d());
            }), ws(()=>{
                l.value?.destroy({
                    removeView: !1
                }, {
                    children: !0
                });
            }), (g, _)=>(N(), q("canvas", {
                    ref_key: "canvas",
                    ref: o,
                    width: "4096",
                    height: "20"
                }, null, 512));
        }
    });
    bc = Ts(xc, [
        [
            "__scopeId",
            "data-v-c3384aa7"
        ]
    ]);
    vc = [
        "href"
    ];
    wc = {
        key: 1
    };
    Cc = {
        class: "my-1"
    };
    Sc = {
        class: "mr-2"
    };
    Ac = {
        key: 0
    };
    Tc = {
        key: 2
    };
    kc = {
        key: 0
    };
    Pc = {
        key: 1
    };
    Mc = {
        key: 2
    };
    Ic = {
        key: 0
    };
    Rc = {
        key: 0,
        class: "d-flex flex-wrap flex-gap-row-small flex-gap-column"
    };
    Ec = wt({
        __name: "Overview",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, { t: e, getTorrentStateString: s } = ee(), i = _e(), { cachedFiles: n } = xt(i), o = Cs(), { properties: a } = xt(se()), l = jt(), u = Z(()=>window.isSecureContext), h = Z(()=>n.value.filter((S)=>S.priority !== nt.DO_NOT_DOWNLOAD)), c = Z(()=>h.value.reduce((S, W)=>S + W.size, 0)), m = Z(()=>n.value.length), d = Z(()=>h.value.length === 1 ? h.value[0].name : ""), g = Z(()=>a.value?.comment ?? ""), _ = Z(()=>a.value?.dl_speed_avg ?? 0), p = Z(()=>a.value?.piece_size ?? 0), b = Z(()=>a.value?.pieces_have ?? 0), C = Z(()=>a.value?.pieces_num ?? 0), A = Z(()=>a.value?.up_speed_avg ?? 0), B = Z(()=>qo(t.torrent.state)), $ = Z(()=>`${parseInt(Zo(p.value, !0))} ${Ko(p.value, !0)}`), D = Z(()=>[
                    Yr.META_DOWNLOAD,
                    Yr.FORCED_META_DOWNLOAD
                ].includes(t.torrent.state)), P = Z(()=>l.enableRatioColors ? Qo(t.torrent.ratio) : "");
            async function z() {
                try {
                    await navigator.clipboard.writeText(t.torrent.hash);
                } catch  {
                    zr.error(e("toast.copy.error"));
                    return;
                }
                zr.success(e("toast.copy.success"));
            }
            function O(S) {
                o.createDialog(Mo, {
                    hashes: [
                        t.torrent.hash
                    ],
                    mode: S
                });
            }
            function I() {
                o.createDialog(xa, {
                    hash: t.torrent.hash,
                    isFolder: !1,
                    oldName: d.value
                }, i.updateFileTreeTask.perform);
            }
            function G(S) {
                if (o.hasActiveDialog || !t.isActive) return !1;
                if (S.key === "d") return S.preventDefault(), O("dl"), !0;
                if (S.key === "s") return S.preventDefault(), O("save"), !0;
                if (S.key === "f" && h.value.length === 1) return S.preventDefault(), I(), !0;
                if (S.key === "Delete") return S.preventDefault(), o.createDialog(ra, {
                    hashes: [
                        t.torrent.hash
                    ]
                }), !0;
            }
            return ts(()=>{
                document.addEventListener("keydown", G);
            }), Fo(async ()=>{
                document.removeEventListener("keydown", G);
            }), (S, W)=>S.torrent ? (N(), K(Xt, {
                    key: 0
                }, {
                    default: v(()=>[
                            y(As, {
                                class: "text-wrap"
                            }, {
                                default: v(()=>[
                                        X(V(S.torrent.name), 1)
                                    ]),
                                _: 1
                            }),
                            y(ea, null, {
                                default: v(()=>[
                                        Y("div", null, [
                                            (N(!0), q(kt, null, Gt(R(ta)(g.value), (U)=>(N(), q("span", null, [
                                                    R(Jo)(U) ? (N(), q("a", {
                                                        key: 0,
                                                        target: "_blank",
                                                        href: U
                                                    }, V(U), 9, vc)) : (N(), q("span", wc, V(U), 1))
                                                ]))), 256))
                                        ]),
                                        Y("div", Cc, [
                                            Y("span", Sc, V(S.torrent.hash), 1),
                                            u.value ? (N(), K(ot, {
                                                key: 0,
                                                variant: "outlined",
                                                rounded: "",
                                                onClick: z
                                            }, {
                                                default: v(()=>[
                                                        X(V(S.$t("torrentDetail.overview.copy_hash")), 1)
                                                    ]),
                                                _: 1
                                            })) : Et("", !0)
                                        ])
                                    ]),
                                _: 1
                            }),
                            y(pe, null, {
                                default: v(()=>[
                                        y(pt, null, {
                                            default: v(()=>[
                                                    y(it, {
                                                        cols: "12",
                                                        md: "6"
                                                    }, {
                                                        default: v(()=>[
                                                                y(pt, null, {
                                                                    default: v(()=>[
                                                                            y(it, {
                                                                                cols: "4"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        y(sa, {
                                                                                            color: B.value,
                                                                                            indeterminate: D.value,
                                                                                            size: 100,
                                                                                            "model-value": S.torrent?.progress * 100 || 0,
                                                                                            width: 15
                                                                                        }, {
                                                                                            default: v(()=>[
                                                                                                    D.value ? (N(), q("span", Ac, V(S.$t("torrentDetail.overview.fetchingMetadata")), 1)) : S.torrent.progress === 1 ? (N(), K(St, {
                                                                                                        key: 1,
                                                                                                        icon: "mdi-check",
                                                                                                        size: "x-large"
                                                                                                    })) : (N(), q("span", Tc, V(R(or)(S.torrent.progress)), 1))
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
                                                                                default: v(()=>[
                                                                                        D.value ? (N(), q("div", kc, [
                                                                                            Y("span", null, V(S.$t("torrentDetail.overview.waitingForMetadata")), 1)
                                                                                        ])) : (N(), q("div", Pc, [
                                                                                            y(bc, {
                                                                                                torrent: S.torrent,
                                                                                                isActive: S.isActive
                                                                                            }, null, 8, [
                                                                                                "torrent",
                                                                                                "isActive"
                                                                                            ])
                                                                                        ])),
                                                                                        C.value > 0 ? (N(), q("div", Mc, [
                                                                                            Y("span", null, V(R(e)("torrentDetail.overview.pieceCount", {
                                                                                                owned: b.value,
                                                                                                total: C.value,
                                                                                                pieceSize: $.value
                                                                                            })), 1)
                                                                                        ])) : Et("", !0),
                                                                                        Y("div", null, [
                                                                                            y(St, {
                                                                                                icon: "mdi-arrow-down"
                                                                                            }),
                                                                                            X(" " + V(R(fe)(S.torrent.dlspeed, R(l).useBitSpeed)) + " ", 1),
                                                                                            y(St, {
                                                                                                icon: "mdi-arrow-up"
                                                                                            }),
                                                                                            X(" " + V(R(fe)(S.torrent.upspeed, R(l).useBitSpeed)), 1)
                                                                                        ])
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: v(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrent.properties.download_path")) + ":", 1),
                                                                                        Y("div", null, V(S.torrent.download_path), 1),
                                                                                        y(ot, {
                                                                                            icon: "mdi-pencil",
                                                                                            color: "accent",
                                                                                            size: "x-small",
                                                                                            onClick: W[0] || (W[0] = (U)=>O("dl"))
                                                                                        })
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrentDetail.overview.fileCount")) + ":", 1),
                                                                                        Y("div", null, V(h.value.length) + " / " + V(m.value), 1),
                                                                                        h.value.length === 1 ? (N(), q("div", Ic, V(d.value), 1)) : Et("", !0),
                                                                                        h.value.length === 1 ? (N(), K(ot, {
                                                                                            key: 1,
                                                                                            icon: "mdi-pencil",
                                                                                            color: "accent",
                                                                                            size: "x-small",
                                                                                            onClick: I
                                                                                        })) : Et("", !0)
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: v(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrent.properties.save_path")) + ":", 1),
                                                                                        Y("div", null, V(S.torrent.savePath), 1),
                                                                                        y(ot, {
                                                                                            icon: "mdi-pencil",
                                                                                            color: "accent",
                                                                                            size: "x-small",
                                                                                            onClick: W[1] || (W[1] = (U)=>O("save"))
                                                                                        })
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrent.properties.content_path")) + ":", 1),
                                                                                        Y("div", null, V(S.torrent.content_path), 1)
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
                                                        default: v(()=>[
                                                                y(pt, null, {
                                                                    default: v(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrent.properties.state")) + ":", 1),
                                                                                        y(we, {
                                                                                            disabled: !0,
                                                                                            "default-color": B.value,
                                                                                            value: R(s)(S.torrent.state)
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
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrent.properties.category")) + ":", 1),
                                                                                        y(we, {
                                                                                            "default-color": "category",
                                                                                            disabled: !S.torrent.category.length,
                                                                                            "disabled-value": S.$t("navbar.side.filters.category.empty"),
                                                                                            value: S.torrent.category
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
                                                                    default: v(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrent.properties.tracker")) + ":", 1),
                                                                                        y(we, {
                                                                                            disabled: !S.torrent.trackerDomain.length,
                                                                                            "default-color": "tracker",
                                                                                            "disabled-value": S.$t("navbar.side.filters.tracker.empty"),
                                                                                            value: S.torrent.trackerDomain
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
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrent.properties.tags")) + ":", 1),
                                                                                        S.torrent.tags.length ? (N(), q("div", Rc, [
                                                                                            (N(!0), q(kt, null, Gt(S.torrent.tags, (U)=>(N(), K(we, {
                                                                                                    "default-color": "tag",
                                                                                                    value: U
                                                                                                }, null, 8, [
                                                                                                    "value"
                                                                                                ]))), 256))
                                                                                        ])) : (N(), K(we, {
                                                                                            key: 1,
                                                                                            disabled: !0,
                                                                                            "default-color": "tag",
                                                                                            value: S.$t("navbar.side.filters.tag.empty")
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
                                                                    default: v(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrentDetail.overview.selectedFileSize")) + ":", 1),
                                                                                        Y("div", null, V(R(Ot)(c.value, R(l).useBinarySize)) + " / " + V(R(Ot)(S.torrent.total_size, R(l).useBinarySize)), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrentDetail.overview.ratio")) + ":", 1),
                                                                                        Y("div", {
                                                                                            class: gs(P.value)
                                                                                        }, V(S.torrent.ratio), 3)
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: v(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrentDetail.overview.downloaded")) + ":", 1),
                                                                                        Y("div", null, V(R(Ot)(S.torrent.downloaded, R(l).useBinarySize)), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrentDetail.overview.uploaded")) + ":", 1),
                                                                                        Y("div", null, V(R(Ot)(S.torrent.uploaded, R(l).useBinarySize)), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            })
                                                                        ]),
                                                                    _: 1
                                                                }),
                                                                y(pt, null, {
                                                                    default: v(()=>[
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrentDetail.overview.dlSpeedAverage")) + ":", 1),
                                                                                        Y("div", null, V(R(fe)(_.value, R(l).useBitSpeed)), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            y(it, {
                                                                                cols: "6"
                                                                            }, {
                                                                                default: v(()=>[
                                                                                        Y("div", null, V(S.$t("torrentDetail.overview.upSpeedAverage")) + ":", 1),
                                                                                        Y("div", null, V(R(fe)(A.value, R(l).useBitSpeed)), 1)
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
    Dc = {
        class: "mt-2 mx-3 d-flex flex-gap align-center"
    };
    Bc = {
        class: "text-grey"
    };
    Fc = {
        key: 0
    };
    Gc = {
        key: 1
    };
    Vc = {
        key: 0
    };
    $c = {
        key: 2,
        class: "text-grey"
    };
    Nc = [
        "title"
    ];
    Oc = {
        key: 0
    };
    zc = [
        "alt",
        "src",
        "title"
    ];
    Lc = [
        "title"
    ];
    Uc = [
        "title"
    ];
    Hc = {
        key: 1
    };
    Yc = {
        class: "text-download"
    };
    Wc = {
        class: "text-upload"
    };
    Xc = {
        class: "d-flex my-3 flex-gap align-center justify-center"
    };
    jc = wt({
        __name: "Peers",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, { t: e } = ee(), s = ia(), i = na(), n = jt();
            function o(I, G) {
                const S = I.ip.split(".").map(Number), W = G.ip.split(".").map(Number);
                for(let U = 0; U < 4; U++)if (S[U] !== W[U]) return S[U] - W[U];
                return I.port - G.port;
            }
            function a(I, G) {
                return I.country && !G.country ? -1 : !I.country && G.country ? 1 : I.country === G.country ? o(I, G) : I.country.localeCompare(G.country);
            }
            const l = Go([
                {
                    nowrap: !0,
                    key: "actions",
                    sortable: !1
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.country"),
                    key: "country",
                    sortRaw: a
                },
                {
                    nowrap: !0,
                    title: e("torrentDetail.peers.fields.host"),
                    key: "host",
                    sortRaw: o
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
            ]), u = rn([
                {
                    key: "dl_speed",
                    order: "desc"
                },
                {
                    key: "up_speed",
                    order: "desc"
                }
            ]), h = mt(), c = mt(new Map), m = mt(!1), d = mt(""), g = mt(!1), _ = mt(""), p = Z(()=>Array.from(c.value.entries()).map(([I, G])=>({
                        ...G,
                        host: I
                    })));
            function b(I) {
                Object.entries(I).forEach(([G, S])=>{
                    const W = c.value.get(G);
                    c.value.set(G, {
                        ...W,
                        ...S
                    });
                });
            }
            function C(I) {
                I.forEach((G)=>c.value.delete(G));
            }
            async function A() {
                const I = await s.syncTorrentPeers(t.torrent.hash, h.value);
                h.value = I.rid, m.value = I.show_flags ?? m.value, I.full_update ? c.value = new Map(Object.entries(I.peers)) : (I.peers_removed && C(I.peers_removed), I.peers && b(I.peers));
            }
            async function B() {
                _.value.length && (await s.addTorrentPeers(t.torrent.hash, _.value.split(`
`)), O(), $());
            }
            function $() {
                g.value = !1, _.value = "";
            }
            async function D(I) {
                await s.banPeers([
                    I.host
                ]), await i.fetchPreferences(), O();
            }
            const { isActive: P, pause: z, resume: O } = Ss(A, 2e3, {
                immediate: !0,
                immediateCallback: !0
            });
            return Te(()=>t.isActive, (I)=>{
                I ? O() : z();
            }), nn(()=>!g.value), (I, G)=>(N(), K(Xt, null, {
                    default: v(()=>[
                            c.value.size ? (N(), K(cn, {
                                key: 1,
                                headers: R(l),
                                items: p.value,
                                "multi-sort": "",
                                "sort-by": R(u),
                                search: d.value,
                                "filter-keys": [
                                    "host",
                                    "client",
                                    "files"
                                ],
                                mobile: null
                            }, {
                                top: v(()=>[
                                        Y("div", Dc, [
                                            y(Qt, {
                                                modelValue: d.value,
                                                "onUpdate:modelValue": G[0] || (G[0] = (S)=>d.value = S),
                                                density: "compact",
                                                label: I.$t("common.search"),
                                                "prepend-inner-icon": "mdi-magnify",
                                                flat: "",
                                                "hide-details": "",
                                                "single-line": "",
                                                clearable: ""
                                            }, null, 8, [
                                                "modelValue",
                                                "label"
                                            ]),
                                            y(_s, {
                                                text: R(P) ? I.$t("common.pause") : I.$t("common.resume"),
                                                location: "bottom"
                                            }, {
                                                activator: v(({ props: S })=>[
                                                        y(ot, ke(S, {
                                                            icon: R(P) ? "mdi-timer-pause" : "mdi-timer-play",
                                                            color: "primary",
                                                            onClick: G[1] || (G[1] = (W)=>R(P) ? R(z)() : R(O)())
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
                                "item.host": v(({ item: S })=>[
                                        X(V(S.ip), 1),
                                        Y("span", Bc, ":" + V(S.port), 1)
                                    ]),
                                "item.client": v(({ item: S })=>[
                                        S.connection ? (N(), q("span", Fc, "[" + V(S.connection) + "] ", 1)) : Et("", !0),
                                        S.client ? (N(), q("span", Gc, [
                                            X(V(S.client) + " ", 1),
                                            S.peer_id_client ? (N(), q("span", Vc, "(" + V(S.peer_id_client) + ")", 1)) : Et("", !0)
                                        ])) : (N(), q("span", $c, "?????"))
                                    ]),
                                "item.actions": v(({ item: S })=>[
                                        y(ot, {
                                            color: "red",
                                            icon: "mdi-cancel",
                                            variant: "text",
                                            onClick: (W)=>D(S)
                                        }, null, 8, [
                                            "onClick"
                                        ])
                                    ]),
                                "item.country": v(({ item: S })=>[
                                        m.value ? (N(), q("div", {
                                            key: 0,
                                            class: "cursor-help",
                                            title: S.country
                                        }, [
                                            S.country_code ? R(oa) ? (N(), q("img", {
                                                key: 1,
                                                alt: R(Ds)(S.country_code).char,
                                                src: R(Ds)(S.country_code).url,
                                                title: S.country,
                                                style: {
                                                    "max-width": "32px"
                                                }
                                            }, null, 8, zc)) : (N(), q("span", {
                                                key: 2,
                                                title: S.country
                                            }, V(R(Ds)(S.country_code).char), 9, Lc)) : (N(), q("span", Oc))
                                        ], 8, Nc)) : Et("", !0)
                                    ]),
                                "item.flags": v(({ item: S })=>[
                                        S.flags ? (N(), q("div", {
                                            key: 0,
                                            class: "cursor-help",
                                            title: S.flags_desc
                                        }, V(S.flags), 9, Uc)) : (N(), q("div", Hc, V(I.$t("common.none")), 1))
                                    ]),
                                "item.dl_speed": v(({ item: S })=>[
                                        Y("span", Yc, V(R(fe)(S.dl_speed, R(n).useBitSpeed)) + " (" + V(R(Ot)(S.downloaded, R(n).useBinarySize)) + ") ", 1)
                                    ]),
                                "item.up_speed": v(({ item: S })=>[
                                        Y("span", Wc, V(R(fe)(S.up_speed, R(n).useBitSpeed)) + " (" + V(R(Ot)(S.uploaded, R(n).useBinarySize)) + ") ", 1)
                                    ]),
                                "item.progress": v(({ item: S })=>[
                                        y(un, {
                                            "model-value": S.progress,
                                            max: 1,
                                            height: 20,
                                            rounded: "sm",
                                            style: {
                                                width: "8em"
                                            },
                                            color: S.progress === 1 ? "torrent-ul_stalled" : "torrent-downloading"
                                        }, {
                                            default: v(()=>[
                                                    X(V(R(or)(S.progress)), 1)
                                                ]),
                                            _: 2
                                        }, 1032, [
                                            "model-value",
                                            "color"
                                        ])
                                    ]),
                                "item.relevance": v(({ item: S })=>[
                                        X(V(R(or)(S.relevance)), 1)
                                    ]),
                                _: 2
                            }, 1032, [
                                "headers",
                                "items",
                                "sort-by",
                                "search"
                            ])) : (N(), K(ar, {
                                key: 0,
                                title: I.$t("torrentDetail.peers.empty"),
                                icon: "mdi-account-sync",
                                color: "accent"
                            }, null, 8, [
                                "title"
                            ])),
                            Y("div", Xc, [
                                y(je, {
                                    modelValue: g.value,
                                    "onUpdate:modelValue": G[3] || (G[3] = (S)=>g.value = S),
                                    "max-width": "750px"
                                }, {
                                    activator: v(({ props: S })=>[
                                            y(ot, ke(S, {
                                                variant: "flat",
                                                text: R(e)("torrentDetail.peers.addPeers.title"),
                                                color: "accent"
                                            }), null, 16, [
                                                "text"
                                            ])
                                        ]),
                                    default: v(()=>[
                                            y(Xt, {
                                                title: I.$t("torrentDetail.peers.addPeers.title")
                                            }, {
                                                default: v(()=>[
                                                        y(pe, null, {
                                                            default: v(()=>[
                                                                    y(dn, {
                                                                        modelValue: _.value,
                                                                        "onUpdate:modelValue": G[2] || (G[2] = (S)=>_.value = S),
                                                                        label: R(e)("torrentDetail.peers.addPeers.newPeers"),
                                                                        placeholder: R(e)("torrentDetail.peers.addPeers.newPeersPlaceholder"),
                                                                        hint: R(e)("torrentDetail.peers.addPeers.newPeersHint")
                                                                    }, null, 8, [
                                                                        "modelValue",
                                                                        "label",
                                                                        "placeholder",
                                                                        "hint"
                                                                    ])
                                                                ]),
                                                            _: 1
                                                        }),
                                                        y(Xe, null, {
                                                            default: v(()=>[
                                                                    y(Me),
                                                                    y(ot, {
                                                                        color: "error",
                                                                        onClick: $
                                                                    }, {
                                                                        default: v(()=>[
                                                                                X(V(R(e)("common.cancel")), 1)
                                                                            ]),
                                                                        _: 1
                                                                    }),
                                                                    y(ot, {
                                                                        color: "accent",
                                                                        onClick: B
                                                                    }, {
                                                                        default: v(()=>[
                                                                                X(V(R(e)("common.ok")), 1)
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
    qc = wt({
        __name: "TagsAndCategories",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, e = aa(), s = la(), i = ks();
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
            return (a, l)=>(N(), K(Xt, null, {
                    default: v(()=>[
                            y(pe, null, {
                                default: v(()=>[
                                        y(pt, null, {
                                            default: v(()=>[
                                                    y(it, {
                                                        cols: "12",
                                                        md: "6"
                                                    }, {
                                                        default: v(()=>[
                                                                y(ys, null, {
                                                                    default: v(()=>[
                                                                            y(Wr, null, {
                                                                                default: v(()=>[
                                                                                        X(V(a.$t("torrentDetail.tagsAndCategories.tags")), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            (N(!0), q(kt, null, Gt(R(s).tags, (u)=>(N(), K(qe, {
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
                                                        default: v(()=>[
                                                                y(ys, null, {
                                                                    default: v(()=>[
                                                                            y(Wr, null, {
                                                                                default: v(()=>[
                                                                                        X(V(a.$t("torrentDetail.tagsAndCategories.categories")), 1)
                                                                                    ]),
                                                                                _: 1
                                                                            }),
                                                                            (N(!0), q(kt, null, Gt(R(e).categories, (u)=>(N(), K(qe, {
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
    Kc = {
        class: "mt-2 mx-3 d-flex flex-gap align-center"
    };
    Zc = {
        key: 0
    };
    Qc = {
        key: 0
    };
    Jc = {
        key: 1
    };
    td = {
        class: "d-flex my-3 flex-gap align-center justify-center"
    };
    ed = {
        class: "text-h5"
    };
    sd = wt({
        __name: "Trackers",
        props: {
            torrent: {},
            isActive: {
                type: Boolean
            }
        },
        setup (r) {
            const t = r, { t: e } = ee(), s = ks(), i = ha(), n = [
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
            ], o = rn([
                {
                    key: "tier",
                    order: "asc"
                },
                {
                    key: "url",
                    order: "asc"
                }
            ]), a = mt("");
            function l(U) {
                switch(U){
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
            const u = mt(!1), h = mt(!1), c = mt([]), m = mt(""), d = mt(!1), g = [
                (U)=>!!U || e("torrentDetail.trackers.editTracker.newUrlRequired")
            ], _ = vs({
                isVisible: !1,
                isFormValid: !1,
                oldUrl: "",
                newUrl: ""
            });
            function p(U) {
                _.isVisible = !0, _.oldUrl = U.url, _.newUrl = U.url, He(()=>{
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
            const C = an(function*() {
                yield b();
            }).drop();
            async function A() {
                m.value.length && (await i.addTorrentTrackers(t.torrent.hash, m.value), W(), B());
            }
            function B() {
                d.value = !1, m.value = "";
            }
            async function $() {
                _.isFormValid && (await i.editTorrentTracker(t.torrent.hash, _.oldUrl, _.newUrl), _.isVisible = !1, W());
            }
            async function D(U) {
                await i.removeTorrentTrackers(t.torrent.hash, [
                    U.url
                ]), W();
            }
            async function P() {
                await s.reannounceTorrents([
                    t.torrent.hash
                ]);
            }
            const z = mt(!1), { isActive: O, resume: I, pause: G } = Ss(C.perform, 5e3, {
                immediate: !0,
                immediateCallback: !0
            });
            function S() {
                z.value = !0, G();
            }
            function W() {
                z.value = !1, I();
            }
            return Te(()=>t.isActive, (U)=>{
                U && !z.value ? W() : S();
            }), ts(()=>{
                t.isActive && W();
            }), ws(()=>{
                S();
            }), nn(()=>!d.value && !_.isVisible), (U, et)=>(N(), q(kt, null, [
                    y(Xt, null, {
                        default: v(()=>[
                                !c.value.length && u.value ? (N(), K(ar, {
                                    key: 0,
                                    title: U.$t("torrentDetail.trackers.loading"),
                                    icon: "mdi-web-sync",
                                    color: "accent"
                                }, null, 8, [
                                    "title"
                                ])) : !c.value.length && h.value ? (N(), K(ar, {
                                    key: 1,
                                    title: U.$t("torrentDetail.trackers.error"),
                                    icon: "mdi-web-remove",
                                    color: "error"
                                }, null, 8, [
                                    "title"
                                ])) : (N(), K(cn, {
                                    key: 2,
                                    headers: n,
                                    items: c.value,
                                    "multi-sort": "",
                                    "sort-by": R(o),
                                    search: a.value,
                                    "filter-keys": [
                                        "url",
                                        "msg"
                                    ],
                                    mobile: null
                                }, {
                                    top: v(()=>[
                                            Y("div", Kc, [
                                                y(Qt, {
                                                    modelValue: a.value,
                                                    "onUpdate:modelValue": et[0] || (et[0] = (f)=>a.value = f),
                                                    density: "compact",
                                                    label: U.$t("common.search"),
                                                    "prepend-inner-icon": "mdi-magnify",
                                                    flat: "",
                                                    "hide-details": "",
                                                    "single-line": "",
                                                    clearable: ""
                                                }, null, 8, [
                                                    "modelValue",
                                                    "label"
                                                ]),
                                                y(_s, {
                                                    text: R(O) ? U.$t("common.pause") : U.$t("common.resume"),
                                                    location: "bottom"
                                                }, {
                                                    activator: v(({ props: f })=>[
                                                            y(ot, ke(f, {
                                                                icon: R(O) ? "mdi-timer-pause" : "mdi-timer-play",
                                                                color: "primary",
                                                                onClick: et[1] || (et[1] = (x)=>R(O) ? S() : W())
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
                                    "item.tier": v(({ value: f })=>[
                                            f >= 0 ? (N(), q("span", Zc, V(f), 1)) : Et("", !0)
                                        ]),
                                    "item.status": v(({ value: f })=>[
                                            Y("span", {
                                                class: gs(`tracker-${R(le)[f].toLowerCase()}`)
                                            }, V(l(f)), 3)
                                        ]),
                                    "item.msg": v(({ value: f })=>[
                                            f ? (N(), q("span", Jc, V(f), 1)) : (N(), q("span", Qc, V(U.$t("common.NA")), 1))
                                        ]),
                                    "item.actions": v(({ item: f })=>[
                                            f.tier !== -1 ? (N(), q(kt, {
                                                key: 0
                                            }, [
                                                y(ot, {
                                                    icon: "mdi-pencil",
                                                    variant: "text",
                                                    onClick: (x)=>p(f)
                                                }, null, 8, [
                                                    "onClick"
                                                ]),
                                                y(ot, {
                                                    color: "red",
                                                    icon: "mdi-delete",
                                                    variant: "text",
                                                    onClick: (x)=>D(f)
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
                                Y("div", td, [
                                    y(je, {
                                        modelValue: d.value,
                                        "onUpdate:modelValue": et[3] || (et[3] = (f)=>d.value = f),
                                        "max-width": "750px"
                                    }, {
                                        activator: v(({ props: f })=>[
                                                y(ot, ke(f, {
                                                    variant: "flat",
                                                    text: R(e)("torrentDetail.trackers.addTrackers.title"),
                                                    color: "accent"
                                                }), null, 16, [
                                                    "text"
                                                ])
                                            ]),
                                        default: v(()=>[
                                                y(Xt, {
                                                    title: U.$t("torrentDetail.trackers.addTrackers.title")
                                                }, {
                                                    default: v(()=>[
                                                            y(pe, null, {
                                                                default: v(()=>[
                                                                        y(dn, {
                                                                            modelValue: m.value,
                                                                            "onUpdate:modelValue": et[2] || (et[2] = (f)=>m.value = f),
                                                                            label: R(e)("torrentDetail.trackers.addTrackers.newTrackers"),
                                                                            hint: R(e)("torrentDetail.trackers.addTrackers.newTrackersHint")
                                                                        }, null, 8, [
                                                                            "modelValue",
                                                                            "label",
                                                                            "hint"
                                                                        ])
                                                                    ]),
                                                                _: 1
                                                            }),
                                                            y(Xe, null, {
                                                                default: v(()=>[
                                                                        y(Me),
                                                                        y(ot, {
                                                                            color: "error",
                                                                            onClick: B
                                                                        }, {
                                                                            default: v(()=>[
                                                                                    X(V(R(e)("common.cancel")), 1)
                                                                                ]),
                                                                            _: 1
                                                                        }),
                                                                        y(ot, {
                                                                            color: "accent",
                                                                            onClick: A
                                                                        }, {
                                                                            default: v(()=>[
                                                                                    X(V(R(e)("common.ok")), 1)
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
                                        text: R(e)("torrentDetail.trackers.reannounce"),
                                        color: "primary",
                                        onClick: P
                                    }, null, 8, [
                                        "disabled",
                                        "text"
                                    ])
                                ])
                            ]),
                        _: 1
                    }),
                    y(je, {
                        modelValue: _.isVisible,
                        "onUpdate:modelValue": et[8] || (et[8] = (f)=>_.isVisible = f),
                        "max-width": "750px"
                    }, {
                        default: v(()=>[
                                y(Xt, null, {
                                    default: v(()=>[
                                            y(As, null, {
                                                default: v(()=>[
                                                        Y("span", ed, V(R(e)("torrentDetail.trackers.editTracker.title")), 1)
                                                    ]),
                                                _: 1
                                            }),
                                            y(pe, null, {
                                                default: v(()=>[
                                                        y(hn, {
                                                            modelValue: _.isFormValid,
                                                            "onUpdate:modelValue": et[5] || (et[5] = (f)=>_.isFormValid = f),
                                                            onSubmit: et[6] || (et[6] = Ye(()=>{}, [
                                                                "prevent"
                                                            ]))
                                                        }, {
                                                            default: v(()=>[
                                                                    y(Qt, {
                                                                        "model-value": _.oldUrl,
                                                                        disabled: "",
                                                                        label: U.$t("torrentDetail.trackers.editTracker.oldUrl")
                                                                    }, null, 8, [
                                                                        "model-value",
                                                                        "label"
                                                                    ]),
                                                                    y(Qt, {
                                                                        modelValue: _.newUrl,
                                                                        "onUpdate:modelValue": et[4] || (et[4] = (f)=>_.newUrl = f),
                                                                        id: "input",
                                                                        rules: g,
                                                                        label: U.$t("torrentDetail.trackers.editTracker.newUrl"),
                                                                        autofocus: "",
                                                                        onKeydown: tn($, [
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
                                            y(Xe, null, {
                                                default: v(()=>[
                                                        y(Me),
                                                        y(ot, {
                                                            color: "error",
                                                            disabled: !_.isFormValid,
                                                            onClick: et[7] || (et[7] = (f)=>_.isVisible = !1)
                                                        }, {
                                                            default: v(()=>[
                                                                    X(V(R(e)("common.cancel")), 1)
                                                                ]),
                                                            _: 1
                                                        }, 8, [
                                                            "disabled"
                                                        ]),
                                                        y(ot, {
                                                            color: "accent",
                                                            onClick: $
                                                        }, {
                                                            default: v(()=>[
                                                                    X(V(R(e)("common.ok")), 1)
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
    rd = Ts(sd, [
        [
            "__scopeId",
            "data-v-c5792b64"
        ]
    ]);
    id = {
        class: "pa-3 text-select"
    };
    nd = {
        style: {
            "font-size": "1.6em !important"
        },
        class: "subtitle-1 ml-2"
    };
    od = {
        class: "d-flex justify-end"
    };
    ad = wt({
        __name: "TorrentDetail",
        setup (r) {
            const t = Vo(), { t: e } = ee(), s = _e(), i = Cs(), n = ua(), o = ks(), a = se(), { tab: l } = xt(a), u = [
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
            ], h = Z(()=>t.currentRoute.value.params.hash), c = Z(()=>o.getTorrentIndexByHash(h.value)), m = Z(()=>o.getTorrentByHash(h.value)), d = Z(()=>c.value === 0), g = Z(()=>c.value === o.processedTorrents.length - 1);
            function _(P) {
                t.push({
                    name: "torrentDetail",
                    params: {
                        hash: o.processedTorrents[P].hash
                    }
                }).then((z)=>!z && n.forceReload());
            }
            function p() {
                _(0);
            }
            function b() {
                _(c.value - 1);
            }
            function C() {
                _(c.value + 1);
            }
            function A() {
                _(o.processedTorrents.length - 1);
            }
            function B() {
                t.push({
                    name: "dashboard"
                });
            }
            function $(P) {
                if (i.hasActiveDialog) return !1;
                P.key === "Escape" && B();
            }
            function D() {
                const P = t.currentRoute.value.params.tab;
                P && (l.value = P);
            }
            return Te(t.currentRoute, D, {
                immediate: !0
            }), Te(m, ()=>{
                a.fetchProperties(h.value);
            }), ts(()=>{
                document.addEventListener("keydown", $), a.fetchProperties(h.value), s.updateFileTreeTask.perform();
            }), ws(()=>{
                document.removeEventListener("keydown", $), a.$reset();
            }), (P, z)=>(N(), q(kt, null, [
                    Y("div", id, [
                        y(pt, {
                            "no-gutters": "",
                            align: "center",
                            justify: "center"
                        }, {
                            default: v(()=>[
                                    y(it, null, {
                                        default: v(()=>[
                                                Y("h1", nd, V(R(e)("torrentDetail.title")), 1)
                                            ]),
                                        _: 1
                                    }),
                                    y(it, null, {
                                        default: v(()=>[
                                                Y("div", od, [
                                                    y(ot, {
                                                        icon: "mdi-skip-previous",
                                                        disabled: d.value,
                                                        variant: "plain",
                                                        onClick: p
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
                                                        onClick: C
                                                    }, null, 8, [
                                                        "disabled"
                                                    ]),
                                                    y(ot, {
                                                        icon: "mdi-skip-next",
                                                        disabled: g.value,
                                                        variant: "plain",
                                                        onClick: A
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
                            default: v(()=>[
                                    y(ca, {
                                        modelValue: R(l),
                                        "onUpdate:modelValue": z[0] || (z[0] = (O)=>We(l) ? l.value = O : null),
                                        "bg-color": "primary",
                                        grow: "",
                                        "show-arrows": ""
                                    }, {
                                        default: v(()=>[
                                                (N(), q(kt, null, Gt(u, ({ text: O, value: I })=>y(da, {
                                                        value: I,
                                                        text: O,
                                                        replace: "",
                                                        to: {
                                                            name: "torrentDetail",
                                                            params: {
                                                                hash: h.value,
                                                                tab: I
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
                        m.value ? (N(), K(fa, {
                            key: 0,
                            modelValue: R(l),
                            "onUpdate:modelValue": z[1] || (z[1] = (O)=>We(l) ? l.value = O : null),
                            touch: !1
                        }, {
                            default: v(()=>[
                                    y(be, {
                                        value: "overview"
                                    }, {
                                        default: v(()=>[
                                                y(Ec, {
                                                    torrent: m.value,
                                                    "is-active": R(l) === "overview"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(be, {
                                        value: "info"
                                    }, {
                                        default: v(()=>[
                                                y(Ua, {
                                                    torrent: m.value,
                                                    "is-active": R(l) === "info"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(be, {
                                        value: "trackers"
                                    }, {
                                        default: v(()=>[
                                                y(rd, {
                                                    torrent: m.value,
                                                    "is-active": R(l) === "trackers"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(be, {
                                        value: "peers"
                                    }, {
                                        default: v(()=>[
                                                y(jc, {
                                                    torrent: m.value,
                                                    "is-active": R(l) === "peers"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(be, {
                                        value: "content"
                                    }, {
                                        default: v(()=>[
                                                y(R(Ia), {
                                                    torrent: m.value,
                                                    "is-active": R(l) === "content"
                                                }, null, 8, [
                                                    "torrent",
                                                    "is-active"
                                                ])
                                            ]),
                                        _: 1
                                    }),
                                    y(be, {
                                        value: "tagsAndCategories"
                                    }, {
                                        default: v(()=>[
                                                y(qc, {
                                                    torrent: m.value,
                                                    "is-active": R(l) === "tagsAndCategories"
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
                        style: en(`position: absolute; left: ${R(s).rightClickProperties.offset[0]}px; top: ${R(s).rightClickProperties.offset[1]}px;`)
                    }, [
                        y(R(Io), {
                            modelValue: R(s).rightClickProperties.isVisible,
                            "onUpdate:modelValue": z[2] || (z[2] = (O)=>R(s).rightClickProperties.isVisible = O),
                            "menu-data": R(s).menuData
                        }, null, 8, [
                            "modelValue",
                            "menu-data"
                        ])
                    ], 4)
                ], 64));
        }
    });
    fd = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: ad
    }, Symbol.toStringTag, {
        value: "Module"
    }));
});
export { $l as $, io as A, Pt as B, ye as C, ne as D, ht as E, Jt as F, Ms as G, An as H, zt as I, Fl as J, hi as K, Ke as L, tt as M, ah as N, gh as O, At as P, _t as Q, _r as R, zh as S, ns as T, pr as U, vt as V, bh as W, ci as X, Hs as Y, fi as Z, xa as _, re as a, Ft as a0, Pn as a1, no as a2, ct as a3, yt as a4, Ah as a5, Xh as a6, du as a7, pu as a8, xu as a9, vu as aa, wu as ab, Ge as ac, Oe as ad, Zi as ae, Is as af, kh as ag, xs as ah, Ae as ai, bo as aj, Mi as ak, ki as al, rl as am, bs as an, nl as ao, Co as ap, fd as aq, $h as b, Qe as c, ps as d, Vt as e, Pi as f, ya as g, Ir as h, eo as i, Nn as j, qt as k, to as l, cu as m, Zr as n, fu as o, _u as p, bu as q, yl as r, ho as s, Rr as t, _e as u, ut as v, Dt as w, Kn as x, il as y, Su as z, __tla };

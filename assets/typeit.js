// TypeIt by Alex MacArthur - https://typeitjs.com
(function($, k) {
  typeof exports == "object" && typeof module != "undefined" ? module.exports = k() : typeof define == "function" && define.amd ? define(k) : ($ = typeof globalThis != "undefined" ? globalThis : $ || self,
  $.TypeIt = k())
}
)(this, function() {
  "use strict";
  const $ = [null, null, {}];
  var k = e=>e.map(n=>$.map((r,s)=>n[s] ? n[s] : r))
    , D = (e,n)=>Object.assign({}, e, n);
  const de = function(e) {
      const n = function(u) {
          return f = f.concat(k(u)),
          this
      }
        , r = function(u, h) {
          f[u] = h
      }
        , s = function() {
          f = f.map(u=>(u[2].executed = !1,
          u))
      }
        , i = function() {
          return f.filter(u=>!u[2].executed)
      }
        , y = function(u, h) {
          f[u][2] = D(f[u][2], h)
      };
      let f = [];
      return n(e),
      {
          add: n,
          set: r,
          reset: s,
          getItems: i,
          setMeta: y
      }
  };
  var x = e=>Array.from(e)
    , J = e=>{
      let n = document.implementation.createHTMLDocument();
      return n.body.innerHTML = e,
      n.body
  }
    , fe = e=>e.nodeType === 3 || e.tagName === "BR";
  const N = (e,n=null,r=!1)=>{
      let s = x(e.childNodes).flatMap(i=>fe(i) ? i : N(i));
      return n && (s = s.filter(i=>!n.contains(i))),
      r ? s.reverse() : s
  }
    , pe = e=>N(e).flatMap(r=>r.nodeValue ? x(r.nodeValue).map(s=>P(s, r)) : P(r))
    , P = (e,n=null)=>({
      node: n,
      content: e
  });
  function X(e) {
      let n = J(e);
      return pe(n)
  }
  function Z(e, n=!0) {
      return n ? X(e) : x(e).map(r=>P(r))
  }
  var H = e=>document.createElement(e)
    , U = e=>document.createTextNode(e)
    , ee = (e,n="")=>{
      let r = H("style");
      r.id = n,
      r.appendChild(U(e)),
      document.head.appendChild(r)
  }
    , te = e=>Array.isArray(e)
    , he = e=>te(e) ? e : [e];
  const ne = e=>Number.isInteger(e)
    , C = (e,n=document,r=!1)=>n[`querySelector${r ? "All" : ""}`](e)
    , re = "data-typeit-id"
    , B = "ti-cursor"
    , F = "START"
    , ye = "END"
    , me = {
      started: !1,
      completed: !1,
      frozen: !1,
      destroyed: !1
  }
    , ge = {
      breakLines: !0,
      cursor: !0,
      cursorChar: "|",
      cursorSpeed: 1e3,
      deleteSpeed: null,
      html: !0,
      lifeLike: !0,
      loop: !1,
      loopDelay: 750,
      nextStringDelay: 750,
      speed: 100,
      startDelay: 250,
      startDelete: !1,
      strings: [],
      waitUntilVisible: !1,
      beforeString: ()=>{}
      ,
      afterString: ()=>{}
      ,
      beforeStep: ()=>{}
      ,
      afterStep: ()=>{}
      ,
      afterComplete: ()=>{}
  }
    , be = (e,n,r=F)=>{
      let s = new RegExp(ye,"i").test(r)
        , i = C(`.${B}`, n)
        , y = e ? C(e, n) : n
        , f = N(y, i, !0)
        , u = f[0]
        , h = f[f.length - 1]
        , _ = s && !e ? 0 : N(n, i, !0).findIndex(S=>S.isSameNode(s ? u : h));
      return s && _--,
      _ + 1
  }
  ;
  var oe = ({el: e, move: n, cursorPos: r, to: s})=>ne(n) ? n * -1 : be(n, e, s) - r
    , se = e=>(te(e) || (e = [e / 2, e / 2]),
  e)
    , ie = (e,n)=>Math.abs(Math.random() * (e + n - (e - n)) + (e - n));
  let le = e=>e / 2;
  function Se(e) {
      let {speed: n, deleteSpeed: r, lifeLike: s} = e;
      return r = r !== null ? r : n / 3,
      s ? [ie(n, le(n)), ie(r, le(r))] : [n, r]
  }
  var ve = e=>(e.forEach(n=>clearTimeout(n)),
  [])
    , Te = ()=>Math.random().toString().substring(2, 9)
    , O = e=>"value"in e;
  const _e = e=>O(e) ? x(e.value) : N(e, C(`.${B}`, e), !0);
  var we = (e,n)=>{
      new IntersectionObserver((s,i)=>{
          s.forEach(y=>{
              y.isIntersecting && (n(),
              i.unobserve(e))
          }
          )
      }
      ,{
          threshold: 1
      }).observe(e)
  }
  ;
  const E = e=>typeof e == "function" ? e() : e;
  var V = e=>e.tagName === "BODY";
  const j = (e,n)=>{
      let r = x(C("*", n, !0));
      return [n].concat(r.reverse()).find(s=>s.cloneNode().isEqualNode(e.cloneNode()))
  }
    , Ne = (e,n)=>{
      let r = e.nextSibling;
      return !r || r.isEqualNode(n)
  }
    , ue = (e,n,r,s)=>{
      let i = n.content instanceof HTMLElement
        , y = n.node
        , f = y == null ? void 0 : y.parentNode
        , u = i ? n.content : U(n.content);
      if (O(e)) {
          e.value = `${e.value}${n.content}`;
          return
      }
      if (!i && f && !V(f)) {
          let _ = j(f, e);
          if (_ && Ne(_, r))
              e = _;
          else {
              u = f.cloneNode(),
              u.appendChild(U(n.content));
              let S = f.parentNode
                , A = S.cloneNode();
              if (!V(S)) {
                  let M = j(A, e);
                  for (; !M && !V(S); ) {
                      let Q = A;
                      Q.innerHTML = u.outerHTML,
                      u = Q,
                      S = S.parentNode,
                      A = S.cloneNode(),
                      M = j(A, e)
                  }
                  e = M || e
              }
          }
      }
      let h = N(e, r, !0)[s - 1]
        , b = h ? h.parentNode : e;
      b.insertBefore(u, b.contains(r) ? r : null)
  }
    , Ce = (e,n,r)=>Math.min(Math.max(n + e, 0), r.length);
  var z = e=>e && e.remove()
    , Ee = (e,n)=>{
      C("*", e, !0).forEach(r=>{
          if (!r.innerHTML && r.tagName !== "BR" && !r.isSameNode(n)) {
              let s = r;
              for (; s.parentElement.childNodes.length === 1; )
                  s = s.parentElement;
              z(s)
          }
      }
      )
  }
    , Ae = (e,n,r,s)=>{
      let i = n[s - 1];
      e = (i == null ? void 0 : i.parentNode) || e,
      e.insertBefore(r, i || null)
  }
  ;
  function Me(e) {
      return typeof e == "string" ? C(e) : e
  }
  const Ie = async(e,n,r)=>new Promise(s=>{
      const i = async()=>{
          await e(),
          s()
      }
      ;
      r.push(setTimeout(i, n))
  }
  )
    , Le = {
      "font-family": "",
      "font-weight": "",
      "font-size": "",
      "font-style": "",
      "line-height": "",
      color: "",
      "margin-left": "-.125em",
      "margin-right": ".125em"
  }
    , $e = (e,n,r)=>{
      let i = `${`[${re}='${e}']`} .${B}`
        , y = getComputedStyle(r)
        , f = Object.entries(Le).reduce((u,[h,b])=>`${u} ${h}: var(--ti-cursor-${h}, ${b || y[h]});`, "");
      ee(`@keyframes blink-${e} { 0% {opacity: 0} 49% {opacity: 0} 50% {opacity: 1} } ${i} { display: inline; letter-spacing: -1em; ${f} animation: blink-${e} ${n.cursorSpeed / 1e3}s infinite; } ${i}.with-delay { animation-delay: 500ms; } ${i}.disabled { animation: none; }`, e)
  }
  ;
  function ke(e, n={}) {
      const r = async(t,o,a=!1)=>{
          v.frozen && await new Promise(c=>{
              this.unfreeze = ()=>{
                  v.frozen = !1,
                  c()
              }
          }
          ),
          a || await l.beforeStep(this),
          await Ie(t, o, Y),
          a || await l.afterStep(this)
      }
        , s = ()=>O(p)
        , i = t=>Se(l)[t]
        , y = (t,o=0)=>t ? i(o) : 0
        , f = (t={})=>{
          let o = t.delay;
          o && T.add([[I, o]])
      }
        , u = (t,o)=>(T.add(t),
      f(o),
      this)
        , h = ()=>_e(p)
        , b = (t={})=>[[W, t], [W, l]]
        , _ = t=>{
          let o = l.nextStringDelay;
          T.add([[I, o[0]], ...t, [I, o[1]]])
      }
        , S = ()=>{
          if (s())
              return;
          let t = H("span");
          return t.className = B,
          G ? (t.innerHTML = J(l.cursorChar).innerHTML,
          t) : (t.style.visibility = "hidden",
          t)
      }
        , A = async()=>{
          !s() && p.appendChild(w),
          !!G && $e(ce, l, p)
      }
        , M = t=>{
          G && (w.classList.toggle("disabled", t),
          w.classList.toggle("with-delay", !t))
      }
        , Q = ()=>{
          let t = l.strings.filter(o=>!!o);
          t.forEach((o,a)=>{
              let c = Z(o, l.html);
              if (T.add([[q, {
                  chars: c
              }, L]]),
              a + 1 === t.length)
                  return;
              const d = l.breakLines ? [[q, {
                  chars: [P(H("BR"))],
                  silent: !0
              }, L]] : [[R, {
                  num: c.length
              }, L]];
              _(d)
          }
          )
      }
        , De = async t=>{
          g && await ae({
              value: g
          }),
          T.reset(),
          T.set(0, [I, t, {}]),
          await R({
              num: null
          })
      }
        , xe = t=>{
          let o = p.innerHTML;
          return o ? (p.innerHTML = "",
          l.startDelete ? (X(o).forEach(c=>{
              ue(p, c, w, g)
          }
          ),
          _([[R, {
              num: null
          }]]),
          t) : o.trim().split(/<br(?:\s*?)(?:\/)?>/).concat(t)) : t
      }
        , K = async()=>{
          v.started = !0;
          let t = T.getItems();
          try {
              for (let a = 0; a < t.length; a++) {
                  let c = t[a]
                    , d = c[2];
                  d.freezeCursor && M(!0),
                  await c[0].call(this, c[1], d),
                  T.setMeta(a, {
                      executed: !0
                  }),
                  M(!1)
              }
              if (v.completed = !0,
              await l.afterComplete(this),
              !l.loop)
                  throw "";
              let o = l.loopDelay;
              r(async()=>{
                  await De(o[0]),
                  K()
              }
              , o[1])
          } catch {}
          return this
      }
        , I = (t=0)=>r(()=>{}
      , t)
        , ae = async({value: t, to: o=F, instant: a=!1})=>{
          let c = oe({
              el: p,
              move: t,
              cursorPos: g,
              to: o
          })
            , d = ()=>{
              g = Ce(c < 0 ? -1 : 1, g, h()),
              Ae(p, h(), w, g)
          }
          ;
          await r(async()=>{
              for (let m = 0; m < Math.abs(c); m++)
                  a ? d() : await r(d, i(0))
          }
          , y(a))
      }
        , q = ({chars: t, instant: o, silent: a})=>r(async()=>{
          const c = d=>ue(p, d, w, g);
          a || await l.beforeString(t, this);
          for (let d = 0; d < t.length; d++)
              o ? c(t[d]) : await r(()=>{
                  c(t[d])
              }
              , i(0));
          a || await l.afterString(t, this)
      }
      , y(o), !0)
        , W = async t=>{
          l = D(l, t)
      }
        , Pe = async()=>{
          if (s()) {
              p.value = "";
              return
          }
          h().forEach(t=>{
              z(t)
          }
          )
      }
        , R = async({num: t=null, instant: o=!1, to: a=F})=>{
          await r(async()=>{
              let c = ne(t) ? t : oe({
                  el: p,
                  move: t,
                  cursorPos: g,
                  to: a
              });
              const d = ()=>{
                  let m = h();
                  !m.length || (s() ? p.value = p.value.slice(0, -1) : (z(m[g]),
                  Ee(p, w)))
              }
              ;
              for (let m = 0; m < c; m++)
                  o ? d() : await r(d, i(1))
          }
          , y(o, 1)),
          t === null && h().length - 1 > 0 && await R({
              num: null
          })
      }
      ;
      this.break = function(t) {
          const o = P(H("BR"));
          return u([[q, {
              chars: [o],
              silent: !0
          }]], t)
      }
      ,
      this.delete = function(t=null, o={}) {
          t = E(t);
          let a = b(o)
            , c = t
            , {instant: d, to: m} = o;
          return u([a[0], [R, {
              num: c,
              instant: d,
              to: m
          }, L], a[1]], o)
      }
      ,
      this.empty = function(t={}) {
          return u([[Pe]], t)
      }
      ,
      this.exec = function(t, o) {
          let a = b(o);
          return u([a[0], [t, null], a[1]], o)
      }
      ,
      this.move = function(t, o={}) {
          t = E(t);
          let a = b(o)
            , {instant: c, to: d} = o
            , m = {
              value: t === null ? "" : t,
              to: d,
              instant: c
          };
          return u([a[0], [ae, m, L], a[1]], o)
      }
      ,
      this.options = function(t) {
          return t = E(t),
          u([[W, t]], t)
      }
      ,
      this.pause = function(t, o={}) {
          return u([[I, E(t)]], o)
      }
      ,
      this.type = function(t, o={}) {
          t = E(t);
          let a = b(o)
            , c = Z(t, l.html)
            , {instant: d} = o
            , m = [a[0], [q, {
              chars: c,
              instant: d
          }, L], a[1]];
          return u(m, o)
      }
      ,
      this.is = function(t) {
          return v[t]
      }
      ,
      this.destroy = function(t=!0) {
          Y = ve(Y),
          E(t) && z(w),
          v.destroyed = !0
      }
      ,
      this.freeze = function() {
          v.frozen = !0
      }
      ,
      this.unfreeze = function() {}
      ,
      this.reset = function() {
          !this.is("destroyed") && this.destroy(),
          T.reset(),
          g = 0;
          for (let t in v)
              v[t] = !1;
          return p[s() ? "value" : "innerHTML"] = "",
          this
      }
      ,
      this.go = function() {
          return v.started ? this : (A(),
          l.waitUntilVisible ? (we(p, K.bind(this)),
          this) : (K(),
          this))
      }
      ,
      this.getQueue = function() {
          return T
      }
      ,
      this.getOptions = function() {
          return l
      }
      ,
      this.getElement = function() {
          return p
      }
      ;
      let p = Me(e)
        , Y = []
        , g = 0
        , L = {
          freezeCursor: !0
      }
        , v = D({}, me)
        , l = D(ge, n);
      l = D(l, {
          html: !s() && l.html,
          nextStringDelay: se(l.nextStringDelay),
          loopDelay: se(l.loopDelay)
      });
      let ce = Te()
        , T = de([[I, l.startDelay]]);
      p.dataset.typeitId = ce,
      ee(`[${re}]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}`);
      let G = l.cursor && !s()
        , w = S();
      l.strings = xe(he(l.strings)),
      l.strings.length && Q()
  }
  return ke
});

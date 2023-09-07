"use strict";
(self.webpackChunkteo_ilie = self.webpackChunkteo_ilie || []).push([
  [179],
  {
    9: () => {
      function J(e) {
        return "function" == typeof e;
      }
      function so(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Ti = so(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          },
      );
      function ao(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class Ke {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (J(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Ti ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  tf(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Ti ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Ti(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) tf(t);
            else {
              if (t instanceof Ke) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t,
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && ao(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && ao(n, t), t instanceof Ke && t._removeParent(this);
        }
      }
      Ke.EMPTY = (() => {
        const e = new Ke();
        return (e.closed = !0), e;
      })();
      const Jd = Ke.EMPTY;
      function ef(e) {
        return (
          e instanceof Ke ||
          (e && "closed" in e && J(e.remove) && J(e.add) && J(e.unsubscribe))
        );
      }
      function tf(e) {
        J(e) ? e() : e.unsubscribe();
      }
      const Sn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Ai = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Ai;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Ai;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function nf(e) {
        Ai.setTimeout(() => {
          const { onUnhandledError: t } = Sn;
          if (!t) throw e;
          t(e);
        });
      }
      function qa() {}
      const _w = Wa("C", void 0, void 0);
      function Wa(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Tn = null;
      function Ni(e) {
        if (Sn.useDeprecatedSynchronousErrorHandling) {
          const t = !Tn;
          if ((t && (Tn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Tn;
            if (((Tn = null), n)) throw r;
          }
        } else e();
      }
      class Za extends Ke {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), ef(t) && t.add(this))
              : (this.destination = Aw);
        }
        static create(t, n, r) {
          return new uo(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Ya(
                (function Iw(e) {
                  return Wa("N", e, void 0);
                })(t),
                this,
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Ya(
                (function Ew(e) {
                  return Wa("E", void 0, e);
                })(t),
                this,
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Ya(_w, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Mw = Function.prototype.bind;
      function Qa(e, t) {
        return Mw.call(e, t);
      }
      class Sw {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Ri(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Ri(r);
            }
          else Ri(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Ri(n);
            }
        }
      }
      class uo extends Za {
        constructor(t, n, r) {
          let o;
          if ((super(), J(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Sn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Qa(t.next, i),
                  error: t.error && Qa(t.error, i),
                  complete: t.complete && Qa(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new Sw(o);
        }
      }
      function Ri(e) {
        Sn.useDeprecatedSynchronousErrorHandling
          ? (function bw(e) {
              Sn.useDeprecatedSynchronousErrorHandling &&
                Tn &&
                ((Tn.errorThrown = !0), (Tn.error = e));
            })(e)
          : nf(e);
      }
      function Ya(e, t) {
        const { onStoppedNotification: n } = Sn;
        n && Ai.setTimeout(() => n(e, t));
      }
      const Aw = {
          closed: !0,
          next: qa,
          error: function Tw(e) {
            throw e;
          },
          complete: qa,
        },
        Ka =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function sn(e) {
        return e;
      }
      function rf(e) {
        return 0 === e.length
          ? sn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let ve = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function xw(e) {
              return (
                (e && e instanceof Za) ||
                ((function Rw(e) {
                  return e && J(e.next) && J(e.error) && J(e.complete);
                })(e) &&
                  ef(e))
              );
            })(n)
              ? n
              : new uo(n, r, o);
            return (
              Ni(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i),
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = sf(r))((o, i) => {
              const s = new uo({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Ka]() {
            return this;
          }
          pipe(...n) {
            return rf(n)(this);
          }
          toPromise(n) {
            return new (n = sf(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i),
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function sf(e) {
        var t;
        return null !== (t = e ?? Sn.Promise) && void 0 !== t ? t : Promise;
      }
      const Ow = so(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          },
      );
      let mt = (() => {
        class e extends ve {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new af(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Ow();
          }
          next(n) {
            Ni(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Ni(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Ni(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? Jd
              : ((this.currentObservers = null),
                i.push(n),
                new Ke(() => {
                  (this.currentObservers = null), ao(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new ve();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new af(t, n)), e;
      })();
      class af extends mt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Jd;
        }
      }
      function uf(e) {
        return J(e?.lift);
      }
      function ye(e) {
        return (t) => {
          if (uf(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function De(e, t, n, r, o) {
        return new Pw(e, t, n, r, o);
      }
      class Pw extends Za {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function te(e, t) {
        return ye((n, r) => {
          let o = 0;
          n.subscribe(
            De(r, (i) => {
              r.next(e.call(t, i, o++));
            }),
          );
        });
      }
      function an(e) {
        return this instanceof an ? ((this.v = e), this) : new an(e);
      }
      function ff(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function tu(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (c) {
                    i({ value: c, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const hf = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function pf(e) {
        return J(e?.then);
      }
      function gf(e) {
        return J(e[Ka]);
      }
      function mf(e) {
        return Symbol.asyncIterator && J(e?.[Symbol.asyncIterator]);
      }
      function vf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
        );
      }
      const yf = (function nC() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Df(e) {
        return J(e?.[yf]);
      }
      function wf(e) {
        return (function df(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof an
                  ? Promise.resolve(f.value.v).then(c, l)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function c(f) {
            a("next", f);
          }
          function l(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield an(n.read());
              if (o) return yield an(void 0);
              yield yield an(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Cf(e) {
        return J(e?.getReader);
      }
      function ot(e) {
        if (e instanceof ve) return e;
        if (null != e) {
          if (gf(e))
            return (function rC(e) {
              return new ve((t) => {
                const n = e[Ka]();
                if (J(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable",
                );
              });
            })(e);
          if (hf(e))
            return (function oC(e) {
              return new ve((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (pf(e))
            return (function iC(e) {
              return new ve((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n),
                ).then(null, nf);
              });
            })(e);
          if (mf(e)) return _f(e);
          if (Df(e))
            return (function sC(e) {
              return new ve((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Cf(e))
            return (function aC(e) {
              return _f(wf(e));
            })(e);
        }
        throw vf(e);
      }
      function _f(e) {
        return new ve((t) => {
          (function uC(e, t) {
            var n, r, o, i;
            return (function cf(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(l) {
                  try {
                    c(r.next(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(l) {
                  try {
                    c(r.throw(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(l) {
                  l.done
                    ? i(l.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(l.value).then(a, u);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = ff(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Bt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Ee(e, t, n = 1 / 0) {
        return J(t)
          ? Ee((r, o) => te((i, s) => t(r, i, o, s))(ot(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            ye((r, o) =>
              (function cC(e, t, n, r, o, i, s, a) {
                const u = [];
                let c = 0,
                  l = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !c && t.complete();
                  },
                  h = (g) => (c < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), c++;
                    let y = !1;
                    ot(n(g, l++)).subscribe(
                      De(
                        t,
                        (D) => {
                          o?.(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (c--; u.length && c < r; ) {
                                const D = u.shift();
                                s ? Bt(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        },
                      ),
                    );
                  };
                return (
                  e.subscribe(
                    De(t, h, () => {
                      (d = !0), f();
                    }),
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n),
            ));
      }
      function Xn(e = 1 / 0) {
        return Ee(sn, e);
      }
      const St = new ve((e) => e.complete());
      function nu(e) {
        return e[e.length - 1];
      }
      function co(e) {
        return (function dC(e) {
          return e && J(e.schedule);
        })(nu(e))
          ? e.pop()
          : void 0;
      }
      function Ef(e, t = 0) {
        return ye((n, r) => {
          n.subscribe(
            De(
              r,
              (o) => Bt(r, e, () => r.next(o), t),
              () => Bt(r, e, () => r.complete(), t),
              (o) => Bt(r, e, () => r.error(o), t),
            ),
          );
        });
      }
      function If(e, t = 0) {
        return ye((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function bf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ve((n) => {
          Bt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Bt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0,
            );
          });
        });
      }
      function Ie(e, t) {
        return t
          ? (function DC(e, t) {
              if (null != e) {
                if (gf(e))
                  return (function pC(e, t) {
                    return ot(e).pipe(If(t), Ef(t));
                  })(e, t);
                if (hf(e))
                  return (function mC(e, t) {
                    return new ve((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (pf(e))
                  return (function gC(e, t) {
                    return ot(e).pipe(If(t), Ef(t));
                  })(e, t);
                if (mf(e)) return bf(e, t);
                if (Df(e))
                  return (function vC(e, t) {
                    return new ve((n) => {
                      let r;
                      return (
                        Bt(n, t, () => {
                          (r = e[yf]()),
                            Bt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0,
                            );
                        }),
                        () => J(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Cf(e))
                  return (function yC(e, t) {
                    return bf(wf(e), t);
                  })(e, t);
              }
              throw vf(e);
            })(e, t)
          : ot(e);
      }
      class it extends mt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function P(...e) {
        return Ie(e, co(e));
      }
      function Mf(e = {}) {
        const {
          connector: t = () => new mt(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            u,
            c = 0,
            l = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = u = void 0), (l = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return ye((g, y) => {
            c++, !d && !l && f();
            const D = (u = u ?? t());
            y.add(() => {
              c--, 0 === c && !d && !l && (a = ru(p, o));
            }),
              D.subscribe(y),
              !s &&
                c > 0 &&
                ((s = new uo({
                  next: (m) => D.next(m),
                  error: (m) => {
                    (d = !0), f(), (a = ru(h, n, m)), D.error(m);
                  },
                  complete: () => {
                    (l = !0), f(), (a = ru(h, r)), D.complete();
                  },
                })),
                ot(g).subscribe(s));
          })(i);
        };
      }
      function ru(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new uo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return ot(t(...n)).subscribe(r);
      }
      function Tt(e, t) {
        return ye((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            De(
              r,
              (u) => {
                o?.unsubscribe();
                let c = 0;
                const l = i++;
                ot(e(u, l)).subscribe(
                  (o = De(
                    r,
                    (d) => r.next(t ? t(u, d, l, c++) : d),
                    () => {
                      (o = null), a();
                    },
                  )),
                );
              },
              () => {
                (s = !0), a();
              },
            ),
          );
        });
      }
      function _C(e, t) {
        return e === t;
      }
      function K(e) {
        for (let t in e) if (e[t] === K) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function we(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(we).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function ou(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const EC = K({ __forward_ref__: K });
      function iu(e) {
        return (
          (e.__forward_ref__ = iu),
          (e.toString = function () {
            return we(this());
          }),
          e
        );
      }
      function O(e) {
        return su(e) ? e() : e;
      }
      function su(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(EC) &&
          e.__forward_ref__ === iu
        );
      }
      function au(e) {
        return e && !!e.ɵproviders;
      }
      class w extends Error {
        constructor(t, n) {
          super(
            (function Oi(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n),
          ),
            (this.code = t);
        }
      }
      function F(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function uu(e, t) {
        throw new w(-201, !1);
      }
      function st(e, t) {
        null == e &&
          (function N(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`),
            );
          })(t, e, null, "!=");
      }
      function T(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function un(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Pi(e) {
        return Tf(e, ki) || Tf(e, Af);
      }
      function Tf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Fi(e) {
        return e && (e.hasOwnProperty(cu) || e.hasOwnProperty(RC))
          ? e[cu]
          : null;
      }
      const ki = K({ ɵprov: K }),
        cu = K({ ɵinj: K }),
        Af = K({ ngInjectableDef: K }),
        RC = K({ ngInjectorDef: K });
      var V = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })(V || {});
      let lu;
      function Ue(e) {
        const t = lu;
        return (lu = e), t;
      }
      function Rf(e, t, n) {
        const r = Pi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & V.Optional
          ? null
          : void 0 !== t
          ? t
          : void uu(we(e));
      }
      const ne = globalThis,
        lo = {},
        gu = "__NG_DI_FLAG__",
        Li = "ngTempTokenPath",
        PC = /\n/gm,
        Of = "__source";
      let Jn;
      function cn(e) {
        const t = Jn;
        return (Jn = e), t;
      }
      function LC(e, t = V.Default) {
        if (void 0 === Jn) throw new w(-203, !1);
        return null === Jn
          ? Rf(e, void 0, t)
          : Jn.get(e, t & V.Optional ? null : void 0, t);
      }
      function S(e, t = V.Default) {
        return (
          (function Nf() {
            return lu;
          })() || LC
        )(O(e), t);
      }
      function E(e, t = V.Default) {
        return S(e, ji(t));
      }
      function ji(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function mu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = O(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1);
            let o,
              i = V.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = jC(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(S(o, i));
          } else t.push(S(r));
        }
        return t;
      }
      function fo(e, t) {
        return (e[gu] = t), (e.prototype[gu] = t), e;
      }
      function jC(e) {
        return e[gu];
      }
      function Ht(e) {
        return { toString: e }.toString();
      }
      var $i = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })($i || {}),
        vt = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(vt || {});
      const At = {},
        q = [],
        Vi = K({ ɵcmp: K }),
        vu = K({ ɵdir: K }),
        yu = K({ ɵpipe: K }),
        Ff = K({ ɵmod: K }),
        Ut = K({ ɵfac: K }),
        ho = K({ __NG_ELEMENT_ID__: K }),
        kf = K({ __NG_ENV_ID__: K });
      function Lf(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function Du(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            $f(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function jf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function $f(e) {
        return 64 === e.charCodeAt(0);
      }
      function po(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Vf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Vf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      const Bf = "ng-template";
      function BC(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Lf(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Hf(e) {
        return 4 === e.type && e.value !== Bf;
      }
      function HC(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Bf);
      }
      function UC(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function qC(e) {
            for (let t = 0; t < e.length; t++) if (jf(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !HC(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (yt(r)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!BC(e.attrs, c, n)) {
                    if (yt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = zC(8 & r ? "class" : u, o, Hf(e), n);
                if (-1 === d) {
                  if (yt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Lf(h, c, 0)) || (2 & r && c !== f)) {
                    if (yt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !yt(r) && !yt(u)) return !1;
            if (s && yt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return yt(r) || s;
      }
      function yt(e) {
        return 0 == (1 & e);
      }
      function zC(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function WC(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Uf(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (UC(e, t[r], n)) return !0;
        return !1;
      }
      function zf(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function QC(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !yt(s) && ((t += zf(i, o)), (o = "")),
              (r = s),
              (i = i || !yt(r));
          n++;
        }
        return "" !== o && (t += zf(i, o)), t;
      }
      function wu(e) {
        return Ht(() => {
          const t = qf(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === $i.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || vt.Emulated,
              styles: e.styles || q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          Wf(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = Bi(r, !1)),
            (n.pipeDefs = Bi(r, !0)),
            (n.id = (function r_(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function JC(e) {
        return U(e) || be(e);
      }
      function e_(e) {
        return null !== e;
      }
      function Nn(e) {
        return Ht(() => ({
          type: e.type,
          bootstrap: e.bootstrap || q,
          declarations: e.declarations || q,
          imports: e.imports || q,
          exports: e.exports || q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Gf(e, t) {
        if (null == e) return At;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function Oe(e) {
        return Ht(() => {
          const t = qf(e);
          return Wf(t), t;
        });
      }
      function U(e) {
        return e[Vi] || null;
      }
      function be(e) {
        return e[vu] || null;
      }
      function Pe(e) {
        return e[yu] || null;
      }
      function Je(e, t) {
        const n = e[Ff] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${we(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function qf(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || At,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Gf(e.inputs, t),
          outputs: Gf(e.outputs),
        };
      }
      function Wf(e) {
        e.features?.forEach((t) => t(e));
      }
      function Bi(e, t) {
        if (!e) return null;
        const n = t ? Pe : JC;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(e_);
      }
      const de = 0,
        _ = 1,
        j = 2,
        ce = 3,
        Dt = 4,
        go = 5,
        Ae = 6,
        tr = 7,
        he = 8,
        ln = 9,
        nr = 10,
        k = 11,
        mo = 12,
        Zf = 13,
        rr = 14,
        pe = 15,
        vo = 16,
        or = 17,
        Nt = 18,
        yo = 19,
        Qf = 20,
        dn = 21,
        zt = 22,
        Do = 23,
        wo = 24,
        B = 25,
        Cu = 1,
        Yf = 2,
        Rt = 7,
        ir = 9,
        Me = 11;
      function Ge(e) {
        return Array.isArray(e) && "object" == typeof e[Cu];
      }
      function Fe(e) {
        return Array.isArray(e) && !0 === e[Cu];
      }
      function _u(e) {
        return 0 != (4 & e.flags);
      }
      function Rn(e) {
        return e.componentOffset > -1;
      }
      function Ui(e) {
        return 1 == (1 & e.flags);
      }
      function wt(e) {
        return !!e.template;
      }
      function Eu(e) {
        return 0 != (512 & e[j]);
      }
      function xn(e, t) {
        return e.hasOwnProperty(Ut) ? e[Ut] : null;
      }
      let Se = null,
        zi = !1;
      function at(e) {
        const t = Se;
        return (Se = e), t;
      }
      const Gi = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function th(e) {
        if (!_o(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !oh(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function rh(e) {
        (e.dirty = !0),
          (function nh(e) {
            if (void 0 === e.liveConsumerNode) return;
            const t = zi;
            zi = !0;
            try {
              for (const n of e.liveConsumerNode) n.dirty || rh(n);
            } finally {
              zi = t;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function qi(e) {
        return e && (e.nextProducerIndex = 0), at(e);
      }
      function Wi(e, t) {
        if (
          (at(t),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (_o(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
              Zi(e.producerNode[n], e.producerIndexOfThis[n]);
          for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop();
        }
      }
      function oh(e) {
        sr(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
          if (r !== n.version || (th(n), r !== n.version)) return !0;
        }
        return !1;
      }
      function ih(e) {
        if ((sr(e), _o(e)))
          for (let t = 0; t < e.producerNode.length; t++)
            Zi(e.producerNode[t], e.producerIndexOfThis[t]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function Zi(e, t) {
        if (
          ((function ah(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          sr(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            Zi(e.producerNode[r], e.producerIndexOfThis[r]);
        const n = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
          (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
          sr(o), (o.producerIndexOfThis[r] = t);
        }
      }
      function _o(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function sr(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let uh = null;
      const fh = () => {},
        g_ = {
          ...Gi,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: fh,
        };
      class m_ {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function On() {
        return hh;
      }
      function hh(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = y_), v_;
      }
      function v_() {
        const e = gh(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === At) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function y_(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            gh(e) ||
            (function D_(e, t) {
              return (e[ph] = t);
            })(e, { previous: At, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new m_(u && u.currentValue, t, a === At)), (e[r] = t);
      }
      On.ngInherit = !0;
      const ph = "__ngSimpleChanges__";
      function gh(e) {
        return e[ph] || null;
      }
      const xt = function (e, t, n) {};
      function re(e) {
        for (; Array.isArray(e); ) e = e[de];
        return e;
      }
      function qe(e, t) {
        return re(t[e.index]);
      }
      function yh(e, t) {
        return e.data[t];
      }
      function et(e, t) {
        const n = t[e];
        return Ge(n) ? n : n[de];
      }
      function hn(e, t) {
        return null == t ? null : e[t];
      }
      function Dh(e) {
        e[or] = 0;
      }
      function b_(e) {
        1024 & e[j] || ((e[j] |= 1024), Ch(e, 1));
      }
      function wh(e) {
        1024 & e[j] && ((e[j] &= -1025), Ch(e, -1));
      }
      function Ch(e, t) {
        let n = e[ce];
        if (null === n) return;
        n[go] += t;
        let r = n;
        for (
          n = n[ce];
          null !== n && ((1 === t && 1 === r[go]) || (-1 === t && 0 === r[go]));

        )
          (n[go] += t), (r = n), (n = n[ce]);
      }
      const R = {
        lFrame: xh(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function Ih() {
        return R.bindingsEnabled;
      }
      function v() {
        return R.lFrame.lView;
      }
      function z() {
        return R.lFrame.tView;
      }
      function Pn(e) {
        return (R.lFrame.contextLView = e), e[he];
      }
      function Fn(e) {
        return (R.lFrame.contextLView = null), e;
      }
      function Te() {
        let e = bh();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function bh() {
        return R.lFrame.currentTNode;
      }
      function Ot(e, t) {
        const n = R.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Ru() {
        return R.lFrame.isParent;
      }
      function cr() {
        return R.lFrame.bindingIndex++;
      }
      function L_(e, t) {
        const n = R.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Ou(t);
      }
      function Ou(e) {
        R.lFrame.currentDirectiveIndex = e;
      }
      function Fu(e) {
        R.lFrame.currentQueryIndex = e;
      }
      function $_(e) {
        const t = e[_];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Ae] : null;
      }
      function Nh(e, t, n) {
        if (n & V.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & V.Host ||
              ((o = $_(i)), null === o || ((i = i[rr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (R.lFrame = Rh());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function ku(e) {
        const t = Rh(),
          n = e[_];
        (R.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Rh() {
        const e = R.lFrame,
          t = null === e ? null : e.child;
        return null === t ? xh(e) : t;
      }
      function xh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Oh() {
        const e = R.lFrame;
        return (
          (R.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Ph = Oh;
      function Lu() {
        const e = Oh();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Le() {
        return R.lFrame.selectedIndex;
      }
      function kn(e) {
        R.lFrame.selectedIndex = e;
      }
      function ae() {
        R.lFrame.currentNamespace = "svg";
      }
      function ue() {
        !(function U_() {
          R.lFrame.currentNamespace = null;
        })();
      }
      let kh = !0;
      function Ki() {
        return kh;
      }
      function pn(e) {
        kh = e;
      }
      function Xi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: c,
              ngOnDestroy: l,
            } = i;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            c &&
              ((e.viewHooks ??= []).push(n, c),
              (e.viewCheckHooks ??= []).push(n, c)),
            null != l && (e.destroyHooks ??= []).push(n, l);
        }
      }
      function Ji(e, t, n) {
        Lh(e, t, 3, n);
      }
      function es(e, t, n, r) {
        (3 & e[j]) === n && Lh(e, t, n, r);
      }
      function ju(e, t) {
        let n = e[j];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[j] = n));
      }
      function Lh(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[or] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[or] += 65536),
              (a < i || -1 == i) &&
                (G_(e, n, t, u), (e[or] = (4294901760 & e[or]) + u + 2)),
              u++;
      }
      function jh(e, t) {
        xt(4, e, t);
        const n = at(null);
        try {
          t.call(e);
        } finally {
          at(n), xt(5, e, t);
        }
      }
      function G_(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[j] >> 13 < e[or] >> 16 &&
            (3 & e[j]) === t &&
            ((e[j] += 8192), jh(a, i))
          : jh(a, i);
      }
      const lr = -1;
      class Io {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Vu(e) {
        return e !== lr;
      }
      function bo(e) {
        return 32767 & e;
      }
      function Mo(e, t) {
        let n = (function Q_(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[rr]), n--;
        return r;
      }
      let Bu = !0;
      function ts(e) {
        const t = Bu;
        return (Bu = e), t;
      }
      const $h = 255,
        Vh = 5;
      let Y_ = 0;
      const Pt = {};
      function ns(e, t) {
        const n = Bh(e, t);
        if (-1 !== n) return n;
        const r = t[_];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Hu(r.data, e),
          Hu(t, null),
          Hu(r.blueprint, null));
        const o = rs(e, t),
          i = e.injectorIndex;
        if (Vu(o)) {
          const s = bo(o),
            a = Mo(o, t),
            u = a[_].data;
          for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
        }
        return (t[i + 8] = o), i;
      }
      function Hu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Bh(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function rs(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Qh(o)), null === r)) return lr;
          if ((n++, (o = o[rr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return lr;
      }
      function Uu(e, t, n) {
        !(function K_(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(ho) && (r = n[ho]),
            null == r && (r = n[ho] = Y_++);
          const o = r & $h;
          t.data[e + (o >> Vh)] |= 1 << o;
        })(e, t, n);
      }
      function Hh(e, t, n) {
        if (n & V.Optional || void 0 !== e) return e;
        uu();
      }
      function Uh(e, t, n, r) {
        if (
          (n & V.Optional && void 0 === r && (r = null),
          !(n & (V.Self | V.Host)))
        ) {
          const o = e[ln],
            i = Ue(void 0);
          try {
            return o ? o.get(t, r, n & V.Optional) : Rf(t, r, n & V.Optional);
          } finally {
            Ue(i);
          }
        }
        return Hh(r, 0, n);
      }
      function zh(e, t, n, r = V.Default, o) {
        if (null !== e) {
          if (2048 & t[j] && !(r & V.Self)) {
            const s = (function rE(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 2048 & s[j] && !(512 & s[j]);

              ) {
                const a = Gh(i, s, n, r | V.Self, Pt);
                if (a !== Pt) return a;
                let u = i.parent;
                if (!u) {
                  const c = s[Qf];
                  if (c) {
                    const l = c.get(n, Pt, r);
                    if (l !== Pt) return l;
                  }
                  (u = Qh(s)), (s = s[rr]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Pt);
            if (s !== Pt) return s;
          }
          const i = Gh(e, t, n, r, Pt);
          if (i !== Pt) return i;
        }
        return Uh(t, n, r, o);
      }
      function Gh(e, t, n, r, o) {
        const i = (function eE(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(ho) ? e[ho] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & $h : nE) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Nh(t, e, r)) return r & V.Host ? Hh(o, 0, r) : Uh(t, n, r, o);
          try {
            let s;
            if (((s = i(r)), null != s || r & V.Optional)) return s;
            uu();
          } finally {
            Ph();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Bh(e, t),
            u = lr,
            c = r & V.Host ? t[pe][Ae] : null;
          for (
            (-1 === a || r & V.SkipSelf) &&
            ((u = -1 === a ? rs(e, t) : t[a + 8]),
            u !== lr && Wh(r, !1)
              ? ((s = t[_]), (a = bo(u)), (t = Mo(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const l = t[_];
            if (qh(i, a, l.data)) {
              const d = J_(a, t, n, s, r, c);
              if (d !== Pt) return d;
            }
            (u = t[a + 8]),
              u !== lr && Wh(r, t[_].data[a + 8] === c) && qh(i, a, t)
                ? ((s = l), (a = bo(u)), (t = Mo(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function J_(e, t, n, r, o, i) {
        const s = t[_],
          a = s.data[e + 8],
          l = (function os(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              l = i >> 20,
              f = o ? a + l : e.directiveEnd;
            for (let h = r ? a : a + l; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && wt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Rn(a) && Bu : r != s && 0 != (3 & a.type),
            o & V.Host && i === a,
          );
        return null !== l ? Ln(t, s, l, a) : Pt;
      }
      function Ln(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function q_(e) {
            return e instanceof Io;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function IC(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${n}`,
              );
            })(
              (function Y(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : F(e);
              })(i[n]),
            );
          const a = ts(s.canSeeViewProviders);
          s.resolving = !0;
          const c = s.injectImpl ? Ue(s.injectImpl) : null;
          Nh(e, r, V.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function z_(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = hh(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== c && Ue(c), ts(a), (s.resolving = !1), Ph();
          }
        }
        return o;
      }
      function qh(e, t, n) {
        return !!(n[t + (e >> Vh)] & (1 << e));
      }
      function Wh(e, t) {
        return !(e & V.Self || (e & V.Host && t));
      }
      class je {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return zh(this._tNode, this._lView, t, ji(r), n);
        }
      }
      function nE() {
        return new je(Te(), v());
      }
      function zu(e) {
        return su(e)
          ? () => {
              const t = zu(O(e));
              return t && t();
            }
          : xn(e);
      }
      function Qh(e) {
        const t = e[_],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Ae] : null;
      }
      const fr = "__parameters__";
      function pr(e, t, n) {
        return Ht(() => {
          const r = (function Gu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, c, l) {
              const d = u.hasOwnProperty(fr)
                ? u[fr]
                : Object.defineProperty(u, fr, { value: [] })[fr];
              for (; d.length <= l; ) d.push(null);
              return (d[l] = d[l] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function mr(e, t) {
        e.forEach((n) => (Array.isArray(n) ? mr(n, t) : t(n)));
      }
      function Kh(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function ss(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const us = fo(pr("Optional"), 8),
        cs = fo(pr("SkipSelf"), 4);
      function ps(e) {
        return 128 == (128 & e.flags);
      }
      var gn = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })(gn || {});
      const Ku = new Map();
      let PE = 0;
      const Ju = "__ngContext__";
      function Ne(e, t) {
        Ge(t)
          ? ((e[Ju] = t[yo]),
            (function kE(e) {
              Ku.set(e[yo], e);
            })(t))
          : (e[Ju] = t);
      }
      let ec;
      function tc(e, t) {
        return ec(e, t);
      }
      function xo(e) {
        const t = e[ce];
        return Fe(t) ? t[ce] : t;
      }
      function yp(e) {
        return wp(e[mo]);
      }
      function Dp(e) {
        return wp(e[Dt]);
      }
      function wp(e) {
        for (; null !== e && !Fe(e); ) e = e[Dt];
        return e;
      }
      function wr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Fe(r) ? (i = r) : Ge(r) && ((s = !0), (r = r[de]));
          const a = re(r);
          0 === e && null !== n
            ? null == o
              ? Ip(t, n, a)
              : jn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? jn(t, n, a, o || null, !0)
            : 2 === e
            ? (function Cs(e, t, n) {
                const r = Ds(e, t);
                r &&
                  (function t1(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function o1(e, t, n, r, o) {
                const i = n[Rt];
                i !== re(n) && wr(t, e, r, i, o);
                for (let a = Me; a < n.length; a++) {
                  const u = n[a];
                  Po(u[_], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function vs(e, t, n) {
        return e.createElement(t, n);
      }
      function _p(e, t) {
        const n = e[ir],
          r = n.indexOf(t);
        wh(t), n.splice(r, 1);
      }
      function ys(e, t) {
        if (e.length <= Me) return;
        const n = Me + t,
          r = e[n];
        if (r) {
          const o = r[vo];
          null !== o && o !== e && _p(o, r), t > 0 && (e[n - 1][Dt] = r[Dt]);
          const i = ss(e, Me + t);
          !(function WE(e, t) {
            Po(e, t, t[k], 2, null, null), (t[de] = null), (t[Ae] = null);
          })(r[_], r);
          const s = i[Nt];
          null !== s && s.detachView(i[_]),
            (r[ce] = null),
            (r[Dt] = null),
            (r[j] &= -129);
        }
        return r;
      }
      function rc(e, t) {
        if (!(256 & t[j])) {
          const n = t[k];
          t[Do] && ih(t[Do]),
            t[wo] && ih(t[wo]),
            n.destroyNode && Po(e, t, n, 3, null, null),
            (function YE(e) {
              let t = e[mo];
              if (!t) return oc(e[_], e);
              for (; t; ) {
                let n = null;
                if (Ge(t)) n = t[mo];
                else {
                  const r = t[Me];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[Dt] && t !== e; )
                    Ge(t) && oc(t[_], t), (t = t[ce]);
                  null === t && (t = e), Ge(t) && oc(t[_], t), (n = t && t[Dt]);
                }
                t = n;
              }
            })(t);
        }
      }
      function oc(e, t) {
        if (!(256 & t[j])) {
          (t[j] &= -129),
            (t[j] |= 256),
            (function e1(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Io)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        xt(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          xt(5, a, u);
                        }
                      }
                    else {
                      xt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        xt(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function JE(e, t) {
              const n = e.cleanup,
                r = t[tr];
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
                  } else n[i].call(r[n[i + 1]]);
              null !== r && (t[tr] = null);
              const o = t[dn];
              if (null !== o) {
                t[dn] = null;
                for (let i = 0; i < o.length; i++) (0, o[i])();
              }
            })(e, t),
            1 === t[_].type && t[k].destroy();
          const n = t[vo];
          if (null !== n && Fe(t[ce])) {
            n !== t[ce] && _p(n, t);
            const r = t[Nt];
            null !== r && r.detachView(e);
          }
          !(function LE(e) {
            Ku.delete(e[yo]);
          })(t);
        }
      }
      function ic(e, t, n) {
        return (function Ep(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[de];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === vt.None || i === vt.Emulated) return null;
            }
            return qe(r, n);
          }
        })(e, t.parent, n);
      }
      function jn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Ip(e, t, n) {
        e.appendChild(t, n);
      }
      function bp(e, t, n, r, o) {
        null !== r ? jn(e, t, n, r, o) : Ip(e, t, n);
      }
      function Ds(e, t) {
        return e.parentNode(t);
      }
      let sc,
        lc,
        Tp = function Sp(e, t, n) {
          return 40 & e.type ? qe(e, n) : null;
        };
      function ws(e, t, n, r) {
        const o = ic(e, r, t),
          i = t[k],
          a = (function Mp(e, t, n) {
            return Tp(e, t, n);
          })(r.parent || t[Ae], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) bp(i, o, n[u], a, !1);
          else bp(i, o, n, a, !1);
        void 0 !== sc && sc(i, r, t, n, o);
      }
      function Oo(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return qe(t, e);
          if (4 & n) return ac(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Oo(e, r);
            {
              const o = e[t.index];
              return Fe(o) ? ac(-1, o) : re(o);
            }
          }
          if (32 & n) return tc(t, e)() || re(e[t.index]);
          {
            const r = Np(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Oo(xo(e[pe]), r)
              : Oo(e, t.next);
          }
        }
        return null;
      }
      function Np(e, t) {
        return null !== t ? e[pe][Ae].projection[t.projection] : null;
      }
      function ac(e, t) {
        const n = Me + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[_].firstChild;
          if (null !== o) return Oo(r, o);
        }
        return t[Rt];
      }
      function uc(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Ne(re(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) uc(e, t, n.child, r, o, i, !1), wr(t, e, o, a, i);
            else if (32 & u) {
              const c = tc(n, r);
              let l;
              for (; (l = c()); ) wr(t, e, o, l, i);
              wr(t, e, o, a, i);
            } else 16 & u ? xp(e, t, r, n, o, i) : wr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Po(e, t, n, r, o, i) {
        uc(n, r, e.firstChild, t, o, i, !1);
      }
      function xp(e, t, n, r, o, i) {
        const s = n[pe],
          u = s[Ae].projection[r.projection];
        if (Array.isArray(u))
          for (let c = 0; c < u.length; c++) wr(t, e, o, u[c], i);
        else {
          let c = u;
          const l = s[ce];
          ps(r) && (c.flags |= 128), uc(e, t, c, l, o, i, !0);
        }
      }
      function Op(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Pp(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Du(e, t, r),
          null !== o && Op(e, t, o),
          null !== i &&
            (function s1(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class M {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = T({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const jo = new M("ENVIRONMENT_INITIALIZER"),
        Zp = new M("INJECTOR", -1),
        Qp = new M("INJECTOR_DEF_TYPES");
      class mc {
        get(t, n = lo) {
          if (n === lo) {
            const r = new Error(`NullInjectorError: No provider for ${we(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function O1(...e) {
        return { ɵproviders: Kp(0, e), ɵfromNgModule: !0 };
      }
      function Kp(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        const i = (s) => {
          n.push(s);
        };
        return (
          mr(t, (s) => {
            const a = s;
            bs(a, i, [], r) && ((o ||= []), o.push(a));
          }),
          void 0 !== o && Xp(o, i),
          n
        );
      }
      function Xp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: o } = e[n];
          vc(o, (i) => {
            t(i, r);
          });
        }
      }
      function bs(e, t, n, r) {
        if (!(e = O(e))) return !1;
        let o = null,
          i = Fi(e);
        const s = !i && U(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Fi(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of u) bs(c, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let c;
              r.add(o);
              try {
                mr(i.imports, (l) => {
                  bs(l, t, n, r) && ((c ||= []), c.push(l));
                });
              } finally {
              }
              void 0 !== c && Xp(c, t);
            }
            if (!a) {
              const c = xn(o) || (() => new o());
              t({ provide: o, useFactory: c, deps: q }, o),
                t({ provide: Qp, useValue: o, multi: !0 }, o),
                t({ provide: jo, useValue: () => S(o), multi: !0 }, o);
            }
            const u = i.providers;
            if (null != u && !a) {
              const c = e;
              vc(u, (l) => {
                t(l, c);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function vc(e, t) {
        for (let n of e)
          au(n) && (n = n.ɵproviders), Array.isArray(n) ? vc(n, t) : t(n);
      }
      const P1 = K({ provide: String, useValue: K });
      function yc(e) {
        return null !== e && "object" == typeof e && P1 in e;
      }
      function $n(e) {
        return "function" == typeof e;
      }
      const Dc = new M("Set Injector scope."),
        Ms = {},
        k1 = {};
      let wc;
      function Ss() {
        return void 0 === wc && (wc = new mc()), wc;
      }
      class ct {}
      class Ts extends ct {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            _c(t, (s) => this.processProvider(s)),
            this.records.set(Zp, Ir(void 0, this)),
            o.has("environment") && this.records.set(ct, Ir(void 0, this));
          const i = this.records.get(Dc);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Qp.multi, q, V.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = cn(this),
            r = Ue(void 0);
          try {
            return t();
          } finally {
            cn(n), Ue(r);
          }
        }
        get(t, n = lo, r = V.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(kf)))
            return t[kf](this);
          r = ji(r);
          const i = cn(this),
            s = Ue(void 0);
          try {
            if (!(r & V.SkipSelf)) {
              let u = this.records.get(t);
              if (void 0 === u) {
                const c =
                  (function B1(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof M)
                    );
                  })(t) && Pi(t);
                (u = c && this.injectableDefInScope(c) ? Ir(Cc(t), Ms) : null),
                  this.records.set(t, u);
              }
              if (null != u) return this.hydrate(t, u);
            }
            return (r & V.Self ? Ss() : this.parent).get(
              t,
              (n = r & V.Optional && n === lo ? null : n),
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[Li] = a[Li] || []).unshift(we(t)), i)) throw a;
              return (function $C(e, t, n, r) {
                const o = e[Li];
                throw (
                  (t[Of] && o.unshift(t[Of]),
                  (e.message = (function VC(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = we(t);
                    if (Array.isArray(t)) o = t.map(we).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a
                                ? JSON.stringify(a)
                                : we(a)),
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      PC,
                      "\n  ",
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Li] = null),
                  e)
                );
              })(a, t, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            Ue(s), cn(i);
          }
        }
        resolveInjectorInitializers() {
          const t = cn(this),
            n = Ue(void 0);
          try {
            const o = this.get(jo.multi, q, V.Self);
            for (const i of o) i();
          } finally {
            cn(t), Ue(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(we(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1);
        }
        processProvider(t) {
          let n = $n((t = O(t))) ? t : O(t && t.provide);
          const r = (function j1(e) {
            return yc(e)
              ? Ir(void 0, e.useValue)
              : Ir(
                  (function tg(e, t, n) {
                    let r;
                    if ($n(e)) {
                      const o = O(e);
                      return xn(o) || Cc(o);
                    }
                    if (yc(e)) r = () => O(e.useValue);
                    else if (
                      (function eg(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...mu(e.deps || []));
                    else if (
                      (function Jp(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => S(O(e.useExisting));
                    else {
                      const o = O(e && (e.useClass || e.provide));
                      if (
                        !(function $1(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return xn(o) || Cc(o);
                      r = () => new o(...mu(e.deps));
                    }
                    return r;
                  })(e),
                  Ms,
                );
          })(t);
          if ($n(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Ir(void 0, Ms, !0)),
              (o.factory = () => mu(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Ms && ((n.value = k1), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function V1(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = O(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function Cc(e) {
        const t = Pi(e),
          n = null !== t ? t.factory : xn(e);
        if (null !== n) return n;
        if (e instanceof M) throw new w(204, !1);
        if (e instanceof Function)
          return (function L1(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function Ao(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new w(204, !1))
              );
            const n = (function NC(e) {
              return (e && (e[ki] || e[Af])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new w(204, !1);
      }
      function Ir(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function _c(e, t) {
        for (const n of e)
          Array.isArray(n) ? _c(n, t) : n && au(n) ? _c(n.ɵproviders, t) : t(n);
      }
      const As = new M("AppId", { providedIn: "root", factory: () => H1 }),
        H1 = "ng",
        ng = new M("Platform Initializer"),
        br = new M("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        rg = new M("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function _r() {
              if (void 0 !== lc) return lc;
              if (typeof document < "u") return document;
              throw new w(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let og = (e, t, n) => null;
      function Nc(e, t, n = !1) {
        return og(e, t, n);
      }
      class X1 {}
      class ag {}
      class eI {
        resolveComponentFactory(t) {
          throw (function J1(e) {
            const t = Error(`No component factory found for ${we(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Fs = (() => {
        class t {}
        return (t.NULL = new eI()), t;
      })();
      function tI() {
        return Tr(Te(), v());
      }
      function Tr(e, t) {
        return new vn(qe(e, t));
      }
      let vn = (() => {
        class t {
          constructor(r) {
            this.nativeElement = r;
          }
        }
        return (t.__NG_ELEMENT_ID__ = tI), t;
      })();
      class cg {}
      let oI = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵprov = T({
            token: e,
            providedIn: "root",
            factory: () => null,
          })),
          t
        );
      })();
      class Ls {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const iI = new Ls("16.2.4"),
        Oc = {};
      function hg(e, t = null, n = null, r) {
        const o = pg(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function pg(e, t = null, n = null, r, o = new Set()) {
        const i = [n || q, O1(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : we(e))),
          new Ts(i, t || Ss(), r || null, o)
        );
      }
      let lt = (() => {
        var e;
        class t {
          static create(r, o) {
            if (Array.isArray(r)) return hg({ name: "" }, o, r, "");
            {
              const i = r.name ?? "";
              return hg({ name: i }, r.parent, r.providers, i);
            }
          }
        }
        return (
          ((e = t).THROW_IF_NOT_FOUND = lo),
          (e.NULL = new mc()),
          (e.ɵprov = T({ token: e, providedIn: "any", factory: () => S(Zp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function kc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const $e = class fI extends mt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = kc(i)), o && (o = kc(o)), s && (s = kc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof Ke && t.add(a), a;
        }
      };
      function gg(...e) {}
      class oe {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new $e(!1)),
            (this.onMicrotaskEmpty = new $e(!1)),
            (this.onStable = new $e(!1)),
            (this.onError = new $e(!1)),
            typeof Zone > "u")
          )
            throw new w(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function hI() {
              const e = "function" == typeof ne.requestAnimationFrame;
              let t = ne[e ? "requestAnimationFrame" : "setTimeout"],
                n = ne[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && n) {
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
                const o = n[Zone.__symbol__("OriginalDelegate")];
                o && (n = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function mI(e) {
              const t = () => {
                !(function gI(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ne, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                jc(e),
                                (e.isCheckStableRunning = !0),
                                Lc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {},
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    jc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  if (
                    (function yI(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return n.invokeTask(o, i, s, a);
                  try {
                    return mg(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      vg(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return mg(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), vg(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          jc(e),
                          Lc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!oe.isInAngularZone()) throw new w(909, !1);
        }
        static assertNotInAngularZone() {
          if (oe.isInAngularZone()) throw new w(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, pI, gg, gg);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const pI = {};
      function Lc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function jc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function mg(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function vg(e) {
        e._nesting--, Lc(e);
      }
      class vI {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new $e()),
            (this.onMicrotaskEmpty = new $e()),
            (this.onStable = new $e()),
            (this.onError = new $e());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const yg = new M("", { providedIn: "root", factory: Dg });
      function Dg() {
        const e = E(oe);
        let t = !0;
        return (function wC(...e) {
          const t = co(e),
            n = (function hC(e, t) {
              return "number" == typeof nu(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length ? (1 === r.length ? ot(r[0]) : Xn(n)(Ie(r, t))) : St;
        })(
          new ve((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new ve((o) => {
            let i;
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                oe.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              oe.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              i.unsubscribe(), s.unsubscribe();
            };
          }).pipe(Mf()),
        );
      }
      function Zt(e) {
        return e instanceof Function ? e() : e;
      }
      let $c = (() => {
        var e;
        class t {
          constructor() {
            (this.callbacks = new Set()),
              (this.deferredCallbacks = new Set()),
              (this.renderDepth = 0),
              (this.runningCallbacks = !1);
          }
          begin() {
            if (this.runningCallbacks) throw new w(102, !1);
            this.renderDepth++;
          }
          end() {
            if ((this.renderDepth--, 0 === this.renderDepth))
              try {
                this.runningCallbacks = !0;
                for (const r of this.callbacks) r.invoke();
              } finally {
                this.runningCallbacks = !1;
                for (const r of this.deferredCallbacks) this.callbacks.add(r);
                this.deferredCallbacks.clear();
              }
          }
          register(r) {
            (this.runningCallbacks
              ? this.deferredCallbacks
              : this.callbacks
            ).add(r);
          }
          unregister(r) {
            this.callbacks.delete(r), this.deferredCallbacks.delete(r);
          }
          ngOnDestroy() {
            this.callbacks.clear(), this.deferredCallbacks.clear();
          }
        }
        return (
          ((e = t).ɵprov = T({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          t
        );
      })();
      function Bo(e) {
        for (; e; ) {
          e[j] |= 64;
          const t = xo(e);
          if (Eu(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Vc(e) {
        return e.ngOriginalError;
      }
      class Vn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Vc(t);
          for (; n && Vc(n); ) n = Vc(n);
          return n || null;
        }
      }
      const Ig = new M("", { providedIn: "root", factory: () => !1 });
      let $s = null;
      function Tg(e, t) {
        return e[t] ?? Rg();
      }
      function Ag(e, t) {
        const n = Rg();
        n.producerNode?.length && ((e[t] = $s), (n.lView = e), ($s = Ng()));
      }
      const TI = {
        ...Gi,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          Bo(e.lView);
        },
        lView: null,
      };
      function Ng() {
        return Object.create(TI);
      }
      function Rg() {
        return ($s ??= Ng()), $s;
      }
      const L = {};
      function yn(e) {
        xg(z(), v(), Le() + e, !1);
      }
      function xg(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[j])) {
            const i = e.preOrderCheckHooks;
            null !== i && Ji(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && es(t, i, 0, n);
          }
        kn(n);
      }
      function A(e, t = V.Default) {
        const n = v();
        return null === n ? S(e, t) : zh(Te(), n, O(e), t);
      }
      function Vs(e, t, n, r, o, i, s, a, u, c, l) {
        const d = t.blueprint.slice();
        return (
          (d[de] = o),
          (d[j] = 140 | r),
          (null !== c || (e && 2048 & e[j])) && (d[j] |= 2048),
          Dh(d),
          (d[ce] = d[rr] = e),
          (d[he] = n),
          (d[nr] = s || (e && e[nr])),
          (d[k] = a || (e && e[k])),
          (d[ln] = u || (e && e[ln]) || null),
          (d[Ae] = i),
          (d[yo] = (function FE() {
            return PE++;
          })()),
          (d[zt] = l),
          (d[Qf] = c),
          (d[pe] = 2 == t.type ? e[pe] : d),
          d
        );
      }
      function Rr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Bc(e, t, n, r, o) {
            const i = bh(),
              s = Ru(),
              u = (e.data[t] = (function kI(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function ur() {
                    return null !== R.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function k_() {
              return R.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Eo() {
            const e = R.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Ot(i, !0), i;
      }
      function Ho(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Pg(e, t, n, r, o) {
        const i = Tg(t, Do),
          s = Le(),
          a = 2 & r;
        try {
          kn(-1), a && t.length > B && xg(e, t, B, !1), xt(a ? 2 : 0, o);
          const c = a ? i : null,
            l = qi(c);
          try {
            null !== c && (c.dirty = !1), n(r, o);
          } finally {
            Wi(c, l);
          }
        } finally {
          a && null === t[Do] && Ag(t, Do), kn(s), xt(a ? 3 : 1, o);
        }
      }
      function Hc(e, t, n) {
        if (_u(t)) {
          const r = at(null);
          try {
            const i = t.directiveEnd;
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            at(r);
          }
        }
      }
      function Uc(e, t, n) {
        Ih() &&
          ((function UI(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            Rn(n) &&
              (function YI(e, t, n) {
                const r = qe(t, e),
                  o = Fg(n);
                let s = 16;
                n.signals ? (s = 4096) : n.onPush && (s = 64);
                const a = Bs(
                  e,
                  Vs(
                    e,
                    o,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[nr].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null,
                  ),
                );
                e[t.index] = a;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || ns(n, t),
              Ne(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                c = Ln(t, e, a, n);
              Ne(c, t),
                null !== s && KI(0, a - o, c, u, 0, s),
                wt(u) && (et(n.index, t)[he] = Ln(t, e, a, n));
            }
          })(e, t, n, qe(n, t)),
          64 == (64 & n.flags) && Vg(e, t, n));
      }
      function zc(e, t, n = qe) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function Fg(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Gc(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id,
            ))
          : t;
      }
      function Gc(e, t, n, r, o, i, s, a, u, c, l) {
        const d = B + r,
          f = d + o,
          h = (function NI(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : L);
            return n;
          })(d, f),
          p = "function" == typeof c ? c() : c;
        return (h[_] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: l,
        });
      }
      let kg = (e) => null;
      function Lg(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? jg(n, t, o, i)
              : r.hasOwnProperty(o) && jg(n, t, r[o], i);
          }
        return n;
      }
      function jg(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function qc(e, t, n, r) {
        if (Ih()) {
          const o = null === r ? null : { "": -1 },
            i = (function GI(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (Uf(t, s.selectors, !1))
                    if ((r || (r = []), wt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          Wc(e, t, a.length);
                      } else r.unshift(s), Wc(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && $g(e, t, n, s, o, a),
            o &&
              (function qI(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new w(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = po(n.mergedAttrs, n.attrs);
      }
      function $g(e, t, n, r, o, i) {
        for (let c = 0; c < r.length; c++) Uu(ns(n, t), e, r[c].type);
        !(function ZI(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          l.providersResolver && l.providersResolver(l);
        }
        let s = !1,
          a = !1,
          u = Ho(e, t, r.length, null);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          (n.mergedAttrs = po(n.mergedAttrs, l.hostAttrs)),
            QI(e, n, t, u, l),
            WI(u, l, o),
            null !== l.contentQueries && (n.flags |= 4),
            (null !== l.hostBindings ||
              null !== l.hostAttrs ||
              0 !== l.hostVars) &&
              (n.flags |= 64);
          const d = l.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
        }
        !(function LI(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            c = null;
          for (let l = t.directiveStart; l < o; l++) {
            const d = i[l],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = Lg(d.inputs, l, u, f ? f.inputs : null)),
              (c = Lg(d.outputs, l, c, p));
            const g = null === u || null === s || Hf(t) ? null : XI(u, l, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = c);
        })(e, n, i);
      }
      function Vg(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function j_() {
            return R.lFrame.currentDirectiveIndex;
          })();
        try {
          kn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              c = t[a];
            Ou(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                zI(u, c);
          }
        } finally {
          kn(-1), Ou(s);
        }
      }
      function zI(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Wc(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function WI(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          wt(t) && (n[""] = e);
        }
      }
      function QI(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = xn(o.type)),
          s = new Io(i, wt(o), A);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function BI(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function HI(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Ho(e, n, o.hostVars, L), o);
      }
      function KI(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) Bg(r, n, s[a++], s[a++], s[a++]);
      }
      function Bg(e, t, n, r, o) {
        const i = at(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          at(i);
        }
      }
      function XI(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function Hg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function Ug(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Fu(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Bs(e, t) {
        return e[mo] ? (e[Zf][Dt] = t) : (e[mo] = t), (e[Zf] = t), t;
      }
      function Qc(e, t, n) {
        Fu(0);
        const r = at(null);
        try {
          t(e, n);
        } finally {
          at(r);
        }
      }
      function Wg(e, t) {
        const n = e[ln],
          r = n ? n.get(Vn, null) : null;
        r && r.handleError(t);
      }
      function Yc(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++];
          Bg(e.data[s], t[s], r, a, o);
        }
      }
      function Qt(e, t, n) {
        const r = (function Yi(e, t) {
          return re(t[e]);
        })(t, e);
        !(function Cp(e, t, n) {
          e.setValue(t, n);
        })(e[k], r, n);
      }
      function JI(e, t) {
        const n = et(t, e),
          r = n[_];
        !(function eb(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[de];
        null !== o && null === n[zt] && (n[zt] = Nc(o, n[ln])), Kc(r, n, n[he]);
      }
      function Kc(e, t, n) {
        ku(t);
        try {
          const r = e.viewQuery;
          null !== r && Qc(1, r, n);
          const o = e.template;
          null !== o && Pg(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Ug(e, t),
            e.staticViewQueries && Qc(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function tb(e, t) {
              for (let n = 0; n < t.length; n++) JI(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[j] &= -5), Lu();
        }
      }
      let Zg = (() => {
        var e;
        class t {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(r, o, i) {
            const s = typeof Zone > "u" ? null : Zone.current,
              a = (function p_(e, t, n) {
                const r = Object.create(g_);
                n && (r.consumerAllowSignalWrites = !0),
                  (r.fn = e),
                  (r.schedule = t);
                const o = (s) => {
                  r.cleanupFn = s;
                };
                return (
                  (r.ref = {
                    notify: () => rh(r),
                    run: () => {
                      if (((r.dirty = !1), r.hasRun && !oh(r))) return;
                      r.hasRun = !0;
                      const s = qi(r);
                      try {
                        r.cleanupFn(), (r.cleanupFn = fh), r.fn(o);
                      } finally {
                        Wi(r, s);
                      }
                    },
                    cleanup: () => r.cleanupFn(),
                  }),
                  r.ref
                );
              })(
                r,
                (l) => {
                  this.all.has(l) && this.queue.set(l, s);
                },
                i,
              );
            let u;
            this.all.add(a), a.notify();
            const c = () => {
              a.cleanup(), u?.(), this.all.delete(a), this.queue.delete(a);
            };
            return (u = o?.onDestroy(c)), { destroy: c };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [r, o] of this.queue)
                this.queue.delete(r), o ? o.run(() => r.run()) : r.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          ((e = t).ɵprov = T({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          t
        );
      })();
      function Hs(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = ou(o, a))
              : 2 == i && (r = ou(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Uo(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          null !== i && r.push(re(i)), Fe(i) && Qg(i, r);
          const s = n.type;
          if (8 & s) Uo(e, t, n.child, r);
          else if (32 & s) {
            const a = tc(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Np(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = xo(t[pe]);
              Uo(u[_], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function Qg(e, t) {
        for (let n = Me; n < e.length; n++) {
          const r = e[n],
            o = r[_].firstChild;
          null !== o && Uo(r[_], r, o, t);
        }
        e[Rt] !== e[de] && t.push(e[Rt]);
      }
      function Us(e, t, n, r = !0) {
        const o = t[nr],
          i = o.rendererFactory,
          s = o.afterRenderEventManager;
        i.begin?.(), s?.begin();
        try {
          Yg(e, t, e.template, n);
        } catch (u) {
          throw (r && Wg(t, u), u);
        } finally {
          i.end?.(), o.effectManager?.flush(), s?.end();
        }
      }
      function Yg(e, t, n, r) {
        const o = t[j];
        if (256 != (256 & o)) {
          t[nr].effectManager?.flush(), ku(t);
          try {
            Dh(t),
              (function Sh(e) {
                return (R.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Pg(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && Ji(t, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && es(t, c, 0, null), ju(t, 0);
            }
            if (
              ((function ob(e) {
                for (let t = yp(e); null !== t; t = Dp(t)) {
                  if (!t[Yf]) continue;
                  const n = t[ir];
                  for (let r = 0; r < n.length; r++) {
                    b_(n[r]);
                  }
                }
              })(t),
              Kg(t, 2),
              null !== e.contentQueries && Ug(e, t),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && Ji(t, c);
            } else {
              const c = e.contentHooks;
              null !== c && es(t, c, 1), ju(t, 1);
            }
            !(function AI(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = Tg(t, wo);
              try {
                for (let o = 0; o < n.length; o++) {
                  const i = n[o];
                  if (i < 0) kn(~i);
                  else {
                    const s = i,
                      a = n[++o],
                      u = n[++o];
                    L_(a, s), (r.dirty = !1);
                    const c = qi(r);
                    try {
                      u(2, t[s]);
                    } finally {
                      Wi(r, c);
                    }
                  }
                }
              } finally {
                null === t[wo] && Ag(t, wo), kn(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && Jg(t, a, 0);
            const u = e.viewQuery;
            if ((null !== u && Qc(2, u, r), s)) {
              const c = e.viewCheckHooks;
              null !== c && Ji(t, c);
            } else {
              const c = e.viewHooks;
              null !== c && es(t, c, 2), ju(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[j] &= -73),
              wh(t);
          } finally {
            Lu();
          }
        }
      }
      function Kg(e, t) {
        for (let n = yp(e); null !== n; n = Dp(n))
          for (let r = Me; r < n.length; r++) Xg(n[r], t);
      }
      function ib(e, t, n) {
        Xg(et(t, e), n);
      }
      function Xg(e, t) {
        if (
          !(function E_(e) {
            return 128 == (128 & e[j]);
          })(e)
        )
          return;
        const n = e[_],
          r = e[j];
        if ((80 & r && 0 === t) || 1024 & r || 2 === t)
          Yg(n, e, n.template, e[he]);
        else if (e[go] > 0) {
          Kg(e, 1);
          const o = n.components;
          null !== o && Jg(e, o, 1);
        }
      }
      function Jg(e, t, n) {
        for (let r = 0; r < t.length; r++) ib(e, t[r], n);
      }
      class zo {
        get rootNodes() {
          const t = this._lView,
            n = t[_];
          return Uo(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[he];
        }
        set context(t) {
          this._lView[he] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[j]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[ce];
            if (Fe(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (ys(t, r), ss(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          rc(this._lView[_], this._lView);
        }
        onDestroy(t) {
          !(function _h(e, t) {
            if (256 == (256 & e[j])) throw new w(911, !1);
            null === e[dn] && (e[dn] = []), e[dn].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          Bo(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[j] &= -129;
        }
        reattach() {
          this._lView[j] |= 128;
        }
        detectChanges() {
          Us(this._lView[_], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function QE(e, t) {
              Po(e, t, t[k], 2, null, null);
            })(this._lView[_], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new w(902, !1);
          this._appRef = t;
        }
      }
      class sb extends zo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Us(t[_], t, t[he], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class em extends Fs {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = U(t);
          return new Go(n, this.ngModule);
        }
      }
      function tm(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class ub {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = ji(r);
          const o = this.injector.get(t, Oc, r);
          return o !== Oc || n === Oc ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Go extends ag {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = tm(t.inputs);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return tm(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function YC(e) {
              return e.map(QC).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof ct ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new ub(t, i) : t,
            a = s.get(cg, null);
          if (null === a) throw new w(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: s.get(oI, null),
              effectManager: s.get(Zg, null),
              afterRenderEventManager: s.get($c, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || "div",
            p = r
              ? (function RI(e, t, n, r) {
                  const i = r.get(Ig, !1) || n === vt.ShadowDom,
                    s = e.selectRootElement(t, i);
                  return (
                    (function xI(e) {
                      kg(e);
                    })(s),
                    s
                  );
                })(f, r, this.componentDef.encapsulation, s)
              : vs(
                  f,
                  h,
                  (function ab(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(h),
                ),
            D = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let m = null;
          null !== p && (m = Nc(p, s, !0));
          const b = Gc(0, null, null, 1, 0, null, null, null, null, null, null),
            x = Vs(null, b, null, D, null, null, d, f, s, null, m);
          let H, Ye;
          ku(x);
          try {
            const on = this.componentDef;
            let io,
              Xd = null;
            on.findHostDirectiveDefs
              ? ((io = []),
                (Xd = new Map()),
                on.findHostDirectiveDefs(on, io, Xd),
                io.push(on))
              : (io = [on]);
            const k2 = (function lb(e, t) {
                const n = e[_],
                  r = B;
                return (e[r] = t), Rr(n, r, 2, "#host", null);
              })(x, p),
              L2 = (function db(e, t, n, r, o, i, s) {
                const a = o[_];
                !(function fb(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = po(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Hs(t, t.mergedAttrs, !0), null !== n && Pp(r, n, t));
                })(r, e, t, s);
                let u = null;
                null !== t && (u = Nc(t, o[ln]));
                const c = i.rendererFactory.createRenderer(t, n);
                let l = 16;
                n.signals ? (l = 4096) : n.onPush && (l = 64);
                const d = Vs(
                  o,
                  Fg(n),
                  null,
                  l,
                  o[e.index],
                  e,
                  i,
                  c,
                  null,
                  null,
                  u,
                );
                return (
                  a.firstCreatePass && Wc(a, e, r.length - 1),
                  Bs(o, d),
                  (o[e.index] = d)
                );
              })(k2, p, on, io, x, d, f);
            (Ye = yh(b, B)),
              p &&
                (function pb(e, t, n, r) {
                  if (r) Du(e, n, ["ng-version", iI.full]);
                  else {
                    const { attrs: o, classes: i } = (function KC(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!yt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Du(e, n, o),
                      i && i.length > 0 && Op(e, n, i.join(" "));
                  }
                })(f, on, p, r),
              void 0 !== n &&
                (function gb(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(Ye, this.ngContentSelectors, n),
              (H = (function hb(e, t, n, r, o, i) {
                const s = Te(),
                  a = o[_],
                  u = qe(s, o);
                $g(a, o, s, n, null, r);
                for (let l = 0; l < n.length; l++)
                  Ne(Ln(o, a, s.directiveStart + l, s), o);
                Vg(a, o, s), u && Ne(u, o);
                const c = Ln(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[he] = o[he] = c), null !== i))
                  for (const l of i) l(c, t);
                return Hc(a, s, e), c;
              })(L2, on, io, Xd, x, [mb])),
              Kc(b, x, null);
          } finally {
            Lu();
          }
          return new cb(this.componentType, H, Tr(Ye, x), x, Ye);
        }
      }
      class cb extends X1 {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new sb(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const i = this._rootLView;
            Yc(i[_], i, o, t, n),
              this.previousInputValues.set(t, n),
              Bo(et(this._tNode.index, i));
          }
        }
        get injector() {
          return new je(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function mb() {
        const e = Te();
        Xi(v()[_], e);
      }
      function Re(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Hn(e, t, n, r, o, i, s, a) {
        const u = v(),
          c = z(),
          l = e + B,
          d = c.firstCreatePass
            ? (function Gb(e, t, n, r, o, i, s, a, u) {
                const c = t.consts,
                  l = Rr(t, e, 4, s || null, hn(c, a));
                qc(t, n, l, hn(c, u)), Xi(t, l);
                const d = (l.tView = Gc(
                  2,
                  l,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c,
                  null,
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, l),
                    (d.queries = t.queries.embeddedTView(l))),
                  l
                );
              })(l, c, u, t, n, r, o, i, s)
            : c.data[l];
        Ot(d, !1);
        const f = wm(c, u, d, e);
        Ki() && ws(c, u, f, d),
          Ne(f, u),
          Bs(u, (u[l] = Hg(f, u, f, d))),
          Ui(d) && Uc(c, u, d),
          null != s && zc(u, d, a);
      }
      let wm = function Cm(e, t, n, r) {
        return pn(!0), t[k].createComment("");
      };
      function Dn(e) {
        return (function ar(e, t) {
          return e[t];
        })(
          (function F_() {
            return R.lFrame.contextLView;
          })(),
          B + e,
        );
      }
      function wn(e, t, n) {
        const r = v();
        return (
          Re(r, cr(), t) &&
            (function nt(e, t, n, r, o, i, s, a) {
              const u = qe(t, n);
              let l,
                c = t.inputs;
              !a && null != c && (l = c[r])
                ? (Yc(e, n, l, r, o),
                  Rn(t) &&
                    (function $I(e, t) {
                      const n = et(t, e);
                      16 & n[j] || (n[j] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function jI(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(
              z(),
              (function le() {
                const e = R.lFrame;
                return yh(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[k],
              n,
              !1,
            ),
          wn
        );
      }
      function il(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Yc(e, n, t.inputs[s], s, r);
      }
      function C(e, t, n, r) {
        const o = v(),
          i = z(),
          s = B + e,
          a = o[k],
          u = i.firstCreatePass
            ? (function Qb(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Rr(t, e, 2, r, hn(s, o));
                return (
                  qc(t, n, u, hn(s, i)),
                  null !== u.attrs && Hs(u, u.attrs, !1),
                  null !== u.mergedAttrs && Hs(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          c = _m(i, o, u, a, t, e);
        o[s] = c;
        const l = Ui(u);
        return (
          Ot(u, !0),
          Pp(a, c, u),
          32 != (32 & u.flags) && Ki() && ws(i, o, c, u),
          0 ===
            (function S_() {
              return R.lFrame.elementDepthCount;
            })() && Ne(c, o),
          (function T_() {
            R.lFrame.elementDepthCount++;
          })(),
          l && (Uc(i, o, u), Hc(i, u, o)),
          null !== r && zc(o, u),
          C
        );
      }
      function I() {
        let e = Te();
        Ru()
          ? (function xu() {
              R.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Ot(e, !1));
        const t = e;
        (function N_(e) {
          return R.skipHydrationRootTNode === e;
        })(t) &&
          (function P_() {
            R.skipHydrationRootTNode = null;
          })(),
          (function A_() {
            R.lFrame.elementDepthCount--;
          })();
        const n = z();
        return (
          n.firstCreatePass && (Xi(n, e), _u(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function W_(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            il(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function Z_(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            il(n, t, v(), t.stylesWithoutHost, !1),
          I
        );
      }
      function G(e, t, n, r) {
        return C(e, t, n, r), I(), G;
      }
      let _m = (e, t, n, r, o, i) => (
        pn(!0),
        vs(
          r,
          o,
          (function Fh() {
            return R.lFrame.currentNamespace;
          })(),
        )
      );
      function Ys(e) {
        return !!e && "function" == typeof e.then;
      }
      function Mm(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function Yt(e, t, n, r) {
        const o = v(),
          i = z(),
          s = Te();
        return (
          (function Tm(e, t, n, r, o, i, s) {
            const a = Ui(r),
              c =
                e.firstCreatePass &&
                (function Gg(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              l = t[he],
              d = (function zg(e) {
                return e[tr] || (e[tr] = []);
              })(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = qe(r, t),
                y = s ? s(g) : g,
                D = d.length,
                m = s ? (x) => s(re(x[r.index])) : r.index;
              let b = null;
              if (
                (!s &&
                  a &&
                  (b = (function tM(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[tr],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== b)
              )
                ((b.__ngLastListenerFn__ || b).__ngNextListenerFn__ = i),
                  (b.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Nm(r, t, l, i, !1);
                const x = n.listen(y, o, i);
                d.push(i, x), c && c.push(o, m, D, D + 1);
              }
            } else i = Nm(r, t, l, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let y = 0; y < g; y += 2) {
                  const H = t[p[y]][p[y + 1]].subscribe(i),
                    Ye = d.length;
                  d.push(i, H), c && c.push(o, r.index, Ye, -(Ye + 1));
                }
            }
          })(i, o, o[k], s, e, t, r),
          Yt
        );
      }
      function Am(e, t, n, r) {
        try {
          return xt(6, t, n), !1 !== n(r);
        } catch (o) {
          return Wg(e, o), !1;
        } finally {
          xt(7, t, n);
        }
      }
      function Nm(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Bo(e.componentOffset > -1 ? et(e.index, t) : t);
          let u = Am(t, n, r, s),
            c = i.__ngNextListenerFn__;
          for (; c; ) (u = Am(t, n, c, s) && u), (c = c.__ngNextListenerFn__);
          return o && !1 === u && s.preventDefault(), u;
        };
      }
      function W(e, t = "") {
        const n = v(),
          r = z(),
          o = e + B,
          i = r.firstCreatePass ? Rr(r, o, 1, t, null) : r.data[o],
          s = tv(r, n, i, t, e);
        (n[o] = s), Ki() && ws(r, n, s, i), Ot(i, !1);
      }
      let tv = (e, t, n, r, o) => (
        pn(!0),
        (function ms(e, t) {
          return e.createText(t);
        })(t[k], r)
      );
      function Js(e, t, n) {
        const r = v(),
          o = (function Or(e, t, n, r) {
            return Re(e, cr(), n) ? t + F(n) + r : L;
          })(r, e, t, n);
        return o !== L && Qt(r, Le(), o), Js;
      }
      const Ur = "en-US";
      let Iv = Ur;
      class Gn {}
      class Yv {}
      class Dl extends Gn {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new em(this));
          const o = Je(t);
          (this._bootstrapComponents = Zt(o.bootstrap)),
            (this._r3Injector = pg(
              t,
              n,
              [
                { provide: Gn, useValue: this },
                { provide: Fs, useValue: this.componentFactoryResolver },
                ...r,
              ],
              we(t),
              new Set(["environment"]),
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class wl extends Yv {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Dl(this.moduleType, t, []);
        }
      }
      class Kv extends Gn {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new em(this)),
            (this.instance = null);
          const n = new Ts(
            [
              ...t.providers,
              { provide: Gn, useValue: this },
              { provide: Fs, useValue: this.componentFactoryResolver },
            ],
            t.parent || Ss(),
            t.debugName,
            new Set(["environment"]),
          );
          (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Cl(e, t, n = null) {
        return new Kv({
          providers: e,
          parent: t,
          debugName: n,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let XS = (() => {
        var e;
        class t {
          constructor(r) {
            (this._injector = r), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(r) {
            if (!r.standalone) return null;
            if (!this.cachedInjectors.has(r)) {
              const o = Kp(0, r.type),
                i =
                  o.length > 0
                    ? Cl([o], this._injector, `Standalone[${r.type.name}]`)
                    : null;
              this.cachedInjectors.set(r, i);
            }
            return this.cachedInjectors.get(r);
          }
          ngOnDestroy() {
            try {
              for (const r of this.cachedInjectors.values())
                null !== r && r.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          ((e = t).ɵprov = T({
            token: e,
            providedIn: "environment",
            factory: () => new e(S(ct)),
          })),
          t
        );
      })();
      function Xv(e) {
        e.getStandaloneInjector = (t) =>
          t.get(XS).getOrCreateStandaloneInjector(e);
      }
      function MT(e, t, n, r = !0) {
        const o = t[_];
        if (
          ((function KE(e, t, n, r) {
            const o = Me + r,
              i = n.length;
            r > 0 && (n[o - 1][Dt] = t),
              r < i - Me
                ? ((t[Dt] = n[o]), Kh(n, Me + r, t))
                : (n.push(t), (t[Dt] = null)),
              (t[ce] = n);
            const s = t[vo];
            null !== s &&
              n !== s &&
              (function XE(e, t) {
                const n = e[ir];
                t[pe] !== t[ce][ce][pe] && (e[Yf] = !0),
                  null === n ? (e[ir] = [t]) : n.push(t);
              })(s, t);
            const a = t[Nt];
            null !== a && a.insertView(e), (t[j] |= 128);
          })(o, t, e, n),
          r)
        ) {
          const i = ac(n, e),
            s = t[k],
            a = Ds(s, e[Rt]);
          null !== a &&
            (function ZE(e, t, n, r, o, i) {
              (r[de] = o), (r[Ae] = t), Po(e, r, n, 1, o, i);
            })(o, e[Ae], s, t, a, i);
        }
      }
      let Kt = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = AT), t;
      })();
      const ST = Kt,
        TT = class extends ST {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n);
          }
          createEmbeddedViewImpl(t, n, r) {
            const o = (function bT(e, t, n, r) {
              const o = t.tView,
                a = Vs(
                  e,
                  o,
                  n,
                  4096 & e[j] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.hydrationInfo ?? null,
                );
              a[vo] = e[t.index];
              const c = e[Nt];
              return (
                null !== c && (a[Nt] = c.createEmbeddedView(o)), Kc(o, a, n), a
              );
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: n,
              hydrationInfo: r,
            });
            return new zo(o);
          }
        };
      function AT() {
        return (function oa(e, t) {
          return 4 & e.type ? new TT(t, e, Tr(e, t)) : null;
        })(Te(), v());
      }
      let Et = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = FT), t;
      })();
      function FT() {
        return (function my(e, t) {
          let n;
          const r = t[e.index];
          return (
            Fe(r)
              ? (n = r)
              : ((n = Hg(r, t, null, e)), (t[e.index] = n), Bs(t, n)),
            vy(n, t, e, r),
            new py(n, e, t)
          );
        })(Te(), v());
      }
      const kT = Et,
        py = class extends kT {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Tr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new je(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = rs(this._hostTNode, this._hostLView);
            if (Vu(t)) {
              const n = Mo(t, this._hostLView),
                r = bo(t);
              return new je(n[_].data[r + 8], n);
            }
            return new je(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = gy(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Me;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, i, null);
            return this.insertImpl(a, o, false), a;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function To(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const g = n || {};
              (a = g.index),
                (r = g.injector),
                (o = g.projectableNodes),
                (i = g.environmentInjector || g.ngModuleRef);
            }
            const u = s ? t : new Go(U(t)),
              c = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const y = (s ? c : this.parentInjector).get(ct, null);
              y && (i = y);
            }
            U(u.componentType ?? {});
            const h = u.create(c, o, null, i);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const o = t._lView;
            if (
              (function I_(e) {
                return Fe(e[ce]);
              })(o)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const c = o[ce],
                  l = new py(c, c[Ae], c[ce]);
                l.detach(l.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer;
            return (
              MT(a, o, s, !r), t.attachToViewContainerRef(), Kh(Il(a), s, t), t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = gy(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = ys(this._lContainer, n);
            r && (ss(Il(this._lContainer), n), rc(r[_], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = ys(this._lContainer, n);
            return r && null != ss(Il(this._lContainer), n) ? new zo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function gy(e) {
        return e[8];
      }
      function Il(e) {
        return e[8] || (e[8] = []);
      }
      let vy = function yy(e, t, n, r) {
        if (e[Rt]) return;
        let o;
        (o =
          8 & n.type
            ? re(r)
            : (function LT(e, t) {
                const n = e[k],
                  r = n.createComment(""),
                  o = qe(t, e);
                return (
                  jn(
                    n,
                    Ds(n, o),
                    r,
                    (function n1(e, t) {
                      return e.nextSibling(t);
                    })(n, o),
                    !1,
                  ),
                  r
                );
              })(t, n)),
          (e[Rt] = o);
      };
      const Fl = new M("Application Initializer");
      let kl = (() => {
          var e;
          class t {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((r, o) => {
                  (this.resolve = r), (this.reject = o);
                })),
                (this.appInits = E(Fl, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const r = [];
              for (const i of this.appInits) {
                const s = i();
                if (Ys(s)) r.push(s);
                else if (Mm(s)) {
                  const a = new Promise((u, c) => {
                    s.subscribe({ complete: u, error: c });
                  });
                  r.push(a);
                }
              }
              const o = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(r)
                .then(() => {
                  o();
                })
                .catch((i) => {
                  this.reject(i);
                }),
                0 === r.length && o(),
                (this.initialized = !0);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        Uy = (() => {
          var e;
          class t {
            log(r) {
              console.log(r);
            }
            warn(r) {
              console.warn(r);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })();
      const Xt = new M("LocaleId", {
        providedIn: "root",
        factory: () =>
          E(Xt, V.Optional | V.SkipSelf) ||
          (function pA() {
            return (typeof $localize < "u" && $localize.locale) || Ur;
          })(),
      });
      let zy = (() => {
        var e;
        class t {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new it(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const r = this.taskId++;
            return this.pendingTasks.add(r), r;
          }
          remove(r) {
            this.pendingTasks.delete(r),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class vA {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Gy = (() => {
        var e;
        class t {
          compileModuleSync(r) {
            return new wl(r);
          }
          compileModuleAsync(r) {
            return Promise.resolve(this.compileModuleSync(r));
          }
          compileModuleAndAllComponentsSync(r) {
            const o = this.compileModuleSync(r),
              s = Zt(Je(r).declarations).reduce((a, u) => {
                const c = U(u);
                return c && a.push(new Go(c)), a;
              }, []);
            return new vA(o, s);
          }
          compileModuleAndAllComponentsAsync(r) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(r));
          }
          clearCache() {}
          clearCacheFor(r) {}
          getModuleId(r) {}
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const Qy = new M(""),
        ua = new M("");
      let Bl,
        $l = (() => {
          var e;
          class t {
            constructor(r, o, i) {
              (this._ngZone = r),
                (this.registry = o),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Bl ||
                  ((function LA(e) {
                    Bl = e;
                  })(i),
                  i.addToWindow(o)),
                this._watchAngularEvents(),
                r.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      oe.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let r = this._callbacks.pop();
                    clearTimeout(r.timeoutId), r.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let r = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (o) =>
                    !o.updateCb ||
                    !o.updateCb(r) ||
                    (clearTimeout(o.timeoutId), !1),
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((r) => ({
                    source: r.source,
                    creationLocation: r.creationLocation,
                    data: r.data,
                  }))
                : [];
            }
            addCallback(r, o, i) {
              let s = -1;
              o &&
                o > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (a) => a.timeoutId !== s,
                  )),
                    r(this._didWork, this.getPendingTasks());
                }, o)),
                this._callbacks.push({ doneCb: r, timeoutId: s, updateCb: i });
            }
            whenStable(r, o, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?',
                );
              this.addCallback(r, o, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(r) {
              this.registry.registerApplication(r, this);
            }
            unregisterApplication(r) {
              this.registry.unregisterApplication(r);
            }
            findProviders(r, o, i) {
              return [];
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(S(oe), S(Vl), S(ua));
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        Vl = (() => {
          var e;
          class t {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(r, o) {
              this._applications.set(r, o);
            }
            unregisterApplication(r) {
              this._applications.delete(r);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(r) {
              return this._applications.get(r) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(r, o = !0) {
              return Bl?.findTestabilityInTree(this, r, o) ?? null;
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })(),
        _n = null;
      const Yy = new M("AllowMultipleToken"),
        Hl = new M("PlatformDestroyListeners"),
        Ul = new M("appBootstrapListener");
      class Xy {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function eD(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new M(r);
        return (i = []) => {
          let s = zl();
          if (!s || s.injector.get(Yy, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function VA(e) {
                  if (_n && !_n.get(Yy, !1)) throw new w(400, !1);
                  (function Ky() {
                    !(function c_(e) {
                      uh = e;
                    })(() => {
                      throw new w(600, !1);
                    });
                  })(),
                    (_n = e);
                  const t = e.get(nD);
                  (function Jy(e) {
                    e.get(ng, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function tD(e = [], t) {
                    return lt.create({
                      name: t,
                      providers: [
                        { provide: Dc, useValue: "platform" },
                        { provide: Hl, useValue: new Set([() => (_n = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r),
                );
          }
          return (function HA(e) {
            const t = zl();
            if (!t) throw new w(401, !1);
            return t;
          })();
        };
      }
      function zl() {
        return _n?.get(nD) ?? null;
      }
      let nD = (() => {
        var e;
        class t {
          constructor(r) {
            (this._injector = r),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(r, o) {
            const i = (function UA(e = "zone.js", t) {
              return "noop" === e ? new vI() : "zone.js" === e ? new oe(t) : e;
            })(
              o?.ngZone,
              (function rD(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: o?.ngZoneEventCoalescing,
                runCoalescing: o?.ngZoneRunCoalescing,
              }),
            );
            return i.run(() => {
              const s = (function KS(e, t, n) {
                  return new Dl(e, t, n);
                })(
                  r.moduleType,
                  this.injector,
                  (function uD(e) {
                    return [
                      { provide: oe, useFactory: e },
                      {
                        provide: jo,
                        multi: !0,
                        useFactory: () => {
                          const t = E(GA, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: aD, useFactory: zA },
                      { provide: yg, useFactory: Dg },
                    ];
                  })(() => i),
                ),
                a = s.injector.get(Vn, null);
              return (
                i.runOutsideAngular(() => {
                  const u = i.onError.subscribe({
                    next: (c) => {
                      a.handleError(c);
                    },
                  });
                  s.onDestroy(() => {
                    ca(this._modules, s), u.unsubscribe();
                  });
                }),
                (function oD(e, t, n) {
                  try {
                    const r = n();
                    return Ys(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(a, i, () => {
                  const u = s.injector.get(kl);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function bv(e) {
                          st(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Iv = e.toLowerCase().replace(/_/g, "-"));
                        })(s.injector.get(Xt, Ur) || Ur),
                        this._moduleDoBootstrap(s),
                        s
                      ),
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(r, o = []) {
            const i = iD({}, o);
            return (function jA(e, t, n) {
              const r = new wl(n);
              return Promise.resolve(r);
            })(0, 0, r).then((s) => this.bootstrapModuleFactory(s, i));
          }
          _moduleDoBootstrap(r) {
            const o = r.injector.get(qr);
            if (r._bootstrapComponents.length > 0)
              r._bootstrapComponents.forEach((i) => o.bootstrap(i));
            else {
              if (!r.instance.ngDoBootstrap) throw new w(-403, !1);
              r.instance.ngDoBootstrap(o);
            }
            this._modules.push(r);
          }
          onDestroy(r) {
            this._destroyListeners.push(r);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1);
            this._modules.slice().forEach((o) => o.destroy()),
              this._destroyListeners.forEach((o) => o());
            const r = this._injector.get(Hl, null);
            r && (r.forEach((o) => o()), r.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(S(lt));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          t
        );
      })();
      function iD(e, t) {
        return Array.isArray(t) ? t.reduce(iD, e) : { ...e, ...t };
      }
      let qr = (() => {
        var e;
        class t {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = E(aD)),
              (this.zoneIsStable = E(yg)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = E(zy).hasPendingTasks.pipe(
                Tt((r) => (r ? P(!1) : this.zoneIsStable)),
                (function CC(e, t = sn) {
                  return (
                    (e = e ?? _C),
                    ye((n, r) => {
                      let o,
                        i = !0;
                      n.subscribe(
                        De(r, (s) => {
                          const a = t(s);
                          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
                        }),
                      );
                    })
                  );
                })(),
                Mf(),
              )),
              (this._injector = E(ct));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(r, o) {
            const i = r instanceof ag;
            if (!this._injector.get(kl).done)
              throw (
                (!i &&
                  (function er(e) {
                    const t = U(e) || be(e) || Pe(e);
                    return null !== t && t.standalone;
                  })(r),
                new w(405, !1))
              );
            let a;
            (a = i ? r : this._injector.get(Fs).resolveComponentFactory(r)),
              this.componentTypes.push(a.componentType);
            const u = (function $A(e) {
                return e.isBoundToModule;
              })(a)
                ? void 0
                : this._injector.get(Gn),
              l = a.create(lt.NULL, [], o || a.selector, u),
              d = l.location.nativeElement,
              f = l.injector.get(Qy, null);
            return (
              f?.registerApplication(d),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  ca(this.components, l),
                  f?.unregisterApplication(d);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new w(101, !1);
            try {
              this._runningTick = !0;
              for (let r of this._views) r.detectChanges();
            } catch (r) {
              this.internalErrorHandler(r);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(r) {
            const o = r;
            this._views.push(o), o.attachToAppRef(this);
          }
          detachView(r) {
            const o = r;
            ca(this._views, o), o.detachFromAppRef();
          }
          _loadComponent(r) {
            this.attachView(r.hostView), this.tick(), this.components.push(r);
            const o = this._injector.get(Ul, []);
            o.push(...this._bootstrapListeners), o.forEach((i) => i(r));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((r) => r()),
                  this._views.slice().forEach((r) => r.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(r) {
            return (
              this._destroyListeners.push(r),
              () => ca(this._destroyListeners, r)
            );
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1);
            const r = this._injector;
            r.destroy && !r.destroyed && r.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function ca(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const aD = new M("", {
        providedIn: "root",
        factory: () => E(Vn).handleError.bind(void 0),
      });
      function zA() {
        const e = E(oe),
          t = E(Vn);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let GA = (() => {
        var e;
        class t {
          constructor() {
            (this.zone = E(oe)), (this.applicationRef = E(qr));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      let Gl = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = WA), t;
      })();
      function WA(e) {
        return (function ZA(e, t, n) {
          if (Rn(e) && !n) {
            const r = et(e.index, t);
            return new zo(r, r);
          }
          return 47 & e.type ? new zo(t[pe], t) : null;
        })(Te(), v(), 16 == (16 & e));
      }
      const aN = eD(null, "core", []);
      let uN = (() => {
          var e;
          class t {
            constructor(r) {}
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(S(qr));
            }),
            (e.ɵmod = Nn({ type: e })),
            (e.ɵinj = un({})),
            t
          );
        })(),
        Xl = null;
      function Wr() {
        return Xl;
      }
      class _N {}
      const ft = new M("DocumentToken");
      let Jl = (() => {
        var e;
        class t {
          historyGo(r) {
            throw new Error("Not implemented");
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({
            token: e,
            factory: function () {
              return E(IN);
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      const EN = new M("Location Initialized");
      let IN = (() => {
        var e;
        class t extends Jl {
          constructor() {
            super(),
              (this._doc = E(ft)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Wr().getBaseHref(this._doc);
          }
          onPopState(r) {
            const o = Wr().getGlobalEventTarget(this._doc, "window");
            return (
              o.addEventListener("popstate", r, !1),
              () => o.removeEventListener("popstate", r)
            );
          }
          onHashChange(r) {
            const o = Wr().getGlobalEventTarget(this._doc, "window");
            return (
              o.addEventListener("hashchange", r, !1),
              () => o.removeEventListener("hashchange", r)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(r) {
            this._location.pathname = r;
          }
          pushState(r, o, i) {
            this._history.pushState(r, o, i);
          }
          replaceState(r, o, i) {
            this._history.replaceState(r, o, i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(r = 0) {
            this._history.go(r);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      function ed(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function MD(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function Jt(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Wn = (() => {
        var e;
        class t {
          historyGo(r) {
            throw new Error("Not implemented");
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({
            token: e,
            factory: function () {
              return E(TD);
            },
            providedIn: "root",
          })),
          t
        );
      })();
      const SD = new M("appBaseHref");
      let TD = (() => {
          var e;
          class t extends Wn {
            constructor(r, o) {
              super(),
                (this._platformLocation = r),
                (this._removeListenerFns = []),
                (this._baseHref =
                  o ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  E(ft).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(r) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(r),
                this._platformLocation.onHashChange(r),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(r) {
              return ed(this._baseHref, r);
            }
            path(r = !1) {
              const o =
                  this._platformLocation.pathname +
                  Jt(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && r ? `${o}${i}` : o;
            }
            pushState(r, o, i, s) {
              const a = this.prepareExternalUrl(i + Jt(s));
              this._platformLocation.pushState(r, o, a);
            }
            replaceState(r, o, i, s) {
              const a = this.prepareExternalUrl(i + Jt(s));
              this._platformLocation.replaceState(r, o, a);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(r = 0) {
              this._platformLocation.historyGo?.(r);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(S(Jl), S(SD, 8));
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        bN = (() => {
          var e;
          class t extends Wn {
            constructor(r, o) {
              super(),
                (this._platformLocation = r),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != o && (this._baseHref = o);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(r) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(r),
                this._platformLocation.onHashChange(r),
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(r = !1) {
              let o = this._platformLocation.hash;
              return null == o && (o = "#"), o.length > 0 ? o.substring(1) : o;
            }
            prepareExternalUrl(r) {
              const o = ed(this._baseHref, r);
              return o.length > 0 ? "#" + o : o;
            }
            pushState(r, o, i, s) {
              let a = this.prepareExternalUrl(i + Jt(s));
              0 == a.length && (a = this._platformLocation.pathname),
                this._platformLocation.pushState(r, o, a);
            }
            replaceState(r, o, i, s) {
              let a = this.prepareExternalUrl(i + Jt(s));
              0 == a.length && (a = this._platformLocation.pathname),
                this._platformLocation.replaceState(r, o, a);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(r = 0) {
              this._platformLocation.historyGo?.(r);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(S(Jl), S(SD, 8));
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        td = (() => {
          var e;
          class t {
            constructor(r) {
              (this._subject = new $e()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = r);
              const o = this._locationStrategy.getBaseHref();
              (this._basePath = (function TN(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(MD(AD(o)))),
                this._locationStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(r = !1) {
              return this.normalize(this._locationStrategy.path(r));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(r, o = "") {
              return this.path() == this.normalize(r + Jt(o));
            }
            normalize(r) {
              return t.stripTrailingSlash(
                (function SN(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, AD(r)),
              );
            }
            prepareExternalUrl(r) {
              return (
                r && "/" !== r[0] && (r = "/" + r),
                this._locationStrategy.prepareExternalUrl(r)
              );
            }
            go(r, o = "", i = null) {
              this._locationStrategy.pushState(i, "", r, o),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(r + Jt(o)),
                  i,
                );
            }
            replaceState(r, o = "", i = null) {
              this._locationStrategy.replaceState(i, "", r, o),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(r + Jt(o)),
                  i,
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(r = 0) {
              this._locationStrategy.historyGo?.(r);
            }
            onUrlChange(r) {
              return (
                this._urlChangeListeners.push(r),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((o) => {
                    this._notifyUrlChangeListeners(o.url, o.state);
                  })),
                () => {
                  const o = this._urlChangeListeners.indexOf(r);
                  this._urlChangeListeners.splice(o, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(r = "", o) {
              this._urlChangeListeners.forEach((i) => i(r, o));
            }
            subscribe(r, o, i) {
              return this._subject.subscribe({
                next: r,
                error: o,
                complete: i,
              });
            }
          }
          return (
            ((e = t).normalizeQueryParams = Jt),
            (e.joinWithSlash = ed),
            (e.stripTrailingSlash = MD),
            (e.ɵfac = function (r) {
              return new (r || e)(S(Wn));
            }),
            (e.ɵprov = T({
              token: e,
              factory: function () {
                return (function MN() {
                  return new td(S(Wn));
                })();
              },
              providedIn: "root",
            })),
            t
          );
        })();
      function AD(e) {
        return e.replace(/\/index.html$/, "");
      }
      class fd {
        constructor(t, n) {
          (this._viewContainerRef = t),
            (this._templateRef = n),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(t) {
          t && !this._created
            ? this.create()
            : !t && this._created && this.destroy();
        }
      }
      let Ia = (() => {
          var e;
          class t {
            constructor() {
              (this._defaultViews = []),
                (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(r) {
              (this._ngSwitch = r),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(r) {
              this._defaultViews.push(r);
            }
            _matchCase(r) {
              const o = r == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || o),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                o
              );
            }
            _updateDefaultCases(r) {
              if (this._defaultViews.length > 0 && r !== this._defaultUsed) {
                this._defaultUsed = r;
                for (const o of this._defaultViews) o.enforceState(r);
              }
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵdir = Oe({
              type: e,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
              standalone: !0,
            })),
            t
          );
        })(),
        HD = (() => {
          var e;
          class t {
            constructor(r, o, i) {
              (this.ngSwitch = i), i._addCase(), (this._view = new fd(r, o));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase),
              );
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(A(Et), A(Kt), A(Ia, 9));
            }),
            (e.ɵdir = Oe({
              type: e,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
              standalone: !0,
            })),
            t
          );
        })(),
        UD = (() => {
          var e;
          class t {
            constructor(r, o, i) {
              i._addDefault(new fd(r, o));
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(A(Et), A(Kt), A(Ia, 9));
            }),
            (e.ɵdir = Oe({
              type: e,
              selectors: [["", "ngSwitchDefault", ""]],
              standalone: !0,
            })),
            t
          );
        })(),
        BR = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵmod = Nn({ type: e })),
            (e.ɵinj = un({})),
            t
          );
        })();
      function WD(e) {
        return "server" === e;
      }
      let GR = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵprov = T({
            token: e,
            providedIn: "root",
            factory: () => new qR(S(ft), window),
          })),
          t
        );
      })();
      class qR {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function WR(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = t);
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      class vx extends _N {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class vd extends vx {
        static makeCurrent() {
          !(function CN(e) {
            Xl || (Xl = e);
          })(new vd());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function yx() {
            return (
              (li = li || document.querySelector("base")),
              li ? li.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function Dx(e) {
                (Sa = Sa || document.createElement("a")),
                  Sa.setAttribute("href", e);
                const t = Sa.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          li = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function fR(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Sa,
        li = null,
        Cx = (() => {
          var e;
          class t {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac })),
            t
          );
        })();
      const yd = new M("EventManagerPlugins");
      let XD = (() => {
        var e;
        class t {
          constructor(r, o) {
            (this._zone = o),
              (this._eventNameToPlugin = new Map()),
              r.forEach((i) => {
                i.manager = this;
              }),
              (this._plugins = r.slice().reverse());
          }
          addEventListener(r, o, i) {
            return this._findPluginFor(o).addEventListener(r, o, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(r) {
            let o = this._eventNameToPlugin.get(r);
            if (o) return o;
            if (((o = this._plugins.find((s) => s.supports(r))), !o))
              throw new w(5101, !1);
            return this._eventNameToPlugin.set(r, o), o;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(S(yd), S(oe));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class JD {
        constructor(t) {
          this._doc = t;
        }
      }
      const Dd = "ng-app-id";
      let e0 = (() => {
        var e;
        class t {
          constructor(r, o, i, s = {}) {
            (this.doc = r),
              (this.appId = o),
              (this.nonce = i),
              (this.platformId = s),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = WD(s)),
              this.resetHostNodes();
          }
          addStyles(r) {
            for (const o of r)
              1 === this.changeUsageCount(o, 1) && this.onStyleAdded(o);
          }
          removeStyles(r) {
            for (const o of r)
              this.changeUsageCount(o, -1) <= 0 && this.onStyleRemoved(o);
          }
          ngOnDestroy() {
            const r = this.styleNodesInDOM;
            r && (r.forEach((o) => o.remove()), r.clear());
            for (const o of this.getAllStyles()) this.onStyleRemoved(o);
            this.resetHostNodes();
          }
          addHost(r) {
            this.hostNodes.add(r);
            for (const o of this.getAllStyles()) this.addStyleToHost(r, o);
          }
          removeHost(r) {
            this.hostNodes.delete(r);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(r) {
            for (const o of this.hostNodes) this.addStyleToHost(o, r);
          }
          onStyleRemoved(r) {
            const o = this.styleRef;
            o.get(r)?.elements?.forEach((i) => i.remove()), o.delete(r);
          }
          collectServerRenderedStyles() {
            const r = this.doc.head?.querySelectorAll(
              `style[${Dd}="${this.appId}"]`,
            );
            if (r?.length) {
              const o = new Map();
              return (
                r.forEach((i) => {
                  null != i.textContent && o.set(i.textContent, i);
                }),
                o
              );
            }
            return null;
          }
          changeUsageCount(r, o) {
            const i = this.styleRef;
            if (i.has(r)) {
              const s = i.get(r);
              return (s.usage += o), s.usage;
            }
            return i.set(r, { usage: o, elements: [] }), o;
          }
          getStyleElement(r, o) {
            const i = this.styleNodesInDOM,
              s = i?.get(o);
            if (s?.parentNode === r)
              return i.delete(o), s.removeAttribute(Dd), s;
            {
              const a = this.doc.createElement("style");
              return (
                this.nonce && a.setAttribute("nonce", this.nonce),
                (a.textContent = o),
                this.platformIsServer && a.setAttribute(Dd, this.appId),
                a
              );
            }
          }
          addStyleToHost(r, o) {
            const i = this.getStyleElement(r, o);
            r.appendChild(i);
            const s = this.styleRef,
              a = s.get(o)?.elements;
            a ? a.push(i) : s.set(o, { elements: [i], usage: 1 });
          }
          resetHostNodes() {
            const r = this.hostNodes;
            r.clear(), r.add(this.doc.head);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(S(ft), S(As), S(rg, 8), S(br));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const wd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Cd = /%COMP%/g,
        bx = new M("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function n0(e, t) {
        return t.map((n) => n.replace(Cd, e));
      }
      let r0 = (() => {
        var e;
        class t {
          constructor(r, o, i, s, a, u, c, l = null) {
            (this.eventManager = r),
              (this.sharedStylesHost = o),
              (this.appId = i),
              (this.removeStylesOnCompDestroy = s),
              (this.doc = a),
              (this.platformId = u),
              (this.ngZone = c),
              (this.nonce = l),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = WD(u)),
              (this.defaultRenderer = new _d(r, a, c, this.platformIsServer));
          }
          createRenderer(r, o) {
            if (!r || !o) return this.defaultRenderer;
            this.platformIsServer &&
              o.encapsulation === vt.ShadowDom &&
              (o = { ...o, encapsulation: vt.Emulated });
            const i = this.getOrCreateRenderer(r, o);
            return (
              i instanceof s0
                ? i.applyToHost(r)
                : i instanceof Ed && i.applyStyles(),
              i
            );
          }
          getOrCreateRenderer(r, o) {
            const i = this.rendererByCompId;
            let s = i.get(o.id);
            if (!s) {
              const a = this.doc,
                u = this.ngZone,
                c = this.eventManager,
                l = this.sharedStylesHost,
                d = this.removeStylesOnCompDestroy,
                f = this.platformIsServer;
              switch (o.encapsulation) {
                case vt.Emulated:
                  s = new s0(c, l, o, this.appId, d, a, u, f);
                  break;
                case vt.ShadowDom:
                  return new Ax(c, l, r, o, a, u, this.nonce, f);
                default:
                  s = new Ed(c, l, o, d, a, u, f);
              }
              i.set(o.id, s);
            }
            return s;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(
              S(XD),
              S(e0),
              S(As),
              S(bx),
              S(ft),
              S(br),
              S(oe),
              S(rg),
            );
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class _d {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(wd[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (o0(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (o0(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new w(-5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = wd[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = wd[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (gn.DashCase | gn.Important)
            ? t.style.setProperty(n, r, o & gn.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & gn.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = Wr().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r),
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function o0(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class Ax extends _d {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const c = n0(o.id, o.styles);
          for (const l of c) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = l),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t)),
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Ed extends _d {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? n0(u, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class s0 extends Ed {
        constructor(t, n, r, o, i, s, a, u) {
          const c = o + "-" + r.id;
          super(t, n, r, i, s, a, u, c),
            (this.contentAttr = (function Mx(e) {
              return "_ngcontent-%COMP%".replace(Cd, e);
            })(c)),
            (this.hostAttr = (function Sx(e) {
              return "_nghost-%COMP%".replace(Cd, e);
            })(c));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let Nx = (() => {
        var e;
        class t extends JD {
          constructor(r) {
            super(r);
          }
          supports(r) {
            return !0;
          }
          addEventListener(r, o, i) {
            return (
              r.addEventListener(o, i, !1),
              () => this.removeEventListener(r, o, i)
            );
          }
          removeEventListener(r, o, i) {
            return r.removeEventListener(o, i);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(S(ft));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const a0 = ["alt", "control", "meta", "shift"],
        Rx = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        xx = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let Ox = (() => {
        var e;
        class t extends JD {
          constructor(r) {
            super(r);
          }
          supports(r) {
            return null != t.parseEventName(r);
          }
          addEventListener(r, o, i) {
            const s = t.parseEventName(o),
              a = t.eventCallback(s.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Wr().onAndCancel(r, s.domEventName, a));
          }
          static parseEventName(r) {
            const o = r.toLowerCase().split("."),
              i = o.shift();
            if (0 === o.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const s = t._normalizeKey(o.pop());
            let a = "",
              u = o.indexOf("code");
            if (
              (u > -1 && (o.splice(u, 1), (a = "code.")),
              a0.forEach((l) => {
                const d = o.indexOf(l);
                d > -1 && (o.splice(d, 1), (a += l + "."));
              }),
              (a += s),
              0 != o.length || 0 === s.length)
            )
              return null;
            const c = {};
            return (c.domEventName = i), (c.fullKey = a), c;
          }
          static matchEventFullKeyCode(r, o) {
            let i = Rx[r.key] || r.key,
              s = "";
            return (
              o.indexOf("code.") > -1 && ((i = r.code), (s = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                a0.forEach((a) => {
                  a !== i && (0, xx[a])(r) && (s += a + ".");
                }),
                (s += i),
                s === o)
            );
          }
          static eventCallback(r, o, i) {
            return (s) => {
              t.matchEventFullKeyCode(s, r) && i.runGuarded(() => o(s));
            };
          }
          static _normalizeKey(r) {
            return "esc" === r ? "escape" : r;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(S(ft));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const Lx = eD(aN, "browser", [
          { provide: br, useValue: "browser" },
          {
            provide: ng,
            useValue: function Px() {
              vd.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: ft,
            useFactory: function kx() {
              return (
                (function l1(e) {
                  lc = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        jx = new M(""),
        l0 = [
          {
            provide: ua,
            useClass: class wx {
              addToWindow(t) {
                (ne.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i) throw new w(5103, !1);
                  return i;
                }),
                  (ne.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ne.getAllAngularRootElements = () => t.getAllRootElements()),
                  ne.frameworkStabilizers || (ne.frameworkStabilizers = []),
                  ne.frameworkStabilizers.push((r) => {
                    const o = ne.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach((u) => {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Wr().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Qy, useClass: $l, deps: [oe, Vl, ua] },
          { provide: $l, useClass: $l, deps: [oe, Vl, ua] },
        ],
        d0 = [
          { provide: Dc, useValue: "root" },
          {
            provide: Vn,
            useFactory: function Fx() {
              return new Vn();
            },
            deps: [],
          },
          { provide: yd, useClass: Nx, multi: !0, deps: [ft, oe, br] },
          { provide: yd, useClass: Ox, multi: !0, deps: [ft] },
          r0,
          e0,
          XD,
          { provide: cg, useExisting: r0 },
          { provide: class ZR {}, useClass: Cx, deps: [] },
          [],
        ];
      let $x = (() => {
          var e;
          class t {
            constructor(r) {}
            static withServerTransition(r) {
              return {
                ngModule: t,
                providers: [{ provide: As, useValue: r.appId }],
              };
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(S(jx, 12));
            }),
            (e.ɵmod = Nn({ type: e })),
            (e.ɵinj = un({ providers: [...d0, ...l0], imports: [BR, uN] })),
            t
          );
        })(),
        f0 = (() => {
          var e;
          class t {
            constructor(r) {
              this._doc = r;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(r) {
              this._doc.title = r || "";
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(S(ft));
            }),
            (e.ɵprov = T({
              token: e,
              factory: function (r) {
                let o = null;
                return (
                  (o = r
                    ? new r()
                    : (function Bx() {
                        return new f0(S(ft));
                      })()),
                  o
                );
              },
              providedIn: "root",
            })),
            t
          );
        })();
      typeof window < "u" && window;
      const { isArray: Wx } = Array,
        { getPrototypeOf: Zx, prototype: Qx, keys: Yx } = Object;
      const { isArray: Jx } = Array;
      function bd(...e) {
        const t = co(e),
          n = (function fC(e) {
            return J(nu(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function Kx(e) {
            if (1 === e.length) {
              const t = e[0];
              if (Wx(t)) return { args: t, keys: null };
              if (
                (function Xx(e) {
                  return e && "object" == typeof e && Zx(e) === Qx;
                })(t)
              ) {
                const n = Yx(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return Ie([], t);
        const i = new ve(
          (function rO(e, t, n = sn) {
            return (r) => {
              m0(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    m0(
                      t,
                      () => {
                        const c = Ie(e[u], t);
                        let l = !1;
                        c.subscribe(
                          De(
                            r,
                            (d) => {
                              (i[u] = d),
                                l || ((l = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            },
                          ),
                        );
                      },
                      r,
                    );
                },
                r,
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function nO(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : sn,
          ),
        );
        return n
          ? i.pipe(
              (function tO(e) {
                return te((t) =>
                  (function eO(e, t) {
                    return Jx(t) ? e(...t) : e(t);
                  })(e, t),
                );
              })(n),
            )
          : i;
      }
      function m0(e, t, n) {
        e ? Bt(n, e, t) : t();
      }
      const Ta = so(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          },
      );
      function Md(...e) {
        return (function oO() {
          return Xn(1);
        })()(Ie(e, co(e)));
      }
      function v0(e) {
        return new ve((t) => {
          ot(e()).subscribe(t);
        });
      }
      function di(e, t) {
        const n = J(e) ? e : () => e,
          r = (o) => o.error(n());
        return new ve(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function Sd() {
        return ye((e, t) => {
          let n = null;
          e._refCount++;
          const r = De(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class y0 extends ve {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            uf(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new Ke();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                De(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown(),
                ),
              ),
            ),
              t.closed && ((this._connection = null), (t = Ke.EMPTY));
          }
          return t;
        }
        refCount() {
          return Sd()(this);
        }
      }
      function Qr(e) {
        return e <= 0
          ? () => St
          : ye((t, n) => {
              let r = 0;
              t.subscribe(
                De(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                }),
              );
            });
      }
      function In(e, t) {
        return ye((n, r) => {
          let o = 0;
          n.subscribe(De(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function Aa(e) {
        return ye((t, n) => {
          let r = !1;
          t.subscribe(
            De(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              },
            ),
          );
        });
      }
      function D0(e = sO) {
        return ye((t, n) => {
          let r = !1;
          t.subscribe(
            De(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e())),
            ),
          );
        });
      }
      function sO() {
        return new Ta();
      }
      function Zn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? In((o, i) => e(o, i, r)) : sn,
            Qr(1),
            n ? Aa(t) : D0(() => new Ta()),
          );
      }
      function fi(e, t) {
        return J(t) ? Ee(e, t, 1) : Ee(e, 1);
      }
      function xe(e, t, n) {
        const r = J(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? ye((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                De(
                  i,
                  (u) => {
                    var c;
                    null === (c = r.next) || void 0 === c || c.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var c;
                    (a = !1),
                      null === (c = r.error) || void 0 === c || c.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, c;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (c = r.finalize) || void 0 === c || c.call(r);
                  },
                ),
              );
            })
          : sn;
      }
      function Qn(e) {
        return ye((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            De(n, void 0, void 0, (s) => {
              (i = ot(e(s, Qn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            }),
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function Td(e) {
        return e <= 0
          ? () => St
          : ye((t, n) => {
              let r = [];
              t.subscribe(
                De(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  },
                ),
              );
            });
      }
      function Ad(e) {
        return ye((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const $ = "primary",
        hi = Symbol("RouteTitle");
      class fO {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Yr(e) {
        return new fO(e);
      }
      function hO(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function $t(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !w0(e[o], t[o]))) return !1;
        return !0;
      }
      function w0(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function C0(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function bn(e) {
        return (function qx(e) {
          return !!e && (e instanceof ve || (J(e.lift) && J(e.subscribe)));
        })(e)
          ? e
          : Ys(e)
          ? Ie(Promise.resolve(e))
          : P(e);
      }
      const gO = {
          exact: function I0(e, t, n) {
            if (
              !Yn(e.segments, t.segments) ||
              !Na(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !I0(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: b0,
        },
        _0 = {
          exact: function mO(e, t) {
            return $t(e, t);
          },
          subset: function vO(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => w0(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function E0(e, t, n) {
        return (
          gO[n.paths](e.root, t.root, n.matrixParams) &&
          _0[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function b0(e, t, n) {
        return M0(e, t, t.segments, n);
      }
      function M0(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Yn(o, n) || t.hasChildren() || !Na(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Yn(e.segments, n) || !Na(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !b0(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Yn(e.segments, o) && Na(e.segments, o, r) && e.children[$]) &&
            M0(e.children[$], t, i, r)
          );
        }
      }
      function Na(e, t, n) {
        return t.every((r, o) => _0[n](e[o].parameters, r.parameters));
      }
      class Kr {
        constructor(t = new X([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Yr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return wO.serialize(this);
        }
      }
      class X {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Object.values(n).forEach((r) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Ra(this);
        }
      }
      class pi {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Yr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return A0(this);
        }
      }
      function Yn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let gi = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({
            token: e,
            factory: function () {
              return new Nd();
            },
            providedIn: "root",
          })),
          t
        );
      })();
      class Nd {
        parse(t) {
          const n = new RO(t);
          return new Kr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment(),
          );
        }
        serialize(t) {
          const n = `/${mi(t.root, !0)}`,
            r = (function EO(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${xa(n)}=${xa(o)}`).join("&")
                    : `${xa(n)}=${xa(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function CO(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const wO = new Nd();
      function Ra(e) {
        return e.segments.map((t) => A0(t)).join("/");
      }
      function mi(e, t) {
        if (!e.hasChildren()) return Ra(e);
        if (t) {
          const n = e.children[$] ? mi(e.children[$], !1) : "",
            r = [];
          return (
            Object.entries(e.children).forEach(([o, i]) => {
              o !== $ && r.push(`${o}:${mi(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function DO(e, t) {
            let n = [];
            return (
              Object.entries(e.children).forEach(([r, o]) => {
                r === $ && (n = n.concat(t(o, r)));
              }),
              Object.entries(e.children).forEach(([r, o]) => {
                r !== $ && (n = n.concat(t(o, r)));
              }),
              n
            );
          })(e, (r, o) =>
            o === $ ? [mi(e.children[$], !1)] : [`${o}:${mi(r, !1)}`],
          );
          return 1 === Object.keys(e.children).length && null != e.children[$]
            ? `${Ra(e)}/${n[0]}`
            : `${Ra(e)}/(${n.join("//")})`;
        }
      }
      function S0(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function xa(e) {
        return S0(e).replace(/%3B/gi, ";");
      }
      function Rd(e) {
        return S0(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Oa(e) {
        return decodeURIComponent(e);
      }
      function T0(e) {
        return Oa(e.replace(/\+/g, "%20"));
      }
      function A0(e) {
        return `${Rd(e.path)}${(function _O(e) {
          return Object.keys(e)
            .map((t) => `;${Rd(t)}=${Rd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const IO = /^[^\/()?;#]+/;
      function xd(e) {
        const t = e.match(IO);
        return t ? t[0] : "";
      }
      const bO = /^[^\/()?;=#]+/,
        SO = /^[^=?&#]+/,
        AO = /^[^&#]+/;
      class RO {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new X([], {})
              : new X([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[$] = new X(t, n)),
            r
          );
        }
        parseSegment() {
          const t = xd(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new w(4009, !1);
          return this.capture(t), new pi(Oa(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = (function MO(e) {
            const t = e.match(bO);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = xd(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Oa(n)] = Oa(r);
        }
        parseQueryParam(t) {
          const n = (function TO(e) {
            const t = e.match(SO);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function NO(e) {
              const t = e.match(AO);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = T0(n),
            i = T0(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = xd(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new w(4010, !1);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = $);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[$] : new X([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new w(4011, !1);
        }
      }
      function N0(e) {
        return e.segments.length > 0 ? new X([], { [$]: e }) : e;
      }
      function R0(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = R0(e.children[r]);
          if (r === $ && 0 === i.segments.length && i.hasChildren())
            for (const [s, a] of Object.entries(i.children)) t[s] = a;
          else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function xO(e) {
          if (1 === e.numberOfChildren && e.children[$]) {
            const t = e.children[$];
            return new X(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new X(e.segments, t));
      }
      function Kn(e) {
        return e instanceof Kr;
      }
      function x0(e) {
        let t;
        const o = N0(
          (function n(i) {
            const s = {};
            for (const u of i.children) {
              const c = n(u);
              s[u.outlet] = c;
            }
            const a = new X(i.url, s);
            return i === e && (t = a), a;
          })(e.root),
        );
        return t ?? o;
      }
      function O0(e, t, n, r) {
        let o = e;
        for (; o.parent; ) o = o.parent;
        if (0 === t.length) return Od(o, o, o, n, r);
        const i = (function PO(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new F0(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Object.entries(i.outlets).forEach(([u, c]) => {
                    a[u] = "string" == typeof c ? c.split("/") : c;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new F0(n, t, r);
        })(t);
        if (i.toRoot()) return Od(o, o, new X([], {}), n, r);
        const s = (function FO(e, t, n) {
            if (e.isAbsolute) return new Fa(t, !0, 0);
            if (!n) return new Fa(t, !1, NaN);
            if (null === n.parent) return new Fa(n, !0, 0);
            const r = Pa(e.commands[0]) ? 0 : 1;
            return (function kO(e, t, n) {
              let r = e,
                o = t,
                i = n;
              for (; i > o; ) {
                if (((i -= o), (r = r.parent), !r)) throw new w(4005, !1);
                o = r.segments.length;
              }
              return new Fa(r, !1, o - i);
            })(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
          })(i, o, e),
          a = s.processChildren
            ? yi(s.segmentGroup, s.index, i.commands)
            : k0(s.segmentGroup, s.index, i.commands);
        return Od(o, s.segmentGroup, a, n, r);
      }
      function Pa(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function vi(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Od(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Object.entries(r).forEach(([u, c]) => {
            i[u] = Array.isArray(c) ? c.map((l) => `${l}`) : `${c}`;
          }),
          (s = e === t ? n : P0(e, t, n));
        const a = N0(R0(s));
        return new Kr(a, i, o);
      }
      function P0(e, t, n) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([o, i]) => {
            r[o] = i === t ? n : P0(i, t, n);
          }),
          new X(e.segments, r)
        );
      }
      class F0 {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Pa(r[0]))
          )
            throw new w(4003, !1);
          const o = r.find(vi);
          if (o && o !== C0(r)) throw new w(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Fa {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function k0(e, t, n) {
        if (
          (e || (e = new X([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return yi(e, t, n);
        const r = (function jO(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (vi(a)) break;
              const u = `${a}`,
                c = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && c && "object" == typeof c && void 0 === c.outlets) {
                if (!j0(u, c, s)) return i;
                r += 2;
              } else {
                if (!j0(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new X(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[$] = new X(e.segments.slice(r.pathIndex), e.children)),
            yi(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new X(e.segments, {})
          : r.match && !e.hasChildren()
          ? Pd(e, t, n)
          : r.match
          ? yi(e, 0, o)
          : Pd(e, t, n);
      }
      function yi(e, t, n) {
        if (0 === n.length) return new X(e.segments, {});
        {
          const r = (function LO(e) {
              return vi(e[0]) ? e[0].outlets : { [$]: e };
            })(n),
            o = {};
          if (
            Object.keys(r).some((i) => i !== $) &&
            e.children[$] &&
            1 === e.numberOfChildren &&
            0 === e.children[$].segments.length
          ) {
            const i = yi(e.children[$], t, n);
            return new X(e.segments, i.children);
          }
          return (
            Object.entries(r).forEach(([i, s]) => {
              "string" == typeof s && (s = [s]),
                null !== s && (o[i] = k0(e.children[i], t, s));
            }),
            Object.entries(e.children).forEach(([i, s]) => {
              void 0 === r[i] && (o[i] = s);
            }),
            new X(e.segments, o)
          );
        }
      }
      function Pd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (vi(i)) {
            const u = $O(i.outlets);
            return new X(r, u);
          }
          if (0 === o && Pa(n[0])) {
            r.push(new pi(e.segments[t].path, L0(n[0]))), o++;
            continue;
          }
          const s = vi(i) ? i.outlets[$] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Pa(a)
            ? (r.push(new pi(s, L0(a))), (o += 2))
            : (r.push(new pi(s, {})), o++);
        }
        return new X(r, {});
      }
      function $O(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => {
            "string" == typeof r && (r = [r]),
              null !== r && (t[n] = Pd(new X([], {}), 0, r));
          }),
          t
        );
      }
      function L0(e) {
        const t = {};
        return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
      }
      function j0(e, t, n) {
        return e == n.path && $t(t, n.parameters);
      }
      const Di = "imperative";
      class Vt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class ka extends Vt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Mn extends Vt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class wi extends Vt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Xr extends Vt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class La extends Vt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class $0 extends Vt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class VO extends Vt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class BO extends Vt {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class HO extends Vt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class UO extends Vt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class zO {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class GO {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class qO {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class WO {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ZO {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class QO {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class V0 {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class Fd {}
      class kd {
        constructor(t) {
          this.url = t;
        }
      }
      class YO {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new Ci()),
            (this.attachRef = null);
        }
      }
      let Ci = (() => {
        var e;
        class t {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(r, o) {
            const i = this.getOrCreateContext(r);
            (i.outlet = o), this.contexts.set(r, i);
          }
          onChildOutletDestroyed(r) {
            const o = this.getContext(r);
            o && ((o.outlet = null), (o.attachRef = null));
          }
          onOutletDeactivated() {
            const r = this.contexts;
            return (this.contexts = new Map()), r;
          }
          onOutletReAttached(r) {
            this.contexts = r;
          }
          getOrCreateContext(r) {
            let o = this.getContext(r);
            return o || ((o = new YO()), this.contexts.set(r, o)), o;
          }
          getContext(r) {
            return this.contexts.get(r) || null;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class B0 {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Ld(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Ld(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = jd(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return jd(t, this._root).map((n) => n.value);
        }
      }
      function Ld(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Ld(e, n);
          if (r) return r;
        }
        return null;
      }
      function jd(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = jd(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class nn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Jr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class H0 extends B0 {
        constructor(t, n) {
          super(t), (this.snapshot = n), $d(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function U0(e, t) {
        const n = (function KO(e, t) {
            const s = new ja([], {}, {}, "", {}, $, t, null, {});
            return new G0("", new nn(s, []));
          })(0, t),
          r = new it([new pi("", {})]),
          o = new it({}),
          i = new it({}),
          s = new it({}),
          a = new it(""),
          u = new eo(r, o, s, a, i, $, t, n.root);
        return (u.snapshot = n.root), new H0(new nn(u, []), n);
      }
      class eo {
        constructor(t, n, r, o, i, s, a, u) {
          (this.urlSubject = t),
            (this.paramsSubject = n),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = o),
            (this.dataSubject = i),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u),
            (this.title =
              this.dataSubject?.pipe(te((c) => c[hi])) ?? P(void 0)),
            (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(te((t) => Yr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(te((t) => Yr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function z0(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function XO(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} },
          );
        })(n.slice(r));
      }
      class ja {
        get title() {
          return this.data?.[hi];
        }
        constructor(t, n, r, o, i, s, a, u, c) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Yr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Yr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class G0 extends B0 {
        constructor(t, n) {
          super(n), (this.url = t), $d(this, n);
        }
        toString() {
          return q0(this._root);
        }
      }
      function $d(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => $d(e, n));
      }
      function q0(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(q0).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Vd(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            $t(t.queryParams, n.queryParams) ||
              e.queryParamsSubject.next(n.queryParams),
            t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
            $t(t.params, n.params) || e.paramsSubject.next(n.params),
            (function pO(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!$t(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.urlSubject.next(n.url),
            $t(t.data, n.data) || e.dataSubject.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function Bd(e, t) {
        const n =
          $t(e.params, t.params) &&
          (function yO(e, t) {
            return (
              Yn(e, t) && e.every((n, r) => $t(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Bd(e.parent, t.parent))
        );
      }
      let Hd = (() => {
        var e;
        class t {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = $),
              (this.activateEvents = new $e()),
              (this.deactivateEvents = new $e()),
              (this.attachEvents = new $e()),
              (this.detachEvents = new $e()),
              (this.parentContexts = E(Ci)),
              (this.location = E(Et)),
              (this.changeDetector = E(Gl)),
              (this.environmentInjector = E(ct)),
              (this.inputBinder = E($a, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(r) {
            if (r.name) {
              const { firstChange: o, previousValue: i } = r.name;
              if (o) return;
              this.isTrackedInParentContexts(i) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(i)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(r) {
            return this.parentContexts.getContext(r)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const r = this.parentContexts.getContext(this.name);
            r?.route &&
              (r.attachRef
                ? this.attach(r.attachRef, r.route)
                : this.activateWith(r.route, r.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new w(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new w(4012, !1);
            this.location.detach();
            const r = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(r.instance),
              r
            );
          }
          attach(r, o) {
            (this.activated = r),
              (this._activatedRoute = o),
              this.location.insert(r.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(r.instance);
          }
          deactivate() {
            if (this.activated) {
              const r = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(r);
            }
          }
          activateWith(r, o) {
            if (this.isActivated) throw new w(4013, !1);
            this._activatedRoute = r;
            const i = this.location,
              a = r.snapshot.component,
              u = this.parentContexts.getOrCreateContext(this.name).children,
              c = new JO(r, u, i.injector);
            (this.activated = i.createComponent(a, {
              index: i.length,
              injector: c,
              environmentInjector: o ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵdir = Oe({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [On],
          })),
          t
        );
      })();
      class JO {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === eo
            ? this.route
            : t === Ci
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      const $a = new M("");
      let W0 = (() => {
        var e;
        class t {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(r) {
            this.unsubscribeFromRouteData(r), this.subscribeToRouteData(r);
          }
          unsubscribeFromRouteData(r) {
            this.outletDataSubscriptions.get(r)?.unsubscribe(),
              this.outletDataSubscriptions.delete(r);
          }
          subscribeToRouteData(r) {
            const { activatedRoute: o } = r,
              i = bd([o.queryParams, o.params, o.data])
                .pipe(
                  Tt(
                    ([s, a, u], c) => (
                      (u = { ...s, ...a, ...u }),
                      0 === c ? P(u) : Promise.resolve(u)
                    ),
                  ),
                )
                .subscribe((s) => {
                  if (
                    !r.isActivated ||
                    !r.activatedComponentRef ||
                    r.activatedRoute !== o ||
                    null === o.component
                  )
                    return void this.unsubscribeFromRouteData(r);
                  const a = (function wN(e) {
                    const t = U(e);
                    if (!t) return null;
                    const n = new Go(t);
                    return {
                      get selector() {
                        return n.selector;
                      },
                      get type() {
                        return n.componentType;
                      },
                      get inputs() {
                        return n.inputs;
                      },
                      get outputs() {
                        return n.outputs;
                      },
                      get ngContentSelectors() {
                        return n.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                      get isSignal() {
                        return t.signals;
                      },
                    };
                  })(o.component);
                  if (a)
                    for (const { templateName: u } of a.inputs)
                      r.activatedComponentRef.setInput(u, s[u]);
                  else this.unsubscribeFromRouteData(r);
                });
            this.outletDataSubscriptions.set(r, i);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function _i(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function tP(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return _i(e, r, o);
              return _i(e, r);
            });
          })(e, t, n);
          return new nn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => _i(e, a))),
                s
              );
            }
          }
          const r = (function nP(e) {
              return new eo(
                new it(e.url),
                new it(e.params),
                new it(e.queryParams),
                new it(e.fragment),
                new it(e.data),
                e.outlet,
                e.component,
                e,
              );
            })(t.value),
            o = t.children.map((i) => _i(e, i));
          return new nn(r, o);
        }
      }
      const Ud = "ngNavigationCancelingError";
      function Z0(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Kn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = Q0(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function Q0(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Ud] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function Y0(e) {
        return e && e[Ud];
      }
      let K0 = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵcmp = wu({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Xv],
            decls: 1,
            vars: 0,
            template: function (r, o) {
              1 & r && G(0, "router-outlet");
            },
            dependencies: [Hd],
            encapsulation: 2,
          })),
          t
        );
      })();
      function zd(e) {
        const t = e.children && e.children.map(zd),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== $ &&
            (n.component = K0),
          n
        );
      }
      function Mt(e) {
        return e.outlet || $;
      }
      function Ei(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class lP {
        constructor(t, n, r, o, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Vd(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Jr(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Object.values(o).forEach((i) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Jr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Jr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Jr(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new QO(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new WO(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Vd(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Vd(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Ei(o.snapshot);
              (s.attachRef = null),
                (s.route = o),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class X0 {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Va {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function dP(e, t, n) {
        const r = e._root;
        return Ii(r, t ? t._root : null, n, [r.value]);
      }
      function to(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function AC(e) {
              return null !== Pi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Ii(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] },
      ) {
        const i = Jr(t);
        return (
          e.children.forEach((s) => {
            (function hP(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] },
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function pP(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Yn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Yn(e.url, t.url) || !$t(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Bd(e, t) || !$t(e.queryParams, t.queryParams);
                    default:
                      return !Bd(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new X0(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Ii(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Va(a.outlet.component, s));
              } else
                s && bi(t, a, o),
                  o.canActivateChecks.push(new X0(r)),
                  Ii(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Object.entries(i).forEach(([s, a]) => bi(a, n.getContext(s), o)),
          o
        );
      }
      function bi(e, t, n) {
        const r = Jr(e),
          o = e.value;
        Object.entries(r).forEach(([i, s]) => {
          bi(s, o.component ? (t ? t.children.getContext(i) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Va(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o,
            ),
          );
      }
      function Mi(e) {
        return "function" == typeof e;
      }
      function J0(e) {
        return e instanceof Ta || "EmptyError" === e?.name;
      }
      const Ba = Symbol("INITIAL_VALUE");
      function no() {
        return Tt((e) =>
          bd(
            e.map((t) =>
              t.pipe(
                Qr(1),
                (function iO(...e) {
                  const t = co(e);
                  return ye((n, r) => {
                    (t ? Md(e, n, t) : Md(e, n)).subscribe(r);
                  });
                })(Ba),
              ),
            ),
          ).pipe(
            te((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Ba) return Ba;
                  if (!1 === n || n instanceof Kr) return n;
                }
              return !0;
            }),
            In((t) => t !== Ba),
            Qr(1),
          ),
        );
      }
      function ew(e) {
        return (function Nw(...e) {
          return rf(e);
        })(
          xe((t) => {
            if (Kn(t)) throw Z0(0, t);
          }),
          te((t) => !0 === t),
        );
      }
      class Ha {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class tw {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ro(e) {
        return di(new Ha(e));
      }
      function nw(e) {
        return di(new tw(e));
      }
      class PP {
        constructor(t, n) {
          (this.urlSerializer = t), (this.urlTree = n);
        }
        noMatchError(t) {
          return new w(4002, !1);
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return P(r);
            if (o.numberOfChildren > 1 || !o.children[$])
              return di(new w(4e3, !1));
            o = o.children[$];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r,
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Kr(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment,
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Object.entries(t).forEach(([o, i]) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Object.entries(n.children).forEach(([a, u]) => {
              s[a] = this.createSegmentGroup(t, u, r, o);
            }),
            new X(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r),
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new w(4001, !1);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      const Gd = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function FP(e, t, n, r, o) {
        const i = qd(e, t, n);
        return i.matched
          ? ((r = (function oP(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = Cl(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, r)),
            (function RP(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? P(
                    o.map((s) => {
                      const a = to(s, e);
                      return bn(
                        (function wP(e) {
                          return e && Mi(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n)),
                      );
                    }),
                  ).pipe(no(), ew())
                : P(!0);
            })(r, t, n).pipe(te((s) => (!0 === s ? i : { ...Gd }))))
          : P(i);
      }
      function qd(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Gd }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || hO)(n, e, t);
        if (!o) return { ...Gd };
        const i = {};
        Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          i[a] = u.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function rw(e, t, n, r) {
        return n.length > 0 &&
          (function jP(e, t, n) {
            return n.some((r) => Ua(e, t, r) && Mt(r) !== $);
          })(e, n, r)
          ? {
              segmentGroup: new X(t, LP(r, new X(n, e.children))),
              slicedSegments: [],
            }
          : 0 === n.length &&
            (function $P(e, t, n) {
              return n.some((r) => Ua(e, t, r));
            })(e, n, r)
          ? {
              segmentGroup: new X(e.segments, kP(e, 0, n, r, e.children)),
              slicedSegments: n,
            }
          : { segmentGroup: new X(e.segments, e.children), slicedSegments: n };
      }
      function kP(e, t, n, r, o) {
        const i = {};
        for (const s of r)
          if (Ua(e, n, s) && !o[Mt(s)]) {
            const a = new X([], {});
            i[Mt(s)] = a;
          }
        return { ...o, ...i };
      }
      function LP(e, t) {
        const n = {};
        n[$] = t;
        for (const r of e)
          if ("" === r.path && Mt(r) !== $) {
            const o = new X([], {});
            n[Mt(r)] = o;
          }
        return n;
      }
      function Ua(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      class UP {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.rootComponentType = r),
            (this.config = o),
            (this.urlTree = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new PP(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new w(4002, !1);
        }
        recognize() {
          const t = rw(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            $,
          ).pipe(
            Qn((n) => {
              if (n instanceof tw)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = n.urlTree),
                  this.match(n.urlTree)
                );
              throw n instanceof Ha ? this.noMatchError(n) : n;
            }),
            te((n) => {
              const r = new ja(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  $,
                  this.rootComponentType,
                  null,
                  {},
                ),
                o = new nn(r, n),
                i = new G0("", o),
                s = (function OO(e, t, n = null, r = null) {
                  return O0(x0(e), t, n, r);
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (i.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(i._root),
                { state: i, tree: s }
              );
            }),
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            $,
          ).pipe(
            Qn((r) => {
              throw r instanceof Ha ? this.noMatchError(r) : r;
            }),
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = z0(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o, !0);
        }
        processChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Ie(o).pipe(
            fi((i) => {
              const s = r.children[i],
                a = (function uP(e, t) {
                  const n = e.filter((r) => Mt(r) === t);
                  return n.push(...e.filter((r) => Mt(r) !== t)), n;
                })(n, i);
              return this.processSegmentGroup(t, a, s, i);
            }),
            (function uO(e, t) {
              return ye(
                (function aO(e, t, n, r, o) {
                  return (i, s) => {
                    let a = n,
                      u = t,
                      c = 0;
                    i.subscribe(
                      De(
                        s,
                        (l) => {
                          const d = c++;
                          (u = a ? e(u, l, d) : ((a = !0), l)), r && s.next(u);
                        },
                        o &&
                          (() => {
                            a && s.next(u), s.complete();
                          }),
                      ),
                    );
                  };
                })(e, t, arguments.length >= 2, !0),
              );
            })((i, s) => (i.push(...s), i)),
            Aa(null),
            (function cO(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? In((o, i) => e(o, i, r)) : sn,
                  Td(1),
                  n ? Aa(t) : D0(() => new Ta()),
                );
            })(),
            Ee((i) => {
              if (null === i) return ro(r);
              const s = ow(i);
              return (
                (function zP(e) {
                  e.sort((t, n) =>
                    t.value.outlet === $
                      ? -1
                      : n.value.outlet === $
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet),
                  );
                })(s),
                P(s)
              );
            }),
          );
        }
        processSegment(t, n, r, o, i, s) {
          return Ie(n).pipe(
            fi((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                n,
                a,
                r,
                o,
                i,
                s,
              ).pipe(
                Qn((u) => {
                  if (u instanceof Ha) return P(null);
                  throw u;
                }),
              ),
            ),
            Zn((a) => !!a),
            Qn((a) => {
              if (J0(a))
                return (function BP(e, t, n) {
                  return 0 === t.length && !e.children[n];
                })(r, o, i)
                  ? P([])
                  : ro(r);
              throw a;
            }),
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return (function VP(e, t, n, r) {
            return (
              !!(Mt(e) === r || (r !== $ && Ua(t, n, e))) &&
              ("**" === e.path || qd(t, e, n).matched)
            );
          })(r, o, i, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, o, r, i, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s)
              : ro(o)
            : ro(o);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s,
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {},
          );
          return r.redirectTo.startsWith("/")
            ? nw(i)
            : this.applyRedirects.lineralizeSegments(r, i).pipe(
                Ee((s) => {
                  const a = new X(s, {});
                  return this.processSegment(t, n, a, s, o, !1);
                }),
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: c,
            positionalParamSegments: l,
          } = qd(n, o, i);
          if (!a) return ro(n);
          const d = this.applyRedirects.applyRedirectCommands(
            u,
            o.redirectTo,
            l,
          );
          return o.redirectTo.startsWith("/")
            ? nw(d)
            : this.applyRedirects
                .lineralizeSegments(o, d)
                .pipe(
                  Ee((f) => this.processSegment(t, r, n, f.concat(c), s, !1)),
                );
        }
        matchSegmentAgainstRoute(t, n, r, o, i, s) {
          let a;
          if ("**" === r.path) {
            const u = o.length > 0 ? C0(o).parameters : {};
            (a = P({
              snapshot: new ja(
                o,
                u,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                iw(r),
                Mt(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                sw(r),
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (n.children = {});
          } else
            a = FP(n, r, o, t).pipe(
              te(
                ({
                  matched: u,
                  consumedSegments: c,
                  remainingSegments: l,
                  parameters: d,
                }) =>
                  u
                    ? {
                        snapshot: new ja(
                          c,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          iw(r),
                          Mt(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          sw(r),
                        ),
                        consumedSegments: c,
                        remainingSegments: l,
                      }
                    : null,
              ),
            );
          return a.pipe(
            Tt((u) =>
              null === u
                ? ro(n)
                : this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                    Tt(({ routes: c }) => {
                      const l = r._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = u,
                        { segmentGroup: p, slicedSegments: g } = rw(n, f, h, c);
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(l, c, p).pipe(
                          te((D) => (null === D ? null : [new nn(d, D)])),
                        );
                      if (0 === c.length && 0 === g.length)
                        return P([new nn(d, [])]);
                      const y = Mt(r) === i;
                      return this.processSegment(
                        l,
                        c,
                        p,
                        g,
                        y ? $ : i,
                        !0,
                      ).pipe(te((D) => [new nn(d, D)]));
                    }),
                  ),
            ),
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? P({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? P({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function NP(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? P(!0)
                    : P(
                        o.map((s) => {
                          const a = to(s, e);
                          return bn(
                            (function mP(e) {
                              return e && Mi(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n)),
                          );
                        }),
                      ).pipe(no(), ew());
                })(t, n, r).pipe(
                  Ee((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          xe((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          }),
                        )
                      : (function OP(e) {
                          return di(Q0(!1, 3));
                        })(),
                  ),
                )
            : P({ routes: [], injector: t });
        }
      }
      function GP(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function ow(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!GP(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = ow(r.children);
          t.push(new nn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function iw(e) {
        return e.data || {};
      }
      function sw(e) {
        return e.resolve || {};
      }
      function aw(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Wd(e) {
        return Tt((t) => {
          const n = e(t);
          return n ? Ie(n).pipe(te(() => t)) : P(t);
        });
      }
      const oo = new M("ROUTES");
      let Zd = (() => {
        var e;
        class t {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = E(Gy));
          }
          loadComponent(r) {
            if (this.componentLoaders.get(r))
              return this.componentLoaders.get(r);
            if (r._loadedComponent) return P(r._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(r);
            const o = bn(r.loadComponent()).pipe(
                te(uw),
                xe((s) => {
                  this.onLoadEndListener && this.onLoadEndListener(r),
                    (r._loadedComponent = s);
                }),
                Ad(() => {
                  this.componentLoaders.delete(r);
                }),
              ),
              i = new y0(o, () => new mt()).pipe(Sd());
            return this.componentLoaders.set(r, i), i;
          }
          loadChildren(r, o) {
            if (this.childrenLoaders.get(o)) return this.childrenLoaders.get(o);
            if (o._loadedRoutes)
              return P({
                routes: o._loadedRoutes,
                injector: o._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(o);
            const s = this.loadModuleFactoryOrRoutes(o.loadChildren).pipe(
                te((u) => {
                  this.onLoadEndListener && this.onLoadEndListener(o);
                  let c, l;
                  return (
                    Array.isArray(u)
                      ? (l = u)
                      : ((c = u.create(r).injector),
                        (l = c.get(oo, [], V.Self | V.Optional).flat())),
                    { routes: l.map(zd), injector: c }
                  );
                }),
                Ad(() => {
                  this.childrenLoaders.delete(o);
                }),
              ),
              a = new y0(s, () => new mt()).pipe(Sd());
            return this.childrenLoaders.set(o, a), a;
          }
          loadModuleFactoryOrRoutes(r) {
            return bn(r()).pipe(
              te(uw),
              Ee((o) =>
                o instanceof Yv || Array.isArray(o)
                  ? P(o)
                  : Ie(this.compiler.compileModuleAsync(o)),
              ),
            );
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function uw(e) {
        return (function XP(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let za = (() => {
        var e;
        class t {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new mt()),
              (this.transitionAbortSubject = new mt()),
              (this.configLoader = E(Zd)),
              (this.environmentInjector = E(ct)),
              (this.urlSerializer = E(gi)),
              (this.rootContexts = E(Ci)),
              (this.inputBindingEnabled = null !== E($a, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => P(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (i) =>
                this.events.next(new GO(i))),
              (this.configLoader.onLoadStartListener = (i) =>
                this.events.next(new zO(i)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(r) {
            const o = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...r, id: o });
          }
          setupNavigations(r, o, i) {
            return (
              (this.transitions = new it({
                id: 0,
                currentUrlTree: o,
                currentRawUrl: o,
                currentBrowserUrl: o,
                extractedUrl: r.urlHandlingStrategy.extract(o),
                urlAfterRedirects: r.urlHandlingStrategy.extract(o),
                rawUrl: o,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Di,
                restoredState: null,
                currentSnapshot: i.snapshot,
                targetSnapshot: null,
                currentRouterState: i,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                In((s) => 0 !== s.id),
                te((s) => ({
                  ...s,
                  extractedUrl: r.urlHandlingStrategy.extract(s.rawUrl),
                })),
                Tt((s) => {
                  this.currentTransition = s;
                  let a = !1,
                    u = !1;
                  return P(s).pipe(
                    xe((c) => {
                      this.currentNavigation = {
                        id: c.id,
                        initialUrl: c.rawUrl,
                        extractedUrl: c.extractedUrl,
                        trigger: c.source,
                        extras: c.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Tt((c) => {
                      const l = c.currentBrowserUrl.toString(),
                        d =
                          !r.navigated ||
                          c.extractedUrl.toString() !== l ||
                          l !== c.currentUrlTree.toString();
                      if (
                        !d &&
                        "reload" !==
                          (c.extras.onSameUrlNavigation ??
                            r.onSameUrlNavigation)
                      ) {
                        const h = "";
                        return (
                          this.events.next(
                            new Xr(
                              c.id,
                              this.urlSerializer.serialize(c.rawUrl),
                              h,
                              0,
                            ),
                          ),
                          c.resolve(null),
                          St
                        );
                      }
                      if (r.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                        return P(c).pipe(
                          Tt((h) => {
                            const p = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new ka(
                                  h.id,
                                  this.urlSerializer.serialize(h.extractedUrl),
                                  h.source,
                                  h.restoredState,
                                ),
                              ),
                              p !== this.transitions?.getValue()
                                ? St
                                : Promise.resolve(h)
                            );
                          }),
                          (function qP(e, t, n, r, o, i) {
                            return Ee((s) =>
                              (function HP(e, t, n, r, o, i, s = "emptyOnly") {
                                return new UP(e, t, n, r, o, s, i).recognize();
                              })(e, t, n, r, s.extractedUrl, o, i).pipe(
                                te(({ state: a, tree: u }) => ({
                                  ...s,
                                  targetSnapshot: a,
                                  urlAfterRedirects: u,
                                })),
                              ),
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            r.config,
                            this.urlSerializer,
                            r.paramsInheritanceStrategy,
                          ),
                          xe((h) => {
                            (s.targetSnapshot = h.targetSnapshot),
                              (s.urlAfterRedirects = h.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: h.urlAfterRedirects,
                              });
                            const p = new $0(
                              h.id,
                              this.urlSerializer.serialize(h.extractedUrl),
                              this.urlSerializer.serialize(h.urlAfterRedirects),
                              h.targetSnapshot,
                            );
                            this.events.next(p);
                          }),
                        );
                      if (
                        d &&
                        r.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                      ) {
                        const {
                            id: h,
                            extractedUrl: p,
                            source: g,
                            restoredState: y,
                            extras: D,
                          } = c,
                          m = new ka(h, this.urlSerializer.serialize(p), g, y);
                        this.events.next(m);
                        const b = U0(0, this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = s =
                            {
                              ...c,
                              targetSnapshot: b,
                              urlAfterRedirects: p,
                              extras: {
                                ...D,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          P(s)
                        );
                      }
                      {
                        const h = "";
                        return (
                          this.events.next(
                            new Xr(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              h,
                              1,
                            ),
                          ),
                          c.resolve(null),
                          St
                        );
                      }
                    }),
                    xe((c) => {
                      const l = new VO(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot,
                      );
                      this.events.next(l);
                    }),
                    te(
                      (c) => (
                        (this.currentTransition = s =
                          {
                            ...c,
                            guards: dP(
                              c.targetSnapshot,
                              c.currentSnapshot,
                              this.rootContexts,
                            ),
                          }),
                        s
                      ),
                    ),
                    (function _P(e, t) {
                      return Ee((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? P({ ...n, guardsResult: !0 })
                          : (function EP(e, t, n, r) {
                              return Ie(e).pipe(
                                Ee((o) =>
                                  (function AP(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? P(
                                          i.map((a) => {
                                            const u = Ei(t) ?? o,
                                              c = to(a, u);
                                            return bn(
                                              (function DP(e) {
                                                return e && Mi(e.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    c(e, t, n, r),
                                                  ),
                                            ).pipe(Zn());
                                          }),
                                        ).pipe(no())
                                      : P(!0);
                                  })(o.component, o.route, n, t, r),
                                ),
                                Zn((o) => !0 !== o, !0),
                              );
                            })(s, r, o, e).pipe(
                              Ee((a) =>
                                a &&
                                (function gP(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function IP(e, t, n, r) {
                                      return Ie(t).pipe(
                                        fi((o) =>
                                          Md(
                                            (function MP(e, t) {
                                              return (
                                                null !== e && t && t(new qO(e)),
                                                P(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function bP(e, t) {
                                              return (
                                                null !== e && t && t(new ZO(e)),
                                                P(!0)
                                              );
                                            })(o.route, r),
                                            (function TP(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function fP(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s),
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    v0(() =>
                                                      P(
                                                        s.guards.map((u) => {
                                                          const c =
                                                              Ei(s.node) ?? n,
                                                            l = to(u, c);
                                                          return bn(
                                                            (function yP(e) {
                                                              return (
                                                                e &&
                                                                Mi(
                                                                  e.canActivateChild,
                                                                )
                                                              );
                                                            })(l)
                                                              ? l.canActivateChild(
                                                                  r,
                                                                  e,
                                                                )
                                                              : c.runInContext(
                                                                  () => l(r, e),
                                                                ),
                                                          ).pipe(Zn());
                                                        }),
                                                      ).pipe(no()),
                                                    ),
                                                  );
                                              return P(i).pipe(no());
                                            })(e, o.path, n),
                                            (function SP(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return P(!0);
                                              const o = r.map((i) =>
                                                v0(() => {
                                                  const s = Ei(t) ?? n,
                                                    a = to(i, s);
                                                  return bn(
                                                    (function vP(e) {
                                                      return (
                                                        e && Mi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e),
                                                        ),
                                                  ).pipe(Zn());
                                                }),
                                              );
                                              return P(o).pipe(no());
                                            })(e, o.route, n),
                                          ),
                                        ),
                                        Zn((o) => !0 !== o, !0),
                                      );
                                    })(r, i, e, t)
                                  : P(a),
                              ),
                              te((a) => ({ ...n, guardsResult: a })),
                            );
                      });
                    })(this.environmentInjector, (c) => this.events.next(c)),
                    xe((c) => {
                      if (
                        ((s.guardsResult = c.guardsResult), Kn(c.guardsResult))
                      )
                        throw Z0(0, c.guardsResult);
                      const l = new BO(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot,
                        !!c.guardsResult,
                      );
                      this.events.next(l);
                    }),
                    In(
                      (c) =>
                        !!c.guardsResult ||
                        (this.cancelNavigationTransition(c, "", 3), !1),
                    ),
                    Wd((c) => {
                      if (c.guards.canActivateChecks.length)
                        return P(c).pipe(
                          xe((l) => {
                            const d = new HO(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects),
                              l.targetSnapshot,
                            );
                            this.events.next(d);
                          }),
                          Tt((l) => {
                            let d = !1;
                            return P(l).pipe(
                              (function WP(e, t) {
                                return Ee((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return P(n);
                                  let i = 0;
                                  return Ie(o).pipe(
                                    fi((s) =>
                                      (function ZP(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !aw(o) &&
                                            (i[hi] = o.title),
                                          (function QP(e, t, n, r) {
                                            const o = (function YP(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e,
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return P({});
                                            const i = {};
                                            return Ie(o).pipe(
                                              Ee((s) =>
                                                (function KP(e, t, n, r) {
                                                  const o = Ei(t) ?? r,
                                                    i = to(e, o);
                                                  return bn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n),
                                                        ),
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  Zn(),
                                                  xe((a) => {
                                                    i[s] = a;
                                                  }),
                                                ),
                                              ),
                                              Td(1),
                                              (function lO(e) {
                                                return te(() => e);
                                              })(i),
                                              Qn((s) => (J0(s) ? St : di(s))),
                                            );
                                          })(i, e, t, r).pipe(
                                            te(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = z0(e, n).resolve),
                                                o &&
                                                  aw(o) &&
                                                  (e.data[hi] = o.title),
                                                null
                                              ),
                                            ),
                                          )
                                        );
                                      })(s.route, r, e, t),
                                    ),
                                    xe(() => i++),
                                    Td(1),
                                    Ee((s) => (i === o.length ? P(n) : St)),
                                  );
                                });
                              })(
                                r.paramsInheritanceStrategy,
                                this.environmentInjector,
                              ),
                              xe({
                                next: () => (d = !0),
                                complete: () => {
                                  d ||
                                    this.cancelNavigationTransition(l, "", 2);
                                },
                              }),
                            );
                          }),
                          xe((l) => {
                            const d = new UO(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects),
                              l.targetSnapshot,
                            );
                            this.events.next(d);
                          }),
                        );
                    }),
                    Wd((c) => {
                      const l = (d) => {
                        const f = [];
                        d.routeConfig?.loadComponent &&
                          !d.routeConfig._loadedComponent &&
                          f.push(
                            this.configLoader.loadComponent(d.routeConfig).pipe(
                              xe((h) => {
                                d.component = h;
                              }),
                              te(() => {}),
                            ),
                          );
                        for (const h of d.children) f.push(...l(h));
                        return f;
                      };
                      return bd(l(c.targetSnapshot.root)).pipe(Aa(), Qr(1));
                    }),
                    Wd(() => this.afterPreactivation()),
                    te((c) => {
                      const l = (function eP(e, t, n) {
                        const r = _i(e, t._root, n ? n._root : void 0);
                        return new H0(r, t);
                      })(
                        r.routeReuseStrategy,
                        c.targetSnapshot,
                        c.currentRouterState,
                      );
                      return (
                        (this.currentTransition = s =
                          { ...c, targetRouterState: l }),
                        s
                      );
                    }),
                    xe(() => {
                      this.events.next(new Fd());
                    }),
                    ((e, t, n, r) =>
                      te(
                        (o) => (
                          new lP(
                            t,
                            o.targetRouterState,
                            o.currentRouterState,
                            n,
                            r,
                          ).activate(e),
                          o
                        ),
                      ))(
                      this.rootContexts,
                      r.routeReuseStrategy,
                      (c) => this.events.next(c),
                      this.inputBindingEnabled,
                    ),
                    Qr(1),
                    xe({
                      next: (c) => {
                        (a = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new Mn(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects),
                            ),
                          ),
                          r.titleStrategy?.updateTitle(
                            c.targetRouterState.snapshot,
                          ),
                          c.resolve(!0);
                      },
                      complete: () => {
                        a = !0;
                      },
                    }),
                    (function dO(e) {
                      return ye((t, n) => {
                        ot(e).subscribe(De(n, () => n.complete(), qa)),
                          !n.closed && t.subscribe(n);
                      });
                    })(
                      this.transitionAbortSubject.pipe(
                        xe((c) => {
                          throw c;
                        }),
                      ),
                    ),
                    Ad(() => {
                      a || u || this.cancelNavigationTransition(s, "", 1),
                        this.currentNavigation?.id === s.id &&
                          (this.currentNavigation = null);
                    }),
                    Qn((c) => {
                      if (((u = !0), Y0(c)))
                        this.events.next(
                          new wi(
                            s.id,
                            this.urlSerializer.serialize(s.extractedUrl),
                            c.message,
                            c.cancellationCode,
                          ),
                        ),
                          (function rP(e) {
                            return Y0(e) && Kn(e.url);
                          })(c)
                            ? this.events.next(new kd(c.url))
                            : s.resolve(!1);
                      else {
                        this.events.next(
                          new La(
                            s.id,
                            this.urlSerializer.serialize(s.extractedUrl),
                            c,
                            s.targetSnapshot ?? void 0,
                          ),
                        );
                        try {
                          s.resolve(r.errorHandler(c));
                        } catch (l) {
                          s.reject(l);
                        }
                      }
                      return St;
                    }),
                  );
                }),
              )
            );
          }
          cancelNavigationTransition(r, o, i) {
            const s = new wi(
              r.id,
              this.urlSerializer.serialize(r.extractedUrl),
              o,
              i,
            );
            this.events.next(s), r.resolve(!1);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function cw(e) {
        return e !== Di;
      }
      let lw = (() => {
          var e;
          class t {
            buildTitle(r) {
              let o,
                i = r.root;
              for (; void 0 !== i; )
                (o = this.getResolvedTitleForRoute(i) ?? o),
                  (i = i.children.find((s) => s.outlet === $));
              return o;
            }
            getResolvedTitleForRoute(r) {
              return r.data[hi];
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: function () {
                return E(JP);
              },
              providedIn: "root",
            })),
            t
          );
        })(),
        JP = (() => {
          var e;
          class t extends lw {
            constructor(r) {
              super(), (this.title = r);
            }
            updateTitle(r) {
              const o = this.buildTitle(r);
              void 0 !== o && this.title.setTitle(o);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(S(f0));
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        e2 = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: function () {
                return E(n2);
              },
              providedIn: "root",
            })),
            t
          );
        })();
      class t2 {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let n2 = (() => {
        var e;
        class t extends t2 {}
        return (
          ((e = t).ɵfac = (function () {
            let n;
            return function (o) {
              return (
                n ||
                (n = (function Zh(e) {
                  return Ht(() => {
                    const t = e.prototype.constructor,
                      n = t[Ut] || zu(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[Ut] || zu(o);
                      if (i && i !== n) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(o || e);
            };
          })()),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const Ga = new M("", { providedIn: "root", factory: () => ({}) });
      let r2 = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = T({
              token: e,
              factory: function () {
                return E(o2);
              },
              providedIn: "root",
            })),
            t
          );
        })(),
        o2 = (() => {
          var e;
          class t {
            shouldProcessUrl(r) {
              return !0;
            }
            extract(r) {
              return r;
            }
            merge(r, o) {
              return r;
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })();
      var Si = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = "COMPLETE"),
          (e[(e.FAILED = 1)] = "FAILED"),
          (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
          e
        );
      })(Si || {});
      function dw(e, t) {
        e.events
          .pipe(
            In(
              (n) =>
                n instanceof Mn ||
                n instanceof wi ||
                n instanceof La ||
                n instanceof Xr,
            ),
            te((n) =>
              n instanceof Mn || n instanceof Xr
                ? Si.COMPLETE
                : n instanceof wi && (0 === n.code || 1 === n.code)
                ? Si.REDIRECTING
                : Si.FAILED,
            ),
            In((n) => n !== Si.REDIRECTING),
            Qr(1),
          )
          .subscribe(() => {
            t();
          });
      }
      function i2(e) {
        throw e;
      }
      function s2(e, t, n) {
        return t.parse("/");
      }
      const a2 = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        u2 = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let gt = (() => {
        var e;
        class t {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return "computed" !== this.canceledNavigationResolution
              ? this.currentPageId
              : this.location.getState()?.ɵrouterPageId ?? this.currentPageId;
          }
          get events() {
            return this._events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = E(Uy)),
              (this.isNgZoneEnabled = !1),
              (this._events = new mt()),
              (this.options = E(Ga, { optional: !0 }) || {}),
              (this.pendingTasks = E(zy)),
              (this.errorHandler = this.options.errorHandler || i2),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || s2),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = E(r2)),
              (this.routeReuseStrategy = E(e2)),
              (this.titleStrategy = E(lw)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = E(oo, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = E(za)),
              (this.urlSerializer = E(gi)),
              (this.location = E(td)),
              (this.componentInputBindingEnabled = !!E($a, { optional: !0 })),
              (this.eventsSubscription = new Ke()),
              (this.isNgZoneEnabled =
                E(oe) instanceof oe && oe.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new Kr()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = U0(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  (r) => {
                    (this.lastSuccessfulId = r.id),
                      (this.currentPageId = this.browserPageId);
                  },
                  (r) => {
                    this.console.warn(`Unhandled Navigation Error: ${r}`);
                  },
                ),
              this.subscribeToNavigationEvents();
          }
          subscribeToNavigationEvents() {
            const r = this.navigationTransitions.events.subscribe((o) => {
              try {
                const { currentTransition: i } = this.navigationTransitions;
                if (null === i) return void (fw(o) && this._events.next(o));
                if (o instanceof ka)
                  cw(i.source) && (this.browserUrlTree = i.extractedUrl);
                else if (o instanceof Xr) this.rawUrlTree = i.rawUrl;
                else if (o instanceof $0) {
                  if ("eager" === this.urlUpdateStrategy) {
                    if (!i.extras.skipLocationChange) {
                      const s = this.urlHandlingStrategy.merge(
                        i.urlAfterRedirects,
                        i.rawUrl,
                      );
                      this.setBrowserUrl(s, i);
                    }
                    this.browserUrlTree = i.urlAfterRedirects;
                  }
                } else if (o instanceof Fd)
                  (this.currentUrlTree = i.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      i.urlAfterRedirects,
                      i.rawUrl,
                    )),
                    (this.routerState = i.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (i.extras.skipLocationChange ||
                        this.setBrowserUrl(this.rawUrlTree, i),
                      (this.browserUrlTree = i.urlAfterRedirects));
                else if (o instanceof wi)
                  0 !== o.code && 1 !== o.code && (this.navigated = !0),
                    (3 === o.code || 2 === o.code) && this.restoreHistory(i);
                else if (o instanceof kd) {
                  const s = this.urlHandlingStrategy.merge(
                      o.url,
                      i.currentRawUrl,
                    ),
                    a = {
                      skipLocationChange: i.extras.skipLocationChange,
                      replaceUrl:
                        "eager" === this.urlUpdateStrategy || cw(i.source),
                    };
                  this.scheduleNavigation(s, Di, null, a, {
                    resolve: i.resolve,
                    reject: i.reject,
                    promise: i.promise,
                  });
                }
                o instanceof La && this.restoreHistory(i, !0),
                  o instanceof Mn && (this.navigated = !0),
                  fw(o) && this._events.next(o);
              } catch (i) {
                this.navigationTransitions.transitionAbortSubject.next(i);
              }
            });
            this.eventsSubscription.add(r);
          }
          resetRootComponentType(r) {
            (this.routerState.root.component = r),
              (this.navigationTransitions.rootComponentType = r);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const r = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Di, r);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((r) => {
                const o = "popstate" === r.type ? "popstate" : "hashchange";
                "popstate" === o &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(r.url, o, r.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(r, o, i) {
            const s = { replaceUrl: !0 },
              a = i?.navigationId ? i : null;
            if (i) {
              const c = { ...i };
              delete c.navigationId,
                delete c.ɵrouterPageId,
                0 !== Object.keys(c).length && (s.state = c);
            }
            const u = this.parseUrl(r);
            this.scheduleNavigation(u, o, a, s);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(r) {
            (this.config = r.map(zd)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe();
          }
          createUrlTree(r, o = {}) {
            const {
                relativeTo: i,
                queryParams: s,
                fragment: a,
                queryParamsHandling: u,
                preserveFragment: c,
              } = o,
              l = c ? this.currentUrlTree.fragment : a;
            let f,
              d = null;
            switch (u) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...s };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = s || null;
            }
            null !== d && (d = this.removeEmptyProps(d));
            try {
              f = x0(i ? i.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof r[0] || !r[0].startsWith("/")) && (r = []),
                (f = this.currentUrlTree.root);
            }
            return O0(f, r, d, l ?? null);
          }
          navigateByUrl(r, o = { skipLocationChange: !1 }) {
            const i = Kn(r) ? r : this.parseUrl(r),
              s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(s, Di, null, o);
          }
          navigate(r, o = { skipLocationChange: !1 }) {
            return (
              (function c2(e) {
                for (let t = 0; t < e.length; t++)
                  if (null == e[t]) throw new w(4008, !1);
              })(r),
              this.navigateByUrl(this.createUrlTree(r, o), o)
            );
          }
          serializeUrl(r) {
            return this.urlSerializer.serialize(r);
          }
          parseUrl(r) {
            let o;
            try {
              o = this.urlSerializer.parse(r);
            } catch (i) {
              o = this.malformedUriErrorHandler(i, this.urlSerializer, r);
            }
            return o;
          }
          isActive(r, o) {
            let i;
            if (((i = !0 === o ? { ...a2 } : !1 === o ? { ...u2 } : o), Kn(r)))
              return E0(this.currentUrlTree, r, i);
            const s = this.parseUrl(r);
            return E0(this.currentUrlTree, s, i);
          }
          removeEmptyProps(r) {
            return Object.keys(r).reduce((o, i) => {
              const s = r[i];
              return null != s && (o[i] = s), o;
            }, {});
          }
          scheduleNavigation(r, o, i, s, a) {
            if (this.disposed) return Promise.resolve(!1);
            let u, c, l;
            a
              ? ((u = a.resolve), (c = a.reject), (l = a.promise))
              : (l = new Promise((f, h) => {
                  (u = f), (c = h);
                }));
            const d = this.pendingTasks.add();
            return (
              dw(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(d));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: o,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: r,
                extras: s,
                resolve: u,
                reject: c,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(r, o) {
            const i = this.urlSerializer.serialize(r);
            if (this.location.isCurrentPathEqualTo(i) || o.extras.replaceUrl) {
              const a = {
                ...o.extras.state,
                ...this.generateNgRouterState(o.id, this.browserPageId),
              };
              this.location.replaceState(i, "", a);
            } else {
              const s = {
                ...o.extras.state,
                ...this.generateNgRouterState(o.id, this.browserPageId + 1),
              };
              this.location.go(i, "", s);
            }
          }
          restoreHistory(r, o = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const s = this.currentPageId - this.browserPageId;
              0 !== s
                ? this.location.historyGo(s)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === s &&
                  (this.resetState(r),
                  (this.browserUrlTree = r.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (o && this.resetState(r), this.resetUrlToCurrentUrlTree());
          }
          resetState(r) {
            (this.routerState = r.currentRouterState),
              (this.currentUrlTree = r.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                r.rawUrl,
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId,
              ),
            );
          }
          generateNgRouterState(r, o) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: r, ɵrouterPageId: o }
              : { navigationId: r };
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function fw(e) {
        return !(e instanceof Fd || e instanceof kd);
      }
      class hw {}
      let f2 = (() => {
        var e;
        class t {
          constructor(r, o, i, s, a) {
            (this.router = r),
              (this.injector = i),
              (this.preloadingStrategy = s),
              (this.loader = a);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                In((r) => r instanceof Mn),
                fi(() => this.preload()),
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(r, o) {
            const i = [];
            for (const s of o) {
              s.providers &&
                !s._injector &&
                (s._injector = Cl(s.providers, r, `Route: ${s.path}`));
              const a = s._injector ?? r,
                u = s._loadedInjector ?? a;
              ((s.loadChildren && !s._loadedRoutes && void 0 === s.canLoad) ||
                (s.loadComponent && !s._loadedComponent)) &&
                i.push(this.preloadConfig(a, s)),
                (s.children || s._loadedRoutes) &&
                  i.push(this.processRoutes(u, s.children ?? s._loadedRoutes));
            }
            return Ie(i).pipe(Xn());
          }
          preloadConfig(r, o) {
            return this.preloadingStrategy.preload(o, () => {
              let i;
              i =
                o.loadChildren && void 0 === o.canLoad
                  ? this.loader.loadChildren(r, o)
                  : P(null);
              const s = i.pipe(
                Ee((a) =>
                  null === a
                    ? P(void 0)
                    : ((o._loadedRoutes = a.routes),
                      (o._loadedInjector = a.injector),
                      this.processRoutes(a.injector ?? r, a.routes)),
                ),
              );
              return o.loadComponent && !o._loadedComponent
                ? Ie([s, this.loader.loadComponent(o)]).pipe(Xn())
                : s;
            });
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(S(gt), S(Gy), S(ct), S(hw), S(Zd));
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const Yd = new M("");
      let pw = (() => {
        var e;
        class t {
          constructor(r, o, i, s, a = {}) {
            (this.urlSerializer = r),
              (this.transitions = o),
              (this.viewportScroller = i),
              (this.zone = s),
              (this.options = a),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (a.scrollPositionRestoration =
                a.scrollPositionRestoration || "disabled"),
              (a.anchorScrolling = a.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((r) => {
              r instanceof ka
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = r.navigationTrigger),
                  (this.restoredId = r.restoredState
                    ? r.restoredState.navigationId
                    : 0))
                : r instanceof Mn
                ? ((this.lastId = r.id),
                  this.scheduleScrollEvent(
                    r,
                    this.urlSerializer.parse(r.urlAfterRedirects).fragment,
                  ))
                : r instanceof Xr &&
                  0 === r.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    r,
                    this.urlSerializer.parse(r.url).fragment,
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((r) => {
              r instanceof V0 &&
                (r.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(r.position)
                  : r.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(r.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(r, o) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new V0(
                      r,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      o,
                    ),
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            !(function Og() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = T({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function rn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function mw() {
        const e = E(lt);
        return (t) => {
          const n = e.get(qr);
          if (t !== n.components[0]) return;
          const r = e.get(gt),
            o = e.get(vw);
          1 === e.get(Kd) && r.initialNavigation(),
            e.get(yw, null, V.Optional)?.setUpPreloading(),
            e.get(Yd, null, V.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const vw = new M("", { factory: () => new mt() }),
        Kd = new M("", { providedIn: "root", factory: () => 1 }),
        yw = new M("");
      function m2(e) {
        return rn(0, [
          { provide: yw, useExisting: f2 },
          { provide: hw, useExisting: e },
        ]);
      }
      const Dw = new M("ROUTER_FORROOT_GUARD"),
        y2 = [
          td,
          { provide: gi, useClass: Nd },
          gt,
          Ci,
          {
            provide: eo,
            useFactory: function gw(e) {
              return e.routerState.root;
            },
            deps: [gt],
          },
          Zd,
          [],
        ];
      function D2() {
        return new Xy("Router", gt);
      }
      let ww = (() => {
        var e;
        class t {
          constructor(r) {}
          static forRoot(r, o) {
            return {
              ngModule: t,
              providers: [
                y2,
                [],
                { provide: oo, multi: !0, useValue: r },
                {
                  provide: Dw,
                  useFactory: E2,
                  deps: [[gt, new us(), new cs()]],
                },
                { provide: Ga, useValue: o || {} },
                o?.useHash
                  ? { provide: Wn, useClass: bN }
                  : { provide: Wn, useClass: TD },
                {
                  provide: Yd,
                  useFactory: () => {
                    const e = E(GR),
                      t = E(oe),
                      n = E(Ga),
                      r = E(za),
                      o = E(gi);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new pw(o, r, e, t, n)
                    );
                  },
                },
                o?.preloadingStrategy
                  ? m2(o.preloadingStrategy).ɵproviders
                  : [],
                { provide: Xy, multi: !0, useFactory: D2 },
                o?.initialNavigation ? I2(o) : [],
                o?.bindToComponentInputs
                  ? rn(8, [W0, { provide: $a, useExisting: W0 }]).ɵproviders
                  : [],
                [
                  { provide: Cw, useFactory: mw },
                  { provide: Ul, multi: !0, useExisting: Cw },
                ],
              ],
            };
          }
          static forChild(r) {
            return {
              ngModule: t,
              providers: [{ provide: oo, multi: !0, useValue: r }],
            };
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(S(Dw, 8));
          }),
          (e.ɵmod = Nn({ type: e })),
          (e.ɵinj = un({})),
          t
        );
      })();
      function E2(e) {
        return "guarded";
      }
      function I2(e) {
        return [
          "disabled" === e.initialNavigation
            ? rn(3, [
                {
                  provide: Fl,
                  multi: !0,
                  useFactory: () => {
                    const t = E(gt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Kd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? rn(2, [
                { provide: Kd, useValue: 0 },
                {
                  provide: Fl,
                  multi: !0,
                  deps: [lt],
                  useFactory: (t) => {
                    const n = t.get(EN, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(gt),
                              i = t.get(vw);
                            dw(o, () => {
                              r(!0);
                            }),
                              (t.get(za).afterPreactivation = () => (
                                r(!0), i.closed ? P(void 0) : i
                              )),
                              o.initialNavigation();
                          }),
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const Cw = new M(""),
        M2 = [];
      let S2 = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵmod = Nn({ type: e })),
          (e.ɵinj = un({ imports: [ww.forRoot(M2), ww] })),
          t
        );
      })();
      function T2(e, t) {
        1 & e && (C(0, "pre"), W(1, "ng generate component xyz"), I());
      }
      function A2(e, t) {
        1 & e && (C(0, "pre"), W(1, "ng add @angular/material"), I());
      }
      function N2(e, t) {
        1 & e && (C(0, "pre"), W(1, "ng add @angular/pwa"), I());
      }
      function R2(e, t) {
        1 & e && (C(0, "pre"), W(1, "ng add _____"), I());
      }
      function x2(e, t) {
        1 & e && (C(0, "pre"), W(1, "ng test"), I());
      }
      function O2(e, t) {
        1 & e && (C(0, "pre"), W(1, "ng build"), I());
      }
      let P2 = (() => {
          var e;
          class t {
            constructor() {
              this.title = "teo-ilie";
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵcmp = wu({
              type: e,
              selectors: [["app-root"]],
              decls: 152,
              vars: 7,
              consts: [
                ["role", "banner", 1, "toolbar"],
                [
                  "width",
                  "40",
                  "alt",
                  "Angular Logo",
                  "src",
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==",
                ],
                [1, "spacer"],
                [
                  "aria-label",
                  "Angular on twitter",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://twitter.com/angular",
                  "title",
                  "Twitter",
                ],
                [
                  "id",
                  "twitter-logo",
                  "height",
                  "24",
                  "data-name",
                  "Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "viewBox",
                  "0 0 400 400",
                ],
                ["width", "400", "height", "400", "fill", "none"],
                [
                  "d",
                  "M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23",
                  "fill",
                  "#fff",
                ],
                [
                  "aria-label",
                  "Angular on YouTube",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://youtube.com/angular",
                  "title",
                  "YouTube",
                ],
                [
                  "id",
                  "youtube-logo",
                  "height",
                  "24",
                  "width",
                  "24",
                  "data-name",
                  "Logo",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "viewBox",
                  "0 0 24 24",
                  "fill",
                  "#fff",
                ],
                ["d", "M0 0h24v24H0V0z", "fill", "none"],
                [
                  "d",
                  "M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z",
                ],
                ["role", "main", 1, "content"],
                [1, "card", "highlight-card", "card-small"],
                [
                  "id",
                  "rocket",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "101.678",
                  "height",
                  "101.678",
                  "viewBox",
                  "0 0 101.678 101.678",
                ],
                [
                  "id",
                  "Group_83",
                  "data-name",
                  "Group 83",
                  "transform",
                  "translate(-141 -696)",
                ],
                [
                  "id",
                  "Ellipse_8",
                  "data-name",
                  "Ellipse 8",
                  "cx",
                  "50.839",
                  "cy",
                  "50.839",
                  "r",
                  "50.839",
                  "transform",
                  "translate(141 696)",
                  "fill",
                  "#dd0031",
                ],
                [
                  "id",
                  "Group_47",
                  "data-name",
                  "Group 47",
                  "transform",
                  "translate(165.185 720.185)",
                ],
                [
                  "id",
                  "Path_33",
                  "data-name",
                  "Path 33",
                  "d",
                  "M3.4,42.615a3.084,3.084,0,0,0,3.553,3.553,21.419,21.419,0,0,0,12.215-6.107L9.511,30.4A21.419,21.419,0,0,0,3.4,42.615Z",
                  "transform",
                  "translate(0.371 3.363)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "Path_34",
                  "data-name",
                  "Path 34",
                  "d",
                  "M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z",
                  "transform",
                  "translate(0 0.005)",
                  "fill",
                  "#fff",
                ],
                [
                  "id",
                  "rocket-smoke",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "516.119",
                  "height",
                  "1083.632",
                  "viewBox",
                  "0 0 516.119 1083.632",
                ],
                [
                  "id",
                  "Path_40",
                  "data-name",
                  "Path 40",
                  "d",
                  "M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z",
                  "transform",
                  "translate(-147.025 -140.939)",
                  "fill",
                  "#f5f5f5",
                ],
                [1, "card-container"],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/tutorial",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "24",
                  "height",
                  "24",
                  "viewBox",
                  "0 0 24 24",
                  1,
                  "material-icons",
                ],
                [
                  "d",
                  "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
                ],
                ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/cli",
                  1,
                  "card",
                ],
                [
                  "d",
                  "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://material.angular.io",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "21.813",
                  "height",
                  "23.453",
                  "viewBox",
                  "0 0 179.2 192.7",
                  2,
                  "margin-right",
                  "8px",
                ],
                [
                  "fill",
                  "#ffa726",
                  "d",
                  "M89.4 0 0 32l13.5 118.4 75.9 42.3 76-42.3L179.2 32 89.4 0z",
                ],
                [
                  "fill",
                  "#fb8c00",
                  "d",
                  "M89.4 0v192.7l76-42.3L179.2 32 89.4 0z",
                ],
                [
                  "fill",
                  "#ffe0b2",
                  "d",
                  "m102.9 146.3-63.3-30.5 36.3-22.4 63.7 30.6-36.7 22.3z",
                ],
                [
                  "fill",
                  "#fff3e0",
                  "d",
                  "M102.9 122.8 39.6 92.2l36.3-22.3 63.7 30.6-36.7 22.3z",
                ],
                [
                  "fill",
                  "#fff",
                  "d",
                  "M102.9 99.3 39.6 68.7l36.3-22.4 63.7 30.6-36.7 22.4z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://blog.angular.io/",
                  1,
                  "card",
                ],
                [
                  "d",
                  "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z",
                ],
                [
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  "href",
                  "https://angular.io/devtools/",
                  1,
                  "card",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "enable-background",
                  "new 0 0 24 24",
                  "height",
                  "24px",
                  "viewBox",
                  "0 0 24 24",
                  "width",
                  "24px",
                  "fill",
                  "#000000",
                  1,
                  "material-icons",
                ],
                ["fill", "none", "height", "24", "width", "24"],
                [
                  "d",
                  "M14.73,13.31C15.52,12.24,16,10.93,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.43,0,2.74-0.48,3.81-1.27L19.59,21L21,19.59L14.73,13.31z M9.5,14C7.01,14,5,11.99,5,9.5S7.01,5,9.5,5S14,7.01,14,9.5 S11.99,14,9.5,14z",
                ],
                [
                  "points",
                  "10.29,8.44 9.5,6 8.71,8.44 6.25,8.44 8.26,10.03 7.49,12.5 9.5,10.97 11.51,12.5 10.74,10.03 12.75,8.44",
                ],
                ["type", "hidden"],
                ["selection", ""],
                ["tabindex", "0", 1, "card", "card-small", 3, "click"],
                ["d", "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"],
                [1, "terminal", 3, "ngSwitch"],
                [4, "ngSwitchDefault"],
                [4, "ngSwitchCase"],
                [
                  "title",
                  "Find a Local Meetup",
                  "href",
                  "https://www.meetup.com/find/?keywords=angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "24.607",
                  "height",
                  "23.447",
                  "viewBox",
                  "0 0 24.607 23.447",
                ],
                [
                  "id",
                  "logo--mSwarm",
                  "d",
                  "M21.221,14.95A4.393,4.393,0,0,1,17.6,19.281a4.452,4.452,0,0,1-.8.069c-.09,0-.125.035-.154.117a2.939,2.939,0,0,1-2.506,2.091,2.868,2.868,0,0,1-2.248-.624.168.168,0,0,0-.245-.005,3.926,3.926,0,0,1-2.589.741,4.015,4.015,0,0,1-3.7-3.347,2.7,2.7,0,0,1-.043-.38c0-.106-.042-.146-.143-.166a3.524,3.524,0,0,1-1.516-.69A3.623,3.623,0,0,1,2.23,14.557a3.66,3.66,0,0,1,1.077-3.085.138.138,0,0,0,.026-.2,3.348,3.348,0,0,1-.451-1.821,3.46,3.46,0,0,1,2.749-3.28.44.44,0,0,0,.355-.281,5.072,5.072,0,0,1,3.863-3,5.028,5.028,0,0,1,3.555.666.31.31,0,0,0,.271.03A4.5,4.5,0,0,1,18.3,4.7a4.4,4.4,0,0,1,1.334,2.751,3.658,3.658,0,0,1,.022.706.131.131,0,0,0,.1.157,2.432,2.432,0,0,1,1.574,1.645,2.464,2.464,0,0,1-.7,2.616c-.065.064-.051.1-.014.166A4.321,4.321,0,0,1,21.221,14.95ZM13.4,14.607a2.09,2.09,0,0,0,1.409,1.982,4.7,4.7,0,0,0,1.275.221,1.807,1.807,0,0,0,.9-.151.542.542,0,0,0,.321-.545.558.558,0,0,0-.359-.534,1.2,1.2,0,0,0-.254-.078c-.262-.047-.526-.086-.787-.138a.674.674,0,0,1-.617-.75,3.394,3.394,0,0,1,.218-1.109c.217-.658.509-1.286.79-1.918a15.609,15.609,0,0,0,.745-1.86,1.95,1.95,0,0,0,.06-1.073,1.286,1.286,0,0,0-1.051-1.033,1.977,1.977,0,0,0-1.521.2.339.339,0,0,1-.446-.042c-.1-.092-.2-.189-.307-.284a1.214,1.214,0,0,0-1.643-.061,7.563,7.563,0,0,1-.614.512A.588.588,0,0,1,10.883,8c-.215-.115-.437-.215-.659-.316a2.153,2.153,0,0,0-.695-.248A2.091,2.091,0,0,0,7.541,8.562a9.915,9.915,0,0,0-.405.986c-.559,1.545-1.015,3.123-1.487,4.7a1.528,1.528,0,0,0,.634,1.777,1.755,1.755,0,0,0,1.5.211,1.35,1.35,0,0,0,.824-.858c.543-1.281,1.032-2.584,1.55-3.875.142-.355.28-.712.432-1.064a.548.548,0,0,1,.851-.24.622.622,0,0,1,.185.539,2.161,2.161,0,0,1-.181.621c-.337.852-.68,1.7-1.018,2.552a2.564,2.564,0,0,0-.173.528.624.624,0,0,0,.333.71,1.073,1.073,0,0,0,.814.034,1.22,1.22,0,0,0,.657-.655q.758-1.488,1.511-2.978.35-.687.709-1.37a1.073,1.073,0,0,1,.357-.434.43.43,0,0,1,.463-.016.373.373,0,0,1,.153.387.7.7,0,0,1-.057.236c-.065.157-.127.316-.2.469-.42.883-.846,1.763-1.262,2.648A2.463,2.463,0,0,0,13.4,14.607Zm5.888,6.508a1.09,1.09,0,0,0-2.179.006,1.09,1.09,0,0,0,2.179-.006ZM1.028,12.139a1.038,1.038,0,1,0,.01-2.075,1.038,1.038,0,0,0-.01,2.075ZM13.782.528a1.027,1.027,0,1,0-.011,2.055A1.027,1.027,0,0,0,13.782.528ZM22.21,6.95a.882.882,0,0,0-1.763.011A.882.882,0,0,0,22.21,6.95ZM4.153,4.439a.785.785,0,1,0,.787-.78A.766.766,0,0,0,4.153,4.439Zm8.221,18.22a.676.676,0,1,0-.677.666A.671.671,0,0,0,12.374,22.658ZM22.872,12.2a.674.674,0,0,0-.665.665.656.656,0,0,0,.655.643.634.634,0,0,0,.655-.644A.654.654,0,0,0,22.872,12.2ZM7.171-.123A.546.546,0,0,0,6.613.43a.553.553,0,1,0,1.106,0A.539.539,0,0,0,7.171-.123ZM24.119,9.234a.507.507,0,0,0-.493.488.494.494,0,0,0,.494.494.48.48,0,0,0,.487-.483A.491.491,0,0,0,24.119,9.234Zm-19.454,9.7a.5.5,0,0,0-.488-.488.491.491,0,0,0-.487.5.483.483,0,0,0,.491.479A.49.49,0,0,0,4.665,18.936Z",
                  "transform",
                  "translate(0 0.123)",
                  "fill",
                  "#f64060",
                ],
                [
                  "title",
                  "Join the Conversation on Discord",
                  "href",
                  "https://discord.gg/angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "circle-link",
                ],
                [
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "26",
                  "height",
                  "26",
                  "viewBox",
                  "0 0 245 240",
                ],
                [
                  "d",
                  "M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z",
                ],
                [
                  "d",
                  "M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z",
                ],
                [
                  "href",
                  "https://github.com/angular/angular",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                ],
                [1, "github-star-badge"],
                ["d", "M0 0h24v24H0z", "fill", "none"],
                [
                  "d",
                  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
                ],
                [
                  "d",
                  "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
                  "fill",
                  "#1976d2",
                ],
                [
                  "id",
                  "clouds",
                  "xmlns",
                  "http://www.w3.org/2000/svg",
                  "width",
                  "2611.084",
                  "height",
                  "485.677",
                  "viewBox",
                  "0 0 2611.084 485.677",
                ],
                [
                  "id",
                  "Path_39",
                  "data-name",
                  "Path 39",
                  "d",
                  "M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z",
                  "transform",
                  "translate(142.69 -634.312)",
                  "fill",
                  "#eee",
                ],
              ],
              template: function (r, o) {
                if (1 & r) {
                  const i = (function bm() {
                    return v();
                  })();
                  C(0, "div", 0),
                    G(1, "img", 1),
                    C(2, "span"),
                    W(3, "Welcome"),
                    I(),
                    G(4, "div", 2),
                    C(5, "a", 3),
                    ae(),
                    C(6, "svg", 4),
                    G(7, "rect", 5)(8, "path", 6),
                    I()(),
                    ue(),
                    C(9, "a", 7),
                    ae(),
                    C(10, "svg", 8),
                    G(11, "path", 9)(12, "path", 10),
                    I()()(),
                    ue(),
                    C(13, "div", 11)(14, "div", 12),
                    ae(),
                    C(15, "svg", 13)(16, "title"),
                    W(17, "Rocket Ship"),
                    I(),
                    C(18, "g", 14),
                    G(19, "circle", 15),
                    C(20, "g", 16),
                    G(21, "path", 17)(22, "path", 18),
                    I()()(),
                    ue(),
                    C(23, "span"),
                    W(24),
                    I(),
                    ae(),
                    C(25, "svg", 19)(26, "title"),
                    W(27, "Rocket Ship Smoke"),
                    I(),
                    G(28, "path", 20),
                    I()(),
                    ue(),
                    C(29, "h2"),
                    W(30, "Resources"),
                    I(),
                    C(31, "p"),
                    W(32, "Here are some links to help you get started:"),
                    I(),
                    C(33, "div", 21)(34, "a", 22),
                    ae(),
                    C(35, "svg", 23),
                    G(36, "path", 24),
                    I(),
                    ue(),
                    C(37, "span"),
                    W(38, "Learn Angular"),
                    I(),
                    ae(),
                    C(39, "svg", 23),
                    G(40, "path", 25),
                    I()(),
                    ue(),
                    C(41, "a", 26),
                    ae(),
                    C(42, "svg", 23),
                    G(43, "path", 27),
                    I(),
                    ue(),
                    C(44, "span"),
                    W(45, "CLI Documentation"),
                    I(),
                    ae(),
                    C(46, "svg", 23),
                    G(47, "path", 25),
                    I()(),
                    ue(),
                    C(48, "a", 28),
                    ae(),
                    C(49, "svg", 29),
                    G(50, "path", 30)(51, "path", 31)(52, "path", 32)(
                      53,
                      "path",
                      33,
                    )(54, "path", 34),
                    I(),
                    ue(),
                    C(55, "span"),
                    W(56, "Angular Material"),
                    I(),
                    ae(),
                    C(57, "svg", 23),
                    G(58, "path", 25),
                    I()(),
                    ue(),
                    C(59, "a", 35),
                    ae(),
                    C(60, "svg", 23),
                    G(61, "path", 36),
                    I(),
                    ue(),
                    C(62, "span"),
                    W(63, "Angular Blog"),
                    I(),
                    ae(),
                    C(64, "svg", 23),
                    G(65, "path", 25),
                    I()(),
                    ue(),
                    C(66, "a", 37),
                    ae(),
                    C(67, "svg", 38)(68, "g"),
                    G(69, "rect", 39),
                    I(),
                    C(70, "g")(71, "g"),
                    G(72, "path", 40)(73, "polygon", 41),
                    I()()(),
                    ue(),
                    C(74, "span"),
                    W(75, "Angular DevTools"),
                    I(),
                    ae(),
                    C(76, "svg", 23),
                    G(77, "path", 25),
                    I()()(),
                    ue(),
                    C(78, "h2"),
                    W(79, "Next Steps"),
                    I(),
                    C(80, "p"),
                    W(81, "What do you want to do next with your app?"),
                    I(),
                    G(82, "input", 42, 43),
                    C(84, "div", 21)(85, "button", 44),
                    Yt("click", function () {
                      return Pn(i), Fn((Dn(83).value = "component"));
                    }),
                    ae(),
                    C(86, "svg", 23),
                    G(87, "path", 45),
                    I(),
                    ue(),
                    C(88, "span"),
                    W(89, "New Component"),
                    I()(),
                    C(90, "button", 44),
                    Yt("click", function () {
                      return Pn(i), Fn((Dn(83).value = "material"));
                    }),
                    ae(),
                    C(91, "svg", 23),
                    G(92, "path", 45),
                    I(),
                    ue(),
                    C(93, "span"),
                    W(94, "Angular Material"),
                    I()(),
                    C(95, "button", 44),
                    Yt("click", function () {
                      return Pn(i), Fn((Dn(83).value = "pwa"));
                    }),
                    ae(),
                    C(96, "svg", 23),
                    G(97, "path", 45),
                    I(),
                    ue(),
                    C(98, "span"),
                    W(99, "Add PWA Support"),
                    I()(),
                    C(100, "button", 44),
                    Yt("click", function () {
                      return Pn(i), Fn((Dn(83).value = "dependency"));
                    }),
                    ae(),
                    C(101, "svg", 23),
                    G(102, "path", 45),
                    I(),
                    ue(),
                    C(103, "span"),
                    W(104, "Add Dependency"),
                    I()(),
                    C(105, "button", 44),
                    Yt("click", function () {
                      return Pn(i), Fn((Dn(83).value = "test"));
                    }),
                    ae(),
                    C(106, "svg", 23),
                    G(107, "path", 45),
                    I(),
                    ue(),
                    C(108, "span"),
                    W(109, "Run and Watch Tests"),
                    I()(),
                    C(110, "button", 44),
                    Yt("click", function () {
                      return Pn(i), Fn((Dn(83).value = "build"));
                    }),
                    ae(),
                    C(111, "svg", 23),
                    G(112, "path", 45),
                    I(),
                    ue(),
                    C(113, "span"),
                    W(114, "Build for Production"),
                    I()()(),
                    C(115, "div", 46),
                    Hn(116, T2, 2, 0, "pre", 47),
                    Hn(117, A2, 2, 0, "pre", 48),
                    Hn(118, N2, 2, 0, "pre", 48),
                    Hn(119, R2, 2, 0, "pre", 48),
                    Hn(120, x2, 2, 0, "pre", 48),
                    Hn(121, O2, 2, 0, "pre", 48),
                    I(),
                    C(122, "div", 21)(123, "a", 49),
                    ae(),
                    C(124, "svg", 50)(125, "title"),
                    W(126, "Meetup Logo"),
                    I(),
                    G(127, "path", 51),
                    I()(),
                    ue(),
                    C(128, "a", 52),
                    ae(),
                    C(129, "svg", 53)(130, "title"),
                    W(131, "Discord Logo"),
                    I(),
                    G(132, "path", 54)(133, "path", 55),
                    I()()(),
                    ue(),
                    C(134, "footer"),
                    W(135, " Love Angular?\xa0 "),
                    C(136, "a", 56),
                    W(137, " Give our repo a star. "),
                    C(138, "div", 57),
                    ae(),
                    C(139, "svg", 23),
                    G(140, "path", 58)(141, "path", 59),
                    I(),
                    W(142, " Star "),
                    I()(),
                    ue(),
                    C(143, "a", 56),
                    ae(),
                    C(144, "svg", 23),
                    G(145, "path", 60)(146, "path", 58),
                    I()()(),
                    C(147, "svg", 61)(148, "title"),
                    W(149, "Gray Clouds Background"),
                    I(),
                    G(150, "path", 62),
                    I()(),
                    ue(),
                    G(151, "router-outlet");
                }
                if (2 & r) {
                  const i = Dn(83);
                  yn(24),
                    Js("", o.title, " app is running!"),
                    yn(91),
                    wn("ngSwitch", i.value),
                    yn(2),
                    wn("ngSwitchCase", "material"),
                    yn(1),
                    wn("ngSwitchCase", "pwa"),
                    yn(1),
                    wn("ngSwitchCase", "dependency"),
                    yn(1),
                    wn("ngSwitchCase", "test"),
                    yn(1),
                    wn("ngSwitchCase", "build");
                }
              },
              dependencies: [Ia, HD, UD, Hd],
              styles: [
                '[_nghost-%COMP%] {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 8px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover, .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%]:hover {\n    opacity: 0.8;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%] {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: #888;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    all: unset;\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%] {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n\n  svg#rocket[_ngcontent-%COMP%] {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  .terminal[_ngcontent-%COMP%] {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal[_ngcontent-%COMP%]::before {\n    content: "\\2022 \\2022 \\2022";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link[_ngcontent-%COMP%] {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link[_ngcontent-%COMP%]:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%] {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27,31,35,.2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]:hover {\n    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);\n    border-color: rgba(27,31,35,.35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n  \n\n  @media screen and (max-width: 767px) {\n    .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .card[_ngcontent-%COMP%]:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }',
              ],
            })),
            t
          );
        })(),
        F2 = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵmod = Nn({ type: e, bootstrap: [P2] })),
            (e.ɵinj = un({ imports: [$x, S2] })),
            t
          );
        })();
      Lx()
        .bootstrapModule(F2)
        .catch((e) => console.error(e));
    },
  },
  (J) => {
    J((J.s = 9));
  },
]);

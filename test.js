import s from 'arweave';
import t from 'axios';
import 'base64-js';
import 'bignumber.js';
import * as r from 'crypto';
import n from 'futoin-hkdf';
import i from 'jwk-to-pem';
import * as a from 'mime-types';
import o from 'utf8';
import { parse as e } from 'uuid';

import t from 'axios';
import * as r from 'crypto';
import n from 'futoin-hkdf';
import o from 'utf8';
import i from 'jwk-to-pem';
import 'bignumber.js';
import 'base64-js';
import * as a from 'mime-types';
import s from 'arweave';
function u(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(
        e,
        'symbol' ==
          typeof (o = (function (e, t) {
            if ('object' != typeof e || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, 'string');
              if ('object' != typeof n) return n;
              throw new TypeError(
                '@@toPrimitive must return a primitive value.',
              );
            }
            return String(e);
          })(n.key))
          ? o
          : String(o),
        n,
      );
  }
  var o;
}
function c(e, t, r) {
  return (
    t && u(e.prototype, t),
    r && u(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function d() {
  return (
    (d = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    d.apply(this, arguments)
  );
}
function l(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    h(e, t);
}
function h(e, t) {
  return (
    (h = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return (e.__proto__ = t), e;
        }),
    h(e, t)
  );
}
function v(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function f(e, t) {
  var r =
    ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
  if (r) return (r = r.call(e)).next.bind(r);
  if (
    Array.isArray(e) ||
    (r = (function (e, t) {
      if (e) {
        if ('string' == typeof e) return v(e, t);
        var r = Object.prototype.toString.call(e).slice(8, -1);
        return (
          'Object' === r && e.constructor && (r = e.constructor.name),
          'Map' === r || 'Set' === r
            ? Array.from(e)
            : 'Arguments' === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            ? v(e, t)
            : void 0
        );
      }
    })(e)) ||
    (t && e && 'number' == typeof e.length)
  ) {
    r && (e = r);
    var n = 0;
    return function () {
      return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
    };
  }
  throw new TypeError(
    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
var p;
function m(e, t) {
  try {
    var r = e();
  } catch (e) {
    return t(e);
  }
  return r && r.then ? r.then(void 0, t) : r;
}
function y(e, t, r) {
  if (!e.s) {
    if (r instanceof g) {
      if (!r.s) return void (r.o = y.bind(null, e, t));
      1 & t && (t = r.s), (r = r.v);
    }
    if (r && r.then) return void r.then(y.bind(null, e, t), y.bind(null, e, 2));
    (e.s = t), (e.v = r);
    var n = e.o;
    n && n(e);
  }
}
var g = /*#__PURE__*/ (function () {
  function e() {}
  return (
    (e.prototype.then = function (t, r) {
      var n = new e(),
        o = this.s;
      if (o) {
        var i = 1 & o ? t : r;
        if (i) {
          try {
            y(n, 1, i(this.v));
          } catch (e) {
            y(n, 2, e);
          }
          return n;
        }
        return this;
      }
      return (
        (this.o = function (e) {
          try {
            var o = e.v;
            1 & e.s ? y(n, 1, t ? t(o) : o) : r ? y(n, 1, r(o)) : y(n, 2, o);
          } catch (e) {
            y(n, 2, e);
          }
        }),
        n
      );
    }),
    e
  );
})();
function I(e) {
  return e instanceof g && 1 & e.s;
}
var w = /*#__PURE__*/ (function () {
  function e(e) {
    var r = e.gatewayUrl,
      n = e.maxRetriesPerRequest,
      o = void 0 === n ? 8 : n,
      i = e.initialErrorDelayMS,
      a = void 0 === i ? Pe : i,
      s = e.fatalErrors,
      u = void 0 === s ? be : s,
      c = e.validStatusCodes,
      d = void 0 === c ? [200] : c,
      l = e.axiosInstance,
      h = void 0 === l ? t.create({ validateStatus: void 0 }) : l;
    (this.gatewayUrl = void 0),
      (this.maxRetriesPerRequest = void 0),
      (this.initialErrorDelayMS = void 0),
      (this.fatalErrors = void 0),
      (this.validStatusCodes = void 0),
      (this.axiosInstance = void 0),
      (this.lastError = 'unknown error'),
      (this.lastRespStatus = 0),
      (this.gatewayUrl = r),
      (this.maxRetriesPerRequest = o),
      (this.initialErrorDelayMS = a),
      (this.fatalErrors = u),
      (this.validStatusCodes = d),
      (this.axiosInstance = h);
  }
  var r = e.prototype;
  return (
    (r.postChunk = function (e) {
      try {
        return Promise.resolve(this.postToEndpoint('chunk', e)).then(
          function () {},
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (r.postTxHeader = function (e) {
      try {
        return Promise.resolve(this.postToEndpoint('tx', e)).then(
          function () {},
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (r.gqlRequest = function (e) {
      try {
        var t = this;
        return Promise.resolve(
          m(
            function () {
              return Promise.resolve(t.postToEndpoint('graphql', e)).then(
                function (e) {
                  return e.data.data.transactions;
                },
              );
            },
            function (e) {
              throw Error('GQL Error: ' + e.message);
            },
          ),
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (r.postToEndpoint = function (e, t) {
      try {
        var r = this;
        return Promise.resolve(
          r.retryRequestUntilMaxRetries(function () {
            return r.axiosInstance.post('' + r.gatewayUrl.href + e, t);
          }),
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (r.getTransaction = function (e) {
      try {
        var t = this;
        return Promise.resolve(
          m(
            function () {
              return Promise.resolve(
                t.retryRequestUntilMaxRetries(function () {
                  return t.axiosInstance.get(t.gatewayUrl.href + 'tx/' + e);
                }),
              ).then(function (e) {
                return e.data;
              });
            },
            function () {
              throw Error(
                'Transaction could not be found from the gateway: (Status: ' +
                  t.lastRespStatus +
                  ') ' +
                  t.lastError,
              );
            },
          ),
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (r.getTxData = function (e) {
      try {
        var t = this;
        return Promise.resolve(te.get(e)).then(function (r) {
          return r
            ? (console.log(typeof r, r), r)
            : Promise.resolve(
                t.retryRequestUntilMaxRetries(function () {
                  return t.axiosInstance.get('' + t.gatewayUrl.href + e, {
                    responseType: 'arraybuffer',
                  });
                }),
              ).then(function (t) {
                var r = t.data;
                return (
                  console.log(typeof r),
                  Promise.resolve(te.put(e, r)).then(function () {
                    return r;
                  })
                );
              });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (r.retryRequestUntilMaxRetries = function (e) {
      try {
        var t,
          r = function (e) {
            if (t) return e;
            throw new Error(
              'Request to gateway has failed: (Status: ' +
                n.lastRespStatus +
                ') ' +
                n.lastError,
            );
          },
          n = this,
          o = 0,
          i = (function (e, t, r) {
            for (var n; ; ) {
              var o = e();
              if ((I(o) && (o = o.v), !o)) return i;
              if (o.then) {
                n = 0;
                break;
              }
              var i = r();
              if (i && i.then) {
                if (!I(i)) {
                  n = 1;
                  break;
                }
                i = i.s;
              }
              if (t) {
                var a = t();
                if (a && a.then && !I(a)) {
                  n = 2;
                  break;
                }
              }
            }
            var s = new g(),
              u = y.bind(null, s, 2);
            return (
              (0 === n ? o.then(d) : 1 === n ? i.then(c) : a.then(l)).then(
                void 0,
                u,
              ),
              s
            );
            function c(n) {
              i = n;
              do {
                if (t && (a = t()) && a.then && !I(a))
                  return void a.then(l).then(void 0, u);
                if (!(o = e()) || (I(o) && !o.v)) return void y(s, 1, i);
                if (o.then) return void o.then(d).then(void 0, u);
                I((i = r())) && (i = i.v);
              } while (!i || !i.then);
              i.then(c).then(void 0, u);
            }
            function d(e) {
              e
                ? (i = r()) && i.then
                  ? i.then(c).then(void 0, u)
                  : c(i)
                : y(s, 1, i);
            }
            function l() {
              (o = e())
                ? o.then
                  ? o.then(d).then(void 0, u)
                  : d(o)
                : y(s, 1, i);
            }
          })(
            function () {
              return !t && o <= n.maxRetriesPerRequest;
            },
            void 0,
            function () {
              return Promise.resolve(n.tryRequest(e)).then(function (e) {
                function r() {
                  function e() {
                    o = t;
                  }
                  console.error(
                    'Request to gateway has failed: (Status: ' +
                      n.lastRespStatus +
                      ') ' +
                      n.lastError,
                  );
                  var t = o + 1,
                    r = (function () {
                      if (t <= n.maxRetriesPerRequest)
                        return Promise.resolve(
                          n.exponentialBackOffAfterFailedRequest(o),
                        ).then(function () {
                          console.error(
                            'Retrying request, retry attempt ' + t + '...',
                          );
                        });
                    })();
                  return r && r.then ? r.then(e) : e();
                }
                if (e)
                  return (
                    o > 0 &&
                      console.error('Request has been successfully retried!'),
                    (t = 1),
                    e
                  );
                n.throwIfFatalError();
                var i = (function () {
                  if (429 === n.lastRespStatus)
                    return Promise.resolve(n.rateLimitThrottle()).then(
                      function () {},
                    );
                })();
                return i && i.then ? i.then(r) : r();
              });
            },
          );
        return Promise.resolve(i && i.then ? i.then(r) : r(i));
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (r.tryRequest = function (e) {
      try {
        var t,
          r = this,
          n = m(
            function () {
              return Promise.resolve(e()).then(function (e) {
                var n;
                if (((r.lastRespStatus = e.status), r.isRequestSuccessful()))
                  return (t = 1), e;
                r.lastError = null != (n = e.statusText) ? n : e;
              });
            },
            function (e) {
              r.lastError = e instanceof Error ? e.message : e;
            },
          );
        return Promise.resolve(
          n && n.then
            ? n.then(function (e) {
                return t ? e : void 0;
              })
            : t
            ? n
            : void 0,
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (r.isRequestSuccessful = function () {
      return this.validStatusCodes.includes(this.lastRespStatus);
    }),
    (r.throwIfFatalError = function () {
      if (this.fatalErrors.includes(this.lastError))
        throw new Error(
          'Fatal error encountered: (Status: ' +
            this.lastRespStatus +
            ') ' +
            this.lastError,
        );
    }),
    (r.exponentialBackOffAfterFailedRequest = function (e) {
      try {
        var t = Math.pow(2, e) * this.initialErrorDelayMS;
        return (
          console.error(
            'Waiting for ' +
              (t / 1e3).toFixed(1) +
              ' seconds before next request...',
          ),
          Promise.resolve(
            new Promise(function (e) {
              return setTimeout(e, t);
            }),
          ).then(function () {})
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (r.rateLimitThrottle = function () {
      try {
        return (
          console.error(
            'Gateway has returned a ' +
              this.lastRespStatus +
              ' status which means your IP is being rate limited. Pausing for ' +
              (60).toFixed(1) +
              ' seconds before trying next request...',
          ),
          Promise.resolve(
            new Promise(function (e) {
              return setTimeout(e, 6e4);
            }),
          ).then(function () {})
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    e
  );
})();
p = Symbol.toPrimitive;
var P,
  b = /*#__PURE__*/ (function () {
    function e(e) {
      if (
        ((this.byteCount = void 0),
        (this.byteCount = e),
        !Number.isFinite(this.byteCount) ||
          !Number.isInteger(this.byteCount) ||
          this.byteCount < 0)
      )
        throw new Error('Byte count must be a non-negative integer value!');
    }
    var t = e.prototype;
    return (
      (t[p] = function (e) {
        return 'string' === e && this.toString(), this.byteCount;
      }),
      (t.plus = function (t) {
        return new e(this.byteCount + t.byteCount);
      }),
      (t.minus = function (t) {
        return new e(this.byteCount - t.byteCount);
      }),
      (t.isGreaterThan = function (e) {
        return this.byteCount > e.byteCount;
      }),
      (t.isGreaterThanOrEqualTo = function (e) {
        return this.byteCount >= e.byteCount;
      }),
      (t.toString = function () {
        return '' + this.byteCount;
      }),
      (t.valueOf = function () {
        return this.byteCount;
      }),
      (t.toJSON = function () {
        return this.byteCount;
      }),
      (t.equals = function (e) {
        return this.byteCount === e.byteCount;
      }),
      e
    );
  })(),
  T = function (e) {
    return (
      '\n\tedges {\n\t\t' +
      (e ? '' : 'cursor') +
      '\n\t\t\n\tnode {\n\t\tid\n\t\ttags {\n\t\t\tname\n\t\t\tvalue\n\t\t}\n\t\t\n\towner {\n\t\taddress\n\t}\n\n\t}\n\n\t}\n'
    );
  },
  F = Te ? Object.values(Te) : [];
function D(e) {
  for (var t = '', r = e.length, n = 0; n < r; n++)
    t += String.fromCharCode(e[n]);
  return t;
}
function x(e) {
  for (var t = atob(e), r = t.length, n = new Uint8Array(r), o = 0; o < r; o++)
    n[o] = t.charCodeAt(o);
  return n;
}
function S(e, t) {
  try {
    var r = e();
  } catch (e) {
    return t(e);
  }
  return r && r.then ? r.then(void 0, t) : r;
}
const E =
  'undefined' != typeof Symbol
    ? Symbol.iterator || (Symbol.iterator = Symbol('Symbol.iterator'))
    : '@@iterator';
function A(e, t, r) {
  if (!e.s) {
    if (r instanceof C) {
      if (!r.s) return void (r.o = A.bind(null, e, t));
      1 & t && (t = r.s), (r = r.v);
    }
    if (r && r.then) return void r.then(A.bind(null, e, t), A.bind(null, e, 2));
    (e.s = t), (e.v = r);
    var n = e.o;
    n && n(e);
  }
}
var C = /*#__PURE__*/ (function () {
  function e() {}
  return (
    (e.prototype.then = function (t, r) {
      var n = new e(),
        o = this.s;
      if (o) {
        var i = 1 & o ? t : r;
        if (i) {
          try {
            A(n, 1, i(this.v));
          } catch (e) {
            A(n, 2, e);
          }
          return n;
        }
        return this;
      }
      return (
        (this.o = function (e) {
          try {
            var o = e.v;
            1 & e.s ? A(n, 1, t ? t(o) : o) : r ? A(n, 1, r(o)) : A(n, 2, o);
          } catch (e) {
            A(n, 2, e);
          }
        }),
        n
      );
    }),
    e
  );
})();
function j(e) {
  return e instanceof C && 1 & e.s;
}
P = Symbol.toPrimitive;
var N = /*#__PURE__*/ (function () {
  function e(e) {
    if (
      ((this.address = void 0),
      (this.address = e),
      !new RegExp('^[a-zA-Z0-9_-]{43}$').test(e))
    )
      throw new Error(
        'Arweave addresses must be 43 characters in length with characters in the following set: [a-zA-Z0-9_-]',
      );
  }
  var t = e.prototype;
  return (
    (t[P] = function (e) {
      if ('number' === e)
        throw new Error('Arweave addresses cannot be interpreted as a number!');
      return this.toString();
    }),
    (t.equals = function (e) {
      return this.address === e.address;
    }),
    (t.toString = function () {
      return this.address;
    }),
    (t.valueOf = function () {
      return this.address;
    }),
    (t.toJSON = function () {
      return this.toString();
    }),
    e
  );
})();
function M(e) {
  return new N(e);
}
var q,
  O,
  k = /*#__PURE__*/ (function () {
    function t(e) {
      var t = e.password,
        r = e.driveKeys,
        n = e.wallet;
      if (
        ((this.password = void 0),
        (this.wallet = void 0),
        (this.driveKeyCache = {}),
        (this.unverifiedDriveKeys = void 0),
        t && !n)
      )
        throw new Error(
          'Password supplied without a wallet. Did you forget to include your wallet?',
        );
      if (t && r)
        throw new Error(
          "Password and drive keys can't be used together. Please provide one or the other.",
        );
      (this.unverifiedDriveKeys = null != r ? r : []),
        (this.password = t),
        (this.wallet = n);
    }
    var a = t.prototype;
    return (
      (a.safelyDecryptToJson = function (t, a, s, u) {
        try {
          var c,
            d = function (d) {
              var h;
              if (c) return d;
              var v = (function () {
                if (l.password && l.wallet)
                  return Promise.resolve(
                    (function (t, a, s) {
                      try {
                        var u = new Uint8Array(e(a)),
                          c = (function () {
                            for (
                              var e,
                                t = [].slice.call(arguments),
                                r = t.reduce(function (e, t) {
                                  return e + t.length;
                                }, 0),
                                n = new Uint8Array(r),
                                o = 0,
                                i = f(t);
                              !(e = i()).done;

                            ) {
                              var a = e.value;
                              n.set(a, o), (o += a.length);
                            }
                            return n;
                          })(new Uint8Array(X(o.encode('drive'))), u);
                        return Promise.resolve(
                          (function (e, t) {
                            try {
                              var n = r.createSign('sha256');
                              n.update(t);
                              var o = i(e, { private: !0 }),
                                a = n.sign({
                                  key: o,
                                  padding: r.constants.RSA_PKCS1_PSS_PADDING,
                                  saltLength: 0,
                                });
                              return Promise.resolve(a);
                            } catch (e) {
                              return Promise.reject(e);
                            }
                          })(JSON.parse(s), c),
                        ).then(function (e) {
                          var r = D(new Uint8Array(X(o.encode(t))));
                          return Promise.resolve(
                            n(D(e), 32, { info: r, hash: 'SHA-256' }),
                          ).then(function (e) {
                            return new K(e);
                          });
                        });
                      } catch (e) {
                        return Promise.reject(e);
                      }
                    })(
                      l.password,
                      '' + a,
                      JSON.stringify(l.wallet.getPrivateKey()),
                    ),
                  ).then(function (e) {
                    return S(
                      function () {
                        return Promise.resolve(l.decryptToJson(t, s, e)).then(
                          function (t) {
                            return (l.driveKeyCache['' + a] = e), (h = 1), t;
                          },
                        );
                      },
                      function () {},
                    );
                  });
              })();
              return v && v.then
                ? v.then(function (e) {
                    return h ? e : u;
                  })
                : h
                ? v
                : u;
            },
            l = this,
            h = l.driveKeyForDriveId(a);
          if (h) return Promise.resolve(l.decryptToJson(t, s, h));
          var v = (function (e, t, r) {
            if ('function' == typeof e[E]) {
              var n,
                o,
                i,
                a = e[E]();
              if (
                ((function e(s) {
                  try {
                    for (; !((n = a.next()).done || (r && r())); )
                      if ((s = t(n.value)) && s.then) {
                        if (!j(s))
                          return void s.then(
                            e,
                            i || (i = A.bind(null, (o = new C()), 2)),
                          );
                        s = s.v;
                      }
                    o ? A(o, 1, s) : (o = s);
                  } catch (e) {
                    A(o || (o = new C()), 2, e);
                  }
                })(),
                a.return)
              ) {
                var s = function (e) {
                  try {
                    n.done || a.return();
                  } catch (e) {}
                  return e;
                };
                if (o && o.then)
                  return o.then(s, function (e) {
                    throw s(e);
                  });
                s();
              }
              return o;
            }
            if (!('length' in e)) throw new TypeError('Object is not iterable');
            for (var u = [], c = 0; c < e.length; c++) u.push(e[c]);
            return (function (e, t, r) {
              var n,
                o,
                i = -1;
              return (
                (function a(s) {
                  try {
                    for (; ++i < e.length && (!r || !r()); )
                      if ((s = t(i)) && s.then) {
                        if (!j(s))
                          return void s.then(
                            a,
                            o || (o = A.bind(null, (n = new C()), 2)),
                          );
                        s = s.v;
                      }
                    n ? A(n, 1, s) : (n = s);
                  } catch (e) {
                    A(n || (n = new C()), 2, e);
                  }
                })(),
                n
              );
            })(
              u,
              function (e) {
                return t(u[e]);
              },
              r,
            );
          })(
            l.unverifiedDriveKeys,
            function (e) {
              return S(
                function () {
                  return Promise.resolve(l.decryptToJson(t, s, e)).then(
                    function (t) {
                      return (
                        (l.driveKeyCache['' + a] = e),
                        (l.unverifiedDriveKeys = l.unverifiedDriveKeys.filter(
                          function (t) {
                            return t !== e;
                          },
                        )),
                        (c = 1),
                        t
                      );
                    },
                  );
                },
                function () {},
              );
            },
            function () {
              return c;
            },
          );
          return Promise.resolve(v && v.then ? v.then(d) : d(v));
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (a.decryptToJson = function (e, t, n) {
        try {
          return Promise.resolve(
            (function (e, t, n) {
              try {
                try {
                  var o = n.slice(n.length - 16),
                    i = n.slice(0, n.length - 16),
                    a = x(e),
                    s = x(D(t.keyData)),
                    u = r.createDecipheriv('aes-256-gcm', s, a, {
                      authTagLength: 16,
                    });
                  u.setAuthTag(o);
                  for (var c = [], d = u.update(i); d.length > 0; )
                    c.push(d), (d = u.update(new Uint8Array(16)));
                  var l = u.final();
                  l.length > 0 && c.push(l);
                  var h = (function (e) {
                    for (var t, r = 0, n = f(e); !(t = n()).done; )
                      r += t.value.length;
                    for (
                      var o, i = new Uint8Array(r), a = 0, s = f(e);
                      !(o = s()).done;

                    ) {
                      var u = o.value;
                      i.set(u, a), (a += u.length);
                    }
                    return i;
                  })(c);
                  return Promise.resolve(h);
                } catch (e) {
                  return (
                    console.log('Error decrypting file data'),
                    Promise.resolve(new Uint8Array([69, 114, 114, 111, 114]))
                  );
                }
              } catch (e) {
                return Promise.reject(e);
              }
            })(e, n, t),
          ).then(function (e) {
            return Promise.resolve(Q(e));
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (a.driveKeyForDriveId = function (e) {
        var t;
        return null != (t = this.driveKeyCache['' + e]) && t;
      }),
      t
    );
  })(),
  R = /^[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}$/i;
q = Symbol.toPrimitive;
var V = /*#__PURE__*/ (function () {
  function e(e) {
    if (
      ((this.entityId = void 0),
      (this.entityId = e),
      e && e.length && !R.test(e.toString()) && 'ENCRYPTED' !== e)
    )
      throw new Error("Invalid entity ID '" + e + "'!'");
  }
  var t = e.prototype;
  return (
    (t[q] = function (e) {
      if ('number' === e)
        throw new Error('Entity IDs cannot be interpreted as a number!');
      return this.toString();
    }),
    (t.toString = function () {
      return this.entityId;
    }),
    (t.valueOf = function () {
      return this.entityId;
    }),
    (t.equals = function (e) {
      return this.entityId === e.entityId;
    }),
    (t.toJSON = function () {
      return this.toString();
    }),
    e
  );
})();
function _(e) {
  return new V(e);
}
O = Symbol.toPrimitive;
var J = /*#__PURE__*/ (function () {
    function e(e) {
      if (
        ((this.unixTime = void 0),
        (this.unixTime = e),
        this.unixTime < 0 ||
          !Number.isInteger(this.unixTime) ||
          !Number.isFinite(this.unixTime))
      )
        throw new Error('Unix time must be a positive integer!');
    }
    var t = e.prototype;
    return (
      (t.equals = function (e) {
        return +this.unixTime == +e.unixTime;
      }),
      (t[O] = function (e) {
        return 'string' === e && this.toString(), this.unixTime;
      }),
      (t.toString = function () {
        return '' + this.unixTime;
      }),
      (t.valueOf = function () {
        return this.unixTime;
      }),
      (t.toJSON = function () {
        return this.unixTime;
      }),
      e
    );
  })(),
  K = /*#__PURE__*/ (function () {
    function e(e) {
      if (
        ((this.keyData = void 0),
        (this.keyData = e),
        !(e instanceof Uint8Array))
      )
        throw new Error(
          'The argument must be of type Uint8Array, got ' + typeof e,
        );
    }
    var t = e.prototype;
    return (
      (t.toString = function () {
        return (function (e) {
          for (
            var t = '', r = new Uint8Array(e), n = r.byteLength, o = 0;
            o < n;
            o++
          )
            t += String.fromCharCode(r[o]);
          return btoa(t);
        })(this.keyData).replace(/=/g, '');
      }),
      (t.toJSON = function () {
        return this.toString();
      }),
      e
    );
  })(),
  U = function (e, t, r, n, o, i, a, s, u, c, d) {
    (this.appName = void 0),
      (this.appVersion = void 0),
      (this.arFS = void 0),
      (this.contentType = void 0),
      (this.driveId = void 0),
      (this.entityType = void 0),
      (this.name = void 0),
      (this.txId = void 0),
      (this.unixTime = void 0),
      (this.customMetaDataGqlTags = void 0),
      (this.customMetaDataJson = void 0),
      (this.appName = e),
      (this.appVersion = t),
      (this.arFS = r),
      (this.contentType = n),
      (this.driveId = o),
      (this.entityType = i),
      (this.name = a),
      (this.txId = s),
      (this.unixTime = u),
      (this.customMetaDataGqlTags = c),
      (this.customMetaDataJson = d);
  },
  G = /*#__PURE__*/ (function (e) {
    function t(t, r, n, o, i, a, s, u, c, d, l, h, v, f, p, m, y) {
      var g;
      return (
        ((g =
          e.call(this, t, r, n, o, i, a, s, c, d, m, y) || this).entityType =
          void 0),
        (g.size = void 0),
        (g.lastModifiedDate = void 0),
        (g.dataTxId = void 0),
        (g.dataContentType = void 0),
        (g.parentFolderId = void 0),
        (g.entityId = void 0),
        (g.entityType = a),
        (g.size = u),
        (g.lastModifiedDate = l),
        (g.dataTxId = h),
        (g.dataContentType = v),
        (g.parentFolderId = f),
        (g.entityId = p),
        g
      );
    }
    return l(t, e), t;
  })(U),
  z = /*#__PURE__*/ (function () {
    function e(e) {
      var t = e.entityId,
        r = e.gatewayApi,
        n = e.owner;
      (this.appName = void 0),
        (this.appVersion = void 0),
        (this.arFS = void 0),
        (this.contentType = void 0),
        (this.driveId = void 0),
        (this.entityType = void 0),
        (this.name = void 0),
        (this.txId = void 0),
        (this.unixTime = void 0),
        (this.entityId = void 0),
        (this.gatewayApi = void 0),
        (this.owner = void 0),
        (this.customMetaData = {}),
        (this.entityId = t),
        (this.gatewayApi = r),
        (this.owner = n);
    }
    var t = e.prototype;
    return (
      (t.getDataForTxID = function (e) {
        try {
          return Promise.resolve(this.gatewayApi.getTxData(e));
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.parseFromArweaveNode = function (e, t) {
        try {
          var r = function (t) {
              n.txId = M(e.id);
              var r = e.tags;
              if (!r) throw new Error('Tags missing!');
              return (
                r.forEach(function (e) {
                  var t = e.value;
                  switch (e.name) {
                    case 'App-Name':
                      n.appName = t;
                      break;
                    case 'App-Version':
                      n.appVersion = t;
                      break;
                    case 'ArFS':
                      n.arFS = t;
                      break;
                    case 'Content-Type':
                      n.contentType = t;
                      break;
                    case 'Drive-Id':
                      n.driveId = _(t);
                      break;
                    case 'Entity-Type':
                      n.entityType = t;
                      break;
                    case 'Unix-Time':
                      n.unixTime = new J(+t);
                      break;
                    default:
                      o.push(e);
                  }
                }),
                o
              );
            },
            n = this,
            o = [],
            i = (function () {
              if (!e) {
                var r = H({ tags: n.getGqlQueryParameters(), owner: t });
                return Promise.resolve(n.gatewayApi.gqlRequest(r)).then(
                  function (t) {
                    var r = t.edges;
                    if (!r.length)
                      throw new Error(
                        'Entity with ID ' + n.entityId + ' not found!',
                      );
                    e = r[0].node;
                  },
                );
              }
            })();
          return Promise.resolve(i && i.then ? i.then(r) : r());
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.build = function (e) {
        try {
          var t = this;
          return Promise.resolve(t.parseFromArweaveNode(e, t.owner)).then(
            function (e) {
              if (!e) throw new Error('Tags missing!');
              return t.parseCustomMetaDataFromGqlTags(e), t.buildEntity();
            },
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.parseCustomMetaDataFromGqlTags = function (e) {
        for (var t, r = {}, n = f(e); !(t = n()).done; ) {
          var o,
            i = t.value,
            a = i.name,
            s = i.value,
            u = r[a],
            c = u ? (Array.isArray(u) ? [].concat(u, [s]) : [u, s]) : s;
          Object.assign(r, (((o = {})[a] = c), o));
        }
        !(function (e) {
          if ('object' != typeof e || null === e) return !1;
          for (var t = 0, r = Object.entries(e); t < r.length; t++) {
            var n = r[t],
              o = n[0],
              i = n[1];
            if (B.protectedArFSGqlTagNames.includes(o))
              return (
                console.error(
                  'Provided custom metadata GQL tag name collides with a protected ArFS protected tag: ' +
                    o,
                ),
                !1
              );
            if ('string' != typeof i) {
              if (!Array.isArray(i)) return !1;
              for (var a, s = f(i); !(a = s()).done; ) {
                var u = a.value;
                if ('string' != typeof u) return !1;
                $(u);
              }
            } else $(i);
          }
          return !0;
        })(r)
          ? console.error(
              'Parsed an invalid custom metadata shape from MetaData Tx GQL Tags: ' +
                r,
            )
          : Object.keys(r).length > 0 &&
            (this.customMetaData.metaDataGqlTags = r);
      }),
      (t.parseCustomMetaDataFromDataJson = function (e) {
        var t = this;
        if (
          (function (e) {
            try {
              JSON.parse(JSON.stringify(e));
            } catch (e) {
              return !1;
            }
            return !0;
          })(e)
        ) {
          for (
            var r,
              n = {},
              o = f(
                Object.entries(e).filter(function (e) {
                  return !t.protectedDataJsonKeys.includes(e[0]);
                }),
              );
            !(r = o()).done;

          ) {
            var i,
              a = r.value;
            Object.assign(n, (((i = {})[a[0]] = a[1]), i));
          }
          Object.keys(n).length > 0 && (this.customMetaData.metaDataJson = n);
        } else
          console.error(
            'Parsed an invalid custom metadata shape from MetaData Tx Data JSON: ' +
              e,
          );
      }),
      e
    );
  })(),
  L = /*#__PURE__*/ (function (e) {
    function t() {
      for (var t, r = arguments.length, n = new Array(r), o = 0; o < r; o++)
        n[o] = arguments[o];
      return (
        ((t = e.call.apply(e, [this].concat(n)) || this).parentFolderId =
          void 0),
        t
      );
    }
    return (
      l(t, e),
      (t.prototype.parseFromArweaveNode = function (t) {
        try {
          var r = this,
            n = [];
          return Promise.resolve(
            e.prototype.parseFromArweaveNode.call(r, t),
          ).then(function (e) {
            if (!e) throw new Error('Tags missing!');
            return (
              e.forEach(function (e) {
                'Parent-Folder-Id' === e.name
                  ? (r.parentFolderId = _(e.value))
                  : n.push(e);
              }),
              n
            );
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      t
    );
  })(z),
  B = /*#__PURE__*/ (function () {
    function e(e) {
      var t = e.appName,
        r = void 0 === t ? 'default' : t,
        n = e.appVersion,
        o = void 0 === n ? 'default' : n,
        i = e.arFSVersion,
        a = void 0 === i ? 'default' : i;
      (this.appName = void 0),
        (this.appVersion = void 0),
        (this.arFSVersion = void 0),
        (this.appName = r),
        (this.appVersion = o),
        (this.arFSVersion = a);
    }
    return (
      (e.prototype.getFileDataItemTags = function (e, t) {
        var r = this.baseAppTags;
        return (
          r.push.apply(
            r,
            e ? [fe, pe, me] : [{ name: 'Content-Type', value: t }],
          ),
          r
        );
      }),
      c(e, [
        {
          key: 'baseAppTags',
          get: function () {
            return [
              { name: 'App-Name', value: this.appName },
              { name: 'App-Version', value: this.appVersion },
            ];
          },
        },
        {
          key: 'baseArFSTags',
          get: function () {
            return [].concat(this.baseAppTags, [
              { name: 'ArFS', value: this.arFSVersion },
            ]);
          },
        },
        {
          key: 'baseBundleTags',
          get: function () {
            return [].concat(this.baseAppTags, [
              { name: 'Bundle-Format', value: 'binary' },
              { name: 'Bundle-Version', value: '2.0.0' },
            ]);
          },
        },
      ]),
      e
    );
  })();
(B.protectedArFSGqlTagNames = F),
  d({}, { created: [], tips: [], fees: {} }, { manifest: {}, links: [] });
var Q = function (e) {
  try {
    var t, r, n, o, i;
    t = '';
    var a = e.length;
    for (r = 0; r < a; )
      switch ((n = e[r++]) >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          t += String.fromCharCode(n);
          break;
        case 12:
        case 13:
          (o = e[r++]), (t += String.fromCharCode(((31 & n) << 6) | (63 & o)));
          break;
        case 14:
          (o = e[r++]),
            (i = e[r++]),
            (t += String.fromCharCode(
              ((15 & n) << 12) | ((63 & o) << 6) | ((63 & i) << 0),
            ));
      }
    return Promise.resolve(t);
  } catch (e) {
    return Promise.reject(e);
  }
};
function H(e) {
  var t = e.tags,
    r = e.cursor,
    n = e.owner,
    o = e.sort,
    i = void 0 === o ? 'HEIGHT_DESC' : o,
    a = e.ids,
    s = '';
  (void 0 === t ? [] : t).forEach(function (e) {
    s =
      s +
      '\n\t\t\t\t{ name: "' +
      e.name +
      '", values: ' +
      (Array.isArray(e.value) ? JSON.stringify(e.value) : '"' + e.value + '"') +
      ' }';
  });
  var u = void 0 === r;
  return {
    query:
      'query {\n\t\t\ttransactions(\n\t\t\t\t' +
      (null != a && a.length
        ? 'ids: [' +
          a.map(function (e) {
            return '"' + e + '"';
          }) +
          ']'
        : '') +
      '\n\t\t\t\tfirst: ' +
      (u ? 1 : 100) +
      '\n\t\t\t\tsort: ' +
      i +
      '\n\t\t\t\t' +
      (u ? '' : 'after: "' + r + '"') +
      '\n\t\t\t\t' +
      (void 0 === n ? '' : 'owners: ["' + n + '"]') +
      '\n\t\t\t\ttags: [\n\t\t\t\t\t' +
      s +
      '\n\t\t\t\t]\n\t\t\t) {\n\t\t\t\t' +
      (u ? '' : '\n\tpageInfo {\n\t\thasNextPage\n\t}\n') +
      '\n\t\t\t\t' +
      T(u) +
      '\n\t\t\t}\n\t\t}',
  };
}
function W(e) {
  var t,
    r,
    n = null != (t = e.api.config.protocol) ? t : ge,
    o = null != (r = e.api.config.host) ? r : ye;
  return new URL(
    n + '://' + o + (e.api.config.port ? ':' + e.api.config.port : '') + '/',
  );
}
function $(e) {
  if (0 === e.length)
    throw Error('Metadata string must be at least one character!');
}
function Y(e, t, r) {
  var n = r.filter(function (t) {
    return t.entityId.equals(e.entityId);
  });
  return e.txId.equals(n[0].txId);
}
function Z(e, t, r) {
  var n = r.filter(function (t) {
    return t.driveId.equals(e.driveId);
  });
  return e.txId.equals(n[0].txId);
}
function X(e) {
  return new TextEncoder().encode(e).buffer;
}
var ee = /*#__PURE__*/ (function () {
    function e(e, t) {
      var r = this;
      (this.dbPromise = void 0),
        (this.cache = void 0),
        (this._gatewayApi = void 0),
        (this.dbPromise = this.initDatabase(e)),
        this.dbPromise.then(function (e) {
          r.cache = e;
        }),
        (this._gatewayApi = new w({
          gatewayUrl: W(null != t ? t : s.init({})),
        }));
    }
    var t = e.prototype;
    return (
      (t.cacheKeyString = function (e) {
        return 'string' == typeof e ? e : JSON.stringify(e);
      }),
      (t.initDatabase = function (e) {
        try {
          return Promise.resolve(
            new Promise(function (e, t) {
              var r = indexedDB.open('arfs-entity-cache-db', 1);
              console.log('initializing database'),
                (r.onerror = function (e) {
                  console.debug(e), t(r.error);
                }),
                (r.onupgradeneeded = function (e) {
                  var t = r.result.createObjectStore('cache', {
                    keyPath: 'key',
                  });
                  t.createIndex('key', 'key', { unique: !0 }),
                    t.createIndex('value', 'value');
                }),
                (r.onsuccess = function (t) {
                  console.debug(t), e(r.result);
                });
            }),
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.put = function (e, t) {
        try {
          var r = this.cacheKeyString(e);
          return Promise.resolve(this.dbPromise).then(function (e) {
            return new Promise(function (n, o) {
              var i = e
                .transaction('cache', 'readwrite')
                .objectStore('cache')
                .put({ key: r.toString(), value: t });
              (i.onsuccess = function (e) {
                n(t);
              }),
                (i.onerror = function (e) {
                  console.debug('Error putting in entity cache'), o(i.error);
                });
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.get = function (e) {
        try {
          var t = this,
            r = t.cacheKeyString(e);
          return Promise.resolve(t.dbPromise).then(function (e) {
            return (
              console.log('getting', r),
              console.log({ cache: t.cache, cacheKey: r }),
              new Promise(function (t, n) {
                var o = e
                  .transaction('cache', 'readonly')
                  .objectStore('cache')
                  .index('key')
                  .get(r);
                (o.onsuccess = function (e) {
                  var r = o.result;
                  t(r ? r.value : void 0);
                }),
                  (o.onerror = function (e) {
                    n(o.error);
                  });
              })
            );
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.remove = function (e) {
        try {
          var t = this.cacheKeyString(e);
          return Promise.resolve(this.dbPromise).then(function (e) {
            return new Promise(function (r, n) {
              var o = e.transaction('cache', 'readwrite').objectStore('cache'),
                i = o.index('key').getKey(t);
              (i.onsuccess = function (e) {
                var t = i.result;
                if (void 0 !== t) {
                  var a = o.delete(t);
                  (a.onsuccess = function () {
                    r();
                  }),
                    (a.onerror = function () {
                      console.debug(e), n(a.error);
                    });
                } else r();
              }),
                (i.onerror = function (e) {
                  console.debug(e), n(i.error);
                });
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.clear = function () {
        try {
          return Promise.resolve(this.dbPromise).then(function (e) {
            return new Promise(function (t, r) {
              var n = e
                .transaction('cache', 'readwrite')
                .objectStore('cache')
                .clear();
              (n.onsuccess = function (e) {
                console.debug(e), t();
              }),
                (n.onerror = function (e) {
                  console.debug(e), r(n.error);
                });
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (t.size = function () {
        try {
          return Promise.resolve(this.dbPromise).then(function (e) {
            return new Promise(function (t, r) {
              var n = e
                .transaction('cache', 'readonly')
                .objectStore('cache')
                .count();
              (n.onsuccess = function (e) {
                console.debug(e), t(n.result);
              }),
                (n.onerror = function (e) {
                  console.debug(e), r(n.error);
                });
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      e
    );
  })(),
  te = /*#__PURE__*/ (function () {
    function e() {}
    return (
      (e.platformCacheFolder = function () {
        return 'metadata';
      }),
      (e.initDatabase = function () {
        try {
          return Promise.resolve(
            new Promise(function (e, t) {
              var r = indexedDB.open('arfs-metadata-cache-db', 1);
              console.log('Initializing database'),
                (r.onerror = function (e) {
                  console.debug(e), t(r.error);
                }),
                (r.onupgradeneeded = function (e) {
                  var t = r.result.createObjectStore('cache', {
                    keyPath: 'txId',
                  });
                  t.createIndex('txId', 'txId', { unique: !0 }),
                    t.createIndex('buffer', 'buffer');
                }),
                (r.onsuccess = function (t) {
                  console.debug(t), e(r.result);
                });
            }),
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (e.getCacheFolder = function () {
        try {
          var e = this;
          return (
            e.cacheFolderPromise ||
              (e.cacheFolderPromise = new Promise(function (t) {
                t(e.metadataCacheFolder);
              })),
            Promise.resolve(e.cacheFolderPromise)
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (e.put = function (e, t) {
        try {
          var r = this;
          return Promise.resolve(r.getDatabase()).then(function (n) {
            return (
              console.log('putting', e),
              console.log({ cache: r.metadataCacheFolder }),
              new Promise(function (r, o) {
                var i = n
                  .transaction('cache', 'readwrite')
                  .objectStore('cache')
                  .put({ txId: e.toString(), buffer: t });
                (i.onsuccess = function (e) {
                  console.debug(e), r();
                }),
                  (i.onerror = function (e) {
                    console.debug(e), o(i.error);
                  });
              })
            );
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (e.get = function (e) {
        try {
          var t = this;
          return Promise.resolve(t.getDatabase()).then(function (r) {
            return new Promise(function (n, o) {
              console.log('getting', e),
                console.log({ cache: t.metadataCacheFolder });
              var i = r
                .transaction('cache', 'readonly')
                .objectStore('cache')
                .index('txId')
                .get(e.toString());
              (i.onsuccess = function (e) {
                var t = i.result;
                t ? (console.debug(e, t), n(t.buffer)) : n(void 0);
              }),
                (i.onerror = function (e) {
                  console.debug(e), o(i.error);
                });
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (e.getDatabase = function () {
        try {
          var e = this;
          return (
            e.dbPromise || (e.dbPromise = e.initDatabase()),
            Promise.resolve(e.dbPromise)
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      e
    );
  })();
(te.cacheFolderPromise = void 0),
  (te.shouldCacheLog = '1' === process.env.ARDRIVE_CACHE_LOG),
  (te.metadataCacheFolder = te.platformCacheFolder()),
  (te.logTag = '[Metadata Cache] '),
  (te.dbPromise = void 0);
var re = {
    ownerCache: new ee(10),
    driveIdCache: new ee(10),
    publicDriveCache: new ee(10),
    publicFolderCache: new ee(10),
    publicFileCache: new ee(10),
  },
  ne = /*#__PURE__*/ (function (e) {
    function t(t, r, n, o, i, a, s, u, c, d, l, h, v, f, p, m) {
      var y;
      return (
        ((y =
          e.call(
            this,
            t,
            r,
            n,
            o,
            i,
            'file',
            a,
            l,
            s,
            u,
            h,
            v,
            f,
            c,
            d,
            p,
            m,
          ) || this).fileId = void 0),
        (y.fileId = d),
        y
      );
    }
    return l(t, e), t;
  })(G),
  oe = /*#__PURE__*/ (function (e) {
    function t(t, r) {
      var n;
      return (
        ((n =
          e.call(
            this,
            t.appName,
            t.appVersion,
            t.arFS,
            t.contentType,
            t.driveId,
            t.name,
            t.txId,
            t.unixTime,
            t.parentFolderId,
            t.fileId,
            t.size,
            t.lastModifiedDate,
            t.dataTxId,
            t.dataContentType,
            t.customMetaDataGqlTags,
            t.customMetaDataJson,
          ) || this).path = void 0),
        (n.txIdPath = void 0),
        (n.entityIdPath = void 0),
        (n.path = '' + r.pathToFolderId(t.parentFolderId) + t.name),
        (n.txIdPath = '' + r.txPathToFolderId(t.parentFolderId) + t.txId),
        (n.entityIdPath =
          '' + r.entityPathToFolderId(t.parentFolderId) + t.fileId),
        n
      );
    }
    return l(t, e), t;
  })(ne),
  ie = /*#__PURE__*/ (function (e) {
    function t() {
      return e.apply(this, arguments) || this;
    }
    return (
      l(t, e),
      (t.fromArweaveNode = function (e, r) {
        var n,
          o = e.tags;
        if (!o) throw new Error('Tags missing!');
        var i =
          null ==
          (n = o.find(function (e) {
            return 'File-Id' === e.name;
          }))
            ? void 0
            : n.value;
        if (!i) throw new Error('File-ID tag missing!');
        return new t({ entityId: _(i), gatewayApi: r });
      }),
      (t.prototype.buildEntity = function () {
        try {
          var e,
            t = function (t) {
              if (e) return t;
              throw new Error('Invalid file state');
            },
            r = this,
            n = (function () {
              var t, n, o, i, s;
              if (
                null != (t = r.appName) &&
                t.length &&
                null != (n = r.appVersion) &&
                n.length &&
                null != (o = r.arFS) &&
                o.length &&
                null != (i = r.contentType) &&
                i.length &&
                r.driveId &&
                null != (s = r.entityType) &&
                s.length &&
                r.txId &&
                r.unixTime &&
                r.parentFolderId &&
                r.entityId
              )
                return Promise.resolve(r.getDataForTxID(r.txId)).then(function (
                  t,
                ) {
                  return Promise.resolve(Q(t)).then(function (t) {
                    return Promise.resolve(JSON.parse(t)).then(function (t) {
                      var n;
                      if (
                        ((r.name = t.name),
                        (r.size = new b(t.size)),
                        (r.lastModifiedDate = new J(t.lastModifiedDate)),
                        (r.dataTxId = new N(t.dataTxId)),
                        (r.dataContentType =
                          null != (n = t.dataContentType)
                            ? n
                            : (function (e) {
                                var t = e.substring(e.lastIndexOf('.') + 1);
                                t = t.toLowerCase();
                                var r = a.lookup(t);
                                return !1 === r ? 'unknown' : r;
                              })(r.name)),
                        !(
                          r.name &&
                          void 0 !== r.size &&
                          r.lastModifiedDate &&
                          r.dataTxId &&
                          r.dataContentType &&
                          'file' === r.entityType
                        ))
                      )
                        throw new Error('Invalid file state');
                      r.parseCustomMetaDataFromDataJson(t);
                      var o = Promise.resolve(
                        new ne(
                          r.appName,
                          r.appVersion,
                          r.arFS,
                          r.contentType,
                          r.driveId,
                          r.name,
                          r.txId,
                          r.unixTime,
                          r.parentFolderId,
                          r.entityId,
                          r.size,
                          r.lastModifiedDate,
                          r.dataTxId,
                          r.dataContentType,
                          r.customMetaData.metaDataGqlTags,
                          r.customMetaData.metaDataJson,
                        ),
                      );
                      return (e = 1), o;
                    });
                  });
                });
            })();
          return Promise.resolve(n && n.then ? n.then(t) : t(n));
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      t
    );
  })(
    /*#__PURE__*/ (function (e) {
      function t() {
        for (var t, r = arguments.length, n = new Array(r), o = 0; o < r; o++)
          n[o] = arguments[o];
        return (
          ((t = e.call.apply(e, [this].concat(n)) || this).size = void 0),
          (t.lastModifiedDate = void 0),
          (t.dataTxId = void 0),
          (t.dataContentType = void 0),
          (t.protectedDataJsonKeys = [
            'name',
            'size',
            'lastModifiedDate',
            'dataTxId',
            'dataContentType',
          ]),
          t
        );
      }
      l(t, e);
      var r = t.prototype;
      return (
        (r.getGqlQueryParameters = function () {
          return [
            { name: 'File-Id', value: '' + this.entityId },
            { name: 'Entity-Type', value: 'file' },
          ];
        }),
        (r.parseFromArweaveNode = function (t) {
          try {
            return Promise.resolve(
              e.prototype.parseFromArweaveNode.call(this, t),
            ).then(function (e) {
              if (!e) throw new Error('Tags missing!');
              return e.filter(function (e) {
                return 'File-Id' !== e.name;
              });
            });
          } catch (e) {
            return Promise.reject(e);
          }
        }),
        t
      );
    })(L),
  );
new b(2147483646);
var ae = /*#__PURE__*/ (function (e) {
    function t(t, r, n, o, i, a, s, u, c, d, l, h) {
      var v;
      return (
        ((v =
          e.call(
            this,
            t,
            r,
            n,
            o,
            i,
            'folder',
            a,
            new b(0),
            s,
            u,
            new J(0),
            Fe,
            ve,
            c,
            d,
            l,
            h,
          ) || this).folderId = void 0),
        (v.folderId = d),
        v
      );
    }
    return l(t, e), t;
  })(G),
  se = /*#__PURE__*/ (function (e) {
    function t(t, r) {
      var n;
      return (
        ((n =
          e.call(
            this,
            t.appName,
            t.appVersion,
            t.arFS,
            t.contentType,
            t.driveId,
            t.name,
            t.txId,
            t.unixTime,
            t.parentFolderId,
            t.folderId,
            t.customMetaDataGqlTags,
            t.customMetaDataJson,
          ) || this).path = void 0),
        (n.txIdPath = void 0),
        (n.entityIdPath = void 0),
        (n.path = '' + r.pathToFolderId(t.parentFolderId) + t.name),
        (n.txIdPath = '' + r.txPathToFolderId(t.parentFolderId) + t.txId),
        (n.entityIdPath =
          '' + r.entityPathToFolderId(t.parentFolderId) + t.folderId),
        n
      );
    }
    return l(t, e), t;
  })(ae),
  ue = /*#__PURE__*/ (function () {
    function e(e, t, r) {
      void 0 === r && (r = []),
        (this.folderId = void 0),
        (this.parent = void 0),
        (this.children = void 0),
        (this.folderId = e),
        (this.parent = t),
        (this.children = r);
    }
    return (
      (e.fromEntity = function (t) {
        return new e(t.entityId);
      }),
      e
    );
  })(),
  ce = /*#__PURE__*/ (function () {
    function e(e, t) {
      (this.folderIdToEntityMap = void 0),
        (this.folderIdToNodeMap = void 0),
        (this._rootNode = void 0),
        (this.folderIdToEntityMap = e),
        (this.folderIdToNodeMap = t);
    }
    (e.newFromEntities = function (t) {
      for (
        var r,
          n = t.reduce(function (e, t) {
            var r;
            return Object.assign(e, (((r = {})['' + t.entityId] = t), r));
          }, {}),
          o = {},
          i = f(t);
        !(r = i()).done;

      )
        this.setupNodesWithEntity(r.value, n, o);
      return new e(n, o);
    }),
      (e.setupNodesWithEntity = function (e, t, r) {
        var n = Object.keys(r).includes('' + e.entityId),
          o = Object.keys(r).includes('' + e.parentFolderId);
        if (!n) {
          if (!o) {
            var i = t['' + e.parentFolderId];
            i && this.setupNodesWithEntity(i, t, r);
          }
          var a = r['' + e.parentFolderId];
          if (a) {
            var s = new ue(e.entityId, a);
            a.children.push(s), (r['' + e.entityId] = s);
          } else {
            var u = new ue(e.entityId);
            r['' + e.entityId] = u;
          }
        }
      });
    var t = e.prototype;
    return (
      (t.subTreeOf = function (t, r) {
        var n = this;
        void 0 === r && (r = Number.MAX_SAFE_INTEGER);
        var o = this.nodeAndChildrenOf(this.folderIdToNodeMap['' + t], r);
        return new e(
          o.reduce(function (e, t) {
            var r;
            return Object.assign(
              e,
              (((r = {})['' + t.folderId] =
                n.folderIdToEntityMap['' + t.folderId]),
              r),
            );
          }, {}),
          o.reduce(function (e, t) {
            var r;
            return Object.assign(e, (((r = {})['' + t.folderId] = t), r));
          }, {}),
        );
      }),
      (t.allFolderIDs = function () {
        return Object.keys(this.folderIdToEntityMap).map(function (e) {
          return _(e);
        });
      }),
      (t.nodeAndChildrenOf = function (e, t) {
        var r = this,
          n = [e];
        return (
          t > 0 &&
            e.children.forEach(function (e) {
              n.push.apply(n, r.nodeAndChildrenOf(e, t - 1));
            }),
          n
        );
      }),
      (t.folderIdSubtreeFromFolderId = function (e, t) {
        var r = this,
          n = this.folderIdToNodeMap['' + e],
          o = [n.folderId];
        return (
          0 === t ||
            n.children
              .map(function (e) {
                return e.folderId;
              })
              .forEach(function (e) {
                o.push.apply(o, r.folderIdSubtreeFromFolderId(e, t - 1));
              }),
          o
        );
      }),
      (t.pathToFolderId = function (e) {
        var t = this;
        if (this.rootNode.parent)
          throw new Error("Can't compute paths from sub-tree");
        if ('' + e === Ie) return '/';
        for (
          var r = this.folderIdToNodeMap['' + e], n = [r];
          r.parent && !r.folderId.equals(this.rootNode.folderId);

        )
          n.push((r = r.parent));
        return (
          '/' +
          n
            .reverse()
            .map(function (e) {
              return t.folderIdToEntityMap['' + e.folderId].name;
            })
            .join('/') +
          '/'
        );
      }),
      (t.entityPathToFolderId = function (e) {
        if (this.rootNode.parent)
          throw new Error("Can't compute paths from sub-tree");
        if ('' + e === Ie) return '/';
        for (
          var t = this.folderIdToNodeMap['' + e], r = [t];
          t.parent && !t.folderId.equals(this.rootNode.folderId);

        )
          r.push((t = t.parent));
        return (
          '/' +
          r
            .reverse()
            .map(function (e) {
              return e.folderId;
            })
            .join('/') +
          '/'
        );
      }),
      (t.txPathToFolderId = function (e) {
        var t = this;
        if (this.rootNode.parent)
          throw new Error("Can't compute paths from sub-tree");
        if ('' + e === Ie) return '/';
        for (
          var r = this.folderIdToNodeMap['' + e], n = [r];
          r.parent && !r.folderId.equals(this.rootNode.folderId);

        )
          n.push((r = r.parent));
        return (
          '/' +
          n
            .reverse()
            .map(function (e) {
              return t.folderIdToEntityMap['' + e.folderId].txId;
            })
            .join('/') +
          '/'
        );
      }),
      c(e, [
        {
          key: 'rootNode',
          get: function () {
            if (this._rootNode) return this._rootNode;
            for (
              var e = Object.keys(this.folderIdToEntityMap)[0],
                t = this.folderIdToNodeMap[e];
              t.parent && this.folderIdToNodeMap['' + t.parent.folderId];

            )
              t = t.parent;
            return (this._rootNode = t), t;
          },
        },
      ]),
      e
    );
  })(),
  de = /*#__PURE__*/ (function (e) {
    function t() {
      for (var t, r = arguments.length, n = new Array(r), o = 0; o < r; o++)
        n[o] = arguments[o];
      return (
        ((t = e.call.apply(e, [this].concat(n)) || this).protectedDataJsonKeys =
          ['name']),
        t
      );
    }
    l(t, e);
    var r = t.prototype;
    return (
      (r.parseFromArweaveNode = function (t) {
        try {
          return Promise.resolve(
            e.prototype.parseFromArweaveNode.call(this, t),
          ).then(function (e) {
            if (!e) throw new Error('Tags missing!');
            return e.filter(function (e) {
              return 'Folder-Id' !== e.name;
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (r.getGqlQueryParameters = function () {
        return [
          { name: 'Folder-Id', value: '' + this.entityId },
          { name: 'Entity-Type', value: 'folder' },
        ];
      }),
      t
    );
  })(L),
  le = /*#__PURE__*/ (function (e) {
    function t() {
      var t;
      return ((t = e.call(this, '' + De) || this).entityId = Ie), t;
    }
    return l(t, e), t;
  })(V),
  he = /*#__PURE__*/ (function (e) {
    function t() {
      return e.apply(this, arguments) || this;
    }
    return (
      l(t, e),
      (t.fromArweaveNode = function (e, r) {
        var n,
          o = e.tags;
        if (!o) throw new Error('Tags missing!');
        var i =
          null ==
          (n = o.find(function (e) {
            return 'Folder-Id' === e.name;
          }))
            ? void 0
            : n.value;
        if (!i) throw new Error('Folder-ID tag missing!');
        return new t({ entityId: _(i), gatewayApi: r });
      }),
      (t.prototype.buildEntity = function () {
        try {
          var e,
            t = function (t) {
              if (e) return t;
              throw new Error('Invalid public folder state');
            },
            r = this;
          r.parentFolderId || (r.parentFolderId = new le());
          var n = (function () {
            var t, n, o, i, a;
            if (
              null != (t = r.appName) &&
              t.length &&
              null != (n = r.appVersion) &&
              n.length &&
              null != (o = r.arFS) &&
              o.length &&
              null != (i = r.contentType) &&
              i.length &&
              r.driveId &&
              null != (a = r.entityType) &&
              a.length &&
              r.txId &&
              r.unixTime &&
              r.parentFolderId &&
              r.entityId &&
              'folder' === r.entityType
            )
              return Promise.resolve(r.getDataForTxID(r.txId)).then(function (
                t,
              ) {
                return Promise.resolve(
                  ((n = t),
                  (o = Array.from(n)),
                  new TextDecoder().decode(new Uint8Array(o))),
                ).then(function (n) {
                  console.log({ dataString: n, txData: t });
                  var o = JSON.parse(n);
                  if (((r.name = o.name), !r.name))
                    throw new Error(
                      'Invalid public folder state: name not found!',
                    );
                  r.parseCustomMetaDataFromDataJson(o);
                  var i = Promise.resolve(
                    new ae(
                      r.appName,
                      r.appVersion,
                      r.arFS,
                      r.contentType,
                      r.driveId,
                      r.name,
                      r.txId,
                      r.unixTime,
                      r.parentFolderId,
                      r.entityId,
                      r.customMetaData.metaDataGqlTags,
                      r.customMetaData.metaDataJson,
                    ),
                  );
                  return (e = 1), i;
                });
                var n, o;
              });
          })();
          return Promise.resolve(n && n.then ? n.then(t) : t(n));
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      t
    );
  })(de),
  ve = 'application/json',
  fe = { name: 'Content-Type', value: 'application/octet-stream' },
  pe = { name: 'Cipher', value: 'AES256-GCM' },
  me = { name: 'Cipher-IV', value: 'qwertyuiopasdfgh' },
  ye = 'arweave.net',
  ge = 'https',
  Ie = 'root folder',
  we = 'ENCRYPTED',
  Pe = 500,
  be = [
    'invalid_json',
    'chunk_too_big',
    'data_path_too_big',
    'offset_too_big',
    'data_size_too_big',
    'chunk_proof_ratio_not_attractive',
    'invalid_proof',
  ],
  Te = {
    arFS: 'ArFS',
    tipType: 'Tip-Type',
    contentType: 'Content-Type',
    boost: 'Boost',
    bundleFormat: 'Bundle-Format',
    bundleVersion: 'Bundle-Version',
    entityType: 'Entity-Type',
    unitTime: 'Unix-Time',
    driveId: 'Drive-Id',
    folderId: 'Folder-Id',
    fileId: 'File-Id',
    parentFolderId: 'Parent-Folder-Id',
    drivePrivacy: 'Drive-Privacy',
    cipher: 'Cipher',
    cipherIv: 'Cipher-IV',
    driveAuthMode: 'Drive-Auth-Mode',
  },
  Fe = new N('0000000000000000000000000000000000000000000'),
  De = _('00000000-0000-0000-0000-000000000000'),
  xe = /*#__PURE__*/ (function (e) {
    function t(t, r, n, o, i, a, s, u, c, d, l, h, v) {
      var f;
      return (
        ((f = e.call(this, t, r, n, o, i, a, s, u, c, h, v) || this).appName =
          void 0),
        (f.appVersion = void 0),
        (f.arFS = void 0),
        (f.contentType = void 0),
        (f.driveId = void 0),
        (f.entityType = void 0),
        (f.name = void 0),
        (f.txId = void 0),
        (f.unixTime = void 0),
        (f.drivePrivacy = void 0),
        (f.rootFolderId = void 0),
        (f.appName = t),
        (f.appVersion = r),
        (f.arFS = n),
        (f.contentType = o),
        (f.driveId = i),
        (f.entityType = a),
        (f.name = s),
        (f.txId = u),
        (f.unixTime = c),
        (f.drivePrivacy = d),
        (f.rootFolderId = l),
        f
      );
    }
    return l(t, e), t;
  })(U),
  Se = /*#__PURE__*/ (function (e) {
    function t(t, r, n, o, i, a, s, u, c, d, l, h, v, f, p, m, y) {
      var g;
      return (
        ((g = e.call(this, t, r, n, o, i, a, s, u, c, m, y) || this).appName =
          void 0),
        (g.appVersion = void 0),
        (g.arFS = void 0),
        (g.contentType = void 0),
        (g.driveId = void 0),
        (g.entityType = void 0),
        (g.name = void 0),
        (g.txId = void 0),
        (g.unixTime = void 0),
        (g.drivePrivacy = void 0),
        (g.rootFolderId = void 0),
        (g.driveAuthMode = void 0),
        (g.cipher = void 0),
        (g.cipherIV = void 0),
        (g.driveKey = void 0),
        (g.appName = t),
        (g.appVersion = r),
        (g.arFS = n),
        (g.contentType = o),
        (g.driveId = i),
        (g.entityType = a),
        (g.name = s),
        (g.txId = u),
        (g.unixTime = c),
        (g.drivePrivacy = d),
        (g.rootFolderId = l),
        (g.driveAuthMode = h),
        (g.cipher = v),
        (g.cipherIV = f),
        (g.driveKey = p),
        g
      );
    }
    return l(t, e), t;
  })(U),
  Ee = /*#__PURE__*/ (function (e) {
    function t() {
      for (var t, r = arguments.length, n = new Array(r), o = 0; o < r; o++)
        n[o] = arguments[o];
      return (
        ((t = e.call.apply(e, [this].concat(n)) || this).protectedDataJsonKeys =
          ['name', 'rootFolderId']),
        t
      );
    }
    return l(t, e), t;
  })(z),
  Ae = /*#__PURE__*/ (function (e) {
    function t() {
      for (var t, r = arguments.length, n = new Array(r), o = 0; o < r; o++)
        n[o] = arguments[o];
      return (
        ((t = e.call.apply(e, [this].concat(n)) || this).drivePrivacy = void 0),
        (t.rootFolderId = void 0),
        t
      );
    }
    l(t, e),
      (t.fromArweaveNode = function (e, r) {
        var n,
          o = e.tags;
        if (!o) throw new Error('Tags missing!');
        var i =
          null ==
          (n = o.find(function (e) {
            return 'Drive-Id' === e.name;
          }))
            ? void 0
            : n.value;
        if (!i) throw new Error('Drive-ID tag missing!');
        return new t({ entityId: _(i), gatewayApi: r });
      });
    var r = t.prototype;
    return (
      (r.getGqlQueryParameters = function () {
        return [
          { name: 'Drive-Id', value: '' + this.entityId },
          { name: 'Entity-Type', value: 'drive' },
          { name: 'Drive-Privacy', value: 'public' },
        ];
      }),
      (r.parseFromArweaveNode = function (t) {
        try {
          var r = this,
            n = [];
          return Promise.resolve(
            e.prototype.parseFromArweaveNode.call(r, t),
          ).then(function (e) {
            if (!e) throw new Error('Tags missing!');
            return (
              e.forEach(function (e) {
                'Drive-Privacy' === e.name
                  ? (r.drivePrivacy = e.value)
                  : n.push(e);
              }),
              n
            );
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (r.buildEntity = function () {
        try {
          var e,
            t = function (t) {
              if (e) return t;
              throw new Error('Invalid drive state');
            },
            r = this,
            n = (function () {
              var t, n, o, i, a, s;
              if (
                null != (t = r.appName) &&
                t.length &&
                null != (n = r.appVersion) &&
                n.length &&
                null != (o = r.arFS) &&
                o.length &&
                null != (i = r.contentType) &&
                i.length &&
                r.driveId &&
                null != (a = r.entityType) &&
                a.length &&
                r.txId &&
                r.unixTime &&
                r.driveId.equals(r.entityId) &&
                null != (s = r.drivePrivacy) &&
                s.length
              )
                return Promise.resolve(r.getDataForTxID(r.txId)).then(function (
                  t,
                ) {
                  return Promise.resolve(Q(t)).then(function (n) {
                    return Promise.resolve(JSON.parse(n)).then(function (o) {
                      if (
                        (console.log({ txData: t, dataString: n, dataJSON: o }),
                        (r.name = o.name),
                        (r.rootFolderId = o.rootFolderId),
                        !r.name || !r.rootFolderId)
                      )
                        throw new Error('Invalid drive state');
                      r.parseCustomMetaDataFromDataJson(o);
                      var i = new xe(
                        r.appName,
                        r.appVersion,
                        r.arFS,
                        r.contentType,
                        r.driveId,
                        r.entityType,
                        r.name,
                        r.txId,
                        r.unixTime,
                        r.drivePrivacy,
                        r.rootFolderId,
                        r.customMetaData.metaDataGqlTags,
                        r.customMetaData.metaDataJson,
                      );
                      return (e = 1), i;
                    });
                  });
                });
            })();
          return Promise.resolve(n && n.then ? n.then(t) : t(n));
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      t
    );
  })(Ee),
  Ce = /*#__PURE__*/ (function (e) {
    function t(t) {
      var r,
        n = t.privateKeyData;
      return (
        ((r =
          e.call(this, { entityId: t.entityId, gatewayApi: t.gatewayApi }) ||
          this).drivePrivacy = void 0),
        (r.rootFolderId = void 0),
        (r.driveAuthMode = void 0),
        (r.cipher = void 0),
        (r.cipherIV = void 0),
        (r.privateKeyData = void 0),
        (r.privateKeyData = n),
        r
      );
    }
    l(t, e);
    var r = t.prototype;
    return (
      (r.getGqlQueryParameters = function () {
        return [
          { name: 'Drive-Id', value: '' + this.entityId },
          { name: 'Entity-Type', value: 'drive' },
        ];
      }),
      (t.fromArweaveNode = function (e, r, n) {
        var o,
          i = e.tags;
        if (!i) throw new Error('Tags missing!');
        var a =
          null ==
          (o = i.find(function (e) {
            return 'Drive-Id' === e.name;
          }))
            ? void 0
            : o.value;
        if (!a) throw new Error('Drive-ID tag missing!');
        return new t({ entityId: _(a), privateKeyData: n, gatewayApi: r });
      }),
      (r.parseFromArweaveNode = function (t) {
        try {
          var r = this,
            n = [];
          return Promise.resolve(
            e.prototype.parseFromArweaveNode.call(r, t),
          ).then(function (e) {
            if (!e) throw new Error('Tags missing!');
            return (
              e.forEach(function (e) {
                var t = e.value;
                switch (e.name) {
                  case 'Cipher':
                    r.cipher = t;
                    break;
                  case 'Cipher-IV':
                    r.cipherIV = t;
                    break;
                  case 'Drive-Auth-Mode':
                    r.driveAuthMode = t;
                    break;
                  case 'Drive-Privacy':
                    r.drivePrivacy = t;
                    break;
                  default:
                    n.push(e);
                }
              }),
              n
            );
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (r.buildEntity = function () {
        try {
          var e,
            t = function (t) {
              if (e) return t;
              throw new Error('Invalid drive state');
            },
            r = this,
            n = (function () {
              var t, n, o, i, a, s;
              if (
                null != (t = r.appName) &&
                t.length &&
                null != (n = r.appVersion) &&
                n.length &&
                null != (o = r.arFS) &&
                o.length &&
                null != (i = r.contentType) &&
                i.length &&
                r.driveId &&
                null != (a = r.entityType) &&
                a.length &&
                r.txId &&
                r.unixTime &&
                null != (s = r.drivePrivacy) &&
                s.length
              ) {
                var u = 'private' === r.drivePrivacy;
                return Promise.resolve(r.getDataForTxID(r.txId)).then(function (
                  t,
                ) {
                  var n = new Uint8Array(t);
                  return Promise.resolve(
                    (function () {
                      try {
                        if (u) {
                          var e, o, i;
                          if (
                            null != (e = r.cipher) &&
                            e.length &&
                            null != (o = r.driveAuthMode) &&
                            o.length &&
                            null != (i = r.cipherIV) &&
                            i.length
                          )
                            return Promise.resolve(
                              r.privateKeyData.safelyDecryptToJson(
                                r.cipherIV,
                                r.entityId,
                                n,
                                { name: we, rootFolderId: we },
                              ),
                            );
                          throw new Error('Invalid private drive state');
                        }
                        return Promise.resolve(Q(t));
                      } catch (e) {
                        return Promise.reject(e);
                      }
                    })(),
                  ).then(function (t) {
                    if (
                      ((r.name = t.name),
                      (r.rootFolderId = _(t.rootFolderId)),
                      r.parseCustomMetaDataFromDataJson(t),
                      u)
                    ) {
                      if (!r.driveAuthMode || !r.cipher || !r.cipherIV)
                        throw new Error(
                          'Unexpectedly null privacy data for private drive with ID ' +
                            r.driveId +
                            '!',
                        );
                      var n = new je(
                        r.appName,
                        r.appVersion,
                        r.arFS,
                        r.contentType,
                        r.driveId,
                        r.entityType,
                        r.name,
                        r.txId,
                        r.unixTime,
                        r.drivePrivacy,
                        r.rootFolderId,
                        r.driveAuthMode,
                        r.cipher,
                        r.cipherIV,
                        r.customMetaData.metaDataGqlTags,
                        r.customMetaData.metaDataJson,
                      );
                      return (e = 1), n;
                    }
                    var o = new xe(
                      r.appName,
                      r.appVersion,
                      r.arFS,
                      r.contentType,
                      r.driveId,
                      r.entityType,
                      r.name,
                      r.txId,
                      r.unixTime,
                      r.drivePrivacy,
                      r.rootFolderId,
                      r.customMetaData.metaDataGqlTags,
                      r.customMetaData.metaDataJson,
                    );
                    return (e = 1), o;
                  });
                });
              }
            })();
          return Promise.resolve(n && n.then ? n.then(t) : t(n));
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      t
    );
  })(Ee),
  je = /*#__PURE__*/ (function (e) {
    function t(t, r, n, o, i, a, s, u, c, d, l, h, v, f, p, m) {
      var y;
      return (
        ((y =
          e.call(
            this,
            t,
            r,
            n,
            o,
            i,
            a,
            s,
            u,
            c,
            d,
            l,
            h,
            v,
            f,
            new K(new Uint8Array([])),
            p,
            m,
          ) || this).driveKey = void 0),
        (y.driveKey = new K(new Uint8Array([]))),
        delete y.driveKey,
        y
      );
    }
    return l(t, e), t;
  })(Se);
function Ne(e, t, r) {
  if (!e.s) {
    if (r instanceof qe) {
      if (!r.s) return void (r.o = Ne.bind(null, e, t));
      1 & t && (t = r.s), (r = r.v);
    }
    if (r && r.then)
      return void r.then(Ne.bind(null, e, t), Ne.bind(null, e, 2));
    (e.s = t), (e.v = r);
    var n = e.o;
    n && n(e);
  }
}
var Me = /*#__PURE__*/ (function () {
  function e(e, t, r) {
    void 0 === t && (t = re),
      void 0 === r && (r = new w({ gatewayUrl: W(e) })),
      (this.caches = void 0),
      (this.gatewayApi = void 0),
      (this._arweave = void 0),
      (this._gatewayApi = void 0),
      (this._caches = void 0),
      (this.appName = void 0),
      (this.appVersion = void 0),
      (this.caches = t),
      (this.gatewayApi = r),
      (this._arweave = e),
      (this._gatewayApi = r),
      (this._caches = t),
      (this.appName = 'ArFS'),
      (this.appVersion = '0.0.1');
  }
  var t = e.prototype;
  return (
    (t.getOwnerForDriveId = function (e) {
      try {
        var t = this;
        return Promise.resolve(t.caches.ownerCache.get(e)).then(function (r) {
          if (r) return r;
          var n = t.caches.ownerCache,
            o = n.put;
          return Promise.resolve(
            (function () {
              try {
                var r = H({
                  tags: [
                    { name: 'Drive-Id', value: '' + e },
                    { name: 'Entity-Type', value: 'drive' },
                  ],
                  sort: 'HEIGHT_ASC',
                });
                return Promise.resolve(t.gatewayApi.gqlRequest(r)).then(
                  function (t) {
                    var r = t.edges;
                    if (!r.length)
                      throw new Error(
                        'Could not find a transaction with "Drive-Id": ' + e,
                      );
                    return M(r[0].node.owner.address);
                  },
                );
              } catch (e) {
                return Promise.reject(e);
              }
            })(),
          ).then(function (t) {
            return o.call(n, e, t);
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getDriveIDForEntityId = function (e, t) {
      try {
        var r = this;
        return Promise.resolve(r.caches.driveIdCache.get(e)).then(function (n) {
          return (
            n ||
            Promise.resolve(function () {
              try {
                var n = H({ tags: [{ name: t, value: '' + e }] });
                return Promise.resolve(r.gatewayApi.gqlRequest(n)).then(
                  function (r) {
                    var n = r.edges;
                    if (!n.length)
                      throw new Error(
                        'Entity with ' + t + ' ' + e + ' not found!',
                      );
                    var o = n[0].node.tags.find(function (e) {
                      return 'Drive-Id' === e.name;
                    });
                    if (o) return _(o.value);
                    throw new Error(
                      'No Drive-Id tag found for meta data transaction of ' +
                        t +
                        ': ' +
                        e,
                    );
                  },
                );
              } catch (e) {
                return Promise.reject(e);
              }
            }).then(function (t) {
              var n = r.caches.driveIdCache,
                o = n.put;
              return Promise.resolve(t()).then(function (t) {
                return Promise.resolve(o.call(n, e, t));
              });
            })
          );
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getDriveOwnerForFolderId = function (e) {
      try {
        var t = this,
          r = t.getOwnerForDriveId;
        return Promise.resolve(t.getDriveIdForFolderId(e)).then(function (e) {
          return r.call(t, e);
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getDriveIdForFolderId = function (e) {
      try {
        return Promise.resolve(this.getDriveIDForEntityId(e, 'Folder-Id'));
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getDriveOwnerForFileId = function (e) {
      try {
        var t = this,
          r = t.getOwnerForDriveId;
        return Promise.resolve(t.getDriveIdForFileId(e)).then(function (e) {
          return r.call(t, e);
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getDriveIdForFileId = function (e) {
      try {
        return Promise.resolve(this.getDriveIDForEntityId(e, 'File-Id'));
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getDriveIdForEntityID = function (e) {
      try {
        return Promise.resolve(this.getDriveIDForEntityId(e, 'Folder-Id'));
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getPublicDrive = function (e) {
      var t = e.driveId,
        r = e.owner;
      try {
        var n = this,
          o = { driveId: t, owner: r };
        return Promise.resolve(n.caches.publicDriveCache.get(o)).then(function (
          e,
        ) {
          if (e) return e;
          var i = n.caches.publicDriveCache,
            a = i.put;
          return Promise.resolve(
            new Ae({ entityId: t, gatewayApi: n.gatewayApi, owner: r }).build(),
          ).then(function (e) {
            return Promise.resolve(a.call(i, o, e));
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getPublicFolder = function (e) {
      var t = e.folderId,
        r = e.owner;
      try {
        var n = this,
          o = { folderId: t, owner: r };
        return Promise.resolve(n.caches.publicFolderCache.get(o)).then(
          function (e) {
            if (e) return e;
            var i = n.caches.publicFolderCache,
              a = i.put;
            return Promise.resolve(
              new he({
                entityId: t,
                gatewayApi: n.gatewayApi,
                owner: r,
              }).build(),
            ).then(function (e) {
              return Promise.resolve(a.call(i, o, e));
            });
          },
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getPublicFile = function (e) {
      var t = e.fileId,
        r = e.owner;
      try {
        var n = this,
          o = { fileId: t, owner: r };
        return Promise.resolve(n.caches.publicFileCache.get(o)).then(function (
          e,
        ) {
          if (e) return e;
          var i = n.caches.publicFileCache,
            a = i.put;
          return Promise.resolve(
            new ie({ entityId: t, gatewayApi: n.gatewayApi, owner: r }).build(),
          ).then(function (e) {
            return Promise.resolve(a.call(i, o, e));
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getAllDrivesForAddress = function (e) {
      var t = e.address,
        r = e.privateKeyData,
        n = e.latestRevisionsOnly,
        o = void 0 === n || n;
      try {
        var i = function () {
            return o ? d.filter(Z) : d;
          },
          a = this,
          s = new N(t),
          u = '',
          c = !0,
          d = [],
          l = ke(
            function () {
              return !!c;
            },
            void 0,
            function () {
              var e = H({
                tags: [{ name: 'Entity-Type', value: 'drive' }],
                cursor: u,
                owner: s,
              });
              return Promise.resolve(a.gatewayApi.gqlRequest(e)).then(function (
                e,
              ) {
                c = e.pageInfo.hasNextPage;
                var t = e.edges.map(function (e) {
                    try {
                      var t = e.node;
                      u = e.cursor;
                      var n = Ce.fromArweaveNode(t, a.gatewayApi, r);
                      return Promise.resolve(n.build(t)).then(function (e) {
                        if ('public' === e.drivePrivacy) {
                          var t = { driveId: e.driveId, owner: s },
                            r = a.caches.publicDriveCache,
                            n = r.put;
                          return Promise.resolve(Promise.resolve(e)).then(
                            function (e) {
                              return Promise.resolve(n.call(r, t, e));
                            },
                          );
                        }
                        return Promise.resolve(e);
                      });
                    } catch (e) {
                      return Promise.reject(e);
                    }
                  }),
                  n = d.push;
                return Promise.resolve(Promise.all(t)).then(function (e) {
                  n.call.apply(n, [d].concat(e));
                });
              });
            },
          );
        return Promise.resolve(l && l.then ? l.then(i) : i());
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getPublicFilesWithParentFolderIds = function (e, t, r) {
      void 0 === r && (r = !1);
      try {
        var n = function () {
            return r ? s.filter(Y) : s;
          },
          o = this,
          i = '',
          a = !0,
          s = [],
          u = ke(
            function () {
              return !!a;
            },
            void 0,
            function () {
              var r = H({
                tags: [
                  {
                    name: 'Parent-Folder-Id',
                    value: e.map(function (e) {
                      return e.toString();
                    }),
                  },
                  { name: 'Entity-Type', value: 'file' },
                ],
                cursor: i,
                owner: t,
              });
              return Promise.resolve(o.gatewayApi.gqlRequest(r)).then(function (
                e,
              ) {
                a = e.pageInfo.hasNextPage;
                var r = e.edges.map(function (e) {
                  try {
                    var r = e.node;
                    i = e.cursor;
                    var n = ie.fromArweaveNode(r, o.gatewayApi);
                    return Promise.resolve(n.build(r)).then(function (e) {
                      var r = { fileId: e.fileId, owner: t };
                      s.push(e);
                      var n = o.caches.publicFileCache,
                        i = n.put;
                      return Promise.resolve(Promise.resolve(e)).then(function (
                        e,
                      ) {
                        return Promise.resolve(i.call(n, r, e));
                      });
                    });
                  } catch (e) {
                    return Promise.reject(e);
                  }
                });
                return Promise.resolve(Promise.all(r)).then(function () {});
              });
            },
          );
        return Promise.resolve(u && u.then ? u.then(n) : n());
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.getAllFoldersOfPublicDrive = function (e) {
      var t = e.driveId,
        r = e.owner,
        n = e.latestRevisionsOnly,
        o = void 0 !== n && n;
      try {
        var i = function () {
            return o ? c.filter(Y) : c;
          },
          a = this,
          s = '',
          u = !0,
          c = [],
          d = ke(
            function () {
              return !!u;
            },
            void 0,
            function () {
              var e = H({
                tags: [
                  { name: 'Drive-Id', value: '' + t },
                  { name: 'Entity-Type', value: 'folder' },
                ],
                cursor: s,
                owner: r,
              });
              return Promise.resolve(a.gatewayApi.gqlRequest(e)).then(function (
                e,
              ) {
                u = e.pageInfo.hasNextPage;
                var t = e.edges.map(function (e) {
                    try {
                      var t = e.node;
                      s = e.cursor;
                      var n = he.fromArweaveNode(t, a.gatewayApi);
                      return Promise.resolve(n.build(t)).then(function (e) {
                        var t = { folderId: e.entityId, owner: r },
                          n = a.caches.publicFolderCache,
                          o = n.put;
                        return Promise.resolve(Promise.resolve(e)).then(
                          function (e) {
                            return Promise.resolve(o.call(n, t, e));
                          },
                        );
                      });
                    } catch (e) {
                      return Promise.reject(e);
                    }
                  }),
                  n = c.push;
                return Promise.resolve(Promise.all(t)).then(function (e) {
                  n.call.apply(n, [c].concat(e));
                });
              });
            },
          );
        return Promise.resolve(d && d.then ? d.then(i) : i());
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    (t.listPublicFolder = function (e) {
      var t = e.folderId,
        r = e.maxDepth,
        n = e.includeRoot,
        o = e.owner;
      try {
        var i = this;
        if (!Number.isInteger(r) || r < 0)
          throw new Error('maxDepth should be a non-negative integer!');
        return Promise.resolve(
          i.getPublicFolder({ folderId: t, owner: o }),
        ).then(function (e) {
          return Promise.resolve(
            i.getAllFoldersOfPublicDrive({
              driveId: e.driveId,
              owner: o,
              latestRevisionsOnly: !0,
            }),
          ).then(function (a) {
            function s() {
              for (var e, t = [], r = f(l); !(e = r()).done; ) t.push(e.value);
              for (var n, o = f(h); !(n = o()).done; ) t.push(n.value);
              var i = t.map(function (e) {
                return (function (e, t) {
                  return 'folder' === e.entityType
                    ? new se(e, t)
                    : new oe(e, t);
                })(e, u);
              });
              return i;
            }
            var u = ce.newFromEntities(a),
              c = u.folderIdSubtreeFromFolderId(t, r),
              d = u.folderIdSubtreeFromFolderId(t, r + 1).slice(1),
              l = a.filter(function (e) {
                return d.some(function (t) {
                  return t.equals(e.entityId);
                });
              });
            n && l.unshift(e);
            var h = [],
              v = (function (e, t, r) {
                if ('function' == typeof e[Re]) {
                  var n,
                    o,
                    i,
                    a = e[Re]();
                  if (
                    ((function e(r) {
                      try {
                        for (; !(n = a.next()).done; )
                          if ((r = t(n.value)) && r.then) {
                            if (!Oe(r))
                              return void r.then(
                                e,
                                i || (i = Ne.bind(null, (o = new qe()), 2)),
                              );
                            r = r.v;
                          }
                        o ? Ne(o, 1, r) : (o = r);
                      } catch (e) {
                        Ne(o || (o = new qe()), 2, e);
                      }
                    })(),
                    a.return)
                  ) {
                    var s = function (e) {
                      try {
                        n.done || a.return();
                      } catch (e) {}
                      return e;
                    };
                    if (o && o.then)
                      return o.then(s, function (e) {
                        throw s(e);
                      });
                    s();
                  }
                  return o;
                }
                if (!('length' in e))
                  throw new TypeError('Object is not iterable');
                for (var u = [], c = 0; c < e.length; c++) u.push(e[c]);
                return (function (e, t, r) {
                  var n,
                    o,
                    i = -1;
                  return (
                    (function r(a) {
                      try {
                        for (; ++i < e.length; )
                          if ((a = t(i)) && a.then) {
                            if (!Oe(a))
                              return void a.then(
                                r,
                                o || (o = Ne.bind(null, (n = new qe()), 2)),
                              );
                            a = a.v;
                          }
                        n ? Ne(n, 1, a) : (n = a);
                      } catch (e) {
                        Ne(n || (n = new qe()), 2, e);
                      }
                    })(),
                    n
                  );
                })(u, function (e) {
                  return t(u[e]);
                });
              })(c, function (e) {
                return Promise.resolve(
                  i.getPublicFilesWithParentFolderIds([e], o, !0),
                ).then(function (e) {
                  e.forEach(function (e) {
                    h.push(e);
                  });
                });
              });
            return v && v.then ? v.then(s) : s();
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    e
  );
})();
const qe = /*#__PURE__*/ (function () {
  function e() {}
  return (
    (e.prototype.then = function (t, r) {
      const n = new e(),
        o = this.s;
      if (o) {
        const e = 1 & o ? t : r;
        if (e) {
          try {
            Ne(n, 1, e(this.v));
          } catch (e) {
            Ne(n, 2, e);
          }
          return n;
        }
        return this;
      }
      return (
        (this.o = function (e) {
          try {
            const o = e.v;
            1 & e.s ? Ne(n, 1, t ? t(o) : o) : r ? Ne(n, 1, r(o)) : Ne(n, 2, o);
          } catch (e) {
            Ne(n, 2, e);
          }
        }),
        n
      );
    }),
    e
  );
})();
function Oe(e) {
  return e instanceof qe && 1 & e.s;
}
function ke(e, t, r) {
  for (var n; ; ) {
    var o = e();
    if ((Oe(o) && (o = o.v), !o)) return i;
    if (o.then) {
      n = 0;
      break;
    }
    var i = r();
    if (i && i.then) {
      if (!Oe(i)) {
        n = 1;
        break;
      }
      i = i.s;
    }
    if (t) {
      var a = t();
      if (a && a.then && !Oe(a)) {
        n = 2;
        break;
      }
    }
  }
  var s = new qe(),
    u = Ne.bind(null, s, 2);
  return (
    (0 === n ? o.then(d) : 1 === n ? i.then(c) : a.then(l)).then(void 0, u), s
  );
  function c(n) {
    i = n;
    do {
      if (t && (a = t()) && a.then && !Oe(a))
        return void a.then(l).then(void 0, u);
      if (!(o = e()) || (Oe(o) && !o.v)) return void Ne(s, 1, i);
      if (o.then) return void o.then(d).then(void 0, u);
      Oe((i = r())) && (i = i.v);
    } while (!i || !i.then);
    i.then(c).then(void 0, u);
  }
  function d(e) {
    e ? ((i = r()) && i.then ? i.then(c).then(void 0, u) : c(i)) : Ne(s, 1, i);
  }
  function l() {
    (o = e()) ? (o.then ? o.then(d).then(void 0, u) : d(o)) : Ne(s, 1, i);
  }
}
var Re =
  'undefined' != typeof Symbol
    ? Symbol.iterator || (Symbol.iterator = Symbol('Symbol.iterator'))
    : '@@iterator';
export { Me as ArFSClient, N as ArweaveAddress, k as PrivateKeyData };

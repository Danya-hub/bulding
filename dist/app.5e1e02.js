(() => {
    "use strict";
    var t, e, r, n, i, s, a, o, h, d, c, f, l, u, m, p = {
            467: (t, e, r) => {
                r.d(e, {
                    Z: () => s
                });
                var n = r(476),
                    i = r.n(n)()((function (t) {
                        return t[1]
                    }));
                i.push([t.id, "/*? ------------- style for shape ------------- */\r\n\r\n.baseSide {\r\n    position: relative; /*! <--- */\r\n}\r\n\r\n.sideShape {\r\n    position: absolute;\r\n    background: rgb(140, 59, 12);\r\n    /*      linear-gradient(90deg,\r\n                rgb(107, 45, 9, 0.7) 0%,\r\n                rgb(107, 45, 9, 0.7) 50%,\r\n                rgb(140, 59, 12, 0.7) 50%,\r\n                rgb(140, 59, 12, 0.7) 0%),\r\n            linear-gradient(0deg,\r\n                rgb(107, 45, 9, 0.7) 0%,\r\n                rgb(107, 45, 9, 0.7) 50%,\r\n                rgb(140, 59, 12, 0.7) 50%,\r\n                rgb(140, 59, 12, 0.7) 0%); */\r\n    box-shadow: inset 0px 0px 0px 0.6px rgb(0, 0, 0);\r\n    transform-style: preserve-3d;\r\n}\r\n\r\n.surface {\r\n    overflow: hidden;\r\n}", ""]);
                const s = i
            },
            627: (t, e, r) => {
                r.d(e, {
                    Z: () => o
                });
                var n = r(476),
                    i = r.n(n),
                    s = r(467),
                    a = i()((function (t) {
                        return t[1]
                    }));
                a.i(s.Z), a.push([t.id, "/*? ------------- style for shape ------------- */\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    font: 100 14px sans-serif;\r\n}\r\n\r\nbody {\r\n    position: relative;\r\n    background: radial-gradient(circle, rgb(193, 227, 255) 30%, rgb(105, 212, 255)) no-repeat;\r\n    width: 100vw;\r\n    height: 100vh;\r\n}\r\n\r\n#platform {\r\n    position: absolute;\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    transform-style: preserve-3d;\r\n    left: 50%;\r\n    top: 75%;\r\n    animation: rotate 30s infinite linear;\r\n}\r\n\r\n@keyframes rotate {\r\n    0% {\r\n        transform: translate(-50%, -75%) rotateX(60deg) rotateZ(0deg);\r\n    }\r\n\r\n    100% {\r\n        transform: translate(-50%, -75%) rotateX(60deg) rotateZ(360deg);\r\n    }\r\n}", ""]);
                const o = a
            },
            476: t => {
                t.exports = function (t) {
                    var e = [];
                    return e.toString = function () {
                        return this.map((function (e) {
                            var r = t(e);
                            return e[2] ? "@media ".concat(e[2], " {").concat(r, "}") : r
                        })).join("")
                    }, e.i = function (t, r, n) {
                        "string" == typeof t && (t = [
                            [null, t, ""]
                        ]);
                        var i = {};
                        if (n)
                            for (var s = 0; s < this.length; s++) {
                                var a = this[s][0];
                                null != a && (i[a] = !0)
                            }
                        for (var o = 0; o < t.length; o++) {
                            var h = [].concat(t[o]);
                            n && i[h[0]] || (r && (h[2] ? h[2] = "".concat(r, " and ").concat(h[2]) : h[2] = r), e.push(h))
                        }
                    }, e
                }
            },
            892: t => {
                var e = [];

                function r(t) {
                    for (var r = -1, n = 0; n < e.length; n++)
                        if (e[n].identifier === t) {
                            r = n;
                            break
                        } return r
                }

                function n(t, n) {
                    for (var s = {}, a = [], o = 0; o < t.length; o++) {
                        var h = t[o],
                            d = n.base ? h[0] + n.base : h[0],
                            c = s[d] || 0,
                            f = "".concat(d, " ").concat(c);
                        s[d] = c + 1;
                        var l = r(f),
                            u = {
                                css: h[1],
                                media: h[2],
                                sourceMap: h[3]
                            }; - 1 !== l ? (e[l].references++, e[l].updater(u)) : e.push({
                            identifier: f,
                            updater: i(u, n),
                            references: 1
                        }), a.push(f)
                    }
                    return a
                }

                function i(t, e) {
                    var r = e.domAPI(e);
                    return r.update(t),
                        function (e) {
                            if (e) {
                                if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                                r.update(t = e)
                            } else r.remove()
                        }
                }
                t.exports = function (t, i) {
                    var s = n(t = t || [], i = i || {});
                    return function (t) {
                        t = t || [];
                        for (var a = 0; a < s.length; a++) {
                            var o = r(s[a]);
                            e[o].references--
                        }
                        for (var h = n(t, i), d = 0; d < s.length; d++) {
                            var c = r(s[d]);
                            0 === e[c].references && (e[c].updater(), e.splice(c, 1))
                        }
                        s = h
                    }
                }
            },
            311: t => {
                var e = {};
                t.exports = function (t, r) {
                    var n = function (t) {
                        if (void 0 === e[t]) {
                            var r = document.querySelector(t);
                            if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement) try {
                                r = r.contentDocument.head
                            } catch (t) {
                                r = null
                            }
                            e[t] = r
                        }
                        return e[t]
                    }(t);
                    if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    n.appendChild(r)
                }
            },
            60: t => {
                t.exports = function (t) {
                    var e = document.createElement("style");
                    return t.setAttributes(e, t.attributes), t.insert(e), e
                }
            },
            192: (t, e, r) => {
                t.exports = function (t) {
                    var e = r.nc;
                    e && t.setAttribute("nonce", e)
                }
            },
            760: t => {
                t.exports = function (t) {
                    var e = t.insertStyleElement(t);
                    return {
                        update: function (r) {
                            ! function (t, e, r) {
                                var n = r.css,
                                    i = r.media,
                                    s = r.sourceMap;
                                i ? t.setAttribute("media", i) : t.removeAttribute("media"), s && "undefined" != typeof btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s)))), " */")), e.styleTagTransform(n, t)
                            }(e, t, r)
                        },
                        remove: function () {
                            ! function (t) {
                                if (null === t.parentNode) return !1;
                                t.parentNode.removeChild(t)
                            }(e)
                        }
                    }
                }
            },
            865: t => {
                t.exports = function (t, e) {
                    if (e.styleSheet) e.styleSheet.cssText = t;
                    else {
                        for (; e.firstChild;) e.removeChild(e.firstChild);
                        e.appendChild(document.createTextNode(t))
                    }
                }
            }
        },
        g = {};

    function x(t) {
        var e = g[t];
        if (void 0 !== e) return e.exports;
        var r = g[t] = {
            id: t,
            exports: {}
        };
        return p[t](r, r.exports, x), r.exports
    }
    x.n = t => {
            var e = t && t.__esModule ? () => t.default : () => t;
            return x.d(e, {
                a: e
            }), e
        }, x.d = (t, e) => {
            for (var r in e) x.o(e, r) && !x.o(t, r) && Object.defineProperty(t, r, {
                enumerable: !0,
                get: e[r]
            })
        }, x.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), e = x(892), r = x.n(e), n = x(760), i = x.n(n), s = x(311), a = x.n(s), o = x(192), h = x.n(o), d = x(60), c = x.n(d), f = x(865), l = x.n(f), u = x(627), (m = {}).styleTagTransform = l(), m.setAttributes = h(), m.insert = a().bind(null, "head"), m.domAPI = i(), m.insertStyleElement = c(), r()(u.Z, m), u.Z && u.Z.locals && u.Z.locals, t = new class {
            constructor(t, ...e) {
                this.numberOfSides = t, this.__init__(...e)
            }
            __init__(t, e) {
                this.maxW = t, this.maxH = e, this._createElem(), this._createSurface(), this._appendChildIntoParent();
                for (let t = 0; t < this.numberOfSides; t++) {
                    const e = this.sides[t].style.transform;
                    this.sides[t].style.transformOrigin = t % 2 == 0 ? "right" : "left", this.sides[t].style.transform = `${e} rotateY(${this.insDegree}deg)`
                }
                this.parent.prepend(this.surface), console.log(this)
            }
            _setSize(t, e, r) {
                t.style.width = `${e||(e=this.maxW)}px`, t.style.height = `${r||(r=this.maxH)}px`
            }
            _appendChildIntoParent() {
                let t = !0;
                for (let e = 0, r = 1; r < this.numberOfSides; e++, r++) t && (this.sides[e].style.cssText += `\n                    transform: translate3d(-${50+this.movCentX}%, ${this.maxH>this.maxW?100*(-this.maxH/2-this.movCentY/(this.maxH/this.maxW)+this.maxW)/this.maxH:-this.movCentY}%, -${this.maxH/2}px) rotateX(90deg);\n                    top: ${this.maxH>this.maxW?0:50}%;\n                    left: 50%;\n                `, this.parent.append(this.sides[e]), t = !1), this.sides[e].append(this.sides[r])
            }
            _findSpecialCoord(t, e) {
                return Math[t](...this.dataOfCoord.points.map((t => t[e])))
            }
            _createElem() {
                this.insDegree = 180 * (this.numberOfSides - 2) / this.numberOfSides, this.centDegree = 360 / this.numberOfSides, this.w = this.maxW * (this.insDegree > 90 ? Math.sin(this.centDegree / 2 * (Math.PI / 180)) : 1), this.r = this.w / (2 * Math.tan(this.centDegree / 2 * (Math.PI / 180))), this.R = this.w / (2 * Math.sin(this.centDegree / 2 * (Math.PI / 180))), this.diameter = 2 * this.R;
                let t = document.createElement("div");
                t.className = "baseSide", this.parent = t, this._setSize(this.parent, null, this.maxW), this.sides = [];
                for (let t = 0; t < this.numberOfSides; t++) {
                    let t = document.createElement("div");
                    t.className = "sideShape", this.sides.push(t), this._setSize(t, this.w)
                }
            }
            _setPoints() {
                let t = 0;
                this.dataOfCoord.points = [];
                for (let e = 0; e < this.numberOfSides; e++) this.dataOfCoord.points.push({
                    x: this.R * Math.cos((t + this.insDegree / 2) * (Math.PI / 180)),
                    y: this.R * Math.sin((t + this.insDegree / 2) * (Math.PI / 180))
                }), t += this.centDegree;
                this.dataOfCoord.minX = this._findSpecialCoord("min", "x"), this.dataOfCoord.minY = this._findSpecialCoord("min", "y"), this.dataOfCoord.maxX = this._findSpecialCoord("max", "x"), this.dataOfCoord.maxY = this._findSpecialCoord("max", "y"), this.diagonal = Math.abs(this.dataOfCoord.minX) + this.dataOfCoord.maxX, this.movCentY = Math.abs(100 * (this.maxW - (Math.abs(this.dataOfCoord.minY) + this.dataOfCoord.maxY)) / this.maxW) / 2, this.movCentX = Math.round(this.w) != Math.round(this.diagonal) ? 100 * (this.diameter - this.diagonal) / this.maxW : 0
            }
            _setStrCoord() {
                this.dataOfCoord.coordForShape = "", this.dataOfCoord.points.forEach(((t, e) => this.dataOfCoord.coordForShape += `${t.x} ${t.y}` + (this.numberOfSides - 1 > e ? "," : "")))
            }
            _createSurface() {
                this.dataOfCoord = {}, this._setPoints(), this._setStrCoord();
                let t = document.createElement("polygon");
                this.surface = document.createElement("svg"), this.surface.className = "surface", t.className = "polygon", this.surface.setAttribute("viewBox", `${this.dataOfCoord.minX} ${this.dataOfCoord.minY} ${this.maxW} ${this.maxW}`), this.surface.style.position = "absolute", this._setSize(this.surface, null, this.maxW), t.style.transform = `translate3d(0%, ${this.movCentY}%, 0)`, t.setAttribute("points", this.dataOfCoord.coordForShape), this.surface.append(t)
            }
        }(100, 100, 100),
        function () {
            let e = document.createElement("div");
            var r, n;
            e.id = "platform", n = 1 * t.maxW, (r = e).style.width = `${n}px`, r.style.height = `${n}px`,
                function (e) {
                    for (let r = 0; r < 1; r++) e.innerHTML += t.parent.outerHTML;
                    document.body.append(e)
                }(e)
        }()
})();
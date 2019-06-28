/*
 Original Plugin by Osvaldas Valutis, www.osvaldas.info
 http://osvaldas.info/drop-down-navigation-responsive-and-touch-friendly
 Available for use under the MIT License
 */
/**
 * jquery-doubleTapToGo plugin
 * Copyright 2017 DACHCOM.DIGITAL AG
 * @author Marco Rieser
 * @author Volker Andres
 * @author Stefan Hagspiel
 * @version 3.0.1
 * @see https://github.com/dachcom-digital/jquery-doubletaptogo
 */
(function($, window, document, undefined) {
  'use strict';
  var pluginName = 'doubleTapToGo',
    defaults = {
      automatic: true,
      selectorClass: 'doubletap',
      selectorChain: 'li:has(ul)'
    };

  function DoubleTapToGo(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init()
  }
  $.extend(DoubleTapToGo.prototype, {
    preventClick: false,
    currentTap: $(),
    init: function() {
      $(this.element).on('touchstart', '.' + this.settings.selectorClass, this._tap.bind(this)).on('click', '.' + this.settings.selectorClass, this._click.bind(this)).on('remove', this._destroy.bind(this));
      this._addSelectors()
    },
    _addSelectors: function() {
      if (this.settings.automatic !== true) {
        return
      }
      $(this.element).find(this.settings.selectorChain).addClass(this.settings.selectorClass)
    },
    _click: function(event) {
      if (this.preventClick) {
        event.preventDefault()
      } else {
        this.currentTap = $()
      }
    },
    _tap: function(event) {
      var $target = $(event.target).closest('li');
      if (!$target.hasClass(this.settings.selectorClass)) {
        this.preventClick = false;
        return
      }
      if ($target.get(0) === this.currentTap.get(0)) {
        this.preventClick = false;
        return
      }
      this.preventClick = true;
      this.currentTap = $target;
      event.stopPropagation()
    },
    _destroy: function() {
      $(this.element).off()
    },
    reset: function() {
      this.currentTap = $()
    }
  });
  $.fn[pluginName] = function(options) {
    var args = arguments,
      returns;
    if (options === undefined || typeof options === 'object') {
      return this.each(function() {
        if (!$.data(this, pluginName)) {
          $.data(this, pluginName, new DoubleTapToGo(this, options))
        }
      })
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      this.each(function() {
        var instance = $.data(this, pluginName),
          methodName = (options === 'destroy' ? '_destroy' : options);
        if (instance instanceof DoubleTapToGo && typeof instance[methodName] === 'function') {
          returns = instance[methodName].apply(instance, Array.prototype.slice.call(args, 1))
        }
        if (options === 'destroy') {
          $.data(this, pluginName, null)
        }
      });
      return returns !== undefined ? returns : this
    }
  }
})(jQuery, window, document);

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;
window.Modernizr = function(a, b, c) {
    function D(a) {
      j.cssText = a
    }

    function E(a, b) {
      return D(n.join(a + ";") + (b || ""))
    }

    function F(a, b) {
      return typeof a === b
    }

    function G(a, b) {
      return !!~("" + a).indexOf(b)
    }

    function H(a, b) {
      for (var d in a) {
        var e = a[d];
        if (!G(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
      }
      return !1
    }

    function I(a, b, d) {
      for (var e in a) {
        var f = b[a[e]];
        if (f !== c) return d === !1 ? a[e] : F(f, "function") ? f.bind(d || b) : f
      }
      return !1
    }

    function J(a, b, c) {
      var d = a.charAt(0).toUpperCase() + a.slice(1),
        e = (a + " " + p.join(d + " ") + d).split(" ");
      return F(b, "string") || F(b, "undefined") ? H(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), I(e, b, c))
    }

    function K() {
      e.input = function(c) {
        for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k;
        return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), u
      }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
        for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), t[a[d]] = !!e;
        return t
      }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var d = "2.6.2",
      e = {},
      f = !0,
      g = b.documentElement,
      h = "modernizr",
      i = b.createElement(h),
      j = i.style,
      k = b.createElement("input"),
      l = ":)",
      m = {}.toString,
      n = " -webkit- -moz- -o- -ms- ".split(" "),
      o = "Webkit Moz O ms",
      p = o.split(" "),
      q = o.toLowerCase().split(" "),
      r = {
        svg: "http://www.w3.org/2000/svg"
      },
      s = {},
      t = {},
      u = {},
      v = [],
      w = v.slice,
      x, y = function(a, c, d, e) {
        var f, i, j, k, l = b.createElement("div"),
          m = b.body,
          n = m || b.createElement("body");
        if (parseInt(d, 10))
          while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
        return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
      },
      z = function(b) {
        var c = a.matchMedia || a.msMatchMedia;
        if (c) return c(b).matches;
        var d;
        return y("@media " + b + " { #" + h + " { position: absolute; } }", function(b) {
          d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute"
        }), d
      },
      A = function() {
        function d(d, e) {
          e = e || b.createElement(a[d] || "div"), d = "on" + d;
          var f = d in e;
          return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = F(e[d], "function"), F(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f
        }
        var a = {
          select: "input",
          change: "input",
          submit: "form",
          reset: "form",
          error: "img",
          load: "img",
          abort: "img"
        };
        return d
      }(),
      B = {}.hasOwnProperty,
      C;
    !F(B, "undefined") && !F(B.call, "undefined") ? C = function(a, b) {
      return B.call(a, b)
    } : C = function(a, b) {
      return b in a && F(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
      var c = this;
      if (typeof c != "function") throw new TypeError;
      var d = w.call(arguments, 1),
        e = function() {
          if (this instanceof e) {
            var a = function() {};
            a.prototype = c.prototype;
            var f = new a,
              g = c.apply(f, d.concat(w.call(arguments)));
            return Object(g) === g ? g : f
          }
          return c.apply(b, d.concat(w.call(arguments)))
        };
      return e
    }), s.flexbox = function() {
      return J("flexWrap")
    }, s.canvas = function() {
      var a = b.createElement("canvas");
      return !!a.getContext && !!a.getContext("2d")
    }, s.canvastext = function() {
      return !!e.canvas && !!F(b.createElement("canvas").getContext("2d").fillText, "function")
    }, s.webgl = function() {
      return !!a.WebGLRenderingContext
    }, s.touch = function() {
      var c;
      return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
        c = a.offsetTop === 9
      }), c
    }, s.geolocation = function() {
      return "geolocation" in navigator
    }, s.postmessage = function() {
      return !!a.postMessage
    }, s.websqldatabase = function() {
      return !!a.openDatabase
    }, s.indexedDB = function() {
      return !!J("indexedDB", a)
    }, s.hashchange = function() {
      return A("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
    }, s.history = function() {
      return !!a.history && !!history.pushState
    }, s.draganddrop = function() {
      var a = b.createElement("div");
      return "draggable" in a || "ondragstart" in a && "ondrop" in a
    }, s.websockets = function() {
      return "WebSocket" in a || "MozWebSocket" in a
    }, s.rgba = function() {
      return D("background-color:rgba(150,255,150,.5)"), G(j.backgroundColor, "rgba")
    }, s.hsla = function() {
      return D("background-color:hsla(120,40%,100%,.5)"), G(j.backgroundColor, "rgba") || G(j.backgroundColor, "hsla")
    }, s.multiplebgs = function() {
      return D("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background)
    }, s.backgroundsize = function() {
      return J("backgroundSize")
    }, s.borderimage = function() {
      return J("borderImage")
    }, s.borderradius = function() {
      return J("borderRadius")
    }, s.boxshadow = function() {
      return J("boxShadow")
    }, s.textshadow = function() {
      return b.createElement("div").style.textShadow === ""
    }, s.opacity = function() {
      return E("opacity:.55"), /^0.55$/.test(j.opacity)
    }, s.cssanimations = function() {
      return J("animationName")
    }, s.csscolumns = function() {
      return J("columnCount")
    }, s.cssgradients = function() {
      var a = "background-image:",
        b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
        c = "linear-gradient(left top,#9f9, white);";
      return D((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), G(j.backgroundImage, "gradient")
    }, s.cssreflections = function() {
      return J("boxReflect")
    }, s.csstransforms = function() {
      return !!J("transform")
    }, s.csstransforms3d = function() {
      var a = !!J("perspective");
      return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
        a = b.offsetLeft === 9 && b.offsetHeight === 3
      }), a
    }, s.csstransitions = function() {
      return J("transition")
    }, s.fontface = function() {
      var a;
      return y('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
        var e = b.getElementById("smodernizr"),
          f = e.sheet || e.styleSheet,
          g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
        a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0
      }), a
    }, s.generatedcontent = function() {
      var a;
      return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
        a = b.offsetHeight >= 3
      }), a
    }, s.video = function() {
      var a = b.createElement("video"),
        c = !1;
      try {
        if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
      } catch (d) {}
      return c
    }, s.audio = function() {
      var a = b.createElement("audio"),
        c = !1;
      try {
        if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "")
      } catch (d) {}
      return c
    }, s.localstorage = function() {
      try {
        return localStorage.setItem(h, h), localStorage.removeItem(h), !0
      } catch (a) {
        return !1
      }
    }, s.sessionstorage = function() {
      try {
        return sessionStorage.setItem(h, h), sessionStorage.removeItem(h), !0
      } catch (a) {
        return !1
      }
    }, s.webworkers = function() {
      return !!a.Worker
    }, s.applicationcache = function() {
      return !!a.applicationCache
    }, s.svg = function() {
      return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect
    }, s.inlinesvg = function() {
      var a = b.createElement("div");
      return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg
    }, s.smil = function() {
      return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")))
    }, s.svgclippaths = function() {
      return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")))
    };
    for (var L in s) C(s, L) && (x = L.toLowerCase(), e[x] = s[L](), v.push((e[x] ? "" : "no-") + x));
    return e.input || K(), e.addTest = function(a, b) {
        if (typeof a == "object")
          for (var d in a) C(a, d) && e.addTest(d, a[d]);
        else {
          a = a.toLowerCase();
          if (e[a] !== c) return e;
          b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
      }, D(""), i = k = null,
      function(a, b) {
        function k(a, b) {
          var c = a.createElement("p"),
            d = a.getElementsByTagName("head")[0] || a.documentElement;
          return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function l() {
          var a = r.elements;
          return typeof a == "string" ? a.split(" ") : a
        }

        function m(a) {
          var b = i[a[g]];
          return b || (b = {}, h++, a[g] = h, i[h] = b), b
        }

        function n(a, c, f) {
          c || (c = b);
          if (j) return c.createElement(a);
          f || (f = m(c));
          var g;
          return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
        }

        function o(a, c) {
          a || (a = b);
          if (j) return a.createDocumentFragment();
          c = c || m(a);
          var d = c.frag.cloneNode(),
            e = 0,
            f = l(),
            g = f.length;
          for (; e < g; e++) d.createElement(f[e]);
          return d
        }

        function p(a, b) {
          b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
            return r.shivMethods ? n(c, a, b) : b.createElem(c)
          }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function(a) {
            return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
          }) + ");return n}")(r, b.frag)
        }

        function q(a) {
          a || (a = b);
          var c = m(a);
          return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a
        }
        var c = a.html5 || {},
          d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
          e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
          f, g = "_html5shiv",
          h = 0,
          i = {},
          j;
        (function() {
          try {
            var a = b.createElement("a");
            a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = a.childNodes.length == 1 || function() {
              b.createElement("a");
              var a = b.createDocumentFragment();
              return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
            }()
          } catch (c) {
            f = !0, j = !0
          }
        })();
        var r = {
          elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
          shivCSS: c.shivCSS !== !1,
          supportsUnknownElements: j,
          shivMethods: c.shivMethods !== !1,
          type: "default",
          shivDocument: q,
          createElement: n,
          createDocumentFragment: o
        };
        a.html5 = r, q(b)
      }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.mq = z, e.hasEvent = A, e.testProp = function(a) {
        return H([a])
      }, e.testAllProps = J, e.testStyles = y, e.prefixed = function(a, b, c) {
        return b ? J(a, b, c) : J(a, "pfx")
      }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e
  }(this, this.document),
  function(a, b, c) {
    function d(a) {
      return "[object Function]" == o.call(a)
    }

    function e(a) {
      return "string" == typeof a
    }

    function f() {}

    function g(a) {
      return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
      var a = p.shift();
      q = 1, a ? a.t ? m(function() {
        ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
      }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
      function k(b) {
        if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
          "img" != a && m(function() {
            t.removeChild(l)
          }, 50);
          for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
        }
      }
      var j = j || B.errorTimeout,
        l = b.createElement(a),
        o = 0,
        r = 0,
        u = {
          t: d,
          s: c,
          e: f,
          a: i,
          x: j
        };
      1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
        k.call(this, r)
      }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
      return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
      var a = B;
      return a.loader = {
        load: j,
        i: 0
      }, a
    }
    var l = b.documentElement,
      m = a.setTimeout,
      n = b.getElementsByTagName("script")[0],
      o = {}.toString,
      p = [],
      q = 0,
      r = "MozAppearance" in l.style,
      s = r && !!b.createRange().compareNode,
      t = s ? l : n.parentNode,
      l = a.opera && "[object Opera]" == o.call(a.opera),
      l = !!b.attachEvent && !l,
      u = r ? "object" : l ? "script" : "img",
      v = l ? "script" : u,
      w = Array.isArray || function(a) {
        return "[object Array]" == o.call(a)
      },
      x = [],
      y = {},
      z = {
        timeout: function(a, b) {
          return b.length && (a.timeout = b[0]), a
        }
      },
      A, B;
    B = function(a) {
      function b(a) {
        var a = a.split("!"),
          b = x.length,
          c = a.pop(),
          d = a.length,
          c = {
            url: c,
            origUrl: c,
            prefixes: a
          },
          e, f, g;
        for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
        for (f = 0; f < b; f++) c = x[f](c);
        return c
      }

      function g(a, e, f, g, h) {
        var i = b(a),
          j = i.autoCallback;
        i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
          k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
        })))
      }

      function h(a, b) {
        function c(a, c) {
          if (a) {
            if (e(a)) c || (j = function() {
              var a = [].slice.call(arguments);
              k.apply(this, a), l()
            }), g(a, j, b, 0, h);
            else if (Object(a) === a)
              for (n in m = function() {
                  var b = 0,
                    c;
                  for (c in a) a.hasOwnProperty(c) && b++;
                  return b
                }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                var a = [].slice.call(arguments);
                k.apply(this, a), l()
              } : j[n] = function(a) {
                return function() {
                  var b = [].slice.call(arguments);
                  a && a.apply(this, b), l()
                }
              }(k[n])), g(a[n], j, b, n, h))
          } else !c && l()
        }
        var h = !!a.test,
          i = a.load || a.both,
          j = a.callback || f,
          k = j,
          l = a.complete || f,
          m, n;
        c(h ? a.yep : a.nope, !!i), i && c(i)
      }
      var i, j, l = this.yepnope.loader;
      if (e(a)) g(a, 0, l, 0);
      else if (w(a))
        for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
      else Object(a) === a && h(a, l)
    }, B.addPrefix = function(a, b) {
      z[a] = b
    }, B.addFilter = function(a) {
      x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
      b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
      var k = b.createElement("script"),
        l, o, e = e || B.errorTimeout;
      k.src = a;
      for (o in d) k.setAttribute(o, d[o]);
      c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
        !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
      }, m(function() {
        l || (l = 1, c(1))
      }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
      var e = b.createElement("link"),
        j, c = i ? h : c || f;
      e.href = a, e.rel = "stylesheet", e.type = "text/css";
      for (j in d) e.setAttribute(j, d[j]);
      g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
  }(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
  };


/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
(function($) {
  $.fn.appear = function(fn, options) {
    var settings = $.extend({
      data: undefined,
      one: true,
      accX: 0,
      accY: 0
    }, options);
    return this.each(function() {
      var t = $(this);
      t.appeared = false;
      if (!fn) {
        t.trigger('appear', settings.data);
        return
      }
      var w = $(window);
      var check = function() {
        if (!t.is(':visible')) {
          t.appeared = false;
          return
        }
        var a = w.scrollLeft();
        var b = w.scrollTop();
        var o = t.offset();
        var x = o.left;
        var y = o.top;
        var ax = settings.accX;
        var ay = settings.accY;
        var th = t.height();
        var wh = w.height();
        var tw = t.width();
        var ww = w.width();
        if (y + th + ay >= b && y <= b + wh + ay && x + tw + ax >= a && x <= a + ww + ax) {
          if (!t.appeared) t.trigger('appear', settings.data)
        } else {
          t.appeared = false
        }
      };
      var modifiedFn = function() {
        t.appeared = true;
        if (settings.one) {
          w.unbind('scroll', check);
          var i = $.inArray(check, $.fn.appear.checks);
          if (i >= 0) $.fn.appear.checks.splice(i, 1)
        }
        fn.apply(this, arguments)
      };
      if (settings.one) t.one('appear', settings.data, modifiedFn);
      else t.bind('appear', settings.data, modifiedFn);
      w.scroll(check);
      $.fn.appear.checks.push(check);
      (check)()
    })
  };
  $.extend($.fn.appear, {
    checks: [],
    timeout: null,
    checkAll: function() {
      var length = $.fn.appear.checks.length;
      if (length > 0)
        while (length--)($.fn.appear.checks[length])()
    },
    run: function() {
      if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
      $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20)
    }
  });
  $.each(['append', 'prepend', 'after', 'before', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'remove', 'css', 'show', 'hide'], function(i, n) {
    var old = $.fn[n];
    if (old) {
      $.fn[n] = function() {
        var r = old.apply(this, arguments);
        $.fn.appear.run();
        return r
      }
    }
  })
})(jQuery);

/**
 * hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 *
 * @param  f  onMouseOver function || An object with configuration options
 * @param  g  onMouseOut function  || Nothing (use configuration options object)
 * @author    Brian Cherne brian(at)cherne(dot)net
 */
(function($) {
  $.fn.hoverIntent = function(f, g) {
    var cfg = {
      sensitivity: 7,
      interval: 100,
      timeout: 0
    };
    cfg = $.extend(cfg, g ? {
      over: f,
      out: g
    } : f);
    var cX, cY, pX, pY;
    var track = function(ev) {
      cX = ev.pageX;
      cY = ev.pageY
    };
    var compare = function(ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
        $(ob).unbind("mousemove", track);
        ob.hoverIntent_s = 1;
        return cfg.over.apply(ob, [ev])
      } else {
        pX = cX;
        pY = cY;
        ob.hoverIntent_t = setTimeout(function() {
          compare(ev, ob)
        }, cfg.interval)
      }
    };
    var delay = function(ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      ob.hoverIntent_s = 0;
      return cfg.out.apply(ob, [ev])
    };
    var handleHover = function(e) {
      var ev = jQuery.extend({}, e);
      var ob = this;
      if (ob.hoverIntent_t) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
      }
      if (e.type == "mouseenter") {
        pX = ev.pageX;
        pY = ev.pageY;
        $(ob).bind("mousemove", track);
        if (ob.hoverIntent_s != 1) {
          ob.hoverIntent_t = setTimeout(function() {
            compare(ev, ob)
          }, cfg.interval)
        }
      } else {
        $(ob).unbind("mousemove", track);
        if (ob.hoverIntent_s == 1) {
          ob.hoverIntent_t = setTimeout(function() {
            delay(ev, ob)
          }, cfg.timeout)
        }
      }
    };
    return this.bind('mouseenter', handleHover).bind('mouseleave', handleHover)
  }
})(jQuery);

/* Counter */
(function(a) {
  "use strict";
  a.fn.absoluteCounter = function(b) {
    b = a.extend({}, a.fn.absoluteCounter.defaults, b || {});
    return a(this).each(function() {
      var d = this,
        g = b.speed,
        f = b.setStyles,
        e = b.delayedStart,
        c = b.fadeInDelay;
      if (f) {
        a(d).css({
          display: "block",
          position: "relative",
          overflow: "hidden"
        }).addClass('animated')
      }
      a(d).css("opacity", "0");
      a(d).animate({
        opacity: 0
      }, e, function() {
        var l = a(d).text();
        a(d).text("");
        for (var k = 0; k < l.length; k++) {
          var n = l.charAt(k);
          var m = "";
          if (parseInt(n, 10) >= 0) {
            m = '<span class="onedigit p' + (l.length - k) + " d" + n + '">';
            for (var h = 0; h <= parseInt(n, 10); h++) {
              m += '<span class="n' + (h % 10) + '">' + (h % 10) + "</span>"
            }
            m += "</span>"
          } else {
            m = '<span class="onedigit p' + (l.length - k) + ' char"><span class="c">' + n + "</span></span>"
          }
          a(d).append(m)
        }
        a(d).animate({
          opacity: 1
        }, c);
        a("span.onedigit", d).each(function(i, o) {
          if (f) {
            a(o).css({
              "float": "left",
              position: "relative"
            });
            a("span", a(o)).css({
              display: "block"
            })
          }
          var p = a("span", a(o)).length,
            j = a(d).height();
          a(o).css({
            height: (p * j) + "px",
            top: "0"
          });
          a("span", a(o)).css({
            height: j + "px"
          });
          a(o).animate({
            top: -1 * ((p - 1) * j) + "px"
          }, g, function() {
            if (typeof(b.onComplete) === "function") {
              b.onComplete.call(d)
            }
          })
        })
      })
    })
  };
  a.fn.absoluteCounter.defaults = {
    speed: 2000,
    setStyles: true,
    onComplete: null,
    delayedStart: 0,
    fadeInDelay: 0
  }
}(jQuery));

// Generated by CoffeeScript 1.4.0
/*
Easy pie chart is a jquery plugin to display simple animated pie charts for only one value
Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
Built on top of the jQuery library (http://jquery.com)
@source: http://github.com/rendro/easy-pie-chart/
@autor: Robert Fleischmann
@version: 1.0.1
Inspired by: http://dribbble.com/shots/631074-Simple-Pie-Charts-II?list=popular&offset=210
Thanks to Philip Thrasher for the jquery plugin boilerplate for coffee script
*/
(function() {
  (function($) {
    $.easyPieChart = function(el, options) {
      var addScaleLine, animateLine, drawLine, easeInOutQuad, renderBackground, renderScale, renderTrack, _this = this;
      this.el = el;
      this.$el = $(el);
      this.$el.data("easyPieChart", this);
      this.init = function() {
        var percent;
        _this.options = $.extend({}, $.easyPieChart.defaultOptions, options);
        percent = parseInt(_this.$el.data('percent'), 10);
        _this.percentage = 0;
        _this.canvas = $("<canvas width='" + _this.options.size + "' height='" + _this.options.size + "'></canvas>").get(0);
        _this.$el.append(_this.canvas);
        if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
          G_vmlCanvasManager.initElement(_this.canvas)
        }
        _this.ctx = _this.canvas.getContext('2d');
        if (window.devicePixelRatio > 1.5) {
          $(_this.canvas).css({
            width: _this.options.size,
            height: _this.options.size
          });
          _this.canvas.width *= 2;
          _this.canvas.height *= 2;
          _this.ctx.scale(2, 2)
        }
        _this.ctx.translate(_this.options.size / 2, _this.options.size / 2);
        _this.$el.addClass('easyPieChart');
        _this.$el.css({
          width: _this.options.size,
          height: _this.options.size,
          lineHeight: "" + _this.options.size + "px"
        });
        _this.update(percent);
        return _this
      };
      this.update = function(percent) {
        if (_this.options.animate === false) {
          return drawLine(percent)
        } else {
          return animateLine(_this.percentage, percent)
        }
      };
      renderScale = function() {
        var i, _i, _results;
        _this.ctx.fillStyle = _this.options.scaleColor;
        _this.ctx.lineWidth = 1;
        _results = [];
        for (i = _i = 0; _i <= 24; i = ++_i) {
          _results.push(addScaleLine(i))
        }
        return _results
      };
      addScaleLine = function(i) {
        var offset;
        offset = i % 6 === 0 ? 0 : _this.options.size * 0.017;
        _this.ctx.save();
        _this.ctx.rotate(i * Math.PI / 12);
        _this.ctx.fillRect(_this.options.size / 2 - offset, 0, -_this.options.size * 0.05 + offset, 1);
        return _this.ctx.restore()
      };
      renderTrack = function() {
        var offset;
        offset = _this.options.size / 2 - _this.options.lineWidth / 2;
        if (_this.options.scaleColor !== false) {
          offset -= _this.options.size * 0.08
        }
        _this.ctx.beginPath();
        _this.ctx.arc(0, 0, offset, 0, Math.PI * 2, true);
        _this.ctx.closePath();
        _this.ctx.strokeStyle = _this.options.trackColor;
        _this.ctx.lineWidth = _this.options.lineWidth;
        return _this.ctx.stroke()
      };
      renderBackground = function() {
        if (_this.options.scaleColor !== false) {
          renderScale()
        }
        if (_this.options.trackColor !== false) {
          return renderTrack()
        }
      };
      drawLine = function(percent) {
        var offset;
        renderBackground();
        _this.ctx.strokeStyle = $.isFunction(_this.options.barColor) ? _this.options.barColor(percent) : _this.options.barColor;
        _this.ctx.lineCap = _this.options.lineCap;
        _this.ctx.lineWidth = _this.options.lineWidth;
        offset = _this.options.size / 2 - _this.options.lineWidth / 2;
        if (_this.options.scaleColor !== false) {
          offset -= _this.options.size * 0.08
        }
        _this.ctx.save();
        _this.ctx.rotate(-Math.PI / 2);
        _this.ctx.beginPath();
        _this.ctx.arc(0, 0, offset, 0, Math.PI * 2 * percent / 100, false);
        _this.ctx.stroke();
        return _this.ctx.restore()
      };
      animateLine = function(from, to) {
        var currentStep, fps, steps;
        fps = 30;
        steps = fps * _this.options.animate / 1000;
        currentStep = 0;
        _this.options.onStart.call(_this);
        _this.percentage = to;
        if (_this.animation) {
          clearInterval(_this.animation);
          _this.animation = false
        }
        return _this.animation = setInterval(function() {
          _this.ctx.clearRect(-_this.options.size / 2, -_this.options.size / 2, _this.options.size, _this.options.size);
          renderBackground.call(_this);
          drawLine.call(_this, [easeInOutQuad(currentStep, from, to - from, steps)]);
          currentStep++;
          if ((currentStep / steps) > 1) {
            clearInterval(_this.animation);
            _this.animation = false;
            return _this.options.onStop.call(_this)
          }
        }, 1000 / fps)
      };
      easeInOutQuad = function(t, b, c, d) {
        var easeIn, easing;
        easeIn = function(t) {
          return Math.pow(t, 2)
        };
        easing = function(t) {
          if (t < 1) {
            return easeIn(t)
          } else {
            return 2 - easeIn((t / 2) * -2 + 2)
          }
        };
        t /= d / 2;
        return c / 2 * easing(t) + b
      };
      return this.init()
    };
    $.easyPieChart.defaultOptions = {
      barColor: '#ef1e25',
      trackColor: '#f2f2f2',
      scaleColor: '#dfe0e0',
      lineCap: 'round',
      size: 110,
      lineWidth: 3,
      animate: false,
      onStart: $.noop,
      onStop: $.noop
    };
    $.fn.easyPieChart = function(options) {
      return $.each(this, function(i, el) {
        var $el;
        $el = $(el);
        if (!$el.data('easyPieChart')) {
          return $el.data('easyPieChart', new $.easyPieChart(el, options))
        }
      })
    };
    return void 0
  })(jQuery)
}).call(this);

/*
 * MIXITUP - A CSS3 and JQuery Filter & Sort Plugin
 * Version: 1.5.4
 * License: Creative Commons Attribution-NoDerivs 3.0 Unported - CC BY-ND 3.0
 * http://creativecommons.org/licenses/by-nd/3.0/
 * This software may be used freely on commercial and non-commercial projects with attribution to the author/copyright holder.
 * Author: Patrick Kunka
 * Copyright 2012-2013 Patrick Kunka, Barrel LLC, All Rights Reserved
 *
 * http://mixitup.io
 */

(function(e) {
  function q(c, b, g, d, a) {
    function k() {
      l.unbind("webkitTransitionEnd transitionend otransitionend oTransitionEnd");
      b && w(b, g, d, a);
      a.startOrder = [];
      a.newOrder = [];
      a.origSort = [];
      a.checkSort = [];
      r.removeStyle(a.prefix + "filter, filter, " + a.prefix + "transform, transform, opacity, display").css(a.clean).removeAttr("data-checksum");
      window.atob || r.css({
        display: "none",
        opacity: "0"
      });
      l.removeStyle(a.prefix + "transition, transition, " + a.prefix + "perspective, perspective, " + a.prefix + "perspective-origin, perspective-origin, " +
        (a.resizeContainer ? "height" : ""));
      "list" == a.layoutMode ? (n.css({
        display: a.targetDisplayList,
        opacity: "1"
      }), a.origDisplay = a.targetDisplayList) : (n.css({
        display: a.targetDisplayGrid,
        opacity: "1"
      }), a.origDisplay = a.targetDisplayGrid);
      a.origLayout = a.layoutMode;
      setTimeout(function() {
        r.removeStyle(a.prefix + "transition, transition");
        a.mixing = !1;
        if ("function" == typeof a.onMixEnd) {
          var b = a.onMixEnd.call(this, a);
          a = b ? b : a
        }
      })
    }
    clearInterval(a.failsafe);
    a.mixing = !0;
    a.filter = c;
    if ("function" == typeof a.onMixStart) {
      var f = a.onMixStart.call(this,
        a);
      a = f ? f : a
    }
    for (var h = a.transitionSpeed, f = 0; 2 > f; f++) {
      var j = 0 == f ? j = a.prefix : "";
      a.transition[j + "transition"] = "all " + h + "ms linear";
      a.transition[j + "transform"] = j + "translate3d(0,0,0)";
      a.perspective[j + "perspective"] = a.perspectiveDistance + "px";
      a.perspective[j + "perspective-origin"] = a.perspectiveOrigin
    }
    var s = a.targetSelector,
      r = d.find(s);
    r.each(function() {
      this.data = {}
    });
    var l = r.parent();
    l.css(a.perspective);
    a.easingFallback = "ease-in-out";
    "smooth" == a.easing && (a.easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)");
    "snap" == a.easing && (a.easing = "cubic-bezier(0.77, 0, 0.175, 1)");
    "windback" == a.easing && (a.easing = "cubic-bezier(0.175, 0.885, 0.320, 1.275)", a.easingFallback = "cubic-bezier(0.175, 0.885, 0.320, 1)");
    "windup" == a.easing && (a.easing = "cubic-bezier(0.6, -0.28, 0.735, 0.045)", a.easingFallback = "cubic-bezier(0.6, 0.28, 0.735, 0.045)");
    f = "list" == a.layoutMode && null != a.listEffects ? a.listEffects : a.effects;
    Array.prototype.indexOf && (a.fade = -1 < f.indexOf("fade") ? "0" : "", a.scale = -1 < f.indexOf("scale") ? "scale(.01)" : "", a.rotateZ = -1 < f.indexOf("rotateZ") ? "rotate(180deg)" : "", a.rotateY = -1 < f.indexOf("rotateY") ? "rotateY(90deg)" : "", a.rotateX = -1 < f.indexOf("rotateX") ? "rotateX(90deg)" : "", a.blur = -1 < f.indexOf("blur") ? "blur(8px)" : "", a.grayscale = -1 < f.indexOf("grayscale") ? "grayscale(100%)" : "");
    var n = e(),
      t = e(),
      u = [],
      q = !1;
    "string" === typeof c ? u = y(c) : (q = !0, e.each(c, function(a) {
      u[a] = y(this)
    }));
    "or" == a.filterLogic ? ("" == u[0] && u.shift(), 1 > u.length ? t = t.add(d.find(s + ":visible")) : r.each(function() {
      var a = e(this);
      if (q) {
        var b = 0;
        e.each(u, function() {
          this.length ?
            a.is("." + this.join(", .")) && b++ : 0 < b && b++
        });
        b == u.length ? n = n.add(a) : t = t.add(a)
      } else a.is("." + u.join(", .")) ? n = n.add(a) : t = t.add(a)
    })) : (n = n.add(l.find(s + "." + u.join("."))), t = t.add(l.find(s + ":not(." + u.join(".") + "):visible")));
    c = n.length;
    var v = e(),
      p = e(),
      m = e();
    t.each(function() {
      var a = e(this);
      "none" != a.css("display") && (v = v.add(a), m = m.add(a))
    });
    if (n.filter(":visible").length == c && !v.length && !b) {
      if (a.origLayout == a.layoutMode) return k(), !1;
      if (1 == n.length) return "list" == a.layoutMode ? (d.addClass(a.listClass), d.removeClass(a.gridClass),
        m.css("display", a.targetDisplayList)) : (d.addClass(a.gridClass), d.removeClass(a.listClass), m.css("display", a.targetDisplayGrid)), k(), !1
    }
    a.origHeight = l.height();
    if (n.length) {
      d.removeClass(a.failClass);
      n.each(function() {
        var a = e(this);
        "none" == a.css("display") ? p = p.add(a) : m = m.add(a)
      });
      if (a.origLayout != a.layoutMode && !1 == a.animateGridList) return "list" == a.layoutMode ? (d.addClass(a.listClass), d.removeClass(a.gridClass), m.css("display", a.targetDisplayList)) : (d.addClass(a.gridClass), d.removeClass(a.listClass),
        m.css("display", a.targetDisplayGrid)), k(), !1;
      if (!window.atob) return k(), !1;
      r.css(a.clean);
      m.each(function() {
        this.data.origPos = e(this).offset()
      });
      "list" == a.layoutMode ? (d.addClass(a.listClass), d.removeClass(a.gridClass), p.css("display", a.targetDisplayList)) : (d.addClass(a.gridClass), d.removeClass(a.listClass), p.css("display", a.targetDisplayGrid));
      p.each(function() {
        this.data.showInterPos = e(this).offset()
      });
      v.each(function() {
        this.data.hideInterPos = e(this).offset()
      });
      m.each(function() {
        this.data.preInterPos =
          e(this).offset()
      });
      "list" == a.layoutMode ? m.css("display", a.targetDisplayList) : m.css("display", a.targetDisplayGrid);
      b && w(b, g, d, a);
      if (c = b) a: if (c = a.origSort, f = a.checkSort, c.length != f.length) c = !1;
        else {
          for (j = 0; j < f.length; j++)
            if (c[j].compare && !c[j].compare(f[j]) || c[j] !== f[j]) {
              c = !1;
              break a
            } c = !0
        } if (c) return k(), !1;
      v.hide();
      p.each(function() {
        this.data.finalPos = e(this).offset()
      });
      m.each(function() {
        this.data.finalPrePos = e(this).offset()
      });
      a.newHeight = l.height();
      b && w("reset", null, d, a);
      p.hide();
      m.css("display",
        a.origDisplay);
      "block" == a.origDisplay ? (d.addClass(a.listClass), p.css("display", a.targetDisplayList)) : (d.removeClass(a.listClass), p.css("display", a.targetDisplayGrid));
      a.resizeContainer && l.css("height", a.origHeight + "px");
      c = {};
      for (f = 0; 2 > f; f++) j = 0 == f ? j = a.prefix : "", c[j + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ, c[j + "filter"] = a.blur + " " + a.grayscale;
      p.css(c);
      m.each(function() {
        var b = this.data,
          c = e(this);
        c.hasClass("mix_tohide") ? (b.preTX = b.origPos.left - b.hideInterPos.left, b.preTY = b.origPos.top -
          b.hideInterPos.top) : (b.preTX = b.origPos.left - b.preInterPos.left, b.preTY = b.origPos.top - b.preInterPos.top);
        for (var d = {}, f = 0; 2 > f; f++) {
          var j = 0 == f ? j = a.prefix : "";
          d[j + "transform"] = "translate(" + b.preTX + "px," + b.preTY + "px)"
        }
        c.css(d)
      });
      "list" == a.layoutMode ? (d.addClass(a.listClass), d.removeClass(a.gridClass)) : (d.addClass(a.gridClass), d.removeClass(a.listClass));
      setTimeout(function() {
        if (a.resizeContainer) {
          for (var b = {}, c = 0; 2 > c; c++) {
            var d = 0 == c ? d = a.prefix : "";
            b[d + "transition"] = "all " + h + "ms ease-in-out";
            b.height = a.newHeight +
              "px"
          }
          l.css(b)
        }
        v.css("opacity", a.fade);
        p.css("opacity", 1);
        p.each(function() {
          var b = this.data;
          b.tX = b.finalPos.left - b.showInterPos.left;
          b.tY = b.finalPos.top - b.showInterPos.top;
          for (var c = {}, d = 0; 2 > d; d++) {
            var f = 0 == d ? f = a.prefix : "";
            c[f + "transition-property"] = f + "transform, " + f + "filter, opacity";
            c[f + "transition-timing-function"] = a.easing + ", linear, linear";
            c[f + "transition-duration"] = h + "ms";
            c[f + "transition-delay"] = "0";
            c[f + "transform"] = "translate(" + b.tX + "px," + b.tY + "px)";
            c[f + "filter"] = "none"
          }
          e(this).css("-webkit-transition",
            "all " + h + "ms " + a.easingFallback).css(c)
        });
        m.each(function() {
          var b = this.data;
          b.tX = 0 != b.finalPrePos.left ? b.finalPrePos.left - b.preInterPos.left : 0;
          b.tY = 0 != b.finalPrePos.left ? b.finalPrePos.top - b.preInterPos.top : 0;
          for (var c = {}, d = 0; 2 > d; d++) {
            var f = 0 == d ? f = a.prefix : "";
            c[f + "transition"] = "all " + h + "ms " + a.easing;
            c[f + "transform"] = "translate(" + b.tX + "px," + b.tY + "px)"
          }
          e(this).css("-webkit-transition", "all " + h + "ms " + a.easingFallback).css(c)
        });
        b = {};
        for (c = 0; 2 > c; c++) d = 0 == c ? d = a.prefix : "", b[d + "transition"] = "all " + h + "ms " +
          a.easing + ", " + d + "filter " + h + "ms linear, opacity " + h + "ms linear", b[d + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ, b[d + "filter"] = a.blur + " " + a.grayscale, b.opacity = a.fade;
        v.css(b);
        l.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function(b) {
          if (-1 < b.originalEvent.propertyName.indexOf("transform") || -1 < b.originalEvent.propertyName.indexOf("opacity")) - 1 < s.indexOf(".") ? e(b.target).hasClass(s.replace(".", "")) && k() : e(b.target).is(s) && k()
        })
      }, 10);
      a.failsafe = setTimeout(function() {
        a.mixing &&
          k()
      }, h + 400)
    } else {
      a.resizeContainer && l.css("height", a.origHeight + "px");
      if (!window.atob) return k(), !1;
      v = t;
      setTimeout(function() {
        l.css(a.perspective);
        if (a.resizeContainer) {
          for (var b = {}, c = 0; 2 > c; c++) {
            var e = 0 == c ? e = a.prefix : "";
            b[e + "transition"] = "height " + h + "ms ease-in-out";
            b.height = a.minHeight + "px"
          }
          l.css(b)
        }
        r.css(a.transition);
        if (t.length) {
          b = {};
          for (c = 0; 2 > c; c++) e = 0 == c ? e = a.prefix : "", b[e + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ, b[e + "filter"] = a.blur + " " + a.grayscale, b.opacity = a.fade;
          v.css(b);
          l.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function(b) {
            if (-1 < b.originalEvent.propertyName.indexOf("transform") || -1 < b.originalEvent.propertyName.indexOf("opacity")) d.addClass(a.failClass), k()
          })
        } else a.mixing = !1
      }, 10)
    }
  }

  function w(c, b, g, d) {
    function a(b, a) {
      var d = isNaN(1 * b.attr(c)) ? b.attr(c).toLowerCase() : 1 * b.attr(c),
        e = isNaN(1 * a.attr(c)) ? a.attr(c).toLowerCase() : 1 * a.attr(c);
      return d < e ? -1 : d > e ? 1 : 0
    }

    function k(a) {
      "asc" == b ? f.prepend(a).prepend(" ") : f.append(a).append(" ")
    }
    g.find(d.targetSelector).wrapAll('<div class="mix_sorter"/>');
    var f = g.find(".mix_sorter");
    d.origSort.length || f.find(d.targetSelector + ":visible").each(function() {
      e(this).wrap("<s/>");
      d.origSort.push(e(this).parent().html().replace(/\s+/g, ""));
      e(this).unwrap()
    });
    f.empty();
    if ("reset" == c) e.each(d.startOrder, function() {
      f.append(this).append(" ")
    });
    else if ("default" == c) e.each(d.origOrder, function() {
      k(this)
    });
    else if ("random" == c) {
      if (!d.newOrder.length) {
        for (var h = d.startOrder.slice(), j = h.length, s = j; s--;) {
          var r = parseInt(Math.random() * j),
            l = h[s];
          h[s] = h[r];
          h[r] = l
        }
        d.newOrder =
          h
      }
      e.each(d.newOrder, function() {
        f.append(this).append(" ")
      })
    } else if ("custom" == c) e.each(b, function() {
      k(this)
    });
    else {
      if ("undefined" === typeof d.origOrder[0].attr(c)) return console.log("No such attribute found. Terminating"), !1;
      d.newOrder.length || (e.each(d.origOrder, function() {
        d.newOrder.push(e(this))
      }), d.newOrder.sort(a));
      e.each(d.newOrder, function() {
        k(this)
      })
    }
    d.checkSort = [];
    f.find(d.targetSelector + ":visible").each(function(b) {
      var a = e(this);
      0 == b && a.attr("data-checksum", "1");
      a.wrap("<s/>");
      d.checkSort.push(a.parent().html().replace(/\s+/g,
        ""));
      a.unwrap()
    });
    g.find(d.targetSelector).unwrap()
  }

  function y(c) {
    c = c.replace(/\s{2,}/g, " ");
    var b = c.split(" ");
    e.each(b, function(c) {
      "all" == this && (b[c] = "mix_all")
    });
    "" == b[0] && b.shift();
    return b
  }
  var x = {
    init: function(c) {
      return this.each(function() {
        var b = {
          targetSelector: ".mix",
          filterSelector: ".filter",
          sortSelector: ".sort",
          buttonEvent: "click",
          effects: ["fade", "scale"],
          listEffects: null,
          easing: "smooth",
          layoutMode: "grid",
          targetDisplayGrid: "inline-block",
          targetDisplayList: "block",
          listClass: "",
          gridClass: "",
          transitionSpeed: 600,
          showOnLoad: "all",
          sortOnLoad: !1,
          multiFilter: !1,
          filterLogic: "or",
          resizeContainer: !0,
          minHeight: 0,
          failClass: "fail",
          perspectiveDistance: "3000",
          perspectiveOrigin: "50% 50%",
          animateGridList: !0,
          onMixLoad: null,
          onMixStart: null,
          onMixEnd: null,
          container: null,
          origOrder: [],
          startOrder: [],
          newOrder: [],
          origSort: [],
          checkSort: [],
          filter: "",
          mixing: !1,
          origDisplay: "",
          origLayout: "",
          origHeight: 0,
          newHeight: 0,
          isTouch: !1,
          resetDelay: 0,
          failsafe: null,
          prefix: "",
          easingFallback: "ease-in-out",
          transition: {},
          perspective: {},
          clean: {},
          fade: "1",
          scale: "",
          rotateX: "",
          rotateY: "",
          rotateZ: "",
          blur: "",
          grayscale: ""
        };
        c && e.extend(b, c);
        this.config = b;
        e.support.touch = "ontouchend" in document;
        e.support.touch && (b.isTouch = !0, b.resetDelay = 350);
        b.container = e(this);
        var g = b.container,
          d;
        a: {
          d = g[0];
          for (var a = ["Webkit", "Moz", "O", "ms"], k = 0; k < a.length; k++)
            if (a[k] + "Transition" in d.style) {
              d = a[k];
              break a
            } d = "transition" in d.style ? "" : !1
        }
        b.prefix = d;
        b.prefix = b.prefix ? "-" + b.prefix.toLowerCase() + "-" : "";
        g.find(b.targetSelector).each(function() {
          b.origOrder.push(e(this))
        });
        if (b.sortOnLoad) {
          var f;
          e.isArray(b.sortOnLoad) ? (d = b.sortOnLoad[0], f = b.sortOnLoad[1], e(b.sortSelector + "[data-sort=" + b.sortOnLoad[0] + "][data-order=" + b.sortOnLoad[1] + "]").addClass("active")) : (e(b.sortSelector + "[data-sort=" + b.sortOnLoad + "]").addClass("active"), d = b.sortOnLoad, b.sortOnLoad = "desc");
          w(d, f, g, b)
        }
        for (f = 0; 2 > f; f++) d = 0 == f ? d = b.prefix : "", b.transition[d + "transition"] = "all " + b.transitionSpeed + "ms ease-in-out", b.perspective[d + "perspective"] = b.perspectiveDistance + "px", b.perspective[d + "perspective-origin"] =
          b.perspectiveOrigin;
        for (f = 0; 2 > f; f++) d = 0 == f ? d = b.prefix : "", b.clean[d + "transition"] = "none";
        "list" == b.layoutMode ? (g.addClass(b.listClass), b.origDisplay = b.targetDisplayList) : (g.addClass(b.gridClass), b.origDisplay = b.targetDisplayGrid);
        b.origLayout = b.layoutMode;
        f = b.showOnLoad.split(" ");
        e.each(f, function() {
          e(b.filterSelector + '[data-filter="' + this + '"]').addClass("active")
        });
        g.find(b.targetSelector).addClass("mix_all");
        "all" == f[0] && (f[0] = "mix_all", b.showOnLoad = "mix_all");
        var h = e();
        e.each(f, function() {
          h = h.add(e("." +
            this))
        });
        h.each(function() {
          var a = e(this);
          "list" == b.layoutMode ? a.css("display", b.targetDisplayList) : a.css("display", b.targetDisplayGrid);
          a.css(b.transition)
        });
        setTimeout(function() {
          b.mixing = !0;
          h.css("opacity", "1");
          setTimeout(function() {
            "list" == b.layoutMode ? h.removeStyle(b.prefix + "transition, transition").css({
              display: b.targetDisplayList,
              opacity: 1
            }) : h.removeStyle(b.prefix + "transition, transition").css({
              display: b.targetDisplayGrid,
              opacity: 1
            });
            b.mixing = !1;
            if ("function" == typeof b.onMixLoad) {
              var a = b.onMixLoad.call(this,
                b);
              b = a ? a : b
            }
          }, b.transitionSpeed)
        }, 10);
        b.filter = b.showOnLoad;
        e(b.sortSelector).bind(b.buttonEvent, function() {
          if (!b.mixing) {
            var a = e(this),
              c = a.attr("data-sort"),
              d = a.attr("data-order");
            if (a.hasClass("active")) {
              if ("random" != c) return !1
            } else e(b.sortSelector).removeClass("active"), a.addClass("active");
            g.find(b.targetSelector).each(function() {
              b.startOrder.push(e(this))
            });
            q(b.filter, c, d, g, b)
          }
        });
        e(b.filterSelector).bind(b.buttonEvent, function() {
          if (!b.mixing) {
            var a = e(this);
            if (!1 == b.multiFilter) e(b.filterSelector).removeClass("active"),
              a.addClass("active"), b.filter = a.attr("data-filter"), e(b.filterSelector + '[data-filter="' + b.filter + '"]').addClass("active");
            else {
              var c = a.attr("data-filter");
              a.hasClass("active") ? (a.removeClass("active"), b.filter = b.filter.replace(RegExp("(\\s|^)" + c), "")) : (a.addClass("active"), b.filter = b.filter + " " + c)
            }
            q(b.filter, null, null, g, b)
          }
        })
      })
    },
    toGrid: function() {
      return this.each(function() {
        var c = this.config;
        "grid" != c.layoutMode && (c.layoutMode = "grid", q(c.filter, null, null, e(this), c))
      })
    },
    toList: function() {
      return this.each(function() {
        var c =
          this.config;
        "list" != c.layoutMode && (c.layoutMode = "list", q(c.filter, null, null, e(this), c))
      })
    },
    filter: function(c) {
      return this.each(function() {
        var b = this.config;
        b.mixing || (e(b.filterSelector).removeClass("active"), e(b.filterSelector + '[data-filter="' + c + '"]').addClass("active"), q(c, null, null, e(this), b))
      })
    },
    sort: function(c) {
      return this.each(function() {
        var b = this.config,
          g = e(this);
        if (!b.mixing) {
          e(b.sortSelector).removeClass("active");
          if (e.isArray(c)) {
            var d = c[0],
              a = c[1];
            e(b.sortSelector + '[data-sort="' + c[0] + '"][data-order="' +
              c[1] + '"]').addClass("active")
          } else e(b.sortSelector + '[data-sort="' + c + '"]').addClass("active"), d = c, a = "desc";
          g.find(b.targetSelector).each(function() {
            b.startOrder.push(e(this))
          });
          q(b.filter, d, a, g, b)
        }
      })
    },
    multimix: function(c) {
      return this.each(function() {
        var b = this.config,
          g = e(this);
        multiOut = {
          filter: b.filter,
          sort: null,
          order: "desc",
          layoutMode: b.layoutMode
        };
        e.extend(multiOut, c);
        b.mixing || (e(b.filterSelector).add(b.sortSelector).removeClass("active"), e(b.filterSelector + '[data-filter="' + multiOut.filter + '"]').addClass("active"),
          "undefined" !== typeof multiOut.sort && (e(b.sortSelector + '[data-sort="' + multiOut.sort + '"][data-order="' + multiOut.order + '"]').addClass("active"), g.find(b.targetSelector).each(function() {
            b.startOrder.push(e(this))
          })), b.layoutMode = multiOut.layoutMode, q(multiOut.filter, multiOut.sort, multiOut.order, g, b))
      })
    },
    remix: function(c) {
      return this.each(function() {
        var b = this.config,
          g = e(this);
        b.origOrder = [];
        g.find(b.targetSelector).each(function() {
          var c = e(this);
          c.addClass("mix_all");
          b.origOrder.push(c)
        });
        !b.mixing && "undefined" !==
          typeof c && (e(b.filterSelector).removeClass("active"), e(b.filterSelector + '[data-filter="' + c + '"]').addClass("active"), q(c, null, null, g, b))
      })
    }
  };
  e.fn.mixitup = function(c, b) {
    if (x[c]) return x[c].apply(this, Array.prototype.slice.call(arguments, 1));
    if ("object" === typeof c || !c) return x.init.apply(this, arguments)
  };
  e.fn.removeStyle = function(c) {
    return this.each(function() {
      var b = e(this);
      c = c.replace(/\s+/g, "");
      var g = c.split(",");
      e.each(g, function() {
        var c = RegExp(this.toString() + "[^;]+;?", "g");
        b.attr("style", function(a,
          b) {
          if (b) return b.replace(c, "")
        })
      })
    })
  }
})(jQuery);

/* jquery.nicescroll 3.6.8 InuYaksa*2015 MIT http://nicescroll.areaaperta.com */
(function(f) {
  "function" === typeof define && define.amd ? define(["jquery"], f) : "object" === typeof exports ? module.exports = f(require("jquery")) : f(jQuery)
})(function(f) {
  var B = !1,
    F = !1,
    O = 0,
    P = 2E3,
    A = 0,
    J = ["webkit", "ms", "moz", "o"],
    v = window.requestAnimationFrame || !1,
    w = window.cancelAnimationFrame || !1;
  if (!v)
    for (var Q in J) {
      var G = J[Q];
      if (v = window[G + "RequestAnimationFrame"]) {
        w = window[G + "CancelAnimationFrame"] || window[G + "CancelRequestAnimationFrame"];
        break
      }
    }
  var x = window.MutationObserver || window.WebKitMutationObserver ||
    !1,
    K = {
      zindex: "auto",
      cursoropacitymin: 0,
      cursoropacitymax: 1,
      cursorcolor: "#424242",
      cursorwidth: "6px",
      cursorborder: "1px solid #fff",
      cursorborderradius: "5px",
      scrollspeed: 60,
      mousescrollstep: 24,
      touchbehavior: !1,
      hwacceleration: !0,
      usetransition: !0,
      boxzoom: !1,
      dblclickzoom: !0,
      gesturezoom: !0,
      grabcursorenabled: !0,
      autohidemode: !0,
      background: "",
      iframeautoresize: !0,
      cursorminheight: 32,
      preservenativescrolling: !0,
      railoffset: !1,
      railhoffset: !1,
      bouncescroll: !0,
      spacebarenabled: !0,
      railpadding: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      },
      disableoutline: !0,
      horizrailenabled: !0,
      railalign: "right",
      railvalign: "bottom",
      enabletranslate3d: !0,
      enablemousewheel: !0,
      enablekeyboard: !0,
      smoothscroll: !0,
      sensitiverail: !0,
      enablemouselockapi: !0,
      cursorfixedheight: !1,
      directionlockdeadzone: 6,
      hidecursordelay: 400,
      nativeparentscrolling: !0,
      enablescrollonselection: !0,
      overflowx: !0,
      overflowy: !0,
      cursordragspeed: .3,
      rtlmode: "auto",
      cursordragontouch: !1,
      oneaxismousemode: "auto",
      scriptpath: function() {
        var f = document.getElementsByTagName("script"),
          f = f.length ? f[f.length -
            1].src.split("?")[0] : "";
        return 0 < f.split("/").length ? f.split("/").slice(0, -1).join("/") + "/" : ""
      }(),
      preventmultitouchscrolling: !0,
      disablemutationobserver: !1
    },
    H = !1,
    R = function() {
      if (H) return H;
      var f = document.createElement("DIV"),
        c = f.style,
        k = navigator.userAgent,
        l = navigator.platform,
        d = {
          haspointerlock: "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document
        };
      d.isopera = "opera" in window;
      d.isopera12 = d.isopera && "getUserMedia" in navigator;
      d.isoperamini = "[object OperaMini]" ===
        Object.prototype.toString.call(window.operamini);
      d.isie = "all" in document && "attachEvent" in f && !d.isopera;
      d.isieold = d.isie && !("msInterpolationMode" in c);
      d.isie7 = d.isie && !d.isieold && (!("documentMode" in document) || 7 == document.documentMode);
      d.isie8 = d.isie && "documentMode" in document && 8 == document.documentMode;
      d.isie9 = d.isie && "performance" in window && 9 == document.documentMode;
      d.isie10 = d.isie && "performance" in window && 10 == document.documentMode;
      d.isie11 = "msRequestFullscreen" in f && 11 <= document.documentMode;
      d.isieedge12 =
        navigator.userAgent.match(/Edge\/12\./);
      d.isieedge = "msOverflowStyle" in f;
      d.ismodernie = d.isie11 || d.isieedge;
      d.isie9mobile = /iemobile.9/i.test(k);
      d.isie9mobile && (d.isie9 = !1);
      d.isie7mobile = !d.isie9mobile && d.isie7 && /iemobile/i.test(k);
      d.ismozilla = "MozAppearance" in c;
      d.iswebkit = "WebkitAppearance" in c;
      d.ischrome = "chrome" in window;
      d.ischrome38 = d.ischrome && "touchAction" in c;
      d.ischrome22 = !d.ischrome38 && d.ischrome && d.haspointerlock;
      d.ischrome26 = !d.ischrome38 && d.ischrome && "transition" in c;
      d.cantouch = "ontouchstart" in
        document.documentElement || "ontouchstart" in window;
      d.hasw3ctouch = (window.PointerEvent || !1) && (0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints);
      d.hasmstouch = !d.hasw3ctouch && (window.MSPointerEvent || !1);
      d.ismac = /^mac$/i.test(l);
      d.isios = d.cantouch && /iphone|ipad|ipod/i.test(l);
      d.isios4 = d.isios && !("seal" in Object);
      d.isios7 = d.isios && "webkitHidden" in document;
      d.isios8 = d.isios && "hidden" in document;
      d.isandroid = /android/i.test(k);
      d.haseventlistener = "addEventListener" in f;
      d.trstyle = !1;
      d.hastransform = !1;
      d.hastranslate3d = !1;
      d.transitionstyle = !1;
      d.hastransition = !1;
      d.transitionend = !1;
      l = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"];
      for (k = 0; k < l.length; k++)
        if (void 0 !== c[l[k]]) {
          d.trstyle = l[k];
          break
        } d.hastransform = !!d.trstyle;
      d.hastransform && (c[d.trstyle] = "translate3d(1px,2px,3px)", d.hastranslate3d = /translate3d/.test(c[d.trstyle]));
      d.transitionstyle = !1;
      d.prefixstyle = "";
      d.transitionend = !1;
      for (var l = "transition webkitTransition msTransition MozTransition OTransition OTransition KhtmlTransition".split(" "),
          q = " -webkit- -ms- -moz- -o- -o -khtml-".split(" "), t = "transitionend webkitTransitionEnd msTransitionEnd transitionend otransitionend oTransitionEnd KhtmlTransitionEnd".split(" "), k = 0; k < l.length; k++)
        if (l[k] in c) {
          d.transitionstyle = l[k];
          d.prefixstyle = q[k];
          d.transitionend = t[k];
          break
        } d.ischrome26 && (d.prefixstyle = q[1]);
      d.hastransition = d.transitionstyle;
      a: {
        k = ["grab", "-webkit-grab", "-moz-grab"];
        if (d.ischrome && !d.ischrome38 || d.isie) k = [];
        for (l = 0; l < k.length; l++)
          if (q = k[l], c.cursor = q, c.cursor == q) {
            c = q;
            break a
          } c =
        "url(//patriciaportfolio.googlecode.com/files/openhand.cur),n-resize"
      }
      d.cursorgrabvalue = c;
      d.hasmousecapture = "setCapture" in f;
      d.hasMutationObserver = !1 !== x;
      return H = d
    },
    S = function(h, c) {
      function k() {
        var b = a.doc.css(e.trstyle);
        return b && "matrix" == b.substr(0, 6) ? b.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
      }

      function l() {
        var b = a.win;
        if ("zIndex" in b) return b.zIndex();
        for (; 0 < b.length && 9 != b[0].nodeType;) {
          var g = b.css("zIndex");
          if (!isNaN(g) && 0 != g) return parseInt(g);
          b = b.parent()
        }
        return !1
      }

      function d(b,
        g, u) {
        g = b.css(g);
        b = parseFloat(g);
        return isNaN(b) ? (b = z[g] || 0, u = 3 == b ? u ? a.win.outerHeight() - a.win.innerHeight() : a.win.outerWidth() - a.win.innerWidth() : 1, a.isie8 && b && (b += 1), u ? b : 0) : b
      }

      function q(b, g, u, c) {
        a._bind(b, g, function(a) {
          a = a ? a : window.event;
          var c = {
            original: a,
            target: a.target || a.srcElement,
            type: "wheel",
            deltaMode: "MozMousePixelScroll" == a.type ? 0 : 1,
            deltaX: 0,
            deltaZ: 0,
            preventDefault: function() {
              a.preventDefault ? a.preventDefault() : a.returnValue = !1;
              return !1
            },
            stopImmediatePropagation: function() {
              a.stopImmediatePropagation ?
                a.stopImmediatePropagation() : a.cancelBubble = !0
            }
          };
          "mousewheel" == g ? (a.wheelDeltaX && (c.deltaX = -.025 * a.wheelDeltaX), a.wheelDeltaY && (c.deltaY = -.025 * a.wheelDeltaY), c.deltaY || c.deltaX || (c.deltaY = -.025 * a.wheelDelta)) : c.deltaY = a.detail;
          return u.call(b, c)
        }, c)
      }

      function t(b, g, c) {
        var d, e;
        0 == b.deltaMode ? (d = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaX), e = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaY)) : 1 == b.deltaMode && (d = -Math.floor(b.deltaX * a.opt.mousescrollstep), e = -Math.floor(b.deltaY * a.opt.mousescrollstep));
        g && a.opt.oneaxismousemode && 0 == d && e && (d = e, e = 0, c && (0 > d ? a.getScrollLeft() >= a.page.maxw : 0 >= a.getScrollLeft()) && (e = d, d = 0));
        a.isrtlmode && (d = -d);
        d && (a.scrollmom && a.scrollmom.stop(), a.lastdeltax += d, a.debounced("mousewheelx", function() {
          var b = a.lastdeltax;
          a.lastdeltax = 0;
          a.rail.drag || a.doScrollLeftBy(b)
        }, 15));
        if (e) {
          if (a.opt.nativeparentscrolling && c && !a.ispage && !a.zoomactive)
            if (0 > e) {
              if (a.getScrollTop() >= a.page.maxh) return !0
            } else if (0 >= a.getScrollTop()) return !0;
          a.scrollmom && a.scrollmom.stop();
          a.lastdeltay += e;
          a.synched("mousewheely", function() {
            var b = a.lastdeltay;
            a.lastdeltay = 0;
            a.rail.drag || a.doScrollBy(b)
          }, 15)
        }
        b.stopImmediatePropagation();
        return b.preventDefault()
      }
      var a = this;
      this.version = "3.6.8";
      this.name = "nicescroll";
      this.me = c;
      this.opt = {
        doc: f("body"),
        win: !1
      };
      f.extend(this.opt, K);
      this.opt.snapbackspeed = 80;
      if (h)
        for (var r in a.opt) void 0 !== h[r] && (a.opt[r] = h[r]);
      a.opt.disablemutationobserver && (x = !1);
      this.iddoc = (this.doc = a.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
      this.ispage = /^BODY|HTML/.test(a.opt.win ?
        a.opt.win[0].nodeName : this.doc[0].nodeName);
      this.haswrapper = !1 !== a.opt.win;
      this.win = a.opt.win || (this.ispage ? f(window) : this.doc);
      this.docscroll = this.ispage && !this.haswrapper ? f(window) : this.win;
      this.body = f("body");
      this.iframe = this.isfixed = this.viewport = !1;
      this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
      this.istextarea = "TEXTAREA" == this.win[0].nodeName;
      this.forcescreen = !1;
      this.canshowonmouseevent = "scroll" != a.opt.autohidemode;
      this.page = this.view = this.onzoomout = this.onzoomin =
        this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;
      this.scroll = {
        x: 0,
        y: 0
      };
      this.scrollratio = {
        x: 0,
        y: 0
      };
      this.cursorheight = 20;
      this.scrollvaluemax = 0;
      if ("auto" == this.opt.rtlmode) {
        r = this.win[0] == window ? this.body : this.win;
        var p = r.css("writing-mode") || r.css("-webkit-writing-mode") || r.css("-ms-writing-mode") || r.css("-moz-writing-mode");
        "horizontal-tb" == p || "lr-tb" == p || "" == p ? (this.isrtlmode =
          "rtl" == r.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == p || "tb" == p || "tb-rl" == p || "rl-tb" == p, this.isvertical = "vertical-rl" == p || "tb" == p || "tb-rl" == p)
      } else this.isrtlmode = !0 === this.opt.rtlmode, this.isvertical = !1;
      this.observerbody = this.observerremover = this.observer = this.scrollmom = this.scrollrunning = !1;
      do this.id = "ascrail" + P++; while (document.getElementById(this.id));
      this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1;
      this.visibility = !0;
      this.hidden = this.locked = this.railslocked = !1;
      this.cursoractive = !0;
      this.wheelprevented = !1;
      this.overflowx = a.opt.overflowx;
      this.overflowy = a.opt.overflowy;
      this.nativescrollingarea = !1;
      this.checkarea = 0;
      this.events = [];
      this.saved = {};
      this.delaylist = {};
      this.synclist = {};
      this.lastdeltay = this.lastdeltax = 0;
      this.detected = R();
      var e = f.extend({}, this.detected);
      this.ishwscroll = (this.canhwscroll = e.hastransform && a.opt.hwacceleration) && a.haswrapper;
      this.hasreversehr = this.isrtlmode ? this.isvertical ?
        !(e.iswebkit || e.isie || e.isie11) : !(e.iswebkit || e.isie && !e.isie10 && !e.isie11) : !1;
      this.istouchcapable = !1;
      e.cantouch || !e.hasw3ctouch && !e.hasmstouch ? !e.cantouch || e.isios || e.isandroid || !e.iswebkit && !e.ismozilla || (this.istouchcapable = !0) : this.istouchcapable = !0;
      a.opt.enablemouselockapi || (e.hasmousecapture = !1, e.haspointerlock = !1);
      this.debounced = function(b, g, c) {
        a && (a.delaylist[b] || (g.call(a), a.delaylist[b] = {
          h: v(function() {
            a.delaylist[b].fn.call(a);
            a.delaylist[b] = !1
          }, c)
        }), a.delaylist[b].fn = g)
      };
      var I = !1;
      this.synched =
        function(b, g) {
          a.synclist[b] = g;
          (function() {
            I || (v(function() {
              if (a) {
                I = !1;
                for (var b in a.synclist) {
                  var g = a.synclist[b];
                  g && g.call(a);
                  a.synclist[b] = !1
                }
              }
            }), I = !0)
          })();
          return b
        };
      this.unsynched = function(b) {
        a.synclist[b] && (a.synclist[b] = !1)
      };
      this.css = function(b, g) {
        for (var c in g) a.saved.css.push([b, c, b.css(c)]), b.css(c, g[c])
      };
      this.scrollTop = function(b) {
        return void 0 === b ? a.getScrollTop() : a.setScrollTop(b)
      };
      this.scrollLeft = function(b) {
        return void 0 === b ? a.getScrollLeft() : a.setScrollLeft(b)
      };
      var D = function(a, g,
        c, d, e, f, k) {
        this.st = a;
        this.ed = g;
        this.spd = c;
        this.p1 = d || 0;
        this.p2 = e || 1;
        this.p3 = f || 0;
        this.p4 = k || 1;
        this.ts = (new Date).getTime();
        this.df = this.ed - this.st
      };
      D.prototype = {
        B2: function(a) {
          return 3 * a * a * (1 - a)
        },
        B3: function(a) {
          return 3 * a * (1 - a) * (1 - a)
        },
        B4: function(a) {
          return (1 - a) * (1 - a) * (1 - a)
        },
        getNow: function() {
          var a = 1 - ((new Date).getTime() - this.ts) / this.spd,
            g = this.B2(a) + this.B3(a) + this.B4(a);
          return 0 > a ? this.ed : this.st + Math.round(this.df * g)
        },
        update: function(a, g) {
          this.st = this.getNow();
          this.ed = a;
          this.spd = g;
          this.ts = (new Date).getTime();
          this.df = this.ed - this.st;
          return this
        }
      };
      if (this.ishwscroll) {
        this.doc.translate = {
          x: 0,
          y: 0,
          tx: "0px",
          ty: "0px"
        };
        e.hastranslate3d && e.isios && this.doc.css("-webkit-backface-visibility", "hidden");
        this.getScrollTop = function(b) {
          if (!b) {
            if (b = k()) return 16 == b.length ? -b[13] : -b[5];
            if (a.timerscroll && a.timerscroll.bz) return a.timerscroll.bz.getNow()
          }
          return a.doc.translate.y
        };
        this.getScrollLeft = function(b) {
          if (!b) {
            if (b = k()) return 16 == b.length ? -b[12] : -b[4];
            if (a.timerscroll && a.timerscroll.bh) return a.timerscroll.bh.getNow()
          }
          return a.doc.translate.x
        };
        this.notifyScrollEvent = function(a) {
          var g = document.createEvent("UIEvents");
          g.initUIEvent("scroll", !1, !0, window, 1);
          g.niceevent = !0;
          a.dispatchEvent(g)
        };
        var y = this.isrtlmode ? 1 : -1;
        e.hastranslate3d && a.opt.enabletranslate3d ? (this.setScrollTop = function(b, g) {
          a.doc.translate.y = b;
          a.doc.translate.ty = -1 * b + "px";
          a.doc.css(e.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
          g || a.notifyScrollEvent(a.win[0])
        }, this.setScrollLeft = function(b, g) {
          a.doc.translate.x = b;
          a.doc.translate.tx = b * y + "px";
          a.doc.css(e.trstyle,
            "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
          g || a.notifyScrollEvent(a.win[0])
        }) : (this.setScrollTop = function(b, g) {
          a.doc.translate.y = b;
          a.doc.translate.ty = -1 * b + "px";
          a.doc.css(e.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
          g || a.notifyScrollEvent(a.win[0])
        }, this.setScrollLeft = function(b, g) {
          a.doc.translate.x = b;
          a.doc.translate.tx = b * y + "px";
          a.doc.css(e.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
          g || a.notifyScrollEvent(a.win[0])
        })
      } else this.getScrollTop =
        function() {
          return a.docscroll.scrollTop()
        }, this.setScrollTop = function(b) {
          return setTimeout(function() {
            a && a.docscroll.scrollTop(b)
          }, 1)
        }, this.getScrollLeft = function() {
          return a.hasreversehr ? a.detected.ismozilla ? a.page.maxw - Math.abs(a.docscroll.scrollLeft()) : a.page.maxw - a.docscroll.scrollLeft() : a.docscroll.scrollLeft()
        }, this.setScrollLeft = function(b) {
          return setTimeout(function() {
            if (a) return a.hasreversehr && (b = a.detected.ismozilla ? -(a.page.maxw - b) : a.page.maxw - b), a.docscroll.scrollLeft(b)
          }, 1)
        };
      this.getTarget =
        function(a) {
          return a ? a.target ? a.target : a.srcElement ? a.srcElement : !1 : !1
        };
      this.hasParent = function(a, g) {
        if (!a) return !1;
        for (var c = a.target || a.srcElement || a || !1; c && c.id != g;) c = c.parentNode || !1;
        return !1 !== c
      };
      var z = {
        thin: 1,
        medium: 3,
        thick: 5
      };
      this.getDocumentScrollOffset = function() {
        return {
          top: window.pageYOffset || document.documentElement.scrollTop,
          left: window.pageXOffset || document.documentElement.scrollLeft
        }
      };
      this.getOffset = function() {
        if (a.isfixed) {
          var b = a.win.offset(),
            g = a.getDocumentScrollOffset();
          b.top -= g.top;
          b.left -= g.left;
          return b
        }
        b = a.win.offset();
        if (!a.viewport) return b;
        g = a.viewport.offset();
        return {
          top: b.top - g.top,
          left: b.left - g.left
        }
      };
      this.updateScrollBar = function(b) {
        var g, c, e;
        if (a.ishwscroll) a.rail.css({
          height: a.win.innerHeight() - (a.opt.railpadding.top + a.opt.railpadding.bottom)
        }), a.railh && a.railh.css({
          width: a.win.innerWidth() - (a.opt.railpadding.left + a.opt.railpadding.right)
        });
        else {
          var f = a.getOffset();
          g = f.top;
          c = f.left - (a.opt.railpadding.left + a.opt.railpadding.right);
          g += d(a.win, "border-top-width", !0);
          c += a.rail.align ? a.win.outerWidth() - d(a.win, "border-right-width") - a.rail.width : d(a.win, "border-left-width");
          if (e = a.opt.railoffset) e.top && (g += e.top), e.left && (c += e.left);
          a.railslocked || a.rail.css({
            top: g,
            left: c,
            height: (b ? b.h : a.win.innerHeight()) - (a.opt.railpadding.top + a.opt.railpadding.bottom)
          });
          a.zoom && a.zoom.css({
            top: g + 1,
            left: 1 == a.rail.align ? c - 20 : c + a.rail.width + 4
          });
          if (a.railh && !a.railslocked) {
            g = f.top;
            c = f.left;
            if (e = a.opt.railhoffset) e.top && (g += e.top), e.left && (c += e.left);
            b = a.railh.align ? g + d(a.win, "border-top-width",
              !0) + a.win.innerHeight() - a.railh.height : g + d(a.win, "border-top-width", !0);
            c += d(a.win, "border-left-width");
            a.railh.css({
              top: b - (a.opt.railpadding.top + a.opt.railpadding.bottom),
              left: c,
              width: a.railh.width
            })
          }
        }
      };
      this.doRailClick = function(b, g, c) {
        var d;
        a.railslocked || (a.cancelEvent(b), g ? (g = c ? a.doScrollLeft : a.doScrollTop, d = c ? (b.pageX - a.railh.offset().left - a.cursorwidth / 2) * a.scrollratio.x : (b.pageY - a.rail.offset().top - a.cursorheight / 2) * a.scrollratio.y, g(d)) : (g = c ? a.doScrollLeftBy : a.doScrollBy, d = c ? a.scroll.x : a.scroll.y,
          b = c ? b.pageX - a.railh.offset().left : b.pageY - a.rail.offset().top, c = c ? a.view.w : a.view.h, g(d >= b ? c : -c)))
      };
      a.hasanimationframe = v;
      a.hascancelanimationframe = w;
      a.hasanimationframe ? a.hascancelanimationframe || (w = function() {
        a.cancelAnimationFrame = !0
      }) : (v = function(a) {
        return setTimeout(a, 15 - Math.floor(+new Date / 1E3) % 16)
      }, w = clearTimeout);
      this.init = function() {
        a.saved.css = [];
        if (e.isie7mobile || e.isoperamini) return !0;
        e.hasmstouch && a.css(a.ispage ? f("html") : a.win, {
          _touchaction: "none"
        });
        var b = e.ismodernie || e.isie10 ? {
          "-ms-overflow-style": "none"
        } : {
          "overflow-y": "hidden"
        };
        a.zindex = "auto";
        a.zindex = a.ispage || "auto" != a.opt.zindex ? a.opt.zindex : l() || "auto";
        !a.ispage && "auto" != a.zindex && a.zindex > A && (A = a.zindex);
        a.isie && 0 == a.zindex && "auto" == a.opt.zindex && (a.zindex = "auto");
        if (!a.ispage || !e.cantouch && !e.isieold && !e.isie9mobile) {
          var c = a.docscroll;
          a.ispage && (c = a.haswrapper ? a.win : a.doc);
          e.isie9mobile || a.css(c, b);
          a.ispage && e.isie7 && ("BODY" == a.doc[0].nodeName ? a.css(f("html"), {
            "overflow-y": "hidden"
          }) : "HTML" == a.doc[0].nodeName && a.css(f("body"), b));
          !e.isios ||
            a.ispage || a.haswrapper || a.css(f("body"), {
              "-webkit-overflow-scrolling": "touch"
            });
          var d = f(document.createElement("div"));
          d.css({
            position: "relative",
            top: 0,
            "float": "right",
            width: a.opt.cursorwidth,
            height: 0,
            "background-color": a.opt.cursorcolor,
            border: a.opt.cursorborder,
            "background-clip": "padding-box",
            "-webkit-border-radius": a.opt.cursorborderradius,
            "-moz-border-radius": a.opt.cursorborderradius,
            "border-radius": a.opt.cursorborderradius
          });
          d.hborder = parseFloat(d.outerHeight() - d.innerHeight());
          d.addClass("nicescroll-cursors");
          a.cursor = d;
          var m = f(document.createElement("div"));
          m.attr("id", a.id);
          m.addClass("nicescroll-rails nicescroll-rails-vr");
          var k, h, p = ["left", "right", "top", "bottom"],
            L;
          for (L in p) h = p[L], (k = a.opt.railpadding[h]) ? m.css("padding-" + h, k + "px") : a.opt.railpadding[h] = 0;
          m.append(d);
          m.width = Math.max(parseFloat(a.opt.cursorwidth), d.outerWidth());
          m.css({
            width: m.width + "px",
            zIndex: a.zindex,
            background: a.opt.background,
            cursor: "default"
          });
          m.visibility = !0;
          m.scrollable = !0;
          m.align = "left" == a.opt.railalign ? 0 : 1;
          a.rail = m;
          d = a.rail.drag = !1;
          !a.opt.boxzoom || a.ispage || e.isieold || (d = document.createElement("div"), a.bind(d, "click", a.doZoom), a.bind(d, "mouseenter", function() {
              a.zoom.css("opacity", a.opt.cursoropacitymax)
            }), a.bind(d, "mouseleave", function() {
              a.zoom.css("opacity", a.opt.cursoropacitymin)
            }), a.zoom = f(d), a.zoom.css({
              cursor: "pointer",
              zIndex: a.zindex,
              backgroundImage: "url(" + a.opt.scriptpath + "zoomico.png)",
              height: 18,
              width: 18,
              backgroundPosition: "0px 0px"
            }), a.opt.dblclickzoom && a.bind(a.win, "dblclick", a.doZoom), e.cantouch && a.opt.gesturezoom &&
            (a.ongesturezoom = function(b) {
              1.5 < b.scale && a.doZoomIn(b);
              .8 > b.scale && a.doZoomOut(b);
              return a.cancelEvent(b)
            }, a.bind(a.win, "gestureend", a.ongesturezoom)));
          a.railh = !1;
          var n;
          a.opt.horizrailenabled && (a.css(c, {
              overflowX: "hidden"
            }), d = f(document.createElement("div")), d.css({
              position: "absolute",
              top: 0,
              height: a.opt.cursorwidth,
              width: 0,
              backgroundColor: a.opt.cursorcolor,
              border: a.opt.cursorborder,
              backgroundClip: "padding-box",
              "-webkit-border-radius": a.opt.cursorborderradius,
              "-moz-border-radius": a.opt.cursorborderradius,
              "border-radius": a.opt.cursorborderradius
            }), e.isieold && d.css("overflow", "hidden"), d.wborder = parseFloat(d.outerWidth() - d.innerWidth()), d.addClass("nicescroll-cursors"), a.cursorh = d, n = f(document.createElement("div")), n.attr("id", a.id + "-hr"), n.addClass("nicescroll-rails nicescroll-rails-hr"), n.height = Math.max(parseFloat(a.opt.cursorwidth), d.outerHeight()), n.css({
              height: n.height + "px",
              zIndex: a.zindex,
              background: a.opt.background
            }), n.append(d), n.visibility = !0, n.scrollable = !0, n.align = "top" == a.opt.railvalign ?
            0 : 1, a.railh = n, a.railh.drag = !1);
          a.ispage ? (m.css({
            position: "fixed",
            top: 0,
            height: "100%"
          }), m.align ? m.css({
            right: 0
          }) : m.css({
            left: 0
          }), a.body.append(m), a.railh && (n.css({
            position: "fixed",
            left: 0,
            width: "100%"
          }), n.align ? n.css({
            bottom: 0
          }) : n.css({
            top: 0
          }), a.body.append(n))) : (a.ishwscroll ? ("static" == a.win.css("position") && a.css(a.win, {
              position: "relative"
            }), c = "HTML" == a.win[0].nodeName ? a.body : a.win, f(c).scrollTop(0).scrollLeft(0), a.zoom && (a.zoom.css({
              position: "absolute",
              top: 1,
              right: 0,
              "margin-right": m.width + 4
            }), c.append(a.zoom)),
            m.css({
              position: "absolute",
              top: 0
            }), m.align ? m.css({
              right: 0
            }) : m.css({
              left: 0
            }), c.append(m), n && (n.css({
              position: "absolute",
              left: 0,
              bottom: 0
            }), n.align ? n.css({
              bottom: 0
            }) : n.css({
              top: 0
            }), c.append(n))) : (a.isfixed = "fixed" == a.win.css("position"), c = a.isfixed ? "fixed" : "absolute", a.isfixed || (a.viewport = a.getViewport(a.win[0])), a.viewport && (a.body = a.viewport, 0 == /fixed|absolute/.test(a.viewport.css("position")) && a.css(a.viewport, {
              position: "relative"
            })), m.css({
              position: c
            }), a.zoom && a.zoom.css({
              position: c
            }), a.updateScrollBar(),
            a.body.append(m), a.zoom && a.body.append(a.zoom), a.railh && (n.css({
              position: c
            }), a.body.append(n))), e.isios && a.css(a.win, {
            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
            "-webkit-touch-callout": "none"
          }), e.isie && a.opt.disableoutline && a.win.attr("hideFocus", "true"), e.iswebkit && a.opt.disableoutline && a.win.css("outline", "none"));
          !1 === a.opt.autohidemode ? (a.autohidedom = !1, a.rail.css({
              opacity: a.opt.cursoropacitymax
            }), a.railh && a.railh.css({
              opacity: a.opt.cursoropacitymax
            })) : !0 === a.opt.autohidemode || "leave" === a.opt.autohidemode ?
            (a.autohidedom = f().add(a.rail), e.isie8 && (a.autohidedom = a.autohidedom.add(a.cursor)), a.railh && (a.autohidedom = a.autohidedom.add(a.railh)), a.railh && e.isie8 && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "scroll" == a.opt.autohidemode ? (a.autohidedom = f().add(a.rail), a.railh && (a.autohidedom = a.autohidedom.add(a.railh))) : "cursor" == a.opt.autohidemode ? (a.autohidedom = f().add(a.cursor), a.railh && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "hidden" == a.opt.autohidemode && (a.autohidedom = !1, a.hide(), a.railslocked = !1);
          if (e.isie9mobile) a.scrollmom = new M(a), a.onmangotouch = function() {
            var b = a.getScrollTop(),
              c = a.getScrollLeft();
            if (b == a.scrollmom.lastscrolly && c == a.scrollmom.lastscrollx) return !0;
            var g = b - a.mangotouch.sy,
              d = c - a.mangotouch.sx;
            if (0 != Math.round(Math.sqrt(Math.pow(d, 2) + Math.pow(g, 2)))) {
              var e = 0 > g ? -1 : 1,
                f = 0 > d ? -1 : 1,
                u = +new Date;
              a.mangotouch.lazy && clearTimeout(a.mangotouch.lazy);
              80 < u - a.mangotouch.tm || a.mangotouch.dry != e || a.mangotouch.drx != f ? (a.scrollmom.stop(), a.scrollmom.reset(c, b), a.mangotouch.sy = b, a.mangotouch.ly =
                b, a.mangotouch.sx = c, a.mangotouch.lx = c, a.mangotouch.dry = e, a.mangotouch.drx = f, a.mangotouch.tm = u) : (a.scrollmom.stop(), a.scrollmom.update(a.mangotouch.sx - d, a.mangotouch.sy - g), a.mangotouch.tm = u, g = Math.max(Math.abs(a.mangotouch.ly - b), Math.abs(a.mangotouch.lx - c)), a.mangotouch.ly = b, a.mangotouch.lx = c, 2 < g && (a.mangotouch.lazy = setTimeout(function() {
                a.mangotouch.lazy = !1;
                a.mangotouch.dry = 0;
                a.mangotouch.drx = 0;
                a.mangotouch.tm = 0;
                a.scrollmom.doMomentum(30)
              }, 100)))
            }
          }, m = a.getScrollTop(), n = a.getScrollLeft(), a.mangotouch = {
            sy: m,
            ly: m,
            dry: 0,
            sx: n,
            lx: n,
            drx: 0,
            lazy: !1,
            tm: 0
          }, a.bind(a.docscroll, "scroll", a.onmangotouch);
          else {
            if (e.cantouch || a.istouchcapable || a.opt.touchbehavior || e.hasmstouch) {
              a.scrollmom = new M(a);
              a.ontouchstart = function(b) {
                if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                a.hasmoving = !1;
                if (!a.railslocked) {
                  var c;
                  if (e.hasmstouch)
                    for (c = b.target ? b.target : !1; c;) {
                      var g = f(c).getNiceScroll();
                      if (0 < g.length && g[0].me == a.me) break;
                      if (0 < g.length) return !1;
                      if ("DIV" == c.nodeName && c.id == a.id) break;
                      c = c.parentNode ?
                        c.parentNode : !1
                    }
                  a.cancelScroll();
                  if ((c = a.getTarget(b)) && /INPUT/i.test(c.nodeName) && /range/i.test(c.type)) return a.stopPropagation(b);
                  !("clientX" in b) && "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY);
                  a.forcescreen && (g = b, b = {
                    original: b.original ? b.original : b
                  }, b.clientX = g.screenX, b.clientY = g.screenY);
                  a.rail.drag = {
                    x: b.clientX,
                    y: b.clientY,
                    sx: a.scroll.x,
                    sy: a.scroll.y,
                    st: a.getScrollTop(),
                    sl: a.getScrollLeft(),
                    pt: 2,
                    dl: !1
                  };
                  if (a.ispage || !a.opt.directionlockdeadzone) a.rail.drag.dl =
                    "f";
                  else {
                    var g = f(window).width(),
                      d = f(window).height(),
                      d = Math.max(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - d),
                      g = Math.max(0, Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - g);
                    a.rail.drag.ck = !a.rail.scrollable && a.railh.scrollable ? 0 < d ? "v" : !1 : a.rail.scrollable && !a.railh.scrollable ? 0 < g ? "h" : !1 : !1;
                    a.rail.drag.ck || (a.rail.drag.dl = "f")
                  }
                  a.opt.touchbehavior && a.isiframe && e.isie && (g = a.win.position(), a.rail.drag.x += g.left, a.rail.drag.y += g.top);
                  a.hasmoving = !1;
                  a.lastmouseup = !1;
                  a.scrollmom.reset(b.clientX, b.clientY);
                  if (!e.cantouch && !this.istouchcapable && !b.pointerType) {
                    if (!c || !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName)) return !a.ispage && e.hasmousecapture && c.setCapture(), a.opt.touchbehavior ? (c.onclick && !c._onclick && (c._onclick = c.onclick, c.onclick = function(b) {
                      if (a.hasmoving) return !1;
                      c._onclick.call(this, b)
                    }), a.cancelEvent(b)) : a.stopPropagation(b);
                    /SUBMIT|CANCEL|BUTTON/i.test(f(c).attr("type")) && (pc = {
                      tg: c,
                      click: !1
                    }, a.preventclick = pc)
                  }
                }
              };
              a.ontouchend = function(b) {
                if (!a.rail.drag) return !0;
                if (2 == a.rail.drag.pt) {
                  if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                  a.scrollmom.doMomentum();
                  a.rail.drag = !1;
                  if (a.hasmoving && (a.lastmouseup = !0, a.hideCursor(), e.hasmousecapture && document.releaseCapture(), !e.cantouch)) return a.cancelEvent(b)
                } else if (1 == a.rail.drag.pt) return a.onmouseup(b)
              };
              var q = a.opt.touchbehavior && a.isiframe && !e.hasmousecapture;
              a.ontouchmove = function(b, c) {
                if (!a.rail.drag || b.targetTouches && a.opt.preventmultitouchscrolling && 1 < b.targetTouches.length || b.pointerType &&
                  2 != b.pointerType && "touch" != b.pointerType) return !1;
                if (2 == a.rail.drag.pt) {
                  if (e.cantouch && e.isios && void 0 === b.original) return !0;
                  a.hasmoving = !0;
                  a.preventclick && !a.preventclick.click && (a.preventclick.click = a.preventclick.tg.onclick || !1, a.preventclick.tg.onclick = a.onpreventclick);
                  b = f.extend({
                    original: b
                  }, b);
                  "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY);
                  if (a.forcescreen) {
                    var g = b;
                    b = {
                      original: b.original ? b.original : b
                    };
                    b.clientX = g.screenX;
                    b.clientY = g.screenY
                  }
                  var d,
                    g = d = 0;
                  q && !c && (d = a.win.position(), g = -d.left, d = -d.top);
                  var u = b.clientY + d;
                  d = u - a.rail.drag.y;
                  var m = b.clientX + g,
                    k = m - a.rail.drag.x,
                    h = a.rail.drag.st - d;
                  a.ishwscroll && a.opt.bouncescroll ? 0 > h ? h = Math.round(h / 2) : h > a.page.maxh && (h = a.page.maxh + Math.round((h - a.page.maxh) / 2)) : (0 > h && (u = h = 0), h > a.page.maxh && (h = a.page.maxh, u = 0));
                  var l;
                  a.railh && a.railh.scrollable && (l = a.isrtlmode ? k - a.rail.drag.sl : a.rail.drag.sl - k, a.ishwscroll && a.opt.bouncescroll ? 0 > l ? l = Math.round(l / 2) : l > a.page.maxw && (l = a.page.maxw + Math.round((l - a.page.maxw) /
                    2)) : (0 > l && (m = l = 0), l > a.page.maxw && (l = a.page.maxw, m = 0)));
                  g = !1;
                  if (a.rail.drag.dl) g = !0, "v" == a.rail.drag.dl ? l = a.rail.drag.sl : "h" == a.rail.drag.dl && (h = a.rail.drag.st);
                  else {
                    d = Math.abs(d);
                    var k = Math.abs(k),
                      C = a.opt.directionlockdeadzone;
                    if ("v" == a.rail.drag.ck) {
                      if (d > C && k <= .3 * d) return a.rail.drag = !1, !0;
                      k > C && (a.rail.drag.dl = "f", f("body").scrollTop(f("body").scrollTop()))
                    } else if ("h" == a.rail.drag.ck) {
                      if (k > C && d <= .3 * k) return a.rail.drag = !1, !0;
                      d > C && (a.rail.drag.dl = "f", f("body").scrollLeft(f("body").scrollLeft()))
                    }
                  }
                  a.synched("touchmove",
                    function() {
                      a.rail.drag && 2 == a.rail.drag.pt && (a.prepareTransition && a.prepareTransition(0), a.rail.scrollable && a.setScrollTop(h), a.scrollmom.update(m, u), a.railh && a.railh.scrollable ? (a.setScrollLeft(l), a.showCursor(h, l)) : a.showCursor(h), e.isie10 && document.selection.clear())
                    });
                  e.ischrome && a.istouchcapable && (g = !1);
                  if (g) return a.cancelEvent(b)
                } else if (1 == a.rail.drag.pt) return a.onmousemove(b)
              }
            }
            a.onmousedown = function(b, c) {
              if (!a.rail.drag || 1 == a.rail.drag.pt) {
                if (a.railslocked) return a.cancelEvent(b);
                a.cancelScroll();
                a.rail.drag = {
                  x: b.clientX,
                  y: b.clientY,
                  sx: a.scroll.x,
                  sy: a.scroll.y,
                  pt: 1,
                  hr: !!c
                };
                var g = a.getTarget(b);
                !a.ispage && e.hasmousecapture && g.setCapture();
                a.isiframe && !e.hasmousecapture && (a.saved.csspointerevents = a.doc.css("pointer-events"), a.css(a.doc, {
                  "pointer-events": "none"
                }));
                a.hasmoving = !1;
                return a.cancelEvent(b)
              }
            };
            a.onmouseup = function(b) {
              if (a.rail.drag) {
                if (1 != a.rail.drag.pt) return !0;
                e.hasmousecapture && document.releaseCapture();
                a.isiframe && !e.hasmousecapture && a.doc.css("pointer-events", a.saved.csspointerevents);
                a.rail.drag = !1;
                a.hasmoving && a.triggerScrollEnd();
                return a.cancelEvent(b)
              }
            };
            a.onmousemove = function(b) {
              if (a.rail.drag) {
                if (1 == a.rail.drag.pt) {
                  if (e.ischrome && 0 == b.which) return a.onmouseup(b);
                  a.cursorfreezed = !0;
                  a.hasmoving = !0;
                  if (a.rail.drag.hr) {
                    a.scroll.x = a.rail.drag.sx + (b.clientX - a.rail.drag.x);
                    0 > a.scroll.x && (a.scroll.x = 0);
                    var c = a.scrollvaluemaxw;
                    a.scroll.x > c && (a.scroll.x = c)
                  } else a.scroll.y = a.rail.drag.sy + (b.clientY - a.rail.drag.y), 0 > a.scroll.y && (a.scroll.y = 0), c = a.scrollvaluemax, a.scroll.y > c && (a.scroll.y =
                    c);
                  a.synched("mousemove", function() {
                    a.rail.drag && 1 == a.rail.drag.pt && (a.showCursor(), a.rail.drag.hr ? a.hasreversehr ? a.doScrollLeft(a.scrollvaluemaxw - Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollLeft(Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollTop(Math.round(a.scroll.y * a.scrollratio.y), a.opt.cursordragspeed))
                  });
                  return a.cancelEvent(b)
                }
              } else a.checkarea = 0
            };
            if (e.cantouch || a.opt.touchbehavior) a.onpreventclick = function(b) {
              if (a.preventclick) return a.preventclick.tg.onclick =
                a.preventclick.click, a.preventclick = !1, a.cancelEvent(b)
            }, a.bind(a.win, "mousedown", a.ontouchstart), a.onclick = e.isios ? !1 : function(b) {
              return a.lastmouseup ? (a.lastmouseup = !1, a.cancelEvent(b)) : !0
            }, a.opt.grabcursorenabled && e.cursorgrabvalue && (a.css(a.ispage ? a.doc : a.win, {
              cursor: e.cursorgrabvalue
            }), a.css(a.rail, {
              cursor: e.cursorgrabvalue
            }));
            else {
              var r = function(b) {
                if (a.selectiondrag) {
                  if (b) {
                    var c = a.win.outerHeight();
                    b = b.pageY - a.selectiondrag.top;
                    0 < b && b < c && (b = 0);
                    b >= c && (b -= c);
                    a.selectiondrag.df = b
                  }
                  0 != a.selectiondrag.df &&
                    (a.doScrollBy(2 * -Math.floor(a.selectiondrag.df / 6)), a.debounced("doselectionscroll", function() {
                      r()
                    }, 50))
                }
              };
              a.hasTextSelected = "getSelection" in document ? function() {
                return 0 < document.getSelection().rangeCount
              } : "selection" in document ? function() {
                return "None" != document.selection.type
              } : function() {
                return !1
              };
              a.onselectionstart = function(b) {
                a.ispage || (a.selectiondrag = a.win.offset())
              };
              a.onselectionend = function(b) {
                a.selectiondrag = !1
              };
              a.onselectiondrag = function(b) {
                a.selectiondrag && a.hasTextSelected() && a.debounced("selectionscroll",
                  function() {
                    r(b)
                  }, 250)
              }
            }
            e.hasw3ctouch ? (a.css(a.rail, {
              "touch-action": "none"
            }), a.css(a.cursor, {
              "touch-action": "none"
            }), a.bind(a.win, "pointerdown", a.ontouchstart), a.bind(document, "pointerup", a.ontouchend), a.bind(document, "pointermove", a.ontouchmove)) : e.hasmstouch ? (a.css(a.rail, {
              "-ms-touch-action": "none"
            }), a.css(a.cursor, {
              "-ms-touch-action": "none"
            }), a.bind(a.win, "MSPointerDown", a.ontouchstart), a.bind(document, "MSPointerUp", a.ontouchend), a.bind(document, "MSPointerMove", a.ontouchmove), a.bind(a.cursor, "MSGestureHold",
              function(a) {
                a.preventDefault()
              }), a.bind(a.cursor, "contextmenu", function(a) {
              a.preventDefault()
            })) : this.istouchcapable && (a.bind(a.win, "touchstart", a.ontouchstart), a.bind(document, "touchend", a.ontouchend), a.bind(document, "touchcancel", a.ontouchend), a.bind(document, "touchmove", a.ontouchmove));
            if (a.opt.cursordragontouch || !e.cantouch && !a.opt.touchbehavior) a.rail.css({
              cursor: "default"
            }), a.railh && a.railh.css({
              cursor: "default"
            }), a.jqbind(a.rail, "mouseenter", function() {
              if (!a.ispage && !a.win.is(":visible")) return !1;
              a.canshowonmouseevent && a.showCursor();
              a.rail.active = !0
            }), a.jqbind(a.rail, "mouseleave", function() {
              a.rail.active = !1;
              a.rail.drag || a.hideCursor()
            }), a.opt.sensitiverail && (a.bind(a.rail, "click", function(b) {
              a.doRailClick(b, !1, !1)
            }), a.bind(a.rail, "dblclick", function(b) {
              a.doRailClick(b, !0, !1)
            }), a.bind(a.cursor, "click", function(b) {
              a.cancelEvent(b)
            }), a.bind(a.cursor, "dblclick", function(b) {
              a.cancelEvent(b)
            })), a.railh && (a.jqbind(a.railh, "mouseenter", function() {
              if (!a.ispage && !a.win.is(":visible")) return !1;
              a.canshowonmouseevent &&
                a.showCursor();
              a.rail.active = !0
            }), a.jqbind(a.railh, "mouseleave", function() {
              a.rail.active = !1;
              a.rail.drag || a.hideCursor()
            }), a.opt.sensitiverail && (a.bind(a.railh, "click", function(b) {
              a.doRailClick(b, !1, !0)
            }), a.bind(a.railh, "dblclick", function(b) {
              a.doRailClick(b, !0, !0)
            }), a.bind(a.cursorh, "click", function(b) {
              a.cancelEvent(b)
            }), a.bind(a.cursorh, "dblclick", function(b) {
              a.cancelEvent(b)
            })));
            e.cantouch || a.opt.touchbehavior ? (a.bind(e.hasmousecapture ? a.win : document, "mouseup", a.ontouchend), a.bind(document, "mousemove",
              a.ontouchmove), a.onclick && a.bind(document, "click", a.onclick), a.opt.cursordragontouch ? (a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), a.cursorh && a.bind(a.cursorh, "mousedown", function(b) {
              a.onmousedown(b, !0)
            }), a.cursorh && a.bind(a.cursorh, "mouseup", a.onmouseup)) : (a.bind(a.rail, "mousedown", function(a) {
              a.preventDefault()
            }), a.railh && a.bind(a.railh, "mousedown", function(a) {
              a.preventDefault()
            }))) : (a.bind(e.hasmousecapture ? a.win : document, "mouseup", a.onmouseup), a.bind(document,
              "mousemove", a.onmousemove), a.onclick && a.bind(document, "click", a.onclick), a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), a.railh && (a.bind(a.cursorh, "mousedown", function(b) {
              a.onmousedown(b, !0)
            }), a.bind(a.cursorh, "mouseup", a.onmouseup)), !a.ispage && a.opt.enablescrollonselection && (a.bind(a.win[0], "mousedown", a.onselectionstart), a.bind(document, "mouseup", a.onselectionend), a.bind(a.cursor, "mouseup", a.onselectionend), a.cursorh && a.bind(a.cursorh, "mouseup", a.onselectionend),
              a.bind(document, "mousemove", a.onselectiondrag)), a.zoom && (a.jqbind(a.zoom, "mouseenter", function() {
              a.canshowonmouseevent && a.showCursor();
              a.rail.active = !0
            }), a.jqbind(a.zoom, "mouseleave", function() {
              a.rail.active = !1;
              a.rail.drag || a.hideCursor()
            })));
            a.opt.enablemousewheel && (a.isiframe || a.mousewheel(e.isie && a.ispage ? document : a.win, a.onmousewheel), a.mousewheel(a.rail, a.onmousewheel), a.railh && a.mousewheel(a.railh, a.onmousewheelhr));
            a.ispage || e.cantouch || /HTML|^BODY/.test(a.win[0].nodeName) || (a.win.attr("tabindex") ||
              a.win.attr({
                tabindex: O++
              }), a.jqbind(a.win, "focus", function(b) {
                B = a.getTarget(b).id || !0;
                a.hasfocus = !0;
                a.canshowonmouseevent && a.noticeCursor()
              }), a.jqbind(a.win, "blur", function(b) {
                B = !1;
                a.hasfocus = !1
              }), a.jqbind(a.win, "mouseenter", function(b) {
                F = a.getTarget(b).id || !0;
                a.hasmousefocus = !0;
                a.canshowonmouseevent && a.noticeCursor()
              }), a.jqbind(a.win, "mouseleave", function() {
                F = !1;
                a.hasmousefocus = !1;
                a.rail.drag || a.hideCursor()
              }))
          }
          a.onkeypress = function(b) {
            if (a.railslocked && 0 == a.page.maxh) return !0;
            b = b ? b : window.e;
            var c =
              a.getTarget(b);
            if (c && /INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName) && (!c.getAttribute("type") && !c.type || !/submit|button|cancel/i.tp) || f(c).attr("contenteditable")) return !0;
            if (a.hasfocus || a.hasmousefocus && !B || a.ispage && !B && !F) {
              c = b.keyCode;
              if (a.railslocked && 27 != c) return a.cancelEvent(b);
              var g = b.ctrlKey || !1,
                d = b.shiftKey || !1,
                e = !1;
              switch (c) {
                case 38:
                case 63233:
                  a.doScrollBy(72);
                  e = !0;
                  break;
                case 40:
                case 63235:
                  a.doScrollBy(-72);
                  e = !0;
                  break;
                case 37:
                case 63232:
                  a.railh && (g ? a.doScrollLeft(0) : a.doScrollLeftBy(72),
                    e = !0);
                  break;
                case 39:
                case 63234:
                  a.railh && (g ? a.doScrollLeft(a.page.maxw) : a.doScrollLeftBy(-72), e = !0);
                  break;
                case 33:
                case 63276:
                  a.doScrollBy(a.view.h);
                  e = !0;
                  break;
                case 34:
                case 63277:
                  a.doScrollBy(-a.view.h);
                  e = !0;
                  break;
                case 36:
                case 63273:
                  a.railh && g ? a.doScrollPos(0, 0) : a.doScrollTo(0);
                  e = !0;
                  break;
                case 35:
                case 63275:
                  a.railh && g ? a.doScrollPos(a.page.maxw, a.page.maxh) : a.doScrollTo(a.page.maxh);
                  e = !0;
                  break;
                case 32:
                  a.opt.spacebarenabled && (d ? a.doScrollBy(a.view.h) : a.doScrollBy(-a.view.h), e = !0);
                  break;
                case 27:
                  a.zoomactive &&
                    (a.doZoom(), e = !0)
              }
              if (e) return a.cancelEvent(b)
            }
          };
          a.opt.enablekeyboard && a.bind(document, e.isopera && !e.isopera12 ? "keypress" : "keydown", a.onkeypress);
          a.bind(document, "keydown", function(b) {
            b.ctrlKey && (a.wheelprevented = !0)
          });
          a.bind(document, "keyup", function(b) {
            b.ctrlKey || (a.wheelprevented = !1)
          });
          a.bind(window, "blur", function(b) {
            a.wheelprevented = !1
          });
          a.bind(window, "resize", a.lazyResize);
          a.bind(window, "orientationchange", a.lazyResize);
          a.bind(window, "load", a.lazyResize);
          if (e.ischrome && !a.ispage && !a.haswrapper) {
            var t =
              a.win.attr("style"),
              m = parseFloat(a.win.css("width")) + 1;
            a.win.css("width", m);
            a.synched("chromefix", function() {
              a.win.attr("style", t)
            })
          }
          a.onAttributeChange = function(b) {
            a.lazyResize(a.isieold ? 250 : 30)
          };
          a.isie11 || !1 === x || (a.observerbody = new x(function(b) {
              b.forEach(function(b) {
                if ("attributes" == b.type) return f("body").hasClass("modal-open") && f("body").hasClass("modal-dialog") && !f.contains(f(".modal-dialog")[0], a.doc[0]) ? a.hide() : a.show()
              });
              if (document.body.scrollHeight != a.page.maxh) return a.lazyResize(30)
            }),
            a.observerbody.observe(document.body, {
              childList: !0,
              subtree: !0,
              characterData: !1,
              attributes: !0,
              attributeFilter: ["class"]
            }));
          a.ispage || a.haswrapper || (!1 !== x ? (a.observer = new x(function(b) {
            b.forEach(a.onAttributeChange)
          }), a.observer.observe(a.win[0], {
            childList: !0,
            characterData: !1,
            attributes: !0,
            subtree: !1
          }), a.observerremover = new x(function(b) {
            b.forEach(function(b) {
              if (0 < b.removedNodes.length)
                for (var c in b.removedNodes)
                  if (a && b.removedNodes[c] == a.win[0]) return a.remove()
            })
          }), a.observerremover.observe(a.win[0].parentNode, {
            childList: !0,
            characterData: !1,
            attributes: !1,
            subtree: !1
          })) : (a.bind(a.win, e.isie && !e.isie9 ? "propertychange" : "DOMAttrModified", a.onAttributeChange), e.isie9 && a.win[0].attachEvent("onpropertychange", a.onAttributeChange), a.bind(a.win, "DOMNodeRemoved", function(b) {
            b.target == a.win[0] && a.remove()
          })));
          !a.ispage && a.opt.boxzoom && a.bind(window, "resize", a.resizeZoom);
          a.istextarea && (a.bind(a.win, "keydown", a.lazyResize), a.bind(a.win, "mouseup", a.lazyResize));
          a.lazyResize(30)
        }
        if ("IFRAME" == this.doc[0].nodeName) {
          var N =
            function() {
              a.iframexd = !1;
              var c;
              try {
                c = "contentDocument" in this ? this.contentDocument : this.contentWindow.document
              } catch (g) {
                a.iframexd = !0, c = !1
              }
              if (a.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;
              a.forcescreen = !0;
              a.isiframe && (a.iframe = {
                doc: f(c),
                html: a.doc.contents().find("html")[0],
                body: a.doc.contents().find("body")[0]
              }, a.getContentSize = function() {
                return {
                  w: Math.max(a.iframe.html.scrollWidth, a.iframe.body.scrollWidth),
                  h: Math.max(a.iframe.html.scrollHeight,
                    a.iframe.body.scrollHeight)
                }
              }, a.docscroll = f(a.iframe.body));
              if (!e.isios && a.opt.iframeautoresize && !a.isiframe) {
                a.win.scrollTop(0);
                a.doc.height("");
                var d = Math.max(c.getElementsByTagName("html")[0].scrollHeight, c.body.scrollHeight);
                a.doc.height(d)
              }
              a.lazyResize(30);
              e.isie7 && a.css(f(a.iframe.html), b);
              a.css(f(a.iframe.body), b);
              e.isios && a.haswrapper && a.css(f(c.body), {
                "-webkit-transform": "translate3d(0,0,0)"
              });
              "contentWindow" in this ? a.bind(this.contentWindow, "scroll", a.onscroll) : a.bind(c, "scroll", a.onscroll);
              a.opt.enablemousewheel && a.mousewheel(c, a.onmousewheel);
              a.opt.enablekeyboard && a.bind(c, e.isopera ? "keypress" : "keydown", a.onkeypress);
              if (e.cantouch || a.opt.touchbehavior) a.bind(c, "mousedown", a.ontouchstart), a.bind(c, "mousemove", function(b) {
                return a.ontouchmove(b, !0)
              }), a.opt.grabcursorenabled && e.cursorgrabvalue && a.css(f(c.body), {
                cursor: e.cursorgrabvalue
              });
              a.bind(c, "mouseup", a.ontouchend);
              a.zoom && (a.opt.dblclickzoom && a.bind(c, "dblclick", a.doZoom), a.ongesturezoom && a.bind(c, "gestureend", a.ongesturezoom))
            };
          this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
            N.call(a.doc[0], !1)
          }, 500);
          a.bind(this.doc, "load", N)
        }
      };
      this.showCursor = function(b, c) {
        a.cursortimeout && (clearTimeout(a.cursortimeout), a.cursortimeout = 0);
        if (a.rail) {
          a.autohidedom && (a.autohidedom.stop().css({
            opacity: a.opt.cursoropacitymax
          }), a.cursoractive = !0);
          a.rail.drag && 1 == a.rail.drag.pt || (void 0 !== b && !1 !== b && (a.scroll.y = Math.round(1 * b / a.scrollratio.y)), void 0 !== c && (a.scroll.x = Math.round(1 * c / a.scrollratio.x)));
          a.cursor.css({
            height: a.cursorheight,
            top: a.scroll.y
          });
          if (a.cursorh) {
            var d = a.hasreversehr ? a.scrollvaluemaxw - a.scroll.x : a.scroll.x;
            !a.rail.align && a.rail.visibility ? a.cursorh.css({
              width: a.cursorwidth,
              left: d + a.rail.width
            }) : a.cursorh.css({
              width: a.cursorwidth,
              left: d
            });
            a.cursoractive = !0
          }
          a.zoom && a.zoom.stop().css({
            opacity: a.opt.cursoropacitymax
          })
        }
      };
      this.hideCursor = function(b) {
        a.cursortimeout || !a.rail || !a.autohidedom || a.hasmousefocus && "leave" == a.opt.autohidemode || (a.cursortimeout = setTimeout(function() {
          a.rail.active && a.showonmouseevent || (a.autohidedom.stop().animate({
              opacity: a.opt.cursoropacitymin
            }),
            a.zoom && a.zoom.stop().animate({
              opacity: a.opt.cursoropacitymin
            }), a.cursoractive = !1);
          a.cursortimeout = 0
        }, b || a.opt.hidecursordelay))
      };
      this.noticeCursor = function(b, c, d) {
        a.showCursor(c, d);
        a.rail.active || a.hideCursor(b)
      };
      this.getContentSize = a.ispage ? function() {
        return {
          w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
          h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }
      } : a.haswrapper ? function() {
        return {
          w: a.doc.outerWidth() + parseInt(a.win.css("paddingLeft")) +
            parseInt(a.win.css("paddingRight")),
          h: a.doc.outerHeight() + parseInt(a.win.css("paddingTop")) + parseInt(a.win.css("paddingBottom"))
        }
      } : function() {
        return {
          w: a.docscroll[0].scrollWidth,
          h: a.docscroll[0].scrollHeight
        }
      };
      this.onResize = function(b, c) {
        if (!a || !a.win) return !1;
        if (!a.haswrapper && !a.ispage) {
          if ("none" == a.win.css("display")) return a.visibility && a.hideRail().hideRailHr(), !1;
          a.hidden || a.visibility || a.showRail().showRailHr()
        }
        var d = a.page.maxh,
          e = a.page.maxw,
          f = a.view.h,
          k = a.view.w;
        a.view = {
          w: a.ispage ? a.win.width() : parseInt(a.win[0].clientWidth),
          h: a.ispage ? a.win.height() : parseInt(a.win[0].clientHeight)
        };
        a.page = c ? c : a.getContentSize();
        a.page.maxh = Math.max(0, a.page.h - a.view.h);
        a.page.maxw = Math.max(0, a.page.w - a.view.w);
        if (a.page.maxh == d && a.page.maxw == e && a.view.w == k && a.view.h == f) {
          if (a.ispage) return a;
          d = a.win.offset();
          if (a.lastposition && (e = a.lastposition, e.top == d.top && e.left == d.left)) return a;
          a.lastposition = d
        }
        0 == a.page.maxh ? (a.hideRail(), a.scrollvaluemax = 0, a.scroll.y = 0, a.scrollratio.y = 0, a.cursorheight = 0, a.setScrollTop(0),
          a.rail && (a.rail.scrollable = !1)) : (a.page.maxh -= a.opt.railpadding.top + a.opt.railpadding.bottom, a.rail.scrollable = !0);
        0 == a.page.maxw ? (a.hideRailHr(), a.scrollvaluemaxw = 0, a.scroll.x = 0, a.scrollratio.x = 0, a.cursorwidth = 0, a.setScrollLeft(0), a.railh && (a.railh.scrollable = !1)) : (a.page.maxw -= a.opt.railpadding.left + a.opt.railpadding.right, a.railh && (a.railh.scrollable = a.opt.horizrailenabled));
        a.railslocked = a.locked || 0 == a.page.maxh && 0 == a.page.maxw;
        if (a.railslocked) return a.ispage || a.updateScrollBar(a.view), !1;
        a.hidden ||
          a.visibility ? !a.railh || a.hidden || a.railh.visibility || a.showRailHr() : a.showRail().showRailHr();
        a.istextarea && a.win.css("resize") && "none" != a.win.css("resize") && (a.view.h -= 20);
        a.cursorheight = Math.min(a.view.h, Math.round(a.view.h / a.page.h * a.view.h));
        a.cursorheight = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorheight);
        a.cursorwidth = Math.min(a.view.w, Math.round(a.view.w / a.page.w * a.view.w));
        a.cursorwidth = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight,
          a.cursorwidth);
        a.scrollvaluemax = a.view.h - a.cursorheight - a.cursor.hborder - (a.opt.railpadding.top + a.opt.railpadding.bottom);
        a.railh && (a.railh.width = 0 < a.page.maxh ? a.view.w - a.rail.width : a.view.w, a.scrollvaluemaxw = a.railh.width - a.cursorwidth - a.cursorh.wborder - (a.opt.railpadding.left + a.opt.railpadding.right));
        a.ispage || a.updateScrollBar(a.view);
        a.scrollratio = {
          x: a.page.maxw / a.scrollvaluemaxw,
          y: a.page.maxh / a.scrollvaluemax
        };
        a.getScrollTop() > a.page.maxh ? a.doScrollTop(a.page.maxh) : (a.scroll.y = Math.round(a.getScrollTop() *
          (1 / a.scrollratio.y)), a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)), a.cursoractive && a.noticeCursor());
        a.scroll.y && 0 == a.getScrollTop() && a.doScrollTo(Math.floor(a.scroll.y * a.scrollratio.y));
        return a
      };
      this.resize = a.onResize;
      this.hlazyresize = 0;
      this.lazyResize = function(b) {
        a.haswrapper || a.hide();
        a.hlazyresize && clearTimeout(a.hlazyresize);
        a.hlazyresize = setTimeout(function() {
          a && a.show().resize()
        }, 240);
        return a
      };
      this.jqbind = function(b, c, d) {
        a.events.push({
          e: b,
          n: c,
          f: d,
          q: !0
        });
        f(b).bind(c, d)
      };
      this.mousewheel =
        function(b, c, d) {
          b = "jquery" in b ? b[0] : b;
          if ("onwheel" in document.createElement("div")) a._bind(b, "wheel", c, d || !1);
          else {
            var e = void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
            q(b, e, c, d || !1);
            "DOMMouseScroll" == e && q(b, "MozMousePixelScroll", c, d || !1)
          }
        };
      e.haseventlistener ? (this.bind = function(b, c, d, e) {
        a._bind("jquery" in b ? b[0] : b, c, d, e || !1)
      }, this._bind = function(b, c, d, e) {
        a.events.push({
          e: b,
          n: c,
          f: d,
          b: e,
          q: !1
        });
        b.addEventListener(c, d, e || !1)
      }, this.cancelEvent = function(a) {
        if (!a) return !1;
        a = a.original ? a.original :
          a;
        a.cancelable && a.preventDefault();
        a.stopPropagation();
        a.preventManipulation && a.preventManipulation();
        return !1
      }, this.stopPropagation = function(a) {
        if (!a) return !1;
        a = a.original ? a.original : a;
        a.stopPropagation();
        return !1
      }, this._unbind = function(a, c, d, e) {
        a.removeEventListener(c, d, e)
      }) : (this.bind = function(b, c, d, e) {
        var f = "jquery" in b ? b[0] : b;
        a._bind(f, c, function(b) {
          (b = b || window.event || !1) && b.srcElement && (b.target = b.srcElement);
          "pageY" in b || (b.pageX = b.clientX + document.documentElement.scrollLeft, b.pageY = b.clientY +
            document.documentElement.scrollTop);
          return !1 === d.call(f, b) || !1 === e ? a.cancelEvent(b) : !0
        })
      }, this._bind = function(b, c, d, e) {
        a.events.push({
          e: b,
          n: c,
          f: d,
          b: e,
          q: !1
        });
        b.attachEvent ? b.attachEvent("on" + c, d) : b["on" + c] = d
      }, this.cancelEvent = function(a) {
        a = window.event || !1;
        if (!a) return !1;
        a.cancelBubble = !0;
        a.cancel = !0;
        return a.returnValue = !1
      }, this.stopPropagation = function(a) {
        a = window.event || !1;
        if (!a) return !1;
        a.cancelBubble = !0;
        return !1
      }, this._unbind = function(a, c, d, e) {
        a.detachEvent ? a.detachEvent("on" + c, d) : a["on" + c] = !1
      });
      this.unbindAll = function() {
        for (var b = 0; b < a.events.length; b++) {
          var c = a.events[b];
          c.q ? c.e.unbind(c.n, c.f) : a._unbind(c.e, c.n, c.f, c.b)
        }
      };
      this.showRail = function() {
        0 == a.page.maxh || !a.ispage && "none" == a.win.css("display") || (a.visibility = !0, a.rail.visibility = !0, a.rail.css("display", "block"));
        return a
      };
      this.showRailHr = function() {
        if (!a.railh) return a;
        0 == a.page.maxw || !a.ispage && "none" == a.win.css("display") || (a.railh.visibility = !0, a.railh.css("display", "block"));
        return a
      };
      this.hideRail = function() {
        a.visibility = !1;
        a.rail.visibility = !1;
        a.rail.css("display", "none");
        return a
      };
      this.hideRailHr = function() {
        if (!a.railh) return a;
        a.railh.visibility = !1;
        a.railh.css("display", "none");
        return a
      };
      this.show = function() {
        a.hidden = !1;
        a.railslocked = !1;
        return a.showRail().showRailHr()
      };
      this.hide = function() {
        a.hidden = !0;
        a.railslocked = !0;
        return a.hideRail().hideRailHr()
      };
      this.toggle = function() {
        return a.hidden ? a.show() : a.hide()
      };
      this.remove = function() {
        a.stop();
        a.cursortimeout && clearTimeout(a.cursortimeout);
        for (var b in a.delaylist) a.delaylist[b] &&
          w(a.delaylist[b].h);
        a.doZoomOut();
        a.unbindAll();
        e.isie9 && a.win[0].detachEvent("onpropertychange", a.onAttributeChange);
        !1 !== a.observer && a.observer.disconnect();
        !1 !== a.observerremover && a.observerremover.disconnect();
        !1 !== a.observerbody && a.observerbody.disconnect();
        a.events = null;
        a.cursor && a.cursor.remove();
        a.cursorh && a.cursorh.remove();
        a.rail && a.rail.remove();
        a.railh && a.railh.remove();
        a.zoom && a.zoom.remove();
        for (b = 0; b < a.saved.css.length; b++) {
          var c = a.saved.css[b];
          c[0].css(c[1], void 0 === c[2] ? "" : c[2])
        }
        a.saved = !1;
        a.me.data("__nicescroll", "");
        var d = f.nicescroll;
        d.each(function(b) {
          if (this && this.id === a.id) {
            delete d[b];
            for (var c = ++b; c < d.length; c++, b++) d[b] = d[c];
            d.length--;
            d.length && delete d[d.length]
          }
        });
        for (var k in a) a[k] = null, delete a[k];
        a = null
      };
      this.scrollstart = function(b) {
        this.onscrollstart = b;
        return a
      };
      this.scrollend = function(b) {
        this.onscrollend = b;
        return a
      };
      this.scrollcancel = function(b) {
        this.onscrollcancel = b;
        return a
      };
      this.zoomin = function(b) {
        this.onzoomin = b;
        return a
      };
      this.zoomout = function(b) {
        this.onzoomout =
          b;
        return a
      };
      this.isScrollable = function(a) {
        a = a.target ? a.target : a;
        if ("OPTION" == a.nodeName) return !0;
        for (; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
          var c = f(a),
            c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
          if (/scroll|auto/.test(c)) return a.clientHeight != a.scrollHeight;
          a = a.parentNode ? a.parentNode : !1
        }
        return !1
      };
      this.getViewport = function(a) {
        for (a = a && a.parentNode ? a.parentNode : !1; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
          var c = f(a);
          if (/fixed|absolute/.test(c.css("position"))) return c;
          var d = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
          if (/scroll|auto/.test(d) && a.clientHeight != a.scrollHeight || 0 < c.getNiceScroll().length) return c;
          a = a.parentNode ? a.parentNode : !1
        }
        return !1
      };
      this.triggerScrollEnd = function() {
        if (a.onscrollend) {
          var b = a.getScrollLeft(),
            c = a.getScrollTop();
          a.onscrollend.call(a, {
            type: "scrollend",
            current: {
              x: b,
              y: c
            },
            end: {
              x: b,
              y: c
            }
          })
        }
      };
      this.onmousewheel = function(b) {
        if (!a.wheelprevented) {
          if (a.railslocked) return a.debounced("checkunlock", a.resize, 250), !0;
          if (a.rail.drag) return a.cancelEvent(b);
          "auto" == a.opt.oneaxismousemode && 0 != b.deltaX && (a.opt.oneaxismousemode = !1);
          if (a.opt.oneaxismousemode && 0 == b.deltaX && !a.rail.scrollable) return a.railh && a.railh.scrollable ? a.onmousewheelhr(b) : !0;
          var c = +new Date,
            d = !1;
          a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
          a.checkarea = c;
          if (a.nativescrollingarea) return !0;
          if (b = t(b, !1, d)) a.checkarea = 0;
          return b
        }
      };
      this.onmousewheelhr = function(b) {
        if (!a.wheelprevented) {
          if (a.railslocked || !a.railh.scrollable) return !0;
          if (a.rail.drag) return a.cancelEvent(b);
          var c = +new Date,
            d = !1;
          a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
          a.checkarea = c;
          return a.nativescrollingarea ? !0 : a.railslocked ? a.cancelEvent(b) : t(b, !0, d)
        }
      };
      this.stop = function() {
        a.cancelScroll();
        a.scrollmon && a.scrollmon.stop();
        a.cursorfreezed = !1;
        a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
        a.noticeCursor();
        return a
      };
      this.getTransitionSpeed = function(b) {
        b = Math.min(Math.round(10 * a.opt.scrollspeed), Math.round(b / 20 * a.opt.scrollspeed));
        return 20 <
          b ? b : 0
      };
      a.opt.smoothscroll ? a.ishwscroll && e.hastransition && a.opt.usetransition && a.opt.smoothscroll ? (this.prepareTransition = function(b, c) {
          var d = c ? 20 < b ? b : 0 : a.getTransitionSpeed(b),
            f = d ? e.prefixstyle + "transform " + d + "ms ease-out" : "";
          a.lasttransitionstyle && a.lasttransitionstyle == f || (a.lasttransitionstyle = f, a.doc.css(e.transitionstyle, f));
          return d
        }, this.doScrollLeft = function(b, c) {
          var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
          a.doScrollPos(b, d, c)
        }, this.doScrollTop = function(b, c) {
          var d = a.scrollrunning ?
            a.newscrollx : a.getScrollLeft();
          a.doScrollPos(d, b, c)
        }, this.doScrollPos = function(b, c, d) {
          var f = a.getScrollTop(),
            k = a.getScrollLeft();
          (0 > (a.newscrolly - f) * (c - f) || 0 > (a.newscrollx - k) * (b - k)) && a.cancelScroll();
          0 == a.opt.bouncescroll && (0 > c ? c = 0 : c > a.page.maxh && (c = a.page.maxh), 0 > b ? b = 0 : b > a.page.maxw && (b = a.page.maxw));
          if (a.scrollrunning && b == a.newscrollx && c == a.newscrolly) return !1;
          a.newscrolly = c;
          a.newscrollx = b;
          a.newscrollspeed = d || !1;
          if (a.timer) return !1;
          a.timer = setTimeout(function() {
            var d = a.getScrollTop(),
              f = a.getScrollLeft(),
              k = Math.round(Math.sqrt(Math.pow(b - f, 2) + Math.pow(c - d, 2))),
              k = a.newscrollspeed && 1 < a.newscrollspeed ? a.newscrollspeed : a.getTransitionSpeed(k);
            a.newscrollspeed && 1 >= a.newscrollspeed && (k *= a.newscrollspeed);
            a.prepareTransition(k, !0);
            a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
            0 < k && (!a.scrollrunning && a.onscrollstart && a.onscrollstart.call(a, {
              type: "scrollstart",
              current: {
                x: f,
                y: d
              },
              request: {
                x: b,
                y: c
              },
              end: {
                x: a.newscrollx,
                y: a.newscrolly
              },
              speed: k
            }), e.transitionend ? a.scrollendtrapped || (a.scrollendtrapped = !0, a.bind(a.doc, e.transitionend, a.onScrollTransitionEnd, !1)) : (a.scrollendtrapped && clearTimeout(a.scrollendtrapped), a.scrollendtrapped = setTimeout(a.onScrollTransitionEnd, k)), a.timerscroll = {
              bz: new D(d, a.newscrolly, k, 0, 0, .58, 1),
              bh: new D(f, a.newscrollx, k, 0, 0, .58, 1)
            }, a.cursorfreezed || (a.timerscroll.tm = setInterval(function() {
              a.showCursor(a.getScrollTop(), a.getScrollLeft())
            }, 60)));
            a.synched("doScroll-set", function() {
              a.timer = 0;
              a.scrollendtrapped && (a.scrollrunning = !0);
              a.setScrollTop(a.newscrolly);
              a.setScrollLeft(a.newscrollx);
              if (!a.scrollendtrapped) a.onScrollTransitionEnd()
            })
          }, 50)
        }, this.cancelScroll = function() {
          if (!a.scrollendtrapped) return !0;
          var b = a.getScrollTop(),
            c = a.getScrollLeft();
          a.scrollrunning = !1;
          e.transitionend || clearTimeout(e.transitionend);
          a.scrollendtrapped = !1;
          a._unbind(a.doc[0], e.transitionend, a.onScrollTransitionEnd);
          a.prepareTransition(0);
          a.setScrollTop(b);
          a.railh && a.setScrollLeft(c);
          a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
          a.timerscroll = !1;
          a.cursorfreezed = !1;
          a.showCursor(b, c);
          return a
        },
        this.onScrollTransitionEnd = function() {
          a.scrollendtrapped && a._unbind(a.doc[0], e.transitionend, a.onScrollTransitionEnd);
          a.scrollendtrapped = !1;
          a.prepareTransition(0);
          a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
          a.timerscroll = !1;
          var b = a.getScrollTop(),
            c = a.getScrollLeft();
          a.setScrollTop(b);
          a.railh && a.setScrollLeft(c);
          a.noticeCursor(!1, b, c);
          a.cursorfreezed = !1;
          0 > b ? b = 0 : b > a.page.maxh && (b = a.page.maxh);
          0 > c ? c = 0 : c > a.page.maxw && (c = a.page.maxw);
          if (b != a.newscrolly || c != a.newscrollx) return a.doScrollPos(c,
            b, a.opt.snapbackspeed);
          a.onscrollend && a.scrollrunning && a.triggerScrollEnd();
          a.scrollrunning = !1
        }) : (this.doScrollLeft = function(b, c) {
        var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
        a.doScrollPos(b, d, c)
      }, this.doScrollTop = function(b, c) {
        var d = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
        a.doScrollPos(d, b, c)
      }, this.doScrollPos = function(b, c, d) {
        function e() {
          if (a.cancelAnimationFrame) return !0;
          a.scrollrunning = !0;
          if (p = 1 - p) return a.timer = v(e) || 1;
          var b = 0,
            c, d, f = d = a.getScrollTop();
          if (a.dst.ay) {
            f = a.bzscroll ?
              a.dst.py + a.bzscroll.getNow() * a.dst.ay : a.newscrolly;
            c = f - d;
            if (0 > c && f < a.newscrolly || 0 < c && f > a.newscrolly) f = a.newscrolly;
            a.setScrollTop(f);
            f == a.newscrolly && (b = 1)
          } else b = 1;
          d = c = a.getScrollLeft();
          if (a.dst.ax) {
            d = a.bzscroll ? a.dst.px + a.bzscroll.getNow() * a.dst.ax : a.newscrollx;
            c = d - c;
            if (0 > c && d < a.newscrollx || 0 < c && d > a.newscrollx) d = a.newscrollx;
            a.setScrollLeft(d);
            d == a.newscrollx && (b += 1)
          } else b += 1;
          2 == b ? (a.timer = 0, a.cursorfreezed = !1, a.bzscroll = !1, a.scrollrunning = !1, 0 > f ? f = 0 : f > a.page.maxh && (f = Math.max(0, a.page.maxh)),
            0 > d ? d = 0 : d > a.page.maxw && (d = a.page.maxw), d != a.newscrollx || f != a.newscrolly ? a.doScrollPos(d, f) : a.onscrollend && a.triggerScrollEnd()) : a.timer = v(e) || 1
        }
        c = void 0 === c || !1 === c ? a.getScrollTop(!0) : c;
        if (a.timer && a.newscrolly == c && a.newscrollx == b) return !0;
        a.timer && w(a.timer);
        a.timer = 0;
        var f = a.getScrollTop(),
          k = a.getScrollLeft();
        (0 > (a.newscrolly - f) * (c - f) || 0 > (a.newscrollx - k) * (b - k)) && a.cancelScroll();
        a.newscrolly = c;
        a.newscrollx = b;
        a.bouncescroll && a.rail.visibility || (0 > a.newscrolly ? a.newscrolly = 0 : a.newscrolly > a.page.maxh &&
          (a.newscrolly = a.page.maxh));
        a.bouncescroll && a.railh.visibility || (0 > a.newscrollx ? a.newscrollx = 0 : a.newscrollx > a.page.maxw && (a.newscrollx = a.page.maxw));
        a.dst = {};
        a.dst.x = b - k;
        a.dst.y = c - f;
        a.dst.px = k;
        a.dst.py = f;
        var h = Math.round(Math.sqrt(Math.pow(a.dst.x, 2) + Math.pow(a.dst.y, 2)));
        a.dst.ax = a.dst.x / h;
        a.dst.ay = a.dst.y / h;
        var l = 0,
          n = h;
        0 == a.dst.x ? (l = f, n = c, a.dst.ay = 1, a.dst.py = 0) : 0 == a.dst.y && (l = k, n = b, a.dst.ax = 1, a.dst.px = 0);
        h = a.getTransitionSpeed(h);
        d && 1 >= d && (h *= d);
        a.bzscroll = 0 < h ? a.bzscroll ? a.bzscroll.update(n, h) :
          new D(l, n, h, 0, 1, 0, 1) : !1;
        if (!a.timer) {
          (f == a.page.maxh && c >= a.page.maxh || k == a.page.maxw && b >= a.page.maxw) && a.checkContentSize();
          var p = 1;
          a.cancelAnimationFrame = !1;
          a.timer = 1;
          a.onscrollstart && !a.scrollrunning && a.onscrollstart.call(a, {
            type: "scrollstart",
            current: {
              x: k,
              y: f
            },
            request: {
              x: b,
              y: c
            },
            end: {
              x: a.newscrollx,
              y: a.newscrolly
            },
            speed: h
          });
          e();
          (f == a.page.maxh && c >= f || k == a.page.maxw && b >= k) && a.checkContentSize();
          a.noticeCursor()
        }
      }, this.cancelScroll = function() {
        a.timer && w(a.timer);
        a.timer = 0;
        a.bzscroll = !1;
        a.scrollrunning = !1;
        return a
      }) : (this.doScrollLeft = function(b, c) {
        var d = a.getScrollTop();
        a.doScrollPos(b, d, c)
      }, this.doScrollTop = function(b, c) {
        var d = a.getScrollLeft();
        a.doScrollPos(d, b, c)
      }, this.doScrollPos = function(b, c, d) {
        var e = b > a.page.maxw ? a.page.maxw : b;
        0 > e && (e = 0);
        var f = c > a.page.maxh ? a.page.maxh : c;
        0 > f && (f = 0);
        a.synched("scroll", function() {
          a.setScrollTop(f);
          a.setScrollLeft(e)
        })
      }, this.cancelScroll = function() {});
      this.doScrollBy = function(b, c) {
        var d = 0,
          d = c ? Math.floor((a.scroll.y - b) * a.scrollratio.y) : (a.timer ? a.newscrolly :
            a.getScrollTop(!0)) - b;
        if (a.bouncescroll) {
          var e = Math.round(a.view.h / 2);
          d < -e ? d = -e : d > a.page.maxh + e && (d = a.page.maxh + e)
        }
        a.cursorfreezed = !1;
        e = a.getScrollTop(!0);
        if (0 > d && 0 >= e) return a.noticeCursor();
        if (d > a.page.maxh && e >= a.page.maxh) return a.checkContentSize(), a.noticeCursor();
        a.doScrollTop(d)
      };
      this.doScrollLeftBy = function(b, c) {
        var d = 0,
          d = c ? Math.floor((a.scroll.x - b) * a.scrollratio.x) : (a.timer ? a.newscrollx : a.getScrollLeft(!0)) - b;
        if (a.bouncescroll) {
          var e = Math.round(a.view.w / 2);
          d < -e ? d = -e : d > a.page.maxw + e && (d = a.page.maxw +
            e)
        }
        a.cursorfreezed = !1;
        e = a.getScrollLeft(!0);
        if (0 > d && 0 >= e || d > a.page.maxw && e >= a.page.maxw) return a.noticeCursor();
        a.doScrollLeft(d)
      };
      this.doScrollTo = function(b, c) {
        a.cursorfreezed = !1;
        a.doScrollTop(b)
      };
      this.checkContentSize = function() {
        var b = a.getContentSize();
        b.h == a.page.h && b.w == a.page.w || a.resize(!1, b)
      };
      a.onscroll = function(b) {
        a.rail.drag || a.cursorfreezed || a.synched("scroll", function() {
          a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
          a.railh && (a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)));
          a.noticeCursor()
        })
      };
      a.bind(a.docscroll, "scroll", a.onscroll);
      this.doZoomIn = function(b) {
        if (!a.zoomactive) {
          a.zoomactive = !0;
          a.zoomrestore = {
            style: {}
          };
          var c = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
            d = a.win[0].style,
            k;
          for (k in c) {
            var h = c[k];
            a.zoomrestore.style[h] = void 0 !== d[h] ? d[h] : ""
          }
          a.zoomrestore.style.width = a.win.css("width");
          a.zoomrestore.style.height = a.win.css("height");
          a.zoomrestore.padding = {
            w: a.win.outerWidth() - a.win.width(),
            h: a.win.outerHeight() -
              a.win.height()
          };
          e.isios4 && (a.zoomrestore.scrollTop = f(window).scrollTop(), f(window).scrollTop(0));
          a.win.css({
            position: e.isios4 ? "absolute" : "fixed",
            top: 0,
            left: 0,
            zIndex: A + 100,
            margin: 0
          });
          c = a.win.css("backgroundColor");
          ("" == c || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(c)) && a.win.css("backgroundColor", "#fff");
          a.rail.css({
            zIndex: A + 101
          });
          a.zoom.css({
            zIndex: A + 102
          });
          a.zoom.css("backgroundPosition", "0px -18px");
          a.resizeZoom();
          a.onzoomin && a.onzoomin.call(a);
          return a.cancelEvent(b)
        }
      };
      this.doZoomOut =
        function(b) {
          if (a.zoomactive) return a.zoomactive = !1, a.win.css("margin", ""), a.win.css(a.zoomrestore.style), e.isios4 && f(window).scrollTop(a.zoomrestore.scrollTop), a.rail.css({
            "z-index": a.zindex
          }), a.zoom.css({
            "z-index": a.zindex
          }), a.zoomrestore = !1, a.zoom.css("backgroundPosition", "0px 0px"), a.onResize(), a.onzoomout && a.onzoomout.call(a), a.cancelEvent(b)
        };
      this.doZoom = function(b) {
        return a.zoomactive ? a.doZoomOut(b) : a.doZoomIn(b)
      };
      this.resizeZoom = function() {
        if (a.zoomactive) {
          var b = a.getScrollTop();
          a.win.css({
            width: f(window).width() -
              a.zoomrestore.padding.w + "px",
            height: f(window).height() - a.zoomrestore.padding.h + "px"
          });
          a.onResize();
          a.setScrollTop(Math.min(a.page.maxh, b))
        }
      };
      this.init();
      f.nicescroll.push(this)
    },
    M = function(f) {
      var c = this;
      this.nc = f;
      this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;
      this.snapy = this.snapx = !1;
      this.demuly = this.demulx = 0;
      this.lastscrolly = this.lastscrollx = -1;
      this.timer = this.chky = this.chkx = 0;
      this.time = function() {
        return +new Date
      };
      this.reset = function(f, h) {
        c.stop();
        var d = c.time();
        c.steptime =
          0;
        c.lasttime = d;
        c.speedx = 0;
        c.speedy = 0;
        c.lastx = f;
        c.lasty = h;
        c.lastscrollx = -1;
        c.lastscrolly = -1
      };
      this.update = function(f, h) {
        var d = c.time();
        c.steptime = d - c.lasttime;
        c.lasttime = d;
        var d = h - c.lasty,
          q = f - c.lastx,
          t = c.nc.getScrollTop(),
          a = c.nc.getScrollLeft(),
          t = t + d,
          a = a + q;
        c.snapx = 0 > a || a > c.nc.page.maxw;
        c.snapy = 0 > t || t > c.nc.page.maxh;
        c.speedx = q;
        c.speedy = d;
        c.lastx = f;
        c.lasty = h
      };
      this.stop = function() {
        c.nc.unsynched("domomentum2d");
        c.timer && clearTimeout(c.timer);
        c.timer = 0;
        c.lastscrollx = -1;
        c.lastscrolly = -1
      };
      this.doSnapy = function(f,
        h) {
        var d = !1;
        0 > h ? (h = 0, d = !0) : h > c.nc.page.maxh && (h = c.nc.page.maxh, d = !0);
        0 > f ? (f = 0, d = !0) : f > c.nc.page.maxw && (f = c.nc.page.maxw, d = !0);
        d ? c.nc.doScrollPos(f, h, c.nc.opt.snapbackspeed) : c.nc.triggerScrollEnd()
      };
      this.doMomentum = function(f) {
        var h = c.time(),
          d = f ? h + f : c.lasttime;
        f = c.nc.getScrollLeft();
        var q = c.nc.getScrollTop(),
          t = c.nc.page.maxh,
          a = c.nc.page.maxw;
        c.speedx = 0 < a ? Math.min(60, c.speedx) : 0;
        c.speedy = 0 < t ? Math.min(60, c.speedy) : 0;
        d = d && 60 >= h - d;
        if (0 > q || q > t || 0 > f || f > a) d = !1;
        f = c.speedx && d ? c.speedx : !1;
        if (c.speedy && d && c.speedy ||
          f) {
          var r = Math.max(16, c.steptime);
          50 < r && (f = r / 50, c.speedx *= f, c.speedy *= f, r = 50);
          c.demulxy = 0;
          c.lastscrollx = c.nc.getScrollLeft();
          c.chkx = c.lastscrollx;
          c.lastscrolly = c.nc.getScrollTop();
          c.chky = c.lastscrolly;
          var p = c.lastscrollx,
            e = c.lastscrolly,
            v = function() {
              var d = 600 < c.time() - h ? .04 : .02;
              c.speedx && (p = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy)), c.lastscrollx = p, 0 > p || p > a) && (d = .1);
              c.speedy && (e = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy)), c.lastscrolly = e, 0 > e || e > t) && (d = .1);
              c.demulxy = Math.min(1, c.demulxy +
                d);
              c.nc.synched("domomentum2d", function() {
                c.speedx && (c.nc.getScrollLeft(), c.chkx = p, c.nc.setScrollLeft(p));
                c.speedy && (c.nc.getScrollTop(), c.chky = e, c.nc.setScrollTop(e));
                c.timer || (c.nc.hideCursor(), c.doSnapy(p, e))
              });
              1 > c.demulxy ? c.timer = setTimeout(v, r) : (c.stop(), c.nc.hideCursor(), c.doSnapy(p, e))
            };
          v()
        } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop())
      }
    },
    y = f.fn.scrollTop;
  f.cssHooks.pageYOffset = {
    get: function(h, c, k) {
      return (c = f.data(h, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollTop() : y.call(h)
    },
    set: function(h,
      c) {
      var k = f.data(h, "__nicescroll") || !1;
      k && k.ishwscroll ? k.setScrollTop(parseInt(c)) : y.call(h, c);
      return this
    }
  };
  f.fn.scrollTop = function(h) {
    if (void 0 === h) {
      var c = this[0] ? f.data(this[0], "__nicescroll") || !1 : !1;
      return c && c.ishwscroll ? c.getScrollTop() : y.call(this)
    }
    return this.each(function() {
      var c = f.data(this, "__nicescroll") || !1;
      c && c.ishwscroll ? c.setScrollTop(parseInt(h)) : y.call(f(this), h)
    })
  };
  var z = f.fn.scrollLeft;
  f.cssHooks.pageXOffset = {
    get: function(h, c, k) {
      return (c = f.data(h, "__nicescroll") || !1) && c.ishwscroll ?
        c.getScrollLeft() : z.call(h)
    },
    set: function(h, c) {
      var k = f.data(h, "__nicescroll") || !1;
      k && k.ishwscroll ? k.setScrollLeft(parseInt(c)) : z.call(h, c);
      return this
    }
  };
  f.fn.scrollLeft = function(h) {
    if (void 0 === h) {
      var c = this[0] ? f.data(this[0], "__nicescroll") || !1 : !1;
      return c && c.ishwscroll ? c.getScrollLeft() : z.call(this)
    }
    return this.each(function() {
      var c = f.data(this, "__nicescroll") || !1;
      c && c.ishwscroll ? c.setScrollLeft(parseInt(h)) : z.call(f(this), h)
    })
  };
  var E = function(h) {
    var c = this;
    this.length = 0;
    this.name = "nicescrollarray";
    this.each = function(d) {
      f.each(c, d);
      return c
    };
    this.push = function(d) {
      c[c.length] = d;
      c.length++
    };
    this.eq = function(d) {
      return c[d]
    };
    if (h)
      for (var k = 0; k < h.length; k++) {
        var l = f.data(h[k], "__nicescroll") || !1;
        l && (this[this.length] = l, this.length++)
      }
    return this
  };
  (function(f, c, k) {
    for (var l = 0; l < c.length; l++) k(f, c[l])
  })(E.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function(f, c) {
    f[c] = function() {
      var f = arguments;
      return this.each(function() {
        this[c].apply(this, f)
      })
    }
  });
  f.fn.getNiceScroll =
    function(h) {
      return void 0 === h ? new E(this) : this[h] && f.data(this[h], "__nicescroll") || !1
    };
  f.expr[":"].nicescroll = function(h) {
    return void 0 !== f.data(h, "__nicescroll")
  };
  f.fn.niceScroll = function(h, c) {
    void 0 !== c || "object" != typeof h || "jquery" in h || (c = h, h = !1);
    c = f.extend({}, c);
    var k = new E;
    void 0 === c && (c = {});
    h && (c.doc = f(h), c.win = f(this));
    var l = !("doc" in c);
    l || "win" in c || (c.win = f(this));
    this.each(function() {
      var d = f(this).data("__nicescroll") || !1;
      d || (c.doc = l ? f(this) : c.doc, d = new S(c, f(this)), f(this).data("__nicescroll",
        d));
      k.push(d)
    });
    return 1 == k.length ? k[0] : k
  };
  window.NiceScroll = {
    getjQuery: function() {
      return f
    }
  };
  f.nicescroll || (f.nicescroll = new E, f.nicescroll.options = K)
});

/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.6
------------------------------------------------------------------------- */
! function(e) {
  function t() {
    var e = location.href;
    return hashtag = -1 !== e.indexOf("#prettyPhoto") ? decodeURI(e.substring(e.indexOf("#prettyPhoto") + 1, e.length)) : !1, hashtag && (hashtag = hashtag.replace(/<|>/g, "")), hashtag
  }

  function i() {
    "undefined" != typeof theRel && (location.hash = theRel + "/" + rel_index + "/")
  }

  function p() {
    -1 !== location.href.indexOf("#prettyPhoto") && (location.hash = "prettyPhoto")
  }

  function o(e, t) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var i = "[\\?&]" + e + "=([^&#]*)",
      p = new RegExp(i),
      o = p.exec(t);
    return null == o ? "" : o[1]
  }
  e.prettyPhoto = {
    version: "3.1.6"
  }, e.fn.prettyPhoto = function(a) {
    function s() {
      e(".pp_loaderIcon").hide(), projectedTop = scroll_pos.scrollTop + (I / 2 - f.containerHeight / 2), projectedTop < 0 && (projectedTop = 0), $ppt.fadeTo(settings.animation_speed, 1), $pp_pic_holder.find(".pp_content").animate({
        height: f.contentHeight,
        width: f.contentWidth
      }, settings.animation_speed), $pp_pic_holder.animate({
        top: projectedTop,
        left: j / 2 - f.containerWidth / 2 < 0 ? 0 : j / 2 - f.containerWidth / 2,
        width: f.containerWidth
      }, settings.animation_speed, function() {
        $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(f.height).width(f.width), $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed), isSet && "image" == h(pp_images[set_position]) ? $pp_pic_holder.find(".pp_hoverContainer").show() : $pp_pic_holder.find(".pp_hoverContainer").hide(), settings.allow_expand && (f.resized ? e("a.pp_expand,a.pp_contract").show() : e("a.pp_expand").hide()), !settings.autoplay_slideshow || P || v || e.prettyPhoto.startSlideshow(), settings.changepicturecallback(), v = !0
      }), m(), a.ajaxcallback()
    }

    function n(t) {
      $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden"), $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function() {
        e(".pp_loaderIcon").show(), t()
      })
    }

    function r(t) {
      t > 1 ? e(".pp_nav").show() : e(".pp_nav").hide()
    }

    function l(e, t) {
      if (resized = !1, d(e, t), imageWidth = e, imageHeight = t, (k > j || b > I) && doresize && settings.allow_resize && !$) {
        for (resized = !0, fitting = !1; !fitting;) k > j ? (imageWidth = j - 200, imageHeight = t / e * imageWidth) : b > I ? (imageHeight = I - 200, imageWidth = e / t * imageHeight) : fitting = !0, b = imageHeight, k = imageWidth;
        (k > j || b > I) && l(k, b), d(imageWidth, imageHeight)
      }
      return {
        width: Math.floor(imageWidth),
        height: Math.floor(imageHeight),
        containerHeight: Math.floor(b),
        containerWidth: Math.floor(k) + 2 * settings.horizontal_padding,
        contentHeight: Math.floor(y),
        contentWidth: Math.floor(w),
        resized: resized
      }
    }

    function d(t, i) {
      t = parseFloat(t), i = parseFloat(i), $pp_details = $pp_pic_holder.find(".pp_details"), $pp_details.width(t), detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom")), $pp_details = $pp_details.clone().addClass(settings.theme).width(t).appendTo(e("body")).css({
        position: "absolute",
        top: -1e4
      }), detailsHeight += $pp_details.height(), detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight, $pp_details.remove(), $pp_title = $pp_pic_holder.find(".ppt"), $pp_title.width(t), titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom")), $pp_title = $pp_title.clone().appendTo(e("body")).css({
        position: "absolute",
        top: -1e4
      }), titleHeight += $pp_title.height(), $pp_title.remove(), y = i + detailsHeight, w = t, b = y + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height(), k = t
    }

    function h(e) {
      return e.match(/youtube\.com\/watch/i) || e.match(/youtu\.be/i) ? "youtube" : e.match(/vimeo\.com/i) ? "vimeo" : e.match(/\b.mov\b/i) ? "quicktime" : e.match(/\b.swf\b/i) ? "flash" : e.match(/\biframe=true\b/i) ? "iframe" : e.match(/\bajax=true\b/i) ? "ajax" : e.match(/\bcustom=true\b/i) ? "custom" : "#" == e.substr(0, 1) ? "inline" : "image"
    }

    function c() {
      if (doresize && "undefined" != typeof $pp_pic_holder) {
        if (scroll_pos = _(), contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width(), projectedTop = I / 2 + scroll_pos.scrollTop - contentHeight / 2, projectedTop < 0 && (projectedTop = 0), contentHeight > I) return;
        $pp_pic_holder.css({
          top: projectedTop,
          left: j / 2 + scroll_pos.scrollLeft - contentwidth / 2
        })
      }
    }

    function _() {
      return self.pageYOffset ? {
        scrollTop: self.pageYOffset,
        scrollLeft: self.pageXOffset
      } : document.documentElement && document.documentElement.scrollTop ? {
        scrollTop: document.documentElement.scrollTop,
        scrollLeft: document.documentElement.scrollLeft
      } : document.body ? {
        scrollTop: document.body.scrollTop,
        scrollLeft: document.body.scrollLeft
      } : void 0
    }

    function g() {
      I = e(window).height(), j = e(window).width(), "undefined" != typeof $pp_overlay && $pp_overlay.height(e(document).height()).width(j)
    }

    function m() {
      isSet && settings.overlay_gallery && "image" == h(pp_images[set_position]) ? (itemWidth = 57, navWidth = "facebook" == settings.theme || "pp_default" == settings.theme ? 50 : 30, itemsPerPage = Math.floor((f.containerWidth - 100 - navWidth) / itemWidth), itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length, totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1, 0 == totalPage ? (navWidth = 0, $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide()) : $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show(), galleryWidth = itemsPerPage * itemWidth, fullGalleryWidth = pp_images.length * itemWidth, $pp_gallery.css("margin-left", -(galleryWidth / 2 + navWidth / 2)).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected"), goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage, e.prettyPhoto.changeGalleryPage(goToPage), $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected")) : $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave")
    }

    function u() {
      if (settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href))), settings.markup = settings.markup.replace("{pp_social}", ""), e("body").append(settings.markup), $pp_pic_holder = e(".pp_pic_holder"), $ppt = e(".ppt"), $pp_overlay = e("div.pp_overlay"), isSet && settings.overlay_gallery) {
        currentGalleryPage = 0, toInject = "";
        for (var t = 0; t < pp_images.length; t++) pp_images[t].match(/\b(jpg|jpeg|png|gif)\b/gi) ? (classname = "", img_src = pp_images[t]) : (classname = "default", img_src = ""), toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
        toInject = settings.gallery_markup.replace(/{gallery}/g, toInject), $pp_pic_holder.find("#pp_full_res").after(toInject), $pp_gallery = e(".pp_pic_holder .pp_gallery"), $pp_gallery_li = $pp_gallery.find("li"), $pp_gallery.find(".pp_arrow_next").click(function() {
          return e.prettyPhoto.changeGalleryPage("next"), e.prettyPhoto.stopSlideshow(), !1
        }), $pp_gallery.find(".pp_arrow_previous").click(function() {
          return e.prettyPhoto.changeGalleryPage("previous"), e.prettyPhoto.stopSlideshow(), !1
        }), $pp_pic_holder.find(".pp_content").hover(function() {
          $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn()
        }, function() {
          $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut()
        }), itemWidth = 57, $pp_gallery_li.each(function(t) {
          e(this).find("a").click(function() {
            return e.prettyPhoto.changePage(t), e.prettyPhoto.stopSlideshow(), !1
          })
        })
      }
      settings.slideshow && ($pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>'), $pp_pic_holder.find(".pp_nav .pp_play").click(function() {
        return e.prettyPhoto.startSlideshow(), !1
      })), $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme), $pp_overlay.css({
        opacity: 0,
        height: e(document).height(),
        width: e(window).width()
      }).bind("click", function() {
        settings.modal || e.prettyPhoto.close()
      }), e("a.pp_close").bind("click", function() {
        return e.prettyPhoto.close(), !1
      }), settings.allow_expand && e("a.pp_expand").bind("click", function() {
        return e(this).hasClass("pp_expand") ? (e(this).removeClass("pp_expand").addClass("pp_contract"), doresize = !1) : (e(this).removeClass("pp_contract").addClass("pp_expand"), doresize = !0), n(function() {
          e.prettyPhoto.open()
        }), !1
      }), $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function() {
        return e.prettyPhoto.changePage("previous"), e.prettyPhoto.stopSlideshow(), !1
      }), $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function() {
        return e.prettyPhoto.changePage("next"), e.prettyPhoto.stopSlideshow(), !1
      }), c()
    }
    a = jQuery.extend({
      hook: "rel",
      animation_speed: "fast",
      ajaxcallback: function() {},
      slideshow: 5e3,
      autoplay_slideshow: !1,
      opacity: .8,
      show_title: !0,
      allow_resize: !0,
      allow_expand: !0,
      default_width: 500,
      default_height: 344,
      counter_separator_label: "/",
      theme: "pp_default",
      horizontal_padding: 20,
      hideflash: !1,
      wmode: "opaque",
      autoplay: !0,
      modal: !1,
      deeplinking: !0,
      overlay_gallery: !0,
      overlay_gallery_max: 30,
      keyboard_shortcuts: !0,
      changepicturecallback: function() {},
      callback: function() {},
      ie6_fallback: !0,
      markup: '<div class="pp_pic_holder"> 						<div class="ppt">&nbsp;</div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',
      gallery_markup: '<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',
      image_markup: '<img id="fullResImage" src="{path}" />',
      flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
      quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
      iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
      inline_markup: '<div class="pp_inline">{content}</div>',
      custom_markup: "",
      social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
    }, a);
    var f, v, y, w, b, k, P, x = this,
      $ = !1,
      I = e(window).height(),
      j = e(window).width();
    return doresize = !0, scroll_pos = _(), e(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function() {
      c(), g()
    }), a.keyboard_shortcuts && e(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function(t) {
      if ("undefined" != typeof $pp_pic_holder && $pp_pic_holder.is(":visible")) switch (t.keyCode) {
        case 37:
          e.prettyPhoto.changePage("previous"), t.preventDefault();
          break;
        case 39:
          e.prettyPhoto.changePage("next"), t.preventDefault();
          break;
        case 27:
          settings.modal || e.prettyPhoto.close(), t.preventDefault()
      }
    }), e.prettyPhoto.initialize = function() {
      return settings = a, "pp_default" == settings.theme && (settings.horizontal_padding = 16), theRel = e(this).attr(settings.hook), galleryRegExp = /\[(?:.*)\]/, isSet = galleryRegExp.exec(theRel) ? !0 : !1, pp_images = isSet ? jQuery.map(x, function(t) {
        return -1 != e(t).attr(settings.hook).indexOf(theRel) ? e(t).attr("href") : void 0
      }) : e.makeArray(e(this).attr("href")), pp_titles = isSet ? jQuery.map(x, function(t) {
        return -1 != e(t).attr(settings.hook).indexOf(theRel) ? e(t).find("img").attr("alt") ? e(t).find("img").attr("alt") : "" : void 0
      }) : e.makeArray(e(this).find("img").attr("alt")), pp_descriptions = isSet ? jQuery.map(x, function(t) {
        return -1 != e(t).attr(settings.hook).indexOf(theRel) ? e(t).attr("title") ? e(t).attr("title") : "" : void 0
      }) : e.makeArray(e(this).attr("title")), pp_images.length > settings.overlay_gallery_max && (settings.overlay_gallery = !1), set_position = jQuery.inArray(e(this).attr("href"), pp_images), rel_index = isSet ? set_position : e("a[" + settings.hook + "^='" + theRel + "']").index(e(this)), u(this), settings.allow_resize && e(window).bind("scroll.prettyphoto", function() {
        c()
      }), e.prettyPhoto.open(), !1
    }, e.prettyPhoto.open = function(t) {
      return "undefined" == typeof settings && (settings = a, pp_images = e.makeArray(arguments[0]), pp_titles = e.makeArray(arguments[1] ? arguments[1] : ""), pp_descriptions = e.makeArray(arguments[2] ? arguments[2] : ""), isSet = pp_images.length > 1 ? !0 : !1, set_position = arguments[3] ? arguments[3] : 0, u(t.target)), settings.hideflash && e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden"), r(e(pp_images).size()), e(".pp_loaderIcon").show(), settings.deeplinking && i(), settings.social_tools && (facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href)), $pp_pic_holder.find(".pp_social").html(facebook_like_link)), $ppt.is(":hidden") && $ppt.css("opacity", 0).show(), $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity), $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + e(pp_images).size()), "undefined" != typeof pp_descriptions[set_position] && "" != pp_descriptions[set_position] ? $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position])) : $pp_pic_holder.find(".pp_description").hide(), movie_width = parseFloat(o("width", pp_images[set_position])) ? o("width", pp_images[set_position]) : settings.default_width.toString(), movie_height = parseFloat(o("height", pp_images[set_position])) ? o("height", pp_images[set_position]) : settings.default_height.toString(), $ = !1, -1 != movie_height.indexOf("%") && (movie_height = parseFloat(e(window).height() * parseFloat(movie_height) / 100 - 150), $ = !0), -1 != movie_width.indexOf("%") && (movie_width = parseFloat(e(window).width() * parseFloat(movie_width) / 100 - 150), $ = !0), $pp_pic_holder.fadeIn(function() {
        switch ($ppt.html(settings.show_title && "" != pp_titles[set_position] && "undefined" != typeof pp_titles[set_position] ? unescape(pp_titles[set_position]) : "&nbsp;"), imgPreloader = "", skipInjection = !1, h(pp_images[set_position])) {
          case "image":
            imgPreloader = new Image, nextImage = new Image, isSet && set_position < e(pp_images).size() - 1 && (nextImage.src = pp_images[set_position + 1]), prevImage = new Image, isSet && pp_images[set_position - 1] && (prevImage.src = pp_images[set_position - 1]), $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]), imgPreloader.onload = function() {
              f = l(imgPreloader.width, imgPreloader.height), s()
            }, imgPreloader.onerror = function() {
              alert("Image cannot be loaded. Make sure the path is correct and image exist."), e.prettyPhoto.close()
            }, imgPreloader.src = pp_images[set_position];
            break;
          case "youtube":
            f = l(movie_width, movie_height), movie_id = o("v", pp_images[set_position]), "" == movie_id && (movie_id = pp_images[set_position].split("youtu.be/"), movie_id = movie_id[1], movie_id.indexOf("?") > 0 && (movie_id = movie_id.substr(0, movie_id.indexOf("?"))), movie_id.indexOf("&") > 0 && (movie_id = movie_id.substr(0, movie_id.indexOf("&")))), movie = "https://www.youtube.com/embed/" + movie_id, movie += o("rel", pp_images[set_position]) ? "?rel=" + o("rel", pp_images[set_position]) : "?rel=1", settings.autoplay && (movie += "&autoplay=1"), toInject = settings.iframe_markup.replace(/{width}/g, f.width).replace(/{height}/g, f.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
            break;
          case "vimeo":
            f = l(movie_width, movie_height), movie_id = pp_images[set_position];
            var t = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/,
              i = movie_id.match(t);
            movie = "https://player.vimeo.com/video/" + i[3] + "?title=0&byline=0&portrait=0", settings.autoplay && (movie += "&autoplay=1;"), vimeo_width = f.width + "/embed/?moog_width=" + f.width, toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, f.height).replace(/{path}/g, movie);
            break;
          case "quicktime":
            f = l(movie_width, movie_height), f.height += 15, f.contentHeight += 15, f.containerHeight += 15, toInject = settings.quicktime_markup.replace(/{width}/g, f.width).replace(/{height}/g, f.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
            break;
          case "flash":
            f = l(movie_width, movie_height), flash_vars = pp_images[set_position], flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length), filename = pp_images[set_position], filename = filename.substring(0, filename.indexOf("?")), toInject = settings.flash_markup.replace(/{width}/g, f.width).replace(/{height}/g, f.height).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
            break;
          case "iframe":
            f = l(movie_width, movie_height), frame_url = pp_images[set_position], frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1), toInject = settings.iframe_markup.replace(/{width}/g, f.width).replace(/{height}/g, f.height).replace(/{path}/g, frame_url);
            break;
          case "ajax":
            doresize = !1, f = l(movie_width, movie_height), doresize = !0, skipInjection = !0, e.get(pp_images[set_position], function(e) {
              toInject = settings.inline_markup.replace(/{content}/g, e), $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject, s()
            });
            break;
          case "custom":
            f = l(movie_width, movie_height), toInject = settings.custom_markup;
            break;
          case "inline":
            myClone = e(pp_images[set_position]).clone().append('<br clear="all" />').css({
              width: settings.default_width
            }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(e("body")).show(), doresize = !1, f = l(e(myClone).width(), e(myClone).height()), doresize = !0, e(myClone).remove(), toInject = settings.inline_markup.replace(/{content}/g, e(pp_images[set_position]).html())
        }
        imgPreloader || skipInjection || ($pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject, s())
      }), !1
    }, e.prettyPhoto.changePage = function(t) {
      currentGalleryPage = 0, "previous" == t ? (set_position--, set_position < 0 && (set_position = e(pp_images).size() - 1)) : "next" == t ? (set_position++, set_position > e(pp_images).size() - 1 && (set_position = 0)) : set_position = t, rel_index = set_position, doresize || (doresize = !0), settings.allow_expand && e(".pp_contract").removeClass("pp_contract").addClass("pp_expand"), n(function() {
        e.prettyPhoto.open()
      })
    }, e.prettyPhoto.changeGalleryPage = function(e) {
      "next" == e ? (currentGalleryPage++, currentGalleryPage > totalPage && (currentGalleryPage = 0)) : "previous" == e ? (currentGalleryPage--, currentGalleryPage < 0 && (currentGalleryPage = totalPage)) : currentGalleryPage = e, slide_speed = "next" == e || "previous" == e ? settings.animation_speed : 0, slide_to = currentGalleryPage * itemsPerPage * itemWidth, $pp_gallery.find("ul").animate({
        left: -slide_to
      }, slide_speed)
    }, e.prettyPhoto.startSlideshow = function() {
      "undefined" == typeof P ? ($pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function() {
        return e.prettyPhoto.stopSlideshow(), !1
      }), P = setInterval(e.prettyPhoto.startSlideshow, settings.slideshow)) : e.prettyPhoto.changePage("next")
    }, e.prettyPhoto.stopSlideshow = function() {
      $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function() {
        return e.prettyPhoto.startSlideshow(), !1
      }), clearInterval(P), P = void 0
    }, e.prettyPhoto.close = function() {
      $pp_overlay.is(":animated") || (e.prettyPhoto.stopSlideshow(), $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden"), e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function() {
        e(this).remove()
      }), $pp_overlay.fadeOut(settings.animation_speed, function() {
        settings.hideflash && e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible"), e(this).remove(), e(window).unbind("scroll.prettyphoto"), p(), settings.callback(), doresize = !0, v = !1, delete settings
      }))
    }, !pp_alreadyInitialized && t() && (pp_alreadyInitialized = !0, hashIndex = t(), hashRel = hashIndex, hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1), hashRel = hashRel.substring(0, hashRel.indexOf("/")), setTimeout(function() {
      e("a[" + a.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click")
    }, 50)), this.unbind("click.prettyphoto").bind("click.prettyphoto", e.prettyPhoto.initialize)
  }
}(jQuery);
var pp_alreadyInitialized = !1;
/*global jQuery */
/*jshint multistr:true browser:true */
/*!
 * FitVids 1.0
 *
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */
(function($) {
  "use strict";
  $.fn.fitVids = function(options) {
    var settings = {
      customSelector: null
    };
    if (!document.getElementById('fit-vids-style')) {
      var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = '&shy;<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                      					 min-height: 1px;                         }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style>';
      ref.parentNode.insertBefore(div, ref)
    }
    if (options) {
      $.extend(settings, options)
    }
    return this.each(function() {
      var selectors = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
      if (settings.customSelector) {
        selectors.push(settings.customSelector)
      }
      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object");
      $allVideos.each(function() {
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
          return
        }
        if ($this.closest('.flexslider').length > 0) {
          if ($this.closest('ul').find('li > img').length > 0) {
            var height = $this.closest('ul').height()
          } else if ($this.closest('ul').find('video-wrap').length > 0) {
            var height = $this.closest('ul').find('video-wrap').height()
          } else {
            var height = 500
          }
          var width = !isNaN(parseInt($this.closest('li').attr('width'), 10)) ? parseInt($this.closest('li').attr('width'), 10) : $this.closest('li').width();
          var aspectRatio = height / width
        } else if ($this.closest('.portfolio_images').length > 0) {
          var width = $j('.portfolio_images').width();
          if ($this.next('img').length > 0) {
            var height = $this.next('img').height()
          } else {
            var height = 500
          }
          var aspectRatio = height / width
        } else if ($this.closest('.post_image').length) {
          var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width
        } else if ($this.closest('.q_masonry_blog_post_image').length) {
          var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width
        } else {
          var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.parent().width(),
            aspectRatio = height / width
        }
        if (!$this.attr('id')) {
          var videoID = 'fitvid' + Math.floor(Math.random() * 999999);
          $this.attr('id', videoID)
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>');
        $('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + "%")
      })
    })
  }
})(jQuery);

/*
 * jQuery FlexSlider v2.6.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
! function($) {
  var e = !0;
  $.flexslider = function(t, a) {
    var n = $(t);
    n.vars = $.extend({}, $.flexslider.defaults, a);
    var i = n.vars.namespace,
      s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
      r = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
      o = "click touchend MSPointerUp keyup",
      l = "",
      c, d = "vertical" === n.vars.direction,
      u = n.vars.reverse,
      v = n.vars.itemWidth > 0,
      p = "fade" === n.vars.animation,
      m = "" !== n.vars.asNavFor,
      f = {};
    $.data(t, "flexslider", n), f = {
      init: function() {
        n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = $(n.vars.selector, n), n.container = $(n.containerSelector, n), n.count = n.slides.length, n.syncExists = $(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = d ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !p && n.vars.useCSS && function() {
          var e = document.createElement("div"),
            t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
          for (var a in t)
            if (void 0 !== e.style[t[a]]) return n.pfx = t[a].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
          return !1
        }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = $(n.vars.controlsContainer).length > 0 && $(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = $(n.vars.manualControls).length > 0 && $(n.vars.manualControls)), "" !== n.vars.customDirectionNav && (n.customDirectionNav = 2 === $(n.vars.customDirectionNav).length && $(n.vars.customDirectionNav)), n.vars.randomize && (n.slides.sort(function() {
          return Math.round(Math.random()) - .5
        }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && f.controlNav.setup(), n.vars.directionNav && f.directionNav.setup(), n.vars.keyboard && (1 === $(n.containerSelector).length || n.vars.multipleKeyboard) && $(document).bind("keyup", function(e) {
          var t = e.keyCode;
          if (!n.animating && (39 === t || 37 === t)) {
            var a = 39 === t ? n.getTarget("next") : 37 === t ? n.getTarget("prev") : !1;
            n.flexAnimate(a, n.vars.pauseOnAction)
          }
        }), n.vars.mousewheel && n.bind("mousewheel", function(e, t, a, i) {
          e.preventDefault();
          var s = 0 > t ? n.getTarget("next") : n.getTarget("prev");
          n.flexAnimate(s, n.vars.pauseOnAction)
        }), n.vars.pausePlay && f.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && f.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function() {
          n.manualPlay || n.manualPause || n.pause()
        }, function() {
          n.manualPause || n.manualPlay || n.stopped || n.play()
        }), n.vars.pauseInvisible && f.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), m && f.asNav.setup(), r && n.vars.touch && f.touch(), (!p || p && n.vars.smoothHeight) && $(window).bind("resize orientationchange focus", f.resize), n.find("img").attr("draggable", "false"), setTimeout(function() {
          n.vars.start(n)
        }, 200)
      },
      asNav: {
        setup: function() {
          n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(i + "active-slide").eq(n.currentItem).addClass(i + "active-slide"), s ? (t._slider = n, n.slides.each(function() {
            var e = this;
            e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(e) {
              e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
            }, !1), e.addEventListener("MSGestureTap", function(e) {
              e.preventDefault();
              var t = $(this),
                a = t.index();
              $(n.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
            })
          })) : n.slides.on(o, function(e) {
            e.preventDefault();
            var t = $(this),
              a = t.index(),
              s = t.offset().left - $(n).scrollLeft();
            0 >= s && t.hasClass(i + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : $(n.vars.asNavFor).data("flexslider").animating || t.hasClass(i + "active-slide") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
          })
        }
      },
      controlNav: {
        setup: function() {
          n.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging()
        },
        setupPaging: function() {
          var e = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
            t = 1,
            a, s;
          if (n.controlNavScaffold = $('<ol class="' + i + "control-nav " + i + e + '"></ol>'), n.pagingCount > 1)
            for (var r = 0; r < n.pagingCount; r++) {
              if (s = n.slides.eq(r), void 0 === s.attr("data-thumb-alt") && s.attr("data-thumb-alt", ""), altText = "" !== s.attr("data-thumb-alt") ? altText = ' alt="' + s.attr("data-thumb-alt") + '"' : "", a = "thumbnails" === n.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"' + altText + "/>" : '<a href="#">' + t + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
                var c = s.attr("data-thumbcaption");
                "" !== c && void 0 !== c && (a += '<span class="' + i + 'caption">' + c + "</span>")
              }
              n.controlNavScaffold.append("<li>" + a + "</li>"), t++
            }
          n.controlsContainer ? $(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), f.controlNav.set(), f.controlNav.active(), n.controlNavScaffold.delegate("a, img", o, function(e) {
            if (e.preventDefault(), "" === l || l === e.type) {
              var t = $(this),
                a = n.controlNav.index(t);
              t.hasClass(i + "active") || (n.direction = a > n.currentSlide ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction))
            }
            "" === l && (l = e.type), f.setToClearWatchedEvent()
          })
        },
        setupManual: function() {
          n.controlNav = n.manualControls, f.controlNav.active(), n.controlNav.bind(o, function(e) {
            if (e.preventDefault(), "" === l || l === e.type) {
              var t = $(this),
                a = n.controlNav.index(t);
              t.hasClass(i + "active") || (a > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(a, n.vars.pauseOnAction))
            }
            "" === l && (l = e.type), f.setToClearWatchedEvent()
          })
        },
        set: function() {
          var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
          n.controlNav = $("." + i + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n)
        },
        active: function() {
          n.controlNav.removeClass(i + "active").eq(n.animatingTo).addClass(i + "active")
        },
        update: function(e, t) {
          n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append($('<li><a href="#">' + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(t).closest("li").remove(), f.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(t, e) : f.controlNav.active()
        }
      },
      directionNav: {
        setup: function() {
          var e = $('<ul class="' + i + 'direction-nav"><li class="' + i + 'nav-prev"><a class="' + i + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + i + 'nav-next"><a class="' + i + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
          n.customDirectionNav ? n.directionNav = n.customDirectionNav : n.controlsContainer ? ($(n.controlsContainer).append(e), n.directionNav = $("." + i + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = $("." + i + "direction-nav li a", n)), f.directionNav.update(), n.directionNav.bind(o, function(e) {
            e.preventDefault();
            var t;
            ("" === l || l === e.type) && (t = $(this).hasClass(i + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(t, n.vars.pauseOnAction)), "" === l && (l = e.type), f.setToClearWatchedEvent()
          })
        },
        update: function() {
          var e = i + "disabled";
          1 === n.pagingCount ? n.directionNav.addClass(e).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(e).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : n.directionNav.removeClass(e).removeAttr("tabindex")
        }
      },
      pausePlay: {
        setup: function() {
          var e = $('<div class="' + i + 'pauseplay"><a href="#"></a></div>');
          n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = $("." + i + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = $("." + i + "pauseplay a", n)), f.pausePlay.update(n.vars.slideshow ? i + "pause" : i + "play"), n.pausePlay.bind(o, function(e) {
            e.preventDefault(), ("" === l || l === e.type) && ($(this).hasClass(i + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === l && (l = e.type), f.setToClearWatchedEvent()
          })
        },
        update: function(e) {
          "play" === e ? n.pausePlay.removeClass(i + "pause").addClass(i + "play").html(n.vars.playText) : n.pausePlay.removeClass(i + "play").addClass(i + "pause").html(n.vars.pauseText)
        }
      },
      touch: function() {
        function e(e) {
          e.stopPropagation(), n.animating ? e.preventDefault() : (n.pause(), t._gesture.addPointer(e.pointerId), T = 0, c = d ? n.h : n.w, f = Number(new Date), l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c)
        }

        function a(e) {
          e.stopPropagation();
          var a = e.target._slider;
          if (a) {
            var n = -e.translationX,
              i = -e.translationY;
            return T += d ? i : n, m = T, x = d ? Math.abs(T) < Math.abs(-n) : Math.abs(T) < Math.abs(-i), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() {
              t._gesture.stop()
            }) : void((!x || Number(new Date) - f > 500) && (e.preventDefault(), !p && a.transitions && (a.vars.animationLoop || (m = T / (0 === a.currentSlide && 0 > T || a.currentSlide === a.last && T > 0 ? Math.abs(T) / c + 2 : 1)), a.setProps(l + m, "setTouch"))))
          }
        }

        function i(e) {
          e.stopPropagation();
          var t = e.target._slider;
          if (t) {
            if (t.animatingTo === t.currentSlide && !x && null !== m) {
              var a = u ? -m : m,
                n = a > 0 ? t.getTarget("next") : t.getTarget("prev");
              t.canAdvance(n) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : p || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
            }
            r = null, o = null, m = null, l = null, T = 0
          }
        }
        var r, o, l, c, m, f, g, h, S, x = !1,
          y = 0,
          b = 0,
          T = 0;
        s ? (t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", e, !1), t._slider = n, t.addEventListener("MSGestureChange", a, !1), t.addEventListener("MSGestureEnd", i, !1)) : (g = function(e) {
          n.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (n.pause(), c = d ? n.h : n.w, f = Number(new Date), y = e.touches[0].pageX, b = e.touches[0].pageY, l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c, r = d ? b : y, o = d ? y : b, t.addEventListener("touchmove", h, !1), t.addEventListener("touchend", S, !1))
        }, h = function(e) {
          y = e.touches[0].pageX, b = e.touches[0].pageY, m = d ? r - b : r - y, x = d ? Math.abs(m) < Math.abs(y - o) : Math.abs(m) < Math.abs(b - o);
          var t = 500;
          (!x || Number(new Date) - f > t) && (e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (m /= 0 === n.currentSlide && 0 > m || n.currentSlide === n.last && m > 0 ? Math.abs(m) / c + 2 : 1), n.setProps(l + m, "setTouch")))
        }, S = function(e) {
          if (t.removeEventListener("touchmove", h, !1), n.animatingTo === n.currentSlide && !x && null !== m) {
            var a = u ? -m : m,
              i = a > 0 ? n.getTarget("next") : n.getTarget("prev");
            n.canAdvance(i) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? n.flexAnimate(i, n.vars.pauseOnAction) : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
          }
          t.removeEventListener("touchend", S, !1), r = null, o = null, m = null, l = null
        }, t.addEventListener("touchstart", g, !1))
      },
      resize: function() {
        !n.animating && n.is(":visible") && (v || n.doMath(), p ? f.smoothHeight() : v ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : d ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && f.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")))
      },
      smoothHeight: function(e) {
        if (!d || p) {
          var t = p ? n : n.viewport;
          e ? t.animate({
            height: n.slides.eq(n.animatingTo).height()
          }, e) : t.height(n.slides.eq(n.animatingTo).height())
        }
      },
      sync: function(e) {
        var t = $(n.vars.sync).data("flexslider"),
          a = n.animatingTo;
        switch (e) {
          case "animate":
            t.flexAnimate(a, n.vars.pauseOnAction, !1, !0);
            break;
          case "play":
            t.playing || t.asNav || t.play();
            break;
          case "pause":
            t.pause()
        }
      },
      uniqueID: function(e) {
        return e.filter("[id]").add(e.find("[id]")).each(function() {
          var e = $(this);
          e.attr("id", e.attr("id") + "_clone")
        }), e
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var e = f.pauseInvisible.getHiddenProp();
          if (e) {
            var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
            document.addEventListener(t, function() {
              f.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play()
            })
          }
        },
        isHidden: function() {
          var e = f.pauseInvisible.getHiddenProp();
          return e ? document[e] : !1
        },
        getHiddenProp: function() {
          var e = ["webkit", "moz", "ms", "o"];
          if ("hidden" in document) return "hidden";
          for (var t = 0; t < e.length; t++)
            if (e[t] + "Hidden" in document) return e[t] + "Hidden";
          return null
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(c), c = setTimeout(function() {
          l = ""
        }, 3e3)
      }
    }, n.flexAnimate = function(e, t, a, s, o) {
      if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), m && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, o) || a) && n.is(":visible")) {
        if (m && s) {
          var l = $(n.vars.asNavFor).data("flexslider");
          if (n.atEnd = 0 === e || e === n.count - 1, l.flexAnimate(e, !0, !1, !0, o), n.direction = n.currentItem < e ? "next" : "prev", l.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e) return n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), !1;
          n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), e = Math.floor(e / n.visible)
        }
        if (n.animating = !0, n.animatingTo = e, t && n.pause(), n.vars.before(n), n.syncExists && !o && f.sync("animate"), n.vars.controlNav && f.controlNav.active(), v || n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && f.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), p) r ? (n.slides.eq(n.currentSlide).css({
          opacity: 0,
          zIndex: 1
        }), n.slides.eq(e).css({
          opacity: 1,
          zIndex: 2
        }), n.wrapup(c)) : (n.slides.eq(n.currentSlide).css({
          zIndex: 1
        }).animate({
          opacity: 0
        }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({
          zIndex: 2
        }).animate({
          opacity: 1
        }, n.vars.animationSpeed, n.vars.easing, n.wrapup));
        else {
          var c = d ? n.slides.filter(":first").height() : n.computedW,
            g, h, S;
          v ? (g = n.vars.itemMargin, S = (n.itemW + g) * n.move * n.animatingTo, h = S > n.limit && 1 !== n.visible ? n.limit : S) : h = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? u ? (n.count + n.cloneOffset) * c : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? u ? 0 : (n.count + 1) * c : u ? (n.count - 1 - e + n.cloneOffset) * c : (e + n.cloneOffset) * c, n.setProps(h, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function() {
            clearTimeout(n.ensureAnimationEnd), n.wrapup(c)
          }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function() {
            n.wrapup(c)
          }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function() {
            n.wrapup(c)
          })
        }
        n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed)
      }
    }, n.wrapup = function(e) {
      p || v || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(e, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(e, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n)
    }, n.animateSlides = function() {
      !n.animating && e && n.flexAnimate(n.getTarget("next"))
    }, n.pause = function() {
      clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && f.pausePlay.update("play"), n.syncExists && f.sync("pause")
    }, n.play = function() {
      n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && f.pausePlay.update("pause"), n.syncExists && f.sync("play")
    }, n.stop = function() {
      n.pause(), n.stopped = !0
    }, n.canAdvance = function(e, t) {
      var a = m ? n.pagingCount - 1 : n.last;
      return t ? !0 : m && n.currentItem === n.count - 1 && 0 === e && "prev" === n.direction ? !0 : m && 0 === n.currentItem && e === n.pagingCount - 1 && "next" !== n.direction ? !1 : e !== n.currentSlide || m ? n.vars.animationLoop ? !0 : n.atEnd && 0 === n.currentSlide && e === a && "next" !== n.direction ? !1 : n.atEnd && n.currentSlide === a && 0 === e && "next" === n.direction ? !1 : !0 : !1
    }, n.getTarget = function(e) {
      return n.direction = e, "next" === e ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1
    }, n.setProps = function(e, t, a) {
      var i = function() {
        var a = e ? e : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
          i = function() {
            if (v) return "setTouch" === t ? e : u && n.animatingTo === n.last ? 0 : u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : a;
            switch (t) {
              case "setTotal":
                return u ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e : (n.currentSlide + n.cloneOffset) * e;
              case "setTouch":
                return u ? e : e;
              case "jumpEnd":
                return u ? e : n.count * e;
              case "jumpStart":
                return u ? n.count * e : e;
              default:
                return e
            }
          }();
        return -1 * i + "px"
      }();
      n.transitions && (i = d ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", a), n.container.css("transition-duration", a)), n.args[n.prop] = i, (n.transitions || void 0 === a) && n.container.css(n.args), n.container.css("transform", i)
    }, n.setup = function(e) {
      if (p) n.slides.css({
        width: "100%",
        "float": "left",
        marginRight: "-100%",
        position: "relative"
      }), "init" === e && (r ? n.slides.css({
        opacity: 0,
        display: "block",
        webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
        zIndex: 1
      }).eq(n.currentSlide).css({
        opacity: 1,
        zIndex: 2
      }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(n.currentSlide).css({
        zIndex: 2
      }).css({
        opacity: 1
      }) : n.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(n.currentSlide).css({
        zIndex: 2
      }).animate({
        opacity: 1
      }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && f.smoothHeight();
      else {
        var t, a;
        "init" === e && (n.viewport = $('<div class="' + i + 'viewport"></div>').css({
          overflow: "hidden",
          position: "relative"
        }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, u && (a = $.makeArray(n.slides).reverse(), n.slides = $(a), n.container.empty().append(n.slides))), n.vars.animationLoop && !v && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = $(n.vars.selector, n), t = u ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, d && !v ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
          n.newSlides.css({
            display: "block"
          }), n.doMath(), n.viewport.height(n.h), n.setProps(t * n.h, "init")
        }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(t * n.computedW, "init"), setTimeout(function() {
          n.doMath(), n.newSlides.css({
            width: n.computedW,
            marginRight: n.computedM,
            "float": "left",
            display: "block"
          }), n.vars.smoothHeight && f.smoothHeight()
        }, "init" === e ? 100 : 0))
      }
      v || n.slides.removeClass(i + "active-slide").eq(n.currentSlide).addClass(i + "active-slide"), n.vars.init(n)
    }, n.doMath = function() {
      var e = n.slides.first(),
        t = n.vars.itemMargin,
        a = n.vars.minItems,
        i = n.vars.maxItems;
      n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = e.height(), n.boxPadding = e.outerWidth() - e.width(), v ? (n.itemT = n.vars.itemWidth + t, n.itemM = t, n.minW = a ? a * n.itemT : n.w, n.maxW = i ? i * n.itemT - t : n.w, n.itemW = n.minW > n.w ? (n.w - t * (a - 1)) / a : n.maxW < n.w ? (n.w - t * (i - 1)) / i : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + t * (n.count - 1) : (n.itemW + t) * n.count - n.w - t) : (n.itemW = n.w, n.itemM = t, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding, n.computedM = n.itemM
    }, n.update = function(e, t) {
      n.doMath(), v || (e < n.currentSlide ? n.currentSlide += 1 : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === t && !v || n.pagingCount > n.controlNav.length ? f.controlNav.update("add") : ("remove" === t && !v || n.pagingCount < n.controlNav.length) && (v && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), f.controlNav.update("remove", n.last))), n.vars.directionNav && f.directionNav.update()
    }, n.addSlide = function(e, t) {
      var a = $(e);
      n.count += 1, n.last = n.count - 1, d && u ? void 0 !== t ? n.slides.eq(n.count - t).after(a) : n.container.prepend(a) : void 0 !== t ? n.slides.eq(t).before(a) : n.container.append(a), n.update(t, "add"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n)
    }, n.removeSlide = function(e) {
      var t = isNaN(e) ? n.slides.index($(e)) : e;
      n.count -= 1, n.last = n.count - 1, isNaN(e) ? $(e, n.slides).remove() : d && u ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(t, "remove"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n)
    }, f.init()
  }, $(window).blur(function(t) {
    e = !1
  }).focus(function(t) {
    e = !0
  }), $.flexslider.defaults = {
    namespace: "flex-",
    selector: ".slides > li",
    animation: "fade",
    easing: "swing",
    direction: "horizontal",
    reverse: !1,
    animationLoop: !0,
    smoothHeight: !1,
    startAt: 0,
    slideshow: !0,
    slideshowSpeed: 7e3,
    animationSpeed: 600,
    initDelay: 0,
    randomize: !1,
    fadeFirstSlide: !0,
    thumbCaptions: !1,
    pauseOnAction: !0,
    pauseOnHover: !1,
    pauseInvisible: !0,
    useCSS: !0,
    touch: !0,
    video: !1,
    controlNav: !0,
    directionNav: !0,
    prevText: "Previous",
    nextText: "Next",
    keyboard: !0,
    multipleKeyboard: !1,
    mousewheel: !1,
    pausePlay: !1,
    pauseText: "Pause",
    playText: "Play",
    controlsContainer: "",
    manualControls: "",
    customDirectionNav: "",
    sync: "",
    asNavFor: "",
    itemWidth: 0,
    itemMargin: 0,
    minItems: 1,
    maxItems: 0,
    move: 0,
    allowOneSlide: !0,
    start: function() {},
    before: function() {},
    after: function() {},
    end: function() {},
    added: function() {},
    removed: function() {},
    init: function() {}
  }, $.fn.flexslider = function(e) {
    if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function() {
      var t = $(this),
        a = e.selector ? e.selector : ".slides > li",
        n = t.find(a);
      1 === n.length && e.allowOneSlide === !0 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e)
    });
    var t = $(this).data("flexslider");
    switch (e) {
      case "play":
        t.play();
        break;
      case "pause":
        t.pause();
        break;
      case "stop":
        t.stop();
        break;
      case "next":
        t.flexAnimate(t.getTarget("next"), !0);
        break;
      case "prev":
      case "previous":
        t.flexAnimate(t.getTarget("prev"), !0);
        break;
      default:
        "number" == typeof e && t.flexAnimate(e, !0)
    }
  }
}(jQuery);

/*!
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2013, John Dyer (http://j.hn)
 * License: MIT
 *
 */
var mejs = mejs || {};
mejs.version = "2.13.0";
mejs.meIndex = 0;
mejs.plugins = {
  silverlight: [{
    version: [3, 0],
    types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
  }],
  flash: [{
    version: [9, 0, 124],
    types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube"]
  }],
  youtube: [{
    version: null,
    types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
  }],
  vimeo: [{
    version: null,
    types: ["video/vimeo",
      "video/x-vimeo"
    ]
  }]
};
mejs.Utility = {
  encodeUrl: function(a) {
    return encodeURIComponent(a)
  },
  escapeHTML: function(a) {
    return a.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
  },
  absolutizeUrl: function(a) {
    var b = document.createElement("div");
    b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>';
    return b.firstChild.href
  },
  getScriptPath: function(a) {
    for (var b = 0, c, d = "", e = "", f, g, h = document.getElementsByTagName("script"), l = h.length, j = a.length; b < l; b++) {
      f = h[b].src;
      c = f.lastIndexOf("/");
      if (c > -1) {
        g = f.substring(c +
          1);
        f = f.substring(0, c + 1)
      } else {
        g = f;
        f = ""
      }
      for (c = 0; c < j; c++) {
        e = a[c];
        e = g.indexOf(e);
        if (e > -1) {
          d = f;
          break
        }
      }
      if (d !== "") break
    }
    return d
  },
  secondsToTimeCode: function(a, b, c, d) {
    if (typeof c == "undefined") c = false;
    else if (typeof d == "undefined") d = 25;
    var e = Math.floor(a / 3600) % 24,
      f = Math.floor(a / 60) % 60,
      g = Math.floor(a % 60);
    a = Math.floor((a % 1 * d).toFixed(3));
    return (b || e > 0 ? (e < 10 ? "0" + e : e) + ":" : "") + (f < 10 ? "0" + f : f) + ":" + (g < 10 ? "0" + g : g) + (c ? ":" + (a < 10 ? "0" + a : a) : "")
  },
  timeCodeToSeconds: function(a, b, c, d) {
    if (typeof c == "undefined") c = false;
    else if (typeof d ==
      "undefined") d = 25;
    a = a.split(":");
    b = parseInt(a[0], 10);
    var e = parseInt(a[1], 10),
      f = parseInt(a[2], 10),
      g = 0,
      h = 0;
    if (c) g = parseInt(a[3]) / d;
    return h = b * 3600 + e * 60 + f + g
  },
  convertSMPTEtoSeconds: function(a) {
    if (typeof a != "string") return false;
    a = a.replace(",", ".");
    var b = 0,
      c = a.indexOf(".") != -1 ? a.split(".")[1].length : 0,
      d = 1;
    a = a.split(":").reverse();
    for (var e = 0; e < a.length; e++) {
      d = 1;
      if (e > 0) d = Math.pow(60, e);
      b += Number(a[e]) * d
    }
    return Number(b.toFixed(c))
  },
  removeSwf: function(a) {
    var b = document.getElementById(a);
    if (b && /object|embed/i.test(b.nodeName))
      if (mejs.MediaFeatures.isIE) {
        b.style.display =
          "none";
        (function() {
          b.readyState == 4 ? mejs.Utility.removeObjectInIE(a) : setTimeout(arguments.callee, 10)
        })()
      } else b.parentNode.removeChild(b)
  },
  removeObjectInIE: function(a) {
    if (a = document.getElementById(a)) {
      for (var b in a)
        if (typeof a[b] == "function") a[b] = null;
      a.parentNode.removeChild(a)
    }
  }
};
mejs.PluginDetector = {
  hasPluginVersion: function(a, b) {
    var c = this.plugins[a];
    b[1] = b[1] || 0;
    b[2] = b[2] || 0;
    return c[0] > b[0] || c[0] == b[0] && c[1] > b[1] || c[0] == b[0] && c[1] == b[1] && c[2] >= b[2] ? true : false
  },
  nav: window.navigator,
  ua: window.navigator.userAgent.toLowerCase(),
  plugins: [],
  addPlugin: function(a, b, c, d, e) {
    this.plugins[a] = this.detectPlugin(b, c, d, e)
  },
  detectPlugin: function(a, b, c, d) {
    var e = [0, 0, 0],
      f;
    if (typeof this.nav.plugins != "undefined" && typeof this.nav.plugins[a] == "object") {
      if ((c = this.nav.plugins[a].description) &&
        !(typeof this.nav.mimeTypes != "undefined" && this.nav.mimeTypes[b] && !this.nav.mimeTypes[b].enabledPlugin)) {
        e = c.replace(a, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split(".");
        for (a = 0; a < e.length; a++) e[a] = parseInt(e[a].match(/\d+/), 10)
      }
    } else if (typeof window.ActiveXObject != "undefined") try {
      if (f = new ActiveXObject(c)) e = d(f)
    } catch (g) {}
    return e
  }
};
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(a) {
  var b = [];
  if (a = a.GetVariable("$version")) {
    a = a.split(" ")[1].split(",");
    b = [parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10)]
  }
  return b
});
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(a) {
  var b = [0, 0, 0, 0],
    c = function(d, e, f, g) {
      for (; d.isVersionSupported(e[0] + "." + e[1] + "." + e[2] + "." + e[3]);) e[f] += g;
      e[f] -= g
    };
  c(a, b, 0, 1);
  c(a, b, 1, 1);
  c(a, b, 2, 1E4);
  c(a, b, 2, 1E3);
  c(a, b, 2, 100);
  c(a, b, 2, 10);
  c(a, b, 2, 1);
  c(a, b, 3, 1);
  return b
});
mejs.MediaFeatures = {
  init: function() {
    var a = this,
      b = document,
      c = mejs.PluginDetector.nav,
      d = mejs.PluginDetector.ua.toLowerCase(),
      e, f = ["source", "track", "audio", "video"];
    a.isiPad = d.match(/ipad/i) !== null;
    a.isiPhone = d.match(/iphone/i) !== null;
    a.isiOS = a.isiPhone || a.isiPad;
    a.isAndroid = d.match(/android/i) !== null;
    a.isBustedAndroid = d.match(/android 2\.[12]/) !== null;
    a.isBustedNativeHTTPS = location.protocol === "https:" && (d.match(/android [12]\./) !== null || d.match(/macintosh.* version.* safari/) !== null);
    a.isIE = c.appName.toLowerCase().indexOf("microsoft") !=
      -1;
    a.isChrome = d.match(/chrome/gi) !== null;
    a.isFirefox = d.match(/firefox/gi) !== null;
    a.isWebkit = d.match(/webkit/gi) !== null;
    a.isGecko = d.match(/gecko/gi) !== null && !a.isWebkit;
    a.isOpera = d.match(/opera/gi) !== null;
    a.hasTouch = "ontouchstart" in window && window.ontouchstart != null;
    a.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    for (c = 0; c < f.length; c++) e = document.createElement(f[c]);
    a.supportsMediaTag = typeof e.canPlayType !== "undefined" || a.isBustedAndroid;
    try {
      e.canPlayType("video/mp4")
    } catch (g) {
      a.supportsMediaTag = false
    }
    a.hasSemiNativeFullScreen = typeof e.webkitEnterFullscreen !== "undefined";
    a.hasWebkitNativeFullScreen = typeof e.webkitRequestFullScreen !== "undefined";
    a.hasMozNativeFullScreen = typeof e.mozRequestFullScreen !== "undefined";
    a.hasTrueNativeFullScreen = a.hasWebkitNativeFullScreen || a.hasMozNativeFullScreen;
    a.nativeFullScreenEnabled = a.hasTrueNativeFullScreen;
    if (a.hasMozNativeFullScreen) a.nativeFullScreenEnabled = e.mozFullScreenEnabled;
    if (this.isChrome) a.hasSemiNativeFullScreen =
      false;
    if (a.hasTrueNativeFullScreen) {
      a.fullScreenEventName = a.hasWebkitNativeFullScreen ? "webkitfullscreenchange" : "mozfullscreenchange";
      a.isFullScreen = function() {
        if (e.mozRequestFullScreen) return b.mozFullScreen;
        else if (e.webkitRequestFullScreen) return b.webkitIsFullScreen
      };
      a.requestFullScreen = function(h) {
        if (a.hasWebkitNativeFullScreen) h.webkitRequestFullScreen();
        else a.hasMozNativeFullScreen && h.mozRequestFullScreen()
      };
      a.cancelFullScreen = function() {
        if (a.hasWebkitNativeFullScreen) document.webkitCancelFullScreen();
        else a.hasMozNativeFullScreen && document.mozCancelFullScreen()
      }
    }
    if (a.hasSemiNativeFullScreen && d.match(/mac os x 10_5/i)) {
      a.hasNativeFullScreen = false;
      a.hasSemiNativeFullScreen = false
    }
  }
};
mejs.MediaFeatures.init();
mejs.HtmlMediaElement = {
  pluginType: "native",
  isFullScreen: false,
  setCurrentTime: function(a) {
    this.currentTime = a
  },
  setMuted: function(a) {
    this.muted = a
  },
  setVolume: function(a) {
    this.volume = a
  },
  stop: function() {
    this.pause()
  },
  setSrc: function(a) {
    for (var b = this.getElementsByTagName("source"); b.length > 0;) this.removeChild(b[0]);
    if (typeof a == "string") this.src = a;
    else {
      var c;
      for (b = 0; b < a.length; b++) {
        c = a[b];
        if (this.canPlayType(c.type)) {
          this.src = c.src;
          break
        }
      }
    }
  },
  setVideoSize: function(a, b) {
    this.width = a;
    this.height = b
  }
};
mejs.PluginMediaElement = function(a, b, c) {
  this.id = a;
  this.pluginType = b;
  this.src = c;
  this.events = {};
  this.attributes = {}
};
mejs.PluginMediaElement.prototype = {
  pluginElement: null,
  pluginType: "",
  isFullScreen: false,
  playbackRate: -1,
  defaultPlaybackRate: -1,
  seekable: [],
  played: [],
  paused: true,
  ended: false,
  seeking: false,
  duration: 0,
  error: null,
  tagName: "",
  muted: false,
  volume: 1,
  currentTime: 0,
  play: function() {
    if (this.pluginApi != null) {
      this.pluginType == "youtube" ? this.pluginApi.playVideo() : this.pluginApi.playMedia();
      this.paused = false
    }
  },
  load: function() {
    if (this.pluginApi != null) {
      this.pluginType != "youtube" && this.pluginApi.loadMedia();
      this.paused =
        false
    }
  },
  pause: function() {
    if (this.pluginApi != null) {
      this.pluginType == "youtube" ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia();
      this.paused = true
    }
  },
  stop: function() {
    if (this.pluginApi != null) {
      this.pluginType == "youtube" ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia();
      this.paused = true
    }
  },
  canPlayType: function(a) {
    var b, c, d, e = mejs.plugins[this.pluginType];
    for (b = 0; b < e.length; b++) {
      d = e[b];
      if (mejs.PluginDetector.hasPluginVersion(this.pluginType, d.version))
        for (c = 0; c < d.types.length; c++)
          if (a == d.types[c]) return "probably"
    }
    return ""
  },
  positionFullscreenButton: function(a, b, c) {
    this.pluginApi != null && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(a), Math.floor(b), c)
  },
  hideFullscreenButton: function() {
    this.pluginApi != null && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
  },
  setSrc: function(a) {
    if (typeof a == "string") {
      this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a));
      this.src = mejs.Utility.absolutizeUrl(a)
    } else {
      var b, c;
      for (b = 0; b < a.length; b++) {
        c = a[b];
        if (this.canPlayType(c.type)) {
          this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src));
          this.src = mejs.Utility.absolutizeUrl(a);
          break
        }
      }
    }
  },
  setCurrentTime: function(a) {
    if (this.pluginApi != null) {
      this.pluginType == "youtube" ? this.pluginApi.seekTo(a) : this.pluginApi.setCurrentTime(a);
      this.currentTime = a
    }
  },
  setVolume: function(a) {
    if (this.pluginApi != null) {
      this.pluginType == "youtube" ? this.pluginApi.setVolume(a * 100) : this.pluginApi.setVolume(a);
      this.volume = a
    }
  },
  setMuted: function(a) {
    if (this.pluginApi != null) {
      if (this.pluginType == "youtube") {
        a ? this.pluginApi.mute() : this.pluginApi.unMute();
        this.muted = a;
        this.dispatchEvent("volumechange")
      } else this.pluginApi.setMuted(a);
      this.muted = a
    }
  },
  setVideoSize: function(a, b) {
    if (this.pluginElement.style) {
      this.pluginElement.style.width = a + "px";
      this.pluginElement.style.height = b + "px"
    }
    this.pluginApi != null && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(a, b)
  },
  setFullscreen: function(a) {
    this.pluginApi != null && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(a)
  },
  enterFullScreen: function() {
    this.pluginApi != null && this.pluginApi.setFullscreen && this.setFullscreen(true)
  },
  exitFullScreen: function() {
    this.pluginApi != null && this.pluginApi.setFullscreen &&
      this.setFullscreen(false)
  },
  addEventListener: function(a, b) {
    this.events[a] = this.events[a] || [];
    this.events[a].push(b)
  },
  removeEventListener: function(a, b) {
    if (!a) {
      this.events = {};
      return true
    }
    var c = this.events[a];
    if (!c) return true;
    if (!b) {
      this.events[a] = [];
      return true
    }
    for (i = 0; i < c.length; i++)
      if (c[i] === b) {
        this.events[a].splice(i, 1);
        return true
      } return false
  },
  dispatchEvent: function(a) {
    var b, c, d = this.events[a];
    if (d) {
      c = Array.prototype.slice.call(arguments, 1);
      for (b = 0; b < d.length; b++) d[b].apply(null, c)
    }
  },
  hasAttribute: function(a) {
    return a in
      this.attributes
  },
  removeAttribute: function(a) {
    delete this.attributes[a]
  },
  getAttribute: function(a) {
    if (this.hasAttribute(a)) return this.attributes[a];
    return ""
  },
  setAttribute: function(a, b) {
    this.attributes[a] = b
  },
  remove: function() {
    mejs.Utility.removeSwf(this.pluginElement.id);
    mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id)
  }
};
mejs.MediaPluginBridge = {
  pluginMediaElements: {},
  htmlMediaElements: {},
  registerPluginElement: function(a, b, c) {
    this.pluginMediaElements[a] = b;
    this.htmlMediaElements[a] = c
  },
  unregisterPluginElement: function(a) {
    delete this.pluginMediaElements[a];
    delete this.htmlMediaElements[a]
  },
  initPlugin: function(a) {
    var b = this.pluginMediaElements[a],
      c = this.htmlMediaElements[a];
    if (b) {
      switch (b.pluginType) {
        case "flash":
          b.pluginElement = b.pluginApi = document.getElementById(a);
          break;
        case "silverlight":
          b.pluginElement = document.getElementById(b.id);
          b.pluginApi = b.pluginElement.Content.MediaElementJS
      }
      b.pluginApi != null && b.success && b.success(b, c)
    }
  },
  fireEvent: function(a, b, c) {
    var d, e;
    if (a = this.pluginMediaElements[a]) {
      b = {
        type: b,
        target: a
      };
      for (d in c) {
        a[d] = c[d];
        b[d] = c[d]
      }
      e = c.bufferedTime || 0;
      b.target.buffered = b.buffered = {
        start: function() {
          return 0
        },
        end: function() {
          return e
        },
        length: 1
      };
      a.dispatchEvent(b.type, b)
    }
  }
};
mejs.MediaElementDefaults = {
  mode: "auto",
  plugins: ["flash", "silverlight", "youtube", "vimeo"],
  enablePluginDebug: false,
  httpsBasicAuthSite: false,
  type: "",
  pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
  flashName: "flashmediaelement.swf",
  flashStreamer: "",
  enablePluginSmoothing: false,
  enablePseudoStreaming: false,
  pseudoStreamingStartQueryParam: "start",
  silverlightName: "silverlightmediaelement.xap",
  defaultVideoWidth: 480,
  defaultVideoHeight: 270,
  pluginWidth: -1,
  pluginHeight: -1,
  pluginVars: [],
  timerRate: 250,
  startVolume: 0.8,
  success: function() {},
  error: function() {}
};
mejs.MediaElement = function(a, b) {
  return mejs.HtmlMediaElementShim.create(a, b)
};
mejs.HtmlMediaElementShim = {
  create: function(a, b) {
    var c = mejs.MediaElementDefaults,
      d = typeof a == "string" ? document.getElementById(a) : a,
      e = d.tagName.toLowerCase(),
      f = e === "audio" || e === "video",
      g = f ? d.getAttribute("src") : d.getAttribute("href");
    e = d.getAttribute("poster");
    var h = d.getAttribute("autoplay"),
      l = d.getAttribute("preload"),
      j = d.getAttribute("controls"),
      k;
    for (k in b) c[k] = b[k];
    g = typeof g == "undefined" || g === null || g == "" ? null : g;
    e = typeof e == "undefined" || e === null ? "" : e;
    l = typeof l == "undefined" || l === null || l === "false" ?
      "none" : l;
    h = !(typeof h == "undefined" || h === null || h === "false");
    j = !(typeof j == "undefined" || j === null || j === "false");
    k = this.determinePlayback(d, c, mejs.MediaFeatures.supportsMediaTag, f, g);
    k.url = k.url !== null ? mejs.Utility.absolutizeUrl(k.url) : "";
    if (k.method == "native") {
      if (mejs.MediaFeatures.isBustedAndroid) {
        d.src = k.url;
        d.addEventListener("click", function() {
          d.play()
        }, false)
      }
      return this.updateNative(k, c, h, l)
    } else if (k.method !== "") return this.createPlugin(k, c, e, h, l, j);
    else {
      this.createErrorMessage(k, c, e);
      return this
    }
  },
  determinePlayback: function(a, b, c, d, e) {
    var f = [],
      g, h, l, j = {
        method: "",
        url: "",
        htmlMediaElement: a,
        isVideo: a.tagName.toLowerCase() != "audio"
      },
      k;
    if (typeof b.type != "undefined" && b.type !== "")
      if (typeof b.type == "string") f.push({
        type: b.type,
        url: e
      });
      else
        for (g = 0; g < b.type.length; g++) f.push({
          type: b.type[g],
          url: e
        });
    else if (e !== null) {
      l = this.formatType(e, a.getAttribute("type"));
      f.push({
        type: l,
        url: e
      })
    } else
      for (g = 0; g < a.childNodes.length; g++) {
        h = a.childNodes[g];
        if (h.nodeType == 1 && h.tagName.toLowerCase() == "source") {
          e = h.getAttribute("src");
          l = this.formatType(e, h.getAttribute("type"));
          h = h.getAttribute("media");
          if (!h || !window.matchMedia || window.matchMedia && window.matchMedia(h).matches) f.push({
            type: l,
            url: e
          })
        }
      }
    if (!d && f.length > 0 && f[0].url !== null && this.getTypeFromFile(f[0].url).indexOf("audio") > -1) j.isVideo = false;
    if (mejs.MediaFeatures.isBustedAndroid) a.canPlayType = function(m) {
      return m.match(/video\/(mp4|m4v)/gi) !== null ? "maybe" : ""
    };
    if (c && (b.mode === "auto" || b.mode === "auto_plugin" || b.mode === "native") && !(mejs.MediaFeatures.isBustedNativeHTTPS &&
        b.httpsBasicAuthSite === true)) {
      if (!d) {
        g = document.createElement(j.isVideo ? "video" : "audio");
        a.parentNode.insertBefore(g, a);
        a.style.display = "none";
        j.htmlMediaElement = a = g
      }
      for (g = 0; g < f.length; g++)
        if (a.canPlayType(f[g].type).replace(/no/, "") !== "" || a.canPlayType(f[g].type.replace(/mp3/, "mpeg")).replace(/no/, "") !== "") {
          j.method = "native";
          j.url = f[g].url;
          break
        } if (j.method === "native") {
        if (j.url !== null) a.src = j.url;
        if (b.mode !== "auto_plugin") return j
      }
    }
    if (b.mode === "auto" || b.mode === "auto_plugin" || b.mode === "shim")
      for (g =
        0; g < f.length; g++) {
        l = f[g].type;
        for (a = 0; a < b.plugins.length; a++) {
          e = b.plugins[a];
          h = mejs.plugins[e];
          for (c = 0; c < h.length; c++) {
            k = h[c];
            if (k.version == null || mejs.PluginDetector.hasPluginVersion(e, k.version))
              for (d = 0; d < k.types.length; d++)
                if (l == k.types[d]) {
                  j.method = e;
                  j.url = f[g].url;
                  return j
                }
          }
        }
      }
    if (b.mode === "auto_plugin" && j.method === "native") return j;
    if (j.method === "" && f.length > 0) j.url = f[0].url;
    return j
  },
  formatType: function(a, b) {
    return a && !b ? this.getTypeFromFile(a) : b && ~b.indexOf(";") ? b.substr(0, b.indexOf(";")) : b
  },
  getTypeFromFile: function(a) {
    a = a.split("?")[0];
    a = a.substring(a.lastIndexOf(".") + 1).toLowerCase();
    return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(a) ? "video" : "audio") + "/" + this.getTypeFromExtension(a)
  },
  getTypeFromExtension: function(a) {
    switch (a) {
      case "mp4":
      case "m4v":
        return "mp4";
      case "webm":
      case "webma":
      case "webmv":
        return "webm";
      case "ogg":
      case "oga":
      case "ogv":
        return "ogg";
      default:
        return a
    }
  },
  createErrorMessage: function(a, b, c) {
    var d = a.htmlMediaElement,
      e = document.createElement("div");
    e.className =
      "me-cannotplay";
    try {
      e.style.width = d.width + "px";
      e.style.height = d.height + "px"
    } catch (f) {}
    e.innerHTML = b.customError ? b.customError : c !== "" ? '<a href="' + a.url + '"><img src="' + c + '" width="100%" height="100%" /></a>' : '<a href="' + a.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>";
    d.parentNode.insertBefore(e, d);
    d.style.display = "none";
    b.error(d)
  },
  createPlugin: function(a, b, c, d, e, f) {
    c = a.htmlMediaElement;
    var g = 1,
      h = 1,
      l = "me_" + a.method + "_" + mejs.meIndex++,
      j = new mejs.PluginMediaElement(l, a.method, a.url),
      k = document.createElement("div"),
      m;
    j.tagName = c.tagName;
    for (m = 0; m < c.attributes.length; m++) {
      var n = c.attributes[m];
      n.specified == true && j.setAttribute(n.name, n.value)
    }
    for (m = c.parentNode; m !== null && m.tagName.toLowerCase() != "body";) {
      if (m.parentNode.tagName.toLowerCase() == "p") {
        m.parentNode.parentNode.insertBefore(m, m.parentNode);
        break
      }
      m = m.parentNode
    }
    if (a.isVideo) {
      g = b.pluginWidth > 0 ? b.pluginWidth : b.videoWidth > 0 ? b.videoWidth : c.getAttribute("width") !== null ? c.getAttribute("width") : b.defaultVideoWidth;
      h = b.pluginHeight > 0 ? b.pluginHeight : b.videoHeight >
        0 ? b.videoHeight : c.getAttribute("height") !== null ? c.getAttribute("height") : b.defaultVideoHeight;
      g = mejs.Utility.encodeUrl(g);
      h = mejs.Utility.encodeUrl(h)
    } else if (b.enablePluginDebug) {
      g = 320;
      h = 240
    }
    j.success = b.success;
    mejs.MediaPluginBridge.registerPluginElement(l, j, c);
    k.className = "me-plugin";
    k.id = l + "_container";
    a.isVideo ? c.parentNode.insertBefore(k, c) : document.body.insertBefore(k, document.body.childNodes[0]);
    d = ["id=" + l, "isvideo=" + (a.isVideo ? "true" : "false"), "autoplay=" + (d ? "true" : "false"), "preload=" + e, "width=" +
      g, "startvolume=" + b.startVolume, "timerrate=" + b.timerRate, "flashstreamer=" + b.flashStreamer, "height=" + h, "pseudostreamstart=" + b.pseudoStreamingStartQueryParam
    ];
    if (a.url !== null) a.method == "flash" ? d.push("file=" + mejs.Utility.encodeUrl(a.url)) : d.push("file=" + a.url);
    b.enablePluginDebug && d.push("debug=true");
    b.enablePluginSmoothing && d.push("smoothing=true");
    b.enablePseudoStreaming && d.push("pseudostreaming=true");
    f && d.push("controls=true");
    if (b.pluginVars) d = d.concat(b.pluginVars);
    switch (a.method) {
      case "silverlight":
        k.innerHTML =
          '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + l + '" name="' + l + '" width="' + g + '" height="' + h + '" class="mejs-shim"><param name="initParams" value="' + d.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + b.pluginPath + b.silverlightName + '" /></object>';
        break;
      case "flash":
        if (mejs.MediaFeatures.isIE) {
          a =
            document.createElement("div");
          k.appendChild(a);
          a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + l + '" width="' + g + '" height="' + h + '" class="mejs-shim"><param name="movie" value="' + b.pluginPath + b.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + d.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>'
        } else k.innerHTML =
          '<embed id="' + l + '" name="' + l + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + b.pluginPath + b.flashName + '" flashvars="' + d.join("&") + '" width="' + g + '" height="' + h + '" class="mejs-shim"></embed>';
        break;
      case "youtube":
        b = a.url.substr(a.url.lastIndexOf("=") + 1);
        youtubeSettings = {
          container: k,
          containerId: k.id,
          pluginMediaElement: j,
          pluginId: l,
          videoId: b,
          height: h,
          width: g
        };
        mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings);
        break;
      case "vimeo":
        j.vimeoid = a.url.substr(a.url.lastIndexOf("/") + 1);
        k.innerHTML = '<iframe src="http://player.vimeo.com/video/' + j.vimeoid + '?portrait=0&byline=0&title=0" width="' + g + '" height="' + h + '" frameborder="0" class="mejs-shim"></iframe>'
    }
    c.style.display = "none";
    c.removeAttribute("autoplay");
    return j
  },
  updateNative: function(a,
    b) {
    var c = a.htmlMediaElement,
      d;
    for (d in mejs.HtmlMediaElement) c[d] = mejs.HtmlMediaElement[d];
    b.success(c, c);
    return c
  }
};
mejs.YouTubeApi = {
  isIframeStarted: false,
  isIframeLoaded: false,
  loadIframeApi: function() {
    if (!this.isIframeStarted) {
      var a = document.createElement("script");
      a.src = "//www.youtube.com/player_api";
      var b = document.getElementsByTagName("script")[0];
      b.parentNode.insertBefore(a, b);
      this.isIframeStarted = true
    }
  },
  iframeQueue: [],
  enqueueIframe: function(a) {
    if (this.isLoaded) this.createIframe(a);
    else {
      this.loadIframeApi();
      this.iframeQueue.push(a)
    }
  },
  createIframe: function(a) {
    var b = a.pluginMediaElement,
      c = new YT.Player(a.containerId, {
        height: a.height,
        width: a.width,
        videoId: a.videoId,
        playerVars: {
          controls: 0
        },
        events: {
          onReady: function() {
            a.pluginMediaElement.pluginApi = c;
            mejs.MediaPluginBridge.initPlugin(a.pluginId);
            setInterval(function() {
              mejs.YouTubeApi.createEvent(c, b, "timeupdate")
            }, 250)
          },
          onStateChange: function(d) {
            mejs.YouTubeApi.handleStateChange(d.data, c, b)
          }
        }
      })
  },
  createEvent: function(a, b, c) {
    c = {
      type: c,
      target: b
    };
    if (a && a.getDuration) {
      b.currentTime = c.currentTime = a.getCurrentTime();
      b.duration = c.duration = a.getDuration();
      c.paused = b.paused;
      c.ended = b.ended;
      c.muted = a.isMuted();
      c.volume = a.getVolume() / 100;
      c.bytesTotal = a.getVideoBytesTotal();
      c.bufferedBytes = a.getVideoBytesLoaded();
      var d = c.bufferedBytes / c.bytesTotal * c.duration;
      c.target.buffered = c.buffered = {
        start: function() {
          return 0
        },
        end: function() {
          return d
        },
        length: 1
      }
    }
    b.dispatchEvent(c.type, c)
  },
  iFrameReady: function() {
    for (this.isIframeLoaded = this.isLoaded = true; this.iframeQueue.length > 0;) this.createIframe(this.iframeQueue.pop())
  },
  flashPlayers: {},
  createFlash: function(a) {
    this.flashPlayers[a.pluginId] =
      a;
    var b, c = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + a.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
    if (mejs.MediaFeatures.isIE) {
      b = document.createElement("div");
      a.container.appendChild(b);
      b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + a.pluginId + '" width="' + a.width + '" height="' + a.height + '" class="mejs-shim"><param name="movie" value="' +
        c + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>'
    } else a.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + a.pluginId + '" data="' + c + '" width="' + a.width + '" height="' + a.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
  },
  flashReady: function(a) {
    var b = this.flashPlayers[a],
      c =
      document.getElementById(a),
      d = b.pluginMediaElement;
    d.pluginApi = d.pluginElement = c;
    mejs.MediaPluginBridge.initPlugin(a);
    c.cueVideoById(b.videoId);
    a = b.containerId + "_callback";
    window[a] = function(e) {
      mejs.YouTubeApi.handleStateChange(e, c, d)
    };
    c.addEventListener("onStateChange", a);
    setInterval(function() {
      mejs.YouTubeApi.createEvent(c, d, "timeupdate")
    }, 250)
  },
  handleStateChange: function(a, b, c) {
    switch (a) {
      case -1:
        c.paused = true;
        c.ended = true;
        mejs.YouTubeApi.createEvent(b, c, "loadedmetadata");
        break;
      case 0:
        c.paused = false;
        c.ended = true;
        mejs.YouTubeApi.createEvent(b, c, "ended");
        break;
      case 1:
        c.paused = false;
        c.ended = false;
        mejs.YouTubeApi.createEvent(b, c, "play");
        mejs.YouTubeApi.createEvent(b, c, "playing");
        break;
      case 2:
        c.paused = true;
        c.ended = false;
        mejs.YouTubeApi.createEvent(b, c, "pause");
        break;
      case 3:
        mejs.YouTubeApi.createEvent(b, c, "progress")
    }
  }
};

function onYouTubePlayerAPIReady() {
  mejs.YouTubeApi.iFrameReady()
}

function onYouTubePlayerReady(a) {
  mejs.YouTubeApi.flashReady(a)
}
window.mejs = mejs;
window.MediaElement = mejs.MediaElement;
(function(a, b) {
  var c = {
    locale: {
      language: "",
      strings: {}
    },
    methods: {}
  };
  c.locale.getLanguage = function() {
    return c.locale.language || navigator.language
  };
  if (typeof mejsL10n != "undefined") c.locale.language = mejsL10n.language;
  c.locale.INIT_LANGUAGE = c.locale.getLanguage();
  c.methods.checkPlain = function(d) {
    var e, f, g = {
      "&": "&amp;",
      '"': "&quot;",
      "<": "&lt;",
      ">": "&gt;"
    };
    d = String(d);
    for (e in g)
      if (g.hasOwnProperty(e)) {
        f = RegExp(e, "g");
        d = d.replace(f, g[e])
      } return d
  };
  c.methods.formatString = function(d, e) {
    for (var f in e) {
      switch (f.charAt(0)) {
        case "@":
          e[f] =
            c.methods.checkPlain(e[f]);
          break;
        case "!":
          break;
        default:
          e[f] = '<em class="placeholder">' + c.methods.checkPlain(e[f]) + "</em>"
      }
      d = d.replace(f, e[f])
    }
    return d
  };
  c.methods.t = function(d, e, f) {
    if (c.locale.strings && c.locale.strings[f.context] && c.locale.strings[f.context][d]) d = c.locale.strings[f.context][d];
    if (e) d = c.methods.formatString(d, e);
    return d
  };
  c.t = function(d, e, f) {
    if (typeof d === "string" && d.length > 0) {
      var g = c.locale.getLanguage();
      f = f || {
        context: g
      };
      return c.methods.t(d, e, f)
    } else throw {
      name: "InvalidArgumentException",
      message: "First argument is either not a string or empty."
    };
  };
  b.i18n = c
})(document, mejs);
(function(a) {
  if (typeof mejsL10n != "undefined") a[mejsL10n.language] = mejsL10n.strings
})(mejs.i18n.locale.strings);
(function(a) {
  a.de = {
    Fullscreen: "Vollbild",
    "Go Fullscreen": "Vollbild an",
    "Turn off Fullscreen": "Vollbild aus",
    Close: "Schlie\u00dfen"
  }
})(mejs.i18n.locale.strings);
(function(a) {
  a.zh = {
    Fullscreen: "\u5168\u87a2\u5e55",
    "Go Fullscreen": "\u5168\u5c4f\u6a21\u5f0f",
    "Turn off Fullscreen": "\u9000\u51fa\u5168\u5c4f\u6a21\u5f0f",
    Close: "\u95dc\u9589"
  }
})(mejs.i18n.locale.strings);

/*!
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2013, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
if (typeof jQuery != "undefined") mejs.$ = jQuery;
else if (typeof ender != "undefined") mejs.$ = ender;
(function(f) {
  mejs.MepDefaults = {
    poster: "",
    showPosterWhenEnded: false,
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    videoWidth: -1,
    videoHeight: -1,
    defaultAudioWidth: 400,
    defaultAudioHeight: 30,
    defaultSeekBackwardInterval: function(a) {
      return a.duration * 0.05
    },
    defaultSeekForwardInterval: function(a) {
      return a.duration * 0.05
    },
    audioWidth: -1,
    audioHeight: -1,
    startVolume: 0.8,
    loop: false,
    autoRewind: true,
    enableAutosize: true,
    alwaysShowHours: false,
    showTimecodeFrameCount: false,
    framesPerSecond: 25,
    autosizeProgress: true,
    alwaysShowControls: false,
    hideVideoControlsOnLoad: false,
    clickToPlayPause: true,
    iPadUseNativeControls: false,
    iPhoneUseNativeControls: false,
    AndroidUseNativeControls: false,
    features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
    isVideo: true,
    enableKeyboard: true,
    pauseOtherPlayers: true,
    keyActions: [{
      keys: [32, 179],
      action: function(a, b) {
        b.paused || b.ended ? b.play() : b.pause()
      }
    }, {
      keys: [38],
      action: function(a, b) {
        b.setVolume(Math.min(b.volume + 0.1, 1))
      }
    }, {
      keys: [40],
      action: function(a, b) {
        b.setVolume(Math.max(b.volume -
          0.1, 0))
      }
    }, {
      keys: [37, 227],
      action: function(a, b) {
        if (!isNaN(b.duration) && b.duration > 0) {
          if (a.isVideo) {
            a.showControls();
            a.startControlsTimer()
          }
          var c = Math.max(b.currentTime - a.options.defaultSeekBackwardInterval(b), 0);
          b.setCurrentTime(c)
        }
      }
    }, {
      keys: [39, 228],
      action: function(a, b) {
        if (!isNaN(b.duration) && b.duration > 0) {
          if (a.isVideo) {
            a.showControls();
            a.startControlsTimer()
          }
          var c = Math.min(b.currentTime + a.options.defaultSeekForwardInterval(b), b.duration);
          b.setCurrentTime(c)
        }
      }
    }, {
      keys: [70],
      action: function(a) {
        if (typeof a.enterFullScreen !=
          "undefined") a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
      }
    }]
  };
  mejs.mepIndex = 0;
  mejs.players = {};
  mejs.MediaElementPlayer = function(a, b) {
    if (!(this instanceof mejs.MediaElementPlayer)) return new mejs.MediaElementPlayer(a, b);
    this.$media = this.$node = f(a);
    this.node = this.media = this.$media[0];
    if (typeof this.node.player != "undefined") return this.node.player;
    else this.node.player = this;
    if (typeof b == "undefined") b = this.$node.data("mejsoptions");
    this.options = f.extend({}, mejs.MepDefaults, b);
    this.id = "mep_" + mejs.mepIndex++;
    mejs.players[this.id] = this;
    this.init();
    return this
  };
  mejs.MediaElementPlayer.prototype = {
    hasFocus: false,
    controlsAreVisible: true,
    init: function() {
      var a = this,
        b = mejs.MediaFeatures,
        c = f.extend(true, {}, a.options, {
          success: function(d, g) {
            a.meReady(d, g)
          },
          error: function(d) {
            a.handleError(d)
          }
        }),
        e = a.media.tagName.toLowerCase();
      a.isDynamic = e !== "audio" && e !== "video";
      a.isVideo = a.isDynamic ? a.options.isVideo : e !== "audio" && a.options.isVideo;
      if (b.isiPad && a.options.iPadUseNativeControls || b.isiPhone && a.options.iPhoneUseNativeControls) {
        a.$media.attr("controls",
          "controls");
        if (b.isiPad && a.media.getAttribute("autoplay") !== null) {
          a.media.load();
          a.media.play()
        }
      } else if (!(b.isAndroid && a.options.AndroidUseNativeControls)) {
        a.$media.removeAttr("controls");
        a.container = f('<div id="' + a.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(a.$media[0].className).insertBefore(a.$media);
        a.container.addClass((b.isAndroid ? "mejs-android " : "") + (b.isiOS ? "mejs-ios " : "") + (b.isiPad ? "mejs-ipad " : "") + (b.isiPhone ? "mejs-iphone " : "") + (a.isVideo ? "mejs-video " : "mejs-audio "));
        if (b.isiOS) {
          b = a.$media.clone();
          a.container.find(".mejs-mediaelement").append(b);
          a.$media.remove();
          a.$node = a.$media = b;
          a.node = a.media = b[0]
        } else a.container.find(".mejs-mediaelement").append(a.$media);
        a.controls = a.container.find(".mejs-controls");
        a.layers = a.container.find(".mejs-layers");
        b = a.isVideo ? "video" : "audio";
        e = b.substring(0,
          1).toUpperCase() + b.substring(1);
        a.width = a.options[b + "Width"] > 0 || a.options[b + "Width"].toString().indexOf("%") > -1 ? a.options[b + "Width"] : a.media.style.width !== "" && a.media.style.width !== null ? a.media.style.width : a.media.getAttribute("width") !== null ? a.$media.attr("width") : a.options["default" + e + "Width"];
        a.height = a.options[b + "Height"] > 0 || a.options[b + "Height"].toString().indexOf("%") > -1 ? a.options[b + "Height"] : a.media.style.height !== "" && a.media.style.height !== null ? a.media.style.height : a.$media[0].getAttribute("height") !==
          null ? a.$media.attr("height") : a.options["default" + e + "Height"];
        a.setPlayerSize(a.width, a.height);
        c.pluginWidth = a.width;
        c.pluginHeight = a.height
      }
      mejs.MediaElement(a.$media[0], c);
      typeof a.container != "undefined" && a.controlsAreVisible && a.container.trigger("controlsshown")
    },
    showControls: function(a) {
      var b = this;
      a = typeof a == "undefined" || a;
      if (!b.controlsAreVisible) {
        if (a) {
          b.controls.css("visibility", "visible").stop(true, true).fadeIn(200, function() {
            b.controlsAreVisible = true;
            b.container.trigger("controlsshown")
          });
          b.container.find(".mejs-control").css("visibility", "visible").stop(true, true).fadeIn(200, function() {
            b.controlsAreVisible = true
          })
        } else {
          b.controls.css("visibility", "visible").css("display", "block");
          b.container.find(".mejs-control").css("visibility", "visible").css("display", "block");
          b.controlsAreVisible = true;
          b.container.trigger("controlsshown")
        }
        b.setControlsSize()
      }
    },
    hideControls: function(a) {
      var b = this;
      a = typeof a == "undefined" || a;
      if (!(!b.controlsAreVisible || b.options.alwaysShowControls))
        if (a) {
          b.controls.stop(true,
            true).fadeOut(200, function() {
            f(this).css("visibility", "hidden").css("display", "block");
            b.controlsAreVisible = false;
            b.container.trigger("controlshidden")
          });
          b.container.find(".mejs-control").stop(true, true).fadeOut(200, function() {
            f(this).css("visibility", "hidden").css("display", "block")
          })
        } else {
          b.controls.css("visibility", "hidden").css("display", "block");
          b.container.find(".mejs-control").css("visibility", "hidden").css("display", "block");
          b.controlsAreVisible = false;
          b.container.trigger("controlshidden")
        }
    },
    controlsTimer: null,
    startControlsTimer: function(a) {
      var b = this;
      a = typeof a != "undefined" ? a : 1500;
      b.killControlsTimer("start");
      b.controlsTimer = setTimeout(function() {
        b.hideControls();
        b.killControlsTimer("hide")
      }, a)
    },
    killControlsTimer: function() {
      if (this.controlsTimer !== null) {
        clearTimeout(this.controlsTimer);
        delete this.controlsTimer;
        this.controlsTimer = null
      }
    },
    controlsEnabled: true,
    disableControls: function() {
      this.killControlsTimer();
      this.hideControls(false);
      this.controlsEnabled = false
    },
    enableControls: function() {
      this.showControls(false);
      this.controlsEnabled = true
    },
    meReady: function(a, b) {
      var c = this,
        e = mejs.MediaFeatures,
        d = b.getAttribute("autoplay");
      d = !(typeof d == "undefined" || d === null || d === "false");
      var g;
      if (!c.created) {
        c.created = true;
        c.media = a;
        c.domNode = b;
        if (!(e.isAndroid && c.options.AndroidUseNativeControls) && !(e.isiPad && c.options.iPadUseNativeControls) && !(e.isiPhone && c.options.iPhoneUseNativeControls)) {
          c.buildposter(c, c.controls, c.layers, c.media);
          c.buildkeyboard(c, c.controls, c.layers, c.media);
          c.buildoverlays(c, c.controls, c.layers, c.media);
          c.findTracks();
          for (g in c.options.features) {
            e = c.options.features[g];
            if (c["build" + e]) try {
              c["build" + e](c, c.controls, c.layers, c.media)
            } catch (k) {}
          }
          c.container.trigger("controlsready");
          c.setPlayerSize(c.width, c.height);
          c.setControlsSize();
          if (c.isVideo) {
            if (mejs.MediaFeatures.hasTouch) c.$media.bind("touchstart", function() {
              if (c.controlsAreVisible) c.hideControls(false);
              else c.controlsEnabled && c.showControls(false)
            });
            else {
              mejs.MediaElementPlayer.prototype.clickToPlayPauseCallback = function() {
                if (c.options.clickToPlayPause) c.media.paused ?
                  c.media.play() : c.media.pause()
              };
              c.media.addEventListener("click", c.clickToPlayPauseCallback, false);
              c.container.bind("mouseenter mouseover", function() {
                if (c.controlsEnabled)
                  if (!c.options.alwaysShowControls) {
                    c.killControlsTimer("enter");
                    c.showControls();
                    c.startControlsTimer(2500)
                  }
              }).bind("mousemove", function() {
                if (c.controlsEnabled) {
                  c.controlsAreVisible || c.showControls();
                  c.options.alwaysShowControls || c.startControlsTimer(2500)
                }
              }).bind("mouseleave", function() {
                c.controlsEnabled && !c.media.paused && !c.options.alwaysShowControls &&
                  c.startControlsTimer(1E3)
              })
            }
            c.options.hideVideoControlsOnLoad && c.hideControls(false);
            d && !c.options.alwaysShowControls && c.hideControls();
            c.options.enableAutosize && c.media.addEventListener("loadedmetadata", function(j) {
              if (c.options.videoHeight <= 0 && c.domNode.getAttribute("height") === null && !isNaN(j.target.videoHeight)) {
                c.setPlayerSize(j.target.videoWidth, j.target.videoHeight);
                c.setControlsSize();
                c.media.setVideoSize(j.target.videoWidth, j.target.videoHeight)
              }
            }, false)
          }
          a.addEventListener("play", function() {
            for (var j in mejs.players) {
              var m =
                mejs.players[j];
              m.id != c.id && c.options.pauseOtherPlayers && !m.paused && !m.ended && m.pause();
              m.hasFocus = false
            }
            c.hasFocus = true
          }, false);
          c.media.addEventListener("ended", function() {
            if (c.options.autoRewind) try {
              c.media.setCurrentTime(0)
            } catch (j) {}
            c.media.pause();
            c.setProgressRail && c.setProgressRail();
            c.setCurrentRail && c.setCurrentRail();
            if (c.options.loop) c.media.play();
            else !c.options.alwaysShowControls && c.controlsEnabled && c.showControls()
          }, false);
          c.media.addEventListener("loadedmetadata", function() {
            c.updateDuration &&
              c.updateDuration();
            c.updateCurrent && c.updateCurrent();
            if (!c.isFullScreen) {
              c.setPlayerSize(c.width, c.height);
              c.setControlsSize()
            }
          }, false);
          setTimeout(function() {
            c.setPlayerSize(c.width, c.height);
            c.setControlsSize()
          }, 50);
          c.globalBind("resize", function() {
            c.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || c.setPlayerSize(c.width, c.height);
            c.setControlsSize()
          });
          c.media.pluginType == "youtube" && c.container.find(".mejs-overlay-play").hide()
        }
        if (d && a.pluginType == "native") {
          a.load();
          a.play()
        }
        if (c.options.success) typeof c.options.success == "string" ? window[c.options.success](c.media, c.domNode, c) : c.options.success(c.media, c.domNode, c)
      }
    },
    handleError: function(a) {
      this.controls.hide();
      this.options.error && this.options.error(a)
    },
    setPlayerSize: function(a, b) {
      if (typeof a != "undefined") this.width = a;
      if (typeof b != "undefined") this.height = b;
      if (this.height.toString().indexOf("%") > 0 || this.$node.css("max-width") === "100%" || parseInt(this.$node.css("max-width").replace(/px/, ""), 10) / this.$node.offsetParent().width() ===
        1 || this.$node[0].currentStyle && this.$node[0].currentStyle.maxWidth === "100%") {
        var c = this.isVideo ? this.media.videoWidth && this.media.videoWidth > 0 ? this.media.videoWidth : this.options.defaultVideoWidth : this.options.defaultAudioWidth,
          e = this.isVideo ? this.media.videoHeight && this.media.videoHeight > 0 ? this.media.videoHeight : this.options.defaultVideoHeight : this.options.defaultAudioHeight,
          d = this.container.parent().closest(":visible").width();
        c = this.isVideo || !this.options.autosizeProgress ? parseInt(d * e / c, 10) : e;
        if (this.container.parent()[0].tagName.toLowerCase() ===
          "body") {
          d = f(window).width();
          c = f(window).height()
        }
        if (c != 0 && d != 0) {
          this.container.width(d).height(c);
          this.$media.add(this.container.find(".mejs-shim")).width("100%").height("100%");
          this.isVideo && this.media.setVideoSize && this.media.setVideoSize(d, c);
          this.layers.children(".mejs-layer").width("100%").height("100%")
        }
      } else {
        this.container.width(this.width).height(this.height);
        this.layers.children(".mejs-layer").width(this.width).height(this.height)
      }
      d = this.layers.find(".mejs-overlay-play");
      c = d.find(".mejs-overlay-button");
      d.height(this.container.height() - this.controls.height());
      c.css("margin-top", "-" + (c.height() / 2 - this.controls.height() / 2).toString() + "px")
    },
    setControlsSize: function() {
      var a = 0,
        b = 0,
        c = this.controls.find(".mejs-time-rail"),
        e = this.controls.find(".mejs-time-total");
      this.controls.find(".mejs-time-current");
      this.controls.find(".mejs-time-loaded");
      var d = c.siblings();
      if (this.options && !this.options.autosizeProgress) b = parseInt(c.css("width"));
      if (b === 0 || !b) {
        d.each(function() {
          var g = f(this);
          if (g.css("position") !=
            "absolute" && g.is(":visible")) a += f(this).outerWidth(true)
        });
        b = this.controls.width() - a - (c.outerWidth(true) - c.width()) - 1
      }
      c.width(b);
      e.width(b - (e.outerWidth(true) - e.width()));
      this.setProgressRail && this.setProgressRail();
      this.setCurrentRail && this.setCurrentRail()
    },
    buildposter: function(a, b, c, e) {
      var d = f('<div class="mejs-poster mejs-layer"></div>').appendTo(c);
      b = a.$media.attr("poster");
      if (a.options.poster !== "") b = a.options.poster;
      b !== "" && b != null ? this.setPoster(b) : d.hide();
      e.addEventListener("play", function() {
          d.hide()
        },
        false);
      a.options.showPosterWhenEnded && a.options.autoRewind && e.addEventListener("ended", function() {
        d.show()
      }, false)
    },
    setPoster: function(a) {
      var b = this.container.find(".mejs-poster"),
        c = b.find("img");
      if (c.length == 0) c = f('<img width="100%" height="100%" />').appendTo(b);
      c.attr("src", a);
      b.css({
        "background-image": "url(" + a + ")"
      })
    },
    buildoverlays: function(a, b, c, e) {
      var d = this;
      if (a.isVideo) {
        var g = f('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(c),
          k = f('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(c),
          j = f('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(c).click(function() {
            if (d.options.clickToPlayPause) e.paused ? e.play() : e.pause()
          });
        e.addEventListener("play", function() {
          j.hide();
          g.hide();
          b.find(".mejs-time-buffering").hide();
          k.hide()
        }, false);
        e.addEventListener("playing", function() {
          j.hide();
          g.hide();
          b.find(".mejs-time-buffering").hide();
          k.hide()
        }, false);
        e.addEventListener("seeking", function() {
          g.show();
          b.find(".mejs-time-buffering").show()
        }, false);
        e.addEventListener("seeked", function() {
          g.hide();
          b.find(".mejs-time-buffering").hide()
        }, false);
        e.addEventListener("pause", function() {
          mejs.MediaFeatures.isiPhone || j.show()
        }, false);
        e.addEventListener("waiting", function() {
          g.show();
          b.find(".mejs-time-buffering").show()
        }, false);
        e.addEventListener("loadeddata", function() {
          g.show();
          b.find(".mejs-time-buffering").show()
        }, false);
        e.addEventListener("canplay",
          function() {
            g.hide();
            b.find(".mejs-time-buffering").hide()
          }, false);
        e.addEventListener("error", function() {
          g.hide();
          b.find(".mejs-time-buffering").hide();
          k.show();
          k.find("mejs-overlay-error").html("Error loading this resource")
        }, false)
      }
    },
    buildkeyboard: function(a, b, c, e) {
      this.globalBind("keydown", function(d) {
        if (a.hasFocus && a.options.enableKeyboard)
          for (var g = 0, k = a.options.keyActions.length; g < k; g++)
            for (var j = a.options.keyActions[g], m = 0, q = j.keys.length; m < q; m++)
              if (d.keyCode == j.keys[m]) {
                d.preventDefault();
                j.action(a, e, d.keyCode);
                return false
              } return true
      });
      this.globalBind("click", function(d) {
        if (f(d.target).closest(".mejs-container").length == 0) a.hasFocus = false
      })
    },
    findTracks: function() {
      var a = this,
        b = a.$media.find("track");
      a.tracks = [];
      b.each(function(c, e) {
        e = f(e);
        a.tracks.push({
          srclang: e.attr("srclang") ? e.attr("srclang").toLowerCase() : "",
          src: e.attr("src"),
          kind: e.attr("kind"),
          label: e.attr("label") || "",
          entries: [],
          isLoaded: false
        })
      })
    },
    changeSkin: function(a) {
      this.container[0].className = "mejs-container " + a;
      this.setPlayerSize(this.width,
        this.height);
      this.setControlsSize()
    },
    play: function() {
      this.media.play()
    },
    pause: function() {
      try {
        this.media.pause()
      } catch (a) {}
    },
    load: function() {
      this.media.load()
    },
    setMuted: function(a) {
      this.media.setMuted(a)
    },
    setCurrentTime: function(a) {
      this.media.setCurrentTime(a)
    },
    getCurrentTime: function() {
      return this.media.currentTime
    },
    setVolume: function(a) {
      this.media.setVolume(a)
    },
    getVolume: function() {
      return this.media.volume
    },
    setSrc: function(a) {
      this.media.setSrc(a)
    },
    remove: function() {
      var a, b;
      for (a in this.options.features) {
        b =
          this.options.features[a];
        if (this["clean" + b]) try {
          this["clean" + b](this)
        } catch (c) {}
      }
      if (this.isDynamic) this.$node.insertBefore(this.container);
      else {
        this.$media.prop("controls", true);
        this.$node.clone().show().insertBefore(this.container);
        this.$node.remove()
      }
      this.media.pluginType !== "native" && this.media.remove();
      delete mejs.players[this.id];
      this.container.remove();
      this.globalUnbind();
      delete this.node.player
    }
  };
  (function() {
    function a(c, e) {
      var d = {
        d: [],
        w: []
      };
      f.each((c || "").split(" "), function(g, k) {
        var j = k + "." +
          e;
        if (j.indexOf(".") === 0) {
          d.d.push(j);
          d.w.push(j)
        } else d[b.test(k) ? "w" : "d"].push(j)
      });
      d.d = d.d.join(" ");
      d.w = d.w.join(" ");
      return d
    }
    var b = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
    mejs.MediaElementPlayer.prototype.globalBind = function(c, e, d) {
      c = a(c, this.id);
      c.d && f(document).bind(c.d, e, d);
      c.w && f(window).bind(c.w, e, d)
    };
    mejs.MediaElementPlayer.prototype.globalUnbind = function(c, e) {
      c = a(c, this.id);
      c.d && f(document).unbind(c.d, e);
      c.w && f(window).unbind(c.w,
        e)
    }
  })();
  if (typeof jQuery != "undefined") jQuery.fn.mediaelementplayer = function(a) {
    a === false ? this.each(function() {
      var b = jQuery(this).data("mediaelementplayer");
      b && b.remove();
      jQuery(this).removeData("mediaelementplayer")
    }) : this.each(function() {
      jQuery(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, a))
    });
    return this
  };
  f(document).ready(function() {
    f(".mejs-player").mediaelementplayer()
  });
  window.MediaElementPlayer = mejs.MediaElementPlayer
})(mejs.$);
(function(f) {
  f.extend(mejs.MepDefaults, {
    playpauseText: mejs.i18n.t("Play/Pause")
  });
  f.extend(MediaElementPlayer.prototype, {
    buildplaypause: function(a, b, c, e) {
      var d = f('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + this.id + '" title="' + this.options.playpauseText + '" aria-label="' + this.options.playpauseText + '"></button></div>').appendTo(b).click(function(g) {
        g.preventDefault();
        e.paused ? e.play() : e.pause();
        return false
      });
      e.addEventListener("play", function() {
          d.removeClass("mejs-play").addClass("mejs-pause")
        },
        false);
      e.addEventListener("playing", function() {
        d.removeClass("mejs-play").addClass("mejs-pause")
      }, false);
      e.addEventListener("pause", function() {
        d.removeClass("mejs-pause").addClass("mejs-play")
      }, false);
      e.addEventListener("paused", function() {
        d.removeClass("mejs-pause").addClass("mejs-play")
      }, false)
    }
  })
})(mejs.$);
(function(f) {
  f.extend(mejs.MepDefaults, {
    stopText: "Stop"
  });
  f.extend(MediaElementPlayer.prototype, {
    buildstop: function(a, b, c, e) {
      f('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + this.id + '" title="' + this.options.stopText + '" aria-label="' + this.options.stopText + '"></button></div>').appendTo(b).click(function() {
        e.paused || e.pause();
        if (e.currentTime > 0) {
          e.setCurrentTime(0);
          e.pause();
          b.find(".mejs-time-current").width("0px");
          b.find(".mejs-time-handle").css("left",
            "0px");
          b.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0));
          b.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0));
          c.find(".mejs-poster").show()
        }
      })
    }
  })
})(mejs.$);
(function(f) {
  f.extend(MediaElementPlayer.prototype, {
    buildprogress: function(a, b, c, e) {
      f('<div class="mejs-time-rail"><span class="mejs-time-total"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(b);
      b.find(".mejs-time-buffering").hide();
      var d =
        this,
        g = b.find(".mejs-time-total");
      c = b.find(".mejs-time-loaded");
      var k = b.find(".mejs-time-current"),
        j = b.find(".mejs-time-handle"),
        m = b.find(".mejs-time-float"),
        q = b.find(".mejs-time-float-current"),
        p = function(h) {
          h = h.pageX;
          var l = g.offset(),
            r = g.outerWidth(true),
            n = 0,
            o = n = 0;
          if (e.duration) {
            if (h < l.left) h = l.left;
            else if (h > r + l.left) h = r + l.left;
            o = h - l.left;
            n = o / r;
            n = n <= 0.02 ? 0 : n * e.duration;
            t && n !== e.currentTime && e.setCurrentTime(n);
            if (!mejs.MediaFeatures.hasTouch) {
              m.css("left", o);
              q.html(mejs.Utility.secondsToTimeCode(n));
              m.show()
            }
          }
        },
        t = false;
      g.bind("mousedown", function(h) {
        if (h.which === 1) {
          t = true;
          p(h);
          d.globalBind("mousemove.dur", function(l) {
            p(l)
          });
          d.globalBind("mouseup.dur", function() {
            t = false;
            m.hide();
            d.globalUnbind(".dur")
          });
          return false
        }
      }).bind("mouseenter", function() {
        d.globalBind("mousemove.dur", function(h) {
          p(h)
        });
        mejs.MediaFeatures.hasTouch || m.show()
      }).bind("mouseleave", function() {
        if (!t) {
          d.globalUnbind(".dur");
          m.hide()
        }
      });
      e.addEventListener("progress", function(h) {
        a.setProgressRail(h);
        a.setCurrentRail(h)
      }, false);
      e.addEventListener("timeupdate", function(h) {
        a.setProgressRail(h);
        a.setCurrentRail(h)
      }, false);
      d.loaded = c;
      d.total = g;
      d.current = k;
      d.handle = j
    },
    setProgressRail: function(a) {
      var b = a != undefined ? a.target : this.media,
        c = null;
      if (b && b.buffered && b.buffered.length > 0 && b.buffered.end && b.duration) c = b.buffered.end(0) / b.duration;
      else if (b && b.bytesTotal != undefined && b.bytesTotal > 0 && b.bufferedBytes != undefined) c = b.bufferedBytes / b.bytesTotal;
      else if (a && a.lengthComputable && a.total != 0) c = a.loaded / a.total;
      if (c !== null) {
        c = Math.min(1,
          Math.max(0, c));
        this.loaded && this.total && this.loaded.width(this.total.width() * c)
      }
    },
    setCurrentRail: function() {
      if (this.media.currentTime != undefined && this.media.duration)
        if (this.total && this.handle) {
          var a = Math.round(this.total.width() * this.media.currentTime / this.media.duration),
            b = a - Math.round(this.handle.outerWidth(true) / 2);
          this.current.width(a);
          this.handle.css("left", b)
        }
    }
  })
})(mejs.$);
(function(f) {
  f.extend(mejs.MepDefaults, {
    duration: -1,
    timeAndDurationSeparator: "<span> | </span>"
  });
  f.extend(MediaElementPlayer.prototype, {
    buildcurrent: function(a, b, c, e) {
      f('<div class="mejs-time"><span class="mejs-currenttime">' + (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(b);
      this.currenttime = this.controls.find(".mejs-currenttime");
      e.addEventListener("timeupdate", function() {
        a.updateCurrent()
      }, false)
    },
    buildduration: function(a, b,
      c, e) {
      if (b.children().last().find(".mejs-currenttime").length > 0) f(this.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span>").appendTo(b.find(".mejs-time"));
      else {
        b.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container");
        f('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span></div>").appendTo(b)
      }
      this.durationD = this.controls.find(".mejs-duration");
      e.addEventListener("timeupdate", function() {
          a.updateDuration()
        },
        false)
    },
    updateCurrent: function() {
      if (this.currenttime) this.currenttime.html(mejs.Utility.secondsToTimeCode(this.media.currentTime, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
    },
    updateDuration: function() {
      this.container.toggleClass("mejs-long-video", this.media.duration > 3600);
      if (this.durationD && (this.options.duration > 0 || this.media.duration)) this.durationD.html(mejs.Utility.secondsToTimeCode(this.options.duration > 0 ? this.options.duration :
        this.media.duration, this.options.alwaysShowHours, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
    }
  })
})(mejs.$);
(function(f) {
  f.extend(mejs.MepDefaults, {
    muteText: mejs.i18n.t("Mute Toggle"),
    hideVolumeOnTouchDevices: true,
    audioVolume: "horizontal",
    videoVolume: "vertical"
  });
  f.extend(MediaElementPlayer.prototype, {
    buildvolume: function(a, b, c, e) {
      if (!(mejs.MediaFeatures.hasTouch && this.options.hideVolumeOnTouchDevices)) {
        var d = this,
          g = d.isVideo ? d.options.videoVolume : d.options.audioVolume,
          k = g == "horizontal" ? f('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + d.id + '" title="' + d.options.muteText +
            '" aria-label="' + d.options.muteText + '"></button></div><div class="mejs-horizontal-volume-slider"><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></div>').appendTo(b) : f('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + d.id + '" title="' + d.options.muteText + '" aria-label="' + d.options.muteText + '"></button><div class="mejs-volume-slider"><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></div></div>').appendTo(b),
          j = d.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
          m = d.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
          q = d.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
          p = d.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
          t = function(n, o) {
            if (!j.is(":visible") && typeof o == "undefined") {
              j.show();
              t(n, true);
              j.hide()
            } else {
              n = Math.max(0, n);
              n = Math.min(n, 1);
              n == 0 ? k.removeClass("mejs-mute").addClass("mejs-unmute") : k.removeClass("mejs-unmute").addClass("mejs-mute");
              if (g == "vertical") {
                var s = m.height(),
                  u = m.position(),
                  v = s - s * n;
                p.css("top", Math.round(u.top + v - p.height() / 2));
                q.height(s - v);
                q.css("top", u.top + v)
              } else {
                s = m.width();
                u = m.position();
                s = s * n;
                p.css("left", Math.round(u.left + s - p.width() / 2));
                q.width(Math.round(s))
              }
            }
          },
          h = function(n) {
            var o = null,
              s = m.offset();
            if (g == "vertical") {
              o = m.height();
              parseInt(m.css("top").replace(/px/, ""), 10);
              o = (o - (n.pageY - s.top)) / o;
              if (s.top == 0 || s.left == 0) return
            } else {
              o = m.width();
              o = (n.pageX - s.left) / o
            }
            o = Math.max(0, o);
            o = Math.min(o, 1);
            t(o);
            o == 0 ? e.setMuted(true) :
              e.setMuted(false);
            e.setVolume(o)
          },
          l = false,
          r = false;
        k.hover(function() {
          j.show();
          r = true
        }, function() {
          r = false;
          !l && g == "vertical" && j.hide()
        });
        j.bind("mouseover", function() {
          r = true
        }).bind("mousedown", function(n) {
          h(n);
          d.globalBind("mousemove.vol", function(o) {
            h(o)
          });
          d.globalBind("mouseup.vol", function() {
            l = false;
            d.globalUnbind(".vol");
            !r && g == "vertical" && j.hide()
          });
          l = true;
          return false
        });
        k.find("button").click(function() {
          e.setMuted(!e.muted)
        });
        e.addEventListener("volumechange", function() {
          if (!l)
            if (e.muted) {
              t(0);
              k.removeClass("mejs-mute").addClass("mejs-unmute")
            } else {
              t(e.volume);
              k.removeClass("mejs-unmute").addClass("mejs-mute")
            }
        }, false);
        if (d.container.is(":visible")) {
          t(a.options.startVolume);
          a.options.startVolume === 0 && e.setMuted(true);
          e.pluginType === "native" && e.setVolume(a.options.startVolume)
        }
      }
    }
  })
})(mejs.$);
(function(f) {
  f.extend(mejs.MepDefaults, {
    usePluginFullScreen: true,
    newWindowCallback: function() {
      return ""
    },
    fullscreenText: mejs.i18n.t("Fullscreen")
  });
  f.extend(MediaElementPlayer.prototype, {
    isFullScreen: false,
    isNativeFullScreen: false,
    isInIframe: false,
    buildfullscreen: function(a, b, c, e) {
      if (a.isVideo) {
        a.isInIframe = window.location != window.parent.location;
        if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
          c = function() {
            if (a.isFullScreen)
              if (mejs.MediaFeatures.isFullScreen()) {
                a.isNativeFullScreen = true;
                a.setControlsSize()
              } else {
                a.isNativeFullScreen =
                  false;
                a.exitFullScreen()
              }
          };
          mejs.MediaFeatures.hasMozNativeFullScreen ? a.globalBind(mejs.MediaFeatures.fullScreenEventName, c) : a.container.bind(mejs.MediaFeatures.fullScreenEventName, c)
        }
        var d = this,
          g = f('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + d.id + '" title="' + d.options.fullscreenText + '" aria-label="' + d.options.fullscreenText + '"></button></div>').appendTo(b);
        if (d.media.pluginType === "native" || !d.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox) g.click(function() {
          mejs.MediaFeatures.hasTrueNativeFullScreen &&
            mejs.MediaFeatures.isFullScreen() || a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
        });
        else {
          var k = null;
          if (function() {
              var h = document.createElement("x"),
                l = document.documentElement,
                r = window.getComputedStyle;
              if (!("pointerEvents" in h.style)) return false;
              h.style.pointerEvents = "auto";
              h.style.pointerEvents = "x";
              l.appendChild(h);
              r = r && r(h, "").pointerEvents === "auto";
              l.removeChild(h);
              return !!r
            }() && !mejs.MediaFeatures.isOpera) {
            var j = false,
              m = function() {
                if (j) {
                  for (var h in q) q[h].hide();
                  g.css("pointer-events",
                    "");
                  d.controls.css("pointer-events", "");
                  d.media.removeEventListener("click", d.clickToPlayPauseCallback);
                  j = false
                }
              },
              q = {};
            b = ["top", "left", "right", "bottom"];
            var p, t = function() {
              var h = g.offset().left - d.container.offset().left,
                l = g.offset().top - d.container.offset().top,
                r = g.outerWidth(true),
                n = g.outerHeight(true),
                o = d.container.width(),
                s = d.container.height();
              for (p in q) q[p].css({
                position: "absolute",
                top: 0,
                left: 0
              });
              q.top.width(o).height(l);
              q.left.width(h).height(n).css({
                top: l
              });
              q.right.width(o - h - r).height(n).css({
                top: l,
                left: h + r
              });
              q.bottom.width(o).height(s - n - l).css({
                top: l + n
              })
            };
            d.globalBind("resize", function() {
              t()
            });
            p = 0;
            for (c = b.length; p < c; p++) q[b[p]] = f('<div class="mejs-fullscreen-hover" />').appendTo(d.container).mouseover(m).hide();
            g.on("mouseover", function() {
              if (!d.isFullScreen) {
                var h = g.offset(),
                  l = a.container.offset();
                e.positionFullscreenButton(h.left - l.left, h.top - l.top, false);
                g.css("pointer-events", "none");
                d.controls.css("pointer-events", "none");
                d.media.addEventListener("click", d.clickToPlayPauseCallback);
                for (p in q) q[p].show();
                t();
                j = true
              }
            });
            e.addEventListener("fullscreenchange", function() {
              d.isFullScreen = !d.isFullScreen;
              d.isFullScreen ? d.media.removeEventListener("click", d.clickToPlayPauseCallback) : d.media.addEventListener("click", d.clickToPlayPauseCallback);
              m()
            });
            d.globalBind("mousemove", function(h) {
              if (j) {
                var l = g.offset();
                if (h.pageY < l.top || h.pageY > l.top + g.outerHeight(true) || h.pageX < l.left || h.pageX > l.left + g.outerWidth(true)) {
                  g.css("pointer-events", "");
                  d.controls.css("pointer-events", "");
                  j = false
                }
              }
            })
          } else g.on("mouseover",
            function() {
              if (k !== null) {
                clearTimeout(k);
                delete k
              }
              var h = g.offset(),
                l = a.container.offset();
              e.positionFullscreenButton(h.left - l.left, h.top - l.top, true)
            }).on("mouseout", function() {
            if (k !== null) {
              clearTimeout(k);
              delete k
            }
            k = setTimeout(function() {
              e.hideFullscreenButton()
            }, 1500)
          })
        }
        a.fullscreenBtn = g;
        d.globalBind("keydown", function(h) {
          if ((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || d.isFullScreen) && h.keyCode == 27) a.exitFullScreen()
        })
      }
    },
    cleanfullscreen: function(a) {
      a.exitFullScreen()
    },
    containerSizeTimeout: null,
    enterFullScreen: function() {
      var a = this;
      if (!(a.media.pluginType !== "native" && (mejs.MediaFeatures.isFirefox || a.options.usePluginFullScreen))) {
        f(document.documentElement).addClass("mejs-fullscreen");
        normalHeight = a.container.height();
        normalWidth = a.container.width();
        if (a.media.pluginType === "native")
          if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
            mejs.MediaFeatures.requestFullScreen(a.container[0]);
            a.isInIframe && setTimeout(function c() {
              if (a.isNativeFullScreen) f(window).width() !==
                screen.width ? a.exitFullScreen() : setTimeout(c, 500)
            }, 500)
          } else if (mejs.MediaFeatures.hasSemiNativeFullScreen) {
          a.media.webkitEnterFullscreen();
          return
        }
        if (a.isInIframe) {
          var b = a.options.newWindowCallback(this);
          if (b !== "")
            if (mejs.MediaFeatures.hasTrueNativeFullScreen) setTimeout(function() {
              if (!a.isNativeFullScreen) {
                a.pause();
                window.open(b, a.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no")
              }
            }, 250);
            else {
              a.pause();
              window.open(b, a.id,
                "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
              return
            }
        }
        a.container.addClass("mejs-container-fullscreen").width("100%").height("100%");
        a.containerSizeTimeout = setTimeout(function() {
          a.container.css({
            width: "100%",
            height: "100%"
          });
          a.setControlsSize()
        }, 500);
        if (a.media.pluginType === "native") a.$media.width("100%").height("100%");
        else {
          a.container.find(".mejs-shim").width("100%").height("100%");
          a.media.setVideoSize(f(window).width(),
            f(window).height())
        }
        a.layers.children("div").width("100%").height("100%");
        a.fullscreenBtn && a.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen");
        a.setControlsSize();
        a.isFullScreen = true
      }
    },
    exitFullScreen: function() {
      clearTimeout(this.containerSizeTimeout);
      if (this.media.pluginType !== "native" && mejs.MediaFeatures.isFirefox) this.media.setFullscreen(false);
      else {
        if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || this.isFullScreen)) mejs.MediaFeatures.cancelFullScreen();
        f(document.documentElement).removeClass("mejs-fullscreen");
        this.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight);
        if (this.media.pluginType === "native") this.$media.width(normalWidth).height(normalHeight);
        else {
          this.container.find(".mejs-shim").width(normalWidth).height(normalHeight);
          this.media.setVideoSize(normalWidth, normalHeight)
        }
        this.layers.children("div").width(normalWidth).height(normalHeight);
        this.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen");
        this.setControlsSize();
        this.isFullScreen = false
      }
    }
  })
})(mejs.$);
(function(f) {
  f.extend(mejs.MepDefaults, {
    startLanguage: "",
    tracksText: mejs.i18n.t("Captions/Subtitles"),
    hideCaptionsButtonWhenEmpty: true,
    toggleCaptionsButtonWhenOnlyOne: false,
    slidesSelector: ""
  });
  f.extend(MediaElementPlayer.prototype, {
    hasChapters: false,
    buildtracks: function(a, b, c, e) {
      if (a.tracks.length != 0) {
        var d;
        if (this.domNode.textTracks)
          for (d = this.domNode.textTracks.length - 1; d >= 0; d--) this.domNode.textTracks[d].mode = "hidden";
        a.chapters = f('<div class="mejs-chapters mejs-layer"></div>').prependTo(c).hide();
        a.captions =
          f('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover"><span class="mejs-captions-text"></span></div></div>').prependTo(c).hide();
        a.captionsText = a.captions.find(".mejs-captions-text");
        a.captionsButton = f('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + this.id + '" title="' + this.options.tracksText + '" aria-label="' + this.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' +
          a.id + '_captions" id="' + a.id + '_captions_none" value="none" checked="checked" /><label for="' + a.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(b);
        for (d = b = 0; d < a.tracks.length; d++) a.tracks[d].kind == "subtitles" && b++;
        this.options.toggleCaptionsButtonWhenOnlyOne && b == 1 ? a.captionsButton.on("click", function() {
          a.setTrack(a.selectedTrack == null ? a.tracks[0].srclang : "none")
        }) : a.captionsButton.hover(function() {
            f(this).find(".mejs-captions-selector").css("visibility", "visible")
          },
          function() {
            f(this).find(".mejs-captions-selector").css("visibility", "hidden")
          }).on("click", "input[type=radio]", function() {
          lang = this.value;
          a.setTrack(lang)
        });
        a.options.alwaysShowControls ? a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : a.container.bind("controlsshown", function() {
          a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
        }).bind("controlshidden", function() {
          e.paused || a.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
        });
        a.trackToLoad = -1;
        a.selectedTrack = null;
        a.isLoadingTrack = false;
        for (d = 0; d < a.tracks.length; d++) a.tracks[d].kind == "subtitles" && a.addTrackButton(a.tracks[d].srclang, a.tracks[d].label);
        a.loadNextTrack();
        e.addEventListener("timeupdate", function() {
          a.displayCaptions()
        }, false);
        if (a.options.slidesSelector != "") {
          a.slidesContainer = f(a.options.slidesSelector);
          e.addEventListener("timeupdate", function() {
            a.displaySlides()
          }, false)
        }
        e.addEventListener("loadedmetadata", function() {
          a.displayChapters()
        }, false);
        a.container.hover(function() {
          if (a.hasChapters) {
            a.chapters.css("visibility",
              "visible");
            a.chapters.fadeIn(200).height(a.chapters.find(".mejs-chapter").outerHeight())
          }
        }, function() {
          a.hasChapters && !e.paused && a.chapters.fadeOut(200, function() {
            f(this).css("visibility", "hidden");
            f(this).css("display", "block")
          })
        });
        a.node.getAttribute("autoplay") !== null && a.chapters.css("visibility", "hidden")
      }
    },
    setTrack: function(a) {
      var b;
      if (a == "none") {
        this.selectedTrack = null;
        this.captionsButton.removeClass("mejs-captions-enabled")
      } else
        for (b = 0; b < this.tracks.length; b++)
          if (this.tracks[b].srclang == a) {
            this.selectedTrack ==
              null && this.captionsButton.addClass("mejs-captions-enabled");
            this.selectedTrack = this.tracks[b];
            this.captions.attr("lang", this.selectedTrack.srclang);
            this.displayCaptions();
            break
          }
    },
    loadNextTrack: function() {
      this.trackToLoad++;
      if (this.trackToLoad < this.tracks.length) {
        this.isLoadingTrack = true;
        this.loadTrack(this.trackToLoad)
      } else {
        this.isLoadingTrack = false;
        this.checkForTracks()
      }
    },
    loadTrack: function(a) {
      var b = this,
        c = b.tracks[a];
      f.ajax({
        url: c.src,
        dataType: "text",
        success: function(e) {
          c.entries = typeof e == "string" &&
            /<tt\s+xml/ig.exec(e) ? mejs.TrackFormatParser.dfxp.parse(e) : mejs.TrackFormatParser.webvvt.parse(e);
          c.isLoaded = true;
          b.enableTrackButton(c.srclang, c.label);
          b.loadNextTrack();
          c.kind == "chapters" && b.media.addEventListener("play", function() {
            b.media.duration > 0 && b.displayChapters(c)
          }, false);
          c.kind == "slides" && b.setupSlides(c)
        },
        error: function() {
          b.loadNextTrack()
        }
      })
    },
    enableTrackButton: function(a, b) {
      if (b === "") b = mejs.language.codes[a] || a;
      this.captionsButton.find("input[value=" + a + "]").prop("disabled", false).siblings("label").html(b);
      this.options.startLanguage == a && f("#" + this.id + "_captions_" + a).click();
      this.adjustLanguageBox()
    },
    addTrackButton: function(a, b) {
      if (b === "") b = mejs.language.codes[a] || a;
      this.captionsButton.find("ul").append(f('<li><input type="radio" name="' + this.id + '_captions" id="' + this.id + "_captions_" + a + '" value="' + a + '" disabled="disabled" /><label for="' + this.id + "_captions_" + a + '">' + b + " (loading)</label></li>"));
      this.adjustLanguageBox();
      this.container.find(".mejs-captions-translations option[value=" + a + "]").remove()
    },
    adjustLanguageBox: function() {
      this.captionsButton.find(".mejs-captions-selector").height(this.captionsButton.find(".mejs-captions-selector ul").outerHeight(true) + this.captionsButton.find(".mejs-captions-translations").outerHeight(true))
    },
    checkForTracks: function() {
      var a = false;
      if (this.options.hideCaptionsButtonWhenEmpty) {
        for (i = 0; i < this.tracks.length; i++)
          if (this.tracks[i].kind == "subtitles") {
            a = true;
            break
          } if (!a) {
          this.captionsButton.hide();
          this.setControlsSize()
        }
      }
    },
    displayCaptions: function() {
      if (typeof this.tracks !=
        "undefined") {
        var a, b = this.selectedTrack;
        if (b != null && b.isLoaded)
          for (a = 0; a < b.entries.times.length; a++)
            if (this.media.currentTime >= b.entries.times[a].start && this.media.currentTime <= b.entries.times[a].stop) {
              this.captionsText.html(b.entries.text[a]);
              this.captions.show().height(0);
              return
            } this.captions.hide()
      }
    },
    setupSlides: function(a) {
      this.slides = a;
      this.slides.entries.imgs = [this.slides.entries.text.length];
      this.showSlide(0)
    },
    showSlide: function(a) {
      if (!(typeof this.tracks == "undefined" || typeof this.slidesContainer ==
          "undefined")) {
        var b = this,
          c = b.slides.entries.text[a],
          e = b.slides.entries.imgs[a];
        if (typeof e == "undefined" || typeof e.fadeIn == "undefined") b.slides.entries.imgs[a] = e = f('<img src="' + c + '">').on("load", function() {
          e.appendTo(b.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
        });
        else !e.is(":visible") && !e.is(":animated") && e.fadeIn().siblings(":visible").fadeOut()
      }
    },
    displaySlides: function() {
      if (typeof this.slides != "undefined") {
        var a = this.slides,
          b;
        for (b = 0; b < a.entries.times.length; b++)
          if (this.media.currentTime >=
            a.entries.times[b].start && this.media.currentTime <= a.entries.times[b].stop) {
            this.showSlide(b);
            break
          }
      }
    },
    displayChapters: function() {
      var a;
      for (a = 0; a < this.tracks.length; a++)
        if (this.tracks[a].kind == "chapters" && this.tracks[a].isLoaded) {
          this.drawChapters(this.tracks[a]);
          this.hasChapters = true;
          break
        }
    },
    drawChapters: function(a) {
      var b = this,
        c, e, d = e = 0;
      b.chapters.empty();
      for (c = 0; c < a.entries.times.length; c++) {
        e = a.entries.times[c].stop - a.entries.times[c].start;
        e = Math.floor(e / b.media.duration * 100);
        if (e + d > 100 || c == a.entries.times.length -
          1 && e + d < 100) e = 100 - d;
        b.chapters.append(f('<div class="mejs-chapter" rel="' + a.entries.times[c].start + '" style="left: ' + d.toString() + "%;width: " + e.toString() + '%;"><div class="mejs-chapter-block' + (c == a.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + a.entries.text[c] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(a.entries.times[c].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(a.entries.times[c].stop) + "</span></div></div>"));
        d += e
      }
      b.chapters.find("div.mejs-chapter").click(function() {
        b.media.setCurrentTime(parseFloat(f(this).attr("rel")));
        b.media.paused && b.media.play()
      });
      b.chapters.show()
    }
  });
  mejs.language = {
    codes: {
      af: "Afrikaans",
      sq: "Albanian",
      ar: "Arabic",
      be: "Belarusian",
      bg: "Bulgarian",
      ca: "Catalan",
      zh: "Chinese",
      "zh-cn": "Chinese Simplified",
      "zh-tw": "Chinese Traditional",
      hr: "Croatian",
      cs: "Czech",
      da: "Danish",
      nl: "Dutch",
      en: "English",
      et: "Estonian",
      tl: "Filipino",
      fi: "Finnish",
      fr: "French",
      gl: "Galician",
      de: "German",
      el: "Greek",
      ht: "Haitian Creole",
      iw: "Hebrew",
      hi: "Hindi",
      hu: "Hungarian",
      is: "Icelandic",
      id: "Indonesian",
      ga: "Irish",
      it: "Italian",
      ja: "Japanese",
      ko: "Korean",
      lv: "Latvian",
      lt: "Lithuanian",
      mk: "Macedonian",
      ms: "Malay",
      mt: "Maltese",
      no: "Norwegian",
      fa: "Persian",
      pl: "Polish",
      pt: "Portuguese",
      ro: "Romanian",
      ru: "Russian",
      sr: "Serbian",
      sk: "Slovak",
      sl: "Slovenian",
      es: "Spanish",
      sw: "Swahili",
      sv: "Swedish",
      tl: "Tagalog",
      th: "Thai",
      tr: "Turkish",
      uk: "Ukrainian",
      vi: "Vietnamese",
      cy: "Welsh",
      yi: "Yiddish"
    }
  };
  mejs.TrackFormatParser = {
    webvvt: {
      pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/,
      pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
      parse: function(a) {
        var b = 0;
        a = mejs.TrackFormatParser.split2(a, /\r?\n/);
        for (var c = {
            text: [],
            times: []
          }, e, d; b < a.length; b++)
          if (this.pattern_identifier.exec(a[b])) {
            b++;
            if ((e = this.pattern_timecode.exec(a[b])) && b < a.length) {
              b++;
              d = a[b];
              for (b++; a[b] !== "" && b < a.length;) {
                d = d + "\n" + a[b];
                b++
              }
              d = f.trim(d).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
              c.text.push(d);
              c.times.push({
                start: mejs.Utility.convertSMPTEtoSeconds(e[1]) == 0 ? 0.2 : mejs.Utility.convertSMPTEtoSeconds(e[1]),
                stop: mejs.Utility.convertSMPTEtoSeconds(e[3]),
                settings: e[5]
              })
            }
          } return c
      }
    },
    dfxp: {
      parse: function(a) {
        a = f(a).filter("tt");
        var b = 0;
        b = a.children("div").eq(0);
        var c = b.find("p");
        b = a.find("#" + b.attr("style"));
        var e, d;
        a = {
          text: [],
          times: []
        };
        if (b.length) {
          d = b.removeAttr("id").get(0).attributes;
          if (d.length) {
            e = {};
            for (b = 0; b < d.length; b++) e[d[b].name.split(":")[1]] = d[b].value
          }
        }
        for (b = 0; b < c.length; b++) {
          var g;
          d = {
            start: null,
            stop: null,
            style: null
          };
          if (c.eq(b).attr("begin")) d.start = mejs.Utility.convertSMPTEtoSeconds(c.eq(b).attr("begin"));
          if (!d.start && c.eq(b - 1).attr("end")) d.start = mejs.Utility.convertSMPTEtoSeconds(c.eq(b - 1).attr("end"));
          if (c.eq(b).attr("end")) d.stop = mejs.Utility.convertSMPTEtoSeconds(c.eq(b).attr("end"));
          if (!d.stop && c.eq(b + 1).attr("begin")) d.stop = mejs.Utility.convertSMPTEtoSeconds(c.eq(b + 1).attr("begin"));
          if (e) {
            g = "";
            for (var k in e) g += k + ":" + e[k] + ";"
          }
          if (g) d.style = g;
          if (d.start == 0) d.start = 0.2;
          a.times.push(d);
          d = f.trim(c.eq(b).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
            "<a href='$1' target='_blank'>$1</a>");
          a.text.push(d);
          if (a.times.start == 0) a.times.start = 2
        }
        return a
      }
    },
    split2: function(a, b) {
      return a.split(b)
    }
  };
  if ("x\n\ny".split(/\n/gi).length != 3) mejs.TrackFormatParser.split2 = function(a, b) {
    var c = [],
      e = "",
      d;
    for (d = 0; d < a.length; d++) {
      e += a.substring(d, d + 1);
      if (b.test(e)) {
        c.push(e.replace(b, ""));
        e = ""
      }
    }
    c.push(e);
    return c
  }
})(mejs.$);
(function(f) {
  f.extend(mejs.MepDefaults, {
    contextMenuItems: [{
      render: function(a) {
        if (typeof a.enterFullScreen == "undefined") return null;
        return a.isFullScreen ? mejs.i18n.t("Turn off Fullscreen") : mejs.i18n.t("Go Fullscreen")
      },
      click: function(a) {
        a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
      }
    }, {
      render: function(a) {
        return a.media.muted ? mejs.i18n.t("Unmute") : mejs.i18n.t("Mute")
      },
      click: function(a) {
        a.media.muted ? a.setMuted(false) : a.setMuted(true)
      }
    }, {
      isSeparator: true
    }, {
      render: function() {
        return mejs.i18n.t("Download Video")
      },
      click: function(a) {
        window.location.href = a.media.currentSrc
      }
    }]
  });
  f.extend(MediaElementPlayer.prototype, {
    buildcontextmenu: function(a) {
      a.contextMenu = f('<div class="mejs-contextmenu"></div>').appendTo(f("body")).hide();
      a.container.bind("contextmenu", function(b) {
        if (a.isContextMenuEnabled) {
          b.preventDefault();
          a.renderContextMenu(b.clientX - 1, b.clientY - 1);
          return false
        }
      });
      a.container.bind("click", function() {
        a.contextMenu.hide()
      });
      a.contextMenu.bind("mouseleave", function() {
        a.startContextMenuTimer()
      })
    },
    cleancontextmenu: function(a) {
      a.contextMenu.remove()
    },
    isContextMenuEnabled: true,
    enableContextMenu: function() {
      this.isContextMenuEnabled = true
    },
    disableContextMenu: function() {
      this.isContextMenuEnabled = false
    },
    contextMenuTimeout: null,
    startContextMenuTimer: function() {
      var a = this;
      a.killContextMenuTimer();
      a.contextMenuTimer = setTimeout(function() {
        a.hideContextMenu();
        a.killContextMenuTimer()
      }, 750)
    },
    killContextMenuTimer: function() {
      var a = this.contextMenuTimer;
      if (a != null) {
        clearTimeout(a);
        delete a
      }
    },
    hideContextMenu: function() {
      this.contextMenu.hide()
    },
    renderContextMenu: function(a,
      b) {
      for (var c = this, e = "", d = c.options.contextMenuItems, g = 0, k = d.length; g < k; g++)
        if (d[g].isSeparator) e += '<div class="mejs-contextmenu-separator"></div>';
        else {
          var j = d[g].render(c);
          if (j != null) e += '<div class="mejs-contextmenu-item" data-itemindex="' + g + '" id="element-' + Math.random() * 1E6 + '">' + j + "</div>"
        } c.contextMenu.empty().append(f(e)).css({
        top: b,
        left: a
      }).show();
      c.contextMenu.find(".mejs-contextmenu-item").each(function() {
        var m = f(this),
          q = parseInt(m.data("itemindex"), 10),
          p = c.options.contextMenuItems[q];
        typeof p.show !=
          "undefined" && p.show(m, c);
        m.click(function() {
          typeof p.click != "undefined" && p.click(c);
          c.contextMenu.hide()
        })
      });
      setTimeout(function() {
        c.killControlsTimer("rev3")
      }, 100)
    }
  })
})(mejs.$);
(function(f) {
  f.extend(mejs.MepDefaults, {
    postrollCloseText: mejs.i18n.t("Close")
  });
  f.extend(MediaElementPlayer.prototype, {
    buildpostroll: function(a, b, c) {
      var e = this.container.find('link[rel="postroll"]').attr("href");
      if (typeof e !== "undefined") {
        a.postroll = f('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + this.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(c).hide();
        this.media.addEventListener("ended",
          function() {
            f.ajax({
              dataType: "html",
              url: e,
              success: function(d) {
                c.find(".mejs-postroll-layer-content").html(d)
              }
            });
            a.postroll.show()
          }, false)
      }
    }
  })
})(mejs.$);

/*
--------------------------------
Infinite Scroll
--------------------------------
+ https://github.com/paulirish/infinitescroll
+ version 2.0b2.110713
+ Copyright 2011 Paul Irish & Luke Shumard
+ Licensed under the MIT license

+ Documentation: http://infinite-scroll.com/

*/

(function(window, $, undefined) {
  $.infinitescroll = function infscr(options, callback, element) {
    this.element = $(element);
    this._create(options, callback);
  };
  $.infinitescroll.defaults = {
    loading: {
      finished: undefined,
      finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
      img: "http://www.infinite-scroll.com/loading.gif",
      msg: null,
      msgText: "<em>Loading the next set of posts...</em>",
      selector: null,
      speed: 'fast',
      start: undefined
    },
    state: {
      isDuringAjax: false,
      isInvalidPage: false,
      isDestroyed: false,
      isDone: false,
      isPaused: false,
      currPage: 1
    },
    callback: undefined,
    debug: false,
    behavior: undefined,
    binder: $(window),
    nextSelector: "div.navigation a:first",
    navSelector: "div.navigation",
    contentSelector: null,
    extraScrollPx: 150,
    itemSelector: "div.post",
    animate: false,
    pathParse: undefined,
    dataType: 'html',
    appendCallback: true,
    bufferPx: 40,
    errorCallback: function() {},
    infid: 0,
    pixelsFromNavToBottom: undefined,
    path: undefined
  };
  $.infinitescroll.prototype = {
    _binding: function infscr_binding(binding) {
      var instance = this,
        opts = instance.options;
      if (!!opts.behavior && this['_binding_' + opts.behavior] !== undefined) {
        this['_binding_' + opts.behavior].call(this);
        return;
      }
      if (binding !== 'bind' && binding !== 'unbind') {
        this._debug('Binding value  ' + binding + ' not valid')
        return false;
      }
      if (binding == 'unbind') {
        (this.options.binder).unbind('smartscroll.infscr.' + instance.options.infid);
      } else {
        (this.options.binder)[binding]('smartscroll.infscr.' + instance.options.infid, function() {
          instance.scroll();
        });
      };
      this._debug('Binding', binding);
    },
    _create: function infscr_create(options, callback) {
      if (!this._validate(options)) {
        return false;
      }
      var opts = this.options = $.extend(true, {}, $.infinitescroll.defaults, options),
        relurl = /(.*?\/\/).*?(\/.*)/,
        path = $(opts.nextSelector).attr('href');
      opts.contentSelector = opts.contentSelector || this.element;
      opts.loading.selector = opts.loading.selector || opts.contentSelector;
      if (!path) {
        this._debug('Navigation selector not found');
        return;
      }
      opts.path = this._determinepath(path);
      opts.loading.msg = $('<div id="infscr-loading"><span class="image_holder"></span><div>' + opts.loading.msgText + '</div></div>');
      opts.pixelsFromNavToBottom = $(document).height() - $(opts.navSelector).offset().top;
      opts.loading.start = opts.loading.start || function() {
        $(opts.navSelector).hide();
        opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed, function() {
          beginAjax(opts);
        });
      };
      opts.loading.finished = opts.loading.finished || function() {
        opts.loading.msg.fadeOut('normal');
      };
      opts.callback = function(instance, data) {
        if (!!opts.behavior && instance['_callback_' + opts.behavior] !== undefined) {
          instance['_callback_' + opts.behavior].call($(opts.contentSelector)[0], data);
        }
        if (callback) {
          callback.call($(opts.contentSelector)[0], data);
        }
      };
      this._setup();
    },
    _debug: function infscr_debug() {
      if (this.options.debug) {
        return window.console && console.log.call(console, arguments);
      }
    },
    _determinepath: function infscr_determinepath(path) {
      var opts = this.options;
      if (!!opts.behavior && this['_determinepath_' + opts.behavior] !== undefined) {
        this['_determinepath_' + opts.behavior].call(this, path);
        return;
      }
      if (!!opts.pathParse) {
        this._debug('pathParse manual');
        return opts.pathParse;
      } else if (path.match(/^(.*?)\b2\b(.*?$)/)) {
        path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);
      } else if (path.match(/^(.*?)2(.*?$)/)) {
        if (path.match(/^(.*?page=)2(\/.*|$)/)) {
          path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
          return path;
        }
        path = path.match(/^(.*?)2(.*?$)/).slice(1);
      } else {
        if (path.match(/^(.*?page=)1(\/.*|$)/)) {
          path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
          return path;
        } else {
          this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');
          opts.state.isInvalidPage = true;
        }
      }
      this._debug('determinePath', path);
      return path;
    },
    _error: function infscr_error(xhr) {
      var opts = this.options;
      if (!!opts.behavior && this['_error_' + opts.behavior] !== undefined) {
        this['_error_' + opts.behavior].call(this, xhr);
        return;
      }
      if (xhr !== 'destroy' && xhr !== 'end') {
        xhr = 'unknown';
      }
      this._debug('Error', xhr);
      if (xhr == 'end') {
        this._showdonemsg();
      }
      opts.state.isDone = true;
      opts.state.currPage = 1;
      opts.state.isPaused = false;
      this._binding('unbind');
    },
    _loadcallback: function infscr_loadcallback(box, data) {
      var opts = this.options,
        callback = this.options.callback,
        result = (opts.state.isDone) ? 'done' : (!opts.appendCallback) ? 'no-append' : 'append',
        frag;
      if (!!opts.behavior && this['_loadcallback_' + opts.behavior] !== undefined) {
        this['_loadcallback_' + opts.behavior].call(this, box, data);
        return;
      }
      switch (result) {
        case 'done':
          this._showdonemsg();
          return false;
          break;
        case 'no-append':
          if (opts.dataType == 'html') {
            data = '<div>' + data + '</div>';
            data = $(data).find(opts.itemSelector);
          };
          break;
        case 'append':
          var children = box.children();
          if (children.length == 0) {
            return this._error('end');
          }
          frag = document.createDocumentFragment();
          while (box[0].firstChild) {
            frag.appendChild(box[0].firstChild);
          }
          this._debug('contentSelector', $(opts.contentSelector)[0])
          $(opts.contentSelector)[0].appendChild(frag);
          data = children.get();
          break;
      }
      opts.loading.finished.call($(opts.contentSelector)[0], opts)
      if (opts.animate) {
        var scrollTo = $(window).scrollTop() + $('#infscr-loading').height() + opts.extraScrollPx + 'px';
        $('html,body').animate({
          scrollTop: scrollTo
        }, 800, function() {
          opts.state.isDuringAjax = false;
        });
      }
      if (!opts.animate) opts.state.isDuringAjax = false;
      callback(this, data);
    },
    _nearbottom: function infscr_nearbottom() {
      var opts = this.options,
        pixelsFromWindowBottomToBottom = 0 + $(document).height() - (opts.binder.scrollTop()) - $(window).height();
      if (!!opts.behavior && this['_nearbottom_' + opts.behavior] !== undefined) {
        this['_nearbottom_' + opts.behavior].call(this);
        return;
      }
      this._debug('math:', pixelsFromWindowBottomToBottom, opts.pixelsFromNavToBottom);
      return (pixelsFromWindowBottomToBottom - opts.bufferPx < opts.pixelsFromNavToBottom);
    },
    _pausing: function infscr_pausing(pause) {
      var opts = this.options;
      if (!!opts.behavior && this['_pausing_' + opts.behavior] !== undefined) {
        this['_pausing_' + opts.behavior].call(this, pause);
        return;
      }
      if (pause !== 'pause' && pause !== 'resume' && pause !== null) {
        this._debug('Invalid argument. Toggling pause value instead');
      };
      pause = (pause && (pause == 'pause' || pause == 'resume')) ? pause : 'toggle';
      switch (pause) {
        case 'pause':
          opts.state.isPaused = true;
          break;
        case 'resume':
          opts.state.isPaused = false;
          break;
        case 'toggle':
          opts.state.isPaused = !opts.state.isPaused;
          break;
      }
      this._debug('Paused', opts.state.isPaused);
      return false;
    },
    _setup: function infscr_setup() {
      var opts = this.options;
      if (!!opts.behavior && this['_setup_' + opts.behavior] !== undefined) {
        this['_setup_' + opts.behavior].call(this);
        return;
      }
      this._binding('bind');
      return false;
    },
    _showdonemsg: function infscr_showdonemsg() {
      var opts = this.options;
      if (!!opts.behavior && this['_showdonemsg_' + opts.behavior] !== undefined) {
        this['_showdonemsg_' + opts.behavior].call(this);
        return;
      }
      opts.loading.msg.find('.image_holder').hide().parent().find('div').html(opts.loading.finishedMsg).animate({
        opacity: 1
      }, 2000, function() {
        $(this).parent().fadeOut('normal');
      });
      opts.errorCallback.call($(opts.contentSelector)[0], 'done');
    },
    _validate: function infscr_validate(opts) {
      for (var key in opts) {
        if (key.indexOf && key.indexOf('Selector') > -1 && $(opts[key]).length === 0) {
          this._debug('Your ' + key + ' found no elements.');
          return false;
        }
        return true;
      }
    },
    bind: function infscr_bind() {
      this._binding('bind');
    },
    destroy: function infscr_destroy() {
      this.options.state.isDestroyed = true;
      return this._error('destroy');
    },
    pause: function infscr_pause() {
      this._pausing('pause');
    },
    resume: function infscr_resume() {
      this._pausing('resume');
    },
    retrieve: function infscr_retrieve(pageNum) {
      var instance = this,
        opts = instance.options,
        path = opts.path,
        box, frag, desturl, method, condition, pageNum = pageNum || null,
        getPage = (!!pageNum) ? pageNum : opts.state.currPage;
      beginAjax = function infscr_ajax(opts) {
        opts.state.currPage++;
        instance._debug('heading into ajax', path);
        box = $(opts.contentSelector).is('table') ? $('<tbody/>') : $('<div/>');
        desturl = path.join(opts.state.currPage);
        method = (opts.dataType == 'html' || opts.dataType == 'json') ? opts.dataType : 'html+callback';
        if (opts.appendCallback && opts.dataType == 'html') method += '+callback'
        switch (method) {
          case 'html+callback':
            instance._debug('Using HTML via .load() method');
            box.load(desturl + ' ' + opts.itemSelector, null, function infscr_ajax_callback(responseText) {
              instance._loadcallback(box, responseText);
            });
            break;
          case 'html':
          case 'json':
            instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
            $.ajax({
              url: desturl,
              dataType: opts.dataType,
              complete: function infscr_ajax_callback(jqXHR, textStatus) {
                condition = (typeof(jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
                (condition) ? instance._loadcallback(box, jqXHR.responseText): instance._error('end');
              }
            });
            break;
        }
      };
      if (!!opts.behavior && this['retrieve_' + opts.behavior] !== undefined) {
        this['retrieve_' + opts.behavior].call(this, pageNum);
        return;
      }
      if (opts.state.isDestroyed) {
        this._debug('Instance is destroyed');
        return false;
      };
      opts.state.isDuringAjax = true;
      opts.loading.start.call($(opts.contentSelector)[0], opts);
    },
    scroll: function infscr_scroll() {
      var opts = this.options,
        state = opts.state;
      if (!!opts.behavior && this['scroll_' + opts.behavior] !== undefined) {
        this['scroll_' + opts.behavior].call(this);
        return;
      }
      if (state.isDuringAjax || state.isInvalidPage || state.isDone || state.isDestroyed || state.isPaused) return;
      if (!this._nearbottom()) return;
      this.retrieve();
    },
    toggle: function infscr_toggle() {
      this._pausing();
    },
    unbind: function infscr_unbind() {
      this._binding('unbind');
    },
    update: function infscr_options(key) {
      if ($.isPlainObject(key)) {
        this.options = $.extend(true, this.options, key);
      }
    }
  }
  $.fn.infinitescroll = function infscr_init(options, callback) {
    var thisCall = typeof options;
    switch (thisCall) {
      case 'string':
        var args = Array.prototype.slice.call(arguments, 1);
        this.each(function() {
          var instance = $.data(this, 'infinitescroll');
          if (!instance) {
            return false;
          }
          if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
            return false;
          }
          instance[options].apply(instance, args);
        });
        break;
      case 'object':
        this.each(function() {
          var instance = $.data(this, 'infinitescroll');
          if (instance) {
            instance.update(options);
          } else {
            $.data(this, 'infinitescroll', new $.infinitescroll(options, callback, this));
          }
        });
        break;
    }
    return this;
  };
  var event = $.event,
    scrollTimeout;
  event.special.smartscroll = {
    setup: function() {
      $(this).bind("scroll", event.special.smartscroll.handler);
    },
    teardown: function() {
      $(this).unbind("scroll", event.special.smartscroll.handler);
    },
    handler: function(event, execAsap) {
      var context = this,
        args = arguments;
      event.type = "smartscroll";
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(function() {
        $.event.handle.apply(context, args);
      }, execAsap === "execAsap" ? 0 : 100);
    }
  };
  $.fn.smartscroll = function(fn) {
    return fn ? this.bind("smartscroll", fn) : this.trigger("smartscroll", ["execAsap"]);
  };
})(window, jQuery);

/*
 * waitForImages 1.4.2
 * -------------------
 * Provides a callback when all images have loaded in your given selector.
 * https://github.com/alexanderdickson/waitForImages
 *
 * Copyright (c) 2013 Alex Dickson
 * Licensed under the MIT license.
 */
(function($) {
  var eventNamespace = 'waitForImages';
  $.waitForImages = {
    hasImageProperties: ['backgroundImage', 'listStyleImage', 'borderImage', 'borderCornerImage']
  };
  $.expr[':'].uncached = function(obj) {
    if (!$(obj).is('img[src!=""]')) {
      return false
    }
    var img = new Image();
    img.src = obj.src;
    return !img.complete
  };
  $.fn.waitForImages = function(finishedCallback, eachCallback, waitForAll) {
    var allImgsLength = 0;
    var allImgsLoaded = 0;
    if ($.isPlainObject(arguments[0])) {
      waitForAll = arguments[0].waitForAll;
      eachCallback = arguments[0].each;
      finishedCallback = arguments[0].finished
    }
    finishedCallback = finishedCallback || $.noop;
    eachCallback = eachCallback || $.noop;
    waitForAll = !!waitForAll;
    if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) {
      throw new TypeError('An invalid callback was supplied.');
    }
    return this.each(function() {
      var obj = $(this);
      var allImgs = [];
      var hasImgProperties = $.waitForImages.hasImageProperties || [];
      var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
      if (waitForAll) {
        obj.find('*').andSelf().each(function() {
          var element = $(this);
          if (element.is('img:uncached')) {
            allImgs.push({
              src: element.attr('src'),
              element: element[0]
            })
          }
          $.each(hasImgProperties, function(i, property) {
            var propertyValue = element.css(property);
            var match;
            if (!propertyValue) {
              return true
            }
            while (match = matchUrl.exec(propertyValue)) {
              allImgs.push({
                src: match[2],
                element: element[0]
              })
            }
          })
        })
      } else {
        obj.find('img:uncached').each(function() {
          allImgs.push({
            src: this.src,
            element: this
          })
        })
      }
      allImgsLength = allImgs.length;
      allImgsLoaded = 0;
      if (allImgsLength === 0) {
        finishedCallback.call(obj[0])
      }
      $.each(allImgs, function(i, img) {
        var image = new Image();
        $(image).bind('load.' + eventNamespace + ' error.' + eventNamespace, function(event) {
          allImgsLoaded++;
          eachCallback.call(img.element, allImgsLoaded, allImgsLength, event.type == 'load');
          if (allImgsLoaded == allImgsLength) {
            finishedCallback.call(obj[0]);
            return false
          }
        });
        image.src = img.src
      })
    })
  }
}(jQuery));

/*
 * jQuery Form Plugin; v20131121
 * http://jquery.malsup.com/form/
 * Copyright (c) 2013 M. Alsup; Dual licensed: MIT/GPL
 * https://github.com/malsup/form#copyright-and-license
 */
;
(function(e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto)
})(function(e) {
  "use strict";

  function t(t) {
    var r = t.data;
    t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r))
  }

  function r(t) {
    var r = t.target,
      a = e(r);
    if (!a.is("[type=submit],[type=image]")) {
      var n = a.closest("[type=submit]");
      if (0 === n.length) return;
      r = n[0]
    }
    var i = this;
    if (i.clk = r, "image" == r.type)
      if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
      else if ("function" == typeof e.fn.offset) {
      var o = a.offset();
      i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
    } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
    setTimeout(function() {
      i.clk = i.clk_x = i.clk_y = null
    }, 100)
  }

  function a() {
    if (e.fn.ajaxSubmit.debug) {
      var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
      window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
    }
  }
  var n = {};
  n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;
  var i = !!e.fn.prop;
  e.fn.attr2 = function() {
    if (!i) return this.attr.apply(this, arguments);
    var e = this.prop.apply(this, arguments);
    return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
  }, e.fn.ajaxSubmit = function(t) {
    function r(r) {
      var a, n, i = e.param(r, t.traditional).split("&"),
        o = i.length,
        s = [];
      for (a = 0; o > a; a++) i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
      return s
    }

    function o(a) {
      for (var n = new FormData, i = 0; a.length > i; i++) n.append(a[i].name, a[i].value);
      if (t.extraData) {
        var o = r(t.extraData);
        for (i = 0; o.length > i; i++) o[i] && n.append(o[i][0], o[i][1])
      }
      t.data = null;
      var s = e.extend(!0, {}, e.ajaxSettings, t, {
        contentType: !1,
        processData: !1,
        cache: !1,
        type: u || "POST"
      });
      t.uploadProgress && (s.xhr = function() {
        var r = e.ajaxSettings.xhr();
        return r.upload && r.upload.addEventListener("progress", function(e) {
          var r = 0,
            a = e.loaded || e.position,
            n = e.total;
          e.lengthComputable && (r = Math.ceil(100 * (a / n))), t.uploadProgress(e, a, n, r)
        }, !1), r
      }), s.data = null;
      var c = s.beforeSend;
      return s.beforeSend = function(e, r) {
        r.data = t.formData ? t.formData : n, c && c.call(this, e, r)
      }, e.ajax(s)
    }

    function s(r) {
      function n(e) {
        var t = null;
        try {
          e.contentWindow && (t = e.contentWindow.document)
        } catch (r) {
          a("cannot get iframe.contentWindow document: " + r)
        }
        if (t) return t;
        try {
          t = e.contentDocument ? e.contentDocument : e.document
        } catch (r) {
          a("cannot get iframe.contentDocument: " + r), t = e.document
        }
        return t
      }

      function o() {
        function t() {
          try {
            var e = n(g).readyState;
            a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
          } catch (r) {
            a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), j = void 0
          }
        }
        var r = f.attr2("target"),
          i = f.attr2("action");
        w.setAttribute("target", p), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({
          encoding: "multipart/form-data",
          enctype: "multipart/form-data"
        }), m.timeout && (j = setTimeout(function() {
          T = !0, s(D)
        }, m.timeout));
        var o = [];
        try {
          if (m.extraData)
            for (var c in m.extraData) m.extraData.hasOwnProperty(c) && (e.isPlainObject(m.extraData[c]) && m.extraData[c].hasOwnProperty("name") && m.extraData[c].hasOwnProperty("value") ? o.push(e('<input type="hidden" name="' + m.extraData[c].name + '">').val(m.extraData[c].value).appendTo(w)[0]) : o.push(e('<input type="hidden" name="' + c + '">').val(m.extraData[c]).appendTo(w)[0]));
          m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);
          try {
            w.submit()
          } catch (l) {
            var d = document.createElement("form").submit;
            d.apply(w)
          }
        } finally {
          w.setAttribute("action", i), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(o).remove()
        }
      }

      function s(t) {
        if (!x.aborted && !F) {
          if (M = n(g), M || (a("cannot access response document"), t = k), t === D && x) return x.abort("timeout"), S.reject(x, "timeout"), void 0;
          if (t == k && x) return x.abort("server abort"), S.reject(x, "error", "server abort"), void 0;
          if (M && M.location.href != m.iframeSrc || T) {
            g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
            var r, i = "success";
            try {
              if (T) throw "timeout";
              var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
              if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), setTimeout(s, 250), void 0;
              var u = M.body ? M.body : M.documentElement;
              x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function(e) {
                var t = {
                  "content-type": m.dataType
                };
                return t[e.toLowerCase()]
              }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
              var c = (m.dataType || "").toLowerCase(),
                l = /(json|script|text)/.test(c);
              if (l || m.textarea) {
                var f = M.getElementsByTagName("textarea")[0];
                if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText;
                else if (l) {
                  var p = M.getElementsByTagName("pre")[0],
                    h = M.getElementsByTagName("body")[0];
                  p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText)
                }
              } else "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));
              try {
                E = _(x, c, m)
              } catch (b) {
                i = "parsererror", x.error = r = b || i
              }
            } catch (b) {
              a("error caught: ", b), i = "error", x.error = r = b || i
            }
            x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && 300 > x.status || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function() {
              m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null
            }, 100)
          }
        }
      }
      var c, l, m, d, p, v, g, x, b, y, T, j, w = f[0],
        S = e.Deferred();
      if (S.abort = function(e) {
          x.abort(e)
        }, r)
        for (l = 0; h.length > l; l++) c = e(h[l]), i ? c.prop("disabled", !1) : c.removeAttr("disabled");
      if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), y = v.attr2("name"), y ? p = y : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({
          position: "absolute",
          top: "-1000px",
          left: "-1000px"
        })), g = v[0], x = {
          aborted: 0,
          responseText: null,
          responseXML: null,
          status: 0,
          statusText: "n/a",
          getAllResponseHeaders: function() {},
          getResponseHeader: function() {},
          setRequestHeader: function() {},
          abort: function(t) {
            var r = "timeout" === t ? "timeout" : "aborted";
            a("aborting upload... " + r), this.aborted = 1;
            try {
              g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop")
            } catch (n) {}
            v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r)
          }
        }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S;
      if (x.aborted) return S.reject(), S;
      b = w.clk, b && (y = b.name, y && !b.disabled && (m.extraData = m.extraData || {}, m.extraData[y] = b.value, "image" == b.type && (m.extraData[y + ".x"] = w.clk_x, m.extraData[y + ".y"] = w.clk_y)));
      var D = 1,
        k = 2,
        A = e("meta[name=csrf-token]").attr("content"),
        L = e("meta[name=csrf-param]").attr("content");
      L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10);
      var E, M, F, O = 50,
        X = e.parseXML || function(e, t) {
          return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
        },
        C = e.parseJSON || function(e) {
          return window.eval("(" + e + ")")
        },
        _ = function(t, r, a) {
          var n = t.getResponseHeader("content-type") || "",
            i = "xml" === r || !r && n.indexOf("xml") >= 0,
            o = i ? t.responseXML : t.responseText;
          return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
        };
      return S
    }
    if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
    var u, c, l, f = this;
    "function" == typeof t ? t = {
      success: t
    } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), c = t.url || this.attr2("action"), l = "string" == typeof c ? e.trim(c) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
      url: l,
      success: e.ajaxSettings.success,
      type: u || e.ajaxSettings.type,
      iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
    }, t);
    var m = {};
    if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
    if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
    var d = t.traditional;
    void 0 === d && (d = e.ajaxSettings.traditional);
    var p, h = [],
      v = this.formToArray(t.semantic, h);
    if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
    if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
    var g = e.param(v, d);
    p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
    var x = [];
    if (t.resetForm && x.push(function() {
        f.resetForm()
      }), t.clearForm && x.push(function() {
        f.clearForm(t.includeHidden)
      }), !t.dataType && t.target) {
      var b = t.success || function() {};
      x.push(function(r) {
        var a = t.replaceTarget ? "replaceWith" : "html";
        e(t.target)[a](r).each(b, arguments)
      })
    } else t.success && x.push(t.success);
    if (t.success = function(e, r, a) {
        for (var n = t.context || this, i = 0, o = x.length; o > i; i++) x[i].apply(n, [e, r, a || f, f])
      }, t.error) {
      var y = t.error;
      t.error = function(e, r, a) {
        var n = t.context || this;
        y.apply(n, [e, r, a, f])
      }
    }
    if (t.complete) {
      var T = t.complete;
      t.complete = function(e, r) {
        var a = t.context || this;
        T.apply(a, [e, r, f])
      }
    }
    var j = e("input[type=file]:enabled", this).filter(function() {
        return "" !== e(this).val()
      }),
      w = j.length > 0,
      S = "multipart/form-data",
      D = f.attr("enctype") == S || f.attr("encoding") == S,
      k = n.fileapi && n.formdata;
    a("fileAPI :" + k);
    var A, L = (w || D) && !k;
    t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function() {
      A = s(v)
    }) : A = s(v) : A = (w || D) && k ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A);
    for (var E = 0; h.length > E; E++) h[E] = null;
    return this.trigger("form-submit-notify", [this, t]), this
  }, e.fn.ajaxForm = function(n) {
    if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
      var i = {
        s: this.selector,
        c: this.context
      };
      return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function() {
        e(i.s, i.c).ajaxForm(n)
      }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
    }
    return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
  }, e.fn.ajaxFormUnbind = function() {
    return this.unbind("submit.form-plugin click.form-plugin")
  }, e.fn.formToArray = function(t, r) {
    var a = [];
    if (0 === this.length) return a;
    var i = this[0],
      o = t ? i.getElementsByTagName("*") : i.elements;
    if (!o) return a;
    var s, u, c, l, f, m, d;
    for (s = 0, m = o.length; m > s; s++)
      if (f = o[s], c = f.name, c && !f.disabled)
        if (t && i.clk && "image" == f.type) i.clk == f && (a.push({
          name: c,
          value: e(f).val(),
          type: f.type
        }), a.push({
          name: c + ".x",
          value: i.clk_x
        }, {
          name: c + ".y",
          value: i.clk_y
        }));
        else if (l = e.fieldValue(f, !0), l && l.constructor == Array)
      for (r && r.push(f), u = 0, d = l.length; d > u; u++) a.push({
        name: c,
        value: l[u]
      });
    else if (n.fileapi && "file" == f.type) {
      r && r.push(f);
      var p = f.files;
      if (p.length)
        for (u = 0; p.length > u; u++) a.push({
          name: c,
          value: p[u],
          type: f.type
        });
      else a.push({
        name: c,
        value: "",
        type: f.type
      })
    } else null !== l && l !== void 0 && (r && r.push(f), a.push({
      name: c,
      value: l,
      type: f.type,
      required: f.required
    }));
    if (!t && i.clk) {
      var h = e(i.clk),
        v = h[0];
      c = v.name, c && !v.disabled && "image" == v.type && (a.push({
        name: c,
        value: h.val()
      }), a.push({
        name: c + ".x",
        value: i.clk_x
      }, {
        name: c + ".y",
        value: i.clk_y
      }))
    }
    return a
  }, e.fn.formSerialize = function(t) {
    return e.param(this.formToArray(t))
  }, e.fn.fieldSerialize = function(t) {
    var r = [];
    return this.each(function() {
      var a = this.name;
      if (a) {
        var n = e.fieldValue(this, t);
        if (n && n.constructor == Array)
          for (var i = 0, o = n.length; o > i; i++) r.push({
            name: a,
            value: n[i]
          });
        else null !== n && n !== void 0 && r.push({
          name: this.name,
          value: n
        })
      }
    }), e.param(r)
  }, e.fn.fieldValue = function(t) {
    for (var r = [], a = 0, n = this.length; n > a; a++) {
      var i = this[a],
        o = e.fieldValue(i, t);
      null === o || void 0 === o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
    }
    return r
  }, e.fieldValue = function(t, r) {
    var a = t.name,
      n = t.type,
      i = t.tagName.toLowerCase();
    if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
    if ("select" == i) {
      var o = t.selectedIndex;
      if (0 > o) return null;
      for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
        var m = u[f];
        if (m.selected) {
          var d = m.value;
          if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c) return d;
          s.push(d)
        }
      }
      return s
    }
    return e(t).val()
  }, e.fn.clearForm = function(t) {
    return this.each(function() {
      e("input,select,textarea", this).clearFields(t)
    })
  }, e.fn.clearFields = e.fn.clearInputs = function(t) {
    var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
    return this.each(function() {
      var a = this.type,
        n = this.tagName.toLowerCase();
      r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
    })
  }, e.fn.resetForm = function() {
    return this.each(function() {
      ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
    })
  }, e.fn.enable = function(e) {
    return void 0 === e && (e = !0), this.each(function() {
      this.disabled = !e
    })
  }, e.fn.selected = function(t) {
    return void 0 === t && (t = !0), this.each(function() {
      var r = this.type;
      if ("checkbox" == r || "radio" == r) this.checked = t;
      else if ("option" == this.tagName.toLowerCase()) {
        var a = e(this).parent("select");
        t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
      }
    })
  }, e.fn.ajaxSubmit.debug = !1
});

// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.4
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
  var t = [].indexOf || function(t) {
      for (var e = 0, n = this.length; e < n; e++) {
        if (e in this && this[e] === t) return e
      }
      return -1
    },
    e = [].slice;
  (function(t, e) {
    if (typeof define === "function" && define.amd) {
      return define("waypoints", ["jquery"], function(n) {
        return e(n, t)
      })
    } else {
      return e(t.jQuery, t)
    }
  })(this, function(n, r) {
    var i, o, l, s, f, u, c, a, h, d, p, y, v, w, g, m;
    i = n(r);
    a = t.call(r, "ontouchstart") >= 0;
    s = {
      horizontal: {},
      vertical: {}
    };
    f = 1;
    c = {};
    u = "waypoints-context-id";
    p = "resize.waypoints";
    y = "scroll.waypoints";
    v = 1;
    w = "waypoints-waypoint-ids";
    g = "waypoint";
    m = "waypoints";
    o = function() {
      function t(t) {
        var e = this;
        this.$element = t;
        this.element = t[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = "context" + f++;
        this.oldScroll = {
          x: t.scrollLeft(),
          y: t.scrollTop()
        };
        this.waypoints = {
          horizontal: {},
          vertical: {}
        };
        this.element[u] = this.id;
        c[this.id] = this;
        t.bind(y, function() {
          var t;
          if (!(e.didScroll || a)) {
            e.didScroll = true;
            t = function() {
              e.doScroll();
              return e.didScroll = false
            };
            return r.setTimeout(t, n[m].settings.scrollThrottle)
          }
        });
        t.bind(p, function() {
          var t;
          if (!e.didResize) {
            e.didResize = true;
            t = function() {
              n[m]("refresh");
              return e.didResize = false
            };
            return r.setTimeout(t, n[m].settings.resizeThrottle)
          }
        })
      }
      t.prototype.doScroll = function() {
        var t, e = this;
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left"
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up"
          }
        };
        if (a && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]("refresh")
        }
        n.each(t, function(t, r) {
          var i, o, l;
          l = [];
          o = r.newScroll > r.oldScroll;
          i = o ? r.forward : r.backward;
          n.each(e.waypoints[t], function(t, e) {
            var n, i;
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e)
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e)
            }
          });
          l.sort(function(t, e) {
            return t.offset - e.offset
          });
          if (!o) {
            l.reverse()
          }
          return n.each(l, function(t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i])
            }
          })
        });
        return this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll
        }
      };
      t.prototype.refresh = function() {
        var t, e, r, i = this;
        r = n.isWindow(this.element);
        e = this.$element.offset();
        this.doScroll();
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left"
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top"
          }
        };
        return n.each(t, function(t, e) {
          return n.each(i.waypoints[t], function(t, r) {
            var i, o, l, s, f;
            i = r.options.offset;
            l = r.offset;
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
            if (n.isFunction(i)) {
              i = i.apply(r.element)
            } else if (typeof i === "string") {
              i = parseFloat(i);
              if (r.options.offset.indexOf("%") > -1) {
                i = Math.ceil(e.contextDimension * i / 100)
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i;
            if (r.options.onlyOnScroll && l != null || !r.enabled) {
              return
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward])
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward])
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward])
            }
          })
        })
      };
      t.prototype.checkEmpty = function() {
        if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
          this.$element.unbind([p, y].join(" "));
          return delete c[this.id]
        }
      };
      return t
    }();
    l = function() {
      function t(t, e, r) {
        var i, o;
        r = n.extend({}, n.fn[g].defaults, r);
        if (r.offset === "bottom-in-view") {
          r.offset = function() {
            var t;
            t = n[m]("viewportHeight");
            if (!n.isWindow(e.element)) {
              t = e.$element.height()
            }
            return t - n(this).outerHeight()
          }
        }
        this.$element = t;
        this.element = t[0];
        this.axis = r.horizontal ? "horizontal" : "vertical";
        this.callback = r.handler;
        this.context = e;
        this.enabled = r.enabled;
        this.id = "waypoints" + v++;
        this.offset = null;
        this.options = r;
        e.waypoints[this.axis][this.id] = this;
        s[this.axis][this.id] = this;
        i = (o = this.element[w]) != null ? o : [];
        i.push(this.id);
        this.element[w] = i
      }
      t.prototype.trigger = function(t) {
        if (!this.enabled) {
          return
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t)
        }
        if (this.options.triggerOnce) {
          return this.destroy()
        }
      };
      t.prototype.disable = function() {
        return this.enabled = false
      };
      t.prototype.enable = function() {
        this.context.refresh();
        return this.enabled = true
      };
      t.prototype.destroy = function() {
        delete s[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty()
      };
      t.getWaypointsByElement = function(t) {
        var e, r;
        r = t[w];
        if (!r) {
          return []
        }
        e = n.extend({}, s.horizontal, s.vertical);
        return n.map(r, function(t) {
          return e[t]
        })
      };
      return t
    }();
    d = {
      init: function(t, e) {
        var r;
        if (e == null) {
          e = {}
        }
        if ((r = e.handler) == null) {
          e.handler = t
        }
        this.each(function() {
          var t, r, i, s;
          t = n(this);
          i = (s = e.context) != null ? s : n.fn[g].defaults.context;
          if (!n.isWindow(i)) {
            i = t.closest(i)
          }
          i = n(i);
          r = c[i[0][u]];
          if (!r) {
            r = new o(i)
          }
          return new l(t, r, e)
        });
        n[m]("refresh");
        return this
      },
      disable: function() {
        return d._invoke.call(this, "disable")
      },
      enable: function() {
        return d._invoke.call(this, "enable")
      },
      destroy: function() {
        return d._invoke.call(this, "destroy")
      },
      prev: function(t, e) {
        return d._traverse.call(this, t, e, function(t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1])
          }
        })
      },
      next: function(t, e) {
        return d._traverse.call(this, t, e, function(t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1])
          }
        })
      },
      _traverse: function(t, e, i) {
        var o, l;
        if (t == null) {
          t = "vertical"
        }
        if (e == null) {
          e = r
        }
        l = h.aggregate(e);
        o = [];
        this.each(function() {
          var e;
          e = n.inArray(this, l[t]);
          return i(o, e, l[t])
        });
        return this.pushStack(o)
      },
      _invoke: function(t) {
        this.each(function() {
          var e;
          e = l.getWaypointsByElement(this);
          return n.each(e, function(e, n) {
            n[t]();
            return true
          })
        });
        return this
      }
    };
    n.fn[g] = function() {
      var t, r;
      r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
      if (d[r]) {
        return d[r].apply(this, t)
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments)
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r])
      } else if (!r) {
        return n.error("jQuery Waypoints needs a callback function or handler option.")
      } else {
        return n.error("The " + r + " method does not exist in jQuery Waypoints.")
      }
    };
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false
    };
    h = {
      refresh: function() {
        return n.each(c, function(t, e) {
          return e.refresh()
        })
      },
      viewportHeight: function() {
        var t;
        return (t = r.innerHeight) != null ? t : i.height()
      },
      aggregate: function(t) {
        var e, r, i;
        e = s;
        if (t) {
          e = (i = c[n(t)[0][u]]) != null ? i.waypoints : void 0
        }
        if (!e) {
          return []
        }
        r = {
          horizontal: [],
          vertical: []
        };
        n.each(r, function(t, i) {
          n.each(e[t], function(t, e) {
            return i.push(e)
          });
          i.sort(function(t, e) {
            return t.offset - e.offset
          });
          r[t] = n.map(i, function(t) {
            return t.element
          });
          return r[t] = n.unique(r[t])
        });
        return r
      },
      above: function(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "vertical", function(t, e) {
          return e.offset <= t.oldScroll.y
        })
      },
      below: function(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "vertical", function(t, e) {
          return e.offset > t.oldScroll.y
        })
      },
      left: function(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "horizontal", function(t, e) {
          return e.offset <= t.oldScroll.x
        })
      },
      right: function(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "horizontal", function(t, e) {
          return e.offset > t.oldScroll.x
        })
      },
      enable: function() {
        return h._invoke("enable")
      },
      disable: function() {
        return h._invoke("disable")
      },
      destroy: function() {
        return h._invoke("destroy")
      },
      extendFn: function(t, e) {
        return d[t] = e
      },
      _invoke: function(t) {
        var e;
        e = n.extend({}, s.vertical, s.horizontal);
        return n.each(e, function(e, n) {
          n[t]();
          return true
        })
      },
      _filter: function(t, e, r) {
        var i, o;
        i = c[n(t)[0][u]];
        if (!i) {
          return []
        }
        o = [];
        n.each(i.waypoints[e], function(t, e) {
          if (r(i, e)) {
            return o.push(e)
          }
        });
        o.sort(function(t, e) {
          return t.offset - e.offset
        });
        return n.map(o, function(t) {
          return t.element
        })
      }
    };
    n[m] = function() {
      var t, n;
      n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
      if (h[n]) {
        return h[n].apply(null, t)
      } else {
        return h.aggregate.call(null, n)
      }
    };
    n[m].settings = {
      resizeThrottle: 100,
      scrollThrottle: 30
    };
    return i.load(function() {
      return n[m]("refresh")
    })
  })
}).call(this);

/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2011 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 2.1.0
 * Date: 1st September 2011
 */

(function(b, f) {
  b.fn.jPlayer = function(a) {
    var c = typeof a === "string",
      d = Array.prototype.slice.call(arguments, 1),
      e = this,
      a = !c && d.length ? b.extend.apply(null, [!0, a].concat(d)) : a;
    if (c && a.charAt(0) === "_") return e;
    c ? this.each(function() {
      var c = b.data(this, "jPlayer"),
        h = c && b.isFunction(c[a]) ? c[a].apply(c, d) : c;
      if (h !== c && h !== f) return e = h, !1
    }) : this.each(function() {
      var c = b.data(this, "jPlayer");
      c ? c.option(a || {}) : b.data(this, "jPlayer", new b.jPlayer(a, this))
    });
    return e
  };
  b.jPlayer = function(a, c) {
    if (arguments.length) {
      this.element =
        b(c);
      this.options = b.extend(!0, {}, this.options, a);
      var d = this;
      this.element.bind("remove.jPlayer", function() {
        d.destroy()
      });
      this._init()
    }
  };
  b.jPlayer.emulateMethods = "load play pause";
  b.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
  b.jPlayer.emulateOptions = "muted volume";
  b.jPlayer.reservedEvent = "ready flashreset resize repeat error warning";
  b.jPlayer.event = {
    ready: "jPlayer_ready",
    flashreset: "jPlayer_flashreset",
    resize: "jPlayer_resize",
    repeat: "jPlayer_repeat",
    click: "jPlayer_click",
    error: "jPlayer_error",
    warning: "jPlayer_warning",
    loadstart: "jPlayer_loadstart",
    progress: "jPlayer_progress",
    suspend: "jPlayer_suspend",
    abort: "jPlayer_abort",
    emptied: "jPlayer_emptied",
    stalled: "jPlayer_stalled",
    play: "jPlayer_play",
    pause: "jPlayer_pause",
    loadedmetadata: "jPlayer_loadedmetadata",
    loadeddata: "jPlayer_loadeddata",
    waiting: "jPlayer_waiting",
    playing: "jPlayer_playing",
    canplay: "jPlayer_canplay",
    canplaythrough: "jPlayer_canplaythrough",
    seeking: "jPlayer_seeking",
    seeked: "jPlayer_seeked",
    timeupdate: "jPlayer_timeupdate",
    ended: "jPlayer_ended",
    ratechange: "jPlayer_ratechange",
    durationchange: "jPlayer_durationchange",
    volumechange: "jPlayer_volumechange"
  };
  b.jPlayer.htmlEvent = "loadstart,abort,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,ratechange".split(",");
  b.jPlayer.pause = function() {
    b.each(b.jPlayer.prototype.instances, function(a, b) {
      b.data("jPlayer").status.srcSet && b.jPlayer("pause")
    })
  };
  b.jPlayer.timeFormat = {
    showHour: !1,
    showMin: !0,
    showSec: !0,
    padHour: !1,
    padMin: !0,
    padSec: !0,
    sepHour: ":",
    sepMin: ":",
    sepSec: ""
  };
  b.jPlayer.convertTime = function(a) {
    var c = new Date(a * 1E3),
      d = c.getUTCHours(),
      a = c.getUTCMinutes(),
      c = c.getUTCSeconds(),
      d = b.jPlayer.timeFormat.padHour && d < 10 ? "0" + d : d,
      a = b.jPlayer.timeFormat.padMin && a < 10 ? "0" + a : a,
      c = b.jPlayer.timeFormat.padSec && c < 10 ? "0" + c : c;
    return (b.jPlayer.timeFormat.showHour ? d + b.jPlayer.timeFormat.sepHour : "") + (b.jPlayer.timeFormat.showMin ? a + b.jPlayer.timeFormat.sepMin : "") + (b.jPlayer.timeFormat.showSec ? c + b.jPlayer.timeFormat.sepSec : "")
  };
  b.jPlayer.uaBrowser =
    function(a) {
      var a = a.toLowerCase(),
        b = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        d = /(msie) ([\w.]+)/,
        e = /(mozilla)(?:.*? rv:([\w.]+))?/,
        a = /(webkit)[ \/]([\w.]+)/.exec(a) || b.exec(a) || d.exec(a) || a.indexOf("compatible") < 0 && e.exec(a) || [];
      return {
        browser: a[1] || "",
        version: a[2] || "0"
      }
    };
  b.jPlayer.uaPlatform = function(a) {
    var b = a.toLowerCase(),
      d = /(android)/,
      e = /(mobile)/,
      a = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/.exec(b) || [],
      b = /(ipad|playbook)/.exec(b) || !e.exec(b) && d.exec(b) || [];
    a[1] && (a[1] = a[1].replace(/\s/g,
      "_"));
    return {
      platform: a[1] || "",
      tablet: b[1] || ""
    }
  };
  b.jPlayer.browser = {};
  b.jPlayer.platform = {};
  var i = b.jPlayer.uaBrowser(navigator.userAgent);
  if (i.browser) b.jPlayer.browser[i.browser] = !0, b.jPlayer.browser.version = i.version;
  i = b.jPlayer.uaPlatform(navigator.userAgent);
  if (i.platform) b.jPlayer.platform[i.platform] = !0, b.jPlayer.platform.mobile = !i.tablet, b.jPlayer.platform.tablet = !!i.tablet;
  b.jPlayer.prototype = {
    count: 0,
    version: {
      script: "2.1.0",
      needFlash: "2.1.0",
      flash: "unknown"
    },
    options: {
      swfPath: "js",
      solution: "html, flash",
      supplied: "mp3",
      preload: "metadata",
      volume: 0.8,
      muted: !1,
      wmode: "opaque",
      backgroundColor: "#000000",
      cssSelectorAncestor: "#jp_container_1",
      cssSelector: {
        videoPlay: ".jp-video-play",
        play: ".jp-play",
        pause: ".jp-pause",
        stop: ".jp-stop",
        seekBar: ".jp-seek-bar",
        playBar: ".jp-play-bar",
        mute: ".jp-mute",
        unmute: ".jp-unmute",
        volumeBar: ".jp-volume-bar",
        volumeBarValue: ".jp-volume-bar-value",
        volumeMax: ".jp-volume-max",
        currentTime: ".jp-current-time",
        duration: ".jp-duration",
        fullScreen: ".jp-full-screen",
        restoreScreen: ".jp-restore-screen",
        repeat: ".jp-repeat",
        repeatOff: ".jp-repeat-off",
        gui: ".jp-gui",
        noSolution: ".jp-no-solution"
      },
      fullScreen: !1,
      autohide: {
        restored: !1,
        full: !0,
        fadeIn: 200,
        fadeOut: 600,
        hold: 1E3
      },
      loop: !1,
      repeat: function(a) {
        a.jPlayer.options.loop ? b(this).unbind(".jPlayerRepeat").bind(b.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
          b(this).jPlayer("play")
        }) : b(this).unbind(".jPlayerRepeat")
      },
      nativeVideoControls: {},
      noFullScreen: {
        msie: /msie [0-6]/,
        ipad: /ipad.*?os [0-4]/,
        iphone: /iphone/,
        ipod: /ipod/,
        android_pad: /android [0-3](?!.*?mobile)/,
        android_phone: /android.*?mobile/,
        blackberry: /blackberry/,
        windows_ce: /windows ce/,
        webos: /webos/
      },
      noVolume: {
        ipad: /ipad/,
        iphone: /iphone/,
        ipod: /ipod/,
        android_pad: /android(?!.*?mobile)/,
        android_phone: /android.*?mobile/,
        blackberry: /blackberry/,
        windows_ce: /windows ce/,
        webos: /webos/,
        playbook: /playbook/
      },
      verticalVolume: !1,
      idPrefix: "jp",
      noConflict: "jQuery",
      emulateHtml: !1,
      errorAlerts: !1,
      warningAlerts: !1
    },
    optionsAudio: {
      size: {
        width: "0px",
        height: "0px",
        cssClass: ""
      },
      sizeFull: {
        width: "0px",
        height: "0px",
        cssClass: ""
      }
    },
    optionsVideo: {
      size: {
        width: "480px",
        height: "270px",
        cssClass: "jp-video-270p"
      },
      sizeFull: {
        width: "100%",
        height: "100%",
        cssClass: "jp-video-full"
      }
    },
    instances: {},
    status: {
      src: "",
      media: {},
      paused: !0,
      format: {},
      formatType: "",
      waitForPlay: !0,
      waitForLoad: !0,
      srcSet: !1,
      video: !1,
      seekPercent: 0,
      currentPercentRelative: 0,
      currentPercentAbsolute: 0,
      currentTime: 0,
      duration: 0,
      readyState: 0,
      networkState: 0,
      playbackRate: 1,
      ended: 0
    },
    internal: {
      ready: !1
    },
    solution: {
      html: !0,
      flash: !0
    },
    format: {
      mp3: {
        codec: 'audio/mpeg; codecs="mp3"',
        flashCanPlay: !0,
        media: "audio"
      },
      m4a: {
        codec: 'audio/mp4; codecs="mp4a.40.2"',
        flashCanPlay: !0,
        media: "audio"
      },
      oga: {
        codec: 'audio/ogg; codecs="vorbis"',
        flashCanPlay: !1,
        media: "audio"
      },
      wav: {
        codec: 'audio/wav; codecs="1"',
        flashCanPlay: !1,
        media: "audio"
      },
      webma: {
        codec: 'audio/webm; codecs="vorbis"',
        flashCanPlay: !1,
        media: "audio"
      },
      fla: {
        codec: "audio/x-flv",
        flashCanPlay: !0,
        media: "audio"
      },
      m4v: {
        codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
        flashCanPlay: !0,
        media: "video"
      },
      ogv: {
        codec: 'video/ogg; codecs="theora, vorbis"',
        flashCanPlay: !1,
        media: "video"
      },
      webmv: {
        codec: 'video/webm; codecs="vorbis, vp8"',
        flashCanPlay: !1,
        media: "video"
      },
      flv: {
        codec: "video/x-flv",
        flashCanPlay: !0,
        media: "video"
      }
    },
    _init: function() {
      var a = this;
      this.element.empty();
      this.status = b.extend({}, this.status);
      this.internal = b.extend({}, this.internal);
      this.internal.domNode = this.element.get(0);
      this.formats = [];
      this.solutions = [];
      this.require = {};
      this.htmlElement = {};
      this.html = {};
      this.html.audio = {};
      this.html.video = {};
      this.flash = {};
      this.css = {};
      this.css.cs = {};
      this.css.jq = {};
      this.ancestorJq = [];
      this.options.volume = this._limitValue(this.options.volume, 0, 1);
      b.each(this.options.supplied.toLowerCase().split(","), function(c, d) {
        var e = d.replace(/^\s+|\s+$/g, "");
        if (a.format[e]) {
          var f = !1;
          b.each(a.formats, function(a, b) {
            if (e === b) return f = !0, !1
          });
          f || a.formats.push(e)
        }
      });
      b.each(this.options.solution.toLowerCase().split(","), function(c, d) {
        var e = d.replace(/^\s+|\s+$/g, "");
        if (a.solution[e]) {
          var f = !1;
          b.each(a.solutions, function(a, b) {
            if (e === b) return f = !0, !1
          });
          f || a.solutions.push(e)
        }
      });
      this.internal.instance =
        "jp_" + this.count;
      this.instances[this.internal.instance] = this.element;
      this.element.attr("id") || this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
      this.internal.self = b.extend({}, {
        id: this.element.attr("id"),
        jq: this.element
      });
      this.internal.audio = b.extend({}, {
        id: this.options.idPrefix + "_audio_" + this.count,
        jq: f
      });
      this.internal.video = b.extend({}, {
        id: this.options.idPrefix + "_video_" + this.count,
        jq: f
      });
      this.internal.flash = b.extend({}, {
        id: this.options.idPrefix + "_flash_" + this.count,
        jq: f,
        swf: this.options.swfPath +
          (this.options.swfPath.toLowerCase().slice(-4) !== ".swf" ? (this.options.swfPath && this.options.swfPath.slice(-1) !== "/" ? "/" : "") + "Jplayer.swf" : "")
      });
      this.internal.poster = b.extend({}, {
        id: this.options.idPrefix + "_poster_" + this.count,
        jq: f
      });
      b.each(b.jPlayer.event, function(b, c) {
        a.options[b] !== f && (a.element.bind(c + ".jPlayer", a.options[b]), a.options[b] = f)
      });
      this.require.audio = !1;
      this.require.video = !1;
      b.each(this.formats, function(b, c) {
        a.require[a.format[c].media] = !0
      });
      this.options = this.require.video ? b.extend(!0, {}, this.optionsVideo, this.options) : b.extend(!0, {}, this.optionsAudio, this.options);
      this._setSize();
      this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
      this.status.noFullScreen = this._uaBlocklist(this.options.noFullScreen);
      this.status.noVolume = this._uaBlocklist(this.options.noVolume);
      this._restrictNativeVideoControls();
      this.htmlElement.poster = document.createElement("img");
      this.htmlElement.poster.id = this.internal.poster.id;
      this.htmlElement.poster.onload = function() {
        (!a.status.video ||
          a.status.waitForPlay) && a.internal.poster.jq.show()
      };
      this.element.append(this.htmlElement.poster);
      this.internal.poster.jq = b("#" + this.internal.poster.id);
      this.internal.poster.jq.css({
        width: this.status.width,
        height: this.status.height
      });
      this.internal.poster.jq.hide();
      this.internal.poster.jq.bind("click.jPlayer", function() {
        a._trigger(b.jPlayer.event.click)
      });
      this.html.audio.available = !1;
      if (this.require.audio) this.htmlElement.audio = document.createElement("audio"), this.htmlElement.audio.id = this.internal.audio.id,
        this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio);
      this.html.video.available = !1;
      if (this.require.video) this.htmlElement.video = document.createElement("video"), this.htmlElement.video.id = this.internal.video.id, this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video);
      this.flash.available = this._checkForFlash(10);
      this.html.canPlay = {};
      this.flash.canPlay = {};
      b.each(this.formats, function(b, c) {
        a.html.canPlay[c] =
          a.html[a.format[c].media].available && "" !== a.htmlElement[a.format[c].media].canPlayType(a.format[c].codec);
        a.flash.canPlay[c] = a.format[c].flashCanPlay && a.flash.available
      });
      this.html.desired = !1;
      this.flash.desired = !1;
      b.each(this.solutions, function(c, d) {
        if (c === 0) a[d].desired = !0;
        else {
          var e = !1,
            f = !1;
          b.each(a.formats, function(b, c) {
            a[a.solutions[0]].canPlay[c] && (a.format[c].media === "video" ? f = !0 : e = !0)
          });
          a[d].desired = a.require.audio && !e || a.require.video && !f
        }
      });
      this.html.support = {};
      this.flash.support = {};
      b.each(this.formats,
        function(b, c) {
          a.html.support[c] = a.html.canPlay[c] && a.html.desired;
          a.flash.support[c] = a.flash.canPlay[c] && a.flash.desired
        });
      this.html.used = !1;
      this.flash.used = !1;
      b.each(this.solutions, function(c, d) {
        b.each(a.formats, function(b, c) {
          if (a[d].support[c]) return a[d].used = !0, !1
        })
      });
      this._resetActive();
      this._resetGate();
      this._cssSelectorAncestor(this.options.cssSelectorAncestor);
      !this.html.used && !this.flash.used ? (this._error({
        type: b.jPlayer.error.NO_SOLUTION,
        context: "{solution:'" + this.options.solution + "', supplied:'" +
          this.options.supplied + "'}",
        message: b.jPlayer.errorMsg.NO_SOLUTION,
        hint: b.jPlayer.errorHint.NO_SOLUTION
      }), this.css.jq.noSolution.length && this.css.jq.noSolution.show()) : this.css.jq.noSolution.length && this.css.jq.noSolution.hide();
      if (this.flash.used) {
        var c, d = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume + "&muted=" + this.options.muted;
        if (b.browser.msie && Number(b.browser.version) <= 8) {
          d = ['<param name="movie" value="' + this.internal.flash.swf +
            '" />', '<param name="FlashVars" value="' + d + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'
          ];
          c = document.createElement('<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0"></object>');
          for (var e = 0; e < d.length; e++) c.appendChild(document.createElement(d[e]))
        } else e = function(a, b, c) {
          var d = document.createElement("param");
          d.setAttribute("name", b);
          d.setAttribute("value", c);
          a.appendChild(d)
        }, c = document.createElement("object"), c.setAttribute("id", this.internal.flash.id), c.setAttribute("data", this.internal.flash.swf), c.setAttribute("type", "application/x-shockwave-flash"), c.setAttribute("width", "1"), c.setAttribute("height", "1"), e(c, "flashvars", d), e(c, "allowscriptaccess", "always"), e(c, "bgcolor", this.options.backgroundColor), e(c, "wmode", this.options.wmode);
        this.element.append(c);
        this.internal.flash.jq = b(c)
      }
      if (this.html.used) {
        if (this.html.audio.available) this._addHtmlEventListeners(this.htmlElement.audio,
          this.html.audio), this.element.append(this.htmlElement.audio), this.internal.audio.jq = b("#" + this.internal.audio.id);
        if (this.html.video.available) this._addHtmlEventListeners(this.htmlElement.video, this.html.video), this.element.append(this.htmlElement.video), this.internal.video.jq = b("#" + this.internal.video.id), this.status.nativeVideoControls ? this.internal.video.jq.css({
          width: this.status.width,
          height: this.status.height
        }) : this.internal.video.jq.css({
          width: "0px",
          height: "0px"
        }), this.internal.video.jq.bind("click.jPlayer",
          function() {
            a._trigger(b.jPlayer.event.click)
          })
      }
      this.options.emulateHtml && this._emulateHtmlBridge();
      this.html.used && !this.flash.used && setTimeout(function() {
        a.internal.ready = !0;
        a.version.flash = "n/a";
        a._trigger(b.jPlayer.event.repeat);
        a._trigger(b.jPlayer.event.ready)
      }, 100);
      this._updateNativeVideoControls();
      this._updateInterface();
      this._updateButtons(!1);
      this._updateAutohide();
      this._updateVolume(this.options.volume);
      this._updateMute(this.options.muted);
      this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide();
      b.jPlayer.prototype.count++
    },
    destroy: function() {
      this.clearMedia();
      this._removeUiClass();
      this.css.jq.currentTime.length && this.css.jq.currentTime.text("");
      this.css.jq.duration.length && this.css.jq.duration.text("");
      b.each(this.css.jq, function(a, b) {
        b.length && b.unbind(".jPlayer")
      });
      this.internal.poster.jq.unbind(".jPlayer");
      this.internal.video.jq && this.internal.video.jq.unbind(".jPlayer");
      this.options.emulateHtml && this._destroyHtmlBridge();
      this.element.removeData("jPlayer");
      this.element.unbind(".jPlayer");
      this.element.empty();
      delete this.instances[this.internal.instance]
    },
    enable: function() {},
    disable: function() {},
    _testCanPlayType: function(a) {
      try {
        return a.canPlayType(this.format.mp3.codec), !0
      } catch (b) {
        return !1
      }
    },
    _uaBlocklist: function(a) {
      var c = navigator.userAgent.toLowerCase(),
        d = !1;
      b.each(a, function(a, b) {
        if (b && b.test(c)) return d = !0, !1
      });
      return d
    },
    _restrictNativeVideoControls: function() {
      if (this.require.audio && this.status.nativeVideoControls) this.status.nativeVideoControls = !1, this.status.noFullScreen = !0
    },
    _updateNativeVideoControls: function() {
      if (this.html.video.available && this.html.used) this.htmlElement.video.controls = this.status.nativeVideoControls, this._updateAutohide(), this.status.nativeVideoControls && this.require.video ? (this.internal.poster.jq.hide(), this.internal.video.jq.css({
        width: this.status.width,
        height: this.status.height
      })) : this.status.waitForPlay && this.status.video && (this.internal.poster.jq.show(), this.internal.video.jq.css({
        width: "0px",
        height: "0px"
      }))
    },
    _addHtmlEventListeners: function(a,
      c) {
      var d = this;
      a.preload = this.options.preload;
      a.muted = this.options.muted;
      a.volume = this.options.volume;
      a.addEventListener("progress", function() {
        c.gate && (d._getHtmlStatus(a), d._updateInterface(), d._trigger(b.jPlayer.event.progress))
      }, !1);
      a.addEventListener("timeupdate", function() {
        c.gate && (d._getHtmlStatus(a), d._updateInterface(), d._trigger(b.jPlayer.event.timeupdate))
      }, !1);
      a.addEventListener("durationchange", function() {
        if (c.gate) d.status.duration = this.duration, d._getHtmlStatus(a), d._updateInterface(),
          d._trigger(b.jPlayer.event.durationchange)
      }, !1);
      a.addEventListener("play", function() {
        c.gate && (d._updateButtons(!0), d._html_checkWaitForPlay(), d._trigger(b.jPlayer.event.play))
      }, !1);
      a.addEventListener("playing", function() {
        c.gate && (d._updateButtons(!0), d._seeked(), d._trigger(b.jPlayer.event.playing))
      }, !1);
      a.addEventListener("pause", function() {
        c.gate && (d._updateButtons(!1), d._trigger(b.jPlayer.event.pause))
      }, !1);
      a.addEventListener("waiting", function() {
          c.gate && (d._seeking(), d._trigger(b.jPlayer.event.waiting))
        },
        !1);
      a.addEventListener("seeking", function() {
        c.gate && (d._seeking(), d._trigger(b.jPlayer.event.seeking))
      }, !1);
      a.addEventListener("seeked", function() {
        c.gate && (d._seeked(), d._trigger(b.jPlayer.event.seeked))
      }, !1);
      a.addEventListener("volumechange", function() {
        if (c.gate) d.options.volume = a.volume, d.options.muted = a.muted, d._updateMute(), d._updateVolume(), d._trigger(b.jPlayer.event.volumechange)
      }, !1);
      a.addEventListener("suspend", function() {
        c.gate && (d._seeked(), d._trigger(b.jPlayer.event.suspend))
      }, !1);
      a.addEventListener("ended",
        function() {
          if (c.gate) {
            if (!b.jPlayer.browser.webkit) d.htmlElement.media.currentTime = 0;
            d.htmlElement.media.pause();
            d._updateButtons(!1);
            d._getHtmlStatus(a, !0);
            d._updateInterface();
            d._trigger(b.jPlayer.event.ended)
          }
        }, !1);
      a.addEventListener("error", function() {
        if (c.gate && (d._updateButtons(!1), d._seeked(), d.status.srcSet)) clearTimeout(d.internal.htmlDlyCmdId), d.status.waitForLoad = !0, d.status.waitForPlay = !0, d.status.video && !d.status.nativeVideoControls && d.internal.video.jq.css({
            width: "0px",
            height: "0px"
          }),
          d._validString(d.status.media.poster) && !d.status.nativeVideoControls && d.internal.poster.jq.show(), d.css.jq.videoPlay.length && d.css.jq.videoPlay.show(), d._error({
            type: b.jPlayer.error.URL,
            context: d.status.src,
            message: b.jPlayer.errorMsg.URL,
            hint: b.jPlayer.errorHint.URL
          })
      }, !1);
      b.each(b.jPlayer.htmlEvent, function(e, g) {
        a.addEventListener(this, function() {
          c.gate && d._trigger(b.jPlayer.event[g])
        }, !1)
      })
    },
    _getHtmlStatus: function(a, b) {
      var d = 0,
        e = 0,
        g = 0,
        f = 0;
      if (a.duration) this.status.duration = a.duration;
      d = a.currentTime;
      e = this.status.duration > 0 ? 100 * d / this.status.duration : 0;
      typeof a.seekable === "object" && a.seekable.length > 0 ? (g = this.status.duration > 0 ? 100 * a.seekable.end(a.seekable.length - 1) / this.status.duration : 100, f = 100 * a.currentTime / a.seekable.end(a.seekable.length - 1)) : (g = 100, f = e);
      b && (e = f = d = 0);
      this.status.seekPercent = g;
      this.status.currentPercentRelative = f;
      this.status.currentPercentAbsolute = e;
      this.status.currentTime = d;
      this.status.readyState = a.readyState;
      this.status.networkState = a.networkState;
      this.status.playbackRate =
        a.playbackRate;
      this.status.ended = a.ended
    },
    _resetStatus: function() {
      this.status = b.extend({}, this.status, b.jPlayer.prototype.status)
    },
    _trigger: function(a, c, d) {
      a = b.Event(a);
      a.jPlayer = {};
      a.jPlayer.version = b.extend({}, this.version);
      a.jPlayer.options = b.extend(!0, {}, this.options);
      a.jPlayer.status = b.extend(!0, {}, this.status);
      a.jPlayer.html = b.extend(!0, {}, this.html);
      a.jPlayer.flash = b.extend(!0, {}, this.flash);
      if (c) a.jPlayer.error = b.extend({}, c);
      if (d) a.jPlayer.warning = b.extend({}, d);
      this.element.trigger(a)
    },
    jPlayerFlashEvent: function(a, c) {
      if (a === b.jPlayer.event.ready)
        if (this.internal.ready) {
          if (this.flash.gate) {
            if (this.status.srcSet) {
              var d = this.status.currentTime,
                e = this.status.paused;
              this.setMedia(this.status.media);
              d > 0 && (e ? this.pause(d) : this.play(d))
            }
            this._trigger(b.jPlayer.event.flashreset)
          }
        } else this.internal.ready = !0, this.internal.flash.jq.css({
          width: "0px",
          height: "0px"
        }), this.version.flash = c.version, this.version.needFlash !== this.version.flash && this._error({
          type: b.jPlayer.error.VERSION,
          context: this.version.flash,
          message: b.jPlayer.errorMsg.VERSION + this.version.flash,
          hint: b.jPlayer.errorHint.VERSION
        }), this._trigger(b.jPlayer.event.repeat), this._trigger(a);
      if (this.flash.gate) switch (a) {
        case b.jPlayer.event.progress:
          this._getFlashStatus(c);
          this._updateInterface();
          this._trigger(a);
          break;
        case b.jPlayer.event.timeupdate:
          this._getFlashStatus(c);
          this._updateInterface();
          this._trigger(a);
          break;
        case b.jPlayer.event.play:
          this._seeked();
          this._updateButtons(!0);
          this._trigger(a);
          break;
        case b.jPlayer.event.pause:
          this._updateButtons(!1);
          this._trigger(a);
          break;
        case b.jPlayer.event.ended:
          this._updateButtons(!1);
          this._trigger(a);
          break;
        case b.jPlayer.event.click:
          this._trigger(a);
          break;
        case b.jPlayer.event.error:
          this.status.waitForLoad = !0;
          this.status.waitForPlay = !0;
          this.status.video && this.internal.flash.jq.css({
            width: "0px",
            height: "0px"
          });
          this._validString(this.status.media.poster) && this.internal.poster.jq.show();
          this.css.jq.videoPlay.length && this.status.video && this.css.jq.videoPlay.show();
          this.status.video ? this._flash_setVideo(this.status.media) :
            this._flash_setAudio(this.status.media);
          this._updateButtons(!1);
          this._error({
            type: b.jPlayer.error.URL,
            context: c.src,
            message: b.jPlayer.errorMsg.URL,
            hint: b.jPlayer.errorHint.URL
          });
          break;
        case b.jPlayer.event.seeking:
          this._seeking();
          this._trigger(a);
          break;
        case b.jPlayer.event.seeked:
          this._seeked();
          this._trigger(a);
          break;
        case b.jPlayer.event.ready:
          break;
        default:
          this._trigger(a)
      }
      return !1
    },
    _getFlashStatus: function(a) {
      this.status.seekPercent = a.seekPercent;
      this.status.currentPercentRelative = a.currentPercentRelative;
      this.status.currentPercentAbsolute = a.currentPercentAbsolute;
      this.status.currentTime = a.currentTime;
      this.status.duration = a.duration;
      this.status.readyState = 4;
      this.status.networkState = 0;
      this.status.playbackRate = 1;
      this.status.ended = !1
    },
    _updateButtons: function(a) {
      if (a !== f) this.status.paused = !a, this.css.jq.play.length && this.css.jq.pause.length && (a ? (this.css.jq.play.hide(), this.css.jq.pause.show()) : (this.css.jq.play.show(), this.css.jq.pause.hide()));
      this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length &&
        (this.status.noFullScreen ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.hide()) : this.options.fullScreen ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.show()) : (this.css.jq.fullScreen.show(), this.css.jq.restoreScreen.hide()));
      this.css.jq.repeat.length && this.css.jq.repeatOff.length && (this.options.loop ? (this.css.jq.repeat.hide(), this.css.jq.repeatOff.show()) : (this.css.jq.repeat.show(), this.css.jq.repeatOff.hide()))
    },
    _updateInterface: function() {
      this.css.jq.seekBar.length && this.css.jq.seekBar.width(this.status.seekPercent +
        "%");
      this.css.jq.playBar.length && this.css.jq.playBar.width(this.status.currentPercentRelative + "%");
      this.css.jq.currentTime.length && this.css.jq.currentTime.text(b.jPlayer.convertTime(this.status.currentTime));
      this.css.jq.duration.length && this.css.jq.duration.text(b.jPlayer.convertTime(this.status.duration))
    },
    _seeking: function() {
      this.css.jq.seekBar.length && this.css.jq.seekBar.addClass("jp-seeking-bg")
    },
    _seeked: function() {
      this.css.jq.seekBar.length && this.css.jq.seekBar.removeClass("jp-seeking-bg")
    },
    _resetGate: function() {
      this.html.audio.gate = !1;
      this.html.video.gate = !1;
      this.flash.gate = !1
    },
    _resetActive: function() {
      this.html.active = !1;
      this.flash.active = !1
    },
    setMedia: function(a) {
      var c = this,
        d = !1,
        e = this.status.media.poster !== a.poster;
      this._resetMedia();
      this._resetGate();
      this._resetActive();
      b.each(this.formats, function(e, f) {
        var i = c.format[f].media === "video";
        b.each(c.solutions, function(b, e) {
          if (c[e].support[f] && c._validString(a[f])) {
            var g = e === "html";
            i ? (g ? (c.html.video.gate = !0, c._html_setVideo(a), c.html.active = !0) : (c.flash.gate = !0, c._flash_setVideo(a), c.flash.active = !0), c.css.jq.videoPlay.length && c.css.jq.videoPlay.show(), c.status.video = !0) : (g ? (c.html.audio.gate = !0, c._html_setAudio(a), c.html.active = !0) : (c.flash.gate = !0, c._flash_setAudio(a), c.flash.active = !0), c.css.jq.videoPlay.length && c.css.jq.videoPlay.hide(), c.status.video = !1);
            d = !0;
            return !1
          }
        });
        if (d) return !1
      });
      if (d) {
        if ((!this.status.nativeVideoControls || !this.html.video.gate) && this._validString(a.poster)) e ? this.htmlElement.poster.src = a.poster : this.internal.poster.jq.show();
        this.status.srcSet = !0;
        this.status.media = b.extend({}, a);
        this._updateButtons(!1);
        this._updateInterface()
      } else this._error({
        type: b.jPlayer.error.NO_SUPPORT,
        context: "{supplied:'" + this.options.supplied + "'}",
        message: b.jPlayer.errorMsg.NO_SUPPORT,
        hint: b.jPlayer.errorHint.NO_SUPPORT
      })
    },
    _resetMedia: function() {
      this._resetStatus();
      this._updateButtons(!1);
      this._updateInterface();
      this._seeked();
      this.internal.poster.jq.hide();
      clearTimeout(this.internal.htmlDlyCmdId);
      this.html.active ? this._html_resetMedia() : this.flash.active &&
        this._flash_resetMedia()
    },
    clearMedia: function() {
      this._resetMedia();
      this.html.active ? this._html_clearMedia() : this.flash.active && this._flash_clearMedia();
      this._resetGate();
      this._resetActive()
    },
    load: function() {
      this.status.srcSet ? this.html.active ? this._html_load() : this.flash.active && this._flash_load() : this._urlNotSetError("load")
    },
    play: function(a) {
      a = typeof a === "number" ? a : NaN;
      this.status.srcSet ? this.html.active ? this._html_play(a) : this.flash.active && this._flash_play(a) : this._urlNotSetError("play")
    },
    videoPlay: function() {
      this.play()
    },
    pause: function(a) {
      a = typeof a === "number" ? a : NaN;
      this.status.srcSet ? this.html.active ? this._html_pause(a) : this.flash.active && this._flash_pause(a) : this._urlNotSetError("pause")
    },
    pauseOthers: function() {
      var a = this;
      b.each(this.instances, function(b, d) {
        a.element !== d && d.data("jPlayer").status.srcSet && d.jPlayer("pause")
      })
    },
    stop: function() {
      this.status.srcSet ? this.html.active ? this._html_pause(0) : this.flash.active && this._flash_pause(0) : this._urlNotSetError("stop")
    },
    playHead: function(a) {
      a = this._limitValue(a, 0, 100);
      this.status.srcSet ? this.html.active ? this._html_playHead(a) : this.flash.active && this._flash_playHead(a) : this._urlNotSetError("playHead")
    },
    _muted: function(a) {
      this.options.muted = a;
      this.html.used && this._html_mute(a);
      this.flash.used && this._flash_mute(a);
      !this.html.video.gate && !this.html.audio.gate && (this._updateMute(a), this._updateVolume(this.options.volume), this._trigger(b.jPlayer.event.volumechange))
    },
    mute: function(a) {
      a = a === f ? !0 : !!a;
      this._muted(a)
    },
    unmute: function(a) {
      a = a === f ? !0 : !!a;
      this._muted(!a)
    },
    _updateMute: function(a) {
      if (a ===
        f) a = this.options.muted;
      this.css.jq.mute.length && this.css.jq.unmute.length && (this.status.noVolume ? (this.css.jq.mute.hide(), this.css.jq.unmute.hide()) : a ? (this.css.jq.mute.hide(), this.css.jq.unmute.show()) : (this.css.jq.mute.show(), this.css.jq.unmute.hide()))
    },
    volume: function(a) {
      a = this._limitValue(a, 0, 1);
      this.options.volume = a;
      this.html.used && this._html_volume(a);
      this.flash.used && this._flash_volume(a);
      !this.html.video.gate && !this.html.audio.gate && (this._updateVolume(a), this._trigger(b.jPlayer.event.volumechange))
    },
    volumeBar: function(a) {
      if (this.css.jq.volumeBar.length) {
        var b = this.css.jq.volumeBar.offset(),
          d = a.pageX - b.left,
          e = this.css.jq.volumeBar.width(),
          a = this.css.jq.volumeBar.height() - a.pageY + b.top,
          b = this.css.jq.volumeBar.height();
        this.options.verticalVolume ? this.volume(a / b) : this.volume(d / e)
      }
      this.options.muted && this._muted(!1)
    },
    volumeBarValue: function(a) {
      this.volumeBar(a)
    },
    _updateVolume: function(a) {
      if (a === f) a = this.options.volume;
      a = this.options.muted ? 0 : a;
      this.status.noVolume ? (this.css.jq.volumeBar.length && this.css.jq.volumeBar.hide(),
        this.css.jq.volumeBarValue.length && this.css.jq.volumeBarValue.hide(), this.css.jq.volumeMax.length && this.css.jq.volumeMax.hide()) : (this.css.jq.volumeBar.length && this.css.jq.volumeBar.show(), this.css.jq.volumeBarValue.length && (this.css.jq.volumeBarValue.show(), this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](a * 100 + "%")), this.css.jq.volumeMax.length && this.css.jq.volumeMax.show())
    },
    volumeMax: function() {
      this.volume(1);
      this.options.muted && this._muted(!1)
    },
    _cssSelectorAncestor: function(a) {
      var c =
        this;
      this.options.cssSelectorAncestor = a;
      this._removeUiClass();
      this.ancestorJq = a ? b(a) : [];
      a && this.ancestorJq.length !== 1 && this._warning({
        type: b.jPlayer.warning.CSS_SELECTOR_COUNT,
        context: a,
        message: b.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
        hint: b.jPlayer.warningHint.CSS_SELECTOR_COUNT
      });
      this._addUiClass();
      b.each(this.options.cssSelector, function(a, b) {
        c._cssSelector(a, b)
      })
    },
    _cssSelector: function(a, c) {
      var d = this;
      typeof c === "string" ? b.jPlayer.prototype.options.cssSelector[a] ?
        (this.css.jq[a] && this.css.jq[a].length && this.css.jq[a].unbind(".jPlayer"), this.options.cssSelector[a] = c, this.css.cs[a] = this.options.cssSelectorAncestor + " " + c, this.css.jq[a] = c ? b(this.css.cs[a]) : [], this.css.jq[a].length && this.css.jq[a].bind("click.jPlayer", function(c) {
          d[a](c);
          b(this).blur();
          return !1
        }), c && this.css.jq[a].length !== 1 && this._warning({
          type: b.jPlayer.warning.CSS_SELECTOR_COUNT,
          context: this.css.cs[a],
          message: b.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[a].length + " found for " + a + " method.",
          hint: b.jPlayer.warningHint.CSS_SELECTOR_COUNT
        })) : this._warning({
          type: b.jPlayer.warning.CSS_SELECTOR_METHOD,
          context: a,
          message: b.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
          hint: b.jPlayer.warningHint.CSS_SELECTOR_METHOD
        }) : this._warning({
          type: b.jPlayer.warning.CSS_SELECTOR_STRING,
          context: c,
          message: b.jPlayer.warningMsg.CSS_SELECTOR_STRING,
          hint: b.jPlayer.warningHint.CSS_SELECTOR_STRING
        })
    },
    seekBar: function(a) {
      if (this.css.jq.seekBar) {
        var b = this.css.jq.seekBar.offset(),
          a = a.pageX - b.left,
          b = this.css.jq.seekBar.width();
        this.playHead(100 * a / b)
      }
    },
    playBar: function(a) {
      this.seekBar(a)
    },
    repeat: function() {
      this._loop(!0)
    },
    repeatOff: function() {
      this._loop(!1)
    },
    _loop: function(a) {
      if (this.options.loop !== a) this.options.loop = a, this._updateButtons(), this._trigger(b.jPlayer.event.repeat)
    },
    currentTime: function() {},
    duration: function() {},
    gui: function() {},
    noSolution: function() {},
    option: function(a, c) {
      var d = a;
      if (arguments.length === 0) return b.extend(!0, {}, this.options);
      if (typeof a === "string") {
        var e = a.split(".");
        if (c === f) {
          for (var d = b.extend(!0, {}, this.options), g = 0; g < e.length; g++)
            if (d[e[g]] !== f) d = d[e[g]];
            else return this._warning({
              type: b.jPlayer.warning.OPTION_KEY,
              context: a,
              message: b.jPlayer.warningMsg.OPTION_KEY,
              hint: b.jPlayer.warningHint.OPTION_KEY
            }), f;
          return d
        }
        for (var g = d = {}, h = 0; h < e.length; h++) h < e.length - 1 ? (g[e[h]] = {}, g = g[e[h]]) : g[e[h]] = c
      }
      this._setOptions(d);
      return this
    },
    _setOptions: function(a) {
      var c = this;
      b.each(a, function(a, b) {
        c._setOption(a, b)
      });
      return this
    },
    _setOption: function(a, c) {
      var d = this;
      switch (a) {
        case "volume":
          this.volume(c);
          break;
        case "muted":
          this._muted(c);
          break;
        case "cssSelectorAncestor":
          this._cssSelectorAncestor(c);
          break;
        case "cssSelector":
          b.each(c, function(a, b) {
            d._cssSelector(a, b)
          });
          break;
        case "fullScreen":
          this.options[a] !== c && (this._removeUiClass(), this.options[a] = c, this._refreshSize());
          break;
        case "size":
          !this.options.fullScreen && this.options[a].cssClass !== c.cssClass && this._removeUiClass();
          this.options[a] = b.extend({}, this.options[a], c);
          this._refreshSize();
          break;
        case "sizeFull":
          this.options.fullScreen && this.options[a].cssClass !==
            c.cssClass && this._removeUiClass();
          this.options[a] = b.extend({}, this.options[a], c);
          this._refreshSize();
          break;
        case "autohide":
          this.options[a] = b.extend({}, this.options[a], c);
          this._updateAutohide();
          break;
        case "loop":
          this._loop(c);
          break;
        case "nativeVideoControls":
          this.options[a] = b.extend({}, this.options[a], c);
          this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
          this._restrictNativeVideoControls();
          this._updateNativeVideoControls();
          break;
        case "noFullScreen":
          this.options[a] =
            b.extend({}, this.options[a], c);
          this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
          this.status.noFullScreen = this._uaBlocklist(this.options.noFullScreen);
          this._restrictNativeVideoControls();
          this._updateButtons();
          break;
        case "noVolume":
          this.options[a] = b.extend({}, this.options[a], c);
          this.status.noVolume = this._uaBlocklist(this.options.noVolume);
          this._updateVolume();
          this._updateMute();
          break;
        case "emulateHtml":
          this.options[a] !== c && ((this.options[a] = c) ? this._emulateHtmlBridge() :
            this._destroyHtmlBridge())
      }
      return this
    },
    _refreshSize: function() {
      this._setSize();
      this._addUiClass();
      this._updateSize();
      this._updateButtons();
      this._updateAutohide();
      this._trigger(b.jPlayer.event.resize)
    },
    _setSize: function() {
      this.options.fullScreen ? (this.status.width = this.options.sizeFull.width, this.status.height = this.options.sizeFull.height, this.status.cssClass = this.options.sizeFull.cssClass) : (this.status.width = this.options.size.width, this.status.height = this.options.size.height, this.status.cssClass =
        this.options.size.cssClass);
      this.element.css({
        width: this.status.width,
        height: this.status.height
      })
    },
    _addUiClass: function() {
      this.ancestorJq.length && this.ancestorJq.addClass(this.status.cssClass)
    },
    _removeUiClass: function() {
      this.ancestorJq.length && this.ancestorJq.removeClass(this.status.cssClass)
    },
    _updateSize: function() {
      this.internal.poster.jq.css({
        width: this.status.width,
        height: this.status.height
      });
      !this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used &&
        this.status.nativeVideoControls ? this.internal.video.jq.css({
          width: this.status.width,
          height: this.status.height
        }) : !this.status.waitForPlay && this.flash.active && this.status.video && this.internal.flash.jq.css({
          width: this.status.width,
          height: this.status.height
        })
    },
    _updateAutohide: function() {
      var a = this,
        b = function() {
          a.css.jq.gui.fadeIn(a.options.autohide.fadeIn, function() {
            clearTimeout(a.internal.autohideId);
            a.internal.autohideId = setTimeout(function() {
              a.css.jq.gui.fadeOut(a.options.autohide.fadeOut)
            }, a.options.autohide.hold)
          })
        };
      this.css.jq.gui.length && (this.css.jq.gui.stop(!0, !0), clearTimeout(this.internal.autohideId), this.element.unbind(".jPlayerAutohide"), this.css.jq.gui.unbind(".jPlayerAutohide"), this.status.nativeVideoControls ? this.css.jq.gui.hide() : this.options.fullScreen && this.options.autohide.full || !this.options.fullScreen && this.options.autohide.restored ? (this.element.bind("mousemove.jPlayer.jPlayerAutohide", b), this.css.jq.gui.bind("mousemove.jPlayer.jPlayerAutohide", b), this.css.jq.gui.hide()) : this.css.jq.gui.show())
    },
    fullScreen: function() {
      this._setOption("fullScreen", !0)
    },
    restoreScreen: function() {
      this._setOption("fullScreen", !1)
    },
    _html_initMedia: function() {
      this.htmlElement.media.src = this.status.src;
      this.options.preload !== "none" && this._html_load();
      this._trigger(b.jPlayer.event.timeupdate)
    },
    _html_setAudio: function(a) {
      var c = this;
      b.each(this.formats, function(b, e) {
        if (c.html.support[e] && a[e]) return c.status.src = a[e], c.status.format[e] = !0, c.status.formatType = e, !1
      });
      this.htmlElement.media = this.htmlElement.audio;
      this._html_initMedia()
    },
    _html_setVideo: function(a) {
      var c = this;
      b.each(this.formats, function(b, e) {
        if (c.html.support[e] && a[e]) return c.status.src = a[e], c.status.format[e] = !0, c.status.formatType = e, !1
      });
      if (this.status.nativeVideoControls) this.htmlElement.video.poster = this._validString(a.poster) ? a.poster : "";
      this.htmlElement.media = this.htmlElement.video;
      this._html_initMedia()
    },
    _html_resetMedia: function() {
      this.htmlElement.media && (this.htmlElement.media.id === this.internal.video.id && !this.status.nativeVideoControls && this.internal.video.jq.css({
        width: "0px",
        height: "0px"
      }), this.htmlElement.media.pause())
    },
    _html_clearMedia: function() {
      if (this.htmlElement.media) this.htmlElement.media.src = "", this.htmlElement.media.load()
    },
    _html_load: function() {
      if (this.status.waitForLoad) this.status.waitForLoad = !1, this.htmlElement.media.load();
      clearTimeout(this.internal.htmlDlyCmdId)
    },
    _html_play: function(a) {
      var b = this;
      this._html_load();
      this.htmlElement.media.play();
      if (!isNaN(a)) try {
        this.htmlElement.media.currentTime = a
      } catch (d) {
        this.internal.htmlDlyCmdId = setTimeout(function() {
            b.play(a)
          },
          100);
        return
      }
      this._html_checkWaitForPlay()
    },
    _html_pause: function(a) {
      var b = this;
      a > 0 ? this._html_load() : clearTimeout(this.internal.htmlDlyCmdId);
      this.htmlElement.media.pause();
      if (!isNaN(a)) try {
        this.htmlElement.media.currentTime = a
      } catch (d) {
        this.internal.htmlDlyCmdId = setTimeout(function() {
          b.pause(a)
        }, 100);
        return
      }
      a > 0 && this._html_checkWaitForPlay()
    },
    _html_playHead: function(a) {
      var b = this;
      this._html_load();
      try {
        if (typeof this.htmlElement.media.seekable === "object" && this.htmlElement.media.seekable.length > 0) this.htmlElement.media.currentTime =
          a * this.htmlElement.media.seekable.end(this.htmlElement.media.seekable.length - 1) / 100;
        else if (this.htmlElement.media.duration > 0 && !isNaN(this.htmlElement.media.duration)) this.htmlElement.media.currentTime = a * this.htmlElement.media.duration / 100;
        else throw "e";
      } catch (d) {
        this.internal.htmlDlyCmdId = setTimeout(function() {
          b.playHead(a)
        }, 100);
        return
      }
      this.status.waitForLoad || this._html_checkWaitForPlay()
    },
    _html_checkWaitForPlay: function() {
      if (this.status.waitForPlay) this.status.waitForPlay = !1, this.css.jq.videoPlay.length &&
        this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.video.jq.css({
          width: this.status.width,
          height: this.status.height
        }))
    },
    _html_volume: function(a) {
      if (this.html.audio.available) this.htmlElement.audio.volume = a;
      if (this.html.video.available) this.htmlElement.video.volume = a
    },
    _html_mute: function(a) {
      if (this.html.audio.available) this.htmlElement.audio.muted = a;
      if (this.html.video.available) this.htmlElement.video.muted = a
    },
    _flash_setAudio: function(a) {
      var c = this;
      try {
        if (b.each(this.formats,
            function(b, d) {
              if (c.flash.support[d] && a[d]) {
                switch (d) {
                  case "m4a":
                  case "fla":
                    c._getMovie().fl_setAudio_m4a(a[d]);
                    break;
                  case "mp3":
                    c._getMovie().fl_setAudio_mp3(a[d])
                }
                c.status.src = a[d];
                c.status.format[d] = !0;
                c.status.formatType = d;
                return !1
              }
            }), this.options.preload === "auto") this._flash_load(), this.status.waitForLoad = !1
      } catch (d) {
        this._flashError(d)
      }
    },
    _flash_setVideo: function(a) {
      var c = this;
      try {
        if (b.each(this.formats, function(b, d) {
            if (c.flash.support[d] && a[d]) {
              switch (d) {
                case "m4v":
                case "flv":
                  c._getMovie().fl_setVideo_m4v(a[d])
              }
              c.status.src =
                a[d];
              c.status.format[d] = !0;
              c.status.formatType = d;
              return !1
            }
          }), this.options.preload === "auto") this._flash_load(), this.status.waitForLoad = !1
      } catch (d) {
        this._flashError(d)
      }
    },
    _flash_resetMedia: function() {
      this.internal.flash.jq.css({
        width: "0px",
        height: "0px"
      });
      this._flash_pause(NaN)
    },
    _flash_clearMedia: function() {
      try {
        this._getMovie().fl_clearMedia()
      } catch (a) {
        this._flashError(a)
      }
    },
    _flash_load: function() {
      try {
        this._getMovie().fl_load()
      } catch (a) {
        this._flashError(a)
      }
      this.status.waitForLoad = !1
    },
    _flash_play: function(a) {
      try {
        this._getMovie().fl_play(a)
      } catch (b) {
        this._flashError(b)
      }
      this.status.waitForLoad = !1;
      this._flash_checkWaitForPlay()
    },
    _flash_pause: function(a) {
      try {
        this._getMovie().fl_pause(a)
      } catch (b) {
        this._flashError(b)
      }
      if (a > 0) this.status.waitForLoad = !1, this._flash_checkWaitForPlay()
    },
    _flash_playHead: function(a) {
      try {
        this._getMovie().fl_play_head(a)
      } catch (b) {
        this._flashError(b)
      }
      this.status.waitForLoad || this._flash_checkWaitForPlay()
    },
    _flash_checkWaitForPlay: function() {
      if (this.status.waitForPlay) this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video &&
        (this.internal.poster.jq.hide(), this.internal.flash.jq.css({
          width: this.status.width,
          height: this.status.height
        }))
    },
    _flash_volume: function(a) {
      try {
        this._getMovie().fl_volume(a)
      } catch (b) {
        this._flashError(b)
      }
    },
    _flash_mute: function(a) {
      try {
        this._getMovie().fl_mute(a)
      } catch (b) {
        this._flashError(b)
      }
    },
    _getMovie: function() {
      return document[this.internal.flash.id]
    },
    _checkForFlash: function(a) {
      var b = !1,
        d;
      if (window.ActiveXObject) try {
        new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + a), b = !0
      } catch (e) {} else navigator.plugins &&
        navigator.mimeTypes.length > 0 && (d = navigator.plugins["Shockwave Flash"]) && navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1") >= a && (b = !0);
      return b
    },
    _validString: function(a) {
      return a && typeof a === "string"
    },
    _limitValue: function(a, b, d) {
      return a < b ? b : a > d ? d : a
    },
    _urlNotSetError: function(a) {
      this._error({
        type: b.jPlayer.error.URL_NOT_SET,
        context: a,
        message: b.jPlayer.errorMsg.URL_NOT_SET,
        hint: b.jPlayer.errorHint.URL_NOT_SET
      })
    },
    _flashError: function(a) {
      var c;
      c = this.internal.ready ? "FLASH_DISABLED" :
        "FLASH";
      this._error({
        type: b.jPlayer.error[c],
        context: this.internal.flash.swf,
        message: b.jPlayer.errorMsg[c] + a.message,
        hint: b.jPlayer.errorHint[c]
      });
      this.internal.flash.jq.css({
        width: "1px",
        height: "1px"
      })
    },
    _error: function(a) {
      this._trigger(b.jPlayer.event.error, a);
      this.options.errorAlerts && this._alert("Error!" + (a.message ? "\n\n" + a.message : "") + (a.hint ? "\n\n" + a.hint : "") + "\n\nContext: " + a.context)
    },
    _warning: function(a) {
      this._trigger(b.jPlayer.event.warning, f, a);
      this.options.warningAlerts && this._alert("Warning!" +
        (a.message ? "\n\n" + a.message : "") + (a.hint ? "\n\n" + a.hint : "") + "\n\nContext: " + a.context)
    },
    _alert: function(a) {
      alert("jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + a)
    },
    _emulateHtmlBridge: function() {
      var a = this;
      b.each(b.jPlayer.emulateMethods.split(/\s+/g), function(b, d) {
        a.internal.domNode[d] = function(b) {
          a[d](b)
        }
      });
      b.each(b.jPlayer.event, function(c, d) {
        var e = !0;
        b.each(b.jPlayer.reservedEvent.split(/\s+/g), function(a, b) {
          if (b === c) return e = !1
        });
        e && a.element.bind(d + ".jPlayer.jPlayerHtml",
          function() {
            a._emulateHtmlUpdate();
            var b = document.createEvent("Event");
            b.initEvent(c, !1, !0);
            a.internal.domNode.dispatchEvent(b)
          })
      })
    },
    _emulateHtmlUpdate: function() {
      var a = this;
      b.each(b.jPlayer.emulateStatus.split(/\s+/g), function(b, d) {
        a.internal.domNode[d] = a.status[d]
      });
      b.each(b.jPlayer.emulateOptions.split(/\s+/g), function(b, d) {
        a.internal.domNode[d] = a.options[d]
      })
    },
    _destroyHtmlBridge: function() {
      var a = this;
      this.element.unbind(".jPlayerHtml");
      b.each((b.jPlayer.emulateMethods + " " + b.jPlayer.emulateStatus +
        " " + b.jPlayer.emulateOptions).split(/\s+/g), function(b, d) {
        delete a.internal.domNode[d]
      })
    }
  };
  b.jPlayer.error = {
    FLASH: "e_flash",
    FLASH_DISABLED: "e_flash_disabled",
    NO_SOLUTION: "e_no_solution",
    NO_SUPPORT: "e_no_support",
    URL: "e_url",
    URL_NOT_SET: "e_url_not_set",
    VERSION: "e_version"
  };
  b.jPlayer.errorMsg = {
    FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
    FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
    NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
    NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
    URL: "Media URL could not be loaded.",
    URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
    VERSION: "jPlayer " + b.jPlayer.prototype.version.script + " needs Jplayer.swf version " + b.jPlayer.prototype.version.needFlash + " but found "
  };
  b.jPlayer.errorHint = {
    FLASH: "Check your swfPath option and that Jplayer.swf is there.",
    FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
    NO_SOLUTION: "Review the jPlayer options: support and supplied.",
    NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
    URL: "Check media URL is valid.",
    URL_NOT_SET: "Use setMedia() to set the media URL.",
    VERSION: "Update jPlayer files."
  };
  b.jPlayer.warning = {
    CSS_SELECTOR_COUNT: "e_css_selector_count",
    CSS_SELECTOR_METHOD: "e_css_selector_method",
    CSS_SELECTOR_STRING: "e_css_selector_string",
    OPTION_KEY: "e_option_key"
  };
  b.jPlayer.warningMsg = {
    CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
    CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
    CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
    OPTION_KEY: "The option requested in jPlayer('option') is undefined."
  };
  b.jPlayer.warningHint = {
    CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
    CSS_SELECTOR_METHOD: "Check your method name.",
    CSS_SELECTOR_STRING: "Check your css selector is a string.",
    OPTION_KEY: "Check your option name."
  }
})(jQuery);

+
function($) {
  "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd otransitionend',
      'transition': 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function(duration) {
    var called = false,
      $el = this
    $(this).one($.support.transition.end, function() {
      called = true
    })
    var callback = function() {
      if (!called) $($el).trigger($.support.transition.end)
    }
    setTimeout(callback, duration)
    return this
  }

  $(function() {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+
function($) {
  "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================
  var Carousel = function(element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.paused =
      this.sliding =
      this.interval =
      this.$active =
      this.$items = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle = function(e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval &&
      !this.paused &&
      (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function() {
    this.$active = this.$element.find('.item.active')
    this.$items = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function(pos) {
    var that = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding) return this.$element.one('slid', function() {
      that.to(pos)
    })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function(e) {
    e || (this.paused = true)

    //if (this.$element.find('.next, .prev').length && $.support.transition.end) {
    //this.$element.trigger($.support.transition.end)
    this.cycle(true)
    //}

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function() {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function() {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function(type, next) {
    var $active = this.$element.find('.item.active')
    var $next = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback = type == 'next' ? 'first' : 'last'
    var that = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', {
      relatedTarget: $next[0],
      direction: direction
    })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function() {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    var $this = this.$element.hasClass('header_effect');
    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      var timer;


      timer = setTimeout(function() {
        checkSliderForHeaderStyle($next, $this);
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        $active
          .one($.support.transition.end, function() {
            $next.removeClass([type, direction].join(' ')).removeClass('inactive').addClass('active')
            $active.removeClass(['active', direction].join(' ')).addClass('inactive')
            that.sliding = false
            setTimeout(function() {
              that.$element.trigger('slid')
            }, 0)
          })
          .emulateTransitionEnd(600)
        clearTimeout(timer);
      }, 1000);
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function(option) {
    return this.each(function() {
      var $this = $(this)
      var data = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function() {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function(e) {
    var $this = $(this),
      href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function() {
    $('[data-ride="carousel"]').each(function() {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);

/*!
 * skrollr core
 *
 * Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr
 *
 * Free to use under terms of MIT license
 */
(function(window, document, undefined) {
  'use strict';
  var skrollr = window.skrollr = {
    get: function() {
      return _instance
    },
    init: function(options) {
      return _instance || new Skrollr(options)
    },
    VERSION: '0.6.10'
  };
  var hasProp = Object.prototype.hasOwnProperty;
  var Math = window.Math;
  var getStyle = window.getComputedStyle;
  var documentElement;
  var body;
  var EVENT_TOUCHSTART = 'touchstart';
  var EVENT_TOUCHMOVE = 'touchmove';
  var EVENT_TOUCHCANCEL = 'touchcancel';
  var EVENT_TOUCHEND = 'touchend';
  var SKROLLABLE_CLASS = 'skrollable';
  var SKROLLABLE_BEFORE_CLASS = SKROLLABLE_CLASS + '-before';
  var SKROLLABLE_BETWEEN_CLASS = SKROLLABLE_CLASS + '-between';
  var SKROLLABLE_AFTER_CLASS = SKROLLABLE_CLASS + '-after';
  var SKROLLR_CLASS = 'skrollr';
  var NO_SKROLLR_CLASS = 'no-' + SKROLLR_CLASS;
  var SKROLLR_DESKTOP_CLASS = SKROLLR_CLASS + '-desktop';
  var SKROLLR_MOBILE_CLASS = SKROLLR_CLASS + '-mobile';
  var DEFAULT_EASING = 'linear';
  var DEFAULT_DURATION = 1000;
  var MOBILE_DECELERATION = 0.0006;
  var DEFAULT_SMOOTH_SCROLLING_DURATION = 200;
  var ANCHOR_START = 'start';
  var ANCHOR_END = 'end';
  var ANCHOR_CENTER = 'center';
  var ANCHOR_BOTTOM = 'bottom';
  var SKROLLABLE_ID_DOM_PROPERTY = '___skrollable_id';
  var rxTrim = /^\s+|\s+$/g;
  var rxKeyframeAttribute = /^data(?:-(_\w+))?(?:-?(-?\d+))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/;
  var rxPropValue = /\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi;
  var rxPropEasing = /^([a-z\-]+)\[(\w+)\]$/;
  var rxCamelCase = /-([a-z])/g;
  var rxCamelCaseFn = function(str, letter) {
    return letter.toUpperCase()
  };
  var rxNumericValue = /[\-+]?[\d]*\.?[\d]+/g;
  var rxInterpolateString = /\{\?\}/g;
  var rxRGBAIntegerColor = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g;
  var rxGradient = /[a-z\-]+-gradient/g;
  var theCSSPrefix = '';
  var theDashedCSSPrefix = '';
  var detectCSSPrefix = function() {
    var rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
    if (!getStyle) {
      return
    }
    var style = getStyle(body, null);
    for (var k in style) {
      theCSSPrefix = (k.match(rxPrefixes) || (+k == k && style[k].match(rxPrefixes)));
      if (theCSSPrefix) {
        break
      }
    }
    if (!theCSSPrefix) {
      theCSSPrefix = theDashedCSSPrefix = '';
      return
    }
    theCSSPrefix = theCSSPrefix[0];
    if (theCSSPrefix.slice(0, 1) === '-') {
      theDashedCSSPrefix = theCSSPrefix;
      theCSSPrefix = ({
        '-webkit-': 'webkit',
        '-moz-': 'Moz',
        '-ms-': 'ms',
        '-o-': 'O'
      })[theCSSPrefix]
    } else {
      theDashedCSSPrefix = '-' + theCSSPrefix.toLowerCase() + '-'
    }
  };
  var polyfillRAF = function() {
    var requestAnimFrame = window.requestAnimationFrame || window[theCSSPrefix.toLowerCase() + 'RequestAnimationFrame'];
    var lastTime = _now();
    if (_isMobile || !requestAnimFrame) {
      requestAnimFrame = function(callback) {
        var deltaTime = _now() - lastTime;
        var delay = Math.max(0, 1000 / 60 - deltaTime);
        window.setTimeout(function() {
          lastTime = _now();
          callback()
        }, delay)
      }
    }
    return requestAnimFrame
  };
  var easings = {
    begin: function() {
      return 0
    },
    end: function() {
      return 1
    },
    linear: function(p) {
      return p
    },
    quadratic: function(p) {
      return p * p
    },
    cubic: function(p) {
      return p * p * p
    },
    swing: function(p) {
      return (-Math.cos(p * Math.PI) / 2) + 0.5
    },
    sqrt: function(p) {
      return Math.sqrt(p)
    },
    outCubic: function(p) {
      return (Math.pow((p - 1), 3) + 1)
    },
    bounce: function(p) {
      var a;
      if (p <= 0.5083) {
        a = 3
      } else if (p <= 0.8489) {
        a = 9
      } else if (p <= 0.96208) {
        a = 27
      } else if (p <= 0.99981) {
        a = 91
      } else {
        return 1
      }
      return 1 - Math.abs(3 * Math.cos(p * a * 1.028) / a)
    }
  };

  function Skrollr(options) {
    documentElement = document.documentElement;
    body = document.body;
    detectCSSPrefix();
    _instance = this;
    options = options || {};
    _constants = options.constants || {};
    if (options.easing) {
      for (var e in options.easing) {
        easings[e] = options.easing[e]
      }
    }
    _edgeStrategy = options.edgeStrategy || 'set';
    _listeners = {
      beforerender: options.beforerender,
      render: options.render
    };
    _forceHeight = options.forceHeight !== false;
    if (_forceHeight) {
      _scale = options.scale || 1
    }
    _smoothScrollingEnabled = options.smoothScrolling !== false;
    _smoothScrollingDuration = options.smoothScrollingDuration || DEFAULT_SMOOTH_SCROLLING_DURATION;
    _smoothScrolling = {
      targetTop: _instance.getScrollTop()
    };
    _isMobile = ((options.mobileCheck || function() {
      return (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)
    })());
    if (_isMobile) {
      _skrollrBody = document.getElementById('skrollr-body');
      if (_skrollrBody) {
        _detect3DTransforms()
      }
      _initMobile();
      _updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_MOBILE_CLASS], [NO_SKROLLR_CLASS])
    } else {
      _updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS], [NO_SKROLLR_CLASS])
    }
    _instance.refresh();
    _addEvent(window, 'resize orientationchange', function() {
      var width = documentElement.clientWidth;
      var height = documentElement.clientHeight;
      if (height !== _lastViewportHeight || width !== _lastViewportWidth) {
        _lastViewportHeight = height;
        _lastViewportWidth = width;
        _requestReflow = true
      }
    });
    var requestAnimFrame = polyfillRAF();
    (function animloop() {
      _render();
      requestAnimFrame(animloop)
    }());
    return _instance
  }
  Skrollr.prototype.refresh = function(elements) {
    var elementIndex;
    var elementsLength;
    var ignoreID = false;
    if (elements === undefined) {
      ignoreID = true;
      _skrollables = [];
      _skrollableIdCounter = 0;
      elements = document.getElementsByTagName('*')
    } else {
      elements = [].concat(elements)
    }
    elementIndex = 0;
    elementsLength = elements.length;
    for (; elementIndex < elementsLength; elementIndex++) {
      var el = elements[elementIndex];
      var anchorTarget = el;
      var keyFrames = [];
      var smoothScrollThis = _smoothScrollingEnabled;
      var edgeStrategy = _edgeStrategy;
      if (!el.attributes) {
        continue
      }
      var attributeIndex = 0;
      var attributesLength = el.attributes.length;
      for (; attributeIndex < attributesLength; attributeIndex++) {
        var attr = el.attributes[attributeIndex];
        if (attr.name === 'data-anchor-target') {
          anchorTarget = document.querySelector(attr.value);
          if (anchorTarget === null) {
            throw 'Unable to find anchor target "' + attr.value + '"';
          }
          continue
        }
        if (attr.name === 'data-smooth-scrolling') {
          smoothScrollThis = attr.value !== 'off';
          continue
        }
        if (attr.name === 'data-edge-strategy') {
          edgeStrategy = attr.value;
          continue
        }
        var match = attr.name.match(rxKeyframeAttribute);
        if (match === null) {
          continue
        }
        var constant = match[1];
        constant = constant && _constants[constant.substr(1)] || 0;
        var offset = (match[2] | 0) + constant;
        var anchor1 = match[3];
        var anchor2 = match[4] || anchor1;
        var kf = {
          offset: offset,
          props: attr.value,
          element: el
        };
        keyFrames.push(kf);
        if (!anchor1 || anchor1 === ANCHOR_START || anchor1 === ANCHOR_END) {
          kf.mode = 'absolute';
          if (anchor1 === ANCHOR_END) {
            kf.isEnd = true
          } else {
            kf.frame = offset * _scale;
            delete kf.offset
          }
        } else {
          kf.mode = 'relative';
          kf.anchors = [anchor1, anchor2]
        }
      }
      if (!keyFrames.length) {
        continue
      }
      var styleAttr, classAttr;
      var id;
      if (!ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {
        id = el[SKROLLABLE_ID_DOM_PROPERTY];
        styleAttr = _skrollables[id].styleAttr;
        classAttr = _skrollables[id].classAttr
      } else {
        id = (el[SKROLLABLE_ID_DOM_PROPERTY] = _skrollableIdCounter++);
        styleAttr = el.style.cssText;
        classAttr = _getClass(el)
      }
      _skrollables[id] = {
        element: el,
        styleAttr: styleAttr,
        classAttr: classAttr,
        anchorTarget: anchorTarget,
        keyFrames: keyFrames,
        smoothScrolling: smoothScrollThis,
        edgeStrategy: edgeStrategy
      };
      _updateClass(el, [SKROLLABLE_CLASS], [])
    }
    _reflow();
    elementIndex = 0;
    elementsLength = elements.length;
    for (; elementIndex < elementsLength; elementIndex++) {
      var sk = _skrollables[elements[elementIndex][SKROLLABLE_ID_DOM_PROPERTY]];
      if (sk === undefined) {
        continue
      }
      _parseProps(sk);
      _fillProps(sk)
    }
    return _instance
  };
  Skrollr.prototype.relativeToAbsolute = function(element, viewportAnchor, elementAnchor) {
    var viewportHeight = documentElement.clientHeight;
    var box = element.getBoundingClientRect();
    var absolute = box.top;
    var boxHeight = box.bottom - box.top;
    if (viewportAnchor === ANCHOR_BOTTOM) {
      absolute -= viewportHeight
    } else if (viewportAnchor === ANCHOR_CENTER) {
      absolute -= viewportHeight / 2
    }
    if (elementAnchor === ANCHOR_BOTTOM) {
      absolute += boxHeight
    } else if (elementAnchor === ANCHOR_CENTER) {
      absolute += boxHeight / 2
    }
    absolute += _instance.getScrollTop();
    return (absolute + 0.5) | 0
  };
  Skrollr.prototype.animateTo = function(top, options) {
    options = options || {};
    var now = _now();
    var scrollTop = _instance.getScrollTop();
    _scrollAnimation = {
      startTop: scrollTop,
      topDiff: top - scrollTop,
      targetTop: top,
      duration: options.duration || DEFAULT_DURATION,
      startTime: now,
      endTime: now + (options.duration || DEFAULT_DURATION),
      easing: easings[options.easing || DEFAULT_EASING],
      done: options.done
    };
    if (!_scrollAnimation.topDiff) {
      if (_scrollAnimation.done) {
        _scrollAnimation.done.call(_instance, false)
      }
      _scrollAnimation = undefined
    }
    return _instance
  };
  Skrollr.prototype.stopAnimateTo = function() {
    if (_scrollAnimation && _scrollAnimation.done) {
      _scrollAnimation.done.call(_instance, true)
    }
    _scrollAnimation = undefined
  };
  Skrollr.prototype.isAnimatingTo = function() {
    return !!_scrollAnimation
  };
  Skrollr.prototype.setScrollTop = function(top, force) {
    if (force === true) {
      _lastTop = top;
      _forceRender = true
    }
    if (_isMobile) {
      _mobileOffset = Math.min(Math.max(top, 0), _maxKeyFrame)
    } else {
      window.scrollTo(0, top)
    }
    return _instance
  };
  Skrollr.prototype.getScrollTop = function() {
    if (_isMobile) {
      return _mobileOffset
    } else {
      return window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0
    }
  };
  Skrollr.prototype.on = function(name, fn) {
    _listeners[name] = fn;
    return _instance
  };
  Skrollr.prototype.off = function(name) {
    delete _listeners[name];
    return _instance
  };
  var _initMobile = function() {
    var initialElement;
    var initialTouchY;
    var initialTouchX;
    var currentTouchY;
    var currentTouchX;
    var lastTouchY;
    var deltaY;
    var initialTouchTime;
    var currentTouchTime;
    var lastTouchTime;
    var deltaTime;
    _addEvent(documentElement, [EVENT_TOUCHSTART, EVENT_TOUCHMOVE, EVENT_TOUCHCANCEL, EVENT_TOUCHEND].join(' '), function(e) {
      e.preventDefault();
      var touch = e.changedTouches[0];
      currentTouchY = touch.clientY;
      currentTouchX = touch.clientX;
      currentTouchTime = e.timeStamp;
      switch (e.type) {
        case EVENT_TOUCHSTART:
          if (initialElement) {
            initialElement.blur()
          }
          _instance.stopAnimateTo();
          initialElement = e.target;
          initialTouchY = lastTouchY = currentTouchY;
          initialTouchX = currentTouchX;
          initialTouchTime = currentTouchTime;
          break;
        case EVENT_TOUCHMOVE:
          deltaY = currentTouchY - lastTouchY;
          deltaTime = currentTouchTime - lastTouchTime;
          _instance.setScrollTop(_mobileOffset - deltaY, true);
          lastTouchY = currentTouchY;
          lastTouchTime = currentTouchTime;
          break;
        default:
        case EVENT_TOUCHCANCEL:
        case EVENT_TOUCHEND:
          var distanceY = initialTouchY - currentTouchY;
          var distanceX = initialTouchX - currentTouchX;
          var distance2 = distanceX * distanceX + distanceY * distanceY;
          if (distance2 < 49) {
            initialElement.focus();
            initialElement.click();
            return
          }
          initialElement = undefined;
          var speed = deltaY / deltaTime;
          speed = Math.max(Math.min(speed, 3), -3);
          var duration = Math.abs(speed / MOBILE_DECELERATION);
          var targetOffset = speed * duration + 0.5 * MOBILE_DECELERATION * duration * duration;
          var targetTop = _instance.getScrollTop() - targetOffset;
          var targetRatio = 0;
          if (targetTop > _maxKeyFrame) {
            targetRatio = (_maxKeyFrame - targetTop) / targetOffset;
            targetTop = _maxKeyFrame
          } else if (targetTop < 0) {
            targetRatio = -targetTop / targetOffset;
            targetTop = 0
          }
          duration = duration * (1 - targetRatio);
          _instance.animateTo(targetTop, {
            easing: 'outCubic',
            duration: duration
          });
          break
      }
    });
    window.scrollTo(0, 0);
    documentElement.style.overflow = body.style.overflow = 'hidden'
  };
  var _updateDependentKeyFrames = function() {
    var skrollable;
    var element;
    var anchorTarget;
    var keyFrames;
    var keyFrameIndex;
    var keyFramesLength;
    var kf;
    var skrollableIndex;
    var skrollablesLength;
    skrollableIndex = 0;
    skrollablesLength = _skrollables.length;
    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      skrollable = _skrollables[skrollableIndex];
      element = skrollable.element;
      anchorTarget = skrollable.anchorTarget;
      keyFrames = skrollable.keyFrames;
      keyFrameIndex = 0;
      keyFramesLength = keyFrames.length;
      for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
        kf = keyFrames[keyFrameIndex];
        if (kf.mode === 'relative') {
          _reset(element);
          kf.frame = _instance.relativeToAbsolute(anchorTarget, kf.anchors[0], kf.anchors[1]) - kf.offset;
          _reset(element, true)
        }
        if (_forceHeight) {
          if (!kf.isEnd && kf.frame > _maxKeyFrame) {
            _maxKeyFrame = kf.frame
          }
        }
      }
    }
    _maxKeyFrame = Math.max(_maxKeyFrame, _getDocumentHeight());
    skrollableIndex = 0;
    skrollablesLength = _skrollables.length;
    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      skrollable = _skrollables[skrollableIndex];
      keyFrames = skrollable.keyFrames;
      keyFrameIndex = 0;
      keyFramesLength = keyFrames.length;
      for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
        kf = keyFrames[keyFrameIndex];
        if (kf.isEnd) {
          kf.frame = _maxKeyFrame - kf.offset
        }
      }
      skrollable.keyFrames.sort(_keyFrameComparator)
    }
  };
  var _calcSteps = function(fakeFrame, actualFrame) {
    var skrollableIndex = 0;
    var skrollablesLength = _skrollables.length;
    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      var skrollable = _skrollables[skrollableIndex];
      var element = skrollable.element;
      var frame = skrollable.smoothScrolling ? fakeFrame : actualFrame;
      var frames = skrollable.keyFrames;
      var firstFrame = frames[0].frame;
      var lastFrame = frames[frames.length - 1].frame;
      var beforeFirst = frame < firstFrame;
      var afterLast = frame > lastFrame;
      var firstOrLastFrame = frames[beforeFirst ? 0 : frames.length - 1];
      var key;
      var value;
      if (beforeFirst || afterLast) {
        if (beforeFirst && skrollable.edge === -1 || afterLast && skrollable.edge === 1) {
          continue
        }
        _updateClass(element, [beforeFirst ? SKROLLABLE_BEFORE_CLASS : SKROLLABLE_AFTER_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_BETWEEN_CLASS, SKROLLABLE_AFTER_CLASS]);
        skrollable.edge = beforeFirst ? -1 : 1;
        switch (skrollable.edgeStrategy) {
          case 'reset':
            _reset(element);
            continue;
          case 'ease':
            frame = firstOrLastFrame.frame;
            break;
          default:
          case 'set':
            var props = firstOrLastFrame.props;
            for (key in props) {
              if (hasProp.call(props, key)) {
                value = _interpolateString(props[key].value);
                skrollr.setStyle(element, key, value)
              }
            }
            continue
        }
      } else {
        if (skrollable.edge !== 0) {
          _updateClass(element, [SKROLLABLE_CLASS, SKROLLABLE_BETWEEN_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_AFTER_CLASS]);
          skrollable.edge = 0
        }
      }
      var keyFrameIndex = 0;
      var framesLength = frames.length - 1;
      for (; keyFrameIndex < framesLength; keyFrameIndex++) {
        if (frame >= frames[keyFrameIndex].frame && frame <= frames[keyFrameIndex + 1].frame) {
          var left = frames[keyFrameIndex];
          var right = frames[keyFrameIndex + 1];
          for (key in left.props) {
            if (hasProp.call(left.props, key)) {
              var progress = (frame - left.frame) / (right.frame - left.frame);
              progress = left.props[key].easing(progress);
              value = _calcInterpolation(left.props[key].value, right.props[key].value, progress);
              value = _interpolateString(value);
              skrollr.setStyle(element, key, value)
            }
          }
          break
        }
      }
    }
  };
  var _render = function() {
    if (_requestReflow) {
      _requestReflow = false;
      _reflow()
    }
    var renderTop = _instance.getScrollTop();
    var afterAnimationCallback;
    var now = _now();
    var progress;
    if (_scrollAnimation) {
      if (now >= _scrollAnimation.endTime) {
        renderTop = _scrollAnimation.targetTop;
        afterAnimationCallback = _scrollAnimation.done;
        _scrollAnimation = undefined
      } else {
        progress = _scrollAnimation.easing((now - _scrollAnimation.startTime) / _scrollAnimation.duration);
        renderTop = (_scrollAnimation.startTop + progress * _scrollAnimation.topDiff) | 0
      }
      _instance.setScrollTop(renderTop, true)
    } else if (!_isMobile) {
      var smoothScrollingDiff = _smoothScrolling.targetTop - renderTop;
      if (smoothScrollingDiff) {
        _smoothScrolling = {
          startTop: _lastTop,
          topDiff: renderTop - _lastTop,
          targetTop: renderTop,
          startTime: _lastRenderCall,
          endTime: _lastRenderCall + _smoothScrollingDuration
        }
      }
      if (now <= _smoothScrolling.endTime) {
        progress = easings.sqrt((now - _smoothScrolling.startTime) / _smoothScrollingDuration);
        renderTop = (_smoothScrolling.startTop + progress * _smoothScrolling.topDiff) | 0
      }
    }
    if (_isMobile && _skrollrBody) {
      skrollr.setStyle(_skrollrBody, 'transform', 'translate(0, ' + -(_mobileOffset) + 'px) ' + _translateZ)
    }
    if (_forceRender || _lastTop !== renderTop) {
      _direction = (renderTop >= _lastTop) ? 'down' : 'up';
      _forceRender = false;
      var listenerParams = {
        curTop: renderTop,
        lastTop: _lastTop,
        maxTop: _maxKeyFrame,
        direction: _direction
      };
      var continueRendering = _listeners.beforerender && _listeners.beforerender.call(_instance, listenerParams);
      if (continueRendering !== false) {
        _calcSteps(renderTop, _instance.getScrollTop());
        _lastTop = renderTop;
        if (_listeners.render) {
          _listeners.render.call(_instance, listenerParams)
        }
      }
      if (afterAnimationCallback) {
        afterAnimationCallback.call(_instance, false)
      }
    }
    _lastRenderCall = now
  };
  var _parseProps = function(skrollable) {
    var keyFrameIndex = 0;
    var keyFramesLength = skrollable.keyFrames.length;
    for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
      var frame = skrollable.keyFrames[keyFrameIndex];
      var easing;
      var value;
      var prop;
      var props = {};
      var match;
      while ((match = rxPropValue.exec(frame.props)) !== null) {
        prop = match[1];
        value = match[2];
        easing = prop.match(rxPropEasing);
        if (easing !== null) {
          prop = easing[1];
          easing = easing[2]
        } else {
          easing = DEFAULT_EASING
        }
        value = value.indexOf('!') ? _parseProp(value) : [value.slice(1)];
        props[prop] = {
          value: value,
          easing: easings[easing]
        }
      }
      frame.props = props
    }
  };
  var _parseProp = function(val) {
    var numbers = [];
    rxRGBAIntegerColor.lastIndex = 0;
    val = val.replace(rxRGBAIntegerColor, function(rgba) {
      return rgba.replace(rxNumericValue, function(n) {
        return n / 255 * 100 + '%'
      })
    });
    if (theDashedCSSPrefix) {
      rxGradient.lastIndex = 0;
      val = val.replace(rxGradient, function(s) {
        return theDashedCSSPrefix + s
      })
    }
    val = val.replace(rxNumericValue, function(n) {
      numbers.push(+n);
      return '{?}'
    });
    numbers.unshift(val);
    return numbers
  };
  var _fillProps = function(sk) {
    var propList = {};
    var keyFrameIndex;
    var keyFramesLength;
    keyFrameIndex = 0;
    keyFramesLength = sk.keyFrames.length;
    for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
      _fillPropForFrame(sk.keyFrames[keyFrameIndex], propList)
    }
    propList = {};
    keyFrameIndex = sk.keyFrames.length - 1;
    for (; keyFrameIndex >= 0; keyFrameIndex--) {
      _fillPropForFrame(sk.keyFrames[keyFrameIndex], propList)
    }
  };
  var _fillPropForFrame = function(frame, propList) {
    var key;
    for (key in propList) {
      if (!hasProp.call(frame.props, key)) {
        frame.props[key] = propList[key]
      }
    }
    for (key in frame.props) {
      propList[key] = frame.props[key]
    }
  };
  var _calcInterpolation = function(val1, val2, progress) {
    var valueIndex;
    var val1Length = val1.length;
    if (val1Length !== val2.length) {
      throw 'Can\'t interpolate between "' + val1[0] + '" and "' + val2[0] + '"';
    }
    var interpolated = [val1[0]];
    valueIndex = 1;
    for (; valueIndex < val1Length; valueIndex++) {
      interpolated[valueIndex] = val1[valueIndex] + ((val2[valueIndex] - val1[valueIndex]) * progress)
    }
    return interpolated
  };
  var _interpolateString = function(val) {
    var valueIndex = 1;
    rxInterpolateString.lastIndex = 0;
    return val[0].replace(rxInterpolateString, function() {
      return val[valueIndex++]
    })
  };
  var _reset = function(elements, undo) {
    elements = [].concat(elements);
    var skrollable;
    var element;
    var elementsIndex = 0;
    var elementsLength = elements.length;
    for (; elementsIndex < elementsLength; elementsIndex++) {
      element = elements[elementsIndex];
      skrollable = _skrollables[element[SKROLLABLE_ID_DOM_PROPERTY]];
      if (!skrollable) {
        continue
      }
      if (undo) {
        element.style.cssText = skrollable.dirtyStyleAttr;
        _updateClass(element, skrollable.dirtyClassAttr)
      } else {
        skrollable.dirtyStyleAttr = element.style.cssText;
        skrollable.dirtyClassAttr = _getClass(element);
        element.style.cssText = skrollable.styleAttr;
        _updateClass(element, skrollable.classAttr)
      }
    }
  };
  var _detect3DTransforms = function() {
    _translateZ = 'translateZ(0)';
    skrollr.setStyle(_skrollrBody, 'transform', _translateZ);
    var computedStyle = getStyle(_skrollrBody);
    var computedTransform = computedStyle.getPropertyValue('transform');
    var computedTransformWithPrefix = computedStyle.getPropertyValue(theDashedCSSPrefix + 'transform');
    var has3D = (computedTransform && computedTransform !== 'none') || (computedTransformWithPrefix && computedTransformWithPrefix !== 'none');
    if (!has3D) {
      _translateZ = ''
    }
  };
  skrollr.setStyle = function(el, prop, val) {
    var style = el.style;
    prop = prop.replace(rxCamelCase, rxCamelCaseFn).replace('-', '');
    if (prop === 'zIndex') {
      style[prop] = '' + (val | 0)
    } else if (prop === 'float') {
      style.styleFloat = style.cssFloat = val
    } else {
      try {
        if (theCSSPrefix) {
          style[theCSSPrefix + prop.slice(0, 1).toUpperCase() + prop.slice(1)] = val
        }
        style[prop] = val
      } catch (ignore) {}
    }
  };
  var _addEvent = skrollr.addEvent = function(element, names, callback) {
    var intermediate = function(e) {
      e = e || window.event;
      if (!e.target) {
        e.target = e.srcElement
      }
      if (!e.preventDefault) {
        e.preventDefault = function() {
          e.returnValue = false
        }
      }
      return callback.call(this, e)
    };
    names = names.split(' ');
    var nameCounter = 0;
    var namesLength = names.length;
    for (; nameCounter < namesLength; nameCounter++) {
      if (element.addEventListener) {
        element.addEventListener(names[nameCounter], callback, false)
      } else {
        element.attachEvent('on' + names[nameCounter], intermediate)
      }
    }
  };
  var _reflow = function() {
    var pos = _instance.getScrollTop();
    _maxKeyFrame = 0;
    if (_forceHeight && !_isMobile) {
      body.style.height = 'auto'
    }
    _updateDependentKeyFrames();
    if (_forceHeight && !_isMobile) {
      body.style.height = (_maxKeyFrame + documentElement.clientHeight) + 'px'
    }
    if (_isMobile) {
      _instance.setScrollTop(Math.min(_instance.getScrollTop(), _maxKeyFrame))
    } else {
      _instance.setScrollTop(pos, true)
    }
    _forceRender = true
  };
  var _getDocumentHeight = function() {
    var skrollrBodyHeight = (_skrollrBody && _skrollrBody.offsetHeight || 0);
    var bodyHeight = Math.max(skrollrBodyHeight, body.scrollHeight, body.offsetHeight, documentElement.scrollHeight, documentElement.offsetHeight, documentElement.clientHeight);
    return bodyHeight - documentElement.clientHeight
  };
  var _getClass = function(element) {
    var prop = 'className';
    if (window.SVGElement && element instanceof window.SVGElement) {
      element = element[prop];
      prop = 'baseVal'
    }
    return element[prop]
  };
  var _updateClass = function(element, add, remove) {
    var prop = 'className';
    if (window.SVGElement && element instanceof window.SVGElement) {
      element = element[prop];
      prop = 'baseVal'
    }
    if (remove === undefined) {
      element[prop] = add;
      return
    }
    var val = element[prop];
    var classRemoveIndex = 0;
    var removeLength = remove.length;
    for (; classRemoveIndex < removeLength; classRemoveIndex++) {
      val = _untrim(val).replace(_untrim(remove[classRemoveIndex]), ' ')
    }
    val = _trim(val);
    var classAddIndex = 0;
    var addLength = add.length;
    for (; classAddIndex < addLength; classAddIndex++) {
      if (_untrim(val).indexOf(_untrim(add[classAddIndex])) === -1) {
        val += ' ' + add[classAddIndex]
      }
    }
    element[prop] = _trim(val)
  };
  var _trim = function(a) {
    return a.replace(rxTrim, '')
  };
  var _untrim = function(a) {
    return ' ' + a + ' '
  };
  var _now = Date.now || function() {
    return +new Date()
  };
  var _keyFrameComparator = function(a, b) {
    return a.frame - b.frame
  };
  var _instance;
  var _skrollables;
  var _skrollrBody;
  var _listeners;
  var _forceHeight;
  var _maxKeyFrame = 0;
  var _scale = 1;
  var _constants;
  var _direction = 'down';
  var _lastTop = -1;
  var _lastRenderCall = _now();
  var _lastViewportWidth = 0;
  var _lastViewportHeight = 0;
  var _requestReflow = false;
  var _scrollAnimation;
  var _smoothScrollingEnabled;
  var _smoothScrollingDuration;
  var _smoothScrolling;
  var _forceRender;
  var _skrollableIdCounter = 0;
  var _edgeStrategy;
  var _isMobile = false;
  var _mobileOffset = 0;
  var _translateZ
}(window, document));

/*!
 * Chart.js
 * http://chartjs.org/
 *
 * Copyright 2013 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
window.Chart = function(context) {
  var chart = this;
  var animationOptions = {
    linear: function(t) {
      return t
    },
    easeInQuad: function(t) {
      return t * t
    },
    easeOutQuad: function(t) {
      return -1 * t * (t - 2)
    },
    easeInOutQuad: function(t) {
      if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
      return -1 / 2 * ((--t) * (t - 2) - 1)
    },
    easeInCubic: function(t) {
      return t * t * t
    },
    easeOutCubic: function(t) {
      return 1 * ((t = t / 1 - 1) * t * t + 1)
    },
    easeInOutCubic: function(t) {
      if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
      return 1 / 2 * ((t -= 2) * t * t + 2)
    },
    easeInQuart: function(t) {
      return t * t * t * t
    },
    easeOutQuart: function(t) {
      return -1 * ((t = t / 1 - 1) * t * t * t - 1)
    },
    easeInOutQuart: function(t) {
      if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
      return -1 / 2 * ((t -= 2) * t * t * t - 2)
    },
    easeInQuint: function(t) {
      return 1 * (t /= 1) * t * t * t * t
    },
    easeOutQuint: function(t) {
      return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
    },
    easeInOutQuint: function(t) {
      if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
      return 1 / 2 * ((t -= 2) * t * t * t * t + 2)
    },
    easeInSine: function(t) {
      return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
    },
    easeOutSine: function(t) {
      return 1 * Math.sin(t / 1 * (Math.PI / 2))
    },
    easeInOutSine: function(t) {
      return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1)
    },
    easeInExpo: function(t) {
      return (t == 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
    },
    easeOutExpo: function(t) {
      return (t == 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
    },
    easeInOutExpo: function(t) {
      if (t == 0) return 0;
      if (t == 1) return 1;
      if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
      return 1 / 2 * (-Math.pow(2, -10 * --t) + 2)
    },
    easeInCirc: function(t) {
      if (t >= 1) return t;
      return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
    },
    easeOutCirc: function(t) {
      return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
    },
    easeInOutCirc: function(t) {
      if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
      return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1)
    },
    easeInElastic: function(t) {
      var s = 1.70158;
      var p = 0;
      var a = 1;
      if (t == 0) return 0;
      if ((t /= 1) == 1) return 1;
      if (!p) p = 1 * .3;
      if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4
      } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p))
    },
    easeOutElastic: function(t) {
      var s = 1.70158;
      var p = 0;
      var a = 1;
      if (t == 0) return 0;
      if ((t /= 1) == 1) return 1;
      if (!p) p = 1 * .3;
      if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4
      } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
      return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1
    },
    easeInOutElastic: function(t) {
      var s = 1.70158;
      var p = 0;
      var a = 1;
      if (t == 0) return 0;
      if ((t /= 1 / 2) == 2) return 1;
      if (!p) p = 1 * (.3 * 1.5);
      if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4
      } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1
    },
    easeInBack: function(t) {
      var s = 1.70158;
      return 1 * (t /= 1) * t * ((s + 1) * t - s)
    },
    easeOutBack: function(t) {
      var s = 1.70158;
      return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1)
    },
    easeInOutBack: function(t) {
      var s = 1.70158;
      if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
      return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2)
    },
    easeInBounce: function(t) {
      return 1 - animationOptions.easeOutBounce(1 - t)
    },
    easeOutBounce: function(t) {
      if ((t /= 1) < (1 / 2.75)) {
        return 1 * (7.5625 * t * t)
      } else if (t < (2 / 2.75)) {
        return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + .75)
      } else if (t < (2.5 / 2.75)) {
        return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375)
      } else {
        return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375)
      }
    },
    easeInOutBounce: function(t) {
      if (t < 1 / 2) return animationOptions.easeInBounce(t * 2) * .5;
      return animationOptions.easeOutBounce(t * 2 - 1) * .5 + 1 * .5
    }
  };
  var width = context.canvas.width;
  var height = context.canvas.height;
  if (window.devicePixelRatio) {
    context.canvas.style.width = width + "px";
    context.canvas.style.height = height + "px";
    context.canvas.height = height * window.devicePixelRatio;
    context.canvas.width = width * window.devicePixelRatio;
    context.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
  this.PolarArea = function(data, options) {
    chart.PolarArea.defaults = {
      scaleOverlay: true,
      scaleOverride: false,
      scaleSteps: null,
      scaleStepWidth: null,
      scaleStartValue: null,
      scaleShowLine: true,
      scaleLineColor: "rgba(0,0,0,.1)",
      scaleLineWidth: 1,
      scaleShowLabels: true,
      scaleLabel: "<%=value%>",
      scaleFontFamily: "'Arial'",
      scaleFontSize: 12,
      scaleFontStyle: "normal",
      scaleFontColor: "#666",
      scaleShowLabelBackdrop: true,
      scaleBackdropColor: "rgba(255,255,255,0.75)",
      scaleBackdropPaddingY: 2,
      scaleBackdropPaddingX: 2,
      segmentShowStroke: true,
      segmentStrokeColor: "#fff",
      segmentStrokeWidth: 2,
      animation: true,
      animationSteps: 100,
      animationEasing: "easeOutBounce",
      animateRotate: true,
      animateScale: false,
      onAnimationComplete: null
    };
    var config = (options) ? mergeChartConfig(chart.PolarArea.defaults, options) : chart.PolarArea.defaults;
    return new PolarArea(data, config, context)
  };
  this.Radar = function(data, options) {
    chart.Radar.defaults = {
      scaleOverlay: false,
      scaleOverride: false,
      scaleSteps: null,
      scaleStepWidth: null,
      scaleStartValue: null,
      scaleShowLine: true,
      scaleLineColor: "rgba(0,0,0,.1)",
      scaleLineWidth: 1,
      scaleShowLabels: false,
      scaleLabel: "<%=value%>",
      scaleFontFamily: "'Arial'",
      scaleFontSize: 12,
      scaleFontStyle: "normal",
      scaleFontColor: "#666",
      scaleShowLabelBackdrop: true,
      scaleBackdropColor: "rgba(255,255,255,0.75)",
      scaleBackdropPaddingY: 2,
      scaleBackdropPaddingX: 2,
      angleShowLineOut: true,
      angleLineColor: "rgba(0,0,0,.1)",
      angleLineWidth: 1,
      pointLabelFontFamily: "'Arial'",
      pointLabelFontStyle: "normal",
      pointLabelFontSize: 12,
      pointLabelFontColor: "#666",
      pointDot: true,
      pointDotRadius: 3,
      pointDotStrokeWidth: 1,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      animation: true,
      animationSteps: 60,
      animationEasing: "easeOutQuart",
      onAnimationComplete: null
    };
    var config = (options) ? mergeChartConfig(chart.Radar.defaults, options) : chart.Radar.defaults;
    return new Radar(data, config, context)
  };
  this.Pie = function(data, options) {
    chart.Pie.defaults = {
      segmentShowStroke: true,
      segmentStrokeColor: "#fff",
      segmentStrokeWidth: 2,
      animation: true,
      animationSteps: 100,
      animationEasing: "easeOutBounce",
      animateRotate: true,
      animateScale: false,
      onAnimationComplete: null
    };
    var config = (options) ? mergeChartConfig(chart.Pie.defaults, options) : chart.Pie.defaults;
    return new Pie(data, config, context)
  };
  this.Doughnut = function(data, options) {
    chart.Doughnut.defaults = {
      segmentShowStroke: true,
      segmentStrokeColor: "#fff",
      segmentStrokeWidth: 2,
      percentageInnerCutout: 50,
      animation: true,
      animationSteps: 100,
      animationEasing: "easeOutBounce",
      animateRotate: true,
      animateScale: false,
      onAnimationComplete: null
    };
    var config = (options) ? mergeChartConfig(chart.Doughnut.defaults, options) : chart.Doughnut.defaults;
    return new Doughnut(data, config, context)
  };
  this.Line = function(data, options) {
    chart.Line.defaults = {
      scaleOverlay: false,
      scaleOverride: false,
      scaleSteps: null,
      scaleStepWidth: null,
      scaleStartValue: null,
      scaleLineColor: "rgba(0,0,0,.1)",
      scaleLineWidth: 1,
      scaleShowLabels: true,
      scaleLabel: "<%=value%>",
      scaleFontFamily: "'Arial'",
      scaleFontSize: 12,
      scaleFontStyle: "normal",
      scaleFontColor: "#666",
      scaleShowGridLines: true,
      scaleGridLineColor: "rgba(0,0,0,.05)",
      scaleGridLineWidth: 1,
      bezierCurve: true,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 2,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      animation: true,
      animationSteps: 60,
      animationEasing: "easeOutQuart",
      onAnimationComplete: null
    };
    var config = (options) ? mergeChartConfig(chart.Line.defaults, options) : chart.Line.defaults;
    return new Line(data, config, context)
  };
  this.Bar = function(data, options) {
    chart.Bar.defaults = {
      scaleOverlay: false,
      scaleOverride: false,
      scaleSteps: null,
      scaleStepWidth: null,
      scaleStartValue: null,
      scaleLineColor: "rgba(0,0,0,.1)",
      scaleLineWidth: 1,
      scaleShowLabels: true,
      scaleLabel: "<%=value%>",
      scaleFontFamily: "'Arial'",
      scaleFontSize: 12,
      scaleFontStyle: "normal",
      scaleFontColor: "#666",
      scaleShowGridLines: true,
      scaleGridLineColor: "rgba(0,0,0,.05)",
      scaleGridLineWidth: 1,
      barShowStroke: true,
      barStrokeWidth: 2,
      barValueSpacing: 5,
      barDatasetSpacing: 1,
      animation: true,
      animationSteps: 60,
      animationEasing: "easeOutQuart",
      onAnimationComplete: null
    };
    var config = (options) ? mergeChartConfig(chart.Bar.defaults, options) : chart.Bar.defaults;
    return new Bar(data, config, context)
  };
  var clear = function(c) {
    c.clearRect(0, 0, width, height)
  };
  var PolarArea = function(data, config, ctx) {
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;
    calculateDrawingSizes();
    valueBounds = getValueBounds();
    labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : null;
    if (!config.scaleOverride) {
      calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString)
    } else {
      calculatedScale = {
        steps: config.scaleSteps,
        stepValue: config.scaleStepWidth,
        graphMin: config.scaleStartValue,
        labels: []
      };
      populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth)
    };
    scaleHop = maxSize / (calculatedScale.steps);
    animationLoop(config, drawScale, drawAllSegments, ctx);

    function calculateDrawingSizes() {
      maxSize = (Min([width, height]) / 2);
      maxSize -= Max([config.scaleFontSize * 0.5, config.scaleLineWidth * 0.5]);
      labelHeight = config.scaleFontSize * 2;
      if (config.scaleShowLabelBackdrop) {
        labelHeight += (2 * config.scaleBackdropPaddingY);
        maxSize -= config.scaleBackdropPaddingY * 1.5
      }
      scaleHeight = maxSize;
      labelHeight = Default(labelHeight, 5)
    }

    function drawScale() {
      for (var i = 0; i < calculatedScale.steps; i++) {
        if (config.scaleShowLine) {
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, scaleHop * (i + 1), 0, (Math.PI * 2), true);
          ctx.strokeStyle = config.scaleLineColor;
          ctx.lineWidth = config.scaleLineWidth;
          ctx.stroke()
        }
        if (config.scaleShowLabels) {
          ctx.textAlign = "center";
          ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
          var label = calculatedScale.labels[i];
          if (config.scaleShowLabelBackdrop) {
            var textWidth = ctx.measureText(label).width;
            ctx.fillStyle = config.scaleBackdropColor;
            ctx.beginPath();
            ctx.rect(Math.round(width / 2 - textWidth / 2 - config.scaleBackdropPaddingX), Math.round(height / 2 - (scaleHop * (i + 1)) - config.scaleFontSize * 0.5 - config.scaleBackdropPaddingY), Math.round(textWidth + (config.scaleBackdropPaddingX * 2)), Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY * 2)));
            ctx.fill()
          }
          ctx.textBaseline = "middle";
          ctx.fillStyle = config.scaleFontColor;
          ctx.fillText(label, width / 2, height / 2 - (scaleHop * (i + 1)))
        }
      }
    }

    function drawAllSegments(animationDecimal) {
      var startAngle = -Math.PI / 2,
        angleStep = (Math.PI * 2) / data.length,
        scaleAnimation = 1,
        rotateAnimation = 1;
      if (config.animation) {
        if (config.animateScale) {
          scaleAnimation = animationDecimal
        }
        if (config.animateRotate) {
          rotateAnimation = animationDecimal
        }
      }
      for (var i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, scaleAnimation * calculateOffset(data[i].value, calculatedScale, scaleHop), startAngle, startAngle + rotateAnimation * angleStep, false);
        ctx.lineTo(width / 2, height / 2);
        ctx.closePath();
        ctx.fillStyle = data[i].color;
        ctx.fill();
        if (config.segmentShowStroke) {
          ctx.strokeStyle = config.segmentStrokeColor;
          ctx.lineWidth = config.segmentStrokeWidth;
          ctx.stroke()
        }
        startAngle += rotateAnimation * angleStep
      }
    }

    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for (var i = 0; i < data.length; i++) {
        if (data[i].value > upperValue) {
          upperValue = data[i].value
        }
        if (data[i].value < lowerValue) {
          lowerValue = data[i].value
        }
      };
      var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
      var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));
      return {
        maxValue: upperValue,
        minValue: lowerValue,
        maxSteps: maxSteps,
        minSteps: minSteps
      }
    }
  };
  var Radar = function(data, config, ctx) {
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;
    if (!data.labels) data.labels = [];
    calculateDrawingSizes();
    var valueBounds = getValueBounds();
    labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : null;
    if (!config.scaleOverride) {
      calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString)
    } else {
      calculatedScale = {
        steps: config.scaleSteps,
        stepValue: config.scaleStepWidth,
        graphMin: config.scaleStartValue,
        labels: []
      };
      populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth)
    }
    scaleHop = maxSize / (calculatedScale.steps);
    animationLoop(config, drawScale, drawAllDataPoints, ctx);

    function drawAllDataPoints(animationDecimal) {
      var rotationDegree = (2 * Math.PI) / data.datasets[0].data.length;
      ctx.save();
      ctx.translate(width / 2, height / 2);
      for (var i = 0; i < data.datasets.length; i++) {
        ctx.beginPath();
        ctx.moveTo(0, animationDecimal * (-1 * calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop)));
        for (var j = 1; j < data.datasets[i].data.length; j++) {
          ctx.rotate(rotationDegree);
          ctx.lineTo(0, animationDecimal * (-1 * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop)))
        }
        ctx.closePath();
        ctx.fillStyle = data.datasets[i].fillColor;
        ctx.strokeStyle = data.datasets[i].strokeColor;
        ctx.lineWidth = config.datasetStrokeWidth;
        ctx.fill();
        ctx.stroke();
        if (config.pointDot) {
          ctx.fillStyle = data.datasets[i].pointColor;
          ctx.strokeStyle = data.datasets[i].pointStrokeColor;
          ctx.lineWidth = config.pointDotStrokeWidth;
          for (var k = 0; k < data.datasets[i].data.length; k++) {
            ctx.rotate(rotationDegree);
            ctx.beginPath();
            ctx.arc(0, animationDecimal * (-1 * calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop)), config.pointDotRadius, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke()
          }
        }
        ctx.rotate(rotationDegree)
      }
      ctx.restore()
    }

    function drawScale() {
      var rotationDegree = (2 * Math.PI) / data.datasets[0].data.length;
      ctx.save();
      ctx.translate(width / 2, height / 2);
      if (config.angleShowLineOut) {
        ctx.strokeStyle = config.angleLineColor;
        ctx.lineWidth = config.angleLineWidth;
        for (var h = 0; h < data.datasets[0].data.length; h++) {
          ctx.rotate(rotationDegree);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -maxSize);
          ctx.stroke()
        }
      }
      for (var i = 0; i < calculatedScale.steps; i++) {
        ctx.beginPath();
        if (config.scaleShowLine) {
          ctx.strokeStyle = config.scaleLineColor;
          ctx.lineWidth = config.scaleLineWidth;
          ctx.moveTo(0, -scaleHop * (i + 1));
          for (var j = 0; j < data.datasets[0].data.length; j++) {
            ctx.rotate(rotationDegree);
            ctx.lineTo(0, -scaleHop * (i + 1))
          }
          ctx.closePath();
          ctx.stroke()
        }
        if (config.scaleShowLabels) {
          ctx.textAlign = 'center';
          ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
          ctx.textBaseline = "middle";
          if (config.scaleShowLabelBackdrop) {
            var textWidth = ctx.measureText(calculatedScale.labels[i]).width;
            ctx.fillStyle = config.scaleBackdropColor;
            ctx.beginPath();
            ctx.rect(Math.round(-textWidth / 2 - config.scaleBackdropPaddingX), Math.round((-scaleHop * (i + 1)) - config.scaleFontSize * 0.5 - config.scaleBackdropPaddingY), Math.round(textWidth + (config.scaleBackdropPaddingX * 2)), Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY * 2)));
            ctx.fill()
          }
          ctx.fillStyle = config.scaleFontColor;
          ctx.fillText(calculatedScale.labels[i], 0, -scaleHop * (i + 1))
        }
      }
      for (var k = 0; k < data.labels.length; k++) {
        ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize + "px " + config.pointLabelFontFamily;
        ctx.fillStyle = config.pointLabelFontColor;
        var opposite = Math.sin(rotationDegree * k) * (maxSize + config.pointLabelFontSize);
        var adjacent = Math.cos(rotationDegree * k) * (maxSize + config.pointLabelFontSize);
        if (rotationDegree * k == Math.PI || rotationDegree * k == 0) {
          ctx.textAlign = "center"
        } else if (rotationDegree * k > Math.PI) {
          ctx.textAlign = "right"
        } else {
          ctx.textAlign = "left"
        }
        ctx.textBaseline = "middle";
        ctx.fillText(data.labels[k], opposite, -adjacent)
      }
      ctx.restore()
    };

    function calculateDrawingSizes() {
      maxSize = (Min([width, height]) / 2);
      labelHeight = config.scaleFontSize * 2;
      var labelLength = 0;
      for (var i = 0; i < data.labels.length; i++) {
        ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize + "px " + config.pointLabelFontFamily;
        var textMeasurement = ctx.measureText(data.labels[i]).width;
        if (textMeasurement > labelLength) labelLength = textMeasurement
      }
      maxSize -= Max([labelLength, ((config.pointLabelFontSize / 2) * 1.5)]);
      maxSize -= config.pointLabelFontSize;
      maxSize = CapValue(maxSize, null, 0);
      scaleHeight = maxSize;
      labelHeight = Default(labelHeight, 5)
    };

    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for (var i = 0; i < data.datasets.length; i++) {
        for (var j = 0; j < data.datasets[i].data.length; j++) {
          if (data.datasets[i].data[j] > upperValue) {
            upperValue = data.datasets[i].data[j]
          }
          if (data.datasets[i].data[j] < lowerValue) {
            lowerValue = data.datasets[i].data[j]
          }
        }
      }
      var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
      var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));
      return {
        maxValue: upperValue,
        minValue: lowerValue,
        maxSteps: maxSteps,
        minSteps: minSteps
      }
    }
  };
  var Pie = function(data, config, ctx) {
    var segmentTotal = 0;
    var pieRadius = Min([height / 2, width / 2]) - 5;
    for (var i = 0; i < data.length; i++) {
      segmentTotal += data[i].value
    }
    animationLoop(config, null, drawPieSegments, ctx);

    function drawPieSegments(animationDecimal) {
      var cumulativeAngle = -Math.PI / 2,
        scaleAnimation = 1,
        rotateAnimation = 1;
      if (config.animation) {
        if (config.animateScale) {
          scaleAnimation = animationDecimal
        }
        if (config.animateRotate) {
          rotateAnimation = animationDecimal
        }
      }
      for (var i = 0; i < data.length; i++) {
        var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (Math.PI * 2));
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, scaleAnimation * pieRadius, cumulativeAngle, cumulativeAngle + segmentAngle);
        ctx.lineTo(width / 2, height / 2);
        ctx.closePath();
        ctx.fillStyle = data[i].color;
        ctx.fill();
        if (config.segmentShowStroke) {
          ctx.lineWidth = config.segmentStrokeWidth;
          ctx.strokeStyle = config.segmentStrokeColor;
          ctx.stroke()
        }
        cumulativeAngle += segmentAngle
      }
    }
  };
  var Doughnut = function(data, config, ctx) {
    var segmentTotal = 0;
    var doughnutRadius = Min([height / 2, width / 2]) - 5;
    var cutoutRadius = doughnutRadius * (config.percentageInnerCutout / 100);
    for (var i = 0; i < data.length; i++) {
      segmentTotal += data[i].value
    }
    animationLoop(config, null, drawPieSegments, ctx);

    function drawPieSegments(animationDecimal) {
      var cumulativeAngle = -Math.PI / 2,
        scaleAnimation = 1,
        rotateAnimation = 1;
      if (config.animation) {
        if (config.animateScale) {
          scaleAnimation = animationDecimal
        }
        if (config.animateRotate) {
          rotateAnimation = animationDecimal
        }
      }
      for (var i = 0; i < data.length; i++) {
        var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (Math.PI * 2));
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, scaleAnimation * doughnutRadius, cumulativeAngle, cumulativeAngle + segmentAngle, false);
        ctx.arc(width / 2, height / 2, scaleAnimation * cutoutRadius, cumulativeAngle + segmentAngle, cumulativeAngle, true);
        ctx.closePath();
        ctx.fillStyle = data[i].color;
        ctx.fill();
        if (config.segmentShowStroke) {
          ctx.lineWidth = config.segmentStrokeWidth;
          ctx.strokeStyle = config.segmentStrokeColor;
          ctx.stroke()
        }
        cumulativeAngle += segmentAngle
      }
    }
  };
  var Line = function(data, config, ctx) {
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop, widestXLabel, xAxisLength, yAxisPosX, xAxisPosY, rotateLabels = 0;
    calculateDrawingSizes();
    valueBounds = getValueBounds();
    labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : "";
    if (!config.scaleOverride) {
      calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString)
    } else {
      calculatedScale = {
        steps: config.scaleSteps,
        stepValue: config.scaleStepWidth,
        graphMin: config.scaleStartValue,
        labels: []
      };
      populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth)
    }
    scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
    calculateXAxisSize();
    animationLoop(config, drawScale, drawLines, ctx);

    function drawLines(animPc) {
      for (var i = 0; i < data.datasets.length; i++) {
        ctx.strokeStyle = data.datasets[i].strokeColor;
        ctx.lineWidth = config.datasetStrokeWidth;
        ctx.beginPath();
        ctx.moveTo(yAxisPosX, xAxisPosY - animPc * (calculateOffset(data.datasets[i].data[0], calculatedScale, scaleHop)));
        for (var j = 1; j < data.datasets[i].data.length; j++) {
          if (config.bezierCurve) {
            ctx.bezierCurveTo(xPos(j - 0.5), yPos(i, j - 1), xPos(j - 0.5), yPos(i, j), xPos(j), yPos(i, j))
          } else {
            ctx.lineTo(xPos(j), yPos(i, j))
          }
        }
        ctx.stroke();
        if (config.datasetFill) {
          ctx.lineTo(yAxisPosX + (valueHop * (data.datasets[i].data.length - 1)), xAxisPosY);
          ctx.lineTo(yAxisPosX, xAxisPosY);
          ctx.closePath();
          ctx.fillStyle = data.datasets[i].fillColor;
          ctx.fill()
        } else {
          ctx.closePath()
        }
        if (config.pointDot) {
          ctx.fillStyle = data.datasets[i].pointColor;
          ctx.strokeStyle = data.datasets[i].pointStrokeColor;
          ctx.lineWidth = config.pointDotStrokeWidth;
          for (var k = 0; k < data.datasets[i].data.length; k++) {
            ctx.beginPath();
            ctx.arc(yAxisPosX + (valueHop * k), xAxisPosY - animPc * (calculateOffset(data.datasets[i].data[k], calculatedScale, scaleHop)), config.pointDotRadius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.stroke()
          }
        }
      }

      function yPos(dataSet, iteration) {
        return xAxisPosY - animPc * (calculateOffset(data.datasets[dataSet].data[iteration], calculatedScale, scaleHop))
      }

      function xPos(iteration) {
        return yAxisPosX + (valueHop * iteration)
      }
    }

    function drawScale() {
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(width - widestXLabel / 2, xAxisPosY);
      ctx.lineTo(width - (widestXLabel / 2) - xAxisLength, xAxisPosY);
      ctx.stroke();
      if (rotateLabels > 0) {
        ctx.save();
        ctx.textAlign = "right"
      } else {
        ctx.textAlign = "center"
      }
      ctx.fillStyle = config.scaleFontColor;
      for (var i = 0; i < data.labels.length; i++) {
        ctx.save();
        if (rotateLabels > 0) {
          ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
          ctx.rotate(-(rotateLabels * (Math.PI / 180)));
          ctx.fillText(data.labels[i], 0, 0);
          ctx.restore()
        } else {
          ctx.fillText(data.labels[i], yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize + 3)
        }
        ctx.beginPath();
        ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY + 3);
        if (config.scaleShowGridLines && i > 0) {
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor
        } else {
          ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY + 3)
        }
        ctx.stroke()
      }
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(yAxisPosX, xAxisPosY);
      ctx.lineTo(yAxisPosX, 0);
      ctx.stroke();
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (var j = 0; j < calculatedScale.steps; j++) {
        ctx.beginPath();
        ctx.moveTo(yAxisPosX, xAxisPosY - ((j + 1) * scaleHop));
        if (config.scaleShowGridLines) {
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor;
          ctx.lineTo(yAxisPosX + xAxisLength, xAxisPosY - ((j + 1) * scaleHop))
        } else {
          ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - ((j + 1) * scaleHop))
        }
        ctx.stroke();
        if (config.scaleShowLabels) {
          ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - ((j + 1) * scaleHop))
        }
      }
    }

    function calculateXAxisSize() {
      var longestText = 1;
      if (config.scaleShowLabels) {
        ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
        for (var i = 0; i < calculatedScale.labels.length; i++) {
          var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
          longestText = (measuredText > longestText) ? measuredText : longestText
        }
        longestText += 10
      }
      xAxisLength = width - longestText - widestXLabel;
      valueHop = Math.floor(xAxisLength / (data.labels.length - 1));
      yAxisPosX = width - widestXLabel / 2 - xAxisLength;
      xAxisPosY = scaleHeight + config.scaleFontSize / 2
    }

    function calculateDrawingSizes() {
      maxSize = height;
      ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
      widestXLabel = 1;
      for (var i = 0; i < data.labels.length; i++) {
        var textLength = ctx.measureText(data.labels[i]).width;
        widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel
      }
      if (width / data.labels.length < widestXLabel) {
        rotateLabels = 45;
        if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
          rotateLabels = 90;
          maxSize -= widestXLabel
        } else {
          maxSize -= Math.sin(rotateLabels) * widestXLabel
        }
      } else {
        maxSize -= config.scaleFontSize
      }
      maxSize -= 5;
      labelHeight = config.scaleFontSize;
      maxSize -= labelHeight;
      scaleHeight = maxSize
    }

    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for (var i = 0; i < data.datasets.length; i++) {
        for (var j = 0; j < data.datasets[i].data.length; j++) {
          if (data.datasets[i].data[j] > upperValue) {
            upperValue = data.datasets[i].data[j]
          };
          if (data.datasets[i].data[j] < lowerValue) {
            lowerValue = data.datasets[i].data[j]
          }
        }
      };
      var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
      var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));
      return {
        maxValue: upperValue,
        minValue: lowerValue,
        maxSteps: maxSteps,
        minSteps: minSteps
      }
    }
  };
  var Bar = function(data, config, ctx) {
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop, widestXLabel, xAxisLength, yAxisPosX, xAxisPosY, barWidth, rotateLabels = 0;
    calculateDrawingSizes();
    valueBounds = getValueBounds();
    labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : "";
    if (!config.scaleOverride) {
      calculatedScale = calculateScale(scaleHeight, valueBounds.maxSteps, valueBounds.minSteps, valueBounds.maxValue, valueBounds.minValue, labelTemplateString)
    } else {
      calculatedScale = {
        steps: config.scaleSteps,
        stepValue: config.scaleStepWidth,
        graphMin: config.scaleStartValue,
        labels: []
      };
      populateLabels(labelTemplateString, calculatedScale.labels, calculatedScale.steps, config.scaleStartValue, config.scaleStepWidth)
    }
    scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
    calculateXAxisSize();
    animationLoop(config, drawBars, drawScale, ctx);

    function drawBars(animPc) {
      ctx.lineWidth = config.barStrokeWidth;
      for (var i = 0; i < data.datasets.length; i++) {
        ctx.fillStyle = data.datasets[i].fillColor;
        ctx.strokeStyle = data.datasets[i].strokeColor;
        for (var j = 0; j < data.datasets[i].data.length; j++) {
          var barOffset = yAxisPosX + config.barValueSpacing + valueHop * j + barWidth * i + config.barDatasetSpacing * i + config.barStrokeWidth * i;
          ctx.beginPath();
          ctx.moveTo(barOffset, xAxisPosY);
          ctx.lineTo(barOffset, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop) + (config.barStrokeWidth / 2));
          ctx.lineTo(barOffset + barWidth, xAxisPosY - animPc * calculateOffset(data.datasets[i].data[j], calculatedScale, scaleHop) + (config.barStrokeWidth / 2));
          ctx.lineTo(barOffset + barWidth, xAxisPosY);
          if (config.barShowStroke) {
            ctx.stroke()
          }
          ctx.closePath();
          ctx.fill()
        }
      }
    }

    function drawScale() {
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
      ctx.lineTo(width - (widestXLabel / 2) - xAxisLength - 5, xAxisPosY);
      ctx.stroke();
      if (rotateLabels > 0) {
        ctx.save();
        ctx.textAlign = "right"
      } else {
        ctx.textAlign = "center"
      }
      ctx.fillStyle = config.scaleFontColor;
      for (var i = 0; i < data.labels.length; i++) {
        ctx.save();
        if (rotateLabels > 0) {
          ctx.translate(yAxisPosX + i * valueHop, xAxisPosY + config.scaleFontSize);
          ctx.rotate(-(rotateLabels * (Math.PI / 180)));
          ctx.fillText(data.labels[i], 0, 0);
          ctx.restore()
        } else {
          ctx.fillText(data.labels[i], yAxisPosX + i * valueHop + valueHop / 2, xAxisPosY + config.scaleFontSize + 3)
        }
        ctx.beginPath();
        ctx.moveTo(yAxisPosX + (i + 1) * valueHop, xAxisPosY + 3);
        ctx.lineWidth = config.scaleGridLineWidth;
        ctx.strokeStyle = config.scaleGridLineColor;
        ctx.lineTo(yAxisPosX + (i + 1) * valueHop, 5);
        ctx.stroke()
      }
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(yAxisPosX, xAxisPosY + 5);
      ctx.lineTo(yAxisPosX, 5);
      ctx.stroke();
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (var j = 0; j < calculatedScale.steps; j++) {
        ctx.beginPath();
        ctx.moveTo(yAxisPosX - 3, xAxisPosY - ((j + 1) * scaleHop));
        if (config.scaleShowGridLines) {
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor;
          ctx.lineTo(yAxisPosX + xAxisLength + 5, xAxisPosY - ((j + 1) * scaleHop))
        } else {
          ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - ((j + 1) * scaleHop))
        }
        ctx.stroke();
        if (config.scaleShowLabels) {
          ctx.fillText(calculatedScale.labels[j], yAxisPosX - 8, xAxisPosY - ((j + 1) * scaleHop))
        }
      }
    }

    function calculateXAxisSize() {
      var longestText = 1;
      if (config.scaleShowLabels) {
        ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
        for (var i = 0; i < calculatedScale.labels.length; i++) {
          var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
          longestText = (measuredText > longestText) ? measuredText : longestText
        }
        longestText += 10
      }
      xAxisLength = width - longestText - widestXLabel;
      valueHop = Math.floor(xAxisLength / (data.labels.length));
      barWidth = (valueHop - config.scaleGridLineWidth * 2 - (config.barValueSpacing * 2) - (config.barDatasetSpacing * data.datasets.length - 1) - ((config.barStrokeWidth / 2) * data.datasets.length - 1)) / data.datasets.length;
      yAxisPosX = width - widestXLabel / 2 - xAxisLength;
      xAxisPosY = scaleHeight + config.scaleFontSize / 2
    }

    function calculateDrawingSizes() {
      maxSize = height;
      ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
      widestXLabel = 1;
      for (var i = 0; i < data.labels.length; i++) {
        var textLength = ctx.measureText(data.labels[i]).width;
        widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel
      }
      if (width / data.labels.length < widestXLabel) {
        rotateLabels = 45;
        if (width / data.labels.length < Math.cos(rotateLabels) * widestXLabel) {
          rotateLabels = 90;
          maxSize -= widestXLabel
        } else {
          maxSize -= Math.sin(rotateLabels) * widestXLabel
        }
      } else {
        maxSize -= config.scaleFontSize
      }
      maxSize -= 5;
      labelHeight = config.scaleFontSize;
      maxSize -= labelHeight;
      scaleHeight = maxSize
    }

    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for (var i = 0; i < data.datasets.length; i++) {
        for (var j = 0; j < data.datasets[i].data.length; j++) {
          if (data.datasets[i].data[j] > upperValue) {
            upperValue = data.datasets[i].data[j]
          };
          if (data.datasets[i].data[j] < lowerValue) {
            lowerValue = data.datasets[i].data[j]
          }
        }
      };
      var maxSteps = Math.floor((scaleHeight / (labelHeight * 0.66)));
      var minSteps = Math.floor((scaleHeight / labelHeight * 0.5));
      return {
        maxValue: upperValue,
        minValue: lowerValue,
        maxSteps: maxSteps,
        minSteps: minSteps
      }
    }
  };

  function calculateOffset(val, calculatedScale, scaleHop) {
    var outerValue = calculatedScale.steps * calculatedScale.stepValue;
    var adjustedValue = val - calculatedScale.graphMin;
    var scalingFactor = CapValue(adjustedValue / outerValue, 1, 0);
    return (scaleHop * calculatedScale.steps) * scalingFactor
  }

  function animationLoop(config, drawScale, drawData, ctx) {
    var animFrameAmount = (config.animation) ? 1 / CapValue(config.animationSteps, Number.MAX_VALUE, 1) : 1,
      easingFunction = animationOptions[config.animationEasing],
      percentAnimComplete = (config.animation) ? 0 : 1;
    if (typeof drawScale !== "function") drawScale = function() {};
    requestAnimFrame(animLoop);

    function animateFrame() {
      var easeAdjustedAnimationPercent = (config.animation) ? CapValue(easingFunction(percentAnimComplete), null, 0) : 1;
      clear(ctx);
      if (config.scaleOverlay) {
        drawScale();
        drawData(easeAdjustedAnimationPercent)
      } else {
        drawData(easeAdjustedAnimationPercent);
        drawScale()
      }
    }

    function animLoop() {
      percentAnimComplete += animFrameAmount;
      animateFrame();
      if (percentAnimComplete <= 1) {
        requestAnimFrame(animLoop)
      } else {
        if (typeof config.onAnimationComplete == "function") config.onAnimationComplete()
      }
    }
  }
  var requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  })();

  function calculateScale(drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
    var graphMin, graphMax, graphRange, stepValue, numberOfSteps, valueRange, rangeOrderOfMagnitude, decimalNum;
    valueRange = maxValue - minValue;
    rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);
    graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
    graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
    graphRange = graphMax - graphMin;
    stepValue = Math.pow(10, rangeOrderOfMagnitude);
    numberOfSteps = Math.round(graphRange / stepValue);
    while (numberOfSteps < minSteps || numberOfSteps > maxSteps) {
      if (numberOfSteps < minSteps) {
        stepValue /= 2;
        numberOfSteps = Math.round(graphRange / stepValue)
      } else {
        stepValue *= 2;
        numberOfSteps = Math.round(graphRange / stepValue)
      }
    };
    var labels = [];
    populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);
    return {
      steps: numberOfSteps,
      stepValue: stepValue,
      graphMin: graphMin,
      labels: labels
    };

    function calculateOrderOfMagnitude(val) {
      return Math.floor(Math.log(val) / Math.LN10)
    }
  }

  function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
    if (labelTemplateString) {
      for (var i = 1; i < numberOfSteps + 1; i++) {
        labels.push(tmpl(labelTemplateString, {
          value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue))
        }))
      }
    }
  }

  function Max(array) {
    return Math.max.apply(Math, array)
  };

  function Min(array) {
    return Math.min.apply(Math, array)
  };

  function Default(userDeclared, valueIfFalse) {
    if (!userDeclared) {
      return valueIfFalse
    } else {
      return userDeclared
    }
  };

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  function CapValue(valueToCap, maxValue, minValue) {
    if (isNumber(maxValue)) {
      if (valueToCap > maxValue) {
        return maxValue
      }
    }
    if (isNumber(minValue)) {
      if (valueToCap < minValue) {
        return minValue
      }
    }
    return valueToCap
  }

  function getDecimalPlaces(num) {
    var numberOfDecimalPlaces;
    if (num % 1 != 0) {
      return num.toString().split(".")[1].length
    } else {
      return 0
    }
  }

  function mergeChartConfig(defaults, userDefined) {
    var returnObj = {};
    for (var attrname in defaults) {
      returnObj[attrname] = defaults[attrname]
    }
    for (var attrname in userDefined) {
      returnObj[attrname] = userDefined[attrname]
    }
    return returnObj
  }
  var cache = {};

  function tmpl(str, data) {
    var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
    return data ? fn(data) : fn
  }
}

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
  def: 'easeOutQuad',
  swing: function(x, t, b, c, d) {
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
  },
  easeInQuad: function(x, t, b, c, d) {
    return c * (t /= d) * t + b
  },
  easeOutQuad: function(x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b
  },
  easeInOutQuad: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b
  },
  easeInCubic: function(x, t, b, c, d) {
    return c * (t /= d) * t * t + b
  },
  easeOutCubic: function(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  },
  easeInOutCubic: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b
  },
  easeInQuart: function(x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b
  },
  easeOutQuart: function(x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },
  easeInOutQuart: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b
  },
  easeInQuint: function(x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b
  },
  easeOutQuint: function(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  easeInOutQuint: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
  },
  easeInSine: function(x, t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
  },
  easeOutSine: function(x, t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b
  },
  easeInOutSine: function(x, t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
  },
  easeInExpo: function(x, t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
  },
  easeOutExpo: function(x, t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
  },
  easeInOutExpo: function(x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
  },
  easeInCirc: function(x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
  },
  easeOutCirc: function(x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
  },
  easeInOutCirc: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
  },
  easeInElastic: function(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
  },
  easeOutElastic: function(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
  },
  easeInOutElastic: function(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b
  },
  easeInBack: function(x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b
  },
  easeOutBack: function(x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  },
  easeInOutBack: function(x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
  },
  easeInBounce: function(x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
  },
  easeOutBounce: function(x, t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b
    } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
    } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
    } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
    }
  },
  easeInOutBounce: function(x, t, b, c, d) {
    if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
    return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b
  }
});

/** Abstract base class for collection plugins v1.0.1.
 Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
 Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. */
(function() {
  var j = false;
  window.JQClass = function() {};
  JQClass.classes = {};
  JQClass.extend = function extender(f) {
    var g = this.prototype;
    j = true;
    var h = new this();
    j = false;
    for (var i in f) {
      h[i] = typeof f[i] == 'function' && typeof g[i] == 'function' ? (function(d, e) {
        return function() {
          var b = this._super;
          this._super = function(a) {
            return g[d].apply(this, a || [])
          };
          var c = e.apply(this, arguments);
          this._super = b;
          return c
        }
      })(i, f[i]) : f[i]
    }

    function JQClass() {
      if (!j && this._init) {
        this._init.apply(this, arguments)
      }
    }
    JQClass.prototype = h;
    JQClass.prototype.constructor = JQClass;
    JQClass.extend = extender;
    return JQClass
  }
})();
(function($) {
  JQClass.classes.JQPlugin = JQClass.extend({
    name: 'plugin',
    defaultOptions: {},
    regionalOptions: {},
    _getters: [],
    _getMarker: function() {
      return 'is-' + this.name
    },
    _init: function() {
      $.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {});
      var c = camelCase(this.name);
      $[c] = this;
      $.fn[c] = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        if ($[c]._isNotChained(a, b)) {
          return $[c][a].apply($[c], [this[0]].concat(b))
        }
        return this.each(function() {
          if (typeof a === 'string') {
            if (a[0] === '_' || !$[c][a]) {
              throw 'Unknown method: ' + a;
            }
            $[c][a].apply($[c], [this].concat(b))
          } else {
            $[c]._attach(this, a)
          }
        })
      }
    },
    setDefaults: function(a) {
      $.extend(this.defaultOptions, a || {})
    },
    _isNotChained: function(a, b) {
      if (a === 'option' && (b.length === 0 || (b.length === 1 && typeof b[0] === 'string'))) {
        return true
      }
      return $.inArray(a, this._getters) > -1
    },
    _attach: function(a, b) {
      a = $(a);
      if (a.hasClass(this._getMarker())) {
        return
      }
      a.addClass(this._getMarker());
      b = $.extend({}, this.defaultOptions, this._getMetadata(a), b || {});
      var c = $.extend({
        name: this.name,
        elem: a,
        options: b
      }, this._instSettings(a, b));
      a.data(this.name, c);
      this._postAttach(a, c);
      this.option(a, b)
    },
    _instSettings: function(a, b) {
      return {}
    },
    _postAttach: function(a, b) {},
    _getMetadata: function(d) {
      try {
        var f = d.data(this.name.toLowerCase()) || '';
        f = f.replace(/'/g, '"');
        f = f.replace(/([a-zA-Z0-9]+):/g, function(a, b, i) {
          var c = f.substring(0, i).match(/"/g);
          return (!c || c.length % 2 === 0 ? '"' + b + '":' : b + ':')
        });
        f = $.parseJSON('{' + f + '}');
        for (var g in f) {
          var h = f[g];
          if (typeof h === 'string' && h.match(/^new Date\((.*)\)$/)) {
            f[g] = eval(h)
          }
        }
        return f
      } catch (e) {
        return {}
      }
    },
    _getInst: function(a) {
      return $(a).data(this.name) || {}
    },
    option: function(a, b, c) {
      a = $(a);
      var d = a.data(this.name);
      if (!b || (typeof b === 'string' && c == null)) {
        var e = (d || {}).options;
        return (e && b ? e[b] : e)
      }
      if (!a.hasClass(this._getMarker())) {
        return
      }
      var e = b || {};
      if (typeof b === 'string') {
        e = {};
        e[b] = c
      }
      this._optionsChanged(a, d, e);
      $.extend(d.options, e)
    },
    _optionsChanged: function(a, b, c) {},
    destroy: function(a) {
      a = $(a);
      if (!a.hasClass(this._getMarker())) {
        return
      }
      this._preDestroy(a, this._getInst(a));
      a.removeData(this.name).removeClass(this._getMarker())
    },
    _preDestroy: function(a, b) {}
  });

  function camelCase(c) {
    return c.replace(/-([a-z])/g, function(a, b) {
      return b.toUpperCase()
    })
  }
  $.JQPlugin = {
    createPlugin: function(a, b) {
      if (typeof a === 'object') {
        b = a;
        a = 'JQPlugin'
      }
      a = camelCase(a);
      var c = camelCase(b.name);
      JQClass.classes[c] = JQClass.classes[a].extend(b);
      new JQClass.classes[c]()
    }
  }
})(jQuery);

/* http://keith-wood.name/countdown.html
 * Countdown for jQuery v2.0.2.
 * Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
 * Available under the MIT (http://keith-wood.name/licence.html) license.
 * Please attribute the author if you use it.
 *
 * ADDED: Separator code between digit and label
 * EDITED: On line 350 "if (!inst) {" => "if (!inst || !inst.options) {" because of the ajax
 */
(function($) {
  var pluginName = 'countdown';
  var Y = 0;
  var O = 1;
  var W = 2;
  var D = 3;
  var H = 4;
  var M = 5;
  var S = 6;
  $.JQPlugin.createPlugin({
    name: pluginName,
    defaultOptions: {
      until: null,
      since: null,
      timezone: null,
      serverSync: null,
      format: 'dHMS',
      layout: '',
      compact: false,
      padZeroes: false,
      significant: 0,
      description: '',
      expiryUrl: '',
      expiryText: '',
      alwaysExpire: false,
      onExpiry: null,
      onTick: null,
      tickInterval: 1
    },
    regionalOptions: {
      '': {
        labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
        labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
        compactLabels: ['y', 'm', 'w', 'd'],
        whichLabels: null,
        digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        timeSeparator: ':',
        isRTL: false
      }
    },
    _getters: ['getTimes'],
    _rtlClass: pluginName + '-rtl',
    _sectionClass: pluginName + '-section',
    _amountClass: pluginName + '-amount',
    _periodClass: pluginName + '-period',
    _rowClass: pluginName + '-row',
    _holdingClass: pluginName + '-holding',
    _showClass: pluginName + '-show',
    _descrClass: pluginName + '-descr',
    _timerElems: [],
    _init: function() {
      var self = this;
      this._super();
      this._serverSyncs = [];
      var now = (typeof Date.now == 'function' ? Date.now : function() {
        return new Date().getTime()
      });
      var perfAvail = (window.performance && typeof window.performance.now == 'function');

      function timerCallBack(timestamp) {
        var drawStart = (timestamp < 1e12 ? (perfAvail ? (performance.now() + performance.timing.navigationStart) : now()) : timestamp || now());
        if (drawStart - animationStartTime >= 1000) {
          self._updateElems();
          animationStartTime = drawStart
        }
        requestAnimationFrame(timerCallBack)
      }
      var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
      var animationStartTime = 0;
      if (!requestAnimationFrame || $.noRequestAnimationFrame) {
        $.noRequestAnimationFrame = null;
        setInterval(function() {
          self._updateElems()
        }, 980)
      } else {
        animationStartTime = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || now();
        requestAnimationFrame(timerCallBack)
      }
    },
    UTCDate: function(tz, year, month, day, hours, mins, secs, ms) {
      if (typeof year == 'object' && year.constructor == Date) {
        ms = year.getMilliseconds();
        secs = year.getSeconds();
        mins = year.getMinutes();
        hours = year.getHours();
        day = year.getDate();
        month = year.getMonth();
        year = year.getFullYear()
      }
      var d = new Date();
      d.setUTCFullYear(year);
      d.setUTCDate(1);
      d.setUTCMonth(month || 0);
      d.setUTCDate(day || 1);
      d.setUTCHours(hours || 0);
      d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? tz * 60 : tz));
      d.setUTCSeconds(secs || 0);
      d.setUTCMilliseconds(ms || 0);
      return d
    },
    periodsToSeconds: function(periods) {
      return periods[0] * 31557600 + periods[1] * 2629800 + periods[2] * 604800 + periods[3] * 86400 + periods[4] * 3600 + periods[5] * 60 + periods[6]
    },
    resync: function() {
      var self = this;
      $('.' + this._getMarker()).each(function() {
        var inst = $.data(this, self.name);
        if (inst.options.serverSync) {
          var serverSync = null;
          for (var i = 0; i < self._serverSyncs.length; i++) {
            if (self._serverSyncs[i][0] == inst.options.serverSync) {
              serverSync = self._serverSyncs[i];
              break
            }
          }
          if (serverSync[2] == null) {
            var serverResult = ($.isFunction(inst.options.serverSync) ? inst.options.serverSync.apply(this, []) : null);
            serverSync[2] = (serverResult ? new Date().getTime() - serverResult.getTime() : 0) - serverSync[1]
          }
          if (inst._since) {
            inst._since.setMilliseconds(inst._since.getMilliseconds() + serverSync[2])
          }
          inst._until.setMilliseconds(inst._until.getMilliseconds() + serverSync[2])
        }
      });
      for (var i = 0; i < self._serverSyncs.length; i++) {
        if (self._serverSyncs[i][2] != null) {
          self._serverSyncs[i][1] += self._serverSyncs[i][2];
          delete self._serverSyncs[i][2]
        }
      }
    },
    _instSettings: function(elem, options) {
      return {
        _periods: [0, 0, 0, 0, 0, 0, 0]
      }
    },
    _addElem: function(elem) {
      if (!this._hasElem(elem)) {
        this._timerElems.push(elem)
      }
    },
    _hasElem: function(elem) {
      return ($.inArray(elem, this._timerElems) > -1)
    },
    _removeElem: function(elem) {
      this._timerElems = $.map(this._timerElems, function(value) {
        return (value == elem ? null : value)
      })
    },
    _updateElems: function() {
      for (var i = this._timerElems.length - 1; i >= 0; i--) {
        this._updateCountdown(this._timerElems[i])
      }
    },
    _optionsChanged: function(elem, inst, options) {
      if (options.layout) {
        options.layout = options.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      }
      this._resetExtraLabels(inst.options, options);
      var timezoneChanged = (inst.options.timezone != options.timezone);
      $.extend(inst.options, options);
      this._adjustSettings(elem, inst, options.until != null || options.since != null || timezoneChanged);
      var now = new Date();
      if ((inst._since && inst._since < now) || (inst._until && inst._until > now)) {
        this._addElem(elem[0])
      }
      this._updateCountdown(elem, inst)
    },
    _updateCountdown: function(elem, inst) {
      elem = elem.jquery ? elem : $(elem);
      inst = inst || this._getInst(elem);
      if (!inst || !inst.options) {
        return
      }
      elem.html(this._generateHTML(inst)).toggleClass(this._rtlClass, inst.options.isRTL);
      if ($.isFunction(inst.options.onTick)) {
        var periods = inst._hold != 'lap' ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
        if (inst.options.tickInterval == 1 || this.periodsToSeconds(periods) % inst.options.tickInterval == 0) {
          inst.options.onTick.apply(elem[0], [periods])
        }
      }
      var expired = inst._hold != 'pause' && (inst._since ? inst._now.getTime() < inst._since.getTime() : inst._now.getTime() >= inst._until.getTime());
      if (expired && !inst._expiring) {
        inst._expiring = true;
        if (this._hasElem(elem[0]) || inst.options.alwaysExpire) {
          this._removeElem(elem[0]);
          if ($.isFunction(inst.options.onExpiry)) {
            inst.options.onExpiry.apply(elem[0], [])
          }
          if (inst.options.expiryText) {
            var layout = inst.options.layout;
            inst.options.layout = inst.options.expiryText;
            this._updateCountdown(elem[0], inst);
            inst.options.layout = layout
          }
          if (inst.options.expiryUrl) {
            window.location = inst.options.expiryUrl
          }
        }
        inst._expiring = false
      } else if (inst._hold == 'pause') {
        this._removeElem(elem[0])
      }
    },
    _resetExtraLabels: function(base, options) {
      for (var n in options) {
        if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
          base[n] = options[n]
        }
      }
      for (var n in base) {
        if (n.match(/[Ll]abels[02-9]|compactLabels1/) && typeof options[n] === 'undefined') {
          base[n] = null
        }
      }
    },
    _adjustSettings: function(elem, inst, recalc) {
      var serverEntry = null;
      for (var i = 0; i < this._serverSyncs.length; i++) {
        if (this._serverSyncs[i][0] == inst.options.serverSync) {
          serverEntry = this._serverSyncs[i][1];
          break
        }
      }
      if (serverEntry != null) {
        var serverOffset = (inst.options.serverSync ? serverEntry : 0);
        var now = new Date()
      } else {
        var serverResult = ($.isFunction(inst.options.serverSync) ? inst.options.serverSync.apply(elem[0], []) : null);
        var now = new Date();
        var serverOffset = (serverResult ? now.getTime() - serverResult.getTime() : 0);
        this._serverSyncs.push([inst.options.serverSync, serverOffset])
      }
      var timezone = inst.options.timezone;
      timezone = (timezone == null ? -now.getTimezoneOffset() : timezone);
      if (recalc || (!recalc && inst._until == null && inst._since == null)) {
        inst._since = inst.options.since;
        if (inst._since != null) {
          inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null));
          if (inst._since && serverOffset) {
            inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset)
          }
        }
        inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now));
        if (serverOffset) {
          inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset)
        }
      }
      inst._show = this._determineShow(inst)
    },
    _preDestroy: function(elem, inst) {
      this._removeElem(elem[0]);
      elem.empty()
    },
    pause: function(elem) {
      this._hold(elem, 'pause')
    },
    lap: function(elem) {
      this._hold(elem, 'lap')
    },
    resume: function(elem) {
      this._hold(elem, null)
    },
    toggle: function(elem) {
      var inst = $.data(elem, this.name) || {};
      this[!inst._hold ? 'pause' : 'resume'](elem)
    },
    toggleLap: function(elem) {
      var inst = $.data(elem, this.name) || {};
      this[!inst._hold ? 'lap' : 'resume'](elem)
    },
    _hold: function(elem, hold) {
      var inst = $.data(elem, this.name);
      if (inst) {
        if (inst._hold == 'pause' && !hold) {
          inst._periods = inst._savePeriods;
          var sign = (inst._since ? '-' : '+');
          inst[inst._since ? '_since' : '_until'] = this._determineTime(sign + inst._periods[0] + 'y' + sign + inst._periods[1] + 'o' + sign + inst._periods[2] + 'w' + sign + inst._periods[3] + 'd' + sign + inst._periods[4] + 'h' + sign + inst._periods[5] + 'm' + sign + inst._periods[6] + 's');
          this._addElem(elem)
        }
        inst._hold = hold;
        inst._savePeriods = (hold == 'pause' ? inst._periods : null);
        $.data(elem, this.name, inst);
        this._updateCountdown(elem, inst)
      }
    },
    getTimes: function(elem) {
      var inst = $.data(elem, this.name);
      return (!inst ? null : (inst._hold == 'pause' ? inst._savePeriods : (!inst._hold ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()))))
    },
    _determineTime: function(setting, defaultTime) {
      var self = this;
      var offsetNumeric = function(offset) {
        var time = new Date();
        time.setTime(time.getTime() + offset * 1000);
        return time
      };
      var offsetString = function(offset) {
        offset = offset.toLowerCase();
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth();
        var day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        var pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
        var matches = pattern.exec(offset);
        while (matches) {
          switch (matches[2] || 's') {
            case 's':
              second += parseInt(matches[1], 10);
              break;
            case 'm':
              minute += parseInt(matches[1], 10);
              break;
            case 'h':
              hour += parseInt(matches[1], 10);
              break;
            case 'd':
              day += parseInt(matches[1], 10);
              break;
            case 'w':
              day += parseInt(matches[1], 10) * 7;
              break;
            case 'o':
              month += parseInt(matches[1], 10);
              day = Math.min(day, self._getDaysInMonth(year, month));
              break;
            case 'y':
              year += parseInt(matches[1], 10);
              day = Math.min(day, self._getDaysInMonth(year, month));
              break
          }
          matches = pattern.exec(offset)
        }
        return new Date(year, month, day, hour, minute, second, 0)
      };
      var time = (setting == null ? defaultTime : (typeof setting == 'string' ? offsetString(setting) : (typeof setting == 'number' ? offsetNumeric(setting) : setting)));
      if (time) time.setMilliseconds(0);
      return time
    },
    _getDaysInMonth: function(year, month) {
      return 32 - new Date(year, month, 32).getDate()
    },
    _normalLabels: function(num) {
      return num
    },
    _generateHTML: function(inst) {
      var self = this;
      inst._periods = (inst._hold ? inst._periods : this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()));
      var shownNonZero = false;
      var showCount = 0;
      var sigCount = inst.options.significant;
      var show = $.extend({}, inst._show);
      for (var period = Y; period <= S; period++) {
        shownNonZero |= (inst._show[period] == '?' && inst._periods[period] > 0);
        show[period] = (inst._show[period] == '?' && !shownNonZero ? null : inst._show[period]);
        showCount += (show[period] ? 1 : 0);
        sigCount -= (inst._periods[period] > 0 ? 1 : 0)
      }
      var showSignificant = [false, false, false, false, false, false, false];
      for (var period = S; period >= Y; period--) {
        if (inst._show[period]) {
          if (inst._periods[period]) {
            showSignificant[period] = true
          } else {
            showSignificant[period] = sigCount > 0;
            sigCount--
          }
        }
      }
      var labels = (inst.options.compact ? inst.options.compactLabels : inst.options.labels);
      var whichLabels = inst.options.whichLabels || this._normalLabels;
      var showCompact = function(period) {
        var labelsNum = inst.options['compactLabels' + whichLabels(inst._periods[period])];
        return (show[period] ? self._translateDigits(inst, inst._periods[period]) + (labelsNum ? labelsNum[period] : labels[period]) + ' ' : '')
      };
      var minDigits = (inst.options.padZeroes ? 2 : 1);
      var showFull = function(period) {
        var labelsNum = inst.options['labels' + whichLabels(inst._periods[period])];
        return ((!inst.options.significant && show[period]) || (inst.options.significant && showSignificant[period]) ? '<span class="' + self._sectionClass + '">' + '<span class="' + self._amountClass + '">' + self._minDigits(inst, inst._periods[period], minDigits) + '</span>' + '<span class="countdown_separator"></span>' + '<span class="' + self._periodClass + '">' + (labelsNum ? labelsNum[period] : labels[period]) + '</span></span>' : '')
      };
      return (inst.options.layout ? this._buildLayout(inst, show, inst.options.layout, inst.options.compact, inst.options.significant, showSignificant) : ((inst.options.compact ? '<span class="' + this._rowClass + ' ' + this._amountClass + (inst._hold ? ' ' + this._holdingClass : '') + '">' + showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + (show[H] ? this._minDigits(inst, inst._periods[H], 2) : '') + (show[M] ? (show[H] ? inst.options.timeSeparator : '') + this._minDigits(inst, inst._periods[M], 2) : '') + (show[S] ? (show[H] || show[M] ? inst.options.timeSeparator : '') + this._minDigits(inst, inst._periods[S], 2) : '') : '<span class="' + this._rowClass + ' ' + this._showClass + (inst.options.significant || showCount) + (inst._hold ? ' ' + this._holdingClass : '') + '">' + showFull(Y) + showFull(O) + showFull(W) + showFull(D) + showFull(H) + showFull(M) + showFull(S)) + '</span>' + (inst.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' + inst.options.description + '</span>' : '')))
    },
    _buildLayout: function(inst, show, layout, compact, significant, showSignificant) {
      var labels = inst.options[compact ? 'compactLabels' : 'labels'];
      var whichLabels = inst.options.whichLabels || this._normalLabels;
      var labelFor = function(index) {
        return (inst.options[(compact ? 'compactLabels' : 'labels') + whichLabels(inst._periods[index])] || labels)[index]
      };
      var digit = function(value, position) {
        return inst.options.digits[Math.floor(value / position) % 10]
      };
      var subs = {
        desc: inst.options.description,
        sep: inst.options.timeSeparator,
        yl: labelFor(Y),
        yn: this._minDigits(inst, inst._periods[Y], 1),
        ynn: this._minDigits(inst, inst._periods[Y], 2),
        ynnn: this._minDigits(inst, inst._periods[Y], 3),
        y1: digit(inst._periods[Y], 1),
        y10: digit(inst._periods[Y], 10),
        y100: digit(inst._periods[Y], 100),
        y1000: digit(inst._periods[Y], 1000),
        ol: labelFor(O),
        on: this._minDigits(inst, inst._periods[O], 1),
        onn: this._minDigits(inst, inst._periods[O], 2),
        onnn: this._minDigits(inst, inst._periods[O], 3),
        o1: digit(inst._periods[O], 1),
        o10: digit(inst._periods[O], 10),
        o100: digit(inst._periods[O], 100),
        o1000: digit(inst._periods[O], 1000),
        wl: labelFor(W),
        wn: this._minDigits(inst, inst._periods[W], 1),
        wnn: this._minDigits(inst, inst._periods[W], 2),
        wnnn: this._minDigits(inst, inst._periods[W], 3),
        w1: digit(inst._periods[W], 1),
        w10: digit(inst._periods[W], 10),
        w100: digit(inst._periods[W], 100),
        w1000: digit(inst._periods[W], 1000),
        dl: labelFor(D),
        dn: this._minDigits(inst, inst._periods[D], 1),
        dnn: this._minDigits(inst, inst._periods[D], 2),
        dnnn: this._minDigits(inst, inst._periods[D], 3),
        d1: digit(inst._periods[D], 1),
        d10: digit(inst._periods[D], 10),
        d100: digit(inst._periods[D], 100),
        d1000: digit(inst._periods[D], 1000),
        hl: labelFor(H),
        hn: this._minDigits(inst, inst._periods[H], 1),
        hnn: this._minDigits(inst, inst._periods[H], 2),
        hnnn: this._minDigits(inst, inst._periods[H], 3),
        h1: digit(inst._periods[H], 1),
        h10: digit(inst._periods[H], 10),
        h100: digit(inst._periods[H], 100),
        h1000: digit(inst._periods[H], 1000),
        ml: labelFor(M),
        mn: this._minDigits(inst, inst._periods[M], 1),
        mnn: this._minDigits(inst, inst._periods[M], 2),
        mnnn: this._minDigits(inst, inst._periods[M], 3),
        m1: digit(inst._periods[M], 1),
        m10: digit(inst._periods[M], 10),
        m100: digit(inst._periods[M], 100),
        m1000: digit(inst._periods[M], 1000),
        sl: labelFor(S),
        sn: this._minDigits(inst, inst._periods[S], 1),
        snn: this._minDigits(inst, inst._periods[S], 2),
        snnn: this._minDigits(inst, inst._periods[S], 3),
        s1: digit(inst._periods[S], 1),
        s10: digit(inst._periods[S], 10),
        s100: digit(inst._periods[S], 100),
        s1000: digit(inst._periods[S], 1000)
      };
      var html = layout;
      for (var i = Y; i <= S; i++) {
        var period = 'yowdhms'.charAt(i);
        var re = new RegExp('\\{' + period + '<\\}([\\s\\S]*)\\{' + period + '>\\}', 'g');
        html = html.replace(re, ((!significant && show[i]) || (significant && showSignificant[i]) ? '$1' : ''))
      }
      $.each(subs, function(n, v) {
        var re = new RegExp('\\{' + n + '\\}', 'g');
        html = html.replace(re, v)
      });
      return html
    },
    _minDigits: function(inst, value, len) {
      value = '' + value;
      if (value.length >= len) {
        return this._translateDigits(inst, value)
      }
      value = '0000000000' + value;
      return this._translateDigits(inst, value.substr(value.length - len))
    },
    _translateDigits: function(inst, value) {
      return ('' + value).replace(/[0-9]/g, function(digit) {
        return inst.options.digits[digit]
      })
    },
    _determineShow: function(inst) {
      var format = inst.options.format;
      var show = [];
      show[Y] = (format.match('y') ? '?' : (format.match('Y') ? '!' : null));
      show[O] = (format.match('o') ? '?' : (format.match('O') ? '!' : null));
      show[W] = (format.match('w') ? '?' : (format.match('W') ? '!' : null));
      show[D] = (format.match('d') ? '?' : (format.match('D') ? '!' : null));
      show[H] = (format.match('h') ? '?' : (format.match('H') ? '!' : null));
      show[M] = (format.match('m') ? '?' : (format.match('M') ? '!' : null));
      show[S] = (format.match('s') ? '?' : (format.match('S') ? '!' : null));
      return show
    },
    _calculatePeriods: function(inst, show, significant, now) {
      inst._now = now;
      inst._now.setMilliseconds(0);
      var until = new Date(inst._now.getTime());
      if (inst._since) {
        if (now.getTime() < inst._since.getTime()) {
          inst._now = now = until
        } else {
          now = inst._since
        }
      } else {
        until.setTime(inst._until.getTime());
        if (now.getTime() > inst._until.getTime()) {
          inst._now = now = until
        }
      }
      var periods = [0, 0, 0, 0, 0, 0, 0];
      if (show[Y] || show[O]) {
        var lastNow = this._getDaysInMonth(now.getFullYear(), now.getMonth());
        var lastUntil = this._getDaysInMonth(until.getFullYear(), until.getMonth());
        var sameDay = (until.getDate() == now.getDate() || (until.getDate() >= Math.min(lastNow, lastUntil) && now.getDate() >= Math.min(lastNow, lastUntil)));
        var getSecs = function(date) {
          return (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds()
        };
        var months = Math.max(0, (until.getFullYear() - now.getFullYear()) * 12 + until.getMonth() - now.getMonth() + ((until.getDate() < now.getDate() && !sameDay) || (sameDay && getSecs(until) < getSecs(now)) ? -1 : 0));
        periods[Y] = (show[Y] ? Math.floor(months / 12) : 0);
        periods[O] = (show[O] ? months - periods[Y] * 12 : 0);
        now = new Date(now.getTime());
        var wasLastDay = (now.getDate() == lastNow);
        var lastDay = this._getDaysInMonth(now.getFullYear() + periods[Y], now.getMonth() + periods[O]);
        if (now.getDate() > lastDay) {
          now.setDate(lastDay)
        }
        now.setFullYear(now.getFullYear() + periods[Y]);
        now.setMonth(now.getMonth() + periods[O]);
        if (wasLastDay) {
          now.setDate(lastDay)
        }
      }
      var diff = Math.floor((until.getTime() - now.getTime()) / 1000);
      var extractPeriod = function(period, numSecs) {
        periods[period] = (show[period] ? Math.floor(diff / numSecs) : 0);
        diff -= periods[period] * numSecs
      };
      extractPeriod(W, 604800);
      extractPeriod(D, 86400);
      extractPeriod(H, 3600);
      extractPeriod(M, 60);
      extractPeriod(S, 1);
      if (diff > 0 && !inst._since) {
        var multiplier = [1, 12, 4.3482, 7, 24, 60, 60];
        var lastShown = S;
        var max = 1;
        for (var period = S; period >= Y; period--) {
          if (show[period]) {
            if (periods[lastShown] >= max) {
              periods[lastShown] = 0;
              diff = 1
            }
            if (diff > 0) {
              periods[period]++;
              diff = 0;
              lastShown = period;
              max = 1
            }
          }
          max *= multiplier[period]
        }
      }
      if (significant) {
        for (var period = Y; period <= S; period++) {
          if (significant && periods[period]) {
            significant--
          } else if (!significant) {
            periods[period] = 0
          }
        }
      }
      return periods
    }
  })
})(jQuery);

/**
 * multiscroll.js 0.1.5 Beta
 * https://github.com/alvarotrigo/multiscroll.js
 * MIT licensed
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 *
 * ADDED: added destroy plugin's events function
 */
(function($) {
  $.fn.multiscroll = function(options) {
    options = $.extend({
      'verticalCentered': true,
      'scrollingSpeed': 700,
      'easing': 'easeInQuart',
      'menu': false,
      'sectionsColor': [],
      'anchors': [],
      'navigation': false,
      'navigationPosition': 'right',
      'navigationColor': '#000',
      'navigationTooltips': [],
      'loopBottom': false,
      'loopTop': false,
      'css3': false,
      'paddingTop': 0,
      'paddingBottom': 0,
      'fixedElements': null,
      'normalScrollElements': null,
      'keyboardScrolling': true,
      'touchSensitivity': 5,
      'sectionSelector': '.ms-section',
      'leftSelector': '.ms-left',
      'rightSelector': '.ms-right',
      'afterLoad': null,
      'onLeave': null,
      'afterRender': null,
      'afterResize': null
    }, options);
    var scrollDelay = 600;
    var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
    if (options.rightSelector !== '.ms-right') {
      $(options.rightSelector).addClass('ms-right')
    }
    if (options.leftSelector !== '.ms-left') {
      $(options.leftSelector).addClass('ms-left')
    }
    var numberSections = $('.ms-left').find('.ms-section').length;
    var isMoving = false;
    var nav;
    var windowHeight = $(window).height();
    addMouseWheelHandler();
    addTouchHandler();
    if (options.css3) {
      options.css3 = support3d()
    }
    $('html, body').css({
      'overflow': 'hidden',
      'height': '100%'
    });
    if (options.sectionSelector !== '.ms-section') {
      $(options.sectionSelector).each(function() {
        $(this).addClass('ms-section')
      })
    }
    if (options.navigation) {
      $('body').append('<div id="multiscroll-nav"><ul></ul></div>');
      nav = $('#multiscroll-nav');
      nav.css('color', options.navigationColor);
      nav.addClass(options.navigationPosition)
    }
    $('.ms-right, .ms-left').css({
      'width': '50%',
      'position': 'absolute',
      'height': '100%',
      '-ms-touch-action': 'none'
    });
    $('.ms-right').css({
      'right': '1px',
      'top': '0',
      '-ms-touch-action': 'none',
      'touch-action': 'none'
    });
    $('.ms-left').css({
      'left': '0',
      'top': '0',
      '-ms-touch-action': 'none',
      'touch-action': 'none'
    });
    $('.ms-left .ms-section, .ms-right .ms-section').each(function() {
      var sectionIndex = $(this).index();
      if (options.paddingTop || options.paddingBottom) {
        $(this).css('padding', options.paddingTop + ' 0 ' + options.paddingBottom + ' 0')
      }
      if (typeof options.sectionsColor[sectionIndex] !== 'undefined') {
        $(this).css('background-color', options.sectionsColor[sectionIndex])
      }
      if (typeof options.anchors[sectionIndex] !== 'undefined') {
        $(this).attr('data-anchor', options.anchors[sectionIndex])
      }
      if (options.verticalCentered) {
        addTableClass($(this))
      }
      if ($(this).closest('.ms-left').length && options.navigation) {
        var link = '';
        if (options.anchors.length) {
          link = options.anchors[sectionIndex]
        }
        var tooltip = options.navigationTooltips[sectionIndex];
        if (typeof tooltip === 'undefined') {
          tooltip = ''
        }
        if (options.navigation) {
          nav.find('ul').append('<li data-tooltip="' + tooltip + '"><a href="#' + link + '"><span></span></a></li>')
        }
      }
    });
    $('.ms-right').html($('.ms-right').find('.ms-section').get().reverse());
    $('.ms-left .ms-section, .ms-right .ms-section').each(function() {
      var sectionIndex = $(this).index();
      $(this).css({
        'height': '100%'
      });
      if (!sectionIndex && options.navigation) {
        nav.find('li').eq(sectionIndex).find('a').addClass('active')
      }
    }).promise().done(function() {
      if (!$('.ms-left .ms-section.active').length) {
        $('.ms-right').find('.ms-section').last().addClass('active');
        $('.ms-left').find('.ms-section').first().addClass('active')
      }
      $.isFunction(options.afterRender) && options.afterRender.call(this);
      silentScroll();
      $(window).on('load', function() {
        scrollToAnchor()
      })
    });
    $(window).on('hashchange', hashChangeHandler);

    function hashChangeHandler() {
      var value = window.location.hash.replace('#', '');
      var sectionAnchor = value;
      if (sectionAnchor.length) {
        var section = $('.ms-left').find('[data-anchor="' + sectionAnchor + '"]');
        var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined');
        if (isFirstScrollMove || sectionAnchor !== lastScrolledDestiny) {
          scrollPage(section)
        }
      }
    };
    $(document).keydown(function(e) {
      if (e.which == 40 || e.which == 38) {
        e.preventDefault()
      }
      if (options.keyboardScrolling && !isMoving) {
        switch (e.which) {
          case 38:
          case 33:
            $.fn.multiscroll.moveSectionUp();
            break;
          case 40:
          case 34:
            $.fn.multiscroll.moveSectionDown();
            break;
          case 36:
            $.fn.multiscroll.moveTo(1);
            break;
          case 35:
            $.fn.multiscroll.moveTo($('.ms-left .ms-section').length);
            break;
          default:
            return
        }
      }
    });
    $(document).mousedown(function(e) {
      if (e.button == 1) {
        e.preventDefault();
        return false
      }
    });
    $(document).on('click', '#multiscroll-nav a', function(e) {
      e.preventDefault();
      var index = $(this).parent().index();
      scrollPage($('.ms-left .ms-section').eq(index))
    });
    $(document).on({
      mouseenter: function() {
        var tooltip = $(this).data('tooltip');
        $('<div class="multiscroll-tooltip ' + options.navigationPosition + '">' + tooltip + '</div>').hide().appendTo($(this)).fadeIn(200)
      },
      mouseleave: function() {
        $(this).find('.multiscroll-tooltip').fadeOut(200, function() {
          $(this).remove()
        })
      }
    }, '#multiscroll-nav li');
    if (options.normalScrollElements) {
      $(document).on('mouseenter', options.normalScrollElements, function() {
        $.fn.multiscroll.setMouseWheelScrolling(false)
      });
      $(document).on('mouseleave', options.normalScrollElements, function() {
        $.fn.multiscroll.setMouseWheelScrolling(true)
      })
    }
    $(window).on('resize', doneResizing);

    function doneResizing() {
      windowHeight = $(window).height();
      $('.ms-tableCell').each(function() {
        $(this).css({
          height: getTableHeight($(this).parent())
        })
      });
      silentScroll();
      $.isFunction(options.afterResize) && options.afterResize.call(this)
    }

    function silentScroll() {
      if (options.css3) {
        transformContainer($('.ms-left'), 'translate3d(0px, -' + $('.ms-left').find('.ms-section.active').position().top + 'px, 0px)', false);
        transformContainer($('.ms-right'), 'translate3d(0px, -' + $('.ms-right').find('.ms-section.active').position().top + 'px, 0px)', false)
      } else {
        $('.ms-left').css('top', -$('.ms-left').find('.ms-section.active').position().top);
        $('.ms-right').css('top', -$('.ms-right').find('.ms-section.active').position().top)
      }
    }
    $.fn.multiscroll.moveSectionUp = function() {
      var prev = $('.ms-left .ms-section.active').prev('.ms-section');
      if (!prev.length && options.loopTop) {
        prev = $('.ms-left .ms-section').last()
      }
      if (prev.length) {
        scrollPage(prev)
      }
    };
    $.fn.multiscroll.moveSectionDown = function() {
      var next = $('.ms-left .ms-section.active').next('.ms-section');
      if (!next.length && options.loopBottom) {
        next = $('.ms-left .ms-section').first()
      }
      if (next.length) {
        scrollPage(next)
      }
    };
    $.fn.multiscroll.moveTo = function(section) {
      var destiny = '';
      if (isNaN(section)) {
        destiny = $('.ms-left [data-anchor="' + section + '"]')
      } else {
        destiny = $('.ms-left .ms-section').eq((section - 1))
      }
      scrollPage(destiny)
    };

    function scrollPage(leftDestination) {
      var leftDestinationIndex = leftDestination.index();
      var rightDestination = $('.ms-right').find('.ms-section').eq(numberSections - 1 - leftDestinationIndex);
      var rightDestinationIndex = numberSections - 1 - leftDestinationIndex;
      var anchorLink = leftDestination.data('anchor');
      var activeSection = $('.ms-left .ms-section.active');
      var leavingSection = activeSection.index() + 1;
      var yMovement = getYmovement(leftDestination);
      isMoving = true;
      setURLHash(anchorLink);
      var topPos = {
        'left': leftDestination.position().top,
        'right': rightDestination.position().top
      };
      rightDestination.addClass('active').siblings().removeClass('active');
      leftDestination.addClass('active').siblings().removeClass('active');
      if (options.css3) {
        $.isFunction(options.onLeave) && options.onLeave.call(this, leavingSection, (leftDestinationIndex + 1), yMovement);
        var translate3dLeft = 'translate3d(0px, -' + topPos['left'] + 'px, 0px)';
        var translate3dRight = 'translate3d(0px, -' + topPos['right'] + 'px, 0px)';
        transformContainer($('.ms-left'), translate3dLeft, true);
        transformContainer($('.ms-right'), translate3dRight, true);
        setTimeout(function() {
          $.isFunction(options.afterLoad) && options.afterLoad.call(this, anchorLink, (leftDestinationIndex + 1));
          setTimeout(function() {
            isMoving = false
          }, scrollDelay)
        }, options.scrollingSpeed)
      } else {
        $.isFunction(options.onLeave) && options.onLeave.call(this, leavingSection, (leftDestinationIndex + 1), yMovement);
        $('.ms-left').animate({
          'top': -topPos['left']
        }, options.scrollingSpeed, options.easing, function() {
          $.isFunction(options.afterLoad) && options.afterLoad.call(this, anchorLink, (leftDestinationIndex + 1));
          setTimeout(function() {
            isMoving = false
          }, scrollDelay)
        });
        $('.ms-right').animate({
          'top': -topPos['right']
        }, options.scrollingSpeed, options.easing)
      }
      lastScrolledDestiny = anchorLink;
      activateMenuElement(anchorLink);
      activateNavDots(anchorLink, leftDestinationIndex)
    }

    function removeMouseWheelHandler() {
      if (document.addEventListener) {
        document.removeEventListener('mousewheel', MouseWheelHandler, false);
        document.removeEventListener('wheel', MouseWheelHandler, false)
      } else {
        document.detachEvent("onmousewheel", MouseWheelHandler)
      }
    }

    function addMouseWheelHandler() {
      if (document.addEventListener) {
        document.addEventListener("mousewheel", MouseWheelHandler, false);
        document.addEventListener("wheel", MouseWheelHandler, false)
      } else {
        document.attachEvent("onmousewheel", MouseWheelHandler)
      }
    }

    function MouseWheelHandler(e) {
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.deltaY || -e.detail)));
      if (!isMoving) {
        if (delta < 0) {
          $.fn.multiscroll.moveSectionDown()
        } else {
          $.fn.multiscroll.moveSectionUp()
        }
      }
      return false
    }

    function transformContainer(container, translate3d, animated) {
      container.toggleClass('ms-easing', animated);
      container.css(getTransforms(translate3d))
    }

    function getTransforms(translate3d) {
      return {
        '-webkit-transform': translate3d,
        '-moz-transform': translate3d,
        '-ms-transform': translate3d,
        'transform': translate3d
      }
    }

    function activateNavDots(name, sectionIndex) {
      if (options.navigation) {
        $('#multiscroll-nav').find('.active').removeClass('active');
        if (name) {
          $('#multiscroll-nav').find('a[href="#' + name + '"]').addClass('active')
        } else {
          $('#multiscroll-nav').find('li').eq(sectionIndex).find('a').addClass('active')
        }
      }
    }

    function activateMenuElement(name) {
      if (options.menu) {
        $(options.menu).find('.active').removeClass('active');
        $(options.menu).find('[data-menuanchor="' + name + '"]').addClass('active')
      }
    }

    function getYmovement(destiny) {
      var fromIndex = $('.ms-left .ms-section.active').index();
      var toIndex = destiny.index();
      if (fromIndex > toIndex) {
        return 'up'
      }
      return 'down'
    }

    function setURLHash(anchorLink) {
      if (options.anchors.length) {
        location.hash = anchorLink
      }
    }

    function support3d() {
      var el = document.createElement('p'),
        has3d, transforms = {
          'webkitTransform': '-webkit-transform',
          'OTransform': '-o-transform',
          'msTransform': '-ms-transform',
          'MozTransform': '-moz-transform',
          'transform': 'transform'
        };
      document.body.insertBefore(el, null);
      for (var t in transforms) {
        if (el.style[t] !== undefined) {
          el.style[t] = "translate3d(1px,1px,1px)";
          has3d = window.getComputedStyle(el).getPropertyValue(transforms[t])
        }
      }
      document.body.removeChild(el);
      return (has3d !== undefined && has3d.length > 0 && has3d !== "none")
    }

    function addTableClass(element) {
      element.addClass('ms-table').wrapInner('<div class="ms-tableCell" style="height: ' + getTableHeight(element) + 'px" />')
    }

    function getTableHeight(section) {
      var sectionHeight = windowHeight;
      if (options.paddingTop || options.paddingBottom) {
        var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
        sectionHeight = (windowHeight - paddings)
      }
      return sectionHeight
    }

    function scrollToAnchor() {
      var sectionAnchor = window.location.hash.replace('#', '');
      var section = $('.ms-left .ms-section[data-anchor="' + sectionAnchor + '"]');
      if (sectionAnchor.length) {
        scrollPage(section)
      }
    }
    $.fn.multiscroll.setKeyboardScrolling = function(value) {
      options.keyboardScrolling = value
    };
    $.fn.multiscroll.setMouseWheelScrolling = function(value) {
      if (value) {
        addMouseWheelHandler()
      } else {
        removeMouseWheelHandler()
      }
    };
    $.fn.multiscroll.setScrollingSpeed = function(value) {
      options.scrollingSpeed = value
    };
    var touchStartY = 0;
    var touchStartX = 0;
    var touchEndY = 0;
    var touchEndX = 0;

    function touchMoveHandler(event) {
      var e = event.originalEvent;
      event.preventDefault();
      var activeSection = $('.ms-left .ms-section.active');
      if (!isMoving) {
        var touchEvents = getEventsPage(e);
        touchEndY = touchEvents['y'];
        touchEndX = touchEvents['x'];
        if (Math.abs(touchStartY - touchEndY) > ($(window).height() / 100 * options.touchSensitivity)) {
          if (touchStartY > touchEndY) {
            $.fn.multiscroll.moveSectionDown()
          } else if (touchEndY > touchStartY) {
            $.fn.multiscroll.moveSectionUp()
          }
        }
      }
    }

    function touchStartHandler(event) {
      var e = event.originalEvent;
      var touchEvents = getEventsPage(e);
      touchStartY = touchEvents['y'];
      touchStartX = touchEvents['x']
    }

    function addTouchHandler() {
      if (isTouch) {
        MSPointer = getMSPointer();
        $(document).off('touchstart ' + MSPointer.down).on('touchstart ' + MSPointer.down, touchStartHandler);
        $(document).off('touchmove ' + MSPointer.move).on('touchmove ' + MSPointer.move, touchMoveHandler)
      }
    }

    function removeTouchHandler() {
      if (isTouch) {
        MSPointer = getMSPointer();
        $(document).off('touchstart ' + MSPointer.down);
        $(document).off('touchmove ' + MSPointer.move)
      }
    }

    function getMSPointer() {
      var pointer;
      if (window.PointerEvent) {
        pointer = {
          down: "pointerdown",
          move: "pointermove"
        }
      } else {
        pointer = {
          down: "MSPointerDown",
          move: "MSPointerMove"
        }
      }
      return pointer
    }

    function getEventsPage(e) {
      var events = new Array();
      if (window.navigator.msPointerEnabled) {
        events['y'] = e.pageY;
        events['x'] = e.pageX
      } else {
        events['y'] = e.touches[0].pageY;
        events['x'] = e.touches[0].pageX
      }
      return events
    }
    $.fn.multiscroll.destroy = function() {
      $.fn.multiscroll.setKeyboardScrolling(false);
      $.fn.multiscroll.setMouseWheelScrolling(false);
      $(window).off('hashchange', hashChangeHandler).off('resize', doneResizing);
      $(document).off('touchstart').off('touchmove')
    };
    $.fn.multiscroll.build = function() {
      $.fn.multiscroll.setKeyboardScrolling(true);
      $.fn.multiscroll.setMouseWheelScrolling(true);
      $(window).on('hashchange', hashChangeHandler).on('resize', doneResizing);
      $(document).on('touchstart', touchStartHandler).on('touchmove', touchMoveHandler)
    }
  }
})(jQuery);

/*!
 * Justified Gallery - v3.6.1
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2015 Miro Mannino
 * Licensed under the MIT license.
 */
! function(a) {
  var b = function(b, c) {
    this.settings = c, this.checkSettings(), this.imgAnalyzerTimeout = null, this.entries = null, this.buildingRow = {
      entriesBuff: [],
      width: 0,
      height: 0,
      aspectRatio: 0
    }, this.lastAnalyzedIndex = -1, this.yield = {
      every: 2,
      flushed: 0
    }, this.border = c.border >= 0 ? c.border : c.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges(), this.offY = this.border, this.spinner = {
      phase: 0,
      timeSlot: 150,
      $el: a('<div class="spinner"><span></span><span></span><span></span></div>'),
      intervalId: null
    }, this.checkWidthIntervalId = null, this.galleryWidth = b.width(), this.$gallery = b
  };
  b.prototype.getSuffix = function(a, b) {
    var c, d;
    for (c = a > b ? a : b, d = 0; d < this.suffixRanges.length; d++)
      if (c <= this.suffixRanges[d]) return this.settings.sizeRangeSuffixes[this.suffixRanges[d]];
    return this.settings.sizeRangeSuffixes[this.suffixRanges[d - 1]]
  }, b.prototype.removeSuffix = function(a, b) {
    return a.substring(0, a.length - b.length)
  }, b.prototype.endsWith = function(a, b) {
    return -1 !== a.indexOf(b, a.length - b.length)
  }, b.prototype.getUsedSuffix = function(a) {
    for (var b in this.settings.sizeRangeSuffixes)
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(b)) {
        if (0 === this.settings.sizeRangeSuffixes[b].length) continue;
        if (this.endsWith(a, this.settings.sizeRangeSuffixes[b])) return this.settings.sizeRangeSuffixes[b]
      } return ""
  }, b.prototype.newSrc = function(a, b, c) {
    var d;
    if (this.settings.thumbnailPath) d = this.settings.thumbnailPath(a, b, c);
    else {
      var e = a.match(this.settings.extension),
        f = null !== e ? e[0] : "";
      d = a.replace(this.settings.extension, ""), d = this.removeSuffix(d, this.getUsedSuffix(d)), d += this.getSuffix(b, c) + f
    }
    return d
  }, b.prototype.showImg = function(a, b) {
    this.settings.cssAnimation ? (a.addClass("entry-visible"), b && b()) : a.stop().fadeTo(this.settings.imagesAnimationDuration, 1, b)
  }, b.prototype.extractImgSrcFromImage = function(a) {
    var b = "undefined" != typeof a.data("safe-src") ? a.data("safe-src") : a.attr("src");
    return a.data("jg.originalSrc", b), b
  }, b.prototype.imgFromEntry = function(a) {
    var b = a.find("> img");
    return 0 === b.length && (b = a.find("> a > img")), 0 === b.length ? null : b
  }, b.prototype.captionFromEntry = function(a) {
    var b = a.find("> .caption");
    return 0 === b.length ? null : b
  }, b.prototype.displayEntry = function(b, c, d, e, f, g) {
    b.width(e), b.height(g), b.css("top", d), b.css("left", c);
    var h = this.imgFromEntry(b);
    if (null !== h) {
      h.css("width", e), h.css("height", f), h.css("margin-left", -e / 2), h.css("margin-top", -f / 2);
      var i = h.attr("src"),
        j = this.newSrc(i, e, f);
      h.one("error", function() {
        h.attr("src", h.data("jg.originalSrc"))
      });
      var k = function() {
        i !== j && h.attr("src", j)
      };
      "skipped" === b.data("jg.loaded") ? this.onImageEvent(i, a.proxy(function() {
        this.showImg(b, k), b.data("jg.loaded", !0)
      }, this)) : this.showImg(b, k)
    } else this.showImg(b);
    this.displayEntryCaption(b)
  }, b.prototype.displayEntryCaption = function(b) {
    var c = this.imgFromEntry(b);
    if (null !== c && this.settings.captions) {
      var d = this.captionFromEntry(b);
      if (null === d) {
        var e = c.attr("alt");
        this.isValidCaption(e) || (e = b.attr("title")), this.isValidCaption(e) && (d = a('<div class="caption">' + e + "</div>"), b.append(d), b.data("jg.createdCaption", !0))
      }
      null !== d && (this.settings.cssAnimation || d.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity), this.addCaptionEventsHandlers(b))
    } else this.removeCaptionEventsHandlers(b)
  }, b.prototype.isValidCaption = function(a) {
    return "undefined" != typeof a && a.length > 0
  }, b.prototype.onEntryMouseEnterForCaption = function(b) {
    var c = this.captionFromEntry(a(b.currentTarget));
    this.settings.cssAnimation ? c.addClass("caption-visible").removeClass("caption-hidden") : c.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.visibleOpacity)
  }, b.prototype.onEntryMouseLeaveForCaption = function(b) {
    var c = this.captionFromEntry(a(b.currentTarget));
    this.settings.cssAnimation ? c.removeClass("caption-visible").removeClass("caption-hidden") : c.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.nonVisibleOpacity)
  }, b.prototype.addCaptionEventsHandlers = function(b) {
    var c = b.data("jg.captionMouseEvents");
    "undefined" == typeof c && (c = {
      mouseenter: a.proxy(this.onEntryMouseEnterForCaption, this),
      mouseleave: a.proxy(this.onEntryMouseLeaveForCaption, this)
    }, b.on("mouseenter", void 0, void 0, c.mouseenter), b.on("mouseleave", void 0, void 0, c.mouseleave), b.data("jg.captionMouseEvents", c))
  }, b.prototype.removeCaptionEventsHandlers = function(a) {
    var b = a.data("jg.captionMouseEvents");
    "undefined" != typeof b && (a.off("mouseenter", void 0, b.mouseenter), a.off("mouseleave", void 0, b.mouseleave), a.removeData("jg.captionMouseEvents"))
  }, b.prototype.prepareBuildingRow = function(a) {
    var b, c, d, e, f, g = !0,
      h = 0,
      i = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
      j = i / this.buildingRow.aspectRatio,
      k = this.buildingRow.width / i > this.settings.justifyThreshold;
    if (a && "hide" === this.settings.lastRow && !k) {
      for (b = 0; b < this.buildingRow.entriesBuff.length; b++) c = this.buildingRow.entriesBuff[b], this.settings.cssAnimation ? c.removeClass("entry-visible") : c.stop().fadeTo(0, 0);
      return -1
    }
    for (a && !k && "justify" !== this.settings.lastRow && "hide" !== this.settings.lastRow && (g = !1), b = 0; b < this.buildingRow.entriesBuff.length; b++) c = this.buildingRow.entriesBuff[b], d = c.data("jg.width") / c.data("jg.height"), g ? (e = b === this.buildingRow.entriesBuff.length - 1 ? i : j * d, f = j) : (e = this.settings.rowHeight * d, f = this.settings.rowHeight), i -= Math.round(e), c.data("jg.jwidth", Math.round(e)), c.data("jg.jheight", Math.ceil(f)), (0 === b || h > f) && (h = f);
    return this.settings.fixedHeight && h > this.settings.rowHeight && (h = this.settings.rowHeight), this.buildingRow.height = h, g
  }, b.prototype.clearBuildingRow = function() {
    this.buildingRow.entriesBuff = [], this.buildingRow.aspectRatio = 0, this.buildingRow.width = 0
  }, b.prototype.flushRow = function(a) {
    var b, c, d, e = this.settings,
      f = this.border;
    if (c = this.prepareBuildingRow(a), a && "hide" === e.lastRow && -1 === this.buildingRow.height) return void this.clearBuildingRow();
    if (this.maxRowHeight.isPercentage ? this.maxRowHeight.value * e.rowHeight < this.buildingRow.height && (this.buildingRow.height = this.maxRowHeight.value * e.rowHeight) : this.maxRowHeight.value > 0 && this.maxRowHeight.value < this.buildingRow.height && (this.buildingRow.height = this.maxRowHeight.value), "center" === e.lastRow || "right" === e.lastRow) {
      var g = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * e.margins;
      for (d = 0; d < this.buildingRow.entriesBuff.length; d++) b = this.buildingRow.entriesBuff[d], g -= b.data("jg.jwidth");
      "center" === e.lastRow ? f += g / 2 : "right" === e.lastRow && (f += g)
    }
    for (d = 0; d < this.buildingRow.entriesBuff.length; d++) b = this.buildingRow.entriesBuff[d], this.displayEntry(b, f, this.offY, b.data("jg.jwidth"), b.data("jg.jheight"), this.buildingRow.height), f += b.data("jg.jwidth") + e.margins;
    this.$gallery.height(this.offY + this.buildingRow.height + this.border + (this.isSpinnerActive() ? this.getSpinnerHeight() : 0)), (!a || this.buildingRow.height <= e.rowHeight && c) && (this.offY += this.buildingRow.height + e.margins, this.clearBuildingRow(), this.$gallery.trigger("jg.rowflush"))
  }, b.prototype.checkWidth = function() {
    this.checkWidthIntervalId = setInterval(a.proxy(function() {
      var a = parseFloat(this.$gallery.width());
      Math.abs(a - this.galleryWidth) > this.settings.refreshSensitivity && (this.galleryWidth = a, this.rewind(), this.startImgAnalyzer(!0))
    }, this), this.settings.refreshTime)
  }, b.prototype.isSpinnerActive = function() {
    return null !== this.spinner.intervalId
  }, b.prototype.getSpinnerHeight = function() {
    return this.spinner.$el.innerHeight()
  }, b.prototype.stopLoadingSpinnerAnimation = function() {
    clearInterval(this.spinner.intervalId), this.spinner.intervalId = null, this.$gallery.height(this.$gallery.height() - this.getSpinnerHeight()), this.spinner.$el.detach()
  }, b.prototype.startLoadingSpinnerAnimation = function() {
    var a = this.spinner,
      b = a.$el.find("span");
    clearInterval(a.intervalId), this.$gallery.append(a.$el), this.$gallery.height(this.offY + this.buildingRow.height + this.getSpinnerHeight()), a.intervalId = setInterval(function() {
      a.phase < b.length ? b.eq(a.phase).fadeTo(a.timeSlot, 1) : b.eq(a.phase - b.length).fadeTo(a.timeSlot, 0), a.phase = (a.phase + 1) % (2 * b.length)
    }, a.timeSlot)
  }, b.prototype.rewind = function() {
    this.lastAnalyzedIndex = -1, this.offY = this.border, this.clearBuildingRow()
  }, b.prototype.updateEntries = function(b) {
    return this.entries = this.$gallery.find(this.settings.selector).toArray(), 0 === this.entries.length ? !1 : (this.settings.filter ? this.modifyEntries(this.filterArray, b) : this.modifyEntries(this.resetFilters, b), a.isFunction(this.settings.sort) ? this.modifyEntries(this.sortArray, b) : this.settings.randomize && this.modifyEntries(this.shuffleArray, b), !0)
  }, b.prototype.insertToGallery = function(b) {
    var c = this;
    a.each(b, function() {
      a(this).appendTo(c.$gallery)
    })
  }, b.prototype.shuffleArray = function(a) {
    var b, c, d;
    for (b = a.length - 1; b > 0; b--) c = Math.floor(Math.random() * (b + 1)), d = a[b], a[b] = a[c], a[c] = d;
    return this.insertToGallery(a), a
  }, b.prototype.sortArray = function(a) {
    return a.sort(this.settings.sort), this.insertToGallery(a), a
  }, b.prototype.resetFilters = function(b) {
    for (var c = 0; c < b.length; c++) a(b[c]).removeClass("jg-filtered");
    return b
  }, b.prototype.filterArray = function(b) {
    var c = this.settings;
    return "string" === a.type(c.filter) ? b.filter(function(b) {
      var d = a(b);
      return d.is(c.filter) ? (d.removeClass("jg-filtered"), !0) : (d.addClass("jg-filtered"), !1)
    }) : a.isFunction(c.filter) ? b.filter(c.filter) : void 0
  }, b.prototype.modifyEntries = function(a, b) {
    var c = b ? this.entries.splice(this.lastAnalyzedIndex + 1, this.entries.length - this.lastAnalyzedIndex - 1) : this.entries;
    c = a.call(this, c), this.entries = b ? this.entries.concat(c) : c
  }, b.prototype.destroy = function() {
    clearInterval(this.checkWidthIntervalId), a.each(this.entries, a.proxy(function(b, c) {
      var d = a(c);
      d.css("width", ""), d.css("height", ""), d.css("top", ""), d.css("left", ""), d.data("jg.loaded", void 0), d.removeClass("jg-entry");
      var e = this.imgFromEntry(d);
      e.css("width", ""), e.css("height", ""), e.css("margin-left", ""), e.css("margin-top", ""), e.attr("src", e.data("jg.originalSrc")), e.data("jg.originalSrc", void 0), this.removeCaptionEventsHandlers(d);
      var f = this.captionFromEntry(d);
      d.data("jg.createdCaption") ? (d.data("jg.createdCaption", void 0), null !== f && f.remove()) : null !== f && f.fadeTo(0, 1)
    }, this)), this.$gallery.css("height", ""), this.$gallery.removeClass("justified-gallery"), this.$gallery.data("jg.controller", void 0)
  }, b.prototype.analyzeImages = function(b) {
    for (var c = this.lastAnalyzedIndex + 1; c < this.entries.length; c++) {
      var d = a(this.entries[c]);
      if (d.data("jg.loaded") === !0 || "skipped" === d.data("jg.loaded")) {
        var e = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
          f = d.data("jg.width") / d.data("jg.height");
        if (e / (this.buildingRow.aspectRatio + f) < this.settings.rowHeight && (this.flushRow(!1), ++this.yield.flushed >= this.yield.every)) return void this.startImgAnalyzer(b);
        this.buildingRow.entriesBuff.push(d), this.buildingRow.aspectRatio += f, this.buildingRow.width += f * this.settings.rowHeight, this.lastAnalyzedIndex = c
      } else if ("error" !== d.data("jg.loaded")) return
    }
    this.buildingRow.entriesBuff.length > 0 && this.flushRow(!0), this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(), this.stopImgAnalyzerStarter(), this.$gallery.trigger(b ? "jg.resize" : "jg.complete")
  }, b.prototype.stopImgAnalyzerStarter = function() {
    this.yield.flushed = 0, null !== this.imgAnalyzerTimeout && clearTimeout(this.imgAnalyzerTimeout)
  }, b.prototype.startImgAnalyzer = function(a) {
    var b = this;
    this.stopImgAnalyzerStarter(), this.imgAnalyzerTimeout = setTimeout(function() {
      b.analyzeImages(a)
    }, .001)
  }, b.prototype.onImageEvent = function(b, c, d) {
    if (c || d) {
      var e = new Image,
        f = a(e);
      c && f.one("load", function() {
        f.off("load error"), c(e)
      }), d && f.one("error", function() {
        f.off("load error"), d(e)
      }), e.src = b
    }
  }, b.prototype.init = function() {
    var b = !1,
      c = !1,
      d = this;
    a.each(this.entries, function(e, f) {
      var g = a(f),
        h = d.imgFromEntry(g);
      if (g.addClass("jg-entry"), g.data("jg.loaded") !== !0 && "skipped" !== g.data("jg.loaded"))
        if (null !== d.settings.rel && g.attr("rel", d.settings.rel), null !== d.settings.target && g.attr("target", d.settings.target), null !== h) {
          var i = d.extractImgSrcFromImage(h);
          if (h.attr("src", i), d.settings.waitThumbnailsLoad === !1) {
            var j = parseFloat(h.attr("width")),
              k = parseFloat(h.attr("height"));
            if (!isNaN(j) && !isNaN(k)) return g.data("jg.width", j), g.data("jg.height", k), g.data("jg.loaded", "skipped"), c = !0, d.startImgAnalyzer(!1), !0
          }
          g.data("jg.loaded", !1), b = !0, d.isSpinnerActive() || d.startLoadingSpinnerAnimation(), d.onImageEvent(i, function(a) {
            g.data("jg.width", a.width), g.data("jg.height", a.height), g.data("jg.loaded", !0), d.startImgAnalyzer(!1)
          }, function() {
            g.data("jg.loaded", "error"), d.startImgAnalyzer(!1)
          })
        } else g.data("jg.loaded", !0), g.data("jg.width", g.width() | parseFloat(g.css("width")) | 1), g.data("jg.height", g.height() | parseFloat(g.css("height")) | 1)
    }), b || c || this.startImgAnalyzer(!1), this.checkWidth()
  }, b.prototype.checkOrConvertNumber = function(b, c) {
    if ("string" === a.type(b[c]) && (b[c] = parseFloat(b[c])), "number" !== a.type(b[c])) throw c + " must be a number";
    if (isNaN(b[c])) throw "invalid number for " + c
  }, b.prototype.checkSizeRangesSuffixes = function() {
    if ("object" !== a.type(this.settings.sizeRangeSuffixes)) throw "sizeRangeSuffixes must be defined and must be an object";
    var b = [];
    for (var c in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(c) && b.push(c);
    for (var d = {
        0: ""
      }, e = 0; e < b.length; e++)
      if ("string" === a.type(b[e])) try {
        var f = parseInt(b[e].replace(/^[a-z]+/, ""), 10);
        d[f] = this.settings.sizeRangeSuffixes[b[e]]
      } catch (g) {
        throw "sizeRangeSuffixes keys must contains correct numbers (" + g + ")"
      } else d[b[e]] = this.settings.sizeRangeSuffixes[b[e]];
    this.settings.sizeRangeSuffixes = d
  }, b.prototype.retrieveMaxRowHeight = function() {
    var b = {};
    if ("string" === a.type(this.settings.maxRowHeight)) this.settings.maxRowHeight.match(/^[0-9]+%$/) ? (b.value = parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100, b.isPercentage = !1) : (b.value = parseFloat(this.settings.maxRowHeight), b.isPercentage = !0);
    else {
      if ("number" !== a.type(this.settings.maxRowHeight)) throw "maxRowHeight must be a number or a percentage";
      b.value = this.settings.maxRowHeight, b.isPercentage = !1
    }
    if (isNaN(b.value)) throw "invalid number for maxRowHeight";
    return b.isPercentage ? b.value < 100 && (b.value = 100) : b.value > 0 && b.value < this.settings.rowHeight && (b.value = this.settings.rowHeight), b
  }, b.prototype.checkSettings = function() {
    if (this.checkSizeRangesSuffixes(), this.checkOrConvertNumber(this.settings, "rowHeight"), this.checkOrConvertNumber(this.settings, "margins"), this.checkOrConvertNumber(this.settings, "border"), "justify" !== this.settings.lastRow && "nojustify" !== this.settings.lastRow && "left" !== this.settings.lastRow && "center" !== this.settings.lastRow && "right" !== this.settings.lastRow && "hide" !== this.settings.lastRow) throw 'lastRow must be "justify", "nojustify", "left", "center", "right" or "hide"';
    if (this.checkOrConvertNumber(this.settings, "justifyThreshold"), this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) throw "justifyThreshold must be in the interval [0,1]";
    if ("boolean" !== a.type(this.settings.cssAnimation)) throw "cssAnimation must be a boolean";
    if ("boolean" !== a.type(this.settings.captions)) throw "captions must be a boolean";
    if (this.checkOrConvertNumber(this.settings.captionSettings, "animationDuration"), this.checkOrConvertNumber(this.settings.captionSettings, "visibleOpacity"), this.settings.captionSettings.visibleOpacity < 0 || this.settings.captionSettings.visibleOpacity > 1) throw "captionSettings.visibleOpacity must be in the interval [0, 1]";
    if (this.checkOrConvertNumber(this.settings.captionSettings, "nonVisibleOpacity"), this.settings.captionSettings.nonVisibleOpacity < 0 || this.settings.captionSettings.nonVisibleOpacity > 1) throw "captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
    if ("boolean" !== a.type(this.settings.fixedHeight)) throw "fixedHeight must be a boolean";
    if (this.checkOrConvertNumber(this.settings, "imagesAnimationDuration"), this.checkOrConvertNumber(this.settings, "refreshTime"), this.checkOrConvertNumber(this.settings, "refreshSensitivity"), "boolean" !== a.type(this.settings.randomize)) throw "randomize must be a boolean";
    if ("string" !== a.type(this.settings.selector)) throw "selector must be a string";
    if (this.settings.sort !== !1 && !a.isFunction(this.settings.sort)) throw "sort must be false or a comparison function";
    if (this.settings.filter !== !1 && !a.isFunction(this.settings.filter) && "string" !== a.type(this.settings.filter)) throw "filter must be false, a string or a filter function"
  }, b.prototype.retrieveSuffixRanges = function() {
    var a = [];
    for (var b in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(b) && a.push(parseInt(b, 10));
    return a.sort(function(a, b) {
      return a > b ? 1 : b > a ? -1 : 0
    }), a
  }, b.prototype.updateSettings = function(b) {
    this.settings = a.extend({}, this.settings, b), this.checkSettings(), this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges()
  }, a.fn.justifiedGallery = function(c) {
    return this.each(function(d, e) {
      var f = a(e);
      f.addClass("justified-gallery");
      var g = f.data("jg.controller");
      if ("undefined" == typeof g) {
        if ("undefined" != typeof c && null !== c && "object" !== a.type(c)) {
          if ("destroy" === c) return;
          throw "The argument must be an object"
        }
        g = new b(f, a.extend({}, a.fn.justifiedGallery.defaults, c)), f.data("jg.controller", g)
      } else if ("norewind" === c);
      else {
        if ("destroy" === c) return void g.destroy();
        g.updateSettings(c), g.rewind()
      }
      g.updateEntries("norewind" === c) && g.init()
    })
  }, a.fn.justifiedGallery.defaults = {
    sizeRangeSuffixes: {},
    thumbnailPath: void 0,
    rowHeight: 120,
    maxRowHeight: -1,
    margins: 1,
    border: -1,
    lastRow: "nojustify",
    justifyThreshold: .75,
    fixedHeight: !1,
    waitThumbnailsLoad: !0,
    captions: !0,
    cssAnimation: !1,
    imagesAnimationDuration: 500,
    captionSettings: {
      animationDuration: 500,
      visibleOpacity: .7,
      nonVisibleOpacity: 0
    },
    rel: null,
    target: null,
    extension: /\.[^.\\/]+$/,
    refreshTime: 200,
    refreshSensitivity: 0,
    randomize: !1,
    sort: !1,
    filter: !1,
    selector: "> a, > div:not(.spinner)"
  }
}(jQuery);

/*! BigText - v0.1.8 - 2015-04-01
 * https://github.com/zachleat/bigtext
 * Copyright (c) 2015 Zach Leatherman (@zachleat)
 * MIT License */
(function(window, $) {
  "use strict";
  var counter = 0,
    $headCache = $('head'),
    oldBigText = window.BigText,
    oldjQueryMethod = $.fn.bigtext,
    BigText = {
      DEBUG_MODE: false,
      DEFAULT_MIN_FONT_SIZE_PX: null,
      DEFAULT_MAX_FONT_SIZE_PX: 528,
      GLOBAL_STYLE_ID: 'bigtext-style',
      STYLE_ID: 'bigtext-id',
      LINE_CLASS_PREFIX: 'bigtext-line',
      EXEMPT_CLASS: 'bigtext-exempt',
      noConflict: function(restore) {
        if (restore) {
          $.fn.bigtext = oldjQueryMethod;
          window.BigText = oldBigText
        }
        return BigText
      },
      supports: {
        wholeNumberFontSizeOnly: (function() {
          if (!('getComputedStyle' in window)) {
            return true
          }
          var test = $('<div/>').css({
              position: 'absolute',
              'font-size': '14.1px'
            }).insertBefore($('script').eq(0)),
            computedStyle = window.getComputedStyle(test[0], null);
          var ret = computedStyle && computedStyle.getPropertyValue('font-size') === '14px';
          test.remove();
          return ret
        })()
      },
      init: function() {
        if (!$('#' + BigText.GLOBAL_STYLE_ID).length) {
          $headCache.append(BigText.generateStyleTag(BigText.GLOBAL_STYLE_ID, ['.bigtext * { white-space: nowrap; } .bigtext > * { display: block; }', '.bigtext .' + BigText.EXEMPT_CLASS + ', .bigtext .' + BigText.EXEMPT_CLASS + ' * { white-space: normal; }']))
        }
      },
      bindResize: function(eventName, resizeFunction) {
        var timeoutId;
        $(window).unbind(eventName).bind(eventName, function() {
          if (timeoutId) {
            clearTimeout(timeoutId)
          }
          timeoutId = setTimeout(resizeFunction, 100)
        })
      },
      getStyleId: function(id) {
        return BigText.STYLE_ID + '-' + id
      },
      generateStyleTag: function(id, css) {
        return $('<style>' + css.join('\n') + '</style>').attr('id', id)
      },
      clearCss: function(id) {
        var styleId = BigText.getStyleId(id);
        $('#' + styleId).remove()
      },
      generateCss: function(id, linesFontSizes, lineWordSpacings, minFontSizes) {
        var css = [];
        BigText.clearCss(id);
        for (var j = 0, k = linesFontSizes.length; j < k; j++) {
          css.push('#' + id + ' .' + BigText.LINE_CLASS_PREFIX + j + ' {' + (minFontSizes[j] ? ' white-space: normal;' : '') + (linesFontSizes[j] ? ' font-size: ' + linesFontSizes[j] + 'px;' : '') + (lineWordSpacings[j] ? ' word-spacing: ' + lineWordSpacings[j] + 'px;' : '') + '}')
        }
        return BigText.generateStyleTag(BigText.getStyleId(id), css)
      },
      jQueryMethod: function(options) {
        BigText.init();
        options = $.extend({
          minfontsize: BigText.DEFAULT_MIN_FONT_SIZE_PX,
          maxfontsize: BigText.DEFAULT_MAX_FONT_SIZE_PX,
          childSelector: '',
          resize: true
        }, options || {});
        this.each(function() {
          var $t = $(this).addClass('bigtext'),
            maxWidth = $t.width(),
            id = $t.attr('id'),
            $children = options.childSelector ? $t.find(options.childSelector) : $t.children();
          if (!id) {
            id = 'bigtext-id' + (counter++);
            $t.attr('id', id)
          }
          if (options.resize) {
            BigText.bindResize('resize.bigtext-event-' + id, function() {
              BigText.jQueryMethod.call($('#' + id), options)
            })
          }
          BigText.clearCss(id);
          $children.addClass(function(lineNumber, className) {
            return [className.replace(new RegExp('\\b' + BigText.LINE_CLASS_PREFIX + '\\d+\\b'), ''), BigText.LINE_CLASS_PREFIX + lineNumber].join(' ')
          });
          var sizes = calculateSizes($t, $children, maxWidth, options.maxfontsize, options.minfontsize);
          $headCache.append(BigText.generateCss(id, sizes.fontSizes, sizes.wordSpacings, sizes.minFontSizes))
        });
        return this.trigger('bigtext:complete')
      }
    };

  function testLineDimensions($line, maxWidth, property, size, interval, units, previousWidth) {
    var width;
    previousWidth = typeof previousWidth === 'number' ? previousWidth : 0;
    $line.css(property, size + units);
    width = $line.width();
    if (width >= maxWidth) {
      $line.css(property, '');
      if (width === maxWidth) {
        return {
          match: 'exact',
          size: parseFloat((parseFloat(size) - 0.1).toFixed(3))
        }
      }
      var under = maxWidth - previousWidth,
        over = width - maxWidth;
      return {
        match: 'estimate',
        size: parseFloat((parseFloat(size) - (property === 'word-spacing' && previousWidth && (over < under) ? 0 : interval)).toFixed(3))
      }
    }
    return width
  }

  function calculateSizes($t, $children, maxWidth, maxFontSize, minFontSize) {
    var $c = $t.clone(true).addClass('bigtext-cloned').css({
      fontFamily: $t.css('font-family'),
      textTransform: $t.css('text-transform'),
      wordSpacing: $t.css('word-spacing'),
      letterSpacing: $t.css('letter-spacing'),
      position: 'absolute',
      left: BigText.DEBUG_MODE ? 0 : -9999,
      top: BigText.DEBUG_MODE ? 0 : -9999
    }).appendTo(document.body);
    var fontSizes = [],
      wordSpacings = [],
      minFontSizes = [],
      ratios = [];
    $children.css('float', 'left').each(function() {
      var $line = $(this),
        intervals = BigText.supports.wholeNumberFontSizeOnly ? [8, 4, 1] : [8, 4, 1, 0.1],
        lineMax, newFontSize;
      if ($line.hasClass(BigText.EXEMPT_CLASS)) {
        fontSizes.push(null);
        ratios.push(null);
        minFontSizes.push(false);
        return
      }
      var autoGuessSubtraction = 32,
        currentFontSize = parseFloat($line.css('font-size')),
        ratio = ($line.width() / currentFontSize).toFixed(6);
      newFontSize = parseInt(maxWidth / ratio, 10) - autoGuessSubtraction;
      outer: for (var m = 0, n = intervals.length; m < n; m++) {
        inner: for (var j = 1, k = 10; j <= k; j++) {
          if (newFontSize + j * intervals[m] > maxFontSize) {
            newFontSize = maxFontSize;
            break outer
          }
          lineMax = testLineDimensions($line, maxWidth, 'font-size', newFontSize + j * intervals[m], intervals[m], 'px', lineMax);
          if (typeof lineMax !== 'number') {
            newFontSize = lineMax.size;
            if (lineMax.match === 'exact') {
              break outer
            }
            break inner
          }
        }
      }
      ratios.push(maxWidth / newFontSize);
      if (newFontSize > maxFontSize) {
        fontSizes.push(maxFontSize);
        minFontSizes.push(false)
      } else if (!!minFontSize && newFontSize < minFontSize) {
        fontSizes.push(minFontSize);
        minFontSizes.push(true)
      } else {
        fontSizes.push(newFontSize);
        minFontSizes.push(false)
      }
    }).each(function(lineNumber) {
      var $line = $(this),
        wordSpacing = 0,
        interval = 1,
        maxWordSpacing;
      if ($line.hasClass(BigText.EXEMPT_CLASS)) {
        wordSpacings.push(null);
        return
      }
      $line.css('font-size', fontSizes[lineNumber] + 'px');
      for (var m = 1, n = 3; m < n; m += interval) {
        maxWordSpacing = testLineDimensions($line, maxWidth, 'word-spacing', m, interval, 'px', maxWordSpacing);
        if (typeof maxWordSpacing !== 'number') {
          wordSpacing = maxWordSpacing.size;
          break
        }
      }
      $line.css('font-size', '');
      wordSpacings.push(wordSpacing)
    }).removeAttr('style');
    if (!BigText.DEBUG_MODE) {
      $c.remove()
    } else {
      $c.css({
        'background-color': 'rgba(255,255,255,.4)'
      })
    }
    return {
      fontSizes: fontSizes,
      wordSpacings: wordSpacings,
      ratios: ratios,
      minFontSizes: minFontSizes
    }
  }
  $.fn.bigtext = BigText.jQueryMethod;
  window.BigText = BigText
})(this, jQuery);

/*
 Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
*/
(function() {
  var b, f;
  b = this.jQuery || window.jQuery;
  f = b(window);
  b.fn.stick_in_parent = function(d) {
    var A, w, J, n, B, K, p, q, k, E, t;
    null == d && (d = {});
    t = d.sticky_class;
    B = d.inner_scrolling;
    E = d.recalc_every;
    k = d.parent;
    q = d.offset_top;
    p = d.spacer;
    w = d.bottoming;
    null == q && (q = 0);
    null == k && (k = void 0);
    null == B && (B = !0);
    null == t && (t = "is_stuck");
    A = b(document);
    null == w && (w = !0);
    J = function(a, d, n, C, F, u, r, G) {
      var v, H, m, D, I, c, g, x, y, z, h, l;
      if (!a.data("sticky_kit")) {
        a.data("sticky_kit", !0);
        I = A.height();
        g = a.parent();
        null != k && (g = g.closest(k));
        if (!g.length) throw "failed to find stick parent";
        v = m = !1;
        (h = null != p ? p && a.closest(p) : b("<div />")) && h.css("position", a.css("position"));
        x = function() {
          var c, f, e;
          if (!G && (I = A.height(), c = parseInt(g.css("border-top-width"), 10), f = parseInt(g.css("padding-top"), 10), d = parseInt(g.css("padding-bottom"), 10), n = g.offset().top + c + f, C = g.height(), m && (v = m = !1, null == p && (a.insertAfter(h), h.detach()), a.css({
                position: "",
                top: "",
                width: "",
                bottom: ""
              }).removeClass(t), e = !0), F = a.offset().top - (parseInt(a.css("margin-top"), 10) || 0) - q,
              u = a.outerHeight(!0), r = a.css("float"), h && h.css({
                width: a.outerWidth(!0),
                height: u,
                display: a.css("display"),
                "vertical-align": a.css("vertical-align"),
                "float": r
              }), e)) return l()
        };
        x();
        if (u !== C) return D = void 0, c = q, z = E, l = function() {
          var b, l, e, k;
          if (!G && (e = !1, null != z && (--z, 0 >= z && (z = E, x(), e = !0)), e || A.height() === I || x(), e = f.scrollTop(), null != D && (l = e - D), D = e, m ? (w && (k = e + u + c > C + n, v && !k && (v = !1, a.css({
              position: "fixed",
              bottom: "",
              top: c
            }).trigger("sticky_kit:unbottom"))), e < F && (m = !1, c = q, null == p && ("left" !== r && "right" !== r || a.insertAfter(h),
              h.detach()), b = {
              position: "",
              width: "",
              top: ""
            }, a.css(b).removeClass(t).trigger("sticky_kit:unstick")), B && (b = f.height(), u + q > b && !v && (c -= l, c = Math.max(b - u, c), c = Math.min(q, c), m && a.css({
              top: c + "px"
            })))) : e > F && (m = !0, b = {
              position: "fixed",
              top: c
            }, b.width = "border-box" === a.css("box-sizing") ? a.outerWidth() + "px" : a.width() + "px", a.css(b).addClass(t), null == p && (a.after(h), "left" !== r && "right" !== r || h.append(a)), a.trigger("sticky_kit:stick")), m && w && (null == k && (k = e + u + c > C + n), !v && k))) return v = !0, "static" === g.css("position") && g.css({
              position: "relative"
            }),
            a.css({
              position: "absolute",
              bottom: d,
              top: "auto"
            }).trigger("sticky_kit:bottom")
        }, y = function() {
          x();
          return l()
        }, H = function() {
          G = !0;
          f.off("touchmove", l);
          f.off("scroll", l);
          f.off("resize", y);
          b(document.body).off("sticky_kit:recalc", y);
          a.off("sticky_kit:detach", H);
          a.removeData("sticky_kit");
          a.css({
            position: "",
            bottom: "",
            top: "",
            width: ""
          });
          g.position("position", "");
          if (m) return null == p && ("left" !== r && "right" !== r || a.insertAfter(h), h.remove()), a.removeClass(t)
        }, f.on("touchmove", l), f.on("scroll", l), f.on("resize",
          y), b(document.body).on("sticky_kit:recalc", y), a.on("sticky_kit:detach", H), setTimeout(l, 0)
      }
    };
    n = 0;
    for (K = this.length; n < K; n++) d = this[n], J(b(d));
    return this
  }
}).call(this);

/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
 */
! function(a, b, c, d) {
  function e(b, c) {
    this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    }, this._states = {
      current: {},
      tags: {
        initializing: ["busy"],
        animating: ["busy"],
        dragging: ["interacting"]
      }
    }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
      this._handlers[c] = a.proxy(this[c], this)
    }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
      this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
    }, this)), a.each(e.Workers, a.proxy(function(b, c) {
      this._pipe.push({
        filter: c.filter,
        run: a.proxy(c.run, this)
      })
    }, this)), this.setup(), this.initialize()
  }
  e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab"
  }, e.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
  }, e.Type = {
    Event: "event",
    State: "state"
  }, e.Plugins = {}, e.Workers = [{
    filter: ["width", "settings"],
    run: function() {
      this._width = this.$element.width()
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(a) {
      a.current = this._items && this._items[this.relative(this._current)]
    }
  }, {
    filter: ["items", "settings"],
    run: function() {
      this.$stage.children(".cloned").remove()
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(a) {
      var b = this.settings.margin || "",
        c = !this.settings.autoWidth,
        d = this.settings.rtl,
        e = {
          width: "auto",
          "margin-left": d ? b : "",
          "margin-right": d ? "" : b
        };
      !c && this.$stage.children().css(e), a.css = e
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(a) {
      var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
        c = null,
        d = this._items.length,
        e = !this.settings.autoWidth,
        f = [];
      for (a.items = {
          merge: !1,
          width: b
        }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
      this._widths = f
    }
  }, {
    filter: ["items", "settings"],
    run: function() {
      var b = [],
        c = this._items,
        d = this.settings,
        e = Math.max(2 * d.items, 4),
        f = 2 * Math.ceil(c.length / 2),
        g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
        h = "",
        i = "";
      for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
      this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function() {
      for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
      this._coordinates = f
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function() {
      var a = this.settings.stagePadding,
        b = this._coordinates,
        c = {
          width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
          "padding-left": a || "",
          "padding-right": a || ""
        };
      this.$stage.css(c)
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(a) {
      var b = this._coordinates.length,
        c = !this.settings.autoWidth,
        d = this.$stage.children();
      if (c && a.items.merge)
        for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
      else c && (a.css.width = a.items.width, d.css(a.css))
    }
  }, {
    filter: ["items"],
    run: function() {
      this._coordinates.length < 1 && this.$stage.removeAttr("style")
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function(a) {
      a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
    }
  }, {
    filter: ["position"],
    run: function() {
      this.animate(this.coordinates(this._current))
    }
  }, {
    filter: ["width", "position", "items", "settings"],
    run: function() {
      var a, b, c, d, e = this.settings.rtl ? 1 : -1,
        f = 2 * this.settings.stagePadding,
        g = this.coordinates(this.current()) + f,
        h = g + this.width() * e,
        i = [];
      for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
      this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
    }
  }], e.prototype.initialize = function() {
    if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
      var b, c, e;
      b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && e <= 0 && this.preloadAutoWidthImages(b)
    }
    this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
  }, e.prototype.setup = function() {
    var b = this.viewport(),
      c = this.options.responsive,
      d = -1,
      e = null;
    c ? (a.each(c, function(a) {
      a <= b && a > d && (d = Number(a))
    }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
      property: {
        name: "settings",
        value: e
      }
    }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
      property: {
        name: "settings",
        value: this.settings
      }
    })
  }, e.prototype.optionsLogic = function() {
    this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
  }, e.prototype.prepare = function(b) {
    var c = this.trigger("prepare", {
      content: b
    });
    return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
      content: c.data
    }), c.data
  }, e.prototype.update = function() {
    for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
        return this[a]
      }, this._invalidated), e = {}; b < c;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
    this._invalidated = {}, !this.is("valid") && this.enter("valid")
  }, e.prototype.width = function(a) {
    switch (a = a || e.Width.Default) {
      case e.Width.Inner:
      case e.Width.Outer:
        return this._width;
      default:
        return this._width - 2 * this.settings.stagePadding + this.settings.margin
    }
  }, e.prototype.refresh = function() {
    this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
  }, e.prototype.onThrottledResize = function() {
    b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
  }, e.prototype.onResize = function() {
    return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
  }, e.prototype.registerEventHandlers = function() {
    a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
      return !1
    })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
  }, e.prototype.onDragStart = function(b) {
    var d = null;
    3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
      x: d[16 === d.length ? 12 : 4],
      y: d[16 === d.length ? 13 : 5]
    }) : (d = this.$stage.position(), d = {
      x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
      y: d.top
    }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
      var d = this.difference(this._drag.pointer, this.pointer(b));
      a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
    }, this)))
  }, e.prototype.onDragMove = function(a) {
    var b = null,
      c = null,
      d = null,
      e = this.difference(this._drag.pointer, this.pointer(a)),
      f = this.difference(this._drag.stage.start, e);
    this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
  }, e.prototype.onDragEnd = function(b) {
    var d = this.difference(this._drag.pointer, this.pointer(b)),
      e = this._drag.stage.current,
      f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
    a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
      return !1
    })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
  }, e.prototype.closest = function(b, c) {
    var d = -1,
      e = 30,
      f = this.width(),
      g = this.coordinates();
    return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) {
      return "left" === c && b > h - e && b < h + e ? d = a : "right" === c && b > h - f - e && b < h - f + e ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), d === -1
    }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
  }, e.prototype.animate = function(b) {
    var c = this.speed() > 0;
    this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
      transform: "translate3d(" + b + "px,0px,0px)",
      transition: this.speed() / 1e3 + "s"
    }) : c ? this.$stage.animate({
      left: b + "px"
    }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
      left: b + "px"
    })
  }, e.prototype.is = function(a) {
    return this._states.current[a] && this._states.current[a] > 0
  }, e.prototype.current = function(a) {
    if (a === d) return this._current;
    if (0 === this._items.length) return d;
    if (a = this.normalize(a), this._current !== a) {
      var b = this.trigger("change", {
        property: {
          name: "position",
          value: a
        }
      });
      b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
        property: {
          name: "position",
          value: this._current
        }
      })
    }
    return this._current
  }, e.prototype.invalidate = function(b) {
    return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
      return b
    })
  }, e.prototype.reset = function(a) {
    a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
  }, e.prototype.normalize = function(a, b) {
    var c = this._items.length,
      e = b ? 0 : this._clones.length;
    return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
  }, e.prototype.relative = function(a) {
    return a -= this._clones.length / 2, this.normalize(a, !0)
  }, e.prototype.maximum = function(a) {
    var b, c, d, e = this.settings,
      f = this._coordinates.length;
    if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
    else if (e.autoWidth || e.merge) {
      for (b = this._items.length, c = this._items[--b].width(), d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin, !(c > d)););
      f = b + 1
    } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
    return a && (f -= this._clones.length / 2), Math.max(f, 0)
  }, e.prototype.minimum = function(a) {
    return a ? 0 : this._clones.length / 2
  }, e.prototype.items = function(a) {
    return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
  }, e.prototype.mergers = function(a) {
    return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
  }, e.prototype.clones = function(b) {
    var c = this._clones.length / 2,
      e = c + this._items.length,
      f = function(a) {
        return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
      };
    return b === d ? a.map(this._clones, function(a, b) {
      return f(b)
    }) : a.map(this._clones, function(a, c) {
      return a === b ? f(c) : null
    })
  }, e.prototype.speed = function(a) {
    return a !== d && (this._speed = a), this._speed
  }, e.prototype.coordinates = function(b) {
    var c, e = 1,
      f = b - 1;
    return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
      return this.coordinates(b)
    }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
  }, e.prototype.duration = function(a, b, c) {
    return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
  }, e.prototype.to = function(a, b) {
    var c = this.current(),
      d = null,
      e = a - this.relative(c),
      f = (e > 0) - (e < 0),
      g = this._items.length,
      h = this.minimum(),
      i = this.maximum();
    this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
  }, e.prototype.next = function(a) {
    a = a || !1, this.to(this.relative(this.current()) + 1, a)
  }, e.prototype.prev = function(a) {
    a = a || !1, this.to(this.relative(this.current()) - 1, a)
  }, e.prototype.onTransitionEnd = function(a) {
    if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
    this.leave("animating"), this.trigger("translated")
  }, e.prototype.viewport = function() {
    var d;
    return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
  }, e.prototype.replace = function(b) {
    this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
      return 1 === this.nodeType
    }).each(a.proxy(function(a, b) {
      b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
    }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
  }, e.prototype.add = function(b, c) {
    var e = this.relative(this._current);
    c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
      content: b,
      position: c
    }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
      content: b,
      position: c
    })
  }, e.prototype.remove = function(a) {
    a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
      content: this._items[a],
      position: a
    }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
      content: null,
      position: a
    }))
  }, e.prototype.preloadAutoWidthImages = function(b) {
    b.each(a.proxy(function(b, c) {
      this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
        c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
      }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
    }, this))
  }, e.prototype.destroy = function() {
    this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
    for (var d in this._plugins) this._plugins[d].destroy();
    this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
  }, e.prototype.op = function(a, b, c) {
    var d = this.settings.rtl;
    switch (b) {
      case "<":
        return d ? a > c : a < c;
      case ">":
        return d ? a < c : a > c;
      case ">=":
        return d ? a <= c : a >= c;
      case "<=":
        return d ? a >= c : a <= c
    }
  }, e.prototype.on = function(a, b, c, d) {
    a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
  }, e.prototype.off = function(a, b, c, d) {
    a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
  }, e.prototype.trigger = function(b, c, d, f, g) {
    var h = {
        item: {
          count: this._items.length,
          index: this.current()
        }
      },
      i = a.camelCase(a.grep(["on", b, d], function(a) {
        return a
      }).join("-").toLowerCase()),
      j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
        relatedTarget: this
      }, h, c));
    return this._supress[b] || (a.each(this._plugins, function(a, b) {
      b.onTrigger && b.onTrigger(j)
    }), this.register({
      type: e.Type.Event,
      name: b
    }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
  }, e.prototype.enter = function(b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
      this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
    }, this))
  }, e.prototype.leave = function(b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
      this._states.current[b]--
    }, this))
  }, e.prototype.register = function(b) {
    if (b.type === e.Type.Event) {
      if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
        var c = a.event.special[b.name]._default;
        a.event.special[b.name]._default = function(a) {
          return !c || !c.apply || a.namespace && a.namespace.indexOf("owl") !== -1 ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
        }, a.event.special[b.name].owl = !0
      }
    } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
      return a.inArray(c, this._states.tags[b.name]) === d
    }, this)))
  }, e.prototype.suppress = function(b) {
    a.each(b, a.proxy(function(a, b) {
      this._supress[b] = !0
    }, this))
  }, e.prototype.release = function(b) {
    a.each(b, a.proxy(function(a, b) {
      delete this._supress[b]
    }, this))
  }, e.prototype.pointer = function(a) {
    var c = {
      x: null,
      y: null
    };
    return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
  }, e.prototype.isNumeric = function(a) {
    return !isNaN(parseFloat(a))
  }, e.prototype.difference = function(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    }
  }, a.fn.owlCarousel = function(b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      var d = a(this),
        f = d.data("owl.carousel");
      f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
        f.register({
          type: e.Type.Event,
          name: c
        }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
          a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
        }, f))
      })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
    })
  }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
    this._core = b, this._interval = null, this._visible = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.autoRefresh && this.watch()
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  e.Defaults = {
    autoRefresh: !0,
    autoRefreshInterval: 500
  }, e.prototype.watch = function() {
    this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
  }, e.prototype.refresh = function() {
    this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
  }, e.prototype.destroy = function() {
    var a, c;
    b.clearInterval(this._interval);
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
    this._core = b, this._loaded = [], this._handlers = {
      "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
          for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && e * -1 || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function(a, b) {
              this.load(b)
            }, this); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  e.Defaults = {
    lazyLoad: !1
  }, e.prototype.load = function(c) {
    var d = this._core.$stage.children().eq(c),
      e = d && d.find(".owl-lazy");
    !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
      var e, f = a(d),
        g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
      this._core.trigger("load", {
        element: f,
        url: g
      }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
        f.css("opacity", 1), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy")
      }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
        f.css({
          "background-image": 'url("' + g + '")',
          opacity: "1"
        }), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy")
      }, this), e.src = g)
    }, this)), this._loaded.push(d.get(0)))
  }, e.prototype.destroy = function() {
    var a, b;
    for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
    this._core = b, this._handlers = {
      "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.autoHeight && this.update()
      }, this),
      "changed.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
      }, this),
      "loaded.owl.lazy": a.proxy(function(a) {
        a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  e.Defaults = {
    autoHeight: !1,
    autoHeightClass: "owl-height"
  }, e.prototype.update = function() {
    var b = this._core._current,
      c = b + this._core.settings.items,
      d = this._core.$stage.children().toArray().slice(b, c),
      e = [],
      f = 0;
    a.each(d, function(b, c) {
      e.push(a(c).height())
    }), f = Math.max.apply(null, e), this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)
  }, e.prototype.destroy = function() {
    var a, b;
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
    this._core = b, this._videos = {}, this._playing = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.register({
          type: "state",
          name: "playing",
          tags: ["interacting"]
        })
      }, this),
      "resize.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
      }, this),
      "refreshed.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
      }, this),
      "changed.owl.carousel": a.proxy(function(a) {
        a.namespace && "position" === a.property.name && this._playing && this.stop()
      }, this),
      "prepared.owl.carousel": a.proxy(function(b) {
        if (b.namespace) {
          var c = a(b.content).find(".owl-video");
          c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
      this.play(a)
    }, this))
  };
  e.Defaults = {
    video: !1,
    videoHeight: !1,
    videoWidth: !1
  }, e.prototype.fetch = function(a, b) {
    var c = function() {
        return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
      }(),
      d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
      e = a.attr("data-width") || this._core.settings.videoWidth,
      f = a.attr("data-height") || this._core.settings.videoHeight,
      g = a.attr("href");
    if (!g) throw new Error("Missing video URL.");
    if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
    else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
    else {
      if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
      c = "vzaar"
    }
    d = d[6], this._videos[g] = {
      type: c,
      id: d,
      width: e,
      height: f
    }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
  }, e.prototype.thumbnail = function(b, c) {
    var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
      h = b.find("img"),
      i = "src",
      j = "",
      k = this._core.settings,
      l = function(a) {
        e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
      };
    if (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
    "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
      type: "GET",
      url: "//vimeo.com/api/v2/video/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function(a) {
        f = a[0].thumbnail_large, l(f)
      }
    }) : "vzaar" === c.type && a.ajax({
      type: "GET",
      url: "//vzaar.com/api/videos/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function(a) {
        f = a.framegrab_url, l(f)
      }
    })
  }, e.prototype.stop = function() {
    this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
  }, e.prototype.play = function(b) {
    var c, d = a(b.target),
      e = d.closest("." + this._core.settings.itemClass),
      f = this._videos[e.attr("data-video")],
      g = f.width || "100%",
      h = f.height || this._core.$stage.height();
    this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&rel=0&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
  }, e.prototype.isInFullScreen = function() {
    var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
    return b && a(b).parent().hasClass("owl-video-frame")
  }, e.prototype.destroy = function() {
    var a, b;
    this._core.$element.off("click.owl.video");
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
    this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
      "change.owl.carousel": a.proxy(function(a) {
        a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
      }, this),
      "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
        a.namespace && (this.swapping = "translated" == a.type)
      }, this),
      "translate.owl.carousel": a.proxy(function(a) {
        a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
      }, this)
    }, this.core.$element.on(this.handlers)
  };
  e.Defaults = {
      animateOut: !1,
      animateIn: !1
    }, e.prototype.swap = function() {
      if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
        this.core.speed(0);
        var b, c = a.proxy(this.clear, this),
          d = this.core.$stage.children().eq(this.previous),
          e = this.core.$stage.children().eq(this.next),
          f = this.core.settings.animateIn,
          g = this.core.settings.animateOut;
        this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
          left: b + "px"
        }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
      }
    }, e.prototype.clear = function(b) {
      a(b.target).css({
        left: ""
      }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function() {
      var a, b;
      for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
      for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    },
    a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  var e = function(b) {
    this._core = b, this._timeout = null, this._paused = !1, this._handlers = {
      "changed.owl.carousel": a.proxy(function(a) {
        a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
      }, this),
      "initialized.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.autoplay && this.play()
      }, this),
      "play.owl.autoplay": a.proxy(function(a, b, c) {
        a.namespace && this.play(b, c)
      }, this),
      "stop.owl.autoplay": a.proxy(function(a) {
        a.namespace && this.stop()
      }, this),
      "mouseover.owl.autoplay": a.proxy(function() {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
      }, this),
      "mouseleave.owl.autoplay": a.proxy(function() {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
      }, this),
      "touchstart.owl.core": a.proxy(function() {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
      }, this),
      "touchend.owl.core": a.proxy(function() {
        this._core.settings.autoplayHoverPause && this.play()
      }, this)
    }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
  };
  e.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
  }, e.prototype.play = function(a, b) {
    this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
  }, e.prototype._getNextTimeout = function(d, e) {
    return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(a.proxy(function() {
      this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
    }, this), d || this._core.settings.autoplayTimeout)
  }, e.prototype._setAutoPlayInterval = function() {
    this._timeout = this._getNextTimeout()
  }, e.prototype.stop = function() {
    this._core.is("rotating") && (b.clearTimeout(this._timeout), this._core.leave("rotating"))
  }, e.prototype.pause = function() {
    this._core.is("rotating") && (this._paused = !0)
  }, e.prototype.destroy = function() {
    var a, b;
    this.stop();
    for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
    for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  "use strict";
  var e = function(b) {
    this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    }, this._handlers = {
      "prepared.owl.carousel": a.proxy(function(b) {
        b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
      }, this),
      "added.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
      }, this),
      "remove.owl.carousel": a.proxy(function(a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
      }, this),
      "changed.owl.carousel": a.proxy(function(a) {
        a.namespace && "position" == a.property.name && this.draw()
      }, this),
      "initialized.owl.carousel": a.proxy(function(a) {
        a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
      }, this),
      "refreshed.owl.carousel": a.proxy(function(a) {
        a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
  };
  e.Defaults = {
    nav: !1,
    navText: ["prev", "next"],
    navSpeed: !1,
    navElement: "div",
    navContainer: !1,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: !0,
    dotsEach: !1,
    dotsData: !1,
    dotsSpeed: !1,
    dotsContainer: !1
  }, e.prototype.initialize = function() {
    var b, c = this._core.settings;
    this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
      this.prev(c.navSpeed)
    }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
      this.next(c.navSpeed)
    }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function(b) {
      var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
      b.preventDefault(), this.to(d, c.dotsSpeed)
    }, this));
    for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
  }, e.prototype.destroy = function() {
    var a, b, c, d;
    for (a in this._handlers) this.$element.off(a, this._handlers[a]);
    for (b in this._controls) this._controls[b].remove();
    for (d in this.overides) this._core[d] = this._overrides[d];
    for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
  }, e.prototype.update = function() {
    var a, b, c, d = this._core.clones().length / 2,
      e = d + this._core.items().length,
      f = this._core.maximum(!0),
      g = this._core.settings,
      h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
    if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
      for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
        if (b >= h || 0 === b) {
          if (this._pages.push({
              start: Math.min(f, a - d),
              end: a - d + h - 1
            }), Math.min(f, a - d) === f) break;
          b = 0, ++c
        }
        b += this._core.mergers(this._core.relative(a))
      }
  }, e.prototype.draw = function() {
    var b, c = this._core.settings,
      d = this._core.items().length <= c.items,
      e = this._core.relative(this._core.current()),
      f = c.loop || c.rewind;
    this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
  }, e.prototype.onTrigger = function(b) {
    var c = this._core.settings;
    b.page = {
      index: a.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
    }
  }, e.prototype.current = function() {
    var b = this._core.relative(this._core.current());
    return a.grep(this._pages, a.proxy(function(a, c) {
      return a.start <= b && a.end >= b
    }, this)).pop()
  }, e.prototype.getPosition = function(b) {
    var c, d, e = this._core.settings;
    return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
  }, e.prototype.next = function(b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
  }, e.prototype.prev = function(b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
  }, e.prototype.to = function(b, c, d) {
    var e;
    !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
  }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  "use strict";
  var e = function(c) {
    this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
      "initialized.owl.carousel": a.proxy(function(c) {
        c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
      }, this),
      "prepared.owl.carousel": a.proxy(function(b) {
        if (b.namespace) {
          var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
          if (!c) return;
          this._hashes[c] = b.content
        }
      }, this),
      "changed.owl.carousel": a.proxy(function(c) {
        if (c.namespace && "position" === c.property.name) {
          var d = this._core.items(this._core.relative(this._core.current())),
            e = a.map(this._hashes, function(a, b) {
              return a === d ? b : null
            }).join();
          if (!e || b.location.hash.slice(1) === e) return;
          b.location.hash = e
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
      var c = b.location.hash.substring(1),
        e = this._core.$stage.children(),
        f = this._hashes[c] && e.index(this._hashes[c]);
      f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
    }, this))
  };
  e.Defaults = {
    URLhashListener: !1
  }, e.prototype.destroy = function() {
    var c, d;
    a(b).off("hashchange.owl.navigation");
    for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
    for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
  function e(b, c) {
    var e = !1,
      f = b.charAt(0).toUpperCase() + b.slice(1);
    return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
      if (g[b] !== d) return e = !c || b, !1
    }), e
  }

  function f(a) {
    return e(a, !0)
  }
  var g = a("<support>").get(0).style,
    h = "Webkit Moz O ms".split(" "),
    i = {
      transition: {
        end: {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          transition: "transitionend"
        }
      },
      animation: {
        end: {
          WebkitAnimation: "webkitAnimationEnd",
          MozAnimation: "animationend",
          OAnimation: "oAnimationEnd",
          animation: "animationend"
        }
      }
    },
    j = {
      csstransforms: function() {
        return !!e("transform")
      },
      csstransforms3d: function() {
        return !!e("perspective")
      },
      csstransitions: function() {
        return !!e("transition")
      },
      cssanimations: function() {
        return !!e("animation")
      }
    };
  j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);

import {
  _asyncToGenerator,
  processCanvasRGBA,
  require_correct_is_regexp_logic,
  require_es_array_iterator,
  require_export,
  require_function_uncurry_this_clause,
  require_is_pure,
  require_not_a_regexp,
  require_object_get_own_property_descriptor,
  require_raf,
  require_require_object_coercible,
  require_rgbcolor,
  require_to_length,
  require_to_string
} from "./chunk-64JWWDVI.js";
import {
  _defineProperty
} from "./chunk-5MLMGDL2.js";
import "./chunk-JZCPY7PP.js";
import {
  __toESM
} from "./chunk-Y6Q6HMFU.js";

// node_modules/canvg/lib/index.es.js
var import_es_array_iterator = __toESM(require_es_array_iterator());

// node_modules/core-js/modules/es.string.ends-with.js
var $ = require_export();
var uncurryThis = require_function_uncurry_this_clause();
var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
var toLength = require_to_length();
var toString = require_to_string();
var notARegExp = require_not_a_regexp();
var requireObjectCoercible = require_require_object_coercible();
var correctIsRegExpLogic = require_correct_is_regexp_logic();
var IS_PURE = require_is_pure();
var slice = uncurryThis("".slice);
var min = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("endsWith");
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function() {
  var descriptor = getOwnPropertyDescriptor(String.prototype, "endsWith");
  return descriptor && !descriptor.writable;
}();
$({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : void 0;
    var len = that.length;
    var end = endPosition === void 0 ? len : min(toLength(endPosition), len);
    var search = toString(searchString);
    return slice(that, end - search.length, end) === search;
  }
});

// node_modules/canvg/lib/index.es.js
var import_raf = __toESM(require_raf());
var import_rgbcolor = __toESM(require_rgbcolor());

// node_modules/svg-pathdata/lib/SVGPathData.module.js
var t = function(r2, e2) {
  return (t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t2, r3) {
    t2.__proto__ = r3;
  } || function(t2, r3) {
    for (var e3 in r3)
      Object.prototype.hasOwnProperty.call(r3, e3) && (t2[e3] = r3[e3]);
  })(r2, e2);
};
function r(r2, e2) {
  if ("function" != typeof e2 && null !== e2)
    throw new TypeError("Class extends value " + String(e2) + " is not a constructor or null");
  function i2() {
    this.constructor = r2;
  }
  t(r2, e2), r2.prototype = null === e2 ? Object.create(e2) : (i2.prototype = e2.prototype, new i2());
}
function e(t2) {
  var r2 = "";
  Array.isArray(t2) || (t2 = [t2]);
  for (var e2 = 0; e2 < t2.length; e2++) {
    var i2 = t2[e2];
    if (i2.type === _.CLOSE_PATH)
      r2 += "z";
    else if (i2.type === _.HORIZ_LINE_TO)
      r2 += (i2.relative ? "h" : "H") + i2.x;
    else if (i2.type === _.VERT_LINE_TO)
      r2 += (i2.relative ? "v" : "V") + i2.y;
    else if (i2.type === _.MOVE_TO)
      r2 += (i2.relative ? "m" : "M") + i2.x + " " + i2.y;
    else if (i2.type === _.LINE_TO)
      r2 += (i2.relative ? "l" : "L") + i2.x + " " + i2.y;
    else if (i2.type === _.CURVE_TO)
      r2 += (i2.relative ? "c" : "C") + i2.x1 + " " + i2.y1 + " " + i2.x2 + " " + i2.y2 + " " + i2.x + " " + i2.y;
    else if (i2.type === _.SMOOTH_CURVE_TO)
      r2 += (i2.relative ? "s" : "S") + i2.x2 + " " + i2.y2 + " " + i2.x + " " + i2.y;
    else if (i2.type === _.QUAD_TO)
      r2 += (i2.relative ? "q" : "Q") + i2.x1 + " " + i2.y1 + " " + i2.x + " " + i2.y;
    else if (i2.type === _.SMOOTH_QUAD_TO)
      r2 += (i2.relative ? "t" : "T") + i2.x + " " + i2.y;
    else {
      if (i2.type !== _.ARC)
        throw new Error('Unexpected command type "' + i2.type + '" at index ' + e2 + ".");
      r2 += (i2.relative ? "a" : "A") + i2.rX + " " + i2.rY + " " + i2.xRot + " " + +i2.lArcFlag + " " + +i2.sweepFlag + " " + i2.x + " " + i2.y;
    }
  }
  return r2;
}
function i(t2, r2) {
  var e2 = t2[0], i2 = t2[1];
  return [e2 * Math.cos(r2) - i2 * Math.sin(r2), e2 * Math.sin(r2) + i2 * Math.cos(r2)];
}
function a() {
  for (var t2 = [], r2 = 0; r2 < arguments.length; r2++)
    t2[r2] = arguments[r2];
  for (var e2 = 0; e2 < t2.length; e2++)
    if ("number" != typeof t2[e2])
      throw new Error("assertNumbers arguments[" + e2 + "] is not a number. " + typeof t2[e2] + " == typeof " + t2[e2]);
  return true;
}
var n = Math.PI;
function o(t2, r2, e2) {
  t2.lArcFlag = 0 === t2.lArcFlag ? 0 : 1, t2.sweepFlag = 0 === t2.sweepFlag ? 0 : 1;
  var a2 = t2.rX, o2 = t2.rY, s2 = t2.x, u2 = t2.y;
  a2 = Math.abs(t2.rX), o2 = Math.abs(t2.rY);
  var h2 = i([(r2 - s2) / 2, (e2 - u2) / 2], -t2.xRot / 180 * n), c3 = h2[0], y2 = h2[1], p2 = Math.pow(c3, 2) / Math.pow(a2, 2) + Math.pow(y2, 2) / Math.pow(o2, 2);
  1 < p2 && (a2 *= Math.sqrt(p2), o2 *= Math.sqrt(p2)), t2.rX = a2, t2.rY = o2;
  var m3 = Math.pow(a2, 2) * Math.pow(y2, 2) + Math.pow(o2, 2) * Math.pow(c3, 2), O2 = (t2.lArcFlag !== t2.sweepFlag ? 1 : -1) * Math.sqrt(Math.max(0, (Math.pow(a2, 2) * Math.pow(o2, 2) - m3) / m3)), l2 = a2 * y2 / o2 * O2, T2 = -o2 * c3 / a2 * O2, v2 = i([l2, T2], t2.xRot / 180 * n);
  t2.cX = v2[0] + (r2 + s2) / 2, t2.cY = v2[1] + (e2 + u2) / 2, t2.phi1 = Math.atan2((y2 - T2) / o2, (c3 - l2) / a2), t2.phi2 = Math.atan2((-y2 - T2) / o2, (-c3 - l2) / a2), 0 === t2.sweepFlag && t2.phi2 > t2.phi1 && (t2.phi2 -= 2 * n), 1 === t2.sweepFlag && t2.phi2 < t2.phi1 && (t2.phi2 += 2 * n), t2.phi1 *= 180 / n, t2.phi2 *= 180 / n;
}
function s(t2, r2, e2) {
  a(t2, r2, e2);
  var i2 = t2 * t2 + r2 * r2 - e2 * e2;
  if (0 > i2)
    return [];
  if (0 === i2)
    return [[t2 * e2 / (t2 * t2 + r2 * r2), r2 * e2 / (t2 * t2 + r2 * r2)]];
  var n2 = Math.sqrt(i2);
  return [[(t2 * e2 + r2 * n2) / (t2 * t2 + r2 * r2), (r2 * e2 - t2 * n2) / (t2 * t2 + r2 * r2)], [(t2 * e2 - r2 * n2) / (t2 * t2 + r2 * r2), (r2 * e2 + t2 * n2) / (t2 * t2 + r2 * r2)]];
}
var u;
var h = Math.PI / 180;
function c(t2, r2, e2) {
  return (1 - e2) * t2 + e2 * r2;
}
function y(t2, r2, e2, i2) {
  return t2 + Math.cos(i2 / 180 * n) * r2 + Math.sin(i2 / 180 * n) * e2;
}
function p(t2, r2, e2, i2) {
  var a2 = 1e-6, n2 = r2 - t2, o2 = e2 - r2, s2 = 3 * n2 + 3 * (i2 - e2) - 6 * o2, u2 = 6 * (o2 - n2), h2 = 3 * n2;
  return Math.abs(s2) < a2 ? [-h2 / u2] : function(t3, r3, e3) {
    void 0 === e3 && (e3 = 1e-6);
    var i3 = t3 * t3 / 4 - r3;
    if (i3 < -e3)
      return [];
    if (i3 <= e3)
      return [-t3 / 2];
    var a3 = Math.sqrt(i3);
    return [-t3 / 2 - a3, -t3 / 2 + a3];
  }(u2 / s2, h2 / s2, a2);
}
function m(t2, r2, e2, i2, a2) {
  var n2 = 1 - a2;
  return t2 * (n2 * n2 * n2) + r2 * (3 * n2 * n2 * a2) + e2 * (3 * n2 * a2 * a2) + i2 * (a2 * a2 * a2);
}
!function(t2) {
  function r2() {
    return u2(function(t3, r3, e3) {
      return t3.relative && (void 0 !== t3.x1 && (t3.x1 += r3), void 0 !== t3.y1 && (t3.y1 += e3), void 0 !== t3.x2 && (t3.x2 += r3), void 0 !== t3.y2 && (t3.y2 += e3), void 0 !== t3.x && (t3.x += r3), void 0 !== t3.y && (t3.y += e3), t3.relative = false), t3;
    });
  }
  function e2() {
    var t3 = NaN, r3 = NaN, e3 = NaN, i2 = NaN;
    return u2(function(a2, n3, o2) {
      return a2.type & _.SMOOTH_CURVE_TO && (a2.type = _.CURVE_TO, t3 = isNaN(t3) ? n3 : t3, r3 = isNaN(r3) ? o2 : r3, a2.x1 = a2.relative ? n3 - t3 : 2 * n3 - t3, a2.y1 = a2.relative ? o2 - r3 : 2 * o2 - r3), a2.type & _.CURVE_TO ? (t3 = a2.relative ? n3 + a2.x2 : a2.x2, r3 = a2.relative ? o2 + a2.y2 : a2.y2) : (t3 = NaN, r3 = NaN), a2.type & _.SMOOTH_QUAD_TO && (a2.type = _.QUAD_TO, e3 = isNaN(e3) ? n3 : e3, i2 = isNaN(i2) ? o2 : i2, a2.x1 = a2.relative ? n3 - e3 : 2 * n3 - e3, a2.y1 = a2.relative ? o2 - i2 : 2 * o2 - i2), a2.type & _.QUAD_TO ? (e3 = a2.relative ? n3 + a2.x1 : a2.x1, i2 = a2.relative ? o2 + a2.y1 : a2.y1) : (e3 = NaN, i2 = NaN), a2;
    });
  }
  function n2() {
    var t3 = NaN, r3 = NaN;
    return u2(function(e3, i2, a2) {
      if (e3.type & _.SMOOTH_QUAD_TO && (e3.type = _.QUAD_TO, t3 = isNaN(t3) ? i2 : t3, r3 = isNaN(r3) ? a2 : r3, e3.x1 = e3.relative ? i2 - t3 : 2 * i2 - t3, e3.y1 = e3.relative ? a2 - r3 : 2 * a2 - r3), e3.type & _.QUAD_TO) {
        t3 = e3.relative ? i2 + e3.x1 : e3.x1, r3 = e3.relative ? a2 + e3.y1 : e3.y1;
        var n3 = e3.x1, o2 = e3.y1;
        e3.type = _.CURVE_TO, e3.x1 = ((e3.relative ? 0 : i2) + 2 * n3) / 3, e3.y1 = ((e3.relative ? 0 : a2) + 2 * o2) / 3, e3.x2 = (e3.x + 2 * n3) / 3, e3.y2 = (e3.y + 2 * o2) / 3;
      } else
        t3 = NaN, r3 = NaN;
      return e3;
    });
  }
  function u2(t3) {
    var r3 = 0, e3 = 0, i2 = NaN, a2 = NaN;
    return function(n3) {
      if (isNaN(i2) && !(n3.type & _.MOVE_TO))
        throw new Error("path must start with moveto");
      var o2 = t3(n3, r3, e3, i2, a2);
      return n3.type & _.CLOSE_PATH && (r3 = i2, e3 = a2), void 0 !== n3.x && (r3 = n3.relative ? r3 + n3.x : n3.x), void 0 !== n3.y && (e3 = n3.relative ? e3 + n3.y : n3.y), n3.type & _.MOVE_TO && (i2 = r3, a2 = e3), o2;
    };
  }
  function O2(t3, r3, e3, i2, n3, o2) {
    return a(t3, r3, e3, i2, n3, o2), u2(function(a2, s2, u3, h2) {
      var c3 = a2.x1, y2 = a2.x2, p2 = a2.relative && !isNaN(h2), m3 = void 0 !== a2.x ? a2.x : p2 ? 0 : s2, O3 = void 0 !== a2.y ? a2.y : p2 ? 0 : u3;
      function l3(t4) {
        return t4 * t4;
      }
      a2.type & _.HORIZ_LINE_TO && 0 !== r3 && (a2.type = _.LINE_TO, a2.y = a2.relative ? 0 : u3), a2.type & _.VERT_LINE_TO && 0 !== e3 && (a2.type = _.LINE_TO, a2.x = a2.relative ? 0 : s2), void 0 !== a2.x && (a2.x = a2.x * t3 + O3 * e3 + (p2 ? 0 : n3)), void 0 !== a2.y && (a2.y = m3 * r3 + a2.y * i2 + (p2 ? 0 : o2)), void 0 !== a2.x1 && (a2.x1 = a2.x1 * t3 + a2.y1 * e3 + (p2 ? 0 : n3)), void 0 !== a2.y1 && (a2.y1 = c3 * r3 + a2.y1 * i2 + (p2 ? 0 : o2)), void 0 !== a2.x2 && (a2.x2 = a2.x2 * t3 + a2.y2 * e3 + (p2 ? 0 : n3)), void 0 !== a2.y2 && (a2.y2 = y2 * r3 + a2.y2 * i2 + (p2 ? 0 : o2));
      var T2 = t3 * i2 - r3 * e3;
      if (void 0 !== a2.xRot && (1 !== t3 || 0 !== r3 || 0 !== e3 || 1 !== i2))
        if (0 === T2)
          delete a2.rX, delete a2.rY, delete a2.xRot, delete a2.lArcFlag, delete a2.sweepFlag, a2.type = _.LINE_TO;
        else {
          var v2 = a2.xRot * Math.PI / 180, f2 = Math.sin(v2), N2 = Math.cos(v2), x = 1 / l3(a2.rX), d = 1 / l3(a2.rY), E = l3(N2) * x + l3(f2) * d, A = 2 * f2 * N2 * (x - d), C = l3(f2) * x + l3(N2) * d, M = E * i2 * i2 - A * r3 * i2 + C * r3 * r3, R = A * (t3 * i2 + r3 * e3) - 2 * (E * e3 * i2 + C * t3 * r3), g = E * e3 * e3 - A * t3 * e3 + C * t3 * t3, I = (Math.atan2(R, M - g) + Math.PI) % Math.PI / 2, S = Math.sin(I), L = Math.cos(I);
          a2.rX = Math.abs(T2) / Math.sqrt(M * l3(L) + R * S * L + g * l3(S)), a2.rY = Math.abs(T2) / Math.sqrt(M * l3(S) - R * S * L + g * l3(L)), a2.xRot = 180 * I / Math.PI;
        }
      return void 0 !== a2.sweepFlag && 0 > T2 && (a2.sweepFlag = +!a2.sweepFlag), a2;
    });
  }
  function l2() {
    return function(t3) {
      var r3 = {};
      for (var e3 in t3)
        r3[e3] = t3[e3];
      return r3;
    };
  }
  t2.ROUND = function(t3) {
    function r3(r4) {
      return Math.round(r4 * t3) / t3;
    }
    return void 0 === t3 && (t3 = 1e13), a(t3), function(t4) {
      return void 0 !== t4.x1 && (t4.x1 = r3(t4.x1)), void 0 !== t4.y1 && (t4.y1 = r3(t4.y1)), void 0 !== t4.x2 && (t4.x2 = r3(t4.x2)), void 0 !== t4.y2 && (t4.y2 = r3(t4.y2)), void 0 !== t4.x && (t4.x = r3(t4.x)), void 0 !== t4.y && (t4.y = r3(t4.y)), void 0 !== t4.rX && (t4.rX = r3(t4.rX)), void 0 !== t4.rY && (t4.rY = r3(t4.rY)), t4;
    };
  }, t2.TO_ABS = r2, t2.TO_REL = function() {
    return u2(function(t3, r3, e3) {
      return t3.relative || (void 0 !== t3.x1 && (t3.x1 -= r3), void 0 !== t3.y1 && (t3.y1 -= e3), void 0 !== t3.x2 && (t3.x2 -= r3), void 0 !== t3.y2 && (t3.y2 -= e3), void 0 !== t3.x && (t3.x -= r3), void 0 !== t3.y && (t3.y -= e3), t3.relative = true), t3;
    });
  }, t2.NORMALIZE_HVZ = function(t3, r3, e3) {
    return void 0 === t3 && (t3 = true), void 0 === r3 && (r3 = true), void 0 === e3 && (e3 = true), u2(function(i2, a2, n3, o2, s2) {
      if (isNaN(o2) && !(i2.type & _.MOVE_TO))
        throw new Error("path must start with moveto");
      return r3 && i2.type & _.HORIZ_LINE_TO && (i2.type = _.LINE_TO, i2.y = i2.relative ? 0 : n3), e3 && i2.type & _.VERT_LINE_TO && (i2.type = _.LINE_TO, i2.x = i2.relative ? 0 : a2), t3 && i2.type & _.CLOSE_PATH && (i2.type = _.LINE_TO, i2.x = i2.relative ? o2 - a2 : o2, i2.y = i2.relative ? s2 - n3 : s2), i2.type & _.ARC && (0 === i2.rX || 0 === i2.rY) && (i2.type = _.LINE_TO, delete i2.rX, delete i2.rY, delete i2.xRot, delete i2.lArcFlag, delete i2.sweepFlag), i2;
    });
  }, t2.NORMALIZE_ST = e2, t2.QT_TO_C = n2, t2.INFO = u2, t2.SANITIZE = function(t3) {
    void 0 === t3 && (t3 = 0), a(t3);
    var r3 = NaN, e3 = NaN, i2 = NaN, n3 = NaN;
    return u2(function(a2, o2, s2, u3, h2) {
      var c3 = Math.abs, y2 = false, p2 = 0, m3 = 0;
      if (a2.type & _.SMOOTH_CURVE_TO && (p2 = isNaN(r3) ? 0 : o2 - r3, m3 = isNaN(e3) ? 0 : s2 - e3), a2.type & (_.CURVE_TO | _.SMOOTH_CURVE_TO) ? (r3 = a2.relative ? o2 + a2.x2 : a2.x2, e3 = a2.relative ? s2 + a2.y2 : a2.y2) : (r3 = NaN, e3 = NaN), a2.type & _.SMOOTH_QUAD_TO ? (i2 = isNaN(i2) ? o2 : 2 * o2 - i2, n3 = isNaN(n3) ? s2 : 2 * s2 - n3) : a2.type & _.QUAD_TO ? (i2 = a2.relative ? o2 + a2.x1 : a2.x1, n3 = a2.relative ? s2 + a2.y1 : a2.y2) : (i2 = NaN, n3 = NaN), a2.type & _.LINE_COMMANDS || a2.type & _.ARC && (0 === a2.rX || 0 === a2.rY || !a2.lArcFlag) || a2.type & _.CURVE_TO || a2.type & _.SMOOTH_CURVE_TO || a2.type & _.QUAD_TO || a2.type & _.SMOOTH_QUAD_TO) {
        var O3 = void 0 === a2.x ? 0 : a2.relative ? a2.x : a2.x - o2, l3 = void 0 === a2.y ? 0 : a2.relative ? a2.y : a2.y - s2;
        p2 = isNaN(i2) ? void 0 === a2.x1 ? p2 : a2.relative ? a2.x : a2.x1 - o2 : i2 - o2, m3 = isNaN(n3) ? void 0 === a2.y1 ? m3 : a2.relative ? a2.y : a2.y1 - s2 : n3 - s2;
        var T2 = void 0 === a2.x2 ? 0 : a2.relative ? a2.x : a2.x2 - o2, v2 = void 0 === a2.y2 ? 0 : a2.relative ? a2.y : a2.y2 - s2;
        c3(O3) <= t3 && c3(l3) <= t3 && c3(p2) <= t3 && c3(m3) <= t3 && c3(T2) <= t3 && c3(v2) <= t3 && (y2 = true);
      }
      return a2.type & _.CLOSE_PATH && c3(o2 - u3) <= t3 && c3(s2 - h2) <= t3 && (y2 = true), y2 ? [] : a2;
    });
  }, t2.MATRIX = O2, t2.ROTATE = function(t3, r3, e3) {
    void 0 === r3 && (r3 = 0), void 0 === e3 && (e3 = 0), a(t3, r3, e3);
    var i2 = Math.sin(t3), n3 = Math.cos(t3);
    return O2(n3, i2, -i2, n3, r3 - r3 * n3 + e3 * i2, e3 - r3 * i2 - e3 * n3);
  }, t2.TRANSLATE = function(t3, r3) {
    return void 0 === r3 && (r3 = 0), a(t3, r3), O2(1, 0, 0, 1, t3, r3);
  }, t2.SCALE = function(t3, r3) {
    return void 0 === r3 && (r3 = t3), a(t3, r3), O2(t3, 0, 0, r3, 0, 0);
  }, t2.SKEW_X = function(t3) {
    return a(t3), O2(1, 0, Math.atan(t3), 1, 0, 0);
  }, t2.SKEW_Y = function(t3) {
    return a(t3), O2(1, Math.atan(t3), 0, 1, 0, 0);
  }, t2.X_AXIS_SYMMETRY = function(t3) {
    return void 0 === t3 && (t3 = 0), a(t3), O2(-1, 0, 0, 1, t3, 0);
  }, t2.Y_AXIS_SYMMETRY = function(t3) {
    return void 0 === t3 && (t3 = 0), a(t3), O2(1, 0, 0, -1, 0, t3);
  }, t2.A_TO_C = function() {
    return u2(function(t3, r3, e3) {
      return _.ARC === t3.type ? function(t4, r4, e4) {
        var a2, n3, s2, u3;
        t4.cX || o(t4, r4, e4);
        for (var y2 = Math.min(t4.phi1, t4.phi2), p2 = Math.max(t4.phi1, t4.phi2) - y2, m3 = Math.ceil(p2 / 90), O3 = new Array(m3), l3 = r4, T2 = e4, v2 = 0; v2 < m3; v2++) {
          var f2 = c(t4.phi1, t4.phi2, v2 / m3), N2 = c(t4.phi1, t4.phi2, (v2 + 1) / m3), x = N2 - f2, d = 4 / 3 * Math.tan(x * h / 4), E = [Math.cos(f2 * h) - d * Math.sin(f2 * h), Math.sin(f2 * h) + d * Math.cos(f2 * h)], A = E[0], C = E[1], M = [Math.cos(N2 * h), Math.sin(N2 * h)], R = M[0], g = M[1], I = [R + d * Math.sin(N2 * h), g - d * Math.cos(N2 * h)], S = I[0], L = I[1];
          O3[v2] = { relative: t4.relative, type: _.CURVE_TO };
          var H = function(r5, e5) {
            var a3 = i([r5 * t4.rX, e5 * t4.rY], t4.xRot), n4 = a3[0], o2 = a3[1];
            return [t4.cX + n4, t4.cY + o2];
          };
          a2 = H(A, C), O3[v2].x1 = a2[0], O3[v2].y1 = a2[1], n3 = H(S, L), O3[v2].x2 = n3[0], O3[v2].y2 = n3[1], s2 = H(R, g), O3[v2].x = s2[0], O3[v2].y = s2[1], t4.relative && (O3[v2].x1 -= l3, O3[v2].y1 -= T2, O3[v2].x2 -= l3, O3[v2].y2 -= T2, O3[v2].x -= l3, O3[v2].y -= T2), l3 = (u3 = [O3[v2].x, O3[v2].y])[0], T2 = u3[1];
        }
        return O3;
      }(t3, t3.relative ? 0 : r3, t3.relative ? 0 : e3) : t3;
    });
  }, t2.ANNOTATE_ARCS = function() {
    return u2(function(t3, r3, e3) {
      return t3.relative && (r3 = 0, e3 = 0), _.ARC === t3.type && o(t3, r3, e3), t3;
    });
  }, t2.CLONE = l2, t2.CALCULATE_BOUNDS = function() {
    var t3 = function(t4) {
      var r3 = {};
      for (var e3 in t4)
        r3[e3] = t4[e3];
      return r3;
    }, i2 = r2(), a2 = n2(), h2 = e2(), c3 = u2(function(r3, e3, n3) {
      var u3 = h2(a2(i2(t3(r3))));
      function O3(t4) {
        t4 > c3.maxX && (c3.maxX = t4), t4 < c3.minX && (c3.minX = t4);
      }
      function l3(t4) {
        t4 > c3.maxY && (c3.maxY = t4), t4 < c3.minY && (c3.minY = t4);
      }
      if (u3.type & _.DRAWING_COMMANDS && (O3(e3), l3(n3)), u3.type & _.HORIZ_LINE_TO && O3(u3.x), u3.type & _.VERT_LINE_TO && l3(u3.y), u3.type & _.LINE_TO && (O3(u3.x), l3(u3.y)), u3.type & _.CURVE_TO) {
        O3(u3.x), l3(u3.y);
        for (var T2 = 0, v2 = p(e3, u3.x1, u3.x2, u3.x); T2 < v2.length; T2++) {
          0 < (w = v2[T2]) && 1 > w && O3(m(e3, u3.x1, u3.x2, u3.x, w));
        }
        for (var f2 = 0, N2 = p(n3, u3.y1, u3.y2, u3.y); f2 < N2.length; f2++) {
          0 < (w = N2[f2]) && 1 > w && l3(m(n3, u3.y1, u3.y2, u3.y, w));
        }
      }
      if (u3.type & _.ARC) {
        O3(u3.x), l3(u3.y), o(u3, e3, n3);
        for (var x = u3.xRot / 180 * Math.PI, d = Math.cos(x) * u3.rX, E = Math.sin(x) * u3.rX, A = -Math.sin(x) * u3.rY, C = Math.cos(x) * u3.rY, M = u3.phi1 < u3.phi2 ? [u3.phi1, u3.phi2] : -180 > u3.phi2 ? [u3.phi2 + 360, u3.phi1 + 360] : [u3.phi2, u3.phi1], R = M[0], g = M[1], I = function(t4) {
          var r4 = t4[0], e4 = t4[1], i3 = 180 * Math.atan2(e4, r4) / Math.PI;
          return i3 < R ? i3 + 360 : i3;
        }, S = 0, L = s(A, -d, 0).map(I); S < L.length; S++) {
          (w = L[S]) > R && w < g && O3(y(u3.cX, d, A, w));
        }
        for (var H = 0, U = s(C, -E, 0).map(I); H < U.length; H++) {
          var w;
          (w = U[H]) > R && w < g && l3(y(u3.cY, E, C, w));
        }
      }
      return r3;
    });
    return c3.minX = 1 / 0, c3.maxX = -1 / 0, c3.minY = 1 / 0, c3.maxY = -1 / 0, c3;
  };
}(u || (u = {}));
var O;
var l = function() {
  function t2() {
  }
  return t2.prototype.round = function(t3) {
    return this.transform(u.ROUND(t3));
  }, t2.prototype.toAbs = function() {
    return this.transform(u.TO_ABS());
  }, t2.prototype.toRel = function() {
    return this.transform(u.TO_REL());
  }, t2.prototype.normalizeHVZ = function(t3, r2, e2) {
    return this.transform(u.NORMALIZE_HVZ(t3, r2, e2));
  }, t2.prototype.normalizeST = function() {
    return this.transform(u.NORMALIZE_ST());
  }, t2.prototype.qtToC = function() {
    return this.transform(u.QT_TO_C());
  }, t2.prototype.aToC = function() {
    return this.transform(u.A_TO_C());
  }, t2.prototype.sanitize = function(t3) {
    return this.transform(u.SANITIZE(t3));
  }, t2.prototype.translate = function(t3, r2) {
    return this.transform(u.TRANSLATE(t3, r2));
  }, t2.prototype.scale = function(t3, r2) {
    return this.transform(u.SCALE(t3, r2));
  }, t2.prototype.rotate = function(t3, r2, e2) {
    return this.transform(u.ROTATE(t3, r2, e2));
  }, t2.prototype.matrix = function(t3, r2, e2, i2, a2, n2) {
    return this.transform(u.MATRIX(t3, r2, e2, i2, a2, n2));
  }, t2.prototype.skewX = function(t3) {
    return this.transform(u.SKEW_X(t3));
  }, t2.prototype.skewY = function(t3) {
    return this.transform(u.SKEW_Y(t3));
  }, t2.prototype.xSymmetry = function(t3) {
    return this.transform(u.X_AXIS_SYMMETRY(t3));
  }, t2.prototype.ySymmetry = function(t3) {
    return this.transform(u.Y_AXIS_SYMMETRY(t3));
  }, t2.prototype.annotateArcs = function() {
    return this.transform(u.ANNOTATE_ARCS());
  }, t2;
}();
var T = function(t2) {
  return " " === t2 || "	" === t2 || "\r" === t2 || "\n" === t2;
};
var v = function(t2) {
  return "0".charCodeAt(0) <= t2.charCodeAt(0) && t2.charCodeAt(0) <= "9".charCodeAt(0);
};
var f = function(t2) {
  function e2() {
    var r2 = t2.call(this) || this;
    return r2.curNumber = "", r2.curCommandType = -1, r2.curCommandRelative = false, r2.canParseCommandOrComma = true, r2.curNumberHasExp = false, r2.curNumberHasExpDigits = false, r2.curNumberHasDecimal = false, r2.curArgs = [], r2;
  }
  return r(e2, t2), e2.prototype.finish = function(t3) {
    if (void 0 === t3 && (t3 = []), this.parse(" ", t3), 0 !== this.curArgs.length || !this.canParseCommandOrComma)
      throw new SyntaxError("Unterminated command at the path end.");
    return t3;
  }, e2.prototype.parse = function(t3, r2) {
    var e3 = this;
    void 0 === r2 && (r2 = []);
    for (var i2 = function(t4) {
      r2.push(t4), e3.curArgs.length = 0, e3.canParseCommandOrComma = true;
    }, a2 = 0; a2 < t3.length; a2++) {
      var n2 = t3[a2], o2 = !(this.curCommandType !== _.ARC || 3 !== this.curArgs.length && 4 !== this.curArgs.length || 1 !== this.curNumber.length || "0" !== this.curNumber && "1" !== this.curNumber), s2 = v(n2) && ("0" === this.curNumber && "0" === n2 || o2);
      if (!v(n2) || s2)
        if ("e" !== n2 && "E" !== n2)
          if ("-" !== n2 && "+" !== n2 || !this.curNumberHasExp || this.curNumberHasExpDigits)
            if ("." !== n2 || this.curNumberHasExp || this.curNumberHasDecimal || o2) {
              if (this.curNumber && -1 !== this.curCommandType) {
                var u2 = Number(this.curNumber);
                if (isNaN(u2))
                  throw new SyntaxError("Invalid number ending at " + a2);
                if (this.curCommandType === _.ARC) {
                  if (0 === this.curArgs.length || 1 === this.curArgs.length) {
                    if (0 > u2)
                      throw new SyntaxError('Expected positive number, got "' + u2 + '" at index "' + a2 + '"');
                  } else if ((3 === this.curArgs.length || 4 === this.curArgs.length) && "0" !== this.curNumber && "1" !== this.curNumber)
                    throw new SyntaxError('Expected a flag, got "' + this.curNumber + '" at index "' + a2 + '"');
                }
                this.curArgs.push(u2), this.curArgs.length === N[this.curCommandType] && (_.HORIZ_LINE_TO === this.curCommandType ? i2({ type: _.HORIZ_LINE_TO, relative: this.curCommandRelative, x: u2 }) : _.VERT_LINE_TO === this.curCommandType ? i2({ type: _.VERT_LINE_TO, relative: this.curCommandRelative, y: u2 }) : this.curCommandType === _.MOVE_TO || this.curCommandType === _.LINE_TO || this.curCommandType === _.SMOOTH_QUAD_TO ? (i2({ type: this.curCommandType, relative: this.curCommandRelative, x: this.curArgs[0], y: this.curArgs[1] }), _.MOVE_TO === this.curCommandType && (this.curCommandType = _.LINE_TO)) : this.curCommandType === _.CURVE_TO ? i2({ type: _.CURVE_TO, relative: this.curCommandRelative, x1: this.curArgs[0], y1: this.curArgs[1], x2: this.curArgs[2], y2: this.curArgs[3], x: this.curArgs[4], y: this.curArgs[5] }) : this.curCommandType === _.SMOOTH_CURVE_TO ? i2({ type: _.SMOOTH_CURVE_TO, relative: this.curCommandRelative, x2: this.curArgs[0], y2: this.curArgs[1], x: this.curArgs[2], y: this.curArgs[3] }) : this.curCommandType === _.QUAD_TO ? i2({ type: _.QUAD_TO, relative: this.curCommandRelative, x1: this.curArgs[0], y1: this.curArgs[1], x: this.curArgs[2], y: this.curArgs[3] }) : this.curCommandType === _.ARC && i2({ type: _.ARC, relative: this.curCommandRelative, rX: this.curArgs[0], rY: this.curArgs[1], xRot: this.curArgs[2], lArcFlag: this.curArgs[3], sweepFlag: this.curArgs[4], x: this.curArgs[5], y: this.curArgs[6] })), this.curNumber = "", this.curNumberHasExpDigits = false, this.curNumberHasExp = false, this.curNumberHasDecimal = false, this.canParseCommandOrComma = true;
              }
              if (!T(n2))
                if ("," === n2 && this.canParseCommandOrComma)
                  this.canParseCommandOrComma = false;
                else if ("+" !== n2 && "-" !== n2 && "." !== n2)
                  if (s2)
                    this.curNumber = n2, this.curNumberHasDecimal = false;
                  else {
                    if (0 !== this.curArgs.length)
                      throw new SyntaxError("Unterminated command at index " + a2 + ".");
                    if (!this.canParseCommandOrComma)
                      throw new SyntaxError('Unexpected character "' + n2 + '" at index ' + a2 + ". Command cannot follow comma");
                    if (this.canParseCommandOrComma = false, "z" !== n2 && "Z" !== n2)
                      if ("h" === n2 || "H" === n2)
                        this.curCommandType = _.HORIZ_LINE_TO, this.curCommandRelative = "h" === n2;
                      else if ("v" === n2 || "V" === n2)
                        this.curCommandType = _.VERT_LINE_TO, this.curCommandRelative = "v" === n2;
                      else if ("m" === n2 || "M" === n2)
                        this.curCommandType = _.MOVE_TO, this.curCommandRelative = "m" === n2;
                      else if ("l" === n2 || "L" === n2)
                        this.curCommandType = _.LINE_TO, this.curCommandRelative = "l" === n2;
                      else if ("c" === n2 || "C" === n2)
                        this.curCommandType = _.CURVE_TO, this.curCommandRelative = "c" === n2;
                      else if ("s" === n2 || "S" === n2)
                        this.curCommandType = _.SMOOTH_CURVE_TO, this.curCommandRelative = "s" === n2;
                      else if ("q" === n2 || "Q" === n2)
                        this.curCommandType = _.QUAD_TO, this.curCommandRelative = "q" === n2;
                      else if ("t" === n2 || "T" === n2)
                        this.curCommandType = _.SMOOTH_QUAD_TO, this.curCommandRelative = "t" === n2;
                      else {
                        if ("a" !== n2 && "A" !== n2)
                          throw new SyntaxError('Unexpected character "' + n2 + '" at index ' + a2 + ".");
                        this.curCommandType = _.ARC, this.curCommandRelative = "a" === n2;
                      }
                    else
                      r2.push({ type: _.CLOSE_PATH }), this.canParseCommandOrComma = true, this.curCommandType = -1;
                  }
                else
                  this.curNumber = n2, this.curNumberHasDecimal = "." === n2;
            } else
              this.curNumber += n2, this.curNumberHasDecimal = true;
          else
            this.curNumber += n2;
        else
          this.curNumber += n2, this.curNumberHasExp = true;
      else
        this.curNumber += n2, this.curNumberHasExpDigits = this.curNumberHasExp;
    }
    return r2;
  }, e2.prototype.transform = function(t3) {
    return Object.create(this, { parse: { value: function(r2, e3) {
      void 0 === e3 && (e3 = []);
      for (var i2 = 0, a2 = Object.getPrototypeOf(this).parse.call(this, r2); i2 < a2.length; i2++) {
        var n2 = a2[i2], o2 = t3(n2);
        Array.isArray(o2) ? e3.push.apply(e3, o2) : e3.push(o2);
      }
      return e3;
    } } });
  }, e2;
}(l);
var _ = function(t2) {
  function i2(r2) {
    var e2 = t2.call(this) || this;
    return e2.commands = "string" == typeof r2 ? i2.parse(r2) : r2, e2;
  }
  return r(i2, t2), i2.prototype.encode = function() {
    return i2.encode(this.commands);
  }, i2.prototype.getBounds = function() {
    var t3 = u.CALCULATE_BOUNDS();
    return this.transform(t3), t3;
  }, i2.prototype.transform = function(t3) {
    for (var r2 = [], e2 = 0, i3 = this.commands; e2 < i3.length; e2++) {
      var a2 = t3(i3[e2]);
      Array.isArray(a2) ? r2.push.apply(r2, a2) : r2.push(a2);
    }
    return this.commands = r2, this;
  }, i2.encode = function(t3) {
    return e(t3);
  }, i2.parse = function(t3) {
    var r2 = new f(), e2 = [];
    return r2.parse(t3, e2), r2.finish(e2), e2;
  }, i2.CLOSE_PATH = 1, i2.MOVE_TO = 2, i2.HORIZ_LINE_TO = 4, i2.VERT_LINE_TO = 8, i2.LINE_TO = 16, i2.CURVE_TO = 32, i2.SMOOTH_CURVE_TO = 64, i2.QUAD_TO = 128, i2.SMOOTH_QUAD_TO = 256, i2.ARC = 512, i2.LINE_COMMANDS = i2.LINE_TO | i2.HORIZ_LINE_TO | i2.VERT_LINE_TO, i2.DRAWING_COMMANDS = i2.HORIZ_LINE_TO | i2.VERT_LINE_TO | i2.LINE_TO | i2.CURVE_TO | i2.SMOOTH_CURVE_TO | i2.QUAD_TO | i2.SMOOTH_QUAD_TO | i2.ARC, i2;
}(l);
var N = ((O = {})[_.MOVE_TO] = 2, O[_.LINE_TO] = 2, O[_.HORIZ_LINE_TO] = 1, O[_.VERT_LINE_TO] = 1, O[_.CLOSE_PATH] = 0, O[_.QUAD_TO] = 4, O[_.SMOOTH_QUAD_TO] = 2, O[_.CURVE_TO] = 6, O[_.SMOOTH_CURVE_TO] = 4, O[_.ARC] = 7, O);

// node_modules/canvg/lib/index.es.js
function offscreen() {
  var {
    DOMParser: DOMParserFallback
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var preset = {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser: DOMParserFallback,
    createCanvas(width, height) {
      return new OffscreenCanvas(width, height);
    },
    createImage(url) {
      return _asyncToGenerator(function* () {
        var response = yield fetch(url);
        var blob = yield response.blob();
        var img = yield createImageBitmap(blob);
        return img;
      })();
    }
  };
  if (typeof DOMParser !== "undefined" || typeof DOMParserFallback === "undefined") {
    Reflect.deleteProperty(preset, "DOMParser");
  }
  return preset;
}
function node(_ref) {
  var {
    DOMParser: DOMParser2,
    canvas,
    fetch: fetch2
  } = _ref;
  return {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser: DOMParser2,
    fetch: fetch2,
    createCanvas: canvas.createCanvas,
    createImage: canvas.loadImage
  };
}
var index = Object.freeze({
  __proto__: null,
  offscreen,
  node
});
function compressSpaces(str) {
  return str.replace(/(?!\u3000)\s+/gm, " ");
}
function trimLeft(str) {
  return str.replace(/^[\n \t]+/, "");
}
function trimRight(str) {
  return str.replace(/[\n \t]+$/, "");
}
function toNumbers(str) {
  var matches = (str || "").match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) || [];
  return matches.map(parseFloat);
}
var allUppercase = /^[A-Z-]+$/;
function normalizeAttributeName(name) {
  if (allUppercase.test(name)) {
    return name.toLowerCase();
  }
  return name;
}
function parseExternalUrl(url) {
  var urlMatch = /url\(('([^']+)'|"([^"]+)"|([^'")]+))\)/.exec(url) || [];
  return urlMatch[2] || urlMatch[3] || urlMatch[4];
}
function normalizeColor(color) {
  if (!color.startsWith("rgb")) {
    return color;
  }
  var rgbParts = 3;
  var normalizedColor = color.replace(/\d+(\.\d+)?/g, (num, isFloat) => rgbParts-- && isFloat ? String(Math.round(parseFloat(num))) : num);
  return normalizedColor;
}
var attributeRegex = /(\[[^\]]+\])/g;
var idRegex = /(#[^\s+>~.[:]+)/g;
var classRegex = /(\.[^\s+>~.[:]+)/g;
var pseudoElementRegex = /(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi;
var pseudoClassWithBracketsRegex = /(:[\w-]+\([^)]*\))/gi;
var pseudoClassRegex = /(:[^\s+>~.[:]+)/g;
var elementRegex = /([^\s+>~.[:]+)/g;
function findSelectorMatch(selector, regex) {
  var matches = regex.exec(selector);
  if (!matches) {
    return [selector, 0];
  }
  return [selector.replace(regex, " "), matches.length];
}
function getSelectorSpecificity(selector) {
  var specificity = [0, 0, 0];
  var currentSelector = selector.replace(/:not\(([^)]*)\)/g, "     $1 ").replace(/{[\s\S]*/gm, " ");
  var delta = 0;
  [currentSelector, delta] = findSelectorMatch(currentSelector, attributeRegex);
  specificity[1] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, idRegex);
  specificity[0] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, classRegex);
  specificity[1] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoElementRegex);
  specificity[2] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassWithBracketsRegex);
  specificity[1] += delta;
  [currentSelector, delta] = findSelectorMatch(currentSelector, pseudoClassRegex);
  specificity[1] += delta;
  currentSelector = currentSelector.replace(/[*\s+>~]/g, " ").replace(/[#.]/g, " ");
  [currentSelector, delta] = findSelectorMatch(currentSelector, elementRegex);
  specificity[2] += delta;
  return specificity.join("");
}
var PSEUDO_ZERO = 1e-8;
function vectorMagnitude(v2) {
  return Math.sqrt(Math.pow(v2[0], 2) + Math.pow(v2[1], 2));
}
function vectorsRatio(u2, v2) {
  return (u2[0] * v2[0] + u2[1] * v2[1]) / (vectorMagnitude(u2) * vectorMagnitude(v2));
}
function vectorsAngle(u2, v2) {
  return (u2[0] * v2[1] < u2[1] * v2[0] ? -1 : 1) * Math.acos(vectorsRatio(u2, v2));
}
function CB1(t2) {
  return t2 * t2 * t2;
}
function CB2(t2) {
  return 3 * t2 * t2 * (1 - t2);
}
function CB3(t2) {
  return 3 * t2 * (1 - t2) * (1 - t2);
}
function CB4(t2) {
  return (1 - t2) * (1 - t2) * (1 - t2);
}
function QB1(t2) {
  return t2 * t2;
}
function QB2(t2) {
  return 2 * t2 * (1 - t2);
}
function QB3(t2) {
  return (1 - t2) * (1 - t2);
}
var Property = class _Property {
  constructor(document2, name, value) {
    this.document = document2;
    this.name = name;
    this.value = value;
    this.isNormalizedColor = false;
  }
  static empty(document2) {
    return new _Property(document2, "EMPTY", "");
  }
  split() {
    var separator = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : " ";
    var {
      document: document2,
      name
    } = this;
    return compressSpaces(this.getString()).trim().split(separator).map((value) => new _Property(document2, name, value));
  }
  hasValue(zeroIsValue) {
    var {
      value
    } = this;
    return value !== null && value !== "" && (zeroIsValue || value !== 0) && typeof value !== "undefined";
  }
  isString(regexp) {
    var {
      value
    } = this;
    var result = typeof value === "string";
    if (!result || !regexp) {
      return result;
    }
    return regexp.test(value);
  }
  isUrlDefinition() {
    return this.isString(/^url\(/);
  }
  isPixels() {
    if (!this.hasValue()) {
      return false;
    }
    var asString = this.getString();
    switch (true) {
      case asString.endsWith("px"):
      case /^[0-9]+$/.test(asString):
        return true;
      default:
        return false;
    }
  }
  setValue(value) {
    this.value = value;
    return this;
  }
  getValue(def) {
    if (typeof def === "undefined" || this.hasValue()) {
      return this.value;
    }
    return def;
  }
  getNumber(def) {
    if (!this.hasValue()) {
      if (typeof def === "undefined") {
        return 0;
      }
      return parseFloat(def);
    }
    var {
      value
    } = this;
    var n2 = parseFloat(value);
    if (this.isString(/%$/)) {
      n2 /= 100;
    }
    return n2;
  }
  getString(def) {
    if (typeof def === "undefined" || this.hasValue()) {
      return typeof this.value === "undefined" ? "" : String(this.value);
    }
    return String(def);
  }
  getColor(def) {
    var color = this.getString(def);
    if (this.isNormalizedColor) {
      return color;
    }
    this.isNormalizedColor = true;
    color = normalizeColor(color);
    this.value = color;
    return color;
  }
  getDpi() {
    return 96;
  }
  getRem() {
    return this.document.rootEmSize;
  }
  getEm() {
    return this.document.emSize;
  }
  getUnits() {
    return this.getString().replace(/[0-9.-]/g, "");
  }
  getPixels(axisOrIsFontSize) {
    var processPercent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!this.hasValue()) {
      return 0;
    }
    var [axis, isFontSize] = typeof axisOrIsFontSize === "boolean" ? [void 0, axisOrIsFontSize] : [axisOrIsFontSize];
    var {
      viewPort
    } = this.document.screen;
    switch (true) {
      case this.isString(/vmin$/):
        return this.getNumber() / 100 * Math.min(viewPort.computeSize("x"), viewPort.computeSize("y"));
      case this.isString(/vmax$/):
        return this.getNumber() / 100 * Math.max(viewPort.computeSize("x"), viewPort.computeSize("y"));
      case this.isString(/vw$/):
        return this.getNumber() / 100 * viewPort.computeSize("x");
      case this.isString(/vh$/):
        return this.getNumber() / 100 * viewPort.computeSize("y");
      case this.isString(/rem$/):
        return this.getNumber() * this.getRem();
      case this.isString(/em$/):
        return this.getNumber() * this.getEm();
      case this.isString(/ex$/):
        return this.getNumber() * this.getEm() / 2;
      case this.isString(/px$/):
        return this.getNumber();
      case this.isString(/pt$/):
        return this.getNumber() * this.getDpi() * (1 / 72);
      case this.isString(/pc$/):
        return this.getNumber() * 15;
      case this.isString(/cm$/):
        return this.getNumber() * this.getDpi() / 2.54;
      case this.isString(/mm$/):
        return this.getNumber() * this.getDpi() / 25.4;
      case this.isString(/in$/):
        return this.getNumber() * this.getDpi();
      case (this.isString(/%$/) && isFontSize):
        return this.getNumber() * this.getEm();
      case this.isString(/%$/):
        return this.getNumber() * viewPort.computeSize(axis);
      default: {
        var n2 = this.getNumber();
        if (processPercent && n2 < 1) {
          return n2 * viewPort.computeSize(axis);
        }
        return n2;
      }
    }
  }
  getMilliseconds() {
    if (!this.hasValue()) {
      return 0;
    }
    if (this.isString(/ms$/)) {
      return this.getNumber();
    }
    return this.getNumber() * 1e3;
  }
  getRadians() {
    if (!this.hasValue()) {
      return 0;
    }
    switch (true) {
      case this.isString(/deg$/):
        return this.getNumber() * (Math.PI / 180);
      case this.isString(/grad$/):
        return this.getNumber() * (Math.PI / 200);
      case this.isString(/rad$/):
        return this.getNumber();
      default:
        return this.getNumber() * (Math.PI / 180);
    }
  }
  getDefinition() {
    var asString = this.getString();
    var name = /#([^)'"]+)/.exec(asString);
    if (name) {
      name = name[1];
    }
    if (!name) {
      name = asString;
    }
    return this.document.definitions[name];
  }
  getFillStyleDefinition(element, opacity) {
    var def = this.getDefinition();
    if (!def) {
      return null;
    }
    if (typeof def.createGradient === "function") {
      return def.createGradient(this.document.ctx, element, opacity);
    }
    if (typeof def.createPattern === "function") {
      if (def.getHrefAttribute().hasValue()) {
        var patternTransform = def.getAttribute("patternTransform");
        def = def.getHrefAttribute().getDefinition();
        if (patternTransform.hasValue()) {
          def.getAttribute("patternTransform", true).setValue(patternTransform.value);
        }
      }
      return def.createPattern(this.document.ctx, element, opacity);
    }
    return null;
  }
  getTextBaseline() {
    if (!this.hasValue()) {
      return null;
    }
    return _Property.textBaselineMapping[this.getString()];
  }
  addOpacity(opacity) {
    var value = this.getColor();
    var len = value.length;
    var commas = 0;
    for (var i2 = 0; i2 < len; i2++) {
      if (value[i2] === ",") {
        commas++;
      }
      if (commas === 3) {
        break;
      }
    }
    if (opacity.hasValue() && this.isString() && commas !== 3) {
      var color = new import_rgbcolor.default(value);
      if (color.ok) {
        color.alpha = opacity.getNumber();
        value = color.toRGBA();
      }
    }
    return new _Property(this.document, this.name, value);
  }
};
Property.textBaselineMapping = {
  "baseline": "alphabetic",
  "before-edge": "top",
  "text-before-edge": "top",
  "middle": "middle",
  "central": "middle",
  "after-edge": "bottom",
  "text-after-edge": "bottom",
  "ideographic": "ideographic",
  "alphabetic": "alphabetic",
  "hanging": "hanging",
  "mathematical": "alphabetic"
};
var ViewPort = class {
  constructor() {
    this.viewPorts = [];
  }
  clear() {
    this.viewPorts = [];
  }
  setCurrent(width, height) {
    this.viewPorts.push({
      width,
      height
    });
  }
  removeCurrent() {
    this.viewPorts.pop();
  }
  getCurrent() {
    var {
      viewPorts
    } = this;
    return viewPorts[viewPorts.length - 1];
  }
  get width() {
    return this.getCurrent().width;
  }
  get height() {
    return this.getCurrent().height;
  }
  computeSize(d) {
    if (typeof d === "number") {
      return d;
    }
    if (d === "x") {
      return this.width;
    }
    if (d === "y") {
      return this.height;
    }
    return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / Math.sqrt(2);
  }
};
var Point = class _Point {
  constructor(x, y2) {
    this.x = x;
    this.y = y2;
  }
  static parse(point) {
    var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var [x = defaultValue, y2 = defaultValue] = toNumbers(point);
    return new _Point(x, y2);
  }
  static parseScale(scale) {
    var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var [x = defaultValue, y2 = x] = toNumbers(scale);
    return new _Point(x, y2);
  }
  static parsePath(path) {
    var points = toNumbers(path);
    var len = points.length;
    var pathPoints = [];
    for (var i2 = 0; i2 < len; i2 += 2) {
      pathPoints.push(new _Point(points[i2], points[i2 + 1]));
    }
    return pathPoints;
  }
  angleTo(point) {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }
  applyTransform(transform) {
    var {
      x,
      y: y2
    } = this;
    var xp = x * transform[0] + y2 * transform[2] + transform[4];
    var yp = x * transform[1] + y2 * transform[3] + transform[5];
    this.x = xp;
    this.y = yp;
  }
};
var Mouse = class {
  constructor(screen) {
    this.screen = screen;
    this.working = false;
    this.events = [];
    this.eventElements = [];
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }
  isWorking() {
    return this.working;
  }
  start() {
    if (this.working) {
      return;
    }
    var {
      screen,
      onClick,
      onMouseMove
    } = this;
    var canvas = screen.ctx.canvas;
    canvas.onclick = onClick;
    canvas.onmousemove = onMouseMove;
    this.working = true;
  }
  stop() {
    if (!this.working) {
      return;
    }
    var canvas = this.screen.ctx.canvas;
    this.working = false;
    canvas.onclick = null;
    canvas.onmousemove = null;
  }
  hasEvents() {
    return this.working && this.events.length > 0;
  }
  runEvents() {
    if (!this.working) {
      return;
    }
    var {
      screen: document2,
      events,
      eventElements
    } = this;
    var {
      style
    } = document2.ctx.canvas;
    if (style) {
      style.cursor = "";
    }
    events.forEach((_ref, i2) => {
      var {
        run
      } = _ref;
      var element = eventElements[i2];
      while (element) {
        run(element);
        element = element.parent;
      }
    });
    this.events = [];
    this.eventElements = [];
  }
  checkPath(element, ctx) {
    if (!this.working || !ctx) {
      return;
    }
    var {
      events,
      eventElements
    } = this;
    events.forEach((_ref2, i2) => {
      var {
        x,
        y: y2
      } = _ref2;
      if (!eventElements[i2] && ctx.isPointInPath && ctx.isPointInPath(x, y2)) {
        eventElements[i2] = element;
      }
    });
  }
  checkBoundingBox(element, boundingBox) {
    if (!this.working || !boundingBox) {
      return;
    }
    var {
      events,
      eventElements
    } = this;
    events.forEach((_ref3, i2) => {
      var {
        x,
        y: y2
      } = _ref3;
      if (!eventElements[i2] && boundingBox.isPointInBox(x, y2)) {
        eventElements[i2] = element;
      }
    });
  }
  mapXY(x, y2) {
    var {
      window: window2,
      ctx
    } = this.screen;
    var point = new Point(x, y2);
    var element = ctx.canvas;
    while (element) {
      point.x -= element.offsetLeft;
      point.y -= element.offsetTop;
      element = element.offsetParent;
    }
    if (window2.scrollX) {
      point.x += window2.scrollX;
    }
    if (window2.scrollY) {
      point.y += window2.scrollY;
    }
    return point;
  }
  onClick(event) {
    var {
      x,
      y: y2
    } = this.mapXY(event.clientX, event.clientY);
    this.events.push({
      type: "onclick",
      x,
      y: y2,
      run(eventTarget) {
        if (eventTarget.onClick) {
          eventTarget.onClick();
        }
      }
    });
  }
  onMouseMove(event) {
    var {
      x,
      y: y2
    } = this.mapXY(event.clientX, event.clientY);
    this.events.push({
      type: "onmousemove",
      x,
      y: y2,
      run(eventTarget) {
        if (eventTarget.onMouseMove) {
          eventTarget.onMouseMove();
        }
      }
    });
  }
};
var defaultWindow = typeof window !== "undefined" ? window : null;
var defaultFetch$1 = typeof fetch !== "undefined" ? fetch.bind(void 0) : null;
var Screen = class {
  constructor(ctx) {
    var {
      fetch: fetch2 = defaultFetch$1,
      window: window2 = defaultWindow
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.ctx = ctx;
    this.FRAMERATE = 30;
    this.MAX_VIRTUAL_PIXELS = 3e4;
    this.CLIENT_WIDTH = 800;
    this.CLIENT_HEIGHT = 600;
    this.viewPort = new ViewPort();
    this.mouse = new Mouse(this);
    this.animations = [];
    this.waits = [];
    this.frameDuration = 0;
    this.isReadyLock = false;
    this.isFirstRender = true;
    this.intervalId = null;
    this.window = window2;
    this.fetch = fetch2;
  }
  wait(checker) {
    this.waits.push(checker);
  }
  ready() {
    if (!this.readyPromise) {
      return Promise.resolve();
    }
    return this.readyPromise;
  }
  isReady() {
    if (this.isReadyLock) {
      return true;
    }
    var isReadyLock = this.waits.every((_2) => _2());
    if (isReadyLock) {
      this.waits = [];
      if (this.resolveReady) {
        this.resolveReady();
      }
    }
    this.isReadyLock = isReadyLock;
    return isReadyLock;
  }
  setDefaults(ctx) {
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.miterLimit = 4;
  }
  setViewBox(_ref) {
    var {
      document: document2,
      ctx,
      aspectRatio,
      width,
      desiredWidth,
      height,
      desiredHeight,
      minX = 0,
      minY = 0,
      refX,
      refY,
      clip = false,
      clipX = 0,
      clipY = 0
    } = _ref;
    var cleanAspectRatio = compressSpaces(aspectRatio).replace(/^defer\s/, "");
    var [aspectRatioAlign, aspectRatioMeetOrSlice] = cleanAspectRatio.split(" ");
    var align = aspectRatioAlign || "xMidYMid";
    var meetOrSlice = aspectRatioMeetOrSlice || "meet";
    var scaleX = width / desiredWidth;
    var scaleY = height / desiredHeight;
    var scaleMin = Math.min(scaleX, scaleY);
    var scaleMax = Math.max(scaleX, scaleY);
    var finalDesiredWidth = desiredWidth;
    var finalDesiredHeight = desiredHeight;
    if (meetOrSlice === "meet") {
      finalDesiredWidth *= scaleMin;
      finalDesiredHeight *= scaleMin;
    }
    if (meetOrSlice === "slice") {
      finalDesiredWidth *= scaleMax;
      finalDesiredHeight *= scaleMax;
    }
    var refXProp = new Property(document2, "refX", refX);
    var refYProp = new Property(document2, "refY", refY);
    var hasRefs = refXProp.hasValue() && refYProp.hasValue();
    if (hasRefs) {
      ctx.translate(-scaleMin * refXProp.getPixels("x"), -scaleMin * refYProp.getPixels("y"));
    }
    if (clip) {
      var scaledClipX = scaleMin * clipX;
      var scaledClipY = scaleMin * clipY;
      ctx.beginPath();
      ctx.moveTo(scaledClipX, scaledClipY);
      ctx.lineTo(width, scaledClipY);
      ctx.lineTo(width, height);
      ctx.lineTo(scaledClipX, height);
      ctx.closePath();
      ctx.clip();
    }
    if (!hasRefs) {
      var isMeetMinY = meetOrSlice === "meet" && scaleMin === scaleY;
      var isSliceMaxY = meetOrSlice === "slice" && scaleMax === scaleY;
      var isMeetMinX = meetOrSlice === "meet" && scaleMin === scaleX;
      var isSliceMaxX = meetOrSlice === "slice" && scaleMax === scaleX;
      if (align.startsWith("xMid") && (isMeetMinY || isSliceMaxY)) {
        ctx.translate(width / 2 - finalDesiredWidth / 2, 0);
      }
      if (align.endsWith("YMid") && (isMeetMinX || isSliceMaxX)) {
        ctx.translate(0, height / 2 - finalDesiredHeight / 2);
      }
      if (align.startsWith("xMax") && (isMeetMinY || isSliceMaxY)) {
        ctx.translate(width - finalDesiredWidth, 0);
      }
      if (align.endsWith("YMax") && (isMeetMinX || isSliceMaxX)) {
        ctx.translate(0, height - finalDesiredHeight);
      }
    }
    switch (true) {
      case align === "none":
        ctx.scale(scaleX, scaleY);
        break;
      case meetOrSlice === "meet":
        ctx.scale(scaleMin, scaleMin);
        break;
      case meetOrSlice === "slice":
        ctx.scale(scaleMax, scaleMax);
        break;
    }
    ctx.translate(-minX, -minY);
  }
  start(element) {
    var {
      enableRedraw = false,
      ignoreMouse = false,
      ignoreAnimation = false,
      ignoreDimensions = false,
      ignoreClear = false,
      forceRedraw,
      scaleWidth,
      scaleHeight,
      offsetX,
      offsetY
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var {
      FRAMERATE,
      mouse
    } = this;
    var frameDuration = 1e3 / FRAMERATE;
    this.frameDuration = frameDuration;
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
    if (this.isReady()) {
      this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
    }
    if (!enableRedraw) {
      return;
    }
    var now = Date.now();
    var then = now;
    var delta = 0;
    var tick = () => {
      now = Date.now();
      delta = now - then;
      if (delta >= frameDuration) {
        then = now - delta % frameDuration;
        if (this.shouldUpdate(ignoreAnimation, forceRedraw)) {
          this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
          mouse.runEvents();
        }
      }
      this.intervalId = (0, import_raf.default)(tick);
    };
    if (!ignoreMouse) {
      mouse.start();
    }
    this.intervalId = (0, import_raf.default)(tick);
  }
  stop() {
    if (this.intervalId) {
      import_raf.default.cancel(this.intervalId);
      this.intervalId = null;
    }
    this.mouse.stop();
  }
  shouldUpdate(ignoreAnimation, forceRedraw) {
    if (!ignoreAnimation) {
      var {
        frameDuration
      } = this;
      var shouldUpdate = this.animations.reduce((shouldUpdate2, animation) => animation.update(frameDuration) || shouldUpdate2, false);
      if (shouldUpdate) {
        return true;
      }
    }
    if (typeof forceRedraw === "function" && forceRedraw()) {
      return true;
    }
    if (!this.isReadyLock && this.isReady()) {
      return true;
    }
    if (this.mouse.hasEvents()) {
      return true;
    }
    return false;
  }
  render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY) {
    var {
      CLIENT_WIDTH,
      CLIENT_HEIGHT,
      viewPort,
      ctx,
      isFirstRender
    } = this;
    var canvas = ctx.canvas;
    viewPort.clear();
    if (canvas.width && canvas.height) {
      viewPort.setCurrent(canvas.width, canvas.height);
    } else {
      viewPort.setCurrent(CLIENT_WIDTH, CLIENT_HEIGHT);
    }
    var widthStyle = element.getStyle("width");
    var heightStyle = element.getStyle("height");
    if (!ignoreDimensions && (isFirstRender || typeof scaleWidth !== "number" && typeof scaleHeight !== "number")) {
      if (widthStyle.hasValue()) {
        canvas.width = widthStyle.getPixels("x");
        if (canvas.style) {
          canvas.style.width = "".concat(canvas.width, "px");
        }
      }
      if (heightStyle.hasValue()) {
        canvas.height = heightStyle.getPixels("y");
        if (canvas.style) {
          canvas.style.height = "".concat(canvas.height, "px");
        }
      }
    }
    var cWidth = canvas.clientWidth || canvas.width;
    var cHeight = canvas.clientHeight || canvas.height;
    if (ignoreDimensions && widthStyle.hasValue() && heightStyle.hasValue()) {
      cWidth = widthStyle.getPixels("x");
      cHeight = heightStyle.getPixels("y");
    }
    viewPort.setCurrent(cWidth, cHeight);
    if (typeof offsetX === "number") {
      element.getAttribute("x", true).setValue(offsetX);
    }
    if (typeof offsetY === "number") {
      element.getAttribute("y", true).setValue(offsetY);
    }
    if (typeof scaleWidth === "number" || typeof scaleHeight === "number") {
      var viewBox = toNumbers(element.getAttribute("viewBox").getString());
      var xRatio = 0;
      var yRatio = 0;
      if (typeof scaleWidth === "number") {
        var _widthStyle = element.getStyle("width");
        if (_widthStyle.hasValue()) {
          xRatio = _widthStyle.getPixels("x") / scaleWidth;
        } else if (!isNaN(viewBox[2])) {
          xRatio = viewBox[2] / scaleWidth;
        }
      }
      if (typeof scaleHeight === "number") {
        var _heightStyle = element.getStyle("height");
        if (_heightStyle.hasValue()) {
          yRatio = _heightStyle.getPixels("y") / scaleHeight;
        } else if (!isNaN(viewBox[3])) {
          yRatio = viewBox[3] / scaleHeight;
        }
      }
      if (!xRatio) {
        xRatio = yRatio;
      }
      if (!yRatio) {
        yRatio = xRatio;
      }
      element.getAttribute("width", true).setValue(scaleWidth);
      element.getAttribute("height", true).setValue(scaleHeight);
      var transformStyle = element.getStyle("transform", true, true);
      transformStyle.setValue("".concat(transformStyle.getString(), " scale(").concat(1 / xRatio, ", ").concat(1 / yRatio, ")"));
    }
    if (!ignoreClear) {
      ctx.clearRect(0, 0, cWidth, cHeight);
    }
    element.render(ctx);
    if (isFirstRender) {
      this.isFirstRender = false;
    }
  }
};
Screen.defaultWindow = defaultWindow;
Screen.defaultFetch = defaultFetch$1;
var {
  defaultFetch
} = Screen;
var DefaultDOMParser = typeof DOMParser !== "undefined" ? DOMParser : null;
var Parser = class {
  constructor() {
    var {
      fetch: fetch2 = defaultFetch,
      DOMParser: DOMParser2 = DefaultDOMParser
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.fetch = fetch2;
    this.DOMParser = DOMParser2;
  }
  parse(resource) {
    var _this = this;
    return _asyncToGenerator(function* () {
      if (resource.startsWith("<")) {
        return _this.parseFromString(resource);
      }
      return _this.load(resource);
    })();
  }
  parseFromString(xml) {
    var parser = new this.DOMParser();
    try {
      return this.checkDocument(parser.parseFromString(xml, "image/svg+xml"));
    } catch (err) {
      return this.checkDocument(parser.parseFromString(xml, "text/xml"));
    }
  }
  checkDocument(document2) {
    var parserError = document2.getElementsByTagName("parsererror")[0];
    if (parserError) {
      throw new Error(parserError.textContent);
    }
    return document2;
  }
  load(url) {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      var response = yield _this2.fetch(url);
      var xml = yield response.text();
      return _this2.parseFromString(xml);
    })();
  }
};
var Translate = class {
  constructor(_2, point) {
    this.type = "translate";
    this.point = null;
    this.point = Point.parse(point);
  }
  apply(ctx) {
    var {
      x,
      y: y2
    } = this.point;
    ctx.translate(x || 0, y2 || 0);
  }
  unapply(ctx) {
    var {
      x,
      y: y2
    } = this.point;
    ctx.translate(-1 * x || 0, -1 * y2 || 0);
  }
  applyToPoint(point) {
    var {
      x,
      y: y2
    } = this.point;
    point.applyTransform([1, 0, 0, 1, x || 0, y2 || 0]);
  }
};
var Rotate = class {
  constructor(document2, rotate, transformOrigin) {
    this.type = "rotate";
    this.angle = null;
    this.originX = null;
    this.originY = null;
    this.cx = 0;
    this.cy = 0;
    var numbers = toNumbers(rotate);
    this.angle = new Property(document2, "angle", numbers[0]);
    this.originX = transformOrigin[0];
    this.originY = transformOrigin[1];
    this.cx = numbers[1] || 0;
    this.cy = numbers[2] || 0;
  }
  apply(ctx) {
    var {
      cx,
      cy,
      originX,
      originY,
      angle
    } = this;
    var tx = cx + originX.getPixels("x");
    var ty = cy + originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.rotate(angle.getRadians());
    ctx.translate(-tx, -ty);
  }
  unapply(ctx) {
    var {
      cx,
      cy,
      originX,
      originY,
      angle
    } = this;
    var tx = cx + originX.getPixels("x");
    var ty = cy + originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.rotate(-1 * angle.getRadians());
    ctx.translate(-tx, -ty);
  }
  applyToPoint(point) {
    var {
      cx,
      cy,
      angle
    } = this;
    var rad = angle.getRadians();
    point.applyTransform([
      1,
      0,
      0,
      1,
      cx || 0,
      cy || 0
      // this.p.y
    ]);
    point.applyTransform([Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad), 0, 0]);
    point.applyTransform([
      1,
      0,
      0,
      1,
      -cx || 0,
      -cy || 0
      // -this.p.y
    ]);
  }
};
var Scale = class {
  constructor(_2, scale, transformOrigin) {
    this.type = "scale";
    this.scale = null;
    this.originX = null;
    this.originY = null;
    var scaleSize = Point.parseScale(scale);
    if (scaleSize.x === 0 || scaleSize.y === 0) {
      scaleSize.x = PSEUDO_ZERO;
      scaleSize.y = PSEUDO_ZERO;
    }
    this.scale = scaleSize;
    this.originX = transformOrigin[0];
    this.originY = transformOrigin[1];
  }
  apply(ctx) {
    var {
      scale: {
        x,
        y: y2
      },
      originX,
      originY
    } = this;
    var tx = originX.getPixels("x");
    var ty = originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.scale(x, y2 || x);
    ctx.translate(-tx, -ty);
  }
  unapply(ctx) {
    var {
      scale: {
        x,
        y: y2
      },
      originX,
      originY
    } = this;
    var tx = originX.getPixels("x");
    var ty = originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.scale(1 / x, 1 / y2 || x);
    ctx.translate(-tx, -ty);
  }
  applyToPoint(point) {
    var {
      x,
      y: y2
    } = this.scale;
    point.applyTransform([x || 0, 0, 0, y2 || 0, 0, 0]);
  }
};
var Matrix = class {
  constructor(_2, matrix, transformOrigin) {
    this.type = "matrix";
    this.matrix = [];
    this.originX = null;
    this.originY = null;
    this.matrix = toNumbers(matrix);
    this.originX = transformOrigin[0];
    this.originY = transformOrigin[1];
  }
  apply(ctx) {
    var {
      originX,
      originY,
      matrix
    } = this;
    var tx = originX.getPixels("x");
    var ty = originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    ctx.translate(-tx, -ty);
  }
  unapply(ctx) {
    var {
      originX,
      originY,
      matrix
    } = this;
    var a2 = matrix[0];
    var b = matrix[2];
    var c3 = matrix[4];
    var d = matrix[1];
    var e2 = matrix[3];
    var f2 = matrix[5];
    var g = 0;
    var h2 = 0;
    var i2 = 1;
    var det = 1 / (a2 * (e2 * i2 - f2 * h2) - b * (d * i2 - f2 * g) + c3 * (d * h2 - e2 * g));
    var tx = originX.getPixels("x");
    var ty = originY.getPixels("y");
    ctx.translate(tx, ty);
    ctx.transform(det * (e2 * i2 - f2 * h2), det * (f2 * g - d * i2), det * (c3 * h2 - b * i2), det * (a2 * i2 - c3 * g), det * (b * f2 - c3 * e2), det * (c3 * d - a2 * f2));
    ctx.translate(-tx, -ty);
  }
  applyToPoint(point) {
    point.applyTransform(this.matrix);
  }
};
var Skew = class extends Matrix {
  constructor(document2, skew, transformOrigin) {
    super(document2, skew, transformOrigin);
    this.type = "skew";
    this.angle = null;
    this.angle = new Property(document2, "angle", skew);
  }
};
var SkewX = class extends Skew {
  constructor(document2, skew, transformOrigin) {
    super(document2, skew, transformOrigin);
    this.type = "skewX";
    this.matrix = [1, 0, Math.tan(this.angle.getRadians()), 1, 0, 0];
  }
};
var SkewY = class extends Skew {
  constructor(document2, skew, transformOrigin) {
    super(document2, skew, transformOrigin);
    this.type = "skewY";
    this.matrix = [1, Math.tan(this.angle.getRadians()), 0, 1, 0, 0];
  }
};
function parseTransforms(transform) {
  return compressSpaces(transform).trim().replace(/\)([a-zA-Z])/g, ") $1").replace(/\)(\s?,\s?)/g, ") ").split(/\s(?=[a-z])/);
}
function parseTransform(transform) {
  var [type, value] = transform.split("(");
  return [type.trim(), value.trim().replace(")", "")];
}
var Transform = class _Transform {
  constructor(document2, transform, transformOrigin) {
    this.document = document2;
    this.transforms = [];
    var data = parseTransforms(transform);
    data.forEach((transform2) => {
      if (transform2 === "none") {
        return;
      }
      var [type, value] = parseTransform(transform2);
      var TransformType = _Transform.transformTypes[type];
      if (typeof TransformType !== "undefined") {
        this.transforms.push(new TransformType(this.document, value, transformOrigin));
      }
    });
  }
  static fromElement(document2, element) {
    var transformStyle = element.getStyle("transform", false, true);
    var [transformOriginXProperty, transformOriginYProperty = transformOriginXProperty] = element.getStyle("transform-origin", false, true).split();
    var transformOrigin = [transformOriginXProperty, transformOriginYProperty];
    if (transformStyle.hasValue()) {
      return new _Transform(document2, transformStyle.getString(), transformOrigin);
    }
    return null;
  }
  apply(ctx) {
    var {
      transforms
    } = this;
    var len = transforms.length;
    for (var i2 = 0; i2 < len; i2++) {
      transforms[i2].apply(ctx);
    }
  }
  unapply(ctx) {
    var {
      transforms
    } = this;
    var len = transforms.length;
    for (var i2 = len - 1; i2 >= 0; i2--) {
      transforms[i2].unapply(ctx);
    }
  }
  // TODO: applyToPoint unused ... remove?
  applyToPoint(point) {
    var {
      transforms
    } = this;
    var len = transforms.length;
    for (var i2 = 0; i2 < len; i2++) {
      transforms[i2].applyToPoint(point);
    }
  }
};
Transform.transformTypes = {
  translate: Translate,
  rotate: Rotate,
  scale: Scale,
  matrix: Matrix,
  skewX: SkewX,
  skewY: SkewY
};
var Element = class _Element {
  constructor(document2, node2) {
    var captureTextNodes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    this.document = document2;
    this.node = node2;
    this.captureTextNodes = captureTextNodes;
    this.attributes = {};
    this.styles = {};
    this.stylesSpecificity = {};
    this.animationFrozen = false;
    this.animationFrozenValue = "";
    this.parent = null;
    this.children = [];
    if (!node2 || node2.nodeType !== 1) {
      return;
    }
    Array.from(node2.attributes).forEach((attribute) => {
      var nodeName = normalizeAttributeName(attribute.nodeName);
      this.attributes[nodeName] = new Property(document2, nodeName, attribute.value);
    });
    this.addStylesFromStyleDefinition();
    if (this.getAttribute("style").hasValue()) {
      var styles = this.getAttribute("style").getString().split(";").map((_2) => _2.trim());
      styles.forEach((style) => {
        if (!style) {
          return;
        }
        var [name, value] = style.split(":").map((_2) => _2.trim());
        this.styles[name] = new Property(document2, name, value);
      });
    }
    var {
      definitions
    } = document2;
    var id = this.getAttribute("id");
    if (id.hasValue()) {
      if (!definitions[id.getString()]) {
        definitions[id.getString()] = this;
      }
    }
    Array.from(node2.childNodes).forEach((childNode) => {
      if (childNode.nodeType === 1) {
        this.addChild(childNode);
      } else if (captureTextNodes && (childNode.nodeType === 3 || childNode.nodeType === 4)) {
        var textNode = document2.createTextNode(childNode);
        if (textNode.getText().length > 0) {
          this.addChild(textNode);
        }
      }
    });
  }
  getAttribute(name) {
    var createIfNotExists = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var attr = this.attributes[name];
    if (!attr && createIfNotExists) {
      var _attr = new Property(this.document, name, "");
      this.attributes[name] = _attr;
      return _attr;
    }
    return attr || Property.empty(this.document);
  }
  getHrefAttribute() {
    for (var key in this.attributes) {
      if (key === "href" || key.endsWith(":href")) {
        return this.attributes[key];
      }
    }
    return Property.empty(this.document);
  }
  getStyle(name) {
    var createIfNotExists = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var skipAncestors = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var style = this.styles[name];
    if (style) {
      return style;
    }
    var attr = this.getAttribute(name);
    if (attr !== null && attr !== void 0 && attr.hasValue()) {
      this.styles[name] = attr;
      return attr;
    }
    if (!skipAncestors) {
      var {
        parent
      } = this;
      if (parent) {
        var parentStyle = parent.getStyle(name);
        if (parentStyle !== null && parentStyle !== void 0 && parentStyle.hasValue()) {
          return parentStyle;
        }
      }
    }
    if (createIfNotExists) {
      var _style = new Property(this.document, name, "");
      this.styles[name] = _style;
      return _style;
    }
    return style || Property.empty(this.document);
  }
  render(ctx) {
    if (this.getStyle("display").getString() === "none" || this.getStyle("visibility").getString() === "hidden") {
      return;
    }
    ctx.save();
    if (this.getStyle("mask").hasValue()) {
      var mask = this.getStyle("mask").getDefinition();
      if (mask) {
        this.applyEffects(ctx);
        mask.apply(ctx, this);
      }
    } else if (this.getStyle("filter").getValue("none") !== "none") {
      var filter = this.getStyle("filter").getDefinition();
      if (filter) {
        this.applyEffects(ctx);
        filter.apply(ctx, this);
      }
    } else {
      this.setContext(ctx);
      this.renderChildren(ctx);
      this.clearContext(ctx);
    }
    ctx.restore();
  }
  setContext(_2) {
  }
  applyEffects(ctx) {
    var transform = Transform.fromElement(this.document, this);
    if (transform) {
      transform.apply(ctx);
    }
    var clipPathStyleProp = this.getStyle("clip-path", false, true);
    if (clipPathStyleProp.hasValue()) {
      var clip = clipPathStyleProp.getDefinition();
      if (clip) {
        clip.apply(ctx);
      }
    }
  }
  clearContext(_2) {
  }
  renderChildren(ctx) {
    this.children.forEach((child) => {
      child.render(ctx);
    });
  }
  addChild(childNode) {
    var child = childNode instanceof _Element ? childNode : this.document.createElement(childNode);
    child.parent = this;
    if (!_Element.ignoreChildTypes.includes(child.type)) {
      this.children.push(child);
    }
  }
  matchesSelector(selector) {
    var _node$getAttribute;
    var {
      node: node2
    } = this;
    if (typeof node2.matches === "function") {
      return node2.matches(selector);
    }
    var styleClasses = (_node$getAttribute = node2.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node2, "class");
    if (!styleClasses || styleClasses === "") {
      return false;
    }
    return styleClasses.split(" ").some((styleClass) => ".".concat(styleClass) === selector);
  }
  addStylesFromStyleDefinition() {
    var {
      styles,
      stylesSpecificity
    } = this.document;
    for (var selector in styles) {
      if (!selector.startsWith("@") && this.matchesSelector(selector)) {
        var style = styles[selector];
        var specificity = stylesSpecificity[selector];
        if (style) {
          for (var name in style) {
            var existingSpecificity = this.stylesSpecificity[name];
            if (typeof existingSpecificity === "undefined") {
              existingSpecificity = "000";
            }
            if (specificity >= existingSpecificity) {
              this.styles[name] = style[name];
              this.stylesSpecificity[name] = specificity;
            }
          }
        }
      }
    }
  }
  removeStyles(element, ignoreStyles) {
    var toRestore = ignoreStyles.reduce((toRestore2, name) => {
      var styleProp = element.getStyle(name);
      if (!styleProp.hasValue()) {
        return toRestore2;
      }
      var value = styleProp.getString();
      styleProp.setValue("");
      return [...toRestore2, [name, value]];
    }, []);
    return toRestore;
  }
  restoreStyles(element, styles) {
    styles.forEach((_ref) => {
      var [name, value] = _ref;
      element.getStyle(name, true).setValue(value);
    });
  }
  isFirstChild() {
    var _this$parent;
    return ((_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.children.indexOf(this)) === 0;
  }
};
Element.ignoreChildTypes = ["title"];
var UnknownElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
  }
};
function wrapFontFamily(fontFamily) {
  var trimmed = fontFamily.trim();
  return /^('|")/.test(trimmed) ? trimmed : '"'.concat(trimmed, '"');
}
function prepareFontFamily(fontFamily) {
  return typeof process === "undefined" ? fontFamily : fontFamily.trim().split(",").map(wrapFontFamily).join(",");
}
function prepareFontStyle(fontStyle) {
  if (!fontStyle) {
    return "";
  }
  var targetFontStyle = fontStyle.trim().toLowerCase();
  switch (targetFontStyle) {
    case "normal":
    case "italic":
    case "oblique":
    case "inherit":
    case "initial":
    case "unset":
      return targetFontStyle;
    default:
      if (/^oblique\s+(-|)\d+deg$/.test(targetFontStyle)) {
        return targetFontStyle;
      }
      return "";
  }
}
function prepareFontWeight(fontWeight) {
  if (!fontWeight) {
    return "";
  }
  var targetFontWeight = fontWeight.trim().toLowerCase();
  switch (targetFontWeight) {
    case "normal":
    case "bold":
    case "lighter":
    case "bolder":
    case "inherit":
    case "initial":
    case "unset":
      return targetFontWeight;
    default:
      if (/^[\d.]+$/.test(targetFontWeight)) {
        return targetFontWeight;
      }
      return "";
  }
}
var Font = class _Font {
  constructor(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
    var inheritFont = inherit ? typeof inherit === "string" ? _Font.parse(inherit) : inherit : {};
    this.fontFamily = fontFamily || inheritFont.fontFamily;
    this.fontSize = fontSize || inheritFont.fontSize;
    this.fontStyle = fontStyle || inheritFont.fontStyle;
    this.fontWeight = fontWeight || inheritFont.fontWeight;
    this.fontVariant = fontVariant || inheritFont.fontVariant;
  }
  static parse() {
    var font = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var inherit = arguments.length > 1 ? arguments[1] : void 0;
    var fontStyle = "";
    var fontVariant = "";
    var fontWeight = "";
    var fontSize = "";
    var fontFamily = "";
    var parts = compressSpaces(font).trim().split(" ");
    var set = {
      fontSize: false,
      fontStyle: false,
      fontWeight: false,
      fontVariant: false
    };
    parts.forEach((part) => {
      switch (true) {
        case (!set.fontStyle && _Font.styles.includes(part)):
          if (part !== "inherit") {
            fontStyle = part;
          }
          set.fontStyle = true;
          break;
        case (!set.fontVariant && _Font.variants.includes(part)):
          if (part !== "inherit") {
            fontVariant = part;
          }
          set.fontStyle = true;
          set.fontVariant = true;
          break;
        case (!set.fontWeight && _Font.weights.includes(part)):
          if (part !== "inherit") {
            fontWeight = part;
          }
          set.fontStyle = true;
          set.fontVariant = true;
          set.fontWeight = true;
          break;
        case !set.fontSize:
          if (part !== "inherit") {
            [fontSize] = part.split("/");
          }
          set.fontStyle = true;
          set.fontVariant = true;
          set.fontWeight = true;
          set.fontSize = true;
          break;
        default:
          if (part !== "inherit") {
            fontFamily += part;
          }
      }
    });
    return new _Font(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit);
  }
  toString() {
    return [
      prepareFontStyle(this.fontStyle),
      this.fontVariant,
      prepareFontWeight(this.fontWeight),
      this.fontSize,
      // Wrap fontFamily only on nodejs and only for canvas.ctx
      prepareFontFamily(this.fontFamily)
    ].join(" ").trim();
  }
};
Font.styles = "normal|italic|oblique|inherit";
Font.variants = "normal|small-caps|inherit";
Font.weights = "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit";
var BoundingBox = class {
  constructor() {
    var x1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Number.NaN;
    var y1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.NaN;
    var x2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Number.NaN;
    var y2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Number.NaN;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.addPoint(x1, y1);
    this.addPoint(x2, y2);
  }
  get x() {
    return this.x1;
  }
  get y() {
    return this.y1;
  }
  get width() {
    return this.x2 - this.x1;
  }
  get height() {
    return this.y2 - this.y1;
  }
  addPoint(x, y2) {
    if (typeof x !== "undefined") {
      if (isNaN(this.x1) || isNaN(this.x2)) {
        this.x1 = x;
        this.x2 = x;
      }
      if (x < this.x1) {
        this.x1 = x;
      }
      if (x > this.x2) {
        this.x2 = x;
      }
    }
    if (typeof y2 !== "undefined") {
      if (isNaN(this.y1) || isNaN(this.y2)) {
        this.y1 = y2;
        this.y2 = y2;
      }
      if (y2 < this.y1) {
        this.y1 = y2;
      }
      if (y2 > this.y2) {
        this.y2 = y2;
      }
    }
  }
  addX(x) {
    this.addPoint(x, null);
  }
  addY(y2) {
    this.addPoint(null, y2);
  }
  addBoundingBox(boundingBox) {
    if (!boundingBox) {
      return;
    }
    var {
      x1,
      y1,
      x2,
      y2
    } = boundingBox;
    this.addPoint(x1, y1);
    this.addPoint(x2, y2);
  }
  sumCubic(t2, p0, p1, p2, p3) {
    return Math.pow(1 - t2, 3) * p0 + 3 * Math.pow(1 - t2, 2) * t2 * p1 + 3 * (1 - t2) * Math.pow(t2, 2) * p2 + Math.pow(t2, 3) * p3;
  }
  bezierCurveAdd(forX, p0, p1, p2, p3) {
    var b = 6 * p0 - 12 * p1 + 6 * p2;
    var a2 = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
    var c3 = 3 * p1 - 3 * p0;
    if (a2 === 0) {
      if (b === 0) {
        return;
      }
      var t2 = -c3 / b;
      if (0 < t2 && t2 < 1) {
        if (forX) {
          this.addX(this.sumCubic(t2, p0, p1, p2, p3));
        } else {
          this.addY(this.sumCubic(t2, p0, p1, p2, p3));
        }
      }
      return;
    }
    var b2ac = Math.pow(b, 2) - 4 * c3 * a2;
    if (b2ac < 0) {
      return;
    }
    var t1 = (-b + Math.sqrt(b2ac)) / (2 * a2);
    if (0 < t1 && t1 < 1) {
      if (forX) {
        this.addX(this.sumCubic(t1, p0, p1, p2, p3));
      } else {
        this.addY(this.sumCubic(t1, p0, p1, p2, p3));
      }
    }
    var t22 = (-b - Math.sqrt(b2ac)) / (2 * a2);
    if (0 < t22 && t22 < 1) {
      if (forX) {
        this.addX(this.sumCubic(t22, p0, p1, p2, p3));
      } else {
        this.addY(this.sumCubic(t22, p0, p1, p2, p3));
      }
    }
  }
  // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
  addBezierCurve(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
    this.addPoint(p0x, p0y);
    this.addPoint(p3x, p3y);
    this.bezierCurveAdd(true, p0x, p1x, p2x, p3x);
    this.bezierCurveAdd(false, p0y, p1y, p2y, p3y);
  }
  addQuadraticCurve(p0x, p0y, p1x, p1y, p2x, p2y) {
    var cp1x = p0x + 2 / 3 * (p1x - p0x);
    var cp1y = p0y + 2 / 3 * (p1y - p0y);
    var cp2x = cp1x + 1 / 3 * (p2x - p0x);
    var cp2y = cp1y + 1 / 3 * (p2y - p0y);
    this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
  }
  isPointInBox(x, y2) {
    var {
      x1,
      y1,
      x2,
      y2: y22
    } = this;
    return x1 <= x && x <= x2 && y1 <= y2 && y2 <= y22;
  }
};
var PathParser = class extends _ {
  constructor(path) {
    super(path.replace(/([+\-.])\s+/gm, "$1").replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, ""));
    this.control = null;
    this.start = null;
    this.current = null;
    this.command = null;
    this.commands = this.commands;
    this.i = -1;
    this.previousCommand = null;
    this.points = [];
    this.angles = [];
  }
  reset() {
    this.i = -1;
    this.command = null;
    this.previousCommand = null;
    this.start = new Point(0, 0);
    this.control = new Point(0, 0);
    this.current = new Point(0, 0);
    this.points = [];
    this.angles = [];
  }
  isEnd() {
    var {
      i: i2,
      commands
    } = this;
    return i2 >= commands.length - 1;
  }
  next() {
    var command = this.commands[++this.i];
    this.previousCommand = this.command;
    this.command = command;
    return command;
  }
  getPoint() {
    var xProp = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "x";
    var yProp = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "y";
    var point = new Point(this.command[xProp], this.command[yProp]);
    return this.makeAbsolute(point);
  }
  getAsControlPoint(xProp, yProp) {
    var point = this.getPoint(xProp, yProp);
    this.control = point;
    return point;
  }
  getAsCurrentPoint(xProp, yProp) {
    var point = this.getPoint(xProp, yProp);
    this.current = point;
    return point;
  }
  getReflectedControlPoint() {
    var previousCommand = this.previousCommand.type;
    if (previousCommand !== _.CURVE_TO && previousCommand !== _.SMOOTH_CURVE_TO && previousCommand !== _.QUAD_TO && previousCommand !== _.SMOOTH_QUAD_TO) {
      return this.current;
    }
    var {
      current: {
        x: cx,
        y: cy
      },
      control: {
        x: ox,
        y: oy
      }
    } = this;
    var point = new Point(2 * cx - ox, 2 * cy - oy);
    return point;
  }
  makeAbsolute(point) {
    if (this.command.relative) {
      var {
        x,
        y: y2
      } = this.current;
      point.x += x;
      point.y += y2;
    }
    return point;
  }
  addMarker(point, from, priorTo) {
    var {
      points,
      angles
    } = this;
    if (priorTo && angles.length > 0 && !angles[angles.length - 1]) {
      angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo);
    }
    this.addMarkerAngle(point, from ? from.angleTo(point) : null);
  }
  addMarkerAngle(point, angle) {
    this.points.push(point);
    this.angles.push(angle);
  }
  getMarkerPoints() {
    return this.points;
  }
  getMarkerAngles() {
    var {
      angles
    } = this;
    var len = angles.length;
    for (var i2 = 0; i2 < len; i2++) {
      if (!angles[i2]) {
        for (var j = i2 + 1; j < len; j++) {
          if (angles[j]) {
            angles[i2] = angles[j];
            break;
          }
        }
      }
    }
    return angles;
  }
};
var RenderedElement = class extends Element {
  constructor() {
    super(...arguments);
    this.modifiedEmSizeStack = false;
  }
  calculateOpacity() {
    var opacity = 1;
    var element = this;
    while (element) {
      var opacityStyle = element.getStyle("opacity", false, true);
      if (opacityStyle.hasValue(true)) {
        opacity *= opacityStyle.getNumber();
      }
      element = element.parent;
    }
    return opacity;
  }
  setContext(ctx) {
    var fromMeasure = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!fromMeasure) {
      var fillStyleProp = this.getStyle("fill");
      var fillOpacityStyleProp = this.getStyle("fill-opacity");
      var strokeStyleProp = this.getStyle("stroke");
      var strokeOpacityProp = this.getStyle("stroke-opacity");
      if (fillStyleProp.isUrlDefinition()) {
        var fillStyle = fillStyleProp.getFillStyleDefinition(this, fillOpacityStyleProp);
        if (fillStyle) {
          ctx.fillStyle = fillStyle;
        }
      } else if (fillStyleProp.hasValue()) {
        if (fillStyleProp.getString() === "currentColor") {
          fillStyleProp.setValue(this.getStyle("color").getColor());
        }
        var _fillStyle = fillStyleProp.getColor();
        if (_fillStyle !== "inherit") {
          ctx.fillStyle = _fillStyle === "none" ? "rgba(0,0,0,0)" : _fillStyle;
        }
      }
      if (fillOpacityStyleProp.hasValue()) {
        var _fillStyle2 = new Property(this.document, "fill", ctx.fillStyle).addOpacity(fillOpacityStyleProp).getColor();
        ctx.fillStyle = _fillStyle2;
      }
      if (strokeStyleProp.isUrlDefinition()) {
        var strokeStyle = strokeStyleProp.getFillStyleDefinition(this, strokeOpacityProp);
        if (strokeStyle) {
          ctx.strokeStyle = strokeStyle;
        }
      } else if (strokeStyleProp.hasValue()) {
        if (strokeStyleProp.getString() === "currentColor") {
          strokeStyleProp.setValue(this.getStyle("color").getColor());
        }
        var _strokeStyle = strokeStyleProp.getString();
        if (_strokeStyle !== "inherit") {
          ctx.strokeStyle = _strokeStyle === "none" ? "rgba(0,0,0,0)" : _strokeStyle;
        }
      }
      if (strokeOpacityProp.hasValue()) {
        var _strokeStyle2 = new Property(this.document, "stroke", ctx.strokeStyle).addOpacity(strokeOpacityProp).getString();
        ctx.strokeStyle = _strokeStyle2;
      }
      var strokeWidthStyleProp = this.getStyle("stroke-width");
      if (strokeWidthStyleProp.hasValue()) {
        var newLineWidth = strokeWidthStyleProp.getPixels();
        ctx.lineWidth = !newLineWidth ? PSEUDO_ZERO : newLineWidth;
      }
      var strokeLinecapStyleProp = this.getStyle("stroke-linecap");
      var strokeLinejoinStyleProp = this.getStyle("stroke-linejoin");
      var strokeMiterlimitProp = this.getStyle("stroke-miterlimit");
      var strokeDasharrayStyleProp = this.getStyle("stroke-dasharray");
      var strokeDashoffsetProp = this.getStyle("stroke-dashoffset");
      if (strokeLinecapStyleProp.hasValue()) {
        ctx.lineCap = strokeLinecapStyleProp.getString();
      }
      if (strokeLinejoinStyleProp.hasValue()) {
        ctx.lineJoin = strokeLinejoinStyleProp.getString();
      }
      if (strokeMiterlimitProp.hasValue()) {
        ctx.miterLimit = strokeMiterlimitProp.getNumber();
      }
      if (strokeDasharrayStyleProp.hasValue() && strokeDasharrayStyleProp.getString() !== "none") {
        var gaps = toNumbers(strokeDasharrayStyleProp.getString());
        if (typeof ctx.setLineDash !== "undefined") {
          ctx.setLineDash(gaps);
        } else if (typeof ctx.webkitLineDash !== "undefined") {
          ctx.webkitLineDash = gaps;
        } else if (typeof ctx.mozDash !== "undefined" && !(gaps.length === 1 && gaps[0] === 0)) {
          ctx.mozDash = gaps;
        }
        var offset = strokeDashoffsetProp.getPixels();
        if (typeof ctx.lineDashOffset !== "undefined") {
          ctx.lineDashOffset = offset;
        } else if (typeof ctx.webkitLineDashOffset !== "undefined") {
          ctx.webkitLineDashOffset = offset;
        } else if (typeof ctx.mozDashOffset !== "undefined") {
          ctx.mozDashOffset = offset;
        }
      }
    }
    this.modifiedEmSizeStack = false;
    if (typeof ctx.font !== "undefined") {
      var fontStyleProp = this.getStyle("font");
      var fontStyleStyleProp = this.getStyle("font-style");
      var fontVariantStyleProp = this.getStyle("font-variant");
      var fontWeightStyleProp = this.getStyle("font-weight");
      var fontSizeStyleProp = this.getStyle("font-size");
      var fontFamilyStyleProp = this.getStyle("font-family");
      var font = new Font(fontStyleStyleProp.getString(), fontVariantStyleProp.getString(), fontWeightStyleProp.getString(), fontSizeStyleProp.hasValue() ? "".concat(fontSizeStyleProp.getPixels(true), "px") : "", fontFamilyStyleProp.getString(), Font.parse(fontStyleProp.getString(), ctx.font));
      fontStyleStyleProp.setValue(font.fontStyle);
      fontVariantStyleProp.setValue(font.fontVariant);
      fontWeightStyleProp.setValue(font.fontWeight);
      fontSizeStyleProp.setValue(font.fontSize);
      fontFamilyStyleProp.setValue(font.fontFamily);
      ctx.font = font.toString();
      if (fontSizeStyleProp.isPixels()) {
        this.document.emSize = fontSizeStyleProp.getPixels();
        this.modifiedEmSizeStack = true;
      }
    }
    if (!fromMeasure) {
      this.applyEffects(ctx);
      ctx.globalAlpha = this.calculateOpacity();
    }
  }
  clearContext(ctx) {
    super.clearContext(ctx);
    if (this.modifiedEmSizeStack) {
      this.document.popEmSize();
    }
  }
};
var PathElement = class _PathElement extends RenderedElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "path";
    this.pathParser = null;
    this.pathParser = new PathParser(this.getAttribute("d").getString());
  }
  path(ctx) {
    var {
      pathParser
    } = this;
    var boundingBox = new BoundingBox();
    pathParser.reset();
    if (ctx) {
      ctx.beginPath();
    }
    while (!pathParser.isEnd()) {
      switch (pathParser.next().type) {
        case PathParser.MOVE_TO:
          this.pathM(ctx, boundingBox);
          break;
        case PathParser.LINE_TO:
          this.pathL(ctx, boundingBox);
          break;
        case PathParser.HORIZ_LINE_TO:
          this.pathH(ctx, boundingBox);
          break;
        case PathParser.VERT_LINE_TO:
          this.pathV(ctx, boundingBox);
          break;
        case PathParser.CURVE_TO:
          this.pathC(ctx, boundingBox);
          break;
        case PathParser.SMOOTH_CURVE_TO:
          this.pathS(ctx, boundingBox);
          break;
        case PathParser.QUAD_TO:
          this.pathQ(ctx, boundingBox);
          break;
        case PathParser.SMOOTH_QUAD_TO:
          this.pathT(ctx, boundingBox);
          break;
        case PathParser.ARC:
          this.pathA(ctx, boundingBox);
          break;
        case PathParser.CLOSE_PATH:
          this.pathZ(ctx, boundingBox);
          break;
      }
    }
    return boundingBox;
  }
  getBoundingBox(_2) {
    return this.path();
  }
  getMarkers() {
    var {
      pathParser
    } = this;
    var points = pathParser.getMarkerPoints();
    var angles = pathParser.getMarkerAngles();
    var markers = points.map((point, i2) => [point, angles[i2]]);
    return markers;
  }
  renderChildren(ctx) {
    this.path(ctx);
    this.document.screen.mouse.checkPath(this, ctx);
    var fillRuleStyleProp = this.getStyle("fill-rule");
    if (ctx.fillStyle !== "") {
      if (fillRuleStyleProp.getString("inherit") !== "inherit") {
        ctx.fill(fillRuleStyleProp.getString());
      } else {
        ctx.fill();
      }
    }
    if (ctx.strokeStyle !== "") {
      if (this.getAttribute("vector-effect").getString() === "non-scaling-stroke") {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.stroke();
      }
    }
    var markers = this.getMarkers();
    if (markers) {
      var markersLastIndex = markers.length - 1;
      var markerStartStyleProp = this.getStyle("marker-start");
      var markerMidStyleProp = this.getStyle("marker-mid");
      var markerEndStyleProp = this.getStyle("marker-end");
      if (markerStartStyleProp.isUrlDefinition()) {
        var marker = markerStartStyleProp.getDefinition();
        var [point, angle] = markers[0];
        marker.render(ctx, point, angle);
      }
      if (markerMidStyleProp.isUrlDefinition()) {
        var _marker = markerMidStyleProp.getDefinition();
        for (var i2 = 1; i2 < markersLastIndex; i2++) {
          var [_point, _angle] = markers[i2];
          _marker.render(ctx, _point, _angle);
        }
      }
      if (markerEndStyleProp.isUrlDefinition()) {
        var _marker2 = markerEndStyleProp.getDefinition();
        var [_point2, _angle2] = markers[markersLastIndex];
        _marker2.render(ctx, _point2, _angle2);
      }
    }
  }
  static pathM(pathParser) {
    var point = pathParser.getAsCurrentPoint();
    pathParser.start = pathParser.current;
    return {
      point
    };
  }
  pathM(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      point
    } = _PathElement.pathM(pathParser);
    var {
      x,
      y: y2
    } = point;
    pathParser.addMarker(point);
    boundingBox.addPoint(x, y2);
    if (ctx) {
      ctx.moveTo(x, y2);
    }
  }
  static pathL(pathParser) {
    var {
      current
    } = pathParser;
    var point = pathParser.getAsCurrentPoint();
    return {
      current,
      point
    };
  }
  pathL(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point
    } = _PathElement.pathL(pathParser);
    var {
      x,
      y: y2
    } = point;
    pathParser.addMarker(point, current);
    boundingBox.addPoint(x, y2);
    if (ctx) {
      ctx.lineTo(x, y2);
    }
  }
  static pathH(pathParser) {
    var {
      current,
      command
    } = pathParser;
    var point = new Point((command.relative ? current.x : 0) + command.x, current.y);
    pathParser.current = point;
    return {
      current,
      point
    };
  }
  pathH(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point
    } = _PathElement.pathH(pathParser);
    var {
      x,
      y: y2
    } = point;
    pathParser.addMarker(point, current);
    boundingBox.addPoint(x, y2);
    if (ctx) {
      ctx.lineTo(x, y2);
    }
  }
  static pathV(pathParser) {
    var {
      current,
      command
    } = pathParser;
    var point = new Point(current.x, (command.relative ? current.y : 0) + command.y);
    pathParser.current = point;
    return {
      current,
      point
    };
  }
  pathV(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point
    } = _PathElement.pathV(pathParser);
    var {
      x,
      y: y2
    } = point;
    pathParser.addMarker(point, current);
    boundingBox.addPoint(x, y2);
    if (ctx) {
      ctx.lineTo(x, y2);
    }
  }
  static pathC(pathParser) {
    var {
      current
    } = pathParser;
    var point = pathParser.getPoint("x1", "y1");
    var controlPoint = pathParser.getAsControlPoint("x2", "y2");
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      point,
      controlPoint,
      currentPoint
    };
  }
  pathC(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point,
      controlPoint,
      currentPoint
    } = _PathElement.pathC(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, point);
    boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    if (ctx) {
      ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }
  static pathS(pathParser) {
    var {
      current
    } = pathParser;
    var point = pathParser.getReflectedControlPoint();
    var controlPoint = pathParser.getAsControlPoint("x2", "y2");
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      point,
      controlPoint,
      currentPoint
    };
  }
  pathS(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      point,
      controlPoint,
      currentPoint
    } = _PathElement.pathS(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, point);
    boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    if (ctx) {
      ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }
  static pathQ(pathParser) {
    var {
      current
    } = pathParser;
    var controlPoint = pathParser.getAsControlPoint("x1", "y1");
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      controlPoint,
      currentPoint
    };
  }
  pathQ(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      controlPoint,
      currentPoint
    } = _PathElement.pathQ(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, controlPoint);
    boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    if (ctx) {
      ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }
  static pathT(pathParser) {
    var {
      current
    } = pathParser;
    var controlPoint = pathParser.getReflectedControlPoint();
    pathParser.control = controlPoint;
    var currentPoint = pathParser.getAsCurrentPoint();
    return {
      current,
      controlPoint,
      currentPoint
    };
  }
  pathT(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      current,
      controlPoint,
      currentPoint
    } = _PathElement.pathT(pathParser);
    pathParser.addMarker(currentPoint, controlPoint, controlPoint);
    boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    if (ctx) {
      ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    }
  }
  static pathA(pathParser) {
    var {
      current,
      command
    } = pathParser;
    var {
      rX,
      rY,
      xRot,
      lArcFlag,
      sweepFlag
    } = command;
    var xAxisRotation = xRot * (Math.PI / 180);
    var currentPoint = pathParser.getAsCurrentPoint();
    var currp = new Point(Math.cos(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.sin(xAxisRotation) * (current.y - currentPoint.y) / 2, -Math.sin(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.cos(xAxisRotation) * (current.y - currentPoint.y) / 2);
    var l2 = Math.pow(currp.x, 2) / Math.pow(rX, 2) + Math.pow(currp.y, 2) / Math.pow(rY, 2);
    if (l2 > 1) {
      rX *= Math.sqrt(l2);
      rY *= Math.sqrt(l2);
    }
    var s2 = (lArcFlag === sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rX, 2) * Math.pow(rY, 2) - Math.pow(rX, 2) * Math.pow(currp.y, 2) - Math.pow(rY, 2) * Math.pow(currp.x, 2)) / (Math.pow(rX, 2) * Math.pow(currp.y, 2) + Math.pow(rY, 2) * Math.pow(currp.x, 2)));
    if (isNaN(s2)) {
      s2 = 0;
    }
    var cpp = new Point(s2 * rX * currp.y / rY, s2 * -rY * currp.x / rX);
    var centp = new Point((current.x + currentPoint.x) / 2 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (current.y + currentPoint.y) / 2 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y);
    var a1 = vectorsAngle([1, 0], [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY]);
    var u2 = [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY];
    var v2 = [(-currp.x - cpp.x) / rX, (-currp.y - cpp.y) / rY];
    var ad = vectorsAngle(u2, v2);
    if (vectorsRatio(u2, v2) <= -1) {
      ad = Math.PI;
    }
    if (vectorsRatio(u2, v2) >= 1) {
      ad = 0;
    }
    return {
      currentPoint,
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    };
  }
  pathA(ctx, boundingBox) {
    var {
      pathParser
    } = this;
    var {
      currentPoint,
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    } = _PathElement.pathA(pathParser);
    var dir = 1 - sweepFlag ? 1 : -1;
    var ah = a1 + dir * (ad / 2);
    var halfWay = new Point(centp.x + rX * Math.cos(ah), centp.y + rY * Math.sin(ah));
    pathParser.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
    pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI);
    boundingBox.addPoint(currentPoint.x, currentPoint.y);
    if (ctx && !isNaN(a1) && !isNaN(ad)) {
      var r2 = rX > rY ? rX : rY;
      var sx = rX > rY ? 1 : rX / rY;
      var sy = rX > rY ? rY / rX : 1;
      ctx.translate(centp.x, centp.y);
      ctx.rotate(xAxisRotation);
      ctx.scale(sx, sy);
      ctx.arc(0, 0, r2, a1, a1 + ad, Boolean(1 - sweepFlag));
      ctx.scale(1 / sx, 1 / sy);
      ctx.rotate(-xAxisRotation);
      ctx.translate(-centp.x, -centp.y);
    }
  }
  static pathZ(pathParser) {
    pathParser.current = pathParser.start;
  }
  pathZ(ctx, boundingBox) {
    _PathElement.pathZ(this.pathParser);
    if (ctx) {
      if (boundingBox.x1 !== boundingBox.x2 && boundingBox.y1 !== boundingBox.y2) {
        ctx.closePath();
      }
    }
  }
};
var GlyphElement = class extends PathElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "glyph";
    this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber();
    this.unicode = this.getAttribute("unicode").getString();
    this.arabicForm = this.getAttribute("arabic-form").getString();
  }
};
var TextElement = class _TextElement extends RenderedElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, new.target === _TextElement ? true : captureTextNodes);
    this.type = "text";
    this.x = 0;
    this.y = 0;
    this.measureCache = -1;
  }
  setContext(ctx) {
    var fromMeasure = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    super.setContext(ctx, fromMeasure);
    var textBaseline = this.getStyle("dominant-baseline").getTextBaseline() || this.getStyle("alignment-baseline").getTextBaseline();
    if (textBaseline) {
      ctx.textBaseline = textBaseline;
    }
  }
  initializeCoordinates() {
    this.x = 0;
    this.y = 0;
    this.leafTexts = [];
    this.textChunkStart = 0;
    this.minX = Number.POSITIVE_INFINITY;
    this.maxX = Number.NEGATIVE_INFINITY;
  }
  getBoundingBox(ctx) {
    if (this.type !== "text") {
      return this.getTElementBoundingBox(ctx);
    }
    this.initializeCoordinates();
    this.adjustChildCoordinatesRecursive(ctx);
    var boundingBox = null;
    this.children.forEach((_2, i2) => {
      var childBoundingBox = this.getChildBoundingBox(ctx, this, this, i2);
      if (!boundingBox) {
        boundingBox = childBoundingBox;
      } else {
        boundingBox.addBoundingBox(childBoundingBox);
      }
    });
    return boundingBox;
  }
  getFontSize() {
    var {
      document: document2,
      parent
    } = this;
    var inheritFontSize = Font.parse(document2.ctx.font).fontSize;
    var fontSize = parent.getStyle("font-size").getNumber(inheritFontSize);
    return fontSize;
  }
  getTElementBoundingBox(ctx) {
    var fontSize = this.getFontSize();
    return new BoundingBox(this.x, this.y - fontSize, this.x + this.measureText(ctx), this.y);
  }
  getGlyph(font, text, i2) {
    var char = text[i2];
    var glyph = null;
    if (font.isArabic) {
      var len = text.length;
      var prevChar = text[i2 - 1];
      var nextChar = text[i2 + 1];
      var arabicForm = "isolated";
      if ((i2 === 0 || prevChar === " ") && i2 < len - 1 && nextChar !== " ") {
        arabicForm = "terminal";
      }
      if (i2 > 0 && prevChar !== " " && i2 < len - 1 && nextChar !== " ") {
        arabicForm = "medial";
      }
      if (i2 > 0 && prevChar !== " " && (i2 === len - 1 || nextChar === " ")) {
        arabicForm = "initial";
      }
      if (typeof font.glyphs[char] !== "undefined") {
        var maybeGlyph = font.glyphs[char];
        glyph = maybeGlyph instanceof GlyphElement ? maybeGlyph : maybeGlyph[arabicForm];
      }
    } else {
      glyph = font.glyphs[char];
    }
    if (!glyph) {
      glyph = font.missingGlyph;
    }
    return glyph;
  }
  getText() {
    return "";
  }
  getTextFromNode(node2) {
    var textNode = node2 || this.node;
    var childNodes = Array.from(textNode.parentNode.childNodes);
    var index2 = childNodes.indexOf(textNode);
    var lastIndex = childNodes.length - 1;
    var text = compressSpaces(
      // textNode.value
      // || textNode.text
      textNode.textContent || ""
    );
    if (index2 === 0) {
      text = trimLeft(text);
    }
    if (index2 === lastIndex) {
      text = trimRight(text);
    }
    return text;
  }
  renderChildren(ctx) {
    if (this.type !== "text") {
      this.renderTElementChildren(ctx);
      return;
    }
    this.initializeCoordinates();
    this.adjustChildCoordinatesRecursive(ctx);
    this.children.forEach((_2, i2) => {
      this.renderChild(ctx, this, this, i2);
    });
    var {
      mouse
    } = this.document.screen;
    if (mouse.isWorking()) {
      mouse.checkBoundingBox(this, this.getBoundingBox(ctx));
    }
  }
  renderTElementChildren(ctx) {
    var {
      document: document2,
      parent
    } = this;
    var renderText = this.getText();
    var customFont = parent.getStyle("font-family").getDefinition();
    if (customFont) {
      var {
        unitsPerEm
      } = customFont.fontFace;
      var ctxFont = Font.parse(document2.ctx.font);
      var fontSize = parent.getStyle("font-size").getNumber(ctxFont.fontSize);
      var fontStyle = parent.getStyle("font-style").getString(ctxFont.fontStyle);
      var scale = fontSize / unitsPerEm;
      var text = customFont.isRTL ? renderText.split("").reverse().join("") : renderText;
      var dx = toNumbers(parent.getAttribute("dx").getString());
      var len = text.length;
      for (var i2 = 0; i2 < len; i2++) {
        var glyph = this.getGlyph(customFont, text, i2);
        ctx.translate(this.x, this.y);
        ctx.scale(scale, -scale);
        var lw = ctx.lineWidth;
        ctx.lineWidth = ctx.lineWidth * unitsPerEm / fontSize;
        if (fontStyle === "italic") {
          ctx.transform(1, 0, 0.4, 1, 0, 0);
        }
        glyph.render(ctx);
        if (fontStyle === "italic") {
          ctx.transform(1, 0, -0.4, 1, 0, 0);
        }
        ctx.lineWidth = lw;
        ctx.scale(1 / scale, -1 / scale);
        ctx.translate(-this.x, -this.y);
        this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / unitsPerEm;
        if (typeof dx[i2] !== "undefined" && !isNaN(dx[i2])) {
          this.x += dx[i2];
        }
      }
      return;
    }
    var {
      x,
      y: y2
    } = this;
    if (ctx.fillStyle) {
      ctx.fillText(renderText, x, y2);
    }
    if (ctx.strokeStyle) {
      ctx.strokeText(renderText, x, y2);
    }
  }
  applyAnchoring() {
    if (this.textChunkStart >= this.leafTexts.length) {
      return;
    }
    var firstElement = this.leafTexts[this.textChunkStart];
    var textAnchor = firstElement.getStyle("text-anchor").getString("start");
    var isRTL = false;
    var shift = 0;
    if (textAnchor === "start" && !isRTL || textAnchor === "end" && isRTL) {
      shift = firstElement.x - this.minX;
    } else if (textAnchor === "end" && !isRTL || textAnchor === "start" && isRTL) {
      shift = firstElement.x - this.maxX;
    } else {
      shift = firstElement.x - (this.minX + this.maxX) / 2;
    }
    for (var i2 = this.textChunkStart; i2 < this.leafTexts.length; i2++) {
      this.leafTexts[i2].x += shift;
    }
    this.minX = Number.POSITIVE_INFINITY;
    this.maxX = Number.NEGATIVE_INFINITY;
    this.textChunkStart = this.leafTexts.length;
  }
  adjustChildCoordinatesRecursive(ctx) {
    this.children.forEach((_2, i2) => {
      this.adjustChildCoordinatesRecursiveCore(ctx, this, this, i2);
    });
    this.applyAnchoring();
  }
  adjustChildCoordinatesRecursiveCore(ctx, textParent, parent, i2) {
    var child = parent.children[i2];
    if (child.children.length > 0) {
      child.children.forEach((_2, i3) => {
        textParent.adjustChildCoordinatesRecursiveCore(ctx, textParent, child, i3);
      });
    } else {
      this.adjustChildCoordinates(ctx, textParent, parent, i2);
    }
  }
  adjustChildCoordinates(ctx, textParent, parent, i2) {
    var child = parent.children[i2];
    if (typeof child.measureText !== "function") {
      return child;
    }
    ctx.save();
    child.setContext(ctx, true);
    var xAttr = child.getAttribute("x");
    var yAttr = child.getAttribute("y");
    var dxAttr = child.getAttribute("dx");
    var dyAttr = child.getAttribute("dy");
    var customFont = child.getStyle("font-family").getDefinition();
    var isRTL = Boolean(customFont) && customFont.isRTL;
    if (i2 === 0) {
      if (!xAttr.hasValue()) {
        xAttr.setValue(child.getInheritedAttribute("x"));
      }
      if (!yAttr.hasValue()) {
        yAttr.setValue(child.getInheritedAttribute("y"));
      }
      if (!dxAttr.hasValue()) {
        dxAttr.setValue(child.getInheritedAttribute("dx"));
      }
      if (!dyAttr.hasValue()) {
        dyAttr.setValue(child.getInheritedAttribute("dy"));
      }
    }
    var width = child.measureText(ctx);
    if (isRTL) {
      textParent.x -= width;
    }
    if (xAttr.hasValue()) {
      textParent.applyAnchoring();
      child.x = xAttr.getPixels("x");
      if (dxAttr.hasValue()) {
        child.x += dxAttr.getPixels("x");
      }
    } else {
      if (dxAttr.hasValue()) {
        textParent.x += dxAttr.getPixels("x");
      }
      child.x = textParent.x;
    }
    textParent.x = child.x;
    if (!isRTL) {
      textParent.x += width;
    }
    if (yAttr.hasValue()) {
      child.y = yAttr.getPixels("y");
      if (dyAttr.hasValue()) {
        child.y += dyAttr.getPixels("y");
      }
    } else {
      if (dyAttr.hasValue()) {
        textParent.y += dyAttr.getPixels("y");
      }
      child.y = textParent.y;
    }
    textParent.y = child.y;
    textParent.leafTexts.push(child);
    textParent.minX = Math.min(textParent.minX, child.x, child.x + width);
    textParent.maxX = Math.max(textParent.maxX, child.x, child.x + width);
    child.clearContext(ctx);
    ctx.restore();
    return child;
  }
  getChildBoundingBox(ctx, textParent, parent, i2) {
    var child = parent.children[i2];
    if (typeof child.getBoundingBox !== "function") {
      return null;
    }
    var boundingBox = child.getBoundingBox(ctx);
    if (!boundingBox) {
      return null;
    }
    child.children.forEach((_2, i3) => {
      var childBoundingBox = textParent.getChildBoundingBox(ctx, textParent, child, i3);
      boundingBox.addBoundingBox(childBoundingBox);
    });
    return boundingBox;
  }
  renderChild(ctx, textParent, parent, i2) {
    var child = parent.children[i2];
    child.render(ctx);
    child.children.forEach((_2, i3) => {
      textParent.renderChild(ctx, textParent, child, i3);
    });
  }
  measureText(ctx) {
    var {
      measureCache
    } = this;
    if (~measureCache) {
      return measureCache;
    }
    var renderText = this.getText();
    var measure = this.measureTargetText(ctx, renderText);
    this.measureCache = measure;
    return measure;
  }
  measureTargetText(ctx, targetText) {
    if (!targetText.length) {
      return 0;
    }
    var {
      parent
    } = this;
    var customFont = parent.getStyle("font-family").getDefinition();
    if (customFont) {
      var fontSize = this.getFontSize();
      var text = customFont.isRTL ? targetText.split("").reverse().join("") : targetText;
      var dx = toNumbers(parent.getAttribute("dx").getString());
      var len = text.length;
      var _measure = 0;
      for (var i2 = 0; i2 < len; i2++) {
        var glyph = this.getGlyph(customFont, text, i2);
        _measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
        if (typeof dx[i2] !== "undefined" && !isNaN(dx[i2])) {
          _measure += dx[i2];
        }
      }
      return _measure;
    }
    if (!ctx.measureText) {
      return targetText.length * 10;
    }
    ctx.save();
    this.setContext(ctx, true);
    var {
      width: measure
    } = ctx.measureText(targetText);
    this.clearContext(ctx);
    ctx.restore();
    return measure;
  }
  /**
   * Inherits positional attributes from {@link TextElement} parent(s). Attributes
   * are only inherited from a parent to its first child.
   * @param name - The attribute name.
   * @returns The attribute value or null.
   */
  getInheritedAttribute(name) {
    var current = this;
    while (current instanceof _TextElement && current.isFirstChild()) {
      var parentAttr = current.parent.getAttribute(name);
      if (parentAttr.hasValue(true)) {
        return parentAttr.getValue("0");
      }
      current = current.parent;
    }
    return null;
  }
};
var TSpanElement = class _TSpanElement extends TextElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, new.target === _TSpanElement ? true : captureTextNodes);
    this.type = "tspan";
    this.text = this.children.length > 0 ? "" : this.getTextFromNode();
  }
  getText() {
    return this.text;
  }
};
var TextNode = class extends TSpanElement {
  constructor() {
    super(...arguments);
    this.type = "textNode";
  }
};
var SVGElement = class extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.root = false;
  }
  setContext(ctx) {
    var _this$node$parentNode;
    var {
      document: document2
    } = this;
    var {
      screen,
      window: window2
    } = document2;
    var canvas = ctx.canvas;
    screen.setDefaults(ctx);
    if (canvas.style && typeof ctx.font !== "undefined" && window2 && typeof window2.getComputedStyle !== "undefined") {
      ctx.font = window2.getComputedStyle(canvas).getPropertyValue("font");
      var fontSizeProp = new Property(document2, "fontSize", Font.parse(ctx.font).fontSize);
      if (fontSizeProp.hasValue()) {
        document2.rootEmSize = fontSizeProp.getPixels("y");
        document2.emSize = document2.rootEmSize;
      }
    }
    if (!this.getAttribute("x").hasValue()) {
      this.getAttribute("x", true).setValue(0);
    }
    if (!this.getAttribute("y").hasValue()) {
      this.getAttribute("y", true).setValue(0);
    }
    var {
      width,
      height
    } = screen.viewPort;
    if (!this.getStyle("width").hasValue()) {
      this.getStyle("width", true).setValue("100%");
    }
    if (!this.getStyle("height").hasValue()) {
      this.getStyle("height", true).setValue("100%");
    }
    if (!this.getStyle("color").hasValue()) {
      this.getStyle("color", true).setValue("black");
    }
    var refXAttr = this.getAttribute("refX");
    var refYAttr = this.getAttribute("refY");
    var viewBoxAttr = this.getAttribute("viewBox");
    var viewBox = viewBoxAttr.hasValue() ? toNumbers(viewBoxAttr.getString()) : null;
    var clip = !this.root && this.getStyle("overflow").getValue("hidden") !== "visible";
    var minX = 0;
    var minY = 0;
    var clipX = 0;
    var clipY = 0;
    if (viewBox) {
      minX = viewBox[0];
      minY = viewBox[1];
    }
    if (!this.root) {
      width = this.getStyle("width").getPixels("x");
      height = this.getStyle("height").getPixels("y");
      if (this.type === "marker") {
        clipX = minX;
        clipY = minY;
        minX = 0;
        minY = 0;
      }
    }
    screen.viewPort.setCurrent(width, height);
    if (this.node && (!this.parent || ((_this$node$parentNode = this.node.parentNode) === null || _this$node$parentNode === void 0 ? void 0 : _this$node$parentNode.nodeName) === "foreignObject") && this.getStyle("transform", false, true).hasValue() && !this.getStyle("transform-origin", false, true).hasValue()) {
      this.getStyle("transform-origin", true, true).setValue("50% 50%");
    }
    super.setContext(ctx);
    ctx.translate(this.getAttribute("x").getPixels("x"), this.getAttribute("y").getPixels("y"));
    if (viewBox) {
      width = viewBox[2];
      height = viewBox[3];
    }
    document2.setViewBox({
      ctx,
      aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
      width: screen.viewPort.width,
      desiredWidth: width,
      height: screen.viewPort.height,
      desiredHeight: height,
      minX,
      minY,
      refX: refXAttr.getValue(),
      refY: refYAttr.getValue(),
      clip,
      clipX,
      clipY
    });
    if (viewBox) {
      screen.viewPort.removeCurrent();
      screen.viewPort.setCurrent(width, height);
    }
  }
  clearContext(ctx) {
    super.clearContext(ctx);
    this.document.screen.viewPort.removeCurrent();
  }
  /**
   * Resize SVG to fit in given size.
   * @param width
   * @param height
   * @param preserveAspectRatio
   */
  resize(width) {
    var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : width;
    var preserveAspectRatio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var widthAttr = this.getAttribute("width", true);
    var heightAttr = this.getAttribute("height", true);
    var viewBoxAttr = this.getAttribute("viewBox");
    var styleAttr = this.getAttribute("style");
    var originWidth = widthAttr.getNumber(0);
    var originHeight = heightAttr.getNumber(0);
    if (preserveAspectRatio) {
      if (typeof preserveAspectRatio === "string") {
        this.getAttribute("preserveAspectRatio", true).setValue(preserveAspectRatio);
      } else {
        var preserveAspectRatioAttr = this.getAttribute("preserveAspectRatio");
        if (preserveAspectRatioAttr.hasValue()) {
          preserveAspectRatioAttr.setValue(preserveAspectRatioAttr.getString().replace(/^\s*(\S.*\S)\s*$/, "$1"));
        }
      }
    }
    widthAttr.setValue(width);
    heightAttr.setValue(height);
    if (!viewBoxAttr.hasValue()) {
      viewBoxAttr.setValue("0 0 ".concat(originWidth || width, " ").concat(originHeight || height));
    }
    if (styleAttr.hasValue()) {
      var widthStyle = this.getStyle("width");
      var heightStyle = this.getStyle("height");
      if (widthStyle.hasValue()) {
        widthStyle.setValue("".concat(width, "px"));
      }
      if (heightStyle.hasValue()) {
        heightStyle.setValue("".concat(height, "px"));
      }
    }
  }
};
var RectElement = class extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "rect";
  }
  path(ctx) {
    var x = this.getAttribute("x").getPixels("x");
    var y2 = this.getAttribute("y").getPixels("y");
    var width = this.getStyle("width", false, true).getPixels("x");
    var height = this.getStyle("height", false, true).getPixels("y");
    var rxAttr = this.getAttribute("rx");
    var ryAttr = this.getAttribute("ry");
    var rx = rxAttr.getPixels("x");
    var ry = ryAttr.getPixels("y");
    if (rxAttr.hasValue() && !ryAttr.hasValue()) {
      ry = rx;
    }
    if (ryAttr.hasValue() && !rxAttr.hasValue()) {
      rx = ry;
    }
    rx = Math.min(rx, width / 2);
    ry = Math.min(ry, height / 2);
    if (ctx) {
      var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
      ctx.beginPath();
      if (height > 0 && width > 0) {
        ctx.moveTo(x + rx, y2);
        ctx.lineTo(x + width - rx, y2);
        ctx.bezierCurveTo(x + width - rx + KAPPA * rx, y2, x + width, y2 + ry - KAPPA * ry, x + width, y2 + ry);
        ctx.lineTo(x + width, y2 + height - ry);
        ctx.bezierCurveTo(x + width, y2 + height - ry + KAPPA * ry, x + width - rx + KAPPA * rx, y2 + height, x + width - rx, y2 + height);
        ctx.lineTo(x + rx, y2 + height);
        ctx.bezierCurveTo(x + rx - KAPPA * rx, y2 + height, x, y2 + height - ry + KAPPA * ry, x, y2 + height - ry);
        ctx.lineTo(x, y2 + ry);
        ctx.bezierCurveTo(x, y2 + ry - KAPPA * ry, x + rx - KAPPA * rx, y2, x + rx, y2);
        ctx.closePath();
      }
    }
    return new BoundingBox(x, y2, x + width, y2 + height);
  }
  getMarkers() {
    return null;
  }
};
var CircleElement = class extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "circle";
  }
  path(ctx) {
    var cx = this.getAttribute("cx").getPixels("x");
    var cy = this.getAttribute("cy").getPixels("y");
    var r2 = this.getAttribute("r").getPixels();
    if (ctx && r2 > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r2, 0, Math.PI * 2, false);
      ctx.closePath();
    }
    return new BoundingBox(cx - r2, cy - r2, cx + r2, cy + r2);
  }
  getMarkers() {
    return null;
  }
};
var EllipseElement = class extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "ellipse";
  }
  path(ctx) {
    var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
    var rx = this.getAttribute("rx").getPixels("x");
    var ry = this.getAttribute("ry").getPixels("y");
    var cx = this.getAttribute("cx").getPixels("x");
    var cy = this.getAttribute("cy").getPixels("y");
    if (ctx && rx > 0 && ry > 0) {
      ctx.beginPath();
      ctx.moveTo(cx + rx, cy);
      ctx.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
      ctx.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
      ctx.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
      ctx.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
      ctx.closePath();
    }
    return new BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
  }
  getMarkers() {
    return null;
  }
};
var LineElement = class extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "line";
  }
  getPoints() {
    return [new Point(this.getAttribute("x1").getPixels("x"), this.getAttribute("y1").getPixels("y")), new Point(this.getAttribute("x2").getPixels("x"), this.getAttribute("y2").getPixels("y"))];
  }
  path(ctx) {
    var [{
      x: x0,
      y: y0
    }, {
      x: x1,
      y: y1
    }] = this.getPoints();
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
    }
    return new BoundingBox(x0, y0, x1, y1);
  }
  getMarkers() {
    var [p0, p1] = this.getPoints();
    var a2 = p0.angleTo(p1);
    return [[p0, a2], [p1, a2]];
  }
};
var PolylineElement = class extends PathElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "polyline";
    this.points = [];
    this.points = Point.parsePath(this.getAttribute("points").getString());
  }
  path(ctx) {
    var {
      points
    } = this;
    var [{
      x: x0,
      y: y0
    }] = points;
    var boundingBox = new BoundingBox(x0, y0);
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
    }
    points.forEach((_ref) => {
      var {
        x,
        y: y2
      } = _ref;
      boundingBox.addPoint(x, y2);
      if (ctx) {
        ctx.lineTo(x, y2);
      }
    });
    return boundingBox;
  }
  getMarkers() {
    var {
      points
    } = this;
    var lastIndex = points.length - 1;
    var markers = [];
    points.forEach((point, i2) => {
      if (i2 === lastIndex) {
        return;
      }
      markers.push([point, point.angleTo(points[i2 + 1])]);
    });
    if (markers.length > 0) {
      markers.push([points[points.length - 1], markers[markers.length - 1][1]]);
    }
    return markers;
  }
};
var PolygonElement = class extends PolylineElement {
  constructor() {
    super(...arguments);
    this.type = "polygon";
  }
  path(ctx) {
    var boundingBox = super.path(ctx);
    var [{
      x,
      y: y2
    }] = this.points;
    if (ctx) {
      ctx.lineTo(x, y2);
      ctx.closePath();
    }
    return boundingBox;
  }
};
var PatternElement = class extends Element {
  constructor() {
    super(...arguments);
    this.type = "pattern";
  }
  createPattern(ctx, _2, parentOpacityProp) {
    var width = this.getStyle("width").getPixels("x", true);
    var height = this.getStyle("height").getPixels("y", true);
    var patternSvg = new SVGElement(this.document, null);
    patternSvg.attributes.viewBox = new Property(this.document, "viewBox", this.getAttribute("viewBox").getValue());
    patternSvg.attributes.width = new Property(this.document, "width", "".concat(width, "px"));
    patternSvg.attributes.height = new Property(this.document, "height", "".concat(height, "px"));
    patternSvg.attributes.transform = new Property(this.document, "transform", this.getAttribute("patternTransform").getValue());
    patternSvg.children = this.children;
    var patternCanvas = this.document.createCanvas(width, height);
    var patternCtx = patternCanvas.getContext("2d");
    var xAttr = this.getAttribute("x");
    var yAttr = this.getAttribute("y");
    if (xAttr.hasValue() && yAttr.hasValue()) {
      patternCtx.translate(xAttr.getPixels("x", true), yAttr.getPixels("y", true));
    }
    if (parentOpacityProp.hasValue()) {
      this.styles["fill-opacity"] = parentOpacityProp;
    } else {
      Reflect.deleteProperty(this.styles, "fill-opacity");
    }
    for (var x = -1; x <= 1; x++) {
      for (var y2 = -1; y2 <= 1; y2++) {
        patternCtx.save();
        patternSvg.attributes.x = new Property(this.document, "x", x * patternCanvas.width);
        patternSvg.attributes.y = new Property(this.document, "y", y2 * patternCanvas.height);
        patternSvg.render(patternCtx);
        patternCtx.restore();
      }
    }
    var pattern = ctx.createPattern(patternCanvas, "repeat");
    return pattern;
  }
};
var MarkerElement = class extends Element {
  constructor() {
    super(...arguments);
    this.type = "marker";
  }
  render(ctx, point, angle) {
    if (!point) {
      return;
    }
    var {
      x,
      y: y2
    } = point;
    var orient = this.getAttribute("orient").getString("auto");
    var markerUnits = this.getAttribute("markerUnits").getString("strokeWidth");
    ctx.translate(x, y2);
    if (orient === "auto") {
      ctx.rotate(angle);
    }
    if (markerUnits === "strokeWidth") {
      ctx.scale(ctx.lineWidth, ctx.lineWidth);
    }
    ctx.save();
    var markerSvg = new SVGElement(this.document, null);
    markerSvg.type = this.type;
    markerSvg.attributes.viewBox = new Property(this.document, "viewBox", this.getAttribute("viewBox").getValue());
    markerSvg.attributes.refX = new Property(this.document, "refX", this.getAttribute("refX").getValue());
    markerSvg.attributes.refY = new Property(this.document, "refY", this.getAttribute("refY").getValue());
    markerSvg.attributes.width = new Property(this.document, "width", this.getAttribute("markerWidth").getValue());
    markerSvg.attributes.height = new Property(this.document, "height", this.getAttribute("markerHeight").getValue());
    markerSvg.attributes.overflow = new Property(this.document, "overflow", this.getAttribute("overflow").getValue());
    markerSvg.attributes.fill = new Property(this.document, "fill", this.getAttribute("fill").getColor("black"));
    markerSvg.attributes.stroke = new Property(this.document, "stroke", this.getAttribute("stroke").getValue("none"));
    markerSvg.children = this.children;
    markerSvg.render(ctx);
    ctx.restore();
    if (markerUnits === "strokeWidth") {
      ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
    }
    if (orient === "auto") {
      ctx.rotate(-angle);
    }
    ctx.translate(-x, -y2);
  }
};
var DefsElement = class extends Element {
  constructor() {
    super(...arguments);
    this.type = "defs";
  }
  render() {
  }
};
var GElement = class extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = "g";
  }
  getBoundingBox(ctx) {
    var boundingBox = new BoundingBox();
    this.children.forEach((child) => {
      boundingBox.addBoundingBox(child.getBoundingBox(ctx));
    });
    return boundingBox;
  }
};
var GradientElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.attributesToInherit = ["gradientUnits"];
    this.stops = [];
    var {
      stops,
      children
    } = this;
    children.forEach((child) => {
      if (child.type === "stop") {
        stops.push(child);
      }
    });
  }
  getGradientUnits() {
    return this.getAttribute("gradientUnits").getString("objectBoundingBox");
  }
  createGradient(ctx, element, parentOpacityProp) {
    var stopsContainer = this;
    if (this.getHrefAttribute().hasValue()) {
      stopsContainer = this.getHrefAttribute().getDefinition();
      this.inheritStopContainer(stopsContainer);
    }
    var {
      stops
    } = stopsContainer;
    var gradient = this.getGradient(ctx, element);
    if (!gradient) {
      return this.addParentOpacity(parentOpacityProp, stops[stops.length - 1].color);
    }
    stops.forEach((stop) => {
      gradient.addColorStop(stop.offset, this.addParentOpacity(parentOpacityProp, stop.color));
    });
    if (this.getAttribute("gradientTransform").hasValue()) {
      var {
        document: document2
      } = this;
      var {
        MAX_VIRTUAL_PIXELS,
        viewPort
      } = document2.screen;
      var [rootView] = viewPort.viewPorts;
      var rect = new RectElement(document2, null);
      rect.attributes.x = new Property(document2, "x", -MAX_VIRTUAL_PIXELS / 3);
      rect.attributes.y = new Property(document2, "y", -MAX_VIRTUAL_PIXELS / 3);
      rect.attributes.width = new Property(document2, "width", MAX_VIRTUAL_PIXELS);
      rect.attributes.height = new Property(document2, "height", MAX_VIRTUAL_PIXELS);
      var group = new GElement(document2, null);
      group.attributes.transform = new Property(document2, "transform", this.getAttribute("gradientTransform").getValue());
      group.children = [rect];
      var patternSvg = new SVGElement(document2, null);
      patternSvg.attributes.x = new Property(document2, "x", 0);
      patternSvg.attributes.y = new Property(document2, "y", 0);
      patternSvg.attributes.width = new Property(document2, "width", rootView.width);
      patternSvg.attributes.height = new Property(document2, "height", rootView.height);
      patternSvg.children = [group];
      var patternCanvas = document2.createCanvas(rootView.width, rootView.height);
      var patternCtx = patternCanvas.getContext("2d");
      patternCtx.fillStyle = gradient;
      patternSvg.render(patternCtx);
      return patternCtx.createPattern(patternCanvas, "no-repeat");
    }
    return gradient;
  }
  inheritStopContainer(stopsContainer) {
    this.attributesToInherit.forEach((attributeToInherit) => {
      if (!this.getAttribute(attributeToInherit).hasValue() && stopsContainer.getAttribute(attributeToInherit).hasValue()) {
        this.getAttribute(attributeToInherit, true).setValue(stopsContainer.getAttribute(attributeToInherit).getValue());
      }
    });
  }
  addParentOpacity(parentOpacityProp, color) {
    if (parentOpacityProp.hasValue()) {
      var colorProp = new Property(this.document, "color", color);
      return colorProp.addOpacity(parentOpacityProp).getColor();
    }
    return color;
  }
};
var LinearGradientElement = class extends GradientElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "linearGradient";
    this.attributesToInherit.push("x1", "y1", "x2", "y2");
  }
  getGradient(ctx, element) {
    var isBoundingBoxUnits = this.getGradientUnits() === "objectBoundingBox";
    var boundingBox = isBoundingBoxUnits ? element.getBoundingBox(ctx) : null;
    if (isBoundingBoxUnits && !boundingBox) {
      return null;
    }
    if (!this.getAttribute("x1").hasValue() && !this.getAttribute("y1").hasValue() && !this.getAttribute("x2").hasValue() && !this.getAttribute("y2").hasValue()) {
      this.getAttribute("x1", true).setValue(0);
      this.getAttribute("y1", true).setValue(0);
      this.getAttribute("x2", true).setValue(1);
      this.getAttribute("y2", true).setValue(0);
    }
    var x1 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("x1").getNumber() : this.getAttribute("x1").getPixels("x");
    var y1 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("y1").getNumber() : this.getAttribute("y1").getPixels("y");
    var x2 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("x2").getNumber() : this.getAttribute("x2").getPixels("x");
    var y2 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("y2").getNumber() : this.getAttribute("y2").getPixels("y");
    if (x1 === x2 && y1 === y2) {
      return null;
    }
    return ctx.createLinearGradient(x1, y1, x2, y2);
  }
};
var RadialGradientElement = class extends GradientElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "radialGradient";
    this.attributesToInherit.push("cx", "cy", "r", "fx", "fy", "fr");
  }
  getGradient(ctx, element) {
    var isBoundingBoxUnits = this.getGradientUnits() === "objectBoundingBox";
    var boundingBox = element.getBoundingBox(ctx);
    if (isBoundingBoxUnits && !boundingBox) {
      return null;
    }
    if (!this.getAttribute("cx").hasValue()) {
      this.getAttribute("cx", true).setValue("50%");
    }
    if (!this.getAttribute("cy").hasValue()) {
      this.getAttribute("cy", true).setValue("50%");
    }
    if (!this.getAttribute("r").hasValue()) {
      this.getAttribute("r", true).setValue("50%");
    }
    var cx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("cx").getNumber() : this.getAttribute("cx").getPixels("x");
    var cy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("cy").getNumber() : this.getAttribute("cy").getPixels("y");
    var fx = cx;
    var fy = cy;
    if (this.getAttribute("fx").hasValue()) {
      fx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("fx").getNumber() : this.getAttribute("fx").getPixels("x");
    }
    if (this.getAttribute("fy").hasValue()) {
      fy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("fy").getNumber() : this.getAttribute("fy").getPixels("y");
    }
    var r2 = isBoundingBoxUnits ? (boundingBox.width + boundingBox.height) / 2 * this.getAttribute("r").getNumber() : this.getAttribute("r").getPixels();
    var fr = this.getAttribute("fr").getPixels();
    return ctx.createRadialGradient(fx, fy, fr, cx, cy, r2);
  }
};
var StopElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "stop";
    var offset = Math.max(0, Math.min(1, this.getAttribute("offset").getNumber()));
    var stopOpacity = this.getStyle("stop-opacity");
    var stopColor = this.getStyle("stop-color", true);
    if (stopColor.getString() === "") {
      stopColor.setValue("#000");
    }
    if (stopOpacity.hasValue()) {
      stopColor = stopColor.addOpacity(stopOpacity);
    }
    this.offset = offset;
    this.color = stopColor.getColor();
  }
};
var AnimateElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "animate";
    this.duration = 0;
    this.initialValue = null;
    this.initialUnits = "";
    this.removed = false;
    this.frozen = false;
    document2.screen.animations.push(this);
    this.begin = this.getAttribute("begin").getMilliseconds();
    this.maxDuration = this.begin + this.getAttribute("dur").getMilliseconds();
    this.from = this.getAttribute("from");
    this.to = this.getAttribute("to");
    this.values = new Property(document2, "values", null);
    var valuesAttr = this.getAttribute("values");
    if (valuesAttr.hasValue()) {
      this.values.setValue(valuesAttr.getString().split(";"));
    }
  }
  getProperty() {
    var attributeType = this.getAttribute("attributeType").getString();
    var attributeName = this.getAttribute("attributeName").getString();
    if (attributeType === "CSS") {
      return this.parent.getStyle(attributeName, true);
    }
    return this.parent.getAttribute(attributeName, true);
  }
  calcValue() {
    var {
      initialUnits
    } = this;
    var {
      progress,
      from,
      to
    } = this.getProgress();
    var newValue = from.getNumber() + (to.getNumber() - from.getNumber()) * progress;
    if (initialUnits === "%") {
      newValue *= 100;
    }
    return "".concat(newValue).concat(initialUnits);
  }
  update(delta) {
    var {
      parent
    } = this;
    var prop = this.getProperty();
    if (!this.initialValue) {
      this.initialValue = prop.getString();
      this.initialUnits = prop.getUnits();
    }
    if (this.duration > this.maxDuration) {
      var fill = this.getAttribute("fill").getString("remove");
      if (this.getAttribute("repeatCount").getString() === "indefinite" || this.getAttribute("repeatDur").getString() === "indefinite") {
        this.duration = 0;
      } else if (fill === "freeze" && !this.frozen) {
        this.frozen = true;
        parent.animationFrozen = true;
        parent.animationFrozenValue = prop.getString();
      } else if (fill === "remove" && !this.removed) {
        this.removed = true;
        prop.setValue(parent.animationFrozen ? parent.animationFrozenValue : this.initialValue);
        return true;
      }
      return false;
    }
    this.duration += delta;
    var updated = false;
    if (this.begin < this.duration) {
      var newValue = this.calcValue();
      var typeAttr = this.getAttribute("type");
      if (typeAttr.hasValue()) {
        var type = typeAttr.getString();
        newValue = "".concat(type, "(").concat(newValue, ")");
      }
      prop.setValue(newValue);
      updated = true;
    }
    return updated;
  }
  getProgress() {
    var {
      document: document2,
      values
    } = this;
    var result = {
      progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
    };
    if (values.hasValue()) {
      var p2 = result.progress * (values.getValue().length - 1);
      var lb = Math.floor(p2);
      var ub = Math.ceil(p2);
      result.from = new Property(document2, "from", parseFloat(values.getValue()[lb]));
      result.to = new Property(document2, "to", parseFloat(values.getValue()[ub]));
      result.progress = (p2 - lb) / (ub - lb);
    } else {
      result.from = this.from;
      result.to = this.to;
    }
    return result;
  }
};
var AnimateColorElement = class extends AnimateElement {
  constructor() {
    super(...arguments);
    this.type = "animateColor";
  }
  calcValue() {
    var {
      progress,
      from,
      to
    } = this.getProgress();
    var colorFrom = new import_rgbcolor.default(from.getColor());
    var colorTo = new import_rgbcolor.default(to.getColor());
    if (colorFrom.ok && colorTo.ok) {
      var r2 = colorFrom.r + (colorTo.r - colorFrom.r) * progress;
      var g = colorFrom.g + (colorTo.g - colorFrom.g) * progress;
      var b = colorFrom.b + (colorTo.b - colorFrom.b) * progress;
      return "rgb(".concat(Math.floor(r2), ", ").concat(Math.floor(g), ", ").concat(Math.floor(b), ")");
    }
    return this.getAttribute("from").getColor();
  }
};
var AnimateTransformElement = class extends AnimateElement {
  constructor() {
    super(...arguments);
    this.type = "animateTransform";
  }
  calcValue() {
    var {
      progress,
      from,
      to
    } = this.getProgress();
    var transformFrom = toNumbers(from.getString());
    var transformTo = toNumbers(to.getString());
    var newValue = transformFrom.map((from2, i2) => {
      var to2 = transformTo[i2];
      return from2 + (to2 - from2) * progress;
    }).join(" ");
    return newValue;
  }
};
var FontElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "font";
    this.glyphs = {};
    this.horizAdvX = this.getAttribute("horiz-adv-x").getNumber();
    var {
      definitions
    } = document2;
    var {
      children
    } = this;
    for (var child of children) {
      switch (child.type) {
        case "font-face": {
          this.fontFace = child;
          var fontFamilyStyle = child.getStyle("font-family");
          if (fontFamilyStyle.hasValue()) {
            definitions[fontFamilyStyle.getString()] = this;
          }
          break;
        }
        case "missing-glyph":
          this.missingGlyph = child;
          break;
        case "glyph": {
          var glyph = child;
          if (glyph.arabicForm) {
            this.isRTL = true;
            this.isArabic = true;
            if (typeof this.glyphs[glyph.unicode] === "undefined") {
              this.glyphs[glyph.unicode] = {};
            }
            this.glyphs[glyph.unicode][glyph.arabicForm] = glyph;
          } else {
            this.glyphs[glyph.unicode] = glyph;
          }
          break;
        }
      }
    }
  }
  render() {
  }
};
var FontFaceElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "font-face";
    this.ascent = this.getAttribute("ascent").getNumber();
    this.descent = this.getAttribute("descent").getNumber();
    this.unitsPerEm = this.getAttribute("units-per-em").getNumber();
  }
};
var MissingGlyphElement = class extends PathElement {
  constructor() {
    super(...arguments);
    this.type = "missing-glyph";
    this.horizAdvX = 0;
  }
};
var TRefElement = class extends TextElement {
  constructor() {
    super(...arguments);
    this.type = "tref";
  }
  getText() {
    var element = this.getHrefAttribute().getDefinition();
    if (element) {
      var firstChild = element.children[0];
      if (firstChild) {
        return firstChild.getText();
      }
    }
    return "";
  }
};
var AElement = class extends TextElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "a";
    var {
      childNodes
    } = node2;
    var firstChild = childNodes[0];
    var hasText = childNodes.length > 0 && Array.from(childNodes).every((node3) => node3.nodeType === 3);
    this.hasText = hasText;
    this.text = hasText ? this.getTextFromNode(firstChild) : "";
  }
  getText() {
    return this.text;
  }
  renderChildren(ctx) {
    if (this.hasText) {
      super.renderChildren(ctx);
      var {
        document: document2,
        x,
        y: y2
      } = this;
      var {
        mouse
      } = document2.screen;
      var fontSize = new Property(document2, "fontSize", Font.parse(document2.ctx.font).fontSize);
      if (mouse.isWorking()) {
        mouse.checkBoundingBox(this, new BoundingBox(x, y2 - fontSize.getPixels("y"), x + this.measureText(ctx), y2));
      }
    } else if (this.children.length > 0) {
      var g = new GElement(this.document, null);
      g.children = this.children;
      g.parent = this;
      g.render(ctx);
    }
  }
  onClick() {
    var {
      window: window2
    } = this.document;
    if (window2) {
      window2.open(this.getHrefAttribute().getString());
    }
  }
  onMouseMove() {
    var ctx = this.document.ctx;
    ctx.canvas.style.cursor = "pointer";
  }
};
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$2(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var TextPathElement = class extends TextElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "textPath";
    this.textWidth = 0;
    this.textHeight = 0;
    this.pathLength = -1;
    this.glyphInfo = null;
    this.letterSpacingCache = [];
    this.measuresCache = /* @__PURE__ */ new Map([["", 0]]);
    var pathElement = this.getHrefAttribute().getDefinition();
    this.text = this.getTextFromNode();
    this.dataArray = this.parsePathData(pathElement);
  }
  getText() {
    return this.text;
  }
  path(ctx) {
    var {
      dataArray
    } = this;
    if (ctx) {
      ctx.beginPath();
    }
    dataArray.forEach((_ref) => {
      var {
        type,
        points
      } = _ref;
      switch (type) {
        case PathParser.LINE_TO:
          if (ctx) {
            ctx.lineTo(points[0], points[1]);
          }
          break;
        case PathParser.MOVE_TO:
          if (ctx) {
            ctx.moveTo(points[0], points[1]);
          }
          break;
        case PathParser.CURVE_TO:
          if (ctx) {
            ctx.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5]);
          }
          break;
        case PathParser.QUAD_TO:
          if (ctx) {
            ctx.quadraticCurveTo(points[0], points[1], points[2], points[3]);
          }
          break;
        case PathParser.ARC: {
          var [cx, cy, rx, ry, theta, dTheta, psi, fs] = points;
          var r2 = rx > ry ? rx : ry;
          var scaleX = rx > ry ? 1 : rx / ry;
          var scaleY = rx > ry ? ry / rx : 1;
          if (ctx) {
            ctx.translate(cx, cy);
            ctx.rotate(psi);
            ctx.scale(scaleX, scaleY);
            ctx.arc(0, 0, r2, theta, theta + dTheta, Boolean(1 - fs));
            ctx.scale(1 / scaleX, 1 / scaleY);
            ctx.rotate(-psi);
            ctx.translate(-cx, -cy);
          }
          break;
        }
        case PathParser.CLOSE_PATH:
          if (ctx) {
            ctx.closePath();
          }
          break;
      }
    });
  }
  renderChildren(ctx) {
    this.setTextData(ctx);
    ctx.save();
    var textDecoration = this.parent.getStyle("text-decoration").getString();
    var fontSize = this.getFontSize();
    var {
      glyphInfo
    } = this;
    var fill = ctx.fillStyle;
    if (textDecoration === "underline") {
      ctx.beginPath();
    }
    glyphInfo.forEach((glyph, i2) => {
      var {
        p0,
        p1,
        rotation,
        text: partialText
      } = glyph;
      ctx.save();
      ctx.translate(p0.x, p0.y);
      ctx.rotate(rotation);
      if (ctx.fillStyle) {
        ctx.fillText(partialText, 0, 0);
      }
      if (ctx.strokeStyle) {
        ctx.strokeText(partialText, 0, 0);
      }
      ctx.restore();
      if (textDecoration === "underline") {
        if (i2 === 0) {
          ctx.moveTo(p0.x, p0.y + fontSize / 8);
        }
        ctx.lineTo(p1.x, p1.y + fontSize / 5);
      }
    });
    if (textDecoration === "underline") {
      ctx.lineWidth = fontSize / 20;
      ctx.strokeStyle = fill;
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  }
  getLetterSpacingAt() {
    var idx = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    return this.letterSpacingCache[idx] || 0;
  }
  findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, inputOffset, dy, c3, charI) {
    var offset = inputOffset;
    var glyphWidth = this.measureText(ctx, c3);
    if (c3 === " " && anchor === "justify" && textFullWidth < fullPathWidth) {
      glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
    }
    if (charI > -1) {
      offset += this.getLetterSpacingAt(charI);
    }
    var splineStep = this.textHeight / 20;
    var p0 = this.getEquidistantPointOnPath(offset, splineStep, 0);
    var p1 = this.getEquidistantPointOnPath(offset + glyphWidth, splineStep, 0);
    var segment = {
      p0,
      p1
    };
    var rotation = p0 && p1 ? Math.atan2(p1.y - p0.y, p1.x - p0.x) : 0;
    if (dy) {
      var dyX = Math.cos(Math.PI / 2 + rotation) * dy;
      var dyY = Math.cos(-rotation) * dy;
      segment.p0 = _objectSpread$2(_objectSpread$2({}, p0), {}, {
        x: p0.x + dyX,
        y: p0.y + dyY
      });
      segment.p1 = _objectSpread$2(_objectSpread$2({}, p1), {}, {
        x: p1.x + dyX,
        y: p1.y + dyY
      });
    }
    offset += glyphWidth;
    return {
      offset,
      segment,
      rotation
    };
  }
  measureText(ctx, text) {
    var {
      measuresCache
    } = this;
    var targetText = text || this.getText();
    if (measuresCache.has(targetText)) {
      return measuresCache.get(targetText);
    }
    var measure = this.measureTargetText(ctx, targetText);
    measuresCache.set(targetText, measure);
    return measure;
  }
  // This method supposes what all custom fonts already loaded.
  // If some font will be loaded after this method call, <textPath> will not be rendered correctly.
  // You need to call this method manually to update glyphs cache.
  setTextData(ctx) {
    if (this.glyphInfo) {
      return;
    }
    var renderText = this.getText();
    var chars = renderText.split("");
    var spacesNumber = renderText.split(" ").length - 1;
    var dx = this.parent.getAttribute("dx").split().map((_2) => _2.getPixels("x"));
    var dy = this.parent.getAttribute("dy").getPixels("y");
    var anchor = this.parent.getStyle("text-anchor").getString("start");
    var thisSpacing = this.getStyle("letter-spacing");
    var parentSpacing = this.parent.getStyle("letter-spacing");
    var letterSpacing = 0;
    if (!thisSpacing.hasValue() || thisSpacing.getValue() === "inherit") {
      letterSpacing = parentSpacing.getPixels();
    } else if (thisSpacing.hasValue()) {
      if (thisSpacing.getValue() !== "initial" && thisSpacing.getValue() !== "unset") {
        letterSpacing = thisSpacing.getPixels();
      }
    }
    var letterSpacingCache = [];
    var textLen = renderText.length;
    this.letterSpacingCache = letterSpacingCache;
    for (var i2 = 0; i2 < textLen; i2++) {
      letterSpacingCache.push(typeof dx[i2] !== "undefined" ? dx[i2] : letterSpacing);
    }
    var dxSum = letterSpacingCache.reduce((acc, cur, i3) => i3 === 0 ? 0 : acc + cur || 0, 0);
    var textWidth = this.measureText(ctx);
    var textFullWidth = Math.max(textWidth + dxSum, 0);
    this.textWidth = textWidth;
    this.textHeight = this.getFontSize();
    this.glyphInfo = [];
    var fullPathWidth = this.getPathLength();
    var startOffset = this.getStyle("startOffset").getNumber(0) * fullPathWidth;
    var offset = 0;
    if (anchor === "middle" || anchor === "center") {
      offset = -textFullWidth / 2;
    }
    if (anchor === "end" || anchor === "right") {
      offset = -textFullWidth;
    }
    offset += startOffset;
    chars.forEach((char, i3) => {
      var {
        offset: nextOffset,
        segment,
        rotation
      } = this.findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, offset, dy, char, i3);
      offset = nextOffset;
      if (!segment.p0 || !segment.p1) {
        return;
      }
      this.glyphInfo.push({
        // transposeX: midpoint.x,
        // transposeY: midpoint.y,
        text: chars[i3],
        p0: segment.p0,
        p1: segment.p1,
        rotation
      });
    });
  }
  parsePathData(path) {
    this.pathLength = -1;
    if (!path) {
      return [];
    }
    var pathCommands = [];
    var {
      pathParser
    } = path;
    pathParser.reset();
    while (!pathParser.isEnd()) {
      var {
        current
      } = pathParser;
      var startX = current ? current.x : 0;
      var startY = current ? current.y : 0;
      var command = pathParser.next();
      var nextCommandType = command.type;
      var points = [];
      switch (command.type) {
        case PathParser.MOVE_TO:
          this.pathM(pathParser, points);
          break;
        case PathParser.LINE_TO:
          nextCommandType = this.pathL(pathParser, points);
          break;
        case PathParser.HORIZ_LINE_TO:
          nextCommandType = this.pathH(pathParser, points);
          break;
        case PathParser.VERT_LINE_TO:
          nextCommandType = this.pathV(pathParser, points);
          break;
        case PathParser.CURVE_TO:
          this.pathC(pathParser, points);
          break;
        case PathParser.SMOOTH_CURVE_TO:
          nextCommandType = this.pathS(pathParser, points);
          break;
        case PathParser.QUAD_TO:
          this.pathQ(pathParser, points);
          break;
        case PathParser.SMOOTH_QUAD_TO:
          nextCommandType = this.pathT(pathParser, points);
          break;
        case PathParser.ARC:
          points = this.pathA(pathParser);
          break;
        case PathParser.CLOSE_PATH:
          PathElement.pathZ(pathParser);
          break;
      }
      if (command.type !== PathParser.CLOSE_PATH) {
        pathCommands.push({
          type: nextCommandType,
          points,
          start: {
            x: startX,
            y: startY
          },
          pathLength: this.calcLength(startX, startY, nextCommandType, points)
        });
      } else {
        pathCommands.push({
          type: PathParser.CLOSE_PATH,
          points: [],
          pathLength: 0
        });
      }
    }
    return pathCommands;
  }
  pathM(pathParser, points) {
    var {
      x,
      y: y2
    } = PathElement.pathM(pathParser).point;
    points.push(x, y2);
  }
  pathL(pathParser, points) {
    var {
      x,
      y: y2
    } = PathElement.pathL(pathParser).point;
    points.push(x, y2);
    return PathParser.LINE_TO;
  }
  pathH(pathParser, points) {
    var {
      x,
      y: y2
    } = PathElement.pathH(pathParser).point;
    points.push(x, y2);
    return PathParser.LINE_TO;
  }
  pathV(pathParser, points) {
    var {
      x,
      y: y2
    } = PathElement.pathV(pathParser).point;
    points.push(x, y2);
    return PathParser.LINE_TO;
  }
  pathC(pathParser, points) {
    var {
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathC(pathParser);
    points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
  }
  pathS(pathParser, points) {
    var {
      point,
      controlPoint,
      currentPoint
    } = PathElement.pathS(pathParser);
    points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    return PathParser.CURVE_TO;
  }
  pathQ(pathParser, points) {
    var {
      controlPoint,
      currentPoint
    } = PathElement.pathQ(pathParser);
    points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
  }
  pathT(pathParser, points) {
    var {
      controlPoint,
      currentPoint
    } = PathElement.pathT(pathParser);
    points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
    return PathParser.QUAD_TO;
  }
  pathA(pathParser) {
    var {
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad
    } = PathElement.pathA(pathParser);
    if (sweepFlag === 0 && ad > 0) {
      ad -= 2 * Math.PI;
    }
    if (sweepFlag === 1 && ad < 0) {
      ad += 2 * Math.PI;
    }
    return [centp.x, centp.y, rX, rY, a1, ad, xAxisRotation, sweepFlag];
  }
  calcLength(x, y2, commandType, points) {
    var len = 0;
    var p1 = null;
    var p2 = null;
    var t2 = 0;
    switch (commandType) {
      case PathParser.LINE_TO:
        return this.getLineLength(x, y2, points[0], points[1]);
      case PathParser.CURVE_TO:
        len = 0;
        p1 = this.getPointOnCubicBezier(0, x, y2, points[0], points[1], points[2], points[3], points[4], points[5]);
        for (t2 = 0.01; t2 <= 1; t2 += 0.01) {
          p2 = this.getPointOnCubicBezier(t2, x, y2, points[0], points[1], points[2], points[3], points[4], points[5]);
          len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }
        return len;
      case PathParser.QUAD_TO:
        len = 0;
        p1 = this.getPointOnQuadraticBezier(0, x, y2, points[0], points[1], points[2], points[3]);
        for (t2 = 0.01; t2 <= 1; t2 += 0.01) {
          p2 = this.getPointOnQuadraticBezier(t2, x, y2, points[0], points[1], points[2], points[3]);
          len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }
        return len;
      case PathParser.ARC: {
        len = 0;
        var start = points[4];
        var dTheta = points[5];
        var end = points[4] + dTheta;
        var inc = Math.PI / 180;
        if (Math.abs(start - end) < inc) {
          inc = Math.abs(start - end);
        }
        p1 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
        if (dTheta < 0) {
          for (t2 = start - inc; t2 > end; t2 -= inc) {
            p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t2, 0);
            len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
        } else {
          for (t2 = start + inc; t2 < end; t2 += inc) {
            p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t2, 0);
            len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
        }
        p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
        len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
        return len;
      }
    }
    return 0;
  }
  getPointOnLine(dist, p1x, p1y, p2x, p2y) {
    var fromX = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : p1x;
    var fromY = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : p1y;
    var m3 = (p2y - p1y) / (p2x - p1x + PSEUDO_ZERO);
    var run = Math.sqrt(dist * dist / (1 + m3 * m3));
    if (p2x < p1x) {
      run *= -1;
    }
    var rise = m3 * run;
    var pt = null;
    if (p2x === p1x) {
      pt = {
        x: fromX,
        y: fromY + rise
      };
    } else if ((fromY - p1y) / (fromX - p1x + PSEUDO_ZERO) === m3) {
      pt = {
        x: fromX + run,
        y: fromY + rise
      };
    } else {
      var ix = 0;
      var iy = 0;
      var len = this.getLineLength(p1x, p1y, p2x, p2y);
      if (len < PSEUDO_ZERO) {
        return null;
      }
      var u2 = (fromX - p1x) * (p2x - p1x) + (fromY - p1y) * (p2y - p1y);
      u2 /= len * len;
      ix = p1x + u2 * (p2x - p1x);
      iy = p1y + u2 * (p2y - p1y);
      var pRise = this.getLineLength(fromX, fromY, ix, iy);
      var pRun = Math.sqrt(dist * dist - pRise * pRise);
      run = Math.sqrt(pRun * pRun / (1 + m3 * m3));
      if (p2x < p1x) {
        run *= -1;
      }
      rise = m3 * run;
      pt = {
        x: ix + run,
        y: iy + rise
      };
    }
    return pt;
  }
  getPointOnPath(distance) {
    var fullLen = this.getPathLength();
    var cumulativePathLength = 0;
    var p2 = null;
    if (distance < -5e-5 || distance - 5e-5 > fullLen) {
      return null;
    }
    var {
      dataArray
    } = this;
    for (var command of dataArray) {
      if (command && (command.pathLength < 5e-5 || cumulativePathLength + command.pathLength + 5e-5 < distance)) {
        cumulativePathLength += command.pathLength;
        continue;
      }
      var delta = distance - cumulativePathLength;
      var currentT = 0;
      switch (command.type) {
        case PathParser.LINE_TO:
          p2 = this.getPointOnLine(delta, command.start.x, command.start.y, command.points[0], command.points[1], command.start.x, command.start.y);
          break;
        case PathParser.ARC: {
          var start = command.points[4];
          var dTheta = command.points[5];
          var end = command.points[4] + dTheta;
          currentT = start + delta / command.pathLength * dTheta;
          if (dTheta < 0 && currentT < end || dTheta >= 0 && currentT > end) {
            break;
          }
          p2 = this.getPointOnEllipticalArc(command.points[0], command.points[1], command.points[2], command.points[3], currentT, command.points[6]);
          break;
        }
        case PathParser.CURVE_TO:
          currentT = delta / command.pathLength;
          if (currentT > 1) {
            currentT = 1;
          }
          p2 = this.getPointOnCubicBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3], command.points[4], command.points[5]);
          break;
        case PathParser.QUAD_TO:
          currentT = delta / command.pathLength;
          if (currentT > 1) {
            currentT = 1;
          }
          p2 = this.getPointOnQuadraticBezier(currentT, command.start.x, command.start.y, command.points[0], command.points[1], command.points[2], command.points[3]);
          break;
      }
      if (p2) {
        return p2;
      }
      break;
    }
    return null;
  }
  getLineLength(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
  getPathLength() {
    if (this.pathLength === -1) {
      this.pathLength = this.dataArray.reduce((length, command) => command.pathLength > 0 ? length + command.pathLength : length, 0);
    }
    return this.pathLength;
  }
  getPointOnCubicBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
    var x = p4x * CB1(pct) + p3x * CB2(pct) + p2x * CB3(pct) + p1x * CB4(pct);
    var y2 = p4y * CB1(pct) + p3y * CB2(pct) + p2y * CB3(pct) + p1y * CB4(pct);
    return {
      x,
      y: y2
    };
  }
  getPointOnQuadraticBezier(pct, p1x, p1y, p2x, p2y, p3x, p3y) {
    var x = p3x * QB1(pct) + p2x * QB2(pct) + p1x * QB3(pct);
    var y2 = p3y * QB1(pct) + p2y * QB2(pct) + p1y * QB3(pct);
    return {
      x,
      y: y2
    };
  }
  getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
    var cosPsi = Math.cos(psi);
    var sinPsi = Math.sin(psi);
    var pt = {
      x: rx * Math.cos(theta),
      y: ry * Math.sin(theta)
    };
    return {
      x: cx + (pt.x * cosPsi - pt.y * sinPsi),
      y: cy + (pt.x * sinPsi + pt.y * cosPsi)
    };
  }
  // TODO need some optimisations. possibly build cache only for curved segments?
  buildEquidistantCache(inputStep, inputPrecision) {
    var fullLen = this.getPathLength();
    var precision = inputPrecision || 0.25;
    var step = inputStep || fullLen / 100;
    if (!this.equidistantCache || this.equidistantCache.step !== step || this.equidistantCache.precision !== precision) {
      this.equidistantCache = {
        step,
        precision,
        points: []
      };
      var s2 = 0;
      for (var l2 = 0; l2 <= fullLen; l2 += precision) {
        var p0 = this.getPointOnPath(l2);
        var p1 = this.getPointOnPath(l2 + precision);
        if (!p0 || !p1) {
          continue;
        }
        s2 += this.getLineLength(p0.x, p0.y, p1.x, p1.y);
        if (s2 >= step) {
          this.equidistantCache.points.push({
            x: p0.x,
            y: p0.y,
            distance: l2
          });
          s2 -= step;
        }
      }
    }
  }
  getEquidistantPointOnPath(targetDistance, step, precision) {
    this.buildEquidistantCache(step, precision);
    if (targetDistance < 0 || targetDistance - this.getPathLength() > 5e-5) {
      return null;
    }
    var idx = Math.round(targetDistance / this.getPathLength() * (this.equidistantCache.points.length - 1));
    return this.equidistantCache.points[idx] || null;
  }
};
var dataUriRegex = /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*)$/i;
var ImageElement = class extends RenderedElement {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "image";
    this.loaded = false;
    var href = this.getHrefAttribute().getString();
    if (!href) {
      return;
    }
    var isSvg = href.endsWith(".svg") || /^\s*data:image\/svg\+xml/i.test(href);
    document2.images.push(this);
    if (!isSvg) {
      void this.loadImage(href);
    } else {
      void this.loadSvg(href);
    }
    this.isSvg = isSvg;
  }
  loadImage(href) {
    var _this = this;
    return _asyncToGenerator(function* () {
      try {
        var image = yield _this.document.createImage(href);
        _this.image = image;
      } catch (err) {
        console.error('Error while loading image "'.concat(href, '":'), err);
      }
      _this.loaded = true;
    })();
  }
  loadSvg(href) {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      var match = dataUriRegex.exec(href);
      if (match) {
        var data = match[5];
        if (match[4] === "base64") {
          _this2.image = atob(data);
        } else {
          _this2.image = decodeURIComponent(data);
        }
      } else {
        try {
          var response = yield _this2.document.fetch(href);
          var svg = yield response.text();
          _this2.image = svg;
        } catch (err) {
          console.error('Error while loading image "'.concat(href, '":'), err);
        }
      }
      _this2.loaded = true;
    })();
  }
  renderChildren(ctx) {
    var {
      document: document2,
      image,
      loaded
    } = this;
    var x = this.getAttribute("x").getPixels("x");
    var y2 = this.getAttribute("y").getPixels("y");
    var width = this.getStyle("width").getPixels("x");
    var height = this.getStyle("height").getPixels("y");
    if (!loaded || !image || !width || !height) {
      return;
    }
    ctx.save();
    ctx.translate(x, y2);
    if (this.isSvg) {
      var subDocument = document2.canvg.forkString(ctx, this.image, {
        ignoreMouse: true,
        ignoreAnimation: true,
        ignoreDimensions: true,
        ignoreClear: true,
        offsetX: 0,
        offsetY: 0,
        scaleWidth: width,
        scaleHeight: height
      });
      subDocument.document.documentElement.parent = this;
      void subDocument.render();
    } else {
      var _image = this.image;
      document2.setViewBox({
        ctx,
        aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
        width,
        desiredWidth: _image.width,
        height,
        desiredHeight: _image.height
      });
      if (this.loaded) {
        if (typeof _image.complete === "undefined" || _image.complete) {
          ctx.drawImage(_image, 0, 0);
        }
      }
    }
    ctx.restore();
  }
  getBoundingBox() {
    var x = this.getAttribute("x").getPixels("x");
    var y2 = this.getAttribute("y").getPixels("y");
    var width = this.getStyle("width").getPixels("x");
    var height = this.getStyle("height").getPixels("y");
    return new BoundingBox(x, y2, x + width, y2 + height);
  }
};
var SymbolElement = class extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = "symbol";
  }
  render(_2) {
  }
};
var SVGFontLoader = class {
  constructor(document2) {
    this.document = document2;
    this.loaded = false;
    document2.fonts.push(this);
  }
  load(fontFamily, url) {
    var _this = this;
    return _asyncToGenerator(function* () {
      try {
        var {
          document: document2
        } = _this;
        var svgDocument = yield document2.canvg.parser.load(url);
        var fonts = svgDocument.getElementsByTagName("font");
        Array.from(fonts).forEach((fontNode) => {
          var font = document2.createElement(fontNode);
          document2.definitions[fontFamily] = font;
        });
      } catch (err) {
        console.error('Error while loading font "'.concat(url, '":'), err);
      }
      _this.loaded = true;
    })();
  }
};
var StyleElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "style";
    var css = compressSpaces(
      Array.from(node2.childNodes).map((_2) => _2.textContent).join("").replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, "").replace(/@import.*;/g, "")
      // remove imports
    );
    var cssDefs = css.split("}");
    cssDefs.forEach((_2) => {
      var def = _2.trim();
      if (!def) {
        return;
      }
      var cssParts = def.split("{");
      var cssClasses = cssParts[0].split(",");
      var cssProps = cssParts[1].split(";");
      cssClasses.forEach((_3) => {
        var cssClass = _3.trim();
        if (!cssClass) {
          return;
        }
        var props = document2.styles[cssClass] || {};
        cssProps.forEach((cssProp) => {
          var prop = cssProp.indexOf(":");
          var name = cssProp.substr(0, prop).trim();
          var value = cssProp.substr(prop + 1, cssProp.length - prop).trim();
          if (name && value) {
            props[name] = new Property(document2, name, value);
          }
        });
        document2.styles[cssClass] = props;
        document2.stylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);
        if (cssClass === "@font-face") {
          var fontFamily = props["font-family"].getString().replace(/"|'/g, "");
          var srcs = props.src.getString().split(",");
          srcs.forEach((src) => {
            if (src.indexOf('format("svg")') > 0) {
              var url = parseExternalUrl(src);
              if (url) {
                void new SVGFontLoader(document2).load(fontFamily, url);
              }
            }
          });
        }
      });
    });
  }
};
StyleElement.parseExternalUrl = parseExternalUrl;
var UseElement = class extends RenderedElement {
  constructor() {
    super(...arguments);
    this.type = "use";
  }
  setContext(ctx) {
    super.setContext(ctx);
    var xAttr = this.getAttribute("x");
    var yAttr = this.getAttribute("y");
    if (xAttr.hasValue()) {
      ctx.translate(xAttr.getPixels("x"), 0);
    }
    if (yAttr.hasValue()) {
      ctx.translate(0, yAttr.getPixels("y"));
    }
  }
  path(ctx) {
    var {
      element
    } = this;
    if (element) {
      element.path(ctx);
    }
  }
  renderChildren(ctx) {
    var {
      document: document2,
      element
    } = this;
    if (element) {
      var tempSvg = element;
      if (element.type === "symbol") {
        tempSvg = new SVGElement(document2, null);
        tempSvg.attributes.viewBox = new Property(document2, "viewBox", element.getAttribute("viewBox").getString());
        tempSvg.attributes.preserveAspectRatio = new Property(document2, "preserveAspectRatio", element.getAttribute("preserveAspectRatio").getString());
        tempSvg.attributes.overflow = new Property(document2, "overflow", element.getAttribute("overflow").getString());
        tempSvg.children = element.children;
        element.styles.opacity = new Property(document2, "opacity", this.calculateOpacity());
      }
      if (tempSvg.type === "svg") {
        var widthStyle = this.getStyle("width", false, true);
        var heightStyle = this.getStyle("height", false, true);
        if (widthStyle.hasValue()) {
          tempSvg.attributes.width = new Property(document2, "width", widthStyle.getString());
        }
        if (heightStyle.hasValue()) {
          tempSvg.attributes.height = new Property(document2, "height", heightStyle.getString());
        }
      }
      var oldParent = tempSvg.parent;
      tempSvg.parent = this;
      tempSvg.render(ctx);
      tempSvg.parent = oldParent;
    }
  }
  getBoundingBox(ctx) {
    var {
      element
    } = this;
    if (element) {
      return element.getBoundingBox(ctx);
    }
    return null;
  }
  elementTransform() {
    var {
      document: document2,
      element
    } = this;
    return Transform.fromElement(document2, element);
  }
  get element() {
    if (!this.cachedElement) {
      this.cachedElement = this.getHrefAttribute().getDefinition();
    }
    return this.cachedElement;
  }
};
function imGet(img, x, y2, width, _height, rgba) {
  return img[y2 * width * 4 + x * 4 + rgba];
}
function imSet(img, x, y2, width, _height, rgba, val) {
  img[y2 * width * 4 + x * 4 + rgba] = val;
}
function m2(matrix, i2, v2) {
  var mi = matrix[i2];
  return mi * v2;
}
function c2(a2, m1, m22, m3) {
  return m1 + Math.cos(a2) * m22 + Math.sin(a2) * m3;
}
var FeColorMatrixElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "feColorMatrix";
    var matrix = toNumbers(this.getAttribute("values").getString());
    switch (this.getAttribute("type").getString("matrix")) {
      case "saturate": {
        var s2 = matrix[0];
        matrix = [0.213 + 0.787 * s2, 0.715 - 0.715 * s2, 0.072 - 0.072 * s2, 0, 0, 0.213 - 0.213 * s2, 0.715 + 0.285 * s2, 0.072 - 0.072 * s2, 0, 0, 0.213 - 0.213 * s2, 0.715 - 0.715 * s2, 0.072 + 0.928 * s2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        break;
      }
      case "hueRotate": {
        var a2 = matrix[0] * Math.PI / 180;
        matrix = [c2(a2, 0.213, 0.787, -0.213), c2(a2, 0.715, -0.715, -0.715), c2(a2, 0.072, -0.072, 0.928), 0, 0, c2(a2, 0.213, -0.213, 0.143), c2(a2, 0.715, 0.285, 0.14), c2(a2, 0.072, -0.072, -0.283), 0, 0, c2(a2, 0.213, -0.213, -0.787), c2(a2, 0.715, -0.715, 0.715), c2(a2, 0.072, 0.928, 0.072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        break;
      }
      case "luminanceToAlpha":
        matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721, 0, 0, 0, 0, 0, 0, 1];
        break;
    }
    this.matrix = matrix;
    this.includeOpacity = this.getAttribute("includeOpacity").hasValue();
  }
  apply(ctx, _x, _y, width, height) {
    var {
      includeOpacity,
      matrix
    } = this;
    var srcData = ctx.getImageData(0, 0, width, height);
    for (var y2 = 0; y2 < height; y2++) {
      for (var x = 0; x < width; x++) {
        var r2 = imGet(srcData.data, x, y2, width, height, 0);
        var g = imGet(srcData.data, x, y2, width, height, 1);
        var b = imGet(srcData.data, x, y2, width, height, 2);
        var a2 = imGet(srcData.data, x, y2, width, height, 3);
        var nr = m2(matrix, 0, r2) + m2(matrix, 1, g) + m2(matrix, 2, b) + m2(matrix, 3, a2) + m2(matrix, 4, 1);
        var ng = m2(matrix, 5, r2) + m2(matrix, 6, g) + m2(matrix, 7, b) + m2(matrix, 8, a2) + m2(matrix, 9, 1);
        var nb = m2(matrix, 10, r2) + m2(matrix, 11, g) + m2(matrix, 12, b) + m2(matrix, 13, a2) + m2(matrix, 14, 1);
        var na = m2(matrix, 15, r2) + m2(matrix, 16, g) + m2(matrix, 17, b) + m2(matrix, 18, a2) + m2(matrix, 19, 1);
        if (includeOpacity) {
          nr = 0;
          ng = 0;
          nb = 0;
          na *= a2 / 255;
        }
        imSet(srcData.data, x, y2, width, height, 0, nr);
        imSet(srcData.data, x, y2, width, height, 1, ng);
        imSet(srcData.data, x, y2, width, height, 2, nb);
        imSet(srcData.data, x, y2, width, height, 3, na);
      }
    }
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(srcData, 0, 0);
  }
};
var MaskElement = class _MaskElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "mask";
  }
  apply(ctx, element) {
    var {
      document: document2
    } = this;
    var x = this.getAttribute("x").getPixels("x");
    var y2 = this.getAttribute("y").getPixels("y");
    var width = this.getStyle("width").getPixels("x");
    var height = this.getStyle("height").getPixels("y");
    if (!width && !height) {
      var boundingBox = new BoundingBox();
      this.children.forEach((child) => {
        boundingBox.addBoundingBox(child.getBoundingBox(ctx));
      });
      x = Math.floor(boundingBox.x1);
      y2 = Math.floor(boundingBox.y1);
      width = Math.floor(boundingBox.width);
      height = Math.floor(boundingBox.height);
    }
    var ignoredStyles = this.removeStyles(element, _MaskElement.ignoreStyles);
    var maskCanvas = document2.createCanvas(x + width, y2 + height);
    var maskCtx = maskCanvas.getContext("2d");
    document2.screen.setDefaults(maskCtx);
    this.renderChildren(maskCtx);
    new FeColorMatrixElement(document2, {
      nodeType: 1,
      childNodes: [],
      attributes: [{
        nodeName: "type",
        value: "luminanceToAlpha"
      }, {
        nodeName: "includeOpacity",
        value: "true"
      }]
    }).apply(maskCtx, 0, 0, x + width, y2 + height);
    var tmpCanvas = document2.createCanvas(x + width, y2 + height);
    var tmpCtx = tmpCanvas.getContext("2d");
    document2.screen.setDefaults(tmpCtx);
    element.render(tmpCtx);
    tmpCtx.globalCompositeOperation = "destination-in";
    tmpCtx.fillStyle = maskCtx.createPattern(maskCanvas, "no-repeat");
    tmpCtx.fillRect(0, 0, x + width, y2 + height);
    ctx.fillStyle = tmpCtx.createPattern(tmpCanvas, "no-repeat");
    ctx.fillRect(0, 0, x + width, y2 + height);
    this.restoreStyles(element, ignoredStyles);
  }
  render(_2) {
  }
};
MaskElement.ignoreStyles = ["mask", "transform", "clip-path"];
var noop = () => {
};
var ClipPathElement = class extends Element {
  constructor() {
    super(...arguments);
    this.type = "clipPath";
  }
  apply(ctx) {
    var {
      document: document2
    } = this;
    var contextProto = Reflect.getPrototypeOf(ctx);
    var {
      beginPath,
      closePath
    } = ctx;
    if (contextProto) {
      contextProto.beginPath = noop;
      contextProto.closePath = noop;
    }
    Reflect.apply(beginPath, ctx, []);
    this.children.forEach((child) => {
      if (typeof child.path === "undefined") {
        return;
      }
      var transform = typeof child.elementTransform !== "undefined" ? child.elementTransform() : null;
      if (!transform) {
        transform = Transform.fromElement(document2, child);
      }
      if (transform) {
        transform.apply(ctx);
      }
      child.path(ctx);
      if (contextProto) {
        contextProto.closePath = closePath;
      }
      if (transform) {
        transform.unapply(ctx);
      }
    });
    Reflect.apply(closePath, ctx, []);
    ctx.clip();
    if (contextProto) {
      contextProto.beginPath = beginPath;
      contextProto.closePath = closePath;
    }
  }
  render(_2) {
  }
};
var FilterElement = class _FilterElement extends Element {
  constructor() {
    super(...arguments);
    this.type = "filter";
  }
  apply(ctx, element) {
    var {
      document: document2,
      children
    } = this;
    var boundingBox = element.getBoundingBox(ctx);
    if (!boundingBox) {
      return;
    }
    var px = 0;
    var py = 0;
    children.forEach((child) => {
      var efd = child.extraFilterDistance || 0;
      px = Math.max(px, efd);
      py = Math.max(py, efd);
    });
    var width = Math.floor(boundingBox.width);
    var height = Math.floor(boundingBox.height);
    var tmpCanvasWidth = width + 2 * px;
    var tmpCanvasHeight = height + 2 * py;
    if (tmpCanvasWidth < 1 || tmpCanvasHeight < 1) {
      return;
    }
    var x = Math.floor(boundingBox.x);
    var y2 = Math.floor(boundingBox.y);
    var ignoredStyles = this.removeStyles(element, _FilterElement.ignoreStyles);
    var tmpCanvas = document2.createCanvas(tmpCanvasWidth, tmpCanvasHeight);
    var tmpCtx = tmpCanvas.getContext("2d");
    document2.screen.setDefaults(tmpCtx);
    tmpCtx.translate(-x + px, -y2 + py);
    element.render(tmpCtx);
    children.forEach((child) => {
      if (typeof child.apply === "function") {
        child.apply(tmpCtx, 0, 0, tmpCanvasWidth, tmpCanvasHeight);
      }
    });
    ctx.drawImage(tmpCanvas, 0, 0, tmpCanvasWidth, tmpCanvasHeight, x - px, y2 - py, tmpCanvasWidth, tmpCanvasHeight);
    this.restoreStyles(element, ignoredStyles);
  }
  render(_2) {
  }
};
FilterElement.ignoreStyles = ["filter", "transform", "clip-path"];
var FeDropShadowElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "feDropShadow";
    this.addStylesFromStyleDefinition();
  }
  apply(_2, _x, _y, _width, _height) {
  }
};
var FeMorphologyElement = class extends Element {
  constructor() {
    super(...arguments);
    this.type = "feMorphology";
  }
  apply(_2, _x, _y, _width, _height) {
  }
};
var FeCompositeElement = class extends Element {
  constructor() {
    super(...arguments);
    this.type = "feComposite";
  }
  apply(_2, _x, _y, _width, _height) {
  }
};
var FeGaussianBlurElement = class extends Element {
  constructor(document2, node2, captureTextNodes) {
    super(document2, node2, captureTextNodes);
    this.type = "feGaussianBlur";
    this.blurRadius = Math.floor(this.getAttribute("stdDeviation").getNumber());
    this.extraFilterDistance = this.blurRadius;
  }
  apply(ctx, x, y2, width, height) {
    var {
      document: document2,
      blurRadius
    } = this;
    var body = document2.window ? document2.window.document.body : null;
    var canvas = ctx.canvas;
    canvas.id = document2.getUniqueId();
    if (body) {
      canvas.style.display = "none";
      body.appendChild(canvas);
    }
    processCanvasRGBA(canvas, x, y2, width, height, blurRadius);
    if (body) {
      body.removeChild(canvas);
    }
  }
};
var TitleElement = class extends Element {
  constructor() {
    super(...arguments);
    this.type = "title";
  }
};
var DescElement = class extends Element {
  constructor() {
    super(...arguments);
    this.type = "desc";
  }
};
var elements = {
  "svg": SVGElement,
  "rect": RectElement,
  "circle": CircleElement,
  "ellipse": EllipseElement,
  "line": LineElement,
  "polyline": PolylineElement,
  "polygon": PolygonElement,
  "path": PathElement,
  "pattern": PatternElement,
  "marker": MarkerElement,
  "defs": DefsElement,
  "linearGradient": LinearGradientElement,
  "radialGradient": RadialGradientElement,
  "stop": StopElement,
  "animate": AnimateElement,
  "animateColor": AnimateColorElement,
  "animateTransform": AnimateTransformElement,
  "font": FontElement,
  "font-face": FontFaceElement,
  "missing-glyph": MissingGlyphElement,
  "glyph": GlyphElement,
  "text": TextElement,
  "tspan": TSpanElement,
  "tref": TRefElement,
  "a": AElement,
  "textPath": TextPathElement,
  "image": ImageElement,
  "g": GElement,
  "symbol": SymbolElement,
  "style": StyleElement,
  "use": UseElement,
  "mask": MaskElement,
  "clipPath": ClipPathElement,
  "filter": FilterElement,
  "feDropShadow": FeDropShadowElement,
  "feMorphology": FeMorphologyElement,
  "feComposite": FeCompositeElement,
  "feColorMatrix": FeColorMatrixElement,
  "feGaussianBlur": FeGaussianBlurElement,
  "title": TitleElement,
  "desc": DescElement
};
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
function createImage(_x) {
  return _createImage.apply(this, arguments);
}
function _createImage() {
  _createImage = _asyncToGenerator(function* (src) {
    var anonymousCrossOrigin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var image = document.createElement("img");
    if (anonymousCrossOrigin) {
      image.crossOrigin = "Anonymous";
    }
    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (_event, _source, _lineno, _colno, error) => {
        reject(error);
      };
      image.src = src;
    });
  });
  return _createImage.apply(this, arguments);
}
var Document = class _Document {
  constructor(canvg) {
    var {
      rootEmSize = 12,
      emSize = 12,
      createCanvas: createCanvas2 = _Document.createCanvas,
      createImage: createImage2 = _Document.createImage,
      anonymousCrossOrigin
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.canvg = canvg;
    this.definitions = {};
    this.styles = {};
    this.stylesSpecificity = {};
    this.images = [];
    this.fonts = [];
    this.emSizeStack = [];
    this.uniqueId = 0;
    this.screen = canvg.screen;
    this.rootEmSize = rootEmSize;
    this.emSize = emSize;
    this.createCanvas = createCanvas2;
    this.createImage = this.bindCreateImage(createImage2, anonymousCrossOrigin);
    this.screen.wait(this.isImagesLoaded.bind(this));
    this.screen.wait(this.isFontsLoaded.bind(this));
  }
  bindCreateImage(createImage2, anonymousCrossOrigin) {
    if (typeof anonymousCrossOrigin === "boolean") {
      return (source, forceAnonymousCrossOrigin) => createImage2(source, typeof forceAnonymousCrossOrigin === "boolean" ? forceAnonymousCrossOrigin : anonymousCrossOrigin);
    }
    return createImage2;
  }
  get window() {
    return this.screen.window;
  }
  get fetch() {
    return this.screen.fetch;
  }
  get ctx() {
    return this.screen.ctx;
  }
  get emSize() {
    var {
      emSizeStack
    } = this;
    return emSizeStack[emSizeStack.length - 1];
  }
  set emSize(value) {
    var {
      emSizeStack
    } = this;
    emSizeStack.push(value);
  }
  popEmSize() {
    var {
      emSizeStack
    } = this;
    emSizeStack.pop();
  }
  getUniqueId() {
    return "canvg".concat(++this.uniqueId);
  }
  isImagesLoaded() {
    return this.images.every((_2) => _2.loaded);
  }
  isFontsLoaded() {
    return this.fonts.every((_2) => _2.loaded);
  }
  createDocumentElement(document2) {
    var documentElement = this.createElement(document2.documentElement);
    documentElement.root = true;
    documentElement.addStylesFromStyleDefinition();
    this.documentElement = documentElement;
    return documentElement;
  }
  createElement(node2) {
    var elementType = node2.nodeName.replace(/^[^:]+:/, "");
    var ElementType = _Document.elementTypes[elementType];
    if (typeof ElementType !== "undefined") {
      return new ElementType(this, node2);
    }
    return new UnknownElement(this, node2);
  }
  createTextNode(node2) {
    return new TextNode(this, node2);
  }
  setViewBox(config) {
    this.screen.setViewBox(_objectSpread$1({
      document: this
    }, config));
  }
};
Document.createCanvas = createCanvas;
Document.createImage = createImage;
Document.elementTypes = elements;
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var Canvg = class _Canvg {
  /**
   * Main constructor.
   * @param ctx - Rendering context.
   * @param svg - SVG Document.
   * @param options - Rendering options.
   */
  constructor(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.parser = new Parser(options);
    this.screen = new Screen(ctx, options);
    this.options = options;
    var document2 = new Document(this, options);
    var documentElement = document2.createDocumentElement(svg);
    this.document = document2;
    this.documentElement = documentElement;
  }
  /**
   * Create Canvg instance from SVG source string or URL.
   * @param ctx - Rendering context.
   * @param svg - SVG source string or URL.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */
  static from(ctx, svg) {
    var _arguments = arguments;
    return _asyncToGenerator(function* () {
      var options = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : {};
      var parser = new Parser(options);
      var svgDocument = yield parser.parse(svg);
      return new _Canvg(ctx, svgDocument, options);
    })();
  }
  /**
   * Create Canvg instance from SVG source string.
   * @param ctx - Rendering context.
   * @param svg - SVG source string.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */
  static fromString(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var parser = new Parser(options);
    var svgDocument = parser.parseFromString(svg);
    return new _Canvg(ctx, svgDocument, options);
  }
  /**
   * Create new Canvg instance with inherited options.
   * @param ctx - Rendering context.
   * @param svg - SVG source string or URL.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */
  fork(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return _Canvg.from(ctx, svg, _objectSpread(_objectSpread({}, this.options), options));
  }
  /**
   * Create new Canvg instance with inherited options.
   * @param ctx - Rendering context.
   * @param svg - SVG source string.
   * @param options - Rendering options.
   * @returns Canvg instance.
   */
  forkString(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return _Canvg.fromString(ctx, svg, _objectSpread(_objectSpread({}, this.options), options));
  }
  /**
   * Document is ready promise.
   * @returns Ready promise.
   */
  ready() {
    return this.screen.ready();
  }
  /**
   * Document is ready value.
   * @returns Is ready or not.
   */
  isReady() {
    return this.screen.isReady();
  }
  /**
   * Render only first frame, ignoring animations and mouse.
   * @param options - Rendering options.
   */
  render() {
    var _arguments2 = arguments, _this = this;
    return _asyncToGenerator(function* () {
      var options = _arguments2.length > 0 && _arguments2[0] !== void 0 ? _arguments2[0] : {};
      _this.start(_objectSpread({
        enableRedraw: true,
        ignoreAnimation: true,
        ignoreMouse: true
      }, options));
      yield _this.ready();
      _this.stop();
    })();
  }
  /**
   * Start rendering.
   * @param options - Render options.
   */
  start() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var {
      documentElement,
      screen,
      options: baseOptions
    } = this;
    screen.start(documentElement, _objectSpread(_objectSpread({
      enableRedraw: true
    }, baseOptions), options));
  }
  /**
   * Stop rendering.
   */
  stop() {
    this.screen.stop();
  }
  /**
   * Resize SVG to fit in given size.
   * @param width
   * @param height
   * @param preserveAspectRatio
   */
  resize(width) {
    var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : width;
    var preserveAspectRatio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    this.documentElement.resize(width, height, preserveAspectRatio);
  }
};
export {
  AElement,
  AnimateColorElement,
  AnimateElement,
  AnimateTransformElement,
  BoundingBox,
  CB1,
  CB2,
  CB3,
  CB4,
  Canvg,
  CircleElement,
  ClipPathElement,
  DefsElement,
  DescElement,
  Document,
  Element,
  EllipseElement,
  FeColorMatrixElement,
  FeCompositeElement,
  FeDropShadowElement,
  FeGaussianBlurElement,
  FeMorphologyElement,
  FilterElement,
  Font,
  FontElement,
  FontFaceElement,
  GElement,
  GlyphElement,
  GradientElement,
  ImageElement,
  LineElement,
  LinearGradientElement,
  MarkerElement,
  MaskElement,
  Matrix,
  MissingGlyphElement,
  Mouse,
  PSEUDO_ZERO,
  Parser,
  PathElement,
  PathParser,
  PatternElement,
  Point,
  PolygonElement,
  PolylineElement,
  Property,
  QB1,
  QB2,
  QB3,
  RadialGradientElement,
  RectElement,
  RenderedElement,
  Rotate,
  SVGElement,
  SVGFontLoader,
  Scale,
  Screen,
  Skew,
  SkewX,
  SkewY,
  StopElement,
  StyleElement,
  SymbolElement,
  TRefElement,
  TSpanElement,
  TextElement,
  TextPathElement,
  TitleElement,
  Transform,
  Translate,
  UnknownElement,
  UseElement,
  ViewPort,
  compressSpaces,
  Canvg as default,
  getSelectorSpecificity,
  normalizeAttributeName,
  normalizeColor,
  parseExternalUrl,
  index as presets,
  toNumbers,
  trimLeft,
  trimRight,
  vectorMagnitude,
  vectorsAngle,
  vectorsRatio
};
/*! Bundled license information:

svg-pathdata/lib/SVGPathData.module.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=index.es-4ORVVIJC.js.map

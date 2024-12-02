import {
  __extends,
  __generator,
  __read
} from "./chunk-SM3G46PA.js";
import {
  __export
} from "./chunk-Y6Q6HMFU.js";

// node_modules/@amcharts/amcharts4/.internal/core/utils/Percent.js
var Percent = (
  /** @class */
  function() {
    function Percent2(percent2) {
      this._value = percent2;
    }
    Object.defineProperty(Percent2.prototype, "value", {
      /**
       * Relative value.
       *
       * E.g. 100% is 1, 50% is 0.5, etc.
       *
       * This is useful to apply transformations to other values. E.g.:
       *
       * ```TypeScript
       * let value = 256;
       * let percent = new am4core.Percent(50);
       * console.log(value * percent.value); // outputs 128
       * ```
       * ```JavaScript
       * var value = 256;
       * var percent = new am4core.Percent(50);
       * console.log(value * percent.value); // outputs 128
       * ```
       *
       * Alternatively, you can use `am4core.percent()` helper function:
       *
       * ```TypeScript
       * let value = 256;
       * let percent = am4core.percent(50);
       * console.log(value * percent.value); // outputs 128
       * ```
       * ```JavaScript
       * var value = 256;
       * var percent = am4core.percent(50);
       * console.log(value * percent.value); // outputs 128
       * ```
       *
       * @readonly
       * @return Relative value
       */
      get: function() {
        return this._value / 100;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Percent2.prototype, "percent", {
      /**
       * Value in percent.
       *
       * @return Percent
       */
      get: function() {
        return this._value;
      },
      enumerable: true,
      configurable: true
    });
    Percent2.prototype.toString = function() {
      return "" + this._value + "%";
    };
    return Percent2;
  }()
);
function percent(value) {
  return new Percent(value);
}
function isPercent(value) {
  return value instanceof Percent;
}

// node_modules/@amcharts/amcharts4/.internal/core/utils/Type.js
var Type_exports = {};
__export(Type_exports, {
  castNumber: () => castNumber,
  castString: () => castString,
  checkArray: () => checkArray,
  checkBoolean: () => checkBoolean,
  checkDate: () => checkDate,
  checkNumber: () => checkNumber,
  checkObject: () => checkObject,
  checkString: () => checkString,
  getDefault: () => getDefault,
  getType: () => getType,
  getValue: () => getValue,
  getValueDefault: () => getValueDefault,
  hasValue: () => hasValue,
  isArray: () => isArray,
  isDate: () => isDate,
  isNaN: () => isNaN,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isString: () => isString,
  toBoolean: () => toBoolean,
  toNumber: () => toNumber,
  toNumberOrPercent: () => toNumberOrPercent,
  toText: () => toText
});
function isNaN(value) {
  return Number(value) !== value;
}
function getType(value) {
  return {}.toString.call(value);
}
function getDefault(value, optional) {
  return value || optional;
}
function checkString(value) {
  if (typeof value === "string") {
    return true;
  } else {
    throw new Error("Expected a string but got " + getType(value));
  }
}
function checkBoolean(value) {
  if (typeof value === "boolean") {
    return true;
  } else {
    throw new Error("Expected a boolean but got " + getType(value));
  }
}
function checkNumber(value) {
  if (typeof value === "number") {
    if (isNaN(value)) {
      throw new Error("Expected a number but got NaN");
    }
  } else {
    throw new Error("Expected a number but got " + getType(value));
  }
  return true;
}
function checkObject(value) {
  var t = getType(value);
  if (t === "[object Object]") {
    return true;
  } else {
    throw new Error("Expected an object but got " + t);
  }
}
function checkArray(value) {
  if (Array.isArray(value)) {
    return true;
  } else {
    throw new Error("Expected an array but got " + getType(value));
  }
}
function checkDate(value) {
  var t = getType(value);
  if (t === "[object Date]") {
    return true;
  } else {
    throw new Error("Expected a date but got " + t);
  }
}
function castString(value) {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return "" + value;
  } else {
    throw new Error("Expected a string or number but got " + getType(value));
  }
}
function castNumber(value) {
  if (typeof value === "string") {
    var number = +value;
    if (isNaN(number)) {
      throw new Error("Cannot cast string " + JSON.stringify(value) + " to a number");
    } else {
      return number;
    }
  } else if (typeof value === "number") {
    if (isNaN(value)) {
      throw new Error("Expected a number but got NaN");
    } else {
      return value;
    }
  } else {
    var t = getType(value);
    if (t === "[object Date]") {
      return value.getTime();
    } else {
      throw new Error("Expected a string, number, or date but got " + t);
    }
  }
}
function toBoolean(value) {
  return value ? true : false;
}
function toNumber(value) {
  if (hasValue(value) && !isNumber(value)) {
    var converted = Number(value);
    if (isNaN(converted) && isString(value) && value != "") {
      return toNumber(value.replace(/[^0-9.\-]+/g, ""));
    }
    return converted;
  }
  return value;
}
function toText(value) {
  if (hasValue(value) && !isString(value)) {
    if (isNumber(value)) {
      return castString(value);
    } else if (isObject(value)) {
      return value.toString();
    }
  }
  return value;
}
function toNumberOrPercent(value) {
  if (!hasValue(value) || isNumber(value) || isPercent(value)) {
    return value;
  }
  if (isString(value) && value.indexOf("%") != -1) {
    return percent(toNumber(value));
  }
  return toNumber(value);
}
function hasValue(a) {
  return a != null;
}
function getValue(a) {
  if (hasValue(a)) {
    return a;
  } else {
    throw new Error("Value doesn't exist");
  }
}
function getValueDefault(a, defaultValue) {
  if (hasValue(a)) {
    return a;
  } else {
    return defaultValue;
  }
}
function isDate(value) {
  return getType(value) === "[object Date]";
}
function isString(value) {
  return typeof value === "string";
}
function isNumber(value) {
  return typeof value === "number" && Number(value) == value;
}
function isObject(value) {
  return typeof value === "object" && value != null;
}
function isArray(value) {
  return Array.isArray(value);
}

// node_modules/@amcharts/amcharts4/.internal/core/utils/Math.js
var Math_exports = {};
__export(Math_exports, {
  DEGREES: () => DEGREES,
  HALFPI: () => HALFPI,
  PI: () => PI,
  RADIANS: () => RADIANS,
  adjustTension: () => adjustTension,
  ceil: () => ceil,
  closest: () => closest,
  cos: () => cos,
  fitAngleToRange: () => fitAngleToRange,
  fitToRange: () => fitToRange,
  getAngle: () => getAngle,
  getArcPoint: () => getArcPoint,
  getArcRect: () => getArcRect,
  getBBox: () => getBBox,
  getCenterShift: () => getCenterShift,
  getCommonRectangle: () => getCommonRectangle,
  getCubicControlPointA: () => getCubicControlPointA,
  getCubicControlPointB: () => getCubicControlPointB,
  getCubicCurveDistance: () => getCubicCurveDistance,
  getDistance: () => getDistance,
  getHorizontalDistance: () => getHorizontalDistance,
  getLineIntersection: () => getLineIntersection,
  getMidPoint: () => getMidPoint,
  getPointOnCubicCurve: () => getPointOnCubicCurve,
  getPointOnQuadraticCurve: () => getPointOnQuadraticCurve,
  getRotation: () => getRotation,
  getScale: () => getScale,
  getVerticalDistance: () => getVerticalDistance,
  intersect: () => intersect,
  intersection: () => intersection,
  invertRange: () => invertRange,
  isInRectangle: () => isInRectangle,
  max: () => max,
  min: () => min,
  normalizeAngle: () => normalizeAngle,
  round: () => round,
  sin: () => sin,
  stretch: () => stretch,
  tan: () => tan,
  toNumberRange: () => toNumberRange
});
var PI = Math.PI;
var HALFPI = PI / 2;
var RADIANS = PI / 180;
var DEGREES = 180 / PI;
function toNumberRange(value, min4, max4) {
  if (hasValue(value)) {
    value = toNumber(value);
    return fitToRange(value, min4, max4);
  }
  return value;
}
function round(value, precision, floor) {
  if (!isNumber(precision) || precision <= 0) {
    var rounded = Math.round(value);
    if (floor) {
      if (rounded - value == 0.5) {
        rounded--;
      }
    }
    return rounded;
  } else {
    var d = Math.pow(10, precision);
    return Math.round(value * d) / d;
  }
}
function ceil(value, precision) {
  if (!isNumber(precision) || precision <= 0) {
    return Math.ceil(value);
  } else {
    var d = Math.pow(10, precision);
    return Math.ceil(value * d) / d;
  }
}
function stretch(t, from, to) {
  return t * (to - from) + from;
}
function fitToRange(value, minValue, maxValue) {
  if (isNumber(minValue)) {
    if (isNumber(maxValue) && maxValue < minValue) {
      var temp = maxValue;
      maxValue = minValue;
      minValue = temp;
    }
    if (value < minValue) {
      value = minValue;
    }
  }
  if (isNumber(maxValue)) {
    if (value > maxValue) {
      value = maxValue;
    }
  }
  return value;
}
function sin(value) {
  return round(Math.sin(RADIANS * value), 10);
}
function tan(value) {
  return round(Math.tan(RADIANS * value), 10);
}
function cos(value) {
  return round(Math.cos(RADIANS * value), 10);
}
function max(left, right) {
  if (isNumber(left)) {
    if (isNumber(right)) {
      if (right > left) {
        return right;
      } else {
        return left;
      }
    } else {
      return left;
    }
  } else if (isNumber(right)) {
    return right;
  } else {
    return null;
  }
}
function min(left, right) {
  if (isNumber(left)) {
    if (isNumber(right)) {
      if (right < left) {
        return right;
      } else {
        return left;
      }
    } else {
      return left;
    }
  } else if (isNumber(right)) {
    return right;
  } else {
    return null;
  }
}
function closest(values, referenceValue) {
  return values.reduce(function(prev, curr) {
    return Math.abs(curr - referenceValue) < Math.abs(prev - referenceValue) ? curr : prev;
  });
}
function intersect(range1, range2) {
  var start1 = getValue(range1.start);
  var start2 = getValue(range2.start);
  var end1 = getValue(range1.end);
  var end2 = getValue(range2.end);
  return Math.max(start1, start2) <= Math.min(end1, end2);
}
function invertRange(range) {
  var start = getValue(range.start);
  var end = getValue(range.end);
  return { start: 1 - end, end: 1 - start };
}
function intersection(range1, range2) {
  var start1 = getValue(range1.start);
  var start2 = getValue(range2.start);
  var end1 = getValue(range1.end);
  var end2 = getValue(range2.end);
  var startMax = Math.max(start1, start2);
  var endMin = Math.min(end1, end2);
  if (endMin < startMax) {
    return void 0;
  } else {
    return { start: startMax, end: endMin };
  }
}
function getDistance(point1, point2) {
  if (!point1) {
    return 0;
  }
  if (!point2) {
    point2 = { x: 0, y: 0 };
  }
  return Math.sqrt(Math.pow(Math.abs(point1.x - point2.x), 2) + Math.pow(Math.abs(point1.y - point2.y), 2));
}
function getHorizontalDistance(point1, point2) {
  if (!point1) {
    return 0;
  }
  if (!point2) {
    point2 = { x: 0, y: 0 };
  }
  return Math.abs(point1.x - point2.x);
}
function getVerticalDistance(point1, point2) {
  if (!point1) {
    return 0;
  }
  if (!point2) {
    point2 = { x: 0, y: 0 };
  }
  return Math.abs(point1.y - point2.y);
}
function getCubicCurveDistance(point1, point2, controlPointA, controlPointB, stepCount) {
  if (!point1) {
    return 0;
  }
  if (!point2) {
    point2 = { x: 0, y: 0 };
  }
  var distance = 0;
  var prevPoint = point1;
  if (stepCount > 0) {
    for (var s = 0; s <= stepCount; s++) {
      var point = getPointOnCubicCurve(point1, point2, controlPointA, controlPointB, s / stepCount);
      distance += getDistance(prevPoint, point);
      prevPoint = point;
    }
  }
  return distance;
}
function getScale(point1, startPoint1, point2, startPoint2) {
  var initialDistance = getDistance(startPoint1, startPoint2);
  var currentDistance = getDistance(point1, point2);
  return Math.abs(currentDistance / initialDistance);
}
function getMidPoint(point1, point2, position) {
  if (!isNumber(position)) {
    position = 0.5;
  }
  return {
    "x": point1.x + (point2.x - point1.x) * position,
    "y": point1.y + (point2.y - point1.y) * position
  };
}
function getRotation(point1, startPoint1, point2, startPoint2) {
  var startAngle = getAngle(startPoint1, startPoint2);
  var angle = getAngle(point1, point2);
  var diff = startAngle - angle;
  if (diff < 0) {
    diff += 360;
  }
  return diff;
}
function getAngle(point1, point2) {
  if (!point2) {
    point2 = { x: point1.x * 2, y: point1.y * 2 };
  }
  var diffX = point2.x - point1.x;
  var diffY = point2.y - point1.y;
  var angle = Math.atan2(diffY, diffX) * DEGREES;
  if (angle < 0) {
    angle += 360;
  }
  return normalizeAngle(angle);
}
function getCenterShift(center, point1, startPoint1, point2, startPoint2) {
  var angle = getRotation(point1, startPoint1, point2, startPoint2) - 90;
  if (angle < 0) {
    angle += 360;
  }
  var distance = getDistance(point1, point2);
  var x = Math.cos(angle) / distance + point1.x;
  var y = Math.cos(angle) / distance + point1.y;
  var shift = {
    "x": x - center.x,
    "y": y - center.y
  };
  return shift;
}
function getBBox(points) {
  if (points) {
    var length_1 = points.length;
    if (length_1 !== 0) {
      var left = void 0;
      var right = void 0;
      var top_1;
      var bottom = void 0;
      for (var i = 0; i < length_1; i++) {
        var point = points[i];
        if (!isNumber(right) || point.x > right) {
          right = point.x;
        }
        if (!isNumber(left) || point.x < left) {
          left = point.x;
        }
        if (!isNumber(top_1) || point.y < top_1) {
          top_1 = point.y;
        }
        if (!isNumber(bottom) || point.y > bottom) {
          bottom = point.y;
        }
      }
      return { x: left, y: top_1, width: right - left, height: bottom - top_1 };
    }
  }
  return { x: 0, y: 0, width: 0, height: 0 };
}
function getCommonRectangle(rectangles) {
  var length2 = rectangles.length;
  if (length2 !== 0) {
    var minX = void 0;
    var minY = void 0;
    var maxX = void 0;
    var maxY = void 0;
    for (var i = 0; i < length2; i++) {
      var rectangle = rectangles[i];
      minX = min(rectangle.x, minX);
      minY = min(rectangle.y, minY);
      maxX = max(rectangle.x + rectangle.width, maxX);
      maxY = max(rectangle.y + rectangle.height, maxY);
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }
}
function getPointOnQuadraticCurve(pointA, pointB, controlPoint, position) {
  var x = (1 - position) * (1 - position) * pointA.x + 2 * (1 - position) * position * controlPoint.x + position * position * pointB.x;
  var y = (1 - position) * (1 - position) * pointA.y + 2 * (1 - position) * position * controlPoint.y + position * position * pointB.y;
  return { x, y };
}
function getPointOnCubicCurve(pointA, pointB, controlPointA, controlPointB, position) {
  var point = { x: 0, y: 0 };
  var mt1 = 1 - position;
  var mt2 = mt1 * mt1;
  var mt3 = mt2 * mt1;
  point.x = pointA.x * mt3 + controlPointA.x * 3 * mt2 * position + controlPointB.x * 3 * mt1 * position * position + pointB.x * position * position * position;
  point.y = pointA.y * mt3 + controlPointA.y * 3 * mt2 * position + controlPointB.y * 3 * mt1 * position * position + pointB.y * position * position * position;
  return point;
}
function getCubicControlPointA(p0, p1, p2, p3, tensionX, tensionY) {
  tensionX = adjustTension(tensionX);
  tensionY = adjustTension(tensionY);
  return { x: (-p0.x + p1.x / tensionX + p2.x) * tensionX, y: (-p0.y + p1.y / tensionY + p2.y) * tensionY };
}
function getCubicControlPointB(p0, p1, p2, p3, tensionX, tensionY) {
  tensionX = adjustTension(tensionX);
  tensionY = adjustTension(tensionY);
  return { x: (p1.x + p2.x / tensionX - p3.x) * tensionX, y: (p1.y + p2.y / tensionY - p3.y) * tensionY };
}
function adjustTension(tension) {
  return 1 - tension + 1e-5;
}
function normalizeAngle(value) {
  if (value == 360) {
    return 360;
  }
  return value % 360;
}
function fitAngleToRange(value, startAngle, endAngle) {
  if (startAngle > endAngle) {
    var temp = startAngle;
    startAngle = endAngle;
    endAngle = temp;
  }
  value = normalizeAngle(value);
  var count = (startAngle - normalizeAngle(startAngle)) / 360;
  if (value < startAngle) {
    value += 360 * (count + 1);
  }
  var maxEnd = startAngle + (endAngle - startAngle) / 2 + 180;
  var maxStart = startAngle + (endAngle - startAngle) / 2 - 180;
  if (value > endAngle) {
    if (value - 360 > startAngle) {
      value -= 360;
    } else {
      if (value < maxEnd) {
        value = endAngle;
      } else {
        value = startAngle;
      }
    }
  }
  if (value < startAngle) {
    if (value > maxStart) {
      value = startAngle;
    } else {
      value = endAngle;
    }
  }
  return value;
}
function getArcRect(startAngle, endAngle, radius) {
  var minX = Number.MAX_VALUE;
  var minY = Number.MAX_VALUE;
  var maxX = -Number.MAX_VALUE;
  var maxY = -Number.MAX_VALUE;
  var bpoints = [];
  if (!isNumber(radius)) {
    radius = 1;
  }
  bpoints.push(getArcPoint(radius, startAngle));
  bpoints.push(getArcPoint(radius, endAngle));
  var fromAngle = Math.min(Math.floor(startAngle / 90) * 90, Math.floor(endAngle / 90) * 90);
  var toAngle = Math.max(Math.ceil(startAngle / 90) * 90, Math.ceil(endAngle / 90) * 90);
  for (var angle = fromAngle; angle <= toAngle; angle += 90) {
    if (angle >= startAngle && angle <= endAngle) {
      bpoints.push(getArcPoint(radius, angle));
    }
  }
  for (var i = 0; i < bpoints.length; i++) {
    var pt = bpoints[i];
    if (pt.x < minX) {
      minX = pt.x;
    }
    if (pt.y < minY) {
      minY = pt.y;
    }
    if (pt.x > maxX) {
      maxX = pt.x;
    }
    if (pt.y > maxY) {
      maxY = pt.y;
    }
  }
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}
function getArcPoint(radius, arc) {
  return { x: radius * cos(arc), y: radius * sin(arc) };
}
function isInRectangle(point, rectangle) {
  if (point.x >= rectangle.x && point.x <= rectangle.x + rectangle.width && point.y >= rectangle.y && point.y <= rectangle.y + rectangle.height) {
    return true;
  }
  return false;
}
function getLineIntersection(pointA1, pointA2, pointB1, pointB2) {
  var x = ((pointA1.x * pointA2.y - pointA2.x * pointA1.y) * (pointB1.x - pointB2.x) - (pointA1.x - pointA2.x) * (pointB1.x * pointB2.y - pointB1.y * pointB2.x)) / ((pointA1.x - pointA2.x) * (pointB1.y - pointB2.y) - (pointA1.y - pointA2.y) * (pointB1.x - pointB2.x));
  var y = ((pointA1.x * pointA2.y - pointA2.x * pointA1.y) * (pointB1.y - pointB2.y) - (pointA1.y - pointA2.y) * (pointB1.x * pointB2.y - pointB1.y * pointB2.x)) / ((pointA1.x - pointA2.x) * (pointB1.y - pointB2.y) - (pointA1.y - pointA2.y) * (pointB1.x - pointB2.x));
  return { x, y };
}

// node_modules/@amcharts/amcharts4/.internal/core/utils/Array.js
var Array_exports = {};
__export(Array_exports, {
  add: () => add,
  any: () => any,
  copy: () => copy,
  each: () => each,
  eachContinue: () => eachContinue,
  eachReverse: () => eachReverse,
  find: () => find,
  findIndex: () => findIndex,
  first: () => first,
  getSortedIndex: () => getSortedIndex,
  has: () => has,
  indexOf: () => indexOf,
  insert: () => insert,
  insertIndex: () => insertIndex,
  keepIf: () => keepIf,
  last: () => last,
  map: () => map,
  move: () => move,
  pushAll: () => pushAll,
  remove: () => remove,
  removeIndex: () => removeIndex,
  replace: () => replace,
  setIndex: () => setIndex,
  shiftLeft: () => shiftLeft,
  shuffle: () => shuffle,
  slice: () => slice,
  toArray: () => toArray
});
function indexOf(array, value) {
  var length2 = array.length;
  for (var i = 0; i < length2; ++i) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}
function any(array, test) {
  var length2 = array.length;
  for (var i = 0; i < length2; ++i) {
    if (test(array[i])) {
      return true;
    }
  }
  return false;
}
function map(array, fn) {
  var length2 = array.length;
  var output = new Array(length2);
  for (var i = 0; i < length2; ++i) {
    output[i] = fn(array[i], i);
  }
  return output;
}
function each(array, fn) {
  var length2 = array.length;
  for (var i = 0; i < length2; ++i) {
    fn(array[i], i);
  }
}
function eachReverse(array, fn) {
  var i = array.length;
  while (i--) {
    fn(array[i], i);
  }
}
function eachContinue(array, fn) {
  var length2 = array.length;
  for (var i = 0; i < length2; ++i) {
    if (!fn(array[i], i)) {
      break;
    }
  }
}
function shiftLeft(array, index) {
  var length2 = array.length;
  for (var i = index; i < length2; ++i) {
    array[i - index] = array[i];
  }
  array.length = length2 - index;
}
function last(array) {
  var length2 = array.length;
  return length2 ? array[length2 - 1] : void 0;
}
function first(array) {
  return array[0];
}
function insert(array, element, index) {
  index = fitToRange(index, 0, array.length);
  array.splice(index, 0, element);
}
function setIndex(array, element, index) {
  remove(array, element);
  insert(array, element, index);
}
function pushAll(array, input) {
  var length2 = input.length;
  for (var i = 0; i < length2; ++i) {
    array.push(input[i]);
  }
}
function remove(array, element) {
  var found = false;
  var index = array.indexOf(element);
  if (index !== -1) {
    found = true;
    array.splice(index, 1);
    var length_1 = array.length;
    while (index < length_1) {
      if (array[index] === element) {
        array.splice(index, 1);
        --length_1;
      } else {
        ++index;
      }
    }
  }
  return found;
}
function move(array, element, toIndex) {
  var index = indexOf(array, element);
  if (index !== -1) {
    removeIndex(array, index);
  }
  if (toIndex == null) {
    array.push(element);
  } else {
    insertIndex(array, toIndex, element);
  }
}
function add(array, element, index) {
  if (!isNumber(index)) {
    array.push(element);
  } else if (index === 0) {
    array.unshift(element);
  } else {
    array.splice(index, 0, element);
  }
}
function replace(array, element, index) {
  var ind = array.indexOf(element);
  if (ind !== -1) {
    array.splice(ind, 1);
  }
  if (!isNumber(index)) {
    array.push(element);
  } else {
    array.splice(index, 0, element);
  }
}
function toArray(input) {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
}
function has(array, element) {
  return indexOf(array, element) !== -1;
}
function copy(array) {
  var length2 = array.length;
  var output = new Array(length2);
  for (var i = 0; i < length2; ++i) {
    output[i] = array[i];
  }
  return output;
}
function slice(array, start, end) {
  if (end === void 0) {
    end = array.length;
  }
  var output = new Array(end - start);
  for (var i = start; i < end; ++i) {
    output[i - start] = array[i];
  }
  return output;
}
function insertIndex(array, index, value) {
  array.splice(index, 0, value);
}
function removeIndex(array, index) {
  array.splice(index, 1);
}
function getSortedIndex(array, ordering, value) {
  var start = 0;
  var end = array.length;
  var found = false;
  while (start < end) {
    var pivot = start + end >> 1;
    var order2 = ordering(value, array[pivot]);
    if (order2 < 0) {
      end = pivot;
    } else if (order2 === 0) {
      found = true;
      start = pivot + 1;
    } else {
      start = pivot + 1;
    }
  }
  return {
    found,
    index: found ? start - 1 : start
  };
}
function findIndex(array, matches) {
  var length2 = array.length;
  for (var i = 0; i < length2; ++i) {
    if (matches(array[i], i)) {
      return i;
    }
  }
  return -1;
}
function find(array, matches) {
  var index = findIndex(array, matches);
  if (index !== -1) {
    return array[index];
  }
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}
function keepIf(array, keep) {
  var length2 = array.length;
  var i = 0;
  while (i < length2) {
    if (keep(array[i])) {
      ++i;
    } else {
      array.splice(i, 1);
      --length2;
    }
  }
}

// node_modules/@amcharts/amcharts4/.internal/core/utils/Disposer.js
var Disposer = (
  /** @class */
  function() {
    function Disposer2(dispose) {
      this._disposed = false;
      this._dispose = dispose;
    }
    Disposer2.prototype.isDisposed = function() {
      return this._disposed;
    };
    Disposer2.prototype.dispose = function() {
      if (!this._disposed) {
        this._disposed = true;
        this._dispose();
      }
    };
    return Disposer2;
  }()
);
var MultiDisposer = (
  /** @class */
  function(_super) {
    __extends(MultiDisposer2, _super);
    function MultiDisposer2(disposers) {
      return _super.call(this, function() {
        each(disposers, function(x) {
          x.dispose();
        });
      }) || this;
    }
    return MultiDisposer2;
  }(Disposer)
);
var MutableValueDisposer = (
  /** @class */
  function(_super) {
    __extends(MutableValueDisposer2, _super);
    function MutableValueDisposer2() {
      var _this = _super.call(this, function() {
        if (hasValue(_this._disposer)) {
          _this._disposer.dispose();
          _this._disposer = void 0;
        }
      }) || this;
      return _this;
    }
    MutableValueDisposer2.prototype.get = function() {
      return this._value;
    };
    MutableValueDisposer2.prototype.set = function(value, disposer) {
      if (hasValue(this._disposer)) {
        this._disposer.dispose();
      }
      this._disposer = disposer;
      this._value = value;
    };
    MutableValueDisposer2.prototype.reset = function() {
      this.set(void 0, void 0);
    };
    return MutableValueDisposer2;
  }(Disposer)
);
var CounterDisposer = (
  /** @class */
  function(_super) {
    __extends(CounterDisposer2, _super);
    function CounterDisposer2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this._counter = 0;
      return _this;
    }
    CounterDisposer2.prototype.increment = function() {
      var _this = this;
      ++this._counter;
      return new Disposer(function() {
        --_this._counter;
        if (_this._counter === 0) {
          _this.dispose();
        }
      });
    };
    return CounterDisposer2;
  }(Disposer)
);

// node_modules/@amcharts/amcharts4/.internal/core/utils/AsyncPending.js
var pendingFrame = false;
var nextQueue = [];
var readQueue = [];
var writeQueue = [];
var idleQueue = [];
var fps = 1e3 / 60;
var raf = typeof requestAnimationFrame === "function" ? function(fn) {
  requestAnimationFrame(fn);
} : function(fn) {
  setTimeout(fn, fps);
};
function frameLoop() {
  var now = Date.now();
  var length2 = nextQueue.length;
  for (var i = 0; i < length2; ++i) {
    nextQueue[i](now);
  }
  shiftLeft(nextQueue, length2);
  for (var i = 0; i < readQueue.length; ++i) {
    readQueue[i](now);
  }
  readQueue.length = 0;
  for (var i = 0; i < writeQueue.length; ++i) {
    writeQueue[i](now);
  }
  writeQueue.length = 0;
  if (nextQueue.length === 0 && readQueue.length === 0) {
    pendingFrame = false;
  } else {
    raf(frameLoop);
  }
}
function pendFrame() {
  if (!pendingFrame) {
    pendingFrame = true;
    raf(frameLoop);
  }
}
function nextFrame(fn) {
  nextQueue.push(fn);
  pendFrame();
}
function readFrame(fn) {
  readQueue.push(fn);
  pendFrame();
}
function writeFrame(fn) {
  writeQueue.push(fn);
  pendFrame();
}
function whenIdle(fn) {
  idleQueue.push(fn);
}
function triggerIdle() {
  var now = Date.now();
  var length2 = idleQueue.length;
  for (var i = 0; i < length2; ++i) {
    idleQueue.shift()(now);
  }
}

// node_modules/@amcharts/amcharts4/.internal/core/utils/EventDispatcher.js
var EventDispatcher = (
  /** @class */
  function() {
    function EventDispatcher2() {
      this._listeners = [];
      this._killed = [];
      this._disabled = {};
      this._iterating = 0;
      this._enabled = true;
      this._disposed = false;
    }
    EventDispatcher2.prototype.isDisposed = function() {
      return this._disposed;
    };
    EventDispatcher2.prototype.dispose = function() {
      if (!this._disposed) {
        this._disposed = true;
        var a = this._listeners;
        this._iterating = 1;
        this._listeners = null;
        this._disabled = null;
        try {
          each(a, function(x) {
            x.disposer.dispose();
          });
        } finally {
          this._killed = null;
          this._iterating = null;
        }
      }
    };
    EventDispatcher2.prototype.hasListeners = function() {
      return this._listeners.length !== 0;
    };
    EventDispatcher2.prototype.hasListenersByType = function(type) {
      return any(this._listeners, function(x) {
        return (x.type === null || x.type === type) && !x.killed;
      });
    };
    EventDispatcher2.prototype.enable = function() {
      this._enabled = true;
    };
    EventDispatcher2.prototype.disable = function() {
      this._enabled = false;
    };
    EventDispatcher2.prototype.enableType = function(type) {
      delete this._disabled[type];
    };
    EventDispatcher2.prototype.disableType = function(type, amount) {
      if (amount === void 0) {
        amount = Infinity;
      }
      this._disabled[type] = amount;
    };
    EventDispatcher2.prototype._removeListener = function(listener) {
      if (this._iterating === 0) {
        var index = this._listeners.indexOf(listener);
        if (index === -1) {
          throw new Error("Invalid state: could not remove listener");
        }
        this._listeners.splice(index, 1);
      } else {
        this._killed.push(listener);
      }
    };
    EventDispatcher2.prototype._removeExistingListener = function(once, type, callback, context) {
      if (this._disposed) {
        throw new Error("EventDispatcher is disposed");
      }
      this._eachListener(function(info) {
        if (info.once === once && // TODO is this correct ?
        info.type === type && (callback == null || info.callback === callback) && info.context === context) {
          info.disposer.dispose();
        }
      });
    };
    EventDispatcher2.prototype.isEnabled = function(type) {
      if (this._disposed) {
        throw new Error("EventDispatcher is disposed");
      }
      return this._enabled && this._listeners.length > 0 && this.hasListenersByType(type) && this._disabled[type] == null;
    };
    EventDispatcher2.prototype.has = function(type, callback, context) {
      var index = findIndex(this._listeners, function(info) {
        return info.once !== true && // Ignoring "once" listeners
        info.type === type && (callback == null || info.callback === callback) && info.context === context;
      });
      return index !== -1;
    };
    EventDispatcher2.prototype._shouldDispatch = function(type) {
      if (this._disposed) {
        throw new Error("EventDispatcher is disposed");
      }
      var count = this._disabled[type];
      if (!isNumber(count)) {
        return this._enabled;
      } else {
        if (count <= 1) {
          delete this._disabled[type];
        } else {
          --this._disabled[type];
        }
        return false;
      }
    };
    EventDispatcher2.prototype._eachListener = function(fn) {
      var _this = this;
      ++this._iterating;
      try {
        each(this._listeners, fn);
      } finally {
        --this._iterating;
        if (this._iterating === 0 && this._killed.length !== 0) {
          each(this._killed, function(killed) {
            _this._removeListener(killed);
          });
          this._killed.length = 0;
        }
      }
    };
    EventDispatcher2.prototype.dispatchImmediately = function(type, event) {
      if (this._shouldDispatch(type)) {
        this._eachListener(function(listener) {
          if (!listener.killed && (listener.type === null || listener.type === type)) {
            listener.dispatch(type, event);
          }
        });
      }
    };
    EventDispatcher2.prototype.dispatch = function(type, event) {
      if (this._shouldDispatch(type)) {
        this._eachListener(function(listener) {
          if (!listener.killed && (listener.type === null || listener.type === type)) {
            whenIdle(function() {
              if (!listener.killed) {
                listener.dispatch(type, event);
              }
            });
          }
        });
      }
    };
    EventDispatcher2.prototype._on = function(once, type, callback, context, shouldClone, dispatch) {
      var _this = this;
      if (this._disposed) {
        throw new Error("EventDispatcher is disposed");
      }
      this._removeExistingListener(once, type, callback, context);
      var info = {
        type,
        callback,
        context,
        shouldClone,
        dispatch,
        killed: false,
        once,
        disposer: new Disposer(function() {
          info.killed = true;
          _this._removeListener(info);
        })
      };
      this._listeners.push(info);
      return info;
    };
    EventDispatcher2.prototype.onAll = function(callback, context, shouldClone) {
      if (shouldClone === void 0) {
        shouldClone = true;
      }
      return this._on(false, null, callback, context, shouldClone, function(type, event) {
        return callback.call(context, type, event);
      }).disposer;
    };
    EventDispatcher2.prototype.on = function(type, callback, context, shouldClone) {
      if (shouldClone === void 0) {
        shouldClone = true;
      }
      return this._on(false, type, callback, context, shouldClone, function(type2, event) {
        return callback.call(context, event);
      }).disposer;
    };
    EventDispatcher2.prototype.once = function(type, callback, context, shouldClone) {
      if (shouldClone === void 0) {
        shouldClone = true;
      }
      var x = this._on(true, type, callback, context, shouldClone, function(type2, event) {
        x.disposer.dispose();
        callback.call(context, event);
      });
      return x.disposer;
    };
    EventDispatcher2.prototype.off = function(type, callback, context) {
      this._removeExistingListener(false, type, callback, context);
    };
    EventDispatcher2.prototype.copyFrom = function(source) {
      var _this = this;
      if (this._disposed) {
        throw new Error("EventDispatcher is disposed");
      }
      if (source === this) {
        throw new Error("Cannot copyFrom the same TargetedEventDispatcher");
      }
      each(source._listeners, function(x) {
        if (!x.killed && x.shouldClone) {
          if (x.type === null) {
            _this.onAll(x.callback, x.context);
          } else if (x.once) {
            _this.once(x.type, x.callback, x.context);
          } else {
            _this.on(x.type, x.callback, x.context);
          }
        }
      });
    };
    return EventDispatcher2;
  }()
);
var TargetedEventDispatcher = (
  /** @class */
  function(_super) {
    __extends(TargetedEventDispatcher2, _super);
    function TargetedEventDispatcher2(target) {
      var _this = _super.call(this) || this;
      _this.target = target;
      return _this;
    }
    TargetedEventDispatcher2.prototype.copyFrom = function(source) {
      var _this = this;
      if (this._disposed) {
        throw new Error("EventDispatcher is disposed");
      }
      if (source === this) {
        throw new Error("Cannot copyFrom the same TargetedEventDispatcher");
      }
      each(source._listeners, function(x) {
        if (x.context === source.target) {
          return;
        }
        if (!x.killed && x.shouldClone) {
          if (x.type === null) {
            _this.onAll(x.callback, x.context);
          } else if (x.once) {
            _this.once(x.type, x.callback, x.context);
          } else {
            _this.on(x.type, x.callback, x.context);
          }
        }
      });
    };
    return TargetedEventDispatcher2;
  }(EventDispatcher)
);

// node_modules/@amcharts/amcharts4/.internal/core/utils/Object.js
var Object_exports = {};
__export(Object_exports, {
  clone: () => clone,
  copy: () => copy2,
  copyAllProperties: () => copyAllProperties,
  copyProperties: () => copyProperties,
  each: () => each2,
  eachContinue: () => eachContinue2,
  eachOrdered: () => eachOrdered,
  entries: () => entries,
  forceCopyProperties: () => forceCopyProperties,
  getKey: () => getKey,
  hasKey: () => hasKey,
  keys: () => keys,
  keysOrdered: () => keysOrdered,
  merge: () => merge,
  softCopyProperties: () => softCopyProperties
});
function entries(object) {
  return function(push) {
    for (var key in object) {
      if (hasKey(object, key)) {
        if (!push([key, object[key]])) {
          break;
        }
      }
    }
  };
}
function keys(object) {
  var output = [];
  for (var key in object) {
    if (hasKey(object, key)) {
      output.push(key);
    }
  }
  return output;
}
function keysOrdered(object, order2) {
  return keys(object).sort(order2);
}
function hasKey(object, key) {
  return {}.hasOwnProperty.call(object, key);
}
function getKey(object, key) {
  return object[key];
}
function eachContinue2(object, fn) {
  for (var key in object) {
    if (hasKey(object, key)) {
      if (!fn(key, object[key])) {
        break;
      }
    }
  }
}
function each2(object, fn) {
  eachContinue2(object, function(key, value) {
    fn(key, value);
    return true;
  });
}
function eachOrdered(object, fn, ord) {
  each(keysOrdered(object, ord), function(key) {
    fn(key, object[key]);
  });
}
function copy2(object) {
  return Object.assign({}, object);
}
function merge(object1, object2) {
  return Object.assign({}, object1, object2);
}
function clone(object) {
  return JSON.parse(JSON.stringify(object));
}
function copyProperties(source, target, keys2) {
  each(keys2, function(key) {
    if (hasValue(source[key])) {
      target[key] = source[key];
    }
  });
}
function softCopyProperties(source, target, keys2) {
  each(keys2, function(key) {
    if (hasValue(source[key]) && !hasValue(target[key])) {
      target[key] = source[key];
    }
  });
}
function forceCopyProperties(source, target, keys2) {
  each(keys2, function(key) {
    target[key] = source[key];
  });
}
function copyAllProperties(from, to) {
  copyProperties(from, to, keys(from));
}

// node_modules/@amcharts/amcharts4/.internal/core/utils/Iterator.js
var Iterator_exports = {};
__export(Iterator_exports, {
  ListIterator: () => ListIterator,
  concat: () => concat,
  contains: () => contains,
  each: () => each3,
  eachContinue: () => eachContinue3,
  filter: () => filter,
  find: () => find2,
  findIndex: () => findIndex2,
  findMap: () => findMap,
  flatten: () => flatten,
  foldl: () => foldl,
  fromArray: () => fromArray,
  indexed: () => indexed,
  join: () => join,
  length: () => length,
  map: () => map2,
  max: () => max3,
  min: () => min3,
  sort: () => sort,
  toArray: () => toArray2
});
function fromArray(array) {
  return function(push) {
    var length2 = array.length;
    for (var i = 0; i < length2; ++i) {
      if (!push(array[i])) {
        break;
      }
    }
  };
}
function length(iter) {
  var sum = 0;
  iter(function(_) {
    ++sum;
    return true;
  });
  return sum;
}
function toArray2(iter) {
  var output = [];
  iter(function(value) {
    output.push(value);
    return true;
  });
  return output;
}
function eachContinue3(iter, fn) {
  iter(fn);
}
function each3(iter, fn) {
  iter(function(value) {
    fn(value);
    return true;
  });
}
function sort(iter, fn) {
  return fromArray(toArray2(iter).sort(fn));
}
function map2(iter, fn) {
  return function(push) {
    return iter(function(value) {
      return push(fn(value));
    });
  };
}
function filter(iter, fn) {
  return function(push) {
    return iter(function(value) {
      if (fn(value)) {
        return push(value);
      } else {
        return true;
      }
    });
  };
}
function concat() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return function(push) {
    var go = true;
    var push2 = function(value) {
      return go = push(value);
    };
    var length2 = args.length;
    for (var i = 0; i < length2; ++i) {
      args[i](push2);
      if (!go) {
        break;
      }
    }
  };
}
function flatten(iter) {
  return function(push) {
    var go = true;
    var push2 = function(value) {
      return go = push(value);
    };
    iter(function(value) {
      value(push2);
      return go;
    });
  };
}
function indexed(iter) {
  return function(push) {
    var index = 0;
    iter(function(value) {
      return push([index++, value]);
    });
  };
}
function findIndex2(iter, matches) {
  var found = false;
  var i = 0;
  iter(function(value) {
    if (matches(value)) {
      found = true;
      return false;
    } else {
      ++i;
      return true;
    }
  });
  return found ? i : -1;
}
function find2(iter, matches) {
  var output;
  iter(function(value) {
    if (matches(value)) {
      output = value;
      return false;
    } else {
      return true;
    }
  });
  return output;
}
function findMap(iter, matches) {
  var output;
  iter(function(value) {
    var v = matches(value);
    if (v !== null) {
      output = v;
      return false;
    } else {
      return true;
    }
  });
  return output;
}
function contains(iter, matches) {
  var output = false;
  iter(function(value) {
    if (matches(value)) {
      output = true;
      return false;
    } else {
      return true;
    }
  });
  return output;
}
function foldl(iter, init, fn) {
  iter(function(value) {
    init = fn(init, value);
    return true;
  });
  return init;
}
function min2(left, right) {
  if (left == null || right < left) {
    return right;
  } else {
    return left;
  }
}
function min3(a) {
  return foldl(a, null, min2);
}
function max2(left, right) {
  if (left == null || right > left) {
    return right;
  } else {
    return left;
  }
}
function max3(a) {
  return foldl(a, null, max2);
}
function join(iter, separator) {
  if (separator === void 0) {
    separator = "";
  }
  var first2 = true;
  var init = "";
  iter(function(value) {
    if (first2) {
      first2 = false;
    } else {
      init += separator;
    }
    init += value;
    return true;
  });
  return init;
}
var ListIterator = (
  /** @class */
  function() {
    function ListIterator2(list, create) {
      this.createNewItems = false;
      this.list = list;
      this._create = create;
      this.reset();
    }
    ListIterator2.prototype.reset = function() {
      this._listCopy = toArray2(this.list.iterator());
    };
    ListIterator2.prototype.clear = function() {
      this._listCopy.length = 0;
    };
    ListIterator2.prototype.getFirst = function() {
      return this.returnItem(0);
    };
    ListIterator2.prototype.getLast = function() {
      return this.returnItem(this._listCopy.length - 1);
    };
    ListIterator2.prototype.find = function(fn) {
      var index = findIndex(this._listCopy, fn);
      if (index !== -1) {
        var item = this._listCopy[index];
        remove(this._listCopy, item);
        return item;
      } else {
        return this.getLast();
      }
    };
    ListIterator2.prototype.removeItem = function(item) {
      return remove(this._listCopy, item);
    };
    ListIterator2.prototype.returnItem = function(index) {
      if (index >= 0 && index < this._listCopy.length) {
        var item = this._listCopy[index];
        remove(this._listCopy, item);
        return item;
      } else if (this.createNewItems) {
        return this._create();
      }
    };
    ListIterator2.prototype.iterator = function() {
      return fromArray(this._listCopy);
    };
    return ListIterator2;
  }()
);

// node_modules/@amcharts/amcharts4/.internal/core/utils/String.js
var String_exports = {};
__export(String_exports, {
  order: () => order,
  random: () => random,
  repeat: () => repeat
});
function order(a, b) {
  if (a === b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else {
    return 1;
  }
}
function repeat(string, amount) {
  return new Array(amount + 1).join(string);
}
function random(chars) {
  var res = "";
  var choice = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < chars; i++) {
    res += choice.charAt(Math.floor(Math.random() * choice.length));
  }
  return res;
}

// node_modules/@amcharts/amcharts4/.internal/core/utils/Dictionary.js
var DictionaryDisposer = (
  /** @class */
  function(_super) {
    __extends(DictionaryDisposer2, _super);
    function DictionaryDisposer2(dict) {
      var _this = this;
      var disposer = dict.events.on("removed", function(x) {
        x.oldValue.dispose();
      }, void 0, false);
      _this = _super.call(this, function() {
        disposer.dispose();
        each3(dict.iterator(), function(a) {
          var v = a[1];
          v.dispose();
        });
      }) || this;
      return _this;
    }
    return DictionaryDisposer2;
  }(Disposer)
);
var Dictionary = (
  /** @class */
  function() {
    function Dictionary2() {
      this.events = new EventDispatcher();
      this._dictionary = {};
    }
    Dictionary2.prototype.hasKey = function(key) {
      return hasKey(this._dictionary, key);
    };
    Dictionary2.prototype.getKey = function(key) {
      return this._dictionary[key];
    };
    Dictionary2.prototype.insertKey = function(key, value) {
      if (hasKey(this._dictionary, key)) {
        throw new Error("Key " + key + " already exists in dictionary");
      } else {
        this._dictionary[key] = value;
        if (this.events.isEnabled("insertKey")) {
          this.events.dispatchImmediately("insertKey", {
            type: "insertKey",
            target: this,
            key,
            newValue: value
          });
        }
      }
    };
    Dictionary2.prototype.setKey = function(key, value) {
      if (hasKey(this._dictionary, key)) {
        var oldValue = this._dictionary[key];
        if (oldValue !== value) {
          this._dictionary[key] = value;
          if (this.events.isEnabled("setKey")) {
            this.events.dispatchImmediately("setKey", {
              type: "setKey",
              target: this,
              key,
              oldValue,
              newValue: value
            });
          }
          if (this.events.isEnabled("removed")) {
            this.events.dispatchImmediately("removed", {
              type: "removed",
              target: this,
              oldValue
            });
          }
        }
      } else {
        this._dictionary[key] = value;
        if (this.events.isEnabled("insertKey")) {
          this.events.dispatchImmediately("insertKey", {
            type: "insertKey",
            target: this,
            key,
            newValue: value
          });
        }
      }
    };
    Dictionary2.prototype.updateKey = function(key, fn) {
      if (hasKey(this._dictionary, key)) {
        var oldValue = this._dictionary[key];
        var newValue = fn(oldValue);
        if (oldValue !== newValue) {
          this._dictionary[key] = newValue;
          if (this.events.isEnabled("setKey")) {
            this.events.dispatchImmediately("setKey", {
              type: "setKey",
              target: this,
              key,
              oldValue,
              newValue
            });
          }
          if (this.events.isEnabled("removed")) {
            this.events.dispatchImmediately("removed", {
              type: "removed",
              target: this,
              oldValue
            });
          }
        }
      } else {
        throw new Error("Key " + key + " doesn't exist in dictionary");
      }
    };
    Dictionary2.prototype.removeKey = function(key) {
      if (hasKey(this._dictionary, key)) {
        var oldValue = this._dictionary[key];
        delete this._dictionary[key];
        if (this.events.isEnabled("removeKey")) {
          this.events.dispatchImmediately("removeKey", {
            type: "removeKey",
            target: this,
            key,
            oldValue
          });
        }
        if (this.events.isEnabled("removed")) {
          this.events.dispatchImmediately("removed", {
            type: "removed",
            target: this,
            oldValue
          });
        }
      }
    };
    Dictionary2.prototype.insertKeyIfEmpty = function(key, ifEmpty) {
      if (!this.hasKey(key)) {
        this.insertKey(key, ifEmpty());
      }
      return this.getKey(key);
    };
    Dictionary2.prototype.clear = function() {
      var _this = this;
      if (this.events.isEnabled("removed")) {
        each2(this._dictionary, function(key, value) {
          _this.events.dispatchImmediately("removed", {
            type: "removed",
            target: _this,
            oldValue: value
          });
        });
      }
      this._dictionary = {};
      if (this.events.isEnabled("cleared")) {
        this.events.dispatchImmediately("cleared", {
          type: "cleared",
          target: this
        });
      }
    };
    Dictionary2.prototype.copyFrom = function(source) {
      var _this = this;
      each3(source.iterator(), function(a) {
        _this.setKey(a[0], a[1]);
      });
    };
    Dictionary2.prototype.iterator = function() {
      return entries(this._dictionary);
    };
    Dictionary2.prototype[Symbol.iterator] = function() {
      var _a, _b, _i, key;
      return __generator(this, function(_c) {
        switch (_c.label) {
          case 0:
            _a = [];
            for (_b in this._dictionary)
              _a.push(_b);
            _i = 0;
            _c.label = 1;
          case 1:
            if (!(_i < _a.length))
              return [3, 4];
            key = _a[_i];
            if (!hasKey(this._dictionary, key))
              return [3, 3];
            return [4, [key, this._dictionary[key]]];
          case 2:
            _c.sent();
            _c.label = 3;
          case 3:
            _i++;
            return [3, 1];
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    };
    Dictionary2.prototype.each = function(f) {
      each3(this.iterator(), function(_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return f(key, value);
      });
    };
    Dictionary2.prototype.sortedIterator = function() {
      return sort(this.iterator(), function(x, y) {
        return order(x[0], y[0]);
      });
    };
    return Dictionary2;
  }()
);
var DictionaryTemplate = (
  /** @class */
  function(_super) {
    __extends(DictionaryTemplate2, _super);
    function DictionaryTemplate2(t) {
      var _this = _super.call(this) || this;
      _this.template = t;
      return _this;
    }
    Object.defineProperty(DictionaryTemplate2.prototype, "template", {
      /**
       * @return Template object
       */
      get: function() {
        return this._template;
      },
      /**
       * A "template" object to copy all properties from when creating new list
       * items.
       *
       * @param v  Template object
       */
      set: function(v) {
        v.isTemplate = true;
        this._template = v;
      },
      enumerable: true,
      configurable: true
    });
    DictionaryTemplate2.prototype.copyFrom = function(source) {
      var _this = this;
      each3(source.iterator(), function(a) {
        _this.setKey(a[0], a[1].clone());
      });
    };
    DictionaryTemplate2.prototype.create = function(key) {
      var _this = this;
      return this.insertKeyIfEmpty(key, function() {
        return _this.template.clone();
      });
    };
    return DictionaryTemplate2;
  }(Dictionary)
);

// node_modules/@amcharts/amcharts4/.internal/core/utils/Cache.js
var Cache = (
  /** @class */
  function() {
    function Cache2() {
      this._storage = new Dictionary();
      this.ttl = 1e3;
    }
    Cache2.prototype.set = function(owner, key, value, ttl) {
      var ownerStorage = this._storage.insertKeyIfEmpty(owner, function() {
        return new Dictionary();
      });
      var item = {
        "touched": (/* @__PURE__ */ new Date()).getTime(),
        "ttl": isNumber(ttl) ? ttl : this.ttl,
        "value": value
      };
      ownerStorage.setKey(key, item);
    };
    Cache2.prototype.get = function(owner, key, value) {
      if (value === void 0) {
        value = void 0;
      }
      if (this._storage.hasKey(owner)) {
        var ownerStorage = this._storage.getKey(owner);
        if (ownerStorage.hasKey(key)) {
          var cacheItem = ownerStorage.getKey(key);
          if (cacheItem.ttl && cacheItem.touched + cacheItem.ttl < (/* @__PURE__ */ new Date()).getTime()) {
            cacheItem.expired = true;
          }
          if (cacheItem.expired) {
            ownerStorage.removeKey(key);
            return value;
          }
          return cacheItem.value;
        } else {
          return value;
        }
      } else {
        return value;
      }
    };
    Cache2.prototype.clear = function(owner) {
      if (owner) {
        this._storage.removeKey(owner);
      } else {
        this._storage.clear();
      }
    };
    return Cache2;
  }()
);
var cache = new Cache();

// node_modules/@amcharts/amcharts4/.internal/core/Registry.js
var Registry = (
  /** @class */
  function() {
    function Registry2() {
      var _this = this;
      this.events = new EventDispatcher();
      this.themes = [];
      this.loadedThemes = {};
      this._uidCount = 0;
      this.registeredClasses = {};
      this._placeholders = {};
      this.invalidSprites = {};
      this.invalidDatas = {};
      this.invalidRawDatas = [];
      this.invalidDataItems = [];
      this.invalidDataRange = [];
      this.invalidPositions = {};
      this.invalidLayouts = {};
      this.baseSprites = [];
      this.baseSpritesByUid = {};
      this.queue = [];
      this.deferred = [];
      this.uid = this.getUniqueId();
      this.invalidSprites.noBase = [];
      this.invalidDatas.noBase = [];
      this.invalidLayouts.noBase = [];
      this.invalidPositions.noBase = [];
      if (typeof addEventListener !== "undefined") {
        addEventListener("beforeprint", function() {
          each(_this.baseSprites, function(sprite) {
            var svg = sprite.paper.svg;
            svg.setAttribute("viewBox", "0 0 " + svg.clientWidth + " " + svg.clientHeight);
          });
        });
        addEventListener("afterprint", function() {
          each(_this.baseSprites, function(sprite) {
            var svg = sprite.paper.svg;
            svg.removeAttribute("viewBox");
          });
        });
      }
    }
    Registry2.prototype.getUniqueId = function() {
      var uid = this._uidCount;
      this._uidCount += 1;
      return "id-" + uid;
    };
    Object.defineProperty(Registry2.prototype, "map", {
      /**
       * Returns a universal collection for mapping ids with objects.
       *
       * @ignore Exclude from docs
       * @return Map collection
       */
      get: function() {
        if (!this._map) {
          this._map = new Dictionary();
        }
        return this._map;
      },
      enumerable: true,
      configurable: true
    });
    Registry2.prototype.setCache = function(key, value, ttl) {
      cache.set(this.uid, key, value, ttl);
    };
    Registry2.prototype.getCache = function(key, value) {
      if (value === void 0) {
        value = void 0;
      }
      return cache.get(this.uid, key, value);
    };
    Registry2.prototype.dispatch = function(eventType, data) {
      if (this.events.isEnabled(eventType)) {
        if (data) {
          data.type = eventType;
          data.target = data.target || this;
          this.events.dispatch(eventType, {
            type: eventType,
            target: this
          });
        } else {
          this.events.dispatch(eventType, {
            type: eventType,
            target: this
          });
        }
      }
    };
    Registry2.prototype.dispatchImmediately = function(eventType, data) {
      if (this.events.isEnabled(eventType)) {
        if (data) {
          data.type = eventType;
          data.target = data.target || this;
          this.events.dispatchImmediately(eventType, data);
        } else {
          this.events.dispatchImmediately(eventType, {
            type: eventType,
            target: this
          });
        }
      }
    };
    Registry2.prototype.getPlaceholder = function(key) {
      if (hasValue(this._placeholders[key])) {
        return this._placeholders[key];
      }
      this._placeholders[key] = "__amcharts_" + key + "_" + random(8) + "__";
      return this._placeholders[key];
    };
    Registry2.prototype.addToInvalidComponents = function(component) {
      if (component.baseId) {
        move(this.invalidDatas[component.baseId], component);
      } else {
        move(this.invalidDatas["noBase"], component);
      }
    };
    Registry2.prototype.removeFromInvalidComponents = function(component) {
      if (component.baseId) {
        remove(this.invalidDatas[component.baseId], component);
      }
      remove(this.invalidDatas["noBase"], component);
    };
    Registry2.prototype.addToInvalidSprites = function(sprite) {
      if (sprite.baseId) {
        add(this.invalidSprites[sprite.baseId], sprite);
      } else {
        add(this.invalidSprites["noBase"], sprite);
      }
    };
    Registry2.prototype.removeFromInvalidSprites = function(sprite) {
      if (sprite.baseId) {
        remove(this.invalidSprites[sprite.baseId], sprite);
      }
      remove(this.invalidSprites["noBase"], sprite);
    };
    Registry2.prototype.addToInvalidPositions = function(sprite) {
      if (sprite.baseId) {
        add(this.invalidPositions[sprite.baseId], sprite);
      } else {
        add(this.invalidPositions["noBase"], sprite);
      }
    };
    Registry2.prototype.removeFromInvalidPositions = function(sprite) {
      if (sprite.baseId) {
        remove(this.invalidPositions[sprite.baseId], sprite);
      }
      remove(this.invalidPositions["noBase"], sprite);
    };
    Registry2.prototype.addToInvalidLayouts = function(sprite) {
      if (sprite.baseId) {
        add(this.invalidLayouts[sprite.baseId], sprite);
      } else {
        add(this.invalidLayouts["noBase"], sprite);
      }
    };
    Registry2.prototype.removeFromInvalidLayouts = function(sprite) {
      if (sprite.baseId) {
        remove(this.invalidLayouts[sprite.baseId], sprite);
      }
      remove(this.invalidLayouts["noBase"], sprite);
    };
    return Registry2;
  }()
);
var registry = new Registry();
function is(object, name) {
  var x = registry.registeredClasses[name];
  return x != null && object instanceof x;
}

export {
  Percent,
  percent,
  isPercent,
  isNaN,
  checkString,
  checkBoolean,
  checkNumber,
  checkObject,
  castString,
  castNumber,
  toBoolean,
  toNumber,
  toText,
  toNumberOrPercent,
  hasValue,
  getValue,
  getValueDefault,
  isDate,
  isString,
  isNumber,
  isObject,
  isArray,
  Type_exports,
  PI,
  HALFPI,
  RADIANS,
  DEGREES,
  toNumberRange,
  round,
  fitToRange,
  sin,
  cos,
  max,
  min,
  getDistance,
  getCubicCurveDistance,
  getScale,
  getMidPoint,
  getAngle,
  getBBox,
  getCommonRectangle,
  getPointOnCubicCurve,
  getCubicControlPointA,
  getCubicControlPointB,
  normalizeAngle,
  getArcRect,
  isInRectangle,
  Math_exports,
  indexOf,
  any,
  map,
  each,
  eachReverse,
  eachContinue,
  pushAll,
  remove,
  move,
  replace,
  toArray,
  copy,
  insertIndex,
  removeIndex,
  getSortedIndex,
  keepIf,
  Array_exports,
  Disposer,
  MultiDisposer,
  MutableValueDisposer,
  CounterDisposer,
  raf,
  nextFrame,
  readFrame,
  writeFrame,
  whenIdle,
  triggerIdle,
  EventDispatcher,
  TargetedEventDispatcher,
  hasKey,
  eachContinue2,
  each2,
  eachOrdered,
  merge,
  clone,
  copyProperties,
  copyAllProperties,
  Object_exports,
  fromArray,
  toArray2,
  eachContinue3,
  each3,
  map2,
  concat,
  flatten,
  indexed,
  contains,
  min3 as min2,
  max3 as max2,
  join,
  ListIterator,
  Iterator_exports,
  repeat,
  String_exports,
  DictionaryDisposer,
  Dictionary,
  DictionaryTemplate,
  Cache,
  cache,
  Registry,
  registry,
  is
};
//# sourceMappingURL=chunk-SYGNN4YS.js.map

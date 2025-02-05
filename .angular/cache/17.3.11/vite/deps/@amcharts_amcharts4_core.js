import {
  AMElement,
  Adapter,
  Animation,
  AnimationDisposer,
  BaseObject,
  BaseObjectEvents,
  Button,
  CSVParser,
  Circle,
  Color,
  ColorSet,
  Colors_exports,
  Component,
  Container,
  DATE,
  DURATION,
  DataItem,
  DataLoader,
  DataParser,
  DataSource,
  DateFormatter,
  DropShadowFilter,
  DurationFormatter,
  Ease_exports,
  Export,
  ExportMenu,
  Filter,
  GlobalAdapter,
  Group,
  IndexedIterable,
  Inertia,
  Interaction,
  InteractionKeyboardObject,
  InteractionObject,
  InteractionObjectEventDispatcher,
  InterfaceColorSet,
  JSONParser,
  Keyboard,
  Label,
  Language,
  LinearGradient,
  List,
  ListDisposer,
  ListGrouper,
  ListTemplate,
  Modal,
  MouseCursorStyle,
  NUMBER,
  Net_exports,
  NumberFormatter,
  Number_exports,
  OrderedList,
  OrderedListTemplate,
  PLACEHOLDER,
  PLACEHOLDER2,
  PX,
  Paper,
  Path_exports,
  Pattern,
  PointedRectangle,
  PointedShape,
  Popup,
  RadialGradient,
  Rectangle,
  ResizeButton,
  Responsive,
  ResponsiveBreakpoints,
  RoundedRectangle,
  STRING,
  SVGContainer,
  SVGDefaults,
  Scrollbar,
  SortedList,
  SortedListTemplate,
  Sprite,
  SpriteEventDispatcher,
  SpriteState,
  StyleClass,
  StyleRule,
  System,
  TextFormatter,
  Time_exports,
  Tooltip,
  Utils_exports,
  Validatable,
  XLINK,
  ZoomOutButton,
  addClass,
  addEventListener,
  animate,
  arc,
  arcTo,
  arcToPoint,
  blur,
  castColor,
  closePath,
  color,
  copyAttributes,
  cubicCurveTo,
  cubicOut,
  dataLoader,
  defaultRules,
  fixPixelPerfect,
  focus,
  getElement,
  getInteraction,
  getRoot,
  getTextFormatter,
  globalAdapter,
  isColor,
  isElement,
  isElementInViewport,
  keyboard,
  lineTo,
  moveTo,
  options,
  or,
  outerHTML,
  polyline,
  ready,
  relativeToValue,
  removeClass,
  reverse,
  stringify,
  svgContainers,
  system,
  toColor,
  used,
  visualProperties,
  warn
} from "./chunk-JV5Z7NMR.js";
import {
  Array_exports,
  Cache,
  CounterDisposer,
  Dictionary,
  DictionaryDisposer,
  DictionaryTemplate,
  Disposer,
  EventDispatcher,
  Iterator_exports,
  ListIterator,
  Math_exports,
  MultiDisposer,
  MutableValueDisposer,
  Object_exports,
  Percent,
  Registry,
  String_exports,
  TargetedEventDispatcher,
  Type_exports,
  cache,
  castNumber,
  castString,
  checkBoolean,
  checkNumber,
  checkObject,
  checkString,
  copyProperties,
  cos,
  each,
  getAngle,
  getArcRect,
  getBBox,
  getCommonRectangle,
  getCubicControlPointA,
  getCubicControlPointB,
  getCubicCurveDistance,
  getDistance,
  getMidPoint,
  getPointOnCubicCurve,
  getValue,
  hasValue,
  is,
  isArray,
  isNaN,
  isNumber,
  isObject,
  isPercent,
  isString,
  join,
  max,
  max2,
  min,
  min2,
  nextFrame,
  normalizeAngle,
  percent,
  readFrame,
  registry,
  remove,
  round,
  sin,
  triggerIdle,
  whenIdle,
  writeFrame
} from "./chunk-JIM7UVIT.js";
import {
  __extends,
  __spread
} from "./chunk-YUUEQ4QI.js";
import "./chunk-Y6Q6HMFU.js";

// node_modules/@amcharts/amcharts4/.internal/core/elements/Ellipse.js
var Ellipse = (
  /** @class */
  function(_super) {
    __extends(Ellipse2, _super);
    function Ellipse2() {
      var _this = _super.call(this) || this;
      _this.className = "Ellipse";
      _this.element = _this.paper.add("ellipse");
      _this.applyTheme();
      return _this;
    }
    Ellipse2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      this.element.attr({ "rx": this.radius });
      this.element.attr({ "ry": this.radiusY });
    };
    Object.defineProperty(Ellipse2.prototype, "radiusY", {
      /**
       * @return Vertical radius
       */
      get: function() {
        return this.innerHeight / 2;
      },
      /**
       * Vertical radius.
       *
       * It's a relative size to the `radius`.
       *
       * E.g. 0.8 will mean the height of the ellipsis will be 80% of it's
       * horizontal radius.
       *
       * @param value  Vertical radius
       */
      set: function(value) {
        this.height = value * 2;
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Ellipse2.prototype, "radius", {
      /**
       * @return Horizontal radius
       */
      get: function() {
        return this.innerWidth / 2;
      },
      /**
       * Horizontal radius.
       *
       * @param value  Horizontal radius
       */
      set: function(value) {
        this.width = value * 2;
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    return Ellipse2;
  }(Circle)
);
registry.registeredClasses["Ellipse"] = Ellipse;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Image.js
var Image = (
  /** @class */
  function(_super) {
    __extends(Image2, _super);
    function Image2() {
      var _this = _super.call(this) || this;
      _this.className = "Image";
      _this.element = _this.paper.add("image");
      _this.applyTheme();
      _this.width = 50;
      _this.height = 50;
      return _this;
    }
    Image2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      if (this.href) {
        var width = this.innerWidth;
        var height = this.innerHeight;
        if (isNumber(this.widthRatio)) {
          width = height * this.widthRatio;
          this.width = width;
        }
        if (isNumber(this.heightRatio)) {
          height = width * this.heightRatio;
          this.height = height;
        }
        this.element.attr({
          "width": width,
          "height": height
        });
        this.element.attrNS(XLINK, "xlink:href", this.href);
      }
    };
    Object.defineProperty(Image2.prototype, "href", {
      /**
       * @return Image URI
       */
      get: function() {
        return this.getPropertyValue("href");
      },
      /**
       * An image URI.
       *
       * @param value  Image URI
       */
      set: function(value) {
        this.setPropertyValue("href", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Image2.prototype, "widthRatio", {
      /**
       * @return Ratio
       */
      get: function() {
        return this.getPropertyValue("widthRatio");
      },
      /**
       * Sets image `width` relatively to its `height`.
       *
       * If image's `height = 100` and `widthRatio = 0.5` the actual width will be
       * `50`.
       *
       * @param value  Ratio
       */
      set: function(value) {
        this.setPropertyValue("widthRatio", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Image2.prototype, "heightRatio", {
      /**
       * @return Ratio
       */
      get: function() {
        return this.getPropertyValue("heightRatio");
      },
      /**
       * Sets image `height` relatively to its `width`.
       *
       * If image's `width = 100` and `heightRatio = 0.5` the actual height will be
       * `50`.
       *
       * @param value  Ratio
       */
      set: function(value) {
        this.setPropertyValue("heightRatio", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Image2.prototype, "bbox", {
      /**
       * Returns bounding box (square) for this element.
       *
       * @ignore Exclude from docs
       */
      get: function() {
        return {
          x: 0,
          y: 0,
          width: this.pixelWidth,
          height: this.pixelHeight
        };
      },
      enumerable: true,
      configurable: true
    });
    return Image2;
  }(Sprite)
);
registry.registeredClasses["Image"] = Image;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Line.js
var Line = (
  /** @class */
  function(_super) {
    __extends(Line2, _super);
    function Line2() {
      var _this = _super.call(this) || this;
      _this.className = "Line";
      _this.element = _this.paper.add("line");
      _this.fill = color();
      _this.x1 = 0;
      _this.y1 = 0;
      _this.applyTheme();
      return _this;
    }
    Line2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      if (this.x1 == this.x2 || this.y1 == this.y2) {
        this.pixelPerfect = true;
      } else {
        this.pixelPerfect = false;
      }
      this.x1 = this.x1;
      this.x2 = this.x2;
      this.y1 = this.y1;
      this.y2 = this.y2;
    };
    Object.defineProperty(Line2.prototype, "x1", {
      /**
       * @return X
       */
      get: function() {
        return this.getPropertyValue("x1");
      },
      /**
       * X coordinate of first end.
       *
       * @param value X
       */
      set: function(value) {
        if (!isNumber(value)) {
          value = 0;
        }
        var delta = 0;
        if (this.pixelPerfect && this.stroke instanceof LinearGradient) {
          delta = 1e-5;
        }
        this.setPropertyValue("x1", value, true);
        this.element.attr({ "x1": value + delta });
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Line2.prototype, "x2", {
      /**
       * @return X
       */
      get: function() {
        var value = this.getPropertyValue("x2");
        if (!isNumber(value)) {
          value = this.pixelWidth;
        }
        return value;
      },
      /**
       * X coordinate of second end.
       *
       * @param value X
       */
      set: function(value) {
        if (!isNumber(value)) {
          value = 0;
        }
        this.setPropertyValue("x2", value, true);
        this.element.attr({ "x2": value });
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Line2.prototype, "y1", {
      /**
       * @return Y
       */
      get: function() {
        return this.getPropertyValue("y1");
      },
      /**
       * Y coordinate of first end.
       *
       * @param value Y
       */
      set: function(value) {
        if (!isNumber(value)) {
          value = 0;
        }
        var delta = 0;
        if (this.pixelPerfect && this.stroke instanceof LinearGradient) {
          delta = 1e-5;
        }
        this.setPropertyValue("y1", value, true);
        this.element.attr({ "y1": value + delta });
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Line2.prototype, "y2", {
      /**
       * @return Y
       */
      get: function() {
        var value = this.getPropertyValue("y2");
        if (!isNumber(value)) {
          value = this.pixelHeight;
        }
        return value;
      },
      /**
       * Y coordinate of second end.
       *
       * @param value Y
       */
      set: function(value) {
        if (!isNumber(value)) {
          value = 0;
        }
        this.setPropertyValue("y2", value, true);
        this.element.attr({ "y2": value });
      },
      enumerable: true,
      configurable: true
    });
    Line2.prototype.positionToPoint = function(position) {
      var point1 = { x: this.x1, y: this.y1 };
      var point2 = { x: this.x2, y: this.y2 };
      var point = getMidPoint(point1, point2, position);
      var angle = getAngle(point1, point2);
      return { x: point.x, y: point.y, angle };
    };
    return Line2;
  }(Sprite)
);
registry.registeredClasses["Line"] = Line;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Polyline.js
var Polyline = (
  /** @class */
  function(_super) {
    __extends(Polyline2, _super);
    function Polyline2() {
      var _this = _super.call(this) || this;
      _this._distance = 0;
      _this.className = "Polyline";
      _this.element = _this.paper.add("path");
      _this.shapeRendering = "auto";
      _this.fill = color();
      _this.strokeOpacity = 1;
      _this.applyTheme();
      return _this;
    }
    Polyline2.prototype.makePath = function() {
      this._distance = 0;
      var segments = this.segments;
      if (segments && segments.length > 0) {
        var path = "";
        for (var i = 0, len = segments.length; i < len; i++) {
          var points = segments[i];
          if (points.length > 0) {
            path += moveTo(points[0]);
            for (var p = 1; p < points.length; p++) {
              var point = points[p];
              path += lineTo(point);
              this._distance += getDistance(points[p - 1], point);
            }
          }
        }
        this.path = path;
      }
      this._realSegments = segments;
    };
    Object.defineProperty(Polyline2.prototype, "segments", {
      /**
       * @return Segments
       */
      get: function() {
        return this.getPropertyValue("segments");
      },
      /**
       * A list of segment coordinates for the multi-part line.
       *
       * @todo Example
       * @param segments  Segments
       */
      set: function(segments) {
        this.setPropertyValue("segments", segments);
        this.makePath();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Polyline2.prototype, "distance", {
      /**
       * [distance description]
       *
       * @todo Description
       * @return [description]
       */
      get: function() {
        return this._distance;
      },
      enumerable: true,
      configurable: true
    });
    Polyline2.prototype.positionToPoint = function(position) {
      var deltaAngle = 0;
      if (position < 0) {
        position = Math.abs(position);
        deltaAngle = 180;
      }
      var segments = this._realSegments;
      if (segments) {
        var totalDistance = this.distance;
        var currentDistance = 0;
        var distanceAB = void 0;
        var positionA = 0;
        var positionB = 0;
        var pointA = void 0;
        var pointB = void 0;
        for (var s = 0; s < segments.length; s++) {
          var points = segments[s];
          if (points.length > 1) {
            for (var p = 1; p < points.length; p++) {
              pointA = points[p - 1];
              pointB = points[p];
              positionA = currentDistance / totalDistance;
              distanceAB = getDistance(pointA, pointB);
              currentDistance += distanceAB;
              positionB = currentDistance / totalDistance;
              if (positionA <= position && positionB > position) {
                s = segments.length;
                break;
              }
            }
          } else if (points.length == 1) {
            pointA = points[0];
            pointB = points[0];
            positionA = 0;
            positionB = 1;
          }
        }
        if (pointA && pointB) {
          var positionAB = (position - positionA) / (positionB - positionA);
          var midPoint = getMidPoint(pointA, pointB, positionAB);
          return { x: midPoint.x, y: midPoint.y, angle: deltaAngle + getAngle(pointA, pointB) };
        }
      }
      return { x: 0, y: 0, angle: 0 };
    };
    Object.defineProperty(Polyline2.prototype, "realSegments", {
      /**
       * @ignore
       */
      get: function() {
        return this._realSegments;
      },
      enumerable: true,
      configurable: true
    });
    return Polyline2;
  }(Sprite)
);
registry.registeredClasses["Polyline"] = Polyline;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Polyarc.js
var Polyarc = (
  /** @class */
  function(_super) {
    __extends(Polyarc2, _super);
    function Polyarc2() {
      var _this = _super.call(this) || this;
      _this.className = "Polyarc";
      _this.controlPointDistance = 0.5;
      _this.controlPointPosition = 0.5;
      _this.applyTheme();
      return _this;
    }
    Polyarc2.prototype.makePath = function() {
      this._distance = 0;
      var segments = this.segments;
      if (segments && segments.length > 0) {
        var path = "";
        this._realSegments = [];
        for (var i = 0, len = segments.length; i < len; i++) {
          var points = segments[i];
          var realPoints = [];
          this._realSegments.push(realPoints);
          if (points.length > 0) {
            path += moveTo(points[0]);
            for (var p = 1; p < points.length; p++) {
              var pointA = points[p - 1];
              var pointB = points[p];
              var distanceAB = getDistance(pointB, pointA);
              var cpDistance = distanceAB * this.controlPointDistance;
              var controlPointPosition = this.controlPointPosition;
              var angle = -getAngle(pointA, pointB);
              var cpx = pointA.x + (pointB.x - pointA.x) * controlPointPosition * 0.5 - cpDistance * sin(angle);
              var cpy = pointA.y + (pointB.y - pointA.y) * controlPointPosition * 0.5 - cpDistance * cos(angle);
              var controlPoint1 = { x: cpx, y: cpy };
              var cpx2 = pointA.x + (pointB.x - pointA.x) * controlPointPosition * 1.5 - cpDistance * sin(angle);
              var cpy2 = pointA.y + (pointB.y - pointA.y) * controlPointPosition * 1.5 - cpDistance * cos(angle);
              var controlPoint2 = { x: cpx2, y: cpy2 };
              path += cubicCurveTo(pointB, controlPoint1, controlPoint2);
              var stepCount = Math.ceil(distanceAB);
              var prevPoint = pointA;
              if (stepCount > 0) {
                for (var i_1 = 0; i_1 <= stepCount; i_1++) {
                  var point = getPointOnCubicCurve(pointA, pointB, controlPoint1, controlPoint2, i_1 / stepCount);
                  realPoints.push(point);
                  this._distance += getDistance(prevPoint, point);
                  prevPoint = point;
                }
              } else {
                realPoints.push(pointA);
              }
            }
          }
        }
        this.path = path;
      }
    };
    Object.defineProperty(Polyarc2.prototype, "controlPointPosition", {
      /**
       * @return Position (0-1)
       */
      get: function() {
        return this.getPropertyValue("controlPointPosition");
      },
      /**
       * Relative position along the line the control point is. (0-1)
       *
       * @default 0.5
       * @param value  Position (0-1)
       */
      set: function(value) {
        this.setPropertyValue("controlPointPosition", value);
        this.makePath();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Polyarc2.prototype, "controlPointDistance", {
      /**
       * @return Distance (0-1)
       */
      get: function() {
        return this.getPropertyValue("controlPointDistance");
      },
      /**
       * Relative distance of the control point. (0-1)
       *
       * Default is half the length of the line. (0.5)
       *
       * @default 0.5
       * @param value  Distance (0-1)
       */
      set: function(value) {
        this.setPropertyValue("controlPointDistance", value);
        this.makePath();
      },
      enumerable: true,
      configurable: true
    });
    return Polyarc2;
  }(Polyline)
);
registry.registeredClasses["Polyarc"] = Polyarc;

// node_modules/@amcharts/amcharts4/.internal/core/utils/Morpher.js
var Morpher = (
  /** @class */
  function(_super) {
    __extends(Morpher2, _super);
    function Morpher2(morphable) {
      var _this = _super.call(this) || this;
      _this._bboxes = [];
      _this.morphDuration = 800;
      _this.morphEasing = cubicOut;
      _this.morphToSingle = true;
      _this.scaleRatio = 1;
      _this.className = "Morpher";
      _this.morphable = morphable;
      _this.applyTheme();
      return _this;
    }
    Morpher2.prototype.morphToPolygon = function(toPoints, duration, easing) {
      var points = this.morphable.currentPoints;
      if (points && toPoints) {
        this.sortPoints(points);
        this.sortPoints(toPoints);
        this._morphFromPointsReal = [];
        this._morphToPointsReal = [];
        if (!hasValue(duration)) {
          duration = this.morphDuration;
        }
        if (!hasValue(easing)) {
          easing = this.morphEasing;
        }
        this._morphFromPointsReal = this.normalizePoints(toPoints, points);
        this._morphToPointsReal = this.normalizePoints(points, toPoints);
        this.morphable.currentPoints = this._morphFromPointsReal;
        var animation = new Animation(this, { property: "morphProgress", from: 0, to: 1 }, duration, easing);
        this._disposers.push(animation);
        animation.start();
        return animation;
      }
    };
    Morpher2.prototype.normalizePoints = function(pointsA, pointsB) {
      for (var i = 0, len = pointsA.length; i < len; i++) {
        var surfaceA = pointsA[i][0];
        var holeA = pointsA[i][1];
        var bboxA = getValue(getBBox(surfaceA));
        var middleX = bboxA.x + bboxA.width;
        var middleY = bboxA.y + bboxA.height;
        if (!pointsB[i]) {
          pointsB[i] = [];
        }
        if (surfaceA && !pointsB[i][0]) {
          pointsB[i][0] = [{ x: middleX, y: middleY }, { x: middleX, y: middleY }];
        }
        if (pointsB[i][0]) {
          pointsB[i][0] = this.addPoints(pointsB[i][0], surfaceA.length);
          var distance = Infinity;
          var splitAt = 0;
          for (var a = 0; a < pointsB[i][0].length; a++) {
            var newDistance = getDistance(pointsB[i][0][a], surfaceA[0]);
            if (newDistance < distance) {
              splitAt = a;
              distance = newDistance;
            }
          }
          var partA = pointsB[i][0].slice(0, splitAt);
          var partB = pointsB[i][0].slice(splitAt);
          pointsB[i][0] = partB.concat(partA);
        }
        if (holeA) {
          if (!pointsB[i][1]) {
            pointsB[i][1] = [{ x: middleX, y: middleY }, { x: middleX, y: middleY }];
          }
          pointsB[i][1] = this.addPoints(pointsB[i][1], holeA.length);
        }
      }
      return pointsB;
    };
    Morpher2.prototype.sortPoints = function(points) {
      points.sort(function(a, b) {
        var bbox1 = getValue(getBBox(a[0]));
        var bbox2 = getValue(getBBox(b[0]));
        if (bbox1.width * bbox1.height > bbox2.width * bbox2.height) {
          return -1;
        } else {
          return 1;
        }
      });
      var bboxes = [];
      for (var i = 0, len = points.length; i < len; i++) {
        var surface = points[i][0];
        if (surface) {
          bboxes.push(getValue(getBBox(surface)));
        }
      }
      return getCommonRectangle(bboxes);
    };
    Morpher2.prototype.morphToCircle = function(radius, duration, easing) {
      var points = this.morphable.points;
      var commonBBox = this.sortPoints(points);
      this._morphFromPointsReal = [];
      this._morphToPointsReal = [];
      if (!hasValue(duration)) {
        duration = this.morphDuration;
      }
      if (!hasValue(easing)) {
        easing = this.morphEasing;
      }
      for (var i = 0, len = points.length; i < len; i++) {
        var surface = points[i][0];
        var hole = points[i][1];
        this._morphFromPointsReal[i] = [];
        this._morphToPointsReal[i] = [];
        if (surface) {
          var toPoints = surface;
          var fromPoints = surface;
          var bbox = getValue(getBBox(fromPoints));
          if (this.morphToSingle) {
            bbox = getValue(commonBBox);
          }
          var middleX = bbox.x + bbox.width / 2;
          var middleY = bbox.y + bbox.height / 2;
          var realRadius = radius;
          if (!isNumber(realRadius)) {
            realRadius = Math.min(bbox.width / 2, bbox.height / 2);
          }
          toPoints = [];
          var startAngle = getAngle({ x: middleX, y: middleY }, surface[0]);
          var count = 100;
          if (surface.length > count) {
            count = surface.length;
          }
          fromPoints = this.addPoints(surface, count);
          count = fromPoints.length;
          var angle = 360 / (count - 1);
          for (var a = 0; a < count; a++) {
            var realAngle = angle * a + startAngle;
            var pointOnCircle = { x: middleX + realRadius * cos(realAngle), y: middleY + realRadius * sin(realAngle) };
            toPoints[a] = pointOnCircle;
          }
          if (hole && hole.length > 0) {
            for (var i_1 = 0, hlen = hole.length; i_1 < hlen; i_1++) {
              toPoints.push({ x: middleX, y: middleY });
            }
          }
          this._morphFromPointsReal[i][0] = fromPoints;
          this._morphToPointsReal[i][0] = toPoints;
        }
      }
      this.morphable.currentPoints = this._morphFromPointsReal;
      var animation = new Animation(this, { property: "morphProgress", from: 0, to: 1 }, duration, easing);
      this._disposers.push(animation);
      animation.start();
      return animation;
    };
    Morpher2.prototype.addPoints = function(points, mustHaveCount) {
      var addToSegmentCount = Math.round(mustHaveCount / points.length);
      var newPoints = [];
      for (var i = 0, len = points.length; i < len; i++) {
        var point0 = points[i];
        var point1 = void 0;
        if (i == points.length - 1) {
          point1 = points[0];
        } else {
          point1 = points[i + 1];
        }
        newPoints.push(point0);
        for (var p = 1; p < addToSegmentCount; p++) {
          var percent2 = p / addToSegmentCount;
          var extraPoint = { x: point0.x + (point1.x - point0.x) * percent2, y: point0.y + (point1.y - point0.y) * percent2 };
          newPoints.push(extraPoint);
        }
        if (newPoints.length + points.length - i == mustHaveCount) {
          addToSegmentCount = 0;
        }
      }
      if (newPoints.length < mustHaveCount && points.length > 0) {
        var lastPoint = points[points.length - 1];
        for (var p = newPoints.length; p < mustHaveCount; p++) {
          newPoints.push({ x: lastPoint.x, y: lastPoint.y });
        }
      }
      return newPoints;
    };
    Morpher2.prototype.morphToRectangle = function(width, height, duration, easing) {
      var points = this.morphable.points;
      this.sortPoints(points);
      this._morphFromPointsReal = [];
      this._morphToPointsReal = [];
      if (!hasValue(duration)) {
        duration = this.morphDuration;
      }
      if (!hasValue(easing)) {
        easing = this.morphEasing;
      }
      for (var i = 0, len = points.length; i < len; i++) {
        var surface = points[i][0];
        var hole = points[i][1];
        this._morphFromPointsReal[i] = [];
        this._morphToPointsReal[i] = [];
        if (surface) {
          var toPoints = surface;
          var fromPoints = surface;
          var bbox = this._bboxes[i];
          if (this.morphToSingle) {
          }
          var x = bbox.x;
          var y = bbox.y;
          var realWidth = width;
          var realHeight = height;
          if (!isNumber(realWidth)) {
            realWidth = bbox.width;
          }
          if (!isNumber(realHeight)) {
            realHeight = bbox.height;
          }
          toPoints = [{ x, y }, { x: x + realWidth, y }, { x: x + realWidth, y: y + realHeight }, { x, y: y + realHeight }];
          toPoints = this.addPoints(toPoints, surface.length);
          if (surface.length < 4) {
            for (var i_2 = surface.length; i_2 < 4; i_2++) {
              toPoints.push({ x: surface[i_2].x, y: surface[i_2].y });
            }
          }
          if (hole && hole.length > 0) {
            var middleX = bbox.x + bbox.width / 2;
            var middleY = bbox.y + bbox.height / 2;
            for (var i_3 = 0, hlen = hole.length; i_3 < hlen; i_3++) {
              toPoints.push({ x: middleX, y: middleY });
            }
          }
          this._morphFromPointsReal[i][0] = fromPoints;
          this._morphToPointsReal[i][0] = toPoints;
        }
      }
      this.morphable.currentPoints = this._morphFromPointsReal;
      var animation = new Animation(this, { property: "morphProgress", from: 0, to: 1 }, duration, easing);
      this._disposers.push(animation);
      animation.start();
      return animation;
    };
    Object.defineProperty(Morpher2.prototype, "morphProgress", {
      /**
       * Returns the progress of morph transition.
       *
       * @return Progress (0-1)
       */
      get: function() {
        return this._morphProgress;
      },
      /**
       * Progress of the morph transition.
       *
       * Setting this will also trigger actual transformation.
       *
       * @param value  Progress (0-1)
       */
      set: function(value) {
        this._morphProgress = value;
        var currentPoints = [];
        if (value != null) {
          var fromPoints = this._morphFromPointsReal;
          var toPoints = this._morphToPointsReal;
          if (fromPoints != null && toPoints != null) {
            for (var i = 0, len = fromPoints.length; i < len; i++) {
              var currentArea = [];
              currentPoints.push(currentArea);
              var surfaceFrom = fromPoints[i][0];
              var holeFrom = fromPoints[i][1];
              var surfaceTo = toPoints[i][0];
              var holeTo = toPoints[i][1];
              if (surfaceFrom && surfaceFrom.length > 0 && surfaceTo && surfaceTo.length > 0) {
                var currentSurface = [];
                for (var i_4 = 0, slen = surfaceFrom.length; i_4 < slen; i_4++) {
                  var point0 = surfaceFrom[i_4];
                  var point1 = surfaceTo[i_4];
                  var currentPoint = { x: point0.x + (point1.x * this.scaleRatio - point0.x) * value, y: point0.y + (point1.y * this.scaleRatio - point0.y) * value };
                  currentSurface.push(currentPoint);
                }
                currentArea[0] = currentSurface;
              }
              if (holeFrom && holeFrom.length > 0 && holeTo && holeTo.length > 0) {
                var currentHole = [];
                for (var i_5 = 0, hlen = holeFrom.length; i_5 < hlen; i_5++) {
                  var point0 = holeFrom[i_5];
                  var point1 = holeTo[i_5];
                  var currentPoint = { x: point0.x + (point1.x * this.scaleRatio - point0.x) * value, y: point0.y + (point1.y * this.scaleRatio - point0.y) * value };
                  currentHole.push(currentPoint);
                }
                currentArea[1] = currentHole;
              }
            }
          }
        }
        this.morphable.currentPoints = currentPoints;
      },
      enumerable: true,
      configurable: true
    });
    Morpher2.prototype.morphBack = function(duration, easing) {
      this._morphToPointsReal = this._morphFromPointsReal;
      this._morphFromPointsReal = this.morphable.currentPoints;
      if (!hasValue(duration)) {
        duration = this.morphDuration;
      }
      if (!hasValue(easing)) {
        easing = this.morphEasing;
      }
      var animation = new Animation(this, { property: "morphProgress", from: 0, to: 1 }, duration, easing);
      this._disposers.push(animation);
      animation.start();
      return animation;
    };
    Object.defineProperty(Morpher2.prototype, "animations", {
      /**
       * Returns a list of morph animations currently being played.
       *
       * @return List of animations
       */
      get: function() {
        if (!this._animations) {
          this._animations = [];
          this._disposers.push(new AnimationDisposer(this._animations));
        }
        return this._animations;
      },
      enumerable: true,
      configurable: true
    });
    return Morpher2;
  }(BaseObject)
);

// node_modules/@amcharts/amcharts4/.internal/core/elements/Polygon.js
var Polygon = (
  /** @class */
  function(_super) {
    __extends(Polygon2, _super);
    function Polygon2() {
      var _this = _super.call(this) || this;
      _this.className = "Polygon";
      _this.element = _this.paper.add("path");
      _this.shapeRendering = "auto";
      _this._currentPoints = [];
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(Polygon2.prototype, "points", {
      /**
       * @return Polygon points
       */
      get: function() {
        var points = this.getPropertyValue("points");
        var path = this.path;
        if (path && (!points || points.length == 0)) {
          var valueStr = path.slice(1, path.length - 1);
          var segments = valueStr.split("ZM");
          for (var s = 0; s < segments.length; s++) {
            var segment = segments[s];
            if (segment.length > 0) {
              var areaHole = segment.split("M");
              var areaArr = areaHole[0];
              var holeArr = areaHole[1];
              if (areaArr && areaArr.length > 0) {
                var pointsArr = areaArr.split("L");
                if (pointsArr.length > 0) {
                  var area = [];
                  var areaAndHole = [area];
                  points.push(areaAndHole);
                  for (var p = 0; p < pointsArr.length; p++) {
                    var coords = pointsArr[p].split(",");
                    area.push({ x: +coords[0], y: +coords[1] });
                  }
                  if (holeArr && holeArr.length > 0) {
                    var pointsArr_1 = holeArr.split("L");
                    if (pointsArr_1.length > 0) {
                      var hole = [];
                      areaAndHole.push(hole);
                      for (var p = pointsArr_1.length - 1; p >= 0; p--) {
                        var coords = pointsArr_1[p].split(",");
                        hole.push({ x: +coords[0], y: +coords[1] });
                      }
                    }
                  }
                }
              }
            }
          }
          this.setPropertyValue("points", points);
          this._currentPoints = points;
        }
        return points;
      },
      /**
       * An array of X/Y coordinates for each elbow of the polygon.
       *
       * @todo Example
       * @param points  Polygon points
       */
      set: function(points) {
        this.setPropertyValue("points", points, true);
        this._currentPoints = points;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Polygon2.prototype, "currentPoints", {
      /**
       * @return Polygon points
       */
      get: function() {
        if ((!this._currentPoints || this._currentPoints.length == 0) && this.path) {
          this._currentPoints = this.points;
        }
        return this._currentPoints;
      },
      /**
       * Current points. Used when morphing the element, so that original `points`
       * are not overwritten.
       *
       * @param points  Polygon points
       */
      set: function(points) {
        if (this._currentPoints != points) {
          this._currentPoints = points;
          this.draw();
        }
      },
      enumerable: true,
      configurable: true
    });
    Polygon2.prototype.draw = function() {
      var path = "";
      var points = this._currentPoints;
      var left;
      var right;
      var top;
      var bottom;
      if (points.length > 0) {
        for (var i = 0, len = points.length; i < len; i++) {
          var surface = points[i][0];
          var hole = points[i][1];
          if (surface && surface.length > 0) {
            var point = surface[0];
            path += moveTo(point);
            for (var s = 0; s < surface.length; s++) {
              point = surface[s];
              path += lineTo(point);
              if (!isNumber(right) || right < point.x) {
                right = point.x;
              }
              if (!isNumber(left) || left > point.x) {
                left = point.x;
              }
              if (!isNumber(top) || top > point.y) {
                top = point.y;
              }
              if (!isNumber(bottom) || bottom < point.y) {
                bottom = point.y;
              }
            }
          }
          if (hole && hole.length > 0) {
            var point = hole[0];
            path += moveTo(point);
            for (var h = 0, hlen = hole.length; h < hlen; h++) {
              point = hole[h];
              path += lineTo(point);
            }
          }
        }
        if (path) {
          path += closePath();
        }
        this.bbox.x = left;
        this.bbox.y = top;
        this.bbox.width = right - left;
        this.bbox.height = bottom - top;
        _super.prototype.setPath.call(this, path);
      }
    };
    Polygon2.prototype.setPath = function(value) {
      if (_super.prototype.setPath.call(this, value)) {
        this.points = [];
        this._bbox = this.group.getBBox();
        return true;
      }
      return false;
    };
    Polygon2.prototype.measureElement = function() {
    };
    Object.defineProperty(Polygon2.prototype, "centerPoint", {
      /**
       * A calculated center point for the shape.
       *
       * @readonly
       * @return Center
       */
      get: function() {
        return { x: this.bbox.x + this.bbox.width / 2, y: this.bbox.y + this.bbox.height / 2 };
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Polygon2.prototype, "morpher", {
      /**
       * A [[Morpher]] instance that is used to morph polygon into some other
       * shape.
       *
       * @readonly
       * @return Morpher instance
       */
      get: function() {
        if (!this._morpher) {
          this._morpher = new Morpher(this);
          this._disposers.push(this._morpher);
        }
        return this._morpher;
      },
      enumerable: true,
      configurable: true
    });
    return Polygon2;
  }(Sprite)
);
registry.registeredClasses["Polygon"] = Polygon;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Polyspline.js
var Polyspline = (
  /** @class */
  function(_super) {
    __extends(Polyspline2, _super);
    function Polyspline2() {
      var _this = _super.call(this) || this;
      _this.className = "Polyspline";
      _this.tensionX = 0.5;
      _this.tensionY = 0.5;
      _this.applyTheme();
      return _this;
    }
    Polyspline2.prototype.makePath = function() {
      this._distance = 0;
      var segments = this.segments;
      var tensionX = this.tensionX;
      var tensionY = this.tensionY;
      this.allPoints = [];
      if (segments && segments.length > 0) {
        var path = "";
        this._realSegments = [];
        for (var i = 0, len = segments.length; i < len; i++) {
          var points = segments[i];
          var realPoints = [];
          this._realSegments.push(realPoints);
          if (points.length > 0) {
            var first = points[0];
            var last = points[points.length - 1];
            var closed_1 = false;
            if (round(first.x, 3) == round(last.x) && round(first.y) == round(last.y)) {
              closed_1 = true;
            }
            path += moveTo(points[0]);
            for (var p = 0; p < points.length - 1; p++) {
              var p0 = points[p - 1];
              var p1 = points[p];
              var p2 = points[p + 1];
              var p3 = points[p + 2];
              if (p === 0) {
                p0 = points[p];
              } else if (p == points.length - 2) {
                p3 = points[p + 1];
              }
              if (!p3) {
                p3 = p2;
              }
              if (p === 0) {
                if (closed_1) {
                  p0 = points[points.length - 2];
                } else {
                  p0 = points[i];
                }
              } else if (p == points.length - 2) {
                if (closed_1) {
                  p3 = points[1];
                } else {
                  p3 = points[p + 1];
                }
              }
              var controlPointA = getCubicControlPointA(p0, p1, p2, p3, tensionX, tensionY);
              var controlPointB = getCubicControlPointB(p0, p1, p2, p3, tensionX, tensionY);
              path += cubicCurveTo(p2, controlPointA, controlPointB);
              var stepCount = Math.ceil(getCubicCurveDistance(p1, p2, controlPointA, controlPointB, 20)) * 1.2;
              var prevPoint = p1;
              if (stepCount > 0) {
                for (var s = 0; s <= stepCount; s++) {
                  var point = getPointOnCubicCurve(p1, p2, controlPointA, controlPointB, s / stepCount);
                  if (point.x == prevPoint.x && point.y == prevPoint.y) {
                    continue;
                  }
                  realPoints.push(point);
                  var angle = round(getAngle(prevPoint, point), 5);
                  this._distance += getDistance(prevPoint, point);
                  this.allPoints[Math.floor(this._distance)] = { x: point.x, y: point.y, angle };
                  prevPoint = point;
                }
              } else {
                realPoints.push(p0);
              }
            }
          }
          var allPoints = this.allPoints;
          if (allPoints.length > 1) {
            for (var i_1 = 0; i_1 < allPoints.length; i_1++) {
              if (!allPoints[i_1]) {
                if (i_1 > 1) {
                  allPoints[i_1] = allPoints[i_1 - 1];
                } else {
                  for (var k = 1; k < allPoints.length; k++) {
                    if (allPoints[k]) {
                      allPoints[i_1] = allPoints[k];
                      break;
                    }
                  }
                }
              }
            }
          }
        }
        this.path = path;
      }
    };
    Polyspline2.prototype.getClosestPointIndex = function(point) {
      var points = this.allPoints;
      var index;
      var closest = Infinity;
      if (points.length > 1) {
        for (var p = 1; p < points.length; p++) {
          var distance = getDistance(point, points[p]);
          if (distance < closest) {
            index = p;
            closest = distance;
          }
        }
      }
      return index;
    };
    Object.defineProperty(Polyspline2.prototype, "tensionX", {
      /**
       * @return Tension
       */
      get: function() {
        return this.getPropertyValue("tensionX");
      },
      /**
       * Horizontal tension for the spline.
       *
       * Used by the line smoothing algorithm.
       *
       * @default 0.5
       * @param value  Tension
       */
      set: function(value) {
        this.setPropertyValue("tensionX", value);
        this.makePath();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Polyspline2.prototype, "tensionY", {
      /**
       * @return Tension
       */
      get: function() {
        return this.getPropertyValue("tensionY");
      },
      /**
       * Vertical tension for the spline.
       *
       * Used by the line smoothing algorithm.
       *
       * @default 0.5
       * @param value  Tensions
       */
      set: function(value) {
        this.setPropertyValue("tensionY", value, true);
        this.makePath();
      },
      enumerable: true,
      configurable: true
    });
    Polyspline2.prototype.positionToPoint = function(position, extend) {
      var deltaAngle = 0;
      var allPoints = this.allPoints;
      var len = allPoints.length;
      if (!isNumber(position)) {
        position = 0;
      }
      if (len > 1) {
        if (extend && len > 3) {
          if (position < 0) {
            if (position < -0.01) {
              position = -0.01;
            }
            var f0 = allPoints[0];
            var f1 = allPoints[1];
            var x = f0.x - (f0.x - f1.x) * len * position;
            var y = f0.y - (f0.y - f1.y) * len * position;
            return { x, y, angle: getAngle(f0, f1) };
          } else if (position > 1) {
            if (position > 1.01) {
              position = 1.01;
            }
            var f0 = allPoints[allPoints.length - 2];
            var f1 = allPoints[allPoints.length - 3];
            var x = f0.x + (f0.x - f1.x) * len * (position - 1);
            var y = f0.y + (f0.y - f1.y) * len * (position - 1);
            return { x, y, angle: getAngle(f0, { x, y }) };
          } else if (position == 1) {
            var point_1 = allPoints[allPoints.length - 1];
            return { x: point_1.x, y: point_1.y, angle: point_1.angle };
          }
        } else {
          if (position < 0) {
            position = Math.abs(position);
            deltaAngle = 180;
          }
          if (position >= 1) {
            position = 0.9999999999999;
          }
        }
        var point = allPoints[Math.floor(position * len)];
        return { x: point.x, y: point.y, angle: point.angle + deltaAngle };
      } else if (len == 1) {
        var point = allPoints[0];
        return { x: point.x, y: point.y, angle: point.angle };
      } else {
        return { x: 0, y: 0, angle: 0 };
      }
    };
    return Polyspline2;
  }(Polyline)
);
registry.registeredClasses["Polyspline"] = Polyspline;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Slice.js
var Slice = (
  /** @class */
  function(_super) {
    __extends(Slice2, _super);
    function Slice2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.className = "Slice";
      _this.setPropertyValue("cornerRadius", 0);
      _this.setPropertyValue("startAngle", 0);
      _this.setPercentProperty("innerRadius", 0);
      _this.setPercentProperty("radius", 0);
      _this.setPropertyValue("arc", 0);
      _this.setPropertyValue("shiftRadius", 0);
      _this.strokeOpacity = 1;
      _this.setPropertyValue("layout", "none");
      _this.slice = _this.createChild(Sprite);
      _this.slice.isMeasured = false;
      _this._disposers.push(_this.slice);
      _this.applyTheme();
      return _this;
    }
    Slice2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      var radiusY = this.radiusY;
      if (this.radius > 0 && radiusY == 0) {
        radiusY = 0.01;
      }
      this.slice.path = arc(this.startAngle, this.arc, this.radius, this.pixelInnerRadius, radiusY, this.cornerRadius, this.innerCornerRadius);
      this.slice.invalidate();
      this.shiftRadius = this.shiftRadius;
      if (this.realFill instanceof RadialGradient) {
        this.updateGradient(this.realFill);
      }
      if (this.realStroke instanceof RadialGradient) {
        this.updateGradient(this.realStroke);
      }
    };
    Slice2.prototype.updateGradient = function(gradient) {
      gradient.element.attr({ "gradientUnits": "userSpaceOnUse" });
      gradient.element.attr({ "r": this.radius });
      gradient.cx = 0;
      gradient.cy = 0;
      gradient.element.attr({ radius: this.radius });
    };
    Object.defineProperty(Slice2.prototype, "bbox", {
      /**
       * Returns bounding box (square) for this element.
       *
       * @ignore Exclude from docs
       */
      get: function() {
        if (this.definedBBox) {
          return this.definedBBox;
        }
        if (this.isMeasured) {
          var innerRect = getArcRect(this.startAngle, this.startAngle + this.arc, this.pixelInnerRadius);
          var outerRect = getArcRect(this.startAngle, this.startAngle + this.arc, this.radius);
          return getCommonRectangle([innerRect, outerRect]);
        } else {
          return { x: 0, y: 0, width: 0, height: 0 };
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "startAngle", {
      /**
       * @return Angle (0-360)
       */
      get: function() {
        return this.getPropertyValue("startAngle");
      },
      /**
       * The angle at which left edge of the slice is drawn. (0-360)
       *
       * 0 is to the right of the center.
       *
       * @param value  Angle (0-360)
       */
      set: function(value) {
        this.setPropertyValue("startAngle", normalizeAngle(value), true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "arc", {
      /**
       * @return [description]
       */
      get: function() {
        return this.getPropertyValue("arc");
      },
      /**
       * [arc description]
       *
       * @todo Description
       * @param value [description]
       */
      set: function(value) {
        if (!isNumber(value)) {
          value = 0;
        }
        this.setPropertyValue("arc", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "radius", {
      /**
       * @return Radius (px)
       */
      get: function() {
        var radius = this.getPropertyValue("radius");
        if (!isNumber(radius)) {
          radius = 0;
        }
        return radius;
      },
      /**
       * Radius of the slice in pixels.
       *
       * @param value  Radius (px)
       */
      set: function(value) {
        this.setPropertyValue("radius", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "radiusY", {
      /**
       * @return Vertical radius (0-1)
       */
      get: function() {
        var value = this.getPropertyValue("radiusY");
        if (!isNumber(value)) {
          value = this.radius;
        }
        return value;
      },
      /**
       * Vertical radius for creating skewed slices.
       *
       * This is relevant to `radius`, e.g. 0.5 will set vertical radius to half
       * the `radius`.
       *
       * @param value Vertical radius (0-1)
       */
      set: function(value) {
        this.setPropertyValue("radiusY", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "innerRadius", {
      /**
       * @return Radius (px or %)
       */
      get: function() {
        return this.getPropertyValue("innerRadius");
      },
      /**
       * Inner radius of the slice for creating cut out (donut) slices.
       *
       * @default 0
       * @param value  Radius (px or %)
       */
      set: function(value) {
        this.setPercentProperty("innerRadius", value, true, false, 10, false);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "pixelInnerRadius", {
      /**
       * @return Radius px
       */
      get: function() {
        return relativeToValue(this.innerRadius, this.radius);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "cornerRadius", {
      /**
       * @return Radius (px)
       */
      get: function() {
        return this.getPropertyValue("cornerRadius");
      },
      /**
       * Radius of slice's outer corners in pixels.
       *
       * @default 0
       * @param value  Radius (px)
       */
      set: function(value) {
        this.setPropertyValue("cornerRadius", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "innerCornerRadius", {
      /**
       * @return Radius (px)
       */
      get: function() {
        return this.getPropertyValue("innerCornerRadius");
      },
      /**
       * Radius of slice's inner corners in pixels.
       *
       * @default 0
       * @param value  Radius (px)
       */
      set: function(value) {
        this.setPropertyValue("innerCornerRadius", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "shiftRadius", {
      /**
       * @return Radius shift
       */
      get: function() {
        return this.getPropertyValue("shiftRadius");
      },
      /**
       * Indicates how far (relatively to center) a slice should be moved.
       *
       * The value is relative to the radius of the slice. Meaning 0 no shift,
       * 1 - slice shifted outside by whole of its radius.
       *
       * @param  value  Radius shift
       */
      set: function(value) {
        this.setPropertyValue("shiftRadius", value);
        value = this.getPropertyValue("shiftRadius");
        this.dx = value * this.radius * this.ix;
        this.dy = value * this.radiusY * this.iy;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "ix", {
      /**
       * [ix description]
       *
       * @ignore Exclude from docs
       * @todo Description
       * @return [description]
       */
      get: function() {
        return cos(this.middleAngle);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "iy", {
      /**
       * [iy description]
       *
       * @ignore Exclude from docs
       * @todo Description
       * @return [description]
       */
      get: function() {
        return sin(this.middleAngle);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice2.prototype, "middleAngle", {
      /**
       * An angle of the slice's middle.
       *
       * @ignore Exclude from docs
       * @return Angle
       */
      get: function() {
        return this.startAngle + this.arc / 2;
      },
      enumerable: true,
      configurable: true
    });
    Slice2.prototype.getTooltipX = function() {
      var value = this.getPropertyValue("tooltipX");
      if (isNumber(value)) {
        return value;
      }
      var p = 0.5;
      if (value instanceof Percent) {
        p = value.value;
      }
      var innerRadius = relativeToValue(this.innerRadius, this.radius);
      return this.ix * (innerRadius + (this.radius - innerRadius) * p);
    };
    Slice2.prototype.getTooltipY = function() {
      var value = this.getPropertyValue("tooltipY");
      if (isNumber(value)) {
        return value;
      }
      var p = 0.5;
      if (value instanceof Percent) {
        p = value.value;
      }
      var innerRadius = relativeToValue(this.innerRadius, this.radius);
      return this.iy * (innerRadius + (this.radius - innerRadius) * p) + this.slice.dy;
    };
    return Slice2;
  }(Container)
);
registry.registeredClasses["Slice"] = Slice;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Preloader.js
var Preloader = (
  /** @class */
  function(_super) {
    __extends(Preloader2, _super);
    function Preloader2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.className = "Preloader";
      _this.width = percent(100);
      _this.height = percent(100);
      var interfaceColors = new InterfaceColorSet();
      var sliceContainer = _this.createChild(Container);
      sliceContainer.shouldClone = false;
      var backgroundSlice = sliceContainer.createChild(Slice);
      backgroundSlice.shouldClone = false;
      backgroundSlice.radius = 53;
      backgroundSlice.arc = 360;
      backgroundSlice.fill = interfaceColors.getFor("fill");
      backgroundSlice.fillOpacity = 0.8;
      backgroundSlice.innerRadius = 42;
      backgroundSlice.isMeasured = false;
      _this.backgroundSlice = backgroundSlice;
      var progressSlice = sliceContainer.createChild(Slice);
      progressSlice.shouldClone = false;
      progressSlice.radius = 50;
      progressSlice.innerRadius = 45;
      progressSlice.fill = interfaceColors.getFor("alternativeBackground");
      progressSlice.fillOpacity = 0.2;
      progressSlice.isMeasured = false;
      _this.progressSlice = progressSlice;
      var label = sliceContainer.createChild(Label);
      label.shouldClone = false;
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.isMeasured = false;
      label.fill = interfaceColors.getFor("text");
      label.align = "center";
      label.valign = "middle";
      label.textAlign = "middle";
      label.fillOpacity = 0.4;
      _this.label = label;
      _this.background.opacity = 1;
      _this.background.fill = interfaceColors.getFor("background");
      _this.contentAlign = "center";
      _this.contentValign = "middle";
      _this.delay = 300;
      var hiddenState = _this.states.create("hidden");
      hiddenState.properties.opacity = 0;
      _this.visible = false;
      _this.hide(0);
      _this.__disabled = true;
      _this._disposers.push(_this.backgroundSlice);
      _this._disposers.push(_this.progressSlice);
      _this._disposers.push(_this.label);
      _this._disposers.push(sliceContainer);
      return _this;
    }
    Object.defineProperty(Preloader2.prototype, "progress", {
      /**
       * @return Progress (0-1)
       */
      get: function() {
        return this.getPropertyValue("progress");
      },
      /**
       * Current preload progress. (0-1)
       *
       * * 0 - 0%
       * * 0.5 - 50%
       * * 1 - 100%
       *
       * Setting this to a value less than 1, will automatically reveal the
       * preloader, while setting it to 1 (100%) will hide it.
       *
       * @param value Progress (0-1)
       */
      set: function(value) {
        var _this = this;
        this.__disabled = false;
        this.validateLayout();
        this.setPropertyValue("progress", value);
        this.progressSlice.arc = 360 * value;
        if (this.label) {
          this.label.text = Math.round(value * 100) + "%";
        }
        if (value >= 1) {
          if (this._started) {
            this._started = void 0;
          }
          registry.events.once("enterframe", function() {
            var animation = _this.hide();
            if (animation && !animation.isFinished()) {
              animation.events.once("animationended", function() {
                _this.__disabled = true;
              });
            } else {
              _this.__disabled = true;
            }
          });
          this.interactionsEnabled = false;
          this.setPropertyValue("progress", 0);
        } else if (value > 0) {
          if (this.delay) {
            if (!this._started) {
              this._started = (/* @__PURE__ */ new Date()).getTime();
            } else if (this._started + this.delay <= (/* @__PURE__ */ new Date()).getTime()) {
              this.__disabled = false;
              this.show();
              this.interactionsEnabled = true;
            }
          } else {
            this.__disabled = false;
            this.show();
            this.interactionsEnabled = true;
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Preloader2.prototype, "delay", {
      /**
       * @return Delay (ms)
       */
      get: function() {
        return this.getPropertyValue("delay");
      },
      /**
       * Delay display of preloader by X milliseconds.
       *
       * When loading starts (`progress` is set to <1) and finishes (`progress` is
       * set to 1) before `delay` ms, the loader is never shown.
       *
       * This is used to avoid brief flashing of the preload for very quick loads.
       *
       * @default 1000
       * @param value  Delay (ms)
       */
      set: function(value) {
        this.setPropertyValue("delay", value);
      },
      enumerable: true,
      configurable: true
    });
    return Preloader2;
  }(Container)
);
registry.registeredClasses["Preloader"] = Preloader;

// node_modules/@amcharts/amcharts4/.internal/core/elements/CloseButton.js
var CloseButton = (
  /** @class */
  function(_super) {
    __extends(CloseButton2, _super);
    function CloseButton2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.className = "CloseButton";
      _this.padding(8, 8, 8, 8);
      _this.showSystemTooltip = true;
      _this.width = 30;
      _this.height = 30;
      var interfaceColors = new InterfaceColorSet();
      _this.cursorOverStyle = MouseCursorStyle.pointer;
      var background = _this.background;
      background.cornerRadius(20, 20, 20, 20);
      var bgc = interfaceColors.getFor("background");
      background.fill = bgc;
      background.stroke = interfaceColors.getFor("primaryButton");
      background.strokeOpacity = 1;
      background.strokeWidth = 1;
      var downColor = interfaceColors.getFor("primaryButtonActive");
      var bhs = background.states.getKey("hover");
      bhs.properties.strokeWidth = 3;
      bhs.properties.fill = bgc;
      var bds = background.states.getKey("down");
      bds.properties.stroke = downColor;
      bds.properties.fill = bgc;
      var icon = new Sprite();
      icon.element = _this.paper.add("path");
      icon.stroke = background.stroke;
      _this.icon = icon;
      _this.applyTheme();
      return _this;
    }
    CloseButton2.prototype.validate = function() {
      _super.prototype.validate.call(this);
      var w = this.pixelWidth / 3;
      var h = this.pixelHeight / 3;
      var path = moveTo({ x: -w / 2, y: -h / 2 });
      path += lineTo({ x: w / 2, y: h / 2 });
      path += moveTo({ x: w / 2, y: -h / 2 });
      path += lineTo({ x: -w / 2, y: h / 2 });
      this.icon.path = path;
      this.invalidateLayout();
    };
    CloseButton2.prototype.applyInternalDefaults = function() {
      _super.prototype.applyInternalDefaults.call(this);
      if (!hasValue(this.readerTitle)) {
        this.readerTitle = this.language.translate("Close");
      }
    };
    return CloseButton2;
  }(Button)
);
registry.registeredClasses["CloseButton"] = CloseButton;

// node_modules/@amcharts/amcharts4/.internal/core/elements/SwitchButton.js
var SwitchButton = (
  /** @class */
  function(_super) {
    __extends(SwitchButton2, _super);
    function SwitchButton2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.className = "SwitchButton";
      _this.tooltipY = 0;
      _this.layout = "horizontal";
      _this.contentAlign = "center";
      _this.contentValign = "middle";
      _this.padding(8, 16, 8, 16);
      _this.setStateOnChildren = true;
      _this.states.create("active");
      var interfaceColors = new InterfaceColorSet();
      var leftLabel = new Label();
      leftLabel.fillOpacity = 0.3;
      var llas = leftLabel.states.create("active");
      llas.properties.fillOpacity = 1;
      leftLabel.isActive = true;
      _this.leftLabel = leftLabel;
      var button = new Button();
      var circle = new Circle();
      button.contentValign = "none";
      button.padding(0, 0, 0, 0);
      circle.radius = 10;
      button.icon = circle;
      button.icon.valign = "middle";
      button.label = void 0;
      var p100 = percent(100);
      button.background.cornerRadius(p100, p100, p100, p100);
      button.width = circle.radius * 3.5;
      button.height = circle.radius * 2.1;
      button.marginLeft = 8;
      button.marginRight = 8;
      button.togglable = true;
      circle.dx = -circle.radius * 0.7;
      circle.fill = interfaceColors.getFor("primaryButton");
      var hs = circle.states.create("hover");
      hs.properties.fill = interfaceColors.getFor("primaryButtonHover");
      var as = circle.states.create("active");
      as.properties.fill = interfaceColors.getFor("primaryButtonActive");
      as.properties.dx = circle.radius * 0.7;
      _this.switchButton = button;
      _this.events.on("toggled", function() {
        _this.leftLabel.isActive = !_this.isActive;
        _this.rightLabel.isActive = _this.isActive;
      });
      var rightLabel = new Label();
      rightLabel.fillOpacity = 0.3;
      var rlas = rightLabel.states.create("active");
      rlas.properties.fillOpacity = 1;
      _this.rightLabel = rightLabel;
      _this.role = "button";
      _this.focusable = true;
      rightLabel.valign = "middle";
      leftLabel.valign = "middle";
      button.valign = "middle";
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(SwitchButton2.prototype, "leftLabel", {
      /**
       * @return Left label element
       */
      get: function() {
        return this._leftLabel;
      },
      /**
       * [[Label]] element to be used for left text.
       *
       * @param left label element
       */
      set: function(label) {
        if (this._leftLabel) {
          this.removeDispose(this._leftLabel);
        }
        this._leftLabel = label;
        if (label) {
          label.parent = this;
          label.interactionsEnabled = false;
          label.shouldClone = false;
          this._disposers.push(this._leftLabel);
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(SwitchButton2.prototype, "rightLabel", {
      /**
       * @return Rigth label element
       */
      get: function() {
        return this._rightLabel;
      },
      /**
       * [[Label]] element to be used for left text.
       *
       * @param rigth label element
       */
      set: function(label) {
        if (this._rightLabel) {
          this.removeDispose(this._rightLabel);
        }
        this._rightLabel = label;
        if (label) {
          label.parent = this;
          label.interactionsEnabled = false;
          label.shouldClone = false;
          this._disposers.push(this._rightLabel);
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(SwitchButton2.prototype, "switch", {
      /**
       * @ignore
       * @deprecated Use `switchButton` instead
       */
      get: function() {
        return this._switchButton;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(SwitchButton2.prototype, "switchButton", {
      /**
       * @return Button
       */
      get: function() {
        return this._switchButton;
      },
      /**
       * A [[Button]] element for switch.
       *
       * @param Button
       */
      set: function(button) {
        if (this._switchButton) {
          this.removeDispose(this._switchButton);
        }
        this._switchButton = button;
        if (button) {
          button.parent = this;
          button.shouldClone = false;
          this._disposers.push(this._switchButton);
        }
      },
      enumerable: true,
      configurable: true
    });
    SwitchButton2.prototype.copyFrom = function(source) {
      _super.prototype.copyFrom.call(this, source);
      if (source.leftLabel) {
        this.leftLabel.copyFrom(source.leftLabel);
      }
      if (source.rightLabel) {
        this.rightLabel.copyFrom(source.rightLabel);
      }
      if (source.switchButton) {
        this.switchButton.copyFrom(source.switchButton);
      }
    };
    return SwitchButton2;
  }(Container)
);
registry.registeredClasses["SwitchButton"] = SwitchButton;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Slider.js
var Slider = (
  /** @class */
  function(_super) {
    __extends(Slider2, _super);
    function Slider2() {
      var _this = _super.call(this) || this;
      _this.className = "Slider";
      _this.thumb.opacity = 0;
      _this.thumb.interactionsEnabled = false;
      _this.endGrip.opacity = 0;
      _this.endGrip.interactionsEnabled = false;
      _this.startGrip.events.on("drag", function() {
        _this.endGrip.x = _this.startGrip.x;
        _this.endGrip.y = _this.startGrip.y;
      });
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(Slider2.prototype, "__end", {
      /**
       * @return [description]
       */
      get: function() {
        return this._start;
      },
      set: function(value) {
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slider2.prototype, "end", {
      /**
       * @return [description]
       */
      get: function() {
        return this._start;
      },
      /**
       * Relative position (0-1) of the end grip.
       *
       * @param position  Position (0-1)
       */
      set: function(position) {
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slider2.prototype, "start", {
      /**
       * @return Position (0-1)
       */
      get: function() {
        return this._start;
      },
      /**
       * Relative position (0-1) of the start grip.
       *
       * @param position  Position (0-1)
       */
      set: function(position) {
        if (!this._isBusy) {
          this.__start = position;
        }
      },
      enumerable: true,
      configurable: true
    });
    return Slider2;
  }(Scrollbar)
);
registry.registeredClasses["Slider"] = Slider;

// node_modules/@amcharts/amcharts4/.internal/core/elements/TextLink.js
var TextLink = (
  /** @class */
  function(_super) {
    __extends(TextLink2, _super);
    function TextLink2() {
      var _this = _super.call(this) || this;
      _this.className = "TextLink";
      _this.selectable = true;
      var interfaceColors = new InterfaceColorSet();
      _this.fill = interfaceColors.getFor("primaryButton").brighten(0.3);
      var hoverState = _this.states.create("hover");
      hoverState.properties.fill = interfaceColors.getFor("primaryButtonHover").brighten(0.3);
      var downState = _this.states.create("down");
      downState.properties.fill = interfaceColors.getFor("primaryButtonDown").brighten(0.3);
      _this.cursorOverStyle = MouseCursorStyle.pointer;
      _this.applyTheme();
      return _this;
    }
    return TextLink2;
  }(Label)
);
registry.registeredClasses["TextLink"] = TextLink;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Trapezoid.js
var Trapezoid = (
  /** @class */
  function(_super) {
    __extends(Trapezoid2, _super);
    function Trapezoid2() {
      var _this = _super.call(this) || this;
      _this.className = "Trapezoid";
      _this.element = _this.paper.add("path");
      _this.topSide = percent(100);
      _this.bottomSide = percent(100);
      _this.leftSide = percent(100);
      _this.rightSide = percent(100);
      _this.isMeasured = false;
      _this.applyTheme();
      return _this;
    }
    Trapezoid2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      var w = this.pixelWidth;
      var h = this.pixelHeight;
      var ts = relativeToValue(this.topSide, w);
      var bs = relativeToValue(this.bottomSide, w);
      var ls = relativeToValue(this.leftSide, h);
      var rs = relativeToValue(this.rightSide, h);
      var x0 = (w - ts) / 2;
      var y0 = (h - ls) / 2;
      var x1 = w - (w - ts) / 2;
      var y1 = (h - rs) / 2;
      var x2 = w - (w - bs) / 2;
      var y2 = h - (h - rs) / 2;
      var x3 = (w - bs) / 2;
      var y3 = h - (h - ls) / 2;
      var mt = "";
      var mr = "";
      var mb = "";
      var ml = "";
      if (hasValue(this.horizontalNeck)) {
        var hn = this.horizontalNeck.value;
        mt = lineTo({ x: w * hn, y: Math.max(y0, y1) });
        mb = lineTo({ x: w * hn, y: Math.min(y2, y3) });
      }
      if (hasValue(this.verticalNeck)) {
        var vn = this.verticalNeck.value;
        mr = lineTo({ x: Math.min(x1, x2), y: h * vn });
        ml = lineTo({ x: Math.max(x0, x3), y: h * vn });
      }
      var path = moveTo({ x: x0, y: y0 }) + mt + lineTo({ x: x1, y: y1 }) + mr + lineTo({ x: x2, y: y2 }) + mb + lineTo({ x: x3, y: y3 }) + ml;
      this.path = path;
    };
    Object.defineProperty(Trapezoid2.prototype, "topSide", {
      /**
       * @return Width
       */
      get: function() {
        return this.getPropertyValue("topSide");
      },
      /**
       * Wdith of the top side. Absolute (px) or relative ([[Percent]]).
       *
       * @default Percent(100)
       * @param value  Width
       */
      set: function(value) {
        this.setPercentProperty("topSide", value, true, false, 10, false);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Trapezoid2.prototype, "bottomSide", {
      /**
       * @return Width
       */
      get: function() {
        return this.getPropertyValue("bottomSide");
      },
      /**
       * Wdith of the bottom side. Absolute (px) or relative ([[Percent]]).
       *
       * @default Percent(100)
       * @param value  Width
       */
      set: function(value) {
        this.setPercentProperty("bottomSide", value, true, false, 10, false);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Trapezoid2.prototype, "leftSide", {
      /**
       * @return Height
       */
      get: function() {
        return this.getPropertyValue("leftSide");
      },
      /**
       * Height of the left side. Absolute (px) or relative ([[Percent]]).
       *
       * @default Percent(100)
       * @param value  Height
       */
      set: function(value) {
        this.setPercentProperty("leftSide", value, true, false, 10, false);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Trapezoid2.prototype, "rightSide", {
      /**
       * @return Height
       */
      get: function() {
        return this.getPropertyValue("rightSide");
      },
      /**
       * Height of the right side. Absolute (px) or relative ([[Percent]]).
       *
       * @default Percent(100)
       * @param value  Height
       */
      set: function(value) {
        this.setPercentProperty("rightSide", value, true, false, 10, false);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Trapezoid2.prototype, "horizontalNeck", {
      /**
       * @return Horizontal neck position
       */
      get: function() {
        return this.getPropertyValue("horizontalNeck");
      },
      /**
       * A relative vertical position of the "neck". If the top and bottom sides
       * are of different width, and `horizontalNeck` is set, a choke point
       * will be created at that position, creating a funnel shape.
       *
       * @param value  Horizontal neck position
       */
      set: function(value) {
        this.setPropertyValue("horizontalNeck", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Trapezoid2.prototype, "verticalNeck", {
      /**
       * @return Vertical neck position
       */
      get: function() {
        return this.getPropertyValue("verticalNeck");
      },
      /**
       * A relative horizontal position of the "neck". If the left and right sides
       * are of different height, and `verticalNeck` is set, a choke point
       * will be created at that position, creating a funnel shape.
       *
       * @param value  Vertical neck position
       */
      set: function(value) {
        this.setPropertyValue("verticalNeck", value, true);
      },
      enumerable: true,
      configurable: true
    });
    return Trapezoid2;
  }(Sprite)
);
registry.registeredClasses["Trapezoid"] = Trapezoid;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Triangle.js
var Triangle = (
  /** @class */
  function(_super) {
    __extends(Triangle2, _super);
    function Triangle2() {
      var _this = _super.call(this) || this;
      _this.className = "Triangle";
      _this.element = _this.paper.add("path");
      _this.direction = "top";
      _this.applyTheme();
      return _this;
    }
    Triangle2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      var w = this.pixelWidth;
      var h = this.pixelHeight;
      var path;
      switch (this.direction) {
        case "right":
          path = moveTo({ x: 0, y: 0 }) + lineTo({ x: w, y: h / 2 }) + lineTo({ x: 0, y: h }) + closePath();
          break;
        case "left":
          path = moveTo({ x: w, y: 0 }) + lineTo({ x: 0, y: h / 2 }) + lineTo({ x: w, y: h }) + closePath();
          break;
        case "bottom":
          path = moveTo({ x: 0, y: 0 }) + lineTo({ x: w, y: 0 }) + lineTo({ x: w / 2, y: h }) + closePath();
          break;
        case "top":
          path = moveTo({ x: w / 2, y: 0 }) + lineTo({ x: w, y: h }) + lineTo({ x: 0, y: h }) + closePath();
          break;
      }
      this.path = path;
    };
    Object.defineProperty(Triangle2.prototype, "direction", {
      /**
       * Returns direction of a triangle
       *
       * @return value
       */
      get: function() {
        return this.getPropertyValue("direction");
      },
      /**
       * Sets direction of a triangle
       *
       * @param value
       */
      set: function(value) {
        this.setPropertyValue("direction", value, true);
      },
      enumerable: true,
      configurable: true
    });
    return Triangle2;
  }(Sprite)
);
registry.registeredClasses["Triangle"] = Triangle;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/Smoothing.js
var Tension = (
  /** @class */
  function() {
    function Tension2(tensionX, tensionY) {
      this._tensionX = tensionX;
      this._tensionY = tensionY;
    }
    Tension2.prototype.smooth = function(points) {
      for (var i = points.length - 1; i > 0; i--) {
        var p0 = points[i];
        var p1 = points[i - 1];
        if (Math.abs(p0.x - p1.x) < 0.1 && Math.abs(p0.y - p1.y) < 0.1) {
          points.splice(i - 1, 1);
        }
      }
      var tensionX = this._tensionX;
      var tensionY = this._tensionY;
      if (points.length < 3 || tensionX >= 1 && tensionY >= 1) {
        return polyline(points);
      }
      var first = points[0];
      var last = points[points.length - 1];
      var closed = false;
      if (round(first.x, 3) == round(last.x) && round(first.y) == round(last.y)) {
        closed = true;
      }
      var path = "";
      for (var i = 0, len = points.length - 1; i < len; i++) {
        var p0 = points[i - 1];
        var p1 = points[i];
        var p2 = points[i + 1];
        var p3 = points[i + 2];
        if (i === 0) {
          if (closed) {
            p0 = points[points.length - 2];
          } else {
            p0 = points[i];
          }
        } else if (i == points.length - 2) {
          if (closed) {
            p3 = points[1];
          } else {
            p3 = points[i + 1];
          }
        }
        var controlPointA = getCubicControlPointA(p0, p1, p2, p3, tensionX, tensionY);
        var controlPointB = getCubicControlPointB(p0, p1, p2, p3, tensionX, tensionY);
        path += cubicCurveTo(p2, controlPointA, controlPointB);
      }
      return path;
    };
    return Tension2;
  }()
);
function wavedLine(point1, point2, waveLength, waveHeight, tension, adjustWaveLength) {
  var x1 = point1.x;
  var y1 = point1.y;
  var x2 = point2.x;
  var y2 = point2.y;
  var distance = getDistance(point1, point2);
  if (adjustWaveLength) {
    waveLength = distance / Math.round(distance / waveLength);
  }
  var d = registry.getCache(stringify(["wavedLine", point1.x, point2.x, point1.y, point2.y, waveLength, waveHeight]));
  if (!d) {
    if (distance > 0) {
      var angle = Math.atan2(y2 - y1, x2 - x1);
      var cos2 = Math.cos(angle);
      var sin2 = Math.sin(angle);
      var waveLengthX = waveLength * cos2;
      var waveLengthY = waveLength * sin2;
      if (waveLength <= 1 || waveHeight <= 1) {
        d = lineTo(point2);
      } else {
        var halfWaveCount = Math.round(2 * distance / waveLength);
        var points = [];
        var sign_1 = 1;
        if (x2 < x1) {
          sign_1 *= -1;
        }
        if (y2 < y1) {
          sign_1 *= -1;
        }
        for (var i = 0; i <= halfWaveCount; i++) {
          sign_1 *= -1;
          var x = x1 + i * waveLengthX / 2 + sign_1 * waveHeight / 2 * sin2;
          var y = y1 + i * waveLengthY / 2 - sign_1 * waveHeight / 2 * cos2;
          points.push({ x, y });
        }
        d = new Tension(tension, tension).smooth(points);
      }
    } else {
      d = "";
    }
    registry.setCache(stringify(["wavedLine", point1.x, point2.x, point1.y, point2.y, waveLength, waveHeight]), d);
  }
  return d;
}
var Monotone = (
  /** @class */
  function() {
    function Monotone2(reversed, info) {
      this._reversed = reversed;
      this._closed = info.closed;
    }
    Monotone2.prototype._curve = function(x0, x1, y0, y1, t0, t1) {
      var dx = (x1 - x0) / 3;
      if (this._reversed) {
        return cubicCurveTo({ x: y1, y: x1 }, { x: y0 + dx * t0, y: x0 + dx }, { x: y1 - dx * t1, y: x1 - dx });
      } else {
        return cubicCurveTo({ x: x1, y: y1 }, { x: x0 + dx, y: y0 + dx * t0 }, { x: x1 - dx, y: y1 - dx * t1 });
      }
    };
    Monotone2.prototype.smooth = function(points) {
      var _this = this;
      var x0 = NaN;
      var x1 = NaN;
      var y0 = NaN;
      var y1 = NaN;
      var t0 = NaN;
      var point = 0;
      var output = "";
      each(points, function(_a) {
        var x = _a.x, y = _a.y;
        if (_this._reversed) {
          var temp = x;
          x = y;
          y = temp;
        }
        var t1 = NaN;
        if (!(x === x1 && y === y1)) {
          switch (point) {
            case 0:
              point = 1;
              if (_this._reversed) {
                output += lineTo({ x: y, y: x });
              } else {
                output += lineTo({ x, y });
              }
              break;
            case 1:
              point = 2;
              break;
            case 2:
              point = 3;
              output += _this._curve(x0, x1, y0, y1, slope2(x0, x1, y0, y1, t1 = slope3(x0, x1, y0, y1, x, y)), t1);
              break;
            default:
              output += _this._curve(x0, x1, y0, y1, t0, t1 = slope3(x0, x1, y0, y1, x, y));
              break;
          }
          x0 = x1;
          x1 = x;
          y0 = y1;
          y1 = y;
          t0 = t1;
        }
      });
      switch (point) {
        case 2:
          if (this._reversed) {
            output += lineTo({ x: y1, y: x1 });
          } else {
            output += lineTo({ x: x1, y: y1 });
          }
          break;
        case 3:
          output += this._curve(x0, x1, y0, y1, t0, slope2(x0, x1, y0, y1, t0));
          break;
      }
      if (this._closed) {
        output += closePath();
      }
      return output;
    };
    return Monotone2;
  }()
);
function sign(x) {
  return x < 0 ? -1 : 1;
}
function slope2(x0, x1, y0, y1, t) {
  var h = x1 - x0;
  return h ? (3 * (y1 - y0) / h - t) / 2 : t;
}
function slope3(x0, x1, y0, y1, x2, y2) {
  var h0 = x1 - x0;
  var h1 = x2 - x1;
  var s0 = (y1 - y0) / (h0 || h1 < 0 && -0);
  var s1 = (y2 - y1) / (h1 || h0 < 0 && -0);
  var p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}
var MonotoneX = (
  /** @class */
  function(_super) {
    __extends(MonotoneX2, _super);
    function MonotoneX2(info) {
      return _super.call(this, false, info) || this;
    }
    return MonotoneX2;
  }(Monotone)
);
var MonotoneY = (
  /** @class */
  function(_super) {
    __extends(MonotoneY2, _super);
    function MonotoneY2(info) {
      return _super.call(this, true, info) || this;
    }
    return MonotoneY2;
  }(Monotone)
);
var Basis = (
  /** @class */
  function() {
    function Basis2(info) {
      this._closed = info.closed;
    }
    Basis2.prototype.smooth = function(points) {
      var _this = this;
      var x0 = NaN;
      var x1 = NaN;
      var x2 = NaN;
      var x3 = NaN;
      var x4 = NaN;
      var y0 = NaN;
      var y1 = NaN;
      var y2 = NaN;
      var y3 = NaN;
      var y4 = NaN;
      var point = 0;
      var output = "";
      var pushCurve = function(x, y) {
        output += cubicCurveTo({
          x: (x0 + 4 * x1 + x) / 6,
          y: (y0 + 4 * y1 + y) / 6
        }, {
          x: (2 * x0 + x1) / 3,
          y: (2 * y0 + y1) / 3
        }, {
          x: (x0 + 2 * x1) / 3,
          y: (y0 + 2 * y1) / 3
        });
      };
      var pushPoint = function(_a) {
        var x = _a.x, y = _a.y;
        switch (point) {
          case 0:
            point = 1;
            if (_this._closed) {
              x2 = x;
              y2 = y;
            } else {
              output += lineTo({ x, y });
            }
            break;
          case 1:
            point = 2;
            if (_this._closed) {
              x3 = x;
              y3 = y;
            }
            break;
          case 2:
            point = 3;
            if (_this._closed) {
              x4 = x;
              y4 = y;
              output += moveTo({ x: (x0 + 4 * x1 + x) / 6, y: (y0 + 4 * y1 + y) / 6 });
              break;
            } else {
              output += lineTo({ x: (5 * x0 + x1) / 6, y: (5 * y0 + y1) / 6 });
            }
          default:
            pushCurve(x, y);
            break;
        }
        x0 = x1;
        x1 = x;
        y0 = y1;
        y1 = y;
      };
      each(points, pushPoint);
      if (this._closed) {
        switch (point) {
          case 1:
            output += moveTo({ x: x2, y: y2 });
            output += closePath();
            break;
          case 2:
            output += moveTo({ x: (x2 + 2 * x3) / 3, y: (y2 + 2 * y3) / 3 });
            output += lineTo({ x: (x3 + 2 * x2) / 3, y: (y3 + 2 * y2) / 3 });
            output += closePath();
            break;
          case 3:
            pushPoint({ x: x2, y: y2 });
            pushPoint({ x: x3, y: y3 });
            pushPoint({ x: x4, y: y4 });
            break;
        }
      } else {
        switch (point) {
          case 3:
            pushCurve(x1, y1);
          case 2:
            output += lineTo({ x: x1, y: y1 });
            break;
        }
        output += closePath();
      }
      return output;
    };
    return Basis2;
  }()
);

// node_modules/@amcharts/amcharts4/.internal/core/elements/WavedCircle.js
var WavedCircle = (
  /** @class */
  function(_super) {
    __extends(WavedCircle2, _super);
    function WavedCircle2() {
      var _this = _super.call(this) || this;
      _this.className = "WavedCircle";
      _this.element = _this.paper.add("path");
      _this.waveLength = 16;
      _this.waveHeight = 4;
      _this.fill = void 0;
      _this.fillOpacity = 0;
      _this.tension = 0.8;
      _this.applyTheme();
      return _this;
    }
    WavedCircle2.prototype.draw = function() {
      var path = "";
      var radius = this.pixelRadius;
      if (radius > 0) {
        var points = this.getPoints(radius);
        path = moveTo(points[0]) + new Tension(this.tension, this.tension).smooth(points);
      }
      var innerRadius = this.pixelInnerRadius;
      if (innerRadius > 0) {
        var points = this.getPoints(innerRadius);
        points.reverse();
        path += moveTo(points[0]) + new Tension(this.tension, this.tension).smooth(points);
      }
      this.path = path;
    };
    WavedCircle2.prototype.getPoints = function(radius) {
      var circleLength = radius * Math.PI * 2;
      var halfWaveHeight = this.waveHeight / 2;
      var waveLength = circleLength / Math.round(circleLength / this.waveLength);
      var halfWaveLength = waveLength / 2;
      var points = [];
      var count = circleLength / waveLength;
      for (var i = 0; i <= count; i++) {
        var angle1 = i * waveLength / circleLength * 360;
        var angle2 = (i * waveLength + halfWaveLength) / circleLength * 360;
        points.push({ x: (radius - halfWaveHeight) * cos(angle1), y: (radius - halfWaveHeight) * sin(angle1) });
        points.push({ x: (radius + halfWaveHeight) * cos(angle2), y: (radius + halfWaveHeight) * sin(angle2) });
      }
      points.pop();
      return points;
    };
    Object.defineProperty(WavedCircle2.prototype, "innerRadius", {
      /**
       * @return Inner radius
       */
      get: function() {
        return this.getPropertyValue("innerRadius");
      },
      /**
       * Inner radius of the circle in pixels (absolute) or [[Percent]] (relative).
       *
       * @param value  Inner radius
       */
      set: function(value) {
        this.setPercentProperty("innerRadius", value, true, false, 10, false);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedCircle2.prototype, "pixelInnerRadius", {
      /**
       * Calculated inner radius of the circle in pixels.
       *
       * @readonly
       * @return Inner radius (px)
       */
      get: function() {
        return relativeToValue(this.innerRadius, min(this.innerWidth / 2, this.innerHeight / 2));
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedCircle2.prototype, "waveLength", {
      /**
       * @return Wave length (px)
       */
      get: function() {
        return this.getPropertyValue("waveLength");
      },
      /**
       * Wave length in pixels.
       *
       * @default 16
       * @param value  Wave length (px)
       */
      set: function(value) {
        this.setPropertyValue("waveLength", value);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedCircle2.prototype, "waveHeight", {
      /**
       * @return Wave height (px)
       */
      get: function() {
        return this.getPropertyValue("waveHeight");
      },
      /**
       * Wave height in pixels.
       *
       * @default 4
       * @param value  Wave height (px)
       */
      set: function(value) {
        this.setPropertyValue("waveHeight", value);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedCircle2.prototype, "tension", {
      /**
       * @return Tension
       */
      get: function() {
        return this.getPropertyValue("tension");
      },
      /**
       * Tension of the wave.
       *
       * @default 0.8
       * @param value  Tension
       */
      set: function(value) {
        this.setPropertyValue("tension", value);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    return WavedCircle2;
  }(Circle)
);
registry.registeredClasses["WavedCircle"] = WavedCircle;

// node_modules/@amcharts/amcharts4/.internal/core/elements/WavedLine.js
var WavedLine = (
  /** @class */
  function(_super) {
    __extends(WavedLine2, _super);
    function WavedLine2() {
      var _this = _super.call(this) || this;
      _this.className = "WavedLine";
      _this.element = _this.paper.add("path");
      _this.waveLength = 16;
      _this.waveHeight = 4;
      _this.tension = 0.8;
      _this.pixelPerfect = false;
      _this.fill = color();
      _this.applyTheme();
      return _this;
    }
    WavedLine2.prototype.draw = function() {
      var p1 = { x: this.x1, y: this.y1 };
      var p2 = { x: this.x2, y: this.y2 };
      this.path = moveTo(p1) + wavedLine(p1, p2, this.waveLength, this.waveHeight, this.tension, true);
    };
    Object.defineProperty(WavedLine2.prototype, "waveLength", {
      /**
       * @return Wave length (px)
       */
      get: function() {
        return this.getPropertyValue("waveLength");
      },
      /**
       * Wave length in pixels.
       *
       * @default 16
       * @param value  Wave length (px)
       */
      set: function(value) {
        this.setPropertyValue("waveLength", value);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedLine2.prototype, "waveHeight", {
      /**
       * @return Wave height (px)
       */
      get: function() {
        return this.getPropertyValue("waveHeight");
      },
      /**
       * Wave height in pixels.
       *
       * @default 4
       * @param value  Wave height (px)
       */
      set: function(value) {
        this.setPropertyValue("waveHeight", value);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedLine2.prototype, "tension", {
      /**
       * @return Tension
       */
      get: function() {
        return this.getPropertyValue("tension");
      },
      /**
       * Tension of the wave.
       *
       * @default 0.8
       * @param value  Tension
       */
      set: function(value) {
        this.setPropertyValue("tension", value);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    return WavedLine2;
  }(Line)
);

// node_modules/@amcharts/amcharts4/.internal/core/elements/WavedRectangle.js
var WavedRectangle = (
  /** @class */
  function(_super) {
    __extends(WavedRectangle2, _super);
    function WavedRectangle2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.className = "WavedRectangle";
      _this.element = _this.paper.add("path");
      _this.waveLength = 16;
      _this.waveHeight = 4;
      _this.tension = 0.8;
      _this.setPropertyValue("wavedLeft", true);
      _this.setPropertyValue("wavedRight", true);
      _this.setPropertyValue("wavedTop", true);
      _this.setPropertyValue("wavedBottom", true);
      _this.applyTheme();
      return _this;
    }
    WavedRectangle2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      var w = this.pixelWidth;
      var h = this.pixelHeight;
      if (w > 0 && h > 0) {
        var p1 = { x: 0, y: 0 };
        var p2 = { x: w, y: 0 };
        var p3 = { x: w, y: h };
        var p4 = { x: 0, y: h };
        var waveLengthH = Math.min(w, this.waveLength);
        var waveHeightH = Math.min(h, this.waveHeight);
        var waveLengthV = Math.min(h, this.waveLength);
        var waveHeightV = Math.min(w, this.waveHeight);
        var td = "";
        var rd = "";
        var bd = "";
        var ld = "";
        if (this.wavedTop) {
          td = wavedLine(p1, p2, waveLengthH, waveHeightH, this.tension, true);
        }
        if (this.wavedRight) {
          rd = wavedLine(p2, p3, waveLengthV, waveHeightV, this.tension, true);
        }
        if (this.wavedBottom) {
          bd = wavedLine(p3, p4, waveLengthH, waveHeightH, this.tension, true);
        }
        if (this.wavedLeft) {
          ld = wavedLine(p4, p1, waveLengthV, waveHeightV, this.tension, true);
        }
        this.path = moveTo(p1) + td + lineTo(p2) + rd + lineTo(p3) + bd + lineTo(p4) + ld + "z";
      }
    };
    Object.defineProperty(WavedRectangle2.prototype, "waveLength", {
      /**
       * @return Wave length (px)
       */
      get: function() {
        return this.getPropertyValue("waveLength");
      },
      /**
       * Wave length in pixels.
       *
       * @default 16
       * @param value  Wave length (px)
       */
      set: function(value) {
        this.setPropertyValue("waveLength", value);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedRectangle2.prototype, "waveHeight", {
      /**
       * @return Wave height (px)
       */
      get: function() {
        return this.getPropertyValue("waveHeight");
      },
      /**
       * Wave height in pixels.
       *
       * @default 4
       * @param value  Wave height (px)
       */
      set: function(value) {
        this.setPropertyValue("waveHeight", value);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    WavedRectangle2.prototype.setWavedSides = function(top, right, bottom, left) {
      this.wavedTop = top;
      this.wavedRight = right;
      this.wavedBottom = bottom;
      this.wavedLeft = left;
    };
    Object.defineProperty(WavedRectangle2.prototype, "tension", {
      /**
       * @return Tension
       */
      get: function() {
        return this.getPropertyValue("tension");
      },
      /**
       * Tension of the wave.
       *
       * @default 0.8
       * @param value  Tension
       */
      set: function(value) {
        this.setPropertyValue("tension", value);
        this.invalidate();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedRectangle2.prototype, "wavedRight", {
      /**
       * @return Wave right side?
       */
      get: function() {
        return this.getPropertyValue("wavedRight");
      },
      /**
       * Specifies if right side should be waved.
       *
       * @default true
       * @param value Waved?
       */
      set: function(value) {
        this.setPropertyValue("wavedRight", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedRectangle2.prototype, "wavedLeft", {
      /**
       * @return Wave left side?
       */
      get: function() {
        return this.getPropertyValue("wavedLeft");
      },
      /**
       * Specifies if left side should be waved.
       *
       * @default true
       * @param value Waved?
       */
      set: function(value) {
        this.setPropertyValue("wavedLeft", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedRectangle2.prototype, "wavedTop", {
      /**
       * @return Wave top side?
       */
      get: function() {
        return this.getPropertyValue("wavedTop");
      },
      /**
       * Specifies if top side should be waved.
       *
       * @default true
       * @param value Waved?
       */
      set: function(value) {
        this.setPropertyValue("wavedTop", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WavedRectangle2.prototype, "wavedBottom", {
      /**
       * @return Wave bottom side?
       */
      get: function() {
        return this.getPropertyValue("wavedBottom");
      },
      /**
       * Specifies if bottom side should be waved.
       *
       * @default true
       * @param value Waved?
       */
      set: function(value) {
        this.setPropertyValue("wavedBottom", value, true);
      },
      enumerable: true,
      configurable: true
    });
    return WavedRectangle2;
  }(Rectangle)
);

// node_modules/@amcharts/amcharts4/.internal/core/elements/PlayButton.js
var PlayButton = (
  /** @class */
  function(_super) {
    __extends(PlayButton2, _super);
    function PlayButton2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.className = "PlayButton";
      _this.padding(12, 12, 12, 12);
      _this.showSystemTooltip = true;
      var interfaceColors = new InterfaceColorSet();
      var background = _this.background;
      background.cornerRadius(25, 25, 25, 25);
      background.fill = interfaceColors.getFor("primaryButton");
      background.stroke = interfaceColors.getFor("primaryButtonStroke");
      background.strokeOpacity = 0;
      background.states.getKey("hover").properties.fill = interfaceColors.getFor("primaryButtonHover");
      background.states.getKey("down").properties.fill = interfaceColors.getFor("primaryButtonActive");
      var playIcon = new Triangle();
      playIcon.direction = "right";
      playIcon.width = 9;
      playIcon.height = 11;
      playIcon.marginLeft = 1;
      playIcon.marginRight = 1;
      playIcon.horizontalCenter = "middle";
      playIcon.verticalCenter = "middle";
      playIcon.stroke = interfaceColors.getFor("primaryButtonText");
      playIcon.fill = playIcon.stroke;
      _this.icon = playIcon;
      var stopIcon = new RoundedRectangle();
      stopIcon.width = 11;
      stopIcon.height = 11;
      stopIcon.horizontalCenter = "middle";
      stopIcon.verticalCenter = "middle";
      stopIcon.cornerRadius(0, 0, 0, 0);
      stopIcon.stroke = interfaceColors.getFor("primaryButtonText");
      stopIcon.fill = playIcon.stroke;
      _this.togglable = true;
      var activeState = _this.states.create("active");
      activeState.transitionDuration = 0;
      activeState.properties.icon = stopIcon;
      _this.defaultState.transitionDuration = 0;
      _this.applyTheme();
      return _this;
    }
    PlayButton2.prototype.applyInternalDefaults = function() {
      _super.prototype.applyInternalDefaults.call(this);
      if (!hasValue(this.readerTitle)) {
        this.readerTitle = this.language.translate("Play");
      }
    };
    return PlayButton2;
  }(Button)
);
registry.registeredClasses["PlayButton"] = PlayButton;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/fills/ColorModifier.js
var ColorModifier = (
  /** @class */
  function(_super) {
    __extends(ColorModifier2, _super);
    function ColorModifier2() {
      var _this = _super.call(this) || this;
      _this.className = "ColorModifier";
      _this.applyTheme();
      return _this;
    }
    ColorModifier2.prototype.modify = function(value) {
      return value;
    };
    return ColorModifier2;
  }(BaseObject)
);
registry.registeredClasses["ColorModifier"] = ColorModifier;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/fills/GradientModifier.js
var GradientModifier = (
  /** @class */
  function(_super) {
    __extends(GradientModifier2, _super);
    function GradientModifier2() {
      var _this = _super.call(this) || this;
      _this.lightnesses = [];
      _this.brightnesses = [];
      _this.opacities = [];
      _this.offsets = [];
      _this.className = "GradientModifier";
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(GradientModifier2.prototype, "lightnesses", {
      /**
       * @return Lightness values
       */
      get: function() {
        return this._lightnesses;
      },
      /**
       * An array of lightness values for each step.
       *
       * @param value  Lightness values
       */
      set: function(value) {
        this._lightnesses = value;
        this._brightnesses = [];
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(GradientModifier2.prototype, "brightnesses", {
      /**
       * @return Brightness values
       */
      get: function() {
        return this._brightnesses;
      },
      /**
       * An array of brightness values for each step.
       *
       * @param value  Brightness values
       */
      set: function(value) {
        this._brightnesses = value;
        this._lightnesses = [];
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(GradientModifier2.prototype, "opacities", {
      /**
       * @return Opacity values
       */
      get: function() {
        return this._opacities;
      },
      /**
       * An array of opacity values for each step.
       *
       * @param value  Opacity values
       */
      set: function(value) {
        this._opacities = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(GradientModifier2.prototype, "offsets", {
      /**
       * @return Offsets
       */
      get: function() {
        return this._offsets;
      },
      /**
       * An array of relative position (0-1) for each step.
       *
       * If not set, all steps will be of equal relative length.
       *
       * @param value  Offsets
       */
      set: function(value) {
        this._offsets = value;
      },
      enumerable: true,
      configurable: true
    });
    GradientModifier2.prototype.modify = function(value) {
      this.gradient.clear();
      var count = 0;
      if (this.opacities) {
        count = max(count, this.opacities.length);
      }
      if (this.lightnesses) {
        count = max(count, this.lightnesses.length);
      }
      if (this.brightnesses) {
        count = max(count, this.brightnesses.length);
      }
      var opacity = 1, lightness, brightness;
      for (var i = 0; i < count; i++) {
        var color2 = value;
        if (this.opacities && isNumber(this.opacities[i])) {
          opacity = this.opacities[i];
        }
        if (this.lightnesses && isNumber(this.lightnesses[i])) {
          lightness = this.lightnesses[i];
          brightness = void 0;
        }
        if (this.brightnesses && isNumber(this.brightnesses[i])) {
          brightness = this.brightnesses[i];
          lightness = void 0;
        }
        if (isNumber(brightness)) {
          color2 = value.brighten(this.brightnesses[i]);
        } else if (isNumber(lightness)) {
          color2 = value.lighten(this.lightnesses[i]);
        }
        var offset = this.offsets[i];
        this.gradient.addColor(color2, opacity, offset);
      }
      return this.gradient;
    };
    GradientModifier2.prototype.copyFrom = function(source) {
      _super.prototype.copyFrom.call(this, source);
      this._offsets = source.offsets;
      this._brightnesses = source.brightnesses;
      this._lightnesses = source.lightnesses;
      this._opacities = source.opacities;
    };
    return GradientModifier2;
  }(ColorModifier)
);
registry.registeredClasses["GradientModifier"] = GradientModifier;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/fills/LinearGradientModifier.js
var LinearGradientModifier = (
  /** @class */
  function(_super) {
    __extends(LinearGradientModifier2, _super);
    function LinearGradientModifier2() {
      var _this = _super.call(this) || this;
      _this.className = "LinearGradientModifier";
      _this.gradient = new LinearGradient();
      _this.applyTheme();
      return _this;
    }
    LinearGradientModifier2.prototype.copyFrom = function(source) {
      _super.prototype.copyFrom.call(this, source);
      this.gradient = source.gradient.clone();
    };
    return LinearGradientModifier2;
  }(GradientModifier)
);
registry.registeredClasses["LinearGradientModifier"] = LinearGradientModifier;

// node_modules/@amcharts/amcharts4/.internal/core/elements/3d/Cone.js
var Cone = (
  /** @class */
  function(_super) {
    __extends(Cone2, _super);
    function Cone2() {
      var _this = _super.call(this) || this;
      _this.className = "Cone";
      _this.angle = 30;
      _this.radius = percent(100);
      _this.topRadius = percent(100);
      _this.top = _this.createChild(Ellipse);
      _this.top.shouldClone = false;
      _this.bottom = _this.createChild(Ellipse);
      _this.bottom.shouldClone = false;
      _this.body = _this.createChild(Sprite);
      _this.body.shouldClone = false;
      _this.body.setElement(_this.paper.add("path"));
      _this.layout = "none";
      _this.bodyFillModifier = new LinearGradientModifier();
      _this.bodyFillModifier.lightnesses = [0, -0.25, 0];
      _this.body.fillModifier = _this.bodyFillModifier;
      _this.applyTheme();
      return _this;
    }
    Cone2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      copyProperties(this, this.top, visualProperties);
      copyProperties(this, this.bottom, visualProperties);
      copyProperties(this, this.body, visualProperties);
      var w = this.innerWidth;
      var h = this.innerHeight;
      var bottom = this.bottom;
      var top = this.top;
      var angle = this.angle;
      var radiusBase;
      var dx;
      var dy;
      if (this.orientation == "horizontal") {
        radiusBase = h / 2;
        bottom.y = h / 2;
        bottom.x = 0;
        top.y = h / 2;
        top.x = w;
        dx = (90 - angle) / 90;
        dy = 0;
        this.bodyFillModifier.gradient.rotation = 90;
      } else {
        dx = 0;
        dy = (90 - angle) / 90;
        radiusBase = w / 2;
        bottom.y = h;
        bottom.x = w / 2;
        top.x = w / 2;
        this.bodyFillModifier.gradient.rotation = 0;
      }
      var radius = this.radius.value * radiusBase;
      var topRadius = this.topRadius.value * radiusBase;
      bottom.radius = radius - radius * dx;
      bottom.radiusY = radius - radius * dy;
      top.radius = topRadius - topRadius * dx;
      top.radiusY = topRadius - topRadius * dy;
      var path;
      if (this.orientation == "horizontal") {
        path = moveTo({ x: 0, y: h / 2 - bottom.radiusY }) + arcTo(-90, -180, bottom.radius, bottom.radiusY) + lineTo({ x: w, y: h / 2 + top.radiusY }) + arcTo(90, 180, top.radius, top.radiusY) + closePath();
      } else {
        path = moveTo({ x: w / 2 - top.radius, y: 0 }) + arcTo(180, -180, top.radius, top.radiusY) + lineTo({ x: w / 2 + bottom.radius, y: h }) + arcTo(0, 180, bottom.radius, bottom.radiusY) + closePath();
      }
      this.body.path = path;
    };
    Object.defineProperty(Cone2.prototype, "angle", {
      /**
       * @return Angle
       */
      get: function() {
        return this.getPropertyValue("angle");
      },
      /**
       * Angle of the point of view to the 3D element. (0-360)
       *
       * @default 30
       * @param value  Angle
       */
      set: function(value) {
        this.setPropertyValue("angle", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Cone2.prototype, "radius", {
      /**
       * @return Bottom radius
       */
      get: function() {
        return this.getPropertyValue("radius");
      },
      /**
       * A relative radius of the cone's bottom (base).
       *
       * It is relevant to the inner width or height of the element.
       *
       * @default Percent(100)
       * @param value  Bottom radius
       */
      set: function(value) {
        this.setPropertyValue("radius", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Cone2.prototype, "topRadius", {
      /**
       * @return Top radius
       */
      get: function() {
        return this.getPropertyValue("topRadius");
      },
      /**
       * A relative radius of the cone's top (tip).
       *
       * It is relevant to the inner width or height of the element.
       *
       * @default Percent(0)
       * @param value  Top radius
       */
      set: function(value) {
        this.setPropertyValue("topRadius", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Cone2.prototype, "orientation", {
      /**
       * Orientation
       */
      get: function() {
        return this.getPropertyValue("orientation");
      },
      /**
       * Orientation of the cone
       *
       * @default "vertical"
       * @param value  Orientation
       */
      set: function(value) {
        this.setPropertyValue("orientation", value, true);
      },
      enumerable: true,
      configurable: true
    });
    return Cone2;
  }(Container)
);

// node_modules/@amcharts/amcharts4/.internal/core/rendering/filters/LightenFilter.js
var LightenFilter = (
  /** @class */
  function(_super) {
    __extends(LightenFilter2, _super);
    function LightenFilter2() {
      var _this = _super.call(this) || this;
      _this.className = "LightenFilter";
      _this.feColorMatrix = _this.paper.add("feColorMatrix");
      _this.feColorMatrix.attr({ "type": "matrix" });
      _this.filterPrimitives.push(_this.feColorMatrix);
      _this.lightness = 0;
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(LightenFilter2.prototype, "lightness", {
      /**
       * @return Lightness
       */
      get: function() {
        return this.properties["lightness"];
      },
      /**
       * Lightness of the target colors.
       *
       * If `lightness` is a positive number, the filter will make all colors
       * lighter.
       *
       * If `lightness` is negative, colors will be darkened.
       *
       * @param value  Lightness
       */
      set: function(value) {
        this.properties["lightness"] = value;
        var v = value + 1;
        this.feColorMatrix.attr({ "values": v + " 0 0 0 0 0 " + v + " 0 0 0 0 0 " + v + " 0 0 0 0 0 1 0" });
      },
      enumerable: true,
      configurable: true
    });
    return LightenFilter2;
  }(Filter)
);
registry.registeredClasses["LightenFilter"] = LightenFilter;

// node_modules/@amcharts/amcharts4/.internal/core/elements/3d/Rectangle3D.js
var Rectangle3D = (
  /** @class */
  function(_super) {
    __extends(Rectangle3D2, _super);
    function Rectangle3D2() {
      var _this = _super.call(this) || this;
      _this.angle = 30;
      _this.depth = 30;
      _this.className = "Rectangle3D";
      _this.layout = "none";
      var sideBack = _this.createChild(Sprite);
      sideBack.shouldClone = false;
      sideBack.setElement(_this.paper.add("path"));
      sideBack.isMeasured = false;
      _this.sideBack = sideBack;
      _this._disposers.push(_this.sideBack);
      var sideBottom = _this.createChild(Sprite);
      sideBottom.shouldClone = false;
      sideBottom.setElement(_this.paper.add("path"));
      sideBottom.isMeasured = false;
      _this.sideBottom = sideBottom;
      _this._disposers.push(_this.sideBottom);
      var sideLeft = _this.createChild(Sprite);
      sideLeft.shouldClone = false;
      sideLeft.setElement(_this.paper.add("path"));
      sideLeft.isMeasured = false;
      _this.sideLeft = sideLeft;
      _this._disposers.push(_this.sideLeft);
      var sideRight = _this.createChild(Sprite);
      sideRight.shouldClone = false;
      sideRight.setElement(_this.paper.add("path"));
      sideRight.isMeasured = false;
      _this.sideRight = sideRight;
      _this._disposers.push(_this.sideRight);
      var sideTop = _this.createChild(Sprite);
      sideTop.shouldClone = false;
      sideTop.setElement(_this.paper.add("path"));
      sideTop.isMeasured = false;
      _this.sideTop = sideTop;
      _this._disposers.push(_this.sideTop);
      var sideFront = _this.createChild(Sprite);
      sideFront.shouldClone = false;
      sideFront.setElement(_this.paper.add("path"));
      sideFront.isMeasured = false;
      _this.sideFront = sideFront;
      _this._disposers.push(_this.sideFront);
      _this.applyTheme();
      return _this;
    }
    Rectangle3D2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      var w = this.innerWidth;
      var h = this.innerHeight;
      var depth = this.depth;
      var angle = this.angle;
      var sin2 = sin(angle);
      var cos2 = cos(angle);
      var a = { x: 0, y: 0 };
      var b = { x: w, y: 0 };
      var c = { x: w, y: h };
      var d = { x: 0, y: h };
      var ah = { x: depth * cos2, y: -depth * sin2 };
      var bh = { x: depth * cos2 + w, y: -depth * sin2 };
      var ch = { x: depth * cos2 + w, y: -depth * sin2 + h };
      var dh = { x: depth * cos2, y: -depth * sin2 + h };
      this.sideFront.path = moveTo(a) + lineTo(b) + lineTo(c) + lineTo(d) + closePath();
      this.sideBack.path = moveTo(ah) + lineTo(bh) + lineTo(ch) + lineTo(dh) + closePath();
      this.sideLeft.path = moveTo(a) + lineTo(ah) + lineTo(dh) + lineTo(d) + closePath();
      this.sideRight.path = moveTo(b) + lineTo(bh) + lineTo(ch) + lineTo(c) + closePath();
      this.sideBottom.path = moveTo(d) + lineTo(dh) + lineTo(ch) + lineTo(c) + closePath();
      this.sideTop.path = moveTo(a) + lineTo(ah) + lineTo(bh) + lineTo(b) + closePath();
    };
    Object.defineProperty(Rectangle3D2.prototype, "depth", {
      /**
       * @return Depth (px)
       */
      get: function() {
        return this.getPropertyValue("depth");
      },
      /**
       * Depth (Z dimension) of the 3D rectangle in pixels.
       *
       * @default 30
       * @param value  Depth (px)
       */
      set: function(value) {
        this.setPropertyValue("depth", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Rectangle3D2.prototype, "angle", {
      /**
       * @return Angle
       */
      get: function() {
        return this.getPropertyValue("angle");
      },
      /**
       * Angle of the point of view to the 3D element. (0-360)
       *
       * @default 30
       * @param value  Angle
       */
      set: function(value) {
        this.setPropertyValue("angle", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Rectangle3D2.prototype.setFill = function(value) {
      _super.prototype.setFill.call(this, value);
      if (!isObject(value) || "r" in value) {
        value = toColor(value);
      }
      var colorStr;
      if (value instanceof Color) {
        colorStr = value.hex;
      } else if (value instanceof LinearGradient || value instanceof RadialGradient) {
        colorStr = value.stops.getIndex(0).color.hex;
      } else {
        var filter = new LightenFilter();
        filter.lightness = -0.2;
        this.sideBack.filters.push(filter);
        var filter2 = filter.clone();
        filter2.lightness = -0.4;
        this.sideLeft.filters.push(filter2);
        var filter3 = filter.clone();
        filter3.lightness = -0.2;
        this.sideRight.filters.push(filter3);
        var filter4 = filter.clone();
        filter4.lightness = -0.1;
        this.sideTop.filters.push(filter4);
        var filter5 = filter.clone();
        filter5.lightness = -0.5;
        this.sideBottom.filters.push(filter5);
      }
      if (colorStr) {
        this.sideBack.fill = color(colorStr).lighten(-0.2);
        this.sideLeft.fill = color(colorStr).lighten(-0.4);
        this.sideRight.fill = color(colorStr).lighten(-0.2);
        this.sideTop.fill = color(colorStr).lighten(-0.1);
        this.sideBottom.fill = color(colorStr).lighten(-0.5);
      }
    };
    Rectangle3D2.prototype.copyFrom = function(source) {
      _super.prototype.copyFrom.call(this, source);
      this.sideBack.copyFrom(source.sideBack);
      this.sideLeft.copyFrom(source.sideLeft);
      this.sideRight.copyFrom(source.sideRight);
      this.sideTop.copyFrom(source.sideTop);
      this.sideBottom.copyFrom(source.sideBottom);
    };
    return Rectangle3D2;
  }(Container)
);

// node_modules/@amcharts/amcharts4/.internal/core/elements/3d/Slice3D.js
var Slice3D = (
  /** @class */
  function(_super) {
    __extends(Slice3D2, _super);
    function Slice3D2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.className = "Slice3D";
      _this.layout = "none";
      var edge = _this.createChild(Sprite);
      _this.edge = edge;
      edge.shouldClone = false;
      edge.isMeasured = false;
      edge.toBack();
      _this.angle = 30;
      _this.depth = 20;
      var sideA = _this.createChild(Sprite);
      _this.sideA = sideA;
      sideA.shouldClone = false;
      sideA.isMeasured = false;
      var sideB = _this.createChild(Sprite);
      _this.sideB = sideB;
      sideB.shouldClone = false;
      sideB.isMeasured = false;
      _this.applyTheme();
      return _this;
    }
    Slice3D2.prototype.setFill = function(value) {
      _super.prototype.setFill.call(this, value);
      var colorStr;
      if (value instanceof Color) {
        colorStr = value.hex;
      } else if (value instanceof LinearGradient || value instanceof RadialGradient) {
        colorStr = value.stops.getIndex(0).color.hex;
      } else {
        var filter = new LightenFilter();
        filter.lightness = -0.25;
        this.edge.filters.push(filter);
        this.sideA.filters.push(filter.clone());
        this.sideB.filters.push(filter.clone());
      }
      if (colorStr) {
        var edgeFill = color(colorStr).lighten(-0.25);
        this.edge.fill = edgeFill;
        this.sideA.fill = edgeFill;
        this.sideB.fill = edgeFill;
        this.edge.stroke = edgeFill;
        this.sideA.stroke = edgeFill;
        this.sideB.stroke = edgeFill;
      }
    };
    Slice3D2.prototype.draw = function() {
      this.cornerRadius = 0;
      this.innerCornerRadius = 0;
      _super.prototype.draw.call(this);
      if (this.arc !== 0 && this.radius > 0 && this.depth > 0) {
        this.sideB.show(0);
        this.sideA.show(0);
        this.edge.show(0);
        var startAngle = this.startAngle;
        var arc2 = this.arc;
        var innerRadius = this.pixelInnerRadius || 0;
        var radiusY = this.radiusY || 0;
        var radius = this.radius;
        var endAngle = startAngle + arc2;
        var innerRadiusY = radiusY / radius * innerRadius;
        var a0 = { x: cos(startAngle) * innerRadius, y: sin(startAngle) * innerRadiusY };
        var b0 = { x: cos(startAngle) * radius, y: sin(startAngle) * radiusY };
        var c0 = { x: cos(endAngle) * radius, y: sin(endAngle) * radiusY };
        var d0 = { x: cos(endAngle) * innerRadius, y: sin(endAngle) * innerRadiusY };
        var h = this.depth;
        var ah = { x: a0.x, y: a0.y - h };
        var bh = { x: b0.x, y: b0.y - h };
        var ch = { x: c0.x, y: c0.y - h };
        var dh = { x: d0.x, y: d0.y - h };
        var edgePath = "";
        var count = Math.ceil(arc2 / 5);
        var step = arc2 / count;
        var mangle = startAngle;
        var prevPoint = bh;
        for (var i = 0; i < count; i++) {
          mangle += step;
          if (mangle > 0 && mangle < 180) {
            edgePath += moveTo(prevPoint);
            var pp = { x: cos(mangle) * radius, y: sin(mangle) * radiusY - h };
            edgePath += lineTo({ x: prevPoint.x, y: prevPoint.y + h });
            edgePath += arcToPoint({ x: pp.x, y: pp.y + h }, radius, radiusY, true);
            edgePath += lineTo(pp);
            edgePath += arcToPoint(prevPoint, radius, radiusY);
            edgePath += "z";
            prevPoint = pp;
          } else {
            edgePath += moveTo(prevPoint);
            var pp = { x: cos(mangle) * radius, y: sin(mangle) * radiusY - h };
            edgePath += arcToPoint(pp, radius, radiusY, true);
            edgePath += lineTo({ x: pp.x, y: pp.y + h });
            edgePath += arcToPoint({ x: prevPoint.x, y: prevPoint.y + h }, radius, radiusY);
            edgePath += lineTo(prevPoint);
            edgePath += "z";
            prevPoint = pp;
          }
        }
        prevPoint = ah;
        mangle = startAngle;
        for (var i = 0; i < count; i++) {
          mangle += step;
          if (mangle > 0 && mangle < 180) {
            edgePath += moveTo(prevPoint);
            var pp = { x: cos(mangle) * innerRadius, y: sin(mangle) * innerRadiusY - h };
            edgePath += lineTo({ x: prevPoint.x, y: prevPoint.y + h });
            edgePath += arcToPoint({ x: pp.x, y: pp.y + h }, innerRadius, innerRadiusY, true);
            edgePath += lineTo(pp);
            edgePath += arcToPoint(prevPoint, innerRadius, innerRadiusY);
            edgePath += "z";
            prevPoint = pp;
          } else {
            edgePath += moveTo(prevPoint);
            var pp = { x: cos(mangle) * innerRadius, y: sin(mangle) * innerRadiusY - h };
            edgePath += arcToPoint(pp, innerRadius, innerRadiusY, true);
            edgePath += lineTo({ x: pp.x, y: pp.y + h });
            edgePath += arcToPoint({ x: prevPoint.x, y: prevPoint.y + h }, innerRadius, innerRadiusY);
            edgePath += lineTo(prevPoint);
            edgePath += "z";
            prevPoint = pp;
          }
        }
        this.edge.path = edgePath;
        this.sideA.path = moveTo(a0) + lineTo(b0) + lineTo(bh) + lineTo(ah) + closePath();
        this.sideB.path = moveTo(c0) + lineTo(d0) + lineTo(dh) + lineTo(ch) + closePath();
        if (this.startAngle < 90) {
          this.sideA.toBack();
        } else {
          this.sideA.toFront();
        }
        if (this.startAngle + this.arc > 90) {
          this.sideB.toBack();
        } else {
          this.sideB.toFront();
        }
        this.slice.dy = -h;
      } else {
        this.sideA.hide(0);
        this.sideB.hide(0);
        this.edge.hide(0);
      }
    };
    Object.defineProperty(Slice3D2.prototype, "depth", {
      /**
       * @return Depth (px)
       */
      get: function() {
        return this.getPropertyValue("depth");
      },
      /**
       * Depth (height) of the 3D slice in pixels.
       *
       * @default 20
       * @param depth  Depth (px)
       */
      set: function(depth) {
        this.setPropertyValue("depth", depth, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice3D2.prototype, "angle", {
      /**
       * @return Angle
       */
      get: function() {
        var angle = this.getPropertyValue("angle");
        if (!isNumber(angle)) {
          angle = 0;
        }
        return angle;
      },
      /**
       * Angle of the point of view to the 3D element. (0-360)
       *
       * @default 30
       * @param value  Angle
       */
      set: function(value) {
        this.setPropertyValue("angle", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Slice3D2.prototype, "radiusY", {
      /**
       * @return Vertical radius (0-1)
       */
      get: function() {
        var radiusY = this.getPropertyValue("radiusY");
        if (!isNumber(radiusY)) {
          radiusY = this.radius - this.radius * this.angle / 90;
        }
        return radiusY;
      },
      /**
       * Vertical radius for creating skewed slices.
       *
       * This is relevant to `radius`, e.g. 0.5 will set vertical radius to half
       * the `radius`.
       *
       * @param value Vertical radius (0-1)
       */
      set: function(value) {
        this.setPropertyValue("radiusY", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Slice3D2.prototype.copyFrom = function(source) {
      _super.prototype.copyFrom.call(this, source);
      this.edge.copyFrom(source.edge);
      this.sideA.copyFrom(source.sideA);
      this.sideB.copyFrom(source.sideB);
    };
    return Slice3D2;
  }(Slice)
);

// node_modules/@amcharts/amcharts4/.internal/core/rendering/fills/RadialGradientModifier.js
var RadialGradientModifier = (
  /** @class */
  function(_super) {
    __extends(RadialGradientModifier2, _super);
    function RadialGradientModifier2() {
      var _this = _super.call(this) || this;
      _this.className = "RadialGradientModifier";
      _this.gradient = new RadialGradient();
      _this.applyTheme();
      return _this;
    }
    RadialGradientModifier2.prototype.copyFrom = function(source) {
      _super.prototype.copyFrom.call(this, source);
      this.gradient = source.gradient.clone();
    };
    return RadialGradientModifier2;
  }(GradientModifier)
);
registry.registeredClasses["RadialGradientModifier"] = RadialGradientModifier;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/fills/LinePattern.js
var LinePattern = (
  /** @class */
  function(_super) {
    __extends(LinePattern2, _super);
    function LinePattern2() {
      var _this = _super.call(this) || this;
      _this.properties["gap"] = 0;
      _this._line = _this.paper.add("path");
      _this.addElement(_this._line);
      return _this;
    }
    LinePattern2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      if (Math.round(this.rotation / 90) != this.rotation / 90) {
        this.properties["shapeRendering"] = "auto";
      }
      if (this._line) {
        var w = this.width;
        var h = this.height;
        var path = "";
        if (!this.gap) {
          if (Math.round(this.rotation / 90) != this.rotation / 90) {
            path = moveTo({ x: -w, y: h / 2 }) + lineTo({ x: w * 2, y: h / 2 });
            this.properties["rotationX"] = this.width / 2;
            this.properties["rotationY"] = this.height / 2;
          } else {
            path = moveTo({ x: 0, y: 0 }) + lineTo({ x: w, y: 0 });
          }
        } else {
          var step = this.gap + this.strokeWidth;
          var count = this.height / step;
          for (var i = -count / 2; i < count * 1.5; i++) {
            if (Math.round(this.rotation / 90) != this.rotation / 90) {
              path += moveTo({ x: -w, y: (i + 0.5) * step }) + lineTo({ x: w * 2, y: (i + 0.5) * step });
              this.properties["rotationX"] = this.width / 2;
              this.properties["rotationY"] = this.height / 2;
            } else {
              path += moveTo({ x: -w, y: i * step }) + lineTo({ x: w * 2, y: i * step });
            }
          }
        }
        this._line.attr({ "d": path });
      }
    };
    Object.defineProperty(LinePattern2.prototype, "gap", {
      /**
       * @return gap
       */
      get: function() {
        return this.properties["gap"];
      },
      /**
       * Number of pixels between pattern lines.
       *
       * The pattern will automatically draw required number of lines to fill
       * pattern area maintaining `gap` distance between them.
       *
       * 0 (zero) means only single line will be drawn.
       *
       * @default 0
       * @since 4.7.7
       */
      set: function(value) {
        this.properties["gap"] = value;
        this.draw();
      },
      enumerable: true,
      configurable: true
    });
    return LinePattern2;
  }(Pattern)
);
registry.registeredClasses["LinePattern"] = LinePattern;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/fills/CirclePattern.js
var CirclePattern = (
  /** @class */
  function(_super) {
    __extends(CirclePattern2, _super);
    function CirclePattern2() {
      var _this = _super.call(this) || this;
      _this.properties["radius"] = 2;
      _this._circle = _this.paper.add("circle");
      _this.addElement(_this._circle);
      _this.shapeRendering = "auto";
      return _this;
    }
    CirclePattern2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      if (this._circle) {
        this._circle.attr({ "r": this.radius, "cx": this.width / 2, "cy": this.height / 2 });
      }
    };
    Object.defineProperty(CirclePattern2.prototype, "radius", {
      /**
       * @return Radius (px)
       */
      get: function() {
        return this.properties["radius"];
      },
      /**
       * Circle radius in pixels.
       *
       * @param value Radius (px)
       */
      set: function(value) {
        this.properties["radius"] = value;
        this.draw();
      },
      enumerable: true,
      configurable: true
    });
    return CirclePattern2;
  }(Pattern)
);
registry.registeredClasses["CirclePattern"] = CirclePattern;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/fills/RectPattern.js
var RectPattern = (
  /** @class */
  function(_super) {
    __extends(RectPattern2, _super);
    function RectPattern2() {
      var _this = _super.call(this) || this;
      _this.rectHeight = 1;
      _this.rectWidth = 1;
      _this._rect = _this.paper.add("rect");
      _this.addElement(_this._rect);
      return _this;
    }
    RectPattern2.prototype.draw = function() {
      _super.prototype.draw.call(this);
      this.properties["rotationX"] = this.width / 2;
      this.properties["rotationY"] = this.height / 2;
      if (this._rect) {
        this._rect.attr({ "width": this.rectWidth, "height": this.rectHeight, "x": (this.width - this.rectWidth) / 2, "y": (this.height - this.rectHeight) / 2 });
      }
    };
    Object.defineProperty(RectPattern2.prototype, "rectWidth", {
      /**
       * @return Width (px)
       */
      get: function() {
        return this.properties["rectWidth"];
      },
      /**
       * Rectangle width in pixels.
       *
       * @param value Width (px)
       */
      set: function(value) {
        this.properties["rectWidth"] = value;
        this.draw();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(RectPattern2.prototype, "rectHeight", {
      /**
       * @return Height (px)
       */
      get: function() {
        return this.properties["rectHeight"];
      },
      /**
       * Rectangle height in pixels.
       *
       * @param value Height (px)
       */
      set: function(value) {
        this.properties["rectHeight"] = value;
        this.draw();
      },
      enumerable: true,
      configurable: true
    });
    return RectPattern2;
  }(Pattern)
);
registry.registeredClasses["RectPattern"] = RectPattern;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/filters/ColorizeFilter.js
var ColorizeFilter = (
  /** @class */
  function(_super) {
    __extends(ColorizeFilter2, _super);
    function ColorizeFilter2() {
      var _this = _super.call(this) || this;
      _this.className = "ColorizeFilter";
      _this.feColorMatrix = _this.paper.add("feColorMatrix");
      _this.feColorMatrix.attr({ "type": "matrix" });
      _this.filterPrimitives.push(_this.feColorMatrix);
      _this.intensity = 1;
      _this.applyTheme();
      return _this;
    }
    ColorizeFilter2.prototype.applyFilter = function() {
      var i = this.intensity;
      var ii = 1 - i;
      var r;
      var g;
      var b;
      var color2 = this.color;
      if (color2 && color2.rgb) {
        r = color2.rgb.r / 255 * i;
        g = color2.rgb.g / 255 * i;
        b = color2.rgb.b / 255 * i;
      } else {
        r = 0;
        g = 0;
        b = 0;
      }
      this.feColorMatrix.attr({ "values": ii + " 0 0 0 " + r + " 0 " + ii + " 0 0 " + g + " 0 0 " + ii + " 0 " + b + " 0 0 0 1 0" });
    };
    Object.defineProperty(ColorizeFilter2.prototype, "color", {
      /**
       * @return Color
       */
      get: function() {
        return this.properties["color"];
      },
      /**
       * Target color to apply to the element.
       *
       * Depending on the `intensity`, all colors of the target element will steer
       * towards this color.
       *
       * E.g. setting to `am4core.color("greener")` will make all colors greener.
       *
       * @param value  Color
       */
      set: function(value) {
        this.properties["color"] = value;
        this.applyFilter();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ColorizeFilter2.prototype, "intensity", {
      /**
       * @return Intensity (0-1)
       */
      get: function() {
        return this.properties.intensity;
      },
      /**
       * Intensity of the color (0-1).
       *
       * The bigger the number the more of a `color` target's colors will become.
       *
       * 0 means the colors will remain as they are.
       * 1 means all colors will become the target `color`.
       *
       * @default 1
       * @param value  Intensity (0-1)
       */
      set: function(value) {
        this.properties.intensity = value;
        this.applyFilter();
      },
      enumerable: true,
      configurable: true
    });
    return ColorizeFilter2;
  }(Filter)
);
registry.registeredClasses["ColorizeFilter"] = ColorizeFilter;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/filters/DesaturateFilter.js
var DesaturateFilter = (
  /** @class */
  function(_super) {
    __extends(DesaturateFilter2, _super);
    function DesaturateFilter2() {
      var _this = _super.call(this) || this;
      _this.className = "DesaturateFilter";
      _this.feColorMatrix = _this.paper.add("feColorMatrix");
      _this.feColorMatrix.attr({ "type": "saturate" });
      _this.filterPrimitives.push(_this.feColorMatrix);
      _this.width = 120;
      _this.height = 120;
      _this.saturation = 0;
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(DesaturateFilter2.prototype, "saturation", {
      /**
       * @return Saturation (0-1)
       */
      get: function() {
        return this.properties["saturation"];
      },
      /**
       * Saturation.
       *
       * 0 - completely desaturated.
       * 1 - fully saturated (gray).
       *
       * @param value  Saturation (0-1)
       */
      set: function(value) {
        this.properties["saturation"] = value;
        this.feColorMatrix.attr({ "values": value.toString() });
      },
      enumerable: true,
      configurable: true
    });
    return DesaturateFilter2;
  }(Filter)
);
registry.registeredClasses["DesaturateFilter"] = DesaturateFilter;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/filters/BlurFilter.js
var BlurFilter = (
  /** @class */
  function(_super) {
    __extends(BlurFilter2, _super);
    function BlurFilter2() {
      var _this = _super.call(this) || this;
      _this.className = "BlurFilter";
      _this.feGaussianBlur = _this.paper.add("feGaussianBlur");
      _this.feGaussianBlur.attr({ "result": "blurOut", "in": "SourceGraphic" });
      _this.filterPrimitives.push(_this.feGaussianBlur);
      _this.width = 200;
      _this.height = 200;
      _this.blur = 1.5;
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(BlurFilter2.prototype, "blur", {
      /**
       * @return Blur
       */
      get: function() {
        return this.properties.blur;
      },
      /**
       * Blur value.
       *
       * The bigger the value, the blurrier the target element will become.
       *
       * @default 1.5
       * @param value Blur
       */
      set: function(value) {
        this.properties.blur = value;
        this.feGaussianBlur.attr({ "stdDeviation": value / this.scale });
      },
      enumerable: true,
      configurable: true
    });
    return BlurFilter2;
  }(Filter)
);
registry.registeredClasses["BlurFilter"] = BlurFilter;

// node_modules/@amcharts/amcharts4/.internal/core/rendering/filters/FocusFilter.js
var FocusFilter = (
  /** @class */
  function(_super) {
    __extends(FocusFilter2, _super);
    function FocusFilter2() {
      var _this = _super.call(this) || this;
      _this.className = "FocusFilter";
      _this.feFlood = _this.paper.add("feFlood");
      _this.feFlood.attr({ "flood-color": new InterfaceColorSet().getFor("primaryButtonHover"), "result": "base" });
      _this.filterPrimitives.push(_this.feFlood);
      _this.feMorphology = _this.paper.add("feMorphology");
      _this.feMorphology.attr({ "result": "bigger", "in": "SourceGraphic", "operator": "dilate", "radius": "2" });
      _this.filterPrimitives.push(_this.feMorphology);
      _this.feColorMatrix = _this.paper.add("feColorMatrix");
      _this.feColorMatrix.attr({ "result": "mask", "in": "bigger", "type": "matrix", "values": "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" });
      _this.filterPrimitives.push(_this.feColorMatrix);
      _this.feComposite = _this.paper.add("feComposite");
      _this.feComposite.attr({ "result": "drop", "in": "base", "in2": "mask", "operator": "in" });
      _this.filterPrimitives.push(_this.feComposite);
      _this.feBlend = _this.paper.add("feBlend");
      _this.feBlend.attr({ "in": "SourceGraphic", "in2": "drop", "mode": "normal" });
      _this.filterPrimitives.push(_this.feBlend);
      _this.width = 130;
      _this.height = 130;
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(FocusFilter2.prototype, "stroke", {
      /**
       * @return Color
       */
      get: function() {
        return this.properties["stroke"];
      },
      /**
       * Stroke (outline) color.
       *
       * @param value  Color
       */
      set: function(value) {
        this.properties["stroke"] = value;
        this.feFlood.attr({ "flood-color": value });
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FocusFilter2.prototype, "strokeWidth", {
      /**
       * @return Outline thickness (px)
       */
      get: function() {
        return this.properties["strokeWidth"];
      },
      /**
       * Stroke (outline) thickness in pixels.
       *
       * @param value  Outline thickness (px)
       */
      set: function(value) {
        this.properties["strokeWidth"] = value;
        this.feMorphology.attr({ "radius": value });
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FocusFilter2.prototype, "opacity", {
      /**
       * @return Outline opacity (0-1)
       */
      get: function() {
        return this.properties["opacity"];
      },
      /**
       * Opacity of the outline. (0-1)
       *
       * @param value  Outline opacity (0-1)
       */
      set: function(value) {
        this.properties["opacity"] = value;
        this.feColorMatrix.attr({ "values": "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " + value + " 0" });
      },
      enumerable: true,
      configurable: true
    });
    FocusFilter2.prototype.setSprite = function(value) {
      if (this._sprite && this._sprite != value) {
        this._sprite.group.removeStyle("outline");
      }
      value.group.addStyle({
        "outline": "none"
      });
      _super.prototype.setSprite.call(this, value);
    };
    return FocusFilter2;
  }(Filter)
);

// node_modules/@amcharts/amcharts4/.internal/core/utils/PatternSet.js
var PatternSet = (
  /** @class */
  function(_super) {
    __extends(PatternSet2, _super);
    function PatternSet2() {
      var _this = _super.call(this) || this;
      _this._list = [];
      _this._currentStep = 0;
      _this._startIndex = 0;
      _this._currentPass = 0;
      _this.baseColor = new Color({
        r: 103,
        g: 183,
        b: 220
      });
      _this.className = "PatternSet";
      var interfaceColors = new InterfaceColorSet();
      _this.list = [
        _this.getLinePattern(1e3, 45, 1, 6),
        _this.getRectPattern(10, 0, 4),
        _this.getLinePattern(1e3, -45, 1, 6),
        _this.getCirclePattern(11, 2, true),
        _this.getLinePattern(6, 90, 1),
        _this.getRectPattern(12, 45, 6, true),
        _this.getLinePattern(6, 0, 1),
        _this.getRectPattern(7, 0, 4),
        _this.getLinePattern(1e3, 45, 2, 3, "4,2"),
        _this.getCirclePattern(9, 3, false),
        _this.getLinePattern(1e3, -45, 2, 3, "4,2"),
        _this.getRectPattern(10, 45, Math.sqrt(50)),
        _this.getLinePattern(1e3, -45, 2, 1),
        _this.getRectPattern(10, 0, 9),
        _this.getLinePattern(1e3, 45, 2, 1),
        _this.getLinePattern(1e3, 0, 3, 1),
        _this.getRectPattern(10, 45, 10),
        _this.getLinePattern(1e3, 90, 3, 1)
      ];
      _this.baseColor = interfaceColors.getFor("stroke");
      _this.applyTheme();
      return _this;
    }
    PatternSet2.prototype.getLinePattern = function(size, rotation, thickness, gap, strokeDashArray) {
      var pattern = new LinePattern();
      pattern.width = size;
      pattern.height = size;
      pattern.stroke = this.baseColor;
      pattern.gap = gap;
      pattern.strokeDasharray = strokeDashArray;
      pattern.strokeWidth = thickness;
      pattern.rotation = rotation;
      return pattern;
    };
    PatternSet2.prototype.getRectPattern = function(size, rotation, thickness, outline) {
      var pattern = new RectPattern();
      pattern.width = size;
      pattern.height = size;
      pattern.rectWidth = thickness;
      pattern.rectHeight = thickness;
      if (outline) {
        pattern.stroke = this.baseColor;
        pattern.strokeWidth = 1;
        pattern.fillOpacity = 0;
      } else {
        pattern.fill = this.baseColor;
        pattern.strokeWidth = 0;
      }
      if (rotation != 0) {
        pattern.shapeRendering = "auto";
      }
      pattern.rotation = rotation;
      return pattern;
    };
    PatternSet2.prototype.getCirclePattern = function(size, radius, outline) {
      var pattern = new CirclePattern();
      pattern.width = size;
      pattern.height = size;
      pattern.shapeRendering = "auto";
      pattern.radius = radius;
      if (outline) {
        pattern.stroke = this.baseColor;
        pattern.strokeWidth = 1;
        pattern.fillOpacity = 0;
      } else {
        pattern.fill = this.baseColor;
        pattern.strokeWidth = 0;
      }
      return pattern;
    };
    Object.defineProperty(PatternSet2.prototype, "list", {
      /**
       * @return Pattern list
       */
      get: function() {
        return this._list;
      },
      /**
       * List of pre-defined patterns to be used in set.
       *
       * @param value Pattern list
       */
      set: function(value) {
        this._list = value;
        this.reset();
      },
      enumerable: true,
      configurable: true
    });
    PatternSet2.prototype.next = function() {
      var pattern = this.getIndex(this.currentStep);
      this._currentStep++;
      return pattern;
    };
    PatternSet2.prototype.getIndex = function(i) {
      var pattern;
      while (this.list.length <= i) {
        this.generatePatterns();
      }
      pattern = this.list[i];
      return pattern.clone();
    };
    PatternSet2.prototype.generatePatterns = function() {
      var count = this.list.length / (this._currentPass + 1);
      this._currentPass++;
      for (var i = 0; i < count; i++) {
        this.list.push(this.list[i].clone());
      }
    };
    PatternSet2.prototype.reset = function() {
      this._currentStep = this._startIndex;
    };
    Object.defineProperty(PatternSet2.prototype, "currentStep", {
      /**
       * @return Step
       */
      get: function() {
        return this._currentStep;
      },
      /**
       * Sets current color iteration. You can use this property to skip some
       * colors from iteration. E.g. setting it to `10` will skip first ten
       * colors.
       *
       * Please note that the number is zero-based.
       *
       * @param value  Step
       */
      set: function(value) {
        this._currentStep = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PatternSet2.prototype, "startIndex", {
      /**
       * @return Index
       */
      get: function() {
        return this._startIndex;
      },
      /**
       * If set to non-zero value, the ColorSet will start iterating colors from
       * that particular index, not the first color in the list.
       *
       * @default 0
       * @param  value  Index
       */
      set: function(value) {
        this._startIndex = value;
        this.reset();
      },
      enumerable: true,
      configurable: true
    });
    PatternSet2.prototype.processConfig = function(config) {
      _super.prototype.processConfig.call(this, config);
    };
    return PatternSet2;
  }(BaseObject)
);
registry.registeredClasses["PatternSet"] = PatternSet;

// node_modules/@amcharts/amcharts4/.internal/core/utils/Plugin.js
var Plugin = (
  /** @class */
  function() {
    function Plugin2() {
      this._disposed = false;
      this._disposers = [];
    }
    Plugin2.prototype.init = function() {
    };
    Plugin2.prototype.isDisposed = function() {
      return this._disposed;
    };
    Plugin2.prototype.dispose = function() {
      if (!this._disposed) {
        this._disposed = true;
        var a = this._disposers;
        this._disposers = null;
        while (a.length !== 0) {
          var disposer = a.shift();
          disposer.dispose();
        }
      }
    };
    return Plugin2;
  }()
);

// node_modules/@amcharts/amcharts4/.internal/core/elements/AmChartsLogo.js
var AmChartsLogo = (
  /** @class */
  function(_super) {
    __extends(AmChartsLogo2, _super);
    function AmChartsLogo2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.className = "AmChartsLogo";
      _this.valign = "bottom";
      var d = 0.3;
      _this.opacity = 0.3;
      _this.defaultState.properties.opacity = 0.4;
      _this.url = "https://www.amcharts.com/";
      _this.urlTarget = "_blank";
      _this.showSystemTooltip = true;
      _this.readerTitle = "Chart created using amCharts library";
      _this.width = 220 * d;
      _this.height = 70 * d;
      _this.background.opacity = 0;
      var aColor = color("#474758");
      if (new InterfaceColorSet().getFor("background").alternative.hex == "#ffffff") {
        aColor = color("#ffffff");
      }
      var aGradient = new LinearGradient();
      aGradient.addColor(aColor);
      aGradient.addColor(aColor, 1, 0.75);
      aGradient.addColor(color("#3cabff"), 1, 0.755);
      aGradient.rotation = -10;
      var aStroke = aGradient;
      var m = _this.createChild(Polyspline);
      m.shouldClone = false;
      m.isMeasured = false;
      m.segments = [[{ x: 50 * d, y: 50 * d }, { x: 90 * d, y: 50 * d }, { x: 120 * d, y: 20 * d }, { x: 135 * d, y: 35 * d }, { x: 150 * d, y: 20 * d }, { x: 180 * d, y: 50 * d }, { x: 200 * d, y: 50 * d }]];
      m.strokeWidth = 6 * d;
      m.tensionX = 0.8;
      m.tensionY = 1;
      m.stroke = color("#3cabff");
      var a = _this.createChild(Polyspline);
      a.shouldClone = false;
      a.isMeasured = false;
      a.segments = [[{ x: 20 * d, y: 50 * d }, { x: 50 * d, y: 50 * d }, { x: 90 * d, y: 12 * d }, { x: 133 * d, y: 50 * d }, { x: 170 * d, y: 50 * d }, { x: 200 * d, y: 50 * d }]];
      a.strokeWidth = 6 * d;
      a.tensionX = 0.75;
      a.tensionY = 1;
      a.stroke = aStroke;
      _this._disposers.push(a);
      var desaturateFilter = new DesaturateFilter();
      _this.filters.push(desaturateFilter);
      var desaturateFilterHover = new DesaturateFilter();
      desaturateFilterHover.saturation = 1;
      var hoverState = _this.states.create("hover");
      hoverState.properties.opacity = 1;
      hoverState.filters.push(desaturateFilterHover);
      _this.applyTheme();
      return _this;
    }
    return AmChartsLogo2;
  }(Container)
);

// node_modules/@amcharts/amcharts4/.internal/core/utils/Instance.js
function createChild(htmlElement, classType) {
  var htmlContainer = getElement(htmlElement);
  var tmpContainer = false;
  if (!htmlContainer) {
    htmlContainer = document.createElement("div");
    htmlContainer.style.width = "200px";
    htmlContainer.style.height = "200px";
    htmlContainer.style.top = "0";
    htmlContainer.style.left = "0";
    htmlContainer.style.visibility = "hidden";
    htmlContainer.style.position = "absolute";
    document.body.appendChild(htmlContainer);
    tmpContainer = true;
  }
  if (htmlContainer) {
    htmlContainer.innerHTML = "";
    var svgDiv_1 = new SVGContainer(htmlContainer);
    var paper = new Paper(svgDiv_1.SVGContainer, "svg-" + (svgContainers.length - 1));
    var container_1 = new Container();
    container_1.htmlContainer = htmlContainer;
    container_1.svgContainer = svgDiv_1;
    container_1.width = percent(100);
    container_1.height = percent(100);
    container_1.background.fillOpacity = 0;
    container_1.paper = paper;
    paper.append(container_1.group);
    if (tmpContainer) {
      ready(function() {
        container_1.moveHtmlContainer(htmlElement);
      });
    }
    container_1.relativeWidth = 1;
    container_1.relativeHeight = 1;
    svgDiv_1.container = container_1;
    var sprite_1 = container_1.createChild(classType);
    sprite_1.topParent = container_1;
    var uid = sprite_1.uid;
    registry.invalidSprites[uid] = [];
    registry.invalidDatas[uid] = [];
    registry.invalidPositions[uid] = [];
    registry.invalidLayouts[uid] = [];
    container_1.baseId = uid;
    sprite_1.isBaseSprite = true;
    sprite_1.focusFilter = new FocusFilter();
    registry.baseSprites.push(sprite_1);
    registry.baseSpritesByUid[uid] = sprite_1;
    sprite_1.maskRectangle = { x: 0, y: 0, width: Math.max(svgDiv_1.width || 0, 0), height: Math.max(svgDiv_1.height || 0, 0) };
    container_1.events.on("maxsizechanged", function(event) {
      if (event.previousWidth == 0 || event.previousHeight == 0) {
        container_1.deepInvalidate();
      }
      if (sprite_1.maskRectangle) {
        sprite_1.maskRectangle = { x: 0, y: 0, width: Math.max(svgDiv_1.width || 0, 0), height: Math.max(svgDiv_1.height || 0, 0) };
      }
    });
    var loopTimer_1 = null;
    var loop_1 = function() {
      if (!sprite_1.isDisposed()) {
        if (getRoot(sprite_1.dom) == null) {
          if (options.autoDispose) {
            container_1.htmlContainer = void 0;
            svgDiv_1.htmlElement = void 0;
            sprite_1.dispose();
          } else {
            warn("Chart was not disposed", sprite_1.uid);
          }
          loopTimer_1 = null;
        } else {
          loopTimer_1 = window.setTimeout(loop_1, 1e3);
        }
      } else {
        loopTimer_1 = null;
      }
    };
    loop_1();
    sprite_1.addDisposer(new Disposer(function() {
      if (loopTimer_1 !== null) {
        clearTimeout(loopTimer_1);
      }
      remove(registry.baseSprites, sprite_1);
      registry.baseSpritesByUid[sprite_1.uid] = void 0;
    }));
    sprite_1.addDisposer(container_1);
    var tooltipContainer_1 = container_1.createChild(Container);
    tooltipContainer_1.topParent = container_1;
    tooltipContainer_1.width = percent(100);
    tooltipContainer_1.height = percent(100);
    tooltipContainer_1.isMeasured = false;
    container_1.tooltipContainer = tooltipContainer_1;
    sprite_1.tooltip = new Tooltip();
    sprite_1.tooltip.hide(0);
    sprite_1.tooltip.setBounds({ x: 0, y: 0, width: tooltipContainer_1.maxWidth, height: tooltipContainer_1.maxHeight });
    tooltipContainer_1.events.on("maxsizechanged", function() {
      getValue(sprite_1.tooltip).setBounds({ x: 0, y: 0, width: tooltipContainer_1.maxWidth, height: tooltipContainer_1.maxHeight });
    }, void 0, false);
    var preloader_1 = new Preloader();
    preloader_1.events.on("inited", function() {
      preloader_1.__disabled = true;
    }, void 0, false);
    container_1.preloader = preloader_1;
    if (sprite_1 instanceof Container && !sprite_1.hasLicense()) {
      var logo_1 = tooltipContainer_1.createChild(AmChartsLogo);
      tooltipContainer_1.events.on("maxsizechanged", function(ev) {
        if (tooltipContainer_1.maxWidth <= 100 || tooltipContainer_1.maxHeight <= 50) {
          logo_1.hide();
        } else if (logo_1.isHidden || logo_1.isHiding) {
          logo_1.show();
        }
      }, void 0, false);
      sprite_1.logo = logo_1;
      logo_1.align = "left";
      logo_1.valign = "bottom";
    }
    used(sprite_1.numberFormatter);
    container_1.isStandaloneInstance = true;
    if (options.onlyShowOnViewport) {
      if (!isElementInViewport(htmlContainer, options.viewportTarget)) {
        sprite_1.__disabled = true;
        sprite_1.tooltipContainer.__disabled = true;
        var disposers = [
          addEventListener(window, "DOMContentLoaded", function() {
            viewPortHandler(sprite_1);
          }),
          addEventListener(window, "load", function() {
            viewPortHandler(sprite_1);
          }),
          addEventListener(window, "resize", function() {
            viewPortHandler(sprite_1);
          }),
          addEventListener(window, "scroll", function() {
            viewPortHandler(sprite_1);
          })
        ];
        if (options.viewportTarget) {
          var targets = isArray(options.viewportTarget) ? options.viewportTarget : options.viewportTarget ? [options.viewportTarget] : [];
          for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            disposers.push(addEventListener(target, "resize", function() {
              viewPortHandler(sprite_1);
            }));
            disposers.push(addEventListener(target, "scroll", function() {
              viewPortHandler(sprite_1);
            }));
          }
        }
        var disposer = new MultiDisposer(disposers);
        sprite_1.addDisposer(disposer);
        sprite_1.vpDisposer = disposer;
      } else if (options.queue) {
        addToQueue(sprite_1);
      }
    } else if (options.queue) {
      addToQueue(sprite_1);
    }
    return sprite_1;
  } else {
    system.log("html container not found");
    throw new Error("html container not found");
  }
}
function disposeAllCharts() {
  while (registry.baseSprites.length !== 0) {
    registry.baseSprites.pop().dispose();
  }
}
function addToQueue(sprite) {
  if (registry.queue.indexOf(sprite) == -1) {
    sprite.__disabled = true;
    sprite.tooltipContainer.__disabled = true;
    sprite.events.disableType("appeared");
    if (registry.queue.length == 0) {
      registry.events.once("exitframe", function() {
        queueHandler(sprite);
      });
      system.requestFrame();
    }
    sprite.addDisposer(new Disposer(function() {
      removeFromQueue(sprite);
    }));
    registry.queue.push(sprite);
  }
}
function removeFromQueue(sprite) {
  var index = registry.queue.indexOf(sprite);
  if (index >= 0) {
    registry.queue.splice(registry.queue.indexOf(sprite), 1);
    var nextSprite = registry.queue[index];
    if (nextSprite) {
      queueHandler(nextSprite);
    }
  }
}
function viewPortHandler(sprite) {
  if (sprite.__disabled && isElementInViewport(sprite.htmlContainer, options.viewportTarget)) {
    if (sprite.vpDisposer) {
      sprite.vpDisposer.dispose();
    }
    addToQueue(sprite);
  }
}
function queueHandler(sprite) {
  if (sprite && sprite.tooltipContainer) {
    sprite.__disabled = false;
    sprite.tooltipContainer.__disabled = false;
    sprite.events.enableType("appeared");
    sprite.dispatch("removedfromqueue");
    if (sprite.showOnInit) {
      sprite.events.on("appeared", function() {
        removeFromQueue(sprite);
      });
    }
    if (sprite.vpDisposer) {
      sprite.vpDisposer.dispose();
    }
    if (sprite instanceof Container) {
      sprite.invalidateLabels();
    }
    if (sprite.tooltipContainer) {
      sprite.tooltipContainer.invalidateLayout();
    }
    if (sprite instanceof Component) {
      sprite.invalidateData();
      sprite.reinit();
      sprite.events.once("datavalidated", function() {
        if (sprite.showOnInit) {
          sprite.appear();
        } else {
          removeFromQueue(sprite);
        }
      });
    } else {
      sprite.reinit();
      sprite.events.once("inited", function() {
        removeFromQueue(sprite);
      });
      if (sprite.showOnInit) {
        sprite.appear();
      }
    }
  }
}
function create(htmlElement, classType) {
  var classError;
  if (isString(classType)) {
    if (hasValue(registry.registeredClasses[classType])) {
      classType = registry.registeredClasses[classType];
    } else {
      classType = registry.registeredClasses["Container"];
      classError = new Error("Class [" + classType + "] is not loaded.");
    }
  }
  var chart = createChild(htmlElement, classType);
  if (classError) {
    chart.raiseCriticalError(classError);
  }
  return chart;
}
function createFromConfig(config, htmlElement, classType) {
  if (!hasValue(classType)) {
    classType = config.type;
    delete config.type;
  }
  if (!hasValue(htmlElement)) {
    htmlElement = config.container;
    delete config.container;
  }
  var finalType;
  var classError;
  if (isString(classType) && hasValue(registry.registeredClasses[classType])) {
    finalType = registry.registeredClasses[classType];
  } else if (typeof classType !== "function") {
    finalType = Container;
    classError = new Error("Class [" + classType + "] is not loaded.");
  } else {
    finalType = classType;
  }
  var chart = createChild(htmlElement, finalType);
  if (classError) {
    chart.raiseCriticalError(classError);
  } else {
    chart.config = config;
  }
  return chart;
}
function createDeferred(callback, scope) {
  var rest = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    rest[_i - 2] = arguments[_i];
  }
  return new Promise(function(resolve, reject) {
    registry.deferred.push({
      scope,
      callback,
      args: rest,
      resolve
    });
    if (registry.deferred.length == 1) {
      processNextDeferred();
    }
  });
}
function processNextDeferred() {
  var _a;
  var next = registry.deferred[0];
  if (next) {
    var sprite_2 = (_a = next.callback).call.apply(_a, __spread([next.scope], next.args));
    sprite_2.events.on("ready", function() {
      next.resolve(sprite_2);
      registry.deferred.shift();
      if (options.deferredDelay) {
        setTimeout(processNextDeferred, options.deferredDelay);
      } else {
        processNextDeferred();
      }
    });
  }
}
function useTheme(value) {
  if (registry.themes.indexOf(value) === -1) {
    registry.themes.push(value);
  }
}
function unuseTheme(value) {
  remove(registry.themes, value);
}
function unuseAllThemes() {
  registry.themes = [];
}
function addLicense(license) {
  options.licenses.push(license);
}
export {
  AMElement,
  Adapter,
  Animation,
  BaseObject,
  BaseObjectEvents,
  Basis,
  BlurFilter,
  Button,
  CSVParser,
  Cache,
  Circle,
  CirclePattern,
  CloseButton,
  Color,
  ColorModifier,
  ColorSet,
  ColorizeFilter,
  Component,
  Cone,
  Container,
  CounterDisposer,
  DATE,
  DURATION,
  DataItem,
  DataLoader,
  DataParser,
  DataSource,
  DateFormatter,
  DesaturateFilter,
  Dictionary,
  DictionaryDisposer,
  DictionaryTemplate,
  Disposer,
  DropShadowFilter,
  DurationFormatter,
  Ellipse,
  EventDispatcher,
  Export,
  ExportMenu,
  Filter,
  FocusFilter,
  GlobalAdapter,
  Group,
  Image,
  IndexedIterable,
  Inertia,
  Interaction,
  InteractionKeyboardObject,
  InteractionObject,
  InteractionObjectEventDispatcher,
  InterfaceColorSet,
  JSONParser,
  Keyboard,
  Label,
  Language,
  LightenFilter,
  Line,
  LinePattern,
  LinearGradient,
  LinearGradientModifier,
  List,
  ListDisposer,
  ListGrouper,
  ListIterator,
  ListTemplate,
  Modal,
  Morpher,
  MouseCursorStyle,
  MultiDisposer,
  MutableValueDisposer,
  NUMBER,
  NumberFormatter,
  OrderedList,
  OrderedListTemplate,
  PLACEHOLDER,
  PLACEHOLDER2,
  PX,
  Paper,
  Pattern,
  PatternSet,
  Percent,
  PlayButton,
  Plugin,
  PointedRectangle,
  PointedShape,
  Polyarc,
  Polygon,
  Polyline,
  Polyspline,
  Popup,
  Preloader,
  RadialGradient,
  RadialGradientModifier,
  RectPattern,
  Rectangle,
  Rectangle3D,
  Registry,
  ResizeButton,
  Responsive,
  ResponsiveBreakpoints,
  RoundedRectangle,
  STRING,
  SVGContainer,
  SVGDefaults,
  Scrollbar,
  Slice,
  Slice3D,
  Slider,
  SortedList,
  SortedListTemplate,
  Sprite,
  SpriteEventDispatcher,
  SpriteState,
  StyleClass,
  StyleRule,
  SwitchButton,
  System,
  TargetedEventDispatcher,
  Tension,
  TextFormatter,
  TextLink,
  Tooltip,
  Trapezoid,
  Triangle,
  Validatable,
  WavedCircle,
  WavedLine,
  WavedRectangle,
  ZoomOutButton,
  addClass,
  addLicense,
  animate,
  Array_exports as array,
  blur,
  cache,
  castColor,
  castNumber,
  castString,
  checkBoolean,
  checkNumber,
  checkObject,
  checkString,
  color,
  Colors_exports as colors,
  copyAttributes,
  create,
  createDeferred,
  createFromConfig,
  dataLoader,
  defaultRules,
  disposeAllCharts,
  Ease_exports as ease,
  fixPixelPerfect,
  focus,
  getElement,
  getInteraction,
  getTextFormatter,
  globalAdapter,
  is,
  isArray,
  isColor,
  isElement,
  isNaN,
  isNumber,
  isObject,
  isPercent,
  isString,
  Iterator_exports as iter,
  join,
  keyboard,
  Math_exports as math,
  max2 as max,
  min2 as min,
  Net_exports as net,
  nextFrame,
  Number_exports as number,
  Object_exports as object,
  options,
  or,
  outerHTML,
  Path_exports as path,
  percent,
  readFrame,
  ready,
  registry,
  removeClass,
  reverse,
  String_exports as string,
  system,
  Time_exports as time,
  triggerIdle,
  Type_exports as type,
  unuseAllThemes,
  unuseTheme,
  useTheme,
  Utils_exports as utils,
  viewPortHandler,
  whenIdle,
  writeFrame
};
//# sourceMappingURL=@amcharts_amcharts4_core.js.map

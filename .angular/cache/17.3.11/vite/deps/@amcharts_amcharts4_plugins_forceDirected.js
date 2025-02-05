import {
  Button,
  Circle,
  Color,
  ColorSet,
  Component,
  Container,
  DataItem,
  InterfaceColorSet,
  Label,
  List,
  ListDisposer,
  ListTemplate,
  MouseCursorStyle,
  ResponsiveBreakpoints,
  RoundedRectangle,
  Scrollbar,
  Sprite,
  Tooltip,
  ZoomOutButton,
  color,
  cubicIn,
  cubicOut,
  defaultRules,
  documentPointToSprite,
  documentPointToSvg,
  getInteraction,
  interpolate,
  isIE,
  keyboard,
  lineTo,
  moveTo,
  options,
  plainText,
  relativeToValue,
  spritePointToSvg,
  used
} from "./chunk-JV5Z7NMR.js";
import {
  Dictionary,
  DictionaryDisposer,
  Disposer,
  MutableValueDisposer,
  Percent,
  cos,
  each,
  each2,
  each3,
  fitToRange,
  hasValue,
  isArray,
  isNumber,
  isString,
  max,
  min,
  percent,
  registry,
  remove,
  sin,
  toBoolean,
  toNumber
} from "./chunk-JIM7UVIT.js";
import {
  __extends
} from "./chunk-YUUEQ4QI.js";
import "./chunk-Y6Q6HMFU.js";

// node_modules/@amcharts/amcharts4/.internal/plugins/forceDirected/ForceDirectedLink.js
var ForceDirectedLink = (
  /** @class */
  function(_super) {
    __extends(ForceDirectedLink2, _super);
    function ForceDirectedLink2() {
      var _this = _super.call(this) || this;
      _this.className = "ForceDirectedLink";
      var interfaceColors = new InterfaceColorSet();
      _this.fillOpacity = 0;
      _this.strokeOpacity = 0.5;
      _this.stroke = interfaceColors.getFor("grid");
      _this.isMeasured = false;
      _this.nonScalingStroke = true;
      _this.interactionsEnabled = false;
      _this.distance = 1.5;
      _this.strength = 1;
      _this.applyTheme();
      return _this;
    }
    ForceDirectedLink2.prototype.validate = function() {
      _super.prototype.validate.call(this);
      var source = this.source;
      var target = this.target;
      if (source && target) {
        this.path = moveTo({ x: source.pixelX, y: source.pixelY }) + lineTo({ x: target.pixelX, y: target.pixelY });
        if (source.isHidden || target.isHidden || source.isHiding || target.isHiding) {
          this.hide();
        } else {
          this.show();
        }
      }
    };
    Object.defineProperty(ForceDirectedLink2.prototype, "source", {
      /**
       * @return Source node
       */
      get: function() {
        return this._source;
      },
      /**
       * Source node - a node link starts from.
       *
       * @param  value  Source node
       */
      set: function(value) {
        if (value) {
          this._source = value;
          this._disposers.push(value.events.on("positionchanged", this.invalidate, this, false));
          this._disposers.push(value.events.on("validated", this.invalidate, this, false));
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedLink2.prototype, "target", {
      /**
       * @return Target node
       */
      get: function() {
        return this._target;
      },
      /**
       * Target node - a node link ends at.
       *
       * @param  value  Target node
       */
      set: function(value) {
        if (value) {
          this._target = value;
          this._disposers.push(value.events.on("positionchanged", this.invalidate, this, false));
          this._disposers.push(value.events.on("validated", this.invalidate, this, false));
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedLink2.prototype, "distance", {
      /**
       * @return Distance
       */
      get: function() {
        if (this._adapterO) {
          if (this._adapterO.isEnabled("distance")) {
            return this._adapterO.apply("distance", this.properties.distance);
          }
        }
        return this.properties.distance;
      },
      /**
       * Distance between centers of source and target nodes.
       *
       * This is relative to the radii to sum of both source and target nodes.
       *
       * E.g. if this would be set to `1` both nodes would be touching each other.
       *
       * @default 1.5
       * @param  value  Distance
       */
      set: function(value) {
        this.setPropertyValue("distance", value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedLink2.prototype, "strength", {
      /**
       * @return Strength
       */
      get: function() {
        if (this._adapterO) {
          if (this._adapterO.isEnabled("strength")) {
            return this._adapterO.apply("strength", this.properties.strength);
          }
        }
        return this.properties.strength;
      },
      /**
       * Relative "strength" of the traction between linked nodes.
       *
       * Available values: 0 to XX.
       *
       * The bigger the number, the more rigid the link and the less it will
       * stretch when node is dragged.
       *
       * Carefully with very big numbers: nodes and links might start behaving
       * quite "nerviously".
       *
       * @default 1
       * @param  value  Strength
       */
      set: function(value) {
        this.setPropertyValue("strength", value);
      },
      enumerable: true,
      configurable: true
    });
    ForceDirectedLink2.prototype.getTooltipX = function() {
      var x3 = this.getPropertyValue("tooltipX");
      if (!(x3 instanceof Percent)) {
        x3 = percent(50);
      }
      if (x3 instanceof Percent) {
        var source = this.source;
        var target = this.target;
        if (source && target) {
          var x1 = source.pixelX;
          var x22 = target.pixelX;
          return x1 + (x22 - x1) * x3.value;
        }
      }
      return 0;
    };
    ForceDirectedLink2.prototype.getTooltipY = function() {
      var y3 = this.getPropertyValue("tooltipY");
      if (!(y3 instanceof Percent)) {
        y3 = percent(50);
      }
      if (y3 instanceof Percent) {
        var source = this.source;
        var target = this.target;
        if (source && target) {
          var y1 = source.pixelY;
          var y22 = target.pixelY;
          return y1 + (y22 - y1) * y3.value;
        }
      }
      return 0;
    };
    return ForceDirectedLink2;
  }(Sprite)
);
registry.registeredClasses["ForceDirectedLink"] = ForceDirectedLink;

// node_modules/@amcharts/amcharts4/.internal/core/elements/Grip.js
var Grip = (
  /** @class */
  function(_super) {
    __extends(Grip2, _super);
    function Grip2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.className = "Grip";
      var cs = new InterfaceColorSet();
      _this.layout = "absolute";
      _this.padding(10, 10, 10, 10);
      _this.margin(3, 3, 3, 3);
      _this.background.fillOpacity = 0.3;
      _this.background.cornerRadius(10, 10, 10, 10);
      var icon = new Sprite();
      icon.element = _this.paper.add("path");
      var path = moveTo({ x: -6, y: 0 });
      path += lineTo({ x: 6, y: 0 });
      path += moveTo({ x: -8, y: -6 });
      path += lineTo({ x: 0, y: -12 });
      path += lineTo({ x: 8, y: -6 });
      path += moveTo({ x: -8, y: 6 });
      path += lineTo({ x: 0, y: 12 });
      path += lineTo({ x: 8, y: 6 });
      icon.path = path;
      icon.strokeWidth = 2;
      icon.fillOpacity = 0;
      icon.pixelPerfect = true;
      icon.padding(0, 4, 0, 4);
      icon.stroke = cs.getFor("text");
      icon.strokeOpacity = 0.7;
      icon.align = "center";
      icon.valign = "middle";
      _this.icon = icon;
      _this.label.dispose();
      _this.label = void 0;
      _this.position = "right";
      _this.autoHideDelay = 3e3;
      _this.events.on("shown", function(ev) {
        if (_this._autoHideTimeout) {
          _this._autoHideTimeout.dispose();
        }
        if (_this.autoHideDelay) {
          _this._autoHideTimeout = _this.setTimeout(function() {
            _this.hide();
          }, _this.autoHideDelay);
        }
      });
      _this.events.on("down", function(ev) {
        if (_this._autoHideTimeout) {
          _this._autoHideTimeout.dispose();
        }
      });
      _this.events.on("out", function(ev) {
        if (_this.autoHideDelay) {
          _this._autoHideTimeout = _this.setTimeout(function() {
            _this.hide();
          }, _this.autoHideDelay);
        }
      });
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(Grip2.prototype, "position", {
      /**
       * @return Position
       */
      get: function() {
        return this.getPropertyValue("position");
      },
      /**
       * Sets position of the grip.
       *
       * Available options: "left", "right" (default), "top", "bottom".
       *
       * @param  value  Position
       */
      set: function(value) {
        if (this.setPropertyValue("position", value)) {
          switch (value) {
            case "left":
              this.align = "left";
              this.valign = "middle";
              this.horizontalCenter = "left";
              this.verticalCenter = "middle";
              this.icon.rotation = 0;
              this.width = void 0;
              this.height = percent(30);
              break;
            case "right":
              this.align = "right";
              this.valign = "middle";
              this.horizontalCenter = "right";
              this.verticalCenter = "middle";
              this.icon.rotation = 0;
              this.width = void 0;
              this.height = percent(30);
              break;
            case "top":
              this.align = "center";
              this.valign = "top";
              this.horizontalCenter = "middle";
              this.verticalCenter = "top";
              this.icon.rotation = 90;
              this.width = percent(30);
              this.height = void 0;
              break;
            case "bottom":
              this.align = "center";
              this.valign = "bottom";
              this.horizontalCenter = "middle";
              this.verticalCenter = "bottom";
              this.icon.rotation = 90;
              this.width = percent(30);
              this.height = void 0;
              break;
            default:
              this.align = "center";
              this.valign = "middle";
              this.horizontalCenter = "middle";
              this.verticalCenter = "middle";
              this.icon.rotation = 90;
              this.width = percent(30);
              this.height = void 0;
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Grip2.prototype, "autoHideDelay", {
      /**
       * @return Delay
       */
      get: function() {
        return this.getPropertyValue("autoHideDelay");
      },
      /**
       * Number of milliseconds to show grip until it is hidden automatically.
       *
       * @default 3000
       * @param  value  Delay
       */
      set: function(value) {
        this.setPropertyValue("autoHideDelay", value);
      },
      enumerable: true,
      configurable: true
    });
    return Grip2;
  }(Button)
);
registry.registeredClasses["Grip"] = Grip;

// node_modules/@amcharts/amcharts4/.internal/charts/Chart.js
var ChartDataItem = (
  /** @class */
  function(_super) {
    __extends(ChartDataItem2, _super);
    function ChartDataItem2() {
      var _this = _super.call(this) || this;
      _this.className = "ChartDataItem";
      _this.applyTheme();
      return _this;
    }
    return ChartDataItem2;
  }(DataItem)
);
var Chart = (
  /** @class */
  function(_super) {
    __extends(Chart2, _super);
    function Chart2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this._legend = new MutableValueDisposer();
      if (_this.constructor === Chart2) {
        throw new Error("'Chart' cannot be instantiated directly. Please use a specific chart type.");
      }
      _this.className = "Chart";
      var template = new Label();
      _this.titles = new ListTemplate(template);
      _this._disposers.push(new ListDisposer(_this.titles));
      _this._disposers.push(template);
      _this.width = percent(100);
      _this.height = percent(100);
      _this.layout = "vertical";
      var chartAndLegendContainer = _this.createChild(Container);
      chartAndLegendContainer.shouldClone = false;
      chartAndLegendContainer.layout = "vertical";
      chartAndLegendContainer.width = percent(100);
      chartAndLegendContainer.height = percent(100);
      _this.chartAndLegendContainer = chartAndLegendContainer;
      var chartContainer = chartAndLegendContainer.createChild(Container);
      chartContainer.shouldClone = false;
      chartContainer.width = percent(100);
      chartContainer.height = percent(100);
      _this.chartContainer = chartContainer;
      _this.showOnInit = true;
      _this._disposers.push(_this._legend);
      _this.titles.events.on("inserted", function(label) {
        _this.processTitle(label);
        _this.updateReaderTitleReferences();
      }, _this, false);
      _this.titles.events.on("removed", function(label) {
        _this.updateReaderTitleReferences();
      }, _this, false);
      _this.role = "region";
      _this.defaultState.transitionDuration = 1;
      _this.applyTheme();
      return _this;
    }
    Chart2.prototype.applyInternalDefaults = function() {
      _super.prototype.applyInternalDefaults.call(this);
      if (!hasValue(this.readerTitle)) {
        this.readerTitle = this.language.translate("Chart");
      }
    };
    Chart2.prototype.draw = function() {
      this.fixLayout();
      _super.prototype.draw.call(this);
    };
    Chart2.prototype.fixLayout = function() {
      var legend = this.legend;
      if (legend) {
        var chartAndLegendContainer = this.chartAndLegendContainer;
        var chartContainer = this.chartContainer;
        chartContainer.x = void 0;
        chartContainer.y = void 0;
        if (legend.position != "absolute") {
          legend.x = void 0;
          legend.y = void 0;
        }
        switch (legend.position) {
          case "left":
            chartAndLegendContainer.layout = "horizontal";
            legend.toBack();
            break;
          case "right":
            chartAndLegendContainer.layout = "horizontal";
            legend.toFront();
            break;
          case "top":
            chartAndLegendContainer.layout = "vertical";
            legend.toBack();
            break;
          case "bottom":
            chartAndLegendContainer.layout = "vertical";
            legend.toFront();
            break;
          case "absolute":
            legend.isMeasured = false;
            break;
        }
      }
    };
    Chart2.prototype.feedLegend = function() {
    };
    Chart2.prototype.processTitle = function(event) {
      var title = event.newValue;
      title.parent = this;
      title.toBack();
      title.shouldClone = false;
      title.align = "center";
      title.uidAttr();
      return title;
    };
    Chart2.prototype.updateReaderTitleReferences = function() {
      if (this.titles.length) {
        var titleIds_1 = [];
        each3(this.titles.iterator(), function(title) {
          titleIds_1.push(title.uid);
        });
        this.setSVGAttribute({ "aria-labelledby": titleIds_1.join(" ") });
      } else {
        this.removeSVGAttribute("aria-labelledby");
      }
    };
    Object.defineProperty(Chart2.prototype, "legend", {
      /**
       * @return Legend
       */
      get: function() {
        return this._legend.get();
      },
      /**
       * Holds the instance of chart's [[Leged]].
       *
       * @see {@link https://www.amcharts.com/docs/v4/concepts/legend/} for more information about legends
       * @param Legend
       */
      set: function(legend) {
        this.setLegend(legend);
      },
      enumerable: true,
      configurable: true
    });
    Chart2.prototype.setLegend = function(legend) {
      var _this = this;
      if (this._legend.get() !== legend) {
        if (legend) {
          legend.parent = this.chartAndLegendContainer;
          this._legend.set(legend, legend.events.on("propertychanged", function(event) {
            if (event.property == "position") {
              _this.fixLayout();
            }
          }, void 0, false));
          legend.addDisposer(new Disposer(function() {
            _this.legend = void 0;
          }));
        } else {
          this._legend.reset();
        }
        this.feedLegend();
      }
    };
    Chart2.prototype.dispose = function() {
      if (this.legend) {
        this.legend.dispose();
      }
      _super.prototype.dispose.call(this);
    };
    Chart2.prototype.processConfig = function(config) {
      if (config) {
        if (hasValue(config.legend) && !hasValue(config.legend.type)) {
          config.legend.type = "Legend";
        }
      }
      _super.prototype.processConfig.call(this, config);
    };
    Chart2.prototype.copyFrom = function(source) {
      this.titles.copyFrom(source.titles);
      this.chartContainer.copyFrom(source.chartContainer);
      if (source.legend) {
        this.legend = source.legend.clone();
        this.legend.removeChildren();
      }
      _super.prototype.copyFrom.call(this, source);
    };
    Object.defineProperty(Chart2.prototype, "dragGrip", {
      /**
       * @return Grip
       */
      get: function() {
        var _this = this;
        if (!this._dragGrip) {
          var grip_1 = this.tooltipContainer.createChild(Grip);
          grip_1.align = "right";
          grip_1.valign = "middle";
          grip_1.hide(0);
          grip_1.events.on("down", function(ev) {
            if (ev.touch) {
              _this.interactionsEnabled = false;
            }
          });
          grip_1.events.on("up", function(ev) {
            _this.interactionsEnabled = true;
          });
          this.events.on("down", function(ev) {
            if (ev.touch) {
              grip_1.show();
            }
          });
          this._dragGrip = grip_1;
        }
        return this._dragGrip;
      },
      /**
       * An instance of [[Grip]] which serves as a grip point which appears on
       * touch and allows scrolling whole page even if chart is occupying the
       * whole of the screen and would otherwise prevent scrolling.
       *
       * @since 4.4.0
       * @see {@link https://www.amcharts.com/docs/v4/concepts/touch/} For more information.
       * @param  value  Grip
       */
      set: function(value) {
        this._dragGrip = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Chart2.prototype, "focusable", {
      get: function() {
        return this.parent.focusable;
      },
      set: function(value) {
        this.parent.focusable = value;
      },
      enumerable: true,
      configurable: true
    });
    return Chart2;
  }(Component)
);
registry.registeredClasses["Chart"] = Chart;
defaultRules.push({
  relevant: ResponsiveBreakpoints.widthXS,
  state: function(target, stateId) {
    if (target instanceof Chart) {
      var state = target.states.create(stateId);
      if (target.pixelPaddingLeft > 10) {
        state.properties.paddingLeft = 10;
      }
      if (target.pixelPaddingRight > 10) {
        state.properties.paddingRight = 10;
      }
      return state;
    }
    return null;
  }
});
defaultRules.push({
  relevant: ResponsiveBreakpoints.heightXS,
  state: function(target, stateId) {
    if (target instanceof Chart) {
      var state = target.states.create(stateId);
      if (target.pixelPaddingTop > 10) {
        state.properties.paddingTop = 10;
      }
      if (target.pixelPaddingBottom > 10) {
        state.properties.paddingBottom = 10;
      }
      return state;
    }
    return null;
  }
});
defaultRules.push({
  relevant: ResponsiveBreakpoints.widthXXS,
  state: function(target, stateId) {
    if (target instanceof Chart) {
      var state = target.states.create(stateId);
      state.properties.paddingLeft = 0;
      state.properties.paddingRight = 0;
      return state;
    }
    return null;
  }
});
defaultRules.push({
  relevant: ResponsiveBreakpoints.heightXXS,
  state: function(target, stateId) {
    if (target instanceof Chart) {
      var state = target.states.create(stateId);
      state.properties.paddingTop = 0;
      state.properties.paddingBottom = 0;
      return state;
    }
    return null;
  }
});

// node_modules/@amcharts/amcharts4/.internal/charts/elements/Bullet.js
var Bullet = (
  /** @class */
  function(_super) {
    __extends(Bullet2, _super);
    function Bullet2() {
      var _this = _super.call(this) || this;
      _this.className = "Bullet";
      _this.isMeasured = false;
      _this.tooltipX = 0;
      _this.tooltipY = 0;
      _this.layout = "none";
      _this.applyOnClones = true;
      _this.copyToLegendMarker = true;
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(Bullet2.prototype, "locationX", {
      /**
       * @return Location (0-1)
       */
      get: function() {
        return this.getPropertyValue("locationX");
      },
      /**
       * Relative horizontal location within cell. (0-1)
       *
       * @param value  Location (0-1)
       */
      set: function(value) {
        if (this.setPropertyValue("locationX", value)) {
          var dataItem = this.dataItem;
          if (dataItem && dataItem.component) {
            dataItem.component.invalidate();
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Bullet2.prototype, "locationY", {
      /**
       * @return Location (0-1)
       */
      get: function() {
        return this.getPropertyValue("locationY");
      },
      /**
       * Relative vertical location within cell. (0-1)
       *
       * @param value  Location (0-1)
       */
      set: function(value) {
        if (this.setPropertyValue("locationY", value)) {
          var dataItem = this.dataItem;
          if (dataItem && dataItem.component) {
            dataItem.component.invalidate();
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Bullet2.prototype, "xField", {
      /**
       * @return [description]
       */
      get: function() {
        return this.getPropertyValue("xField");
      },
      /**
       * [xField description]
       *
       * @todo Description
       * @param value  [description]
       */
      set: function(value) {
        this.setPropertyValue("xField", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Bullet2.prototype, "yField", {
      /**
       * @return [description]
       */
      get: function() {
        return this.getPropertyValue("yField");
      },
      /**
       * [yField description]
       *
       * Description
       * @param value  [description]
       */
      set: function(value) {
        this.setPropertyValue("yField", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Bullet2.prototype, "isDynamic", {
      /**
       * @return Redraw on data change?
       */
      get: function() {
        return this.getPropertyValue("isDynamic");
      },
      /**
       * Indicates if the bullet is "dynamic".
       *
       * In most cases the bullets remain the same, even if the underlying data
       * changes.
       *
       * However, in cases where bullet also displays a label, or its size depends
       * on data, it also needs to be redrawn when the underlying data changes.
       *
       * Only those bullets that have set `isDynamic = true` will be redrawn each
       * time data changes. Regular bullets will be reused as they are.
       *
       * @default false
       * @param value  Redraw on data change?
       */
      set: function(value) {
        this.setPropertyValue("isDynamic", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Bullet2.prototype, "copyToLegendMarker", {
      /**
       * @return Redraw on data change?
       */
      get: function() {
        return this.getPropertyValue("copyToLegendMarker");
      },
      /**
       * Indicates if the bullet should be copied to legend marker
       *
       * @default false
       * @param value  Redraw on data change?
       */
      set: function(value) {
        this.setPropertyValue("copyToLegendMarker", value);
      },
      enumerable: true,
      configurable: true
    });
    return Bullet2;
  }(Container)
);
registry.registeredClasses["Bullet"] = Bullet;
defaultRules.push({
  relevant: ResponsiveBreakpoints.isXS,
  state: function(target, stateId) {
    if (target instanceof Bullet) {
      var state = target.states.create(stateId);
      state.properties.disabled = true;
      return state;
    }
    return null;
  }
});

// node_modules/@amcharts/amcharts4/.internal/charts/Legend.js
var LegendDataItem = (
  /** @class */
  function(_super) {
    __extends(LegendDataItem2, _super);
    function LegendDataItem2() {
      var _this = _super.call(this) || this;
      _this.childrenCreated = false;
      _this.className = "LegendDataItem";
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(LegendDataItem2.prototype, "label", {
      /**
       * A legend item's [[Label]] element.
       *
       * @return Label
       */
      get: function() {
        var _this = this;
        if (!this._label) {
          var label_1 = this.component.labels.create();
          this._label = label_1;
          this.addSprite(label_1);
          this._disposers.push(label_1);
          label_1.parent = this.itemContainer;
          this._disposers.push(new Disposer(function() {
            if (hasValue(_this.component)) {
              _this.component.labels.removeValue(label_1);
            }
          }));
        }
        return this._label;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(LegendDataItem2.prototype, "color", {
      /**
       * @return Main color
       */
      get: function() {
        return this.properties.color;
      },
      /**
       * Main color of legend data item.
       *
       * This is set by the target element this legend item represents, like
       * a Series or a Slice.
       *
       * It can be used to derive a color in legend's sub-items, like label:
       *
       * ```TypeScript
       * chart.legend.labels.template.text = "[{color}]{name}[/]";
       * ```
       * ```JavaScript
       * chart.legend.labels.template.text = "[{color}]{name}[/]";
       * ```
       * ```JSON
       * {
       *   // ...
       *   "legend": {
       *     // ...
       *     "labels": {
       *       "text": "[{color}]{name}[/]"
       *     }
       *   }
       * }
       * ```
       *
       * @see {@link https://www.amcharts.com/docs/v4/concepts/legend/#Legend_labels} For more information about configuring legend labels.
       * @param value  Main color
       */
      set: function(value) {
        this.setProperty("color", value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(LegendDataItem2.prototype, "valueLabel", {
      /**
       * A legend item's [[Label]] element for "value label".
       *
       * @return Label
       */
      get: function() {
        var _this = this;
        if (!this._valueLabel) {
          var valueLabel_1 = this.component.valueLabels.create();
          this._valueLabel = valueLabel_1;
          this.addSprite(valueLabel_1);
          this._disposers.push(valueLabel_1);
          valueLabel_1.parent = this.itemContainer;
          this._disposers.push(new Disposer(function() {
            if (hasValue(_this.component)) {
              _this.component.valueLabels.removeValue(valueLabel_1);
            }
          }));
        }
        return this._valueLabel;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(LegendDataItem2.prototype, "itemContainer", {
      /**
       * A reference to the main [[Container]] that holds legend item's elements:
       * marker and labels.
       *
       * @return Item container
       */
      get: function() {
        var _this = this;
        if (!this._itemContainer) {
          var component_1 = this.component;
          var itemContainer_1 = component_1.itemContainers.create();
          itemContainer_1.parent = component_1;
          this._itemContainer = itemContainer_1;
          this.addSprite(itemContainer_1);
          this._disposers.push(itemContainer_1);
          if (itemContainer_1.togglable) {
            itemContainer_1.events.on("toggled", function(ev) {
              component_1.toggleDataItem(ev.target.dataItem);
            }, void 0, false);
          }
          if (itemContainer_1.focusable) {
            itemContainer_1.events.on("hit", function(ev) {
              component_1.focusedItem = void 0;
            }, void 0, false);
            itemContainer_1.events.on("focus", function(ev) {
              component_1.focusedItem = ev.target.dataItem;
            }, void 0, false);
            itemContainer_1.events.on("blur", function(ev) {
              component_1.focusedItem = void 0;
            }, void 0, false);
          }
          this._disposers.push(new Disposer(function() {
            if (hasValue(_this.component)) {
              _this.component.itemContainers.removeValue(itemContainer_1);
            }
          }));
          if (this.dataContext.uidAttr) {
            itemContainer_1.readerControls = this.dataContext.uidAttr();
            itemContainer_1.readerLabelledBy = this.dataContext.uidAttr();
          }
          var sprite = this.dataContext;
          if ((sprite instanceof DataItem || sprite instanceof Sprite) && !sprite.isDisposed()) {
            var visibilitychanged = function(ev) {
              itemContainer_1.readerChecked = ev.visible;
              itemContainer_1.events.disableType("toggled");
              itemContainer_1.isActive = !ev.visible;
              itemContainer_1.events.enableType("toggled");
            };
            sprite.addDisposer(new Disposer(function() {
              if (_this.component) {
                _this.component.dataItems.remove(_this);
              }
            }));
            if (sprite instanceof Sprite) {
              itemContainer_1.addDisposer(sprite.events.on("visibilitychanged", visibilitychanged, void 0, false));
              itemContainer_1.addDisposer(sprite.events.on("hidden", function(ev) {
                itemContainer_1.readerChecked = false;
                itemContainer_1.events.disableType("toggled");
                itemContainer_1.isActive = true;
                itemContainer_1.events.enableType("toggled");
              }, void 0, false));
              itemContainer_1.addDisposer(sprite.events.on("shown", function(ev) {
                itemContainer_1.readerChecked = true;
                itemContainer_1.events.disableType("toggled");
                itemContainer_1.isActive = false;
                itemContainer_1.events.enableType("toggled");
              }, void 0, false));
            } else {
              itemContainer_1.addDisposer(sprite.events.on("visibilitychanged", visibilitychanged, void 0, false));
            }
          }
        }
        return this._itemContainer;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(LegendDataItem2.prototype, "marker", {
      /**
       * A [[Container]] that holds legend item's marker element.
       *
       * @return Marker
       */
      get: function() {
        var _this = this;
        if (!this._marker) {
          var marker_1 = this.component.markers.create();
          this._marker = marker_1;
          marker_1.parent = this.itemContainer;
          this.addSprite(marker_1);
          this._disposers.push(marker_1);
          this._disposers.push(new Disposer(function() {
            if (hasValue(_this.component)) {
              _this.component.markers.removeValue(marker_1);
            }
          }));
        }
        return this._marker;
      },
      enumerable: true,
      configurable: true
    });
    return LegendDataItem2;
  }(DataItem)
);
var LegendSettings = (
  /** @class */
  /* @__PURE__ */ function() {
    function LegendSettings2() {
      this.createMarker = true;
    }
    return LegendSettings2;
  }()
);
var Legend = (
  /** @class */
  function(_super) {
    __extends(Legend2, _super);
    function Legend2() {
      var _this = _super.call(this) || this;
      _this.className = "Legend";
      _this.layout = "grid";
      _this.setPropertyValue("useDefaultMarker", false);
      _this.setPropertyValue("scrollable", false);
      _this.setPropertyValue("contentAlign", "center");
      var itemContainer = new Container();
      itemContainer.applyOnClones = true;
      itemContainer.padding(8, 0, 8, 0);
      itemContainer.margin(0, 10, 0, 10);
      itemContainer.layout = "horizontal";
      itemContainer.clickable = true;
      itemContainer.focusable = true;
      itemContainer.role = "switch";
      itemContainer.togglable = true;
      itemContainer.cursorOverStyle = MouseCursorStyle.pointer;
      itemContainer.background.fillOpacity = 0;
      _this.itemContainers = new ListTemplate(itemContainer);
      _this._disposers.push(new ListDisposer(_this.itemContainers));
      _this._disposers.push(_this.itemContainers.template);
      _this._disposers.push(getInteraction().body.events.on("keyup", function(ev) {
        if (keyboard.isKey(ev.event, "enter") && _this.focusedItem) {
          var focusedItem = _this.focusedItem;
          var target = focusedItem.itemContainer;
          if (target.togglable) {
            _this.toggleDataItem(focusedItem);
          } else if (target.clickable && target.events.isEnabled("hit")) {
            target.dispatchImmediately("hit", { event: ev });
            _this.focusedItem = focusedItem;
          }
        }
      }, _this));
      var interfaceColors = new InterfaceColorSet();
      var marker = new Container();
      marker.width = 23;
      marker.height = 23;
      marker.interactionsEnabled = false;
      marker.applyOnClones = true;
      marker.setStateOnChildren = true;
      marker.background.fillOpacity = 0;
      marker.background.strokeOpacity = 0;
      marker.propertyFields.fill = "fill";
      marker.valign = "middle";
      var disabledColor = interfaceColors.getFor("disabledBackground");
      marker.events.on("childadded", function(event) {
        var child = event.newValue;
        var activeState = child.states.create("active");
        activeState.properties.stroke = disabledColor;
        activeState.properties.fill = disabledColor;
      });
      _this.markers = new ListTemplate(marker);
      _this._disposers.push(new ListDisposer(_this.markers));
      _this._disposers.push(_this.markers.template);
      var rectangle = marker.createChild(RoundedRectangle);
      rectangle.width = percent(100);
      rectangle.height = percent(100);
      rectangle.applyOnClones = true;
      rectangle.propertyFields.fill = "fill";
      rectangle.strokeOpacity = 0;
      var label = new Label();
      label.text = "{name}";
      label.margin(0, 5, 0, 5);
      label.valign = "middle";
      label.applyOnClones = true;
      label.states.create("active").properties.fill = interfaceColors.getFor("disabledBackground");
      _this.labels = new ListTemplate(label);
      _this._disposers.push(new ListDisposer(_this.labels));
      _this._disposers.push(_this.labels.template);
      label.interactionsEnabled = false;
      label.truncate = true;
      label.fullWords = false;
      var valueLabel = new Label();
      valueLabel.margin(0, 5, 0, 0);
      valueLabel.valign = "middle";
      valueLabel.width = 50;
      valueLabel.align = "right";
      valueLabel.textAlign = "end";
      valueLabel.applyOnClones = true;
      valueLabel.states.create("active").properties.fill = interfaceColors.getFor("disabledBackground");
      valueLabel.interactionsEnabled = false;
      _this.valueLabels = new ListTemplate(valueLabel);
      _this._disposers.push(new ListDisposer(_this.valueLabels));
      _this._disposers.push(_this.valueLabels.template);
      _this.position = "bottom";
      itemContainer.states.create("active");
      itemContainer.setStateOnChildren = true;
      _this.role = "group";
      _this.events.on("layoutvalidated", _this.handleScrollbar, _this, false);
      _this.events.on("parentset", function() {
        var parent = _this.parent;
        if (parent) {
          _this._disposers.push(parent.events.on("maxsizechanged", function() {
            if (_this.scrollable) {
              _this.setTimeout(function() {
                _this.updateMasks();
                _this.handleScrollbar();
                _this._handleWheelReal(1);
              }, 100);
            }
          }));
        }
      });
      _this.applyTheme();
      return _this;
    }
    Legend2.prototype.applyInternalDefaults = function() {
      _super.prototype.applyInternalDefaults.call(this);
      if (!hasValue(this.readerTitle)) {
        this.readerTitle = this.language.translate("Legend");
      }
    };
    Legend2.prototype.createDataItem = function() {
      return new LegendDataItem();
    };
    Legend2.prototype.validateDataElements = function() {
      if (this.scrollbar) {
        this.scrollbar.start = 0;
        this.scrollbar.end = 1;
      }
      _super.prototype.validateDataElements.call(this);
    };
    Legend2.prototype.validateDataElement = function(dataItem) {
      _super.prototype.validateDataElement.call(this, dataItem);
      var container = dataItem.itemContainer;
      var marker = dataItem.marker;
      used(dataItem.label);
      var valueLabel = dataItem.valueLabel;
      container.readerChecked = dataItem.dataContext.visible;
      dataItem.dataContext.legendDataItem = dataItem;
      var tempMaxWidth = dataItem.label.maxWidth;
      if (!(dataItem.label.width instanceof Percent)) {
        dataItem.label.width = void 0;
      }
      if (tempMaxWidth > 0) {
        dataItem.label.maxWidth = tempMaxWidth;
      }
      if (valueLabel.align == "right") {
        valueLabel.width = void 0;
      }
      var legendSettings = dataItem.dataContext.legendSettings;
      var dataContext = dataItem.dataContext;
      if (dataContext.createLegendMarker && (!this.useDefaultMarker || !(dataContext instanceof Sprite))) {
        if (!dataItem.childrenCreated) {
          dataContext.createLegendMarker(marker);
          dataItem.childrenCreated = true;
        }
      } else {
        this.markers.template.propertyFields.fill = void 0;
      }
      if (dataContext.updateLegendValue) {
        dataContext.updateLegendValue();
      }
      if (dataContext.component && dataContext.component.updateLegendValue) {
        dataContext.component.updateLegendValue(dataContext);
      }
      if (valueLabel.invalid) {
        valueLabel.validate();
      }
      if (valueLabel.text == "" || valueLabel.text == void 0) {
        valueLabel.__disabled = true;
      } else {
        valueLabel.__disabled = false;
      }
      if (legendSettings && (legendSettings.itemValueText != void 0 || legendSettings.valueText != void 0)) {
        valueLabel.__disabled = false;
      }
      var visible = dataItem.dataContext.visible;
      if (visible === void 0) {
        visible = true;
      }
      visible = toBoolean(visible);
      dataItem.dataContext.visible = visible;
      container.events.disableType("toggled");
      container.isActive = !visible;
      if (container.isActive) {
        container.setState("active", 0);
      } else {
        container.setState("default", 0);
      }
      container.events.enableType("toggled");
    };
    Legend2.prototype.afterDraw = function() {
      var _this = this;
      var maxWidth = this.getPropertyValue("maxWidth");
      var maxLabelWidth = 0;
      this.labels.each(function(label) {
        if (label.invalid) {
          label.maxWidth = void 0;
          label.validate();
        }
        if (label.measuredWidth + label.pixelMarginLeft + label.pixelMarginRight > maxLabelWidth) {
          maxLabelWidth = label.measuredWidth + label.pixelMarginLeft + label.pixelMarginRight;
        }
      });
      var maxValueLabelWidth = 0;
      this.valueLabels.each(function(label) {
        if (label.invalid) {
          label.validate();
        }
        if (label.measuredWidth + label.pixelMarginLeft + label.pixelMarginRight > maxValueLabelWidth) {
          maxValueLabelWidth = label.measuredWidth + label.pixelMarginLeft + label.pixelMarginRight;
        }
      });
      var maxMarkerWidth = 0;
      this.markers.each(function(marker) {
        if (marker.invalid) {
          marker.validate();
        }
        if (marker.measuredWidth + marker.pixelMarginLeft + marker.pixelMarginRight > maxMarkerWidth) {
          maxMarkerWidth = marker.measuredWidth + marker.pixelMarginLeft + marker.pixelMarginRight;
        }
      });
      var itemContainer = this.itemContainers.template;
      var margin = itemContainer.pixelMarginRight + itemContainer.pixelMarginLeft;
      var maxAdjustedLabelWidth;
      var trueMaxWidth = maxLabelWidth + maxValueLabelWidth + maxMarkerWidth;
      if (!isNumber(maxWidth)) {
        maxAdjustedLabelWidth = maxLabelWidth;
      } else {
        maxWidth = maxWidth - margin;
        if (maxWidth > trueMaxWidth) {
          maxWidth = trueMaxWidth;
        }
        maxAdjustedLabelWidth = maxWidth - maxMarkerWidth - maxValueLabelWidth;
      }
      this.labels.each(function(label) {
        if (_this.valueLabels.template.align == "right" || label.measuredWidth > maxAdjustedLabelWidth) {
          if (!(label.width instanceof Percent)) {
            label.width = Math.min(label.maxWidth, maxAdjustedLabelWidth - label.pixelMarginLeft - label.pixelMarginRight);
            label.maxWidth = label.width;
          }
        }
      });
      if (this.valueLabels.template.align == "right") {
        this.valueLabels.each(function(valueLabel) {
          valueLabel.width = maxValueLabelWidth - valueLabel.pixelMarginRight - valueLabel.pixelMarginLeft;
        });
      }
      _super.prototype.afterDraw.call(this);
    };
    Legend2.prototype.handleScrollbar = function() {
      var scrollbar = this.scrollbar;
      if (this.scrollable && scrollbar) {
        var measuredHeight = this.maxHeight;
        scrollbar.height = measuredHeight;
        scrollbar.x = this.measuredWidth - scrollbar.pixelWidth - scrollbar.pixelMarginLeft;
        if (this.contentHeight > measuredHeight) {
          scrollbar.visible = true;
          scrollbar.thumb.height = scrollbar.height * measuredHeight / this.contentHeight;
          this.paddingRight = scrollbar.pixelWidth + scrollbar.pixelMarginLeft + scrollbar.pixelMarginRight;
        } else {
          scrollbar.thumb.height = scrollbar.height * measuredHeight / this.contentHeight;
          this.paddingRight = scrollbar.pixelWidth + scrollbar.pixelMarginLeft + scrollbar.pixelMarginRight;
          scrollbar.visible = false;
          scrollbar.start = 0;
          scrollbar.end = 1;
        }
        scrollbar.handleThumbPosition();
        this.updateMasks();
      }
    };
    Object.defineProperty(Legend2.prototype, "position", {
      /**
       * @return Position
       */
      get: function() {
        return this.getPropertyValue("position");
      },
      /**
       * Position of the legend.
       *
       * Options: "left", "right", "top", "bottom" (default), or "absolute".
       *
       * IMPORTANT: [[MapChart]] will ignore this setting, as it is using different
       * layout structure than other charts.
       *
       * To position legend in [[MapChart]] set legend's `align` (`"left"` or
       * `"right"`) and `valign` (`"top"` or `"bottom"`) properties instead.
       *
       * @default "bottom"
       * @param value  Position
       */
      set: function(value) {
        if (this.setPropertyValue("position", value)) {
          if (value == "left" || value == "right") {
            this.margin(10, 5, 10, 10);
            this.valign = "middle";
            this.contentAlign = "none";
            this.valueLabels.template.align = "right";
            if (!isNumber(this.maxColumns)) {
              this.maxColumns = 1;
            }
            this.width = void 0;
            this.maxWidth = 220;
          } else {
            this.maxColumns = void 0;
            this.width = percent(100);
            this.valueLabels.template.align = "left";
          }
          this.invalidate();
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Legend2.prototype, "useDefaultMarker", {
      /**
       * @return Use default marker?
       */
      get: function() {
        return this.getPropertyValue("useDefaultMarker");
      },
      /**
       * Should legend try to mirror the look of the related item when building
       * the marker for legend item?
       *
       * If set to `false` it will try to make the marker look like its related
       * item.
       *
       * E.g. if an item is for a Line Series, it will display a line of the
       * same thickness, color, and will use the same bullets if series have them.
       *
       * If set to `true`, all markers will be shown as squares, regardless of te
       * series type.
       *
       * @default false
       * @param value Use default marker?
       */
      set: function(value) {
        this.setPropertyValue("useDefaultMarker", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Legend2.prototype, "scrollable", {
      /**
       * @return Legend Scrollable?
       */
      get: function() {
        return this.getPropertyValue("scrollable");
      },
      /**
       * If set to `true` the Legend will display a scrollbar if its contents do
       * not fit into its `maxHeight`.
       *
       * Please note that `maxHeight` is automatically set for Legend when its
       * `position` is set to `"left"` or `"right"`.
       *
       * @default false
       * @since 4.8.0
       * @param  value  Legend Scrollable?
       */
      set: function(value) {
        if (this.setPropertyValue("scrollable", value, true)) {
          if (value) {
            var scrollbar = this.createChild(Scrollbar);
            this.scrollbar = scrollbar;
            scrollbar.isMeasured = false;
            scrollbar.orientation = "vertical";
            scrollbar.endGrip.__disabled = true;
            scrollbar.startGrip.__disabled = true;
            scrollbar.visible = false;
            scrollbar.marginLeft = 5;
            this._mouseWheelDisposer = this.events.on("wheel", this.handleWheel, this, false);
            this._disposers.push(this._mouseWheelDisposer);
            this._disposers.push(scrollbar.events.on("rangechanged", this.updateMasks, this, false));
          } else {
            if (this._mouseWheelDisposer) {
              this._mouseWheelDisposer.dispose();
              if (this.scrollbar) {
                this.scrollbar.dispose();
                this.scrollbar = void 0;
              }
            }
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    Legend2.prototype.handleWheel = function(event) {
      this._handleWheelReal(event.shift.y);
    };
    Legend2.prototype._handleWheelReal = function(shift) {
      var scrollbar = this.scrollbar;
      if (scrollbar) {
        var ds = shift / 1e3 * this.measuredHeight / this.contentHeight;
        var delta = scrollbar.end - scrollbar.start;
        if (shift > 0) {
          scrollbar.start = max(0, scrollbar.start - ds);
          scrollbar.end = scrollbar.start + delta;
        } else {
          scrollbar.end = min(1, scrollbar.end - ds);
          scrollbar.start = scrollbar.end - delta;
        }
      }
    };
    Legend2.prototype.updateMasks = function() {
      var _this = this;
      if (this.scrollbar) {
        this.itemContainers.each(function(itemContainer) {
          itemContainer.dy = -_this.scrollbar.thumb.pixelY * _this.contentHeight / _this.maxHeight;
          itemContainer.maskRectangle = { x: 0, y: -itemContainer.dy, width: _this.measuredWidth, height: _this.maxHeight };
        });
      }
      this.invalidatePosition();
    };
    Legend2.prototype.toggleDataItem = function(item) {
      var dataContext = item.dataContext;
      if (!dataContext.visible || dataContext.isHiding || dataContext instanceof Sprite && dataContext.isHidden) {
        item.color = item.colorOrig;
        dataContext.appeared = true;
        item.itemContainer.isActive = false;
        if (dataContext.hidden === true) {
          dataContext.hidden = false;
        }
        if (dataContext.show) {
          dataContext.show();
        } else {
          dataContext.visible = true;
        }
        this.svgContainer.readerAlert(this.language.translate("%1 shown", this.language.locale, item.label.readerTitle));
      } else {
        item.itemContainer.isActive = true;
        dataContext.appeared = true;
        if (dataContext.hide) {
          dataContext.hide();
        } else {
          dataContext.visible = false;
        }
        this.svgContainer.readerAlert(this.language.translate("%1 hidden", this.language.locale, item.label.readerTitle));
        item.color = new InterfaceColorSet().getFor("disabledBackground");
      }
    };
    Object.defineProperty(Legend2.prototype, "preloader", {
      /**
       * Override preloader method so that legend does not accidentally show its
       * own preloader.
       *
       * @ignore Exclude from docs
       * @return Always `undefined`
       */
      get: function() {
        return;
      },
      enumerable: true,
      configurable: true
    });
    Legend2.prototype.handleDataItemPropertyChange = function(dataItem, name) {
      dataItem.valueLabel.invalidate();
      dataItem.label.invalidate();
    };
    return Legend2;
  }(Component)
);
registry.registeredClasses["Legend"] = Legend;
defaultRules.push({
  relevant: ResponsiveBreakpoints.widthXS,
  state: function(target, stateId) {
    if (target instanceof Legend && (target.position == "left" || target.position == "right")) {
      var state = target.states.create(stateId);
      state.properties.position = "bottom";
      return state;
    }
    return null;
  }
});
defaultRules.push({
  relevant: ResponsiveBreakpoints.heightXS,
  state: function(target, stateId) {
    if (target instanceof Legend && (target.position == "top" || target.position == "bottom")) {
      var state = target.states.create(stateId);
      state.properties.position = "right";
      return state;
    }
    return null;
  }
});
defaultRules.push({
  relevant: ResponsiveBreakpoints.isXS,
  state: function(target, stateId) {
    if (target instanceof Legend) {
      var state = target.states.create(stateId);
      state.properties.disabled = true;
      return state;
    }
    return null;
  }
});

// node_modules/@amcharts/amcharts4/.internal/charts/series/Series.js
var SeriesDataItem = (
  /** @class */
  function(_super) {
    __extends(SeriesDataItem2, _super);
    function SeriesDataItem2() {
      var _this = _super.call(this) || this;
      _this.className = "SeriesDataItem";
      _this.values.value = {};
      _this.values.value = {};
      _this.applyTheme();
      return _this;
    }
    Object.defineProperty(SeriesDataItem2.prototype, "bullets", {
      /**
       * A dictionary of data items bullets, where key is uid of a bullet template.
       */
      get: function() {
        if (!this._bullets) {
          this._bullets = new Dictionary();
          this._disposers.push(new DictionaryDisposer(this._bullets));
        }
        return this._bullets;
      },
      enumerable: true,
      configurable: true
    });
    SeriesDataItem2.prototype.dispose = function() {
      this.bullets.clear();
      _super.prototype.dispose.call(this);
    };
    Object.defineProperty(SeriesDataItem2.prototype, "value", {
      /**
       * @return Value
       */
      get: function() {
        return this.values.value.value;
      },
      /**
       * data items's numeric value.
       *
       * @param value  Value
       */
      set: function(value) {
        this.setValue("value", value);
      },
      enumerable: true,
      configurable: true
    });
    return SeriesDataItem2;
  }(DataItem)
);
var Series = (
  /** @class */
  function(_super) {
    __extends(Series2, _super);
    function Series2() {
      var _this = _super.call(this) || this;
      _this._ignoreMinMax = false;
      _this._showBullets = true;
      _this.legendSettings = new LegendSettings();
      _this._tmin = new Dictionary();
      _this._tmax = new Dictionary();
      _this._smin = new Dictionary();
      _this._smax = new Dictionary();
      _this.dataItemsByAxis = new Dictionary();
      _this.skipFocusThreshold = 20;
      _this._itemReaderTextChanged = false;
      _this.calculatePercent = false;
      _this.usePercentHack = true;
      _this.autoDispose = true;
      _this.simplifiedProcessing = false;
      if (_this.constructor === Series2) {
        throw new Error("'Series' cannot be instantiated directly. Please use a specific series type.");
      }
      _this.className = "Series";
      _this.isMeasured = false;
      _this.layout = "none";
      _this.shouldClone = false;
      _this.setPropertyValue("hidden", false);
      _this.axisRanges = new List();
      _this.axisRanges.events.on("inserted", _this.processAxisRange, _this, false);
      _this.minBulletDistance = 0;
      _this.mainContainer = _this.createChild(Container);
      _this.mainContainer.shouldClone = false;
      _this.mainContainer.mask = _this.createChild(Sprite);
      _this._disposers.push(_this.mainContainer);
      var bulletsContainer = _this.mainContainer.createChild(Container);
      _this._shouldBeReady.push(bulletsContainer);
      bulletsContainer.shouldClone = false;
      bulletsContainer.layout = "none";
      bulletsContainer.virtualParent = _this;
      _this._disposers.push(bulletsContainer);
      _this.bulletsContainer = bulletsContainer;
      _this.tooltip = new Tooltip();
      _this.tooltip.virtualParent = _this;
      _this._disposers.push(_this.tooltip);
      _this.hiddenState.transitionEasing = cubicIn;
      _this.dataItem = _this.createDataItem();
      _this._disposers.push(_this.dataItem);
      _this.dataItem.component = _this;
      _this.role = "group";
      _this.applyTheme();
      return _this;
    }
    Series2.prototype.applyTheme = function() {
      _super.prototype.applyTheme.call(this);
      if (options.autoSetClassName && this.bulletsContainer) {
        this.bulletsContainer.className = this.className + "-bullets";
        this.bulletsContainer.setClassName();
      }
    };
    Series2.prototype.applyInternalDefaults = function() {
      _super.prototype.applyInternalDefaults.call(this);
      if (!hasValue(this.readerTitle)) {
        this.readerTitle = this.language.translate("Series");
      }
    };
    Series2.prototype.createDataItem = function() {
      return new SeriesDataItem();
    };
    Object.defineProperty(Series2.prototype, "chart", {
      /**
       * @return Chart
       */
      get: function() {
        return this._chart;
      },
      /**
       * Chart series is used on.
       *
       * @param value  Chart
       */
      set: function(value) {
        this._chart = value;
      },
      enumerable: true,
      configurable: true
    });
    Series2.prototype.positionBullet = function(bullet) {
    };
    Series2.prototype.processBullet = function(event) {
      var _this = this;
      var bullet = event.newValue;
      bullet.isTemplate = true;
      this.events.once("datavalidated", function(ev) {
        if (_this.itemsFocusable()) {
          bullet.focusable = true;
        }
      });
      this.invalidate();
    };
    Series2.prototype.removeBullet = function(event) {
      var bullet = event.oldValue;
      this.dataItems.each(function(dataItem) {
        var eachBullet = dataItem.bullets.getKey(bullet.uid);
        if (eachBullet) {
          eachBullet.dispose();
        }
      });
      this.invalidate();
    };
    Series2.prototype.validateDataItems = function() {
      _super.prototype.validateDataItems.call(this);
      this.processValues(false);
    };
    Series2.prototype.getFirstValue = function(key, startIndex) {
      for (var i = startIndex; i >= 0; i--) {
        var dataItem = this.dataItems.getIndex(i);
        var value = dataItem.getActualWorkingValue(key);
        if (isNumber(value)) {
          return value;
        }
      }
      return null;
    };
    Series2.prototype.getAbsoluteFirstValue = function(key) {
      for (var i = 0; i < this.dataItems.length; i++) {
        var dataItem = this.dataItems.getIndex(i);
        var value = dataItem.values[key].value;
        if (isNumber(value)) {
          return value;
        }
      }
      return null;
    };
    Series2.prototype.rangeChangeUpdate = function() {
      _super.prototype.rangeChangeUpdate.call(this);
      this.processValues(true);
    };
    Series2.prototype.processValues = function(working) {
      var _this = this;
      if (!this.simplifiedProcessing) {
        var dataItems = this.dataItems;
        var count_1 = {};
        var sum_1 = {};
        var absoluteSum_1 = {};
        var low_1 = {};
        var high_1 = {};
        var open_1 = {};
        var close_1 = {};
        var previous_1 = {};
        var first_1 = {};
        var absoluteFirst_1 = {};
        var startIndex_1 = max(0, this.startIndex);
        startIndex_1 = min(startIndex_1, this.dataItems.length);
        var endIndex = min(this.endIndex, this.dataItems.length);
        if (!isNumber(startIndex_1)) {
          startIndex_1 = 0;
        }
        if (!isNumber(endIndex)) {
          endIndex = this.dataItems.length;
        }
        if (startIndex_1 > 0) {
          var dataItem_1 = dataItems.getIndex(startIndex_1 - 1);
          each2(dataItem_1.values, function(key, values) {
            var value = dataItem_1.getActualWorkingValue(key);
            if (isNumber(value)) {
              previous_1[key] = value;
            }
          });
        }
        var _loop_1 = function(i2) {
          var dataItem_2 = dataItems.getIndex(i2);
          each2(dataItem_2.values, function(key, values) {
            var value = dataItem_2.getActualWorkingValue(key);
            if (isNumber(value)) {
              if (!isNumber(count_1[key])) {
                count_1[key] = 0;
              }
              count_1[key]++;
              if (!isNumber(sum_1[key])) {
                sum_1[key] = 0;
              }
              sum_1[key] += value;
              if (!isNumber(absoluteSum_1[key])) {
                absoluteSum_1[key] = 0;
              }
              absoluteSum_1[key] += Math.abs(value);
              if (!isNumber(open_1[key])) {
                open_1[key] = value;
              }
              close_1[key] = value;
              if (!isNumber(low_1[key])) {
                low_1[key] = value;
              } else {
                if (low_1[key] > value) {
                  low_1[key] = value;
                }
              }
              if (!isNumber(high_1[key])) {
                high_1[key] = value;
              } else {
                if (high_1[key] < value) {
                  high_1[key] = value;
                }
              }
              if (!isNumber(first_1[key])) {
                first_1[key] = _this.getFirstValue(key, startIndex_1);
              }
              if (!isNumber(absoluteFirst_1[key])) {
                absoluteFirst_1[key] = _this.getAbsoluteFirstValue(key);
              }
              dataItem_2.setCalculatedValue(key, value - first_1[key], "change");
              dataItem_2.setCalculatedValue(key, (value - first_1[key]) / first_1[key] * 100, "changePercent");
              dataItem_2.setCalculatedValue(key, value - absoluteFirst_1[key], "startChange");
              dataItem_2.setCalculatedValue(key, (value - absoluteFirst_1[key]) / absoluteFirst_1[key] * 100, "startChangePercent");
              var prevValue = previous_1[key];
              if (!isNumber(prevValue)) {
                prevValue = value;
              }
              dataItem_2.setCalculatedValue(key, value - prevValue, "previousChange");
              dataItem_2.setCalculatedValue(key, (value - prevValue) / prevValue * 100, "previousChangePercent");
              previous_1[key] = value;
            }
          });
        };
        for (var i = startIndex_1; i < endIndex; i++) {
          _loop_1(i);
        }
        if (this.calculatePercent) {
          var _loop_2 = function(i2) {
            var dataItem_3 = dataItems.getIndex(i2);
            each2(dataItem_3.values, function(key) {
              var ksum = absoluteSum_1[key];
              var value = dataItem_3.getActualWorkingValue(key);
              if (isNumber(value)) {
                if (ksum > 0) {
                  if (_this.usePercentHack) {
                    if (value == ksum) {
                      ksum = dataItem_3.values[key].value;
                    }
                  }
                  var percent2 = value / ksum * 100;
                  dataItem_3.setCalculatedValue(key, percent2, "percent");
                } else {
                  dataItem_3.setCalculatedValue(key, 0, "percent");
                }
              }
            });
          };
          for (var i = startIndex_1; i < endIndex; i++) {
            _loop_2(i);
          }
        }
        if (startIndex_1 > 0) {
          var zeroItem_1 = dataItems.getIndex(startIndex_1 - 1);
          each2(zeroItem_1.values, function(key) {
            var value = zeroItem_1.values[key].value;
            zeroItem_1.setCalculatedValue(key, value - open_1[key], "change");
            zeroItem_1.setCalculatedValue(key, (value - open_1[key]) / open_1[key] * 100, "changePercent");
          });
        }
        var dataItem_4 = this.dataItem;
        each2(dataItem_4.values, function(key) {
          dataItem_4.setCalculatedValue(key, sum_1[key], "sum");
          dataItem_4.setCalculatedValue(key, absoluteSum_1[key], "absoluteSum");
          dataItem_4.setCalculatedValue(key, sum_1[key] / count_1[key], "average");
          dataItem_4.setCalculatedValue(key, open_1[key], "open");
          dataItem_4.setCalculatedValue(key, close_1[key], "close");
          dataItem_4.setCalculatedValue(key, low_1[key], "low");
          dataItem_4.setCalculatedValue(key, high_1[key], "high");
          dataItem_4.setCalculatedValue(key, count_1[key], "count");
        });
      }
    };
    Series2.prototype.validate = function() {
      if (isIE()) {
        this.filters.clear();
      }
      each3(this.axisRanges.iterator(), function(axisRange) {
        axisRange.validate();
      });
      _super.prototype.validate.call(this);
      var bulletsContainer = this.bulletsContainer;
      bulletsContainer.fill = this.fill;
      bulletsContainer.stroke = this.stroke;
      bulletsContainer.x = this.pixelX;
      bulletsContainer.y = this.pixelY;
      if (this.bulletsContainer.children.length > 0) {
        if (this._showBullets) {
          for (var i = 0; i < this.startIndex; i++) {
            var dataItem = this.dataItems.getIndex(i);
            if (dataItem) {
              dataItem.bullets.each(function(key, bullet) {
                bullet.__disabled = true;
              });
            }
          }
          for (var i = this.dataItems.length - 1; i > this.endIndex; i--) {
            var dataItem = this.dataItems.getIndex(i);
            if (dataItem) {
              dataItem.bullets.each(function(key, bullet) {
                bullet.__disabled = true;
              });
            }
          }
        } else {
          this.bulletsContainer.children.each(function(bullet) {
            bullet.__disabled = true;
          });
        }
      }
      this.updateTooltipBounds();
    };
    Series2.prototype.updateTooltipBounds = function() {
      if (this.topParent) {
        var x3 = 0;
        var y3 = 0;
        var w = this.topParent.maxWidth;
        var h = this.topParent.maxHeight;
        var rect = { x: x3, y: y3, width: w, height: h };
        this.tooltip.setBounds(rect);
      }
    };
    Series2.prototype.shouldCreateBullet = function(dataItem, bulletTemplate) {
      return true;
    };
    Series2.prototype.validateDataElement = function(dataItem) {
      var _this = this;
      _super.prototype.validateDataElement.call(this, dataItem);
      if (this._showBullets) {
        if (!this.isHidden) {
          this.bulletsContainer.visible = true;
        }
        this.bullets.each(function(bulletTemplate) {
          var bullet = dataItem.bullets.getKey(bulletTemplate.uid);
          if (_this.shouldCreateBullet(dataItem, bulletTemplate)) {
            if (!bullet) {
              var disabledField = bulletTemplate.propertyFields.disabled;
              var dataContext = dataItem.dataContext;
              if (disabledField && dataContext && dataContext[disabledField] === false) {
                bulletTemplate.applyOnClones = false;
                bulletTemplate.disabled = false;
                bullet = bulletTemplate.clone();
                bulletTemplate.disabled = true;
                bulletTemplate.applyOnClones = true;
              } else {
                bullet = bulletTemplate.clone();
              }
              bullet.shouldClone = false;
              dataItem.addSprite(bullet);
              if (!_this.visible || _this.isHiding) {
                bullet.hide(0);
              }
            }
            var currentDataItem = bullet.dataItem;
            if (currentDataItem != dataItem) {
              if (currentDataItem) {
                currentDataItem.bullets.setKey(bulletTemplate.uid, void 0);
              }
              var readerText_1 = _this.itemReaderText;
              if (bullet instanceof Bullet) {
                if (!readerText_1) {
                  readerText_1 = "{" + bullet.xField + "}: {" + bullet.yField + "}";
                }
                if (bullet.isDynamic) {
                  dataItem.events.on("workingvaluechanged", bullet.deepInvalidate, bullet, false);
                  _this.dataItem.events.on("workingvaluechanged", bullet.deepInvalidate, bullet, false);
                }
                bullet.deepInvalidate();
              }
              if (bullet.focusable) {
                bullet.events.on("focus", function(ev) {
                  bullet.readerTitle = _this.populateString(readerText_1, bullet.dataItem);
                }, void 0, false);
                bullet.events.on("blur", function(ev) {
                  bullet.readerTitle = "";
                }, void 0, false);
              }
              if (bullet.hoverable) {
                bullet.events.on("over", function(ev) {
                  bullet.readerTitle = _this.populateString(readerText_1, bullet.dataItem);
                }, void 0, false);
                bullet.events.on("out", function(ev) {
                  bullet.readerTitle = "";
                }, void 0, false);
              }
            }
            bullet.parent = _this.bulletsContainer;
            dataItem.bullets.setKey(bulletTemplate.uid, bullet);
            bullet.maxWidth = dataItem.itemWidth;
            bullet.maxHeight = dataItem.itemHeight;
            bullet.__disabled = false;
            _this.positionBullet(bullet);
          } else {
            if (bullet) {
              bullet.__disabled = true;
            }
          }
        });
      } else {
        this.bulletsContainer.visible = false;
      }
    };
    Series2.prototype.handleDataItemWorkingValueChange = function(dataItem, name) {
      if (!this.dataRangeInvalid) {
        this.invalidateProcessedData();
      }
    };
    Object.defineProperty(Series2.prototype, "ignoreMinMax", {
      /**
       * @return Exclude from calculations?
       */
      get: function() {
        return this._ignoreMinMax;
      },
      /**
       * Should this series excluded from the axis scale calculations?
       *
       * @default false
       * @param value  Exclude from calculations?
       */
      set: function(value) {
        this._ignoreMinMax = value;
        this.invalidateDataItems();
      },
      enumerable: true,
      configurable: true
    });
    Series2.prototype.createMask = function() {
    };
    Series2.prototype.processAxisRange = function(event) {
      if (!this.rangesContainer) {
        this.rangesContainer = this.createChild(Container);
        this.rangesContainer.shouldClone = false;
        this.rangesContainer.isMeasured = false;
      }
      var axisRange = event.newValue;
      if (axisRange) {
        axisRange.contents.parent = this.rangesContainer;
        axisRange.isRange = true;
        axisRange.events.on("valuechanged", this.invalidateDataItems, this, false);
      }
    };
    Series2.prototype.getAxisField = function(axis) {
      return;
    };
    Series2.prototype.showTooltipAtPosition = function(xPosition, yPosition) {
    };
    Object.defineProperty(Series2.prototype, "minBulletDistance", {
      /**
       * @return Distance (px)
       */
      get: function() {
        return this.getPropertyValue("minBulletDistance");
      },
      /**
       * Minimal distance between data points in pixels.
       *
       * If distance gets smaller than this, bullets are turned off to avoid
       * overlapping.
       *
       * `0` (zero) disables this behavior.
       *
       * IMPORTANT: This setting will work only when Series' base axis
       * is [[CategoryAxis]] or [[DateAxis]]. If base axis is [[ValueAxis]] the
       * setting will be ignored, because it would be a huge overhead to measure
       * distance between each and every bullet.
       *
       * @default 0
       * @param value  Distance (px)
       */
      set: function(value) {
        this.setPropertyValue("minBulletDistance", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Series2.prototype, "bullets", {
      /**
       * A list of bullets that will be added to each and every items in the
       * series.
       *
       * You can push any object that is a descendant of a [[Sprite]] here. All
       * items added to this list will be copied and used as a bullet on all data
       * items, including their properties, events, etc.
       *
       * @see {@link https://www.amcharts.com/docs/v4/concepts/bullets/} for more info about the concept of Bullets
       * @return List of bullets.
       */
      get: function() {
        if (!this._bullets) {
          this._bullets = new ListTemplate(new Bullet());
          this._bullets.template.virtualParent = this;
          this._bullets.events.on("inserted", this.processBullet, this, false);
          this._bullets.events.on("removed", this.removeBullet, this, false);
          this._disposers.push(new ListDisposer(this._bullets));
          this._disposers.push(this._bullets.template);
        }
        return this._bullets;
      },
      enumerable: true,
      configurable: true
    });
    Series2.prototype.createLegendMarker = function(marker) {
    };
    Object.defineProperty(Series2.prototype, "hiddenInLegend", {
      /**
       * @return Hidden in legend?
       */
      get: function() {
        return this.getPropertyValue("hiddenInLegend");
      },
      /**
       * Should the series be hidden in legend?
       *
       * @param value Hidden in legend?
       */
      set: function(value) {
        if (this.setPropertyValue("hiddenInLegend", value)) {
          if (this.chart) {
            this.chart.feedLegend();
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Series2.prototype, "name", {
      /**
       * @return Name
       */
      get: function() {
        return this.getPropertyValue("name");
      },
      /**
       * Series' name.
       *
       * @param value  Name
       */
      set: function(value) {
        this.setPropertyValue("name", value);
        var legendDataItem = this.legendDataItem;
        if (legendDataItem) {
          legendDataItem.component.invalidate();
          legendDataItem.component.invalidateRawData();
        }
        this.readerTitle = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Series2.prototype, "itemReaderText", {
      /**
       * @return Screen reader text template
       */
      get: function() {
        var readerText = this._itemReaderText;
        if (!readerText) {
          if (this.tooltipText) {
            readerText = plainText(this.tooltipText);
          } else if (this.tooltipHTML) {
            readerText = plainText(this.tooltipHTML);
          }
        }
        if (!this._adapterO) {
          return readerText;
        } else {
          return this._adapterO.apply("itemReaderText", readerText);
        }
      },
      /**
       * Screen reader text to be applied to each individual data item, such
       * as bullets, columns or slices.
       *
       * The template can contain field reference meta codes, i.e. `{dateX}`,
       * `{valueY}`, etc.
       *
       * Any text formatting options, e.g. `[bold]` will be ignored.
       *
       * @param value Screen reader text template
       */
      set: function(value) {
        this._itemReaderText = value;
        this._itemReaderTextChanged = true;
      },
      enumerable: true,
      configurable: true
    });
    Series2.prototype.itemsFocusable = function() {
      return this.dataItems.length >= this.skipFocusThreshold ? false : true;
    };
    Object.defineProperty(Series2.prototype, "legendDataItem", {
      /**
       * @return Data item
       */
      get: function() {
        return this._legendDataItem;
      },
      /**
       * Legend data item that corresponds to this series.
       *
       * @param value  Data item
       */
      set: function(value) {
        this._legendDataItem = value;
        this._legendDataItem.itemContainer.deepInvalidate();
      },
      enumerable: true,
      configurable: true
    });
    Series2.prototype.updateLegendValue = function(dataItem, notRange) {
      if (this.legendDataItem) {
        var legendSettings = this.legendSettings;
        var legendDataItem = this.legendDataItem;
        var label = legendDataItem.label;
        var valueLabel = legendDataItem.valueLabel;
        if (dataItem && !dataItem.isDisposed() || notRange) {
          if (valueLabel) {
            if (legendSettings.itemValueText) {
              valueLabel.text = legendSettings.itemValueText;
            }
            valueLabel.dataItem = dataItem;
          }
          if (label) {
            if (legendSettings.itemLabelText) {
              label.text = legendSettings.itemLabelText;
            }
            label.dataItem = dataItem;
          }
        } else {
          if (label) {
            if (legendSettings.labelText || legendSettings.itemLabelText != void 0) {
              label.text = legendSettings.labelText;
            }
            label.dataItem = this.dataItem;
          }
          if (valueLabel) {
            if (legendSettings.valueText || legendSettings.itemValueText != void 0) {
              valueLabel.text = legendSettings.valueText;
            }
            valueLabel.dataItem = this.dataItem;
          }
        }
      }
    };
    Series2.prototype.copyFrom = function(source) {
      this.bullets.copyFrom(source.bullets);
      this.bulletsContainer.copyFrom(source.bulletsContainer);
      this.calculatePercent = source.calculatePercent;
      this.usePercentHack = source.usePercentHack;
      this.simplifiedProcessing = source.simplifiedProcessing;
      _super.prototype.copyFrom.call(this, source);
    };
    Series2.prototype.raiseCriticalError = function(e) {
      if (this._chart && this._chart.modal) {
        this._chart.modal.content = this._chart.adapter.apply("criticalError", e).message;
        this._chart.modal.closable = false;
        if (!options.suppressErrors) {
          this._chart.modal.open();
        }
        this._chart.disabled = true;
      }
      if (options.verbose) {
        console.log(e);
      }
    };
    Series2.prototype.applyFilters = function() {
      var _this = this;
      _super.prototype.applyFilters.call(this);
      this.bulletsContainer.filters.clear();
      each3(this.filters.iterator(), function(filter) {
        _this.bulletsContainer.filters.push(filter.clone());
      });
    };
    Object.defineProperty(Series2.prototype, "heatRules", {
      /**
       * A list of heat rules to apply to series' elements based on the value
       * of the data item.
       *
       * Heat rules can be any "numeric" (including `Color`) property, and can also
       * be applied to child objects of series, like columns, bullets, etc.
       *
       * E.g.:
       *
       * ```TypeScript
       * series.heatRules.push({
       *  "target": series.columns.template,
       *  "property": "fill",
       *  "min": am4core.color("#F5DBCB"),
       *  "max": am4core.color("#ED7B84"),
       *  "dataField": "valueY"
       *});
       *```
       * ```Javacript
       * series.heatRules.push({
       *  "target": series.columns.template,
       *  "property": "fill",
       *  "min": am4core.color("#F5DBCB"),
       *  "max": am4core.color("#ED7B84"),
       *  "dataField": "valueY"
       *});
       *```
       *```JSON
       *{
       *  // ...
       *  "series": [{
       *    "type": "ColumnSeries",
       *    "heatRules": [{
       *      "target": "columns.template",
       *      "property": "fill",
       *      "min": "#F5DBCB",
       *      "max": "#ED7B84",
       *      "dataField": "valueY"
       *    }]
       *  }]
       *}
       *```
       *
       * @see {@link https://www.amcharts.com/docs/v4/concepts/series/#Heat_maps} for more about heat rules
       * @return  Heat rules
       */
      get: function() {
        var _this = this;
        if (!this._heatRules) {
          this._heatRules = new List();
          this._heatRules.events.on("inserted", function(event) {
            var heatRule = event.newValue;
            var target = heatRule.target;
            if (target) {
              var dataField_1 = heatRule.dataField;
              if (!hasValue(dataField_1)) {
                dataField_1 = "value";
              }
              var seriesDataItem_1 = _this.dataItem;
              var property_1 = heatRule.property;
              var minValue = toNumber(heatRule.minValue);
              var maxValue = toNumber(heatRule.maxValue);
              if (!isNumber(minValue) && !isNumber(maxValue)) {
                _this.dataItem.events.on("calculatedvaluechanged", function(event2) {
                  if (event2.property == dataField_1) {
                    each3(_this.dataItems.iterator(), function(dataItem) {
                      var foundSprite = false;
                      each(dataItem.sprites, function(sprite) {
                        if (sprite.clonedFrom == target) {
                          var anySprite = sprite;
                          anySprite[property_1] = anySprite[property_1];
                          foundSprite = true;
                        }
                      });
                      if (!foundSprite) {
                        each(dataItem.sprites, function(sprite) {
                          if (sprite instanceof Container) {
                            each3(sprite.children.iterator(), function(child) {
                              if (child.className == target.className) {
                                var anyChild = child;
                                anyChild[property_1] = anyChild[property_1];
                              } else if (child instanceof Container) {
                                child.deepInvalidate();
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
              _this.dataItems.template.events.on("workingvaluechanged", function(event2) {
                if (event2.property == dataField_1) {
                  var dataItem = event2.target;
                  var foundSprite_1 = false;
                  each(dataItem.sprites, function(sprite) {
                    if (sprite.clonedFrom == target) {
                      var anySprite = sprite;
                      anySprite[property_1] = anySprite[property_1];
                      foundSprite_1 = true;
                    }
                  });
                  if (!foundSprite_1) {
                    each(dataItem.sprites, function(sprite) {
                      if (sprite instanceof Container) {
                        each3(sprite.children.iterator(), function(child) {
                          if (child.className == target.className) {
                            var anyChild = child;
                            anyChild[property_1] = anyChild[property_1];
                          } else if (child instanceof Container) {
                            child.deepInvalidate();
                          }
                        });
                      }
                    });
                  }
                }
              });
              target.adapter.add(property_1, function(value, ruleTarget, property) {
                var minValue2 = toNumber(heatRule.minValue);
                var maxValue2 = toNumber(heatRule.maxValue);
                var min2 = heatRule.min;
                var max2 = heatRule.max;
                if (ruleTarget instanceof Sprite) {
                  var anySprite = ruleTarget;
                  var propertyField = anySprite.propertyFields[property];
                  if (propertyField && ruleTarget.dataItem) {
                    var dataContext = ruleTarget.dataItem.dataContext;
                    if (dataContext && hasValue(dataContext[propertyField])) {
                      return value;
                    }
                  }
                }
                var dataItem = ruleTarget.dataItem;
                if (!isNumber(minValue2)) {
                  minValue2 = seriesDataItem_1.values[dataField_1].low;
                }
                if (!isNumber(maxValue2)) {
                  maxValue2 = seriesDataItem_1.values[dataField_1].high;
                }
                if (dataItem) {
                  var fieldValues = dataItem.values[dataField_1];
                  if (fieldValues) {
                    var workingValue = dataItem.getActualWorkingValue(dataField_1);
                    if (hasValue(min2) && hasValue(max2) && isNumber(minValue2) && isNumber(maxValue2) && isNumber(workingValue)) {
                      var percent2 = void 0;
                      if (heatRule.logarithmic) {
                        percent2 = (Math.log(workingValue) * Math.LOG10E - Math.log(minValue2) * Math.LOG10E) / (Math.log(maxValue2) * Math.LOG10E - Math.log(minValue2) * Math.LOG10E);
                      } else {
                        percent2 = (workingValue - minValue2) / (maxValue2 - minValue2);
                      }
                      if (isNumber(workingValue) && (!isNumber(percent2) || Math.abs(percent2) == Infinity)) {
                        percent2 = 0.5;
                      }
                      if (isNumber(min2)) {
                        return min2 + (max2 - min2) * percent2;
                      } else if (min2 instanceof Color) {
                        return new Color(interpolate(min2.rgb, max2.rgb, percent2));
                      }
                    }
                  }
                }
                return value;
              });
            }
          });
        }
        return this._heatRules;
      },
      enumerable: true,
      configurable: true
    });
    Series2.prototype.processConfig = function(config) {
      var heatRules;
      if (config) {
        if (hasValue(config.bullets) && isArray(config.bullets)) {
          for (var i = 0, len = config.bullets.length; i < len; i++) {
            var bullets = config.bullets[i];
            if (!hasValue(bullets.type)) {
              bullets.type = "Bullet";
            }
          }
        }
        if (hasValue(config.heatRules) && isArray(config.heatRules)) {
          heatRules = config.heatRules;
          delete config.heatRules;
        }
      }
      _super.prototype.processConfig.call(this, config);
      if (heatRules) {
        for (var i = 0, len = heatRules.length; i < len; i++) {
          var rule = heatRules[i];
          var target = this;
          if (hasValue(rule.target) && isString(rule.target)) {
            if (this.map.hasKey(rule.target)) {
              target = this.map.getKey(rule.target);
            } else {
              var parts = rule.target.split(".");
              for (var x3 = 0; x3 < parts.length; x3++) {
                if (target instanceof List) {
                  var listitem = target.getIndex(toNumber(parts[x3]));
                  if (!listitem) {
                    target = target[parts[x3]];
                  } else {
                    target = listitem;
                  }
                } else {
                  var maybeIndex = parts[x3].match(/^(.*)\[([0-9]+)\]/);
                  if (maybeIndex) {
                    if (target[maybeIndex[1]] instanceof List) {
                      target = target[maybeIndex[1]].getIndex(toNumber(maybeIndex[2]));
                    } else {
                      target = target[maybeIndex[1]][toNumber(maybeIndex[2])];
                    }
                  } else {
                    target = target[parts[x3]];
                  }
                }
              }
            }
          }
          rule.target = target;
          if (hasValue(rule.min)) {
            rule.min = this.maybeColorOrPercent(rule.min);
          }
          if (hasValue(rule.max)) {
            rule.max = this.maybeColorOrPercent(rule.max);
          }
        }
        _super.prototype.processConfig.call(this, {
          heatRules
        });
      }
    };
    Series2.prototype.configOrder = function(a2, b) {
      if (a2 == b) {
        return 0;
      } else if (a2 == "heatRules") {
        return 1;
      } else if (b == "heatRules") {
        return -1;
      } else {
        return _super.prototype.configOrder.call(this, a2, b);
      }
    };
    Series2.prototype.setVisibility = function(value) {
      _super.prototype.setVisibility.call(this, value);
      this.bulletsContainer.visible = value;
    };
    return Series2;
  }(Component)
);
registry.registeredClasses["Series"] = Series;
registry.registeredClasses["SeriesDataItem"] = SeriesDataItem;

// node_modules/@amcharts/amcharts4/.internal/charts/types/SerialChart.js
var SerialChartDataItem = (
  /** @class */
  function(_super) {
    __extends(SerialChartDataItem2, _super);
    function SerialChartDataItem2() {
      var _this = _super.call(this) || this;
      _this.className = "SerialChartDataItem";
      _this.applyTheme();
      return _this;
    }
    return SerialChartDataItem2;
  }(ChartDataItem)
);
var SerialChart = (
  /** @class */
  function(_super) {
    __extends(SerialChart2, _super);
    function SerialChart2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this._exitDP = {};
      _this.className = "SerialChart";
      _this.colors = new ColorSet();
      _this._usesData = false;
      var seriesContainer = _this.chartContainer.createChild(Container);
      seriesContainer.shouldClone = false;
      seriesContainer.width = percent(100);
      seriesContainer.height = percent(100);
      seriesContainer.isMeasured = false;
      seriesContainer.layout = "none";
      seriesContainer.zIndex = 2;
      _this.seriesContainer = seriesContainer;
      var bulletsContainer = _this.chartContainer.createChild(Container);
      bulletsContainer.shouldClone = false;
      bulletsContainer.width = percent(100);
      bulletsContainer.height = percent(100);
      bulletsContainer.isMeasured = false;
      bulletsContainer.zIndex = 3;
      bulletsContainer.layout = "none";
      _this.bulletsContainer = bulletsContainer;
      _this.applyTheme();
      return _this;
    }
    SerialChart2.prototype.dispose = function() {
      _super.prototype.dispose.call(this);
      if (this.colors) {
        this.colors.dispose();
      }
      if (this.patterns) {
        this.patterns.dispose();
      }
    };
    SerialChart2.prototype.applyInternalDefaults = function() {
      _super.prototype.applyInternalDefaults.call(this);
      if (!hasValue(this.readerTitle)) {
        this.readerTitle = this.language.translate("Serial chart");
      }
    };
    Object.defineProperty(SerialChart2.prototype, "series", {
      /**
       * A list of chart's series.
       *
       * @return Chart's series
       */
      get: function() {
        if (!this._series) {
          this._series = new ListTemplate(this.createSeries());
          this._series.events.on("inserted", this.handleSeriesAdded, this, false);
          this._series.events.on("removed", this.handleSeriesRemoved, this, false);
          this._disposers.push(new ListDisposer(this._series, false));
          this._disposers.push(this._series.template);
        }
        return this._series;
      },
      enumerable: true,
      configurable: true
    });
    SerialChart2.prototype.handleSeriesRemoved = function(event) {
      var series = event.oldValue;
      this.dataUsers.removeValue(series);
      this.dataUsers.each(function(dataUser) {
        dataUser.invalidateDataItems();
      });
      if (this._exitDP[series.uid]) {
        this._exitDP[series.uid].dispose();
        delete this._exitDP[series.uid];
      }
      if (series.autoDispose) {
        series.dispose();
      } else {
        series.parent = void 0;
        series.bulletsContainer.parent = void 0;
      }
      var legend = this.legend;
      if (legend) {
        var dataItems = this.legend.dataItems;
        for (var i = dataItems.length - 1; i >= 0; i--) {
          var dataItem = dataItems.getIndex(i);
          if (dataItem && dataItem.dataContext == series) {
            legend.dataItems.remove(dataItem);
          }
        }
        for (var i = legend.data.length - 1; i >= 0; i--) {
          var di = legend.data[i];
          if (di && di == series) {
            remove(legend.data, di);
          }
        }
      }
    };
    SerialChart2.prototype.handleSeriesAdded = function(event) {
      var _this = this;
      var series = event.newValue;
      if (series.isDisposed()) {
        return;
      }
      series.chart = this;
      series.parent = this.seriesContainer;
      series.bulletsContainer.parent = this.bulletsContainer;
      this._dataUsers.moveValue(series);
      series.addDisposer(new Disposer(function() {
        _this.dataUsers.removeValue(series);
      }));
      this.handleSeriesAdded2(series);
      this.handleLegendSeriesAdded(series);
    };
    SerialChart2.prototype.handleLegendSeriesAdded = function(series) {
      if (!series.hiddenInLegend) {
        if (this.legend) {
          this.legend.addData(series);
        }
      }
    };
    SerialChart2.prototype.handleSeriesAdded2 = function(series) {
      var _this = this;
      if (!this.dataInvalid) {
        this._exitDP[series.uid] = registry.events.once("exitframe", function() {
          if (!series.data || series.data.length == 0) {
            series.data = _this.data;
            if (series.showOnInit) {
              series.reinit();
              series.setPropertyValue("showOnInit", false);
              series.showOnInit = true;
            }
            if (!series.isDisposed()) {
              series.events.once("datavalidated", function() {
                if (series.data == _this.data) {
                  series._data = [];
                }
              });
            }
          }
        });
        this._disposers.push(this._exitDP[series.uid]);
      }
    };
    SerialChart2.prototype.feedLegend = function() {
      var legend = this.legend;
      if (legend) {
        var legendData_1 = [];
        each3(this.series.iterator(), function(series) {
          if (!series.hiddenInLegend) {
            legendData_1.push(series);
          }
        });
        legend.dataFields.name = "name";
        legend.data = legendData_1;
      }
    };
    SerialChart2.prototype.createSeries = function() {
      return new Series();
    };
    Object.defineProperty(SerialChart2.prototype, "colors", {
      /**
       * @return Color list
       */
      get: function() {
        return this.getPropertyValue("colors");
      },
      /**
       * Chart's color list.
       *
       * This list can be used by a number of serial items, like applying a new
       * color for each Series added. Or, applying a new color for each slice
       * of a Pie chart.
       *
       * Please see [[ColorSet]] for information on how you can set up to generate
       * unique colors.
       *
       * A theme you are using may override default pre-defined colors.
       *
       * @param value Color list
       */
      set: function(value) {
        this.setPropertyValue("colors", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(SerialChart2.prototype, "patterns", {
      /**
       * @return Pattern set
       */
      get: function() {
        return this.getPropertyValue("patterns");
      },
      /**
       * A [[PatternSet]] to use when creating patterned fills for slices.
       *
       * @since 4.7.5
       * @param value  Pattern set
       */
      set: function(value) {
        this.setPropertyValue("patterns", value, true);
      },
      enumerable: true,
      configurable: true
    });
    SerialChart2.prototype.copyFrom = function(source) {
      _super.prototype.copyFrom.call(this, source);
      this.series.copyFrom(source.series);
    };
    SerialChart2.prototype.appear = function() {
      _super.prototype.appear.call(this);
      this.series.each(function(series) {
        if (series.showOnInit && series.inited) {
          series.appear();
        }
      });
    };
    return SerialChart2;
  }(Chart)
);
registry.registeredClasses["SerialChart"] = SerialChart;

// node_modules/@amcharts/amcharts4/.internal/plugins/forceDirected/ForceDirectedNode.js
var ForceDirectedNode = (
  /** @class */
  function(_super) {
    __extends(ForceDirectedNode2, _super);
    function ForceDirectedNode2() {
      var _this = _super.call(this) || this;
      _this.className = "ForceDirectedNode";
      _this.applyOnClones = true;
      _this.togglable = true;
      _this.draggable = true;
      _this.setStateOnChildren = true;
      _this.isActive = false;
      _this.expandAll = true;
      _this.paddingRadius = 0;
      _this.linksWith = new Dictionary();
      _this._disposers.push(new DictionaryDisposer(_this.linksWith));
      _this.events.on("dragstart", function() {
        if (_this.dataItem.component) {
          _this.dataItem.component.nodeDragStarted();
        }
      }, _this, false);
      _this.events.on("drag", function() {
        _this.updateSimulation();
      }, _this, false);
      var outerCircle = _this.createChild(Circle);
      outerCircle.shouldClone = false;
      outerCircle.strokeWidth = 2;
      outerCircle.nonScalingStroke = true;
      var bgColor = new InterfaceColorSet().getFor("background");
      outerCircle.fill = bgColor;
      _this.outerCircle = outerCircle;
      var hoverState = outerCircle.states.create("hover");
      hoverState.properties.scale = 1.1;
      var outerActiveState = outerCircle.states.create("active");
      outerActiveState.properties.scale = 1.1;
      outerActiveState.properties.visible = true;
      var activeHoverState = outerCircle.states.create("hoverActive");
      activeHoverState.properties.scale = 1;
      var circle = _this.createChild(Circle);
      var activeState = circle.states.create("active");
      activeState.properties.visible = true;
      circle.shouldClone = false;
      circle.interactionsEnabled = false;
      circle.hiddenState.properties.radius = 0.01;
      circle.events.on("validated", _this.updateSimulation, _this, false);
      circle.hiddenState.properties.visible = true;
      _this.circle = circle;
      _this.addDisposer(circle.events.on("validated", _this.updateLabelSize, _this, false));
      _this._disposers.push(_this.circle);
      var label = _this.createChild(Label);
      label.shouldClone = false;
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.fill = bgColor;
      label.strokeOpacity = 0;
      label.interactionsEnabled = false;
      label.textAlign = "middle";
      label.textValign = "middle";
      label.nonScaling = true;
      _this.label = label;
      _this.adapter.add("tooltipY", function(y3, target) {
        return -target.circle.pixelRadius;
      });
      return _this;
    }
    ForceDirectedNode2.prototype.updateLabelSize = function() {
      if (this.label.text) {
        var circle = this.circle;
        var radius = circle.pixelRadius;
        var ds = circle.defaultState;
        var dsRadius = ds.properties.radius;
        if (isNumber(dsRadius)) {
          radius = dsRadius;
        }
        var scale = 1;
        if (this.parent && this.parent.parent) {
          scale = this.parent.parent.scale;
        }
        this.label.width = 2 * radius * scale;
        this.label.height = 2 * radius * scale;
      }
    };
    ForceDirectedNode2.prototype.copyFrom = function(source) {
      _super.prototype.copyFrom.call(this, source);
      if (this.circle) {
        this.circle.copyFrom(source.circle);
      }
      if (this.label) {
        this.label.copyFrom(source.label);
      }
      if (this.outerCircle) {
        this.outerCircle.copyFrom(source.outerCircle);
      }
    };
    ForceDirectedNode2.prototype.setActive = function(value) {
      var _this = this;
      _super.prototype.setActive.call(this, value);
      var dataItem = this.dataItem;
      if (dataItem) {
        var children = dataItem.children;
        var component = dataItem.component;
        if (!component.dataItemsInvalid) {
          if (value && children && !dataItem.childrenInited) {
            component.initNode(dataItem);
            component.updateNodeList();
          }
          if (value) {
            this.show();
            if (children) {
              children.each(function(child) {
                child.node.show();
                child.node.interactionsEnabled = true;
                if (child.parentLink) {
                  child.parentLink.show();
                }
                if (_this.expandAll) {
                  child.node.isActive = true;
                } else {
                  child.node.isActive = false;
                }
              });
            }
            dataItem.dispatchVisibility(true);
          } else {
            if (children) {
              children.each(function(child) {
                if (child.parentLink) {
                  child.parentLink.hide();
                }
                child.node.isActive = false;
                child.node.interactionsEnabled = false;
                child.node.hide();
              });
            }
            dataItem.dispatchVisibility(false);
          }
        }
      }
      this.updateSimulation();
    };
    ForceDirectedNode2.prototype.updateSimulation = function() {
      var dataItem = this.dataItem;
      if (dataItem && dataItem.component) {
        dataItem.component.restartSimulation();
      }
    };
    Object.defineProperty(ForceDirectedNode2.prototype, "expandAll", {
      /**
       * @return Expand all?
       */
      get: function() {
        return this.getPropertyValue("expandAll");
      },
      /**
       * If set to `true` (default) toggling a node on will automatically expand
       * all nodes across the whole tree (all levels) of its descendants.
       *
       * Setting to `false` will only expand immediate children (one level).
       *
       * @default true
       * @since 4.4.8
       * @param  value  Expand all?
       */
      set: function(value) {
        this.setPropertyValue("expandAll", value);
      },
      enumerable: true,
      configurable: true
    });
    ForceDirectedNode2.prototype.linkWith = function(node, strength) {
      var link = this.linksWith.getKey(node.uid);
      if (!link) {
        link = node.linksWith.getKey(this.uid);
      }
      if (!link) {
        var dataItem = this.dataItem;
        var component = dataItem.component;
        link = component.links.create();
        link.parent = component;
        link.zIndex = -1;
        link.source = this;
        link.target = node;
        link.stroke = dataItem.node.fill;
        link.dataItem = node.dataItem;
        if (isNumber(strength)) {
          link.strength = strength;
        }
        var nodeIndex = component.nodes.indexOf(dataItem.node);
        var childIndex = component.nodes.indexOf(node);
        node.dataItem.childLinks.push(link);
        node.linksWith.setKey(this.uid, link);
        component.forceLinks.push({ source: nodeIndex, target: childIndex });
        component.updateNodeList();
        dataItem.childLinks.push(link);
        this.linksWith.setKey(node.uid, link);
      }
      return link;
    };
    ForceDirectedNode2.prototype.unlinkWith = function(node) {
      this.linksWith.removeKey(node.uid);
    };
    Object.defineProperty(ForceDirectedNode2.prototype, "paddingRadius", {
      /**
       * @return Padding radius
       */
      get: function() {
        return this.getPropertyValue("paddingRadius");
      },
      /**
       * Padding of the nodes, in pixels.
       *
       * @since 4.6.7
       * @default 0
       * @param  value  padding radius
       */
      set: function(value) {
        this.setPropertyValue("paddingRadius", value);
      },
      enumerable: true,
      configurable: true
    });
    return ForceDirectedNode2;
  }(Container)
);
registry.registeredClasses["ForceDirectedNode"] = ForceDirectedNode;

// node_modules/d3-quadtree/src/add.js
function add_default(d) {
  const x3 = +this._x.call(null, d), y3 = +this._y.call(null, d);
  return add(this.cover(x3, y3), x3, y3, d);
}
function add(tree, x3, y3, d) {
  if (isNaN(x3) || isNaN(y3))
    return tree;
  var parent, node = tree._root, leaf = { data: d }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
  if (!node)
    return tree._root = leaf, tree;
  while (node.length) {
    if (right = x3 >= (xm = (x0 + x1) / 2))
      x0 = xm;
    else
      x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2))
      y0 = ym;
    else
      y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right]))
      return parent[i] = leaf, tree;
  }
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x3 === xp && y3 === yp)
    return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x3 >= (xm = (x0 + x1) / 2))
      x0 = xm;
    else
      x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2))
      y0 = ym;
    else
      y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
  return parent[j] = node, parent[i] = leaf, tree;
}
function addAll(data) {
  var d, i, n = data.length, x3, y3, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (i = 0; i < n; ++i) {
    if (isNaN(x3 = +this._x.call(null, d = data[i])) || isNaN(y3 = +this._y.call(null, d)))
      continue;
    xz[i] = x3;
    yz[i] = y3;
    if (x3 < x0)
      x0 = x3;
    if (x3 > x1)
      x1 = x3;
    if (y3 < y0)
      y0 = y3;
    if (y3 > y1)
      y1 = y3;
  }
  if (x0 > x1 || y0 > y1)
    return this;
  this.cover(x0, y0).cover(x1, y1);
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }
  return this;
}

// node_modules/d3-quadtree/src/cover.js
function cover_default(x3, y3) {
  if (isNaN(x3 = +x3) || isNaN(y3 = +y3))
    return this;
  var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x3)) + 1;
    y1 = (y0 = Math.floor(y3)) + 1;
  } else {
    var z = x1 - x0 || 1, node = this._root, parent, i;
    while (x0 > x3 || x3 >= x1 || y0 > y3 || y3 >= y1) {
      i = (y3 < y0) << 1 | x3 < x0;
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0:
          x1 = x0 + z, y1 = y0 + z;
          break;
        case 1:
          x0 = x1 - z, y1 = y0 + z;
          break;
        case 2:
          x1 = x0 + z, y0 = y1 - z;
          break;
        case 3:
          x0 = x1 - z, y0 = y1 - z;
          break;
      }
    }
    if (this._root && this._root.length)
      this._root = node;
  }
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

// node_modules/d3-quadtree/src/data.js
function data_default() {
  var data = [];
  this.visit(function(node) {
    if (!node.length)
      do
        data.push(node.data);
      while (node = node.next);
  });
  return data;
}

// node_modules/d3-quadtree/src/extent.js
function extent_default(_) {
  return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}

// node_modules/d3-quadtree/src/quad.js
function quad_default(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

// node_modules/d3-quadtree/src/find.js
function find_default(x3, y3, radius) {
  var data, x0 = this._x0, y0 = this._y0, x1, y1, x22, y22, x32 = this._x1, y32 = this._y1, quads = [], node = this._root, q, i;
  if (node)
    quads.push(new quad_default(node, x0, y0, x32, y32));
  if (radius == null)
    radius = Infinity;
  else {
    x0 = x3 - radius, y0 = y3 - radius;
    x32 = x3 + radius, y32 = y3 + radius;
    radius *= radius;
  }
  while (q = quads.pop()) {
    if (!(node = q.node) || (x1 = q.x0) > x32 || (y1 = q.y0) > y32 || (x22 = q.x1) < x0 || (y22 = q.y1) < y0)
      continue;
    if (node.length) {
      var xm = (x1 + x22) / 2, ym = (y1 + y22) / 2;
      quads.push(
        new quad_default(node[3], xm, ym, x22, y22),
        new quad_default(node[2], x1, ym, xm, y22),
        new quad_default(node[1], xm, y1, x22, ym),
        new quad_default(node[0], x1, y1, xm, ym)
      );
      if (i = (y3 >= ym) << 1 | x3 >= xm) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    } else {
      var dx = x3 - +this._x.call(null, node.data), dy = y3 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x3 - d, y0 = y3 - d;
        x32 = x3 + d, y32 = y3 + d;
        data = node.data;
      }
    }
  }
  return data;
}

// node_modules/d3-quadtree/src/remove.js
function remove_default(d) {
  if (isNaN(x3 = +this._x.call(null, d)) || isNaN(y3 = +this._y.call(null, d)))
    return this;
  var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x3, y3, xm, ym, right, bottom, i, j;
  if (!node)
    return this;
  if (node.length)
    while (true) {
      if (right = x3 >= (xm = (x0 + x1) / 2))
        x0 = xm;
      else
        x1 = xm;
      if (bottom = y3 >= (ym = (y0 + y1) / 2))
        y0 = ym;
      else
        y1 = ym;
      if (!(parent = node, node = node[i = bottom << 1 | right]))
        return this;
      if (!node.length)
        break;
      if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3])
        retainer = parent, j = i;
    }
  while (node.data !== d)
    if (!(previous = node, node = node.next))
      return this;
  if (next = node.next)
    delete node.next;
  if (previous)
    return next ? previous.next = next : delete previous.next, this;
  if (!parent)
    return this._root = next, this;
  next ? parent[i] = next : delete parent[i];
  if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
    if (retainer)
      retainer[j] = node;
    else
      this._root = node;
  }
  return this;
}
function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i)
    this.remove(data[i]);
  return this;
}

// node_modules/d3-quadtree/src/root.js
function root_default() {
  return this._root;
}

// node_modules/d3-quadtree/src/size.js
function size_default() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length)
      do
        ++size;
      while (node = node.next);
  });
  return size;
}

// node_modules/d3-quadtree/src/visit.js
function visit_default(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node)
    quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3])
        quads.push(new quad_default(child, xm, ym, x1, y1));
      if (child = node[2])
        quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[1])
        quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[0])
        quads.push(new quad_default(child, x0, y0, xm, ym));
    }
  }
  return this;
}

// node_modules/d3-quadtree/src/visitAfter.js
function visitAfter_default(callback) {
  var quads = [], next = [], q;
  if (this._root)
    quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0])
        quads.push(new quad_default(child, x0, y0, xm, ym));
      if (child = node[1])
        quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[2])
        quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[3])
        quads.push(new quad_default(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}

// node_modules/d3-quadtree/src/x.js
function defaultX(d) {
  return d[0];
}
function x_default(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

// node_modules/d3-quadtree/src/y.js
function defaultY(d) {
  return d[1];
}
function y_default(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

// node_modules/d3-quadtree/src/quadtree.js
function quadtree(nodes, x3, y3) {
  var tree = new Quadtree(x3 == null ? defaultX : x3, y3 == null ? defaultY : y3, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x3, y3, x0, y0, x1, y1) {
  this._x = x3;
  this._y = y3;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = void 0;
}
function leaf_copy(leaf) {
  var copy = { data: leaf.data }, next = copy;
  while (leaf = leaf.next)
    next = next.next = { data: leaf.data };
  return copy;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
  if (!node)
    return copy;
  if (!node.length)
    return copy._root = leaf_copy(node), copy;
  nodes = [{ source: node, target: copy._root = new Array(4) }];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length)
          nodes.push({ source: child, target: node.target[i] = new Array(4) });
        else
          node.target[i] = leaf_copy(child);
      }
    }
  }
  return copy;
};
treeProto.add = add_default;
treeProto.addAll = addAll;
treeProto.cover = cover_default;
treeProto.data = data_default;
treeProto.extent = extent_default;
treeProto.find = find_default;
treeProto.remove = remove_default;
treeProto.removeAll = removeAll;
treeProto.root = root_default;
treeProto.size = size_default;
treeProto.visit = visit_default;
treeProto.visitAfter = visitAfter_default;
treeProto.x = x_default;
treeProto.y = y_default;

// node_modules/d3-force/src/constant.js
function constant_default(x3) {
  return function() {
    return x3;
  };
}

// node_modules/d3-force/src/jiggle.js
function jiggle_default(random) {
  return (random() - 0.5) * 1e-6;
}

// node_modules/d3-force/src/collide.js
function x(d) {
  return d.x + d.vx;
}
function y(d) {
  return d.y + d.vy;
}
function collide_default(radius) {
  var nodes, radii, random, strength = 1, iterations = 1;
  if (typeof radius !== "function")
    radius = constant_default(radius == null ? 1 : +radius);
  function force() {
    var i, n = nodes.length, tree, node, xi, yi, ri, ri2;
    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }
    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x3 = xi - data.x - data.vx, y3 = yi - data.y - data.vy, l = x3 * x3 + y3 * y3;
          if (l < r * r) {
            if (x3 === 0)
              x3 = jiggle_default(random), l += x3 * x3;
            if (y3 === 0)
              y3 = jiggle_default(random), l += y3 * y3;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x3 *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y3 *= l) * r;
            data.vx -= x3 * (r = 1 - r);
            data.vy -= y3 * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }
  function prepare(quad) {
    if (quad.data)
      return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i)
      node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };
  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : radius;
  };
  return force;
}

// node_modules/d3-force/src/link.js
function index(d) {
  return d.index;
}
function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node)
    throw new Error("node not found: " + nodeId);
  return node;
}
function link_default(links) {
  var id = index, strength = defaultStrength, strengths, distance = constant_default(30), distances, nodes, count, bias, random, iterations = 1;
  if (links == null)
    links = [];
  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }
  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x3, y3, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x3 = target.x + target.vx - source.x - source.vx || jiggle_default(random);
        y3 = target.y + target.vy - source.y - source.vy || jiggle_default(random);
        l = Math.sqrt(x3 * x3 + y3 * y3);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x3 *= l, y3 *= l;
        target.vx -= x3 * (b = bias[i]);
        target.vy -= y3 * b;
        source.vx += x3 * (b = 1 - b);
        source.vy += y3 * b;
      }
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i, n = nodes.length, m2 = links.length, nodeById = new Map(nodes.map((d, i2) => [id(d, i2, nodes), d])), link;
    for (i = 0, count = new Array(n); i < m2; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object")
        link.source = find(nodeById, link.source);
      if (typeof link.target !== "object")
        link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }
    for (i = 0, bias = new Array(m2); i < m2; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }
    strengths = new Array(m2), initializeStrength();
    distances = new Array(m2), initializeDistance();
  }
  function initializeStrength() {
    if (!nodes)
      return;
    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }
  function initializeDistance() {
    if (!nodes)
      return;
    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };
  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };
  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default(+_), initializeStrength(), force) : strength;
  };
  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant_default(+_), initializeDistance(), force) : distance;
  };
  return force;
}

// node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
      throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0)
      name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n)
        if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
          return t;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type)
        _[t] = set(_[t], typename.name, callback);
      else if (callback == null)
        for (t in _)
          _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _)
      copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0)
      for (var args = new Array(n), i = 0, n, t; i < n; ++i)
        args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type))
      throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type))
      throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i)
      t[i].value.apply(that, args);
  }
};
function get(type, name) {
  for (var i = 0, n = type.length, c2; i < n; ++i) {
    if ((c2 = type[i]).name === name) {
      return c2.value;
    }
  }
}
function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null)
    type.push({ name, value: callback });
  return type;
}
var dispatch_default = dispatch;

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time)
        time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-force/src/lcg.js
var a = 1664525;
var c = 1013904223;
var m = 4294967296;
function lcg_default() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}

// node_modules/d3-force/src/simulation.js
function x2(d) {
  return d.x;
}
function y2(d) {
  return d.y;
}
var initialRadius = 10;
var initialAngle = Math.PI * (3 - Math.sqrt(5));
function simulation_default(nodes) {
  var simulation, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = /* @__PURE__ */ new Map(), stepper = timer(step), event = dispatch_default("tick", "end"), random = lcg_default();
  if (nodes == null)
    nodes = [];
  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }
  function tick(iterations) {
    var i, n = nodes.length, node;
    if (iterations === void 0)
      iterations = 1;
    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;
      forces.forEach(function(force) {
        force(alpha);
      });
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null)
          node.x += node.vx *= velocityDecay;
        else
          node.x = node.fx, node.vx = 0;
        if (node.fy == null)
          node.y += node.vy *= velocityDecay;
        else
          node.y = node.fy, node.vy = 0;
      }
    }
    return simulation;
  }
  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null)
        node.x = node.fx;
      if (node.fy != null)
        node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }
  function initializeForce(force) {
    if (force.initialize)
      force.initialize(nodes, random);
    return force;
  }
  initializeNodes();
  return simulation = {
    tick,
    restart: function() {
      return stepper.restart(step), simulation;
    },
    stop: function() {
      return stepper.stop(), simulation;
    },
    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },
    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },
    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },
    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },
    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },
    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },
    randomSource: function(_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
    },
    force: function(name, _) {
      return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
    },
    find: function(x3, y3, radius) {
      var i = 0, n = nodes.length, dx, dy, d2, node, closest;
      if (radius == null)
        radius = Infinity;
      else
        radius *= radius;
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x3 - node.x;
        dy = y3 - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius)
          closest = node, radius = d2;
      }
      return closest;
    },
    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}

// node_modules/d3-force/src/manyBody.js
function manyBody_default() {
  var nodes, node, random, alpha, strength = constant_default(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
  function force(_) {
    var i, n = nodes.length, tree = quadtree(nodes, x2, y2).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i)
      node = nodes[i], tree.visit(apply);
  }
  function initialize() {
    if (!nodes)
      return;
    var i, n = nodes.length, node2;
    strengths = new Array(n);
    for (i = 0; i < n; ++i)
      node2 = nodes[i], strengths[node2.index] = +strength(node2, i, nodes);
  }
  function accumulate(quad) {
    var strength2 = 0, q, c2, weight = 0, x3, y3, i;
    if (quad.length) {
      for (x3 = y3 = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c2 = Math.abs(q.value))) {
          strength2 += q.value, weight += c2, x3 += c2 * q.x, y3 += c2 * q.y;
        }
      }
      quad.x = x3 / weight;
      quad.y = y3 / weight;
    } else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do
        strength2 += strengths[q.data.index];
      while (q = q.next);
    }
    quad.value = strength2;
  }
  function apply(quad, x1, _, x22) {
    if (!quad.value)
      return true;
    var x3 = quad.x - node.x, y3 = quad.y - node.y, w = x22 - x1, l = x3 * x3 + y3 * y3;
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x3 === 0)
          x3 = jiggle_default(random), l += x3 * x3;
        if (y3 === 0)
          y3 = jiggle_default(random), l += y3 * y3;
        if (l < distanceMin2)
          l = Math.sqrt(distanceMin2 * l);
        node.vx += x3 * quad.value * alpha / l;
        node.vy += y3 * quad.value * alpha / l;
      }
      return true;
    } else if (quad.length || l >= distanceMax2)
      return;
    if (quad.data !== node || quad.next) {
      if (x3 === 0)
        x3 = jiggle_default(random), l += x3 * x3;
      if (y3 === 0)
        y3 = jiggle_default(random), l += y3 * y3;
      if (l < distanceMin2)
        l = Math.sqrt(distanceMin2 * l);
    }
    do
      if (quad.data !== node) {
        w = strengths[quad.data.index] * alpha / l;
        node.vx += x3 * w;
        node.vy += y3 * w;
      }
    while (quad = quad.next);
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : strength;
  };
  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };
  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };
  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };
  return force;
}

// node_modules/d3-force/src/x.js
function x_default2(x3) {
  var strength = constant_default(0.1), nodes, strengths, xz;
  if (typeof x3 !== "function")
    x3 = constant_default(x3 == null ? 0 : +x3);
  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x3(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : strength;
  };
  force.x = function(_) {
    return arguments.length ? (x3 = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : x3;
  };
  return force;
}

// node_modules/d3-force/src/y.js
function y_default2(y3) {
  var strength = constant_default(0.1), nodes, strengths, yz;
  if (typeof y3 !== "function")
    y3 = constant_default(y3 == null ? 0 : +y3);
  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i, n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(yz[i] = +y3(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : strength;
  };
  force.y = function(_) {
    return arguments.length ? (y3 = typeof _ === "function" ? _ : constant_default(+_), initialize(), force) : y3;
  };
  return force;
}

// node_modules/@amcharts/amcharts4/.internal/plugins/forceDirected/ForceDirectedSeries.js
var ForceDirectedSeriesDataItem = (
  /** @class */
  function(_super) {
    __extends(ForceDirectedSeriesDataItem2, _super);
    function ForceDirectedSeriesDataItem2() {
      var _this = _super.call(this) || this;
      _this.childrenInited = false;
      _this.className = "ForceDirectedSeriesDataItem";
      _this.hasChildren.children = true;
      _this.childLinks = new List();
      _this.applyTheme();
      return _this;
    }
    ForceDirectedSeriesDataItem2.prototype.show = function(duration, delay, fields) {
      this._visible = true;
      if (this.node) {
        this.node.isActive = true;
      }
      return;
    };
    ForceDirectedSeriesDataItem2.prototype.dispatchVisibility = function(visible) {
      if (this.events.isEnabled("visibilitychanged")) {
        var event_1 = {
          type: "visibilitychanged",
          target: this,
          visible
        };
        this.events.dispatchImmediately("visibilitychanged", event_1);
      }
    };
    ForceDirectedSeriesDataItem2.prototype.hide = function(duration, delay, toValue, fields) {
      this._visible = false;
      if (this.events.isEnabled("visibilitychanged")) {
        var event_2 = {
          type: "visibilitychanged",
          target: this,
          visible: false
        };
        this.events.dispatchImmediately("visibilitychanged", event_2);
      }
      if (this.node) {
        this.node.isActive = false;
      }
      return;
    };
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "value", {
      /**
       * @return Value
       */
      get: function() {
        var value = this.values.value.value;
        if (!isNumber(value)) {
          if (this.children) {
            value = 0;
            this.children.each(function(child) {
              value += child.value;
            });
          }
        }
        return value;
      },
      /**
       * Numeric value of the item.
       *
       * @param value  Value
       */
      set: function(value) {
        this.setValue("value", value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "node", {
      /**
       * An element, related to this data item. (node)
       *
       * @readonly
       * @return node element
       */
      get: function() {
        var _this = this;
        if (!this._node) {
          var component_1 = this.component;
          var node_1 = component_1.nodes.create();
          node_1.draggable = true;
          this._node = node_1;
          this._disposers.push(node_1);
          this._disposers.push(new Disposer(function() {
            component_1.nodes.removeValue(node_1);
          }));
          this.addSprite(node_1);
          node_1.visible = this.visible;
          node_1.hiddenState.properties.visible = true;
          if (component_1.itemsFocusable()) {
            this.component.role = "menu";
            node_1.role = "menuitem";
            node_1.focusable = true;
          } else {
            this.component.role = "list";
            node_1.role = "listitem";
            node_1.focusable = false;
          }
          if (node_1.focusable) {
            node_1.events.once("focus", function(ev) {
              node_1.readerTitle = component_1.populateString(component_1.itemReaderText, _this);
            }, void 0, false);
            node_1.events.once("blur", function(ev) {
              node_1.readerTitle = "";
            }, void 0, false);
          }
          if (node_1.hoverable) {
            node_1.events.once("over", function(ev) {
              node_1.readerTitle = component_1.populateString(component_1.itemReaderText, _this);
            }, void 0, false);
            node_1.events.once("out", function(ev) {
              node_1.readerTitle = "";
            }, void 0, false);
          }
        }
        return this._node;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "level", {
      /**
       * Depth level in the series hierarchy.
       *
       * The top-level item will have level set at 0. Its children will have
       * level 1, and so on.
       *
       * @readonly
       * @return Level
       */
      get: function() {
        if (!this.parent) {
          return 0;
        } else {
          return this.parent.level + 1;
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "percent", {
      /**
       * Percent value of a node.
       *
       * @since 4.9.0
       * @return Percent
       */
      get: function() {
        if (this.parent) {
          return this.value / this.parent.value * 100;
        }
        return 100;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "color", {
      /**
       * @return Color
       */
      get: function() {
        var color2 = this.properties.color;
        if (color2 == void 0) {
          if (this.parent) {
            color2 = this.parent.color;
          }
        }
        if (color2 == void 0) {
          if (this.component) {
            color2 = this.component.colors.getIndex(this.component.colors.step * this.index);
          }
        }
        return color2;
      },
      /**
       * Item's color.
       *
       * If not set, will use parent's color, or, if that is not set either,
       * automatically assigned color from chart's color set. (`chart.colors`)
       *
       * @param value  : Color | LinearGradient | RadialGradient | Pattern
       */
      set: function(value) {
        this.setProperty("color", value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "linkWith", {
      /**
       * @return Link list
       */
      get: function() {
        return this.properties.linkWith;
      },
      /**
       * An array of id's of other nodes outside of the child/parent tree to link
       * with.
       *
       * @param  value  Link list
       */
      set: function(value) {
        this.setProperty("linkWith", value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "hiddenInLegend", {
      /**
       * @return Hidden in legend?
       */
      get: function() {
        return this.properties.hiddenInLegend;
      },
      /**
       * Should dataItem (node) be hidden in legend?
       *
       * @param value Visible in legend?
       */
      set: function(value) {
        this.setProperty("hiddenInLegend", value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "collapsed", {
      /**
       * @return Collapsed?
       */
      get: function() {
        return this.properties.collapsed;
      },
      /**
       * Indicates whether node should start off as collapsed.
       *
       * This can be used to specify whether node should start off as collapsed
       * via data.
       *
       * To toggle actual node, use its `isActive` property instead.
       *
       * @param  value  Collapsed?
       */
      set: function(value) {
        this.setProperty("collapsed", value);
        this.node.isActive = !value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "fixed", {
      /**
       * @return Fixed?
       */
      get: function() {
        return this.properties.fixed;
      },
      /**
       * Is this node fixed (immovable)?
       *
       * @since 4.6.2
       * @param  value  Fixed?
       */
      set: function(value) {
        this.setProperty("fixed", value);
        if (this.component) {
          this.component.handleFixed(this);
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "children", {
      /**
       * @return Item's children
       */
      get: function() {
        return this.properties.children;
      },
      /**
       * A list of item's sub-children.
       *
       * @param children  Item's children
       */
      set: function(children) {
        this.setProperty("children", children);
      },
      enumerable: true,
      configurable: true
    });
    ForceDirectedSeriesDataItem2.prototype.createLegendMarker = function(marker) {
      this.component.createLegendMarker(marker, this);
      if (!this.node.isActive) {
        this.hide();
      }
    };
    Object.defineProperty(ForceDirectedSeriesDataItem2.prototype, "legendDataItem", {
      /**
       * @return Legend data item
       */
      get: function() {
        return this._legendDataItem;
      },
      /**
       * A legend's data item, that corresponds to this data item.
       *
       * @param value  Legend data item
       */
      set: function(value) {
        this._legendDataItem = value;
        if (value.label) {
          value.label.dataItem = this;
        }
        if (value.valueLabel) {
          value.valueLabel.dataItem = this;
        }
      },
      enumerable: true,
      configurable: true
    });
    return ForceDirectedSeriesDataItem2;
  }(SeriesDataItem)
);
var ForceDirectedSeries = (
  /** @class */
  function(_super) {
    __extends(ForceDirectedSeries2, _super);
    function ForceDirectedSeries2() {
      var _this = _super.call(this) || this;
      _this._tick = 0;
      _this.className = "ForceDirectedSeries";
      _this.d3forceSimulation = simulation_default();
      _this.maxRadius = percent(8);
      _this.minRadius = percent(1);
      _this.width = percent(100);
      _this.height = percent(100);
      _this.colors = new ColorSet();
      _this.colors.step = 2;
      _this.width = percent(100);
      _this.height = percent(100);
      _this.manyBodyStrength = -15;
      _this.centerStrength = 0.8;
      _this.showOnTick = 10;
      _this.baseValue = 0;
      _this.setPropertyValue("dragFixedNodes", false);
      _this.setPropertyValue("velocityDecay", 0.4);
      _this.events.on("maxsizechanged", function() {
        _this.updateRadiuses(_this.dataItems);
        _this.updateLinksAndNodes();
        _this.dataItems.each(function(dataItem) {
          _this.handleFixed(dataItem);
        });
        var d3forceSimulation = _this.d3forceSimulation;
        var w = max(max(50, _this.innerWidth), _this.innerWidth);
        var h = max(max(50, _this.innerHeight), _this.innerHeight);
        if (d3forceSimulation) {
          d3forceSimulation.force("x", x_default2().x(w / 2).strength(_this.centerStrength * 100 / w));
          d3forceSimulation.force("y", y_default2().y(h / 2).strength(_this.centerStrength * 100 / h));
          if (d3forceSimulation.alpha() < 0.4) {
            d3forceSimulation.alpha(0.4);
            d3forceSimulation.restart();
          }
        }
      });
      _this.applyTheme();
      return _this;
    }
    ForceDirectedSeries2.prototype.getMaxValue = function(dataItems, max2) {
      var _this = this;
      dataItems.each(function(dataItem) {
        if (dataItem.value > max2) {
          max2 = dataItem.value;
        }
        if (dataItem.children) {
          var cmax = _this.getMaxValue(dataItem.children, max2);
          if (cmax > max2) {
            max2 = cmax;
          }
        }
      });
      return max2;
    };
    ForceDirectedSeries2.prototype.getMinValue = function(dataItems, min2) {
      var _this = this;
      dataItems.each(function(dataItem) {
        if (dataItem.value < min2) {
          min2 = dataItem.value;
        }
        if (dataItem.children) {
          var cmin = _this.getMaxValue(dataItem.children, min2);
          if (cmin < min2) {
            min2 = cmin;
          }
        }
      });
      return min2;
    };
    ForceDirectedSeries2.prototype.validateDataItems = function() {
      var _this = this;
      if (this.chart.__disabled) {
        _super.prototype.validateDataItems.call(this);
        return;
      }
      this._dataDisposers.push(new ListDisposer(this.links));
      this._maxValue = this.getMaxValue(this.dataItems, 0);
      this._minValue = this.getMinValue(this.dataItems, this._maxValue);
      this.forceLinks = [];
      this.colors.reset();
      var index2 = 0;
      var radius = Math.min(this.innerHeight / 3, this.innerWidth / 3);
      if (this.dataItems.length <= 1) {
        radius = 0;
      }
      this.dataItems.each(function(dataItem) {
        var angle = index2 / _this.dataItems.length * 360;
        var node = dataItem.node;
        var xField = node.propertyFields.x;
        var yField = node.propertyFields.y;
        if (xField && hasValue(dataItem.dataContext[xField])) {
          node.x = dataItem.dataContext[xField];
        } else {
          node.x = _this.innerWidth / 2 + radius * cos(angle);
        }
        if (yField && hasValue(dataItem.dataContext[yField])) {
          node.y = dataItem.dataContext[yField];
        } else {
          node.y = _this.innerHeight / 2 + radius * sin(angle);
        }
        dataItem.node.fill = dataItem.color;
        dataItem.node.stroke = dataItem.color;
        index2++;
        _this.initNode(dataItem);
      });
      if (this.dataFields.linkWith) {
        this.dataItems.each(function(dataItem) {
          _this.processLinkWith(dataItem);
        });
      }
      var d3forceSimulation = this.d3forceSimulation;
      d3forceSimulation.on("tick", function() {
        _this.updateLinksAndNodes();
      });
      for (var i = 0; i < 10; i++) {
      }
      d3forceSimulation.alphaDecay(1 - Math.pow(1e-3, 1 / 600));
      this.chart.feedLegend();
      _super.prototype.validateDataItems.call(this);
    };
    ForceDirectedSeries2.prototype.handleFixed = function(dataItem) {
      var _this = this;
      var node = dataItem.node;
      var xField = node.propertyFields.x;
      var yField = node.propertyFields.y;
      if (xField && hasValue(dataItem.dataContext[xField])) {
        node.x = dataItem.dataContext[xField];
      }
      if (yField && hasValue(dataItem.dataContext[yField])) {
        node.y = dataItem.dataContext[yField];
      }
      if (dataItem.fixed) {
        if (node.x instanceof Percent) {
          node.fx = relativeToValue(node.x, this.innerWidth);
        } else {
          node.fx = node.x;
        }
        if (node.y instanceof Percent) {
          node.fy = relativeToValue(node.y, this.innerHeight);
        } else {
          node.fy = node.y;
        }
        node.draggable = this.dragFixedNodes;
        node.validate();
      } else {
        node.fx = void 0;
        node.fy = void 0;
        node.draggable = true;
      }
      if (dataItem && dataItem.children) {
        dataItem.children.each(function(di) {
          _this.handleFixed(di);
        });
      }
    };
    ForceDirectedSeries2.prototype.updateNodeList = function() {
      var d3forceSimulation = this.d3forceSimulation;
      d3forceSimulation.nodes(this.nodes.values);
      this._linkForce = link_default(this.forceLinks);
      d3forceSimulation.force("link", this._linkForce);
      this._collisionForce = collide_default();
      d3forceSimulation.force("collision", this._collisionForce);
      var w = max(50, this.innerWidth);
      var h = max(50, this.innerHeight);
      d3forceSimulation.force("x", x_default2().x(w / 2).strength(this.centerStrength * 100 / w));
      d3forceSimulation.force("y", y_default2().y(h / 2).strength(this.centerStrength * 100 / h));
    };
    ForceDirectedSeries2.prototype.updateLinksAndNodes = function() {
      var _this = this;
      if (this._tick < this.showOnTick) {
        this._tick++;
        this.opacity = 0;
      } else if (this._tick == this.showOnTick) {
        this.opacity = 1;
        this._tick++;
      }
      if (this._linkForce) {
        this._linkForce.distance(function(linkDatum) {
          return _this.getDistance(linkDatum);
        });
        this._linkForce.strength(function(linkDatum) {
          return _this.getStrength(linkDatum);
        });
      }
      if (this._collisionForce) {
        this._collisionForce.radius(function(node) {
          if (node instanceof ForceDirectedNode) {
            var radius = node.circle.pixelRadius;
            if (!node.outerCircle.__disabled && !node.outerCircle.disabled && node.outerCircle.visible) {
              radius = (radius + 3) * node.outerCircle.scale;
            }
            return radius + node.paddingRadius;
          }
          return 1;
        });
      }
      this.d3forceSimulation.force("manybody", manyBody_default().strength(function(node) {
        if (node instanceof ForceDirectedNode) {
          return node.circle.pixelRadius * _this.manyBodyStrength;
        }
        return _this.manyBodyStrength;
      }));
    };
    ForceDirectedSeries2.prototype.getDistance = function(linkDatum) {
      var source = linkDatum.source;
      var target = linkDatum.target;
      var distance = 0;
      if (target.dataItem && source.dataItem) {
        var link = source.linksWith.getKey(target.uid);
        if (link) {
          distance = link.distance;
        }
        if (!source.isActive) {
          distance = 1;
        }
        if (target.isHidden) {
          return 0;
        }
        return distance * (source.circle.pixelRadius + target.circle.pixelRadius);
      }
      return distance;
    };
    ForceDirectedSeries2.prototype.getStrength = function(linkDatum) {
      var source = linkDatum.source;
      var target = linkDatum.target;
      var strength = 0;
      var link = source.linksWith.getKey(target.uid);
      if (link) {
        strength = link.strength;
      }
      if (target.isHidden) {
        return 0;
      }
      return strength;
    };
    ForceDirectedSeries2.prototype.nodeDragEnded = function() {
      this.d3forceSimulation.alphaTarget(0);
    };
    ForceDirectedSeries2.prototype.nodeDragStarted = function() {
      this.d3forceSimulation.alpha(0.1);
      this.d3forceSimulation.restart();
    };
    ForceDirectedSeries2.prototype.restartSimulation = function() {
      if (this.d3forceSimulation.alpha() <= 0.3) {
        this.d3forceSimulation.alpha(0.3);
        this.d3forceSimulation.restart();
      }
    };
    ForceDirectedSeries2.prototype.updateRadiuses = function(dataItems) {
      var _this = this;
      dataItems.each(function(dataItem) {
        _this.updateRadius(dataItem);
        if (dataItem.childrenInited) {
          _this.updateRadiuses(dataItem.children);
        }
      });
    };
    ForceDirectedSeries2.prototype.updateRadius = function(dataItem) {
      var node = dataItem.node;
      var minSide = (this.innerWidth + this.innerHeight) / 2;
      var minRadius = relativeToValue(this.minRadius, minSide);
      var maxRadius = relativeToValue(this.maxRadius, minSide);
      var baseValue = this.baseValue;
      if (baseValue == null) {
        baseValue = this._minValue;
      }
      var radius = minRadius + (dataItem.value - baseValue) / (this._maxValue - baseValue) * (maxRadius - minRadius);
      if (!isNumber(radius)) {
        radius = minRadius;
      }
      node.circle.radius = radius;
      node.outerCircle.radius = radius + 3;
      node.circle.states.getKey("active").properties.radius = radius;
      node.circle.defaultState.properties.radius = radius;
    };
    ForceDirectedSeries2.prototype.initNode = function(dataItem) {
      var _this = this;
      var node = dataItem.node;
      node.parent = this;
      this.updateRadius(dataItem);
      if (!dataItem.children || dataItem.children.length == 0) {
        node.outerCircle.disabled = true;
        node.circle.interactionsEnabled = true;
        node.cursorOverStyle = MouseCursorStyle.default;
      } else {
        node.cursorOverStyle = MouseCursorStyle.pointer;
      }
      if (this.dataItemsInvalid && (dataItem.level >= this.maxLevels - 1 || dataItem.collapsed)) {
        node.isActive = false;
        this.updateNodeList();
        return;
      }
      if (!node.isActive) {
        node.hide(0);
      }
      this.handleFixed(dataItem);
      if (dataItem.children) {
        var index_1 = 0;
        dataItem.childrenInited = true;
        if (this.dataItems.length == 1 && dataItem.level == 0) {
          this.colors.next();
        }
        dataItem.children.each(function(child) {
          var link = node.linkWith(child.node);
          child.parentLink = link;
          var radius = 2 * node.circle.pixelRadius + child.node.circle.pixelRadius;
          var angle = index_1 / dataItem.children.length * 360;
          child.node.x = node.pixelX + radius * cos(angle);
          child.node.y = node.pixelY + radius * sin(angle);
          child.node.circle.radius = 0;
          var color2;
          var diColor = child.properties.color;
          if (hasValue(diColor)) {
            color2 = diColor;
          } else {
            if (_this.dataItems.length == 1 && dataItem.level == 0) {
              color2 = _this.colors.next();
            } else {
              color2 = dataItem.color;
            }
          }
          child.color = color2;
          child.node.fill = color2;
          child.node.stroke = color2;
          child.parentLink.stroke = color2;
          child.node.fill = child.node.fill;
          child.node.stroke = child.node.stroke;
          _this.initNode(child);
          index_1++;
        });
      }
      node.isActive = true;
      node.show(0);
      this.updateNodeList();
    };
    ForceDirectedSeries2.prototype.processLinkWith = function(dataItem) {
      var _this = this;
      if (dataItem.linkWith) {
        each(dataItem.linkWith, function(id, index2) {
          var dataItemToConnect = _this.getDataItemById(_this.dataItems, id);
          if (dataItemToConnect) {
            dataItem.node.linkWith(dataItemToConnect.node, _this.linkWithStrength);
          }
        });
      }
      if (dataItem.children) {
        dataItem.children.each(function(child) {
          _this.processLinkWith(child);
        });
      }
    };
    ForceDirectedSeries2.prototype.getDataItemById = function(dataItems, id) {
      for (var i = dataItems.length - 1; i >= 0; i--) {
        var dataItem = dataItems.getIndex(i);
        if (dataItem.id == id) {
          return dataItem;
        }
        if (dataItem.children) {
          var di = this.getDataItemById(dataItem.children, id);
          if (di) {
            return di;
          }
        }
      }
    };
    ForceDirectedSeries2.prototype.createDataItem = function() {
      return new ForceDirectedSeriesDataItem();
    };
    Object.defineProperty(ForceDirectedSeries2.prototype, "nodes", {
      /**
       * A list of nodes in series.
       *
       * @return  Node list
       */
      get: function() {
        if (!this._nodes) {
          var node = this.createNode();
          node.applyOnClones = true;
          this._disposers.push(node);
          this._nodes = new ListTemplate(node);
          this._disposers.push(new ListDisposer(this._nodes));
        }
        return this._nodes;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "links", {
      /**
       * A list of links between nodes.
       *
       * @return  Link list
       */
      get: function() {
        if (!this._links) {
          var link = this.createLink();
          link.applyOnClones = true;
          this._disposers.push(link);
          this._links = new ListTemplate(link);
          this._disposers.push(new ListDisposer(this._links));
        }
        return this._links;
      },
      enumerable: true,
      configurable: true
    });
    ForceDirectedSeries2.prototype.createNode = function() {
      return new ForceDirectedNode();
    };
    ForceDirectedSeries2.prototype.createLink = function() {
      return new ForceDirectedLink();
    };
    Object.defineProperty(ForceDirectedSeries2.prototype, "minRadius", {
      /**
       * @return Minimum radius (px or percent)
       */
      get: function() {
        return this.getPropertyValue("minRadius");
      },
      /**
       * Smallest possible radius in pixels of the node circle.
       *
       * If set in percent, it radius will be calculated from average width and
       * height of series.
       *
       * @default Percent(1)
       * @param  value  Minimum radius (px or percent)
       */
      set: function(value) {
        this.setPropertyValue("minRadius", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "baseValue", {
      /**
       * @return Minimum value
       */
      get: function() {
        return this.getPropertyValue("baseValue");
      },
      /**
       * Base value. If you set it to null, real minimum value of your data will be used.
       *
       * @default 0
       * @param  value  Minimum value
       */
      set: function(value) {
        this.setPropertyValue("baseValue", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "maxRadius", {
      /**
       * @return Maximum radius (px or Percent)
       */
      get: function() {
        return this.getPropertyValue("maxRadius");
      },
      /**
       * Biggest possible radius in pixels of the node circle.
       *
       * If set in percent, it radius will be calculated from average width and
       * height of series.
       *
       * @default Percent(8)
       * @param  value  Maximum radius (px or Percent)
       */
      set: function(value) {
        this.setPropertyValue("maxRadius", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "colors", {
      /**
       * @return Color set
       */
      get: function() {
        return this.getPropertyValue("colors");
      },
      /**
       * A color set to be used for nodes.
       *
       * iIt works like this:
       *
       * The first level with more than one node, assigns different colors to all
       * nodes in this list. Their child nodes inherit the color.
       *
       * For example, if the top level has one node with three children, the top
       * node will get first color, the first child will get second color, etc.
       *
       * If there are two top nodes, the first top node gets first color, the
       * second top node gets the second color. Their subsequent children inherit
       * colors.
       *
       * @param value  Color set
       */
      set: function(value) {
        this.setPropertyValue("colors", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "maxLevels", {
      /**
       * @return Number of levels
       */
      get: function() {
        return this.getPropertyValue("maxLevels");
      },
      /**
       * Number of levels to be displayed initially.
       *
       * @param  value  Number of levels
       */
      set: function(value) {
        this.setPropertyValue("maxLevels", value, true);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "manyBodyStrength", {
      /**
       * @return  Body push/attrack strength
       */
      get: function() {
        return this.getPropertyValue("manyBodyStrength");
      },
      /**
       * Relative strength each node pushes (or attracts) other nodes (it is
       * multiplied by `node.circle.radius` for big nodes to push stronger).
       *
       * Positive value will make nodes attract each other, while negative will
       * push away each other. The bigger the negative number is, the more
       * scattered nodes will be.
       *
       * Available value range: `-XX` to `XX`.
       *
       * @default -15
       * @param  value  Body push/attrack strength
       */
      set: function(value) {
        if (this.setPropertyValue("manyBodyStrength", value)) {
          this.restartSimulation();
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "centerStrength", {
      /**
       * @return  Stregth of attraction to center
       */
      get: function() {
        return this.getPropertyValue("centerStrength");
      },
      /**
       * Relative strength each child node is pushes (or attracted) to the center
       * of the chart.
       *
       * Positive value will make nodes to be attracted to center, while negative
       * will push them away.
       *
       * Available value range: `-50` to `50`.
       *
       * @default 0.8
       * @param  value  Stregth of attraction to center
       */
      set: function(value) {
        if (this.setPropertyValue("centerStrength", value)) {
          this.restartSimulation();
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "linkWithStrength", {
      /**
       * @return Strength
       */
      get: function() {
        return this.getPropertyValue("linkWithStrength");
      },
      /**
       * Relative attraction strength between the nodes connected with `linkWith`.
       *
       * @since 4.4.8
       * @param  value  Strength
       * @default undefined
       */
      set: function(value) {
        if (this.setPropertyValue("linkWithStrength", value)) {
          this.restartSimulation();
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "velocityDecay", {
      /**
       * @return Velocity decay
       */
      get: function() {
        return this.getPropertyValue("velocityDecay");
      },
      /**
       * The bigger the number the more slowly the nodes will move. Think of it as
       * friction.
       *
       * @since 4.9.2
       * @param  value  Velocity decay
       * @default 0.4
       */
      set: function(value) {
        if (this.setPropertyValue("velocityDecay", value)) {
          this.d3forceSimulation.velocityDecay(value);
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedSeries2.prototype, "dragFixedNodes", {
      /**
       * @return Allow drag fixed nodes?
       */
      get: function() {
        return this.getPropertyValue("dragFixedNodes");
      },
      /**
       * Specifies if user can drag fixed nodes.
       *
       * @since 4.9.0
       * @default false
       * @param  value  Allow drag fixed nodes?
       */
      set: function(value) {
        var _this = this;
        if (this.setPropertyValue("dragFixedNodes", value)) {
          this.dataItems.each(function(dataItem) {
            _this.handleFixed(dataItem);
          });
        }
      },
      enumerable: true,
      configurable: true
    });
    ForceDirectedSeries2.prototype.createLegendMarker = function(marker, dataItem) {
      marker.children.each(function(child) {
        var node = dataItem.node;
        if (child instanceof RoundedRectangle) {
          child.cornerRadius(40, 40, 40, 40);
        }
        child.defaultState.properties.fill = node.fill;
        child.defaultState.properties.stroke = node.stroke;
        child.defaultState.properties.fillOpacity = node.fillOpacity;
        child.defaultState.properties.strokeOpacity = node.strokeOpacity;
        child.fill = node.fill;
        child.stroke = node.stroke;
        child.fillOpacity = node.fillOpacity;
        child.strokeOpacity = node.strokeOpacity;
        if (child.fill == void 0) {
          child.__disabled = true;
        }
        var legendDataItem = marker.dataItem;
        legendDataItem.color = node.fill;
        legendDataItem.colorOrig = node.fill;
        node.events.on("propertychanged", function(ev) {
          if (ev.property == "fill") {
            child.__disabled = false;
            if (!child.isActive) {
              child.fill = node.fill;
            }
            child.defaultState.properties.fill = node.fill;
            legendDataItem.color = node.fill;
            legendDataItem.colorOrig = node.fill;
          }
          if (ev.property == "stroke") {
            if (!child.isActive) {
              child.stroke = node.stroke;
            }
            child.defaultState.properties.stroke = node.stroke;
          }
        }, void 0, false);
      });
    };
    Object.defineProperty(ForceDirectedSeries2.prototype, "showOnTick", {
      /**
       * @return Number of ticks to delay rendering
       */
      get: function() {
        return this.getPropertyValue("showOnTick");
      },
      /**
       * Renders series hidden until Xth tick.
       *
       * @default 10
       * @since 4.10.17
       * @param value Number of ticks to delay rendering
       */
      set: function(value) {
        this.setPropertyValue("showOnTick", value);
      },
      enumerable: true,
      configurable: true
    });
    return ForceDirectedSeries2;
  }(Series)
);
registry.registeredClasses["ForceDirectedSeries"] = ForceDirectedSeries;
registry.registeredClasses["ForceDirectedSeriesDataItem"] = ForceDirectedSeriesDataItem;

// node_modules/@amcharts/amcharts4/.internal/plugins/forceDirected/ForceDirectedTree.js
var ForceDirectedTreeDataItem = (
  /** @class */
  function(_super) {
    __extends(ForceDirectedTreeDataItem2, _super);
    function ForceDirectedTreeDataItem2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    return ForceDirectedTreeDataItem2;
  }(SerialChartDataItem)
);
var ForceDirectedTree = (
  /** @class */
  function(_super) {
    __extends(ForceDirectedTree2, _super);
    function ForceDirectedTree2() {
      var _this = (
        // Init
        _super.call(this) || this
      );
      _this.zoomDuration = 1e3;
      _this.zoomEasing = cubicOut;
      _this.minZoomLevel = 1;
      _this.maxZoomLevel = 16;
      _this.className = "ForceDirectedTree";
      _this.seriesContainer.isMeasured = true;
      _this.seriesContainer.layout = "absolute";
      _this.mouseWheelBehavior = "none";
      _this.zoomStep = 2;
      _this.seriesContainer.background.fillOpacity = 0;
      _this.seriesContainer.background.fill = color("#ffffff");
      var zoomOutButton = _this.createChild(ZoomOutButton);
      zoomOutButton.shouldClone = false;
      zoomOutButton.x = percent(100);
      zoomOutButton.horizontalCenter = "right";
      zoomOutButton.valign = "top";
      zoomOutButton.zIndex = Number.MAX_SAFE_INTEGER;
      zoomOutButton.marginTop = 5;
      zoomOutButton.marginRight = 5;
      zoomOutButton.isMeasured = false;
      zoomOutButton.adapter.add("dx", function(dx, target) {
        return -zoomOutButton.marginRight;
      });
      zoomOutButton.hide(0);
      _this.zoomOutButton = zoomOutButton;
      _this.addDisposer(_this.seriesContainer.events.on("sizechanged", function() {
        if (_this.seriesContainer.scale != 1) {
          _this.zoomOutButton.show();
        } else {
          _this.zoomOutButton.hide();
        }
      }));
      var interaction = getInteraction();
      _this._disposers.push(interaction.body.events.on("down", function(event) {
        if (_this.zoomable) {
          var svgPoint = documentPointToSvg(event.pointer.point, _this.htmlContainer);
          if (svgPoint.x > 0 && svgPoint.y > 0 && svgPoint.x < _this.svgContainer.width && svgPoint.y < _this.svgContainer.height) {
            _this.seriesContainer.dragStart(event.pointer);
          }
        }
      }, _this));
      _this._disposers.push(interaction.body.events.on("up", function(event) {
        if (_this.zoomable) {
          _this.seriesContainer.dragStop(event.pointer, true);
        }
      }, _this));
      _this.applyTheme();
      return _this;
    }
    ForceDirectedTree2.prototype.createSeries = function() {
      return new ForceDirectedSeries();
    };
    ForceDirectedTree2.prototype.createDataItem = function() {
      return new ForceDirectedTreeDataItem();
    };
    ForceDirectedTree2.prototype.feedLegend = function() {
      var legend = this.legend;
      if (legend) {
        var legendData_1 = [];
        this.series.each(function(series) {
          if (!series.hiddenInLegend) {
            var dataItems = series.dataItems;
            if (dataItems.length == 1) {
              var children = series.dataItems.getIndex(0).children;
              if (children && children.length > 0) {
                dataItems = children;
              }
            }
            dataItems.each(function(dataItem) {
              if (!dataItem.hiddenInLegend) {
                legendData_1.push(dataItem);
                var legendSettings = series.legendSettings;
                if (legendSettings) {
                  if (legendSettings.labelText) {
                    legend.labels.template.text = legendSettings.labelText;
                  }
                  if (legendSettings.itemLabelText) {
                    legend.labels.template.text = legendSettings.itemLabelText;
                  }
                  if (legendSettings.valueText) {
                    legend.valueLabels.template.text = legendSettings.valueText;
                  }
                  if (legendSettings.itemValueText) {
                    legend.valueLabels.template.text = legendSettings.itemValueText;
                  }
                }
              }
            });
          }
        });
        legend.data = legendData_1;
        legend.dataFields.name = "name";
      }
    };
    ForceDirectedTree2.prototype.applyInternalDefaults = function() {
      _super.prototype.applyInternalDefaults.call(this);
      if (!hasValue(this.readerTitle)) {
        this.readerTitle = this.language.translate("Force directed tree");
      }
    };
    ForceDirectedTree2.prototype.getExporting = function() {
      var _this = this;
      var exporting = _super.prototype.getExporting.call(this);
      exporting.adapter.add("formatDataFields", function(info) {
        if (info.format == "csv" || info.format == "xlsx") {
          _this.series.each(function(series) {
            if (hasValue(series.dataFields.children)) {
              delete info.dataFields[series.dataFields.children];
            }
          });
        }
        return info;
      });
      return exporting;
    };
    ForceDirectedTree2.prototype.handleWheel = function(event) {
      var point = documentPointToSprite(event.point, this.seriesContainer);
      var zoomLevel = this.seriesContainer.scale;
      if (event.shift.y < 0) {
        zoomLevel *= this.zoomStep;
      } else {
        zoomLevel /= this.zoomStep;
      }
      zoomLevel = fitToRange(zoomLevel, this.minZoomLevel, this.maxZoomLevel);
      this.zoomToPoint(point, zoomLevel);
    };
    ForceDirectedTree2.prototype.zoomToPoint = function(point, zoomLevel, center) {
      var container = this.seriesContainer;
      var svgPoint;
      if (center) {
        svgPoint = { x: this.maxWidth / 2, y: this.maxHeight / 2 };
      } else {
        svgPoint = spritePointToSvg(point, container);
      }
      var x3 = svgPoint.x - point.x * zoomLevel;
      var y3 = svgPoint.y - point.y * zoomLevel;
      container.animate([{ property: "scale", to: zoomLevel }, { property: "x", to: x3 }, { property: "y", to: y3 }], this.zoomDuration, this.zoomEasing);
    };
    ForceDirectedTree2.prototype.zoomToDataItem = function(dataItem, zoomLevel, center) {
      var x3 = dataItem.node.pixelX;
      var y3 = dataItem.node.pixelY;
      if (!isNumber(zoomLevel)) {
        zoomLevel = this.seriesContainer.scale * this.zoomStep;
      }
      this.zoomToPoint({ x: x3, y: y3 }, zoomLevel, center);
    };
    ForceDirectedTree2.prototype.zoomOut = function() {
      var container = this.seriesContainer;
      this.zoomToPoint({ x: container.pixelWidth / 2, y: container.pixelHeight / 2 }, 1, true);
    };
    Object.defineProperty(ForceDirectedTree2.prototype, "zoomable", {
      /**
       * @return Zoomable
       */
      get: function() {
        return this.getPropertyValue("zoomable");
      },
      /**
       * When user zooms in or out current zoom level is multiplied or divided
       * by value of this setting.
       *
       * @default false
       * @since 4.10.0
       * @see {@link https://www.amcharts.com/docs/v4/chart-types/force-directed/#Zooming} for more information about zooming ForceDirectedTree
       * @param value  Zoomable
       */
      set: function(value) {
        var _this = this;
        if (this.setPropertyValue("zoomable", value)) {
          if (value) {
            this.seriesContainer.resizable = true;
            this.seriesContainer.draggable = true;
            this.seriesContainer.dragWhileResize = true;
            this.mouseWheelBehavior = "zoom";
            this._backgroundZoomoutDisposer = this.seriesContainer.background.events.on("hit", function() {
              _this.zoomOut();
            }, this, false);
            this._disposers.push(this._backgroundZoomoutDisposer);
            this._disposers.push(this.seriesContainer.events.on("sizechanged", function() {
              _this.series.each(function(series) {
                series.nodes.each(function(node) {
                  node.updateLabelSize();
                });
              });
            }));
          } else {
            this.seriesContainer.resizable = false;
            this.seriesContainer.draggable = false;
            this.seriesContainer.dragWhileResize = false;
            this.mouseWheelBehavior = "none";
            if (this._backgroundZoomoutDisposer) {
              this._backgroundZoomoutDisposer.dispose();
            }
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedTree2.prototype, "mouseWheelBehavior", {
      /**
       * @return Mouse wheel behavior
       */
      get: function() {
        return this.getPropertyValue("mouseWheelBehavior");
      },
      /**
       * Specifies what should chart do if when mouse wheel is rotated.
       *
       * @param Mouse wheel behavior
       * @since 4.10.0
       * @default none
       */
      set: function(value) {
        if (this.setPropertyValue("mouseWheelBehavior", value)) {
          if (value != "none") {
            this._mouseWheelDisposer = this.chartContainer.events.on("wheel", this.handleWheel, this, false);
            this._disposers.push(this._mouseWheelDisposer);
          } else {
            if (this._mouseWheelDisposer) {
              this._mouseWheelDisposer.dispose();
            }
            this.chartContainer.wheelable = false;
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedTree2.prototype, "zoomStep", {
      /**
       * @return Zoom factor
       */
      get: function() {
        return this.getPropertyValue("zoomStep");
      },
      /**
       * When user zooms in or out current zoom level is multiplied or divided
       * by value of this setting.
       *
       * @since 4.10.0
       * @default 2
       * @param value  Zoom factor
       */
      set: function(value) {
        this.setPropertyValue("zoomStep", value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ForceDirectedTree2.prototype, "zoomOutButton", {
      /**
       * @return Zoom out button
       */
      get: function() {
        return this._zoomOutButton;
      },
      /**
       * A [[Button]] element that is used for zooming out the chart.
       *
       * This button appears only when chart is zoomed in, and disappears
       * autoamatically when it is zoome dout.
       *
       * @param button  Zoom out button
       */
      set: function(button) {
        var _this = this;
        this._zoomOutButton = button;
        if (button) {
          button.events.on("hit", function() {
            _this.zoomOut();
          }, void 0, false);
        }
      },
      enumerable: true,
      configurable: true
    });
    return ForceDirectedTree2;
  }(SerialChart)
);
registry.registeredClasses["ForceDirectedTree"] = ForceDirectedTree;
registry.registeredClasses["ForceDirectedTreeDataItem"] = ForceDirectedTreeDataItem;
export {
  ForceDirectedLink,
  ForceDirectedNode,
  ForceDirectedSeries,
  ForceDirectedSeriesDataItem,
  ForceDirectedTree,
  ForceDirectedTreeDataItem
};
//# sourceMappingURL=@amcharts_amcharts4_plugins_forceDirected.js.map

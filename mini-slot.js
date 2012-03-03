(function() {
  var MiniSlot, exports;

  MiniSlot = (function() {
    var _br, _default;

    _br = "<br/>";

    _default = {
      duration: 300,
      dataVar: "shift",
      easing: "cubic-bezier(0.860, 0.000, 0.070, 1.000)"
    };

    function MiniSlot(el, duration, opts) {
      this.el = el;
      this.duration = duration != null ? duration : 500;
      if (opts == null) opts = {};
      this.doc = this.el.ownerDocument;
      this.fontSize = (typeof window !== "undefined" && window !== null ? window.getComputedStyle(this.el, '').getPropertyValue("font-size") : void 0) || '16px';
      this.appendStyle();
    }

    MiniSlot.prototype.getDigits = function(val) {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = val.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        _results.push(parseInt(val.charAt(i), 10));
      }
      return _results;
    };

    MiniSlot.prototype.createDOMString = function() {
      var digit, targetDigits, targetVal, _i, _j, _len, _results, _str;
      targetVal = this.el.getAttribute('data-target');
      targetDigits = this.getDigits(targetVal);
      _str = [];
      for (_i = 0, _len = targetDigits.length; _i < _len; _i++) {
        digit = targetDigits[_i];
        _str.push(("<div class=\"digit-sequence\" data-shift=\"" + (100 * digit / (digit + 1)) + "\">\n  " + ((function() {
          _results = [];
          for (var _j = 0; 0 <= digit ? _j <= digit : _j >= digit; 0 <= digit ? _j++ : _j--){ _results.push(_j); }
          return _results;
        }).apply(this).join(_br)) + "\n</div>").replace(/\n|\s{2,}/gi, ''));
      }
      return _str;
    };

    MiniSlot.prototype.appendSequence = function() {
      return this.el.innerHTML = this.createDOMString().join('\n');
    };

    MiniSlot.prototype.setTargetValue = function(delay) {
      var i, length, sequence, sequences, _fn, _len;
      if (delay == null) delay = 300;
      sequences = this.el.querySelectorAll('.digit-sequence');
      length = sequences.length;
      _fn = function(sequence, delay) {
        return setTimeout(function() {
          var shiftVal;
          shiftVal = sequence.getAttribute('data-shift');
          sequence.style.webkitTransform = "translate3d(0, -" + shiftVal + "%, 0)";
          return sequence.style.mozTransform = "translate(0, -" + shiftVal + "%)";
        }, delay);
      };
      for (i = 0, _len = sequences.length; i < _len; i++) {
        sequence = sequences[i];
        _fn(sequence, (length - 1 - i) * delay);
      }
    };

    MiniSlot.prototype.unsetTargetValue = function() {
      var sequence, sequences, shiftVal, _i, _len;
      sequences = this.el.querySelectorAll('.digit-sequence');
      for (_i = 0, _len = sequences.length; _i < _len; _i++) {
        sequence = sequences[_i];
        shiftVal = sequence.getAttribute('data-shift');
        sequence.style.webkitTransform = "translate3d(0, 0%, 0)";
        sequence.style.mozTransform = "translate(0, 0%)";
      }
    };

    MiniSlot.prototype.appendStyle = function() {
      var css, styles;
      this.el.style.height = this.fontSize;
      this.el.style.overflow = 'hidden';
      this.el.style.display = "inline-block";
      if (document.getElementById('mini-slot-style') != null) return;
      css = this.doc.createElement('style');
      css.id = 'mini-slot-style';
      styles = ".digit-sequence{\n  display: inline-block;\n  overflow: hidden;\n  float: left;\n  -webkit-transition: -webkit-transform " + this.duration + "ms;\n  -moz-transition: " + this.duration + "ms;\n  transition: " + this.duration + "ms;\n}";
      if (css.styleSheet) {
        css.styleSheet.cssText = styles;
      } else {
        css.appendChild(this.doc.createTextNode(styles));
      }
      return this.doc.getElementsByTagName("head")[0].appendChild(css);
    };

    return MiniSlot;

  })();

  if (typeof exports !== "undefined" && exports !== null) {
    exports = module.exports = MiniSlot;
  } else if (typeof require === "function" && ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null)) {
    define(function() {
      return MiniSlot;
    });
  } else {
    window.MiniSlot = MiniSlot;
  }

}).call(this);

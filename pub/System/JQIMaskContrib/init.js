"use strict";

(function($) {
  $(".imask").livequery(function() {
    var $this = $(this), 
        opts = $this.data(),
        type = opts.type,
        mask, unmaskOnSubmit = false;

    switch (opts.type) {
      case 'regex':
      case 'regexp':
        opts.mask = new RegExp(opts.mask);
        break;

      case 'number':
        opts = $.extend({}, {
          mask: Number,
          mapToRadix: [","],
          radix: ".",
        }, opts);
        break;

      case 'currency':
        opts = $.extend({}, {
          mask: Number,
          thousandsSeparator: "",
          scale: 2,
          padFractionalZeros: true,
          mapToRadix: ["."],
          radix: ",",
        }, opts);

        break;

      case 'time':
        opts.mask = Date;
        opts.pattern = 'HH:mm',
        opts.overwrite = true;
        //opts.autofix = true;
        //opts.lazy = false;

        opts.blocks = {    
          HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23
          },
          mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59
          }
        };
        opts.format = function(date) {
          return sprintf("%02d:%02d", date.getHours(), date.getMinutes());
        };
        opts.parse = function(str) {
          var hourMin = str.split(':'),
              date = new Date();

          date.setHours(hourMin[0]);
          date.setMinutes(hourMin[1]);

          return date;
        };

        break;

      case 'date':
        opts.mask = Date;
        break;

      case 'enum':
        opts.mask = IMask.MaskedEnum;
        if (typeof(opts.enum) === 'string') {
          opts.enum = opts.enum.split(/\s*,\s*/);
        }
        break;

      case 'range':
        opts.mask = IMask.MaskedRange;
        break;

      case 'ipv4':
        opts.mask = "1.0.0.0";
        opts.blocks = {
          "1": {
            "mask": Number,
            "min": 1,
            "max": 255,
            "scale": 0
          },
          "0": {
            "mask": Number,
            "min": 0,
            "max": 255,
            "scale": 0
          }
        }
        break;

      case 'mac':
        opts.mask = "ff:ff:ff:ff:ff:ff";
        opts.definitions = {
          "f": /[\da-f]/
        }
        break;

      case 'cidr': 
        opts.mask = "1.0.0.0/m";
        opts.blocks = {
          "1": {
            "mask": Number,
            "min": 1,
            "max": 255,
            "scale": 0
          },
          "0": {
            "mask": Number,
            "min": 0,
            "max": 255,
            "scale": 0
          },
          "m": {
            "mask": Number,
            "min": 1,
            "max": 32,
            "scale": 0
          }
        }
    }

    mask = IMask(this, opts);

    if (this.form && unmaskOnSubmit) {
      $(this.form).on("submit", function() {
        //console.log("unmasking value");
        $this.val(mask.unmaskedValue);
      });
    }

    $this.data("imask", mask);
  });
})(jQuery);

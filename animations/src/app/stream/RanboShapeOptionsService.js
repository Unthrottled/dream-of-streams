"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomColor = require('randomcolor');
var RanboShapeOptionsService = /** @class */ (function () {
    function RanboShapeOptionsService() {
    }
    RanboShapeOptionsService.createStreamOption = function () {
        var color = randomColor(new Date().getSeconds());
        return {
            stroke: { color: 'black', width: 2, opacity: 15 },
            fill: { color: color, opacity: 0.75 }
        };
    };
    return RanboShapeOptionsService;
}());
exports.RanboShapeOptionsService = RanboShapeOptionsService;
//# sourceMappingURL=RanboShapeOptionsService.js.map
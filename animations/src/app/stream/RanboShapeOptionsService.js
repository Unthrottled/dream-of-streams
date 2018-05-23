"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RanboShapeOptionsService = /** @class */ (function () {
    function RanboShapeOptionsService() {
    }
    RanboShapeOptionsService.createStreamOption = function () {
        var randomInt = RanboShapeOptionsService.getRandomInt(0, RanboShapeOptionsService.colors.length - 1);
        var color = RanboShapeOptionsService.colors[randomInt];
        return {
            stroke: { color: 'black', width: 2, opacity: 15 },
            fill: { color: color, opacity: 0.75 }
        };
    };
    RanboShapeOptionsService.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    RanboShapeOptionsService.colors = [
        'black',
        'red',
        'orange',
        'yellow',
        'green',
        'cyan',
        'blue',
        'indigo',
        'violet',
        'purple',
        'pink'
    ];
    return RanboShapeOptionsService;
}());
exports.RanboShapeOptionsService = RanboShapeOptionsService;
//# sourceMappingURL=RanboShapeOptionsService.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_drawing_1 = require("@progress/kendo-drawing");
var RanboShapeOptionsService_1 = require("./RanboShapeOptionsService");
var SingleStreamItem_1 = require("./SingleStreamItem");
var Observable_1 = require("rxjs/Observable");
var MultiStreamItem_1 = require("./MultiStreamItem");
var SquareStreamItemService = /** @class */ (function () {
    function SquareStreamItemService() {
    }
    SquareStreamItemService.prototype.createStreamItems = function (thisMany, options) {
        var _this = this;
        return new MultiStreamItem_1.MultiStreamItem(Observable_1.Observable.create(function (observer) {
            var itemToEmit = _this.createSquare(options);
            for (var i = 0; i < 4; ++i) {
                observer.next(itemToEmit);
            }
            observer.complete();
        }));
    };
    SquareStreamItemService.prototype.createStreamItem = function (options) {
        return new SingleStreamItem_1.SingleStreamItem(Observable_1.Observable.of(this.createSquare(options)));
    };
    SquareStreamItemService.prototype.createSquare = function (options) {
        // Create the circle geometry and element
        var path = new kendo_drawing_1.Path((options && options()) || RanboShapeOptionsService_1.RanboShapeOptionsService.createStreamOption());
        path.moveTo(0, 0)
            .lineTo(0, 50)
            .lineTo(50, 50)
            .lineTo(50, 0)
            .close();
        return path;
    };
    SquareStreamItemService = __decorate([
        core_1.Injectable()
    ], SquareStreamItemService);
    return SquareStreamItemService;
}());
exports.SquareStreamItemService = SquareStreamItemService;
//# sourceMappingURL=SquareStreamItemService.js.map
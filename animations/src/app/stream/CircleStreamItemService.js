"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_drawing_1 = require("@progress/kendo-drawing");
var geometry_1 = require("@progress/kendo-drawing/geometry");
var RanboShapeOptionsService_1 = require("./RanboShapeOptionsService");
var SingleStreamItem_1 = require("./SingleStreamItem");
var Observable_1 = require("rxjs/Observable");
var MultiStreamItem_1 = require("./MultiStreamItem");
var CircleStreamItemService = /** @class */ (function () {
    function CircleStreamItemService() {
    }
    //todo: probably should have a base stream item factory :\
    CircleStreamItemService.prototype.createStreamItems = function (thisMany, options) {
        var _this = this;
        return new MultiStreamItem_1.MultiStreamItem(Observable_1.Observable.create(function (observer) {
            var itemToEmit = function () { return _this.createCircle(options); };
            for (var i = 0; i < thisMany; ++i) {
                observer.next(itemToEmit());
            }
            observer.complete();
        }));
    };
    CircleStreamItemService.prototype.createStreamItem = function (options) {
        return new SingleStreamItem_1.SingleStreamItem(Observable_1.Observable.of(this.createCircle(options)));
    };
    CircleStreamItemService.prototype.createCircle = function (options) {
        // Create the circle geometry and element
        return new kendo_drawing_1.Circle(new geometry_1.Circle([25, 25], 20), (options && options()) ||
            RanboShapeOptionsService_1.RanboShapeOptionsService.createStreamOption());
    };
    CircleStreamItemService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CircleStreamItemService);
    return CircleStreamItemService;
}());
exports.CircleStreamItemService = CircleStreamItemService;
//# sourceMappingURL=CircleStreamItemService.js.map
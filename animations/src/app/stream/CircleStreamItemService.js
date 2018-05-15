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
var StreamItem_1 = require("./StreamItem");
var kendo_drawing_1 = require("@progress/kendo-drawing");
var geometry_1 = require("@progress/kendo-drawing/geometry");
var RanboShapeOptionsService_1 = require("./RanboShapeOptionsService");
var CircleStreamItemService = /** @class */ (function () {
    function CircleStreamItemService() {
    }
    CircleStreamItemService.prototype.createStreamItem = function (options) {
        return new StreamItem_1.StreamItem(this.createCircle(options));
    };
    CircleStreamItemService.prototype.createCircle = function (options) {
        // Create the circle geometry and element
        return new kendo_drawing_1.Circle(new geometry_1.Circle([25, 25], 20), options ||
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
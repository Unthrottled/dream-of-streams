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
var SquareStreamItemService_1 = require("../../stream/SquareStreamItemService");
var CircleStreamItemService_1 = require("../../stream/CircleStreamItemService");
var TriangleStreamItemService_1 = require("../../stream/TriangleStreamItemService");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var MultiStreamItem_1 = require("../../stream/MultiStreamItem");
var FlatmapSimpleComponent = /** @class */ (function () {
    function FlatmapSimpleComponent(triangleFactory, hip2B, circleService) {
        var _this = this;
        this.triangleFactory = triangleFactory;
        this.hip2B = hip2B;
        this.circleService = circleService;
        this.mapTwo = {
            apply: function (streamItem) {
                var element = streamItem.element[0];
                var elements = _this.circleService.createStreamItems(4, function () {
                    return {
                        fill: element.options.get('fill'),
                        stroke: element.options.get('stroke'),
                    };
                }).element;
                return new MultiStreamItem_1.MultiStreamItem(elements);
            }
        };
        this.streamSourceTwo = new BehaviorSubject_1.BehaviorSubject(null);
        this.inputStreamTwo = this.streamSourceTwo.filter(function (item) { return !!item; });
        this.sourceSubjectTwo = new BehaviorSubject_1.BehaviorSubject(null);
        this.sourceOutputTwo = this.sourceSubjectTwo.filter(function (item) { return !!item; });
    }
    FlatmapSimpleComponent.prototype.startStreamTwo = function () {
        this.streamSourceTwo.next(this.triangleFactory.createStreamItem());
    };
    FlatmapSimpleComponent.prototype.sourceCompleteTwo = function (item) {
        this.sourceSubjectTwo.next(item);
    };
    FlatmapSimpleComponent = __decorate([
        core_1.Component({
            selector: 'flatmap-view',
            template: require('./flatmap.simple.component.htm')
        }),
        __metadata("design:paramtypes", [TriangleStreamItemService_1.TriangleStreamItemService,
            SquareStreamItemService_1.SquareStreamItemService,
            CircleStreamItemService_1.CircleStreamItemService])
    ], FlatmapSimpleComponent);
    return FlatmapSimpleComponent;
}());
exports.FlatmapSimpleComponent = FlatmapSimpleComponent;
//# sourceMappingURL=flatmap.simple.component.js.map
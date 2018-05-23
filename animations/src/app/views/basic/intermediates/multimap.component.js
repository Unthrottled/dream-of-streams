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
require("./multimap.component.htm");
var SingleStreamItem_1 = require("../../../stream/SingleStreamItem");
var Observable_1 = require("rxjs/Observable");
var Rx_1 = require("rxjs/Rx");
var SquareStreamItemService_1 = require("../../../stream/SquareStreamItemService");
var CircleStreamItemService_1 = require("../../../stream/CircleStreamItemService");
var TriangleStreamItemService_1 = require("../../../stream/TriangleStreamItemService");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var RanboShapeOptionsService_1 = require("../../../stream/RanboShapeOptionsService");
var MultimapComponent = /** @class */ (function () {
    function MultimapComponent(triangleFactory, hip2B, circleService) {
        var _this = this;
        this.triangleFactory = triangleFactory;
        this.hip2B = hip2B;
        this.circleService = circleService;
        this.flatMapOne = {
            apply: function (streamItem) { return Observable_1.Observable.create(function (observer) {
                var index = -1;
                var objectFactories = [
                    _this.triangleFactory,
                    _this.hip2B,
                    _this.circleService
                ];
                var triangle = function () {
                    return objectFactories[index = ++index % objectFactories.length].createStreamItem(function () {
                        var element = streamItem.element[0];
                        return {
                            fill: element.options.get("fill"),
                            stroke: element.options.get("stroke"),
                        };
                    });
                };
                observer.next(triangle());
                Observable_1.Observable.interval(750, Rx_1.Scheduler.async)
                    .take(5)
                    .subscribe(function (_) { return observer.next(triangle()); }, observer.error, observer.complete);
            }); }
        };
        this.itemsToMoveAlong = [];
        this.sourceOutputSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.sourceOutputStream = this.sourceOutputSubject.filter(function (item) { return !!item; });
        this.flatMapSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.streamSourceInputSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.streamSourceInput = this.streamSourceInputSubject.filter(function (item) { return !!item; });
        this.listIndex = -1;
    }
    MultimapComponent_1 = MultimapComponent;
    MultimapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.list = this.circleService.createStreamItems(MultimapComponent_1.numItems, RanboShapeOptionsService_1.RanboShapeOptionsService.createStreamOption);
        this.list.element
            .map(function (el) { return [el]; })
            .map(function (element) { return new SingleStreamItem_1.SingleStreamItem(element); })
            .forEach(function (item) { return _this.itemsToMoveAlong.push(item); });
    };
    MultimapComponent.prototype.sourceComplete = function (item) {
        this.sourceOutputSubject.next(item);
    };
    MultimapComponent.prototype.flatMapOneComplete = function (steamItem) {
        this.flatMapSubject.next(steamItem);
    };
    MultimapComponent.prototype.startStreamOne = function () {
        var itemIndex = this.listIndex = ++this.listIndex % MultimapComponent_1.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    };
    MultimapComponent.numItems = 6;
    MultimapComponent = MultimapComponent_1 = __decorate([
        core_1.Component({
            selector: 'multi-map-view',
            template: require('./multimap.component.htm')
        }),
        __metadata("design:paramtypes", [TriangleStreamItemService_1.TriangleStreamItemService,
            SquareStreamItemService_1.SquareStreamItemService,
            CircleStreamItemService_1.CircleStreamItemService])
    ], MultimapComponent);
    return MultimapComponent;
    var MultimapComponent_1;
}());
exports.MultimapComponent = MultimapComponent;
//# sourceMappingURL=multimap.component.js.map
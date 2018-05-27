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
require("./flatmap.101.component.htm");
var SingleStreamItem_1 = require("../../../stream/SingleStreamItem");
var Observable_1 = require("rxjs/Observable");
var Rx_1 = require("rxjs/Rx");
var SquareStreamItemService_1 = require("../../../stream/SquareStreamItemService");
var CircleStreamItemService_1 = require("../../../stream/CircleStreamItemService");
var TriangleStreamItemService_1 = require("../../../stream/TriangleStreamItemService");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var MultiStreamItem_1 = require("../../../stream/MultiStreamItem");
var RanboShapeOptionsService_1 = require("../../../stream/RanboShapeOptionsService");
var ImageUtility_1 = require("../../../utilities/ImageUtility");
var Flatmap101Component = /** @class */ (function () {
    function Flatmap101Component(triangleFactory, hip2B, circleService) {
        var _this = this;
        this.triangleFactory = triangleFactory;
        this.hip2B = hip2B;
        this.circleService = circleService;
        this.mapOne = {
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
        this.flatMapOne = {
            apply: function (streamItem) { return Observable_1.Observable.create(function (observer) {
                var items = streamItem.element;
                var index = 0;
                var triangle = function () {
                    return new SingleStreamItem_1.SingleStreamItem([items[index++]]);
                };
                observer.next(triangle());
                Observable_1.Observable.interval(750, Rx_1.Scheduler.async)
                    .take(items.length - 1)
                    .subscribe(function (_) { return observer.next(triangle()); }, observer.error, observer.complete);
            }); }
        };
        this.itemsToMoveAlong = [];
        this.sourceOutputSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.sourceOutputStream = this.sourceOutputSubject.filter(function (item) { return !!item; });
        this.mapSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.mapOutputStream = this.mapSubject.filter(function (item) { return !!item; });
        this.flatMapSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.streamSourceInputSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.streamSourceInput = this.streamSourceInputSubject.filter(function (item) { return !!item; });
        this.listIndex = -1;
        this.sourcePicture = ImageUtility_1.ImageUtility.circleSource;
        this.circleListPicture = ImageUtility_1.ImageUtility.circleList;
        this.flatmapPicture = ImageUtility_1.ImageUtility.circleMany;
    }
    Flatmap101Component_1 = Flatmap101Component;
    Flatmap101Component.prototype.ngOnInit = function () {
        var _this = this;
        this.list = this.circleService.createStreamItems(Flatmap101Component_1.numItems, RanboShapeOptionsService_1.RanboShapeOptionsService.createStreamOption);
        this.list.element
            .map(function (el) { return [el]; })
            .map(function (element) { return new SingleStreamItem_1.SingleStreamItem(element); })
            .forEach(function (item) { return _this.itemsToMoveAlong.push(item); });
    };
    Flatmap101Component.prototype.sourceComplete = function (item) {
        this.sourceOutputSubject.next(item);
    };
    Flatmap101Component.prototype.flatMapOneComplete = function (steamItem) {
        this.flatMapSubject.next(steamItem);
    };
    Flatmap101Component.prototype.mapOneComplete = function (steamItem) {
        this.mapSubject.next(steamItem);
    };
    Flatmap101Component.prototype.startStreamOne = function () {
        var itemIndex = this.listIndex = ++this.listIndex % Flatmap101Component_1.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    };
    Flatmap101Component.numItems = 6;
    Flatmap101Component = Flatmap101Component_1 = __decorate([
        core_1.Component({
            selector: 'flatmap-view',
            template: require('./flatmap.101.component.htm')
        }),
        __metadata("design:paramtypes", [TriangleStreamItemService_1.TriangleStreamItemService,
            SquareStreamItemService_1.SquareStreamItemService,
            CircleStreamItemService_1.CircleStreamItemService])
    ], Flatmap101Component);
    return Flatmap101Component;
    var Flatmap101Component_1;
}());
exports.Flatmap101Component = Flatmap101Component;
//# sourceMappingURL=flatmap.101.component.js.map
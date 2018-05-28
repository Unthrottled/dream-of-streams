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
require("./collection.source.component.htm");
var SingleStreamItem_1 = require("../../../stream/SingleStreamItem");
var CircleStreamItemService_1 = require("../../../stream/CircleStreamItemService");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var RanboShapeOptionsService_1 = require("../../../stream/RanboShapeOptionsService");
var ImageUtility_1 = require("../../../utilities/ImageUtility");
var CollectionSourceComponent = /** @class */ (function () {
    function CollectionSourceComponent(circleService) {
        this.circleService = circleService;
        this.picture = ImageUtility_1.ImageUtility.circleSource;
        this.itemsToMoveAlong = [];
        this.streamSourceInputSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.streamSourceInput = this.streamSourceInputSubject.filter(function (item) { return !!item; });
        this.listIndex = -1;
    }
    CollectionSourceComponent_1 = CollectionSourceComponent;
    CollectionSourceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.list = this.circleService.createStreamItems(CollectionSourceComponent_1.numItems, RanboShapeOptionsService_1.RanboShapeOptionsService.createStreamOption);
        this.list.element
            .map(function (el) { return [el]; })
            .map(function (element) { return new SingleStreamItem_1.SingleStreamItem(element); })
            .forEach(function (item) { return _this.itemsToMoveAlong.push(item); });
        this.startStreamOne();
    };
    CollectionSourceComponent.prototype.sourceComplete = function (item) {
        this.startStreamOne();
    };
    CollectionSourceComponent.prototype.startStreamOne = function () {
        var itemIndex = this.listIndex = ++this.listIndex % CollectionSourceComponent_1.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    };
    CollectionSourceComponent.numItems = 6;
    CollectionSourceComponent = CollectionSourceComponent_1 = __decorate([
        core_1.Component({
            selector: 'list-view',
            template: require('./collection.source.component.htm')
        }),
        __metadata("design:paramtypes", [CircleStreamItemService_1.CircleStreamItemService])
    ], CollectionSourceComponent);
    return CollectionSourceComponent;
    var CollectionSourceComponent_1;
}());
exports.CollectionSourceComponent = CollectionSourceComponent;
//# sourceMappingURL=collection-source.component.js.map
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
require("./list.source.component.htm");
var CircleStreamItemService_1 = require("../../../stream/CircleStreamItemService");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var RanboShapeOptionsService_1 = require("../../../stream/RanboShapeOptionsService");
var ListSourceComponent = /** @class */ (function () {
    function ListSourceComponent(circleService) {
        this.circleService = circleService;
        this.itemsToMoveAlong = [];
        this.streamSourceInputSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.streamSourceInput = this.streamSourceInputSubject.filter(function (item) { return !!item; });
        this.listIndex = -1;
    }
    ListSourceComponent_1 = ListSourceComponent;
    ListSourceComponent.prototype.ngOnInit = function () {
        this.list = this.circleService.createStreamItems(ListSourceComponent_1.numItems, RanboShapeOptionsService_1.RanboShapeOptionsService.createStreamOption);
        //todo: figure this out
        // this.list.element
        //     .map(el=>Observable.of(el))
        //     .map(element=>new SingleStreamItem(element))
        //     .subscribe(item=> this.itemsToMoveAlong.push(item), er=>{},
        //         ()=> this.startStreamOne());
    };
    ListSourceComponent.prototype.sourceComplete = function (item) {
        this.startStreamOne();
    };
    ListSourceComponent.prototype.startStreamOne = function () {
        var itemIndex = this.listIndex = ++this.listIndex % ListSourceComponent_1.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    };
    ListSourceComponent.numItems = 6;
    ListSourceComponent = ListSourceComponent_1 = __decorate([
        core_1.Component({
            selector: 'list-view',
            template: require('./list.source.component.htm')
        }),
        __metadata("design:paramtypes", [CircleStreamItemService_1.CircleStreamItemService])
    ], ListSourceComponent);
    return ListSourceComponent;
    var ListSourceComponent_1;
}());
exports.ListSourceComponent = ListSourceComponent;
//# sourceMappingURL=list.source.component.js.map
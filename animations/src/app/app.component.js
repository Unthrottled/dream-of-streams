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
require("./app.component.htm");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var TriangleStreamItemService_1 = require("./stream/TriangleStreamItemService");
var SquareStreamItemService_1 = require("./stream/SquareStreamItemService");
var MultiStreamItem_1 = require("./stream/MultiStreamItem");
var CircleStreamItemService_1 = require("./stream/CircleStreamItemService");
var AppComponent = /** @class */ (function () {
    function AppComponent(triangleFactory, hip2B, circleService) {
        var _this = this;
        this.triangleFactory = triangleFactory;
        this.hip2B = hip2B;
        this.circleService = circleService;
        this.mapTwo = {
            apply: function (streamItem) {
                return new MultiStreamItem_1.MultiStreamItem(streamItem.element.flatMap(function (element) {
                    return _this.circleService.createStreamItems(4, {
                        fill: element.options.get('fill'),
                        stroke: element.options.get('stroke'),
                    }).element;
                }));
            }
        };
        this.streamSourceTwo = new BehaviorSubject_1.BehaviorSubject(null);
        this.inputStreamTwo = this.streamSourceTwo.filter(function (item) { return !!item; });
        this.sourceSubjectTwo = new BehaviorSubject_1.BehaviorSubject(null);
        this.sourceOutputTwo = this.sourceSubjectTwo.filter(function (item) { return !!item; });
    }
    AppComponent.prototype.startStreamTwo = function () {
        this.streamSourceTwo.next(this.triangleFactory.createStreamItem());
    };
    AppComponent.prototype.sourceCompleteTwo = function (item) {
        this.sourceSubjectTwo.next(item);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'angular-application',
            template: require('./app.component.htm')
        }),
        __metadata("design:paramtypes", [TriangleStreamItemService_1.TriangleStreamItemService,
            SquareStreamItemService_1.SquareStreamItemService,
            CircleStreamItemService_1.CircleStreamItemService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
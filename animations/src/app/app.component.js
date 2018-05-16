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
var StreamItemContainer_1 = require("./stream/StreamItemContainer");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
var Rx_1 = require("rxjs/Rx");
var TriangleStreamItemService_1 = require("./stream/TriangleStreamItemService");
var SquareStreamItemService_1 = require("./stream/SquareStreamItemService");
var AppComponent = /** @class */ (function () {
    function AppComponent(triangleFactory, hip2B) {
        var _this = this;
        this.triangleFactory = triangleFactory;
        this.hip2B = hip2B;
        this.mapOne = {
            apply: function (item) {
                item.items.map(function (streamItem) { return _this.hip2B.createStreamItem({
                    fill: streamItem.element.options.get('fill'),
                    stroke: streamItem.element.options.get('stroke'),
                }); });
                return item;
            }
        };
        this.flatMapOne = {
            apply: function (streamItemContainer) {
                return new StreamItemContainer_1.StreamItemContainer(streamItemContainer.items.flatMap(function (item) {
                    return Observable_1.Observable.create(function (observer) {
                        var triangle = _this.triangleFactory.createStreamItem({
                            fill: item.element.options.get('fill'),
                            stroke: item.element.options.get('stroke'),
                        });
                        observer.next(triangle);
                        Observable_1.Observable.interval(350, Rx_1.Scheduler.async)
                            .take(4)
                            .subscribe(function (_) {
                            console.warn("ayy lemon");
                            return observer.next(triangle);
                        }, observer.error, observer.complete);
                    });
                }), false);
            }
        };
        this.filterOne = {
            apply: function (container) {
                return new StreamItemContainer_1.StreamItemContainer(container.items.filter(function (item) { return item.identifier % 2 === 0; }), false);
            }
        };
        this.sourceSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.sourceOutput = this.sourceSubject.filter(function (item) { return !!item; });
        this.mapSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.mapOutput = this.mapSubject.filter(function (item) { return !!item; });
        this.flatMapSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.flatMapOutput = this.flatMapSubject.filter(function (item) { return !!item; });
    }
    AppComponent.prototype.sourceComplete = function (item) {
        this.sourceSubject.next(item);
    };
    AppComponent.prototype.mapOneComplete = function (steamItem) {
        this.mapSubject.next(steamItem);
    };
    AppComponent.prototype.flatMapOneComplete = function (steamItem) {
        this.flatMapSubject.next(steamItem);
    };
    AppComponent.prototype.filterOneComplete = function (steamItem) {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'angular-application',
            template: require('./app.component.htm')
        }),
        __metadata("design:paramtypes", [TriangleStreamItemService_1.TriangleStreamItemService,
            SquareStreamItemService_1.SquareStreamItemService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
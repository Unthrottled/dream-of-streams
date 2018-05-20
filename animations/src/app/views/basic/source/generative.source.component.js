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
require("./generative.source.component.htm");
var CircleStreamItemService_1 = require("../../../stream/CircleStreamItemService");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var GenerativeSourceComponent = /** @class */ (function () {
    function GenerativeSourceComponent(circleService) {
        this.circleService = circleService;
        this.streamSourceInputSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.streamSourceInput = this.streamSourceInputSubject.filter(function (item) { return !!item; });
    }
    GenerativeSourceComponent.prototype.sourceComplete = function (item) {
        this.startStreamOne();
    };
    GenerativeSourceComponent.prototype.startStreamOne = function () {
        this.streamSourceInputSubject.next(this.circleService.createStreamItem());
    };
    GenerativeSourceComponent.prototype.ngOnInit = function () {
        this.startStreamOne();
    };
    GenerativeSourceComponent = __decorate([
        core_1.Component({
            selector: 'generative-view',
            template: require('./generative.source.component.htm')
        }),
        __metadata("design:paramtypes", [CircleStreamItemService_1.CircleStreamItemService])
    ], GenerativeSourceComponent);
    return GenerativeSourceComponent;
}());
exports.GenerativeSourceComponent = GenerativeSourceComponent;
//# sourceMappingURL=generative.source.component.js.map
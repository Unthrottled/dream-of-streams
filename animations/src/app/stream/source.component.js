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
require("./source.component.htm");
var Observable_1 = require("rxjs/Observable");
var SourceComponent = /** @class */ (function () {
    function SourceComponent() {
        this.outputStream = new core_1.EventEmitter();
    }
    Object.defineProperty(SourceComponent.prototype, "inputStream", {
        get: function () {
            return this._inputStream;
        },
        set: function (value) {
            this._inputStream = value;
        },
        enumerable: true,
        configurable: true
    });
    SourceComponent.prototype.toggleState = function () {
    };
    SourceComponent.prototype.complete = function (streamItemAtEnd) {
        this.outputStream.emit(streamItemAtEnd);
    };
    SourceComponent.prototype.ngOnDestroy = function () {
        // this.subscription.unsubscribe();
    };
    SourceComponent.prototype.ngOnInit = function () {
        // this.subscription = Observable.interval(5000, Scheduler.async)
        //     .subscribe(_=>this.toggleState());
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SourceComponent.prototype, "outputStream", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Observable_1.Observable),
        __metadata("design:paramtypes", [Observable_1.Observable])
    ], SourceComponent.prototype, "inputStream", null);
    SourceComponent = __decorate([
        core_1.Component({
            selector: 'stream-source',
            template: require('./source.component.htm'),
            animations: []
        })
    ], SourceComponent);
    return SourceComponent;
}());
exports.SourceComponent = SourceComponent;
//# sourceMappingURL=source.component.js.map
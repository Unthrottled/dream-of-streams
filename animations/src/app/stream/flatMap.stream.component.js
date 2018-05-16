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
require("./flatMap.stream.component.htm");
var Observable_1 = require("rxjs/Observable");
var FlatMapStreamComponent = /** @class */ (function () {
    function FlatMapStreamComponent() {
        this.outputStream = new core_1.EventEmitter();
    }
    Object.defineProperty(FlatMapStreamComponent.prototype, "mappingFunction", {
        get: function () {
            return this._mappingFunction;
        },
        set: function (value) {
            this._mappingFunction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlatMapStreamComponent.prototype, "inputStream", {
        get: function () {
            return this._inputStream;
        },
        set: function (value) {
            var _this = this;
            this._inputStream = value.flatMap(function (item) { return _this.mappingFunction.apply(item); });
        },
        enumerable: true,
        configurable: true
    });
    FlatMapStreamComponent.prototype.complete = function (streamItemAtEnd) {
        this.outputStream.emit(streamItemAtEnd);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FlatMapStreamComponent.prototype, "outputStream", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FlatMapStreamComponent.prototype, "mappingFunction", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Observable_1.Observable),
        __metadata("design:paramtypes", [Observable_1.Observable])
    ], FlatMapStreamComponent.prototype, "inputStream", null);
    FlatMapStreamComponent = __decorate([
        core_1.Component({
            selector: 'flatMap-stream',
            template: require('./flatMap.stream.component.htm'),
            animations: []
        })
    ], FlatMapStreamComponent);
    return FlatMapStreamComponent;
}());
exports.FlatMapStreamComponent = FlatMapStreamComponent;
//# sourceMappingURL=flatMap.stream.component.js.map
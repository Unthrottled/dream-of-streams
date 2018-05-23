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
require("./filter.stream.component.htm");
var Observable_1 = require("rxjs/Observable");
var FilterStreamComponent = /** @class */ (function () {
    function FilterStreamComponent() {
        this.outputStream = new core_1.EventEmitter();
        this.filteredOutputStream = new core_1.EventEmitter();
    }
    Object.defineProperty(FilterStreamComponent.prototype, "filterFunction", {
        get: function () {
            return this._filterFunction;
        },
        set: function (value) {
            this._filterFunction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterStreamComponent.prototype, "inputStream", {
        get: function () {
            return this._inputStream;
        },
        set: function (value) {
            var _this = this;
            this._inputStream = value.filter(function (item) {
                var willPass = _this.filterFunction.test(item);
                if (!willPass) {
                    _this.filteredOutputStream.emit(item);
                }
                return willPass;
            });
        },
        enumerable: true,
        configurable: true
    });
    FilterStreamComponent.prototype.complete = function (streamItemAtEnd) {
        this.outputStream.emit(streamItemAtEnd);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FilterStreamComponent.prototype, "outputStream", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FilterStreamComponent.prototype, "filteredOutputStream", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FilterStreamComponent.prototype, "filterFunction", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Observable_1.Observable),
        __metadata("design:paramtypes", [Observable_1.Observable])
    ], FilterStreamComponent.prototype, "inputStream", null);
    FilterStreamComponent = __decorate([
        core_1.Component({
            selector: 'filter-stream',
            template: require('./filter.stream.component.htm'),
            animations: []
        })
    ], FilterStreamComponent);
    return FilterStreamComponent;
}());
exports.FilterStreamComponent = FilterStreamComponent;
//# sourceMappingURL=filter.stream.component.js.map
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
require("./map.stream.component.htm");
var Observable_1 = require("rxjs/Observable");
var MapStreamComponent = /** @class */ (function () {
    function MapStreamComponent() {
        this.outputStream = new core_1.EventEmitter();
    }
    Object.defineProperty(MapStreamComponent.prototype, "mappingFunction", {
        get: function () {
            return this._mappingFunction;
        },
        set: function (value) {
            this._mappingFunction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapStreamComponent.prototype, "inputStream", {
        get: function () {
            return this._inputStream;
        },
        set: function (value) {
            var _this = this;
            this._inputStream = value.map(function (item) { return _this.mappingFunction.apply(item); });
        },
        enumerable: true,
        configurable: true
    });
    MapStreamComponent.prototype.complete = function (streamItemAtEnd) {
        this.outputStream.emit(streamItemAtEnd);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MapStreamComponent.prototype, "outputStream", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MapStreamComponent.prototype, "mappingFunction", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Observable_1.Observable),
        __metadata("design:paramtypes", [Observable_1.Observable])
    ], MapStreamComponent.prototype, "inputStream", null);
    MapStreamComponent = __decorate([
        core_1.Component({
            selector: 'map-stream',
            template: require('./map.stream.component.htm'),
            animations: []
        })
    ], MapStreamComponent);
    return MapStreamComponent;
}());
exports.MapStreamComponent = MapStreamComponent;
//# sourceMappingURL=map.stream.component.js.map
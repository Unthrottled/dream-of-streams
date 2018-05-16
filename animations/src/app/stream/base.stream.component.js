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
var Subscription_1 = require("rxjs/Subscription");
var BaseStreamComponent = /** @class */ (function () {
    function BaseStreamComponent() {
        this.currentSubscription = new Subscription_1.Subscription();
        this.itemIndex = new Map();
        this.outputStream = new core_1.EventEmitter();
        this._streamItems = [];
    }
    Object.defineProperty(BaseStreamComponent.prototype, "inputStream", {
        get: function () {
            return this._inputStream;
        },
        set: function (value) {
            var _this = this;
            this.currentSubscription.unsubscribe();
            this.currentSubscription = value.subscribe(function (streamItemContainer) {
                return streamItemContainer.items.subscribe(function (streamItem) {
                    return _this.itemIndex.set(streamItemContainer.identifier, _this._streamItems.push(streamItemContainer));
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseStreamComponent.prototype, "streamItems", {
        get: function () {
            return this._streamItems;
        },
        enumerable: true,
        configurable: true
    });
    BaseStreamComponent.prototype.complete = function (streamItemAtEnd) {
        var index = streamItemAtEnd.identifier;
        this._streamItems.splice(this.itemIndex.get(index), 1);
        this.itemIndex.delete(index);
        this.outputStream.emit(streamItemAtEnd);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BaseStreamComponent.prototype, "outputStream", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Observable_1.Observable),
        __metadata("design:paramtypes", [Observable_1.Observable])
    ], BaseStreamComponent.prototype, "inputStream", null);
    BaseStreamComponent = __decorate([
        core_1.Component({
            selector: 'base-stream-component',
            template: require('./base.stream.component.htm'),
            animations: []
        })
    ], BaseStreamComponent);
    return BaseStreamComponent;
}());
exports.BaseStreamComponent = BaseStreamComponent;
//# sourceMappingURL=base.stream.component.js.map
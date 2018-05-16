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
var StreamItemContainer_1 = require("./StreamItemContainer");
var StreamItemContainerComponent = /** @class */ (function () {
    function StreamItemContainerComponent() {
    }
    Object.defineProperty(StreamItemContainerComponent.prototype, "streamItemContainer", {
        get: function () {
            return this._streamItemContainer;
        },
        set: function (value) {
            this._streamItemContainer = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", StreamItemContainer_1.StreamItemContainer),
        __metadata("design:paramtypes", [StreamItemContainer_1.StreamItemContainer])
    ], StreamItemContainerComponent.prototype, "streamItemContainer", null);
    StreamItemContainerComponent = __decorate([
        core_1.Component({
            selector: 'stream-item-container',
            template: "\n        <div>\n            <div *ngIf=\"streamItemContainer.isCollection\">\n                <div *ngFor=\"let item of streamItemContainer.items | async\">\n                    <stream-item [streamItem]=\"item\"></stream-item>\n                </div>\n            </div>\n            <div *ngIf=\"!streamItemContainer.isCollection\">\n                    <stream-item [streamItem]=\"streamItemContainer.items | async\"></stream-item>\n            </div>\n        </div>\n    "
        })
    ], StreamItemContainerComponent);
    return StreamItemContainerComponent;
}());
exports.StreamItemContainerComponent = StreamItemContainerComponent;
//# sourceMappingURL=stream.item.container.component.js.map
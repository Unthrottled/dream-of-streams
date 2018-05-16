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
var StreamItem_1 = require("./StreamItem");
var kendo_drawing_1 = require("@progress/kendo-drawing");
var StreamItemContainerComponent = /** @class */ (function () {
    function StreamItemContainerComponent(myElement) {
        this.myElement = myElement;
    }
    Object.defineProperty(StreamItemContainerComponent.prototype, "streamItem", {
        get: function () {
            return this._streamItem;
        },
        set: function (value) {
            this._streamItem = value;
        },
        enumerable: true,
        configurable: true
    });
    StreamItemContainerComponent.prototype.ngAfterViewInit = function () {
        this.createSurface()
            .draw(this.streamItem.element);
    };
    StreamItemContainerComponent.prototype.ngOnDestroy = function () {
        this.surface.destroy();
    };
    StreamItemContainerComponent.prototype.createSurface = function () {
        return this.surface = kendo_drawing_1.Surface.create(this.myElement.nativeElement, {
            height: "50px",
            width: "50px"
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", StreamItem_1.StreamItemContainer),
        __metadata("design:paramtypes", [StreamItem_1.StreamItemContainer])
    ], StreamItemContainerComponent.prototype, "streamItem", null);
    StreamItemContainerComponent = __decorate([
        core_1.Component({
            selector: 'stream-item-container',
            template: "\n        <div></div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], StreamItemContainerComponent);
    return StreamItemContainerComponent;
}());
exports.StreamItemContainerComponent = StreamItemContainerComponent;
//# sourceMappingURL=stream.item.component.js.map
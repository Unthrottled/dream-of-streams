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
var kendo_drawing_1 = require("@progress/kendo-drawing");
var SingleStreamItem_1 = require("./SingleStreamItem");
var MultiStreamItem_1 = require("./MultiStreamItem");
var StreamItemComponent = /** @class */ (function () {
    function StreamItemComponent(myElement) {
        this.myElement = myElement;
        this.drawn = new core_1.EventEmitter();
    }
    Object.defineProperty(StreamItemComponent.prototype, "streamItem", {
        get: function () {
            return this._streamItem;
        },
        set: function (value) {
            this._streamItem = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamItemComponent.prototype, "heyGurlYouSingle", {
        get: function () {
            return this.streamItem instanceof SingleStreamItem_1.SingleStreamItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StreamItemComponent.prototype, "heyGurlYouAFreak", {
        get: function () {
            return this.streamItem instanceof MultiStreamItem_1.MultiStreamItem;
        },
        enumerable: true,
        configurable: true
    });
    StreamItemComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.streamItem.element.subscribe(function (element) {
            return _this.createSurface().draw(element);
        }, function (err) { return console.warn(err); }, function () { return _this.drawn.emit(); });
    };
    StreamItemComponent.prototype.ngOnDestroy = function () {
        this.surface.destroy();
    };
    StreamItemComponent.prototype.createSurface = function () {
        return this.surface = kendo_drawing_1.Surface.create(this.myElement.nativeElement, {
            height: "50px",
            width: "50px"
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], StreamItemComponent.prototype, "drawn", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], StreamItemComponent.prototype, "streamItem", null);
    StreamItemComponent = __decorate([
        core_1.Component({
            selector: 'stream-item',
            template: "\n        <div></div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], StreamItemComponent);
    return StreamItemComponent;
}());
exports.StreamItemComponent = StreamItemComponent;
//# sourceMappingURL=stream.item.component.js.map
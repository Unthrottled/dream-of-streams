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
var DrawStreamItemComponent = /** @class */ (function () {
    function DrawStreamItemComponent(myElement) {
        this.myElement = myElement;
        this.drawn = new core_1.EventEmitter();
    }
    Object.defineProperty(DrawStreamItemComponent.prototype, "element", {
        get: function () {
            return this._element;
        },
        set: function (value) {
            this._element = value;
        },
        enumerable: true,
        configurable: true
    });
    DrawStreamItemComponent.prototype.ngAfterViewInit = function () {
        this.createSurface().draw(this.element);
        this.drawn.emit();
    };
    DrawStreamItemComponent.prototype.ngOnDestroy = function () {
        this.surface.destroy();
    };
    DrawStreamItemComponent.prototype.createSurface = function () {
        return this.surface = kendo_drawing_1.Surface.create(this.myElement.nativeElement, {
            height: "50px",
            width: "50px"
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DrawStreamItemComponent.prototype, "drawn", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", kendo_drawing_1.Element),
        __metadata("design:paramtypes", [kendo_drawing_1.Element])
    ], DrawStreamItemComponent.prototype, "element", null);
    DrawStreamItemComponent = __decorate([
        core_1.Component({
            selector: 'draw-stream-item',
            template: "\n        <div></div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DrawStreamItemComponent);
    return DrawStreamItemComponent;
}());
exports.DrawStreamItemComponent = DrawStreamItemComponent;
//# sourceMappingURL=draw.stream.item.component.js.map
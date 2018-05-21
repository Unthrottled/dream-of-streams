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
var SingleStreamItem_1 = require("./SingleStreamItem");
var MultiStreamItem_1 = require("./MultiStreamItem");
var StreamItemComponent = /** @class */ (function () {
    function StreamItemComponent(myElement) {
        this.myElement = myElement;
        this.drawn = new core_1.EventEmitter();
        this.elements = [];
        this.allElementsAdded = false;
        this.numDrawn = 0;
    }
    StreamItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.streamItem.element
            .forEach(function (element) { return _this.elements.push(element); });
        this.allElementsReceived();
    };
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
    StreamItemComponent.prototype.itemDrawn = function () {
        this.numDrawn++;
        this.tryToComplete();
    };
    StreamItemComponent.prototype.allElementsReceived = function () {
        this.allElementsAdded = true;
        this.tryToComplete();
    };
    StreamItemComponent.prototype.tryToComplete = function () {
        if (this.isComplete()) {
            this.drawn.emit();
        }
    };
    StreamItemComponent.prototype.isComplete = function () {
        return this.allElementsAdded &&
            this.numDrawn === this.elements.length;
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
            template: "\n        <div>\n            <div *ngIf=\"heyGurlYouSingle\" class=\"single-item-stream\">\n                <div>\n                    <draw-stream-item [element]=\"streamItem.element | async\"\n                                      (drawn)=\"itemDrawn()\"></draw-stream-item>\n                </div>\n            </div>\n            <div *ngIf=\"heyGurlYouAFreak\" class=\"multi-item-stream\">\n                <div *ngFor=\"let element of elements\">\n                    <draw-stream-item [element]=\"element\"\n                                      (drawn)=\"itemDrawn()\"></draw-stream-item>\n                </div>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], StreamItemComponent);
    return StreamItemComponent;
}());
exports.StreamItemComponent = StreamItemComponent;
//# sourceMappingURL=stream.item.component.js.map
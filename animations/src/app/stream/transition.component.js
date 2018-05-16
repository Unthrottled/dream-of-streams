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
require("./transition.component.htm");
var animations_1 = require("@angular/animations");
var TransitionComponent = /** @class */ (function () {
    function TransitionComponent() {
        this.state = 'active';
        this.completedTransiton = new core_1.EventEmitter();
        this._complete = false;
    }
    Object.defineProperty(TransitionComponent.prototype, "input", {
        get: function () {
            return this._input;
        },
        set: function (value) {
            this._input = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionComponent.prototype, "complete", {
        get: function () {
            return this._complete;
        },
        enumerable: true,
        configurable: true
    });
    TransitionComponent.prototype.completed = function () {
        if (this.state === 'active') {
            this._complete = true;
            this.completedTransiton.emit(this.input);
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TransitionComponent.prototype, "completedTransiton", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TransitionComponent.prototype, "input", null);
    TransitionComponent = __decorate([
        core_1.Component({
            selector: 'stream-transition',
            template: require('./transition.component.htm'),
            animations: [
                animations_1.trigger('streamSourceState', [
                    animations_1.state('active', animations_1.style({
                        transform: 'translateX(100%)'
                    })),
                    animations_1.transition('* => active', animations_1.animate('2s'))
                ])
            ]
        })
    ], TransitionComponent);
    return TransitionComponent;
}());
exports.TransitionComponent = TransitionComponent;
//# sourceMappingURL=transition.component.js.map
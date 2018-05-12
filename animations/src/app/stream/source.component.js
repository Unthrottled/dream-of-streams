"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("./source.component.htm");
var animations_1 = require("@angular/animations");
var SourceComponent = /** @class */ (function () {
    function SourceComponent() {
        this.state = 'inactive';
    }
    SourceComponent.prototype.toggleState = function () {
        this.state = this.state === 'inactive' ? 'active' : 'inactive';
    };
    SourceComponent.prototype.complete = function () {
        if (this.state === 'active')
            console.log('something something, complete');
    };
    SourceComponent = __decorate([
        core_1.Component({
            selector: 'stream-source',
            template: require('./source.component.htm'),
            animations: [
                animations_1.trigger('streamSourceState', [
                    animations_1.state('active', animations_1.style({
                        backgroundColor: '#cfd8dc',
                        transform: 'translateX(100%)'
                    })),
                    animations_1.transition('* => active', animations_1.animate('1s ease-in'))
                ])
            ]
        })
    ], SourceComponent);
    return SourceComponent;
}());
exports.SourceComponent = SourceComponent;
//# sourceMappingURL=source.component.js.map
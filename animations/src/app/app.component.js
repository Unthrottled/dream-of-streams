"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("./app.component.htm");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.mapOne = function (item) { return item; };
        this.sourceSubject = new BehaviorSubject_1.BehaviorSubject(null);
        this.sourceOutput = this.sourceSubject.filter(function (item) { return !!item; });
    }
    AppComponent.prototype.sourceComplete = function (item) {
        this.sourceSubject.next(item);
    };
    AppComponent.prototype.mapOneComplete = function (steamItem) {
        console.log("end o the line for", steamItem);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'angular-application',
            template: require('./app.component.htm')
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var source_component_1 = require("./source.component");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var transition_component_1 = require("./transition.component");
var base_stream_component_1 = require("./base.stream.component");
var StreamModule = /** @class */ (function () {
    function StreamModule() {
    }
    StreamModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule
            ],
            exports: [
                source_component_1.SourceComponent
            ],
            declarations: [
                source_component_1.SourceComponent,
                transition_component_1.TransitionComponent,
                base_stream_component_1.BaseStreamComponent
            ],
            providers: []
        })
    ], StreamModule);
    return StreamModule;
}());
exports.StreamModule = StreamModule;
//# sourceMappingURL=stream.module.js.map
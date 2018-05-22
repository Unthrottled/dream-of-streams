"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var basics_view_component_1 = require("./basic/basics.view.component");
var list_component_1 = require("./basic/list.component");
var generative_source_component_1 = require("./basic/source/generative.source.component");
var list_source_component_1 = require("./basic/source/list.source.component");
var stream_module_1 = require("../stream/stream.module");
var router_1 = require("@angular/router");
var map_view_component_1 = require("./basic/intermediates/map.view.component");
var filter_view_component_1 = require("./basic/intermediates/filter.view.component");
var ViewModule = /** @class */ (function () {
    function ViewModule() {
    }
    ViewModule = __decorate([
        core_1.NgModule({
            imports: [
                stream_module_1.StreamModule,
                router_1.RouterModule
            ],
            exports: [],
            declarations: [
                list_component_1.ListComponent,
                basics_view_component_1.BasicsViewComponent,
                generative_source_component_1.GenerativeSourceComponent,
                list_source_component_1.ListSourceComponent,
                map_view_component_1.MapViewComponent,
                filter_view_component_1.FilterViewComponent,
            ],
            providers: []
        })
    ], ViewModule);
    return ViewModule;
}());
exports.ViewModule = ViewModule;
//# sourceMappingURL=view.module.js.map
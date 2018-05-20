"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/common/http");
var stream_module_1 = require("./stream/stream.module");
var base_component_1 = require("./views/basic/base.component");
var flatmap_simple_component_1 = require("./views/basic/flatmap.simple.component");
var landing_component_1 = require("./landing.component");
var basics_view_component_1 = require("./views/basic/basics.view.component");
var view_module_1 = require("./views/view.module");
var generative_source_component_1 = require("./views/basic/source/generative.source.component");
var list_source_component_1 = require("./views/basic/source/list.source.component");
var map_view_component_1 = require("./views/basic/intermediates/map.view.component");
var appRoutes = [
    { path: 'basics', component: basics_view_component_1.BasicsViewComponent },
    { path: 'basics/source/generate', component: generative_source_component_1.GenerativeSourceComponent },
    { path: 'basics/source/list', component: list_source_component_1.ListSourceComponent },
    { path: 'basics/intermediate/map', component: map_view_component_1.MapViewComponent },
    { path: 'basics/flatmap', component: flatmap_simple_component_1.FlatmapSimpleComponent },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    { path: '**', component: landing_component_1.LandingComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                stream_module_1.StreamModule,
                view_module_1.ViewModule,
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: [
                app_component_1.AppComponent,
                base_component_1.BaseComponent,
                flatmap_simple_component_1.FlatmapSimpleComponent,
                landing_component_1.LandingComponent,
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
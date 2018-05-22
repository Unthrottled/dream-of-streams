import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {StreamModule} from "./stream/stream.module";
import {BaseComponent} from "./views/basic/base.component";
import {FlatmapSimpleComponent} from "./views/basic/flatmap.simple.component";
import {LandingComponent} from "./landing.component";
import {BasicsViewComponent} from "./views/basic/basics.view.component";
import {ViewModule} from "./views/view.module";
import {GenerativeSourceComponent} from "./views/basic/source/generative.source.component";
import {ListSourceComponent} from "./views/basic/source/list.source.component";
import {MapViewComponent} from "./views/basic/intermediates/map.view.component";
import {FilterViewComponent} from "./views/basic/intermediates/filter.view.component";


const appRoutes: Routes = [
    {path: 'basics', component: BasicsViewComponent},
    {path: 'basics/source/generate', component: GenerativeSourceComponent},
    {path: 'basics/source/list', component: ListSourceComponent},
    {path: 'basics/intermediate/map', component: MapViewComponent},
    {path: 'basics/intermediate/filter', component: FilterViewComponent},
    {path: 'basics/flatmap', component: FlatmapSimpleComponent},
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {path: '**', component: LandingComponent}
];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StreamModule,
        ViewModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AppComponent,
        BaseComponent,
        FlatmapSimpleComponent,
        LandingComponent,
    ],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {
}

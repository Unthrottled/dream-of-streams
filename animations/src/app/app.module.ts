import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {StreamModule} from "./stream/stream.module";
import {CompleteComponent} from "./views/basic/intermediates/complete.component";
import {LandingComponent} from "./landing.component";
import {BasicsViewComponent} from "./views/basic/basics.view.component";
import {ViewModule} from "./views/view.module";
import {GenerativeSourceComponent} from "./views/basic/source/generative.source.component";
import {CollectionSourceComponent} from "./views/basic/source/collection-source.component";
import {MapViewComponent} from "./views/basic/intermediates/map.view.component";
import {FilterViewComponent} from "./views/basic/intermediates/filter.view.component";
import {Flatmap101Component} from "./views/basic/intermediates/flatmap.101.component";
import {MultimapComponent} from "./views/basic/intermediates/multimap.component";


const appRoutes: Routes = [
    {path: 'streams', component: BasicsViewComponent},
    {path: 'streams/source/generate', component: GenerativeSourceComponent},
    {path: 'streams/source/collection', component: CollectionSourceComponent},
    {path: 'streams/intermediate/map', component: MapViewComponent},
    {path: 'streams/intermediate/filter', component: FilterViewComponent},
    {path: 'streams/intermediate/flatmap', component: Flatmap101Component},
    {path: 'streams/intermediate/flatmap2', component: MultimapComponent},
    {path: 'streams/intermediate/complete', component: CompleteComponent},
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
        LandingComponent,
    ],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {
}

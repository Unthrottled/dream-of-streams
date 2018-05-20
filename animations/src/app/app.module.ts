import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {StreamModule} from "./stream/stream.module";
import {BaseComponent} from "./views/base.component";
import {FlatmapSimpleComponent} from "./views/flatmap.simple.component";
import {LandingComponent} from "./landing.component";
import {ListComponent} from "./views/list.component";


const appRoutes: Routes = [
    {path: 'basics', component: BaseComponent},
    {path: 'basics/list', component: ListComponent},
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
        ListComponent
    ],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {
}

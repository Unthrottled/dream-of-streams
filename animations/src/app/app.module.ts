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
import {ListComponent} from "./views/basic/list.component";
import {BasicsViewComponent} from "./views/basic/basics.view.component";


const appRoutes: Routes = [
    {path: 'basics', component: BasicsViewComponent},
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
        ListComponent,
        BasicsViewComponent
    ],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {
}

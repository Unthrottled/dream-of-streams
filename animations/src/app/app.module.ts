import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {StreamModule} from "./stream/stream.module";
import {BaseComponent} from "./base.component";


const appRoutes: Routes = [
    { path: 'basics', component: BaseComponent },
    { path: '',
        redirectTo: '/basics',
        pathMatch: 'full'
    },
    { path: '**', component: BaseComponent }
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
        BaseComponent
    ],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {
}

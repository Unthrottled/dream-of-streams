import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from "./app.component";
import {HttpClient} from "@angular/common/http";
import {StreamModule} from "./stream/stream.module";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClient,
        BrowserAnimationsModule,
        StreamModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {
}

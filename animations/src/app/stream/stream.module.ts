import {NgModule} from "@angular/core";
import {SourceComponent} from "./source.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TransitionComponent} from "./transition.component";
import {BaseStreamComponent} from "./base.stream.component";
import {MapStreamComponent} from "./map.stream.component";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    exports: [
        SourceComponent,
        MapStreamComponent
    ],
    declarations: [
        SourceComponent,
        TransitionComponent,
        BaseStreamComponent,
        MapStreamComponent
    ],
    providers: []
})
export class StreamModule {

}
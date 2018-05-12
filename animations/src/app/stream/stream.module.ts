import {NgModule} from "@angular/core";
import {SourceComponent} from "./source.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TransitionComponent} from "./transition.component";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    exports: [
        SourceComponent
    ],
    declarations: [
        SourceComponent,
        TransitionComponent
    ],
    providers: []
})
export class StreamModule {

}
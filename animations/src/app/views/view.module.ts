import {NgModule} from "@angular/core";
import {BasicsViewComponent} from "./basic/basics.view.component";
import {ListComponent} from "./basic/list.component";
import {GenerativeSourceComponent} from "./basic/source/generative.source.component";
import {ListSourceComponent} from "./basic/source/list.source.component";
import {StreamModule} from "../stream/stream.module";
import {RouterModule} from "@angular/router";
import {MapViewComponent} from "./basic/intermediates/map.view.component";


@NgModule({
    imports: [
        StreamModule,
        RouterModule
    ],
    exports: [],
    declarations: [
        ListComponent,
        BasicsViewComponent,
        GenerativeSourceComponent,
        ListSourceComponent,
        MapViewComponent
    ],
    providers: []
})
export class ViewModule {
}

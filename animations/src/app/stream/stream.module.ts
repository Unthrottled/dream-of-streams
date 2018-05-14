import {NgModule} from "@angular/core";
import {SourceComponent} from "./source.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TransitionComponent} from "./transition.component";
import {BaseStreamComponent} from "./base.stream.component";
import {MapStreamComponent} from "./map.stream.component";
import {FilterStreamComponent} from "./filter.stream.component";
import {FlatMapStreamComponent} from "./flatMap.stream.component";
import {StreamItemComponent} from "./stream.item.component";
import {CircleStreamItemService} from "./CircleStreamItemService";
import {TriangleStreamItemService} from "./TriangleStreamItemService";
import {SquareStreamItemService} from "./SquareStreamItemService";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    exports: [
        SourceComponent,
        MapStreamComponent,
        FilterStreamComponent,
        FlatMapStreamComponent,
    ],
    declarations: [
        SourceComponent,
        TransitionComponent,
        BaseStreamComponent,
        MapStreamComponent,
        FilterStreamComponent,
        FlatMapStreamComponent,
        StreamItemComponent,
    ],
    providers: [
        CircleStreamItemService,
        TriangleStreamItemService,
        SquareStreamItemService
    ]
})
export class StreamModule {

}
import {Component} from "@angular/core";
import "./app.component.htm";
import {StreamItem} from "./stream/StreamItem";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Function} from "./stream/Function";
import {Predicate} from "./stream/Predicate";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Scheduler} from "rxjs/Rx";
import {TriangleStreamItemService} from "./stream/TriangleStreamItemService";
import {SquareStreamItemService} from "./stream/SquareStreamItemService";
import {SingleStreamItem} from "./stream/SingleStreamItem";
import {Element} from "@progress/kendo-drawing";
import {MultiStreamItem} from "./stream/MultiStreamItem";
import {CircleStreamItemService} from "./stream/CircleStreamItemService";

@Component({
    selector: 'angular-application',
    template: require('./app.component.htm')
})
export class AppComponent {

    mapTwo: Function<StreamItem, StreamItem> = {
        apply: (streamItem: StreamItem) =>
            new MultiStreamItem(streamItem.element.flatMap(element =>
                this.circleService.createStreamItems(4,{
                    fill: element.options.get('fill'),
                    stroke: element.options.get('stroke'),
                }).element))
    };

    constructor(private triangleFactory: TriangleStreamItemService,
                private hip2B: SquareStreamItemService,
                private circleService: CircleStreamItemService) {
    }

    private streamSourceTwo = new BehaviorSubject<StreamItem>(null);
    inputStreamTwo = this.streamSourceTwo.filter(item => !!item);


    private sourceSubjectTwo = new BehaviorSubject(null);
    sourceOutputTwo = this.sourceSubjectTwo.filter(item => !!item);

    startStreamTwo(): void {
        this.streamSourceTwo.next(this.triangleFactory.createStreamItem());
    }

    sourceCompleteTwo(item: StreamItem) {
        this.sourceSubjectTwo.next(item);
    }
}

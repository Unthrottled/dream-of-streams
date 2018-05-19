import {Component} from "@angular/core";
import './base.component.htm';
import {StreamItem} from "./stream/StreamItem";
import {Function} from "./stream/Function";
import {SquareStreamItemService} from "./stream/SquareStreamItemService";
import {CircleStreamItemService} from "./stream/CircleStreamItemService";
import {TriangleStreamItemService} from "./stream/TriangleStreamItemService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {MultiStreamItem} from "./stream/MultiStreamItem";

@Component({
    selector: 'flatmap-view',
    template: require('./flatmap.simple.component.htm')
})
export class FlatmapSimpleComponent {

    mapTwo: Function<StreamItem, StreamItem> = {
        apply: (streamItem: StreamItem) =>
            new MultiStreamItem(streamItem.element.flatMap(element =>
                this.circleService.createStreamItems(4, () => {
                    return {
                        fill: element.options.get('fill'),
                        stroke: element.options.get('stroke'),
                    }
                }).element))
    };
    private streamSourceTwo = new BehaviorSubject<StreamItem>(null);
    inputStreamTwo = this.streamSourceTwo.filter(item => !!item);
    private sourceSubjectTwo = new BehaviorSubject(null);
    sourceOutputTwo = this.sourceSubjectTwo.filter(item => !!item);

    constructor(private triangleFactory: TriangleStreamItemService,
                private hip2B: SquareStreamItemService,
                private circleService: CircleStreamItemService) {
    }

    startStreamTwo(): void {
        this.streamSourceTwo.next(this.triangleFactory.createStreamItem());
    }

    sourceCompleteTwo(item: StreamItem) {
        this.sourceSubjectTwo.next(item);
    }

}
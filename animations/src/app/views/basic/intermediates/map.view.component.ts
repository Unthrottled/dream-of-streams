import {Component, OnInit} from "@angular/core";
import './map.view.component.htm';
import {SingleStreamItem} from "../../../stream/SingleStreamItem";
import {StreamItem} from "../../../stream/StreamItem";
import {Observable} from "rxjs/Observable";
import {Function} from "../../../stream/Function";
import {Element} from "@progress/kendo-drawing";
import {SquareStreamItemService} from "../../../stream/SquareStreamItemService";
import {CircleStreamItemService} from "../../../stream/CircleStreamItemService";
import {TriangleStreamItemService} from "../../../stream/TriangleStreamItemService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RanboShapeOptionsService} from "../../../stream/RanboShapeOptionsService";

@Component({
    selector: 'map-view',
    template: require('./map.view.component.htm')
})
export class MapViewComponent implements OnInit {

    private static numItems = 6;

    list: StreamItem;
    mapOne: Function<StreamItem, StreamItem> = {
        apply: (streamItem: StreamItem) => new SingleStreamItem(
            streamItem.element.flatMap((element: Element) => this.hip2B.createStreamItem(() => {
                    return {
                        fill: element.options.get('fill'),
                        stroke: element.options.get('stroke'),
                    }
                }).element
            ))
    };
    private itemsToMoveAlong: StreamItem[] = [];
    private sourceOutputSubject = new BehaviorSubject(null);
    sourceOutput = this.sourceOutputSubject.filter(item => !!item);
    private streamSourceInputSubject = new BehaviorSubject<StreamItem>(null);
    streamSourceInput = this.streamSourceInputSubject.filter(item => !!item);
    private listIndex = -1;

    constructor(private triangleFactory: TriangleStreamItemService,
                private hip2B: SquareStreamItemService,
                private circleService: CircleStreamItemService) {
    }

    ngOnInit(): void {
        this.list = this.circleService.createStreamItems(MapViewComponent.numItems, RanboShapeOptionsService.createStreamOption)
        this.list.element
            .map(el => Observable.of(el))
            .map(element => new SingleStreamItem(element))
            .subscribe(item => this.itemsToMoveAlong.push(item), er => {
                },
                () => this.startStreamOne());
    }

    sourceComplete(item: StreamItem) {
        this.sourceOutputSubject.next(item);
    }

    mapOneComplete(steamItem: StreamItem) {
        this.startStreamOne()
    }

    startStreamOne(): void {
        let itemIndex = this.listIndex = ++this.listIndex % MapViewComponent.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    }

}
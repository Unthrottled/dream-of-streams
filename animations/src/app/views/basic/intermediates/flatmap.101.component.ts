import {Component, OnInit} from "@angular/core";
import './flatmap.101.component.htm';
import {SingleStreamItem} from "../../../stream/SingleStreamItem";
import {StreamItem} from "../../../stream/StreamItem";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {Function} from "../../../stream/Function";
import {Element} from "@progress/kendo-drawing";
import {Scheduler} from "rxjs/Rx";
import {SquareStreamItemService} from "../../../stream/SquareStreamItemService";
import {CircleStreamItemService} from "../../../stream/CircleStreamItemService";
import {TriangleStreamItemService} from "../../../stream/TriangleStreamItemService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {MultiStreamItem} from "../../../stream/MultiStreamItem";
import {RanboShapeOptionsService} from "../../../stream/RanboShapeOptionsService";
import {ImageUtility} from "../../../utilities/ImageUtility";

@Component({
    selector: 'flatmap-view',
    template: require('./flatmap.101.component.htm')
})
export class Flatmap101Component implements OnInit {

    private static numItems = 6;

    list: StreamItem;
    mapOne: Function<StreamItem, StreamItem> = {
        apply: (streamItem: StreamItem) => {
            let element: Element = streamItem.element[0];
            let elements = this.circleService.createStreamItems(4, () => {
                return {
                    fill: element.options.get('fill'),
                    stroke: element.options.get('stroke'),
                }
            }).element;

            return new MultiStreamItem(elements);
        }
    };
    flatMapOne: Function<StreamItem, Observable<StreamItem>> = {
        apply: (streamItem: StreamItem) => Observable.create((observer: Observer<StreamItem>) => {
            const items = streamItem.element;
            let index = 0;
            const triangle = () => {
                return new SingleStreamItem([items[index++]]);
            };
            observer.next(triangle());
            Observable.interval(750, Scheduler.async)
                .take(items.length - 1)
                .subscribe(_ => observer.next(triangle()),
                    observer.error,
                    observer.complete);
        })
    };
    private itemsToMoveAlong: StreamItem[] = [];
    private sourceOutputSubject = new BehaviorSubject(null);
    sourceOutputStream = this.sourceOutputSubject.filter(item => !!item);
    private mapSubject = new BehaviorSubject(null);
    mapOutputStream = this.mapSubject.filter(item => !!item);
    private flatMapSubject = new BehaviorSubject(null);
    private streamSourceInputSubject = new BehaviorSubject<StreamItem>(null);
    streamSourceInput = this.streamSourceInputSubject.filter(item => !!item);
    private listIndex = -1;

    constructor(private triangleFactory: TriangleStreamItemService,
                private hip2B: SquareStreamItemService,
                private circleService: CircleStreamItemService) {
    }

    sourcePicture = ImageUtility.circleSource;
    circleListPicture = ImageUtility.circleList;
    flatmapPicture = ImageUtility.circleMany;

    ngOnInit(): void {
        this.list = this.circleService.createStreamItems(Flatmap101Component.numItems, RanboShapeOptionsService.createStreamOption)
        this.list.element
            .map(el => [el])
            .map(element => new SingleStreamItem(element))
            .forEach(item => this.itemsToMoveAlong.push(item))
    }

    sourceComplete(item: StreamItem) {
        this.sourceOutputSubject.next(item);
    }

    flatMapOneComplete(steamItem: StreamItem) {
        this.flatMapSubject.next(steamItem)
    }

    mapOneComplete(steamItem: StreamItem) {
        this.mapSubject.next(steamItem)
    }

    startStreamOne(): void {
        let itemIndex = this.listIndex = ++this.listIndex % Flatmap101Component.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    }

}
import {Component, OnInit} from "@angular/core";

import './multimap.component.htm';
import {SingleStreamItem} from "../../../stream/SingleStreamItem";
import {StreamItem} from "../../../stream/StreamItem";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {Function} from "../../../stream/Function";
import {Scheduler} from "rxjs/Rx";
import {SquareStreamItemService} from "../../../stream/SquareStreamItemService";
import {CircleStreamItemService} from "../../../stream/CircleStreamItemService";
import {TriangleStreamItemService} from "../../../stream/TriangleStreamItemService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RanboShapeOptionsService} from "../../../stream/RanboShapeOptionsService";
import {StreamItemFactory} from "../../../stream/StreamItemFactory";


@Component({
    selector: 'multi-map-view',
    template: require('./multimap.component.htm')
})
export class MultimapComponent implements OnInit {

    private static numItems = 6;

    list: StreamItem;
    flatMapOne: Function<StreamItem, Observable<StreamItem>> = {
        apply: (streamItem: StreamItem) => Observable.create((observer: Observer<StreamItem>) => {
            let index = -1;
            const objectFactories: StreamItemFactory[] = [
                this.triangleFactory,
                this.hip2B,
                this.circleService
            ];
            const triangle = () => {
                return objectFactories[index = ++index % objectFactories.length].createStreamItem(()=>{
                    let element = streamItem.element[0];
                    return {
                        fill: element.options.get("fill"),
                        stroke: element.options.get("stroke"),
                    }
                });
            };
            observer.next(triangle());
            Observable.interval(750, Scheduler.async)
                .take(2)
                .subscribe(_ => observer.next(triangle()),
                    observer.error,
                    observer.complete);
        })
    };
    private itemsToMoveAlong: StreamItem[] = [];
    private sourceOutputSubject = new BehaviorSubject(null);
    sourceOutputStream = this.sourceOutputSubject.filter(item => !!item);
    private flatMapSubject = new BehaviorSubject(null);
    private streamSourceInputSubject = new BehaviorSubject<StreamItem>(null);
    streamSourceInput = this.streamSourceInputSubject.filter(item => !!item);
    private listIndex = -1;

    constructor(private triangleFactory: TriangleStreamItemService,
                private hip2B: SquareStreamItemService,
                private circleService: CircleStreamItemService) {
    }

    ngOnInit(): void {
        this.list = this.circleService.createStreamItems(MultimapComponent.numItems, RanboShapeOptionsService.createStreamOption);
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

    startStreamOne(): void {
        let itemIndex = this.listIndex = ++this.listIndex % MultimapComponent.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    }

}
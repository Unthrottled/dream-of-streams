import {Component, OnInit} from "@angular/core";
import './list.component.htm';
import {SingleStreamItem} from "../../stream/SingleStreamItem";
import {StreamItem} from "../../stream/StreamItem";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {Predicate} from "../../stream/Predicate";
import {Function} from "../../stream/Function";
import {Element} from "@progress/kendo-drawing";
import {Scheduler} from "rxjs/Rx";
import {SquareStreamItemService} from "../../stream/SquareStreamItemService";
import {CircleStreamItemService} from "../../stream/CircleStreamItemService";
import {TriangleStreamItemService} from "../../stream/TriangleStreamItemService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RanboShapeOptionsService} from "../../stream/RanboShapeOptionsService";

@Component({
    selector: 'list-view',
    template: require('./list.component.htm')
})
export class ListComponent implements OnInit {


    private static numItems = 6;

    list: StreamItem;
    private itemsToMoveAlong: StreamItem[] =[];
    ngOnInit(): void {
        this.list = this.circleService.createStreamItems(ListComponent.numItems,RanboShapeOptionsService.createStreamOption)
        this.list.element
            .map(el=>[el])
            .map(element=>new SingleStreamItem(element))
            .forEach(item=> this.itemsToMoveAlong.push(item))
    }


    mapOne: Function<StreamItem, StreamItem> = {
        apply: (streamItem: StreamItem) => new SingleStreamItem(
            streamItem.element.map((element: Element) => this.hip2B.createShape(()=>{
                return {
                        fill: element.options.get('fill'),
                            stroke: element.options.get('stroke'),
                    }
                })
            ))
    };

    flatMapOne: Function<StreamItem, Observable<StreamItem>> = {
        apply: (streamItem: StreamItem) => Observable.create((observer: Observer<StreamItem>) => {
            streamItem.element.forEach((element: Element) => {
                let triangle = ()=>
                    this.triangleFactory.createStreamItem(()=>{
                        return {
                            fill: element.options.get('fill'),
                                stroke: element.options.get('stroke'),
                        }
                    });
                observer.next(triangle());
                Observable.interval(750, Scheduler.async)
                    .take(4)
                    .subscribe(_ => observer.next(triangle()),
                        observer.error,
                        observer.complete);
            });
        })
    };
    filterOne: Predicate<StreamItem> = {
        test: (item: StreamItem) => item.identifier % 2 === 0
    };
    private sourceOutputSubject = new BehaviorSubject(null);
    sourceOutput = this.sourceOutputSubject.filter(item => !!item);

    private mapSubject = new BehaviorSubject(null);
    mapOutputStream = this.mapSubject.filter(item => !!item);

    private flatMapSubject = new BehaviorSubject(null);
    flatMapOutputStream = this.flatMapSubject.filter(item => !!item);

    private streamSourceInputSubject = new BehaviorSubject<StreamItem>(null);
    streamSourceInput = this.streamSourceInputSubject.filter(item => !!item);

    constructor(private triangleFactory: TriangleStreamItemService,
                private hip2B: SquareStreamItemService,
                private circleService: CircleStreamItemService) {
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

    filterOneComplete(steamItem: StreamItem) {

    }

    private listIndex = -1;
    startStreamOne(): void {
        let itemIndex = this.listIndex = ++this.listIndex % ListComponent.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    }

}
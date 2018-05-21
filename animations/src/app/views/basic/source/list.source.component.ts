import {Component, OnInit} from "@angular/core";
import './list.source.component.htm';
import {SingleStreamItem} from "../../../stream/SingleStreamItem";
import {StreamItem} from "../../../stream/StreamItem";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {Predicate} from "../../../stream/Predicate";
import {Function} from "../../../stream/Function";
import {Element} from "@progress/kendo-drawing";
import {Scheduler} from "rxjs/Rx";
import {SquareStreamItemService} from "../../../stream/SquareStreamItemService";
import {CircleStreamItemService} from "../../../stream/CircleStreamItemService";
import {TriangleStreamItemService} from "../../../stream/TriangleStreamItemService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RanboShapeOptionsService} from "../../../stream/RanboShapeOptionsService";

@Component({
    selector: 'list-view',
    template: require('./list.source.component.htm')
})
export class ListSourceComponent implements OnInit {


    private static numItems = 6;

    list: StreamItem;
    private itemsToMoveAlong: StreamItem[] =[];
    ngOnInit(): void {
        this.list = this.circleService.createStreamItems(ListSourceComponent.numItems,RanboShapeOptionsService.createStreamOption)
        //todo: figure this out
        // this.list.element
        //     .map(el=>Observable.of(el))
        //     .map(element=>new SingleStreamItem(element))
        //     .subscribe(item=> this.itemsToMoveAlong.push(item), er=>{},
        //         ()=> this.startStreamOne());
    }

    private streamSourceInputSubject = new BehaviorSubject<StreamItem>(null);
    streamSourceInput = this.streamSourceInputSubject.filter(item => !!item);

    constructor(private circleService: CircleStreamItemService) {
    }

    sourceComplete(item: StreamItem) {
        this.startStreamOne();
    }


    private listIndex = -1;
    startStreamOne(): void {
        let itemIndex = this.listIndex = ++this.listIndex % ListSourceComponent.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    }

}
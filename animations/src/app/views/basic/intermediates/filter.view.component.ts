import {Component, OnInit} from "@angular/core";
import './filter.view.component.htm';
import {SingleStreamItem} from "../../../stream/SingleStreamItem";
import {StreamItem} from "../../../stream/StreamItem";
import {Observable} from "rxjs/Observable";
import {Predicate} from "../../../stream/Predicate";
import {SquareStreamItemService} from "../../../stream/SquareStreamItemService";
import {CircleStreamItemService} from "../../../stream/CircleStreamItemService";
import {TriangleStreamItemService} from "../../../stream/TriangleStreamItemService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RanboShapeOptionsService} from "../../../stream/RanboShapeOptionsService";

@Component({
    selector: 'filter-view',
    template: require('./filter.view.component.htm')
})
export class FilterViewComponent implements OnInit {


    private static numItems = 6;

    list: StreamItem;
    filterOne: Predicate<StreamItem> = {
        test: (item: StreamItem) => {
            item.element;
            return false;
        }
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
        this.list = this.circleService.createStreamItems(FilterViewComponent.numItems, RanboShapeOptionsService.createStreamOption);
        //todo: figure this out
        // this.list.element
        //     .map(el => Observable.of(el))
        //     .map(element => new SingleStreamItem(element))
        //     .subscribe(item => this.itemsToMoveAlong.push(item), er => {
        //         },
        //         () => this.startStreamOne());
    }

    sourceComplete(item: StreamItem) {
        this.sourceOutputSubject.next(item);
    }

    //todo: need to make filter let when filter items completed.
    filterOneComplete(steamItem: StreamItem) {
        this.startStreamOne();
    }

    startStreamOne(): void {
        let itemIndex = this.listIndex = ++this.listIndex % FilterViewComponent.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    }

}
import {Component, OnInit} from "@angular/core";
import './list.source.component.htm';
import {SingleStreamItem} from "../../../stream/SingleStreamItem";
import {StreamItem} from "../../../stream/StreamItem";
import {CircleStreamItemService} from "../../../stream/CircleStreamItemService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RanboShapeOptionsService} from "../../../stream/RanboShapeOptionsService";
import {ImageUtility} from "../../../utilities/ImageUtility";

@Component({
    selector: 'list-view',
    template: require('./list.source.component.htm')
})
export class ListSourceComponent implements OnInit {

    private static numItems = 6;
    picture = ImageUtility.circleSource;
    list: StreamItem;
    private itemsToMoveAlong: StreamItem[] = [];
    private streamSourceInputSubject = new BehaviorSubject<StreamItem>(null);
    streamSourceInput = this.streamSourceInputSubject.filter(item => !!item);
    private listIndex = -1;

    constructor(private circleService: CircleStreamItemService) {
    }

    ngOnInit(): void {
        this.list = this.circleService.createStreamItems(ListSourceComponent.numItems, RanboShapeOptionsService.createStreamOption)
        this.list.element
            .map(el => [el])
            .map(element => new SingleStreamItem(element))
            .forEach(item => this.itemsToMoveAlong.push(item));
        this.startStreamOne();
    }

    sourceComplete(item: StreamItem) {
        this.startStreamOne();
    }

    startStreamOne(): void {
        let itemIndex = this.listIndex = ++this.listIndex % ListSourceComponent.numItems;
        this.streamSourceInputSubject.next(this.itemsToMoveAlong[itemIndex]);
    }

}
import {Component, OnInit} from "@angular/core";
import './generative.source.component.htm';
import {StreamItem} from "../../../stream/StreamItem";
import {CircleStreamItemService} from "../../../stream/CircleStreamItemService";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ImageUtility} from "../../../utilities/ImageUtility";

@Component({
    selector: 'generative-view',
    template: require('./generative.source.component.htm')
})
export class GenerativeSourceComponent implements OnInit {

    picture = ImageUtility.circleSource;

    private streamSourceInputSubject = new BehaviorSubject<StreamItem>(null);
    streamSourceInput = this.streamSourceInputSubject.filter(item => !!item);

    constructor(private circleService: CircleStreamItemService) {
    }

    sourceComplete(item: StreamItem) {
        this.startStreamOne();
    }

    startStreamOne(): void {
        this.streamSourceInputSubject.next(this.circleService.createStreamItem());
    }

    ngOnInit(): void {
        this.startStreamOne();
    }

}
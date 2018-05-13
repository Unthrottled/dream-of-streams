import {Component, EventEmitter, Output} from "@angular/core";
import './source.component.htm'
import {StreamItem} from "./StreamItem";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CircleStreamItemService} from "./CircleStreamItemService";


@Component({
    selector: 'stream-source',
    template: require('./source.component.htm'),
    animations: []
})
export class SourceComponent {

    @Output()
    public outputStream = new EventEmitter<StreamItem>();

    private streamSource = new BehaviorSubject<StreamItem>(null);

    inputStream = this.streamSource.filter(item => !!item);


    constructor(private circleService: CircleStreamItemService) {
    }

    toggleState() {
        this.streamSource.next(this.circleService.createStreamItem());
    }

    complete(streamItemAtEnd: StreamItem) {
        this.outputStream.emit(streamItemAtEnd);
    }

}
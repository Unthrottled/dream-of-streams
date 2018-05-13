import {Component, EventEmitter, Output} from "@angular/core";
import './source.component.htm'
import {StreamItem} from "./StreamItem";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


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

    toggleState() {
        this.streamSource.next(new StreamItem());
    }

    complete(streamItemAtEnd: StreamItem) {
        this.outputStream.emit((streamItemAtEnd));
    }

}
import {Component, EventEmitter, Output} from "@angular/core";
import './source.component.htm'
import {StreamItem} from "./StreamItem";


@Component({
    selector: 'stream-source',
    template: require('./source.component.htm'),
    animations: []
})
export class SourceComponent {

    @Output()
    public stream = new EventEmitter<StreamItem>();

    private _streamItems: any[] = [];

    get streamItems(): any[] {
        return this._streamItems;
    }

    toggleState() {
        this._streamItems.push(new StreamItem())
    }

    complete(streamItemAtEnd: StreamItem) {
        this.stream.emit((streamItemAtEnd));
    }

}
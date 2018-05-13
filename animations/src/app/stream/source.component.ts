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

    private itemIndex: Map<number, number> = new Map();
    private _streamItems: StreamItem[] = [];

    get streamItems(): Iterable<StreamItem> {
        return this._streamItems;
    }

    toggleState() {
        let streamItem = new StreamItem();
        this.itemIndex.set(streamItem.identifier,
            this._streamItems.push(streamItem));
    }

    complete(streamItemAtEnd: StreamItem) {
        let index = streamItemAtEnd.identifier;
        this._streamItems.splice(this.itemIndex.get(index), 1);
        this.itemIndex.delete(index);
        this.stream.emit((streamItemAtEnd));
    }

}
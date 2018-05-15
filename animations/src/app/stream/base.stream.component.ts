import {Component, EventEmitter, Input, Output} from "@angular/core";
import './source.component.htm'
import {StreamItemContainer} from "./StreamItemContainer";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'base-stream-component',
    template: require('./base.stream.component.htm'),
    animations: []
})
export class BaseStreamComponent {


    private currentSubscription: Subscription = new Subscription();
    private itemIndex: Map<number, number> = new Map();
    @Output()
    private outputStream = new EventEmitter<StreamItemContainer>();

    private _inputStream: Observable<StreamItemContainer>;

    @Input()
    get inputStream(): Observable<StreamItemContainer> {
        return this._inputStream;
    }

    set inputStream(value: Observable<StreamItemContainer>) {
        this.currentSubscription.unsubscribe();
        this.currentSubscription = value.subscribe(streamItem => {
            this.itemIndex.set(streamItem.identifier,
                this._streamItems.push(streamItem));
        });
    }

    private _streamItems: StreamItemContainer[] = [];

    get streamItems(): Iterable<StreamItemContainer> {
        return this._streamItems;
    }

    complete(streamItemAtEnd: StreamItemContainer) {
        let index = streamItemAtEnd.identifier;
        this._streamItems.splice(this.itemIndex.get(index), 1);
        this.itemIndex.delete(index);
        this.outputStream.emit(streamItemAtEnd);
    }

}
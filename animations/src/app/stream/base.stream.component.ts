import {Component, EventEmitter, Input, Output} from "@angular/core";
import './source.component.htm'
import {StreamItem} from "./StreamItem";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'base-stream-component',
    template: require('./base.stream.component.htm'),
    animations: []
})
export class BaseStreamComponent {


    private currentSubscription: Subscription = new Subscription();
    @Output()
    private outputStream = new EventEmitter<StreamItem>();

    private _inputStream: Observable<StreamItem>;

    @Input()
    get inputStream(): Observable<StreamItem> {
        return this._inputStream;
    }

    set inputStream(value: Observable<StreamItem>) {
        this.currentSubscription.unsubscribe();
        this.currentSubscription = value.subscribe(streamItem => {
            this._streamItems.unshift(streamItem)
        });
    }

    private _streamItems: StreamItem[] = [];

    get streamItems(): Iterable<StreamItem> {
        return this._streamItems;
    }

    complete(streamItemAtEnd: StreamItem) {
        this._streamItems.splice(this._streamItems.indexOf(streamItemAtEnd),
            1);
        this.outputStream.emit(streamItemAtEnd);
    }

}
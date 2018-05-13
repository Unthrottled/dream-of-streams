import {Component, EventEmitter, Input, Output} from "@angular/core";
import './flatMap.stream.component.htm'
import {StreamItem} from "./StreamItem";
import {Observable} from "rxjs/Observable";
import {Function} from "./Function";

@Component({
    selector: 'flatMap-stream',
    template: require('./flatMap.stream.component.htm'),
    animations: []
})
export class FlatMapStreamComponent {

    @Output()
    public outputStream = new EventEmitter<StreamItem>();

    private _mappingFunction: Function<StreamItem, Observable<StreamItem>>;

    @Input()
    get mappingFunction(): Function<StreamItem, Observable<StreamItem>> {
        return this._mappingFunction;
    }

    set mappingFunction(value: Function<StreamItem, Observable<StreamItem>>) {
        this._mappingFunction = value;
    }

    private _inputStream: Observable<StreamItem>;

    @Input()
    get inputStream(): Observable<StreamItem> {
        return this._inputStream;
    }

    set inputStream(value: Observable<StreamItem>) {
        this._inputStream = value.flatMap(item => this.mappingFunction.apply(item));
    }

    complete(streamItemAtEnd: StreamItem) {
        this.outputStream.emit(streamItemAtEnd);
    }

}
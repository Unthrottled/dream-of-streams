import {Component, EventEmitter, Input, Output} from "@angular/core";
import './map.stream.component.htm'
import {StreamItem} from "./StreamItem";
import {Observable} from "rxjs/Observable";
import {Function} from "./Function";

@Component({
    selector: 'map-stream',
    template: require('./map.stream.component.htm'),
    animations: []
})
export class MapStreamComponent {

    @Output()
    public outputStream = new EventEmitter<StreamItem>();

    private _mappingFunction: Function<StreamItem, StreamItem>;

    @Input()
    get mappingFunction(): Function<StreamItem, StreamItem> {
        return this._mappingFunction;
    }

    set mappingFunction(value: Function<StreamItem, StreamItem>) {
        this._mappingFunction = value;
    }

    private _inputStream: Observable<StreamItem>;

    @Input()
    get inputStream(): Observable<StreamItem> {
        return this._inputStream;
    }

    set inputStream(value: Observable<StreamItem>) {
        this._inputStream = value.map(item => this.mappingFunction.apply(item));
    }

    complete(streamItemAtEnd: StreamItem) {
        this.outputStream.emit(streamItemAtEnd);
    }

}
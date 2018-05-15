import {Component, EventEmitter, Input, Output} from "@angular/core";
import './map.stream.component.htm'
import {StreamItemContainer} from "./StreamItemContainer";
import {Observable} from "rxjs/Observable";
import {Function} from "./Function";

@Component({
    selector: 'map-stream',
    template: require('./map.stream.component.htm'),
    animations: []
})
export class MapStreamComponent {

    @Output()
    public outputStream = new EventEmitter<StreamItemContainer>();

    private _mappingFunction: Function<StreamItemContainer, StreamItemContainer>;

    @Input()
    get mappingFunction(): Function<StreamItemContainer, StreamItemContainer> {
        return this._mappingFunction;
    }

    set mappingFunction(value: Function<StreamItemContainer, StreamItemContainer>) {
        this._mappingFunction = value;
    }

    private _inputStream: Observable<StreamItemContainer>;

    @Input()
    get inputStream(): Observable<StreamItemContainer> {
        return this._inputStream;
    }

    set inputStream(value: Observable<StreamItemContainer>) {
        this._inputStream = value.map(item => this.mappingFunction.apply(item));
    }

    complete(streamItemAtEnd: StreamItemContainer) {
        this.outputStream.emit(streamItemAtEnd);
    }

}
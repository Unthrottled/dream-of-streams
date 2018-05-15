import {Component, EventEmitter, Input, Output} from "@angular/core";
import './filter.stream.component.htm'
import {StreamItemContainer} from "./StreamItemContainer";
import {Observable} from "rxjs/Observable";
import {Function} from "./Function";

@Component({
    selector: 'filter-stream',
    template: require('./filter.stream.component.htm'),
    animations: []
})
export class FilterStreamComponent {

    @Output()
    public outputStream = new EventEmitter<StreamItemContainer>();

    private _filterFunction: Function<StreamItemContainer, StreamItemContainer>;

    @Input()
    get filterFunction(): Function<StreamItemContainer, StreamItemContainer> {
        return this._filterFunction;
    }

    set filterFunction(value: Function<StreamItemContainer, StreamItemContainer>) {
        this._filterFunction = value;
    }

    private _inputStream: Observable<StreamItemContainer>;

    @Input()
    get inputStream(): Observable<StreamItemContainer> {
        return this._inputStream;
    }

    set inputStream(value: Observable<StreamItemContainer>) {
        this._inputStream = value.map(item => this.filterFunction.apply(item));
    }

    complete(streamItemAtEnd: StreamItemContainer) {
        this.outputStream.emit(streamItemAtEnd);
    }

}
import {Component, EventEmitter, Input, Output} from "@angular/core";
import './filter.stream.component.htm'
import {StreamItemContainer} from "./StreamItemContainer";
import {Observable} from "rxjs/Observable";
import {Predicate} from "./Predicate";

@Component({
    selector: 'filter-stream',
    template: require('./filter.stream.component.htm'),
    animations: []
})
export class FilterStreamComponent {

    @Output()
    public outputStream = new EventEmitter<StreamItemContainer>();

    private _filterFunction: Predicate<StreamItemContainer>;

    @Input()
    get filterFunction(): Predicate<StreamItemContainer> {
        return this._filterFunction;
    }

    set filterFunction(value: Predicate<StreamItemContainer>) {
        this._filterFunction = value;
    }

    private _inputStream: Observable<StreamItemContainer>;

    @Input()
    get inputStream(): Observable<StreamItemContainer> {
        return this._inputStream;
    }

    set inputStream(value: Observable<StreamItemContainer>) {
        this._inputStream = value.filter(item => this.filterFunction.test(item));
    }

    complete(streamItemAtEnd: StreamItemContainer) {
        this.outputStream.emit(streamItemAtEnd);
    }

}
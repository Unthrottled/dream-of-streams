import {Component, EventEmitter, Input, Output} from "@angular/core";
import './filter.stream.component.htm'
import {StreamItem} from "./StreamItem";
import {Observable} from "rxjs/Observable";
import {Predicate} from "./Predicate";

@Component({
    selector: 'filter-stream',
    template: require('./filter.stream.component.htm'),
    animations: []
})
export class FilterStreamComponent {

    @Output()
    public outputStream = new EventEmitter<StreamItem>();

    @Output()
    public filteredOutputStream = new EventEmitter<StreamItem>();

    private _filterFunction: Predicate<StreamItem>;

    @Input()
    get filterFunction(): Predicate<StreamItem> {
        return this._filterFunction;
    }

    set filterFunction(value: Predicate<StreamItem>) {
        this._filterFunction = value;
    }

    private _inputStream: Observable<StreamItem>;

    @Input()
    get inputStream(): Observable<StreamItem> {
        return this._inputStream;
    }

    set inputStream(value: Observable<StreamItem>) {
        this._inputStream = value.filter(item => {
            let willPass = this.filterFunction.test(item);
            if (!willPass) {
                this.filteredOutputStream.emit(item);
            }
            return willPass;
        });
    }

    complete(streamItemAtEnd: StreamItem) {
        this.outputStream.emit(streamItemAtEnd);
    }

}
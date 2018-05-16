import {Component, EventEmitter, Input, Output} from "@angular/core";
import './flatMap.stream.component.htm'
import {StreamItemContainer} from "./StreamItem";
import {Observable} from "rxjs/Observable";
import {Function} from "./Function";

@Component({
    selector: 'flatMap-stream',
    template: require('./flatMap.stream.component.htm'),
    animations: []
})
export class FlatMapStreamComponent {

    @Output()
    public outputStream = new EventEmitter<StreamItemContainer>();

    private _mappingFunction: Function<StreamItemContainer, Observable<StreamItemContainer>>;

    @Input()
    get mappingFunction(): Function<StreamItemContainer, Observable<StreamItemContainer>> {
        return this._mappingFunction;
    }

    set mappingFunction(value: Function<StreamItemContainer, Observable<StreamItemContainer>>) {
        this._mappingFunction = value;
    }

    private _inputStream: Observable<StreamItemContainer>;

    @Input()
    get inputStream(): Observable<StreamItemContainer> {
        return this._inputStream;
    }

    set inputStream(value: Observable<StreamItemContainer>) {
        this._inputStream = value.flatMap(item => this.mappingFunction.apply(item));
    }

    complete(streamItemAtEnd: StreamItemContainer) {
        this.outputStream.emit(streamItemAtEnd);
    }

}
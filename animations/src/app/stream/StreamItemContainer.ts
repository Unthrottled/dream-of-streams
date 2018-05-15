import {Element} from "@progress/kendo-drawing";
import {StreamItem} from "./StreamItem";
import {Observable} from "rxjs/Observable";

export class StreamItemContainer {

    constructor(private _items: Observable<StreamItem>, private _isCollection: boolean) {
        this._identifier = new Date().getTime();
    }

    private _identifier: number;

    get identifier(): number {
        return this._identifier;
    }

    get items(): Observable<StreamItem> {
        return this._items;
    }

    get isCollection(): boolean {
        return this._isCollection;
    }
}
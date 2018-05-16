import {Element} from "@progress/kendo-drawing";
import {StreamItem} from "./StreamItem";
import {Observable} from "rxjs/Observable";

export class SingleStreamItem implements StreamItem {

    constructor(private _element: Observable<Element>) {
        this._identifier = new Date().getTime();
    }

    get element(): Observable<Element> {
        return this._element;
    }

    private _identifier: number;

    get identifier(): number {
        return this._identifier;
    }

    toString(): String {
        return this._identifier.toString();
    }
}
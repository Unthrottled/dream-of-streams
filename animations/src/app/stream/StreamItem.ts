import {Element} from "@progress/kendo-drawing";

export class StreamItem {

    constructor(private _element: Element) {
        this._identifier = new Date().getTime();
    }

    get element(): Element {
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
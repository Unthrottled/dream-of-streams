import {Element} from "@progress/kendo-drawing";
import {StreamItem} from "./StreamItem";

export class BaseStreamItem implements StreamItem {

    //Sure would be nice to have a Mono or Flux :)
    constructor(private _element: Element[]) {
        this._identifier = new Date().getTime();
    }

    get element(): Element[] {
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
import {StreamItem} from "./StreamItem";
import {Element, ShapeOptions} from "@progress/kendo-drawing";
import {StreamItemFactory} from "./StreamItemFactory";
import {SingleStreamItem} from "./SingleStreamItem";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {MultiStreamItem} from "./MultiStreamItem";

export abstract class BaseStreamItemService implements StreamItemFactory {

    //todo: need to make a random cold observable return the same thing
    constructor() {
    }

    //todo: probably should have a base stream item factory :\
    createStreamItems(thisMany: number, options?: () => ShapeOptions): StreamItem {
        return new MultiStreamItem(Observable.create((observer: Observer<Element>) => {
            const itemToEmit = () => this.createShape(options);
            for (let i = 0; i < thisMany; ++i) {
                observer.next(itemToEmit());
            }
            observer.complete()
        }));
    }

    createStreamItem(options?: () => ShapeOptions): SingleStreamItem {
        return new SingleStreamItem(Observable.of(this.createShape(options)));
    }

    protected abstract createShape(options: () => ShapeOptions): Element;
}
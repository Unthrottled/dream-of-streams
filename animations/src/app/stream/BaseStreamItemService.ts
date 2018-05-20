import {StreamItem} from "./StreamItem";
import {Element, ShapeOptions} from "@progress/kendo-drawing";
import {StreamItemFactory} from "./StreamItemFactory";
import {SingleStreamItem} from "./SingleStreamItem";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {MultiStreamItem} from "./MultiStreamItem";
import {ReplaySubject} from "rxjs/ReplaySubject";

export abstract class BaseStreamItemService implements StreamItemFactory {

    createStreamItems(thisMany: number, options?: () => ShapeOptions): StreamItem {
        const replaySubject = new ReplaySubject<Element>();
        const elements: Observable<Element> =
            Observable.create((observer: Observer<Element>) => {
                const itemToEmit = () => this.createShape(options);
                for (let i = 0; i < thisMany; ++i) {
                    observer.next(itemToEmit());
                }
                observer.complete()
            });
        elements.subscribe(e=>replaySubject.next(e),
                err=>replaySubject.error(err),
            ()=>replaySubject.complete());
        return new MultiStreamItem(replaySubject);
    }

    createStreamItem(options?: () => ShapeOptions): SingleStreamItem {
        return new SingleStreamItem(Observable.of(this.createShape(options)));
    }

    protected abstract createShape(options: () => ShapeOptions): Element;
}
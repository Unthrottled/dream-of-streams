import {StreamItem} from "./StreamItem";
import {Element, ShapeOptions} from "@progress/kendo-drawing";
import {StreamItemFactory} from "./StreamItemFactory";
import {SingleStreamItem} from "./SingleStreamItem";
import {MultiStreamItem} from "./MultiStreamItem";

export abstract class BaseStreamItemService implements StreamItemFactory {

    createStreamItems(thisMany: number, options?: () => ShapeOptions): StreamItem {
        const items: Element[] = [];
        const itemToEmit = () => this.createShape(options);
        for (let i = 0; i < thisMany; ++i) {
            items.push(itemToEmit());
        }
        return new MultiStreamItem(items);
    }

    createStreamItem(options?: () => ShapeOptions): SingleStreamItem {
        return new SingleStreamItem([this.createShape(options)]);
    }

    public abstract createShape(options: () => ShapeOptions): Element;
}
import {ShapeOptions} from "@progress/kendo-drawing";
import {StreamItem} from "./StreamItem";

export interface StreamItemFactory {

    createStreamItem(options?: ShapeOptions): StreamItem;
}
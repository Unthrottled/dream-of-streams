import {ShapeOptions} from "@progress/kendo-drawing";
import {StreamItemContainer} from "./StreamItem";

export interface StreamItemFactory {

    createStreamItem(options?: ShapeOptions): StreamItemContainer;
}
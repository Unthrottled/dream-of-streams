import {Injectable} from "@angular/core";
import {Circle, Element, ShapeOptions} from "@progress/kendo-drawing";
import {Circle as GeomCircle} from "@progress/kendo-drawing/geometry";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {BaseStreamItemService} from "./BaseStreamItemService";

@Injectable()
export class CircleStreamItemService extends BaseStreamItemService {

    protected createShape(options: () => ShapeOptions): Element {
        // Create the circle geometry and element
        return new Circle(new GeomCircle([25, 25], 20),
            (options && options()) ||
            RanboShapeOptionsService.createStreamOption())
    }
}
import {Injectable} from "@angular/core";
import {Element, Path, ShapeOptions} from "@progress/kendo-drawing";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {BaseStreamItemService} from "./BaseStreamItemService";

@Injectable()
export class TriangleStreamItemService extends BaseStreamItemService {

    protected createShape(options: () => ShapeOptions): Element {
        // Create the circle geometry and element
        const path = new Path((options && options()) || RanboShapeOptionsService.createStreamOption());
        path.moveTo(25, 0)
            .lineTo(50, 50)
            .lineTo(0, 50)
            .close();
        return path;
    }
}
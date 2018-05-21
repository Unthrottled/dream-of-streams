import {Injectable} from "@angular/core";
import {Element, Path, ShapeOptions} from "@progress/kendo-drawing";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {BaseStreamItemService} from "./BaseStreamItemService";

@Injectable()
export class SquareStreamItemService extends BaseStreamItemService {

    createShape(options: () => ShapeOptions): Element {
        // Create the circle geometry and element
        const path = new Path((options && options()) || RanboShapeOptionsService.createStreamOption());
        path.moveTo(0, 0)
            .lineTo(0, 50)
            .lineTo(50, 50)
            .lineTo(50, 0)
            .close();
        return path;
    }
}
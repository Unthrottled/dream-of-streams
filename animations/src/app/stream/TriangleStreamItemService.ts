import {Injectable} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Element, Path, ShapeOptions} from "@progress/kendo-drawing";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {StreamItemFactory} from "./StreamItemFactory";
import {SingleStreamItem} from "./SingleStreamItem";

@Injectable()
export class TriangleStreamItemService implements StreamItemFactory {

    createStreamItem(options?: ShapeOptions): SingleStreamItem {
        return new SingleStreamItem(this.createTriangle(options));
    }

    private createTriangle(options: ShapeOptions): Element {
        // Create the circle geometry and element
        const path = new Path(options || RanboShapeOptionsService.createStreamOption());
        path.moveTo(25, 0)
            .lineTo(50, 50)
            .lineTo(0, 50)
            .close();
        return path;
    }
}
import {Injectable} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Element, Path, ShapeOptions} from "@progress/kendo-drawing";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {StreamItemFactory} from "./StreamItemFactory";

@Injectable()
export class TriangleStreamItemService implements StreamItemFactory {

    createStreamItem(options?: ShapeOptions): StreamItem {
        return new StreamItem(this.createTriangle(options));
    }

    private createTriangle(options: ShapeOptions): Element {
        // Create the circle geometry and shape
        const path = new Path(options || RanboShapeOptionsService.createStreamOption());
        path.moveTo(0, 0)
            .lineTo(10, -10)
            .lineTo(-10, -10)
            .close();
        return path;
    }
}
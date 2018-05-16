import {Injectable} from "@angular/core";
import {StreamItemContainer} from "./StreamItem";
import {Element, Path, ShapeOptions} from "@progress/kendo-drawing";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {StreamItemFactory} from "./StreamItemFactory";

@Injectable()
export class TriangleStreamItemService implements StreamItemFactory {

    createStreamItem(options?: ShapeOptions): StreamItemContainer {
        return new StreamItemContainer(this.createTriangle(options));
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
import {Injectable} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Element, Path, ShapeOptions} from "@progress/kendo-drawing";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {StreamItemFactory} from "./StreamItemFactory";

@Injectable()
export class SquareStreamItemService implements StreamItemFactory {

    createStreamItem(options?: ShapeOptions): StreamItem {
        return new StreamItem(this.createSquare(options));
    }

    private createSquare(options: ShapeOptions): Element {
        // Create the circle geometry and element
        const path = new Path(options || RanboShapeOptionsService.createStreamOption());
        path.moveTo(0, 0)
            .lineTo(0, 50)
            .lineTo(50, 50)
            .lineTo(50, 0)
            .close();
        return path;
    }
}
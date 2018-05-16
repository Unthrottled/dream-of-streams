import {Injectable} from "@angular/core";
import {Element, Path, ShapeOptions} from "@progress/kendo-drawing";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {StreamItemFactory} from "./StreamItemFactory";
import {SingleStreamItem} from "./SingleStreamItem";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SquareStreamItemService implements StreamItemFactory {

    createStreamItem(options?: ShapeOptions): SingleStreamItem {
        return new SingleStreamItem(Observable.of(this.createSquare(options)));
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
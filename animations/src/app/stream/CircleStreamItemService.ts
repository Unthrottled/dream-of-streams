import {Injectable} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Circle, Element, ShapeOptions} from "@progress/kendo-drawing";
import {Circle as GeomCircle} from "@progress/kendo-drawing/geometry";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {StreamItemFactory} from "./StreamItemFactory";
import {SingleStreamItem} from "./SingleStreamItem";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CircleStreamItemService implements StreamItemFactory{


    constructor() {
    }

    createStreamItem(options?: ShapeOptions): SingleStreamItem {
        return new SingleStreamItem(Observable.of(this.createCircle(options)));
    }

    private createCircle(options: ShapeOptions): Element {
        // Create the circle geometry and element
        return new Circle(new GeomCircle([25, 25], 20),
            options ||
            RanboShapeOptionsService.createStreamOption())
    }
}
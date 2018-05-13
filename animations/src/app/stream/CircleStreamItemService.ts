import {Injectable} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Circle, Element} from "@progress/kendo-drawing";
import {Circle as GeomCircle} from "@progress/kendo-drawing/geometry";
let randomColor = require('randomcolor');

@Injectable()
export class CircleStreamItemService {

    createStreamItem(): StreamItem {
        return new StreamItem(this.createCircle());
    }

    private createCircle(): Element {
        // Create the circle geometry and shape
        let color = randomColor(new Date().getSeconds());
        return new Circle(new GeomCircle([25, 25], 14), {
            stroke: {color: color, width: 1, opacity: 0.5},
            fill: {color: color, opacity: 0.5}
        })
    }
}
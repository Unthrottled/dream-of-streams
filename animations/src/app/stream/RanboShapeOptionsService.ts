import {ShapeOptions} from "@progress/kendo-drawing";

let randomColor = require('randomcolor');

export class RanboShapeOptionsService {

    static createStreamOption(): ShapeOptions {
        let color = randomColor(new Date().getSeconds());
        return {
            stroke: {color: color, width: 1, opacity: 0.5},
            fill: {color: color, opacity: 0.5}
        };
    }
}
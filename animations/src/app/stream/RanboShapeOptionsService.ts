import {ShapeOptions} from "@progress/kendo-drawing";

let randomColor = require('randomcolor');

export class RanboShapeOptionsService {

    static createStreamOption(): ShapeOptions {
        let color = randomColor(new Date().getSeconds());
        return {
            stroke: {color: 'black', width: 2, opacity: 15},
            fill: {color: color, opacity: 0.75}
        };
    }
}
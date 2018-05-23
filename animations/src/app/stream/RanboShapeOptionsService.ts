import {ShapeOptions} from "@progress/kendo-drawing";


export class RanboShapeOptionsService {

    static createStreamOption(): ShapeOptions {
        let color = 'red';
        return {
            stroke: {color: 'black', width: 2, opacity: 15},
            fill: {color: color, opacity: 0.75}
        };
    }
}
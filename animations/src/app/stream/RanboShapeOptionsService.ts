import {ShapeOptions} from "@progress/kendo-drawing";


export class RanboShapeOptionsService {

    static createStreamOption(): ShapeOptions {
        let randomInt = RanboShapeOptionsService.getRandomInt(0,RanboShapeOptionsService.colors.length - 1);
        let color = RanboShapeOptionsService.colors[randomInt];
        return {
            stroke: {color: 'black', width: 2, opacity: 15},
            fill: {color: color, opacity: 0.75}
        };
    }

    private static colors = [
        'black',
        'red',
        'orange',
        'yellow',
        'green',
        'cyan',
        'blue',
        'indigo',
        'violet',
        'purple',
        'pink'
    ];

    private static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
}
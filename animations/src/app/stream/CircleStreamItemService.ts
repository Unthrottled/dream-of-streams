import {Injectable} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Circle, Element, ShapeOptions} from "@progress/kendo-drawing";
import {Circle as GeomCircle} from "@progress/kendo-drawing/geometry";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {StreamItemFactory} from "./StreamItemFactory";
import {SingleStreamItem} from "./SingleStreamItem";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {MultiStreamItem} from "./MultiStreamItem";

@Injectable()
export class CircleStreamItemService implements StreamItemFactory{

    //todo: need to make a random cold observable return the same thing
    //todo: probably should have a base stream item factory :\
    createStreamItems(thisMany: number, options?: ()=> ShapeOptions): StreamItem {
        return new MultiStreamItem(Observable.create((observer: Observer<Element>)=>{
            const itemToEmit = ()=>this.createCircle(options);
            for (let i = 0; i < thisMany; ++i) {
                observer.next(itemToEmit());
            }
            observer.complete()
        }));
    }

    constructor() {
    }

    createStreamItem(options?: ()=> ShapeOptions): SingleStreamItem {
        return new SingleStreamItem(Observable.of(this.createCircle(options)));
    }

    private createCircle(options: ()=> ShapeOptions): Element {
        // Create the circle geometry and element
        return new Circle(new GeomCircle([25, 25], 20),
            (options && options()) ||
            RanboShapeOptionsService.createStreamOption())
    }
}
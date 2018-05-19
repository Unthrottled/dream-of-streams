import {Injectable} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Element, Path, ShapeOptions} from "@progress/kendo-drawing";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {StreamItemFactory} from "./StreamItemFactory";
import {SingleStreamItem} from "./SingleStreamItem";
import {Observable} from "rxjs/Observable";
import {MultiStreamItem} from "./MultiStreamItem";
import {Observer} from "rxjs/Observer";

@Injectable()
export class TriangleStreamItemService implements StreamItemFactory {

    createStreamItems(thisMany: number, options?: ()=> ShapeOptions): StreamItem {
        return new MultiStreamItem(Observable.create((observer: Observer<Element>)=>{
            const itemToEmit = ()=>this.createTriangle(options);
            for (let i = 0; i < 4; ++i) {
                observer.next(itemToEmit());
            }
            observer.complete()
        }));
    }

    createStreamItem(options?: ()=> ShapeOptions): SingleStreamItem {
        return new SingleStreamItem(Observable.of(this.createTriangle(options)));
    }

    private createTriangle(options: ()=> ShapeOptions): Element {
        // Create the circle geometry and element
        const path = new Path((options && options()) || RanboShapeOptionsService.createStreamOption());
        path.moveTo(25, 0)
            .lineTo(50, 50)
            .lineTo(0, 50)
            .close();
        return path;
    }
}
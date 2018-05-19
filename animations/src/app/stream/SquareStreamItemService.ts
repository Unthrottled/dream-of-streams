import {Injectable} from "@angular/core";
import {Element, Path, ShapeOptions} from "@progress/kendo-drawing";
import {RanboShapeOptionsService} from "./RanboShapeOptionsService";
import {StreamItemFactory} from "./StreamItemFactory";
import {SingleStreamItem} from "./SingleStreamItem";
import {Observable} from "rxjs/Observable";
import {StreamItem} from "./StreamItem";
import {Observer} from "rxjs/Observer";
import {MultiStreamItem} from "./MultiStreamItem";

@Injectable()
export class SquareStreamItemService implements StreamItemFactory {

    createStreamItems(thisMany: number, options?: ()=> ShapeOptions): StreamItem {
        return new MultiStreamItem(Observable.create((observer: Observer<Element>)=>{
            const itemToEmit = this.createSquare(options);
            for (let i = 0; i < 4; ++i) {
                observer.next(itemToEmit);
            }
            observer.complete()
        }));
    }

    createStreamItem(options?: ()=> ShapeOptions): SingleStreamItem {
        return new SingleStreamItem(Observable.of(this.createSquare(options)));
    }

    private createSquare(options: ()=> ShapeOptions): Element {
        // Create the circle geometry and element
        const path = new Path((options && options()) || RanboShapeOptionsService.createStreamOption());
        path.moveTo(0, 0)
            .lineTo(0, 50)
            .lineTo(50, 50)
            .lineTo(50, 0)
            .close();
        return path;
    }
}
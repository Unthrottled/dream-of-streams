import {Element} from "@progress/kendo-drawing";
import {Observable} from "rxjs/Observable";

export interface StreamItem {

    element: Observable<Element>;

    identifier: number;
}
import {Component} from "@angular/core";
import "./app.component.htm";
import {StreamItem} from "./stream/StreamItem";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Function} from "./stream/Function";
import {Predicate} from "./stream/Predicate";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Scheduler} from "rxjs/Rx";
import {TriangleStreamItemService} from "./stream/TriangleStreamItemService";
import {SquareStreamItemService} from "./stream/SquareStreamItemService";
import {SingleStreamItem} from "./stream/SingleStreamItem";
import {Element} from "@progress/kendo-drawing";
import {MultiStreamItem} from "./stream/MultiStreamItem";

@Component({
    selector: 'angular-application',
    template: require('./app.component.htm')
})
export class AppComponent {

    /**
     * I am sorry you do not deserve this,
     * beware many uses of observable below
     * @type {{apply: (streamItem: StreamItem) => MultiStreamItem}}
     */
    mapTwo: Function<StreamItem, StreamItem> = {
        apply: (streamItem: StreamItem) =>
            new MultiStreamItem(Observable.create((observer: Observer<Element>) =>
                streamItem.element.subscribe((element: Element) =>
                    this.triangleFactory.createStreamItem({
                        fill: element.options.get('fill'),
                        stroke: element.options.get('stroke'),
                    }).element
                        .subscribe(triangleElement => {
                                for (let i = 0; i < 4; ++i) {
                                    observer.next(triangleElement);
                                    console.warn('triangle!!')
                                }
                                observer.complete()
                            }, observer.error,
                            observer.complete)
                )))
    };

    mapOne: Function<StreamItem, StreamItem> = {
        apply: (streamItem: StreamItem) => new SingleStreamItem(
            streamItem.element.flatMap((element: Element) => this.hip2B.createStreamItem({
                    fill: element.options.get('fill'),
                    stroke: element.options.get('stroke'),
                }).element
            ))
    };
    flatMapOne: Function<StreamItem, Observable<StreamItem>> = {
        apply: (streamItem: StreamItem) => Observable.create((observer: Observer<StreamItem>) => {
            streamItem.element.subscribe((element: Element) => {
                let triangle: StreamItem =
                    this.triangleFactory.createStreamItem({
                        fill: element.options.get('fill'),
                        stroke: element.options.get('stroke'),
                    });
                observer.next(triangle);
                Observable.interval(350, Scheduler.async)
                    .take(4)
                    .subscribe(_ => observer.next(triangle),
                        observer.error,
                        observer.complete);
            });
        })
    };
    filterOne: Predicate<StreamItem> = {
        test: (item: StreamItem) => item.identifier % 2 === 0
    };

    private sourceSubject = new BehaviorSubject(null);
    sourceOutput = this.sourceSubject.filter(item => !!item);

    private sourceSubjectTwo = new BehaviorSubject(null);
    sourceOutputTwo = this.sourceSubjectTwo.filter(item => !!item);

    private mapSubject = new BehaviorSubject(null);
    mapOutput = this.mapSubject.filter(item => !!item);
    private flatMapSubject = new BehaviorSubject(null);
    flatMapOutput = this.flatMapSubject.filter(item => !!item);

    constructor(private triangleFactory: TriangleStreamItemService,
                private hip2B: SquareStreamItemService) {
    }

    sourceComplete(item: StreamItem) {
        this.sourceSubject.next(item);
    }

    sourceCompleteTwo(item: StreamItem) {
        this.sourceSubjectTwo.next(item);
    }

    mapOneComplete(steamItem: StreamItem) {
        this.mapSubject.next(steamItem)
    }

    flatMapOneComplete(steamItem: StreamItem) {
        this.flatMapSubject.next(steamItem)
    }

    filterOneComplete(steamItem: StreamItem) {

    }
}

import {Component} from "@angular/core";
import "./app.component.htm";
import {StreamItemContainer} from "./stream/StreamItem";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Function} from "./stream/Function";
import {Predicate} from "./stream/Predicate";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Scheduler} from "rxjs/Rx";
import {TriangleStreamItemService} from "./stream/TriangleStreamItemService";
import {SquareStreamItemService} from "./stream/SquareStreamItemService";

@Component({
    selector: 'angular-application',
    template: require('./app.component.htm')
})
export class AppComponent {


    constructor(private triangleFactory: TriangleStreamItemService,
                private hip2B: SquareStreamItemService) {
    }

    mapOne: Function<StreamItemContainer, StreamItemContainer> = {
        apply: (item: StreamItemContainer) => this.hip2B.createStreamItem({
            fill: item.element.options.get('fill'),
            stroke: item.element.options.get('stroke'),
        })
    };

    flatMapOne: Function<StreamItemContainer, Observable<StreamItemContainer>> = {
        apply: (item: StreamItemContainer) => Observable.create((observer: Observer<StreamItemContainer>) => {
            let triangle = this.triangleFactory.createStreamItem({
                fill: item.element.options.get('fill'),
                stroke: item.element.options.get('stroke'),
            });
            observer.next(triangle);
            Observable.interval(350, Scheduler.async)
                .take(4)
                .subscribe(_ => observer.next(triangle),
                    observer.error,
                    observer.complete)
        })
    };

    filterOne: Predicate<StreamItemContainer> = {
        test: (item: StreamItemContainer) => item.identifier % 2 === 0
    };

    private sourceSubject = new BehaviorSubject(null);
    sourceOutput = this.sourceSubject.filter(item => !!item);

    private mapSubject = new BehaviorSubject(null);
    mapOutput = this.mapSubject.filter(item => !!item);

    private flatMapSubject = new BehaviorSubject(null);
    flatMapOutput = this.flatMapSubject.filter(item => !!item);

    sourceComplete(item: StreamItemContainer) {
        this.sourceSubject.next(item);
    }

    mapOneComplete(steamItem: StreamItemContainer) {
        this.mapSubject.next(steamItem)
    }

    flatMapOneComplete(steamItem: StreamItemContainer) {
        this.flatMapSubject.next(steamItem)
    }

    filterOneComplete(steamItem: StreamItemContainer) {

    }
}

import {Component} from "@angular/core";
import "./app.component.htm";
import {StreamItem} from "./stream/StreamItem";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Function} from "./stream/Function";
import {Predicate} from "./stream/Predicate";

@Component({
    selector: 'angular-application',
    template: require('./app.component.htm')
})
export class AppComponent {

    mapOne: Function<StreamItem, StreamItem> = {
        apply: (item: StreamItem) => item
    };

    filterOne: Predicate<StreamItem> = {
        test: (item: StreamItem) => item.identifier % 2 === 0
    };

    private sourceSubject = new BehaviorSubject(null);
    sourceOutput = this.sourceSubject.filter(item => !!item);

    private mapSubject = new BehaviorSubject(null);
    mapOutput = this.mapSubject.filter(item => !!item);

    sourceComplete(item: StreamItem) {
        this.sourceSubject.next(item);
    }

    mapOneComplete(steamItem: StreamItem) {
        this.mapSubject.next(steamItem)
    }

    filterOneComplete(steamItem: StreamItem) {

    }
}

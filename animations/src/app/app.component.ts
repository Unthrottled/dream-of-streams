import {Component} from "@angular/core";
import "./app.component.htm";
import {StreamItem} from "./stream/StreamItem";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Function} from "./stream/Function";

@Component({
    selector: 'angular-application',
    template: require('./app.component.htm')
})
export class AppComponent {

    mapOne: Function<StreamItem, StreamItem> = {
        apply: (item: StreamItem) => item
    };

    private sourceSubject = new BehaviorSubject(null);
    sourceOutput = this.sourceSubject.filter(item => !!item);

    sourceComplete(item: StreamItem) {
        this.sourceSubject.next(item);
    }

    mapOneComplete(steamItem: StreamItem) {
        console.log("end o the line for", steamItem)
    }
}

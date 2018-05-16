import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import './source.component.htm'
import {StreamItem} from "./StreamItem";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CircleStreamItemService} from "./CircleStreamItemService";
import {Observable} from "rxjs/Observable";
import {Scheduler} from "rxjs/Rx";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'stream-source',
    template: require('./source.component.htm'),
    animations: []
})
export class SourceComponent implements OnInit, OnDestroy {

    @Output()
    public outputStream = new EventEmitter<StreamItem>();

    private streamSource = new BehaviorSubject<StreamItem>(null);

    inputStream = this.streamSource.filter(item => !!item);

    private subscription: Subscription;


    constructor(private circleService: CircleStreamItemService) {

    }

    toggleState() {
        this.streamSource.next(this.circleService.createStreamItem());
    }

    complete(streamItemAtEnd: StreamItem) {
        this.outputStream.emit(streamItemAtEnd);
    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        // this.subscription = Observable.interval(5000, Scheduler.async)
        //     .subscribe(_=>this.toggleState());
    }

}
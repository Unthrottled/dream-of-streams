import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import './source.component.htm'
import {StreamItemContainer} from "./StreamItemContainer";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CircleStreamItemService} from "./CircleStreamItemService";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'stream-source',
    template: require('./source.component.htm'),
    animations: []
})
export class SourceComponent implements OnInit, OnDestroy {

    @Output()
    public outputStream = new EventEmitter<StreamItemContainer>();

    private streamSource = new BehaviorSubject<StreamItemContainer>(null);

    inputStream = this.streamSource.filter(item => !!item);

    private subscription: Subscription;


    constructor(private circleService: CircleStreamItemService) {

    }

    toggleState() {
        this.streamSource.next(new StreamItemContainer(
            Observable.of(this.circleService.createStreamItem()),
            false));
    }

    complete(streamItemAtEnd: StreamItemContainer) {
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
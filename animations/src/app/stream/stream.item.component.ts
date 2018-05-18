import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {SingleStreamItem} from "./SingleStreamItem";
import {MultiStreamItem} from "./MultiStreamItem";
import {Element} from "@progress/kendo-drawing";

@Component({
    selector: 'stream-item',
    template: `
        <div>
            <div *ngIf="heyGurlYouSingle">
                <draw-stream-item [element]="streamItem.element | async"
                                  (drawn)="itemDrawn()"></draw-stream-item>
            </div>
            <div *ngIf="heyGurlYouAFreak">
                <div *ngFor="let element of elements">
                    <draw-stream-item [element]="element"
                                      (drawn)="itemDrawn()"></draw-stream-item>
                </div>
            </div>
        </div>
    `
})
export class StreamItemComponent implements OnInit {
    ngOnInit(): void {
        this.streamItem.element
            .subscribe(element => this.elements.push(element),
                console.warn,
                () => this.allElementsReceived())
    }
    @Output()
    private drawn = new EventEmitter<void>();
    private elements: Element[] = [];
    private allElementsAdded = false;
    private numDrawn = 0;

    constructor(private myElement: ElementRef) {
    }

    private _streamItem: StreamItem;

    @Input()
    get streamItem(): StreamItem {
        return this._streamItem;
    }

    set streamItem(value: StreamItem) {
        this._streamItem = value;
    }

    get heyGurlYouSingle(): boolean {
        return this.streamItem instanceof SingleStreamItem;
    }

    get heyGurlYouAFreak(): boolean {
        return this.streamItem instanceof MultiStreamItem;
    }

    itemDrawn() {
        this.numDrawn++;
        this.tryToComplete();
    }

    private allElementsReceived() {
        this.allElementsAdded = true;
        this.tryToComplete();
    }

    private tryToComplete() {
        if (this.isComplete()) {
            this.drawn.emit();
        }
    }

    private isComplete(): boolean {
        return this.allElementsAdded &&
            this.numDrawn === this.elements.length;
    }
}
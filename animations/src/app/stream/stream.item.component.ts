import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Surface} from '@progress/kendo-drawing';
import {SingleStreamItem} from "./SingleStreamItem";
import {MultiStreamItem} from "./MultiStreamItem";

@Component({
    selector: 'stream-item',
    template: `
        <div></div>
    `
})
export class StreamItemComponent implements AfterViewInit, OnDestroy {

    private surface: Surface;
    @Output()
    private drawn = new EventEmitter<void>();

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

    public ngAfterViewInit(): void {
        this.streamItem.element.subscribe(element =>
                this.createSurface().draw(element), err => console.warn(err),
            () => this.drawn.emit())

    }

    public ngOnDestroy() {
        this.surface.destroy();
    }

    private createSurface(): Surface {
        return this.surface = Surface.create(this.myElement.nativeElement, {
            height: "50px",
            width: "50px"
        });
    }
}
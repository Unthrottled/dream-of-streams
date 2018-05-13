import {AfterViewInit, Component, ElementRef, Input, OnDestroy} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Surface} from '@progress/kendo-drawing';

@Component({
    selector: 'stream-item',
    template: `
        <div></div>
    `
})
export class StreamItemComponent implements AfterViewInit, OnDestroy {

    private surface: Surface;

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

    public ngAfterViewInit(): void {
        this.createSurface()
            .draw(this.streamItem.element);
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
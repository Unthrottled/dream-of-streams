import {AfterViewInit, Component, ElementRef, Input, OnDestroy} from "@angular/core";
import {StreamItemContainer} from "./StreamItem";
import {Surface} from '@progress/kendo-drawing';

@Component({
    selector: 'stream-item-container',
    template: `
        <div></div>
    `
})
export class StreamItemContainerComponent implements AfterViewInit, OnDestroy {

    private surface: Surface;

    constructor(private myElement: ElementRef) {
    }

    private _streamItem: StreamItemContainer;

    @Input()
    get streamItem(): StreamItemContainer {
        return this._streamItem;
    }

    set streamItem(value: StreamItemContainer) {
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
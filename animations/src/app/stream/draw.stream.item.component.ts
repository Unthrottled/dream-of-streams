import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output} from "@angular/core";
import {Surface, Element} from '@progress/kendo-drawing';

@Component({
    selector: 'draw-stream-item',
    template: `
        <div></div>
    `
})
export class DrawStreamItemComponent implements AfterViewInit, OnDestroy {

    private surface: Surface;
    @Output()
    private drawn = new EventEmitter<void>();

    constructor(private myElement: ElementRef) {
    }

    private _element: Element;

    @Input()
    get element(): Element {
        return this._element;
    }

    set element(value: Element) {
        this._element = value;
    }


    public ngAfterViewInit(): void {
        this.createSurface().draw(this.element);
        this.drawn.emit()

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
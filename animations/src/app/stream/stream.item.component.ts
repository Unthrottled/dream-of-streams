import {AfterViewInit, Component, ElementRef, Input, OnDestroy} from "@angular/core";
import {StreamItem} from "./StreamItem";
import {Circle, Surface} from '@progress/kendo-drawing';
import {Circle as GeomCircle} from '@progress/kendo-drawing/geometry';

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
        this.drawScene(this.createSurface());
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

    private drawScene(surface: Surface) {
        // Create the circle geometry and shape
        const geometry = new GeomCircle([25, 25], 14);
        const circle = new Circle(geometry, {
            stroke: {color: "red", width: 1, opacity: 0.5},
            fill: {color: 'red', opacity: 0.5}
        });

        // Render the group on the surface
        surface.draw(circle);
    }
}
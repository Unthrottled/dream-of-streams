import {Component, Input} from "@angular/core";
import {StreamItemContainer} from "./StreamItemContainer";

@Component({
    selector: 'stream-item-container',
    template: `
        <div>
            <div *ngIf="streamItemContainer.isCollection">
                <div *ngFor="let item of streamItemContainer.items | async">
                    <stream-item [streamItem]="item"></stream-item>
                </div>
            </div>
            <div *ngIf="!streamItemContainer.isCollection">

            </div>
        </div>
    `
})
export class StreamItemContainerComponent {

    private _streamItemContainer: StreamItemContainer;

    @Input()
    get streamItemContainer(): StreamItemContainer {
        return this._streamItemContainer;
    }

    set streamItemContainer(value: StreamItemContainer) {
        this._streamItemContainer = value;
    }

}
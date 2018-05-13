import {Component, EventEmitter, Input, Output} from "@angular/core";
import './transition.component.htm'
import {animate, state, style, transition, trigger} from "@angular/animations";
import {StreamItem} from "./StreamItem";

@Component({
    selector: 'stream-transition',
    template: require('./transition.component.htm'),
    animations: [
        trigger('streamSourceState', [
            state('active', style({
                transform: 'translateX(100%)'
            })),
            transition('* => active', animate('2s ease-in'))
        ])
    ]
})
export class TransitionComponent {
    state: String = 'active';
    @Output()
    private completedTransiton = new EventEmitter<StreamItem>();

    private _input: StreamItem;

    @Input()
    get input(): StreamItem {
        return this._input;
    }

    set input(value: StreamItem) {
        this._input = value;
    }

    private _complete: boolean = false;

    get complete(): boolean {
        return this._complete;
    }

    completed() {
        if (this.state === 'active') {
            this._complete = true;
            this.completedTransiton.emit(this.input);
        }
    }

}
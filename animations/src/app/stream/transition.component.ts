import {Component, EventEmitter, Input, Output} from "@angular/core";
import './transition.component.htm'
import {animate, state, style, transition, trigger} from "@angular/animations";

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

    private _input: any;
    private _complete: boolean = false;


    get complete(): boolean {
        return this._complete;
    }

    @Input()
    get input(): any {
        return this._input;
    }

    set input(value: any) {
        this._input = value;
    }

    @Output()
    private completedTransiton: EventEmitter<any> = new EventEmitter<any>();


    completed() {
        if (this.state === 'active')
            this._complete = true;
    }

}
import {Component} from "@angular/core";
import './source.component.htm'
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'stream-source',
    template: require('./source.component.htm'),
    animations: [
        trigger('streamSourceState', [
            state('inactive', style({
                backgroundColor: '#eee',
                transform: 'translateX(0%)'
            })),
            state('active',   style({
                backgroundColor: '#cfd8dc',
                transform: 'translateX(100%)'
            })),
            transition('inactive => active', animate('500ms ease-in')),
            transition('active => inactive', animate('500ms ease-out'))
        ])
    ]
})
export class SourceComponent {

    state: String = 'inactive';

    toggleState(){
        this.state = this.state === 'inactive' ? 'active': 'inactive';
    }

}
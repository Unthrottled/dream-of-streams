import {Component} from "@angular/core";
import './source.component.htm'
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'stream-source',
    template: require('./source.component.htm'),
    animations: [
        trigger('streamSourceState', [
            state('active', style({
                backgroundColor: '#cfd8dc',
                transform: 'translateX(100%)'
            })),
            transition('* => active', animate('1s ease-in'))
        ])
    ]
})
export class SourceComponent {

    state: String = 'inactive';

    toggleState() {
        this.state = this.state === 'inactive' ? 'active' : 'inactive';
    }


    complete() {
        if (this.state === 'active')
            console.log('something something, complete');
    }

}
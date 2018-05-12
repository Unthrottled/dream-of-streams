import {Component} from "@angular/core";
import './source.component.htm'

@Component({
    selector: 'stream-source',
    template: require('./source.component.htm'),
    animations: []
})
export class SourceComponent {

    private streamItems: any[] = [];

    toggleState() {
        this.streamItems.push({
            ayy: 'lmao'
        })
    }

    complete() {
    }

}
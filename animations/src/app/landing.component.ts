import {Component} from "@angular/core";
import "./landing.component.htm";
import {ImageUtility} from "./utilities/ImageUtility";

@Component({
    selector: 'landing',
    template: require('./landing.component.htm')
})
export class LandingComponent {

    bueller = ImageUtility.bueller;

}

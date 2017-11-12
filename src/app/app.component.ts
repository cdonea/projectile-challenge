import {
    Component,
    OnInit,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    public clickCoord: any;

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        
    }
    showProjectile(e: MouseEvent) {
        console.log(e.x, e.y);
        this.clickCoord = { x: e.clientX, y: e.clientY };
    }
}


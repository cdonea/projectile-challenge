import { 
    Component, 
    OnInit, 
    Renderer2, 
    ElementRef,
    ChangeDetectorRef 
} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    renderer: Renderer2;
    changeDetector: ChangeDetectorRef;

    constructor(
        private elementRef: ElementRef, 
        renderer: Renderer2,
        changeDetector: ChangeDetectorRef
    ) { 
        this.renderer = renderer;
        this.changeDetector = changeDetector;
    }

    ngOnInit() {
        
    }

    showProjectile() {
        this.createNewProjectile();
    }

    private createNewProjectile() {
        let trajectory = this.generateRandomTrajectory();// eg: 'M0 160 Q 90 -40 180 150';
        
        // let randomID = this.getRandomNumber(30);
        // this.createNewSVG(randomID, trajectory);

        let flightPath = this.renderer.selectRootElement('.projectile-path');
        this.renderer.setAttribute(flightPath, 'd', trajectory);
        this.renderer.setStyle(flightPath, 'animation', 'draw 5s infinite linear');
        
        
    }

    private generateRandomTrajectory(): string {
        let startPointX, startPointY, 
            endPointX, endPointY,
            controlPointX, controlPointY;

        startPointX = 0; //always left corner bottom
        startPointY = endPointY = this.getRandomNumber(500);

        controlPointX = this.getRandomNumber(250);
        controlPointY = this.getRandomNumber(200);

        endPointX = this.getRandomNumber(250);
        
        // eg: 'M0 160 Q 90 -40 180 150'
        return 'M' + startPointX + ' ' + startPointY + 
               ' Q ' + controlPointX + ' -' + controlPointY +
               ' ' + endPointX + ' ' + endPointY; 
    }

    /* Adding SVGs dinamically is not applining the animation :( */
    private createNewSVG(randomID: number, trajectory: string) {
        let svgNS = 'http://www.w3.org/';

        let svgRoot = this.renderer.createElement('svg');//document.createElementNS(svgNS, 'svg');
        this.renderer.setAttribute(svgRoot, 'id', 'projectile-' + randomID);
        this.renderer.selectRootElement('.container').appendChild(svgRoot);
        
        this.renderer.setAttribute(svgRoot, 'xmlns', svgNS + '2000/svg');
        this.renderer.setAttribute(svgRoot, 'xmlns:xlink', svgNS + '2000/xlink');

        let flightPath = this.renderer.createElement('path');
        this.renderer.setAttribute(flightPath, 'class', 'projectile-path');
        // this.renderer.setAttribute(flightPath, 'd', trajectory);
        this.renderer.selectRootElement('#projectile-' + randomID).appendChild(flightPath);
    }

    private getRandomNumber(limit: number): number {
        return Math.floor(Math.random() * limit + 1);
    }
}


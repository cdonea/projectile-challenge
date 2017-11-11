import { Injectable, Renderer2 } from '@angular/core';
// import { CurveSize, QuadricCoordinates, Point } from './projectile.d';
interface CurveSize {
    width: number;
    height: number;
}
interface QuadricCoordinates {
    '0': number
    '1': number
    '2': number
}
interface Point {
    x: number;
    y: number;
}

@Injectable()
export class ProjectileService {
    private renderer: Renderer2;
    
    constructor(
        renderer: Renderer2
    ) {
        this.renderer = renderer;
    }

    generateNewProjectile() {
        const x = this.generateQPointsX();
        const y = this.generateQPointsY();
        const xyCoord: Point[] = this.generateXYCoordinates(x, y);
        this.moveBallOnCoordinates(xyCoord);
    
        this.createNewProjectile(x, y);
    }

    showProjectile() {
        const x = this.generateQPointsX();
        const y = this.generateQPointsY();
        const xyCoord: Point[] = this.generateXYCoordinates(x, y);
        // this.moveBallOnCoordinates();

    }

    private createNewProjectile(x: QuadricCoordinates, y: QuadricCoordinates) {
        let trajectory = this.generateRandomTrajectory(x, y);// eg: 'M0 160 Q 90 -40 180 150';

        let randomID = this.getRandomNumber(30);
        // this.createNewSVG(randomID, trajectory, { height: height, width: 2 * width });
        
        let projectilePath = this.renderer.selectRootElement('.projectile-path');
        this.renderer.setAttribute(projectilePath, 'd', trajectory);
        this.renderer.setStyle(projectilePath, 'animation', 'draw 5s infinite linear');
    }

    private generateRandomTrajectory(x: QuadricCoordinates, y: QuadricCoordinates): string {
        // eg: 'M0 160 Q 90 -40 180 150'
        return 'M' + x['0'] + ' ' + y['0'] +
            ' Q ' + x['1'] + ' -' + y['1'] +
            ' ' + x['2'] + ' ' + y['2'];
    }

    /* Adding SVGs dinamically is not applining the animation :( */
    private createNewSVG(randomID: number, trajectory: string, size: CurveSize) {
        let svgNS = 'http://www.w3.org/';

        let svgRoot = this.renderer.createElement('svg');//document.createElementNS(svgNS, 'svg');
        this.renderer.setAttribute(svgRoot, 'id', 'projectile-' + randomID);
        this.setSVGSize('projectile-' + randomID, size);
        this.renderer.selectRootElement('.container').appendChild(svgRoot);

        this.renderer.setAttribute(svgRoot, 'xmlns', svgNS + '2000/svg');
        this.renderer.setAttribute(svgRoot, 'xmlns:xlink', svgNS + '2000/xlink');

        let flightPath = this.renderer.createElement('path');
        this.renderer.setAttribute(flightPath, 'class', 'projectile-path');
        // this.renderer.setAttribute(flightPath, 'd', trajectory);
        this.renderer.selectRootElement('#projectile-' + randomID).appendChild(flightPath);
    }

    private setSVGSize(id: string, size: CurveSize) {   
        let svgRoot = this.renderer.selectRootElement('#' + id);
        this.renderer.setAttribute(svgRoot, 'height', size.height.toString());
        this.renderer.setAttribute(svgRoot, 'width', size.width.toString());
    }
    private getRandomNumber(limit: number): number {
        return Math.floor(Math.random() * limit + 1);
    }

    private computeCoordonate(t: number, coordonate: QuadricCoordinates): number {
        return (1 - t) * 2 * coordonate['0'] + 2 * t * (1 - t) * coordonate['1'] + t * 2 * coordonate['2'];
    }

    private generateQPointsX(): QuadricCoordinates {
        let startPointX = 0; //always left corner bottom
        let endPointX = 94//this.getRandomNumber(250);
        let controlPointX = (startPointX + endPointX) / 2;

        return {
            '0': startPointX,
            '1': controlPointX,
            '2': endPointX
        }
    }
    private generateQPointsY() {
        let startPointY,
            endPointY,
            controlPointY;

        
        startPointY = endPointY = 270//this.getRandomNumber(500);
        controlPointY = 123//this.getRandomNumber(500);

        return {
            '0': startPointY,
            '1': controlPointY,
            '2': endPointY
        }
    }
    private generateXYCoordinates(x: QuadricCoordinates, y: QuadricCoordinates): Point[] {
        let points: Point[] = [];
        Object.keys(x).map((prop, val, index) => {
            points.push({x: x[prop], y: y[prop]})
        });
        return points;
    }
    private generatePoints(coordinate: QuadricCoordinates): number[] {
        let animationSteps: number[] = [];
        animationSteps.push(this.computeCoordonate(0.25, coordinate));
        animationSteps.push(this.computeCoordonate(0.5, coordinate));
        animationSteps.push(this.computeCoordonate(0.75, coordinate));
        animationSteps.push(this.computeCoordonate(1, coordinate));

        return animationSteps
    }

    private moveBallOnCoordinates(coordinates: Point[]) {
        let ball = this.renderer.selectRootElement('.ball');
        
        let animation = this.generateKeyframes(coordinates);
        
        this.renderer.setStyle(ball, 'animation', 'bounce 2.5s infinite linear;'); 
    }

    private generateKeyframes(coordinates: Point[]) {
        return  `@keyframes curvedLine {
            0% {
              transform: translate(0px, 0px);   
            }
          
            25% {
              transform: translate(${coordinates[0].x}, ${coordinates[0].y});  
            }
            50% {
              transform: translate(${coordinates[1].x}, ${coordinates[1].y});
            }
            75% {
              transform: translate(${coordinates[2].x}, ${coordinates[2].y});
            }
            100% {
              transform: translate(${coordinates[0].x}, ${coordinates[0].y});
            }
          }`
    }
}
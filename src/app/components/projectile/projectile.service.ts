import { Injectable, Renderer2, ChangeDetectorRef } from '@angular/core';
import { CurveSize, Point } from './projectile.d';

@Injectable()
export class ProjectileService {

    private controlX: number;
    private controlY: number;

    constructor(
        private renderer: Renderer2,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    generateNewProjectile() {

        this.controlX = this.getRandomNumber(100, 50);
        this.controlY = this.getRandomNumber(200, 100);
        this.createNewProjectile(this.controlX, this.controlY);

        // let bouncePath = this.renderer.selectRootElement('#bouncePath');
        // this.renderer.setAttribute(bouncePath, 'd', 'M' + 2 * this.controlX + '0 Q 94 ' + this.controlY + ' 94 ' + this.controlY);
    }

    private createNewProjectile(x: number, y: number) {
        let trajectory = this.generateRandomTrajectory(x, y);// eg: 'M0 160 Q 90 -40 180 150';

        let randomID = this.getRandomNumber(30);
        // this.createNewSVG(randomID, trajectory, { height: height, width: 2 * width });

        let projectilePath = this.renderer.selectRootElement('.projectile-path');
        this.renderer.setAttribute(projectilePath, 'd', trajectory);
        this.renderer.setStyle(projectilePath, 'animation', 'draw 5s infinite linear');
    }

    private generateRandomTrajectory(xControl: number, y: number): string {
        // eg: 'M0 160 Q 90 -40 180 150'
        return 'M 0' + ' ' + y + ' Q ' + xControl + ' -' + y + ' ' + 2 * xControl + ' ' + y;
    }

    /* Adding SVGs dinamically is not applining the animation :( */
    private createNewSVG(randomID: number, trajectory: string, size: CurveSize) {
        this.configSvg(randomID, size);
        this.createSVGPath(randomID);
    }

    private configSvg(randomID: number, size: CurveSize) {
        let svgNS = 'http://www.w3.org/';
        
        let svgRoot = this.renderer.createElement('svg');//document.createElementNS(svgNS, 'svg');
        //configure svg
        this.renderer.setAttribute(svgRoot, 'id', 'projectile-' + randomID);
        this.setSVGSize('projectile-' + randomID, size);
        this.renderer.setAttribute(svgRoot, 'xmlns', svgNS + '2000/svg');
        this.renderer.setAttribute(svgRoot, 'xmlns:xlink', svgNS + '2000/xlink');

        this.renderer.selectRootElement('.container').appendChild(svgRoot);
    }

    private createSVGPath(randomID: number) {
        // create svg path
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

    private getRandomNumber(max: number, min?: number): number {
        if (min) {
            return Math.floor(Math.random() * (max - min) + min + 100);
        }
        return Math.floor(Math.random() * max + 1);
    }

}
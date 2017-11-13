import { Component, OnInit, Input } from '@angular/core';
import { trigger, state,style } from '@angular/animations';
import { ProjectileService } from './projectile.service';
import { Point } from './projectile.d';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'projectile',
  templateUrl: './projectile.component.html',
  styleUrls: ['./projectile.component.css'],
  providers: [ProjectileService],
  // animations: [
  //   trigger('bounce', [
  //     state('start', style({
  //       'animation-name': 'draw',
  //       'animation-duration': '5s',
  //       'animation-fill-mode': 'forwards', 
  //       'animation-iteration-count': '1', 
  //       'animation-timing-function': 'linear',
  //     }))
  //   ]) 
  // ]
})

export class ProjectileComponent implements OnInit {
  public animationTime: number;
  public windowHeight = 0;

  @Input() 
  startPoint: Point = { x: 0, y:0};

  constructor(private projectileSrv: ProjectileService) { }

  ngAfterContentInit() {
    this.windowHeight = window.screen.height;
  }

  ngOnInit() {
    this.projectileSrv.generateNewProjectile();
  }
}
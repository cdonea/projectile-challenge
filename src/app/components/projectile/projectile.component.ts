import { Component, OnInit } from '@angular/core';
import { ProjectileService } from './projectile.service';

@Component({
  selector: 'projectile',
  templateUrl: './projectile.component.html',
  styleUrls: ['./projectile.component.css'],
  providers: [ProjectileService]
})

export class ProjectileComponent implements OnInit {
  public animationTime: number;
  public quadricPoints: any;

  constructor(private projectileSrv: ProjectileService) { }

  ngOnInit() {
    this.projectileSrv.generateNewProjectile();
  }

}
import { Component, OnInit } from '@angular/core';
import { ProjectileService } from './projectile.service';

@Component({
  selector: 'projectile',
  templateUrl: './projectile.component.html',
  styleUrls: ['./projectile.component.css'],
  providers: [ProjectileService]
})
export class ProjectileComponent implements OnInit {
  private projectileSrv: ProjectileService;
  
  public animationTime: number;
  public quadricPoints: 
  
  constructor(projectileSrv: ProjectileService) {
    this.projectileSrv = projectileSrv;
  }

  ngOnInit(){
    this.projectileSrv.generateNewProjectile();
  }

}
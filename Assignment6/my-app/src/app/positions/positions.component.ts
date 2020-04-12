import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from '../data/Position';
import {PositionService } from '../position.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {

  positions: Position[] = [];
  getPositionsSub: any;
  constructor(private ps: PositionService, private router: Router) { }

  ngOnInit() {
    this.getPositionsSub = this.ps.getPositions()
    .subscribe(
      positions => this.positions = positions,
      function(e) { this.loadingError = true; }
    );
  }

  routePosition(id: string) {
    this.router.navigate(['/position/', id]);
  }

  ngOnDestroy() {
    if (this.getPositionsSub !== 'undefined') {
      this.getPositionsSub.unsubscribe();
    }
  }

}

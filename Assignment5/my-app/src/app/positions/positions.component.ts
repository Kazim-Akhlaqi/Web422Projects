import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from '../data/Position';
import {PositionService } from '../position.service';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positions: Position[] = [];
  getPositionsSub: any;
  constructor(private ps: PositionService) { }

  ngOnInit() {
    this.ps.getPositions().subscribe((data) => {
      this.positions = data;
    });
  }
  /*
  ngOnDestroy() {
    this.getPositionsSub.unsubscribe();
  }
  */
}

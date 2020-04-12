import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../position.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage = false;
  failMessage = false;

  constructor(
    private positionService: PositionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.positionSubscription = this.positionService
        .getPosition(params._id)
        .subscribe(pos => {
          this.position = pos[0];
        });
    });
  }

  onSubmit() {
    this.savePositionSubscription = this.positionService
      .savePosition(this.position)
      .subscribe(
        () => {
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
          }, 2500);
        },
        () => {
          this.failMessage = true;
          setTimeout(() => {
            this.failMessage = false;
          }, 2500);
        }
      );
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
    if (this.savePositionSubscription) {
      this.savePositionSubscription.unsubscribe();
    }
  }
}

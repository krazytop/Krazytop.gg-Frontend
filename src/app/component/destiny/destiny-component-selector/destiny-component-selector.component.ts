import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'destiny-component-selector',
  templateUrl: './destiny-component-selector.component.html',
  styleUrls: ['./destiny-component-selector.component.css']
})
export class DestinyComponentSelectorComponent implements OnInit {

  static vendors: string = 'vendors';
  static collections: string = 'collections';
  static badges: string = 'badges';
  static titles: string = 'titles';
  static characters: string = 'characters';
  static catalysts: string = 'catalysts';
  static models: string = 'models';

  actualComponent!: string;

  protected platform!: string;
  protected membership!: string;
  protected character!: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actualComponent = params['component'];
      this.platform = params['platform'];
      this.membership = params['membership'];
      this.character = params['character'];
    });
  }

  protected readonly DestinyComponentSelectorComponent = DestinyComponentSelectorComponent;

}

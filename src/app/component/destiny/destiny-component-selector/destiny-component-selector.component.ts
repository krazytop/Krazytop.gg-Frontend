import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'destiny-component-selector',
  templateUrl: './destiny-component-selector.component.html',
  styleUrls: ['./destiny-component-selector.component.css']
})
export class DestinyComponentSelectorComponent implements OnInit {

  static vendors: string = 'vendors';
  static collections: string = 'collections';

  actualComponent!: string;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actualComponent = params['component'];
    });
  }

  selectComponent(component: string) {
    this.route.params.subscribe(params => {
      this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${params['character']}/${component}`]);
    });
  }

  protected readonly DestinyComponentSelectorComponent = DestinyComponentSelectorComponent;

}

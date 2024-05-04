import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BungieAuthService} from "./bungie-auth.service";

@Component({
  selector: 'bungie-auth',
  templateUrl: './bungie-auth.component.html',
  styleUrls: ['./bungie-auth.component.css']
})
export class BungieAuthComponent implements OnInit {

  constructor(private route: ActivatedRoute, public destinyAuthService: BungieAuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const code = this.route.snapshot.queryParamMap.get('code');
      if (code === null) {
        console.log("failed get player code")
      } else {
        this.destinyAuthService.getCurrentUserMembershipsWithCode(code);
      }
    });
  }

}

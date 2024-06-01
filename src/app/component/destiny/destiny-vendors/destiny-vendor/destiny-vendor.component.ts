import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';
import {DestinyVendorModel} from "../../../../model/destiny/destiny-vendor.model";
import {DestinyComponent} from "../../destiny.component";
import ColorThief from 'colorthief'

@Component({
  selector: 'destiny-vendor',
  templateUrl: './destiny-vendor.component.html',
  styleUrls: ['./destiny-vendor.component.css']
})
export class DestinyVendorComponent implements OnChanges, AfterViewInit {

  @Input() vendor!: DestinyVendorModel;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  totalXP: number = 0;
  vendorColor: string | undefined;

  ngOnChanges(): void {
    this.setXP();
  }

  ngAfterViewInit() {
    this.setVendorColor();
  }

  setXP() {
    if(this.vendor.progression.levelCap != -1) {
      const steps = this.vendor.progression.progressionNomenclature!.steps;
      let totalXP: number = 0;
      for(let step of steps) {
        totalXP += step.progressTotal;
      }
      this.totalXP = totalXP;
    }
  }

  setVendorColor(): void {
    const img: HTMLImageElement = document.getElementById(String(this.vendor.vendorHash)) as HTMLImageElement;
    img.crossOrigin = "Anonymous";
    if (img.complete) {
      this.extractColor(img);
      this.changeDetectorRef.detectChanges();
    } else {
      img.addEventListener('load', () => {
        this.extractColor(img);
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  extractColor(img: HTMLImageElement): void {
    if (this.vendorColor === undefined) {
      const vendorColorRGB: number[] = new ColorThief().getPalette(img, 10)[1];
      this.vendorColor = '#' + vendorColorRGB.map(value => value.toString(16).padStart(2, '0')).join('');
    }
  }


  protected readonly DestinyComponent = DestinyComponent;
  protected readonly Math = Math;
}

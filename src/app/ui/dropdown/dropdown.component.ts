import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnDestroy {

  @Input() values!: string[];
  @Input() selectedValue!: string;
  @Input() imageUrl?: string;
  @Output() updateEvent = new EventEmitter<string>;

  dropdownOpen = false;

  private readonly clickListener: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.dropdownOpen = false;
      }
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectValue(value: any) {
    this.selectedValue = value;
    this.dropdownOpen = false;
    this.updateEvent.emit(this.selectedValue);
  }

  formatValue(value: string) {
    return value.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  ngOnDestroy() {
    if (this.clickListener) this.clickListener();
  }
}

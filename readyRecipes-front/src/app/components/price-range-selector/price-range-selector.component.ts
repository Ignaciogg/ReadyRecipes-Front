import {Component, Input} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'priceRangeSelector',
  templateUrl: 'price-range-selector.component.html',
  styleUrls: ['price-range-selector.component.scss'],
})

export class PriceRangeSelectorComponent {
  @Input() titulo: string = "No se ha especificado título";
  @Input() activo: boolean = false;
}
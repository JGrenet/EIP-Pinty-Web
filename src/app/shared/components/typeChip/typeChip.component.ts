import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typeChip',
  templateUrl: './typeChip.component.html',
  styleUrls: ['./typeChip.component.scss']
})

export class TypeChipComponent {
  @Input() type;
}

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-admin-table',
  templateUrl: './adminTable.component.html',
  styleUrls: ['./adminTable.component.scss']
})

export class AdminTableComponent {
  @Input() tableValues = { results: [] };
  @Input() catFiltersConfig;
  @Input() canEdit = true;
  @Input() canDelete = true;
  @Output() onEdit = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
  objectKeys = Object.keys;
  objectValues= Object.values;

  public filterBy(index: number) {
    if (this.objectValues(this.catFiltersConfig)[index][1] !== 'none') {
      this.objectValues(this.catFiltersConfig)[index][1] = this.objectValues(this.catFiltersConfig)[index][1] === 'up' ? 'down' : 'up';
      this.tableValues.results.reverse();
    } else {
      this.resetFilters();
      switch (this.objectValues(this.catFiltersConfig)[index][0]) {
        case 'alpha':
          this.tableValues.results.sort((a, b) => {
            if (this.objectValues(a)[index] !== null && this.objectValues(b)[index] != null) {
              if (this.objectValues(a)[index].toLowerCase() > this.objectValues(b)[index].toLowerCase()) {
                return 1;
              } else if (this.objectValues(a)[index].toLowerCase() < this.objectValues(b)[index].toLowerCase()) {
                return -1;
              }
            }
            return 0;
          });
          break;
        case 'hexa':
          this.tableValues.results.sort((a, b) => {
            return parseInt(this.objectValues(a)[index], 16) - parseInt(this.objectValues(b)[index], 16);
          });
          break;
        case 'num':
          this.tableValues.results.sort((a, b) => {
            return this.objectValues(a)[index] - this.objectValues(b)[index];
          });
          break;
        default:
          this.tableValues = this.objectValues(this.catFiltersConfig)[index][0](this.tableValues);
          break;
      }
      this.objectValues(this.catFiltersConfig)[index][1] = 'down';
    }
  }

  private resetFilters() {
    for (let i = 0; i < this.objectValues(this.catFiltersConfig).length; i++) {
      this.objectValues(this.catFiltersConfig)[i][1] = 'none';
    }
  }

  public editBtn(itemId: string) {
    this.onEdit.emit(itemId);
  }

  public deleteBtn(itemId: string) {
    this.onDelete.emit(itemId);
  }
}

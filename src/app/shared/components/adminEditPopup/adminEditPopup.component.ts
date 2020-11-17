import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDisplayConfigItem } from '../../../admin/feedbacks/feedbacks.component';

@Component({
  templateUrl: './adminEditPopup.component.html',
  styleUrls: ['./adminEditPopup.component.scss']
})

export class AdminEditPopupComponent implements OnInit {
  isReadyToDisplay = false;
  isEditable = false;
  @ViewChild('imgVisualizer') imgVisualizer: ElementRef;

  constructor(public dialogRef: MatDialogRef<AdminEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAdminEditPopupData, private elRef: ElementRef) {
    console.log(data.itemProps);
    console.log(data.itemDisplayConfig);
  }

  ngOnInit() {
    for (const itemRow of this.data.itemDisplayConfig) {
      if (itemRow.type === 'date') {
        this.data.itemProps[itemRow.propName] = new Date(this.data.itemProps[itemRow.propName]).toLocaleString();
      }

      /* == == */
      if (itemRow.isEditable === true) {
        this.isEditable = true;
      }
    }

    this.isReadyToDisplay = true;

    console.log(this.data.itemProps);
  }

  closePopup(shouldSentBackData: boolean) {
    console.log('avant', this.data.itemProps);
    if (shouldSentBackData) {
      console.log(this.data.itemProps);
      const elements = this.elRef.nativeElement.getElementsByClassName('propInput');
      Array.from(elements).forEach((element: HTMLInputElement) => {
        const elemPropName: string = (Array.from(element.classList)[1] as string).replace('Input', '');
        const isElemPropNameEditable: Array<any> = this.data.itemDisplayConfig.filter((dcItem) => dcItem.propName === elemPropName);
        if (isElemPropNameEditable) {
          if (element.type === 'number') {
            this.data.itemProps[elemPropName] = parseInt(element.value, 10);
          }
          this.data.itemProps[elemPropName] = element.value;
        }
      });
      console.log('après', this.data.itemProps);
      this.dialogRef.close(this.data.itemProps);
    } else {
      this.dialogRef.close(null);
    }
  }

  openImg(index: number, imgArray: string[]) {
    this.imgVisualizer.nativeElement.firstElementChild.setAttribute('src', 'http://pinty.en-f.eu/api-dev/public/media' + imgArray[index]);
    this.imgVisualizer.nativeElement.style.visibility = 'visible';
  }

  closeImg() {
    this.imgVisualizer.nativeElement.style.visibility = 'hidden';
    this.imgVisualizer.nativeElement.firstElementChild.setAttribute('src', '');
  }
}

export interface IAdminEditPopupData {
  itemProps: any;
  itemDisplayConfig: IDisplayConfigItem[];
  title: string;
}

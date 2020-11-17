import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './adminDeletePopup.component.html',
  styleUrls: ['./adminDeletePopup.component.scss']
})

export class AdminDeletePopupComponent {

  constructor(public dialogRef: MatDialogRef<AdminDeletePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: IAdminDeletePopupData) {

  }

  closePopup(action: boolean) {
    this.dialogRef.close(action);
  }
}

interface IAdminDeletePopupData {
    confirmPhrase: string;
}

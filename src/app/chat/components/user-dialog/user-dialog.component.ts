import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {
  /**
   *Creates an instance of UserDialogComponent.
   * @param {MatDialogRef<UserDialogComponent>} dialogRef
   * @param {*} data
   * @memberof UserDialogComponent
   */
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   *
   *
   * @memberof UserDialogComponent
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}

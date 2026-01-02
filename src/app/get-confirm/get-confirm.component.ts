import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent implements OnInit {

  constructor(
    private _matDilogref: MatDialogRef<GetConfirmComponent>
    // class ka instance yani object
  ) { }

  ngOnInit(): void {
  }

  onClose(flag: boolean) {
    this._matDilogref.close(flag)
  }
}

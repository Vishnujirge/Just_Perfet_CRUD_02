import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istd } from '../models/std';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  stdArr: Array<Istd> = [
    // students: Student[] = [
    {
      stdId: 1,
      fname: 'Vishnu',
      lname: 'Jirge',
      email: 'VJ@gmail.com',
      contact: '9876543210',
    },

    {
      stdId: 2,
      fname: 'Rameshwar',
      lname: 'Ramle',
      email: 'RM@gmail.com',
      contact: '9123456789',
    },
    {
      stdId: 3,
      fname: 'Gajanan',
      lname: 'Kadam',
      email: 'GM@gmail.com',
      contact: '9123456789',
    },
    {
      stdId: 4,
      fname: 'Laxmikant',
      lname: 'Biradar',
      email: 'LB@gmail.com',
      contact: '9012345678',
    },
    {
      stdId: 5,
      fname: 'Shubhankar',
      lname: 'Podar',
      email: 'Sp@gmail.com',
      contact: '8912345678',
    },
  ];

  @ViewChild('fname') fname !: ElementRef;
  @ViewChild('lname') lname !: ElementRef;
  @ViewChild('email') email !: ElementRef;
  @ViewChild('contact') contact !: ElementRef;

  isInEditMode: boolean = true;

  // constructor(
  //   private _matDialog: MatDialog,
  //   private _snackBar = MatSnackBar
  //we create here instance for MatDilogBox of class
  //matDialogBox is a singleTone instance class
  //in your apk this is only one instance
  // ) { }


  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
      const random = (Math.random() * 16) | 0;
      const value = character === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };
  ngOnInit(): void { }

  onAddStd() {

    let STD_OBJ: Istd = {
      fname: this.fname.nativeElement.value,
      lname: this.lname.nativeElement.value,
      email: this.email.nativeElement.value,
      contact: this.contact.nativeElement.value,
      stdId: this.uuid()
    }

    this.fname.nativeElement.value = '';
    this.lname.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.contact.nativeElement.value = '';

    console.log(STD_OBJ);
    this.stdArr.push(STD_OBJ)


  }

  trackById(index: number, item: Istd) {
    return item.stdId;

  }

  onRmove(id: string | number) {
    // open DilogBox >> close
    // let getConfirm = confirm(`Are you sure ?`);
    // console.log(getConfirm)
    // this is old way we dont use it for now
    let matCondig = new MatDialogConfig()
    matCondig.disableClose = true;
    matCondig.width = '500px';
    let matDailogRef = this._matDialog.open(GetConfirmComponent, matCondig);

    matDailogRef.afterClosed()
      //obsevable ->afterClosed ->
      .subscribe(res => {
        // console.log(res);
        if (res) {

          let getIndex = this.stdArr.findIndex(s => s.stdId === id)
          let std = this.stdArr.splice(getIndex, 1)

          this._snackBar.open(`The Student ${std[0].fname} ${std[0].lname} Whith ID ${id} Is Removed Successfully !!!`, `Close`, {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 2500
          })

        }
      })
  }
}

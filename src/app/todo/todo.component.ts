const cl = console.log;

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Itodo } from '../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoArr: Array<Itodo> = [
    {
      todoItem: 'JS',
      todoId: '100',
    },
    {
      todoItem: 'TS',
      todoId: '101',
    },
    {
      todoItem: 'Angular',
      todoId: '102',
    },
  ];
  isInEdidMode: boolean = false;
  edit_id!: string;

  @ViewChild('todoItem') todoItem!: ElementRef;
  // private _snackbar = new MatSnackBar() -> old way to create instance
  constructor(private _snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  onTodoAdd() {
    if (this.todoItem.nativeElement.value.length > 0) {
      //get todo Obj
      let todoObj: Itodo = {
        todoItem: this.todoItem.nativeElement.value,
        todoId: Date.now().toString(),
      };

      this.todoItem.nativeElement.value = '';
      console.log(todoObj);
      //push arr
      this.todoArr.push(todoObj);
      this._snackbar.open(
        `The Todo With Id ${todoObj.todoId} Is Creaded Successfully`,
        'Close',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        }
      );
      //create new li
    }
  }

  trackById(index: number, todo: Itodo) {
    return todo.todoId;
  }

  onRemove(id: string) {
    cl(id);
    let getIndex = this.todoArr.findIndex((t) => t.todoId === id);

    this.todoArr.splice(getIndex, 1);
    this._snackbar.open(
      `The Todo with Id ${id} is removed Successfully`,
      'Close',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      }
    );
  }
  onEdit(todo: Itodo) {
    cl(todo);
    this.edit_id = todo.todoId;
    this.todoItem.nativeElement.value = todo.todoItem;
    this.isInEdidMode = true;
  }

  onUpdate() {
    // update_obj

    let UPDATE_TODO: Itodo = {
      todoItem: this.todoItem.nativeElement.value,
      todoId: this.edit_id,
    };

    cl(UPDATE_TODO);

    // Array me replace

    let getIndex = this.todoArr.findIndex(
      (t) => t.todoId === UPDATE_TODO.todoId
    );

    this.todoArr[getIndex] = UPDATE_TODO;
      this._snackbar.open(
        `The Todo With Id ${UPDATE_TODO.todoId} Is Updated Successfully`,
        'Close',
        {
          //confirigration
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        }
      );
    this.isInEdidMode = false;
    this.todoItem.nativeElement.value = '';
  }
}

// ChangeDetection= > in angular ChangeDetector macanizam hai
// ye apke ts me kuch change hote hi UI pe show krta hai ye kon krta hai => zone.js
//zone.js >> ChangeDetection.default
//zone.js >> ChangeDetection.onPush
//zone.js >> ChangeDetection.onPush >> is for better performance optimization
// default remove kr ke onPush add krna hai

// ChangeDetection : problem :

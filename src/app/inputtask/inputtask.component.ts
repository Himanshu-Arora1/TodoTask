import * as firebase from 'firebase/app';
// tslint:disable-next-line:no-import-side-effect
import 'firebase/database';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, observable } from 'rxjs';
// import { Observable, Observer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import uuid from 'uuid/v1';

// import { FormArray, FormControl, FormGroup, formBuiler } from '@angular/forms';
import * as allForms from '@angular/forms';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

@Component ({  // decorator
          selector: 'app-inputtask',
          templateUrl: './inputtask.component.html',
          styleUrls: ['./inputtask.component.css']
              })

export class InputtaskComponent implements OnInit, AfterViewInit {

  inputValue = '';
  filter = 'all';
  checked = false;

  showState: 'ALL'|'ACTIVE'|'COMPLETED' = 'ALL';

  taskForm: allForms.FormGroup;

  todoItems: [{
    id: number,
    value: string,
    status: 'COMPLETED' | 'ACTIVE'
  } ];

  database: any;
  @ViewChild('addtodoinput') addTodoInput: ElementRef;
  config = {
    apiKey: 'AIzaSyBvtO9p8F1xyA1OlXMav4APYjIozngrje4',
    authDomain: 'todo-cdb7a.firebaseapp.com',
    databaseURL: 'https://todo-cdb7a.firebaseio.com',
    storageBucket: 'todo-cdb7a.appspot.com'
  };

  ngOnInit(): any {

    firebase.initializeApp(this.config);
    this.database = firebase.database();

    const serverTask = this.database.ref('todos/all');

    serverTask.on('value', (snapshot: any) => {
        this.todoItems = snapshot.val() || [];

        if (this.allTodos.value.length === 0) {
          this.todoItems.forEach(item => {
            this.allTodos.push(this.fb.control(item));
            // this.allTodos.push(this.fb.control(this.todoItems[i]));
          }); }
    });

    // serverTask.on('value', function(snapshot){
    //    this.todoItems = snapshot.val() || [];
    //    console.log('abc', this.todoItems);

    //    if (this.allTodos.value.length === 0) {
    //         console.log(' enter read mode ');
    //       this.todoItems.forEach(item => {
    //         this.allTodos.push(this.fb.control(item));
    //         // this.allTodos.push(this.fb.control(this.todoItems[i]));
    //       }); }
    //    console.log('snap', this.allTodos);
    // }.bind(this));

    // Form control Declaration
    this.taskForm = this.fb.group({
      taskName: [''],
      test: [''],
      allTodos: this.fb.array([{
        // this.fb.control('this.taskName.value')
      }])
    });
    this.allTodos.removeAt(0);
  }

  ngAfterViewInit(): any   {
    // const self = this;
    fromEvent(this.addTodoInput.nativeElement, 'keyup')
    .pipe(filter(() => this.taskName.value !== null && this.taskName.value !== ''),
      filter((e: KeyboardEvent) => e.key === 'Enter'),
      map(() => this.taskName.value)
    )
    .subscribe((taskValue: string) => {
      if (this.todoItems === undefined) {
        this.todoItems = [{ id: uuid(), value: taskValue, status: 'ACTIVE' }];
      } else {
        this.todoItems.push({ id: uuid(), value: taskValue, status: 'ACTIVE' });
      }
      const i = this.todoItems.length - 1;
      this.addAllTodos(i);
    });
  }

  addAllTodos(i: number): any {
    // this.allTodos.push(this.fb.control(this.todoItems[i]));
    this.allTodos.push(this.fb.control(this.todoItems[i]));
    this.taskName.reset();

    this.writeUserData();
  }

  writeUserData(): any {
    const value = this.allTodos.value;
    const completeHandler = (a: Error) => {
      if (a !== null && a !== undefined) {
      } else {
        console.log('Successfully added new item');
      }
    };
    firebase.database()
    .ref('todos/all')
    .set(value, completeHandler);
  }

  constructor(private fb: allForms.FormBuilder) {
  }

  onDelete(i: number): any {
    this.allTodos.removeAt(i);
  }

  onCheck(id: number): any {
     const filteredItems =  this.todoItems.filter(todoItem => {
          return  todoItem.id === id;
      });

  // tslint:disable-next-line:align
  filteredItems.forEach(filteredItem => {
      filteredItem.status === 'ACTIVE' ? filteredItem.status = 'COMPLETED' : filteredItem.status = 'ACTIVE';
  });

  // if (filteredItem.status === 'ACTIVE') {
  //   //     filteredItem.status = 'COMPLETED';
  //   //       } else {
  //   //     filteredItem.status = 'ACTIVE';
  //   //   }

  }

  get allTodos(): allForms.FormArray {
    return this.taskForm.get('allTodos') as allForms.FormArray;
  }

  get taskName(): allForms.FormControl {
         return this.taskForm.get('taskName') as allForms.FormControl;
  }

  setShowFilter(value: any): void {
    this.showState = value;
  }
}

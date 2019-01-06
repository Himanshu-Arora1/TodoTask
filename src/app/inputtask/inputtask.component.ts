import * as firebase from 'firebase/app';
import 'firebase/database';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, observable } from 'rxjs';
import { Observable, Observer } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';

//import  uuid  from 'uuid/v1';

import uuid from 'uuid/v1';

import { FormBuilder } from '@angular/forms';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { ThrowStmt } from '@angular/compiler';


@Component({ //decorator
  selector: 'app-inputtask',
  templateUrl: './inputtask.component.html',
  styleUrls: ['./inputtask.component.css']
})

export class InputtaskComponent implements OnInit {
  inputValue = '';
  filter = "all";
  checked = false;
  i = 0;
  showState: 'ALL'|'ACTIVE'|'COMPLETED' = 'ALL';

  taskForm: FormGroup;

  todoItems: [{
    id: number,
    value: string,
    status: 'COMPLETED' | 'ACTIVE'
  }]

  @ViewChild('addtodoinput') addTodoInput: ElementRef;
  
  config = {
    apiKey: "AIzaSyBvtO9p8F1xyA1OlXMav4APYjIozngrje4",
    authDomain: "todo-cdb7a.firebaseapp.com",
    databaseURL: "https://todo-cdb7a.firebaseio.com",
    storageBucket: "todo-cdb7a.appspot.com",
  };


  ngOnInit() {
    firebase.initializeApp(this.config);
    
     this.database = firebase.database();

    var starCountRef = this.database.ref('todos/all');
    starCountRef.on('value', function (snapshot) {
      console.log('got new values from server') ;
      this.todoItems = snapshot.val() || [];
    }.bind(this));
    
    this.taskForm = this.fb.group({
      taskName: [''],
      test: [''],
      
      allTodos: this.fb.array([{
        // this.fb.control('this.taskName.value')
      }])
    }); 

    this.allTodos.removeAt(0);
    console.log('allTodossss',this.allTodos); 

    this.writeUserData();
  }

  ngAfterViewInit() {
    // this.addTodoInput.nativeElement. = "Anchovies! 🍕🍕";

    const self = this;
        
    fromEvent(this.addTodoInput.nativeElement, 'keyup').pipe(
      filter(() => self.taskName.value !== null && self.taskName.value !== ""),
      filter((e: KeyboardEvent) => e.key == 'Enter'),
      map(() => self.taskName.value)
    ).subscribe((taskValue: string) => {
      if (self.todoItems === undefined) {
        self.todoItems = [{ id: uuid(), value: taskValue, status: 'ACTIVE' }]
      } else {
        self.todoItems.push({ id:uuid(), value: taskValue, status: 'ACTIVE' });
      }
      this.addAllTodos(this.i);
      this.i++;
    });
    
  }

  
  addAllTodos(i: number) {
    // this.allTodos.push(this.fb.control(this.todoItems[i]));

    this.allTodos.push(this.fb.control(this.todoItems));
        
    this.taskName.reset();
  }

   writeUserData() {
// firebase.database().ref('todos/all').set([{
    //   id: 'abcnew',
    //   value: 'Arora',
    //   status : 'Completed'
    // }])

    this.taskForm.value.allTodos = this.allTodos;

    console.log('ar', this.taskForm.value.allTodos);
    firebase.database().ref('todos/all').set(this.taskForm.value.allTodos);
  }

   database: any;

  constructor(private fb: FormBuilder) {
  }

  onDelete(i: number){
    
    this.allTodos.removeAt(i);
  }

  onCheck(id){

     var filteredItems =  this.todoItems.filter((todoItem)=> {
          return  todoItem.id == id;
      })

      filteredItems.forEach((filteredItem)=>{

        if(filteredItem.status=='COMPLETED'){
          filteredItem.status='ACTIVE';
        }else{
          filteredItem.status='COMPLETED';
        }    
      })
  }

  get allTodos() {
    return this.taskForm.get('allTodos') as FormArray;
  }

  get taskName() {
    return this.taskForm.get('taskName') as FormControl;
  }

  setShowFilter(value: any) { 
    this.showState = value;
 }
}
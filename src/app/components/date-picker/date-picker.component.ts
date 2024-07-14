// date-picker.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  defaultDate: string;
  constructor() {
    const today = new Date();
    this.defaultDate = today.toISOString().split('T')[0];
    }
    
  ngOnInit(): void {
  }
}

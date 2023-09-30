import { Component } from '@angular/core';
import studentsData from '../../students.json';

interface Student {
  id: Number;
  name: String;
  email: String;
  gender: String;
}

@Component({
  selector: 'app-manipulando-json',
  templateUrl: './manipulando-json.component.html',
  styleUrls: ['./manipulando-json.component.css']
})
export class ManipulandoJsonComponent {
  students: Student[] = studentsData;

  ngOnInit(): void {
    console.log(this.students)
  }
}
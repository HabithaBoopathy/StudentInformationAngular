import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rank } from '../models/rank';
import { Student } from '../models/student';
import { RankService } from '../services/rank.service';
import { StudentService } from '../services/student.service';
import { SectionService } from '../services/section.service';
import { Section } from '../models/section';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  title = 'Student';
  student:Student;
  students:Student[];
  ranks:Rank[];
  sections:Section[];
  selectedRank: any;
  

  

  constructor(            //initialize class members                                                                        
    private httpClient: HttpClient,
    private studentService: StudentService,
    private rankService: RankService,
    private sectionService: SectionService,
    private router: Router
  

  )
  
  {
    this.student = new Student();
    
    this.students = [];  
    this.ranks = [];
    this.sections= [];
    
                                          
  }  
                           
  ngOnInit(): void {
    
        this.fetchStudent();
        this.fetchRank();
        this.fetchSection();
}
selectChangeHandler (event: any){
  this.selectedRank = event.target.value;
}
reloadData() {
  this.student = new Student();
  this.fetchStudent();
  this.fetchRank();
  this.fetchSection();
  
  
}
fetchRank() {
  this.rankService.getRank().subscribe(
  (data) => {
    this.ranks = data;
  },
  (err) => {
    console.log(err);
  }
);  
}
fetchSection() {
  this.sectionService.getSection().subscribe(
  (data) => {
    this.sections = data;
  },
  (err) => {
    console.log(err);
  }
);  
}
fetchStudent() {
    this.studentService.getStudent().subscribe(
    (data) => {
      this.students = data;
    },
    (err) => {
      console.log(err);
    }
  );  
  }
validateStudentData(): boolean {
  let flag = false;
  if (this.student.studentName == '') {
    alert('Please enter name');
  } 
   else {
    flag = true;
  }
  return flag;
}
validateRankData(): void{

}
onRegister() {
  if (this.validateStudentData()) {
    //asynchronous vs synchronous programming
      this.studentService.createStudent(this.student).subscribe(//check the change
      (data) => {
        if (data) { 
          console.log('Checkpoint 3');
          //reload data since new record has been added
          this.reloadData();
          alert('User registered successfully')
        } 
        else
        alert(
          ' already exists'
        ); 
        },
      
      (err) => {
        console.log(err);
      }
    );
    
    console.log('Checkpoint 2');
    
  }
}
onUpdate() {
  if (this.validateStudentData()) {
    this.studentService.updateStudent(this.student).subscribe(
      (data) => {
        if (data) {
          this.reloadData();
        } else {
          alert(
            'Error while updating. Please look onto the backend logs'
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

onDelete(id: string) {
    this.studentService.deleteStudent(id).subscribe(
    (data) => {
      if (data) {
        this.reloadData();
      } else {
        alert(
          'Error while deleting. Please look onto the backend logs'
        );
      }
    },
    (err) => {
      console.log(err);
    }
  ); 
}

  }


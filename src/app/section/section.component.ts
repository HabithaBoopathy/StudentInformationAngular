import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '../models/section';
import { SectionService } from '../services/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  title = 'Section';
  section:Section;
  sections:Section[];

  constructor(            //initialize class members                                                                        
    private httpClient: HttpClient,
    private sectionService: SectionService,
    private router: Router

  ){
    this.section = new Section();
    this.sections = [];                                                
  }  
                           
  ngOnInit(): void {
    
    this.fetchSection();
    
}
reloadData() {
  this.section = new Section();
  this.fetchSection();
  
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
validateSectionData(): boolean {
  let flag = false;
  if (this.section.studentSection == '') {
    alert('Please enter ID');
  } 
   
   else {
    flag = true;
  }
  return flag;
}
onClick() {
  if (this.validateSectionData()) {
    //asynchronous vs synchronous programming
      this.sectionService.createSection(this.section).subscribe(//check the change
      (data) => {
        if (data) { 
          console.log('Checkpoint 3');
          //reload data since new record has been added
          this.reloadData();
          alert('success')
          
        } 
      },
      error => console.log(error));
    }
      }
      saveSection(){
        this.sectionService.createSection(this.section).subscribe( data =>{
          console.log(data);
          this.goToStudent();
        },
        error => console.log(error));
      }
      goToStudent(){
        this.router.navigate(['/student']);
      }
      onSubmit(){
        console.log(this.section);
        this.saveSection();
      }
    }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rank } from '../models/rank';
import { RankService } from '../services/rank.service';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/section';
import { SectionService } from '../services/section.service';
@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  title = 'Rank';
  rank:Rank;
  ranks:Rank[];
  section:Section;
  sections:Section[];

  constructor(            //initialize class members                                                                        
    private httpClient: HttpClient,
    private rankService: RankService,
    private router: Router,
    private sectionService: SectionService,
  ){
    this.rank = new Rank();
    this.ranks = []; 
    this.section = new Section();
    this.sections = [];                                                
  }  
                           
  ngOnInit(): void {
    
    this.fetchRank();
    this.fetchSection();
}
reloadData() {
  this.rank = new Rank();
  this.fetchRank();
  this.section = new Section();
    this.sections = []; 
  
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
validateRankData(): boolean {
  let flag = false;
  if (this.rank.studentRank == '') {
    alert('Please enter ID');
  } 
   
   else {
    flag = true;
  }
  return flag;
}
onClick() {
  if (this.validateRankData()) {
    //asynchronous vs synchronous programming
      this.rankService.createRank(this.rank).subscribe(//check the change
      (data) => {
        if (data) { 
          console.log('Checkpoint 3');
          //reload data since new record has been added
          this.reloadData();
          alert('User registered successfully')
          
        } 
      },
      error => console.log(error));
    }
      }
      saveRank(){
        this.rankService.createRank(this.rank).subscribe( data =>{
          console.log(data);
          this.goToStudent();
        },
        error => console.log(error));
      }
      goToStudent(){
        this.router.navigate(['/student']);
      }
      onSubmit(){
        console.log(this.rank);
        this.saveRank();
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
    onSection() {
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
          
          }
        
    

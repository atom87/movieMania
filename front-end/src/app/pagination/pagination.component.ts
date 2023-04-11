import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'mm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() activePage: number;
  @Input() totalItems: number;
  @Output() onPageChange = new EventEmitter();

 pageSize: number = 6;
 numOfPages : number;
  

  constructor() { }

  ngOnInit(){
  }

  ngOnChanges() {
    this.numOfPages = Math.ceil(this.totalItems/this.pageSize); 
  }

  pageChange(page){
    if(page>0 && page<=this.numOfPages){
	  	this.activePage = page;
	  	this.onPageChange.emit({page: this.activePage});
	  }	 
  }

}

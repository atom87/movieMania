import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mm-sort-form',
  templateUrl: './sort-form.component.html',
  styleUrls: ['./sort-form.component.css']
})
export class SortFormComponent implements OnInit {

  sort: string = "rating";
  sortDirection: string = "desc";
  @Output() onSortChange = new EventEmitter ();
  constructor() { }

  ngOnInit(): void {
  }

  changeParams(){
    this.onSortChange.emit({ sort: this.sort});
  }

  changeDirection(){
    this.sortDirection = this.sortDirection == 'asc' ? 'desc' : 'asc';
    this.onSortChange.emit({"sortDirection": this.sortDirection});
  }
}

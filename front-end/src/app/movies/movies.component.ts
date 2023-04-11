import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'mm-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  numOfMovies: number;
  movies: Movie[];

  params = {
    sort: "rating",
    sortDirection: "desc",
    page: 1,
    pageSize: 6
  }
  constructor(private service: MoviesService) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(){
 
    this.service.getMovies(this.params).subscribe( data => {
      this.numOfMovies =  data.count;
      this.movies = data.results;
    })
  }
  updateMovies(param){
    if (param) {
      this.params.sort = param.sort || this.params.sort;
  		this.params.sortDirection = param.sortDirection || this.params.sortDirection;
  		this.params.page = param.page || this.params.page;
    }
    this.getMovie();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { MovieList } from '../models/movieList';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';

const url = "http://localhost:3000/api/movies";
const urlGenre = "http://localhost:3000/api/genres";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies(params? : any) : Observable <MovieList>{
    let queryParams ={};
    if(params){
      queryParams = {
        params : new HttpParams()
        .set("sort", params.sort || "")
        .set("sortDirection", params.sortDirection || "")
        .set("page", params.page && params.page.toString() || "")
        .set("pageSize", params.pageSize && params.pageSize.toString() || "")
      }
    }
    return this.http.get(url, queryParams).pipe(map( res => {
      return new MovieList(res);
    }))
  }
  getMovie(id): Observable<Movie>{
    return this.http.get(url + "/" + id).pipe(map( res => { 
      return new Movie(res);
    }))
  }

  getGenres(): Observable<Genre[]>{
    return this.http.get<Array<Genre>>(urlGenre).pipe(map( res =>{
      let retVal: Genre[] = [];
      res.forEach(elem => retVal.push(new Genre(elem)));
      return retVal;
    }))
  }

  saveGenre(genre){
    return this.http.post(urlGenre,genre).pipe(map( res => {
      return new Genre (res);
    }))
  }

  saveMovie(movie: Movie){
    return this.http.post(url, movie).pipe(map( res => {
      return new Movie(res);
    }))
  }
}

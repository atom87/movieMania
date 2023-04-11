import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';

@Component({
  selector: 'mm-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movieForm: FormGroup;
  genres: Genre[];
  secondForm: boolean = false;
  _id: number;
  genre: string;

  constructor(private service: MoviesService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    let id: string = this.route.snapshot.paramMap.get('id');
    if(id){
      this.service.getMovie(id).subscribe( res => {
        this.movieForm.patchValue(res);
        this._id = res._id;
      })
    }
    this.service.getGenres().subscribe( res => this.genres = res); 
    this.createForm();
  }

  createForm(){
  	this.movieForm = this.fb.group({
  		name: ["", Validators.required],
  		description: ["", [Validators.required, Validators.minLength(30), Validators.maxLength(250)]],
  		year: ["", [Validators.required, Validators.min(1800), Validators.max(2019)]],
  		rating: ["", Validators.required],
  		duration: ["", Validators.required],
  		director: ["", Validators.required],
  		genre: ["", Validators.required]
  	});
  }
  saveMovie(){
  	let movie = new Movie(this.movieForm.value);
  	movie._id = this._id
  	this.service.saveMovie(movie).subscribe(res => { return this.router.navigate(['movies']) });
  }

  saveGenre(){
  	let genre = new Genre();
  	genre.name = this.genre;
  	this.service.saveGenre(genre).subscribe(res => this.genres.push(res));
  	this.secondForm = false;  	
  }

  toggleForm(){
  	this.secondForm = !this.secondForm;
  }
}

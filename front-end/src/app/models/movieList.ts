import { Movie } from './movie';

export class MovieList {
	count: number;
	results: Movie[];

	constructor(obj? :any){
		this.count = obj && obj.count || null;
		this.results = obj && obj.results.map(res => new Movie(res)) || [];
	}
}

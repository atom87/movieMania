export class Movie {
	_id: number;
	name: string;
	description: string;
	director: string;
	genre: string;
	year: number;
	rating: number;
	duration: number;

	constructor(obj? :any){
		this._id = obj && obj._id || null;
		this.name = obj && obj.name || null;
		this.description = obj && obj.description || null;
		this.director = obj && obj.director || null;
		this.genre = obj && obj.genre || null;
		this.year = obj && obj.year || null;
		this.rating = obj && obj.rating || null;
		this.duration = obj && obj.duration || null;
	}
}
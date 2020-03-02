interface IResult {
	score: number;
	count: number;
	gametype: string | null;
	options: string[] | undefined;
}
interface IResultRecord extends IResult {
	date: Date;
}
class Ranking implements IResultRecord {
	public score: number;
	public count: number;
	public gametype: string | null;
	public options: string[] | undefined
	public date: Date;
	constructor(result: IResult) {
		this.score = result.score;
		this.count = result.count;
		this.gametype = result.gametype;
		this.options = result.options
		this.date = new Date();
	}
	public toJSON(): IResultRecord {
		return {
			score: this.score,
			count: this.count,
			gametype: this.gametype,
			options: this.options,
			date: this.date
		}
	}
}

export default Ranking;
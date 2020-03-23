interface IResult {
	score: number;
	count: number;
	gametype: string | null;
	options: string[] | undefined;
}
interface IResultRecord extends IResult {
	date: Date;
}
class ResultDB{
}
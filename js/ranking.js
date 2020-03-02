class Ranking {
    constructor(result) {
        this.score = result.score;
        this.count = result.count;
        this.gametype = result.gametype;
        this.options = result.options;
        this.date = new Date();
    }
    toJSON() {
        return {
            score: this.score,
            count: this.count,
            gametype: this.gametype,
            options: this.options,
            date: this.date
        };
    }
}
export default Ranking;

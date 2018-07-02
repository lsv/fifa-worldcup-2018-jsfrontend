class ResultParser {

    public static getResult(match: any, type: string): number | null {
        return type === 'home' ? match.home_result : match.away_result;
    }

    public static getPenaltyResult(match: any, type: string): number | null {
        return type === 'home' ? match.home_penalty : match.away_penalty;
    }

}

export default ResultParser;

class ResultParser {

    public static getResult(match: any, type: string): number | null {
        return type === 'home' ? match.home_result : match.away_result;
    }

}

export default ResultParser;

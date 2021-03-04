export interface CovidApiResponseResult {
    [key: number]: number;
    [index: string]: any;
    confirmed: any;
    deaths: any;
    recovered: any;
}
export interface CovidApiResponse {
    result: CovidApiResponseResult;
}

import axios from 'axios'
import { CovidApiResponse } from '../../models/CovidApi'

export async function LoadCasesByDate(url: string, DateArray: string[]) {
    var str: number[] = [];
    for (let i = 0; i < DateArray.length; i++) {
        let response = await axios.get<CovidApiResponse>(url)
        str.push(response.data.result[DateArray[i]].confirmed);
    }
    return str;
}

export async function LoadDeathsByDate(url: string, DateArray: string[]) {
    var str: number[] = [];
    for (let i = 0; i < DateArray.length; i++) {
        let response = await axios.get<CovidApiResponse>(url)
        str.push(response.data.result[DateArray[i]].deaths);
    }
    return str;
}

export async function LoadRecoveredByDate(url: string, DateArray: string[]) {
    var str: number[] = [];
    for (let i = 0; i < DateArray.length; i++) {
        let response = await axios.get<CovidApiResponse>(url)
        str.push(response.data.result[DateArray[i]].recovered)
    }
    return str;
}

export function IncrimentalMortalityArray(darray: number[], carray: number[]): number[] {
    var retarray: number[] = [];
    var mortality: number;
    for (let i = 0; i < carray.length; i++) {
        mortality = (darray[i] / carray[i]) * 100
        retarray.push(Math.round((mortality + Number.EPSILON) * 100) / 100)
    }
    return retarray;
}
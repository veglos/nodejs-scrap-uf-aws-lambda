import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://si3.bcentral.cl/indicadoressiete/secure/IndicadoresDiarios.aspx';
const AxiosInstance = axios.create();
const cacheTimeInMinutes = 5;

let cachedUF: number = -1;
let refreshCacheTime: Date = new Date();

export async function getUF(): Promise<number> {

    try {
        if (refreshCache()) {
            const response = await AxiosInstance.get(url);
            const html = response.data;
            const uf = scrapUFValue(html);
            console.log('### fresh ###');
            cachedUF = uf;
        }

        console.log('### cached ###');
        return cachedUF;
    }
    catch (ex) {
        console.log(ex);
        return -1;
    }
}

function refreshCache(): boolean {
    if (cachedUF == -1) return true;
    return (new Date().getMinutes() - refreshCacheTime.getMinutes() > cacheTimeInMinutes);
}

function scrapUFValue(html: string): number {
    const $ = cheerio.load(html);
    const uf = $('#lblValor1_1').text();
    return ConvertToNumber(uf);
}

function ConvertToNumber(input: string) {
    const output = input.replace('.', '').replace(/,/g, '.');
    return parseFloat(output);
}
import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://si3.bcentral.cl/indicadoressiete/secure/IndicadoresDiarios.aspx';
const AxiosInstance = axios.create();

let cachedUF: number = -1;

export async function getUF(): Promise<number> {

    if (refreshCache()) {
        const response = await AxiosInstance.get(url);
        const html = response.data;
        const uf = scrapUFValue(html);
        cachedUF = uf;
        return cachedUF;
    }
    else {
        return cachedUF;
    }
}

function refreshCache(): boolean {
    return true;
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
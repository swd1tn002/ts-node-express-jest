import fetch from 'node-fetch';
import { PostalData } from './PostalData';

const JSON_URL = 'https://raw.githubusercontent.com/theikkila/postinumerot/master/postcode_map_light.json';

export class Client {

    private cache: PostalData | null = null;

    constructor() { }

    public async getPostalDistrict(postalCode: String): Promise<String | null> {
        let data = await this.fetchData();
        return data.getDistrictName(postalCode);
    }

    public async getPostalCodes(district: String): Promise<String[]> {
        let data = await this.fetchData();
        return data.getCodesForDistrict(district);
    }

    private async fetchData(): Promise<PostalData> {
        if (this.cache) {
            return this.cache;
        }

        let response = await fetch(JSON_URL);
        let json = await response.json();

        if (json instanceof Object) {
            this.cache = new PostalData(json);
            return this.cache;
        } else {
            throw new Error(`Fetching data failed with status ${response.status}`);
        }
    }
}

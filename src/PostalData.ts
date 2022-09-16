export class PostalData {
    constructor(private obj: Object) { }

    getDistrictName(postalcode: String): String | null {
        let name = this.obj[postalcode as keyof Object];
        if (typeof name === 'string') {
            return name;
        }
        return null;
    }

    getCodesForDistrict(district: String): String[] {
        let codes: String[] = [];
        for (let [code, name] of Object.entries(this.obj)) {
            if (district.toUpperCase() === name.toUpperCase()) {
                codes.push(code);
            }
        }
        return codes;
    }
}

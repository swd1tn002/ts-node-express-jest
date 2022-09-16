import express from 'express';
import { Client } from './Client';

const PORT = process.env.PORT || 3000;
const app = express();
const client = new Client();

app.get('/postalcodes', async function (req, res) {
    let postalCode: string = req.query.number?.toString() ?? '';
    let districtName = await client.getPostalDistrict(postalCode);
    let statusCode = districtName ? 200 : 404;

    res.status(statusCode).json({
        number: postalCode,
        name: districtName
    });
});

app.get('/postalcodes/:districtName', async function (req, res) {
    let districtName = req.params.districtName;
    let codes = await client.getPostalCodes(districtName);

    let statusCode = codes.length > 0 ? 200 : 404;
    res.status(statusCode).json({
        name: districtName,
        numbers: codes
    });
});

export default app;

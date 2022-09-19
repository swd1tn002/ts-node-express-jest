import express from 'express';
import { PostalCode } from './models/postalcode';

const app = express();

app.get('/postalcodes', async function (req, res) {
    let postalCode: string = req.query.number?.toString() ?? '';
    let found = await PostalCode.findByCode(postalCode);

    let statusCode = found ? 200 : 404;
    res.status(statusCode).json({
        number: postalCode,
        name: found?.name ?? null
    });
});

app.get('/postalcodes/:districtName', async function (req, res) {
    let districtName = req.params.districtName;
    let results = await PostalCode.findByName(districtName);

    let statusCode = results.length > 0 ? 200 : 404;
    res.status(statusCode).json({
        name: districtName,
        numbers: results.map(r => r.code)
    });
});

export default app;

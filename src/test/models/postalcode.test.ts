import { PostalCode } from '../../models/postalcode';
import { test, describe, beforeEach, afterEach, beforeAll } from '@jest/globals';
import { strict as assert } from 'assert';

describe('PostalCode data model', () => {

    beforeAll(async () => {
        await PostalCode.truncate();
    });

    beforeEach(async () => {
        await PostalCode.bulkCreate([{ code: '00730', name: 'HELSINKI' }, { code: '00100', name: 'Helsinki' }, { code: '99999', name: 'Korvatunturi' }]);
    });

    afterEach(async () => {
        await PostalCode.truncate();
    });


    test('finds all three initial rows', async () => {
        const codes = await PostalCode.findAll();
        assert.equal(codes.length, 3);
    });

    test('can be added with create', async () => {
        let result = await PostalCode.create({ code: '90210', name: 'Beverly Hills' });

        assert.ok(result.id > 0);
        assert.equal(await PostalCode.count(), 4);
    });

    test('can be searched with name or number', async () => {
        let byName = await PostalCode.findOne({ where: { name: 'Korvatunturi' } });
        let byCode = await PostalCode.findOne({ where: { code: '99999' } });

        assert.equal(byName?.code, '99999');
        assert.equal(byCode?.name, 'Korvatunturi');
    });

    test('has static method for searching by code', async () => {
        let found = await PostalCode.findByCode('00730');

        assert.equal(found?.name, 'HELSINKI');
    });

    test('has static method for searching by case-insensitive name', async () => {
        let found = await PostalCode.findByName('HeLsInKi');

        assert.equal(found.length, 2);
        assert.equal(found[0].code, '00100');
    });
});

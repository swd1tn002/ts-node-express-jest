# ts-node-express-jest

```sh
$ npm install
$ npm start
```

Visit http://localhost:3000.


## Examples

### Postal district name by postal code:

```
curl http://localhost:3000/postalcodes?number=99999
```

```json
{
  "number": "99999",
  "name": "KORVATUNTURI"
}
```

### Postal codes by postal district name:

```
curl http://localhost:3000/postalcodes/porvoo/
```

```json
{
  "name": "porvoo",
  "numbers": ["06100", "06401", "06151", "06150", "06101", "06500", "06450", "06400", "06200"]
}
```

---

# Licenses

## Postalcode data

This project utilizes postal codes collected by [@theikkila](https://github.com/theikkila) and [@otlaitil](https://github.com/otlaitil)at [https://github.com/theikkila/postinumerot](https://github.com/theikkila/postinumerot).

> *"Data on postin ja sitä koskee kaikki http://www.posti.fi/liitteet-yrityksille/ehdot/postinumeropalvelut-palvelukuvaus-ja-kayttoehdot.pdf dokumentin käyttöehdot."*
>
> *"JSON-muunnokset ovat vapaasti käytettävissä ja muunneltavissa."*
>
> Source: https://github.com/theikkila/postinumerot
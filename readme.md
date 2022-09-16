# ts-node-express-jest

[![Docker Image CI](https://github.com/swd1tn002/ts-node-express-jest/actions/workflows/docker-image.yml/badge.svg)](https://github.com/swd1tn002/ts-node-express-jest/actions/workflows/docker-image.yml) [![Node.js CI](https://github.com/swd1tn002/ts-node-express-jest/actions/workflows/node.js.yml/badge.svg)](https://github.com/swd1tn002/ts-node-express-jest/actions/workflows/node.js.yml)


## Examples

### Running locally

```sh
$ npm install
$ npm run dev
```

Try it:

* http://localhost:3000
* http://localhost:3000/postalcodes?number=99999
* http://localhost:3000/postalcodes/porvoo/

### Testing locally

```sh
$ npm test
```

### Running in container

```sh
$ docker build . --file Dockerfile --tag ts-node-express-jest:latest
$ docker run -it --rm -p 3000:3000 ts-node-express-jest:latest
```

### Testing the container

```sh
$ docker run -it --rm -p 3000:3000 ts-node-express-jest:latest --exec npm test
```


### Postal district name by postal code

```
curl http://localhost:3000/postalcodes?number=99999
```

```json
{
  "number": "99999",
  "name": "KORVATUNTURI"
}
```

### Postal codes by postal district name

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
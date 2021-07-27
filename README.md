<a href="https://0data.app"><img alt="Project logo" src="https://static.rosano.ca/0data/identity-mono.svg" width="64" /></a>

# [Zero Data App](https://0data.app)

_Own your data, all of it._

## Architecture

The project follows a [Universal folder structure](https://rosano.hmm.garden/01f71kp52knc5nnv08qr9kzj3m) and is a large collection of mostly small modules or functions. With the exception of a few 'global' or 'magic' things such as the localization function `OLSKLocalized`, most resources used by a module should be in the same folder or referenced by path name.

Routing, rendering markdown content, and serving pages is done via a Node.js server (usually configured in the *controller.js* files).

## Development Setup

Install [Node.js and npm](https://nodejs.org/en/download/), then:

```
npm run setup
```

This should create an `.env` file if there is none. If you encounter errors referring to this file, you can find missing variables in `.env-sample`.

## Running

```
npm start
```

It should be accessible at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.

## Testing

See [Testing logic and interfaces](https://rosano.hmm.garden/01f7v3hk3txz5d0v9ms467x8bz) for a tutorial.

### Run logic tests

```
npm test 
```

### Run interface tests

```
npm test ui
```

To filter interface test paths by string:

```
npm test ui match=vitrine
```

To filter interface test paths by JavaScript regular expressions:

```
npm test ui match='/(list|robots)/'
```

## ❤️

If you’re enjoying this, consider [contributing to my Open Collective](https://opencollective.com/rosano). Virtually everything I create is public, accessible for free, and open-source. Your support helps me keep adding to the commons and making it available for everyone.

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Feel free to reach out on [Mastodon](https://merveilles.town/@rosano) or [Twitter](https://twitter.com/rosano).

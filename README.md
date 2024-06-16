<a href="https://0data.app"><img alt="Project logo" src="https://static.rosano.ca/0data/identity-mono.svg" width="64" /></a>

# [Zero Data App](https://0data.app)

_Own your data, all of it._

## Data compiled automatically from the following locations:

### Apps
- https://remotestorage.io/apps
- https://github.com/0dataapp/unofficial-fission-apps-list
- https://github.com/0dataapp/awesome-0data
- https://unhosted.org/apps
- https://solidproject.org/apps

| Metadata | Source |
| - | - |
| Icon | `<link rel="apple-touch-icon" href="ICON_URL_HERE" />` on the app website or [`icons`](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons) from the manifest |

### Protocols
- https://github.com/0dataapp/awesome-0data

### Tools
- https://github.com/0dataapp/awesome-0data

### Events
- https://community.remotestorage.io/c/events/12.rss
- https://lu.ma/embed-events/usr-q0wId4DZFlx7LCP
- https://www.eventbrite.co.uk/o/solid-project-30026804546
- https://chat.0data.app/c/events/5.rss

## Architecture

The project follows a [Universal folder structure](https://rosano.hmm.garden/01f71kp52knc5nnv08qr9kzj3m) and is a large collection of mostly small modules or functions. With the exception of a few 'global' or 'magic' things such as the localization function `OLSKLocalized`, most resources used by a module should be in the same folder or referenced by path name.

Routing, rendering markdown content, and serving pages is done via a Node.js server (usually configured in the *controller.js* files).

## Development Setup

(For a deeper dive, watch [the tutorial](https://rosano.hmm.garden/01f62t5yseb053m024v1mczbzy)).

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

Help me keep creating projects that are public, accessible for free, and open-source.

<a href="https://rosano.ca/back"><img alt="Send a gift" src="https://static.rosano.ca/_shared/_RCSBackButton.svg" /></a>

## License

The code is released under a [Hippocratic License](https://firstdonoharm.dev), modified to exclude its use for surveillance capitalism and also to require large for-profit entities to purchase a paid license.

## Questions

Feel free to reach out on [Mastodon](https://rosano.ca/mastodon) or [Twitter](https://rosano.ca/twitter).

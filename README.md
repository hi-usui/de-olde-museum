# de-olde-museum

## Installation

Node.js will download and run local instances of MongoDB and Redis (separate install not needed)

If on macOS, use [Homebrew package manager](https://brew.sh/)

```bash
brew install node@16
npm install
```

## Usage

```bash
npm run dev
```

## Troubleshooting

Having issues? @hi-usui tested this on:

- Node v16.5.0, npm v7.19.1

Check if running:

```
curl localhost:8000
```

Cleanup/project reset:

```
rm -rf node_modules
rm -rf client/node_modules
rm -rf data # remove MongoDB data
```

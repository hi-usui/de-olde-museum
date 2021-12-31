https://kind-snyder-f07c39.netlify.app

note: for the sake of easier Netlify hosting, "server" directory ended up being unused, COMPSCI 160 final class project was pure front-end, so only "client" is used

[Presentation Poster](https://github.com/hi-usui/de-olde-museum/blob/main/_final-poster.pdf)

[Final Presentation Slides](https://github.com/hi-usui/de-olde-museum/blob/main/_final-presentation.pptx)

[Final Report Paper](https://github.com/hi-usui/de-olde-museum/blob/main/_final-report.pdf)

[Final Submission Video](https://github.com/hi-usui/de-olde-museum/blob/main/_final-video----Team%201%20-%20Art%20Outfitter%20Kiosk%20%5BbysRd2IhoHg%5D.mp4)

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

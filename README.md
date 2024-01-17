# Purpose of test:

Create a VueJS form that will:
- let the client upload and SVG(must work in offline mode too)
- show the SVG and extract all animations(from css)
- upload a new SVG(same structure with original, BUT no CSS)
- add animations to second SVG
- show the new, altered SVG

## Folder for test svg

`test_files`

[Link for local test](http://localhost:3000/)

# Run local

```
npm install
npm run dev
```

# Server Production

```
npm run build
npm run start
```

# Docker

```
docker build -t svgator/test .
docker login
docker push svgator/test
docker run -it -p 3000:3000 --rm --name test svgator/test
```

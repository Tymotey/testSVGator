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
npm run build-only
npm run start
```

# Docker

```
docker build -t svgator/test .
docker login
docker push svgator/test
docker run -it -p 3000:3000 --rm --name test svgator/test
```

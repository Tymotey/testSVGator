import express from 'express'
import path from 'path'
import homepageRouter from './homepageRouter.js'
import assetsRouter from './assetsRouter.js'
import uploadRouter from './uploadRouter.js'

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000
const publicPath = path.join(path.resolve(), 'public')
const distPath = path.join(path.resolve(), 'dist')

const app = express()

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(distPath))
} else {
  app.use('/', express.static(publicPath))
  app.use('/src', assetsRouter)
}

app.use(uploadRouter)
app.use(homepageRouter)

app.listen(port, () => {
  console.log('Server listening on port', port)
})

import express from 'express'
import bodyParser from 'body-parser'
import formidable from 'formidable'

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router
  .post('/api/v1/upload', (req, res) => {
    const returnData = { error: true, data: {}, message: 'Error occured' }

    const form = formidable({})
    form.parse(req, function (err, fields, files) {
      console.log('upload')
      if (err != null) {
        return res.status(400).json({ message: err.message })
      }
      const [fileName] = Object.keys(files)

      res.json({ filename: fileName })
      // TODO: finish here
    })

    res.send(returnData)
  })
  .get('/api/v1/upload', (_req, res) => {
    res.send({ error: true, message: 'Try posting' })
  })

export default router

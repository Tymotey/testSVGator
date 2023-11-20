import express from 'express'
import bodyParser from 'body-parser'
import formidable from 'formidable'

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router
  .post('/api/v1/upload', (req, res) => {
    let data = req.body

    const form = formidable({})
    form.parse(req, function (err, fields, files) {
      if (err != null) {
        console.log(err)
        return res.status(400).json({ message: err.message })
      }
      const [firstFileName] = Object.keys(files)

      res.json({ filename: firstFileName })
      // TODO: finish here
    })

    res.send('Data Received: ' + JSON.stringify(data))
  })
  .get('/api/v1/upload', (_req, res) => {
    res.json({ error: true, message: 'Try posting' })
  })

export default router

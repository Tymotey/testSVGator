import process from 'node:process'
import express from 'express'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'
import fs from 'fs'

const router = express.Router()
router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  })
)
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const filePrefix = () => {
  const date = new Date()
  return (
    date.getFullYear() +
    '' +
    date.getMonth() +
    '' +
    date.getDay() +
    '' +
    date.getHours() +
    '' +
    date.getMinutes()
  )
}

router
  .post('/api/v1/upload', async (req, res) => {
    const returnData = { error: true, data: {}, message: 'Error occured' }

    if (!req.files || Object.keys(req.files).length === 0) {
      returnData.message = 'No files were uploaded.'
      res.status(400).send(returnData)
    } else {
      if (req.body.clientId !== undefined) {
        const uploadedFile = req.files.file

        // public for now, but is not ok for security
        const __dirname = process.cwd() + '/public'
        const path =
          '/uploads/' +
          req.body.step +
          '/' +
          req.body.clientId +
          '/' +
          filePrefix() +
          '-' +
          uploadedFile.name
        const uploadPath = __dirname + path

        // there is a better way!
        if (!fs.existsSync(__dirname + '/uploads/' + req.body.step)) {
          fs.mkdirSync(__dirname + '/uploads/' + req.body.step)
        }
        if (!fs.existsSync(__dirname + '/uploads/' + req.body.step + '/' + req.body.clientId)) {
          fs.mkdirSync(__dirname + '/uploads/' + req.body.step + '/' + req.body.clientId)
        }

        // mv() to place the file somewhere on your server
        uploadedFile.mv(uploadPath, function (err) {
          if (err) {
            returnData.message = err

            res.status(400).send(returnData)
          } else {
            returnData.error = false
            returnData.data = { path }
            returnData.message = ''

            res.send(returnData)
          }
        })
      } else {
        returnData.message = 'Incomplete data sent to server'

        res.status(400).send(returnData)
      }
    }
  })
  .get('/api/v1/upload', (_req, res) => {
    res.send({ error: true, message: 'Try posting' })
  })

export default router

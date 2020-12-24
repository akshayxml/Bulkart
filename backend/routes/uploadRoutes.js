import path from 'path'
import asyncHandler from 'express-async-handler'
import express from 'express'
import multer from 'multer'
const router = express.Router()
import pkg from 'cloudinary' 

const cloudinary = pkg

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), asyncHandler (async (req, res) => {
  const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`)
  // console.log(uploadPhoto) // This will give you all the information back from the uploaded photo result
  // console.log(uploadPhoto.url)  // This is what we want to send back now in the  res.send
  res.send(uploadPhoto.url) 
}))

export default router
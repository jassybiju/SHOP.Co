import multer from 'multer'

const storage = multer.diskStorage({
    destination :  'uploads/',
    filename : function (req, file, cb){
        const route = req.originalUrl.split('/')
        cb(null, `${route[route.length]}-${Date.now()}`)
    }
})

const upload = multer({storage ,
    limits : {fileSize : 1 * 1024 * 1024},
    fileFilter : (req, file, cb) => {
        if(file.mimetype === 'image/png' || file.mimetype == 'image/jpg' || file.mimetype === 'image/jpeg'){
            cb(null, true)
        }else{
            cb(null, false)
            const err = new Error('Only .png .jpg and .jpeg formats are allowed')
            err.name = 'Extension Error'
            return cb(err)
        }
    }
})

export default upload
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      cb(null, "./public/temp")
    },
    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname)
    }
  })

export const upload = multer({ 
    storage, 
})
import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname, join } from "path";

export const multerOption={
    storage: diskStorage({
        destination: join(__dirname,'..', 'upload'),
        filename: (req, file, cb)=>{
            cb(null, randomUUID() + extname(file.originalname))
        },
    })
}
import multer from 'multer';

import { isAuthorized } from "../../middlewares/isAuthorized";
import AppRouter from "../../lib/router";
import { RegisterHandler } from "./handlers/register.handler";
import { LoginHandler } from "./handlers/login.handler";
import { UploadFileHandler } from "./handlers/upload-file.handler";

const upload = multer({ dest: 'uploads/' });

export const router = new AppRouter('/admin');

router.post('/register')
  .handler(new RegisterHandler());

router.post('/login')
  .handler(new LoginHandler());

router.post('/upload')
  .use(isAuthorized)
  .use(upload.single('image'))
  .handler(new UploadFileHandler());

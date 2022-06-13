import { Router } from "express";
import { isAuthorized } from "../../middlewares/isAuthorized";
import { login, register, uploadFile } from './admin.handlers'
import multer from 'multer';

export const router = Router();
const upload = multer({ dest: 'uploads/' });
router.use(isAuthorized);

router.post('/register', register);
router.post('/login', login);
router.post('/upload', upload.single('image'), uploadFile);


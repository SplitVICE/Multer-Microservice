const express = require('express');
const path = require('path');
const multer = require('multer');
const fileExtension = require('file-extension');
const { nanoid } = require('nanoid');
const fs = require('fs');
require('dotenv').config();

const app = express();
const router = express.Router();

// ===============================================================================================
// SERVER SETTINGS
// ===============================================================================================
app.set('port', process.env.PORT || 1500)

// PUBLIC FOLDER CREATION
if (!fs.existsSync(path.join(__dirname, 'public/')))
    fs.mkdirSync(path.join(__dirname, 'public/'));

// ===============================================================================================

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) { // Accepts API requests from selected domains - cors
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

// ============================================================================================
// MULTER SETTINGS
// ============================================================================================
const multer_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public'))
    },
    filename: (req, file, cb) => {
        cb(null, (() => {
            return process.env.GENERATE_RANDOM_NAMES_ON_UPLOADED_FILES.toLowerCase() == 'true' || true
                ? nanoid(7) + '.' + fileExtension(file.originalname)
                : file.originalname
        })())
    },
});

const upload = multer({
    storage: multer_storage,
    limits: { fileSize: process.env.FILE_SIZE_LIMIT || 30000000 } // 30MB file limit
});
// ============================================================================================

// Single file upload
app.use(router.post('/api/upload/single', upload.single('file'), (req, res) => {
    res.json({ ok: req.file });
}));

// Multiple file upload
app.use(router.post('/api/upload/multiple', upload.array('files'), (req, res) => {
    res.json({ ok: req.files });
}));

// / route HTML rendering
app.use(router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
}));

app.listen(app.get('port'), () => { console.log(`Multer Microservice running on port ${app.get('port')}`); });
const express = require('express');
const path = require('path');
const multer = require('multer');
const fileExtension = require('file-extension');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const router = express.Router();

// ===============================================================================================
// Server settings.
// ===============================================================================================
app.set('port', process.env.PORT || 1500)

// Public folder creation.
if (!fs.existsSync(path.join(__dirname, 'public/')))
    fs.mkdirSync(path.join(__dirname, 'public/'));

// ===============================================================================================

// Middlewares.
app.use(express.static(path.join(__dirname, 'public'))) // Public files folder. Where uploads land.
app.use(cors()); // Accepts API requests from all domains.

// ===============================================================================================
// Multer settings.
// ===============================================================================================
// Validation for random generated names or not.
const generateRandomNames = (() => {
    if (process.env.GENERATE_RANDOM_NAMES) {
        return process.env.GENERATE_RANDOM_NAMES.toLocaleLowerCase() == 'true'
            ? true
            : false;
    }
    return false;
})();
console.log(generateRandomNames);
const multer_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public'))
    },
    filename: (req, file, cb) => {
        cb(null, (() => {
            return generateRandomNames === true
                ? uuidv4() + '.' + fileExtension(file.originalname)
                : file.originalname
        })())
    },
});

const upload = multer({
    storage: multer_storage,
    limits: { fileSize: process.env.FILE_SIZE_LIMIT || 30000000 } // 30MB file limit - Expressed in bytes.
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

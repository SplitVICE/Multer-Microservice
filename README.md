[![N|Solid](https://dl.dropboxusercontent.com/s/oy06v7r8d871cr8/splitvice-banner.png?dl=0)](http://split-vice.com)

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

# Multer Microservice
NodeJS + Express + Multer microservice project to upload files on disk.
## Run microservice:
- Install <a href="https://nodejs.org/" target="_blank">NodeJS</a>
- Open console on project root.
- Install dependencies: `npm install`
- Run app with `npm start`, `node src/index.js` or `npm run dev`
## Usage examples
Go to `/src/views/index.html` to see usage examples on client JavaScript and HTML to upload files on server.

Files will be uploaded at `/src/public/`. You would be able to se files by going to `localhost:<port>/yourUploadedFile.png`

# Environment variables
At project root `.env.template` file is located. Create `.env` file on project root or rename `.env.template` file to `.env` to set application settings.

`GENERATE_RANDOM_NAMES_ON_UPLOADED_FILES`. Expected value: `TRUE` or `FALSE`.

Will store files in file system with a custom name generated with nanoid package.

`PORT`. Expected value: `Number`.

Sets port where application will operate.

`FILE_SIZE_LIMIT`. Expected value: `Number`.

Sets file size limit expressed in bytes. Example: `30000000` to set file size limit of 30MB.

If environment variables not set, project will run at default settings:

Port: 1500, file size limit: 30MB, generate random names: true.

### Need user interface?
Try my other project <a href="https://github.com/splitvice/bit-frisbee" target="_blank">Bit Frisbee</a>
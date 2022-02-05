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
Create file called `.env` in project root. Use `.env.template` file to have a template for `.env` file.

| Environment variable  | Description                                             | Example  |
| --------------------- | ------------------------------------------------------- | -------- |
| PORT                  | Application port                                        | 3000     |
| FILE_SIZE_LIMIT       | Permited file size limite expressed in bytes            | 30000000 |
| GENERATE_RANDOM_NAMES | Name uploaded files with uuid module. Defaults to false | true     |

### Application of mine that uses this template:
<a href="https://github.com/splitvice/bit-frisbee" target="_blank">Bit Frisbee</a>
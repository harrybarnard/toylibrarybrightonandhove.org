# Early Childhood Project Toy Library Website

This is the source code for the [Early Childhood Project Toy Library](https://toylibrarybrightonandhove.org) Website a Brighton, UK based children's charity.
It is a companion site to the main [Early Childhood Project](https://ecpuk.org) Website and is designed to be used by users
of the toy library.

Prerequisites:

* [Hugo](https://gohugo.io/)
* [Node.js](https://nodejs.org/)
* [Amazon S3](https://aws.amazon.com/s3/)
* [Amazon Cloudfront](https://aws.amazon.com/cloudfront/)

## Usage

This is a [Hugo](https://gohugo.io/) project. Check the [Hugo Documentation](https://gohugo.io/documentation/) for more usage information.

### Content Commands

Add new page:
```bash
hugo new page/<page name>.md
```

### Development Commands
Check [gulpfile.js](https://github.com/harrybarnard/ecpuk.org/blob/master/gulpfile.js) for more info.

Install dependencies:
```bash
npm install
```
Run local development server at [http://localhost:1313](https://localhost:1313):
```bash
npm run server
```
Build source:
```bash
npm run build
```
Watch source for changes:
```bash
npm run watch
```
Publish site. This builds from source, uploads to S3 then runs an invalidation on Cloudfront as necessary:
```bash
npm run publish
```

### Configuration
Hugo is configured using [config.toml](https://github.com/harrybarnard/ecpuk.org/blob/master/config.toml).  
You'll need to create an aws.json (in the project root) file to configure your Amazon deployment. You can use [aws.example.json](https://github.com/harrybarnard/ecpuk.org/blob/master/aws.example.json)
as a guide for this.

## Licence
MIT

*Whilst the code is licenced under the MIT licence in the hope it helps others whishing to implement Hugo on Amazon S3/Cloudfront
the site content remains the copyright of the Brighton, Hove & District Early Childhood Project.*

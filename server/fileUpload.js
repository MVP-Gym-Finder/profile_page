const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const key = require('./env/key.js');
const path = require('path');
const models = require('../database/models.js');

const fileUpload = (req, res) => {
  const s3 = new aws.S3({
    accessKeyId: key.accessKeyId,
    secretAccessKey: key.secretAccessKey,
    Bucket: key.Bucket
  });
  const profileImgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: key.Bucket,
     acl: 'public-read',
     contentType: multerS3.AUTO_CONTENT_TYPE,
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
  }).single('profileImage');
  /**
   * Check File Type
   * @param file
   * @param cb
   * @return {*}
   */
  function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );
   if( mimetype && extname ){
     return cb( null, true );
    } else {
     cb( 'Error: Images Only!' );
    }
  }
  /**
   * @route POST api/profile/business-img-upload
   * @desc Upload post image
   * @access public
   */
    profileImgUpload( req, res, ( error ) => {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if( error ){
     console.log( 'errors', error );
     res.json( { error: error } );
    } else {
     // If File not found
     if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( 'Error: No File Selected' );
     } else {
      // If Success
      const imageName = req.file.key;
      const imageLocation = req.file.location;
      // Save the file name into database into profile model
      models.upload(imageLocation);
      res.json( {
        image: imageName,
        location: imageLocation
      } );
     }
    }
  });
}
module.exports = fileUpload;
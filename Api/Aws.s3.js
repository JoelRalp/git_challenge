const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
let path = "new";
 function uploadFile(files,fname,callBack) {
     const params = {
         Bucket:'nodeapirepos/OutletImages', 
         Key:fname + ".jpg", 
         Body:files
     };
     s3.upload(params,(s3Err, data) => {
         if (s3Err) {
         callBack(null, s3Err);
         }
         else {
           path = data.Location;
           callBack(path, null);
         }
       });    
  }
  function uploadImg(files,fname) {
    const params = {
        Bucket:'nodeapirepos/OutletImages', 
        Key:fname + ".jpg", 
        Body:files
    };
    s3.upload(params,(s3Err, data) => {
        if (s3Err) {
      return s3Err;
        }
        else {
          path = data.Location;
         
          return path;
        }
      });    
 }
module.exports = {
    uploadFile,
    uploadImg
}





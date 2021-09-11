
const {add_Gallery} = require("./Gallery.controller");
const {view_Gallery} = require("./Gallery.controller");
const {delete_Gallery} = require("./Gallery.controller");

const router = require("express").Router();

router.post('/addGallery',add_Gallery);
router.post('/viewGallery',view_Gallery);
router.post('/deleteGallery',delete_Gallery);

module.exports = router;
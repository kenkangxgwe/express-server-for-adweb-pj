var express = require('express');
var router = express.Router();

var sightinfo = require('../dao/SightInfo');

/* GET sights listing. */
router.get('/', function (req, res, next) {
    res.end();
});

// For all users
router.get('/viewsight', sightinfo.viewSight);
router.get('/search', sightinfo.searchKeyword);
router.get('/searchList', sightinfo.searchList);
router.get('/calfav', sightinfo.calFav);
router.get('/calwish', sightinfo.calWish);
router.get('/calstep', sightinfo.calStep);
router.get('/calgrade', sightinfo.calGrade);
router.get('/commentlist', sightinfo.searchComment);
router.get('/comment', sightinfo.viewComment);
router.get('/medialist', sightinfo.searchMedia);
router.get('/media', sightinfo.viewMedia);

module.exports = router;

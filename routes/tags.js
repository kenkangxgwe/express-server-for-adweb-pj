var express = require('express');
var router = express.Router();

var taginfo = require('../dao/TagInfo');

/* GET sights listing. */
router.get('/', function (req, res, next) {
    res.end();
});

// For all users
router.get('/newtag', function (req, res, next) {
    taginfo.newTag(req, res, next, taginfo.calNum);
});

router.get('/search', taginfo.searchSightTag);

module.exports = router;

var express = require('express');
var router = express.Router();

var userinfo = require('../dao/UserInfo');
var sightinfo = require('../dao/SightInfo');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.end();
});

// For guests
router.get('/signup', userinfo.signup);
router.get('/login', userinfo.login);

// For user himself
router.get('/viewuser', userinfo.viewUser);
router.get('/viewfav', userinfo.viewFav);
router.get('/viewwish', userinfo.viewWish);
router.get('/viewstep', userinfo.viewStep);
router.get('/newpassword', userinfo.newPassword);
router.get('/newavatar', userinfo.newAvatar);
router.get('/newcomment', userinfo.newComment);
router.get('/newmedia', userinfo.newMedia);

router.get('/newfav', function (req, res, next) {
    userinfo.newFav(req, res, next, function(judge) {
        if(judge >= 0) {
            sightinfo.calFav(req, res, next);
        } else {
            res.send(judge.toString());
        }
    });
});

router.get('/newwish', function (req, res, next) {
    userinfo.newWish(req, res, next, function(judge) {
        if(judge >= 0) {
            sightinfo.calWish(req, res, next);
        } else {
            res.send(judge.toString());
        }
    });
});

router.get('/newstep', function (req, res, next) {
    userinfo.newStep(req, res, next, function(judge) {
        if(judge >= 0) {
            sightinfo.calStep(req, res, next);
        } else {
            res.send(judge.toString());
        }
    });
});

router.get('/newgrade', function (req, res, next) {
    userinfo.newGrade(req, res, next, function(judge) {
        if(judge > 0) {
            sightinfo.calGrade(req, res, next);
        } else {
            res.send(judge);
        }
    });
});

module.exports = router;

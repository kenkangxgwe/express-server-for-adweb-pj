var oracledb = require('oracledb');
var LoginConf = require('./LoginConf')
var SQL = require('./UserInfoSqlList');

oracledb.autoCommit = true;

var findUserName = function (param, connection, callback) {
    connection.execute(SQL.findUserName, [decodeURI(param.username)], function (err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var findUserID = function (param, connection, callback) {
    connection.execute(SQL.findUserID, [param.userid], function (err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var addUser = function (param, connection, callback) {
    connection.execute(SQL.addUser, [decodeURI(param.username), param.password], function (err, result) {
        if (err) { console.error(err.message); return; }
        findUserName(param, connection, function (UserList) {
            callback(UserList[0][0]);
        });
    });
};

var checkUser = function (param, connection, callback) {
    connection.execute(SQL.checkUser, [decodeURI(param.username), param.password], function (err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var updateAvatar = function (param, connection) {
    connection.execute(SQL.updateAvatar, [param.userid, param.avatar], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var updatePassword = function (param, connection) {
    connection.execute(SQL.updatePassword, [param.newpassword], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var findSightID = function (param, connection, callback) {
    connection.execute(SQL.findSightID, [param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};


var checkUserSight = function (param, connection, callback) {
    findUserID(param, connection, function (UserList) {
        if (!Object.keys(UserList).length) {
            console.log("User not found");
            callback(-1);
        } else {
            findSightID(param, connection, function (SightList) {
                if (!Object.keys(SightList).length) {
                    console.log("Sight not found");
                    callback(-2);
                } else {
                    callback(1);
                }
            });
        }
    });
};

var addFav = function (param, connection) {
    connection.execute(SQL.addFav, [param.userid, param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var delFav = function (param, connection) {
    connection.execute(SQL.delFav, [param.userid, param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var updateSightFav = function (param, connection, callback) {
    connection.execute(SQL.updateSightFav, [param.sightid], function (err, result) {
        callback(result.rows[0]);
    });
};

var searchFav = function (param, connection, callback) {
    connection.execute(SQL.searchFav, [param.userid], function (err, result) {
        var SightList = result.rows;
        var len = Object.keys(SightList);
        var jsonify = function(info, index) {
            if(index == len) {
                callback(info);
            }
            else {
                info[index] = SightList[index][0];
                jsonify(info, index + 1);
            }
        };
        jsonify([], 0);
    });
};

var addWish = function (param, connection) {
    connection.execute(SQL.addWish, [param.userid, param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var delWish = function (param, connection) {
    connection.execute(SQL.delWish, [param.userid, param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var searchWish = function (param, connection, callback) {
    connection.execute(SQL.searchWish, [param.userid], function (err, result) {
        var SightList = result.rows;
        var len = Object.keys(SightList);
        var jsonify = function(info, index) {
            if(index == len) {
                callback(info);
            }
            else {
                info[index] = SightList[index][0];
                jsonify(info, index + 1);
            }
        };
        jsonify([], 0);
    });
};

var addStep = function (param, connection) {
    connection.execute(SQL.addStep, [param.userid, param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var delStep = function (param, connection) {
    connection.execute(SQL.delStep, [param.userid, param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var searchStep = function (param, connection, callback) {
    connection.execute(SQL.searchStep, [param.userid], function (err, result) {
        var SightList = result.rows;
        var len = Object.keys(SightList);
        var jsonify = function(info, index) {
            if(index == len) {
                callback(info);
            }
            else {
                info[index] = SightList[index][0];
                jsonify(info, index + 1);
            }
        };
        jsonify([], 0);
    });
};

var findGrade = function (param, connection, callback) {
    connection.execute(SQL.findGrade, [param.userid, param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
        if (!Object.keys(result.rows).length) {
            callback(1);
        } else {
            callback(2);
        }
    });
};

var addGrade = function (param, connection) {
    connection.execute(SQL.addGrade, [param.userid, param.sightid, param.grade], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var updateGrade = function (param, connection) {
    connection.execute(SQL.updateGrade, [param.grade, param.userid, param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var findComment = function (param, connection, callback) {
    connection.execute(SQL.findComment, [param.userid, param.sightid, param.timestamp], function (err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var addComment = function (param, connection, callback) {
    connection.execute(SQL.addComment, [param.userid, param.sightid, param.timestamp, decodeURI(param.comment)], function (err, result) {
        if (err) { console.error(err.message); return; }
        findComment(param, connection, function (CommentList) {
            callback(CommentList[0][0]);
        });
    });
};

var findMedia = function (param, connection, callback) {
    connection.execute(SQL.findMedia, [param.userid, param.sightid, param.timestamp], function (err, result) {
        if (err) { console.error(err.message); return; }
        var MediaList = result.rows;
        var len = Object.keys(MediaList);
        var jsonify = function(info, index) {
            if(index == len) {
                callback(info);
            }
            else {
                info[index] = MediaList[index][0];
                jsonify(info, index + 1);
            }
        };
        jsonify([], 0);
    });
};

var addMedia = function (param, connection, callback) {
    for (index in param.mediaurl) {
        connection.execute(SQL.addMedia, [param.userid, param.sightid, param.timestamp, index, param.mediaurl], function (err, result) {
            if (err) { console.error(err.message); return; }
            callback();
        });
    }
};


module.exports = {
    signup: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findUserName(param, connection, function (UserList) {
                if (!Object.keys(UserList).length) {
                    addUser(param, connection, function (UserID) {
                        console.log("New user[" + UserID + "] added")
                        res.send({ "userid": UserID });
                    });
                } else {
                    console.log("The same username exists!")
                    res.send('-1');
                }
            });
            connection.close();
        });
    },

    login: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            checkUser(param, connection, function (UserList) {
                if (!Object.keys(UserList).length) {
                    console.log("Incorrect username or password!");
                    res.send('-1');
                } else {
                    console.log("User[" + UserList[0][0] + "] logged in");
                    res.send({ "userid": UserList[0][0] });
                }
            });
        });
    },

    viewUser: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findUserID(param, connection, function (UserList) {
                if (!Object.keys(UserList).length) {
                    console.log("User not found");
                    res.send('-1');
                } else {
                    res.send({
                        "userid": UserList[0][0],
                        "avatar": UserList[0][1]
                    });
                }
            });
        });
    },

    newPassword: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            checkUser(param, connection, function (UserList) {
                if (!Object.keys(UserList).length) {
                    console.log("Incorrect username or password");
                    res.send('-1');
                } else {
                    console.log("User[" + UserList[0][0] + "] changed the password");
                    updatePassword(param, connection);
                    res.send('1');
                }
            });
            connection.close();
        });
    },

    newAvatar: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findUserID(param, connection, function (UserList) {
                if (!Object.keys(UserList).length) {
                    console.log("User not found");
                    res.send('-1');
                } else {
                    console.log("User[" + UserList[0][0] + "] updated the avatar");
                    updateAvatar(param, connection);
                    res.send({ "avatar": param.avatar });
                }
            });
            connection.close();
        });
    },

    newFav: function (req, res, next, callback) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            checkUserSight(param, connection, function (judge1) {
                if (judge1 == '1') {
                    if (param.type == 1) {
                        addFav(param, connection);
                    } else {
                        delFav(param, connection);
                    }
                    callback(param.type);
                } else {
                    callback(judge1);
                }
            });
            connection.close();
        });
    },

    viewFav: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            searchFav(param, connection, function (SightList) {
                    res.send({
                        "sightid": SightList
                    });
            });
            connection.close();
        });
    },

    newWish: function (req, res, next, callback) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            checkUserSight(param, connection, function (judge1) {
                if (judge1 == 1) {
                    if (param.type) {
                        addWish(param, connection);
                    } else {
                        delWish(param, connection);
                    }
                    callback(param.type);
                } else {
                    callback(judge1);
                }
            });
            connection.close();
        });
    },

    viewWish: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            searchWish(param, connection, function (SightList) {
                    res.send({
                        "sightid": SightList
                    });
            });
            connection.close();
        });
    },

    newStep: function (req, res, next, callback) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            checkUserSight(param, connection, function (judge1) {
                if (judge1 == 1) {
                    if (param.type) {
                        addStep(param, connection);
                    } else {
                        delStep(param, connection);
                    }
                    callback(param.type);
                } else {
                    callback(judge1);
                }
            });
            connection.close();
        });
    },

    viewStep: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            searchStep(param, connection, function (SightList) {
                    res.send({
                        "sightid": SightList
                    });
            });
            connection.close();
        });
    },

    newGrade: function (req, res, next, callback) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            checkUserSight(param, connection, function (judge1) {
                if (judge1 == 1) {
                    findGrade(param, connection, function (judge2) {
                        if (judge2 == 1) {
                            addGrade(param, connection);
                            console.log("User[" + param.userid + "] rated on sight[" + param.sightid + "]");
                        } else {
                            updateGrade(param, connection);
                            console.log("User[" + param.userid + "] revote on sight[" + param.sightid + "]");
                        }
                        callback(judge2);
                    });
                } else {
                    callback(judge1);
                }
            });
            connection.close();
        });
    },

    newComment: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            checkUserSight(param, connection, function (judge) {
                if (judge == 1) {
                    addComment(param, connection, function (CmtId) {
                        console.log("User[" + param.userid + "] commented on sight[" + param.sightid + "]");
                        res.send({
                            "cmtid": CmtId,
                            "timestamp": param.timestamp
                        });
                    });
                } else {
                    res.send(judge.toString());
                }
            });
            connection.close();
        });
    },

    newMedia: function (req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            checkUserSight(param, connection, function (judge) {
                if (judge == 1) {
                    addMedia(param, connection, function () {
                        console.log("User[" + param.userid + "] uploaded media on sight[" + param.sighid + "]");
                        findMedia(param, connection, function(MediaList) {
                            res.send({
                                "mediaid": MediaList,
                                "timestamp": param.timestamp
                            });
                        });
                    });
                } else {
                    res.send(judge.toString());
                }
            });
            connection.close();
        });
    }
};

var oracledb = require('oracledb');
var SQL = require('./SightInfoSqlList');
oracledb.autoCommit =true;

LoginConf = {
    user          : "sf_user",
    password      : "salted-fish",
    connectString : "159.203.230.233:49161/xe"
};

var searchSightName = function(param, connection, callback) { 
    connection.execute(SQL.searchSightName, ['%' + decodeURI(param.keyword) + '%'], function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }
        callback(result.rows);
    });
};

var findSightName = function(SightName, connection, callback) { 
    console.log(SightName);
    connection.execute(SQL.findSightName, [SightName], function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }
        callback(result.rows);
    });
};

var findSightID = function(param, connection, callback) { 
    connection.execute( SQL.findSightID, [param.sightid], function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }
        callback(result.rows);
    });
};

var viewFav = function (param, connection, callback) {
    connection.execute(SQL.viewFav, [param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var updateFav = function (NumFav, SightID, connection) {
    connection.execute(SQL.updateFav, [NumFav[0][0], SightID], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var viewWish = function (param, connection, callback) {
    connection.execute(SQL.viewWish, [param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var updateWish = function (NumWish, SightID, connection) {
    connection.execute(SQL.updateWish, [NumWish[0][0], SightID], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var viewStep = function (param, connection, callback) {
    connection.execute(SQL.viewStep, [param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var updateStep = function (NumStep, SightID, connection) {
    connection.execute(SQL.updateStep, [NumStep[0][0], SightID], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var viewGrade = function (param, connection, callback) {
    connection.execute(SQL.viewGrade, [param.sightid], function (err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var updateGrade = function (GrdList, SightID, connection) {
    connection.execute(SQL.updateGrade, [GrdList[0][0], GrdList[0][1], SightID], function (err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var findCmtSightID = function(param, connection, callback) { 
    connection.execute( SQL.findCmtSightID, [param.sightid], function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }
        callback(result.rows);
    });
};

var findCmtID = function(param, connection, callback) { 
    connection.execute( SQL.findCmtID, [param.cmtid], function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }
        callback(result.rows);
    });
};

var findMediaSightID = function(param, connection, callback) { 
    connection.execute( SQL.findMediaSightID, [param.sightid], function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }
        callback(result.rows);
    });
};

var findMediaID = function(param, connection, callback) { 
    connection.execute( SQL.findMediaID, [param.mediaid], function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }
        callback(result.rows);
    });
};

var listColumn = function(connection, callback) { 
    connection.execute( SQL.listColumn, function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }
        callback(result.rows);
    });
};

module.exports = {
    searchKeyword: function(req, res, next) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var param = req.query || req.params;
            searchSightName(param, connection, function(SightList) {
                if(!Object.keys(SightList).length) {
                    res.send('-1');
                } else {
                    var len = Object.keys(SightList).length;
                    var jsonify = function(info, index) {
                        if(index == len) {
                            res.send(info);
                        }
                        else {
                            info[index] = SightList[index][0];
                            jsonify(info, index + 1);
                        }
                    };
                    jsonify([], 0);
                }
            });
        });
    },

    viewSight: function(req, res, next) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var param = req.query || req.params;
            findSightID(param, connection, function(SightList) {
                if(!Object.keys(SightList).length) {
                    res.send('-1');
                } else {
                    listColumn(connection, function(ColumnList) {
                        var len = Object.keys(ColumnList).length;
                        var jsonify = function(info, index) {
                            if(index == len) {
                                res.send(info);
                            }
                            else {
                                info[ColumnList[index][0]] = SightList[0][index];
                                jsonify(info, index + 1);
                            }
                        };
                        jsonify({}, 0);
                    });
                }
            });
            connection.close();
        });
    },

    calFav: function(req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findSightID(param, connection, function (SightList) {
                if(!Object.keys(SightList).length) {
                    res.send('-1');
                } else {
                    viewFav(param, connection, function(NumFav) {
                        updateFav(NumFav, param.sightid, connection);
                        res.send({
                            "numfav": NumFav[0][0]
                        });
                    });
                }
            });
            connection.close();
        });
    },

    calWish: function(req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findSightID(param, connection, function (SightList) {
                if(!Object.keys(SightList).length) {
                    res.send('-1');
                } else {
                    viewWish(param, connection, function(NumWish) {
                        updateWish(NumWish, param.sightid, connection);
                        res.send({
                            "numwish": NumWish[0][0]
                        });
                    });
                }
            });
            connection.close();
        });
    },

    calStep: function(req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findSightID(param, connection, function (SightList) {
                if(!Object.keys(SightList).length) {
                    res.send('-1');
                } else {
                    viewStep(param, connection, function(NumStep) {
                        updateStep(NumStep, param.sightid, connection);
                        res.send({
                            "numstep": NumStep[0][0]
                        });
                    });
                }
            });
            connection.close();
        });
    },

    calGrade: function(req, res, next) {
        oracledb.getConnection(LoginConf, function (err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findSightID(param, connection, function (SightList) {
                if(!Object.keys(SightList).length) {
                    res.send('-1');
                } else {
                    viewGrade(param, connection, function(GrdList) {
                        updateGrade(GrdList, param.sightid, connection);
                        res.send({
                            "avggrd": GrdList[0][0],
                            "numgrd": GrdList[0][1]
                        });
                    });
                }
            });
            connection.close();
        });
    },
    
    searchComment: function(req, res, next) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if(err) {
                console.error(err.message);
                return;
            }
            var param = req.query || req.params;
            findCmtSightID(param, connection, function(CmtList) {
                if(!Object.keys(CmtList).length) {
                    res.send('-1');
                } else {
                    var len = Object.keys(CmtList).length;
                    var jsonify = function(info, index) {
                        if(index == len) {
                            res.send(info);
                        }
                        else {
                            info[index] = {
                                "cmtid": CmtList[index][0],
                                "timestamp": CmtList[index][1]
                            };
                            jsonify(info, index + 1);
                        }
                    };
                    jsonify([], 0);
                }
            });
        });
    },

    viewComment: function(req, res, next) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if(err) {
                console.error(err.message);
                return;
            }
            var param = req.query || req.params;
            findCmtID(param, connection, function(CmtList) {
                if(!Object.keys(CmtList).length) {
                    res.send('-1');
                } else {
                    res.send({
                        "userid": CmtList[0][0],
                        "timestamp": CmtList[0][1],
                        "cmt": CmtList[0][2]
                    });
                }
            });
        });
    },

    searchMedia: function(req, res, next) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if(err) {
                console.error(err.message);
                return;
            }
            var param = req.query || req.params;
            findMediaSightID(param, connection, function(MediaList) {
                if(!Object.keys(MediaList).length) {
                    res.send('-1');
                } else {
                    var len = Object.keys(MediaList).length;
                    var jsonify = function(info, index) {
                        if(index == len) {
                            res.send(info);
                        }
                        else {
                            info[index] = MediaList[index][0];
                            jsonify(info, index + 1);
                        }
                    };
                    jsonify([], 0);
                }
            });
        });
    },

    viewMedia: function(req, res, next) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if(err) {
                console.error(err.message);
                return;
            }
            var param = req.query || req.params;
            findMediaID(param, connection, function(MediaList) {
                if(!Object.keys(MediaList).length) {
                    res.send('-1');
                } else {
                    res.send({
                        "userid": MediaList[0][0],
                        "timestamp": MediaList[0][1],
                        "mediaurl": MediaList[0][2]
                    });
                }
            });
        });
    },

    searchList: function(req, res, next) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var param = req.query || req.params;
            var len = Object.keys(param.scenelist).length;
            console.log(len);
            var jsonify = function(info, index) {
                if(index == len) {
                    res.send({
                        "sightid": info
                    });
                } else {
                    findSightName(decodeURI(param.scenelist[index]), connection, function(SightList) {
                        console.log(SightList);
                        if(Object.keys(SightList).length) {
                            console.log("SL=" + SightList[0][0]);
                            console.log("ind=" + SightList[0][0]);
                            info.push(SightList[0][0]);
                        }
                        jsonify(info, index + 1);
                    });
                }
            };
            jsonify([], 0);
        });
    }
};

var oracledb = require('oracledb');
var LoginConf = require('./LoginConf')
var SQL = require('./TagInfoSqlList');

oracledb.autoCommit =true;

var findTag = function(param, connection, callback) {
    connection.execute(SQL.findTag, [decodeURI(param.tag), param.tagtype], function(err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var addTag = function(param, connection, callback) {
    connection.execute(SQL.addTag, [decodeURI(param.tag), param.tagtype], function(err, result) {
        if (err) { console.error(err.message); return; }
        findTag(param, connection, function(TagList) {
            callback(TagList[0][0]);
        });
    });
};

var deleteTag = function(TagID, connection) {
    connection.execute(SQL.deleteTag, [TagID], function(err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var checkRelation = function(param, TagID, connection, callback) {
    connection.execute(SQL.checkRelation, [TagID, param.sightid, param.userid], function(err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var relateTag = function(param, TagID, connection) {
    connection.execute(SQL.relateTag, [TagID, param.sightid, param.userid], function(err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var unrelateTag = function(param, TagID, connection) {
    connection.execute(SQL.unrelateTag, [TagID, param.sightid, param.userid], function(err, result) {
        if (err) { console.error(err.message); return; }
    });
};

var findSightTag = function(param, connection, callback) {
    connection.execute(SQL.findSightTag, [param.sightid], function(err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows);
    });
};

var findTagID = function(param, connection, callback) {
    connection.execute(SQL.findTagID, [param.tagid], function(err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows[0]);
    });
};

var calNumSight = function(TagID, connection, callback) {
    connection.execute(SQL.calNumSight, [TagID], function(err, result) {
        if (err) { console.error(err.message); return; }
        var NumSight = result.rows[0][0];
        connection.execute(SQL.updateNumSight, [NumSight, TagID], function(err, result) {
            if (err) { console.error(err.message); return; }
        });
        callback(NumSight);
    });
};

var calNumUser = function(param, TagID, connection, callback) {
    connection.execute(SQL.calNumUser, [TagID, param.sightid], function(err, result) {
        if (err) { console.error(err.message); return; }
        callback(result.rows[0][0]);
    });
};

module.exports = {
    newTag: function (req, res, next, callback) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findTag(param, connection, function(TagList) {
                if (!Object.keys(TagList).length) {
                    addTag(param, connection, function(TagID) {
                        relateTag(param, TagID, connection)
                        callback(req, res, next, TagID);
                    });
                } else {
                    var TagID = TagList[0][0];
                    checkRelation(param, TagID, connection, function(TagIDList) {
                        if (!Object.keys(TagIDList).length) {
                            relateTag(param, TagID, connection)
                        } else {
                            unrelateTag(param, TagID, connection);
                        }
                        callback(req, res, next, TagID);
                    });
                }
            });

            connection.close();
        });
    },
    
    calNum: function(req, res, next, TagID) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            calNumSight(TagID, connection, function(NumSight) {
                if(!NumSight)
                    deleteTag(TagID, connection);
            });
            calNumUser(param, TagID, connection, function(NumUser) {
                res.send({
                    "numuser": NumUser
                });
            });
            connection.close();
        });
    },

    searchSightTag: function(req, res, next) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findSightTag(param, connection, function(TagList) {
                var len = Object.keys(TagList).length;
                var jsonify = function(info, index) {
                    if(index == len) {
                        res.send({
                            "tagid": info
                        });
                    } else {
                        info.push(TagList[index][0]);
                        jsonify(info, index + 1);
                    }
                };
                jsonify([], 0);
            });
            connection.close();
        });
    },

    viewSightTag: function(req, res, next) {
        oracledb.getConnection(LoginConf, function(err, connection) {
            if (err) { console.error(err.message); return; }
            var param = req.query || req.params;
            findTagID(param, connection, function(TagInfo) {
                if(!Object.keys(TagInfo).length) {
                    res.send('-1');
                } else {
                    calNumUser(param, param.tagid, connection, function(NumUser) {
                        res.send({
                            "tagid":    TagInfo[0],
                            "tagtype":  TagInfo[1],
                            "tag":      TagInfo[2],
                            "numuser":  NumUser
                        });
                    });
                }
            });
            connection.close();
        });
    }
};

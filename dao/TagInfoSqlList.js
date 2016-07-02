var SQLList = {
    findTag: "SELECT TAGID FROM TAG_LIST WHERE TAG = :tag AND TAGTYPE = :tagtype",
    addTag: "INSERT INTO TAG_LIST (TAG, TAGTYPE) VALUES (:tag, :tagtype)",
    deleteTag: "DELETE FROM TAG_LIST WHERE TAGID = :tagid",
    checkRelation: "SELECT TAGID FROM TAG_RELATION WHERE TAGID = :tagid AND SIGHTID = :sightid AND USERID = :userid",
    relateTag: "INSERT INTO TAG_RELATION (TAGID, SIGHTID, USERID) VALUES (:tagid, :sightid, :userid)",
    unrelateTag: "DELETE FROM TAG_RELATION WHERE TAGID = :tagid AND SIGHTID = :sightid AND USERID = :userid",
    findSightTag: "SELECT TAGID FROM TAG_RELATION WHERE SIGHTID = :sightid GROUP BY TAGID",
    findTagID: "SELECT TAGID,TAGTYPE,TAG FROM TAG_LIST WHERE TAGID = :tagid",
    calNumSight: "SELECT COUNT(SIGHTID) FROM TAG_RELATION WHERE TAGID = :tagid",
    calNumUser: "SELECT COUNT(USERID) FROM TAG_RELATION WHERE TAGID = :tagid AND SIGHTID = :sightid",
    updateNumSight: "UPDATE TAG_LIST SET NUMSIGHT = :numsight WHERE TAGID = :tagid"
};

module.exports = SQLList;


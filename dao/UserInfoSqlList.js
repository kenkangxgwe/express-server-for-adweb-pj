var SQLList = {
    addUser: "INSERT INTO USER_INFO (USERNAME, PASSWORD) VALUES (:username, :password)",
    findUserName: "SELECT USERID FROM USER_INFO WHERE USERNAME = :username",
    findUserID: "SELECT USERNAME,AVATAR FROM USER_INFO WHERE USERID = :userid",
    checkUser: "SELECT USERID FROM USER_INFO WHERE USERNAME = :username AND PASSWORD = :password",
    findSightID: "SELECT SIGHTID FROM SIGHT_INFO WHERE SIGHTID = :sightid",
    updateAvatar: "UPDATE USER_INFO SET AVATAR = :avatar WHERE USERID = :userid",
    updatePassword: "UPDATE USER_INFO SET PASSWORD = :password WHERE USERID = :userid",
    addFav: "INSERT INTO USER_FAV (USERID, SIGHTID) VALUES (:userid, :sightid)",
    delFav: "DELETE FROM USER_FAV WHERE USERID = :userid AND SIGHTID = :sightid",
    searchFav: "SELECT SIGHTID FROM USER_FAV WHERE USERID = :userid",
    addWish: "INSERT INTO USER_WISH (USERID, SIGHTID) VALUES (:userid, :sightid)",
    delWish: "DELETE FROM USER_WISH WHERE USERID = :userid AND SIGHTID = :sightid",
    searchWish: "SELECT SIGHTID FROM USER_WISH WHERE USERID = :userid",
    addStep: "INSERT INTO USER_STEP (USERID, SIGHTID) VALUES (:userid, :sightid)",
    delStep: "DELETE FROM USER_STEP WHERE USERID = :userid AND SIGHTID = :sightid",
    searchStep: "SELECT SIGHTID FROM USER_STEP WHERE USERID = :userid",
    findGrade: "SELECT GRD FROM SIGHT_GRD WHERE USERID = :userid AND SIGHTID = :sightid",
    addGrade: "INSERT INTO SIGHT_GRD (USERID, SIGHTID, GRD) VALUES (:userid, :sightid, :grd)",
    updateGrade: "UPDATE SIGHT_GRD SET GRD = :grd WHERE USERID = :userid AND SIGHTID = :sightid",
    findComment: "SELECT CMTID FROM CMT_LIST WHERE USERID = :userid AND SIGHTID = :sightid AND TIMESTAMP = :timestamp",
    addComment: "INSERT INTO CMT_LIST(USERID, SIGHTID, TIMESTAMP, CMT) VALUES(:userid, :sightid, :timestamp, :cmt)",
    findMedia: "SELECT MEDIAID FROM MEDIA_LIST WHERE USERID = :userid AND SIGHTID = :sightid AND TIMESTAMP = :timestamp",
    addMedia: "INSERT INTO MEDIA_LIST(USERID, SIGHTID, TIMESTAMP, MEDIAURL) VALUES(:userid, :sightid, :timestamp, :mediaurl)"
};

module.exports = SQLList;


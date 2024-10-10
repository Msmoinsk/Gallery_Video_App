export class Post {
    constructor(_id, imgUrl, userID, caption){
        this._id = _id;
        this.imgUrl = imgUrl;
        this.userID = userID
        this.caption = caption;
    }
}
export class Vid {
    constructor(_id, videoUrl, userID, caption){
        this._id = _id;
        this.videoUrl = videoUrl;
        this.userID = userID
        this.caption = caption;
    }
}

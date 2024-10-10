import { StatusCodes } from 'http-status-codes'
// import Post from '../models/post_modal.js'
import { Vid } from '../models/post_modal.js';
import app from '../connections/firebase_connect.js'
import { getFirestore, collection, getDocs, setDoc, doc, query, where, updateDoc, getDoc, deleteDoc } from 'firebase/firestore/lite';
import next from 'next';
const db = getFirestore(app);

export const uploadVideo = async (req, res) => {
    const {
        body: { videoUrl, caption },
        userData: { userID, username }
    } = req

    const postData = {
        videoUrl,
        caption,
        userID
    }
    
    const postsCol = collection(db, 'videos');
    await setDoc(doc(postsCol), postData);

    res.status(StatusCodes.OK).json({ msg: "Video added successfully." })
}

export const getVideo = async (req, res) => {
    try {
        const postCol = collection(db, 'videos');
        const q = query(postCol, where('userID', '==', req.userData.userID))
        const postsSnapshot = await getDocs(q);
        
        const post = []
        if (postsSnapshot.empty){
            res.status(StatusCodes.IM_A_TEAPOT).json({msg: "No Data Found"})
        } else {
            postsSnapshot.docs.forEach( doc => {
                const single_post = new Vid(
                    doc.id,
                    doc.data().videoUrl,
                    doc.data().userID,
                    doc.data().caption,
                )
                post.push(single_post)
            })
            res.status(StatusCodes.OK).json({
                msg: "Here are the videos",
                video : post,
                videos_length : post.length
            })
        }
        
    } catch (error) {
        next(error)
    }
}

export const updateVideo = async(req, res) => {
    const {
        params: { id },
        body: { caption },
        userData: { userID }
    } = req

    try {
        const postRef = doc(db, "videos", id);
        const postsSnapshot = await getDoc(postRef)
        const testData = postsSnapshot.data()

        if(testData === undefined || testData.userID !== userID){
            res.status(StatusCodes.FORBIDDEN).json({ msg: "You are not allowed to edit this data" })
        } else {
            await updateDoc(postRef, {
                caption: caption
            }); 
            
            res.status(StatusCodes.OK).json({testData})
        }        
    } catch (error) {
        next(error)
    }
}

export const deleteVideo = async(req, res) => {
    const {
        params: { id },
        userData: { userID }
    } = req

    try {
        const postRef = doc(db, 'videos', id)
        const postDoc = await getDoc(postRef)
        const postData = postDoc.data()

        if(postData === undefined || postData.userID !== userID){
            res.status(StatusCodes.FORBIDDEN).json({ msg: "You are not allowed to edit this data" })
        } else {
            await deleteDoc(postRef)
            res.status(StatusCodes.OK).json({ msg: "Data been deleted." })
        }

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "deletion process is interupted." })
    }

}

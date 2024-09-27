import { StatusCodes } from 'http-status-codes'
import Post from '../models/post_modal.js'
import app from '../connections/firebase_connect.js'
import { getFirestore, collection, getDocs, setDoc, doc, query, where, updateDoc, getDoc, deleteDoc } from 'firebase/firestore/lite';
import next from 'next';
const db = getFirestore(app);

export const uploadImg = async (req, res) => {
    const {
        body: { imgUrl, caption },
        userData: { userID, username }
    } = req
    // console.log(userID)

    const postData = {
        imgUrl,
        caption,
        userID
    }
    
    const postsCol = collection(db, 'posts');
    await setDoc(doc(postsCol), postData);

    res.status(StatusCodes.OK).json({ msg: "Post added successfully." })
}

export const getImg = async (req, res) => {
    try {
        const postCol = collection(db, 'posts');
        const q = query(postCol, where('userID', '==', req.userData.userID))
        const postsSnapshot = await getDocs(q);
        
        const post = []
        if (postsSnapshot.empty){
            res.status(StatusCodes.BAD_REQUEST).json({msg: "No Data Found"})
        } else {
            postsSnapshot.docs.forEach( doc => {
                const single_post = new Post(
                    doc.id,
                    doc.data().imgUrl,
                    doc.data().userID,
                    doc.data().caption,
                )
                post.push(single_post)
            })
            res.status(StatusCodes.OK).json({
                msg: "Here are the post",
                posts : post,
                post_length : post.length
            })
        }
        
    } catch (error) {
        // console.log(error);
        next(error)
    }
}

export const updateImg = async(req, res) => {
    const {
        params: { id },
        body: { caption },
        userData: { userID }
    } = req

    try {
        const postRef = doc(db, "posts", id);
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

        // await updateDoc(postColRef, {
        //     caption: caption
        // })
        // const updateResponse = await setDoc(doc(db, "posts", id), {"caption": caption});
        // const postsSnapshot = await getDoc(postRef)
        // const testData = postsSnapshot.data()

        
    } catch (error) {
        // console.log(error)
        next(error)
    }
}

export const deleteImg = async(req, res) => {
    const {
        params: { id },
        userData: { userID }
    } = req

    try {
        const postRef = doc(db, 'posts', id)
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
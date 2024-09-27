import StatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { getFirestore, collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore/lite';
import app from '../connections/firebase_connect.js'
const db = getFirestore(app);

export const singUp = async(req, res) => {
    const {
        body: { username, email, password }
    } = req
    if(!username || !password || !email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Provide the Credentials : username, email, password"
        })
    }

    const usersCol = collection(db, 'users');
    const q = query(usersCol, where('username', "==", username));
    const usersSnapshot = await getDocs(q)

    if(usersSnapshot.empty){
        const hashedPassword = bcrypt.hashSync(password)
        const user_data = {
            email :email,
            password: hashedPassword,
            username: username
        }

        await setDoc(doc(usersCol), user_data);
        const qr = query(usersCol, where('username', "==", username));
        const usersSnapshots = await getDocs(qr)
        const user_id = usersSnapshots.docs.map(doc => doc.id);

        const jwttoken = jwt.sign({
            userID : user_id[0],
            username
        }, process.env.JWT_SECRET, {
            expiresIn: '3d'
        })
        
        res.status(StatusCodes.OK).json({
            msg: "User is been Created successfully",
            username: username,
            token: jwttoken
        })
    } else {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: "Unique Username is required." })
    }

    
}

export const login = async(req, res) => {
    const {
        body: { username, password }
    } = req

    if(!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Provide all credentials"})
    }

    const userCol = collection(db, 'users')
    const q = query(userCol, where('username', "==", username));
    const usersSnapshot = await getDocs(q)

    if(!usersSnapshot.empty){
        const user_id_password = usersSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                password: doc.data().password
            }
        });
        // console.log(user_id_password[0]);
        
        const comparePassword = bcrypt.compareSync(password, user_id_password[0].password)
        if(!comparePassword) {
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: "Password Is incorrect"
            })
        } else {
            const jwttoken = jwt.sign({
                userID : user_id_password[0].id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '3d'
            })
            
            res.status(StatusCodes.OK).json({
                msg: "User is been Created successfully",
                username: username,
                token: jwttoken,
            })
        }
    } else {
        res.status(StatusCodes.BAD_GATEWAY).json({ msg: "User does not exxist." })
    }

}
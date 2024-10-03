import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../Connection/firebase_connect';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'

function FormExample(props) {
    const [validated, setValidated] = useState(false);
    const token = localStorage.getItem('token')

    const[image, setImage] = useState(undefined)
    const[video, setVideo] = useState(undefined)
    const[caption, setCaption] = useState(undefined)

    const [inputs, setInputs] = useState({})

    const[imgPercentage, setImgPercentage] = useState(0)
    const[videoPercentage, setVideoPercentage] = useState(0)

    // From here the images and the data been added to the storage before sending the url to the data base
    useEffect(()=>{
        image && uploadFile(image, "imgUrl")
    }, [image])
    useEffect(()=>{
        video && uploadFile(video, "videoUrl")
    }, [video])

    // To upload the file to the Storage of Firebase
    const uploadFile = (file, fileType) => {
        const storage = getStorage(app);
        const folder = fileType === 'imgUrl' ? 'images/' : 'videos/'
        const fileName = new Date().getTime() + file.name

        const storageRef = ref(storage, folder + fileName); // folder+fileName == images/1234124img.png
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Here we will upload the Files to the storage
        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                
                fileType === "imgUrl"
                ?   setImgPercentage(Math.round(progress))
                :   setVideoPercentage(Math.round(progress))
                
                switch (snapshot.state) {
                    case 'paused':
                        console.log("Upload is Paused");
                        break;
                    
                    case 'running':
                        console.log("Upload is Running");
                        break

                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log(error);
                        break;
                    case 'storage/canceled':
                        break
                    case 'storage/unknown':
                        break
                
                    default:
                        break;
                }
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    console.log('DownloadUrl - ', downloadUrl);
                    setInputs((prev) => {
                        return{
                            ...prev,
                            [fileType]: downloadUrl,
                        }
                    })
                })
            }
        )
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false || imgPercentage !== 100) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        event.preventDefault()
            try {
                const response = await axios.post('http://localhost:8800/api/v1/user/img/upload', {
                    ...inputs,
                    caption: caption
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`  
                    }
                })
                alert(response.data.msg);
            } catch (error) {
                alert(error.response.data.msg)
            }
            props.setShow(false)
    };

  return (
    <Form noValidate validated={validated} method='POST' onSubmit={handleSubmit}>
        <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Caption</Form.Label> 
            <Form.Control type="text" onChange={(e)=>{ setCaption((prev) => e.target.value) }} placeholder="Caption" required />
            <Form.Control.Feedback type="invalid">
            Please provide a Caption For Your Image.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="position-relative mb-3">
            <Form.Label>File</Form.Label> { imgPercentage > 0 && "Uploading: "+ imgPercentage + " %" }
            <Form.Control
                type="file"
                required
                name="file"
                onChange={(e)=>{ setImage((prev) => e.target.files[0]) }}
            />
            <Form.Control.Feedback type="invalid" tooltip>
                Please choose an Image.
            </Form.Control.Feedback>
        </Form.Group><br />
        {
            imgPercentage === 100 
            ? <Button type="submit">Submit form</Button>
            :<LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />}variant="outlined">Save</LoadingButton> 
        }
    </Form>
  );
}

export default FormExample;



// const Form = (props) => {
//     const token = localStorage.getItem('token')

//     const[image, setImage] = useState(undefined)
//     const[video, setVideo] = useState(undefined)
//     const[caption, setCaption] = useState(undefined)

//     const [inputs, setInputs] = useState({})

//     const[imgPercentage, setImgPercentage] = useState(0)
//     const[videoPercentage, setVideoPercentage] = useState(0)

//     // From here the images and the data been added to the storage before sending the url to the data base
//     useEffect(()=>{
//         image && uploadFile(image, "imgUrl")
//     }, [image])
//     useEffect(()=>{
//         video && uploadFile(video, "videoUrl")
//     }, [video])

//     // To upload the file to the Storage of Firebase
//     const uploadFile = (file, fileType) => {
//         const storage = getStorage(app);
//         const folder = fileType === 'imgUrl' ? 'images/' : 'videos/'
//         const fileName = new Date().getTime() + file.name

//         const storageRef = ref(storage, folder + fileName); // folder+fileName == images/1234124img.png
//         const uploadTask = uploadBytesResumable(storageRef, file);

//         // Here we will upload the Files to the storage
//         uploadTask.on('state_changed', 
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                
//                 fileType === "imgUrl"
//                 ?   setImgPercentage(Math.round(progress))
//                 :   setVideoPercentage(Math.round(progress))
                
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log("Upload is Paused");
//                         break;
                    
//                     case 'running':
//                         console.log("Upload is Running");
//                         break

//                     default:
//                         break;
//                 }
//             },
//             (error) => {
//                 console.log(error);
//                 switch (error.code) {
//                     case 'storage/unauthorized':
//                         console.log(error);
//                         break;
//                     case 'storage/canceled':
//                         break
//                     case 'storage/unknown':
//                         break
                
//                     default:
//                         break;
//                 }
//             }, 
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
//                     console.log('DownloadUrl - ', downloadUrl);
//                     setInputs((prev) => {
//                         return{
//                             ...prev,
//                             [fileType]: downloadUrl,
//                         }
//                     })
//                 })
//             }
//         )
//     }

//     // Calling the Api to add the data to the database
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const response = await axios.post('http://localhost:8800/api/v1/user/img/upload', {
//                 ...inputs,
//                 caption: caption
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`  
//                 }
//             })
//             alert(response.data.msg);
//         } catch (error) {
//             alert(error.response.data.msg)
//         }
//         props.setShow(false)
//     }

//     return (
//         <div className='upload'>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="caption">Caption : </label>
//                 <br />
//                 <input type="text" id='caption' 
//                 onChange={(e)=>{ setCaption((prev) => e.target.value) }}
//                 />
//             </div><br />
//             <div>
//                 <label htmlFor="img">Images : </label> { imgPercentage > 0 && "Uploading: "+ imgPercentage + " %" }
//                 <br />
//                 <input type="file" accept='images/*' id='img' 
//                 onChange={(e)=>{ setImage((prev) => e.target.files[0]) }}
//                 />
//             </div><br />
//             <div>
//                 <label htmlFor="video">Video : </label>  { videoPercentage > 0 && "Uploading: "+ videoPercentage + " %" }
//                 <br />
//                 <input type="file" accept='video/*' id='video' 
//                 onChange={(e)=>{ setVideo((prev) => e.target.files[0]) }}
//                 />
//             </div><br />
//             <button type='submit'>Upload</button>
//         </form>
//         </div>
//     )
// }

// export default Form

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NameContext } from '../LoginSignUp/LoginSignUp'

import '../../Styles/gallery.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/joy/ButtonGroup';


const GetImages = () => {
    const token = localStorage.getItem('token')
    const { name } = useContext(NameContext)
    const [posts, setPosts] = useState([])
    const [toggleEdit, setToggleEdit] = useState({})

    // To Get the Images
    useEffect(()=>{
        if (token) {
            const requestImages = async() => {
                const imagesData = await axios.get('http://localhost:8800/api/v1/user/img/images', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).catch(
                  function(error){
                    if (error.response) {
                      console.log(error.response.data.msg);
                    }
                  }
                )
                if(imagesData !== undefined) setPosts(imagesData.data.posts)
            }
            requestImages()
        }
    }, [name])

    // To delete the Images
    const deletePost = (id) => {
      if (token) {
        try {
            const deleteImage = async() => {
              const newPostList = posts.filter((post) => post._id !== id )
              setPosts(newPostList)
              
              const imagesData = await axios.delete(`http://localhost:8800/api/v1/user/img/image/${id}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              })
              alert(imagesData.data.msg)
            }
            deleteImage()

        } catch (error) {
            console.log(error)
            console.log(error.response.data.msg)
        }
      } else {
        alert('You Cannot delete this post')
      }
    }

    // To Make the Edit Posible
    const editPost = (event) => {
      const targetID = event.target.id
      const tagName = event.target.tagName

      if(!token) { 
        alert('You Need To login First')
      } else {
        let parentnode;
        let captionEdit;

        if(tagName === 'BUTTON'){
          parentnode = event.target.parentNode.parentNode.parentNode.parentNode

          captionEdit = parentnode.childNodes[2].childNodes[0]
          captionEdit.setAttribute('contenteditable', 'true')
        } else if (tagName === 'svg'){
          parentnode = event.target.parentNode.parentNode.parentNode.parentNode.parentNode

          captionEdit = parentnode.childNodes[2].childNodes[0]
          captionEdit.setAttribute('contenteditable', 'true')
        } else if (tagName === 'path'){
          parentnode = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        }

        setToggleEdit( input => ({
          ...input,
          isEdit: true,
          btnID: targetID
        }))
      }
    }

    // To Save the Changes
    const saveEdit = (event) => {
      const targetID = event.target.id
      const tagName = event.target.tagName

      let parentnode;
      let captionEditSave;;

      if(tagName === 'BUTTON'){
        parentnode = event.target.parentNode.parentNode.parentNode.parentNode
      } else if (tagName === 'svg'){
        parentnode = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
      } else if (tagName === 'path'){
        parentnode = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
      }

      captionEditSave = parentnode.childNodes[2].childNodes[0]
      const caption = captionEditSave.innerHTML
      captionEditSave.setAttribute('contenteditable', 'false')

      if (token && targetID) {
        try {
            const editCaption = async() => {
                const imagesData = await axios.put(`http://localhost:8800/api/v1/user/img/image/${targetID}`, {
                  caption: caption
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                const savePosts = posts.map( post => 
                  post._id === targetID 
                  ? {
                    ...post,
                    caption: caption
                  }
                  : post
                )
                setPosts(savePosts)

                console.log(imagesData.data)
            }
            editCaption()
        } catch (error) {
            console.log(error)
            console.log(error.response.data.msg)
        }
      } else {
        alert('Please Login First If you want to Save the Changes')
      }
      
      setToggleEdit( input => ({
        ...input,
        isEdit: false,
        btnID: targetID
      }))
    }

  return (
    <div className='image-container'>
        {
            posts.length !== 0
            ?
                posts.map( (post) => {
                         
                        return(
                          <Card sx={{ maxWidth: 345 }} key={post._id}>
                            <CardHeader
                              avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                  {localStorage.getItem('username') !== null ? localStorage.getItem('username').charAt(0) : "A"}
                                </Avatar>
                              }
                              action={
                                <ButtonGroup
                                    buttonFlex={1}
                                    aria-label="flex button group"
                                    sx={{
                                      p: 1,
                                      width: 120,
                                      maxWidth: '100%',
                                      overflow: 'auto',
                                      gap: 2,
                                      display: 'flex'
                                    }}
                                  >

                                    <IconButton aria-label="delete" id={post._id} color="primary" onClick={toggleEdit.isEdit && toggleEdit.btnID === post._id ? event => saveEdit(event) : event => editPost(event)} >
                                      {
                                        toggleEdit.isEdit && toggleEdit.btnID === post._id
                                        ? <SaveAltIcon id={post._id} />
                                        : <EditIcon id={post._id} />
                                      }
                                    </IconButton>

                                    <IconButton aria-label="delete" color='error' onClick={() => deletePost(post._id)}>
                                      <DeleteIcon />
                                    </IconButton>

                                </ButtonGroup>
                              }
                              title={localStorage.getItem('username') !== null ? localStorage.getItem('username') : "User"}
                            />
                          <CardMedia
                            component="img"
                            height="194"
                            image={post.imgUrl}
                            alt="Paella dish"
                          />
                          <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {post.caption}
                            </Typography>
                          </CardContent>
                        </Card>
                        )
                })
            : <h3>No Post Available </h3>
        }
    </div>
  )
}

export default GetImages
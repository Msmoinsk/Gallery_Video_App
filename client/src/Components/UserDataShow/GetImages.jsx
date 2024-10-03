import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NameContext } from '../LoginSignUp/LoginSignUp'

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import '../../Styles/gallery.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/joy/ButtonGroup';


const GetImages = () => {
    const token = localStorage.getItem('token')
    const { name } = useContext(NameContext)
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        if (token) {
            try {
                const requestImages = async() => {
                    const imagesData = await axios.get('http://localhost:8800/api/v1/user/img/images', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setPosts(imagesData.data.posts)
                }
                requestImages()
            } catch (error) {
                console.log(error)
                console.log(error.response.data.msg)
            }
        }
    }, [name])

    const deletePost = (id) => {
      if (token) {
        try {
            const deleteImage = async() => {
                const imagesData = await axios.delete(`http://localhost:8800/api/v1/user/img/image/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                alert(imagesData.data.msg)
                
                const newPostList = posts.filter((post) => post._id !== id )
                setPosts(newPostList)
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

  return (
    <div className='image-container'>
        {
            posts.length !== 0
            ?
                posts.map( (post, index) => {
                         
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

                                    <IconButton aria-label="delete" color="primary">
                                      <EditIcon />
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
                          <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                              <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                              <ShareIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                        )
                })
            : <h3>No Post Available </h3>
        }
    </div>
  )
}

export default GetImages
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NameContext } from '../LoginSignUp/LoginSignUp'

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import '../../Styles/gallery.css';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));
  


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

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

  return (
    <div className='image-container'>
        {
            posts.length !== 0
            ?
                posts.map( (post, index) => {
                         
                        return(
                        <Card sx={{ maxWidth: 400 }} key={post._id}>
                            <CardHeader
                                avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
                                }
                                action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                                }
                                title="Shrimp and Chorizo Paella"
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                component="img"
                                height="200"
                                image={post.imgUrl}
                                alt="Paella dish"
                            />
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                <Typography sx={{ marginBottom: 2 }} >{post.caption}</Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                        )
                })
            : <h3>No Post Available </h3>
        }
    </div>
  )
}

export default GetImages

                        // <Card sx={{ maxWidth: 400 }} key={index} >
                        //     <CardActionArea>
                        //         <CardHeader
                        //             avatar={
                        //             <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        
                        //             </Avatar>
                        //             }
                        //             action={
                        //             <IconButton aria-label="settings">
                        //                 <MoreVertIcon />
                        //             </IconButton>
                        //             }
                        //             title="Shrimp and Chorizo Paella"
                        //             subheader="September 14, 2016"
                        //         />
                        //         <CardMedia
                        //         component="img"
                        //         height="250"
                        //         image={post.imgUrl}
                        //         alt="green iguana"
                        //         />
                        //         <CardContent>
                        //         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        //             {post.caption}
                        //         </Typography>
                        //         </CardContent>
                        //     </CardActionArea>
                        // </Card>
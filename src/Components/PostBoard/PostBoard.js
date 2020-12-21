import React from 'react'
import Axios from 'axios'

import Post from '../Post/Post'
import PostForm from '../PostForm/PostForm'

import './PostBoard.scss'



export default class PostBoard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            loading: false,
            showForm: false,
        }   
    }

    styles = {
        "postBoard" : {
            "width" : '42%',
            "height" : '100%',
            "position" : 'relative',
            "display" : 'flex',
            "flexWrap" : 'wrap',
            "justifyContent" : 'space-evenly',
            "alignItems" : 'center',
        },
        "header" : {
            "width" : '100%',
            "display" : 'flex',
            "justifyContent" : 'center',
            "alignItems" : 'center',
            "color" : 'white',
            "fontSize" : '32px'
        },
        "loading" : {
            "height" : '100vh',
            "width" : '100vw',
            "display" : 'flex',
            "justifyContent" : 'center',
            "alignItems" : 'center'
        },
        "buttons" : {
            "width" : '80%',
            "max-width" : '500px',
            "display" : 'flex',
            "justifyContent" : 'space-between',
            "marginTop" : '20px',
            "marginBottom" : '20px'
        },
        "button" : {
            "height" : '30px',
            "width" : '120px',
            "background" : 'transparent',
            "border" : '1px solid white',
            "color" : 'white',
            "cursor" : 'pointer'
        }
    }

    componentDidMount(){
        this.getPosts({})
    }

    setNewPost = (newPost) => {
        this.getPosts(newPost)
    }

    closeForm = (event) => {
        if (event) {
            if (event.target.id === "form-close" || event.target.id === "form-close-button" || event.target.id === "form-grey"){
                this.setState({
                    showForm: false
                })
            }
        } else {
            this.setState({
                showForm: false
            })
        }
    }

    getPosts = (newPost) => {
        this.setState({
            loading: true
        })
        Axios.get('https://say-hello-server.herokuapp.com/post')
        .then((posts) => {
            console.log(posts)
            let postsArray = []
            posts.data.forEach(post => {
                postsArray.push(post)
                console.log(post.posted)
            });
            postsArray.pop()
            if (newPost){
                console.log("newPOst")
                if (Object.keys(newPost).length > 0) {
                    postsArray[0] = newPost
                }
            }
            this.setState({
                posts : postsArray,
                loading : false
            })
        })
    }

    renderPosts = () => {
        if (this.state.loading){
            return <div style={this.styles.loading}> <h1> Loading... </h1> </div>
        }
        return this.state.posts.map((post) => {
            return (
                <Post message={post.message} color={post.color} emoji={post.emoji} date={post.posted} name={post.name} />
            )
        })
    }

    newPostClicked = () => {
        let current = this.state.showForm
        console.log(current)
        this.setState({
            showForm: !current
        })
    }

    render(){
        return(
        <div className="postboard-container" style={this.styles.postBoard}>
            <div className="postboard-header" style={this.styles.header}>
                <h1>
                    Say Hello
                    {this.props.isMobile}
                </h1>
            </div>
            <div className="postboard-buttons" style={this.styles.buttons}>
                <button onClick={this.newPostClicked} style={this.styles.button} >
                    Create a Post
                </button>
                <button onClick={() => this.getPosts({})} style={this.styles.button}>
                    Get New Posts
                </button>
            </div>
            {this.renderPosts()}
            {this.state.showForm === true && <PostForm showForm={this.state.showForm} closeForm={this.closeForm} setNewPost={this.setNewPost} /> }
        </div>)
    }
}
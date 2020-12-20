import React from 'react'
import Axios from 'axios'
import Post from '../Post/Post'
import {UilTimes} from '@iconscout/react-unicons'

export default class PostForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            message: "Sample Message",
            name: "John Doe",
            emoji: "🐶",
            color: "#2b95dbcc",
            date: "",
            errorMessage: ""
        }
    }

    componentDidMount(){
        let today = new Date()
        this.setState({
            date : today.toUTCString()
        })
    }

    styles = {
        "postFormContainer": {
            "width" : '100%',
            "height" : '100%',
            "display" : 'flex',
            "justifyContent" : 'center',
            "alignItems" : 'center',
            "backgroundColor" : 'rgba(53, 80, 112, .5)',
            "position" : 'fixed',
            "zIndex" : '80',
            "top" : '50%',
            "transform" : 'translateY(-50%)'
        },
        "postFormContent" : {
            "width" : '340px',
            "height" : '400px',
            "position" : 'relative',
            "display" : 'flex',
            "flex-direction" : 'column',
            "justifyContent" : 'space-evenly',
            "alignItems" : 'center',
            "background" : '#B56576',
            "color" : 'white',
            "border" : '1px solid white',
        },
        "close" : {
            "position" : 'absolute',
            "right" : '5px',
            "top" : '5px',
            "cursor" : 'pointer',
            "border" : 'none',
            "background" : 'transparent'
        },
        "form" : {
            "width" : '100%',
            "display" : 'flex',
            "flexDirection" : 'column',
            "alignItems" : 'center',
            "fontSize" : '18px'
        },
        "label" : {
            "width"  : '80%',
            "display" : 'flex',
            "justifyContent" : 'space-between',
            "marginTop" : '10px',
            "marginBottom" : '10px'
         },
         "input" : {
            "border" : 'none',
            "background" : 'none',
            "borderBottom" : '1px solid white',
            "fontSize" : '15px'
         },
         "formRow" : {
            "width" : '80%',
            "display" : 'flex',
            "justifyContent" : 'space-between'
        },
        "button" : {
            "width" : '80px',
            "height" : '30px',
            "background" : 'transparent',
            "border" : '1px solid white',
            "color" : 'white',
            "fontSize" : '18px',
            "cursor" : 'pointer',
        }
    }

    handleChange = (event) => {
        let current = this.state
        current[event.target.id] = event.target.value
        this.setState(current)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        Axios.post('https://say-hello-server.herokuapp.com/post' , {
            message: this.state.message,
            name: this.state.name,
            emoji: this.state.emoji,
            color : this.state.color
        })
        .then((res) => {
            if (res.status === 200){
                this.props.setNewPost({
                    message: this.state.message,
                    name: this.state.name,
                    emoji: this.state.emoji,
                    color : this.state.color,
                    posted: this.state.date
                })
                this.props.closeForm()
            } 
        })
        .catch((error) => {
            if (error.response) {
                let code = error.response.status
                if (code === 696) {
                    this.setState({
                        errorMessage: "Error: Post Contains Profanity"
                    })
                } else if (code === 322) {
                    this.setState({
                        errorMessage: "Error: Too Many Post Attempts"
                    })
                } else {
                    this.setState({
                        errorMessage: "Error: Something Went Wrong"
                    })
                }
            } else {
                this.setState({
                    errorMessage: "Error: Something Went Wrong"
                })
            }

        })
    }

    render(){
        return (
            <div id="form-grey" className="post-form-container" style={this.styles.postFormContainer} onClick={this.props.closeForm}>
                <div className="post-form-content" style={this.styles.postFormContent}>
                    <button id="form-close" style={this.styles.close} onClick={this.props.closeForm}>
                        <UilTimes size="30" color="white" id="form-close-button" />
                    </button>

                    <div className="post-header" style={{"textAlign" : 'center', "color" : 'white'}}>
                        <h1> New Post </h1>
                        <p> {this.state.errorMessage} </p>
                    </div>

                    <Post 
                            message={this.state.message}
                            name={this.state.name}
                            emoji={this.state.emoji}
                            color={this.state.color}
                            date={this.state.date}
                    />

                    <form style={this.styles.form} onSubmit={this.handleSubmit} >
                            <label style={this.styles.label}>
                                Name:
                                <input style={this.styles.input} type="text" maxLength="15" onChange={this.handleChange} value={this.state.name} id="name" />
                            </label>
                            <label style={this.styles.label}>
                                Message:
                                <input style={this.styles.input} type="text" maxLength="18" onChange={this.handleChange} value={this.state.message} id="message" />
                            </label>
                            <label style={this.styles.label}>
                                Emoji:
                                <select style={this.styles.input} type="text" maxLength="18" onChange={this.handleChange} id="emoji" value={this.state.emoji}>
                                    <option value=""> N/A </option> 
                                    <option value="😀"> 😀 </option>
                                    <option value="😂"> 😂 </option>
                                    <option value="👍"> 👍 </option>
                                    <option value="🐶"> 🐶 </option>
                                    <option value="🐱"> 🐱 </option>
                                    <option value="💯"> 💯 </option>
                                    <option value="🏳️‍🌈"> 🏳️‍🌈 </option>
                                    <option value="❤️"> ❤️ </option>
                                </select>
                            </label>
                            <label style={this.styles.label}>
                                Color:
                                <select style={this.styles.input} type="text" maxLength="18" onChange={this.handleChange} id="color" value={this.state.color}>
                                    <option value="#2b95dbcc"> Blue </option>
                                    <option value="#2bdb7afb"> Green </option>
                                    <option value="#dbbb2bfb"> Orange </option>
                                    <option value="#ec87c5bb"> Pink </option>
                                    <option value="#db2b60fb"> Red </option>
                                    <option value="#C0BE4b"> Yellow </option>
                                </select>
                            </label>

                            <button type="submit" style={this.styles.button}>
                                Post
                            </button>
                        </form>
                </div>
            </div>
        )
    }
}
import React from 'react'

export default function Post(props){

    let styles = {
        post : {
            "backgroundColor": props.color || 'rgba(236, 135, 197, 0.733)',
            "width" : '300px',
            "height" : '70px',
            "marginTop" : '5px',
            "marginBottom" : '5px',
            "border": '1px solid white',
            "padding" : '10px',
            "display" : 'flex',
            "color": 'white'
        },
        textSection : {
            "width" : '80%', 
            "height" : '100%',
            "display" : 'flex',
            "justifyContent" : 'space-between',
            "flexDirection" : 'column',
        },
        textHeader : {
            "fontSize" : '12px',
            "display" : 'flex',
            "width" : '80%',
            "justifyContent" : 'flex-start',
            "flexGrow" : '1' 
        },
        name : {
            "marginRight" : '10px  '
        },
        emoji : {
            "fontSize" : '40px',
            "width" : '20%',
            "height" : '100%',
            "display" : 'flex',
            "justifyContent" : 'center',
            "alignItems" : 'center'
        }
    }

    let getDate = (dateString) => {
        let date = new Date(dateString)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }

    return (
        <div className="post" style={styles.post}>

            <div className="text-section" style={styles.textSection}>
                <div className="text-header" style={styles.textHeader}>
                    <p className="post-name" style={styles.name}> {props.name} </p>
                    <p className="post-date"> {getDate(props.date)} </p>
                </div>
                <h2 className="post-message"> {props.message} </h2>
            </div>

            <div className="emoji-section" style={styles.emoji}>
                {props.emoji}
            </div>
            
        </div>
    )

}
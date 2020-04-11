import React from 'react'

export default function Topic(props) {
    let url = `https://www.freecodecamp.org/forum/t/${props.id}`
    let imgUrl="https://www.freecodecamp.org"
    let profile = "https://www.freecodecamp.org/forum/u/"
    return (
        <div className="topic">
            <div className="first">
                <div>
                <span>{props.index}</span>
                <span><a href={url} target="blank">{props.topic}</a></span>
                </div>
                <span>{props.images.map((index, key)=> {
                    let img_url = index.avatar_template
                    img_url = img_url.replace('{size}','24')
                    
                    return <a key={key} href={profile + index.username} target="blank"><img  src={imgUrl + img_url}></img></a>
                })}</span>
            </div>
            <div className="second">
                
                <span>{props.replies-1}</span>
                <span>{props.views}</span>
                <span>{props.activity}</span>
            </div>
          
        </div>
    )
}
import React from 'react'

const Avatar = (props) => {

    const {url,width = "150px",height= "150px"} = props;

    return (
        <div style={{width,height,margin:"auto"}}>
            <img src={url} alt="User" className="card-img-top rounded-circle" />
            
        </div>
    )
}

export default Avatar

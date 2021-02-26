import React from 'react'

const Input = (props) => {

   const {placeholder="Enter Placeholder Text",value,onChange,type = "text",name} = props

    return (
            <input
                className="form-control"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
    )
}

export default Input

import React, { SyntheticEvent, useState } from "react"


export default function Community () {

    const [formData, setFormData] = useState({
        title: "",
        post: "",
        date: "",
        time: "",
    })



    return <>
  <div>Hello World</div> 
  <button className='button'> Add Post </button>
  <button className='button'> Delete Post </button>
  <button className='button'> Update Post </button>

    </>

}
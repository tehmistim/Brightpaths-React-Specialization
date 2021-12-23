import { useState } from 'react';
import React from 'react';

export default function TextPreview() {
    const [name, setName] = useState('')

  return(

    <div className="wrapper">
      <div className="preview">
        <h2>Preview: { name }</h2>
      </div>
      <form>
        <label>
          <p>Name:</p>
          <input 
          autoComplete="off"
          name="name" 
          onChange={ event => {setName(event.target.value) }}/>
        </label>

      </form>
    </div>
  )
}
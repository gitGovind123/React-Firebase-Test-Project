import React, { useEffect, useState } from 'react';
import '../src/style/main.css'

function Channel({channel, onPostChange, onSubmit, onPostSelect, posts}) {

  return (
    <div className="channel">
      <div>
        <div className='channel-title'>
          <p>{channel}</p>
        </div>
        {posts && posts.map(val => {
          return <div className='channel-post'>
          <p style={{cursor: 'pointer'}} onClick={() => onPostSelect(val)}>{val.subject}</p>
        </div>
        })}
        <div>
            <label>Subject: </label>
            <input onChange={(e) => onPostChange(e, 'subject')} placeholder='Subject'/>
            <br/>            
        </div>
        <div className="text_input">
            <label>Body: </label>
            <textarea onChange={(e) => onPostChange(e, 'body')} placeholder='Post Body'></textarea>
        </div>
        <button onClick={onSubmit}>Submit</button>
        <div>
          <p> </p>
        </div>
      </div>
    </div>
  );
}

export default Channel;

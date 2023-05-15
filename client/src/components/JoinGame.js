import React, { useState } from 'react';
import {useChatContext, Channel} from 'stream-chat-react'
import Game from './Game.js'
import CustomInput from './CustomInput.js'

function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const {client} = useChatContext();
  const [channel, setChannel] = useState(null);
  //Function to create the comunication between myself and the other person
  const createChannel = async () => {
    const response = await client.queryUsers({name: { $eq: rivalUsername}});

    if (response.users.length === 0){
      alert("User not found");
      return; 
    }

    // function to create the channel 
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id], //get my id and the rival id
    });

    // call this to participate on channel 
    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel}/>
        </Channel>
      ) : (
        <div className='joinGame'>
          <h4>Create Game</h4>
          <input 
            placeholder='Username of rival...'
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}>Join/Start Game</button>
        </div>
      )}
    </>
  )
}

export default JoinGame
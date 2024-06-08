import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io  from 'socket.io-client'
import { addMessage, setUsername } from '../Redux/chatSlice'
import { Button } from 'react-bootstrap'
// import { socketIo } from 'socket.io-client'



const socket = io("http://localhost:5000/")
const Chat = () => {
    const [message,setMessage] = useState("");
    const [inputUsername, setInputUsername] = useState("");
    const username = useSelector((state) => state.chat.username);
    const messages = useSelector((state) => state.chat.messages);
    // const {username,messages} = useSelector((state)=>state.chatReducer)
    const dispatch = useDispatch();

    useEffect(() => {
      socket.on("chat message", (msg) => {
        console.log(msg);
          dispatch(addMessage(msg));
      });

      return () => {
          socket.off("chat message");
      };
  }, [dispatch]);

    const handleSendMessage = () => {
      console.log("handleSendMessage called with message:", message);
        console.log(message);
        console.log(username);
        console.log(messages);
        console.log('send button clicked!!');
        if (message) {
          const date = new Date();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? "pm" : "am";
          const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
          const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
          const timestamp = `${formattedHours}:${formattedMinutes} ${ampm}`;
          // dispatch(addMessage());
          console.log("Emitting message to socket:", { username, message, timestamp });
          socket.emit("chat message", { username, message, timestamp });
          setMessage("");
          

        }
        else
        {
          alert("Empty Message cannot be sent!!!")
        }
      };

    const handleUsernameSubmit = () => 
    {
        if (inputUsername) {
          console.log("Dispatching setUsername with:", inputUsername);
          dispatch(setUsername(inputUsername));
        }
        else{
          alert("Please enter your name")
        }
    };   



  return (
    <>
      <div className='chatbody' style={{paddingTop:'50px'}}  >
        {/* <div>
            <h1 style={{color:" #12432e"}} className="text-center my-5"><i className="fa-solid fa-comments me-3 "></i>Chat-app</h1>
        </div> */}

       { 
        !username?
       (
        
           <>
              <h1 style={{color:" #12432e"}} className="text-center my-5"><i className="fa-solid fa-comments me-3 "></i>Chat-app</h1>

              <div  className="d-flex justify-content-center w-100">
                      <div className="bg-transparent rounded-5 shadow my-4 " style={{height:'200px',width:'450px'}}>
                          <h1 style={{color:'#12432e'}} className='text-center p-3 '>Please login</h1>
                          <div className='m-3'><input type="text" className='form-control  rounded-5 ' 
                          value={inputUsername}
                          style={{backgroundColor:'rgba(140, 137, 137, 0.756)'}}
                          onChange={(e) => setInputUsername(e.target.value)}
                          placeholder='Enter Your Name' />
                          </div>
                          <div className='text-center m-3'><Button onClick={handleUsernameSubmit} className='btn  rounded-5 ' style={{backgroundColor:'#12432e'}}>LOGIN</Button></div>
                      </div>
  
                  </div>
           </>
        )
            :
        (
            <>
                    <div className="d-flex mt-5  justify-content-center w-100">
                        <div className=" rounded-5 shadow my-4 chatsection" style={{height:'500px',width:'450px'}}>
                        <ul id="messages">
                                {messages.map((msg, index) => (
                                <li 
                                    key={index}
                                    className={msg?.username === username ? "user" : "other"}
                                >
                                    <i>
                                    <span style={{ color: "yellow" }}>{msg?.username}</span>
                                    </i>
                                    <br />
                                    <span style={{color:'white'}}>{msg?.message}</span>
                                    <br />
                                    <div style={{color:'rgb(198, 196, 196)'}} className=" timestamp me-2">{msg?.timestamp}</div>
                                </li>
                                ))}
                        </ul>
    
                
                        </div>
                        
            
                    </div>
                    <div className="d-flex justify-content-center w-100">
                    <input type="text"  className='form-control rounded-5'
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    placeholder='Type a message...' style={{width:'350px'}}/>
                            <Button className='btn rounded-5 ms-2 ' style={{backgroundColor:'#12432e'}} onClick={handleSendMessage}>
                            <i className='bx bxs-send '></i>
                            </Button>
                    </div>
            </>
        )}
         
      </div>
    </>
  )
}

export default Chat

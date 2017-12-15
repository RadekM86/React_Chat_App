import React from 'react';
import io from 'socket.io-client';
import ReactSVG from 'react-svg';
import Message from './Message.js'


function scrollToBottom(id){
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
 }

export default class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nameUser: this.props.name,
            messages: []
        }
    }
    handleSubmit = (e)=>{
        const body=e.target.value;
        if(e.keyCode===13 && body){
            const message ={
                body,
                name: this.state.nameUser,
                time: new Date().toLocaleTimeString(),
                avatar: this.props.avatar
            }
            this.setState({
                messages : [...this.state.messages, message]
            })
            this.socket.emit('message', JSON.stringify(message))
            e.target.value = ""
        }
    }
     componentDidMount(){
        this.socket = io('/');
        this.socket.on('message', message=>{
            this.setState({messages: [...this.state.messages, message],
            time: new Date().toLocaleTimeString(),
            avatar: this.props.avatar
            
        })
        })
         }
       
    render(){
        
        const messages = this.state.messages.map((message, index)=>{
            const styleSide = (this.props.name == message.name)? "msg-piece right" : "msg-piece left"
            return <Message classSide ={styleSide} key={index} index={index} time = {message.time} name={message.name} body={message.body} avatar={message.avatar}/> 
        })
        return <div className="wrapper" id="wrapper">
            <center>
            
            <div className="logo"></div>
            
            </center>
            <ul className="msg">
            {messages}
            </ul>
            <div className="input">
            <input placeholder="Wpisz wiadomość i naciśnij enter" onKeyUp={this.handleSubmit}/>
            </div>
            </div>
    }
           
                      
        

    
    }

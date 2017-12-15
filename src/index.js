import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Chat from "./components/Chat.js";

let avatars = [
"http://i65.tinypic.com/i6l6yf.jpg",
"http://i63.tinypic.com/2nsujqf.jpg",
"http://i64.tinypic.com/2e1rmn4.jpg",
"http://i67.tinypic.com/3505a94.jpg",
"http://i66.tinypic.com/zn8yds.jpg"
]



class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "",
            logged: false,
            avatar: "http://i65.tinypic.com/i6l6yf.jpg"
        }
    }
    handleName = (e)=>{
        e.preventDefault()
        const newName = e.target.value;
            this.setState({
                name: newName,
              })
        }
    handleAvatar = (e)=>{
        let userAvatar = e.target.src;
        this.setState({
            avatar: userAvatar
        })
    }
     handleSubmit = (e)=>{
        e.preventDefault();
        this.setState({
            logged: true
        })
    }
     render(){
         const users = avatars.map((elem,index)=>{
             return <img onClick={this.handleAvatar} key={index}  src={elem} className="avatar"/>
         })
         if (this.state.logged){
             return <div>
                 <center>
                 <h1>le chat</h1>
                 </center>
                 <Chat name={this.state.name} avatar={this.state.avatar} />
                 </div>
         }
        return <div>
            <center>
            <h1>le chat</h1>
            <div className="login">
            <span>wybierz swój avatar</span>
                {users}
            <form><input type="text" placeholder="Podaj swoje imię" value={this.state.name} onChange={this.handleName}  /><input type="button" onClick={this.handleSubmit} value="login"/></form>
            
          
            
            </div>
            </center>
            </div>
    }
}


document.addEventListener("DOMContentLoaded", function() {


    ReactDOM.render(<App />, document.getElementById('app'))
    
})

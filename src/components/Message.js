import React from 'react';
import io from 'socket.io-client';

export default class Message extends React.Component{
    constructor(props){
        super(props)
    }
     render(){
        return <div><img  src={this.props.avatar} className="avatar user"/><li  className={ this.props.classSide } style={{listStyleType: "none"}} key={this.props.index}><i style={{fontSize: "9px"}}>{this.props.time}</i><b>  {this.props.name}: </b> <br/>  {this.props.body}</li></div>
    }
}


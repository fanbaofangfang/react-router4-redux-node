import React from 'react';
const logoUrl = require('./logo.jpg');
export default class Logo extends React.Component {
    render(){
        return (
            <div style={{textAlign:'center',margin:"10px 0"}}>
                <img src={logoUrl}></img>
            </div>
        )
    }
}
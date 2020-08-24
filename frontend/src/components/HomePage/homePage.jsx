import React, { Component } from 'react';
import shaadiimage from "../images/shaadi.jpg";
import Typography from "@material-ui/core/Typography";
import "./homePageStyle.scss";

class Home extends Component{
    render(){
        return(
            <div>
                <img src={shaadiimage} style={{width:'100%'}} alt="shaadi"></img>
                <Typography variant="h4">
                    <a style={{color:'white',textDecoration:'none'}} class="text centered">EaseOurशादी</a>
                </Typography>
               
                <p className="description">Marriage is special occasion. It's a bond formed by two people. Make it timeless and effortless. </p>
                <p className="description2">Browse through all the services in the shop and get the best and most cost efficient in your locality.</p> 
                <p className="description3">Make your marriage momentous.</p>
          
            </div>
        )
    }
}

export default Home;

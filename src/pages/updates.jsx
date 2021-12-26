import React from "react";
//import Card from "../components/Card"
//import WidgetData from "../components/WidgetData";
import { Link } from "react-router-dom";
import UpdateCard from "../components/UpdateCard";

const Updates = () => {
    
  return (
    <div>
        <div className="fullscreen-bg">
            <video loop muted autoPlay className="fullscreen-bg__video ">
                <source src="assets/vid/video4.mp4" type="video/mp4"/>
            </video>
        </div>
        
        <div className="container">
        
        

        <div className="dApp pad spacer5">
            <Link to="/">Back</Link>
        </div>

        <UpdateCard>
          </UpdateCard>
        </div>
    </div>
  );
};

export default Updates
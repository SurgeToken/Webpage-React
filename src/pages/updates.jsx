import React from "react";
//import Card from "../components/Card"
//import WidgetData from "../components/WidgetData";
import { Link } from "react-router-dom";
import UpdateCard from "../components/UpdateCard";
import readUpdates from "../ReadUpdates"
import "./updates.css"

const Updates = () => {
    
  return (
    <div>
        <div className="fullscreen-bg">
            <video loop muted autoPlay className="fullscreen-bg__video">
                <source src="assets/vid/video4.mp4" type="video/mp4"/>
            </video>
            <div className="hero-text">
              <div className="piece">Updates</div>
            </div>
        </div>
        
        <div className="container-wrapper">
          <div className="container">
            <div className="updates-container">
              {readUpdates.getUpdates().map(update=>{
                let {title,desc,version} = update;
                return (<UpdateCard title={title} desc={desc} version={version}></UpdateCard>);
              })}
            </div>
            

            <button className="btn-back">
                <Link to="/">Back</Link>
            </button>

          </div>
        </div>
    </div>
  );
};

export default Updates
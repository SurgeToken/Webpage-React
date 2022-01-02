import React, { useState, useEffect } from "react";
//import Card from "../components/Card"
//import WidgetData from "../components/WidgetData";
import { Link } from "react-router-dom";
import UpdateCard from "../components/UpdateCard";
import "../css/updates.module.css";

// Mock
// const readUpdates = {

//   getUpdates: ()=>{
//     return [
//       {
//         title: "Title1",
//         desc: "Desc1",
//         version: "1.0"
//       },
//       {
//         title: "Title2",
//         desc: "Desc2",
//         version: "1.1"
//       },
//     ]
//   }
// }

const Updates = () => {
  const [loadedUpdates, setUpdates] = useState([]);
  useEffect(() => {
    (async function() {
        const updates = await fetch('http://localhost:3001/json/updates', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => {
          throw new Error(err)
        });

        setUpdates(updates);
    })(); // IIFE
}, []); // useEffect
    
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
              {loadedUpdates.map(update=>{
                let {title,desc,version} = update;
                let filepath="/updates/" + update.filename;
                return (<UpdateCard title={title} desc={desc} version={version} filepath={filepath}></UpdateCard>);
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
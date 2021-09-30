import React from "react";
import Card from "../components/Card"
import NavBar from "../components/NavBar";
import WidgetData from "../components/WidgetData";
import { Link } from "react-router-dom";
import UpdateCard from "../components/UpdateCard";

const Education = () => {
    
  return (
    <div>
        
        <div className="container">
        
            <NavBar/>

            <div className="dApp pad spacer5">
                <Link to="/">Back</Link>
            </div>

        <UpdateCard>
          </UpdateCard>
        </div>
    </div>
  );
};

export default Education
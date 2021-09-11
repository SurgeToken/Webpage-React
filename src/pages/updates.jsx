import React from "react";
import Card from "../components/Card"
import NavBar from "../components/NavBar";
import WidgetData from "../components/WidgetData";
import { collection, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase";
import { Link } from "react-router-dom";
import UpdateCard from "../components/UpdateCard";

const Updates = () => {
    const [blogs, setBlogs] = useState([]);

  
  useEffect(
    () => 
      onSnapshot(collection(db, "blogs"),(snapshot) => 
        setBlogs(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
    []
   );
  return (
    <div>
        <div className="fullscreen-bg">
            <video loop muted autoPlay className="fullscreen-bg__video ">
                <source src="assets/vid/video4.mp4" type="video/mp4"/>
            </video>
        </div>
        
        <div className="container">
        
        
        <NavBar/>

        <div className="dApp pad spacer5">
            <Link to="/">Back</Link>
        </div>

        <UpdateCard>
            {blogs.map((blog) => (
                <WidgetData>
                    <div key={blog.id}>
                        <h4>{blog.title}</h4>
                        <h5>{blog.text}</h5>
                    </div>
                </WidgetData>
              ))}
          </UpdateCard>
        </div>
    </div>
  );
};

export default Updates
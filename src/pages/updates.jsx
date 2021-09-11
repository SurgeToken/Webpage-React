import React from "react";
import Card from "../components/Card"
import WidgetData from "../components/WidgetData";
import { collection, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase";

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
    <Card>
            <WidgetData>
              <div>
                <h3>Latest Updates</h3>
              </div>
              {blogs.map((blog) => (
                <div key={blog.id}>
                  <h4>{blog.title}</h4>
                  <h5>{blog.text}</h5>
                  <hr/>
                </div>
                
              ))}
                
            </WidgetData>
          </Card>
  );
};

export default Updates;
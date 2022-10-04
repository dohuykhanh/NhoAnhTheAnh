import React from "react";
import Header from "../../components/Navbar/header";
// import Chatclock from "../../components/chatandclock/chatclock";
import Chat from "../../components/Chatbox/chat"
import Clock from "../../components/Clock/clock"
import styles from "./homeindex.module.css"
function Home({ children }) {
  
  return (
    <div>
      <Header></Header>
      <div className= {styles.Fix}>
        <div className={styles.fixcontent}>{children}
        
        </div>
        
        
        <div className={styles.wrapp} >
          {/* <Chatclock/> */}
          
          <Chat/>
          <Clock/>
        </div>
      </div>
    </div>
  );
}

export default Home;

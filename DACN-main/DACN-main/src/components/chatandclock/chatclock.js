import React from 'react';
import Clock from '../../components/Clock/clock'
import Chat from '../../components/Chatbox/chat'
import styles from './chatandclock.module.css' 
const chatclock = ()=> {

  return (
    <div>
    <div className={styles.Setclockchat} style={{backgroundColor:'green'}}></div>
    <div style ={{backgroundColor:"red", width: "fit-content", height : "100vh"}}>
    <Clock></Clock>
      <Chat></Chat>
    </div>

      
      </div>
  );
}

export default  chatclock;
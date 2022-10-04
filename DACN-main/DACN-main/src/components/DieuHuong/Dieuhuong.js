import styles from "./dieuhuong.module.css"
import {useNavigate} from 'react-router-dom';

import React from "react";



function Dieuhuong() {
  const navigate = useNavigate();
  return (  
    <div>
    <div className= {styles.left}>
        
      <div className={styles.leftButton}>
        <button className= {styles.nut} onClick={() => {navigate(`/BanHang`)}}>Bán Hàng</button>
        <br></br>
        <button className= {styles.nut} onClick={() => {navigate(`/TungChiNhanh`)}} >Nhân Viên</button>
        <br></br>
        <button className= {styles.nut} onClick={() => {navigate(`/VatTu`)}} >Sản Phẩm</button>
        <br></br>
        <button className= {styles.nut} onClick={() => {navigate(`/BanHang`)}}>Hóa Đơn</button>
      </div>
    </div>
    </div>
  )
}

export default Dieuhuong;

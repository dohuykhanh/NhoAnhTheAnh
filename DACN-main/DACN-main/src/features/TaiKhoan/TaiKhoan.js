import React, { useState } from 'react';

import {useNavigate} from 'react-router-dom';
function NhanVien() {
 
  const navigate = useNavigate();
  const Tao = ()=>{
    navigate("/DangNhap")
  }


  return (
    
    <div>
      <h2>Tai Khaon</h2>
      <button onClick={() => {navigate("/DangKy")}}>TAO TAI KHOAN</button>
      
    </div>
  );
}

export default NhanVien;
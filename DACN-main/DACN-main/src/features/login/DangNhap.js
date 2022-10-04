import React, { useState } from "react";
import styles from './DangNhap.module.css'
import images from '../../images/Final_logo.png'
// import images from '../../images/background.jpg'
import { useNavigate } from "react-router-dom";
function DangNhap() {
  const [Name, setName] = useState("");
  const [Password, setPassword] =useState("");
  const navigate = useNavigate();
  
  const onchangename= (event) => {
    setName(event.target.value);
  }
  const onchangepassword= (event) => {
    setPassword(event.target.value);
  }
  const submitform= async (e)=>{
    e.preventDefault();
    console.log("Name", Name);
    console.log("Password", Password);
    const data={
      Name,
      Password,
    };
    const url = "http://localhost:5001/Login";
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    response.json().then((val)=>{
      console.log("giatri",val);
      console.log("ten",val.Name);
      console.log("pass",val.Password);
      console.log("vaitro",val.VaiTro);
      if(val.VaiTro==="Chu"){
        navigate(`/ChiNhanh`);
      }
      if(val.VaiTro==="QuanLyKho"){
        navigate(`/ChiNhanh`);
      }
      if(val.VaiTro==="NhanVien"){
        navigate(`/TungChiNhanh`);
      }
      localStorage.setItem("Vaitro", val.VaiTro);
      localStorage.setItem("TenChiNhanh", val.ChiNhanh)
    })
    console.log("danhap", response.json());
   
      
    
  }
  return (
    <div className={styles.container} >
      {/* <img src={images} alt='images'/> */}
      <form>
        <div className={styles.formInner}>
          <h2>Đăng Nhập</h2>

          <div className={styles.formGroup}>
            <label htmlFor="name">Tên đăng nhập</label>
            <input type="text" name="name" id="name" onChange={onchangename}/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" name="password" id="password" onChange={onchangepassword}/>
          </div>
          <input onClick={submitform} type="submit" value="Đăng Nhập " />
          <a href="http://127.0.0.1:5500/DACN-main/src/features/login/khanh.html">Đăng nhập bằng FACEID</a>
        </div>

        <div className={styles.images}>
          <img src={images} alt='images' style={{width:"150px",height:"150px" }}/>
          <h2>KHANH NHAT COMPANY</h2>
        </div>
      </form>



    </div>
  );
}

export default DangNhap;

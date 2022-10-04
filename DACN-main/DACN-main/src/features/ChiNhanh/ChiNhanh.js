import React from "react";
import usersCollectionRef from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import styles from "./chinhnhanh.module.css";
import icon from "../../images/icon.png";
import DieuHuong from "../../components/DieuHuong/Dieuhuong";
import Homeindex from "../.././layout/home/homeindex"
import axios from 'axios'
function ChiNhanh() {
  const navigate = useNavigate();
  const [cacChiNhanh, setCacChiNhanh] = useState([]);
  const [Loadchinhnhanh, setLoadchinhnhanh] = useState(false);
  const [isToggled, setisToggled] =useState(false);

  const usersCollectionRef = collection(db, "CacChiNhanh");

  const ThemChiNhanh = async () => {
    const arr = [];
    cacChiNhanh.map((a) => arr.push(a.MaChiNhanh));
    // console.log(arr);
    // console.log(arr[arr.length - 1]);
    let ma = arr[arr.length - 1] + 1;
    let so = `${arr[arr.length - 1] + 1}`;
    await addDoc(usersCollectionRef, {MaChiNhanh: ma, SoChiNhanh: so});
    setLoadchinhnhanh(true);
  };
  const Vaochinhanh = (e)=>{
    var a=e
    localStorage.setItem("TenChiNhanh", a)
    console.log("machinhanh", e)
    setisToggled(true);
    navigate(`/VatTu`);


  }
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const test = data.docs.map((d) => d.data());
      setCacChiNhanh(
        test.sort((a, b) => {
          return a.MaChiNhanh - b.MaChiNhanh;
        })
      );
    };
    getUsers();
  }, [Loadchinhnhanh]);


  return (
    <>
      <button className={styles.AddChiNhanh} onClick={() => ThemChiNhanh()}>
        Thêm chi nhánh
      </button>

      <div className={styles.mainHeader}>
        {cacChiNhanh.map((chiNhanh) => (
          <div
            key={chiNhanh.MaChiNhanh}
            className={styles.left}
            onClick={() => Vaochinhanh(chiNhanh.SoChiNhanh)
            }
          >
            <img
              src={icon}
              alt="images"
              style={{
                width: "150px",
                height: "150px",
                position: "relative",
                left: "50px",
              }}
            />
            <h4 className={styles.mainContent}>Chi Nhanh {chiNhanh.SoChiNhanh}</h4>
          </div>
          
        ))}

        <div>
        {/* {isToggled && <Homeindex isToggled={isToggled}/>} */}
        </div>
      </div>
      
      
    </>
  );
}
// export  {isToggled};
export default ChiNhanh;


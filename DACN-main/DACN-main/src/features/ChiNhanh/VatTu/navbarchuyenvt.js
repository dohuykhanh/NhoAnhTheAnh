
import  './navbarchuyenvt.css'


import React, {useEffect, useState} from 'react';
import { Button, Modal} from 'react-bootstrap'
import axios from "axios";
import moment from 'moment';

import DieuHuong from "../../../components/DieuHuong/Dieuhuong"
// import BanHang from './BanHang'
// import Cart from './cart'
import VatTu from './VatTu'
import PhieuChuyen from './PhieuChuyen'
import ThongBaoChuyen from './ThongBaoChuyen'



const Navbarchuyenvt = () => {

  const phanquyen = localStorage.getItem("Vaitro")
  console.log("phanquya", phanquyen);
  var b=JSON.stringify(phanquyen);
  var k ="QuanLy"
  var Xep=true;
  var li=false
  if(phanquyen==="QuanLyKho"){
    Xep=false;
    li=true;
  }


  const [Data, setData] = useState([]);
  const [show, setshow]=useState(true);
  const [showw, setshoww]=useState(false);
  const [showww, setshowww]=useState(false);
  const [cart, setCart]=useState([]);
  const [isToggledd, setisToggledd] =useState(false);
  const [bandau, setbandau] = useState([]);



  const Getvattu = async () => {
  
    const url = `http://localhost:5001/PhieuChuyen/c/${Tenchinhanh}`
    axios.get(url)
              .then(response => {
                  const result = response.data;
                  const { status, message, data } = result;
                  
                  if (status !== 'SUCCESS') {
                      alert(message, status)
                  }
                  else {
                      setData(data)
                      console.log(data)
                      // setData1(Data[0].SanPham)
                      
                      // console.log("dataaaa1",Data1)
                  }
              })
              .catch(err => {
                  console.log(err)
              })
            }



            // const laybandau = () => {
            //   //   hoadon.push(item);
            //   //   handleEditShow();
            //   // console.log("bien carrt", cart)
            //   for(let i = 0; i < cart.length; i++) {
            //     bandau.push(cart[i]);
                
            //   }
            
              
             
            
            // }



var Tenchinhanh= localStorage.getItem("TenChiNhanh");
console.log("chinhanh",Tenchinhanh);
var ChiNhanh=Tenchinhanh;
const Hovernut = ()=>{
  setisToggledd(true);
}
const TatHovernut = ()=>{
  setisToggledd(false);
}
const handleclickgiohangbd = (itemm) => {
  bandau.push(itemm)
  console.log("itemm", itemm)
  console.log("bandaubennav", bandau)
  
  
}


const handleclickgiohang = (item ) => {
  
  if (cart.indexOf(item) !== -1) return;
  setCart([...cart, item]);
  

  
 
};


const handleChange = (item, d) => {
  const ind = cart.indexOf(item);
  const arr = cart;
  arr[ind].SoLuong = arr[ind].SoLuong + d;

  if (arr[ind].SoLuong === 0) arr[ind].SoLuong = 1;
  setCart([...arr]);
};




useEffect(() => {
  Getvattu();
}, [])


  return (
    <div>
    <nav>
      <div className="nav_box">
      {Xep &&<button className="fs" onClick={() => Hovernut()}>mở</button>}
      {Xep &&<button className="fx" onClick={() => TatHovernut()}>tắt</button>}
      <h1> CHAO MUNG DEN CHI NHANH: {Tenchinhanh} </h1>
      {Xep &&
      <section>
      {isToggledd && <DieuHuong/>}
      </section>}
        <span className="my_shop" onClick={() => setshow(true, setshoww(false), setshowww(false))}>
          sanpham
        </span>

        {li &&
        <div className="cart" onClick={() => setshow(false, setshoww(false), setshowww(true))}>
          <span>
            <i className="fa fa-bell"></i>
          </span>
          <span>{cart.length}</span>
        </div>

}

{Xep &&
        <div className="cart" onClick={() => setshoww(true,setshow(false), setshowww(false))}>
          <span>
            <i className="fa fa-bell"></i>
          </span>
          <span>{Data.length}</span>
        </div>
}
      </div>
    </nav>
    {show && <VatTu handleclickgiohang={handleclickgiohang}  handleclickgiohangbd={handleclickgiohangbd}/>}

      {showww && <PhieuChuyen bandau={bandau} setbandau={setbandau} cart={cart} setCart={setCart} handleChange={handleChange} />}
      {showw && <ThongBaoChuyen Data={Data} setData={setData} />}
    </div>
  );
};

export default Navbarchuyenvt;
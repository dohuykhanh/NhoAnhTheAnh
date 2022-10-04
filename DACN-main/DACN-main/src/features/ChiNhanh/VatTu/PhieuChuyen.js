import React, { useState, useEffect,useRef } from "react";
// import  "./cartcss.css" 
import { Button, Modal} from 'react-bootstrap'
import axios from "axios";
import moment from 'moment';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const PhieuChuyen = ({ cart, setCart, handleChange,bandau,setbandau }) => {
  const [price, setPrice] = useState(0);
  const [cn, setcn] = useState("")
  const [hoadon, sethoadon] = useState([]);
  
  const [ViewEdit, SetEditShow] = useState(false)
  const handleEditShow = () => { SetEditShow(true) }
  const hanldeEditClose = () => { SetEditShow(false) }


  const [gia, setgia]=useState("")
  const [TenVatTu, settenvattu] = useState("")
  const [SoLuong, setsoluong] = useState("")
  const [NgaySanXuat, setnsx] = useState("")
  const [NgayHetHan, setnhh] = useState("")
  const [id,setId] = useState("");
  var Gia=gia

  var Tenchinhanh= localStorage.getItem("TenChiNhanh");
  console.log("chinhanh",Tenchinhanh)
  var ChiNhanh=Tenchinhanh;

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item._id !== id);
    setCart(arr);
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.SoLuong * item.Gia));
    setPrice(ans);
  };

  const handleclickhoadon = () => {
  //   hoadon.push(item);
  //   handleEditShow();
  // console.log("bien carrt", cart)
  for(let i = 0; i < cart.length; i++) {
    hoadon.push(cart[i]);
    
  }
  console.log("bien carrt", hoadon)
  console.log("bien carrt2222", cart)
  console.log("bien bandau", bandau)
  
  handleEditShow();
 

}








const handleEdit = () =>{
  const url = `http://localhost:5001/VatTu/${id}`
  
  const Credentials = { TenVatTu, SoLuong,NgaySanXuat,NgayHetHan, Gia}
  axios.put(url, Credentials)
      .then(response => {
          const result = response.data;
          const { status, message } = result;
          if (status !== 'SUCCESS') {
              alert(message, status)
          }
          else {
              alert(message)
              window.location.reload()
          }
      })
      .catch(err => {
          console.log(err)
      })
}





const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content:()=>componentRef.current,
    documentTitle:'emp-data',
    onAfterPrint:()=>alert('print success')
  });


const Ngayban = new Date();
console.log("ngyaban", Ngayban);
var ngayban;

const handleSubmite = () => {
  const url = 'http://localhost:5001/PhieuChuyen'
  ChiNhanh=cn;
//   let Gia = price;
  const Credentials = {hoadon,ChiNhanh }
  axios.post(url, Credentials)
      .then(response => {
          const result = response.data;
          const { status, message, data } = result;
          if (status !== 'SUCCESS') {
              alert(message, status)
              hanldeEditClose()
          }
          else {
              alert(message)
              window.location.reload()
          }
      })
      .catch(err => {
          console.log(err)
      })
}

  useEffect(() => {
    handlePrice();
  });
 

  return (
    <article>
    
      {cart.map((item) => (
        <div className="cart_box" key={item._id}>
          <div className="cart_img">

            <p>{item.TenVatTu}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, +1)}>+</button>
            <button>{item.SoLuong}</button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            <span>{item.Gia}</span>
            <button onClick={() => handleRemove(item._id)}>Xóa</button>
          </div>
        </div>
        // <button onClick={() => handleclickgiohang(item) }>Mua</button />
      ))}
      {/* <div className="total">
        <span>Tổng Giá Tiền Hóa Đơn</span>
        <span>{price} VND</span>
      </div> */}
       <div className='form-group'>
                                <label>Chi Nhánh</label>
                                <input type="text" className='form-control' onChange={(e) => setcn(e.target.value)} placeholder="Please enter"/>
                            </div>
      
         <button onClick={() =>  handleclickhoadon()}>XUAT-PHIEU</button>
    



<div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>PHIEU CHUYEN</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div ref={componentRef} style={{width:'100%',height:window.innerHeight}} >
                    <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Tên vật tư</th>
                                <th>số lượng</th>
                                {/* <th>ngày sản xuất</th>
                                <th>ngày hết hạn</th> */}
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hoadon.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.TenVatTu}</td>
                                    <td>{item.SoLuong}</td>
                                    <td>{item.Gia}</td>
                               
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>



               
                {/* <span>{ngayban = moment(Ngayban).format('YYYY-MM-DD')}</span>
                <span>{price} VND</span> */}
                <span>Chuyển đến chi nhánh: {cn} </span>
                
            </div>
            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleSubmite}>Close</Button>
                        <Button variant='primary'  onClick={handlePrint}>PRINT!!!</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    </article>
  );
};

export default PhieuChuyen;

import React, { useState, useEffect,useRef } from "react";
import  "./cartcss.css" 
import { Button, Modal} from 'react-bootstrap'
import axios from "axios";
import moment from 'moment';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
  const [hoadon, sethoadon] = useState([]);
  const [ViewEdit, SetEditShow] = useState(false)
  const handleEditShow = () => { SetEditShow(true) }
  const hanldeEditClose = () => { SetEditShow(false) }
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
  handleEditShow();
 

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
  const url = 'http://localhost:5001/HoaDon'
  let Gia = price;
  const Credentials = {hoadon,ChiNhanh,Gia }
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
      <div className="total">
        <span>Tổng Giá Tiền Hóa Đơn</span>
        <span>{price} VND</span>
      </div>
      
         <button onClick={() =>  handleclickhoadon()}>Thanhtoan</button>
    



<div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>HOA DON</Modal.Title>
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
                <span>{ngayban = moment(Ngayban).format('YYYY-MM-DD')}</span>
                <span>{price} VND</span>
                
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

export default Cart;

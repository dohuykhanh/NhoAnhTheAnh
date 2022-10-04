import React, {useEffect, useState} from 'react';
import styles from "./navbar.module.css";
import { Button, Modal} from 'react-bootstrap'
import images from "../../images/Final_logo.png";
import {useNavigate} from 'react-router-dom';
import Thongbao from '../../features/Thongbao/Thongbao'
import axios from "axios";
const header = () => {
 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setshow]=useState(true);
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cart, setCart]=useState([]);
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ViewPost, SetPostShow] = useState(false)
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [isToggledd, setisToggledd] =useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
   const [Data, setData] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
   const [RowData, SetRowData] = useState([])
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [id,setId] = useState("");
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [idd,setIdd] = useState("");
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [cn, setcn] = useState("")
    // eslint-disable-next-line react-hooks/rules-of-hooks
 const handlePostShow = () => { SetPostShow(true) }
  // eslint-disable-next-line react-hooks/rules-of-hooks
 const hanldePostClose = () => { SetPostShow(false) }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const phanquyen = localStorage.getItem("Vaitro")
  console.log("phanquya", phanquyen);
  var b=JSON.stringify(phanquyen);
  var k ="QuanLy"
  var Xep=false;
  var kho=false;
  if(phanquyen==="Chu"){
    Xep=true;
  }
  if(phanquyen==="QuanLyKho"){
    kho=true;
  }



  const handleDelete = () =>{
    console.log("idd",idd)
    const url = `http://localhost:5001/ThongBao/${idd}`
    axios.delete(url)
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

  const handleMove = () =>{
    console.log("id",id)
    
        const url = `http://localhost:5001/Nhanvien/${id}`
        var ChiNhanh = cn
        console.log("Chinhanh",ChiNhanh)
        const Credentials = {ChiNhanh }
        axios.put(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                handleDelete();
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
   // eslint-disable-next-line react-hooks/rules-of-hooks
  const GetThongBao = async () => {

    const url = `http://localhost:5001/ThongBao`
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
                  }
              })
              .catch(err => {
                  console.log(err)
              })
            }

 // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              GetThongBao();
          }, [])
 // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <div style={{position: 'relative'}} >
      <header>
        <img
          className={styles.imageLogo}
          src={images}
          alt="images"
        />
        <nav 
        // ref={navRef}
        >
         { Xep && <p onClick={() => {navigate(`/ChiNhanh`)}}>Chi Nhánh</p>}
         { Xep &&<p onClick={() => {navigate(`/Kho`)}}> Kho </p>}
          { Xep &&<p onClick={() => {navigate(`/ThongKe`)}}> Thống kê</p>}
          { Xep &&<p onClick={() => {navigate(`/NhanVien`)}}> Tài khoản</p>}
          { kho && <p onClick={() => {navigate(`/ChiNhanh`)}}>Chi Nhánh</p>}
          { kho &&<p onClick={() => {navigate(`/Kho`)}}> Kho </p>}
        </nav>

        { Xep &&
        <div className="cart" onClick={() => { handlePostShow() }}>
          <span>
       
       <i className="fa fa-bell"></i>
          </span>
          <span>{Data.length}</span>
        </div>
}

      </header>
     



           {/* Modal for submit data to database */}
           <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thoong Bao</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div >
                    <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Yêu Cầu</th>
                                <th>HỌ TÊN</th>
                                {/* <th>ngày sản xuất</th>
                                <th>ngày hết hạn</th> */}
                                <th>SDT</th>
                                <th>Chi Nhánh</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                  <td>{item.YeuCau}</td>
                                <td>{item.hoten}</td>
                                <td>{item.sdt}</td>
                                <td>{item.ChiNhanh}</td>
                                <td>  <Button type='submit' className='btn btn-warning mt-4' onClick={() =>{handleMove(setId(item.idtb),setcn(item.ChiNhanh),setIdd(item._id))}}>Move Employee</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
            </div>
            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
      
    </div>
  );
}

export default header;

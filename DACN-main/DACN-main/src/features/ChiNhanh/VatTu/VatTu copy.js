import React, {useEffect, useState} from 'react';
import { Button, Modal} from 'react-bootstrap'
import axios from "axios";
import moment from 'moment';
import styles from "./VatTu.module.css"
import DieuHuong from "../../../components/DieuHuong/Dieuhuong"
const VatTu = ({handleclickgiohang,handleclickgiohangbd}) => {
  const [isToggledd, setisToggledd] =useState(false);
  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState([])

  const [ViewShow, SetViewShow] = useState(false)
  const handleViewShow = () => { SetViewShow(true) }
  const hanldeViewClose = () => { SetViewShow(false) }

  //FOr Edit Model
  const [ViewEdit, SetEditShow] = useState(false)
  const handleEditShow = () => { SetEditShow(true) }
  const hanldeEditClose = () => { SetEditShow(false) }
  //FOr Delete Model
  const [ViewDelete, SetDeleteShow] = useState(false)
  const handleDeleteShow = () => { SetDeleteShow(true) }
  const hanldeDeleteClose = () => { SetDeleteShow(false) }
 //FOr Add New Data Model
 const [ViewPost, SetPostShow] = useState(false)
 const handlePostShow = () => { SetPostShow(true) }
 const hanldePostClose = () => { SetPostShow(false) }


   //Define here local state that store the form Data
   const [gia, setgia]=useState("")
   const [TenVatTu, settenvattu] = useState("")
   const [SoLuong, setsoluong] = useState("")
   const [NgaySanXuat, setnsx] = useState("")
   const [NgayHetHan, setnhh] = useState("")
   let dateNgaysanxuat = Date(NgaySanXuat);
   let formatteddateNgaysanxuat = moment(dateNgaysanxuat).format('YYYY-MM-DD');
 
   console.log("datesdfdsf", formatteddateNgaysanxuat);
   const [cn, setcn] = useState("")
  //Id for update record and Delete
  const [id,setId] = useState("");
  const [Delete,setDelete] = useState(false)
  var Gia=gia



  var Tenchinhanh= localStorage.getItem("TenChiNhanh");
  console.log("chinhanh",Tenchinhanh)
  var ChiNhanh=Tenchinhanh;


  const Getvattu = async () => {

    const url = `http://localhost:5001/VatTu/c/${Tenchinhanh}`
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


            const handleSubmite = () => {
              const url = 'http://localhost:5001/VatTu'
              
              const Credentials = { TenVatTu, SoLuong,NgaySanXuat,NgayHetHan,ChiNhanh,Gia }
              axios.post(url, Credentials)
                  .then(response => {
                      const result = response.data;
                      const { status, message, data } = result;
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

        //handle Delete Function 
    const handleDelete = () =>{
      const url = `http://localhost:5001/VatTu/${id}`
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

//   const handleMove = () =>{
//     const url = `http://localhost:5001/VatTu/${id}`
//     ChiNhanh = cn
//     const Credentials = {ChiNhanh }
//     axios.put(url, Credentials)
//         .then(response => {
//             const result = response.data;
//             const { status, message } = result;
//             if (status !== 'SUCCESS') {
//                 alert(message, status)
//             }
//             else {
//                 alert(message)
//                 window.location.reload()
//             }
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }
            
            useEffect(() => {
              Getvattu();
          }, [])

  const Hovernut = ()=>{
    setisToggledd(true);
  }
  const TatHovernut = ()=>{
    setisToggledd(false);
  }
  var nsx;
  var nhh;
  return (
    <div>
        {/* <div className={styles.OnOff}>
        <div className={styles.hd}>
      <h2 className={styles.fonthd}> Chào Mừng Đến Chi Nhánh {Tenchinhanh} </h2>
      </div>
      <button className={styles.fs} onClick={() => Hovernut()}>mở</button>
      <button className={styles.fx} onClick={() => TatHovernut()}>tắt</button>
      </div> */}
      <section>
      {isToggledd && <DieuHuong/>}
      </section>
      <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Thêm vật tư
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Tên vật tư</th>
                                <th>số lượng</th>
                                <th>ngày sản xuất</th>
                                <th>ngày hết hạn</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.TenVatTu}</td>
                                    <td>{item.SoLuong}</td>
                                    <td>{nsx = moment(item.NgaySanXuat).format('DD/MM/YYYY')}</td>
                                    <td>{nhh = moment(item.NgayHetHan).format('YYYY-MM-DD')}</td>
                                    <td>{item.Gia}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item),setnsx(nsx),setnhh(nhh)) }}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(item),setId(item._id),settenvattu(item.TenVatTu),setsoluong(item.SoLuong),setnsx(nsx),setnhh(nhh), setgia(item.Gia))}}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item),setId(item._id), setDelete(true))}}>Delete</Button>|
                                        <Button size='sm' variant='primary' onClick={() => handleclickgiohang(item, handleclickgiohangbd(item)) }>Chuyển</Button>|
                                        {/* <Button size='sm' variant='warning' onClick={()=> {handleMoveShow(SetRowData(item),setId(item._id))}}>Move-To</Button>| */}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

             {/* View Modal */}
             <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View product Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.TenVatTu} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.SoLuong} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={nsx} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={nhh} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.Gia} readOnly />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Employee</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => {hanldeViewClose(setDelete(false))}}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

             {/* Modal for submit data to database */}
             <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => settenvattu(e.target.value)} placeholder="Mời nhập tên vật tư" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setsoluong(e.target.value)} placeholder="Mời nhập số lượng" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="date" className='form-control' onChange={(e) => setnsx(e.target.value)} placeholder="Mời nhập ngày sản xuất" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="date" className='form-control' onChange={(e) => setnhh(e.target.value)} placeholder="Mời nhập ngày hết hạn" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="Number" className='form-control' onChange={(e) => setgia(e.target.value)} placeholder="Mời Nhập Giá Sản Phẩm" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Thêm vật tư</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            
                    {/* Modal for Edit employee record */}
                    <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Sửa vật tư</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Tên vật tư</label>
                                <input type="text" className='form-control' onChange={(e) => settenvattu(e.target.value)} placeholder="Nhập tên vật tư" defaultValue={TenVatTu}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Số lượng</label>
                                <input type="email" className='form-control' onChange={(e) => setsoluong(e.target.value)} placeholder="Nhập số lượng" defaultValue={SoLuong} />
                                
                            </div>
                            <div className='form-group mt-3'>
                                <label>Ngày sản xuất</label>
                                <input type="text" className='form-control' onChange={(e) => setnsx(e.target.value)} placeholder="Nhập ngày sản xuất" defaultValue={nsx} />
                                
                            </div>
                            <div className='form-group mt-3'>
                                <label>Ngày hết hạn</label>
                                <input type="date" className='form-control' onChange={(e) => setnhh(e.target.value)} placeholder="Nhập ngày hết hạn" value={nhh} />
                                
                            </div>
                            <div className='form-group mt-3'>
                                <label>Ngày hết hạn</label>
                                <input type="text" className='form-control' onChange={(e) => setgia(e.target.value)} placeholder="Nhập giá" value={gia} />
                                
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Sửa vật tư</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>



             {/* Modal for Move employee record
             <div className='model-box-view'>
                <Modal
                    show={ViewMove}
                    onHide={hanldeMoveClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Move Employee To</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Chi Nhánh</label>
                                <input type="text" className='form-control' onChange={(e) => setcn(e.target.value)} placeholder="Please enter"/>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleMove}>Move Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div> */}



            </div>

    </div>
  );
}

export default VatTu;

import React,  { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap'
import axios from "axios";
import styles from "./TungChiNhanh.module.css"
import DieuHuong from "../../components/DieuHuong/Dieuhuong"
// import {isToggled} from'../../features/ChiNhanh/ChiNhanh'
const TungChiNhanh = () => {
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
  //FOr Move Model
  const [ViewMove, SetMoveShow] = useState(false)
  const handleMoveShow = () => { SetMoveShow(true) }
  const hanldeMoveClose = () => { SetMoveShow(false) }
  //FOr Delete Model
  const [ViewDelete, SetDeleteShow] = useState(false)
  const handleDeleteShow = () => { SetDeleteShow(true) }
  const hanldeDeleteClose = () => { SetDeleteShow(false) }
  //FOr Add New Data Model
  const [ViewPost, SetPostShow] = useState(false)
  const handlePostShow = () => { SetPostShow(true) }
  const hanldePostClose = () => { SetPostShow(false) }

  //Define here local state that store the form Data
  const [hoten, sethoten] = useState("")
  const [sdt, setsdt] = useState("")
  const [cn, setcn] = useState("")

  //Id for update record and Delete
  const [id,setId] = useState("");
  const [idtb,setidtb] = useState("");
  const [Delete,setDelete] = useState(false)


  var Tenchinhanh= localStorage.getItem("TenChiNhanh");
  console.log("chinhanh",Tenchinhanh)
  var ChiNhanh=Tenchinhanh;



  const Getnhanvien = async () => {

  const url = `http://localhost:5001/Nhanvien/c/${Tenchinhanh}`
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
            const url = 'http://localhost:5001/Nhanvien'
            const Credentials = { hoten, sdt, ChiNhanh }
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
            const url = `http://localhost:5001/Nhanvien/${id}`
            console.log('ten sdt', RowData.sdt)
            if(sdt===""){
                setsdt(RowData.sdt)
                console.log('dohuyykhanh')
                console.log('ten sdt', sdt)
            }
            if(hoten===""){
                sethoten(RowData.hoten)
            }
            const Credentials = { hoten, sdt, ChiNhanh }
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
        const url = `http://localhost:5001/Nhanvien/${id}`
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

    // const handleMove = () =>{
    //     const url = `http://localhost:5001/Nhanvien/${id}`
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
    const YeuCau="Chuyển Nhân Viên";
    const handleMove = () =>{
        ChiNhanh = cn
        const url = 'http://localhost:5001/ThongBao'
        const Credentials = { YeuCau,hoten, sdt, ChiNhanh, idtb}
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


    useEffect(() => {
            Getnhanvien();
        }, [])
  
  const Hovernut = ()=>{
    setisToggledd(true);
  }
  const TatHovernut = ()=>{
    setisToggledd(false);
  }
  

  return (
    <div>
      
        <div className={styles.OnOff}>
        <div className={styles.hd}>
      <h1> Chào Mừng Đến Chi Nhánh {Tenchinhanh} </h1>
      </div>
      <button className={styles.fs} onClick={() => Hovernut()}>mở</button>
      <button className={styles.fx} onClick={() => TatHovernut()}>tắt</button>
      </div>
      <section>
      {isToggledd && <DieuHuong/>}
      </section>

      <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Thêm Nhân Viên
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>SDT</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.hoten}</td>
                                    <td>{item.sdt}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item)) }}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(item),setsdt(item.sdt),sethoten(item.hoten),setId(item._id))}}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item),setId(item._id), setDelete(true))}}>Delete</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleMoveShow(SetRowData(item),setId(item._id),setsdt(item.sdt),sethoten(item.hoten),setidtb(item._id))}}>Move-To</Button>|
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
                        <Modal.Title>View Employee Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.hoten} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.sdt} readOnly />
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
                        <Modal.Title>Add new Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => sethoten(e.target.value)} placeholder="Please enter Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setsdt(e.target.value)} placeholder="Please enter phone number" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Employee</Button>
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
                        <Modal.Title>Edit Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => sethoten(e.target.value)} placeholder="Please enter Name" defaultValue={hoten}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>SDT</label>
                                <input type="email" className='form-control' onChange={(e) => setsdt(e.target.value)} placeholder="Please enter phone number" defaultValue={sdt} />
                                
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>



             {/* Modal for Move employee record */}
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
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => sethoten(e.target.value)} placeholder="Please enter Name" defaultValue={hoten}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>SDT</label>
                                <input type="email" className='form-control' onChange={(e) => setsdt(e.target.value)} placeholder="Please enter phone number" defaultValue={sdt} />
                                
                            </div>
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
            </div>



            </div>
      
      {/* <a>Code Chuc nang</a> */}
    </div>
  );
}

export default TungChiNhanh;

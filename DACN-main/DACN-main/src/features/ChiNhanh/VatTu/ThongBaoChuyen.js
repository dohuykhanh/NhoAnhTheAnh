import React, { useState, useEffect,useRef } from "react";
// import  "./cartcss.css" 
import { Button, Modal} from 'react-bootstrap'
import axios from "axios";
import moment from 'moment';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

const ThongBaoChuyen = ({ cart, setCart, handleChange,Data, setData }) => {
    // const [Data, setData] = useState([]);
    const [Data1, setData1] = useState([]);
    const [cn, setcn] = useState("")
    const [id,setId] = useState("");
  
    var Tenchinhanh= localStorage.getItem("TenChiNhanh");
    console.log("chinhanh",Tenchinhanh)
    var ChiNhanh=Tenchinhanh;
  

    const handleDelete = () =>{
        const url = `http://localhost:5001/PhieuChuyen/${id}`
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
  
    // const Getvattu = async () => {
  
    //   const url = `http://localhost:5001/PhieuChuyen/c/${Tenchinhanh}`
    //   axios.get(url)
    //             .then(response => {
    //                 const result = response.data;
    //                 const { status, message, data } = result;
                    
    //                 if (status !== 'SUCCESS') {
    //                     alert(message, status)
    //                 }
    //                 else {
    //                     setData(data)
    //                     console.log(data)
    //                     // setData1(Data[0].SanPham)
                        
    //                     // console.log("dataaaa1",Data1)
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //           }


              const handleclick = () => {
                setData1([]);
                setData1([...Data[0].SanPham]);
                
                console.log("dataaaa1",Data1)
        }

            //   useEffect(() => {
            //     Getvattu();
            // }, [])

            


            
  return (
   
<div>
<Button size='sm' variant='primary' onClick={handleclick}>Xem</Button>|
<div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Tên vật tư</th>
                                <th>số lượng</th>
                               
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data1.map((item) => item.map((it)=>
                            <tr key={it._id}>
                            <td>{it.TenVatTu}</td>
                             <td>{it.SoLuong}</td>
                           
                             <td>{it.Gia}</td>
                            
                            
                         </tr>
                         
                            )
                            
                            )}
                           
                        </tbody>
                        <tbody>
                            {Data.map((item) => 
                            <tr key={item._id}>
                            <td></td>
                             <td></td>
                           
                             <td></td>
                             <td>
                             <Button size='sm' variant='primary'onClick={() => {handleDelete(setId(item._id))}} >XAC THUC</Button>|
                             </td>
                            
                            
                         </tr>
                         
                            
                            
                            )}
                           
                        </tbody>
                    </table>

                    

                </div>
            </div>
</div>



  );
};

export default ThongBaoChuyen;

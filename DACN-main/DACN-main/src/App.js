import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DangNhap from './features/login/DangNhap';
import DangKy from './features/login/Dangky';

// import Navbar from './components/Navbar/header'
import ChiNhanh from './features/ChiNhanh/ChiNhanh'
import Kho from './features/Kho/Kho'
import ThongKe from './features/ThongKe/ThongKe'
import TaiKhoan from './features/TaiKhoan/TaiKhoan';
import Home from './layout/home/homeindex';
// import Chatclock from './components/chatandclock/chatclock';
import TungChiNhanh from './features/ChiNhanh/TungChiNhanh'
import 'bootstrap/dist/css/bootstrap.min.css';
// import VatTu from './features/ChiNhanh/VatTu/VatTu';
import VatTu from './features/ChiNhanh/VatTu/navbarchuyenvt';
import BanHang from './features/ChiNhanh/BANHANG/navbargiohang'


function App() {
    return (

        <
        Router >

        <
        Routes >

        <
        Route path = '/DangNhap'
        element = { <
            DangNhap > < /DangNhap>
        } >
        <
        /Route>

        <
        Route path = '/DangKy'
        element = { <
            DangKy > < /DangKy>
        } >
        <
        /Route> <
        Route path = '/ChiNhanh'
        element = { <
            Home >
            <
            ChiNhanh > < /ChiNhanh> <
            /Home>
        } >
        <
        /Route> <
        Route path = '/Kho'
        element = { <
            Home >
            <
            Kho > < /Kho> <
            /Home>
        } >
        <
        /Route> <
        Route path = '/ThongKe'
        element = { <
            Home >
            <
            ThongKe > < /ThongKe> <
            /Home>
        } >
        <
        /Route> <
        Route path = '/NhanVien'
        element = { <
            Home >
            <
            TaiKhoan > < /TaiKhoan> <
            /Home>
        } >

        <
        /Route> <
        Route path = '/TungChiNhanh'
        element = { <
            Home >
            <
            TungChiNhanh / >
            <
            /Home>
        } >
        <
        /Route> <
        Route path = '/VatTu'
        element = { <
            Home >
            <
            VatTu / >
            <
            /Home>
        } >
        <
        /Route>

        <
        Route path = '/BanHang'
        element = { <
            Home >
            <
            BanHang / >
            <
            /Home>
        } >
        <
        /Route>

        <
        /Routes>  <
        /Router>

    );
}

export default App;
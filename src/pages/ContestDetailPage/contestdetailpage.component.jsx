import React from 'react';
import Navbar from '../../components/Navbars/Navbar';
import { Space } from "antd";
import './contestdetailpage.styles.css'


const ContestDetail = () =>(
  
 <div>
    <Navbar contents={[{name:"Compete"},{name:"User"}]}></Navbar>
    <div>
      <h1 style={{backgroundColor:"white"}}>Contest Name</h1>
    </div>
    <Space>
      <div className='lefthalf'> <h1>om</h1> </div>
      <div className='righthalf' > <h1>soham</h1> </div>
    </Space>
    

 </div>


);
export default ContestDetail;
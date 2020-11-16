import React from 'react';
import Navbar from '../../components/Navbars/Navbar';
import { Space , Card } from "antd";
import './contestdetailpage.styles.css'


const ContestDetail = () =>(
  
 <div>
    <Navbar contents={[{name:"Compete"},{name:"User"}]}></Navbar>
    <div>
      <h1 style={{backgroundColor:"#A9A9A9"}}>Contest Name</h1>
    </div>
    <Space>
      <div className='lefthalf'> 
        
    
      <Card  style={{ marginBottom: 16 }} className='card-container' type="inner" title="Inner Card title" >
        Inner Card content
      </Card>

      <Card  style={{ marginBottom: 16 }} className='card-container' type="inner" title="Inner Card title" >
        Inner Card content
      </Card>
      
    

      </div>
      <div className='righthalf' >  </div>
    </Space>
    

 </div>


);
export default ContestDetail;
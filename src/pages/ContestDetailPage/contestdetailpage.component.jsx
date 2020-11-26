import React , {useState} from 'react';
import {Button} from 'antd';
import axios from "axios";

import Navbar from '../../components/Navbars/Navbar';

import './contestdetailpage.styles.css'
import QuestionCard from './QuestionCard/QuestionCard.component'

function ContestDetail  () {

  const [data,setData]= useState(
    {
      id:'',
      name:'',
      start_time:'',
      end_time:'',
      questions:[]
      
    }
  )

  

   
    // axios({method:"post",url:" https://api.onlinejudge.ml/auth/login" 
    //   ,data:{username:"admin" ,password:"admin@123"}})
    //   .then(res => {
    //     //console.log(res);
    //     localStorage.setItem('token',res.data.access)

    //   })
    //   .catch(error =>{
    //     console.log(error)
    //   })


    

 

    axios({method:"get",url:" https://api.onlinejudge.ml/contests/1" , headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"}})
     
        
       
        .then(res => {
          
     setData({id:res.data.id , name:res.data.name , start_time:res.data.start_time , end_time:res.data.end_time ,questions:res.data.questions })
  
    // data.questions.map(question =>console.log(question))
      })
      .catch(error =>{
        console.log(error)
      })
  // useEffect(()=>{
  //   console.log(data.questions)
    
  // },[])
// console.log(data.questions)
  return(
  
 <div style={{display:"flex" ,flexDirection:"column",width:"100%"}} >
    <Navbar contents={[{name:"Compete"},{name:"User"}]}></Navbar>

    <div >
  <h1 style={{color:"#019183",float:"left" , marginLeft:"25px"}}>{data.name}</h1>
    </div>


    <div className="space">
      <div className='lefthalf'> 
        
    
     
      <QuestionCard  questions={data.questions}></QuestionCard>

      
      </div>
      
      <div className='righthalf' > 
      <div style={{marginTop:"50px"}}><h2 style={{  color:"black"}}>Start time:{data.start_time}</h2></div>
      <div> <h2 style={{  color:"black"}}>End time:{data.end_time}</h2></div>
     
     
     
      <h3 style={{color:"black" , marginTop:"250px"}} >Leaderboard</h3>
      <Button  type="primary" > Show my Current Rank </Button>
      
       </div>

    </div>
    

 </div>
  )
  
  };
export default ContestDetail;
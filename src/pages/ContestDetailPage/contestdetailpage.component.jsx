import React from 'react';
import Navbar from '../../components/Navbars/Navbar';

import './contestdetailpage.styles.css'
import QuestionCard from './QuestionCard/QuestionCard.component'

const ContestDetail = () =>(
  
 <div style={{display:"flex" ,flexDirection:"column",width:"100%"}} >
    <Navbar contents={[{name:"Compete"},{name:"User"}]}></Navbar>
    <div >
      <h1 style={{color:"#019183",float:"left"}}>Contest Name</h1>
    </div>
    <div className="space">
      <div className='lefthalf'> 
        
    
     
      <QuestionCard className='quecard' contents={{title:"Tom&Jerry" ,difficulty:"Medium" ,SuccessRate:"50%" , maxScore:"100"}}></QuestionCard>

      <QuestionCard className='quecard' contents={{title:"Who is thief" ,difficulty:"Easy" ,SuccessRate:"50%" , maxScore:"100"}}></QuestionCard>

      <QuestionCard className='quecard' contents={{title:"Check for Prime" ,difficulty:"Hard" ,SuccessRate:"50%" , maxScore:"100"}}></QuestionCard>

      <QuestionCard className='quecard' contents={{title:"Aisha's Birthday" ,difficulty:"Easy" ,SuccessRate:"50%" , maxScore:"100"}}></QuestionCard>

      <QuestionCard className='quecard' contents={{title:"Count the jumps" ,difficulty:"Medium" ,SuccessRate:"50%" , maxScore:"100"}}></QuestionCard>
      
      </div>
      
      <div className='righthalf' > 
      <a style={{color:"black"}} href='/'>Leaderboard</a> </div>
    </div>
    

 </div>


);
export default ContestDetail;
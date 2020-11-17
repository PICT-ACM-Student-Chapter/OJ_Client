import React from 'react'
import {Button, Card} from 'antd';
import './QuestionCard.styles.css'

const QuestionCard =(props)=>{
   const {difficulty ,title,SuccessRate,maxScore} = props.contents;
   return (
   <div>
        <Card  style={{ marginBottom: 16 }} className='card-container'    >
<div className='cardtitle'><h2>{title}</h2> <Button type="primary" ghost> Solve Challenge </Button> </div>
<div className='cardcontent'> <p>{difficulty}</p> <p>Max Score:{maxScore}</p> <p>Success Rate:{SuccessRate}</p> </div>
    </Card>

   </div>
  
)}
export default QuestionCard;
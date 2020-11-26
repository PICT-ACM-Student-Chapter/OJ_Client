import React from 'react'
import {Button, Card} from 'antd';
import './QuestionCard.styles.css'

function QuestionCard (props){
    
     
  
   return (
   <div>
         <Card  style={{ marginBottom: 16 }} className='card-container'    >
          { props.questions.map(question => <div className='cardtitle'><h2>{question.name}</h2> <Button style={{color:"white"}} type="primary" ghost> Solve Challenge </Button> </div>)}
          { props.questions.map(question => <div className='cardcontent'><p>MaxScore:{question.score}</p>  </div>)}

         
         </Card>

   </div>
  
)}
export default QuestionCard;
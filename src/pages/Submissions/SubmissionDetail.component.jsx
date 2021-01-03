import React, {useEffect, useState} from "react";
import axios from "axios";
import SubmitComponent from "../../components/QuestionPage/Submit.component";

const SubmissionDetail = ({contestId, queId, record})=>{
    const [subLoading, setSubLoading] = useState(true)
    const [testcases, setTestcases] = useState([])
    const [passedTestCases, setPassedTestCases] = useState(0)

    useEffect(()=>{
        console.log(record)
        axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${contestId}/questions/${queId}/submit/${record.key}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res)=>{
                let ptc = passedTestCases
                res.data.verdicts.forEach(testcase => {
                    if (testcase.status === 'AC') {
                        ptc++;
                    }
                })
                setPassedTestCases(ptc)
                setTestcases(res.data.verdicts)
                return res
            })
            .then(()=>{
                setSubLoading(false)
            })

    // eslint-disable-next-line
    },[])

    return <SubmitComponent testCases={testcases} submissionLoading={subLoading} passedTestCases={passedTestCases}/>

}

export default SubmissionDetail
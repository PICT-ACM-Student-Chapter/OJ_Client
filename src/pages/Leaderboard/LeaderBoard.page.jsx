import {Table, Tag} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from "axios";

function LeaderBoard(props) {

    const [leaderBoard, setLeaderBoard] = useState([])
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState([])
    const [data, setData] = useState([])
    const [column, setColumn] = useState([
        {
            title: 'Rank',
            dataIndex: 'rank',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Score',
            dataIndex: 'score',
        },
        {
            title: 'Penalty',
            dataIndex: 'penalty',
        }])

    useEffect(() => {
        getLeaderBoard();
        getQuestions();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        generateData()
        // eslint-disable-next-line
    }, [questions]);


    const getLeaderBoard = () => {
        setLoading(true)

        axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/leaderboard`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setLeaderBoard(res.data.results)
                setLoading(false)
            })
            .catch(e => {
                console.log(e.data)
            })
    }

    const getQuestions = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                return setQuestions(res.data.questions)

            }).then(() => {
            generateData()

            setLoading(false)
        })
            .catch(e => {
                console.log(e.data)
            })
    }


    //TODO: SetColumn not working
    const generateData = () => {

        if (questions.length > 0) {

            questions.sort((a, b) => parseInt(a.order) - parseInt(b.order))
            console.log(questions.length)

            questions.map((que, i) => {

                console.log(que)
                //Set Coloumn for leaderboard table
                column.push({
                    title: `${que.question.name}`,
                    dataIndex: 'question',
                    key: 'question',
                    render: question => (
                        <>

                            <Tag color='geekblue'>
                                Score: {question[i].score}
                            </Tag>
                            <br/>
                            <br/>
                            <Tag color='volcano'>
                                Penalty: {question[i].penalty}
                            </Tag>

                        </>
                    )
                })
                setColumn(column)


                // if (i === (questions.length - 1)) {
                //
                //     console.log("asdas",column)
                //     setColumn(column)
                //
                // }
                //Create leaderboard data
                // leaderBoard.map(user=>{
                //
                //
                //
                // })

            })


        }

    }


    // const data = [
    //     {
    //         rank: 1,
    //         name: "ABC",
    //         score: 100,
    //         penalty: 100,
    //         question: [
    //             {
    //                 'score': '80',
    //                 'penalty': '15'
    //             },
    //             {
    //                 'score': '40',
    //                 'penalty': '5'
    //             },
    //         ],
    //
    //     },
    //     {
    //         rank: 2,
    //         name: "DEF",
    //         score: 75,
    //         question: [
    //             {
    //                 'score': '70',
    //                 'penalty': '15'
    //             },
    //             {
    //                 'score': '50',
    //                 'penalty': '5'
    //             },
    //         ],
    //     },
    //     {
    //         rank: 3,
    //         name: "XYZ",
    //         score: 100,
    //         penalty: 100,
    //         question: [
    //             {
    //                 'score': '20',
    //                 'penalty': '0'
    //             },
    //             {
    //                 'score': '40',
    //                 'penalty': '5'
    //             },
    //         ],
    //     }
    //
    // ]
    // const columns = [
    //     {
    //         title: 'Rank',
    //         dataIndex: 'rank',
    //     },
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //     },
    //     {
    //         title: 'Score',
    //         dataIndex: 'score',
    //     },
    //     {
    //         title: 'Penalty',
    //         dataIndex: 'penalty',
    //     },
    //     {
    //         title: 'Question 1',
    //         dataIndex: 'question',
    //         key: 'question',
    //         render: question => (
    //             <>
    //
    //                 <Tag color='geekblue'>
    //                     Score: {question[0].score}
    //                 </Tag>
    //                 <br/>
    //                 <br/>
    //                 <Tag color='volcano'>
    //                     Penalty: {question[0].penalty}
    //                 </Tag>
    //
    //             </>
    //         )
    //     },
    //     {
    //         title: 'Question 2',
    //         dataIndex: 'question',
    //         key: 'question',
    //         render: question => (
    //             <>
    //
    //                 <Tag color='geekblue'>
    //                     Score: {question[1].score}
    //                 </Tag>
    //                 <br/>
    //                 <br/>
    //                 <Tag color='volcano'>
    //                     Penalty: {question[1].penalty}
    //                 </Tag>
    //
    //             </>
    //         )
    //     },
    // ]
    return (
        <div>
            <Table bordered title={() => "Leader Board"} dataSource={data} columns={column}>

            </Table>
        </div>
    )
}

export default LeaderBoard

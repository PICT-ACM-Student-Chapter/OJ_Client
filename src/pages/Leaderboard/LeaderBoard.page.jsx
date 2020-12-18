import {Table, Tag} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from "axios";

const defaultCols = [
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
    }]

function LeaderBoard(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [column, setColumn] = useState([defaultCols])

    useEffect(() => {
        getLeaderBoard();
        getQuestions();

        // eslint-disable-next-line
    }, []);


    const getLeaderBoard = () => {
        setLoading(true)

        axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/leaderboard`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setLoading(false)
                generateData(res.data.results)
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
                generateColumns(res.data.questions)
            }).then(() => {
            setLoading(false)
        })
            .catch(e => {
                console.log(e.data)
            })
    }


    const generateColumns = (questions) => {
            // col = a copy of defaultCols
            let col = [...defaultCols];

            questions.sort((a, b) => parseInt(a.order) - parseInt(b.order))
            console.log(questions.length)

            questions.forEach((que, i) => {

                console.log(que)
                //Set Column for leaderboard table
                col.push({
                    title: `${que.question.name}`,
                    dataIndex: `question${que.question.id}`,
                    key: `question${i}`,
                    render: question => {
                        console.log(question)
                        if(question)
                            return (
                                <>

                                    <Tag color='geekblue'>
                                        Score: {question.score}
                                    </Tag>
                                    <br/>
                                    <br/>
                                    <Tag color='volcano'>
                                        Penalty: {question.penalty || 0}
                                    </Tag>

                                </>
                            )
                        return ''
                    },
                })

                if (i === (questions.length - 1)) {
                    console.log(col)
                    setColumn(col)
                }
            })

    }

    const generateData = (leaderBoard) => {
        //Create leaderboard data

        const lb = leaderBoard.map(row=>{
            const base = {
                name: row.user_id.username,
                score: row.total_score,
                penalty: row.total_penalty,
            }
            for(let i of row.questions){
                base[`question${i.que_id}`] = {score: i.score, pealty: i.penalty}
            }
            return base
        })
        lb.sort((a, b) => ((a.score === b.score) ? (b.score - a.score) : (a.penalty - b.penalty)))

        for(let i=0;i<lb.length;i++){
            lb[i].rank = i+1;
        }
        setData(lb)
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
            <Table bordered title={() => "Leader Board"} dataSource={data} columns={column}/>
        </div>
    )
}

export default LeaderBoard

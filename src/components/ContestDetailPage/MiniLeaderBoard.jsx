import {Button, Table, Typography} from 'antd'
import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import "./ContestDetail.css"
import {useHistory} from "react-router";
import UserContext from "../../context/User";

const defaultCols = [
    {
        title: <Typography.Title level={5}>Rank</Typography.Title>,
        dataIndex: 'rank',
        width: '5rem',
        fixed: 'left',
        align: 'center'
    },
    {
        title: <Typography.Title level={5}>Name</Typography.Title>,
        dataIndex: 'name',
        width: '20rem',
        fixed: 'left',
        align: 'center'
    },
    {
        title: <Typography.Title level={5}>Score</Typography.Title>,
        dataIndex: 'score',
        width: '12rem',
        fixed: 'left',
        align: 'center'
    }]

function MiniLeaderBoard(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const history = useHistory()
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.user !== null) {
            getLeaderBoard();
        }
        // eslint-disable-next-line
    }, [userContext.user]);


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


    const generateData = (leaderBoard) => {
        //Create leaderboard data
        let lb1=[];
        let size;
        const lb = leaderBoard.map((row, i) => {
                return {
                    name: row.user_id.username,
                    score: row.total_score,
                    penalty: row.total_penalty
                }

        })


        lb.sort((a, b) => ((a.score === b.score) ? (a.penalty - b.penalty) : (b.score - a.score)))

        console.log(lb, "line 83")

        for (let i = 0; i < lb.length; i++) {
            if (userContext.user.username === lb[i].name) {
                userContext.setRank(i + 1)
                userContext.setScore(lb[i].score)
            }
            lb[i].rank = i + 1;
        }

        if(lb.length < 7){
            size = lb.length
        }else{
            size = 7
        }
        for (let i = 0; i < size; i++) {
            lb1[i] = lb[i];
        }
        console.log(lb1)
        setData(lb1)
    }


    return (
        <div>
            <Typography.Title>Leaderboard</Typography.Title>
            {/*<Typography.Text level={3}>Your score: 256/680 | Rank: 5</Typography.Text>*/}
            <br/><br/>
            <Table bordered
                   rowClassName={(record, index) => userContext.user !== null ? record.name === userContext.user.username ? 'table-row' : console.log(record) : null}
                   dataSource={data} columns={defaultCols} loading={loading} pagination={false}/>
            <br/><br/>

            <Button size='large' block onClick={() => {
                history.push(`/leaderboard/${props.match.params.contestId}?back=${props.back}`)
            }}>
                Full Leaderboard
            </Button>
        </div>
    )
}

export default MiniLeaderBoard

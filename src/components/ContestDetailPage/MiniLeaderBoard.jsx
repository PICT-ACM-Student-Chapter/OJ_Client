import {Button, Table, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useHistory} from "react-router";

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

    useEffect(() => {
        getLeaderBoard();
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


    const generateData = (leaderBoard) => {
        //Create leaderboard data

        const lb = leaderBoard.map((row, i) => {

            if (i < 7) {
                return {
                    name: row.user_id.username,
                    score: row.total_score,
                    penalty: row.total_penalty
                }
            }

            return null
        })

        lb.sort((a, b) => ((a.score === b.score) ? (b.score - a.score) : (a.penalty - b.penalty)))

        for (let i = 0; i < lb.length; i++) {
            lb[i].rank = i + 1;
        }
        setData(lb)
    }


    return (
        <div>
            <Typography.Title>Leaderboard</Typography.Title>
            {/*<Typography.Text level={3}>Your score: 256/680 | Rank: 5</Typography.Text>*/}
            <br/><br/>
            <Table bordered dataSource={data} columns={defaultCols} loading={loading} pagination={false}/>
            <br/><br/>

            <Button size='large' block onClick={() => {
                history.push(`/leaderboard/${props.match.params.contestId}`)
            }}>
                Full Leaderboard
            </Button>
        </div>
    )
}

export default MiniLeaderBoard

import {Table} from 'antd'
import React from 'react'

function LeaderBoard() {
    const data = [
        {
            rank: 1,
            name: "ABC",
            score: 100,
        },
        {
            rank: 2,
            name: "DEF",
            score: 75,
        },
        {
            rank: 3,
            name: "XYZ",
            score: 50,
        }

    ]
    const columns = [
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
    ]
    return (
        <div>
            <Table bordered title={() => "Leader Board"} dataSource={data} columns={columns} scroll={{y: 240}}>

            </Table>
        </div>
    )
}

export default LeaderBoard

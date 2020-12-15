import {Table, Tag} from 'antd'
import React from 'react'

function LeaderBoard() {
    const data = [
        {
            rank: 1,
            name: "ABC",
            score: 100,
            penalty: 100,
            question: [
                {
                    'score': '80',
                    'penalty': '15'
                },
                {
                    'score': '40',
                    'penalty': '5'
                },
            ],

        },
        {
            rank: 2,
            name: "DEF",
            score: 75,
            question: [
                {
                    'score': '70',
                    'penalty': '15'
                },
                {
                    'score': '50',
                    'penalty': '5'
                },
            ],
        },
        {
            rank: 3,
            name: "XYZ",
            score: 100,
            penalty: 100,
            question: [
                {
                    'score': '20',
                    'penalty': '0'
                },
                {
                    'score': '40',
                    'penalty': '5'
                },
            ],
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
        {
            title: 'Penalty',
            dataIndex: 'penalty',
        },
        {
            title: 'Question 1',
            dataIndex: 'question',
            key: 'question',
            render: question => (
                <>

                    <Tag color='geekblue'>
                        Score: {question[0].score}
                    </Tag>
                    <br/>
                    <br/>
                    <Tag color='volcano'>
                        Penalty: {question[0].penalty}
                    </Tag>

                </>
            )
        },
        {
            title: 'Question 2',
            dataIndex: 'question',
            key: 'question',
            render: question => (
                <>

                    <Tag color='geekblue'>
                        Score: {question[1].score}
                    </Tag>
                    <br/>
                    <br/>
                    <Tag color='volcano'>
                        Penalty: {question[1].penalty}
                    </Tag>

                </>
            )
        },
    ]
    return (
        <div>
            <Table bordered title={() => "Leader Board"} dataSource={data} columns={columns}>

            </Table>
        </div>
    )
}

export default LeaderBoard

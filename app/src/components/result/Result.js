import React from 'react';
import { Table } from 'antd';
function Result(props) {
    const columns = [
        {
            title: 'Tên file',
            dataIndex: 'fileName',
            key: 'fileName'
        },
        {
            title: 'Giá trị TFIDF',
            dataIndex: 'tfidfValue',
            key: 'tfidfValue',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.tfidfValue - b.tfidfValue
        }
    ];

    return (
        <div>
            <Table
                dataSource={props.results}
                columns={columns}
                bordered={true}
            />
        </div>
    );
}

export default Result;

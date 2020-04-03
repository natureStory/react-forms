import React, {useState} from 'react';
import '../App.css';
import 'antd/dist/antd.css';

import data from '../data.json';
// import data from './data2.json';
// import data from './data3.json';
// import data from './data4.json';

import Forms from '../component/Forms';

export default function() {
    let formRef = {};
    const [columns, setColumns] = useState(2);

    return (
        <div className="App">
            <p>输入列数：<input type="text" onChange={(e) => setColumns(Number(e.target.value) || 2)}/></p>
            <p>指定 columns 为任意列即可</p>
            <Forms
                getForm={form => formRef = form}    // 非受控模式，用于表单校验、取值
                fieldsData={data}   // 接口表单数据
                columns={columns}     // 列数
            />
        </div>
    );
}
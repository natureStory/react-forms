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
    const [values, setValues] = useState({});

    return (
        <div className="App">
            <Forms
                getForm={form => formRef = form}    // 非受控模式，用于表单校验、取值
                fieldsData={data}   // 接口表单数据
                columns={2}     // 列数
            />
            <p>指定 columns 为任意列即可</p>
        </div>
    );
}
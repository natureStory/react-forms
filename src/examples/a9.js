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
    const [editStatus, setEditStatus] = useState(true);

    return (
        <div className="App">
            <Forms
                getForm={form => formRef = form}    // 非受控模式，用于表单校验、取值
                fieldsData={data}   // 接口表单数据

                editStatus={editStatus}   // 默认编辑状态，true

                values={editStatus ? null : values}             // 存在 values，则为受控模式
            />
            <p style={{color: 'red'}}>1. 需要在 mapApiToText 组件中定义取值和显示方式</p>
            <p style={{color: 'red'}}>2. editStatus 为 false，需配合 values 使用</p>
            <p>{JSON.stringify(values)}</p>
            <button onClick={() => {
                formRef && setValues(formRef.getFieldsValue());
                setEditStatus(!editStatus);
            }}
            >编辑保存</button>
        </div>
    );
}
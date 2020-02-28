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
            />
            <p>{JSON.stringify(values)}</p>
            <button onClick={() => {
                formRef.resetFields();
                formRef.setFieldsValue({realname: 123, birthday: '2020年 1 月 1 日'});
            }}>
                赋值
            </button>
            <button onClick={() => {
                formRef.validateFields((errors, values) => {
                    if (!errors) {
                        // todo: 此处的 useState 导致重渲染，导致所有数据丢失
                        setValues(values);
                        alert('校验通过，提交了');
                    }
                });
            }}>提交</button>
        </div>
    );
}
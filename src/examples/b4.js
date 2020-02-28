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

    return (
        <div className="App">
            <p>模拟场景：</p>
            <p>1. 自定义配置隐藏性别</p>
            <p>2. 自定义配置禁用首次参加工作时间</p>
            <Forms
                getForm={form => formRef = form}    // 非受控模式，用于表单校验、取值
                fieldsData={data}   // 接口表单数据
                hiddenFormItems={['gender']}       // 隐藏表单字段集合，例如：['gender']
                disabledFormItems={['begin_work_time']}       // 禁用表单字段集合，例如：['gender']
            />
        </div>
    );
}
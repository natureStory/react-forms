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
            <p>1. 填写姓名隐藏性别</p>
            <p>2. 填写姓名并自动填写公司邮箱</p>
            <p>3. 填写姓名禁用证件号、生日</p>
            <Forms
                getForm={form => formRef = form}    // 非受控模式，用于表单校验、取值
                fieldsData={data}   // 接口表单数据
                listenersConfig={[  // onchange 事件可自动处理，其余自定义事件将被传至表单组件，请自行处理
                    {handleEvent: 'onchange', handleParams: ['realname', 'id_no'], handleCallback: (realname, id_no) => {
                            fetch('http://localhost:3000/').then(data => console.log(data));
                            formRef.setFieldsValue({office_email: realname ? `${realname}@qq.com` : ''});
                    }},
                    {handleEvent: 'onblur', handleParams: ['realname', 'id_no'], handleCallback: () => {
                            /* 异步等... */
                    }},
                    // hide、disable 需要返回字段列表
                    {handleEvent: 'onchange', handleType: 'hide', handleParams: ['realname', 'id_no'], handleCallback: (realname = '', id_no) => {
                            /* 需要返回自定义的隐藏列表... */
                            if (realname) {
                                return ['gender'];
                            }
                    }},
                    {handleEvent: 'onchange', handleType: 'disable', handleParams: ['realname', 'id_no'], handleCallback: (realname = '', id_no) => {
                            /* 需要返回自定义的禁用列表... */
                            if (realname) {
                                return ['id_no', 'birthday'];
                            }
                    }},
                ]}
            />
        </div>
    );
}
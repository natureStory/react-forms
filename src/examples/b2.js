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
            <p>1. 姓名长度 10 以内</p>
            <p>2. 邮箱必须是邮箱格式</p>
            <p>3. 电话必须是数字</p>
            <Forms
                getForm={form => formRef = form}    // 非受控模式，用于表单校验、取值
                fieldsData={data}   // 接口表单数据
                selfRulesConfig={[      // 自定义验证规则
                    {
                        fieldName: 'office_email',
                        type: 'email',
                        message: '必须是邮箱！',
                    },
                    // {
                    //     fieldName: 'office_email',
                    //     validator: this.handleEMailValidator,
                    // },
                    {
                        fieldName: 'realname',
                        max: 10,
                        message: '太长啦！',
                    },
                    {
                        fieldName: 'telephone',
                        type: 'number',
                        message: '必须是数字！',
                    },
                ]}
            />
            <button onClick={() => {
                formRef.validateFields((errors, values) => {
                    if (!errors) {
                        alert('校验通过，提交了');
                    }
                });
            }}>提交</button>
        </div>
    );
}
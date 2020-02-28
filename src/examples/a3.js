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

    function onChange(fieldsDataItem, value) {
        console.log(fieldsDataItem, value);
        setValues({...values, [fieldsDataItem.properties.bizFieldName]: value});
        console.log(values);
    }

    return (
        <div className="App">
            <p>模拟场景：</p>
            <p>1. 填写姓名隐藏性别</p>
            <p>2. 填写姓名并自动填写公司邮箱</p>
            <p>3. 填写证件号码禁用生日，自动填写</p>
            <p>4. 提交显示表单数据</p>
            <Forms
                getForm={form => formRef = form}    // 非受控模式，用于表单校验、取值
                fieldsData={data}   // 接口表单数据
                values={values}             // 存在 values，则为受控模式
                onChange={onChange}     // 非受控模式下不建议使用
            />
            <p>{JSON.stringify(values)}</p>
            <button onClick={() => {
                console.log(values);
                alert('受控模式没有验证，可以自己在 onChange 监控，使用 extra 自定义错误显示')
            }}>提交</button>
        </div>
    );
}
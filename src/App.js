import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import data from './data.json';
// import data from './data2.json';

import Forms from './component/Forms';

function App() {
    let formRef;
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
                getForm={form => formRef = form}    // 获取表单，用于取值
                // bindFieldNames={'id'}    // 表单绑定的 唯一id/字段名， 例子：bindFieldNames={'properties.bizFieldName'} 就是取每项的 item.properties.bizFieldName
                columns={2}
                style={{width: 800}}
                // formItemStyle={{width: 200}}
                // formItemLayout={{
                //     labelCol: {
                //         xs: {span: 12},
                //     },
                //     wrapperCol: {
                //         xs: {span: 12},
                //     }
                // }}
                fieldsData={data}   // 接口表单数据
                // editStatus={true}   // 默认编辑状态
                listenersConfig={[  // onchange 事件可自动处理，其余自定义事件将被传至表单组件，请自行处理
                    {handleEvent: 'onchange', handleParams: ['realname', 'id_no'], handleCallback: (realname, id_no) => {
                            fetch('http://localhost:3000/').then(data => console.log(data));
                    }},
                    {handleEvent: 'onblur', handleParams: ['realname', 'id_no'], handleCallback: () => {
                            /* 异步等... */
                    }},
                    // hide、disable 需要返回字段列表
                    {handleEvent: 'onchange', handleType: 'hide', handleParams: ['realname', 'id_no'], handleCallback: (realname = '', id_no) => {
                            /* 需要返回自定义的隐藏列表... */
                            if (realname.indexOf('1') > -1) {
                                return ['id_no', 'birthday'];
                            }
                    }},
                    {handleEvent: 'onchange', handleType: 'disable', handleParams: ['realname', 'id_no'], handleCallback: (realname = '', id_no) => {
                            /* 需要返回自定义的禁用列表... */
                            if (realname.indexOf('1') > -1) {
                                return ['office_email'];
                            }
                    }},
                ]}
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
                        fieldName: 'office_email',
                        max: 10,
                        message: '太长啦！',
                    },
                    {
                        fieldName: 'telephone',
                        type: 'number',
                        message: '必须是数字！',
                    },
                ]}
                extra={{
                    realname: <span style={{color: 'purple'}}>你好</span>,
                    // begin_work_time: <span style={{color: 'green'}}>不好</span>,
                    gender: <span style={{color: 'purple'}}>你很好</span>,
                    // id_no: <span style={{color: 'green'}}>我不好</span>,
                }}
                // 作为特殊情况下的备用，请勿过度依赖，使用 listenersConfig 定义 hide、disable 更合适
                // values={values}             // 存在 values，则为受控模式，必须配合 onChange 使用
                // onChange={onChange}     // 非受控模式下不建议使用
                // hiddenFormItems={['gender']}       // 隐藏表单字段集合，例如：['gender']
                // disabledFormItems={['begin_work_time']}       // 禁用表单字段集合，例如：['gender']
            />
            <p>{JSON.stringify(values)}</p>
            <button onClick={() => {
                if (Object.values(values).length > 0) {
                    console.log(values);
                } else {
                    formRef.validateFields((errors, values) => {
                        if (!errors) {
                            alert('校验通过，提交了');
                        }
                    });
                    // formRef.setFieldsValue({realname: 123, birthday: '2020年 1 月 1 日'});
                }
            }}>提交</button>
        </div>
    );
}

export default App;

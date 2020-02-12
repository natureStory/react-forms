import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import data from './data.json';

import Forms from './component/Forms';

console.log(data);

function App() {
    const [submitted, submit] = useState(false);
    const [values, setValues] = useState({});
    const [disabledFormItems, setDisabledFormItems] = useState([]);
    const [hiddenFormItems, setHiddenFormItems] = useState([]);

    const relationListeners = {
        "realname": {   // 事件对应的 fieldName
            onChange: (value) => {      // onChange 事件，还可以有其他事件
                setValues((values) => {
                    return {
                        ...values,
                        'office_email': value ? `${value}@qq.com` : ''
                    };
                });
                setHiddenFormItems(value ? ['gender'] : []);
            }
        },
        "id_no": {
            onChange: (value) => {
                setValues((values) => {
                    return {
                        ...values,
                        'birthday': value ? `自动计算生日${value}` : ''
                    };
                });
                setDisabledFormItems(value ? ['birthday'] : []);
            }
        }
    };

    function onChange(fieldsDataItem, value) {
        setValues((values) => {
            return {
                ...values,
                [fieldsDataItem?.properties?.bizFieldName]: value
            };
        });
    }

    return (
        <div className="App">
            <p>模拟场景：</p>
            <p>1. 填写姓名隐藏性别</p>
            <p>2. 填写姓名并自动填写公司邮箱</p>
            <p>3. 填写证件号码禁用生日，自动填写</p>
            <p>4. 提交显示表单数据</p>
            <Forms
                fieldsData={data}   // 接口表单数据
                onChange={onChange}     // 更改数据
                relationListeners={relationListeners}   // 关联事件(onchange、onblur等，需要与组件对应)
                disabledFormItems={disabledFormItems}   // 禁用表单字段集合，例如：['birthday']
                hiddenFormItems={hiddenFormItems}       // 隐藏表单字段集合，例如：['gender']
                values={values}                         // 值，例如：{"office_email":"阿牛@qq.com","realname":"阿牛"}
            />
            <p>{submitted && JSON.stringify(values)}</p>
            <button onClick={() => {submit(true)}}>提交</button>
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import {Form} from 'antd';
import mapApiToKeyword from './mapApiToKeyword';
import mapApiToText from './mapApiToText';
import mapKeywordToComponent from './mapKeywordToComponent';

import './index.css';

const defaultFormItemLayout = {
    labelCol: {
        xs: {span: 8},
    },
    wrapperCol: {
        xs: {span: 16},
    }
};

const getBaseFieldName = (item, bindFieldNames) => {
    if (!bindFieldNames) {
        return item?.fieldName || item?.properties?.bizFieldName || item?.id;
    } else {
        return `${bindFieldNames.split('.').reduce((total, item) => total[item] || {}, item)}`;
    }
};
const renderFormItem = (item, editStatus, values, baseFieldName, Component, ComponentParams, getFieldDecorator, required, placeholder, selfRulesConfig) => {
    if (!editStatus) {      // 非编辑状态
        return (
            // todo: values 的 取值方式
            <div>{mapApiToText({type: item.type, unit: '', value: [(values || {})[baseFieldName]], ...item})}</div>
        );
    } else {
        return values ? (
            <Component value={values[baseFieldName]} {...ComponentParams}/>
        ) : getFieldDecorator(baseFieldName, {
            rules: [
                {required: required, message: placeholder},
                ...selfRulesConfig.filter(rule => rule.fieldName === baseFieldName)
            ],
        })(<Component {...ComponentParams}/>)}
};

function MapApiToForms({
                           form,
                           getForm = () => {},
                           bindFieldNames,
                           fieldsData = [],
                           editStatus = true,
                           columns = 1,
                           formItemStyle,
                           formItemLayout,
                           onChange = () => {},
                           values,
                           extra = {},
                           listenersConfig = [],
                           selfRulesConfig = [],
                           disabledFormItems = [],
                           hiddenFormItems = [],
                       }) {
    getForm(form);
    const {getFieldDecorator, getFieldsValue} = form || {};
    const [newDisabledFormItems, setNewDisabledFormItems] = useState([]);
    const [newHiddenFormItems, setNewHiddenFormItems] = useState([]);

    const change = (value, fieldsDataItem, ...restProps) => {
        const baseFieldName = getBaseFieldName(fieldsDataItem, bindFieldNames);

        // 执行 onChange 事件，以及 listenersConfig 中的 [onchange, disable, hide] 事件
        const listenerList = listenersConfig.filter(item => (item.handleEvent === 'onchange' && new Set(item.handleParams).has(baseFieldName)));
        listenerList.forEach(item => {
            let fieldsValues = values || getFieldsValue();
            fieldsValues[baseFieldName] = value;
            const result = item.handleCallback(...item.handleParams.map(param => fieldsValues[param])) || [];
            if (item?.handleType === "disable") {
                setNewDisabledFormItems([...result]);
            } else if (item?.handleType === "hide") {
                setNewHiddenFormItems([...result]);
            }
        });

        onChange(fieldsDataItem, value, restProps);
    };

    return fieldsData.map((item, index) => {
        const baseFieldName = getBaseFieldName(item, bindFieldNames);

        // todo: 需要确定的点，字段不统一
        const required = item?.required || item?.isRequired || item?.obLaunchRequired;
        // todo: 需要确定的点，字段不统一
        const placeholder = item?.placeholder || item?.tips || '请输入';
        const hide = new Set([...hiddenFormItems, ...newHiddenFormItems]).has(baseFieldName);
        // todo: 需要确定的点，字段不统一
        const disabled = item?.isReadonly || (item?.isCanModify !== undefined && !item?.isCanModify) || new Set([...disabledFormItems, ...newDisabledFormItems]).has(baseFieldName);
        const width = `${100/columns}%`;

        let componentName = mapApiToKeyword(item.type, baseFieldName);     // mapApiToKeyword，映射后端表单类型到表单组件名
        const Component = mapKeywordToComponent[componentName] || (() => null);     // mapKeywordToComponent，映射表单组件名到组件
        const ComponentParams = {       // 组件公共参数
            relationListeners: listenersConfig,   // 事件仍然往下传递，onblur、onClick 等则需要自己在组件里写
            placeholder: placeholder,
            onChange: change,
            data: item,
            key: index,
            disabled
        };

        return (
            !hide ? (
                <Form.Item
                    {...(formItemLayout || defaultFormItemLayout)}
                    label={item.label}
                    required={required}
                    key={baseFieldName}
                    className="form_item"
                    style={{flex: 1, width, minWidth: width, maxWidth: width, ...formItemStyle}}
                >
                    {renderFormItem(item, editStatus, values, baseFieldName, Component, ComponentParams, getFieldDecorator, required, placeholder, selfRulesConfig)}
                    {extra[baseFieldName]}
                </Form.Item>
            ) : null
        );
    });
}

export default function (props) {
    let Component;
    if (props.values) {
        // 非受控
        Component = MapApiToForms;
    } else {
        // 受控
        Component = Form.create()(MapApiToForms);
    }
    return (
        <Form style={props.style} className="form_content">
            <Component {...props}/>
        </Form>
    );
}

import React from 'react';
import {Form} from 'antd';
import mapApiToKeyword from './mapApiToKeyword';
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
let newDisabledFormItems = [], newHiddenFormItems = [];

function MapApiToForms({
                           form = {},
                           getForm = () => {},
                           bindFieldNames,
                           fieldsData = [],
                           editStatus = true,
                           columns = 1,
                           formItemStyle,
                           formItemLayout,
                           onChange = () => {},
                           values,
                           extra,
                           listenersConfig = [],
                           selfRulesConfig = [],
                           disabledFormItems = [],
                           hiddenFormItems = [],
                       }) {
    getForm(form);
    const {getFieldDecorator, getFieldsValue} = form;

    const change = (value, fieldsDataItem, ...restProps) => {
        const baseFieldName = getBaseFieldName(fieldsDataItem, bindFieldNames);

        // 执行 onChange 事件，以及 listenersConfig 中的 [onchange, disable, hide] 事件
        const listenerList = listenersConfig.filter(item => (item.handleEvent === 'onchange' && new Set(item.handleParams).has(baseFieldName)));
        listenerList.forEach(item => {
            let fieldsValues = values || getFieldsValue();
            fieldsValues[baseFieldName] = value;
            const result = item.handleCallback(...item.handleParams.map(param => fieldsValues[param])) || [];
            if (item?.handleType === "disable") {
                newDisabledFormItems = [...result];
            } else if (item?.handleType === "hide") {
                newHiddenFormItems = [...result];
            }
        });

        onChange(fieldsDataItem, value, restProps);
    };

    newDisabledFormItems = [...disabledFormItems, ...newDisabledFormItems];
    newHiddenFormItems = [...hiddenFormItems, ...newHiddenFormItems];

    return fieldsData.map((item, index) => {
        const baseFieldName = getBaseFieldName(item, bindFieldNames);

        let componentName = mapApiToKeyword(item.type, baseFieldName);     // mapApiToKeyword，映射后端表单类型到表单组件名
        const Component = mapKeywordToComponent[componentName] || (() => null);     // mapKeywordToComponent，映射表单组件名到组件
        const ComponentParams = {       // 组件公共参数
            relationListeners: listenersConfig,   // 事件仍然往下传递，onblur、onClick 等则需要自己在组件里写
            placeholder: item?.placeholder,
            onChange: change,
            data: item,
            key: index,
            disabled: item?.isReadonly || new Set(newDisabledFormItems).has(baseFieldName)
        };

        const hide = new Set(newHiddenFormItems).has(baseFieldName);
        const width = `${100/columns}%`;

        return (
            !hide ? <Form.Item
                {...(formItemLayout || defaultFormItemLayout)}
                label={item.label}
                required={item.isRequired}
                key={baseFieldName}
                className="form_item"
                style={{flex: 1, width, minWidth: width, maxWidth: width, ...formItemStyle}}
            >
                {values ? (
                    <Component
                        value={values[baseFieldName]}
                        {...ComponentParams}
                    />
                ) : getFieldDecorator(baseFieldName, {
                    rules: [
                        {
                            required: item?.isRequired,
                            message: item?.placeholder,
                        },
                        ...selfRulesConfig.filter(item => item.fieldName === baseFieldName)
                    ],
                })(
                    <Component
                        {...ComponentParams}
                    />
                )}
                {extra[baseFieldName]}
            </Form.Item> : null
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
        <div style={props.style} className="form_content">
            <Component {...props}/>
        </div>
    );
}

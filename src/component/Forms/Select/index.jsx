import React from "react";

import { Form, Select } from 'antd';

export default function ({data, disabled, formItemLayout = {}, onChange}) {
    const change = (value) => {
        onChange(data, value);
    };
    return (
        <Form.Item
            {...formItemLayout}
            label={data.label}
            required={data.isRequired}
        >
            <Select
                placeholder={data.placeholder}
                disabled={disabled}
                style={{width: '100%'}}
                onChange={change}
            >
                {
                    data.properties.options.map(item => (
                        <Select.Option value={item} key={item}>{item}</Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
    );
}
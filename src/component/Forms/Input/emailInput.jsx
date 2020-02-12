import React from "react";

import { Form, Input } from 'antd';

export default function ({data, value, formItemLayout = {}, onChange}) {
    const change = (e) => {
        onChange(data, e.target.value);
    };
    return (
        <Form.Item
            {...formItemLayout}
            label={data.label}
            required={data.isRequired}
        >
            <Input placeholder='请输入 email' value={value} onChange={change} />
        </Form.Item>
    );
}
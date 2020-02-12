import React from "react";

import { Form, Input } from 'antd';

export default function ({data, value, disabled, formItemLayout = {}, onChange}) {
    const change = (e) => {
        onChange(data, e.target.value);
    };
    return (
        <Form.Item
            {...formItemLayout}
            label={data.label}
            required={data.isRequired}
        >
            <Input placeholder={data.placeholder} disabled={disabled} value={value} onChange={change} />
        </Form.Item>
    );
}
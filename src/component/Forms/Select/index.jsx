import React from "react";

import { Select } from 'antd';

export default function ({data, placeholder, disabled, onChange}) {
    const change = (value) => {
        onChange(value, data);
    };
    return (
        <Select
            placeholder={placeholder}
            disabled={disabled}
            style={{width: '100%'}}
            onChange={change}
        >
            {
                (data?.properties?.options || data?.values).map(item => (
                    <Select.Option value={item} key={item}>{item}</Select.Option>
                ))
            }
        </Select>
    );
}
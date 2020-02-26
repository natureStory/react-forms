import React from "react";

import { Input } from 'antd';

export default function ({data, placeholder, value, disabled, onChange}) {
    const change = (e) => {
        onChange(e.target.value, data);
    };
    return (
        <Input placeholder={placeholder} disabled={disabled} value={value} onChange={change} />
    );
}
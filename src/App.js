import React from 'react';
import 'antd/dist/antd.css';
import {Collapse} from 'antd';

import A1 from './examples/a1';
import A2 from './examples/a2';
import A3 from './examples/a3';
import A4 from './examples/a4';
import A5 from './examples/a5';
import A6 from './examples/a6';
import A7 from './examples/a7';
import A8 from './examples/a8';
import A9 from './examples/a9';
import B1 from './examples/b1';

function App() {
    return (
        <Collapse defaultActiveKey="a2">
            <Collapse.Panel header="开发使用" key="a1"><A1/></Collapse.Panel>
            <Collapse.Panel header="示例：简单非受控组件" key="a2"><A2/></Collapse.Panel>
            <Collapse.Panel header="示例：简单受控组件" key="a3"><A3/></Collapse.Panel>
            <Collapse.Panel header="示例：指定绑定的 fieldName" key="a4"><A4/></Collapse.Panel>
            <Collapse.Panel header="示例：指定列数" key="a5"><A5/></Collapse.Panel>
            <Collapse.Panel header="示例：表单整体样式" key="a6"><A6/></Collapse.Panel>
            <Collapse.Panel header="示例：表单项样式" key="a7"><A7/></Collapse.Panel>
            <Collapse.Panel header="示例：表单的 label 占比" key="a8"><A8/></Collapse.Panel>
            <Collapse.Panel header="示例：编辑/非编辑 状态" key="a9"><A9/></Collapse.Panel>
            <Collapse.Panel header="示例：自定义关联事件" key="b1"><B1/></Collapse.Panel>
        </Collapse>
    );
}

export default App;

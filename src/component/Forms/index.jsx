import React from 'react';
import mapApiToKeyword from './mapApiToKeyword';
import mapKeywordToComponent from './mapKeywordToComponent';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

export default function mapApiToForms({fieldsData = [], onChange = () => {}, relationListeners = [], values = [], disabledFormItems = [], hiddenFormItems = []}) {
    const change = (fieldsDataItem, value, ...restProps) => {
        (relationListeners[fieldsDataItem?.properties?.bizFieldName]?.onChange || (()=> {}))(value);    // change 事件，如果 relationListeners 中有此表单的 onChange 事件，则触发
        onChange(fieldsDataItem, value, restProps);
    };
    return fieldsData.map((item, index) => {
        const judgeHasItem =  (list) => new Set(list).has(item?.properties?.bizFieldName);
        let componentName = mapApiToKeyword(item.type, item?.properties?.bizFieldName);     // mapApiToKeyword，映射后端表单类型到表单组件名
        const Component = mapKeywordToComponent[componentName] || (() => null);     // mapKeywordToComponent，映射表单组件名到组件
        const hide = judgeHasItem(hiddenFormItems);
        return (
            !hide ? <Component
                formItemLayout={formItemLayout}
                relationListeners={relationListeners}   // 事件仍然往下传递，onblur、onClick 等则需要自己在组件里写
                onChange={change}
                data={item}
                value={values[item?.properties?.bizFieldName]}
                key={index}
                disabled={judgeHasItem(disabledFormItems)}
            /> : null
        );
    })
}

// 之前映射分开写，清晰，但是冗余
// export function Forms({componentName, data, onChange}) {
//     const Component = mapKeywordToComponent[componentName] || (() => null);
//     return (
//         <Component
//             formItemLayout={formItemLayout}
//             onChange={onChange}
//             data={data}
//         />
//     );
// }
//
// export default function mapApiToForms({fieldsData = [], onChange = () => {}}) {
//     return fieldsData.map((item, index) => {
//         let componentName = mapApiToKeyword(item.type, item?.properties?.bizFieldName);
//         return (
//             <Forms
//                 data={item}
//                 componentName={componentName}
//                 onChange={onChange}
//                 key={index}
//             />
//         );
//     })
// }
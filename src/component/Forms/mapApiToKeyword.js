import mapKeywordToComponent from './mapKeywordToComponent';

const commonMaps = {
    1: 'Input',
    2: 'Input',
    3: 'Select',
    5: 'Input',
    7: 'Input',
    15: 'Input',
    16: 'Input',
};

// 为了解决实际业务中一个 type 对应多个组件的问题
const specialMaps = {
    1: {
        "office_email": 'E-mailInput'
    },
    15: {
        "telephone": 'NumberInput',
        "address": 'Address',
        "company": 'Company'
    }
};

function checkError() {
    console.error('警告：请保证仅在开发模式下验证！！！');
    console.log('start————配置正确性检查');
    Array.from(new Set([...Object.values(commonMaps), ...Object.values(specialMaps).reduce((total, item) => [...total, ...Object.values(item)], [])])).forEach(item => !mapKeywordToComponent[item] && console.error(`${item} 未在 mapKeywordToComponent.js 中配置，请前往配置！`));
    console.log('end————配置正确性检查');

}

// 配置正确性检查，请保证仅在开发模式下启用！其余环境请禁用
checkError();

export default function mapApiToKeyword(type, fieldName) {
    try {
        if (!fieldName) {
            return commonMaps[type];
        } else {
            return (specialMaps[type] || {})[fieldName] || commonMaps[type]
        }
    } catch (e) {
        return '';
    }
}
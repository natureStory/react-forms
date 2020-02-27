import mapKeywordToComponent from './mapKeywordToComponent';

const maps = {
    1: {
        defaultValue: 'Input',  // 默认类型
        exactValue: {           // 精细化类型
            "office_email": 'E-mailInput'
        }
    },
    2: {
        defaultValue: 'Input',
        exactValue: {

        }
    },
    3: {
        defaultValue: 'Select',
        exactValue: {

        }
    },
    5: {
        defaultValue: 'Input',
        exactValue: {

        }
    },
    7: {
        defaultValue: 'Input',
        exactValue: {

        }
    },
    15: {
        defaultValue: 'Input',
        exactValue: {
            "telephone": 'NumberInput',
            "address": 'Address',
            "company": 'Company',
        }
    },
    16: {
        defaultValue: 'Input',
        exactValue: {

        }
    },
};

function checkError() {
    console.error('警告：请保证仅在开发模式下验证！！！');
    console.log('start————配置正确性检查');
    Array.from(new Set(Object.values(maps).reduce((total, item) => {total.push(item.defaultValue); return [...total, ...Object.values(item.exactValue)]}, []))).forEach(item => {!(new Set(Object.keys(mapKeywordToComponent)).has(item)) && console.error(`【${item}】 组件未在 mapKeywordToComponent.js 中配置映射关系！请前往设置`);});
    console.log('end————配置正确性检查');

}
// 配置正确性检查，请保证仅在开发模式下启用！其余环境请禁用
checkError();

export default function mapApiToKeyword(type, fieldName) {
    try {
        if (!fieldName) {
            return maps[type]?.defaultValue;
        } else {
            return maps[type]?.exactValue[fieldName] || maps[type]?.defaultValue
        }
    } catch (e) {
        return '';
    }
}
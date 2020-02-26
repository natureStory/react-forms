const maps = {
    1: {
        defaultValue: 'Input',  // 默认类型
        exactValue: {           // 精细化类型
            "office_email": 'E-mailInput'
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
    15: {
        defaultValue: 'Input',
        exactValue: {
            "telephone": 'NumberInput'
        }
    },
    16: {
        defaultValue: 'Input',
        exactValue: {

        }
    },
};
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
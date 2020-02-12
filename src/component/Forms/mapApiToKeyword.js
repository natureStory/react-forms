const maps = {
    1: {
        defaultValue: 'input',  // 默认类型
        exactValue: {           // 精细化类型
            "office_email": 'e-mailInput'
        }
    },
    3: {
        defaultValue: 'select',
        exactValue: {

        }
    },
    5: {
        defaultValue: 'input',
        exactValue: {

        }
    },
    15: {
        defaultValue: 'input',
        exactValue: {

        }
    },
    16: {
        defaultValue: 'input',
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
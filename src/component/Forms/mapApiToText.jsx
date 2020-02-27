import moment from 'moment';
import './index.css';
import React from 'react';

export default ({ type, value = [], unit='', ...props }) => {
  if (!value || value.length === 0) {
    return '--';
  }
  switch (type) {
    case 1:
    case 3:
    case 10:
    case 11: {
      let str = value[0] || '--';
      if(str && (props.fieldName === "max_salary" || props.fieldName === "min_salary" || props.fieldName === "head_count")){
        str += unit;
      }
      return str;
    }
    case 2:
      if (value[0] && value[0] === '-') {
        return '--';
      }
      return value[0] ? moment(value[0]).format('YYYY-MM-DD') : null;
    case 4:
    case 5:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
      return value.filter(e => e && e.name).map(({name}) => name).join('、');
    case 6:
      return ` ${value[0].name || ''}${value[1].name || ''}${value[2].name || ''}${value[3] || ''}`;
    case 7: // 电话
      return ` ${value[0].country_code} ${value[0].value}`;
    case 0: // 图片
    case 8: // 附件
      return (
        <>
          {value.map((item, index) => {
            return (
              <p key={index} className="fileItem">
                {' '}
                <a className="fileLink" href={item.url}>
                  {item.name}
                </a>
              </p>
            );
          })}
        </>
      );
    case 9: //* 证件
      return ` ${value[0].id_type_display} ${value[0].id_no}`;
    case 25: {
      const str = value.filter(e => e && e.name).map(({name}) => name).join('、');
      return <div>
        <div>{str}</div>
        <div style={{color: 'rgb(173, 175, 183)', fontSize: '12px', lineHeight: '20px'}}>{props.description}</div>
      </div>;
    }

    default:
      return (value && JSON.stringify(value[0])) || '--';
  }
};

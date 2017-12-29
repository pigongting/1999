import moment from 'moment';
import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { removelocal } from './localpath';

function getTree(data, groups) {
  // if (!data) { return ''; }
  // let html = '\n<ul >\n';
  // for (let i = 0; i < data.length; i++) {
  //   html += '<li><a href="#">' + data[i].name + '</a>';
  //   html += getTree(groups[data[i].id]);
  //   html += '</li>\n';
  // }
  // html += '</ul>\n';
  // return html;

  const result = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (groups[item.id]) { item.submenu = getTree(groups[data[i].id], groups); }
    result.push(item);
  }

  return result;
}

export function treeMenu(data) {
  const tree = data || [];
  const groups = {};

  for (let i = 0; i < tree.length; i++) {
    if (groups[tree[i].parentId]) {
      groups[tree[i].parentId].push(tree[i]);
    } else {
      groups[tree[i].parentId] = [];
      groups[tree[i].parentId].push(tree[i]);
    }
  }

  return getTree(groups[0], groups);
}

export function changeDataType(data, changearr) {
  try {
    const newdata = data;

    changearr.map((item, index) => {
      switch (item.target) {
        case 'number2string':
          newdata[item.field] = (newdata[item.field] !== null) && newdata[item.field].toString();
          break;
        case 'number2arraystring':
          newdata[item.field] = (newdata[item.field] !== null) && [newdata[item.field].toString()];
          break;
        case 'arraynumber2arraystring':
          newdata[item.field] = (() => {
            const arr = [];
            newdata[item.field].map((ele) => {
              arr.push(ele.toString());
              return ele;
            });
            return arr;
          })();
          break;
        case 'string2arraynumber':
          newdata[item.field] = (() => {
            const arr = [];
            try {
              newdata[item.replace].split('-').map((ele) => {
                arr.push(parseInt(ele, 10));
                return ele;
              });

              if (item.removelast === true) {
                arr.pop();
              }
            } catch (e) {
              if (newdata[item.replace]) {
                arr.push(parseInt(newdata[item.replace], 10));
              } else {
                arr.push(newdata[item.field]);
              }
            }
            return arr;
          })();
          break;
        case 'boolean2number':
          newdata[item.field] = (newdata[item.field]) ? 1 : 2;
          break;
        case 'number2boolean':
          newdata[item.field] = (newdata[item.field] === 1) || false;
          break;
        case 'time2moment':
          newdata[item.field] = moment(newdata[item.field]);
          break;
        case 'time2time':
          newdata[item.field] = new Date(newdata[item.field]);
          break;
        case 'addrlevel':
          newdata[item.field] = (() => {
            const o = newdata[item.field];
            if (o) {
              const a = o.toString().split('').map((ele, i) => parseInt(ele, 10));
              const one = parseInt(`${a[0]}${a[1]}0000`, 10);
              const two = parseInt(`${a[0]}${a[1]}${a[2]}${a[3]}00`, 10);

              if (a[2] === 0 && a[3] === 0 && a[4] === 0 && a[5] === 0) {
                return [o];
              } else if (a[4] === 0 && a[5] === 0) {
                return [one, o];
              } else {
                return [one, two, o];
              }
            } else {
              return o;
            }
          })();
          break;
        default:
          break;
      }

      return item;
    });

    return newdata;
  } catch (e) {
    console.log(e);
  }
}

export function changeListData(data, changearr) {
  return data.map((item, index) => {
    const newItem = item;

    for (let i = 0; i < changearr.length; i++) {
      const ele = changearr[i];

      switch (ele.target) {
        case 'timestamp2time':
          newItem[ele.field] = moment(item[ele.field]).format(ele.format);
          break;
        default:
          break;
      }
    }

    return newItem;
  });
}

export function getPermissionVoList(that) {
  const { locale, submenudata } = that.props;
  const curpath = removelocal(that.props.location.pathname);

  let sourceArr = null;
  let returnObj = null;
  let returnOne = null;
  let returnArr = null;

  for (const key in submenudata) {
    if (key) {
      const sitem = submenudata[key];

      for (let ss = 0; ss < sitem.length; ss++) {
        const ssitem = sitem[ss];

        if (!ssitem.submenu) {
          if (`/${ssitem.url}` === curpath) {
            sourceArr = ssitem.permissionVoList;
            break;
          }
        } else {
          for (let i = 0; i < ssitem.submenu.length; i++) {
            const sssitem = ssitem.submenu[i];

            if (`/${sssitem.url}` === curpath) {
              sourceArr = sssitem.permissionVoList;
              break;
            }
          }
        }

        if (sourceArr) {
          break;
        }
      }
    }
  }

  if (sourceArr) {
    for (let i = 0; i < sourceArr.length; i++) {
      const item = sourceArr[i];

      if (item.url) {
        returnObj = returnObj || {};
        returnObj[item.url] = item;
      }

      if (item.url !== 'list' && item.url !== 'add') {
        if (!returnOne) {
          returnOne = item;
        } else {
          returnArr = returnArr || [];
          returnArr.push(item);
        }
      }
    }
  }

  return {
    permissionOne: returnOne,
    permissionArr: returnArr,
    permissionObj: returnObj,
  };
}

export function getRowPermissionVoList(that, row, permissionArr, permissionOne, basemodel, detailname) {
  if (permissionOne === null || permissionOne === undefined) {
    return null;
  }

  const { path, locale } = that.props;

  const OneAction = (
    <li className="permissionItem">
      {(permissionOne.url === 'edit') ?
        <a className="permissionItemText" href={`/${locale}/${basemodel}/${detailname}?id=${row.id}&edit=1&frommenu=${path}`} rel="noopener noreferrer" target="_blank" onClick={(e) => { that.props.handleOperation(e, permissionOne, row); }}>{permissionOne.name}</a>
        :
        <a className="permissionItemText" href={`/${locale}/${basemodel}/${permissionOne.url}?id=${row.id}&frommenu=${path}`} rel="noopener noreferrer" target="_blank" onClick={(e) => { that.props.handleOperation(e, permissionOne, row); }}>{permissionOne.name}</a>
      }
      {(permissionArr && permissionArr.length > 0) ? <div className="permissionItemLine" /> : null }
    </li>
  );

  const OthAction = (
    <li className="permissionItem">
      {(permissionArr) ? (permissionArr.length === 1) ?
        permissionArr.map((item, index) => {
          let permissionHref = '#';

          if (item.url === 'edit') {
            permissionHref = `/${locale}/${basemodel}/${detailname}?id=${row.id}&edit=1&frommenu=${path}`;
          } else {
            permissionHref = `/${locale}/${basemodel}/${item.url}?id=${row.id}&frommenu=${path}`;
          }

          return (
            <a key={index} href={permissionHref} rel="noopener noreferrer" target="_blank" onClick={(e) => { that.props.handleOperation(e, item, row); }}>{item.name}</a>
          );
        })
        :
        <Dropdown
          overlay={
            <Menu>
              {permissionArr.map((item, index) => {
                let permissionHref = '#';

                if (item.url === 'edit') {
                  permissionHref = `/${locale}/${basemodel}/${detailname}?id=${row.id}&edit=1&frommenu=${path}`;
                } else {
                  permissionHref = `/${locale}/${basemodel}/${item.url}?id=${row.id}&frommenu=${path}`;
                }

                return (
                  <Menu.Item key={index}>
                    <a href={permissionHref} rel="noopener noreferrer" target="_blank" onClick={(e) => { that.props.handleOperation(e, item, row); }}>{item.name}</a>
                  </Menu.Item>
                );
              })}
            </Menu>
          }
          placement="bottomRight"
        >
          <a className="ant-dropdown-link" href="" onClick={(e) => { e.preventDefault(); }}>更多 <Icon type="down" /></a>
        </Dropdown>
      : null}
    </li>
  );

  return (
    <ul className="permissionGroup">{OneAction}{OthAction}</ul>
  );
}

export function cutString(str, len) {
  /** 参数说明：
  * 根据长度截取先使用字符串，超长部分追加…
  * str 对象字符串
  * len 目标字节长度
  * 返回值： 处理结果字符串
  */

  // length属性读出来的汉字长度为1
  if (str.length * 2 <= len) {
    return str;
  }

  let strlen = 0;
  let s = '';

  for (let i = 0; i < str.length; i++) {
    s += str.charAt(i);

    if (str.charCodeAt(i) > 128) {
      strlen += 2;

      if (strlen >= len) {
        return `${s.substring(0, s.length - 1)}...`;
      }
    } else {
      strlen += 1;

      if (strlen >= len) {
        return `${s.substring(0, s.length - 2)}...`;
      }
    }
  }

  return s;
}

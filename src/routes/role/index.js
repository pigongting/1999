import React from 'react';
import { connect } from 'dva';
import { Menu, Dropdown, Modal } from 'antd';
import { getPermissionVoList, getRowPermissionVoList } from '../../utils/handleData';
import FormTablePage from '../../components/FormTablePage';

const pagespace = 'role';
const basemodel = 'role';
const detailname = 'detail';
const searchPlaceholder = '请输入搜索关键字...';

class Role extends React.Component {
  constructor(props) {
    super(props);

    this.permissionVoList = getPermissionVoList(this);
    console.log(this.permissionVoList);
  }

  render() {
    const { locale, path } = this.props;
    const { permissionArr, permissionOne, permissionObj } = this.permissionVoList;

    return (
      <FormTablePage
        namespace={pagespace}
        searchPlaceholder={searchPlaceholder}
        searchOptions={[
          {
            title: '岗位名称',
            value: 'name',
          },
        ]}
        formItems={[
          {
            type: 'Select',
            field: 'enabled',
            name: 'enabledName',
            label: '激活状态',
            width: 120,
          },
        ]}
        columns={[
          {
            title: '岗位名称',
            dataIndex: 'name',
          },
          {
            title: '岗位描述',
            dataIndex: 'remark',
          },
          {
            title: '排序',
            dataIndex: 'sort',
          },
          {
            title: '激活状态',
            dataIndex: 'enabled',
            render: (text, record, index) => {
              let statusEle = null;
              switch (text) {
                case true:
                  statusEle = <div className="status-running">已激活</div>;
                  break;
                case false:
                  statusEle = <div className="status-disabled">未激活</div>;
                  break;
                default:
                  break;
              }
              return statusEle;
            },
          },
          {
            title: '所属系统',
            dataIndex: 'systemId',
          },
          {
            title: '岗位类型',
            dataIndex: 'roleType',
          },
          {
            title: '操作',
            key: 'operation',
            permission: !permissionOne,
            render: (text, row, index) => getRowPermissionVoList(this, row, permissionArr, permissionOne, basemodel, detailname),
          },
        ]}
        headerOperates={(permissionObj && permissionObj.add) ? <div><a href={`/${locale}/${basemodel}/${detailname}?frommenu=${path}`} rel="noopener noreferrer" target="_blank">新增模块</a></div> : null}
      />
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleOperation: (e, operation, row) => {
      // e.nativeEvent.stopImmediatePropagation();
      switch (operation.url) {
        case 'delete':
          e.preventDefault();
          Modal.confirm({
            title: '您确定要删除这条信息吗？',
            content: '删除后将无法恢复，请谨慎操作！',
            onOk: () => { dispatch({ type: `${pagespace}/fetchRoleDelete`, payload: row }); },
          });
          break;
        default:
          break;
      }

      dispatch({ type: `${pagespace}/recordClickedRow`, payload: row.id });
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    path: state.routing.locationBeforeTransitions.pathname,
    locale: state.ssr.locale,
    submenudata: state.pageframe.submenudata,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Role);

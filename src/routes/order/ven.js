import React from 'react';
import { connect } from 'dva';
import { Menu, Dropdown } from 'antd';
import { getPermissionVoList, getRowPermissionVoList, cutString } from '../../utils/handleData';
import FormTablePage from '../../components/FormTablePage';

const pagespace = 'orderven';
const basemodel = 'order/ven';
const detailname = 'vendetail';
const tablefetch = 'fetchOrderCenConPagingSupplier';
const searchPlaceholder = '请输入搜索关键字...';

class OrderDis extends React.Component {
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
        tablefetch={tablefetch}
        searchPlaceholder={searchPlaceholder}
        searchOptions={[
          {
            title: '商品名称',
            value: 'proName',
          },
          {
            title: '订单编号',
            value: 'orderNo',
          },
          {
            title: '总代理名称',
            value: 'agencyName',
          },
          {
            title: '物流单号',
            value: 'orderExpressNo',
          },
        ]}
        formItems={[
          {
            type: 'RangePicker',
            field: 'createTime',
            label: '订单日期',
          },
          {
            type: 'Select',
            field: 'payType',
            name: 'payTypeName',
            label: '支付方式',
            width: 120,
          },
          {
            type: 'Select',
            field: 'orderStatus',
            name: 'orderStatusName',
            label: '订单状态',
            mode: 'multiple',
            allowClear: true,
            dropdownMatchSelectWidth: false,
            dropdownStyle: {
              width: 100,
            },
          },
        ]}
        columns={[
          {
            title: '卖家订单编号',
            dataIndex: '',
          },
          {
            title: '供应商',
            dataIndex: '',
          },
          {
            title: '订单日期',
            dataIndex: '',
          },
          {
            title: '商品名称',
            dataIndex: '',
          },
          {
            title: '规格型号',
            dataIndex: '',
          },
          {
            title: '单位',
            dataIndex: '',
          },
          {
            title: '数量',
            dataIndex: '',
          },
          {
            title: '单价',
            dataIndex: '',
          },
          {
            title: '金额',
            dataIndex: '',
          },
          {
            title: '运费',
            dataIndex: '',
          },
          {
            title: '结算金额',
            dataIndex: '',
          },
          {
            title: '交易状态',
            dataIndex: '',
          },
          {
            title: '订单状态',
            dataIndex: '',
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
    handleOperation: (item, key, keyPath, id) => {
      switch (key) {
        case '2':
          dispatch({ type: `${pagespace}/fetchDeleteRow`, payload: [id] });
          break;
        default:
          break;
      }

      dispatch({ type: `${pagespace}/recordClickedRow`, payload: id });
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDis);

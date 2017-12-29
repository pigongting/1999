import React from 'react';
import moment from 'moment';
import cs from 'classnames';
import { connect } from 'dva';
import { Link } from 'dva/router';
// antd 组件
import { notification, Layout, Button, DatePicker, Dropdown, Table, Pagination, Input, Select, Menu, Icon, Modal, Checkbox, Row, Col } from 'antd';
// 请求重试
import { retry } from '../utils/requesterror';
// 本页样式
import styles from './Index.less';

// antd 组件扩展
const { Header, Footer, Sider, Content } = Layout;
const { MonthPicker, RangePicker } = DatePicker;
const InputGroup = Input.Group;
const ItemGroup = Menu.ItemGroup;
const Option = Select.Option;

class Index extends React.Component {
  constructor(props) {
    super(props);

    // if (typeof window !== 'undefined') {
    //   import(/* webpackChunkName: "lodash" */ 'lodash')
    //   .then(_ => {
    //     console.log(149174);
    //   })
    //   .catch(err => console.log('Failed to load moment', err));
    // }
  }

  render() {
    return (
      <Layout className={styles.tablePage}>
        <Header className={styles.tableHeader}>标题</Header>
        <Content style={{ overflowY: 'auto', padding: '0 10px 0 16px' }}>内容</Content>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.effects['index/fetch'],
    pagedata: state.index,
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

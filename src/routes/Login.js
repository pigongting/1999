import React from 'react';
import cs from 'classnames';
import { connect } from 'dva';
import { Layout, Form, Input, Button, Icon } from 'antd';
import styles from './Login.less';

const { Content } = Layout;

const pagespace = 'login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props.pagedata.form = this.props.form;
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(this.props);
  }

  render() {
    const { form, pagedata } = this.props;
    const { req, res, set } = pagedata;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('loginName') && getFieldError('loginName');
    const passwordError = isFieldTouched('loginPwd') && getFieldError('loginPwd');
    const validateCodeError = isFieldTouched('validateCode') && getFieldError('validateCode');

    return (
      <Layout className={styles.loginPage}>
        <Content className={styles.loginContent}>
          <div className={styles.formWarp}>

            <div className={styles.logo}><img src="/assets/img/brand/login_logo.png" alt="logo" /></div>

            <div className={styles.systemName}>我连网-中控平台中心</div>

            <div className={styles.formBox}>
              <Form onSubmit={(e) => { this.props.submitForm(set.mode, form, e); }}>

                <Form.Item
                  validateStatus={usernameError ? 'error' : ''}
                  help={usernameError || ''}
                >
                  {getFieldDecorator('loginName', {
                    rules: [{ required: true, message: '请输入登录名！' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="登录名" />,
                  )}
                </Form.Item>

                <Form.Item
                  validateStatus={passwordError ? 'error' : ''}
                  help={passwordError || ''}
                >
                  {getFieldDecorator('loginPwd', {
                    rules: [{ required: true, message: '请输入登录密码！' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="登录密码" />,
                  )}
                </Form.Item>

                <Form.Item
                  validateStatus={validateCodeError ? 'error' : ''}
                  help={validateCodeError || ''}
                >
                  {getFieldDecorator('validateCode', {
                    rules: [{ required: true, message: '请输入验证码！' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="验证码" />,
                  )}
                  <img src="http://192.168.3.37:8002/imagecode" alt="" />
                  <img src="http://10.10.11.22:8081/imagecode" alt="" />
                </Form.Item>

                <Form.Item>
                  <Button
                    className={styles.submitButton}
                    type="primary"
                    size="large"
                    htmlType="submit"
                    disabled={this.props.hasErrors(getFieldsError())}
                  >登录</Button>
                </Form.Item>

              </Form>
            </div>

            <ul className={styles.feature}>
              <li>
                <div className={cs(styles.featureIcon, styles.Icon01)} />
                <div className={styles.featureText}>帮助实体企业线上线下互动</div>
              </li>
              <li>
                <div className={cs(styles.featureIcon, styles.Icon02)} />
                <div className={styles.featureText}>消费者的贴身丫鬟</div>
              </li>
              <li>
                <div className={cs(styles.featureIcon, styles.Icon03)} />
                <div className={styles.featureText}>基于工业4.0的神经</div>
              </li>
              <li>
                <div className={cs(styles.featureIcon, styles.Icon04)} />
                <div className={styles.featureText}>全天候全渠道随时联系</div>
              </li>
            </ul>

          </div>
        </Content>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    hasErrors: (fieldsError) => {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    },
    submitForm: (mode, form, e) => {
      // 阻止表单提交
      e.preventDefault();
      // 验证表单
      form.validateFields((err, values) => {
        if (!err) {
          // 更新表单参数
          dispatch({
            type: `${pagespace}/updateFormReq`,
            payload: form.getFieldsValue(),
          });
          // 请求接口
          dispatch({
            type: 'login/fetchLogin',
          });
        }
      });
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    pagedata: state[pagespace],
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields(props) {
    const { pagedata } = props;
    const { req, form } = pagedata;
    const { fields } = req;
    // console.log(fields);
    // console.log(form);
    const formdata = form && form.getFieldsValue();
    const newmap = {};

    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const fieldskeyvalue = fields[key].value;
        const formkeyvalue = formdata && formdata[key];

        if (fieldskeyvalue !== undefined) {
          newmap[key] = fields[key];
        } else if (formkeyvalue !== undefined) {
          newmap[key] = { value: formkeyvalue };
        } else {
          newmap[key] = undefined;
        }
      }
    }
    // console.log(newmap);
    return newmap;
  },
})(Login));

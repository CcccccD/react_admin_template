import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Breadcrumb, Icon } from 'antd';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import './BasicLayout.less';
import { connect } from 'dva';
import SiderMenu from '../components/SideMenu';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter'
import config from '../config';
import { getMenuData } from '../config/menu';
import { getRoutes } from '../common/utils';
import Authorized from '../common/Authorized';
const { Header, Content, Footer } = Layout;
/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
  const result = {};
  const childResult = {};
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i;
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
    }
  }
  return Object.assign({}, routerData, result, childResult);
};
@connect(({ login }) => ({
  currentUser: login.user,
}))
export default class BasicLayout extends React.Component {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  state = {
    collapsed: false,
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData),
    };
  }
  componentWillMount() {
    // this.props.dispatch()
    if (!localStorage.getItem('token')) {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  };
  render = () => {
    const user = JSON.parse(localStorage.getItem("user")) || { realName: '请登录' };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu
          collapsible
          collapsed={this.state.collapsed}
          location={this.props.location}
          onCollapse={this.onCollapse}
          menuData={getMenuData()}
          Authorized={Authorized}
          logo={config.logo}
        />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <GlobalHeader
              logo={config.logo}
              currentUser={{ userName: user.realName }}
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              onMenuClick={this.handleMenuClick}
            />
          </Header>
          <Content>
            <Switch>
              {redirectData.map(item => (
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
              {getRoutes(this.props.match.path, this.props.routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                // authority={item.authority}
                // redirectPath="/exception/403"
                />
              ))}
              {/* <Redirect exact from="/" to={bashRedirect} /> */}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <GlobalFooter
              links={[
                {
                  key: '文档',
                  title: '文档',
                  href: 'http://ant.design',
                  blankTarget: true,
                },
                {
                  key: 'gitlab',
                  title: (<span><Icon type="github" /><span>gitlab</span></span>),
                  href: 'http://gitlab.gs.9188.com/caiyi.html5.public/template-antd-pro',
                  blankTarget: true,
                },
                {
                  key: '有鱼金融',
                  title: '有鱼金融',
                  href: 'https://www.youyuwo.com',
                  blankTarget: true,
                },
              ]}
              copyright={
                <Fragment>
                  Copyright <Icon type="copyright" /> 2018 {config.projectName}
                </Fragment>
              }
            />
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

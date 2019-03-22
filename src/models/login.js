import { routerRedux } from 'dva/router';
import { reloadAuthorized } from '../common/Authorized';
import { setAuthority } from '../common/authority';
import { message } from 'antd';
import {login} from '../common/api';
import {requestPost} from '../common/request'
import {loginRedirectUrl} from '../config/index'
export default {
  namespace: 'login',

  state: {
    user: null,
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log(payload);
      if(payload&&payload.username === 'admin' &&payload.password === '123456'){
          localStorage.setItem("token",'3123333333333');
          localStorage.setItem("user",JSON.stringify({realName:'李白'}));
          // localStorage.setItem("permissions",JSON.stringify(response.data.permissions))
          window.location.replace(loginRedirectUrl)
      }else{
        message.error("用户名密码错误");
        // yield put(routerRedux.push('/user/login'));
      }
      
    },
    *logout({ payload }, { call, put }) {
      localStorage.clear();
      // reloadAuthorized();
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
  },
};
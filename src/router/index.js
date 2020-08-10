// import React from 'react';

import Home from '../pages/home';
import Login from '../pages/login';
import Index from '../pages/index';
// import List from '../pages/list';
import My from '../pages/my';
import Setting from '../pages/setting';
import Detail from '../pages/detail';
import Release from '../pages/release';
import Dynamic from '../pages/dynamic';
import DynamicDetail from '../pages/dynamicDetail';
import UserDetail from '../pages/userDetail';
const routes = [
  {
    path: '/',
    component: Index,
    exact: true,
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/index',
        component: Dynamic
      },
      {
        path: '/home/my',
        component: My
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/setting',
    component: Setting
  },
  {
    path: '/release',
    component: Release
  },
  {
    path: '/user-detail/:userid',
    component: UserDetail
  },
  {
    path: '/dynamic-detail/:dynamicid',
    component: DynamicDetail
  }
];

export { routes }
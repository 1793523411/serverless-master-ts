import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { message } from 'antd';

import { Tag, Divider } from 'antd';
const success = () => {
  message.success('登录成功');
};
const warn = () => {
  message.warning('暂时还不允许注册');
};
const err = () => {
  message.error('用户名或密码错误');
};

const key = 'updatable';

function Login(props){
 const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    // console.log('name is', name)
    // console.log('password is', password)

    warn()
    // fetch(`/api/register?name=${name}&password=${password}`)
    // .then(resp => resp.json())
    // .then(resp => {
    //   if (resp.success === true) {
    //     props.history.push('/index')
    //   }
    // })
  }

  const handleLogin = () => {
    // console.log('name is', name)
    // console.log('password is', password)
    message.loading({ content: 'Loading...', key });
    fetch(`/api/login?name=${name}&password=${password}`)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.success === true) {
        // success()
        message.success({ content: '登陆成功!', key, duration: 3 })
        props.history.push('/index')
        // alert(`登录成功，用户名：${resp.user.name}`)
      } else {
        // alert(`登录失败，提示信息：${resp.message}`)
        err()
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://wx-xly-1301545895.cos.ap-beijing.myqcloud.com/wx-image/u%3D4032763602%2C621091811%26fm%3D26%26gp%3D0.jpg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            注册或者登录<br/>
                        <Tag color="red">用户名：ygj  密码：123456</Tag>
            </h2>

        </div>
        <form className="mt-8" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                onChange={e => {
                  // console.log('当前输入的账号是：', e.target.value)
                  setName(e.target.value)
                }}
                aria-label="Email address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="username" />
            </div>
            <br/>
            <div className="-mt-px">
              <input
                onChange={e => {
                  setPassword(e.target.value)
                }}
                aria-label="Password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
            </div>
          </div>
          <div className="mt-6">
            <button  type="button" onClick={handleRegister} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              </span>
                注册
              </button>
          </div>
          <div className="mt-6">
            <button type="button" onClick={handleLogin} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              </span>
                登录
              </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
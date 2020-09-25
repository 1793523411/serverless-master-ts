import React, { useState, useEffect, createContext } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { message } from 'antd';
import { FormInstance } from 'antd/lib/form';


const success = () => {
  message.success('添加成功');
};

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: '${label} 不能为空!',
  types: {
    number: '${label} 不是一个有效的数字',
  },
  number: {
    range: '${label} 必须在 ${min} - ${max}之间',
  },
};

function Addperson() {
  const formRef:any = React.createRef<FormInstance>();


 const onFinish = values => {
   //在这里发请求存数据
   fetch(`/api/personadd?name=${values.user.name}&originze=${values.user.originze}&age=${values.user.age}&job=${values.user.job}&grade=${values.user.grade}&tags=${values.user.tags}`)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.success === true) {
       success()
      }
    })
    // console.log(values.user.name);
    formRef.current.resetFields();
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} ref={formRef}>
      <Form.Item name={['user', 'name']} label="名字" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'originze']} label="组织">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'job']} label="学院/专业">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'grade']} label="年级" rules={[{ type: 'number', min: 16, max: 50 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'tags']} label="职务">
        <Input placeholder="两个名词之间请用空格隔开用以区分"/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
        <Button type="primary" htmlType="submit">
          添加
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Addperson
import React, { useState, useEffect, createContext } from 'react';
import { Table, Tag, Space, Modal, Form, Input, InputNumber, Button } from 'antd';
import { message } from 'antd';
import { finished } from 'stream';
import { FormInstance } from 'antd/lib/form';

const success = () => {
  message.success('删除成功');
};
const success2 = () => {
  message.success('修改成功');
};

const { Column, ColumnGroup } = Table;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
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
const key = 'updatable';
function Manager(props) {
  const [person, setPerson] = useState([])
  const [idtm, setIdtm] = useState("")
  const [user, setUser] = useState({
    name: "",
    originze: "",
    age: "",
    job: "",
    grade: "",
    tags: ""
  })
  const [state, setState] = useState({
    // ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  })

  const getList = () => {
    const hide = message.loading({
      content: 'Loaded!',  duration: 0, style: {
        marginTop: '40vh',
      },
    });
    fetch('/api/personlist').then(resp => resp.json()).then((person) => {
      hide()
      person.list.forEach(item => {
        item.tags = item.tags.split(' ')
      });
      // console.log(person.list)
      setPerson(person.list)
    })
  };

  useEffect(getList, [])

  const removePerson = async (id) => {
    await fetch('/api/personremove?id=' + id)
    success()
    getList()
  }

  // setState = {
  //   ModalText: 'Content of the modal',
  //   visible: false,
  //   confirmLoading: false,
  // };
  // const { form } = props;
  // const formRef:any = React.createRef<FormInstance>();
  const showModal = async (id) => {
    setState({
      visible: true,
      confirmLoading: false,
    });
    setIdtm(id)
    fetch('/api/getone?id=' + id).then(resp => resp.json()).then((person) => {
      // console.log(person[0])
      setUser(person[0])
      // const user2 = {name:123}
      // props.form.setFieldsValue({name:'123'});   
    })
  };

  const formRef: any = React.createRef<FormInstance>();
  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setState({
      visible: false,
      confirmLoading: false,
    });
    formRef.current.resetFields();
  };

  const onFinish = values => {
    //在这里发请求存数据
    let name = values.user.name ? values.user.name : user.name
    let originze = values.user.originze ? values.user.originze : user.originze
    let age = values.user.age ? values.user.age : user.age
    let job = values.user.job ? values.user.job : user.job
    let grade = values.user.grade ? values.user.grade : user.grade
    let tags = values.user.tags ? values.user.tags : user.tags
    let res = {
      name,
      originze,
      age,
      job,
      grade,
      tags,
    }
    // console.log(res);
    fetch(`/api/personupdate?id=${idtm}&name=${name}&originze=${originze}&age=${age}&job=${job}&grade=${grade}&tags=${tags}`)
      .then(resp => resp.json())
      .then(resp => {
        // if (resp.success === true) {
        success2()
        getList()
        // }
      })
    formRef.current.resetFields();
    setState({
      // ModalText: 'The modal will be closed after two seconds',
      visible: false,
      confirmLoading: true,
    });

    // formRef.current.resetFields();
  };

  return (
    <div>
      <Table dataSource={person} pagination={false}>

        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="组织" dataIndex="originze" key="originze" />

        <Column title="年龄" dataIndex="age" key="age" />
        <Column title="学院/专业" dataIndex="job" key="job" />
        <Column title="年级" dataIndex="grade" key="grade" />
        <Column
          title="职务"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="操作"
          key="action"
          render={(text, record: any) => (
            <Space size="middle">
              <a onClick={() => showModal(record.id)}>修改</a>
              <a onClick={() => removePerson(record.id)}>删除</a>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="修改"
        visible={state.visible}
        // confirmLoading={state.confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} ref={formRef} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={['user', 'name']} label="名字" >
            <Input placeholder={user.name} />
          </Form.Item>
          <Form.Item name={['user', 'originze']} label="组织">
            <Input placeholder={user.originze} />
          </Form.Item>
          <Form.Item name={['user', 'age']} label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber placeholder={user.age} />
          </Form.Item>
          <Form.Item name={['user', 'job']} label="学院/专业">
            <Input placeholder={user.job} />
          </Form.Item>
          <Form.Item name={['user', 'grade']} label="年级" rules={[{ type: 'number', min: 16, max: 50 }]}>
            <InputNumber placeholder={user.grade} />
          </Form.Item>
          <Form.Item name={['user', 'tags']} label="职务">
            <Input placeholder={user.tags} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button type="primary" htmlType="submit">
              提交修改
        </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Manager
import React, { useState, useEffect, createContext } from 'react';
import marked from 'marked'
import hljs from "highlight.js";
import { Row, Col, Input, Button ,message} from 'antd'
import 'highlight.js/styles/tomorrow.css';
import '../addnew.css'
import moment from 'moment';

import Tocify from '../utils/tocify'
// const ReactMarkdown = require('react-markdown')
// const ReactMarkdown = require('react-markdown/with-html')

const { TextArea } = Input
const success = () => {
  message.info('该功能还处在开发阶段');
};

function Addnews() {

  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [title, setTitle] = useState('') //html内容
  const [text, setText] = useState('') //html内容
  const [author, setAuthor] = useState('') //html内容

  const tocify =new Tocify()
  const renderer = new marked.Renderer();
   renderer.heading = function(text, level, raw) {
     const anchor = tocify.add(text, level);
     return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
   };
  marked.setOptions({
    renderer: renderer,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
    breaks: true, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: true, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
  })

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const chartinit = () => {
    success()
    /*
    let time = moment().format("YYYY-MM-DD HH:mm")
    // console.log(author)
    // console.log(articleContent)
    let arr:any[] = [[1,,2],[3,4]]
    let obj = {
      title,
      text,
      author,
      articleContent,
      time
    }
    arr.push(obj)
    console.log(arr)
    console.log(typeof time)
    console.log(markdownContent)
    // console.log(obj)
    // console.log("time:" + time)
    // title,text,author,articeContent,markdownContent,time
    fetch(`/api/newsadd?title=${title}&text=${text}&author=${author}&time=${time}&markdownContent=${articleContent}`).then((res) => {
    // fetch(`/api/newsadd?obj=${arr}`).then((res)=>{
      console.log(res)
    })
    // fetch(`/api/newsadd?obj=${obj}`)
      // .then(resp => resp.json())
      // .then(resp => {
      //   if (resp.success === true) {
      //     success()
      //   }
      // })
      */
  }

  const changeTitle = (e) => {
    // console.log(e.target.value)
    setTitle(e.target.value)
  }
  const changeText = (e) => {
    // console.log(e.target.value)
    setText(e.target.value)
  }
  const changeAuthor = (e) => {
    // console.log(e.target.value)
    setAuthor(e.target.value)
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "block", paddingRight: 20 }}>
          <h2>文章标题</h2>
          <Input placeholder="在这里输入文章标题" style={{ width: 300 }} onChange={changeTitle} />
        </div>
        <div style={{ display: "block" }}>
          <h2>文章作者</h2>
          <Input placeholder="在这里输入文章作者" style={{ width: 300 }} onChange={changeAuthor} />
        </div>
      </div>
      <br />
      <h2>文章简介</h2>
      <TextArea rows={4} placeholder="在这里书写一下文章的大致内容" onChange={changeText} />
      <Row gutter={5}>
        <Col span={18}>
          <br />
          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="编辑内容"
              />
            </Col>
            <Col span={12}>
              {/* <ReactMarkdown source={markdownContent} escapeHtml={false}/> */}
              <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <Button type="primary" onClick={chartinit}>添加</Button>
    </div>
  )
}

export default Addnews
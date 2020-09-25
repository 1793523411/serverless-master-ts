import { Func, Inject, Provide } from '@midwayjs/decorator';
import TableStore from 'tablestore';
import format from 'otswhere/format';

@Provide()
export class NewsService {

  @Inject()
  ctx;

  @Inject()
  tb;

  @Func('news.newsadd')
  async newsadd() {
    // let obj = {
    //   title:"",
    //   text:"",
    //   autho:"",
    //   articleContent:"",
    //   markdownContent:"",
    //   time:""
    // }
    // obj = this.ctx.query
    // console.log(obj.title)
    // console.log(obj.articleContent)
    console.log(this.ctx.query)
    let res = this.ctx.query
    // console.log(res[2])
    const { title, text, author, articleContent, markdownContent,time} = this.ctx.query;
    // const params = {
    //   tableName: "news",
    //   condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
    //   primaryKey: [
    //     { id: `${Date.now()}-${Math.random()}` }
    //   ],
    //   attributeColumns: [
    //     { title },
    //     { text },
    //     { author },
    //     { articleContent },
    //     { markdownContent },
    //     { time },
    //     { key: `${Date.now()}-${2 * Math.random()}` },
    //     { status: '1' }
    //   ]
    // };
    // return new Promise(resolve => {
    //   this.tb.putRow(params, async function (err, data) {
    //     if (err) {
    //       resolve({
    //         success: false,
    //         errmsg: err.message
    //       });
    //     } else {
    //       resolve({
    //         success: true,
    //         data
    //       });
    //     }
    //   });
    // });
  }
}

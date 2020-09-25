import { Func, Inject, Provide } from '@midwayjs/decorator';
import TableStore from 'tablestore';
import format from 'otswhere/format';

@Provide()
export class UserService {

  @Inject()
  ctx;

  @Inject()
  tb;

  @Func('user.login')
  async login() {
    const { name, password } = this.ctx.query;

    const params = {
      tableName: 'user',
      direction: TableStore.Direction.BACKWARD,
      inclusiveStartPrimaryKey: [{ id: TableStore.INF_MAX }],
      exclusiveEndPrimaryKey: [{ id: TableStore.INF_MIN }]
    };

    return new Promise(resolve => {
      this.tb.getRange(params, (_, data) => {
        const rows = format.rows(data, { email: true });
        const userExists = rows.list.findIndex(user => user.name === name) !== -1

        if (!userExists) {
          resolve({
            success: false,
            message: '用户不存在'
          })
          return
        }

        const user = rows.list.find(user => user.name === name);
        if (user.password !== password) {
          resolve({
            success: false,
            message: '密码不正确'
          })
          return
        }

        resolve({
          success: true,
          user
        });
      });
    })
  }

  @Func('user.register')
  async register() {
    const { name, password } = this.ctx.query;
    const params = {
      tableName: "user",
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [
        { id: `${Date.now()}-${Math.random()}` }
      ],
      attributeColumns: [
        { name },
        { password },
        { status: '1' }
      ]
    };
    return new Promise(resolve => {
      this.tb.putRow(params, async function (err, data) {
        if (err) {
          resolve({
            success: false,
            errmsg: err.message
          });
        } else {
          resolve({
            success: true,
            data
          });
        }
      });
    });
  }
}

import { Func, Inject, Provide } from '@midwayjs/decorator';
import TableStore from 'tablestore';
import format from 'otswhere/format';

@Provide()
export class PersonService {

  @Inject()
  ctx;

  @Inject()
  tb;

  @Func('person.personadd')
  async personadd() {
    console.log(this.ctx.query)
    const { name, originze, age, job, grade, tags } = this.ctx.query;
    const params = {
      tableName: "person",
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [
        { id: `${Date.now()}-${Math.random()}` }
      ],
      attributeColumns: [
        { name },
        { originze },
        { age },
        { job },
        { grade },
        { tags },
        { key: `${Date.now()}-${2 * Math.random()}` },
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

  @Func('person.personlist')
  async handler() {
    const params = {
      tableName: 'person',
      direction: TableStore.Direction.BACKWARD,
      inclusiveStartPrimaryKey: [{ id: TableStore.INF_MAX }],
      exclusiveEndPrimaryKey: [{ id: TableStore.INF_MIN }]
    };
    return new Promise(resolve => {
      this.tb.getRange(params, (_, data) => {
        const rows = format.rows(data, { email: true });
        resolve(rows);
      });
    })
  }

  @Func('preson.personremove')
  async personremove() {
    const { id } = this.ctx.query;

    const params = {
      tableName: "person",
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [{ id }]
    };
    return new Promise(resolve => {
      this.tb.deleteRow(params, function (err, data) {
        if (err) {
          resolve({
            success: false,
            errmsg: err.message
          });
        } else {
          resolve({
            success: true
          });
        }
      });
    });
  }
 @Func('person.getone')
  async getone() {
    const { id } = this.ctx.query;
    const params = {
      tableName: 'person',
      direction: TableStore.Direction.BACKWARD,
      inclusiveStartPrimaryKey: [{ id: TableStore.INF_MAX }],
      exclusiveEndPrimaryKey: [{ id: TableStore.INF_MIN }]
    };
    return new Promise(resolve => {
      this.tb.getRange(params, (_, data) => {
        const rows = format.rows(data, { email: true });
        // console.log(rows)
        const res = rows.list.filter(item=> item.id === id)
        // console.log(res)
        resolve(res);
      });
    })
  }
  @Func('person.personupdate')
  async personupdate() {
    console.log(this.ctx.query)
    const { id, name, originze, age, job, grade, tags} = this.ctx.query;
    const params = {
      tableName: "person",
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [
        { 'id': id },
      ],
      attributeColumns: [
        { name },
        { originze },
        { age },
        { job },
        { grade },
        { tags },
        { key: `${Date.now()}-${2 * Math.random()}` },
        { status: '1' }
      ]
    };
    return new Promise((resolve) => {
      this.tb.putRow(params, function (err, data) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}

import { setupWorker, rest } from "msw";
import { baseURL } from "@/utils/request";
import faker from "faker";

// 1. 创建一个用于做拦截请求工作的人
// 2. 定义拦截请求程序
// 3. 导出做拦截请求工作的人
// 4. 在开发环境中启动请求拦截程序

// http://pcapi-xiaotuxian-front-devtest.itheima.net/message
// get 方法表示拦截 get 请求
// 第一个参数表示要拦截的请求地址
// 第二个参数是请求处理程序

faker.locale = "zh_CN";

const worker = setupWorker(
  rest.get(`${baseURL}message`, (req, res, ctx) => {
    // return res(
    //   ctx.json({
    //     name: faker.name.firstName(),
    //     avatar: faker.internet.avatar(),
    //     phone: faker.phone.phoneNumber(),
    //     cityName: faker.address.cityName(),
    //     email: faker.internet.email(),
    //   })
    // );
    return res(
      ctx.json(
        makeArray(faker.datatype.number(20), () => ({
          name: faker.name.firstName(),
          avatar: faker.internet.avatar(),
          phone: faker.phone.phoneNumber(),
          cityName: faker.address.cityName(),
          email: faker.internet.email(),
        }))
      )
    );
  }),
  rest.get(`${baseURL}member/collect`, (req, res, ctx) => {
    return res(
      ctx.json({
        msg: "成功",
        result: {
          counts: 50,
          page: req.url.searchParams.get("page"),
          pageSize: req.url.searchParams.get("pageSize"),
          pages: 0,
          items: makeArray(req.url.searchParams.get("pageSize"), () => ({
            id: faker.datatype.uuid(),
            name: faker.internet.userName(),
            desc: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${faker.datatype.number(
              { min: 1, max: 8 }
            )}.jpg`,
          })),
        },
      })
    );
  })
);
// [{}, {}]

export default worker;

function makeArray(length, generator) {
  return Array.from({ length }, generator);
}

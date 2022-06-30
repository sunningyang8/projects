import {
  Breadcrumb,
  Card,
  Form,
  Select,
  DatePicker,
  Radio,
  Button,
  Table,
  Space,
  Image,
  Tag,
  message,
  Modal
} from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./index.scss"
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannels, getArticles, delArticle } from "@/store/actions";
import { useHistory } from "react-router-dom";
// 没图片时默认图片
import defaultImg from "@/assets/error.png";

import { useState } from 'react';
import { Channel } from "@/components/Channel";


const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal

const Article = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { results, total_count, page, per_page } = useSelector((state) => state.article);
  const params = useRef({
    page: 1,
    per_page: 20,
    channel_id: undefined,
    status: undefined,
    begin_pubdate: undefined,
    end_pubdate: undefined,
  });

  const [value, setValue] = useState(1)

  // 不同状态颜色
  const statusLabel = [
    { text: "草稿", color: "default" },
    { text: "待审核", color: "blue" },
    { text: "审核通过", color: "green" },
    { text: "审核拒绝", color: "red" },
  ];

  // 切换单选框
  const onChange = (e) => {
    setValue(e.target.value)
  }

  // 表格数据
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover) => (
        <Image
          src={cover?.images?.[0] || defaultImg}
          style={{ objectFit: "cover" }}
          width={200}
          height={120}
        />
      ),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const info = statusLabel[status];
        return <Tag color={info.color}>{info.text}</Tag>;
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
      key: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      key: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      key: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      key: "like_count",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => delArticleFn(record.id)} type="link" icon={<DeleteOutlined />} />
          <Button onClick={() => editArticle(record.id)} type="link" icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  // 删除
  const delArticleFn = id => {
    console.log(id)
    confirm({
      title: '您是否确认删除该文章？',
      cancelText: '取消',
      okText: '确认',
      onOk: async () => {
        await dispatch(delArticle(id))
        await dispatch(getArticles(params.current));
        message.success('删除成功')
      },
    })
  }

  // 编辑
  const editArticle = id => {
    history.push(`/home/publish/${id}`)
  }

  // 改变筛选条件查询
  const onFinish = (values) => {
    params.current.status = values.status;
    params.current.channel_id = values.channel_id;
    console.log(values);
    if (values.dateArr) {
      params.current.begin_pubdate = values.dateArr[0].format(
        "YYYY-MM-DD HH:mm:ss"
      );
      params.current.end_pubdate = values.dateArr[1].format(
        "YYYY-MM-DD HH:mm:ss"
      );
    } else {
      params.current.begin_pubdate = undefined;
      params.current.end_pubdate = undefined;
    }
    params.current.page = 1
    dispatch(getArticles(params.current));
  };

  // 改变分页和size重新查询
  const onPageChange = (page, pageSize) => {
    const params = {}
    params.page = page
    params.per_page = pageSize
    dispatch(getArticles(params));
  }

  useEffect(() => {
    dispatch(getChannels());
    dispatch(getArticles(params.current));
  }, [dispatch]);

  return (<div className="article root">
    {/* 筛选卡片 */}
    <Card title={
      <Breadcrumb separator=">">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
      </Breadcrumb>
    }>
      <Form onFinish={onFinish}>
        <Form.Item label="状态" name="state">
          <Radio.Group value={value} onChange={onChange}>
            <Radio value={undefined}>全部</Radio>
            <Radio value={0}>草稿</Radio>
            <Radio value={1}>待审核</Radio>
            <Radio value={2}>审核通过</Radio>
            <Radio value={3}>审核失败</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="频道" name="channel">
          <Channel width={288} />
        </Form.Item>
        <Form.Item label="日期" name="dateArr">
          <RangePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">筛选</Button>
        </Form.Item>
      </Form>
    </Card>

    {/* 筛选结果 */}
    <Card
      title={`根据筛选条件共查询到 ${total_count} 条结果：`}
      style={{ marginTop: 24 }}
    >
      <Table
        columns={columns}
        dataSource={results}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: per_page,
          total: total_count,
          onChange: onPageChange
        }}></Table>
    </Card>
  </div>)
}

export default Article
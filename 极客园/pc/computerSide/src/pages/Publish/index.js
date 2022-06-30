import { Card, Breadcrumb, Form, Button, Input, Radio, Upload, message, Space } from 'antd'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Channel } from "@/components/Channel";
import { PlusOutlined } from '@ant-design/icons'
import "./index.scss"

import { addArticle, getArticle, editArticle } from "@/store/actions/article";

// 引入富文本插件
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Publish = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [form] = Form.useForm();

  // 上传数量
  const [type, setType] = useState(1);
  // 存储文件列表
  const [fileList, setFileList] = useState([]);

  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onTypeChange = (e) => {
    setType(e.target.value);
    setFileList([]);
  };

  useEffect(() => {
    const setFormData = async () => {
      if (params.id) {
        const { title, cover, content, channel_id } = await dispatch(
          getArticle(params.id)
        );
        form.setFieldsValue({ title, content, channel_id });
        setType(cover.type);
        setFileList(cover.images.map((item) => ({ url: item })));
      } else {
        setFileList([]);
        form.resetFields();
      }
    };
    setFormData();
  }, [dispatch, form, params]);

  // 提交表单
  const onFinish = async (values, draft = false) => {
    if (type !== fileList.length) {
      return message.warning("请按照选择的封面类型上传图片");
    }

    // 组织提交数据  
    const data = {
      ...values,
      cover: {
        type,
        images: fileList.map((item) => {
          return item?.response?.data?.url || item.url;
        }),
      },
    };

    if (params.id) {
      // 编辑
      data.id = params.id
      await dispatch(editArticle(data, draft));
    } else {
      // 添加
      await dispatch(addArticle(data, draft));
    }

    message.success('保存成功')
    history.push("/home/article");
    // console.log("ok")
  };

  // 存入草稿
  const saveDarft = async () => {
    try {
      const values = await form.validateFields() 
      onFinish(values, true)
    }catch(e){}    
  }

  return (
    <div className="root">
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form onFinish={onFinish} labelCol={{ span: 4 }}>
          {/* 标题 */}
          <Form.Item
            label="标题："
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          {/* 频道 */}
          <Form.Item
            label="频道："
            name="channel_id"
            rules={[{ required: true, message: "请选择所属频道" }]}
          >
            <Channel width={400} />
          </Form.Item>
          {/* 封面 */}
          <Form.Item label="封面：">
            <Form.Item style={{ marginBottom: 0 }}>
              <Radio.Group value={type} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 上传空间 */}
            {type > 0 ? (
              <div style={{ marginTop: 16 }}>
                <Upload
                  name="image"
                  listType="picture-card"
                  action="http://geek.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onPreview={() => { }}
                  onChange={onUploadChange}
                >
                  {fileList.length < type ? (
                    <div style={{ marginTop: 8 }}>
                      <PlusOutlined />
                    </div>
                  ) : null}
                </Upload>
              </div>
            ) : null}
          </Form.Item>
          {/* 内容 */}
          <Form.Item
            label="内容："
            name="content"
            initialValue=""
            wrapperCol={{ span: 16 }}
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill placeholder="请输入文章内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {params.id ? '编辑文章' : '发布文章'}
              </Button>
              <Button size="large" onClick={saveDarft}>
                存入草稿
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

    </div>
  )
}

export default Publish
import { Card , Form, Input, InputNumber, Button,Modal  } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import { useState } from 'react'

const { Meta } = Card;
const CatCard = (props) => {
    const allaction = bindActionCreators(allActions, useDispatch())
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const sellCat = async () => {
        allaction.deleteCat(props.cat);
    }

    const onFinish = async (values) => {
        console.log(values);
        allaction.addCat({ ...values.user })
        console.log("redux cat:", cats);
    };

    const validateMessages = {
        required: '${label} is required!',
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <div>
            <div>
                <Card
                    style={{ width: 300 }}

                    actions={[
                        <SettingOutlined key="setting" onClick={sellCat} />,
                        <EditOutlined key="edit" onClick={showModal} />,
                        //<EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={`${props.cat.id}.${props.cat.name}`}
                        description={`Date of Birth : ${props.cat.dob} Sex : ${props.cat.sex}`}

                    />
                </Card>
            </div>
            <div>
                <Modal title="Update Cat" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item value={props.cat.name} name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'dob']} label="Date of Birthbay" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'sex']} label="Sex" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default CatCard
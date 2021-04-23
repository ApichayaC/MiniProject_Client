import { Card, Form, Input, InputNumber, Button, Modal } from 'antd';
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
    const [catUpdate, setCatUpdate] = useState({...props.cat})

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        console.log(catUpdate);
        allaction.updateCat({...catUpdate})
    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    const sellCat = async () => {
        allaction.deleteCat(props.cat);
    }

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
                        
                        false? <SettingOutlined key="setting" onClick={sellCat} /> :"",
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
                <Modal title={"Update " + props.cat.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                    <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                        <Form.Item  label="Name" rules={[{ required: true }]}>
                            <Input defaultValue={props.cat.name} onChange={e => setCatUpdate({ ...catUpdate, name: e.target.value })}/>
                        </Form.Item>
                        <Form.Item label="Date of Birthbay" rules={[{ required: true }]}>
                            <Input defaultValue={props.cat.dob} onChange={e => setCatUpdate({ ...catUpdate, dob: e.target.value })}/>
                        </Form.Item>
                        <Form.Item  label="Sex" rules={[{ required: true }]}>
                            <Input defaultValue={props.cat.sex} onChange={e => setCatUpdate({ ...catUpdate, sex: e.target.value })} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default CatCard
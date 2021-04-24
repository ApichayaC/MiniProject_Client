import { Card, Form, Input, Modal, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'
import { useState, useEffect } from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import loginCss from '../styles/Login.module.css'
import cardCss from '../styles/Card.module.css'

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
        '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
    ],
});

const { Meta } = Card;
const CatCard = (props) => {
    const allaction = bindActionCreators(allActions, useDispatch())
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [catUpdate, setCatUpdate] = useState({ ...props.cat })

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        console.log(catUpdate);
        allaction.updateCat({ ...catUpdate })
    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    const buyCat = async () => {
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
                {/* <Card
                    style={{ width: 300 }}

                    actions={[

                        props.index && !props.sell ? <IconFont type="icon-shoppingcart" onClick={buyCat} /> : "",
                        !props.index && props.sell ? <EditOutlined onClick={showModal} /> : "",
                        //<EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={`${props.id+1}.${props.cat.name}`}
                        description={`Date of Birth : ${props.cat.dob} Sex : ${props.cat.sex}`}

                    />
                </Card> */}
                {/* <Card
                    headStyle={{ borderRadius: '9px 9px 0px 0px', backgroundColor: "#d4a29c", color: "black" , border:'1px white solid'}}
                    bodyStyle={{ borderRadius: '0px 0px 9px 9px', backgroundColor: "#d4a29c", color: "black" , border:'1px white solid'}}
                    bordered = {false}
                    title={`${props.id + 1}. ${props.cat.name}`}

                    // extra={<a href="#">More</a>} 
                    extra={props.index && !props.sell ? <Button onClick={buyCat} className={loginCss.buttonb}>Buy</Button> : !props.index && props.sell ?
                        <Button onClick={showModal} className={loginCss.buttonb}>Update</Button> : ""}

                    style={{ width: 300 }}
                >
                    <p> {`Date of Birth : ${props.cat.dob}`} </p>
                    <p> {`Sex : ${props.cat.sex}`} </p>

                </Card> */}
                {/*<div className={cardCss.card_wrap}>
                    <div className={cardCss.profile_pic_wrap}>
                        <img src="https://scontent-yyz1-1.cdninstagram.com/t51.2885-19/s320x320/12543142_446352545560748_362768810_a.jpg" alt="" />
                    </div>
                    <div className={cardCss.info_wrap}>
                        <h1 className={cardCss.user_name}>Adam Leith P</h1>
                        <p>UX Designer / Web Developer</p>
                    </div>

                </div>*/}
                <div className={cardCss.content}>
                    
                    <div className={cardCss.card}>
                        <p className={cardCss.title}>
                            <p>
                                {props.cat.name} 
                                </p>
                             <p> {`${props.cat.dob}`} </p>
                            <p> {`${props.cat.sex}`} </p>
                        </p>
                        <p className={cardCss.text}>
                            <div>{props.index && !props.sell ? <Button onClick={buyCat} className={loginCss.buttonb}>Buy</Button> : !props.index && props.sell ?
                        <Button onClick={showModal} className={loginCss.buttonb}>Update</Button> : ""}</div>
                        </p>
                    </div>

                    {/* <div className={cardCss.card}>
                        <div className={cardCss.icon}>
                            <i className="">favorite_border</i>
                        </div>
                        <p className={cardCss.title}>Favourites</p>
                        <p className={cardCss.text}>
                            Check all your favourites in one place.
            </p>
                    </div>

                    <div className={cardCss.card}>
                        <div className={cardCss.icon}>
                            <i className="">alternate_email</i>
                        </div>
                        <p className={cardCss.title}>Contacts</p>
                        <p className={cardCss.text}>
                            Add or change your contacts and links.
            </p>
                    </div>*/}
                </div>
            </div>
            <div>
                <Modal title={"Update " + props.cat.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                    <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                        <Form.Item label="Name" rules={[{ required: true }]}>
                            <Input defaultValue={props.cat.name} onChange={e => setCatUpdate({ ...catUpdate, name: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Date of Birthbay" rules={[{ required: true }]}>
                            <Input defaultValue={props.cat.dob} onChange={e => setCatUpdate({ ...catUpdate, dob: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Sex" rules={[{ required: true }]}>
                            <Input defaultValue={props.cat.sex} onChange={e => setCatUpdate({ ...catUpdate, sex: e.target.value })} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default CatCard
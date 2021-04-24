import { Form, Input, InputNumber, Button } from 'antd';
import { allActions } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import CatCard from '../components/catCard';
import { useEffect } from 'react';
import withAuth from '../components/withAuth'
import Navbar from '../components/navbar'
import css from '../styles/Login.module.css'

function Sell() {
    const allaction = bindActionCreators(allActions, useDispatch())
    const cats = useSelector(state => state.cats)

    const onFinish = async (values) => {
        console.log(values);
        allaction.addCat({ ...values.user })
        console.log("redux cat:", cats);
    };

    const validateMessages = {
        required: '${label} is required!',
    };
    const layout = {
        labelCol: { span: 12 },
        wrapperCol: { span: 16 },
    };
    useEffect(() => {
        allaction.getCats()
    }, [])
    return (
        <div style={{ backgroundColor: "#e8b298", height: "100vh" }}>
            <Navbar />
            <div style={{
                justifyContent: "center",
                textAlign: "center",
                fontSize: "40px",
                color: "white",
                fontFamily: "'Pacifico', cursive",

                margin: "20px 20px",
                borderRadius: "50px",
                backgroundColor: "#edcc8b"
            }}>
                <a>You can fill out the information for selling cats.</a>
            </div>
            <div className={css.form_add_container}>

                <div className={css.form_add}>

                    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'dob']} label="Date of Birth" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'sex']} label="Sex" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <div style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                            <Button type="primary" htmlType="submit" style={{
                                borderRadius: "8px",
                                color: "white",
                                backgroundColor: "#BDD1c5",
                                border: " 1px white solid",

                            }}>
                                ADD
                        </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"

            }} >
                {
                    cats ? cats.map((item, index) => {
                        return (
                            <div style={{ marginTop: 30 }} key={index}>
                                <CatCard index={false} sell={true} cat={item} id={index} />
                            </div>
                        )
                    }) : ""
                }
            </div>
        </div>
    )
}

export default withAuth(Sell)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

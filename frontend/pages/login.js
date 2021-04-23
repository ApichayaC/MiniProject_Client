import Head from 'next/head'
import Layout from '../components/layout'
import { Form, Input, Button, message, Space } from 'antd';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router'
import axios from 'axios'
import config from '../config/config'
import 'bootstrap/dist/css/bootstrap.css'
import { Footer } from 'antd/lib/layout/layout';
import loginCss from '../styles/Login.module.css'

export default function Login({ token }) {
    const router = useRouter()
    const onFinish = async (values) => {
        console.log('Success:', values);
        // allActions.login({...values})
        const data = await axios.post(config.URL + "/api/login", { ...values }, { withCredentials: true })
        if (data.data.token) {
            message.success(data.data.message)
            router.push('/')
        } else {
            message.error(data.data.message)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        // <div>
        //     <Head>
        //         <title>login</title>
        //     </Head>
        //     <Navbar />

        //     <div class="input-group mb-3">
        //         <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
        //         <div class="col-sm-10">
        //             <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
        //                 label="Username"
        //                 name="username"
        //                 rules={[{ required: true, message: 'Please input your username!' }]}></input>
        //         </div>

        //     </div>

        //     <div class="input-group mb-3 ">
        //         {/* <label for="inputPassword" class="col-sm-2 col-form-label">Password</label> */}
        //         <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
        //         <div class="col-sm-10">
        //             <input type="password" class="form-control" id="inputPassword"
        //                 label="Password"
        //                 name="password"
        //                 rules={[{ required: true, message: 'Please input your password!' }]}></input>
        //         </div>
        //     </div>

        // </div>
        <Layout >
            <Head>
                <title>login</title>
            </Head>
            <div style={{backgroundColor :"#e8b298"}}>
                <Navbar />
                <div className="space-align-container" className={loginCss.form} >
                    <div className="space-align-block" >
                        <Space align="center" style={{ alignItems: "baseline" }}>
                            <Footer>
                                <Form
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    style={{ alignItems: "center", textAlign: 'center', }}
                                >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input />
                                        {/* <Input /> */}
                                        {/* <Input onChange={e => setUser({ ...user, username: e.target.value })} /> */}
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password />
                                        {/* <Input.Password onChange={e => setUser({ ...user, password: e.target.value })} /> */}
                                    </Form.Item>

                                    <Form.Item >
                                        <Button type="primary" htmlType="submit"> Login </Button>
                                    </Form.Item>
                                </Form>

                            </Footer>
                        </Space>
                    </div>
                </div>
            </div>
        </Layout>


    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

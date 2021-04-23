
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'
import { Form, Input, Button, message } from 'antd'
import { useRouter } from 'next/router'
import { Footer } from 'antd/lib/layout/layout'

export default function Register({ token }) {
    const router = useRouter()
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = async (values) => {
        const { username, password, confirmPassword, email, name, surname } = { ...values.user }
        if (password !== confirmPassword) {
            return message.error('Password not match');
        } else {
            const users = await axios.post(config.URL + "/api/register", { username, password, email, name, surname })
            console.log(users.data);
            if (users.data.register) {
                message.success(users.data.message)
                router.push('/')
            } else {
                message.error(users.data.message);
            }
        }


    };

    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <Navbar />
            <div style={{ backgroundColor: "#e8b298" }}>
                <Footer>
                    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'surname']} label="Surname" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'username']} label="username" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name={['user', 'confirmPassword']} label="Confrim Password" rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                </Button>
                        </Form.Item>
                    </Form>
                </Footer>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

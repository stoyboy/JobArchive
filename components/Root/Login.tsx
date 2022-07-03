import { Button, Form, Input, message } from 'antd';
import { FC, useState } from 'react';
import 'antd/dist/antd.css';
import axios, { AxiosResponse } from 'axios';
import { User } from 'firebase/auth';
import Router from 'next/router';

export const Login: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response: AxiosResponse<User> = await axios.post('http://localhost:3000/api/login', {
        ...values,
      });
      if (response.status == 200) {
        Router.push("/dashboard")
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      message.error({
        content: 'Login fehlgeschlagen'
      });
    }
  };

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      <Form
        name='create'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className='w-96'
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Pflichtfeld' }]}
          className='w-full'
        >
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Pflichtfeld' }]}
          className='w-full'
        >
          <Input.Password placeholder='Passwort' />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='w-full'
            loading={isLoading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

import { Button, DatePicker, Form, Input } from 'antd';
import 'moment/locale/de-at';
import locale from 'antd/lib/locale/de_DE';
import 'antd/dist/antd.css';
import { FC, useState } from 'react';
import Link from 'next/link';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import { Contact } from '@prisma/client';
import Router, { useRouter } from 'next/router';
import moment from 'moment';

export const View: FC<{ data: Contact }> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter()
  const { id } = router.query

  const onFinish = async (values: Contact) => {
    setLoading(true);
    const response = await axios.post('http://localhost:3000/api/edit', {
      id,
      data: values
    });
    if (response.status == 200) {
      Router.push('/');
    }
  };

  return (
    <div className='m-6'>
      <div className='flex flex-row justify-start items-center'>
        <Button>
          <Link href='/'>Zurück zum Dashboard</Link>
        </Button>
      </div>
      <h1 className='text-2xl my-9'>Kontakt bearbeiten</h1>
      <Form
        name='create'
        initialValues={{
            ...props.data,
            date: moment(props.data.date)
        }}
        onFinish={onFinish}
        autoComplete='off'
        className='grid grid-cols-2 gap-4 max-w-2xl'
      >
        <Form.Item
          name='firstName'
          rules={[{ required: true, message: 'Pflichtfeld' }]}
        >
          <Input placeholder='Vorname' />
        </Form.Item>

        <Form.Item
          name='lastName'
          rules={[{ required: true, message: 'Pflichtfeld' }]}
        >
          <Input placeholder='Nachname' />
        </Form.Item>

        <Form.Item
          name='company'
          rules={[{ required: true, message: 'Pflichtfeld' }]}
          className='col-span-2'
        >
          <Input placeholder='Unternehmen' />
        </Form.Item>

        <Form.Item
          name='field'
          rules={[{ required: true, message: 'Pflichtfeld' }]}
          className='col-span-2'
        >
          <Input placeholder='Position' />
        </Form.Item>

        <Form.Item
          name='location'
          rules={[{ required: true, message: 'Pflichtfeld' }]}
        >
          <Input placeholder='Erstbegegnung' />
        </Form.Item>

        <Form.Item
          name='date'
          rules={[{ required: true, message: 'Pflichtfeld' }]}
        >
          <DatePicker
            placeholder='Datum der Erstbegegnung'
            format={'DD/MM/YYYY'}
            locale={locale.DatePicker}
            className='w-full'
          />
        </Form.Item>

        <Form.Item name='info' className='col-span-2'>
          <TextArea placeholder='Info' />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='w-full'
            loading={isLoading}
          >
            Änderungen übernehmen
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

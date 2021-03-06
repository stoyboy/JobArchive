import { Contact } from '@prisma/client';
import { Button, Empty, Modal, Table } from 'antd';
import { ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { Waveform } from '@uiball/loaders';
import Link from 'next/link';
import 'antd/dist/antd.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import Router from 'next/router';

export const Dashboard: FC = () => {
  const { data, error } = useSWR<{
    data: Contact[];
    isLoading: boolean;
    isError: any;
  }>('/api/get', () => axios.get('http://localhost:3000/api/get'));
  const isLoading = !error && !data;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { confirm } = Modal;

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Vorname',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Nachname',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Unternehmen',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Position',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Erstbegegnung',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Datum der Erstbegegnung',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) =>
        new Date(date).toLocaleDateString('de-DE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
    },
    {
      render: (data: Contact) => {
        console.log(data);
        return (
          <Link href={`/contact/${data.id}`}>
            <Button className='cursor-pointer'>Bearbeiten</Button>
          </Link>
        );
      },
    },
  ];

  const showDeleteConfirm = () => {
    confirm({
      title: 'Bist du sicher, dass deine Auswahl l??schen willst?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Ja',
      okType: 'danger',
      cancelText: 'Nein',
      onOk() {
        return new Promise<void>(async (resolve, reject) => {
          const response = await axios.post(
            'http://localhost:3000/api/delete',
            {
              keys: selectedRowKeys,
            }
          );
          if (response) {
            setSelectedRowKeys([]);
            mutate('/api/get');
            resolve();
          }
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        console.log(selectedRowKeys);
      },
    });
  };

  return (
    <div>
      <div className='flex flex-col sm:flex-row justify-end items-end sm:items-center m-6 gap-4'>
        <Button
          onClick={async () => {
            const response = await axios.post(
              'http://localhost:3000/api/logout'
            );
            if (response.status == 200) Router.push('/');
          }}
        >
          Log out
        </Button>
        <div className='grow' />
        <Button
          type='primary'
          danger
          disabled={selectedRowKeys.length > 0 ? false : true}
          onClick={() => showDeleteConfirm()}
        >
          Auswahl l??schen
        </Button>
        <Button>
          <Link href='/contact/create'>Kontakt hinzuf??gen</Link>
        </Button>
      </div>

      <div className='m-6'>
        {data && (
          <Table
            rowSelection={rowSelection}
            dataSource={data.data}
            columns={columns}
            pagination={{
              position: ['bottomRight'],
              pageSize: 10,
              showSizeChanger: false,
            }}
            rowKey='id'
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description='Keine Kontake'
                />
              ),
            }}
          />
        )}

        {isLoading && (
          <div className='w-full h-[80vh] flex justify-center items-center'>
            <Waveform size={50} lineWeight={5} speed={1.4} color='black' />
          </div>
        )}

        {error && (
          <div className='w-full h-[80vh] flex flex-col justify-center items-center gap-4'>
            <WarningOutlined className='text-6xl' />
            <span className='text-lg'>Etwas ist schief gelaufen</span>
          </div>
        )}
      </div>
    </div>
  );
};

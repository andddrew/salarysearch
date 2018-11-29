import React from 'react';
import { Table } from 'antd';


const { Column } = Table;

const Companies = ( { items } ) => (
  <Table dataSource={ items } bordered={ true }>
    <Column title="Company Name" dataIndex="name" key="name" />
    <Column title="Base Salary" dataIndex="base" key="base" />
    <Column title="Signing Bonus" dataIndex="sign" key="sign" />
    <Column title="Count" dataIndex="count" key="key" />
  </Table>
)

export default Companies;
import React from 'react';
import {Table} from "react-bootstrap";

import {IProduct} from 'types/productsTypes';

import './TableComponent.scss';


interface IProps {
  loading: boolean;
  products: IProduct[]
}

const TableComponent = (
  {
    loading,
    products
  }: IProps
) => {

  return (
    <div className='table-component'>
      <Table striped bordered hover>
        <thead className='table__head'>
        <tr className='table__head__row'>
          <th>Id</th>
          <th>Product</th>
          <th>Brand</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {loading &&
            <tr>
                <td colSpan={4}>Loading...</td>
            </tr>
        }
        {products?.length > 0 &&
          products?.map(({id, product, price, brand}) =>
            <tr key={id}>
              <td>{id}</td>
              <td>{product}</td>
              <td>{brand}</td>
              <td>{price}</td>
            </tr>)
        }
        {!products && !loading &&
            <tr>
                <td colSpan={4}>Товары не найдены...</td>
            </tr>
        }
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
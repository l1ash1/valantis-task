import React from 'react';
import { Pagination } from 'react-bootstrap';

import {ISetPagesParams} from 'types/productsTypes';

import './PaginationComponent.scss';


interface IProps {
  page: number,
  maxPages: number;
  setPageFunction: ({onePageStep, requiredPage}: ISetPagesParams) => void
}

const PaginationComponent = (
  {
    page,
    setPageFunction,
    maxPages,
  }: IProps
) => {
  return(
    <Pagination>
      <Pagination.First onClick={() => setPageFunction({requiredPage: 1})}/>
      <Pagination.Prev onClick={() => setPageFunction({onePageStep: page-1})}/>
      <Pagination.Item>{page}/{maxPages}</Pagination.Item>
      <Pagination.Next onClick={() => setPageFunction({onePageStep: page+1})}/>
      <Pagination.Last onClick={() => setPageFunction({requiredPage: maxPages})}/>
    </Pagination>
    )
}

export default PaginationComponent;
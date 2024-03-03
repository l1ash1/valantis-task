import React from "react";
import { Pagination } from 'react-bootstrap';

import './PaginationComponent.scss';


interface IProps {
  page: number,
  setPageFunction: (item:number) => void
}

const PaginationComponent = (
  {
    page,
    setPageFunction,
  }: IProps
) => {
  return(
    <Pagination>
      <Pagination.Prev onClick={() => setPageFunction(-1)}/>
      <Pagination.Item>{page}</Pagination.Item>
      <Pagination.Next onClick={() => setPageFunction(+1)}/>
    </Pagination>
    )
}

export default PaginationComponent;
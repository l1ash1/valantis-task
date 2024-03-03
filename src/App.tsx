import React from 'react';
import {
  Form,
} from 'react-bootstrap';

import useController from './useController';
import PaginationComponent from 'components/PaginationComponent';
import TableComponent from 'components/TableComponent';
import ButtonComponent from 'components/ButtonComponent';
import SelectComponent from 'components/SelectComponent';
import InputComponent from 'components/InputComponent';

import './App.scss';


const App = () => {
  const {
    loading,
    page,
    fields,
    products,
    filterField,
    valueInputFilter,
    isFilter,
    errorFilter,
    filterData,
    setPageFunction,
    getFilterData,
    setFilterValueFunction,
    setFilterFieldFunction,
    deleteFilterData,
    setPageWithFilterDataFunction
  } = useController();

  return (
    <div className='App'>
      <div className='container'>
        <Form className='filter-block'>
          <SelectComponent
          fields={fields}
          filterField={filterField}
          handlerChange={setFilterFieldFunction}
          />
          <InputComponent
            filterField={filterField}
            value={valueInputFilter}
            handlerChange={setFilterValueFunction}
            error={errorFilter}
          />
          <ButtonComponent
            variant='primary'
            text={isFilter? 'Обновить фильтр' : 'Добавить фильтр'}
            filterField={filterField}
            onClickFunction={getFilterData}
          />
          {isFilter &&
              <ButtonComponent
              variant='primary'
              text='Удалить фильтр'
              filterField={filterField}
              onClickFunction={deleteFilterData}
              />
          }
        </Form>
        <TableComponent
          loading={loading}
          products={isFilter ? filterData[page-1] : products}
        />
          <PaginationComponent
              page={page}
              setPageFunction={isFilter ? setPageWithFilterDataFunction : setPageFunction}
          />
      </div>
    </div>
  );
}

export default App;

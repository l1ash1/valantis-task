import { useEffect, useState } from 'react';

import {
  getFieldsProducts,
  getFilterInfoProducts,
  getInfoProducts,
} from 'api/service';
import { paginateArray, validateFunction } from 'helpers';
import { IProduct } from 'types/productsTypes';


export default function useController() {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [fields, setFields] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filterField, setFilterField] = useState<string>();
  const [valueInputFilter, setValueInputFilter] = useState<string>('');
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [errorFilter, setErrorFilter] = useState('');
  const [filterData, setFilterData] = useState<Array<IProduct[]>>([]);

  const getData = async (): Promise<void> => {
    setLoading(true)
    setProducts([])
    const data = await getInfoProducts({page: page})

    if (data) {
      setProducts(data)
      setLoading(false)
    }
  }

  const setPageFunction = (count: number): void => {
    const curPage = page + count

    if (curPage > 0 && products.length > 0) {
      setPage(curPage)
    }
  }

  const getFilterData = async (): Promise<void> => {
    setErrorFilter('')
    const validationType = filterField === 'price' ? 'number' : 'string'
    const validationResult = validateFunction(validationType,valueInputFilter)
    let data

    if (validationResult === 'success') {
      setPage(1)
      setFilterData([])
      setLoading(true)
      setIsFilter(true)
      data = await getFilterInfoProducts({param: filterField, value: valueInputFilter})
    } else {
      setErrorFilter(validationResult)
    }

    if (data) {
      const arr = paginateArray(data, 50)
      setFilterData(arr)
      setProducts(data)
      setLoading(false)
    }
  }

  const setPageWithFilterDataFunction = (count: number): void => {
    const curPage = page + count

    if (curPage > 0 && filterData.length > 0 && filterData.length >= curPage) {
      setPage(curPage)
    }
  }


  const getFields = async (): Promise<void> => {
    const data = await getFieldsProducts()

    if (data) {
      setFields(data)
    }
  }

  const setFilterValueFunction = (value: string): void => {
    setValueInputFilter(value)
  }

  const setFilterFieldFunction = (value: string): void => {
    clearFilter()
    setFilterField(value)
  }

  const deleteFilterData = () => {
    setFilterData([])
    setPage(1)
    setValueInputFilter('')
    setFilterField('')
    setErrorFilter('')
    setIsFilter(false)
  }

  const clearFilter = (): void => {
    setValueInputFilter('')
    setFilterField('')
    setErrorFilter('')
  }

  useEffect(() => {
    if (!isFilter) {
      getData().then()
    }
  }, [page, isFilter])

  useEffect(() => {
    getFields().then()
  }, [])


  return {
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
  };
};
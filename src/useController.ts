import { useEffect, useState } from 'react';

import {
  getFieldsProducts,
  getFilterInfoProducts,
  getInfoProducts,
  getMaxPagesProducts,
  getBrands,
} from 'api/service';
import { paginateArray, validateFunction } from 'helpers';
import { IProduct, ISetPagesParams } from 'types/productsTypes';


export default function useController() {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [fields, setFields] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filterField, setFilterField] = useState<string>();
  const [valueInputFilter, setValueInputFilter] = useState<string>('');
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [errorFilter, setErrorFilter] = useState<string>('');
  const [filterData, setFilterData] = useState<Array<IProduct[]>>([]);
  const [brands, setBrands] = useState<string[]>([]);

  const getData = async (): Promise<void> => {
    setLoading(true)
    setProducts([])
    const data = await getInfoProducts({page: page})

    if (data) {
      setProducts(data)
      setLoading(false)
    }
  }

  const getMaxPagesFunction = async ():Promise<void> => {
    const data = await getMaxPagesProducts()
    if (data) {
      setMaxPages(data)
    }
  }

  const getBrandsFunction = async ():Promise<void> => {
    const data = await getBrands()
    if (data) {
      setBrands(data)
    }
  }

  const setPageFunction = ({onePageStep, requiredPage}: ISetPagesParams): void => {
    if (onePageStep) {
      if (onePageStep > 0 && products.length > 0) {
        setPage(onePageStep)
      }
    }
    if (requiredPage) {
      setPage(requiredPage)
    }
  }

  const getFilterData = async (): Promise<void> => {
    setErrorFilter('')
    const validationType = filterField === 'price' ? 'number' : 'string'
    const validationResult = validateFunction(validationType,valueInputFilter)
    let data

    if (validationResult === 'success') {
      setPage(1)
      setMaxPages(1)
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
      setMaxPages(arr.length)
      setProducts(data)
      setLoading(false)
    }
  }

  const setPageWithFilterDataFunction = ({onePageStep, requiredPage}: ISetPagesParams): void => {
    if(onePageStep) {
      if (onePageStep > 0 && filterData.length > 0 && filterData.length >= onePageStep) {
        setPage(onePageStep)
      }
    }

    if (requiredPage) {
      setPage(requiredPage)
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
      getMaxPagesFunction().then()
    }
  }, [page, isFilter])

  useEffect(() => {
    getFields().then()
    getBrandsFunction().then()
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
    filterData: filterData[page-1],
    maxPages,
    brands,
    setPageFunction,
    getFilterData,
    setFilterValueFunction,
    setFilterFieldFunction,
    deleteFilterData,
    setPageWithFilterDataFunction
  };
};
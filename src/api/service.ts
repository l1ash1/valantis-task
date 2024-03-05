import { fetchWrapper } from './fetchWrapper';
import { IProduct } from 'types/productsTypes';
import { doUniqueIds, doUniqueProducts } from 'helpers';


interface IParamsGetIds {
  page: number;
}

export const getIdsProducts = async ({page}: IParamsGetIds):Promise<string[]> => {
  let count = 0;
  const maxTries = 2;

  while (true) {
    try {
      const responsePromise = await fetchWrapper({
        data: {
          action: 'get_ids',
          params: {'offset': page, 'limit': 50}
        }
      })
      const idsProductsResult = await responsePromise.json()

      return doUniqueIds(idsProductsResult.result)
    } catch (e) {
      console.log('getIdsProducts@========>', e)

      if (++count === maxTries) throw e;
    }
  }
}

export const getMaxPagesProducts = async ():Promise<number> => {
  let count = 0;
  const maxTries = 2;

  while (true) {
    try {
      const responsePromise = await fetchWrapper({
        data: {
          action: 'get_ids',
        }
      })
      const idsProductsResult = await responsePromise.json()

      return Math.ceil(idsProductsResult.result.length/50)
    } catch (e) {
      console.log('getIdsProducts@========>', e)

      if (++count === maxTries) throw e;
    }
  }
}

export const getFieldsProducts = async ():Promise<string[]> => {
  let count = 0;
  const maxTries = 2;
  while (true) {
    try {
      const responsePromise = await fetchWrapper({
        data: {
          action: 'get_fields',
        }
      })
      const data = await responsePromise.json()

      return data.result
    } catch (e) {
      console.log('getFilterIdsProducts@========>', e)

      if (++count === maxTries) throw e;
    }
  }
}

export const getBrands = async ():Promise<string[]> => {
  let count = 0;
  const maxTries = 2;
  while (true) {
    try {
      const responsePromise = await fetchWrapper({
        data: {
          action: 'get_fields',
          params: {field: 'brand'}
        }
      })
      const data = await responsePromise.json()

      return Array.from(new Set(data.result as string[]))
        .sort((cur, prev) => cur.localeCompare(prev))
        .filter(Boolean)
    } catch (e) {
      console.log('getFilterIdsProducts@========>', e)

      if (++count === maxTries) throw e;
    }
  }
}

export const getFilterIdsProducts = async ({param, value}: any):Promise<string[]> => {
  value = value.trim()
  if (param === 'price') {

    value = Number(value)
  }
  let count = 0;
  const maxTries = 2;

  while (true) {
    try {
      const responsePromise = await fetchWrapper({
        data: {
          action: 'filter',
          params: {[param]: value}
        }
      })
      const idsProductsResult = await responsePromise.json()

      return doUniqueIds(idsProductsResult.result)
    } catch (e) {
      console.log('getFilterIdsProducts@========>', e)

      if (++count === maxTries) throw e;
    }
  }
}

export const getInfoProducts = async ({page}: IParamsGetIds): Promise<IProduct[]> => {
  let count = 0;
  const maxTries = 2;

  while (true) {
    try {
      const idsProducts = await getIdsProducts({page})

      const responsePromise = await fetchWrapper({
        data: {
          action: 'get_items',
          params: {'ids': idsProducts}
        }
      })
      const response = await responsePromise.json()
      const arrProducts: IProduct[] = response.result

      return doUniqueProducts(arrProducts, (n: IProduct) => n.id)
    } catch (e) {
      console.log('getInfoProducts@========>', e)

      if (++count === maxTries) throw e;
    }
  }

}

export const getFilterInfoProducts = async ({param, value}: any): Promise<IProduct[]> => {
  let count = 0;
  const maxTries = 2;

  while (true) {
    try {
      const idsProducts = await getFilterIdsProducts({param, value})

      const responsePromise = await fetchWrapper({
        data: {
          'action': 'get_items',
          'params': {'ids': idsProducts}
        }
      })
      const response = await responsePromise.json()
      const arrProducts: IProduct[] = response.result

      return doUniqueProducts(arrProducts, (item: IProduct) => item.id)
    } catch (e) {
      console.log('getFilterInfoProducts@========>', e)

      if (++count === maxTries) throw e;
    }
  }

}
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
      const uniqueIdsProducts: string[] = doUniqueIds(idsProductsResult.result)

      return uniqueIdsProducts
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
      const uniqueIdsProducts: string[] = doUniqueIds(idsProductsResult.result)

      return uniqueIdsProducts
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

      if (arrProducts) {
        return doUniqueProducts(arrProducts, (n: IProduct) => n.id)
      }
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

      if (arrProducts) {
        return doUniqueProducts(arrProducts, (item: IProduct) => item.id)
      }
    } catch (e) {
      console.log('getFilterInfoProducts@========>', e)

      if (++count === maxTries) throw e;
    }
  }

}
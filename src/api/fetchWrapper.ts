import { config } from './config';


interface IParams {
  data: any;
}

export const fetchWrapper = (params: IParams) => {

  return fetch(config.url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': config.password
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(params.data),
  });
};
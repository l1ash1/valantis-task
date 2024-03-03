import React from 'react';
import {
  Form,
} from 'react-bootstrap';

import './InputComponent.scss';


interface IProps {
  filterField?: string;
  value?: string;
  handlerChange: (value: string) => void;
  error: string;
}

const InputComponent = (
  {
    filterField,
    value,
    handlerChange,
    error,
  }: IProps
) => {

  const onFormSubmit = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <div className='input-component'>
      {error &&
          <div className='input-component__error-text'>
            {error}
          </div>
      }
      <Form.Control
        className={`${filterField ? 'form-control_enable': 'form-control_disable'} ${error && 'form-control_error'}`}
        placeholder='Введите значение'
        value={value}
        onKeyPress={(e)=> onFormSubmit(e)}
        onChange={(e) => handlerChange(e.target.value)}
      />
    </div>
  );
};

export default InputComponent;
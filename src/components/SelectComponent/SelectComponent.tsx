import React from 'react';
import {
  Form,
} from 'react-bootstrap';

import { ucFirst } from 'helpers';

import './SelectComponent.scss';


interface IProps {
  options: string[],
  selectField?: string
  handlerChange: (value: string) => void
}

const SelectComponent = (
  {
    options,
    selectField,
    handlerChange
  }: IProps
) => {
  return (
    <Form.Select
      size='sm'
      aria-label='Default select example'
      defaultValue=''
      onChange={(e) => handlerChange(e.target.value)}
    >
      <option selected={!selectField && true} value=''>Выбрать поле</option>
      {options.map((field) =>
        <option
          key={field}
          value={field}
        >
          {ucFirst(field)}
        </option>
      )}
    </Form.Select>
  );
};

export default SelectComponent;
import React from 'react';
import {
  Form,
} from 'react-bootstrap';

import { ucFirst } from 'helpers';

import './SelectComponent.scss';


interface IProps {
  fields: string[],
  filterField?: string
  handlerChange: (value: string) => void
}

const SelectComponent = (
  {
    fields,
    filterField,
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
      <option selected={!filterField && true} value=''>Выбрать поле</option>
      {fields.map((field) =>
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
import React from 'react';
import {
  Button,
} from 'react-bootstrap';

import './ButtonComponent.scss';


interface IProps {
  text: string;
  filterField?: string;
  isFilter?: boolean;
  variant: 'primary' | 'secondary' | 'success';
  onClickFunction: () => void
}

const ButtonComponent = (
  {
    text,
    filterField,
    variant,
    onClickFunction,
  }: IProps
) => {
  return (
    <div className='button-component'>
      <Button
        className={filterField ? 'button-component_enable': 'button-component_disable'}
        variant={variant}
        onClick={() => onClickFunction()}
      >
        {text}
      </Button>
    </div>
  );
};

export default ButtonComponent;
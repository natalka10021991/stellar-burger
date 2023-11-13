import { FC } from 'react';

interface Props {
  text: string;
}

const Button: FC<Props> = ({ text }) => {
  return <button className='primary-button'>{text}</button>;
};

export default Button;

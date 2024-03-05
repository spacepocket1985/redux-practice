import { ReactNode } from 'react';
import styles from './Card.module.css';

type CardPropsType = {
  children: ReactNode;
  className?: string;
};

const Card = (props: CardPropsType): JSX.Element => {
  return (
    <section
      className={`${styles.card} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </section>
  );
};

export default Card;

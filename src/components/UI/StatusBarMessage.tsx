import styles from './StatusBarMessage.module.css';

export type StatusBarMessagePropsType = {
  status: null | 'error' | 'success' | 'pending';
  title: string | null;
  message: string | null;
};

const StatusBarMessage = (props: StatusBarMessagePropsType) => {
  let statusClasses = '';

  if (props.status === 'error') {
    statusClasses = styles.error;
  }
  if (props.status === 'success') {
    statusClasses = styles.success;
  }

  const messageClasses = `${styles.message} ${statusClasses}`;

  return (
    <section className={messageClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default StatusBarMessage;

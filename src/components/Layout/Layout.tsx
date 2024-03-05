import { ReactNode } from 'react';
import MainHeader from './MainHeader';

type LayoutPropsType = {
  children: ReactNode;
};

const Layout = (props: LayoutPropsType):JSX.Element  => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;

import React, { ReactNode } from 'react';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default DefaultLayout;
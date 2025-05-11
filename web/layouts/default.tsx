import React, { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

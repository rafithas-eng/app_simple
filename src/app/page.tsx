'use client';

import Layout from './layout';
import Header from './components/header/page';
import Menu from './components/menu/page';

export default function Home() {
    return (
        <Layout>
            <Header />
            <Menu/>

        </Layout>
    );
}
import React from "react";
import { Layout } from "@/components/template/Layout";
import Head from "next/head";
import ContactTemplate from "@/components/template/ContactTemplate";

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Bantuan & FAQ | LPK PB Merdeka</title>
            </Head>
            <Layout>
                <ContactTemplate />
            </Layout>
        </>
    );
}

import React from "react";
import { Layout } from "@/components/shared/Layout";
import Head from "next/head";
import ContactTemplate from "@/components/contact/ContactTemplate";

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Bantuan & FAQ | LPK PB Merdeka</title>
            </Head>
            <ContactTemplate />
        </>
    );
}

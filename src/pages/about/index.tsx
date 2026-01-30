import React from "react";
import { Layout } from "@/components/shared/Layout";
import { AboutTemplate } from "@/components/about/AboutTemplate";
import Head from "next/head";

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>Tentang Kami | LPK PB Merdeka</title>
            </Head>
            <AboutTemplate />
        </>
    );
}

import React from 'react';
import { Button } from "../../shared/atoms";
import { FormField } from "../../shared/molecules";
import TextArea from "../../shared/atoms/TextArea";
import { Heading } from "../../shared/atoms";

const QuestionForm = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800 transition-colors duration-300">
            <Heading className="text-2xl mb-2 dark:text-white">Ajukan Pertanyaan</Heading>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
                Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <FormField
                    id="name"
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap Anda"
                />
                <FormField
                    id="email"
                    type="email"
                    label="Alamat Email"
                    placeholder="email@contoh.com"
                />
                <FormField
                    id="subject"
                    label="Subjek"
                    placeholder="Apa yang ingin Anda tanyakan?"
                />
                <TextArea
                    label="Pesan Anda"
                    placeholder="Tuliskan detail pertanyaan Anda di sini..."
                    rows={5}
                />

                <Button variant="primary" className="w-full justify-center text-white py-3 bg-red-600 hover:bg-red-700 mt-4">
                    Kirim Pesan
                </Button>
            </form>
        </div>
    );
};

export default QuestionForm;

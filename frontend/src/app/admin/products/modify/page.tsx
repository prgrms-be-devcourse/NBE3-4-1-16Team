'use client'

import React, { useEffect, useState } from 'react';
import client from '@/lib/backend/client';
import ClientPage from './ClientPage';
import { useParams } from 'react-router-dom';

export default function Page() {
    const { id } = useParams();
    const [responseBody, setResponseBody] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
                const response = await client.GET('/products/' + id);
                setResponseBody(response.data);
        };
    }, []);

    return (
        <>
            <ClientPage responseBody={responseBody} id={id} />
        </>
    );
}
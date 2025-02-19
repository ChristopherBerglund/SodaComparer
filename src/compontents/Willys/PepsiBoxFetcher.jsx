import { useEffect, useState } from 'react';
import axios from 'axios';

const PepsiBoxFetcher = ({ onPriceFetched, store, type }) => {
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (hasFetched) return;
        const fetchPrice = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/${store}/pepsi/${type}`);
                const price = Math.floor(parseFloat(response.data.price));
                onPriceFetched(price);
                setHasFetched(true);
                console.log('price: ',type + ': ' + price);
            } catch (error) {
                console.error('Error fetching price:', error);
            }
        };

        fetchPrice();
    }, [onPriceFetched, store, hasFetched]);

    return null;
};

export default PepsiBoxFetcher;

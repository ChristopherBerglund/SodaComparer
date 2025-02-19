import { useEffect, useState } from 'react';
import axios from 'axios';

const PepsiBoxFetcher = ({ onPriceFetched, store, type }) => {
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (hasFetched) return;
        const fetchPrice = async () => {
            const cacheKey = `${store}_${type}_price`;
            const cachedData = JSON.parse(localStorage.getItem(cacheKey));

            if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
                onPriceFetched(cachedData.price);
                setHasFetched(true);
                console.log('Using cached price:', type + ': ' + cachedData.price);
                return;
            }

            try {
                const response = await axios.get(`https://sodacomparer-1b140e39c852.herokuapp.com/api/${store}/pepsi/${type}`);
                const price = Math.floor(parseFloat(response.data.price));

                const dataToCache = { price, timestamp: Date.now() };
                localStorage.setItem(cacheKey, JSON.stringify(dataToCache));

                onPriceFetched(price);
                setHasFetched(true);
                console.log('Fetched price from API:', type + ': ' + price);
            } catch (error) {
                console.error('Error fetching price:', error);
            }
        };

        fetchPrice();
    }, [onPriceFetched, store, type, hasFetched]);

    return null;
};

export default PepsiBoxFetcher;

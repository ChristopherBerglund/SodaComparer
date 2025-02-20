import { useEffect, useState } from 'react';
import axios from 'axios';

const PepsiFetcher = ({ onPriceFetched, store, type, id }) => {
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (hasFetched) return;
        const fetchPrice = async () => {
            const cacheKey = `${store}_${type}_${id}_price`;
            const cachedData = JSON.parse(localStorage.getItem(cacheKey));

            if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
                onPriceFetched(cachedData.price);
                setHasFetched(true);
                console.log('Using cached price:', type + ': ' + cachedData.price);
                return;
            }

            id = store === 'overskottsbolaget' ? type : id;
            try {
                const response = await axios.get(`https://sodacomparer-1b140e39c852.herokuapp.com/api/${store}/pepsi/${id}`); 
                const price = Math.floor(parseFloat(response.data.price));
                const dataToCache = { price, timestamp: Date.now() };
                localStorage.setItem(cacheKey, JSON.stringify(dataToCache));

                onPriceFetched(price);
                setHasFetched(true);
            } catch (error) {
                console.error('Error fetching price:', error);
            }
        };
        fetchPrice();
    }, [onPriceFetched, store, type, id, hasFetched]);

    return null;
};

export default PepsiFetcher;

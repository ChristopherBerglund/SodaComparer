import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import PepsiFetcher from "./compontents/Willys/PepsiFetcher.jsx";
import willysLogo from './assets/willys-logo-1.png';
import obLogo from './assets/OB.jpg';
import cgLogo from './assets/CG.png';
import icaLogo from './assets/ica.png';
import pepsiBackground from './assets/pepsiBackground.jpg';
import pepsi20 from './assets/pepsi20.jpg';
import pepsibottles from './assets/pepsiBottles.jpg';
import pepsibottle from './assets/pepsiBottle15.jpg';
import './App.css';

function App() {
    const [stores, setStores] = useState([
        { store: 'Willys', imageurl: willysLogo, totalCl: 6.6, standardPrice: 119, image: pepsi20, link: 'https://www.willys.se/produkt/Pepsi-Max-Lask-Burk-101392420_ST', fetcher: PepsiFetcher, storeName: 'willys', type: 'box', id: '101392420_ST' },
        { store: 'Willys', imageurl: willysLogo, totalCl: 6, standardPrice: 65, image: pepsibottles, link: 'https://www.willys.se/produkt/Pepsi-Max-Lask-Pet-100241819_ST', fetcher: PepsiFetcher, storeName: 'willys', type: 'bottles', id: '100241819_ST' },
        { store: 'Willys', imageurl: willysLogo, totalCl: 1.5, standardPrice: 18.9, image: pepsibottle, link: 'https://www.willys.se/produkt/Pepsi-Max-Lask-Pet-100256571_ST', fetcher: PepsiFetcher, storeName: 'willys', type: 'bottle', id: '100256571_ST' },
        { store: 'Överskottsbolaget', imageurl: obLogo, totalCl: 6.6, standardPrice: 135, image: pepsi20, link: 'https://www.xn--ob-eka.se/mat--dryck/dryck/lask/lask-pepsi-max-2005547/', fetcher: PepsiFetcher, storeName: 'overskottsbolaget', type: 'box', id:'' },
        { store: 'Överskottsbolaget', imageurl: obLogo,totalCl: 6, standardPrice:  69, image: pepsibottles, link: 'https://www.xn--ob-eka.se/mat--dryck/dryck/lask-pepsi-max-2005142/', fetcher: PepsiFetcher, storeName: 'overskottsbolaget', type: 'bottles', id:'' },
        { store: 'Överskottsbolaget', imageurl: obLogo,totalCl: 1.5, standardPrice:  20, image: pepsibottle, link: 'https://www.xn--ob-eka.se/mat--dryck/dryck/lask/lask-pepsi-max-2002225/', fetcher: PepsiFetcher, storeName: 'overskottsbolaget', type: 'bottle', id:'' },
        { store: 'City gross', imageurl: cgLogo, totalCl: 6.6,standardPrice:  129, image: pepsi20, link: 'https://www.citygross.se/matvaror/dryck/lask/pepsi-max-burk-20-pack-p101392420_ST', fetcher: PepsiFetcher, storeName: 'citygross', type: 'box', id: '101392420_ST?' },
        { store: 'City gross', imageurl: cgLogo,totalCl: 6, standardPrice:  69, image: pepsibottles, link: 'https://www.citygross.se/matvaror/dryck/lask/pepsi-max-4-pack-p100241819_ST', fetcher: PepsiFetcher, storeName: 'citygross', type: 'bottles', id: '100241819_ST?' },
        { store: 'City gross', imageurl: cgLogo,totalCl: 1.5, standardPrice:  19, image: pepsibottle, link: 'https://www.citygross.se/matvaror/dryck/lask/pepsi-max-p100256571_ST', fetcher: PepsiFetcher, storeName: 'citygross', type: 'bottle', id: '100256571_ST?' },
        { store: 'Ica Maxi', imageurl: icaLogo, totalCl: 6.6,standardPrice:  119, image: pepsi20, link: 'https://handlaprivatkund.ica.se/stores/1003825/products/l%C3%A4sk-pepsi-max-33cl-20p-pepsi/2094038', fetcher: PepsiFetcher, storeName: 'icamaxi', type: 'box', id: '2094038' },
        { store: 'Ica Maxi', imageurl: icaLogo, totalCl: 6, standardPrice:  63, image: pepsibottles, link: 'https://handlaprivatkund.ica.se/stores/1004219/products/l%C3%A4sk-pepsi-max-1-5l-4-p-pepsi/1308125', fetcher: PepsiFetcher, storeName: 'icamaxi', type: 'bottles', id: '1308125' },
        { store: 'Ica Maxi', imageurl: icaLogo, totalCl: 1.5, standardPrice:  18, image: pepsibottle, link: 'https://handlaprivatkund.ica.se/stores/1003825/products/l%C3%A4sk-pepsi-max-1-5l/1294417', fetcher: PepsiFetcher, storeName: 'icamaxi', type: 'bottle', id: '1294417' },
        // { store: 'Rusta', imageurl: rusta, boxPriceStandard: null, boxImage: pepsi20, boxLink: 'https://handlaprivatkund.ica.se/stores/1003825/products/l%C3%A4sk-pepsi-max-33cl-20p-pepsi/2094038', fetcher: PepsiBoxFetcher, storeName: 'icamaxi', type: 'box' },
        // { store: 'Rusta', imageurl: rusta, boxPriceStandard: null, boxImage: pepsibottles, boxLink: 'https://handlaprivatkund.ica.se/stores/1003825/products/l%C3%A4sk-pepsi-max-33cl-20p-pepsi/2094038', fetcher: PepsiBoxFetcher, storeName: 'icamaxi', type: 'box' },
    ]);

    const handlePriceFetched = (storeName, type, id, fetchedPrice) => {
        setStores(prevStores => {
            return prevStores.map(store =>
                store.storeName === storeName && store.type === type
                    ? { ...store, currentPrice: fetchedPrice }
                    : store
            );
        });
    };

    const sortedStores = [...stores].sort((a, b) => {
        const pricePerClA = a.currentPrice ? a.currentPrice / a.totalCl : Infinity;
        const pricePerClB = b.currentPrice ? b.currentPrice / b.totalCl : Infinity;
        return pricePerClA - pricePerClB;
    });

    return (
        <div style={{
            backgroundImage: pepsiBackground,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh'
        }}>
            <div className="app-container">
                <h3>Billigast pepsi just nu!</h3>
                {sortedStores.map((store, index) => (
                    <a key={index} href={store.link} target="_blank" rel="noopener noreferrer"
                       className="store-link">
                        <div className="store-container">
                            <div className="store-info">
                                <img src={store.imageurl} alt={store.store} className="store-logo"/>
                                <img src={store.image} alt={store.store} className="box-image"/>
                            </div>
                            {store.currentPrice === null ? (
                                <div className="loading-container">
                                    <ClipLoader color="#00bfff" loading={true} size={50}/>
                                </div>
                            ) : (
                                <div className="price-container"
                                     style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                    <p className={`price-text ${store.currentPrice < store.standardPrice ? 'flash' : ''}`}
                                       style={{
                                           color: store.currentPrice < store.standardPrice ? 'red' : '#00bfff',
                                       }}>
                                        {store.currentPrice}:-
                                        {store.currentPrice < store.standardPrice && (
                                            <span className="price-text standard-price"
                                                  style={{textDecoration: 'line-through', marginLeft: '10px'}}>
            {store.standardPrice}:-
        </span>
                                        )}
                                    </p>
                                    <small className="price-per-cl">
                                        {(store.currentPrice / store.totalCl).toFixed(2)}:- per cl
                                    </small>
                                </div>

                            )}
                            <store.fetcher store={store.storeName} type={store.type} id={store.id}
                                           onPriceFetched={(fetchedPrice) => handlePriceFetched(store.storeName, store.type, store.id, fetchedPrice)}/>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default App;

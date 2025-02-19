import { useState } from 'react';
// import React from 'react';
import './App.css';
import ClipLoader from "react-spinners/ClipLoader";
import PepsiBoxFetcher from "./compontents/Willys/PepsiBoxFetcher.jsx";
import willysLogo from './assets/willys-logo-1.png';
import obLogo from './assets/OB.jpg';
import cgLogo from './assets/CG.png';
import icaLogo from './assets/ica.png';
import pepsiBackground from './assets/pepsiBackground.jpg';
import pepsi20 from './assets/pepsi20.jpg';
import pepsibottles from './assets/pepsiBottles.jpg';

function App() {
    const [stores, setStores] = useState([
        { store: 'Willys', imageurl: willysLogo, totalCl: 6.6, boxPriceStandard: null, boxImage: pepsi20, boxLink: 'https://www.willys.se/produkt/Pepsi-Max-Lask-Burk-101392420_ST', fetcher: PepsiBoxFetcher, storeName: 'willys', type: 'box' },
        { store: 'Willys', imageurl: willysLogo, totalCl: 6, boxPriceStandard: null, boxImage: pepsibottles, boxLink: 'https://www.willys.se/produkt/Pepsi-Max-Lask-Pet-100241819_ST', fetcher: PepsiBoxFetcher, storeName: 'willys', type: 'bottle' },
        { store: 'Överskottsbolaget', imageurl: obLogo, totalCl: 6.6, boxPriceStandard: null, boxImage: pepsi20, boxLink: 'https://www.xn--ob-eka.se/mat--dryck/dryck/lask/lask-pepsi-max-2005547/', fetcher: PepsiBoxFetcher, storeName: 'overskottsbolaget', type: 'box' },
        { store: 'Överskottsbolaget', imageurl: obLogo,totalCl: 6, boxPriceStandard:  null, boxImage: pepsibottles, boxLink: 'https://www.xn--ob-eka.se/mat--dryck/dryck/lask-pepsi-max-2005142/', fetcher: PepsiBoxFetcher, storeName: 'overskottsbolaget', type: 'bottle' },
        { store: 'City gross', imageurl: cgLogo, totalCl: 6.6,boxPriceStandard:  null, boxImage: pepsi20, boxLink: 'https://www.citygross.se/matvaror/dryck/lask/pepsi-max-burk-20-pack-p101392420_ST', fetcher: PepsiBoxFetcher, storeName: 'citygross', type: 'box' },
        { store: 'City gross', imageurl: cgLogo,totalCl: 6, boxPriceStandard:  null, boxImage: pepsibottles, boxLink: 'https://www.citygross.se/matvaror/dryck/lask/pepsi-max-4-pack-p100241819_ST', fetcher: PepsiBoxFetcher, storeName: 'citygross', type: 'bottle' },
        { store: 'Ica Maxi', imageurl: icaLogo, totalCl: 6.6,boxPriceStandard:  null, boxImage: pepsi20, boxLink: 'https://handlaprivatkund.ica.se/stores/1003825/products/l%C3%A4sk-pepsi-max-33cl-20p-pepsi/2094038', fetcher: PepsiBoxFetcher, storeName: 'icamaxi', type: 'box' },
        { store: 'Ica Maxi', imageurl: icaLogo, totalCl: 6, boxPriceStandard:  null, boxImage: pepsibottles, boxLink: 'https://handlaprivatkund.ica.se/stores/1004219/products/l%C3%A4sk-pepsi-max-1-5l-4-p-pepsi/1308125', fetcher: PepsiBoxFetcher, storeName: 'icamaxi', type: 'bottle' },
        // { store: 'Rusta', imageurl: rusta, boxPriceStandard: null, boxImage: pepsi20, boxLink: 'https://handlaprivatkund.ica.se/stores/1003825/products/l%C3%A4sk-pepsi-max-33cl-20p-pepsi/2094038', fetcher: PepsiBoxFetcher, storeName: 'icamaxi', type: 'box' },
        // { store: 'Rusta', imageurl: rusta, boxPriceStandard: null, boxImage: pepsibottles, boxLink: 'https://handlaprivatkund.ica.se/stores/1003825/products/l%C3%A4sk-pepsi-max-33cl-20p-pepsi/2094038', fetcher: PepsiBoxFetcher, storeName: 'icamaxi', type: 'box' },
    ]);

    const handlePriceFetched = (storeName, type, fetchedPrice) => {
        setStores(prevStores => {
            return prevStores.map(store =>
                store.storeName === storeName && store.type === type
                    ? { ...store, boxPrice: fetchedPrice }
                    : store
            );
        });
    };

    const sortedStores = [...stores].sort((a, b) => {
        const pricePerClA = a.boxPrice ? a.boxPrice / a.totalCl : Infinity;
        const pricePerClB = b.boxPrice ? b.boxPrice / b.totalCl : Infinity;
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
                {sortedStores.slice(0, 7).map((store, index) => (
                    <a key={index} href={store.boxLink} target="_blank" rel="noopener noreferrer"
                       className="store-link">
                        <div className="store-container">
                            <div className="store-info">
                                <img src={store.imageurl} alt={store.store} className="store-logo"/>
                                <img src={store.boxImage} alt={store.store} className="box-image"/>
                            </div>
                            {store.boxPrice === null ? (
                                <div className="loading-container">
                                    <ClipLoader color="#00bfff" loading={true} size={50}/>
                                </div>
                            ) : (
                                <div className="price-container"
                                     style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                    {store.boxPrice < store.boxPriceStandard && (
                                        <p className="price-text standard-price" style={{
                                            textDecoration: 'line-through',
                                            marginRight: '10px'
                                        }}>{store.boxPriceStandard}:-</p>
                                    )}
                                    <p className="price-text"
                                       style={{color: store.boxPrice < store.boxPriceStandard ? 'red' : '#00bfff'}}>{store.boxPrice}:-</p>
                                    <small className="price-per-cl">{(store.boxPrice / store.totalCl).toFixed(2)}:- per
                                        cl</small>
                                </div>
                            )}
                            <store.fetcher store={store.storeName} type={store.type}
                                           onPriceFetched={(fetchedPrice) => handlePriceFetched(store.storeName, store.type, fetchedPrice)}/>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default App;

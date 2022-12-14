import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api';
import AliceCarousel from 'react-alice-carousel';
import {Link} from 'react-router-dom';

const useStyels = makeStyles(() => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
    }, 
    carouselItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        textTransform: 'upperCase',
        color: "#fff",
    }
}));
function Carousel() {
    const [trending, setTrending] = useState([]);

    const classes = useStyels();
    
    const {currency, symbol} = CryptoState();

    const fetchTrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }
    useEffect(() => {
        fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const numberWithCommas = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link className={classes.carouselItem}
                to={`/coins/${coin.id}`}
            >
                <img 
                    src={coin.image}
                    alt={coin.name}
                    height= "80"
                    style={{marginBottom: 10}} 
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? 'rgba(14, 203, 129)' : 'red',
                            fontWeight: '500'
                        }}
                    >
                        {profit && "+"} {coin.price_change_percentage_24h?.toFixed(2)} %
                    </span>
                </span>
                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    {/* {parseFloat(coin?.current_price).toLocaleString()} */}
                </span>
            </Link>
        )
    });
    const responsive ={
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    }
    return (
        <div className={classes.carousel} >
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel
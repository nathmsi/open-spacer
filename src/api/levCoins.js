
import { post, get } from './index';


export const updateLevCoins = ({ coins, lastCoins }) => {
    return post({
        url: '/levcoins',
        body: {
            coins,
            lastCoins
        }
    })
}


export const getLevCoins = async() => {
    const { data } = await get({
        url: '/levcoins'
    }) || {};
    return data;
}

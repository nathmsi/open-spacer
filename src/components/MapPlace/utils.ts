const colorPlace : any = {
    dior:{
        sf: '#2196f3',
        Wechat: '#ff7961',
        ios: '#80e27e',
        Manager: '#9e9e9e',
    },
    EdenGalery:"#fdd835"
}

export const chooseColorPlace = (section:string,subSection:string) => {
    if(typeof colorPlace[section] === 'object') {
        return colorPlace[section][subSection];
    }
    return colorPlace[section];
}
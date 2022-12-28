const colorPlace : any = {
    dior:{
        sf: '#2196f3',
        Wechat: '#ff7961',
        ios: '#d05ce3',
        Manager: '#9e9e9e',
    },
    ["Eden Gallery"]:"#fdd835",
    FREE:"#76ff03"
}

export const chooseColorPlace = (section:string,subSection:string) => {
    if(typeof colorPlace[section] === 'object') {
        return colorPlace[section][subSection];
    }
    return colorPlace[section];
}
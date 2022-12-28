const colorPlace = {
  dior:{
      sf: '#2196f3',
      Wechat: '#ff7961',
      ios: '#d05ce3',
      Manager: '#9e9e9e',
  },
  ["Eden Gallery"]:"#fdd835",
  FREE:"#76ff03"
}

export const chooseColorPlace = (section,subSection) => {
  if(typeof colorPlace[section] === 'object') {
      return colorPlace[section][subSection];
  }
  return colorPlace[section];
}

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  try {
    let children = "";
    if (name.split(" ").length === 1) {
      children = name.slice(0, 3);
    } else if (name?.split(" ") && name?.split(" ")[1]) {
      children = `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`;
    } else {
      children = name[0];
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}

export const getColorPlace = ({
  name,numberPlace,section,subSection
}) => ({
  ...stringAvatar(name || numberPlace),
  sx:{
    bgcolor:chooseColorPlace(section,subSection)
  }
});

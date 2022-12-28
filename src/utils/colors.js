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
      children,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}

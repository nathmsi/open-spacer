export const getParams = () => {
  const url = new URL(window.location.href);
  const arrayParams = Array.from(url.searchParams.entries());
  return arrayParams?.reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {}
  ) || {};
};

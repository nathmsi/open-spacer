export const getMappingPlacesAssigned = (data) => {
  return data?.reduce(
    (acc, el) => ({
      ...acc,
      [el.index_place]: el,
    }),
    {}
  )
}

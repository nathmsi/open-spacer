export const getMappingPlacesAssigned = (data) => {
  return data?.reduce(
    (acc, el) => ({
      ...acc,
      [el.index_place]: el,
    }),
    {}
  )
}

export const getMappingPlacesAssignedByCoordinate = (data) => {
  let map = []
  data.forEach(({ y_coordinate, x_coordinate, ...el }) => {
    if (y_coordinate !== null && x_coordinate !== null) {
      if (!map[y_coordinate]) map[y_coordinate] = []
      map[y_coordinate][x_coordinate] = { ...el, y_coordinate, x_coordinate }
    }
  })
  return map
}

export const getMappingPlacesByCoordinate = (data) => {
  let map = []
  data?.forEach(({ y_coordinate, x_coordinate, ...el }) => {
    if (y_coordinate !== null && x_coordinate !== null) {
      if (!map[y_coordinate]) map[y_coordinate] = []
      map[y_coordinate][x_coordinate] = { ...el, y_coordinate, x_coordinate }
    }
  })
  return map
}

// Arguments:
//   @primary      (array):
//   @associations (object):

const associate = (primary, associations) => {
  const result = [...primary]

  result.forEach(element => {
    associations.forEach(association => {
      const { key, data } = association
      const relation = element[`${key}Id`]

      if (relation) element[key] = data.filter(e => e.id === relation)
      if (element[key].length === 1) element[key] = element[key][0]
    })
  })

  return result
}

export default associate

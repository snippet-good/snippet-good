const { User, Comment } = require('../models')

const getCommentsOfStretchAnswer = stretchanswerId => {
  return Comment.findAll({
    where: { stretchanswerId },
    include: [{ model: User, attributes: ['firstName', 'lastName'] }]
  }).then(comments => {
    return comments.map(comment => {
      const values = comment.get()
      const { user, ...commentFields } = values
      return {
        ...commentFields,
        writerName: `${user.firstName} ${user.lastName}`
      }
    })
  })
}

module.exports = { getCommentsOfStretchAnswer }

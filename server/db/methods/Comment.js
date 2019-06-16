const { User, Comment } = require('../models')

Comment.getCommentsOfStretchAnswer = function(stretchanswerId) {
  return Comment.findAll({
    where: { stretchanswerId },
    include: [{ model: User, attributes: ['firstName', 'lastName'] }],
    order: [['createdAt']]
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

Comment.createNewComment = function(newComment) {
  return Promise.all([
    Comment.create(newComment),
    User.findByPk(newComment.userId)
  ]).then(([comment, user]) => {
    return {
      ...comment.get(),
      writerName: `${user.firstName} ${user.lastName}`
    }
  })
}

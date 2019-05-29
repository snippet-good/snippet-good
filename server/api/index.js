const router = require('express').Router()

// Authentication API
router.use('/auth', require('./auth'))

// User-related API
router.use('/users', require('./users'))
router.use('/cohorts', require('./cohorts'))
router.use('/cohort-users', require('./cohort-users'))

// Stretch-related API
router.use('/categories', require('./categories'))
router.use('/stretches', require('./stretches'))
router.use('/cohort-stretches', require('./cohort-stretches'))
router.use('/stretch-answers', require('./stretch-answers'))
// StretchAnswer

// Misc. API
router.use('/code', require('./code-editor'))

// API Directory
router.get('/', (req, res, next) => {
  const headers = ['Models', 'GET', 'POST', 'PUT', 'DELETE']
  const data = [
    { model: 'User', routes: ['/api/users', null, null, null] },
    { model: 'Cohort', routes: ['/api/cohorts', null, null, null] },
    { model: 'CohortUser', routes: ['/api/cohort-users', null, null, null] },
    { model: 'Category', routes: ['/api/categories', null, null, null] },
    { model: 'Stretch', routes: ['/api/stretches', null, null, null] },
    {
      model: 'CohortStretch',
      routes: ['/api/cohort-stretches', null, null, null]
    },
    {
      model: 'StretchAnswer',
      routes: ['/api/stretch-answers', null, null, null]
    }
  ].sort((a, b) => {
    var textA = a.model.toUpperCase()
    var textB = b.model.toUpperCase()
    return textA < textB ? -1 : textA > textB ? 1 : 0
  })

  res.send(`
  <html>
    <head>
      <style>
        body {
          font-family: 'arial';
        }

        td {
          padding: 0.9em;
        }

        thead td {
          border-bottom: 2px solid black;
          font-size: 18px;
        }

        tbody td {
          border-bottom: 1px solid grey;
        }
      </style>

      <title>Snippet Good | API</title>
    </head>

    <body>
      <h1>API Directory</h1>
        <hr/>

      <table>
        <thead>
          <tr>
            ${headers.map(h => `<td>${h}</td>`).join('')}
          </tr>
        </thead>

        <tbody>
          ${data
            .map(
              d => `
            <tr>
              <td>${d.model}</td>
              ${d.routes
                .map(r => (r ? `<td><a href=${r}>${r}</a></td>` : `<td></td>`))
                .join('')}
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </body>
    </html>
  `)
})

module.exports = router

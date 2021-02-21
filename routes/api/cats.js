const express = require('express')
const router = express.Router()

const Cats = require('../../model/cats')
const validate = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const cats = await Cats.getAll()
    res.json({
      status: 'succes',
      code: 200,
      data: {
        cats,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const cat = await Cats.getById(req.params.id)
    if (cat) {
      return res.json({
        status: 'succes',
        code: 200,
        data: {
          cat,
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', validate.createCat, async (req, res, next) => {
  try {
    const cat = await Cats.create(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        cat,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const cat = await Cats.remove(req.params.id)
    if (cat) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          cat,
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.put('/:id', validate.updateCat, async (req, res, next) => {
  try {
    const cat = await Cats.update(req.params.id, req.body)
    if (cat) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          cat,
        },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch(
  '/:id/vaccinated',
  validate.updateStatusCat,
  async (req, res, next) => {
    try {
      const cat = await Cats.update(req.params.id, req.body)
      if (cat) {
        return res.json({
          status: 'success',
          code: 200,
          data: {
            cat,
          },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not found',
        })
      }
    } catch (e) {
      next(e)
    }
  }
)

module.exports = router

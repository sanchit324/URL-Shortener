const express = require('express')
const { handleGenerateNewShortUrl, handleRedirectToLongUrl, handleGetAnalytics } = require('../controllers/url')

const router = express.Router()

router.post('/', handleGenerateNewShortUrl)

router.get('/:shortId', handleRedirectToLongUrl)

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getGiphyApiKeyThunk } from '../../store/env/actions'

const GphApiClient = require('giphy-js-sdk-core')

const mapDispatchToProps = dispatch => {
  return {
    getGiphyApiKey: () => dispatch(getGiphyApiKeyThunk())
  }
}

const mapStateToProps = state => {
  if (state.env[0] !== undefined) {
    const { GIPHY_API_KEY } = state.env[0]
    return {
      GIPHY_API_KEY
    }
  }
  return {}
}

const GiphyView = ({ getGiphyApiKey, GIPHY_API_KEY }) => {
  const [gif, setGif] = useState('')
  const [key, setKey] = useState(GIPHY_API_KEY)

  const getRandomIndex = () => {
    return Math.floor(Math.random() * 25)
  }

  const generateGif = () => {
    const randomGifIndex = getRandomIndex()
    const client = GphApiClient(GIPHY_API_KEY)
    return client
      .search('stickers', { q: 'good job' })
      .then(response => {
        setGif(response.data[randomGifIndex].images.original.url)
      })
      .catch(err => {
        console.log('error: ', err)
      })
  }

  useEffect(() => {
    if (key) {
      generateGif()
    } else if (!GIPHY_API_KEY) {
      getGiphyApiKey().then(() => setKey('loading'))
    } else {
      setKey(GIPHY_API_KEY)
    }
  }, [key])

  return (
    <div>
      <img src={gif} />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiphyView)

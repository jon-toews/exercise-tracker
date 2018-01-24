import React from 'react'
import Button from 'components/Button'

const FetchError = ({ message, onRetry }) => (
  <div>
    <p>Could not fetch lifts.  {message}</p>
    <Button onClick={onRetry}>Retry</Button>
  </div>
)

export default FetchError
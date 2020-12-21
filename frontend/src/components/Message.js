import React from 'react'
import { Alert } from 'react-bootstrap'

//children - the text that we want to display
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
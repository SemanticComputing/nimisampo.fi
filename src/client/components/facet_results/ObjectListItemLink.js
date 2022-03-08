import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const ObjectListLink = props => {
  const { data, label, externalLink, linkAsButton } = props
  if (!data.dataProviderUrl) {
    return (<span>{label}</span>)
  }
  return (
    <>
      {externalLink && linkAsButton == null &&
        <a
          target='_blank' rel='noopener noreferrer'
          href={data.dataProviderUrl}
        >
          {label}
        </a>}
      {externalLink && props.linkAsButton &&
        <Button
          variant='contained'
          target='_blank'
          rel='noopener noreferrer'
          href={data.id}
        >
          {label}
        </Button>}
      {!externalLink &&
        <Link to={data.dataProviderUrl}>
          {label}
        </Link>}
    </>
  )
}

ObjectListLink.propTypes = {
  externalLink: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  linkAsButton: PropTypes.bool
}

export default ObjectListLink

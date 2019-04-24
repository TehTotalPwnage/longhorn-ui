import React from 'react'
import PropTypes from 'prop-types'

function IconRelation({ width = 18, height = 18 }) {
  return (
    <svg viewBox="0 0 1024 1024" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <path d="M128 42.666667c-47.36 0-85.333333 37.973333-85.333333 85.333333v469.333333c0 47.36 37.973333 85.333333 85.333333 85.333334h170.666667v170.666666c0 47.36 37.973333 85.333333 85.333333 85.333334h469.333333c47.36 0 85.333333-37.973333 85.333334-85.333334V384c0-47.36-37.973333-85.333333-85.333334-85.333333h-170.666666V128c0-47.36-37.973333-85.333333-85.333334-85.333333H128m0 85.333333h469.333333v170.666667H384c-47.36 0-85.333333 37.973333-85.333333 85.333333v213.333333H128V128m256 256h213.333333v213.333333H384V384m298.666667 0h170.666666v469.333333H384v-170.666666h213.333333c47.36 0 85.333333-37.973333 85.333334-85.333334V384z" fill="#00C1DE"></path>
    </svg>
  )
}

IconRelation.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

export default IconRelation

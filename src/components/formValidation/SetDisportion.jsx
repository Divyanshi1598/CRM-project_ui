import React from 'react'
import { MultiSelect } from './MultiSelect'

export const SetDisportion = () => {
  return (
    <div>
        <MultiSelect
        label="disposition"
        placeHolder="Select Disposition here"
        isMulti={false}
        />
    </div>
  )
}

export default SetDisportion;
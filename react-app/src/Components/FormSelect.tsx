import React, { FC } from 'react'
import Form from 'react-bootstrap/Form'

import { OptionType } from 'types'

interface FormSelectProps {
  placeholder: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  options: OptionType[]
}

const FormSelect: FC<FormSelectProps> = ({ placeholder, onChange, options }: FormSelectProps) => {
  const renderOptions = [
    <option key={null} value={''}>--</option>
  ].concat(options.map(option =>
    <option key={option.id} value={option.id}>{option.name}</option>
  ))

  return (
    <Form.Control
      as="select"
      className="m-2 flex-grow-1"
      placeholder={placeholder}
      onChange={onChange}
    >
      {renderOptions}
    </Form.Control>
  )
}

export default FormSelect

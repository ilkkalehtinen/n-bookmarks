import React, { FC } from 'react'
import Form from 'react-bootstrap/Form'

interface FormPasswordProps {
  placeholder: string
  value: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const FormPassword: FC<FormPasswordProps> = ({ placeholder, value, onChange }: FormPasswordProps) =>
  <Form.Control
    className="m-2 flex-grow-1"
    type="password"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />

export default FormPassword

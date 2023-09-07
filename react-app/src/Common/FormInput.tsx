/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
import React, { FC } from 'react'
import Form from 'react-bootstrap/Form'

interface FormInputProps {
  placeholder: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const FormInput: FC<FormInputProps> = ({ placeholder, value, onChange }: FormInputProps) =>
  <Form.Control
    className="m-2 flex-grow-1"
    type="input"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />

export default FormInput

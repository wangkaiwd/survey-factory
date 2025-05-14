import React, { ComponentProps, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'

const FormInput = (props: ComponentProps<'input'>) => {
  const { value: propValue, onChange, onBlur, ...restProps } = props
  const [value, setValue] = useState(propValue)

  useEffect(() => {
    if (value !== propValue) {
      setValue(propValue)
    }
  }, [propValue])

  // update data when input blur
  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value !== propValue) {
      onChange?.(e)
    }
    onBlur?.(e)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
  }

  return (
    <Input {...restProps} value={value} onChange={onInputChange} onBlur={onInputBlur}/>
  )
}

export default FormInput

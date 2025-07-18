import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { SingleSelectProps } from '@/questions/SingleSelect/types'

const SingleSelect = ({ title, name, options }: SingleSelectProps) => {
  const { control } = useFormContext()

  return (
    <div>
      <FormField
        name={name}
        control={control}
        render={() => {
          return (
            <FormItem>
              <FormLabel className={'text-lg font-medium'}>{title}</FormLabel>
              {
                options.map((option) => {
                  return (
                    <FormField
                      key={option.value}
                      name={name}
                      render={({ field }) => {
                        const onCheckedChange = (checked: boolean) => {
                          if (checked) {
                            const fieldValue = field.value || []
                            field.onChange([...fieldValue, option.value])
                            return
                          }
                          const newValue = field.value?.filter((value: string) => value !== option.value)
                          field.onChange(newValue)
                        }
                        return (
                          <FormItem key={option.value} className={'flex flex-row items-center gap-2'}>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={onCheckedChange}
                              />
                            </FormControl>
                            <FormLabel className={'font-normal'}>
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  )
                })
              }
            </FormItem>
          )
        }}
      />

    </div>
  )
}

export default SingleSelect

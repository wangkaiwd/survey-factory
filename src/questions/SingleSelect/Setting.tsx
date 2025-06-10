import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'

const formItemBaseCls = 'flex justify-between'
const formLabelBaseCls = 'w-20'

const SingleSelectSetting = () => {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  })

  const handleAddOption = () => {
    append({ label: `选项 ${fields.length + 1}`, value: crypto.randomUUID() })
  }

  const handleRemoveOption = (index: number) => {
    remove(index)
  }

  return (
    <div className={'space-y-4'}>
      <FormField
        control={form.control}
        name="required"
        render={({ field }) => (
          <FormItem className={formItemBaseCls}>
            <FormLabel className={formLabelBaseCls}>必填</FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className={formItemBaseCls}>
            <FormLabel className={formLabelBaseCls}>标题</FormLabel>
            <FormControl>
              <Input placeholder="请输入标题" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Options</h3>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={'size-7'}
            onClick={handleAddOption}
          >
            <Plus/>
          </Button>
        </div>
        {
          fields.length > 0 &&
          <div className="border rounded-md">
            {fields.map((field, index) => (
              <div key={field.id} className="group">
                <FormField
                  control={form.control}
                  name={`options.${index}.label`}
                  render={({ field: optionField }) => (
                    <div className="flex items-center pl-3 rounded-lg hover:bg-gray-50">
                      <FormControl className="flex-1">
                        <Input
                          {...optionField}
                          placeholder={`Option ${index + 1}`}
                          className="border-none shadow-none focus-visible:ring-0 bg-transparent"
                        />
                      </FormControl>
                      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveOption(index)}
                          className="icon-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2/>
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default SingleSelectSetting

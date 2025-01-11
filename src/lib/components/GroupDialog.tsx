import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import Select from 'react-select'

export function GroupDialog({
  children,
  name = 'edit',
  data,
}: {
  children: React.ReactNode
  name?: string
  data?: any
}) {
  const [newMembers, setNewMembers] = useState<
    { value: string; label: string }[]
  >(data?.members)
  return (
    <Dialog >
      <DialogTrigger asChild>{children}</DialogTrigger>
      {name === 'edit' && (
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>
              Make changes to your Group here
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                defaultValue={data?.name}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Members
              </Label>
              <Select
                isMulti
                name='emails'
                options={data?.emails}
                value={newMembers}
                onChange={(selected) => {
                  console.log('selected', selected)

                  setNewMembers(selected as { value: string; label: string }[])
                }}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      )}
      {name === 'view' && (
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>View Group</DialogTitle>
            <DialogDescription>View your Group here</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                defaultValue={data?.name}
                className='col-span-3'
                readOnly
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Members
              </Label>
              <Select
                isMulti
                name='emails'
                value={newMembers}
                className='col-span-3'
              />
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

import { Button, TextField, TextArea } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder="Search the docs…" />
      <TextArea placeholder="Description" />
      <Button>Summit New Issue</Button>
    </div>
  )
}

export default NewIssuePage
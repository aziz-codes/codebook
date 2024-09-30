import React from 'react'
import {default as Snippet}  from '@/components/snippets/create-snippet'
import MainWrapper from '@/layouts/main-wrapper'
import { childRoutesClass } from '@/utilities'
const CreateSnippet = () => {
  return (
    <MainWrapper classes={childRoutesClass}>

      <Snippet />
    </MainWrapper>
  )
}

export default CreateSnippet
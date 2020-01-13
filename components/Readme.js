import React from 'react'
import styled from '@xstyled/styled-components'
import Markdown from 'react-markdown'
import remarkEmoji from 'remark-emoji'
import { Card, CardBody } from './Card'
import { Code } from './Code'

const StyledMarkdown = styled(Markdown)`
  color: readme-text;
  line-height: 1.6;

  h1 {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: lighter;
  }

  img {
    max-width: 100%;
  }
`

const InlineCode = styled.code`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 2rpx 4rpx;
  border-radius: base;
  line-height: 1.4;
`

const renderers = {
  code: ({ language, value }) => <Code language={language}>{value}</Code>,
  inlineCode: ({ children }) => <InlineCode>{children}</InlineCode>,
}

const plugins = [remarkEmoji]

export function Readme({ template }) {
  function transformImageUri(uri) {
    if (uri.startsWith(template.repoUrl)) {
      return uri
        .replace('https://github.com', 'https://raw.githubusercontent.com')
        .replace('/blob/', '/')
    }
    if (!uri.startsWith('/') && !uri.startsWith('http')) {
      return `https://raw.githubusercontent.com/${template.repo}/${template.branch}/${uri}`
    }
    return uri
  }
  return (
    <Card>
      <CardBody>
        <StyledMarkdown
          skipHtml
          renderers={renderers}
          transformImageUri={transformImageUri}
          plugins={plugins}
        >
          {template.readmeContent}
        </StyledMarkdown>
      </CardBody>
    </Card>
  )
}

import React from 'react'

import styled from 'styled-components'

const Application = styled.div`
font-family: sans-serif
color: white
`

const Title = styled.h1`
text-align: center
padding: 40px 0
`

export default () => (
		<Application>
				<Title>404 - Page Not Found</Title>
		</Application>
)
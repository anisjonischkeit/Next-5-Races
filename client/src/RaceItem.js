import React from 'react';
import styled from 'styled-components';

const RowContainer = styled.div`
	display: flex
	&:hover {
		background: palevioletred;
		cursor: pointer;
  }
`;

const RowItem = styled.div`
	padding: 10px
	flex: 1
`;

export default ({closingTime, type}) => (
	<RowContainer>
		<RowItem>{type}</RowItem>
		<RowItem>{closingTime}</RowItem>
	</RowContainer>
)
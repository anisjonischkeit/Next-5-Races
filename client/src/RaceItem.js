import React from 'react';
import styled from 'styled-components';

const RowContainer = styled.div`
	display: flex
	&:hover {
		background: #133e3c;
		cursor: pointer;
  }
`;

const RowItem = styled.div`
	padding: 10px
	flex: 1
	border-style: solid
	border-width: 1px
`;

export default ({closingTime, title}) => {
	return (
		<RowContainer>
			<RowItem>{title}</RowItem>
			<RowItem>{closingTime}</RowItem>
		</RowContainer>
	)
}
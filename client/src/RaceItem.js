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

export default ({backgroundColor, closingTime, type}) => {
	const ColoredRowContainer = RowContainer.extend`
		background: ${backgroundColor}
	`
	return (
		<ColoredRowContainer>
			<RowItem>{type}</RowItem>
			<RowItem>{closingTime}</RowItem>
		</ColoredRowContainer>
	)
}
import React from 'react';
import styled from 'styled-components';

const RowContainer = styled.a`
	display: flex
	&:hover {
		background: #133e3c;
		cursor: pointer;
	}
	color: inherit;
	text-decoration : none;
`;

const RowItem = styled.div`
	padding: 10px
	flex: 1
	border-style: solid
	border-width: 1px
`;

export default ({closingTime, title, link}) => {
	return (
		<RowContainer href={link}>
			<RowItem>{title}</RowItem>
			<RowItem>{closingTime}</RowItem>
		</RowContainer>
	)
}
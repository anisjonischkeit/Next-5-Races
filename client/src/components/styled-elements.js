import styled from 'styled-components';

export const Application = styled.div`
  font-family: sans-serif
  color: white
`

export const RacesContainer = styled.div`
  width: 80%;
  padding: 0 10%;
`

export const Title = styled.h1`
  text-align: center
  padding: 40px 0
	`
export const SubTitle = styled.h2`
  text-align: center
  padding-bottom: 30px
`

export const Para = styled.p`
	font-size: 16px
	padding-bottom: 10px
`

export const Table = styled.table`
	width: 100%
`

export const TableData = styled.td`
	border-style: solid
	width: 50%
	padding: 7px 15px
`
export const TableHeading = styled.td`
	border-style: solid
	width: 50%
	padding: 0 15px
`

export const BackButton = styled.a`
	color: inherit;
	text-decoration : none;
  border-bottom: 1px solid transparent;
	&:hover {
		transition: all ease-in-out 0.1s;
		border-color: white;
	}
`
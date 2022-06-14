import styled from 'styled-components';

const Main = styled.div.attrs({
  className: 'bg-white p-4 border-2 border-black'
})`
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0px 0px var(--shadow-color);
`;

export default ({
  Main
});

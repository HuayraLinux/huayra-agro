import styled from 'styled-components';

const Main = styled.div.attrs({
  className: 'grid pt-4'
})`
  grid-template-columns 1fr 1fr;
  grid-template-rows: 1fr;
`;

const Button = styled.button.attrs({
  className: 'cursor-pointer border-2 p-4'
})`
`;

export default ({
  Main,
  Button,
});

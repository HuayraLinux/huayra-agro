import styled from 'styled-components';

const Main = styled.audio.attrs({
  className: 'w-full'
})`
  &:focus {
    outline :none;
  }
`;

export default ({
  Main
});

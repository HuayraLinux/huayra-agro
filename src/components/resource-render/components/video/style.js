import styled from 'styled-components';

const Main = styled.video.attrs({
  className: 'w-full h-full'
})`
  &:focus {
    outline :none;
  }
`;

export default ({
  Main
});

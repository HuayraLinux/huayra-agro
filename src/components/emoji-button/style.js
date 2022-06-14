import styled from 'styled-components'

const Main = styled.span.attrs((props) => ({
  className: `${props.clickeable && 'cursor-pointer'} ${props.disabled && 'cursor-not-allowed'} ${props.animate && `animate-${props.animate}`}`
}))``;

const Img = styled.img.attrs((props) => ({
  className: `${props.disabled && 'opacity-25'}`
}))`
  width: ${props => props.width};
  height: ${props => props.height};
  ${props => props.circle && 'border-radius: 50%;'}
`;

export default ({
  Main,
  Img,
});

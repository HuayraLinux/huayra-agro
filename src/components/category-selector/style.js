import styled from 'styled-components';

const Main = styled.div.attrs((props) => ({
  className: `bg-white border-2 border-black ${props.disabled && 'opacity-80'}`
}))`
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0px 0px var(--shadow-color);
`;

const Select = styled.select.attrs((props) => ({
  className: `h-full w-full p-4 outline-none bg-white ${props.disabled && 'cursor-not-allowed bg-gray-300'}`
}))``;

const OptGroup = styled.optgroup.attrs({
  className: ''
})``;

const Option = styled.option.attrs({
  className: ''
})``;

export default ({
  Main,
  Select,
  OptGroup,
  Option
});

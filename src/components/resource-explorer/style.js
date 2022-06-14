import styled from 'styled-components';

const Main = styled.ul.attrs({
  className: 'bg-white overflow-y-scroll border-2 border-black'
})`
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0px 0px var(--shadow-color);
  & > li:nth-of-type(odd) {
    background: var(--primary-color);
    color: white;
  }
`;

const Item = styled.li.attrs((props) => ({
  className: `p-4 cursor-pointer truncate ${props.selected && 'font-bold underline'}`
}))`
`;

export default ({
  Main,
  Item,
});

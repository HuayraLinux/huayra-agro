import styled from 'styled-components';

const Main = styled.div.attrs({
  className: 'border-2 border-black bg-white p-4 row-span-4 overflow-y-scroll'
})`
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0px 0px var(--shadow-color);
`;

const ResourcePlaceholder = styled.div.attrs({
  className: 'grid h-full'
})`
  grid-template-columns: 100%;
  grid-template-rows: 0.1fr 0.1fr auto;
`;

export default ({
  Main,
  ResourcePlaceholder,
});

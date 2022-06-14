import styled from 'styled-components';

const Main = styled.div.attrs({
  className: 'border-2 border-black bg-white p-4 row-span-4 col-span-2 overflow-y-scroll flex flex-col items-center p-24'
})`
  box-shadow: var(--shadow-offset) var(--shadow-offset) 0px 0px var(--shadow-color);
`;

const ErrorDetails = styled.details.attrs({
  className: 'flex w-full mt-8'
})``;

export default ({
  Main,
  ErrorDetails,
});

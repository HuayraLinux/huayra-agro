import styled from 'styled-components';

export default styled.main.attrs({
  className: 'grid gap-6 p-4'
})`
  grid-template-columns: 0.3fr 0.7fr;
  grid-template-rows: 0.1fr auto 0.1fr 1fr;
  height: 100vh;
`;

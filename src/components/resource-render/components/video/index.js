import Wrapper from './style';

export default ({ file }) => (
  <Wrapper.Main autoPlay controls>
    <source src={file}/>
  </Wrapper.Main>
);

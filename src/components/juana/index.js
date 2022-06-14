import Wrapper from './style';
import * as Juanas from 'assets/juanas';

const sizes = {
  'base': 1,
  '1.5x': 1.5,
  '2x': 2,
};

export default ({ name, width, height, size = 'base', mirror }) => {
  const JuanaSVGSrc = Juanas[name];

  return (
    <Wrapper.Main
      src={JuanaSVGSrc}
      size={sizes[size] || 1}
      width={width}
      height={height}
      mirror={mirror}
    />
  );
};

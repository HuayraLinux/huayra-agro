import Wrapper from './style';
import * as Vacas from 'assets/vacas';

const sizes = {
  'base': 1,
  '1.5x': 1.5,
  '2x': 2,
};

export default ({ name, width, height, size = 'base', mirror }) => {
  const VacaSVGSrc = Vacas[name];

  return (
    <Wrapper.Main
      src={VacaSVGSrc}
      size={sizes[size] || 1}
      width={width}
      height={height}
      mirror={mirror}
    />
  );
};

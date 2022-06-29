import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #e3a77f;
    --secondary-color: #8D8D8D;

    --shadow-offset: 5px;
    --shadow-color: #45af00;
  }

  html {
    background-color: #bbe49e;
    color: var(--text-secondary-color);
  }

  body {
    overflow: hidden;
    user-select: none;
  }
`;


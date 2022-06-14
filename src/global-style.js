import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #822b86;
    --secondary-color: #8D8D8D;

    --shadow-offset: 5px;
    --shadow-color: #f7be4a;
  }

  html {
    background-color: #2DB0B0;
    color: var(--text-secondary-color);
  }

  body {
    overflow: hidden;
    user-select: none;
  }
`;


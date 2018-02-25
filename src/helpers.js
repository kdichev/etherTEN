import { css } from "styled-components";

const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const truncate = width => `
  width: ${width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const boxShadow = () => `
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
  0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

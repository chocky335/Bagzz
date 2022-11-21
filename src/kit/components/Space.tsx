import styled from '@emotion/native';

import {sizes} from '$theme/sizes';

type SizeKey = keyof typeof sizes;
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type SpaceProps = RequireAtLeastOne<Partial<Record<SizeKey, boolean>>> & {
  horizontal?: boolean;
  flexible?: boolean;
};
export const Space = styled.View<SpaceProps>(
  ({theme, flexible, horizontal, ...props}) => {
    const sizeKey = Object.keys(props).find(key => key.startsWith('x'));
    if (!sizeKey) {
      return {};
    }

    if (flexible) {
      return {
        flex: +sizeKey.split('x').join(''),
      };
    }
    const size = theme.size[sizeKey as SizeKey];

    if (horizontal) {
      return {
        height: '100%',
        width: size,
      };
    }

    return {
      height: size,
      width: '100%',
    };
  },
);

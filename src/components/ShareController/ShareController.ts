export interface ShareControllerProps {
	onFileReady?: (file: File) => void;
}

export type ShareController<T> = {
  Component: React.ComponentType<T>;
  props: T;
};

export const createShareController = <T,>(
  Component: React.ComponentType<T>,
  props: T
): ShareController<T> => ({
  Component,
  props,
});

export const SHARE_CONSTANTS = {
  padding: 20,
  appLogo: {
    src: '/recomend_logo.svg',
    width: 300,
    gapFromBottom: 100,
  },
  supportedAspectRatios: [1, 16 / 9],
};
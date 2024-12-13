import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}

export function resetStack(name) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: name}],
  });
}

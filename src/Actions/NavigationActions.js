import { SEND_INITIAL_ROUTE } from './ActionTypes';

export const sendInitialRoute = (routeKey) => ({
  type: SEND_INITIAL_ROUTE,
  payload: routeKey
});

/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const USER_LOGIN = 'realworld/App/USER_LOGIN';
export const LOGIN = 'realworld/App/LOGIN';
export const LOGOUT = 'realworld/App/LOGOUT';
export const ROOT_API = 'https://conduit.productionready.io/api';

import appReducer from './modules/app';
import authReducer from './modules/auth';
import profileReducer from './modules/profile';
import homeReducer from './modules/home';
import aboutReducer from './modules/about';
import employeeReducer from './modules/employee';
import authorReducer from './modules/author';

const rootReducer = {
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  home: homeReducer,
  about: aboutReducer,
  employee: employeeReducer,
  author: authorReducer,
}

export default rootReducer

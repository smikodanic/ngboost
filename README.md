# Ngboost
> Angular boosting libraries

## List of libraries
- [ngboost-auth](https://www.npmjs.com/package/ngboost-auth) - authentication module
- [ngboost-cookies](https://www.npmjs.com/package/ngboost-cookies) - manipulate with browser cookies


## Angular - create NPM library
SUBJECT: How to pack angular code into library which can be published to NPM.

### Prerequisites:
$ sudo npm install -g @angular/cli
- nodejs v15+


### Procedure:
```bash
$ ng new ngboost --no-create-application
$ cd ngboost
$ ng generate library ngboost-auth
```

The projects/ngboost-auth  folder is created. 
In the /src/ folder place the angular library code.
In file projects/ngboost-auth/src/public-api.ts define what will be exported, for example:
```javascript
export { AuthService } from './auth.service';
export { JwtTokenInterceptor } from './jwtTokenInterceptor.service';
export { IsLoggedService } from './routeGuards/isLogged.service';
export { HasRoleService } from './routeGuards/hasRole.service';
export { AutologinService } from './routeGuards/autoLogin.service';
```

Now when all code is ready build it with:
```bash
$ ng build ngboost-auth
```

To publish it do:
```bash
$ cd dist/ngboost-auth
$ npm publish
```

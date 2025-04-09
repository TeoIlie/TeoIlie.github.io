# Personal Website

## Building and deploying

**Angular 19 Deployment Workaround**

Angular 19 insists on building the project to a `broswer` folder, for SSR. My current solution is a workaround script in `package.json`. To build the project to the `docs` folder, run the script using

```
npm run build
```

Then `git push` and `github-pages` will deploy correctly. More info here: https://stackoverflow.com/questions/78544888/angular-18-ng-build-without-browser-folder

---

**Build**

This command will build the application to the `docs` folder:

```

ng build --configuration production

```

**Deploy**

By doing `git push`, GitHub Pages will automatically deploy the application. Deployments can be seen here:
https://github.com/TeoIlie/TeoIlie.github.io/deployments/github-pages

**Resources**

The website is currently available at https://teoilie.github.io

Resource: https://medium.com/swlh/how-to-deploy-an-angular-app-to-github-pages-without-using-any-libraries-step-by-step-guide-cfe96fb0c879

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1, and currently runs version 19.2.5.

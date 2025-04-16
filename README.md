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

First run this command for full lint/formatting

```
npm run format
```

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

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1, and currently runs version 19.2.5. GenAI tools were used sparingly for development (because let's face it right, they're epic 🚀)

**Notes on Gif generation**

1. Create a short 4-5 sec video, 1800x1200 aspect ratio in Final Cut Pro
2. Export > Apple Devices 1080p > H.264 Multi-Pass (Better) -> output is .m4v
3. Upload to http://ezgif.com, max 800 px width, 20/24 FPS, FFmpeg method, optionally optimize for static background

**Notes on Cloudflare setup**

The Node version on Cloudflare Pages is explicitly set with an environment variable to `NODE_VERSION: 22.0.0` - update this as necessary

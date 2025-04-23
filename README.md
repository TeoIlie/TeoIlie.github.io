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

**Notes**
**Gif generation**

1. Create a short 4-5 sec video, 1800x1200 aspect ratio in Final Cut Pro
2. Export > Apple Devices 1080p > H.264 Multi-Pass (Better) -> output is .m4v
3. Upload to http://ezgif.com, max 800 px width, 20/24 FPS, FFmpeg method, optionally optimize for static background

**Cloudflare setup**

The Node version on Cloudflare Pages is explicitly set with an environment variable to `NODE_VERSION: 22.0.0` - update this as necessary

**Fonts, Icons**

1. To add fonts in future, preconnect, then preload, then only use the specific required weights, see `index.html`
2. In future, if using additional Angular Material icons, add them specifically to `app.module.ts`, then refence similar to `<mat-icon svgIcon="menu"></mat-icon>`

**WebM, WebP images and videos**

1. Images are automatically converted to `.webp` using the script `npm run comp`. They are served in a `<picture>` tag, with `.jpg` fallback.
2. Videos are manually converted to `.webm` using **Handbrake**, with custom preset **Web-WebM**. They are served in a `<video>` tag, with `.mp4` fallback also generated in **Handbrake** using **Web-MP4** custom preset.

**Local performance testing**

To test performance locally without deployment, more accurately than using `ng serve` and testing on `localhost:4000`, first build the app with `npm run build`, and then serve it with `npx http-server docs -p 8080`, then test Lighthouse on it there at `http://127.0.0.1:8080`

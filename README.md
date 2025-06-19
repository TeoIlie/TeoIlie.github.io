# Personal Website

## Building and deploying

**Build**

1. First run this command for full code lint/formatting

```
npm run format
```

2. Then run this command if any new images need to be compressed to `.webp` format:

```
npm run comp
```

3. Finally, this command will build the application to the `docs` folder:

```
npm run build
```

All these custom `npm` scripts can be found in `package.json` under `"scripts"`.

**Deploy**

By doing `git push`, Cloudflare Pages will automatically deploy the application. Deployments can be seen here:
https://dash.cloudflare.com


## Resources

The website is currently available at https://teoilie.github.io

Resource: https://medium.com/swlh/how-to-deploy-an-angular-app-to-github-pages-without-using-any-libraries-step-by-step-guide-cfe96fb0c879

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1, and currently runs version 19.2.5. GenAI tools were used sparingly for development (because let's face it right, they're epic 🚀)


## Notes

**Angular 19 Deployment Workaround**

Angular 19 insists on building the project to a `browser` folder, for SSR. My current solution is a workaround script in `package.json`. To build the project to the `docs` folder, run the script using

```
npm run build
```

Then `git push` and Cloudflare Pages will deploy correctly. More info here: https://stackoverflow.com/questions/78544888/angular-18-ng-build-without-browser-folder

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
3. Ideal image resolution for the web is 72 px/inch, but can be resized slightly compared the bounding box to look better
  * To resize images, open them with **Preview**, and go to **Tools > Adjust Size... >** and set width, height, and resolution to match the requirements
  * For example, for Technic card photos, set dimension to 712 x 400, and resolution to 762 pixels/inch, then copy them to `src/assets/images`
4. Excellent guide for serving responsive images - https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images

**Local performance testing**

To test performance locally without deployment, more accurately than using `ng serve` and testing on `localhost:4000`, first build the app with `npm run build`, and then serve it with `npx http-server docs -p 8080`, then test Lighthouse on it there at `http://127.0.0.1:8080`

**Automatically create a `sitemap.xml`

To create a sitemap, run
```
npx sitemap-generator-cli https://teoilie.com --output ./src/sitemap.xml
```

**Updating dependencies automatically**

1. `npm install -g npm-check-updates`, if the tool isn't yet installed
2. `ncu` gather info about the update
3. `ncu -u` applies the changes
4. To reinstall from scratch, `rm -rf node_modules package-lock.json` to clear the dependencies, and then `npm install` to re-install



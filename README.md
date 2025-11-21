# Photoshop plugin starter template (Vue 3)

## Directories
* `src` - source code with the main.js file + Vue files
* `uxp` - UXP manifest file and icons here
* `devtools` - for now it's only Pinia plugins that add ability to control `index.html` and plugin that works as a server for "hot-reload" feature

## How to start
1. `yarn` - install all packages
2. `yarn dev` - launch build + watch ("hot reload" supported) 
3. Add `manifest.json` from the `dist` folder to Adobe UXP Developer Tool (Add Plugin -> Select manifest.json)
4. Open Photoshop
5. Load plugin (from Adobe UXP Developer Tool)
6. Write your plugin code

## Hot reload Vite plugin
When you will change and save something in Vite controlled directiores (and `yarn dev` launched and running) you will get a "hot-reload" (`location.reload()` call) each time

Check these files:
* `devtools/vite-plugins/uxp-hot-reload.ts` - server
* `src/useUxpHotReload.ts` - client 

## Before the release
1. Check dependencies (maybe you can reduce their count)
2. Put your `id` of the plugin into `manifest.json` (uxp/manifest.json)
3. Change icons (uxp/icons)
4. `yarn build`
# Photoshop plugin starter template (Vue 3)

## Directories
* ```src``` - source code with the main.js file + Vue files
* ```layout``` - ```plugin.html``` lives here
* ```uxp``` - UXP manifest file and icons here

## How to start
1. ```yarn``` - install all packages
2. ```yarn build``` - build 
3. Add ```manifest.json``` from the ```dist``` folder to Adobe UXP Developer Tool (Add Plugin -> Select manifest.json)
4. Open Photoshop
5. Load plugin (from Adobe UXP Developer Tool)
6. Write your plugin code

## Before the release
1. Check dependencies (maybe you can reduce their count)
2. Put your ```id``` of the plugin into ```manifest.json``` (uxp/manifest.json)
3. Change icons (uxp/icons)

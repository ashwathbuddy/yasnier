# Angular Features-Login, run for installing dependencies

1- ``npm install``

## Run the app using

``ng serve``

## For testing (spec) run

``ng test``

## Styles

added path src/styles to stylePreprocessorOption to simplify (make absolute) imports from anywere in the project

"stylePreprocessorOptions": {
  "includePaths": [
    "src/style-paths"
  ]
}


// src/app/app.component.scss
@import '../styles/variables';

// But now this works as well
@import 'variables';


## TODO optimize styles&scripts

https://angular.io/guide/workspace-config#styles-and-scripts-configuration


## used theme builder
https://m3.material.io/theme-builder#/custom

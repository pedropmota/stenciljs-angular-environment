const sass = require('@stencil/sass');

exports.config = {
  bundles: [ //Our custom components will be defined here. Check Stencil Bundles for advanced details.
    { components: ['datalist-selector'] }
  ],
  srcDir: 'src/stencil-components', //The source of our Stencil code
  collections: [
  ],
  plugins: [
    sass() //If you're not insterested in adding Sass support, remove it from here and from the "require" above.
  ],
  namespace: "MyCustomElements", //Namespace for the custom elements. Default value is "App".
  outputTargets: [
    {
      type: 'www', //The output directory of the compiled custom elements. We'll load those as resources into our Angular app. 
      dir: 'src/assets',
      buildDir: 'stencil-build',
    }
  ]
};
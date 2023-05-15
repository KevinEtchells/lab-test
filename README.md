# lab-test
Light A-B Testing


## Introduction

A light, cookieless, A/B testing framework. It currently works with Plausible Analytics and custom-built data-capture solutions.


## Getting started

```
// Create a test, defaults to using Plausible
const myTest = new Lab('testName');

// Add first variant
myTest.addVariant();

// Add another variant
myTest.addVariant({
    container: '#container-id', // otherwise 'body' will be used
    html: '<p>Optional HTML</p>',
    css: '/* optional CSS */',
    javascript: (report) => {
        // to capture user interactions etc.
        document.querySelector('#container-id button').addEventListener('click', () => {
            report('button-click');
        });
    }
});

// A third variant may be added if required

// Start the test
myTest.start();
```

## Custom data-capture solutions
```
// create a test, passing in the custom function name
const myTest = new Lab('testName', 'https://my-custom-function');

// When report() is called, it will add the following querystring paramaters to the function call:
/*
test=[testName]
variant=[variant]
property=[propertyPassedInFromReportFunction] (plus any auto-generated properties)
*/

// an example function is included in examples/firebase-data-collection.js

// the rest of the code is as per the "Getting started" section
```
# lab-test
Light A-B Testing


## Introduction

A light, cookieless, A/B testing framework. It currently works with Plausible Analytics for capturing data, but alternatives are being added soon.


## Get started

```
// Create a test
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
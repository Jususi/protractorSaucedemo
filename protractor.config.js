exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/spec-saucedemo.js'],
    framework: 'jasmine',
    //directConnect: true
};
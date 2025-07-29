// Karma configuration file, see link for more information
// https://karma-runner.github.io/latest/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-junit-reporter'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add jasmine-specific options here
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    // Configuration des reporters pour SonarQube
    reporters: ['progress', 'kjhtml', 'junit', 'coverage'],

    // Configuration spécifique au reporter JUnit
    junitReporter: {
      outputDir: require('path').join(__dirname, './junit/'),
      outputFile: 'TESTS-karma.xml',
      useBrowserName: false,
      // suite: '' // Nom de la suite de tests (optionnel)
    },

    // Configuration spécifique au reporter de couverture de code
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' },
        { type: 'text-summary' }
      ],
      fixWebpackSourcePaths: true,
      // exclude: [
      //   'src/main.ts',
      //   'src/polyfills.ts'
      // ]
    },

    // Configuration des navigateurs
    browsers: ['ChromeHeadlessCustom'],
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-web-security',
          '--remote-debugging-port=9222'
        ]
      }
    },

    restartOnFileChange: true,

    logLevel: config.LOG_INFO,

    port: 9876,

    colors: true,

    autoWatch: true,

    concurrency: Infinity
  });
};

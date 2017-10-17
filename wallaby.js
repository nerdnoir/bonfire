module.exports = function (wallaby) {
  return {
    files: [
      'app/**/*.js'
    ],
    
    tests: [ 'test/app/**/*\.specs.js'],
    
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    
    env: {
      type: 'node',
      runner: 'node'
    },
  
    setup: function () {
      global.wallaby = wallaby
    },
    
    testFramework: 'mocha',
    
    debug: true
  }
}
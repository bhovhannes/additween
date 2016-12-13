'use strict'

// require all modules ending in ".spec.js", ".spec.ts", ".spec.jsx", ".spec.tsx" from the
// current directory and all subdirectories
var testsContext = require.context('./browser-tests', true, /\.spec\.[tj]sx?$/)
testsContext.keys().forEach(testsContext)

const { createBundleRenderer } = require('vue-server-renderer');

module.exports = (bundle) => createBundleRenderer(bundle);

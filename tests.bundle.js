var context = require.context('./lib/components/', true, /.+\.tsx?$/);
context.keys().forEach(context);
module.exports = context;

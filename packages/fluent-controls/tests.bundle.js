var context = require.context('./src/components/', true, /.+\.tsx?$/);
context.keys().forEach(context);
module.exports = context;

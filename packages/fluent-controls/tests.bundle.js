var context = require.context('./src/components/', true, /.+\.tsx?$/);
context.keys().forEach(context);
module.exports = context;

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');

Enzyme.configure({adapter: new Adapter()});

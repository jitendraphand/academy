const hair = require('./hair');
const skin = require('./skin');
const chemical = require('./chemical');

const courses = [hair, skin, chemical];
const courseMap = Object.fromEntries(courses.map(c => [c.id, c]));

function getCourse(id) { return courseMap[id] || null; }

module.exports = { courses, courseMap, getCourse };

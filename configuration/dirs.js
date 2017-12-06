/**
 * Created by krusheth on 3/13/17.
 */
const path = require('path');

const PKG_ROOT = path.join(__dirname + '/../app');
const BUILD_ROOT = __dirname + '/../build';
const SRC_ROOT = PKG_ROOT;
const DIST_DIR = path.join(BUILD_ROOT, 'www');
const PUBLIC_DIR = path.join(DIST_DIR, 'public');

module.exports = {
    PKG_ROOT: PKG_ROOT,
    BUILD_ROOT: BUILD_ROOT,
    SRC_ROOT: SRC_ROOT,
    DIST_DIR: DIST_DIR,
    PUBLIC_DIR: PUBLIC_DIR,
};
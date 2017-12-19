/**
 * Created by krusheth on 3/13/17.
 */
const path = require('path');

const PKG_ROOT = path.join(__dirname + '/../app');
const BUILD_ROOT = path.join(__dirname + '/../dist');
const SRC_ROOT = PKG_ROOT;
const DIST_DIR = path.join(BUILD_ROOT, 'public');

module.exports = {
    PKG_ROOT: PKG_ROOT,
    BUILD_ROOT: BUILD_ROOT,
    SRC_ROOT: SRC_ROOT,
    DIST_DIR: DIST_DIR
};
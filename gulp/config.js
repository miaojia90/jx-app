import path from 'path';
import yargs from 'yargs';

const root = path.dirname(__dirname);
const argv = yargs.argv;
const src = `${root}/src`;
const dest = `${root}/dist`;
const pro = `${root}/pro`;
//参数配置
let paths = !!argv.pro ? pro : dest;
module.exports = {
    is: {
        dev: argv.dev,
        pro: argv.pro
    },
    src: src,
    dest: dest,
    wxml: {
        src: src + '/**/*.wxml',
        dest:paths
    },
    scss: {
        src: src + '/**/*.scss',
        dest: paths
    },
    img: {
        src: src + '/**/*.{jpg,jpeg,gif,png}',
        dest: paths 
    },
    js: {
        src: src + '/**/*.js',
        dest: paths
    },
    json: {
        src: src + '/**/*.json',
        dest: paths
    },
    staticpath:{
        resProxy:"https://wx.jinfuzi.com/images/",
        prefix:"https://wx.jinfuzi.com/images"
    }
};
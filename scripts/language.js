import { readFileSync, readdirSync, lstatSync, writeFileSync } from 'fs';
import { resolve, extname } from 'path';

const root = './src'
const cfg_path = './src/plugins/language_config.json';
const includes = ['.vue', '.js', '.html'];
const excludes = ['DS_Store'];

const targets = [];
const search_all_target = (file_path) => {
  const data = readFileSync(file_path, 'utf-8');
  const result = data.match(/\$lang\(['"]([^'"]*)['"]\)/g);
  if (!Array.isArray(result)) return;
  result.forEach((str) => {
    targets.push(str.slice(7, -2));
  });
};

const read_file_list = (dir) => {
  const list = readdirSync(dir);
  list.forEach((name) => {
    const file_path = `${dir}/${name}`;
    const stats = lstatSync(file_path);
    if (stats.isFile()) {
      const format = extname(file_path).toLowerCase();
      if (excludes.includes(format) || !includes.includes(format)) return;
      search_all_target(file_path);
    } else if (stats.isDirectory()) {
      read_file_list(file_path);
    } else {
      console.error(file_path);
    }
  });
};

const update_config = () => {
  const old_config = JSON.parse(readFileSync(cfg_path, 'utf-8'));
  const new_config = {};
  targets.forEach((key) => {
    new_config[key] = old_config[key] || {
      chinese: '',
      english: '',
      cantonese: '',
    };
  });
  writeFileSync(cfg_path, JSON.stringify(new_config, null, 2));
};

read_file_list(root);
update_config();
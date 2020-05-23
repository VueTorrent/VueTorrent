/* eslint-disable no-unused-vars */
export function formatBytes(a, b) {
  if (a == 0) return "0 Bytes";
  const c = 1024;
  const d = b || 2;
  const e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const f = Math.floor(Math.log(a) / Math.log(c));
  return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`;
}

export function getIconForFileType(type) {
  let types = {
    html: "mdi-language-html5",
    js: "mdi-nodejs",
    json: "mdi-json",
    md: "mdi-markdown",
    pdf: "mdi-file-pdf",
    png: "mdi-file-image",
    txt: "mdi-file-document-outline",
    sub: "mdi-file-document-outline",
    idx: "mdi-file-document-outline",
    xls: "mdi-file-excel",
    avi: "movie",
    mp4: "movie",
    mkv: "movie",
  };

  if (!types[type]) return "insert_drive_file";

  return types[type];
}

export function treeify(paths) {
  let result = [];
  let level = { result };

  paths.forEach((path) => {
    path.name.split("/").reduce((r, name, i, a) => {
      if (!r[name]) {
        r[name] = { result: [] };
        r.result.push(createFile(path, name, r[name].result));
      }

      return r[name];
    }, level);
  });

  //parse folders
  result = result.map((el) => parseFolder(el));

  function parseFolder(el) {
    if (el.children.length !== 0) {
      let folder = createFolder(el.name, el.children);
      folder.children = folder.children.map((el) => parseFolder(el));
      return folder;
    }
    return el;
  }

  return result;
}

function createFile(data, name, children) {
  return {
    name: name,
    progress: Math.round(data.progress * 100),
    size: formatBytes(data.size),
    icon: getIconForFileType(name.split(".").pop()),
    children: children,
  };
}

function createFolder(name, children) {
  return {
    name: name,
    type: "directory",
    children: children,
  };
}

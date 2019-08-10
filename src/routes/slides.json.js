import Gootenberg from "gootenberg";
import * as sander from "sander";

const { DRIVE_FOLDER } = process.env;
const FOLDER = "static/party";
const ROOT = "/party";

export async function get(req, res) {
  const goot = new Gootenberg();

  // authenticate
  await goot.auth.jwt();

  // get our data
  try {
    const files = await goot.drive.ls(DRIVE_FOLDER);

    const urls = files.map(
      ({ id }) => `https://drive.google.com/uc?export=view&id=${id}`
    );

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(urls));
  } catch (err) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(err));
  }
}

export async function _get(req, res) {
  const files = await sander
    .readdir(FOLDER)
    .then(files => files.map(filename => `${ROOT}/${filename}`));

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(files));
}

import child_process from "child_process";
import fs from "fs";
import fse from 'fs-extra';
import path from "path";

(async () => {
	fs.mkdirSync(path.join(__dirname, "../../", "public"), { recursive: true });
	fse.copySync(path.join(__dirname, "../../", "pages/public"), path.join(__dirname, "../../", "public"))
	child_process.execSync("tsc", { cwd: path.join(__dirname, "../../", "pages/ts") });
	fse.copySync(path.join(__dirname, "../../", "pages/ts/dist"), path.join(__dirname, "../../", "public/js"))
})().then(() => process.exit(0));

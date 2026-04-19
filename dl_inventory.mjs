import fs from "fs";
import https from "https";
import http from "http";
import { URL } from "url";

function download(urlStr, dest) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(urlStr);
        const lib = parsedUrl.protocol === "https:" ? https : http;
        const file = fs.createWriteStream(dest);
        lib.get(urlStr, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.close();
                fs.unlinkSync(dest);
                download(res.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            res.pipe(file);
            file.on("finish", () => file.close(resolve));
            file.on("error", reject);
        }).on("error", (err) => {
            try { fs.unlinkSync(dest); } catch {}
            reject(err.message);
        });
    });
}

const urls = JSON.parse(fs.readFileSync("inventory_urls.json", "utf8"));

console.log("Downloading HTML...");
await download(urls.html, "tmp_assets/manage_inventory.html");
const htmlSize = fs.statSync("tmp_assets/manage_inventory.html").size;
console.log(`  HTML saved: ${htmlSize} bytes`);

console.log("Downloading PNG...");
await download(urls.image, "tmp_assets/manage_inventory.png");
const pngSize = fs.statSync("tmp_assets/manage_inventory.png").size;
console.log(`  PNG saved: ${pngSize} bytes`);

console.log("Done.");

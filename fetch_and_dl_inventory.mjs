import { stitch } from "@google/stitch-sdk";
import fs from "fs";
import https from "https";
import http from "http";
import { URL } from "url";

process.env.STITCH_API_KEY = process.env.STITCH_API_KEY || "";

function download(urlStr, dest) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(urlStr);
        const lib = parsedUrl.protocol === "https:" ? https : http;
        const file = fs.createWriteStream(dest);
        const req = lib.get(urlStr, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.destroy();
                fs.unlinkSync(dest);
                download(res.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                file.destroy();
                reject(new Error(`HTTP ${res.statusCode} for ${urlStr}`));
                return;
            }
            res.pipe(file);
            file.on("finish", () => file.close(resolve));
        });
        req.on("error", (err) => {
            try { fs.unlinkSync(dest); } catch {}
            reject(err.message);
        });
    });
}

async function main() {
    try {
        console.log("Fetching fresh URLs from Stitch...");
        const project = stitch.project("6759477244955323139");
        const screen = await project.getScreen("e0fdbd7f46434292b0304aca55acf680");

        const htmlUrl = await screen.getHtml();
        const imageUrl = await screen.getImage();

        // Save fresh URLs
        fs.writeFileSync("inventory_urls.json", JSON.stringify({ html: htmlUrl, image: imageUrl }, null, 2));
        console.log("Fresh URLs saved to inventory_urls.json");

        // Download immediately
        console.log("Downloading PNG...");
        await download(imageUrl, "tmp_assets/manage_inventory.png");
        const pngSize = fs.statSync("tmp_assets/manage_inventory.png").size;
        console.log(`  PNG saved: ${pngSize} bytes`);

        console.log("Downloading HTML...");
        await download(htmlUrl, "tmp_assets/manage_inventory.html");
        const htmlSize = fs.statSync("tmp_assets/manage_inventory.html").size;
        console.log(`  HTML saved: ${htmlSize} bytes`);

        console.log("All done!");
    } catch (e) {
        console.error("Error:", e.message || e);
    }
}

main();

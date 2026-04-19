import fs from "fs";
import https from "https";

const urls = JSON.parse(fs.readFileSync("landing_urls.json", "utf8"));

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest);
            reject(err.message);
        });
    });
}

async function main() {
    console.log("Downloading HTML...");
    await download(urls.html, "landing.html");
    console.log("Downloading PNG...");
    await download(urls.image, "landing.png");
    console.log("Done.");
}
main();

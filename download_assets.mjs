import fs from "fs";
import https from "https";

const urls = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                download(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
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
    const name = process.argv[3];
    console.log(`Downloading HTML for ${name}...`);
    await download(urls.html, `tmp_assets/${name}.html`);
    console.log(`Downloading PNG for ${name}...`);
    await download(urls.image, `tmp_assets/${name}.png`);
    console.log("Done.");
}
main();

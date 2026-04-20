import { stitch } from "@google/stitch-sdk";
import fs from "fs";

process.env.STITCH_API_KEY = process.env.STITCH_API_KEY || "";

async function main() {
    try {
        const project = stitch.project("6759477244955323139");
        console.log("Fetching screen...");
        const screen = await project.getScreen("c7f6754c45d247ac9765012862132c37");
        
        console.log("Getting URLs...");
        const htmlUrl = await screen.getHtml();
        const imageUrl = await screen.getImage();
        
        console.log("HTML URL:", htmlUrl);
        console.log("Image URL:", imageUrl);
        
        fs.writeFileSync("admin_urls.json", JSON.stringify({html: htmlUrl, image: imageUrl}, null, 2));
    } catch(e) {
        console.error("Error:", e);
    }
}
main();

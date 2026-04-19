import { stitch } from "@google/stitch-sdk";
import fs from "fs";

process.env.STITCH_API_KEY = process.env.STITCH_API_KEY || "";

async function main() {
    try {
        const project = stitch.project("6759477244955323139");
        console.log("Fetching Manage Inventory screen...");
        const screen = await project.getScreen("e0fdbd7f46434292b0304aca55acf680");
        
        console.log("Getting URLs...");
        const htmlUrl = await screen.getHtml();
        const imageUrl = await screen.getImage();
        
        console.log("HTML URL:", htmlUrl);
        console.log("Image URL:", imageUrl);
        
        fs.writeFileSync("inventory_urls.json", JSON.stringify({html: htmlUrl, image: imageUrl}, null, 2));
        console.log("Saved to inventory_urls.json");
    } catch(e) {
        console.error("Error:", e);
    }
}
main();

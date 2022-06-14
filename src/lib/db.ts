import { container } from "@sapphire/framework";
import { QuickDB } from "quick.db";
const db = new QuickDB();
container.db = db;
declare module "@sapphire/pieces" {
    interface Container {
        db: any
    }
}
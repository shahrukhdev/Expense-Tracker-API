import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// ─── Fix __dirname for ES Modules ─────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getEmailTemplate = (templateName: string, variables: Record<string, string>) => {
    const filePath = path.join(__dirname, 'templates', `${templateName}.html`);
    let template = fs.readFileSync(filePath, 'utf-8');

    // Replace placeholders with actual values
    Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, variables[key]);
    });

    return template;
};
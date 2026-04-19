import { JwtUserPayload } from "./jwt.js";

declare global {
    namespace Express {
        interface Request {
            user?: JwtUserPayload;
        }
    }
}
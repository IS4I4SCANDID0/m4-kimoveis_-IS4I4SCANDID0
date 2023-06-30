import { z } from "zod";
import { sessionLoginSchema } from "../schemas/session.schema";

type TSessionLoginCreate = z.infer<typeof sessionLoginSchema>;
type TSessionLoginReturn = { token: string };

export { TSessionLoginCreate, TSessionLoginReturn }
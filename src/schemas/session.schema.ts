import { userSchema } from "./user.schema";

const sessionLoginSchema = userSchema.pick({ email: true, password: true });

export { sessionLoginSchema };
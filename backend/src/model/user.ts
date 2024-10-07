import { z } from "zod"

const userModel = z.object({
    email    : z.string().email(),
})


export default userModel;
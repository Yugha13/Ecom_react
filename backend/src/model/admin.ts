import { z } from "zod"

const adminModel = z.object({
    email    : z.string().email(),
    password : z.string().min(4)
})


export default adminModel;
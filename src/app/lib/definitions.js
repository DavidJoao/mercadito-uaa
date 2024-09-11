import { z } from "zod";

export const SignupFormSchema = z.object({
    name: z.string()
            .min(2, { message: "El nombre debe contener mínimo 2 caracteres." })
            .trim(),
    email: z.string()
            .email({ message: "Por favor ingrese un correo electrónico válido." })
            .trim(),
    password: z.string()
                .min(8, { message: "La contraseña debe contener mínimo 7 caracteres." })
                .regex(/[0-9]/, { message: 'La contraseña debe contener mínimo un número.' })
                .trim()

})
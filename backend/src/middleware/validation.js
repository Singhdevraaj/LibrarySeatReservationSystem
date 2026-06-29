const { z } = require('zod');

function validateSignupInput(req, res, next) {
    const userSchema = z.object({
        name: z.string().min(2, "Username must be at least 3 characters").max(50),
        email: z.string().email("Invalid email format"),
        password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .max(100, "Password cannot exceed 100 characters")
            // Enforce at least one uppercase letter
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            // Enforce at least one lowercase letter
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            // Enforce at least one number
            .regex(/[0-9]/, "Password must contain at least one number")
            // Enforce at least one special character
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
        role: z.string().toLowerCase().default("student")

    })

    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            "message": "hi from validateSignupInput",
            errors: result.error.flatten().fieldErrors
        });
    }

    req.body = result.data;

    next();

}





function validateLoginInputs(req, res, next) {
    const userSchema = z.object({
        email: z.coerce.string().email("Invalid email format"),
        password: z.coerce.string()
            .min(8, "Password must be at least 8 characters long")
            .max(100, "Password cannot exceed 100 characters")
            // Enforce at least one uppercase letter
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            // Enforce at least one lowercase letter
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            // Enforce at least one number
            .regex(/[0-9]/, "Password must contain at least one number")
            // Enforce at least one special character
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

    })

    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            "message": "hi from validateLoginInputs",
            errors: result.error.flatten().fieldErrors
        });
    }

    req.body = result.data;

    next();

}


function validateSeatInput(req, res, next) {
    const seatSchema = z.object({
        seatNumber: z.coerce.number().min(1, "Enter the seat number 1 to 100").max(100),
        floor: z.coerce.number().min(1, "Enter the floor number 1 to 5").max(5)

    })

    const result = seatSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            "success": false,
            "message": "hi from validateSeatInput",
            error: result.error.flatten().fieldErrors
        });
    }

    req.body = result.data;

    next();

}

module.exports = { validateSignupInput, validateLoginInputs, validateSeatInput };
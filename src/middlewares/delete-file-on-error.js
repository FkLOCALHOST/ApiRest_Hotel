import fs from "fs/promises";
import { join } from "path";

export const deleteFileOnError = async (err, req, res, next) => {
    // Eliminar un solo archivo (por compatibilidad)
    if (req.file && req.filePath) {
        const filePath = join(req.filePath, req.file.filename);
        try {
            await fs.unlink(filePath);
        } catch (unlinkErr) {
            console.log(`Error deleting file: ${unlinkErr}`);
        }
    }
    // Eliminar múltiples archivos
    if (req.files && Array.isArray(req.files) && req.filePath) {
        for (const file of req.files) {
            const filePath = join(req.filePath, file.filename);
            try {
                await fs.unlink(filePath);
            } catch (unlinkErr) {
                console.log(`Error deleting file: ${unlinkErr}`);
            }
        }
    }
    next(err);
}
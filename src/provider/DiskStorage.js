const fs = require('fs')
const path = require("path")
const uploadsConfigs = require('../configs/upload')
const AppError = require('../utils/AppError')

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uploadsConfigs.TMP_FOLDER, file),
            path.resolve(uploadsConfigs.UPLOAD_FOLDER, file)
        )

        return file
    }


    async deleteFile(file) {
        const filePath = path.resolve(uploadsConfigs.UPLOAD_FOLDER, file)

        try {
            await fs.promises.stat(filePath)

        } catch {
            throw new AppError("Não foi possivel deletar o arquivo");
        }

        await fs.promises.unlink(filePath)

    }
}


module.exports = DiskStorage
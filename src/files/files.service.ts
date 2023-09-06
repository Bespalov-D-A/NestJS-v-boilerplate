import { HttpException, HttpStatus, Injectable, Post, UseInterceptors } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class FilesService {
    async createFile(file: any): Promise<string> {
        try {
            const fileExtension = path.extname(file.originalname); // Получаем расширение файла
            const fileName = uuidv4() + fileExtension; // Комбинируем случайное имя и расширение
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch(e) {
            console.log(e)
            throw new HttpException('Error for write the file', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { PdfService } from './pdf.service';
import * as fs from 'fs';
import { Response } from 'express';

// Ensure the uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

@Controller('upload')
export class UploadController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadDir,
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(new Error('Only PDF files are allowed'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      // Convert PDF to XML
      const xmlFilename = await this.pdfService.convertPdfToXml(file.filename);
      const xmlFileUrl = `http://localhost:3001/upload/xml/${xmlFilename}`;

      return {
        message: 'File uploaded and converted successfully',
        xmlFile: xmlFileUrl, // ✅ Returns full URL for frontend
      };
    } catch (error) {
      return { message: 'Conversion failed', error: error.message };
    }
  }

  @Get('/xml/:filename')
  async getXmlFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = join(uploadDir, filename);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
      }
      
      res.sendFile(filePath, { root: '.' });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving file', error: error.message });
    }
  }
}

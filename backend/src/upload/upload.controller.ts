import { 
  Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { PdfService } from './pdf.service';
import * as fs from 'fs';
import { Response } from 'express';

// Ensure the "uploads" directory exists
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
          // Remove spaces and keep original filename
          const sanitizedFileName = file.originalname.replace(/\s+/g, '_');
          callback(null, sanitizedFileName);
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
      // Extract the base filename (without extension)
      const baseFileName = file.originalname.replace(/\.[^/.]+$/, ""); 
      const xmlFilename = `${baseFileName}.xml`; // Keep same name with .xml extension
      const xmlFilePath = join(uploadDir, xmlFilename);

      // Convert PDF to XML
      await this.pdfService.convertPdfToXml(file.path, xmlFilePath);

      return {
        message: 'File uploaded and converted successfully',
        pdfFile: `http://localhost:3001/upload/pdf/${file.filename}`, // ✅ URL of uploaded PDF
        xmlFile: `http://localhost:3001/upload/xml/${xmlFilename}`, // ✅ URL of converted XML
        fileName: file.filename, // ✅ Original file name
      };
    } catch (error) {
      return { message: 'Conversion failed', error: error.message };
    }
  }

  @Get('/pdf/:filename')
  async getPdfFile(@Param('filename') filename: string, @Res() res: Response) {
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

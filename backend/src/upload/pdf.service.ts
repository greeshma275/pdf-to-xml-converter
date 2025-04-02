import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as convert from 'xml-js';

@Injectable()
export class PdfService {
  async convertPdfToXml(filename: string): Promise<string> {
    try {
      // Ensure the uploaded file is a PDF
      if (!filename.toLowerCase().endsWith('.pdf')) {
        throw new BadRequestException('Invalid file format. Only PDF files are allowed.');
      }

      // Define paths
      const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
      const filePath = path.join(uploadsDir, filename);
      const xmlFilename = filename.replace(/\.pdf$/i, '.xml'); // Replace .pdf with .xml
      const xmlPath = path.join(uploadsDir, xmlFilename); // ✅ Correctly derived here

      // Check if PDF file exists
      if (!(await fs.pathExists(filePath))) {
        throw new BadRequestException(`File not found: ${filename}`);
      }

      // Read and parse PDF
      const dataBuffer = await fs.readFile(filePath);
      const pdfData = await pdfParse(dataBuffer);
      const extractedText = pdfData.text.trim(); // Trim unnecessary spaces

      // Convert extracted text to XML format
      const xmlObject = {
        declaration: { attributes: { version: '1.0', encoding: 'UTF-8' } },
        elements: [
          {
            type: 'element',
            name: 'document',
            elements: extractedText
              .split('\n')
              .filter(line => line.trim() !== '') // Remove empty lines
              .map(line => ({
                type: 'element',
                name: 'paragraph',
                elements: [{ type: 'text', text: line.trim() }],
              })),
          },
        ],
      };

      const xmlString = convert.js2xml(xmlObject, { compact: false, spaces: 4 });

      // Save XML file
      await fs.writeFile(xmlPath, xmlString);

      return xmlFilename; // Return the generated XML filename
    } catch (error) {
      throw new InternalServerErrorException(`Error converting PDF to XML: ${error.message}`);
    }
  }
}

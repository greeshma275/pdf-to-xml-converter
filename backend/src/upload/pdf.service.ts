import { Injectable } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as convert from 'xml-js';

@Injectable()
export class PdfService {
  async convertPdfToXml(filename: string): Promise<string> {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    
    // Read PDF file
    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);

    // Extracted text from PDF
    const extractedText = pdfData.text;

    // Convert text to XML structure
    const xmlObject = {
      declaration: { attributes: { version: '1.0', encoding: 'UTF-8' } },
      elements: [
        {
          type: 'element',
          name: 'document',
          elements: extractedText.split('\n').map(line => ({
            type: 'element',
            name: 'paragraph',
            elements: [{ type: 'text', text: line.trim() }],
          })),
        },
      ],
    };

    const xmlString = convert.js2xml(xmlObject, { compact: false, spaces: 4 });

    // Save XML to file
    const xmlFilename = filename.replace('.pdf', '.xml');
    const xmlPath = path.join(__dirname, '..', '..', 'uploads', xmlFilename);
    await fs.writeFile(xmlPath, xmlString);

    return xmlFilename;
  }
}

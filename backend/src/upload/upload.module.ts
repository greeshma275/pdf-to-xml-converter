import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { PdfService } from './pdf.service';

@Module({
  controllers: [UploadController],
  providers: [PdfService],
  exports: [PdfService],  // ✅ Export service if needed
})
export class UploadModule {}

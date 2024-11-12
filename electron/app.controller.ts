import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from "@nestjs/common";
import { AppService } from "./app.service";
import * as fs from "fs/promises"; // Importación correcta de fs/promises
import { format, getISOWeek, startOfWeek } from "date-fns";

import {
  CharacterSet,
  PrinterTypes,
  ThermalPrinter,
} from "node-thermal-printer";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private async ensureReportsFolderExists(folderPath: string) {
    try {
      await fs.access(folderPath); // Verifica si la carpeta existe
    } catch (error) {
      await fs.mkdir(folderPath, { recursive: true }); // Crea la carpeta si no existe
    }
  }

  private async getWeekFolderName() {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekNumber = getISOWeek(today);
    const formattedDate = format(weekStart, "yyyy-MM-dd"); // Formato para nombre de carpeta
    return `Week-${weekNumber}_${formattedDate}`;
  }

  private async createPrinter() {
    return new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: `tcp://192.168.1.69`,
      characterSet: CharacterSet.SLOVENIA,
      removeSpecialCharacters: false,
      width: 42,
      options: {
        timeout: 100000,
      },
    });
  }

  @Get()
  getHello() {
    return "Hello World!";
  }

  @Post("shift")
  async gettest(@Body() body: any) {
    const printer = await this.createPrinter();

    try {
      // Carpeta para guardar el reporte
      const weekFolder = await this.getWeekFolderName();
      const folderPath = `C:/Reports/Moje/${weekFolder}`;
      await this.ensureReportsFolderExists(folderPath);

      // Nombre y ruta para el archivo de la imagen
      const reportName = `turnos-${new Date().getTime()}.png`;
      const imagePath = `${folderPath}/${reportName}`;

      printer.print(new Date().toISOString());
      printer.cut();

      await printer.execute();

      return "Reporte impreso con éxito";
    } catch (error) {
      throw new InternalServerErrorException(
        "Error al generar o imprimir el reporte"
      );
    }
  }
}

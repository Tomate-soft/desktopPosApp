import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from "@nestjs/common";
import { AppService } from "./app.service";
import * as fs from "fs/promises"; // Importación correcta de fs/promises
import { format, getISOWeek, startOfWeek } from "date-fns";
import { CharacterSet, PrinterTypes, ThermalPrinter } from "node-thermal-printer";

import * as path from "path";

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
      interface: `tcp://192.168.1.66`,
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

  @Get("config")
  async getConfig() {
    console.log("Directorio de trabajo actual:", process.cwd()); // Verifica el directorio de trabajo
    try {
      const data = await fs.readFile("./src/device.json", "utf-8");
      return data;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post("create-config")
  async createConfig(@Body() data: any) {
    const filePath = path.join(process.cwd(), "src", "device.json");

    try {
      await fs.access(filePath);
      return { message: "El archivo ya existe." };
    } catch (error) {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
      return { message: "Archivo creado correctamente." };
    }
  }

  @Post("printer/order")
  async print(@Body() data: any) {
    const printer = await this.createPrinter();

    // Función para imprimir una imagen y manejar errores
    const printImage = async (imagePath: string) => {
      try {
        // Verificación de existencia del archivo antes de imprimir
        console.log(`Comprobando la existencia del archivo en: ${imagePath}`);
        
        await fs.access(imagePath); // Verifica si el archivo existe
        console.log(`Imagen encontrada en: ${imagePath}`); // Si la ruta es correcta, se muestra el mensaje

        await printer.printImage(imagePath);
      } catch (error) {
        console.error(`Error al imprimir la imagen en ${imagePath}:`, error);
      }
    };

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString();

    try {
      printer.newLine();
      printer.alignRight();
      printer.print(currentDateString);
      printer.newLine();
      printer.underline(false);

      // Llamada para imprimir la imagen
      await printImage('./src/assets/icon/dividerTicket.png'); // Asegúrate de que la ruta es correcta aquí
      
      await data.data.forEach(async (item) => {
        printer.println(item.productName);
      });

      printer.print("Si se armo la machaca padrino");
      printer.cut();
      await printer.execute();

      return { message: "Reporte impreso con éxito" };
    } catch (error) {
      throw new InternalServerErrorException(
        "Error al generar o imprimir el reporte"
      );
    }
  }
}

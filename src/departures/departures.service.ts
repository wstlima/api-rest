import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartureDto } from './dto/create-departure.dto';
import { UpdateDepartureDto } from './dto/update-departure.dto';

import { Departure, DepartureDocument } from './schema/departure.schema';

import { InventoryService } from './../inventory/inventory.service';

import { ReduceInventory } from './../interface';

@Injectable()
export class DeparturesService {
  constructor(
    @InjectModel(Departure.name)
    private departureModel: Model<DepartureDocument>,
    private readonly inventoryService: InventoryService,
  ) {}

  async create(createDepartureDto: CreateDepartureDto) {
    const inventory = await this.inventoryService.findByProductCode(
      createDepartureDto.product_code,
    );

    if (!inventory) {
      return new HttpException(
        'Problem finding the product in the inventory.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let amountProductToBeDiscounted: number;
    let outputToBeLeft: number;
    let output: number;
    let stock: number;
    if (inventory.current_stock == 0) {
      //o valor fica para entradas caso o estoque esteja em 0, para zerar o estoque;
      const stockrestante = inventory.input - createDepartureDto.amount;
      stock = stockrestante;
    } else {
      stock = inventory.current_stock - createDepartureDto.amount;
    }

    if (inventory.output == 0) {
      output = createDepartureDto.amount;
    } else {
      output = inventory.output + createDepartureDto.amount;
    }

    let unit_cost = 0;
    if (inventory.unit_cost == 0) {
      unit_cost = inventory.output_price * createDepartureDto.amount;
    } else {
      unit_cost =
        inventory.output_price * createDepartureDto.amount +
        inventory.unit_cost;
    }

    const reduce: ReduceInventory = {
      current_stock: stock,
      unit_cost,
      output,
      code: createDepartureDto.product_code,
    };

    const reduceOutputDeInventorio =
      await this.inventoryService.reduceInventory(reduce);

    if (!reduceOutputDeInventorio) {
      return new HttpException(
        'Problema ao reduzir as input de estoque.',
        HttpStatus.BAD_REQUEST,
      );
    }

    createDepartureDto.description = inventory.description;
    createDepartureDto.price = inventory.output_price;
    createDepartureDto.batch = inventory.batch;

    const createdOutput = new this.departureModel(createDepartureDto);
    return createdOutput.save();
  }

  async findAll() {
    return await this.departureModel.find({});
  }

  async findOne(id: string) {
    return await this.departureModel.findById(id);
  }

  /**
   * Ele retorna uma promessa que resolve para um objeto de fatura.
   * @param {string} invoice - string
   */
  async findOneByInvoiceNumber(invoice: string) {
    return await this.departureModel.findOne({ sales_invoice_code: invoice });
  }

  update(id: number, updateDepartureDto: UpdateDepartureDto) {
    return `This action updates a #${id} departure`;
  }

  remove(id: number) {
    return `This action removes a #${id} departure`;
  }
}

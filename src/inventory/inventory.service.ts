import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

import { Inventory, InventoryDocument } from './schema/inventory.schema';

import { ReduceInventory } from './../interface';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name)
    private inventoryModel: Model<InventoryDocument>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const createdInventory = new this.inventoryModel(createInventoryDto);
    return createdInventory.save();
  }

  async findAll(q) {
    let filters: mongoose.FilterQuery<InventoryDocument> = {
      $or: [
        { description: new RegExp(q, 'i') },
        { product_code: new RegExp(q, 'i') },
        { batch: new RegExp(q, 'i') },
      ],
    };

    if (!q) {
      filters = {};
    }
    const result = await this.inventoryModel
      .find(filters)
      .sort({ createdAt: -1 });

    return result;
  }

  async findOne(id: string) {
    return await this.inventoryModel.findById(id);
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    return await this.inventoryModel.updateMany(
      { _id: id },
      updateInventoryDto,
    );
  }

  async remove(id: string) {
    return await this.inventoryModel.deleteMany({ _id: id });
  }

  /**
   * Ele retorna uma promessa que resolve para um documento da coleção de inventário que corresponde ao 
   * parâmetro de código
   * @param {string} code - string
   * @returns O InventoryModel está sendo retornado.
   */
  async findByProductCode(code: string) {
    return await this.inventoryModel.findOne({ product_code: code });
  }

  /**
   * Esta função aumenta as entradas de um inventário por um determinado valor
   * @param {string} code - O código do item de estoque para aumentar as entradas.
   * @param {number} value - número - A quantidade de entradas para incrementar.
   */
  async incrementEntriesOfInventory(code: string, value: number) {
    return await this.inventoryModel.updateMany(
      { product_code: code },
      { input: value },
    );
  }

  /**
   * "Reduzir o estoque de um produto em uma determinada quantidade."
   *
   * A função é assíncrona, o que significa que retorna uma promessa
   * @param {ReduceInventory} reduce - ReduceInventory - Este é o objeto que será passado para função 
   * para reduzir o estoque de um produto.
   */
  async reduceInventory(reduce: ReduceInventory) {
    return await this.inventoryModel.updateMany(
      { product_code: reduce.code },
      {
        current_stock: reduce.current_stock,
        output: reduce.output,
        unit_cost: reduce.unit_cost,
      },
    );
  }
}

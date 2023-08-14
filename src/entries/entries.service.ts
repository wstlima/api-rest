import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Entry, EntryDocument } from './schema/entry.schema';

import { InventoryService } from './../inventory/inventory.service';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
    private readonly inventoryService: InventoryService,
  ) {}

  async create(createEntryDto: CreateEntryDto) {
    //Pesquise um produto no estoque pelo código do produto.
    const inventoryData = await this.inventoryService.findByProductCode(
      createEntryDto.product_code,
    );

    const totalEntradas = inventoryData.input + createEntryDto.amount; // Adicione os recibos com o inventário.

    createEntryDto.description = inventoryData.description; // Adicione a mesma descrição de inventário.

    const incrementEntry =
      await this.inventoryService.incrementEntriesOfInventory(
        createEntryDto.product_code,
        totalEntradas,
      );

    if (!incrementEntry) {
      return new HttpException(
        'Problema al incrementar las input.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdEntry = new this.entryModel(createEntryDto);
    return createdEntry.save();
  }

  async findAll(q: string) {
    let filters: mongoose.FilterQuery<EntryDocument> = {
      $or: [
        { no_invoice_purchase: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { product_code: new RegExp(q, 'i') },
        { batch: new RegExp(q, 'i') },
      ],
    };

    if (!q) {
      filters = {};
    }

    const result = await this.entryModel.find(filters).sort({ createdAt: -1 });

    return result;
  }

  async findEntryByProductCode(q: string) {
    const filters: mongoose.FilterQuery<EntryDocument> = {
      $or: [{ product_code: new RegExp(q, 'i') }],
    };

    const result = await this.entryModel.find(filters);

    return result;
  }

  async findOne(id: string) {
    return await this.entryModel.findById(id);
  }

  async update(id: string, updateEntryDto: UpdateEntryDto) {
    return await this.entryModel.updateMany(
      {
        _id: id,
      },
      updateEntryDto,
    );
  }

  async remove(id: string) {
    return await this.entryModel.deleteMany({ _id: id });
  }
}

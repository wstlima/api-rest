import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Supplier } from './../../suppliers/schema/supplier.schema';

export type EntryDocument = Entry & Document;

@Schema({ timestamps: true })
export class Entry {
  @Prop()
  no_invoice_purchase: string;

  @Prop()
  date: Date;

  @Prop()
  product_code: string;

  @Prop()
  description: string;

  @Prop()
  amount: number;

  @Prop()
  price: number;

  @Prop()
  batch: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' })
  supplier: Supplier;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);

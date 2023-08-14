import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventoryDocument = Inventory & Document;

@Schema({ timestamps: true })
export class Inventory {
  @Prop()
  product_code: string;

  @Prop()
  description: string;

  @Prop()
  batch: string;

  @Prop({ default: 0 })
  current_stock: number;

  @Prop()
  input: number;

  @Prop()
  output: number;

  @Prop()
  input_price: number;

  @Prop()
  output_price: number;

  @Prop()
  expiration_date: Date;

  @Prop({ default: 0 })
  unit_cost: number; // calcula o custo unitário do estoque atual

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartureDocument = Departure & Document;

@Schema({ timestamps: true })
export class Departure {
  @Prop()
  sales_invoice_code: string;

  @Prop()
  product_code: string;

  @Prop()
  description: string;

  @Prop()
  batch: string;

  @Prop()
  date: Date;

  @Prop()
  amount: number;

  @Prop()
  price: number;
}

export const DepartureSchema = SchemaFactory.createForClass(Departure);

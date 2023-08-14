import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Customer } from '../../customers/schema/customer.schema';

export type AccountsPayableDocument = HydratedDocument<AccountsPayable>;

@Schema()
export class AccountsPayable {
  @Prop()
  note: string;

  @Prop()
  description: string;

  @Prop()
  debt: number;

  @Prop()
  status: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;

  @Prop({
    type: String,
    enum: ['long term', 'short term', 'none'],
    default: 'none',
  })
  type_account: string;

  @Prop({
    type: String,
    enum: ['paid', 'late', 'without paying'],
    default: 'without paying',
  })
  god_state: string;
}

export const AccountsPayableSchema =
  SchemaFactory.createForClass(AccountsPayable);

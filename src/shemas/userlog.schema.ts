import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  clerkid: string;

  @Prop()
  attempts: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

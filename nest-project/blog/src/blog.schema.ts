import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BlogDocument = Blog & Document;

@Schema()
export class Blog{
    @Prop()
    id: String;

    @Prop()
    title: String;

    @Prop()
    content: String;
    
    @Prop()
    name: String;

    @Prop()
    createdDt: Date;

    @Prop()
    updateDt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
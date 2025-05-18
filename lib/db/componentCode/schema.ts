import mongoose, { Schema, model } from "mongoose"
import { ComponentCode, Prompt } from "./types"

const PromptSchema = new Schema({
  type: {
    type: String,
    enum: ["text", "image"],
    required: true,
  },
  text: {
    type: String,
    required: function (this: Prompt) {
      return this.type === "text"
    },
  },
  image: {
    type: String,
    required: function (this: Prompt) {
      return this.type === "image"
    },
  },
})

const VersionSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  prompt: {
    type: [PromptSchema],
    required: true,
    validate: {
      validator: function (v: unknown) {
        return (
          Array.isArray(v) ||
          (v &&
            typeof v === "object" &&
            "type" in v &&
            ["text", "image"].includes((v as Prompt).type))
        )
      },
      message:
        "Prompt must be either a single prompt object or an array of prompts",
    },
  },
})

const ComponentCodeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    codegenId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Codegen",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    versions: {
      type: [VersionSchema],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

export const ComponentCodeModel =
  mongoose.models.ComponentCode ||
  model<ComponentCode>("ComponentCode", ComponentCodeSchema)

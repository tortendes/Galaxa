import Mongoose, { model, Schema } from "mongoose";

interface ModelInterface extends Document {
    punishmentId: number,
    type: string
}

const PunishmentSchema: Schema<ModelInterface> = new Schema({
    punsihmentId: Mongoose.Schema.Types.Decimal128,
    type: String,
    userId: Number,
    reason: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default model('punishments', PunishmentSchema)
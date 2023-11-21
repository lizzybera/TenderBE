import mongoose from "mongoose";
import { iHistoryData } from "../utils/interface";

const historyModel = new mongoose.Schema<iHistoryData>(
  {
    history: [{
      type: Array<{}>,
    }]
  },
  { timestamps: true }
);

export default mongoose.model<iHistoryData>("histories", historyModel);

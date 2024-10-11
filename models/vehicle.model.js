import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
   make:     { type: String, required: [true, "Please Enter Make"]         },
   models:   { type: String, required: [true, "Please Enter Your model"]   },
   year:     { type: Number, required: [true, "Please Enter Your year"]    },
   color:    { type: String, required: [true, "Please Enter Your color"]   },
   vin:      { type: String, required: [true, "Please Enter Your vin"]     },
   mileage:  { type: Number, required: [true, "Please Enter Your mileage"] },
   createdAt:{ type: Date, default: Date.now },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;

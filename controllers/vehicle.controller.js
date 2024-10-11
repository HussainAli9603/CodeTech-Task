import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Vehicle from "../models/vehicle.model.js";

// Add a Vehicle
export const createVehicle = catchAsyncErrors(async (req, res, next) => {
  try {
    const { make, models, year, color, vin, mileage } = req.body;

    if (!make || !models || !year || !vin || !mileage) {
       return res.status(400).json({ error: 'Missing required fields' });
    }

    const vehicleData = { make, models, year, color, vin, mileage }

    const createVehicle = await Vehicle.create(vehicleData);

   const vehicleResponse = {
      uid:  createVehicle._id || null,
      make: createVehicle.make || null,
      model:createVehicle.models || null,
      year: createVehicle.year || null,
      vin:  createVehicle.vin || null,
      color: createVehicle.color || null,
      mileage: createVehicle.mileage|| null,
  }

    return res.status(201).json({
      success:true,
      statusCode:201,
      message: "Vehicle created successfully",
      data: vehicleResponse,
    });

  } catch (error) {
    return res.status(400).json({ error: error.message || 'Invalid input data' });
  }
});

// GET API to fetch all Vehicles
export const getAllVehicles = async (req, res) => {
  try {

      const allVehicles = await Vehicle.find({});
      
      if (allVehicles.length === 0) {
        return res.status(404).json({ success: false, message: 'Vehicles not found' });
      }

      return res.status(200).json({
          success: true,
          statusCode:200,
          message: 'Get All Vehicles successfully',
          vehicles:allVehicles,
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: 'Server Error',
          error: error.message,
      });
  }
};

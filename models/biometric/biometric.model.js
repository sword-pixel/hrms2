import mongoose from "mongoose";

const biometricSchema = new mongoose.Schema(
  {
    deviceName: {
      type: String,
      required: true, // Name or model of the device
      trim: true
    },
    ipAddress: {
      type: String,
      required: true, // IP address for networked devices
      trim: true
    },
    port: {
      type: Number,
      required: true, // Port number for connection
    },
    connectionType: {
      type: String,
      enum: ['USB', 'WiFi', 'Ethernet'], // Type of connection
      required: true
    },
    status: {
      type: String,
      enum: ['Online', 'Offline', 'Maintenance'], // Current status of the device
      default: 'Online'
    },
    lastSync: {
      type: Date, // Timestamp of the last successful sync
      default: Date.now
    },
    adminId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee_professional_detail",
      required: true
    },
    isActive: { type: Boolean, default: true } // Logical delete flag
  }, { timestamps: true }
);


const biometricModel = mongoose.model('BiometricDevice',biometricSchema);

export default biometricModel;
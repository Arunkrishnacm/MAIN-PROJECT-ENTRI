import serviceSchema from "../model/service.js";
import User from "../model/userModel.js";

export const assignTechnician = async (req, res) => {
    try {
        const { technicianId } = req.body;
        const serviceId = req.params.id;

        if (!technicianId) {
            return res.status(400).json({ message: "Technician ID is required" });
        }

        const service = await serviceSchema.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Service not found" })
        }

        service.assignTechnician = technicianId;
        service.status = "assigned";
        await service.save();

        return res.status(200).json({ message: "Technician assigned successfully", service })
    } catch (err) {
        return res.status(500).json({ message: "Failed to assign technician", error: err.message })
    }
}

export const getAllServices = async (req, res) => {
    try {
        const services = await serviceSchema.find({}).populate('user', 'username').populate('assignTechnician', 'username');
        return res.status(200).json({ services });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch services",
            error: err.message,
        });
    }
};

export const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find({});
        return res.status(200).json({users})
    }catch(err){
        return res.status(500).json({message:"Failed to fetch users",error:err.message})
    }
}

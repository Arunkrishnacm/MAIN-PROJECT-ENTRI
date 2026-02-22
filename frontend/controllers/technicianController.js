
import serviceSchema from "../model/service.js";

export const getAssignedServices = async (req,res)=>{
    try{
        const services = await serviceSchema.find({
            assignTechnician:req.user.id
        })
        return res.status(200).json({services})
    }catch(err){
        return res.status(500).json({message:"Failed to fetch assigned services",error:err.message})
    }
}

export const updateServiceStatus = async (req,res)=>{
    try{
        const {status} =req.body;
        const services = await serviceSchema.findById(req.params.id);

        if(!services){
            return res.status(404).json({message:"Service not found"})
        }
        if(services.assignTechnician.toString() !== req.user.id){
            return res.status(403).json({message:"Unauthorized"})
        }

        services.status = status;
        await services.save();
        return res.status(200).json({message:"Service status updated successfully",services})
        
    }catch(err){
        return res.status(500).json({message:"Failed to update service status",error:err.message})
    }
}
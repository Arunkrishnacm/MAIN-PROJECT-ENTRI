import serviceSchema from "../model/service.js";

export const createService = async (req, res) => {
    try{
        const {serviceType,description,address} =req.body;
        if(!serviceType || !description || !address){
            return res.status(400).json({message:"All fields are required"})
        }

        const service = new serviceSchema({
            user:req.user.id,
            serviceType,
            description,
            address
        })

        await service.save();
        return res.status(201).json({message:"Service request created successfully",service})
    }catch(err){
        return res.status(500).json({message:"Failed to create service request",error:err.message})
    }
}

export const getUserServices = async (req,res)=>{
    try{
        const services = await serviceSchema.find({user:req.user.id});
        return res.status(200).json({services})
    }catch(err){
        return res.status(500).json({message:"Failed to fetch user services",error:err.message})
    }
}
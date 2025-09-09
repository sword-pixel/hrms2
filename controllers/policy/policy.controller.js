import policyModel from "../../models/policycompliance/policy.model.js";

const addPolicy = async (req,res) => {
    try {

        if(!['admin','hr'].includes(req.role.toLowerCase())) return res.status(400).json({ success: false, message: "Permission Denied."})

        const effectiveDateUTC = new Date();
        const indiaOffset = 5.5 * 60; // India Standard Time is UTC +5:30, which is 5.5 hours
        const indiaTime = new Date(effectiveDateUTC.getTime() + indiaOffset * 60 * 1000);
        const effectiveDate = indiaTime.toISOString();

        const {policyName, description, complianceType} = req.body;
        const newPolicy = policyModel({policyName, description, effectiveDate, complianceType})

        await newPolicy.save();
        return res.status(200).json({success:true, message:"Policy Added successfully.", data:newPolicy})
    } catch (error) {
        console.log("Error in Policy.controller file :: " + error.message)
        return res.status(400).json({ success:false, message: "Internal server Error." })
    }

}

const updatePolicy = async (req,res) => {
    try {
        if(!['admin','hr'].includes(req.role.toLowerCase())) return res.status(400).json({ success: false, message: "Permission Denied."})
        const effectiveDateUTC = new Date();
        const indiaOffset = 5.5 * 60; // India Standard Time is UTC +5:30, which is 5.5 hours
        const indiaTime = new Date(effectiveDateUTC.getTime() + indiaOffset * 60 * 1000);

        const effectiveDate = indiaTime.toISOString();

        const { _id, policyName, description, complianceType } = req.body;

        const policyExist = await policyModel.find({_id:_id, isActive:true });

        if(!policyExist.length){
            return res.status(500).json({success:false, message:"Policy not avaliable"})
        }

        const newPolicy = await policyModel.findOneAndUpdate( {_id:_id,isActive:true} , {policyName, description, effectiveDate, complianceType},{new:true} )

        // await newPolicy.save();
        return res.status(200).json({success:true, message:"Policy updated successfully.", data: newPolicy})
    } catch (error) {
        console.log("Error in Policy.controller file :: " + error.message)
        return res.status(400).json({ success:false, message: "Internal server Error." })
    }

}

const deletePolicy = async (req,res) => {
    try {
        const rolebase = ['admin','hr']
        // if(req.role !== 'admin') return res.status(400).json({ success: false, message: "Permission Denied."})
        if(! rolebase.includes((req.role).toLowerCase())) return res.status(400).json({ success: false, message: "Permission Denied."})

        const { id } = req.body;
        const policyExist = await policyModel.find({_id:id, isActive:true });

        if(!policyExist.length){
            return res.status(500).json( {success:false, message:"Policy not avaliable"} )
        }

        await policyModel.findOneAndUpdate({_id:id}, { isActive:false });
        return res.status(200).json({success:true, message:"Policy deleted successfully.", deleteId:id})

    } catch (error) {

        console.log( "Error in Delete Policy Controller :: " + error.message )
        res.status(500).json( { success:false, message: "Internal Server Error."} )

    }
}

const getAllPolicy = async (req,res) => {
    try {

        const policy = await policyModel.find({isActive:true});

        if(!policy.length){
            return res.status(200).json( { success:true , message: "No Policies avaliable" } )
        }
        return res.status(200).json( { success:true, data:policy } )
    } catch (error) {
        console.log('Error in get all policy controller :: ' + error.message)
        return res.status(400).json( { success:false, message: "Internal server error" } )
    }
}

export { addPolicy, deletePolicy, getAllPolicy, updatePolicy }
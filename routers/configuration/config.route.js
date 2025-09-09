import express from 'express'
import { createRole,updateRole,deleteAndRestoreRole,getAllRoles } from '../../controllers/configuration/picklist.controller.js';
import { getAllDept,createDept,updateDept,deleteAndRestoreDept } from '../../controllers/configuration/picklist.department.js';
import { getAllDesig,getRevelentDesig,createDesig,updateDesig,deleteAndRestoreDesig} from '../../controllers/configuration/picklist.designation.js';
import { authenticate } from '../../helpers/authenticateEmployee.js';
import { createModule,getAllModules,createUpdateCron, fetchAllCron } from '../../controllers/configuration/module.controller.js';
import { getAllReason,createReasons,updateReasons,deleteAndRestoreReasons } from '../../controllers/configuration/reason.controller.js';
import { createOrganization,selectOrganization,updateOrganization,deleteOrganization } from '../../controllers/configuration/organization.controller.js';


const picklistRouter = express.Router();

picklistRouter
.get('/picklist/role/getAll',authenticate,getAllRoles)
.post('/picklist/role/create',authenticate,createRole)
.put('/picklist/role/update/:id',authenticate,updateRole)
.delete('/picklist/role/activateDeactivate/:id',authenticate,deleteAndRestoreRole)
.get('/picklist/department/getAll',authenticate,getAllDept)
.post('/picklist/department/create',authenticate,createDept)
.put('/picklist/department/update/:id',authenticate,updateDept)
.delete('/picklist/department/activateDeactivate/:id',authenticate,deleteAndRestoreDept)
.get('/picklist/designation/getAll',authenticate,getAllDesig)
.get('/picklist/designation/selectDesig/:department',authenticate,getRevelentDesig)
.post('/picklist/designation/create',authenticate,createDesig)
.put('/picklist/designation/update/:id',authenticate,updateDesig)
.delete('/picklist/designation/activateDeactivate/:id',authenticate,deleteAndRestoreDesig)
.get('/picklist/reason/getAll',authenticate,getAllReason)
.post('/picklist/reason/create',authenticate,createReasons)
.put('/picklist/reason/update/:id',authenticate,updateReasons)
.delete('/picklist/reason/activateDeactivate/:id',authenticate,deleteAndRestoreReasons)
.post('/module/create',authenticate,createModule)
.get('/module/getAll',authenticate,getAllModules)
.put('/cron/update/:id',authenticate,createUpdateCron)
.get('/cron/getAll/',authenticate,fetchAllCron)
.post('/picklist/organization/create',authenticate,createOrganization)
.get('/picklist/organization/get',authenticate,selectOrganization)
.put('/picklist/organization/update/:id',authenticate,updateOrganization)
.delete('/picklist/organization/deleterestore/:id',authenticate,deleteOrganization);


export default picklistRouter;
import express from 'express';
const router = express.Router();
import { protect } from '../helpers/authadmin.js';
import { addvehichle,deletevehichle,getallvehichle,getonevehichle,signin,checkmail,newpassword,getfilter,getsearch} from '../helpers/admin.js';

router.post ('/addvehichle',addvehichle);

router.get ('/getallvehichle',protect,getallvehichle);

router.post('/deletevehichle/:id',deletevehichle);

router.get('/getonevehichle/:id',protect,getonevehichle)

router.post('/signin',signin)

router.post('/checkmail',checkmail)

router.post('/newpassword/:id/:token',newpassword)

router.get('/getfilter/:type',protect,getfilter)

router.get('/getsearch/:val',protect,getsearch)

export default router;
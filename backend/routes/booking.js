
const router = express.Router();
const { verifyToken } = require('../middleWare/authMiddleware');
const { authorizeRoles } = require('../middleWare/roleMiddleware');
const { createBooking, getUserBookings } = require('../controllers/bookingController');

router.post('/create', verifyToken, authorizeRoles('user'), createBooking);
router.get('/bookings', verifyToken, authorizeRoles('user'), getUserBookings);
export default router;

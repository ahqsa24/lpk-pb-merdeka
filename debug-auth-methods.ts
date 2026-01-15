
import { auth } from './src/lib/auth';

console.log(Object.keys(auth.api));
// Check strict types if possible, or just log
console.log('updateUser:', typeof auth.api.updateUser);
console.log('changePassword:', typeof auth.api.changePassword);
console.log('setPassword:', typeof auth.api.setPassword);
console.log('resetPassword:', typeof auth.api.resetPassword);

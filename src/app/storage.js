import { ref, getMetadata } from 'firebase/storage';
import { storage } from './firebase';

// Create a storage reference from our storage service
const storageRef = ref(storage);
const imageRef = ref(storage, 'items/tops/top.png');

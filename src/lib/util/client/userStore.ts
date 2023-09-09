import { createNewUser } from "$lib/types/user";
import { localStorageStore } from "@skeletonlabs/skeleton";

export const userStore = localStorageStore('localUserInfo', createNewUser());
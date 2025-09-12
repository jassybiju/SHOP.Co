import { redirect } from "react-router";
import { fetchUser } from "../app/Auth/services/auth.service";

export const requireAuthLoader = async () => {
    try {
        console.log(12322)
        //! TODO Use queryClient to integrate reactquery
        const user = await fetchUser();
        if (!user) {
            throw new Response("Unauthorized", { status: 401 });
        }else if(user.role === 'user'){
            //!TODO
            redirect('access-denied')
        }
        console.log(user);
        return user;
    } catch (error) {
        throw redirect('/auth/login')
    }
};

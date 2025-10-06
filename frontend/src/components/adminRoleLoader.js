
import { redirect } from 'react-router-dom';
import { fetchUser } from '../app/Auth/services/auth.service';

export async function adminRoleLoader() {

    const user = await fetchUser(); 
    
    console.log(user)
    const requiredRoles = ['admin'];

    if (!user) {

        return redirect('/auth/login');
    }


    if (!requiredRoles.includes(user.role)) {

        return redirect('/');
    }


    return { user };
}


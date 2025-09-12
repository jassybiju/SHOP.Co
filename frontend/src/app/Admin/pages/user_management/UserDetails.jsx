import { useParams } from "react-router";

const UserDetails = () => {
    const {id} = useParams()
    console.log(id)
  return <div>UserDetails</div>;
};

export default UserDetails;

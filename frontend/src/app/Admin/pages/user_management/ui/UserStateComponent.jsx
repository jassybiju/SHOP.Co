const UserStateComponent = ({state}) => {

    if(state){
      return  <div>Active</div>
    }else{
        return <div>Blocked</div>
    }
};
export default UserStateComponent;

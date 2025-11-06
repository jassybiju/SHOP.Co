const ProductStateComponent = ({state}) => {
  console.log(state)
    if(state){
      return  <div>Active</div>
    }else{
        return <div>Blocked</div>
    }
};
export default ProductStateComponent;

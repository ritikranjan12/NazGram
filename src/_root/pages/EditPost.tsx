import PostForm from "@/components/forms/PostForm"
import { useToast } from "@/components/ui/use-toast";
import { useGetPostById } from "@/lib/react-query/queries";


import { useParams } from 'react-router-dom';
const EditPost : React.FunctionComponent = () => {
    // TODO: implement edit post  
    const { id } = useParams();
    const {toast} = useToast()
    
    const { data, isLoading, isError } = useGetPostById(id);
      console.log(data);
      
    if (isError) {
      toast({
        title: `Loading failed. Please try again.`,
      });
    }
    
  return (
    <>
    {!isLoading &&
      <div className="flex flex-1">
      <div className="common-container">
        <PostForm post={data} action="Update"/>
      </div>
    </div>
      

    }
    
    </>
    
  )
}

export default EditPost

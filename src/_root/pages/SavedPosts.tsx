import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite";

const SavedPosts = () => {
  const {data:currentUser} = useGetCurrentUser();

  const savePosts = currentUser?. save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();
  if(!currentUser){
    return(
        <div className="flex-center w-full h-full">
            <Loader />
        </div>
    );
  }  

  return (
        <>
            {savePosts.length === 0 ?(
                <p className="text-light-4">No available posts</p>
            ):(
                <GridPostList posts={savePosts} showStats={false}/>
            )}
        </>
        
  )
}

export default SavedPosts
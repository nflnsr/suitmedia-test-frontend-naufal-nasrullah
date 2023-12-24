import { Header, Banner, PostList } from "@/components";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {

  return (
    <>
      <SkeletonTheme baseColor="#eaeaea" highlightColor="#f5f5f5">
        <Header />
        <Banner />
        <PostList />
      </SkeletonTheme>
    </>
  );
}

export default App;

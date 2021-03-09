import HomeLayout from "../components/HomeLayout";
import wrapper from "../store/configureStore";
import { authCheckDummyActionAsync } from "../modules";
import { END } from "redux-saga";
interface Props {
  dispatch: any;
  ctx: any;
  getInitialProps: any;
}

const IndexPage = () => <HomeLayout></HomeLayout>;

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch(authCheckDummyActionAsync.request(""));
    // if (!context.store.getState().rdcExample.placeholderData) {
    //     context.store.dispatch();
    //         context.store.dispatch(END);
    //   }
    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
  }
);

export default IndexPage;

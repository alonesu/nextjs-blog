// @ts-nocheck
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from "next";

export default function Post({ postData }) {
  return <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    {/* {postData.title}
    <br/>
    {postData.id}
    <br/> */}
    {/* {postData.date} */}
    {/* <Date dateString={postData.date} />
    <br/>
    <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }}></div> */}
    <article>
      <h1 className={utilStyles.headingX1}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }}></div>
    </article>
  </Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    }
  }
}